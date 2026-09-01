/**
 * Exports every product exactly as the website renders it into one .xlsx.
 *
 * The precedence below mirrors src/pages/ProductDetailPage.tsx one-for-one:
 * a published `champakSpecs` table always wins, and the generic generators in
 * src/data/productFallbacks.ts only fill in where no published table exists.
 * Both the page and this script import those generators from the same module,
 * so the spreadsheet cannot silently drift from the site.
 *
 * Run: node scripts/export-catalog-xlsx.mjs
 */
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import ExcelJS from 'exceljs';

import { catalogProducts } from '../src/data/catalogData.ts';
import { champakSpecs } from '../src/data/champakSpecs.ts';
import {
  getAlloyComposition,
  getMechanicalProperties,
  getPhysicalProperties,
  getCertifiedApplications,
  getManufacturingStandards,
  getEquivalentGrades,
  getScrapedGradeTableData,
  getGradeSpecification,
} from '../src/data/productFallbacks.ts';
import {
  anglesChannelsContent,
  anglesChannelsGroups,
  isAnglesChannelsProduct,
} from '../src/data/anglesChannels.ts';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'Jyothi_Metals_Product_Data.xlsx');
const SITE = 'https://jyothi-metals.vercel.app';

/* Copy rendered on every product page, held verbatim so the sheet reproduces
   what the visitor reads rather than a paraphrase. These are literals in
   src/pages/ProductDetailPage.tsx. */
const RATING_LINE = '4.9 / 5.0 (Certified ISO 9001:2015 & ASME Audit Compliant)';
const GENERIC_DESCRIPTION =
  'Manufactured and stocked by Jyoti Metal (India) to stringent ASTM, ASME, and EN standards. ' +
  'Fully solution annealed and tested for high-pressure, severe corrosion environments.';
const FEATURE_CHEMISTRY = '100% Spectral chemistry verification & heat-lot tracking';
const FEATURE_TEST_PIPE = 'Hydrostatic pressure tested & ultrasonic flaw scanned';
const FEATURE_TEST_SECTION = 'Straightness, squareness & section tolerance checked';
const FEATURE_MTC = 'EN 10204 3.1 & 3.2 Mill Test Certificate included';

const GREEN = 'FF588078';
const DARK = 'FF304050';
const LIGHT = 'FFF1F5F4';
const ZEBRA = 'FFF8F8F8';

/* ------------------------------------------------------------------ *
 * Table helpers
 * ------------------------------------------------------------------ */

/**
 * Expands a published SpecTable (which carries HTML colspan/rowspan) into a
 * rectangular grid so columns line up in Excel the way they do in the browser.
 * Returns the grid plus the merge ranges to re-apply.
 */
function expandSpecTable(table) {
  const occupied = new Set();
  const grid = [];
  const merges = [];

  table.rows.forEach((row, r) => {
    let c = 0;
    row.forEach((cell) => {
      while (occupied.has(`${r},${c}`)) c += 1;
      const cs = cell.cs || 1;
      const rs = cell.rs || 1;

      for (let dr = 0; dr < rs; dr += 1) {
        for (let dc = 0; dc < cs; dc += 1) {
          occupied.add(`${r + dr},${c + dc}`);
          if (!grid[r + dr]) grid[r + dr] = [];
          grid[r + dr][c + dc] = { text: '', header: !!cell.h };
        }
      }
      grid[r][c] = { text: cell.t, header: !!cell.h };
      if (cs > 1 || rs > 1) merges.push([r, c, r + rs - 1, c + cs - 1]);
      c += cs;
    });
  });

  const width = grid.reduce((m, row) => Math.max(m, row ? row.length : 0), 0);
  for (let r = 0; r < grid.length; r += 1) {
    if (!grid[r]) grid[r] = [];
    for (let c = 0; c < width; c += 1) {
      if (!grid[r][c]) grid[r][c] = { text: '', header: false };
    }
  }
  return { grid, merges, width };
}

/** Turns the generic {headers, rows} fallback shape into the same grid shape. */
function plainGrid(headers, rows) {
  return {
    grid: [
      headers.map((h) => ({ text: h, header: true })),
      ...rows.map((row) => row.map((v, i) => ({ text: v, header: i === 0 }))),
    ],
    merges: [],
    width: headers.length,
  };
}

/** Renders a key/value list (the vertical breakdown strips on the page). */
function kvGrid(obj) {
  return {
    grid: Object.entries(obj).map(([k, v]) => [
      { text: k, header: true },
      { text: v, header: false },
    ]),
    merges: [],
    width: 2,
  };
}

/* ------------------------------------------------------------------ *
 * Sheet writing
 * ------------------------------------------------------------------ */

function writeSectionTitle(ws, rowIdx, text, span) {
  const row = ws.getRow(rowIdx);
  const cell = row.getCell(2);
  cell.value = text;
  cell.font = { bold: true, size: 11, color: { argb: DARK } };
  cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT } };
  cell.alignment = { vertical: 'middle' };
  ws.mergeCells(rowIdx, 2, rowIdx, Math.max(3, span + 1));
  row.height = 20;
  return rowIdx + 1;
}

function writeGrid(ws, startRow, { grid, merges }) {
  grid.forEach((cells, r) => {
    const row = ws.getRow(startRow + r);
    cells.forEach((cell, c) => {
      const target = row.getCell(2 + c);
      target.value = cell.text;
      target.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      target.border = {
        top: { style: 'thin', color: { argb: 'FFD6DEDD' } },
        left: { style: 'thin', color: { argb: 'FFD6DEDD' } },
        bottom: { style: 'thin', color: { argb: 'FFD6DEDD' } },
        right: { style: 'thin', color: { argb: 'FFD6DEDD' } },
      };
      if (cell.header) {
        target.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 10 };
        target.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GREEN } };
      } else {
        target.font = { size: 10, color: { argb: DARK } };
        if (r % 2 === 1) {
          target.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: ZEBRA } };
        }
      }
    });
  });

  merges.forEach(([r1, c1, r2, c2]) => {
    ws.mergeCells(startRow + r1, 2 + c1, startRow + r2, 2 + c2);
  });

  return startRow + grid.length;
}

function writeList(ws, startRow, items) {
  items.forEach((item, i) => {
    const cell = ws.getRow(startRow + i).getCell(2);
    cell.value = `${i + 1}.  ${item}`;
    cell.font = { size: 10, color: { argb: DARK } };
    cell.alignment = { vertical: 'middle', wrapText: true };
    ws.mergeCells(startRow + i, 2, startRow + i, 7);
  });
  return startRow + items.length;
}

function writeMetaRow(ws, rowIdx, label, value, isLink) {
  const l = ws.getRow(rowIdx).getCell(2);
  l.value = label;
  l.font = { bold: true, size: 10, color: { argb: DARK } };
  l.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT } };

  const v = ws.getRow(rowIdx).getCell(3);
  if (isLink && value) {
    v.value = { text: value, hyperlink: value };
    v.font = { size: 10, color: { argb: GREEN }, underline: true };
  } else {
    v.value = value;
    v.font = { size: 10, color: { argb: DARK } };
  }
  v.alignment = { vertical: 'middle', wrapText: true };
  ws.mergeCells(rowIdx, 3, rowIdx, 10);
  return rowIdx + 1;
}

/* ------------------------------------------------------------------ *
 * Per-product resolution — mirrors ProductDetailPage render precedence
 * ------------------------------------------------------------------ */

function resolveProduct(p) {
  const spec = champakSpecs[p.id];
  const scraped = getScrapedGradeTableData(p.title);

  // Mirrors `showMaterialSpecs` in ProductDetailPage: Gasketing Solutions items
  // are fibre/graphite/PTFE composites with no source page, so the site shows
  // none of the three material-property sections rather than falling through to
  // the generic stainless tables. The sheet has to omit them for the same
  // reason, otherwise it stops describing what the site actually publishes.
  // Angles & Channels is suppressed for a different reason: those pages publish
  // a profile/size specification panel and a grade line-up only, by request.
  const noMaterialSpecs =
    p.category === 'Gasketing Solutions' || p.category === 'Angles & Channels';

  const isAC = isAnglesChannelsProduct(p);
  const acContent = anglesChannelsContent[p.id] ?? null;

  return {
    ...p,
    spec,
    isPublished: !!spec,
    sourceUrl: spec?.source || '',
    sourceTitle: spec?.sourceTitle || '',
    pageUrl: `${SITE}/product-detail?id=${encodeURIComponent(p.id)}`,

    // A published product shows a section only when its source page has it —
    // `null` means the section is omitted on the site. Generic fallbacks are
    // reserved for products with no source page at all.
    equivalent: p.category === 'Angles & Channels'
      ? null
      : spec
      ? (spec.equivalent
          ? { kind: 'table', heading: spec.equivalent.heading, data: expandSpecTable(spec.equivalent), note: spec.equivalent.note }
          : null)
      : { kind: 'chips', heading: 'International Equivalent Grades', items: getEquivalentGrades(p.title) },

    chemical: noMaterialSpecs ? null : spec
      ? (spec.chemical
          ? { kind: 'table', heading: spec.chemical.heading, data: expandSpecTable(spec.chemical), note: spec.chemical.note }
          : null)
      : {
          kind: 'fallback',
          heading: `CHEMICAL COMPOSITION OF STAINLESS STEEL ${p.title.toUpperCase()}`,
          data: plainGrid(scraped.chemHeaders, scraped.chemRows),
          breakdown: kvGrid(getAlloyComposition(p.title)),
        },

    mechanical: noMaterialSpecs ? null : spec
      ? (spec.mechanical
          ? { kind: 'table', heading: spec.mechanical.heading, data: expandSpecTable(spec.mechanical), note: spec.mechanical.note }
          : null)
      : {
          kind: 'fallback',
          heading: `MECHANICAL PROPERTIES OF STAINLESS STEEL ${p.title.toUpperCase()}`,
          data: plainGrid(scraped.mechHeaders, scraped.mechRows),
          breakdown: kvGrid(getMechanicalProperties(p.title)),
        },

    physical: noMaterialSpecs ? null : spec
      ? (spec.physical
          ? { kind: 'table', heading: spec.physical.heading, data: expandSpecTable(spec.physical), note: spec.physical.note }
          : null)
      : { kind: 'fallback', heading: 'Physical & Thermal Properties', data: kvGrid(getPhysicalProperties(p.title)) },

    // --- Copy the visitor reads above the spec tabs ---------------------
    ratingLine: RATING_LINE,
    description: acContent ? acContent.description : GENERIC_DESCRIPTION,
    keyFeatures: [FEATURE_CHEMISTRY, isAC ? FEATURE_TEST_SECTION : FEATURE_TEST_PIPE, FEATURE_MTC],
    // The "<Product> Grades and Specification" panel.
    gradeSpec: acContent
      ? { heading: acContent.specHeading, rows: acContent.specRows }
      : getGradeSpecification(p),
    // Third block on an Angles & Channels page; no other category renders it.
    gradeLineUp: isAC ? anglesChannelsGroups[p.subCat] ?? null : null,

    // Angles & Channels also suppress the applications list and the whole
    // standards footer (ProductDetailPage guards both with `!isAnglesChannels`),
    // so the export must drop them or the sheet claims content the page never
    // renders.
    applications: isAC ? [] : spec ? spec.applications ?? [] : getCertifiedApplications(p.title),
    applicationsArePublished: !isAC && !!spec?.applications,
    // The source page's "Specification of …" block. Published products show
    // this (or nothing when the source page has none); only products without
    // a published source fall back to the generic standards chips.
    specification: isAC ? null : spec?.specification ?? null,
    standards: isAC || spec ? null : getManufacturingStandards(p.title),
  };
}


/* ------------------------------------------------------------------ *
 * Flat-sheet serialisers
 *
 * The category sheets lay each table out as a real grid. The flat sheet has to
 * fit the same table inside ONE cell, so a grid becomes pipe-separated columns
 * and newline-separated rows — readable in Excel with wrap on, and still
 * parseable if the sheet is fed into another system.
 * ------------------------------------------------------------------ */

/** `{grid}` (from expandSpecTable/plainGrid/kvGrid) -> one text block. */
function gridToText(data) {
  if (!data || !data.grid || !data.grid.length) return '';
  return data.grid
    .map((row) => row.map((cell) => (cell.text ?? '').toString().trim()).join(' | '))
    .filter((line) => line.replace(/[|\s]/g, '').length)
    .join('\n');
}

/** A resolved section ({kind, heading, data, ...}) -> heading + table text. */
function sectionToText(section, omittedNote) {
  if (!section) return omittedNote;
  const parts = [];
  if (section.heading) parts.push(section.heading);
  if (section.kind === 'chips') {
    parts.push(section.items.join('  |  '));
  } else {
    const body = gridToText(section.data);
    if (body) parts.push(body);
    if (section.note) parts.push(`Note: ${section.note}`);
    // The generic chemical/mechanical tabs repeat themselves as a key/value
    // strip under the table; the page shows both, so the sheet does too.
    if (section.breakdown) {
      const bd = gridToText(section.breakdown);
      if (bd) parts.push('', 'Breakdown:', bd);
    }
  }
  return parts.join('\n');
}

/** The "Grades and Specification" panel -> label: value lines. */
function specPanelToText(panel) {
  if (!panel || !panel.rows || !panel.rows.length) return '';
  return [panel.heading, ...panel.rows.map((r) => `${r.label}: ${r.value}`)].join('\n');
}

/* ------------------------------------------------------------------ *
 * Build
 * ------------------------------------------------------------------ */

const products = catalogProducts.map(resolveProduct);

const categories = [...new Set(products.map((p) => p.category))];

const wb = new ExcelJS.Workbook();
wb.creator = 'Jyoti Metal (India) — website data export';
wb.created = new Date(Number(process.env.SOURCE_DATE_EPOCH || 0) * 1000 || Date.now());

/* --- Sheet: How to read --- */
{
  const ws = wb.addWorksheet('How To Read', { properties: { tabColor: { argb: DARK } } });
  ws.getColumn(2).width = 30;
  ws.getColumn(3).width = 110;

  const title = ws.getRow(2).getCell(2);
  title.value = 'JYOTI METAL (INDIA) — WEBSITE PRODUCT DATA';
  title.font = { bold: true, size: 16, color: { argb: DARK } };
  ws.mergeCells(2, 2, 2, 3);

  const lines = [
    ['What this file is', 'Every product exactly as it appears on the live website. Nothing added, nothing summarised.'],
    ['Total products', String(products.length)],
    ['Categories', `${categories.length} — one worksheet each`],
    ['Applications are complete', 'Both the All Page Data sheet and the category sheets list EVERY application industry for a product. The website itself shows only the first four and hides the rest behind a "View More" link, so a sheet row will often carry more entries than the page shows on first paint — that is the sheet being complete, not wrong. Counts are 10 for products with a published source, 5 for products on generic data, 8 for Armour Steel Plates, and none for Angles & Channels (that category renders no applications block at all).'],
    ['Suppressed sections', 'Gasketing Solutions products show no chemical, mechanical or physical data, and Angles & Channels show none of those plus no equivalent grades, no applications and no standards block — the site deliberately hides them (a jointing sheet has no alloy chemistry; a structural section is picked on profile and size). Those cells read "Not shown on this product page" and that is correct, not missing data.'],
    ['All Page Data sheet', 'One row per product holding EVERY field the visitor can read on that product page — description, key features, rating line, card chips, the Grades & Specification panel, all five spec tabs, the standards block and the Angles & Channels grade line-up. Tables are flattened into a single cell: columns separated by " | ", rows by a line break. Rows are height-capped so the sheet scrolls; drag a row taller to read a long cell in full. "Not shown on this product page" means the site genuinely renders nothing there — see Suppressed sections.'],
    ['Product Index sheet', 'A shorter one-row-per-product summary: which sections exist and where the data came from, without the table contents.'],
    ['Category sheets', 'Each product is a block: heading row, then the same five tabs the website shows (Equivalent Grades, Chemical Composition, Mechanical Properties, Physical Properties, Applications) plus the Manufacturing Standards & Specification block — the source page\'s own specification list for PUBLISHED products (omitted when the source page has none), generic standards chips only for GENERIC products.'],
    ['"Data Source" column', 'PUBLISHED = the real spec tables sourced from champaksteel.com, shown verbatim on the site. A PUBLISHED product whose source page lacks a section shows nothing for it — marked "omitted" in the index and category sheets. GENERIC = the product has no champaksteel.com page at all, so the site falls back to family-level default data (e.g. every non-316/duplex/titanium item shows the same SS 304 table). Check GENERIC rows first — those are the ones most likely to need real data.'],
    ['Website link', 'Each product block carries a clickable link to its live page, so you can compare side by side.'],
    ['Regenerate', 'node scripts/export-catalog-xlsx.mjs — re-run any time the site data changes.'],
  ];

  let r = 4;
  lines.forEach(([k, v]) => {
    r = writeMetaRow(ws, r, k, v, false);
    r += 1;
  });
}

/* --- Sheet: All Page Data ---------------------------------------------
 * One row per product carrying every field a visitor can read on that
 * product's page, tables included. This is the sheet to open for the whole
 * site's product copy at once; the category sheets remain the place to read
 * one product's tables laid out properly.
 * --------------------------------------------------------------------- */
{
  const ws = wb.addWorksheet('All Page Data', {
    properties: { tabColor: { argb: DARK } },
    views: [{ state: 'frozen', xSplit: 4, ySplit: 1 }],
  });

  const OMITTED = 'Not shown on this product page';

  ws.columns = [
    { header: '#', key: 'n', width: 5 },
    { header: 'Category', key: 'cat', width: 20 },
    { header: 'Sub-Category', key: 'sub', width: 34 },
    { header: 'Product Name', key: 'title', width: 42 },
    { header: 'Product ID', key: 'id', width: 30 },
    { header: 'Description', key: 'desc', width: 70 },
    { header: 'Key Features', key: 'feat', width: 46 },
    { header: 'Rating Line', key: 'rating', width: 30 },
    { header: 'Card Spec Chips', key: 'chips', width: 40 },
    { header: 'Grades & Specification', key: 'gradespec', width: 70 },
    { header: 'Equivalent Grades', key: 'eq', width: 60 },
    { header: 'Chemical Composition', key: 'chem', width: 70 },
    { header: 'Mechanical Properties', key: 'mech', width: 70 },
    { header: 'Physical Properties', key: 'phys', width: 50 },
    { header: 'Applications', key: 'apps', width: 55 },
    { header: 'Manufacturing Standards / Specification', key: 'std', width: 60 },
    { header: 'Grade Line-Up', key: 'lineup', width: 50 },
    { header: 'Image File', key: 'img', width: 42 },
    { header: 'Data Source', key: 'src', width: 13 },
    { header: 'Live Page', key: 'page', width: 26 },
    { header: 'Source Reference', key: 'ref', width: 52 },
  ];

  const head = ws.getRow(1);
  head.height = 32;
  head.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 10 };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK } };
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
  });

  products.forEach((p, i) => {
    const standards = p.specification
      ? specPanelToText({ heading: p.specification.heading, rows: p.specification.rows })
      : p.standards
      ? p.standards.join('  |  ')
      : OMITTED;

    const row = ws.addRow({
      n: i + 1,
      cat: p.category,
      sub: p.subCat,
      title: p.title,
      id: p.id,
      desc: p.description,
      feat: p.keyFeatures.map((f) => `• ${f}`).join('\n'),
      rating: p.ratingLine,
      chips: p.specs.map((c) => `• ${c}`).join('\n'),
      gradespec: specPanelToText(p.gradeSpec) || OMITTED,
      eq: sectionToText(p.equivalent, OMITTED),
      chem: sectionToText(p.chemical, OMITTED),
      mech: sectionToText(p.mechanical, OMITTED),
      phys: sectionToText(p.physical, OMITTED),
      apps: p.applications.length ? p.applications.map((a) => `• ${a}`).join('\n') : OMITTED,
      std: standards,
      lineup: p.gradeLineUp
        ? [p.gradeLineUp.heading, ...p.gradeLineUp.grades.map((g) => `• ${g}`)].join('\n')
        : OMITTED,
      img: p.image,
      src: p.isPublished ? 'PUBLISHED' : 'GENERIC',
      page: { text: 'Open page', hyperlink: p.pageUrl },
      ref: p.sourceUrl ? { text: p.sourceTitle || p.sourceUrl, hyperlink: p.sourceUrl } : '—',
    });

    // Top-aligned + wrapped: these cells hold whole tables, so a vertically
    // centred cell would leave the first line floating mid-row.
    row.eachCell({ includeEmpty: true }, (cell) => {
      cell.font = { size: 10, color: { argb: DARK } };
      cell.alignment = { vertical: 'top', wrapText: true };
      cell.border = { bottom: { style: 'hair', color: { argb: 'FFD8E0DE' } } };
      if (i % 2 === 1) cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: ZEBRA } };
    });

    row.getCell('title').font = { size: 10, bold: true, color: { argb: DARK } };
    const srcCell = row.getCell('src');
    srcCell.alignment = { vertical: 'top', horizontal: 'center' };
    srcCell.font = { size: 10, bold: true, color: { argb: p.isPublished ? 'FF1B7F5A' : 'FFB45309' } };
    srcCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: p.isPublished ? 'FFE7F5EF' : 'FFFEF3C7' } };
    row.getCell('page').font = { size: 10, color: { argb: GREEN }, underline: true };
    if (p.sourceUrl) row.getCell('ref').font = { size: 10, color: { argb: GREEN }, underline: true };

    // Height-capped rather than auto-fit: a full chemistry table would push one
    // row past a screen and make the sheet unscrollable. Drag a row taller in
    // Excel to read a long cell in full.
    row.height = 118;
  });

  ws.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: ws.columns.length } };
}

/* --- Sheet: Product Index --- */
{
  const ws = wb.addWorksheet('Product Index', { properties: { tabColor: { argb: GREEN } }, views: [{ state: 'frozen', ySplit: 1 }] });

  ws.columns = [
    { header: '#', key: 'n', width: 6 },
    { header: 'Product ID', key: 'id', width: 26 },
    { header: 'Product Title', key: 'title', width: 46 },
    { header: 'Category', key: 'cat', width: 22 },
    { header: 'Sub-Category', key: 'sub', width: 40 },
    { header: 'Card Spec Chips (shown on catalogue card)', key: 'chips', width: 46 },
    { header: 'Data Source', key: 'src', width: 14 },
    { header: 'Equivalent Grades', key: 'eq', width: 17 },
    { header: 'Chemical Comp.', key: 'chem', width: 16 },
    { header: 'Mechanical Prop.', key: 'mech', width: 17 },
    { header: 'Physical Prop.', key: 'phys', width: 15 },
    { header: 'Applications', key: 'apps', width: 14 },
    { header: 'Image File', key: 'img', width: 40 },
    { header: 'Live Page', key: 'page', width: 30 },
    { header: 'Source Reference', key: 'ref', width: 60 },
  ];

  const head = ws.getRow(1);
  head.height = 30;
  head.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 10 };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GREEN } };
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
  });

  products.forEach((p, i) => {
    const row = ws.addRow({
      n: i + 1,
      id: p.id,
      title: p.title,
      cat: p.category,
      sub: p.subCat,
      chips: p.specs.join('  |  '),
      src: p.isPublished ? 'PUBLISHED' : 'GENERIC',
      eq: p.equivalent ? (p.equivalent.kind === 'table' ? 'Published table' : 'Generic chips') : '— omitted',
      chem: p.chemical ? (p.chemical.kind === 'table' ? 'Published table' : 'Generic table') : '— omitted',
      mech: p.mechanical ? (p.mechanical.kind === 'table' ? 'Published table' : 'Generic table') : '— omitted',
      phys: p.physical ? (p.physical.kind === 'table' ? 'Published table' : 'Generic list') : '— omitted',
      apps: p.applicationsArePublished ? `Published (${p.applications.length})` : p.applications.length ? `Generic (${p.applications.length})` : '— omitted',
      img: p.image,
      page: { text: 'Open page', hyperlink: p.pageUrl },
      ref: p.sourceUrl ? { text: p.sourceTitle || p.sourceUrl, hyperlink: p.sourceUrl } : '—',
    });

    row.eachCell({ includeEmpty: true }, (cell) => {
      cell.font = { size: 10, color: { argb: DARK } };
      cell.alignment = { vertical: 'middle', wrapText: true };
      if (i % 2 === 1) cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: ZEBRA } };
    });

    // Flag the generic rows — these are the ones worth checking first.
    const srcCell = row.getCell('src');
    srcCell.alignment = { vertical: 'middle', horizontal: 'center' };
    srcCell.font = { size: 10, bold: true, color: { argb: p.isPublished ? 'FF1B7F5A' : 'FFB45309' } };
    srcCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: p.isPublished ? 'FFE7F5EF' : 'FFFEF3C7' } };

    row.getCell('page').font = { size: 10, color: { argb: GREEN }, underline: true };
    if (p.sourceUrl) row.getCell('ref').font = { size: 10, color: { argb: GREEN }, underline: true };
  });

  ws.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: ws.columns.length } };
}

/* --- One sheet per category --- */
const sheetNameFor = (cat) => cat.replace(/[\\/*?[\]:]/g, '-').slice(0, 31);

categories.forEach((cat) => {
  const ws = wb.addWorksheet(sheetNameFor(cat), { views: [{ showGridLines: false }] });
  ws.getColumn(1).width = 3;
  ws.getColumn(2).width = 34;
  for (let c = 3; c <= 14; c += 1) ws.getColumn(c).width = 20;

  const items = products.filter((p) => p.category === cat);
  let r = 2;

  const banner = ws.getRow(r).getCell(2);
  banner.value = `${cat.toUpperCase()}  —  ${items.length} PRODUCTS`;
  banner.font = { bold: true, size: 15, color: { argb: 'FFFFFFFF' } };
  banner.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK } };
  banner.alignment = { vertical: 'middle', indent: 1 };
  ws.getRow(r).height = 28;
  ws.mergeCells(r, 2, r, 10);
  r += 3;

  items.forEach((p, idx) => {
    // Product heading
    const h = ws.getRow(r).getCell(2);
    h.value = `${idx + 1}.  ${p.title}`;
    h.font = { bold: true, size: 13, color: { argb: 'FFFFFFFF' } };
    h.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GREEN } };
    h.alignment = { vertical: 'middle', indent: 1 };
    ws.getRow(r).height = 24;
    ws.mergeCells(r, 2, r, 10);
    r += 1;

    r = writeMetaRow(ws, r, 'Product ID', p.id, false);
    r = writeMetaRow(ws, r, 'Sub-Category', p.subCat, false);
    r = writeMetaRow(ws, r, 'Card Spec Chips', p.specs.join('  |  '), false);
    r = writeMetaRow(ws, r, 'Image File', p.image, false);
    r = writeMetaRow(
      ws, r, 'Data Source',
      p.isPublished
        ? `PUBLISHED — real spec tables (${p.sourceTitle})`
        : 'GENERIC — no published table for this product; site shows family-level default data',
      false
    );
    if (p.sourceUrl) r = writeMetaRow(ws, r, 'Source Reference', p.sourceUrl, true);
    r = writeMetaRow(ws, r, 'Live Page', p.pageUrl, true);
    r += 1;

    // A null section means the source page has no such table, so the site
    // shows nothing — the marker row records that this is deliberate.
    const OMITTED = 'not on the source page — section omitted on site';

    // Tab 1 — Equivalent Grades
    if (!p.equivalent) {
      r = writeSectionTitle(ws, r, `TAB 1 — EQUIVALENT GRADES:  ${OMITTED}`, 4);
    } else if (p.equivalent.kind === 'table') {
      r = writeSectionTitle(ws, r, `TAB 1 — EQUIVALENT GRADES:  ${p.equivalent.heading}`, p.equivalent.data.width);
      r = p.equivalent.note && !p.equivalent.data.grid.length
        ? writeList(ws, r, [p.equivalent.note])
        : writeGrid(ws, r, p.equivalent.data);
    } else {
      r = writeSectionTitle(ws, r, `TAB 1 — INTERNATIONAL EQUIVALENT GRADES  (generic)`, 4);
      r = writeList(ws, r, p.equivalent.items);
    }
    r += 1;

    // Tab 2 — Chemical Composition
    if (!p.chemical) {
      r = writeSectionTitle(ws, r, `TAB 2 — CHEMICAL COMPOSITION:  ${OMITTED}`, 4);
    } else {
      r = writeSectionTitle(ws, r, `TAB 2 — CHEMICAL COMPOSITION:  ${p.chemical.heading}`, p.chemical.data.width);
      r = writeGrid(ws, r, p.chemical.data);
      if (p.chemical.kind === 'fallback') {
        r += 1;
        r = writeSectionTitle(ws, r, 'Composition breakdown list (as shown below the table)', 2);
        r = writeGrid(ws, r, p.chemical.breakdown);
      }
    }
    r += 1;

    // Tab 3 — Mechanical Properties
    if (!p.mechanical) {
      r = writeSectionTitle(ws, r, `TAB 3 — MECHANICAL PROPERTIES:  ${OMITTED}`, 4);
    } else {
      r = writeSectionTitle(ws, r, `TAB 3 — MECHANICAL PROPERTIES:  ${p.mechanical.heading}`, p.mechanical.data.width);
      r = writeGrid(ws, r, p.mechanical.data);
      if (p.mechanical.kind === 'fallback') {
        r += 1;
        r = writeSectionTitle(ws, r, 'Mechanical breakdown list (as shown below the table)', 2);
        r = writeGrid(ws, r, p.mechanical.breakdown);
      }
    }
    r += 1;

    // Tab 4 — Physical Properties
    if (!p.physical) {
      r = writeSectionTitle(ws, r, `TAB 4 — PHYSICAL PROPERTIES:  ${OMITTED}`, 4);
    } else {
      r = writeSectionTitle(ws, r, `TAB 4 — PHYSICAL PROPERTIES:  ${p.physical.heading}`, p.physical.data.width);
      r = writeGrid(ws, r, p.physical.data);
    }
    r += 1;

    // Tab 5 — Applications
    if (!p.applications.length) {
      r = writeSectionTitle(ws, r, `TAB 5 — CERTIFIED APPLICATION INDUSTRIES:  ${OMITTED}`, 6);
    } else {
      r = writeSectionTitle(ws, r, `TAB 5 — CERTIFIED APPLICATION INDUSTRIES${p.applicationsArePublished ? '' : '  (generic)'}`, 6);
      r = writeList(ws, r, p.applications);
    }
    r += 1;

    // Manufacturing standards & specification — the source page's own
    // "Specification of …" block for published products (omitted entirely when
    // the source page has none), generic chips only for unpublished products.
    if (p.specification) {
      r = writeSectionTitle(ws, r, `MANUFACTURING STANDARDS & SPECIFICATION:  ${p.specification.heading}`, 6);
      r = writeGrid(ws, r, {
        grid: p.specification.rows.map((row) => [
          { text: row.label, header: true },
          { text: row.value, header: false },
        ]),
        merges: p.specification.rows.map((_, i) => [i, 1, i, 6]),
        width: 7,
      });
    } else if (p.standards) {
      r = writeSectionTitle(ws, r, 'MANUFACTURING STANDARDS  (generic)', 6);
      const stdCell = ws.getRow(r).getCell(2);
      stdCell.value = p.standards.join('   |   ');
      stdCell.font = { size: 10, color: { argb: DARK } };
      ws.mergeCells(r, 2, r, 7);
      r += 1;
    }
    r += 3;
  });
});

await wb.xlsx.writeFile(OUT);

const generic = products.filter((p) => !p.isPublished);
console.log(`Wrote ${OUT}`);
console.log(`  ${products.length} products across ${categories.length} categories`);
console.log(`  ${products.length - generic.length} with published spec tables, ${generic.length} on generic fallback data`);
if (generic.length) {
  console.log('  Generic-data products:');
  generic.forEach((p) => console.log(`    - [${p.category}] ${p.title}`));
}
