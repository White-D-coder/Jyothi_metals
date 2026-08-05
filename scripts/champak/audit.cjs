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

// Values the site owner chose to publish verbatim although the source page
// mis-seats them (see the SS 304H note in generate.cjs). Matched on the exact
// published text, so any change on the source page resurfaces in the audit.
const ACKNOWLEDGED = [
  { grade: '304H', el: 'C', value: 'min: 18.0 max:20.0' },
  { grade: '304H', el: 'S', value: '2.0 max' },
];
const isAcknowledged = (grade, el, value) =>
  ACKNOWLEDGED.some((a) => a.grade === grade.trim() && a.el === el && a.value === value.trim());

// Handles leading-dot decimals (".10 max") and European decimal commas ("0,22").
const num = (s) => {
  const m = String(s).match(/\d*[.,]\d+|\d+/g);
  if (!m) return null;
  return Math.max(...m.map((x) => Number(x.replace(',', '.'))));
};

const hits = [];
let acknowledged = 0;
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
        if (isAcknowledged(row[0].t, el, row[ci].t)) { acknowledged += 1; continue; }
        hits.push({ id, title: byId[id].title, grade: row[0].t, el, value: row[ci].t, cap, source: spec.source });
      }
    }
  }
}

if (acknowledged) console.log(`${acknowledged} acknowledged verbatim value(s) skipped (see ACKNOWLEDGED).`);
if (!hits.length) {
  console.log('No unexpected implausible values found.');
} else {
  console.log('IMPLAUSIBLE VALUES (' + hits.length + '):\n');
  for (const h of hits) {
    console.log(`  ${h.title}  [${h.grade}]  ${h.el} = "${h.value}"  (max plausible ${h.cap}%)`);
    console.log(`     id=${h.id}\n     ${h.source}`);
  }
}
