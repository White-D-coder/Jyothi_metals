import type { ScrapedProductData, ScrapedTable } from './types';

/**
 * Normalizes HTML string content and extracts structured technical product details.
 */
export function parseProductHtml(url: string, htmlContent: string): ScrapedProductData {
  // Utility slug generator
  const slug = url
    .split('/')
    .pop()
    ?.replace(/\.html?$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || `product-${Date.now()}`;

  // 1. Basic Title & Meta Extractions
  const titleMatch = htmlContent.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const rawTitle = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : 'Stainless Steel Product';

  const metaTitleMatch = htmlContent.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const metaTitle = metaTitleMatch ? metaTitleMatch[1].replace(/<[^>]+>/g, '').trim() : rawTitle;

  const metaDescMatch = htmlContent.match(/<meta[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["']/i);
  const metaDescription = metaDescMatch ? metaDescMatch[1].trim() : `${rawTitle} supplier and manufacturer specifications.`;

  // Determine Category based on Title & URL keywords
  const titleLower = (rawTitle + ' ' + url).toLowerCase();
  let category = 'Pipes & Tubes';
  if (titleLower.includes('sheet') || titleLower.includes('plate') || titleLower.includes('coil')) {
    category = 'Sheets & Plates';
  } else if (titleLower.includes('round bar') || titleLower.includes('rod')) {
    category = 'Round Bars';
  } else if (titleLower.includes('flange')) {
    category = 'Flanges';
  } else if (titleLower.includes('fitting')) {
    category = 'Pipe Fittings';
  } else if (titleLower.includes('fastener') || titleLower.includes('bolt') || titleLower.includes('nut')) {
    category = 'Fasteners';
  }

  // 2. Real Image Parsing from HTML
  const imgMatches = Array.from(htmlContent.matchAll(/<img[^>]*src=["']([\s\S]*?)["']/gi));
  const extractedImages: string[] = [];
  for (const m of imgMatches) {
    let src = m[1].trim();
    if (src.startsWith('/')) {
      src = `https://www.champaksteel.com${src}`;
    } else if (!src.startsWith('http')) {
      src = `https://www.champaksteel.com/${src}`;
    }
    if (src.match(/\.(jpg|jpeg|png|webp)/i) && !extractedImages.includes(src) && !src.includes('logo') && !src.includes('banner')) {
      extractedImages.push(src);
    }
  }

  const mainImage = extractedImages[0] || '/images/stainless_pipes.png';
  const galleryImages = extractedImages.length > 0 ? extractedImages : [mainImage];

  // 3. Complete HTML Table Parsing
  const tables: ScrapedTable[] = [];
  const tableRegex = /<table[^>]*>([\s\S]*?)<\/table>/gi;
  let tMatch;
  let tableIdx = 1;

  while ((tMatch = tableRegex.exec(htmlContent)) !== null) {
    const tableHtml = tMatch[1];
    const rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
    const rowsRaw: string[][] = [];
    let rMatch;

    while ((rMatch = rowRegex.exec(tableHtml)) !== null) {
      const cellRegex = /<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi;
      const cells: string[] = [];
      let cMatch;
      while ((cMatch = cellRegex.exec(rMatch[1])) !== null) {
        cells.push(cMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
      }
      if (cells.length > 0) {
        rowsRaw.push(cells);
      }
    }

    if (rowsRaw.length > 1) {
      const headers = rowsRaw[0];
      const rows: Record<string, string>[] = [];
      for (let i = 1; i < rowsRaw.length; i++) {
        const rowObj: Record<string, string> = {};
        headers.forEach((h, idx) => {
          const colName = h || `Col_${idx + 1}`;
          rowObj[colName] = rowsRaw[i][idx] || '-';
        });
        rows.push(rowObj);
      }
      tables.push({
        title: `Specification Table ${tableIdx++}`,
        headers,
        rows,
      });
    }
  }

  // 4. Dynamic Chemical Composition Extraction from HTML Tables
  const chemicalComposition: { grade?: string; element: string; value: string }[] = [];
  const chemTable = tables.find((t) =>
    t.headers.some((h) => {
      const hl = h.toLowerCase();
      return (
        hl === 'c' ||
        hl === 'cr' ||
        hl === 'ni' ||
        hl === 'mn' ||
        hl === 'si' ||
        hl === 'p' ||
        hl === 's' ||
        hl.includes('chemical')
      );
    })
  );

  if (chemTable && chemTable.rows.length > 0) {
    chemTable.rows.forEach((row) => {
      const grade = row['Grade'] || row[''] || row['Element'] || undefined;
      Object.entries(row).forEach(([colKey, val]) => {
        const keyLower = colKey.toLowerCase().trim();
        if (['c', 'mn', 'si', 'p', 's', 'cr', 'ni', 'mo', 'n', 'other elements', 'ti'].includes(keyLower)) {
          let elementName = colKey;
          if (keyLower === 'c') elementName = 'Carbon (C)';
          else if (keyLower === 'mn') elementName = 'Manganese (Mn)';
          else if (keyLower === 'si') elementName = 'Silicon (Si)';
          else if (keyLower === 'p') elementName = 'Phosphorus (P)';
          else if (keyLower === 's') elementName = 'Sulfur (S)';
          else if (keyLower === 'cr') elementName = 'Chromium (Cr)';
          else if (keyLower === 'ni') elementName = 'Nickel (Ni)';
          else if (keyLower === 'mo') elementName = 'Molybdenum (Mo)';
          else if (keyLower === 'n') elementName = 'Nitrogen (N)';

          chemicalComposition.push({
            grade,
            element: elementName,
            value: val,
          });
        }
      });
    });
  }

  // Fallback defaults if no chemical table was in HTML
  if (chemicalComposition.length === 0) {
    chemicalComposition.push(
      { element: 'Carbon (C)', value: '0.08% Max' },
      { element: 'Manganese (Mn)', value: '2.00% Max' },
      { element: 'Silicon (Si)', value: '0.75% Max' },
      { element: 'Chromium (Cr)', value: '18.00 - 20.00%' },
      { element: 'Nickel (Ni)', value: '8.00 - 10.50%' },
      { element: 'Phosphorus (P)', value: '0.045% Max' },
      { element: 'Sulfur (S)', value: '0.030% Max' }
    );
  }

  // 5. Dynamic Mechanical Properties Extraction from HTML Tables
  const mechanicalProperties: {
    grade?: string;
    tensileStrength?: string;
    yieldStrength?: string;
    elongation?: string;
    hardnessBrinell?: string;
    hardnessRockwell?: string;
  }[] = [];

  const mechTable = tables.find((t) =>
    t.headers.some((h) => {
      const hl = h.toLowerCase();
      return (
        hl.includes('tensile') ||
        hl.includes('yield') ||
        hl.includes('elongation') ||
        hl.includes('hardness') ||
        hl.includes('ksi') ||
        hl.includes('mpa') ||
        hl.includes('mechanical')
      );
    })
  );

  if (mechTable && mechTable.rows.length > 0) {
    mechTable.rows.forEach((row) => {
      const grade = row['Grade'] || row['Element'] || row['Element / Grade'] || undefined;
      let tensile = '';
      let yieldStr = '';
      let elongation = '';
      let hBrinell = '';
      let hRockwell = '';

      Object.entries(row).forEach(([colKey, val]) => {
        const k = colKey.toLowerCase();
        if (k.includes('tensile')) tensile = val;
        else if (k.includes('yield')) yieldStr = val;
        else if (k.includes('elongation')) elongation = val;
        else if (k.includes('brinell')) hBrinell = val;
        else if (k.includes('rockwell') || k.includes('hrb') || k.includes('hrc')) hRockwell = val;
        else if (k.includes('hardness') && !hBrinell) hBrinell = val;
      });

      mechanicalProperties.push({
        grade,
        tensileStrength: tensile || '515 MPa Min',
        yieldStrength: yieldStr || '205 MPa Min',
        elongation: elongation || '40% Min',
        hardnessBrinell: hBrinell || '201 HB Max',
        hardnessRockwell: hRockwell || '92 HRB Max',
      });
    });
  }

  if (mechanicalProperties.length === 0) {
    mechanicalProperties.push({
      grade: rawTitle,
      tensileStrength: '515 MPa Min',
      yieldStrength: '205 MPa Min',
      elongation: '40% Min',
      hardnessBrinell: '201 HB Max',
      hardnessRockwell: '92 HRB Max',
    });
  }

  // 6. Dynamic Physical Properties
  const physicalProperties = [
    { propertyName: 'Density', value: titleLower.includes('titanium') ? '4.43 g/cm³' : '8.00 g/cm³' },
    { propertyName: 'Melting Point', value: titleLower.includes('titanium') ? '1604 - 1660 °C' : '1400 - 1450 °C' },
    { propertyName: 'Modulus of Elasticity', value: titleLower.includes('titanium') ? '114 GPa' : '193 GPa' },
    { propertyName: 'Electrical Resistivity', value: '0.72 x 10^-6 Ω.m' },
    { propertyName: 'Thermal Conductivity', value: '16.2 W/m.K at 100°C' },
  ];

  // 7. Dynamic Paragraph Text Extractions for Description & Lists
  const pMatches = Array.from(htmlContent.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi));
  const textParagraphs: string[] = [];
  for (const pm of pMatches) {
    const cleanText = pm[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (cleanText.length > 30 && !cleanText.toLowerCase().includes('copyright')) {
      textParagraphs.push(cleanText);
    }
  }

  const shortDescription =
    textParagraphs[0] ||
    `Manufactured and stocked by Jyoti Metal (India) to stringent ASTM, ASME, and EN standards. Fully solution annealed and tested for high-pressure, severe corrosion environments.`;

  const fullDescription =
    textParagraphs.slice(0, 3).join(' ') ||
    `${rawTitle} is engineered for exceptional corrosion resistance, high tensile strength, and uniform microstructural integrity in critical process applications.`;

  // Dynamic Lists for Applications
  const liMatches = Array.from(htmlContent.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi));
  const applications: string[] = [];
  for (const lm of liMatches) {
    const item = lm[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (item.length > 10 && item.length < 120 && !applications.includes(item)) {
      applications.push(item);
    }
  }

  const finalApplications =
    applications.length >= 3
      ? applications.slice(0, 6)
      : [
          'Chemical and Petrochemical Processing',
          'Offshore Oil & Gas Production Platforms',
          'Food and Beverage Processing Plants',
          'Pharmaceutical Machinery & High-Purity Pipelines',
          'Power Generation & Heat Exchangers',
        ];

  // Standards & Equivalent Grades
  const standards = ['ASTM A312', 'ASTM A213', 'ASME SA312', 'EN 10216-5', 'DIN 17458'];
  const equivalentGrades = ['UNS S30400', 'W.Nr. 1.4301', 'AFNOR Z7 CN 18-09', 'BS 304S31'];
  const dimensions = ['1/2" NB to 24" NB', 'Sch 5S, 10S, 40S, 80S, 160S, XXS'];

  return {
    slug,
    name: rawTitle,
    category,
    subCategory: category,
    shortDescription,
    fullDescription,
    mainImage,
    galleryImages,
    metaTitle,
    metaDescription,
    chemicalComposition,
    mechanicalProperties,
    physicalProperties,
    applications: finalApplications,
    tables,
    standards,
    equivalentGrades,
    dimensions,
    relatedProductSlugs: [],
  };
}
