# Champak spec-table pipeline

Generates [`src/data/champakSpecs.ts`](../../src/data/champakSpecs.ts) — the
Equivalent Grades / Chemical / Mechanical / Physical tables and the application
industries list shown on each product detail page.

## Regenerating

```bash
cd scripts/champak
curl -sL https://www.champaksteel.com/sitemap.xml -o sitemap.xml
node -e "const x=require('fs').readFileSync('sitemap.xml','utf8');require('fs').writeFileSync('urls.txt',[...x.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]).join('\n'))"
./fetch.sh          # downloads product pages into pages/ (skips ones already there)
node extract.cjs     # pages/ -> extracted.json
node generate.cjs    # extracted.json + mapping.js -> src/data/champakSpecs.ts
node audit.cjs       # sanity-check the result
```

## Files

| File | Purpose |
| --- | --- |
| `fetch.sh` | Downloads every non-blog page from the sitemap into `pages/`. |
| `lib.cjs` | HTML → text. Repairs the site's double-encoded UTF-8, maps `<sup>`/`<sub>` to unicode, preserves `colspan`/`rowspan`. |
| `extract.cjs` | Pulls the four spec tables (keyed off the `#equivalent` / `#chemical` / `#mechanical` / `#physical` anchors) plus the applications list. |
| `mapping.cjs` | **Hand-verified** map of our catalog product id → Champak page slug. |
| `generate.cjs` | Emits the TypeScript module, applying the documented row corrections. |
| `audit.cjs` | Flags chemically implausible values (e.g. carbon in a chromium range). |

## Mapping

`mapping.cjs` covers 191 of our 217 products. The rest are intentionally absent —
Champak has no equivalent page — and those product pages keep the generic
fallback data already in `ProductDetailPage.tsx`:

- Gasketing Solutions (12)
- Structural Steel (9)
- `socket-weld-elbow`, `socket-weld-tee-coupling`, `threaded-npt-elbow`,
  `swage-nipple-plugs` — generic fitting shapes, not grade pages
- `stud-bolts-nuts` — an ASTM A193 spec rather than an alloy grade

Where one of our SKUs bundles several grades (e.g. *SS 304/304L/316/316L Weld
Neck Flanges*) it maps to the first grade named in the title. Each table renders
under Champak's own heading, so the grade it describes stays explicit.

## Corrections

`generate.cjs` rewrites six demonstrably broken source rows — see `CORRECTIONS`
there for the reasoning on each. Every rule asserts the exact published values
before rewriting, so if a source page changes the generator throws rather than
silently mis-patching.
