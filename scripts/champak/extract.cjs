// Extract the five spec sections from every downloaded Champak page.
const fs = require('fs');
const { clean, parseTables } = require('./lib.cjs');

// Navigation / footer lists we must never mistake for an applications list.
const NAV_ITEMS = /^(home|about us|quality|contact us|blog|products|sitemap|disclaimer)$/i;
const NAV_LIKE = /(pipes & tubes|sheets and plates|round bars|flanges|buttweld fittings|forged fittings|fasteners|specialized product|hollow section)/i;

// Prefer the section anchor id; fall back to the heading text above the table.
function classify(t) {
  const a = t.anchor;
  if (a === 'equivalent' || a === 'chemical' || a === 'mechanical' || a === 'physical') return a;
  const c = (t.heading || t.caption).toLowerCase();
  if (/equivalent grade/.test(c)) return 'equivalent';
  if (/chemical composition|chemical analysis/.test(c)) return 'chemical';
  if (/mechanical propert/.test(c)) return 'mechanical';
  if (/physical propert/.test(c)) return 'physical';
  return null;
}

function extractApplications(html) {
  const parts = html.split(/<ul[^>]*>/i);
  for (let i = 1; i < parts.length; i++) {
    const before = clean(parts[i - 1]).toLowerCase();
    const tail = before.slice(-260);
    const looksLikeApps =
      /(applications?|industries|used in)/.test(tail) &&
      /(below are|few of them|wide range|following|various industries|application industries)/.test(tail);
    if (!looksLikeApps) continue;
    const body = parts[i].split(/<\/ul>/i)[0];
    const items = [...body.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
      .map((m) => clean(m[1]))
      .filter(Boolean);
    if (items.length < 3 || items.length > 30) continue;
    if (items.some((it) => NAV_ITEMS.test(it))) continue;
    if (items.filter((it) => NAV_LIKE.test(it)).length > items.length / 2) continue;
    return items;
  }
  return null;
}

function extractPage(html) {
  const out = { equivalent: null, chemical: null, mechanical: null, physical: null, applications: null };
  for (const t of parseTables(html)) {
    const kind = classify(t);
    if (!kind || out[kind]) continue; // keep the first of each kind
    const rows = t.rows.filter((r) => r.some((c) => c.t !== ''));
    if (!rows.length) continue;
    out[kind] = { heading: t.heading, rows };
  }
  // A few sections are written as prose instead of a table (e.g. the NACE+HIC
  // plate mechanical properties). Capture those so the tab isn't left empty.
  for (const kind of ['equivalent', 'chemical', 'mechanical', 'physical']) {
    if (out[kind]) continue;
    const seg = new RegExp(
      `<a[^>]+id=["']${kind}["'][^>]*></a>([\\s\\S]*?)(?=<a[^>]+id=["']|<footer)`,
      'i'
    ).exec(html);
    if (!seg || /<table/i.test(seg[1])) continue;
    const headMatch = /<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/i.exec(seg[1]);
    const note = clean(seg[1].replace(/<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/i, ''));
    if (note.length < 40) continue;
    out[kind] = { heading: headMatch ? clean(headMatch[1]) : '', rows: [], note };
  }

  out.applications = extractApplications(html);
  const titleMatch = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  out.pageTitle = titleMatch ? clean(titleMatch[1]) : '';
  return out;
}

if (require.main === module) {
  const files = fs.readdirSync('pages').filter((f) => f.endsWith('.html'));
  const db = {};
  const stats = { equivalent: 0, chemical: 0, mechanical: 0, physical: 0, applications: 0 };
  for (const f of files) {
    const slug = f.replace(/\.html$/, '');
    const rec = extractPage(fs.readFileSync('pages/' + f, 'utf8'));
    db[slug] = rec;
    for (const k of Object.keys(stats)) if (rec[k]) stats[k]++;
  }
  fs.writeFileSync('extracted.json', JSON.stringify(db, null, 1));
  console.log('pages:', files.length);
  console.log(stats);
}

module.exports = { extractPage };
