// Champak Steel page parsing helpers.
// The site serves double-encoded UTF-8: real UTF-8 bytes were decoded as CP1252
// and re-encoded as UTF-8. Reversing needs CP1252 (not latin1) because of 0x80-0x9F.

const CP1252_HIGH = {
  0x20ac: 0x80, 0x201a: 0x82, 0x0192: 0x83, 0x201e: 0x84, 0x2026: 0x85,
  0x2020: 0x86, 0x2021: 0x87, 0x02c6: 0x88, 0x2030: 0x89, 0x0160: 0x8a,
  0x2039: 0x8b, 0x0152: 0x8c, 0x017d: 0x8e, 0x2018: 0x91, 0x2019: 0x92,
  0x201c: 0x93, 0x201d: 0x94, 0x2022: 0x95, 0x2013: 0x96, 0x2014: 0x97,
  0x02dc: 0x98, 0x2122: 0x99, 0x0161: 0x9a, 0x203a: 0x9b, 0x0153: 0x9c,
  0x017e: 0x9e, 0x0178: 0x9f,
};

// Undo one round of mojibake. Returns null if the string can't be round-tripped.
function undoMojibakeOnce(str) {
  const bytes = [];
  for (const ch of str) {
    const cp = ch.codePointAt(0);
    if (cp <= 0xff) bytes.push(cp);
    else if (CP1252_HIGH[cp] !== undefined) bytes.push(CP1252_HIGH[cp]);
    else return null; // char that can't come from a CP1252 byte -> not mojibake
  }
  const buf = Buffer.from(bytes);
  const out = buf.toString('utf8');
  if (out.includes('�')) return null; // invalid UTF-8 -> not mojibake
  return out;
}

// Only repair when the text actually looks double-encoded, so clean text is untouched.
function fixText(str) {
  let cur = str;
  for (let i = 0; i < 3; i++) {
    if (!/[ÂÃÐÑâ€™“”]/.test(cur)) break;
    const next = undoMojibakeOnce(cur);
    if (next === null || next === cur) break;
    cur = next;
  }
  return cur;
}

const ENTITIES = {
  '&nbsp;': ' ', '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"',
  '&apos;': "'", '&#39;': "'", '&deg;': '°', '&mdash;': '—',
  '&ndash;': '–', '&times;': '×', '&plusmn;': '±',
  '&sup2;': '²', '&sup3;': '³', '&micro;': 'µ',
  '&frac12;': '½', '&frac14;': '¼', '&rsquo;': '’',
  '&lsquo;': '‘', '&ldquo;': '“', '&rdquo;': '”', '&hellip;': '…',
};

function decodeEntities(s) {
  return s
    .replace(/&[a-zA-Z#0-9]+;/g, (m) => {
      if (ENTITIES[m] !== undefined) return ENTITIES[m];
      const num = /^&#(\d+);$/.exec(m);
      if (num) return String.fromCodePoint(Number(num[1]));
      const hex = /^&#x([0-9a-fA-F]+);$/.exec(m);
      if (hex) return String.fromCodePoint(parseInt(hex[1], 16));
      return m;
    });
}

const SUP = { '0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹','-':'⁻','+':'⁺','(':'⁽',')':'⁾','n':'ⁿ','i':'ⁱ' };
const SUB = { '0':'₀','1':'₁','2':'₂','3':'₃','4':'₄','5':'₅','6':'₆','7':'₇','8':'₈','9':'₉','-':'₋','+':'₊','(':'₍',')':'₎','m':'ₘ','n':'ₙ','a':'ₐ','x':'ₓ','e':'ₑ' };

// <sup>/<sub> carry real meaning here (10⁻⁶, lbm/in³) — map to unicode before tags are stripped.
function inlineScripts(html) {
  const conv = (map, fallback) => (_m, inner) => {
    const txt = decodeEntities(inner.replace(/<[^>]*>/g, '')).trim();
    if (!txt) return '';
    const mapped = [...txt].map((c) => map[c.toLowerCase()] ?? null);
    return mapped.every(Boolean) ? mapped.join('') : fallback(txt);
  };
  return html
    .replace(/<sup[^>]*>([\s\S]*?)<\/sup>/gi, conv(SUP, (t) => `^${t}`))
    .replace(/<sub[^>]*>([\s\S]*?)<\/sub>/gi, conv(SUB, (t) => `_${t}`));
}

// Repair encoding first: unicode super/subscripts inserted later are outside
// CP1252 and would block the mojibake round-trip.
function clean(html) {
  let s = fixText(html);
  s = inlineScripts(s);
  // Words hyphen-split across a manual line break ("Desig-<br>nation") rejoin.
  s = s.replace(/([a-z])-\s*<br\s*\/?>\s*([a-z])/gi, '$1$2');
  s = s.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]*>/g, ' ');
  s = decodeEntities(s);
  s = fixText(s);
  // Normalise the various dashes/spaces used as "no data" markers.
  s = s.replace(/ /g, ' ').replace(/[‐‑]/g, '-');
  return s.replace(/\s+/g, ' ').trim();
}

// Parse every <table> plus the nearest heading-ish text that precedes it.
function parseTables(html) {
  const out = [];
  const chunks = html.split(/<table[^>]*>/i);
  for (let i = 1; i < chunks.length; i++) {
    const body = chunks[i].split(/<\/table>/i)[0];
    // Keep colspan/rowspan — 100+ Champak tables rely on them for grouped headers.
    const rows = [...body.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map((r) =>
      [...r[1].matchAll(/<(t[hd])([^>]*)>([\s\S]*?)<\/t[hd]>/gi)].map((c) => {
        const attrs = c[2] || '';
        const cs = /colspan\s*=\s*["']?(\d+)/i.exec(attrs);
        const rs = /rowspan\s*=\s*["']?(\d+)/i.exec(attrs);
        const cell = { t: clean(c[3]) };
        if (c[1].toLowerCase() === 'th') cell.h = 1;
        if (cs && +cs[1] > 1) cell.cs = +cs[1];
        if (rs && +rs[1] > 1) cell.rs = +rs[1];
        return cell;
      })
    );
    const prev = chunks[i - 1];
    // Champak marks each spec block with <a id="equivalent|chemical|..."> then an <h2>.
    const anchors = [...prev.matchAll(/<a[^>]+id=["']([^"']+)["']/gi)];
    const heads = [...prev.matchAll(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi)];
    out.push({
      anchor: anchors.length ? anchors[anchors.length - 1][1].toLowerCase() : '',
      heading: heads.length ? clean(heads[heads.length - 1][1]) : '',
      caption: clean(prev).slice(-160),
      rows: rows.filter((r) => r.length > 0),
    });
  }
  return out;
}

module.exports = { clean, fixText, parseTables, decodeEntities };
