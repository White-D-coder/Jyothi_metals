// Integrity scan of the generated tables: carbon columns holding chromium-scale
// numbers indicate a shifted row in the source data.
const fs = require('fs');
const src = fs.readFileSync(require('path').join(__dirname,'../../src/data/champakSpecs.ts'), 'utf8');
const specs = JSON.parse(src.slice(src.indexOf('= {') + 2).replace(/;\s*$/, ''));
const ours = require('./products.cjs');
const byId = {};
ours.forEach((p) => (byId[p.id] = p));

// Highest plausible weight-% for each element across the alloys in this catalogue.
const CEILING = { C: 3, Si: 6, Mn: 15, P: 1, S: 1, N: 1 };

// Handles leading-dot decimals (".10 max") and European decimal commas ("0,22").
const num = (s) => {
  const m = String(s).match(/\d*[.,]\d+|\d+/g);
  if (!m) return null;
  return Math.max(...m.map((x) => Number(x.replace(',', '.'))));
};

const hits = [];
for (const [id, spec] of Object.entries(specs)) {
  const t = spec.chemical;
  if (!t || t.rows.length < 2) continue;
  const header = t.rows[0].map((c) => c.t.trim());
  for (let ri = 1; ri < t.rows.length; ri++) {
    const row = t.rows[ri];
    if (row.length !== header.length) continue; // ragged/multi-section, skip
    for (let ci = 1; ci < row.length; ci++) {
      const el = header[ci];
      const cap = CEILING[el];
      if (cap === undefined) continue;
      const v = num(row[ci].t);
      if (v !== null && v > cap) {
        hits.push({ id, title: byId[id].title, grade: row[0].t, el, value: row[ci].t, cap, source: spec.source });
      }
    }
  }
}

if (!hits.length) {
  console.log('No implausible values found.');
} else {
  console.log('IMPLAUSIBLE VALUES (' + hits.length + '):\n');
  for (const h of hits) {
    console.log(`  ${h.title}  [${h.grade}]  ${h.el} = "${h.value}"  (max plausible ${h.cap}%)`);
    console.log(`     id=${h.id}\n     ${h.source}`);
  }
}
