// Download the product photograph Champak publishes for each of our mapped
// products, so the detail-page gallery can show the real article alongside the
// client's own photography.
//
// The hero image on a Champak product page is normally img/<slug>.jpg. Where it
// isn't, we take the first content image in the body — Champak genuinely reuses
// one photo across some pages (SMO 254 shows the 904L shot), and mirroring that
// is correct: it is the image they publish for that product.
//
// Images are downloaded once into public/images/champak/ and the product -> file
// map is written to src/data/champakImages.ts. Nothing is fetched at runtime.
//
//   node fetch-images.cjs            # download anything not already present
//   node fetch-images.cjs --force    # re-download everything

const fs = require('fs');
const path = require('path');

const HERE = __dirname;
const PAGES = path.join(HERE, 'pages');
const OUT_DIR = path.join(HERE, '../../public/images/champak');
const OUT_TS = path.join(HERE, '../../src/data/champakImages.ts');
const BASE = 'https://www.champaksteel.com/';
const UA = { 'User-Agent': 'jyothi-metal-catalog/1.0 (info@jyotimetal.co.in)' };

// Site furniture that must never be mistaken for the product shot.
const CHROME =
  /^(mail|imh-phone|logoc|logo|facebook|linkedin|youtube|twitter|instagram|whatsapp|industry-application|favicon|call|email|arrow|banner|search|menu|close|up|down|quote|cert)/i;

const mapping = require('./mapping.cjs');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** The image Champak publishes for this page, as a site-relative path. */
function imageFor(slug) {
  const file = path.join(PAGES, slug + '.html');
  if (!fs.existsSync(file)) return null;
  const html = fs.readFileSync(file, 'utf8');
  const body = html.slice(html.indexOf('<body'));
  const srcs = [...body.matchAll(/<img[^>]*\ssrc="(img\/[^"]+)"[^>]*>/gi)].map((m) => m[1]);
  const preferred = 'img/' + slug + '.jpg';
  if (srcs.includes(preferred)) return preferred;
  return srcs.find((u) => !CHROME.test(path.basename(u))) ?? null;
}

const wanted = new Map();      // product id -> site-relative image path
for (const [id, slug] of Object.entries(mapping)) {
  const img = imageFor(slug);
  if (img) wanted.set(id, img);
}

const unique = [...new Set(wanted.values())];
console.log(`${wanted.size} products resolve to ${unique.length} distinct Champak images`);

fs.mkdirSync(OUT_DIR, { recursive: true });
const force = process.argv.includes('--force');

(async () => {
  let ok = 0, skipped = 0, failed = [];
  for (let i = 0; i < unique.length; i++) {
    const rel = unique[i];
    const name = path.basename(rel);
    const dest = path.join(OUT_DIR, name);
    if (!force && fs.existsSync(dest) && fs.statSync(dest).size > 2000) { skipped++; continue; }

    let done = false;
    for (let attempt = 0; attempt < 3 && !done; attempt++) {
      try {
        const res = await fetch(BASE + rel, { headers: UA });
        if (res.status === 429 || res.status >= 500) { await sleep(1200 + attempt * 900); continue; }
        if (!res.ok) break;
        const buf = Buffer.from(await res.arrayBuffer());
        if (buf.length < 2000) break;               // placeholder / error page
        fs.writeFileSync(dest, buf);
        ok++; done = true;
      } catch { await sleep(700); }
    }
    if (!done) failed.push(rel);
    if ((i + 1) % 40 === 0) console.log(`  ${i + 1}/${unique.length}`);
    await sleep(120);
  }

  console.log(`downloaded ${ok}, already present ${skipped}, failed ${failed.length}`);
  if (failed.length) failed.slice(0, 10).forEach((f) => console.log('   FAILED ' + f));

  // Only publish entries whose file actually landed on disk.
  const entries = [...wanted.entries()]
    .filter(([, rel]) => fs.existsSync(path.join(OUT_DIR, path.basename(rel))))
    .sort(([a], [b]) => a.localeCompare(b));

  const body = entries
    .map(([id, rel]) => `  '${id.replace(/'/g, "\\'")}': '${path.basename(rel)}',`)
    .join('\n');

  fs.writeFileSync(
    OUT_TS,
    `// AUTO-GENERATED — do not edit by hand.\n` +
      `// Product id -> the photograph champaksteel.com publishes for that product,\n` +
      `// downloaded into public/images/champak/. Regenerate:\n` +
      `//   node scripts/champak/fetch-images.cjs\n\n` +
      `export const champakImages: Record<string, string> = {\n${body}\n};\n\n` +
      `/** Public path of the Champak photo for a product, if we have one. */\n` +
      `export const getChampakImage = (id: string): string | null =>\n` +
      `  champakImages[id] ? \`/images/champak/\${champakImages[id]}\` : null;\n`
  );
  console.log(`wrote ${entries.length} entries to src/data/champakImages.ts`);
})();
