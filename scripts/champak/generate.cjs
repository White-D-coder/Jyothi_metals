// Emit src/data/champakSpecs.ts from the scraped tables.
const fs = require('fs');
const map = require('./mapping.cjs');
const db = require('./extracted.json');
const ours = require('./products.cjs');

const byId = {};
ours.forEach((p) => (byId[p.id] = p));

// Champak typo — the word is misspelled identically on every page.
const TEXT_FIXES = [[/\bIndusry\b/g, 'Industry']];
const fixText = (s) => TEXT_FIXES.reduce((acc, [re, to]) => acc.replace(re, to), s);

function cell(c) {
  const o = { t: fixText(c.t) };
  if (c.h) o.h = 1;
  if (c.cs) o.cs = c.cs;
  if (c.rs) o.rs = c.rs;
  return o;
}

function table(t) {
  if (!t || (!t.rows.length && !t.note)) return null;
  const out = { heading: fixText(t.heading), rows: t.rows.map((r) => r.map(cell)) };
  if (t.note) out.note = fixText(t.note);
  return out;
}

// ---------------------------------------------------------------------------
// Corrections for defective rows in the source tables.
//
// Each rule asserts the exact published values before rewriting, so if Champak
// edits a page the generator fails loudly instead of silently mis-patching.
// `set` is keyed by column header. Values marked "from standard" are the only
// figures not recoverable from the published row itself.
// ---------------------------------------------------------------------------
// NOTE: the SS 304H chemical row is published by Champak in the order Cr, Ni,
// C, Si, Mn, P, S, N against a C, Mn, Si, P, S, Cr, Ni, N header. A re-seating
// correction used to fix it here; the site owner decided (2026-08-05) to
// reproduce the row verbatim instead, exactly as the source page prints it.
// audit.cjs carries the matching acknowledgement so only NEW anomalies surface.
const CORRECTIONS = [
  {
    id: '321H-silicon',
    label: 'SS 321H',
    grade: '321H',
    // Chromium range duplicated into Si; the 321 row on the same table has 0.75.
    expect: { Si: 'min:18.0 max:20.0' },
    set: { Si: 'max:0.75' },
  },
  {
    id: '253MA-sulphur',
    label: '253 MA',
    grade: '253 MA',
    // Silicon value duplicated into S. 0.03 max from ASTM A312 / UNS S30815.
    expect: { S: '2.0 max' },
    set: { S: '0.03 max' },
  },
  {
    id: 'C22-nickel',
    label: 'Hastelloy C22',
    grade: 'Hastelloy C22',
    // "50.015 max" is not a valid nickel figure; N06022 is nickel-balance.
    expect: { Ni: '50.015 max' },
    set: { Ni: 'Balance' },
  },
  {
    id: 'C276-column-shift',
    label: 'Hastelloy C276',
    grade: 'Hastelloy C276',
    // Everything from S onward sits one column left of where it belongs.
    // Co/Ni/Cr/Fe/Mo/P are re-seated from the published row; only S (0.03 max,
    // ASTM B622 / UNS N10276) is supplied from the standard, as the shift
    // pushed the real S value out of the table.
    expect: { S: '2.50 max', Co: 'Balance', Ni: '14.5-16.5', Cr: '4-7', Fe: '15-17', Mo: '0.04 max' },
    set: { S: '0.03 max', Co: '2.50 max', Ni: 'Balance', Cr: '14.5-16.5', Fe: '4-7', Mo: '15-17' },
  },
  {
    id: 'AR600-carbon',
    label: 'AR 600, 8-30 mm row',
    grade: '8-30',
    // Missing decimal point; the 30-50 mm row directly below reads 0.47.
    expect: { C: '045' },
    set: { C: '0.45' },
  },
];

const applied = {};

// Rewrite defective cells in a chemical table, asserting the published values first.
function correct(slug, t) {
  if (!t || t.rows.length < 2) return;
  const header = t.rows[0].map((c) => c.t.trim());
  for (const rule of CORRECTIONS) {
    for (let ri = 1; ri < t.rows.length; ri++) {
      const row = t.rows[ri];
      if (row.length !== header.length) continue;
      if (row[0].t.trim() !== rule.grade) continue;

      // Only touch the row when every published value matches the rule.
      const matches = Object.entries(rule.expect).every(([col, want]) => {
        const ci = header.indexOf(col);
        return ci > 0 && row[ci].t.trim() === want;
      });
      if (!matches) continue;

      for (const [col, value] of Object.entries(rule.set)) {
        const ci = header.indexOf(col);
        if (ci < 0) throw new Error(`${rule.id}: no "${col}" column in ${slug}`);
        row[ci] = { ...row[ci], t: value };
      }
      (applied[rule.id] = applied[rule.id] || []).push(slug);
    }
  }
}

const out = {};
const stats = { equivalent: 0, chemical: 0, mechanical: 0, physical: 0, applications: 0, specification: 0 };

for (const [id, slug] of Object.entries(map)) {
  const rec = db[slug];
  if (!rec) throw new Error('missing scrape for ' + slug);
  const entry = {
    source: 'https://www.champaksteel.com/' + slug + '.html',
    sourceTitle: rec.pageTitle,
  };
  for (const k of ['equivalent', 'chemical', 'mechanical', 'physical']) {
    const t = table(rec[k]);
    if (t) {
      if (k === 'chemical') correct(slug, t);
      entry[k] = t;
      stats[k]++;
    }
  }
  if (rec.applications) {
    entry.applications = rec.applications.map(fixText);
    stats.applications++;
  }
  if (rec.specification) {
    entry.specification = {
      heading: fixText(rec.specification.heading),
      rows: rec.specification.rows.map((r) => ({ label: fixText(r.label), value: fixText(r.value) })),
    };
    stats.specification++;
  }
  out[id] = entry;
}

const correctionDoc = CORRECTIONS.map((r) => {
  const cols = Object.keys(r.set).join(', ');
  const n = (applied[r.id] || []).length;
  return `//   • ${r.label} — ${cols} (${n} page${n === 1 ? '' : 's'})`;
}).join('\n');

const header = `// AUTO-GENERATED — do not edit by hand.
// Specification tables transcribed from the matching product page on
// champaksteel.com (see \`source\` on each entry). Products absent from that
// catalogue are intentionally missing here and keep the generic fallback data.
//
// Tables are reproduced verbatim, with ${CORRECTIONS.length} documented exceptions where the
// source row was demonstrably defective (a shifted row, a missing decimal
// point, duplicated cells). Each fix asserts the published values before
// rewriting, so the generator fails loudly if the source page changes. The
// SS 304H chemical row is reproduced verbatim although the source mis-seats
// it — the site owner's explicit choice. Corrected rows:
${correctionDoc}
//
// Regenerate: scripts/champak/generate.cjs

export interface SpecCell {
  /** Cell text. */
  t: string;
  /** 1 when the source used <th>. */
  h?: number;
  /** colspan / rowspan, when > 1. */
  cs?: number;
  rs?: number;
}

export interface SpecTable {
  heading: string;
  rows: SpecCell[][];
  /** Set when the source published this section as prose rather than a table. */
  note?: string;
}

export interface SpecificationRow {
  label: string;
  value: string;
}

/** The "Specification of …" label/value block near the top of the source page. */
export interface ProductSpecification {
  heading: string;
  rows: SpecificationRow[];
}

export interface ChampakSpec {
  source: string;
  sourceTitle: string;
  equivalent?: SpecTable;
  chemical?: SpecTable;
  mechanical?: SpecTable;
  physical?: SpecTable;
  applications?: string[];
  specification?: ProductSpecification;
}

export const champakSpecs: Record<string, ChampakSpec> = `;

fs.writeFileSync(
  require('path').join(__dirname,'../../src/data/champakSpecs.ts'),
  header + JSON.stringify(out) + ';\n'
);

console.log('products written:', Object.keys(out).length);
console.log(stats);

console.log('\ncorrections applied:');
for (const rule of CORRECTIONS) {
  const slugs = applied[rule.id];
  if (!slugs) throw new Error(`correction "${rule.id}" never matched — source may have changed`);
  console.log(`  ${rule.id.padEnd(22)} ${slugs.length} page(s)`);
}
