// Reconcile src/data/catalogData.ts against Champak's own category listings.
//
// Champak's eight category landing pages are the authority on what products
// exist and which sub-category each sits under. This script reads the cached
// copies in pages/, diffs them against our catalogue, and emits an entry for
// every Champak product we are missing.
//
// Every field is lifted from the cached page — title and sub-category from the
// category listing, the spec chips from the product page's own headings and
// Equivalent Grades table. Nothing is invented: if a chip cannot be found on
// the page it is simply omitted.
//
//   node catalog-fill.cjs          # report the diff only
//   node catalog-fill.cjs --write  # apply to catalogData.ts and mapping.cjs

const fs = require('fs');
const path = require('path');
const { clean, parseTables } = require('./lib.cjs');

const HERE = __dirname;
const PAGES = path.join(HERE, 'pages');
const CATALOG = path.join(HERE, '../../src/data/catalogData.ts');
const MAPPING = path.join(HERE, 'mapping.cjs');

// Champak category landing page -> our catalogue category name.
const CATEGORY_PAGES = {
  'seamless-welded-pipes-tubes-manufacturer-exporter': 'Pipes & Tubes',
  'sheets-plates-manufacturer-exporter': 'Plates & Sheets',
  'round-bars-rods-manufacturer-exporter': 'Round Bars',
  'flanges-manufacturer-exporter': 'Flanges',
  'buttweld-fittings-manufacturer-exporter': 'Buttweld Fittings',
  'forged-fittings-manufacturer-exporter': 'Forged Fittings',
  'fasteners-manufacturer-exporter': 'Fasteners',
  'other-items-manufacturer-exporter': 'Specialized Product',
};

const norm = (s) => clean(s).replace(/\s+/g, ' ').trim();

/** category -> subCategory -> [{title, slug}] straight from Champak's listings. */
function readHierarchy() {
  const tree = {};
  for (const [page, category] of Object.entries(CATEGORY_PAGES)) {
    const file = path.join(PAGES, page + '.html');
    if (!fs.existsSync(file)) throw new Error(`missing cached category page: ${page}.html`);
    const html = fs.readFileSync(file, 'utf8');

    // Sub-category headings are h2 on some pages and h3 on others.
    const heads = [...html.matchAll(/<h[23] class="wd-post__title">([\s\S]*?)<\/h[23]>/gi)];
    const subs = {};
    heads.forEach((h, i) => {
      const segment = html.slice(h.index + h[0].length, i + 1 < heads.length ? heads[i + 1].index : html.length);
      const items = [];
      // Products live in prodduct-list <ul>s — often two, one per column.
      for (const [, ul] of segment.matchAll(/<ul class="prodduct-list">([\s\S]*?)<\/ul>/gi)) {
        for (const [, href, label] of ul.matchAll(/<a\s+[^>]*href="([^"]+)\.html"[^>]*>([\s\S]*?)<\/a>/gi)) {
          const title = norm(label);
          // At least one href on the site is root-relative; keep the bare slug.
          const slug = href.replace(/^.*\//, '');
          if (title && slug) items.push({ title, slug });
        }
      }
      if (items.length) subs[norm(h[1])] = (subs[norm(h[1])] || []).concat(items);
    });
    tree[category] = subs;
  }
  return tree;
}

/** Spec chips for a product card, taken only from that product's own page. */
function specChips(slug) {
  const file = path.join(PAGES, slug + '.html');
  if (!fs.existsSync(file)) return [];
  const html = fs.readFileSync(file, 'utf8');
  const headings = [...html.matchAll(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/gi)]
    .map((m) => norm(m[1]))
    .join(' — ');

  const chips = [];
  const push = (v) => { if (v && !chips.includes(v)) chips.push(v); };

  // Governing standard as printed on the page, e.g. "ASTM A182" / "ASME SA240".
  const std = headings.match(/\b(?:ASTM|ASME)\s+S?[A-Z]\s?\d{1,4}[A-Z]?\b/);
  if (std) push(std[0].replace(/\s+/g, ' '));

  // UNS and Werkstoff numbers come from the Equivalent Grades table when the
  // page publishes one, so we quote the same value the spec table shows.
  const eq = parseTables(html).find((t) => t.anchor === 'equivalent');
  if (eq && eq.rows.length >= 2) {
    const header = eq.rows[0].map((c) => norm(c.t).toUpperCase());
    const body = eq.rows[1].map((c) => norm(c.t));
    const at = (re) => {
      const i = header.findIndex((h) => re.test(h));
      return i >= 0 ? body[i] : '';
    };
    const uns = at(/^UNS/);
    if (uns && uns !== '-') push(`UNS ${uns}`);
    const wnr = at(/WERKSTOFF|^WNR/);
    if (wnr && wnr !== '-') push(`W.Nr. ${wnr}`);
  } else {
    const uns = headings.match(/\bUNS\s+[A-Z]\d{4,5}\b/);
    if (uns) push(uns[0]);
    const alt = headings.match(/\b(?:ASTM|ASME)\s+S?[A-Z]\s?\d{1,4}\s+Gr\.?\s*[\w-]+/i);
    if (alt) push(norm(alt[0]));
  }
  return chips.slice(0, 3);
}

/** Stable catalogue id from the Champak slug, minus its marketing suffix. */
function idFor(slug, taken) {
  let id = slug
    .replace(/-(manufacturer|supplier|suppliers|exporter|exporters|stockist|stockists|dealer|dealers|trader|traders)(-.*)?$/g, '')
    .replace(/-+$/, '');
  if (!id) id = slug;
  let out = id, n = 2;
  while (taken.has(out)) out = `${id}-${n++}`;
  taken.add(out);
  return out;
}

// ---------------------------------------------------------------------------
const tree = readHierarchy();
const catalogSrc = fs.readFileSync(CATALOG, 'utf8');
const existingIds = new Set([...catalogSrc.matchAll(/\bid:\s*'([^']+)'/g)].map((m) => m[1]));
const mapping = require('./mapping.cjs');
const mappedSlugs = new Set(Object.values(mapping));

const missing = [];
let champakTotal = 0;
for (const [category, subs] of Object.entries(tree)) {
  for (const [subCat, items] of Object.entries(subs)) {
    for (const { title, slug } of items) {
      champakTotal++;
      if (mappedSlugs.has(slug)) continue;
      missing.push({ category, subCat, title, slug });
    }
  }
}

console.log(`Champak products across 8 category pages : ${champakTotal}`);
console.log(`already mapped into our catalogue        : ${champakTotal - missing.length}`);
console.log(`missing                                  : ${missing.length}`);

const taken = new Set(existingIds);
const entries = missing.map((p) => {
  const id = idFor(p.slug, taken);
  const chips = specChips(p.slug);
  return { ...p, id, specs: chips };
});

const noChips = entries.filter((e) => !e.specs.length);
if (noChips.length) console.log(`(${noChips.length} pages published no extractable chips)`);

if (!process.argv.includes('--write')) {
  const byCat = {};
  entries.forEach((e) => (byCat[e.category] = (byCat[e.category] || 0) + 1));
  console.table(byCat);
  console.log('\nrun with --write to apply');
  process.exit(0);
}

// ---- write catalogData.ts ---------------------------------------------------
const esc = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
const block = entries
  .map(
    (e) => `  {
    id: '${esc(e.id)}',
    title: '${esc(e.title)}',
    category: '${esc(e.category)}',
    subCat: '${esc(e.subCat)}',
    image: '/images/products/${esc(e.id)}.jpg',
    specs: [${e.specs.map((s) => `'${esc(s)}'`).join(', ')}],
  },`
  )
  .join('\n');

const marker = '\n];';
const end = catalogSrc.lastIndexOf(marker);
if (end < 0) throw new Error('could not find end of catalogProducts array');
const header = `\n\n  // ---------------------------------------------------------------------\n  // Champak parity: products listed on champaksteel.com's category pages that\n  // were absent here. Titles, categories and spec chips are taken from the\n  // cached pages — see scripts/champak/catalog-fill.cjs.\n  // ---------------------------------------------------------------------\n`;
fs.writeFileSync(CATALOG, catalogSrc.slice(0, end) + header + block + catalogSrc.slice(end));

// ---- extend mapping.cjs so the spec tables generate too ---------------------
let mapSrc = fs.readFileSync(MAPPING, 'utf8');
const mapEnd = mapSrc.lastIndexOf('};');
const mapAdd =
  `\n  // ---- Champak parity additions (catalog-fill.cjs) ----\n` +
  entries.map((e) => `  '${esc(e.id)}': '${esc(e.slug)}',`).join('\n') +
  '\n';
fs.writeFileSync(MAPPING, mapSrc.slice(0, mapEnd) + mapAdd + mapSrc.slice(mapEnd));

console.log(`\nwrote ${entries.length} products to catalogData.ts and mapping.cjs`);
