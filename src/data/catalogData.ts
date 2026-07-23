export interface CatalogProduct {
  id: string;
  title: string;
  category: string;
  subCat: string;
  image: string;
  specs: string[];
}

export const allSubCategoriesList = [
  // Pipes & Tubes
  { id: 'Stainless Steel Pipes & Tubes', label: 'Stainless Steel Pipes & Tubes' },
  { id: 'Duplex / Super Duplex Pipes & Tubes', label: 'Duplex / Super Duplex Pipes & Tubes' },
  { id: 'Inconel / Incoloy Pipes & Tubes', label: 'Inconel / Incoloy Pipes & Tubes' },
  { id: 'Monel Pipes & Tubes', label: 'Monel Pipes & Tubes' },
  { id: 'Nickel Pipes & Tubes', label: 'Nickel Pipes & Tubes' },
  { id: 'Hastelloy Pipes & Tubes', label: 'Hastelloy Pipes & Tubes' },
  { id: 'Alloy 20 Pipes & Tubes', label: 'Alloy 20 Pipes & Tubes' },
  { id: 'Alloy Steel Pipes & Tubes', label: 'Alloy Steel Pipes & Tubes' },
  { id: 'Titanium Pipes & Tubes', label: 'Titanium Pipes & Tubes' },
  { id: 'Carbon Steel Pipes & Tubes', label: 'Carbon Steel Pipes & Tubes' },
  { id: 'Copper Nickel Pipes & Tubes', label: 'Copper Nickel Pipes & Tubes' },
  { id: 'Aluminium Pipes & Tubes', label: 'Aluminium Pipes & Tubes' },
  { id: 'Alloy Steel Welded Pipe', label: 'Alloy Steel Welded Pipe' },
  { id: 'Other Pipes & Tubes', label: 'Other Pipes & Tubes' },

  // Sheets & Plates
  { id: 'Stainless Steel Sheets & Plates', label: 'Stainless Steel Sheets & Plates' },
  { id: 'Duplex / Super Duplex Sheets & Plates', label: 'Duplex / Super Duplex Sheets & Plates' },
  { id: 'Inconel / Incoloy Sheets & Plates', label: 'Inconel / Incoloy Sheets & Plates' },
  { id: 'Monel Sheets & Plates', label: 'Monel Sheets & Plates' },
  { id: 'Nickel Sheets & Plates', label: 'Nickel Sheets & Plates' },
  { id: 'Hastelloy Sheets & Plates', label: 'Hastelloy Sheets & Plates' },
  { id: 'Alloy 20 Sheets & Plates', label: 'Alloy 20 Sheets & Plates' },
  { id: 'Titanium Sheets & Plates', label: 'Titanium Sheets & Plates' },
  { id: 'Aluminium Sheets & Plates', label: 'Aluminium Sheets & Plates' },
  { id: 'Copper Nickel Sheets & Plates', label: 'Copper Nickel Sheets & Plates' },
  { id: 'Carbon Steel Sheets & Plates', label: 'Carbon Steel Sheets & Plates' },
  { id: 'Alloy Steel Sheets & Plates', label: 'Alloy Steel Sheets & Plates' },
  { id: 'Other Sheets & Plates', label: 'Other Sheets & Plates' },

  // Other Main Categories
  { id: 'Round Bars', label: 'Solid Round Bars' },
  { id: 'Flanges', label: 'Forged Pipe Flanges' },
  { id: 'Forged Fittings', label: 'Forged Fittings' },
  { id: 'Buttweld Fittings', label: 'Butt-Weld Fittings' },
  { id: 'Fasteners', label: 'Fasteners & Studs' },
  { id: 'Specialized Product', label: 'Specialized Product' },
];

export const getSubCategoriesForCategory = (mainCat: string) => {
  if (!mainCat || mainCat === 'all' || mainCat === 'All') return allSubCategoriesList;
  if (mainCat === 'Pipes & Tubes') {
    return allSubCategoriesList.filter(s => s.id.includes('Pipes & Tubes') || s.id.includes('Pipe'));
  }
  if (mainCat === 'Plates & Sheets' || mainCat === 'Sheets & Plates') {
    return allSubCategoriesList.filter(s => s.id.includes('Sheets & Plates'));
  }
  return allSubCategoriesList.filter(s => s.id === mainCat || s.label.toLowerCase().includes(mainCat.toLowerCase()));
};

export const getFirstSubCategoryForCategory = (mainCat: string) => {
  if (mainCat === 'Plates & Sheets' || mainCat === 'Sheets & Plates') {
    return 'Stainless Steel Sheets & Plates';
  }
  if (mainCat === 'Pipes & Tubes') {
    return 'Stainless Steel Pipes & Tubes';
  }
  const subs = getSubCategoriesForCategory(mainCat);
  if (subs.length > 0) return subs[0].id;
  return mainCat;
};

export const catalogProducts: CatalogProduct[] = [
  // 1. Stainless Steel Pipes & Tubes
  {
    id: 'ss-304-pipe',
    title: 'SS 304/304L/304H Pipes & Tubes',
    category: 'Pipes & Tubes',
    subCat: 'Stainless Steel Pipes & Tubes',
    image: '/images/stainless_pipes.png',
    specs: ['ASTM A312', 'Seamless & ERW', '304/304L/304H'],
  },
  {
    id: 'ss-310-pipe',
    title: 'SS 309/310/310S Pipes & Tubes',
    category: 'Pipes & Tubes',
    subCat: 'Stainless Steel Pipes & Tubes',
    image: '/images/stainless_pipes.png',
    specs: ['High Temperature', 'ASTM A312', '309/310/310S'],
  },
  {
    id: 'ss-316-pipe',
    title: 'SS 316/316L/316Ti Pipes & Tubes',
    category: 'Pipes & Tubes',
    subCat: 'Stainless Steel Pipes & Tubes',
    image: '/images/stainless_pipes.png',
    specs: ['Marine Grade', 'UNS S31600/S31603', 'Corrosion Proof'],
  },
  {
    id: 'ss-317-pipe',
    title: 'SS 317/317L Pipes & Tubes',
    category: 'Pipes & Tubes',
    subCat: 'Stainless Steel Pipes & Tubes',
    image: '/images/stainless_pipes.png',
    specs: ['High Moly Alloy', 'ASTM A312', 'UNS S31700'],
  },
  {
    id: 'ss-321-pipe',
    title: 'SS 321/321H Pipes & Tubes',
    category: 'Pipes & Tubes',
    subCat: 'Stainless Steel Pipes & Tubes',
    image: '/images/stainless_pipes.png',
    specs: ['Titanium Stabilized', 'ASTM A312', '321/321H'],
  },
  {
    id: 'ss-347-pipe',
    title: 'SS 347/347H Pipes & Tubes',
    category: 'Pipes & Tubes',
    subCat: 'Stainless Steel Pipes & Tubes',
    image: '/images/stainless_pipes.png',
    specs: ['Niobium Stabilized', 'High Temp Service', '347/347H'],
  },
  {
    id: 'ss-410-pipe',
    title: 'SS 410 Pipes & Tubes',
    category: 'Pipes & Tubes',
    subCat: 'Stainless Steel Pipes & Tubes',
    image: '/images/stainless_pipes.png',
    specs: ['Martensitic SS', 'ASTM A268', 'UNS S41000'],
  },
  {
    id: 'ss-446-pipe',
    title: 'SS 446 Pipes & Tubes',
    category: 'Pipes & Tubes',
    subCat: 'Stainless Steel Pipes & Tubes',
    image: '/images/stainless_pipes.png',
    specs: ['Ferritic Heat Resistant', 'ASTM A268', 'UNS S44600'],
  },
  {
    id: 'ss-904l-pipe',
    title: 'SS 904L Pipes & Tubes',
    category: 'Pipes & Tubes',
    subCat: 'Stainless Steel Pipes & Tubes',
    image: '/images/stainless_pipes.png',
    specs: ['UNS N08904', 'High Sulfuric Acid Resistance', '904L Grade'],
  },

  // 2. Duplex / Super Duplex Pipes & Tubes
  {
    id: 'duplex-s31803',
    title: 'Duplex Steel S31803 / S32205 Pipes & Tubes',
    category: 'Pipes & Tubes',
    subCat: 'Duplex / Super Duplex Pipes & Tubes',
    image: '/images/stainless_pipes.png',
    specs: ['ASTM A790', 'UNS S31803/S32205', 'High Tensile & Yield'],
  },
  {
    id: 'super-duplex-s32750',
    title: 'Super Duplex S32750 / S32760 Pipes & Tubes',
    category: 'Pipes & Tubes',
    subCat: 'Duplex / Super Duplex Pipes & Tubes',
    image: '/images/stainless_pipes.png',
    specs: ['ASTM A790', 'UNS S32750/S32760', 'Offshore Oil & Gas'],
  },

  // 3. Inconel / Incoloy Pipes & Tubes
  {
    id: 'inconel-600',
    title: 'Inconel 600/601/625/718 Pipes & Tubes',
    category: 'Pipes & Tubes',
    subCat: 'Inconel / Incoloy Pipes & Tubes',
    image: '/images/stainless_pipes.png',
    specs: ['Nickel Alloy', 'ASTM B167 / B444', 'Cryogenic to 1100°C'],
  },
  {
    id: 'incoloy-800',
    title: 'Incoloy 800/800HT/825 Pipes & Tubes',
    category: 'Pipes & Tubes',
    subCat: 'Inconel / Incoloy Pipes & Tubes',
    image: '/images/stainless_pipes.png',
    specs: ['ASTM B407 / B423', 'UNS N08800/N08825', 'Carburization Resistance'],
  },

  // 4. Monel Pipes & Tubes
  {
    id: 'monel-400',
    title: 'Monel 400/K500 Pipes & Tubes',
    category: 'Pipes & Tubes',
    subCat: 'Monel Pipes & Tubes',
    image: '/images/stainless_pipes.png',
    specs: ['Nickel-Copper Alloy', 'ASTM B165', 'UNS N04400/N05500'],
  },

  // 5. Nickel Pipes & Tubes
  {
    id: 'nickel-200',
    title: 'Nickel 200/201 Pipes & Tubes',
    category: 'Pipes & Tubes',
    subCat: 'Nickel Pipes & Tubes',
    image: '/images/stainless_pipes.png',
    specs: ['Pure Nickel', 'ASTM B161 / B163', 'UNS N02200/N02201'],
  },

  // 6. Hastelloy Pipes & Tubes
  {
    id: 'hastelloy-c276',
    title: 'Hastelloy C276 / C22 Pipes & Tubes',
    category: 'Pipes & Tubes',
    subCat: 'Hastelloy Pipes & Tubes',
    image: '/images/stainless_pipes.png',
    specs: ['Ni-Mo-Cr Alloy', 'ASTM B619 / B622', 'UNS N10276'],
  },

  // 7. Alloy 20 Pipes & Tubes
  {
    id: 'alloy-20-pipe',
    title: 'Alloy 20 Pipes & Tubes',
    category: 'Pipes & Tubes',
    subCat: 'Alloy 20 Pipes & Tubes',
    image: '/images/stainless_pipes.png',
    specs: ['UNS N08020', 'ASTM B729 / B464', 'Acid Plant Piping'],
  },

  // 8. Alloy Steel Pipes & Tubes
  {
    id: 'alloy-steel-p5',
    title: 'Alloy Steel P5 Pipes & Tubes',
    category: 'Pipes & Tubes',
    subCat: 'Alloy Steel Pipes & Tubes',
    image: '/images/stainless_pipes.png',
    specs: ['ASTM A335 Grade P5', '5% Cr-1/2% Mo', 'Power Station Boilers'],
  },
  {
    id: 'alloy-steel-p9',
    title: 'Alloy Steel P9 Pipes & Tubes',
    category: 'Pipes & Tubes',
    subCat: 'Alloy Steel Pipes & Tubes',
    image: '/images/stainless_pipes.png',
    specs: ['ASTM A335 Grade P9', '9% Cr-1% Mo', 'Refinery Lines'],
  },
  {
    id: 'alloy-steel-p11',
    title: 'Alloy Steel P11 Pipes & Tubes',
    category: 'Pipes & Tubes',
    subCat: 'Alloy Steel Pipes & Tubes',
    image: '/images/stainless_pipes.png',
    specs: ['ASTM A335 Grade P11', '1.25% Cr-1/2% Mo', 'High Pressure Steam'],
  },
  {
    id: 'alloy-steel-p12',
    title: 'Alloy Steel P12 Pipes & Tubes',
    category: 'Pipes & Tubes',
    subCat: 'Alloy Steel Pipes & Tubes',
    image: '/images/stainless_pipes.png',
    specs: ['ASTM A335 Grade P12', '1% Cr-1/2% Mo', 'Thermal Plants'],
  },
  {
    id: 'alloy-steel-p22',
    title: 'Alloy Steel P22 Pipes & Tubes',
    category: 'Pipes & Tubes',
    subCat: 'Alloy Steel Pipes & Tubes',
    image: '/images/stainless_pipes.png',
    specs: ['ASTM A335 Grade P22', '2.25% Cr-1% Mo', 'High Boiler Temp'],
  },
  {
    id: 'alloy-steel-p91',
    title: 'Alloy Steel P91 Pipes & Tubes',
    category: 'Pipes & Tubes',
    subCat: 'Alloy Steel Pipes & Tubes',
    image: '/images/stainless_pipes.png',
    specs: ['ASTM A335 Grade P91', '9% Cr-1% Mo-V', 'Ultra Supercritical'],
  },
  {
    id: 'alloy-steel-p92',
    title: 'Alloy Steel P92 Pipes & Tubes',
    category: 'Pipes & Tubes',
    subCat: 'Alloy Steel Pipes & Tubes',
    image: '/images/stainless_pipes.png',
    specs: ['ASTM A335 Grade P92', 'W-Tolerant Alloy Steel', 'Advanced Power'],
  },

  // 9. Titanium Pipes & Tubes
  {
    id: 'ti-gr1-pipe',
    title: 'Titanium Gr 1 Pipes & Tubes',
    category: 'Pipes & Tubes',
    subCat: 'Titanium Pipes & Tubes',
    image: '/images/titanium_plates.png',
    specs: ['ASTM B861 Grade 1', 'UNS R50250', 'Commercially Pure Ti'],
  },
  {
    id: 'ti-gr2-pipe',
    title: 'Titanium Gr 2 Pipes & Tubes',
    category: 'Pipes & Tubes',
    subCat: 'Titanium Pipes & Tubes',
    image: '/images/titanium_plates.png',
    specs: ['ASTM B861 Grade 2', 'UNS R50400', 'Desalination Plants'],
  },
  {
    id: 'ti-gr5-pipe',
    title: 'Titanium Gr 5 Pipes & Tubes',
    category: 'Pipes & Tubes',
    subCat: 'Titanium Pipes & Tubes',
    image: '/images/titanium_plates.png',
    specs: ['Ti-6Al-4V', 'AMS 4928 / ASTM B861', 'Aerospace Structural'],
  },
  {
    id: 'ti-gr9-pipe',
    title: 'Titanium Gr 9 Pipes & Tubes',
    category: 'Pipes & Tubes',
    subCat: 'Titanium Pipes & Tubes',
    image: '/images/titanium_plates.png',
    specs: ['Ti-3Al-2.5V', 'ASTM B861 Grade 9', 'Hydraulic Aircraft Lines'],
  },

  // 10. Carbon Steel Pipes & Tubes
  {
    id: 'cs-erw-pipe',
    title: 'Seamless & ERW Carbon Steel Pipes & Tubes',
    category: 'Pipes & Tubes',
    subCat: 'Carbon Steel Pipes & Tubes',
    image: '/images/stainless_pipes.png',
    specs: ['ASTM A106 Grade B', 'ASTM A53', 'High Strength Carbon'],
  },
  {
    id: 'cs-lsaw-pipe',
    title: 'SAW / LSAW / HSAW Line Pipes & Tubes',
    category: 'Pipes & Tubes',
    subCat: 'Carbon Steel Pipes & Tubes',
    image: '/images/stainless_pipes.png',
    specs: ['Large Diameter', 'API 5L Grade X42 - X80', 'Oil Transport'],
  },
  {
    id: 'cs-api5l-pipe',
    title: 'API 5L Line Pipes & Tubes',
    category: 'Pipes & Tubes',
    subCat: 'Carbon Steel Pipes & Tubes',
    image: '/images/stainless_pipes.png',
    specs: ['PSL1 / PSL2', 'Grade B to X80', 'Gas Distribution'],
  },

  // 11. Other Pipes & Tubes
  {
    id: 'smo-254-pipe',
    title: 'SMO 254 Pipes and Tubes',
    category: 'Pipes & Tubes',
    subCat: 'Other Pipes & Tubes',
    image: '/images/stainless_pipes.png',
    specs: ['6% Moly Alloy', 'UNS S31254', 'Seawater Scrubbers'],
  },
  {
    id: 'alloy-28-pipe',
    title: 'Alloy 28 Pipes and Tubes',
    category: 'Pipes & Tubes',
    subCat: 'Other Pipes & Tubes',
    image: '/images/stainless_pipes.png',
    specs: ['UNS N08282', 'High Phosphoric Acid Resistance'],
  },
  {
    id: '253-ma-pipe',
    title: '253 MA [S30815] High Temp Pipes',
    category: 'Pipes & Tubes',
    subCat: 'Other Pipes & Tubes',
    image: '/images/stainless_pipes.png',
    specs: ['UNS S30815', 'Up to 1150°C Oxidation Proof'],
  },

  // 12. Copper Nickel Pipes & Tubes
  {
    id: 'cu-ni-7030',
    title: 'Copper Nickel 70/30 Pipes & Tubes',
    category: 'Pipes & Tubes',
    subCat: 'Copper Nickel Pipes & Tubes',
    image: '/images/stainless_pipes.png',
    specs: ['CuNi 70/30 (C71500)', 'ASTM B466', 'Marine Condensers'],
  },
  {
    id: 'cu-ni-9010',
    title: 'Copper Nickel 90/10 Pipes & Tubes',
    category: 'Pipes & Tubes',
    subCat: 'Copper Nickel Pipes & Tubes',
    image: '/images/stainless_pipes.png',
    specs: ['CuNi 90/10 (C70600)', 'ASTM B466', 'Shipbuilding Piping'],
  },

  // 13. Aluminium Pipes & Tubes
  {
    id: 'alu-alloy-pipe',
    title: 'Aluminium Alloy Pipes & Tubes',
    category: 'Pipes & Tubes',
    subCat: 'Aluminium Pipes & Tubes',
    image: '/images/titanium_plates.png',
    specs: ['Alloy 6061-T6 / 6063', 'ASTM B241', 'Lightweight Structural'],
  },

  // 14. Alloy Steel Welded Pipe
  {
    id: 'a691-125-pipe',
    title: 'A691 1.25 (1-1/4 Cr) Welded Pipe',
    category: 'Pipes & Tubes',
    subCat: 'Alloy Steel Welded Pipe',
    image: '/images/stainless_pipes.png',
    specs: ['ASTM A691 Grade 1-1/4 Cr', 'Electric-Fusion Welded'],
  },
  {
    id: 'a691-225-pipe',
    title: 'A691 2.25 (2-1/4 Cr) Welded Pipe',
    category: 'Pipes & Tubes',
    subCat: 'Alloy Steel Welded Pipe',
    image: '/images/stainless_pipes.png',
    specs: ['ASTM A691 Grade 2-1/4 Cr', 'EFW High Pressure Pipe'],
  },
  {
    id: 'a691-5cr-pipe',
    title: 'A691 5 Cr Welded Pipe',
    category: 'Pipes & Tubes',
    subCat: 'Alloy Steel Welded Pipe',
    image: '/images/stainless_pipes.png',
    specs: ['ASTM A691 Grade 5Cr', 'EFW High Temp Service'],
  },
  {
    id: 'a691-9cr-pipe',
    title: 'A691 9 Cr Welded Pipe',
    category: 'Pipes & Tubes',
    subCat: 'Alloy Steel Welded Pipe',
    image: '/images/stainless_pipes.png',
    specs: ['ASTM A691 Grade 9Cr', 'EFW Power Plant Piping'],
  },
  {
    id: 'a691-91cr-pipe',
    title: 'A691 91 Cr Welded Pipe',
    category: 'Pipes & Tubes',
    subCat: 'Alloy Steel Welded Pipe',
    image: '/images/stainless_pipes.png',
    specs: ['ASTM A691 Grade 91', 'Modified 9Cr-1Mo EFW Pipe'],
  },

  // SHEETS & PLATES PRODUCTS
  // 1. Stainless Steel Sheets & Plates
  {
    id: 'ss-253ma-sheet',
    title: 'SS 253MA Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Stainless Steel Sheets & Plates',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    specs: ['UNS S30815', 'ASTM A240', 'High Temperature Grade'],
  },
  {
    id: 'ss-304-sheet',
    title: 'SS 304/304L/304H Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Stainless Steel Sheets & Plates',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    specs: ['ASTM A240', '2B / 8K Mirror / HR', 'Thk 0.5mm - 50mm'],
  },
  {
    id: 'ss-310-sheet',
    title: 'SS 309/310/310S Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Stainless Steel Sheets & Plates',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    specs: ['Heat Resistant', 'ASTM A240', '309/310/310S'],
  },
  {
    id: 'ss-316-sheet',
    title: 'SS 316/316L/316Ti Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Stainless Steel Sheets & Plates',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    specs: ['Marine Grade', 'UNS S31600/S31603', 'Acid Resistant'],
  },
  {
    id: 'ss-317-sheet',
    title: 'SS 317/317L Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Stainless Steel Sheets & Plates',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    specs: ['High Moly', 'ASTM A240', 'UNS S31700'],
  },
  {
    id: 'ss-321-sheet',
    title: 'SS 321/321H Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Stainless Steel Sheets & Plates',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    specs: ['Titanium Stabilized', 'ASTM A240', '321/321H'],
  },
  {
    id: 'ss-347-sheet',
    title: 'SS 347/347H Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Stainless Steel Sheets & Plates',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    specs: ['Niobium Stabilized', 'High Temp Boiler Grade'],
  },
  {
    id: 'ss-409-sheet',
    title: 'SS 409 Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Stainless Steel Sheets & Plates',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    specs: ['Ferritic SS', 'ASTM A240', 'UNS S40900'],
  },
  {
    id: 'ss-410-sheet',
    title: 'SS 410 Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Stainless Steel Sheets & Plates',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    specs: ['Martensitic Grade', 'ASTM A240', 'High Hardness'],
  },
  {
    id: 'ss-420-sheet',
    title: 'SS 420 Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Stainless Steel Sheets & Plates',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    specs: ['High Carbon Martensitic', 'Wear Resistant'],
  },
  {
    id: 'ss-430-sheet',
    title: 'SS 430 Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Stainless Steel Sheets & Plates',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    specs: ['Ferritic Stainless Steel', 'BA / 2B Finish'],
  },
  {
    id: 'ss-446-sheet',
    title: 'SS 446 Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Stainless Steel Sheets & Plates',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    specs: ['Non-Scaling Heat Resistant', 'ASTM A240'],
  },
  {
    id: 'ss-904l-sheet',
    title: 'SS 904L Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Stainless Steel Sheets & Plates',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    specs: ['UNS N08904', 'High Sulfuric Acid Resistance'],
  },

  // 2. Duplex / Super Duplex Sheets & Plates
  {
    id: 'duplex-s31803-sheet',
    title: 'Duplex Steel S31803 / S32205 Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Duplex / Super Duplex Sheets & Plates',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    specs: ['ASTM A240', 'UNS S31803/S32205', 'High Strength'],
  },
  {
    id: 'super-duplex-s32750-sheet',
    title: 'Super Duplex S32750 / S32760 Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Duplex / Super Duplex Sheets & Plates',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    specs: ['ASTM A240', 'UNS S32750/S32760', 'Offshore Heavy Plates'],
  },

  // 3. Inconel / Incoloy Sheets & Plates
  {
    id: 'inconel-sheet',
    title: 'Inconel 600 / 625 / 718 Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Inconel / Incoloy Sheets & Plates',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    specs: ['AMS 5599', 'ASTM B168 / B443', 'Aerospace Alloys'],
  },
  {
    id: 'incoloy-sheet',
    title: 'Incoloy 800 / 800HT / 825 Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Inconel / Incoloy Sheets & Plates',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    specs: ['ASTM B409 / B424', 'UNS N08800/N08825'],
  },

  // 4. Monel Sheets & Plates
  {
    id: 'monel-sheet',
    title: 'Monel 400 / K500 Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Monel Sheets & Plates',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    specs: ['ASTM B127', 'UNS N04400', 'Seawater Corrosion Resistant'],
  },

  // 5. Nickel Sheets & Plates
  {
    id: 'nickel-sheet',
    title: 'Nickel 200 / 201 Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Nickel Sheets & Plates',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    specs: ['ASTM B162', 'UNS N02200/N02201', 'Pure Nickel Plate'],
  },

  // 6. Hastelloy Sheets & Plates
  {
    id: 'hastelloy-sheet',
    title: 'Hastelloy C276 / C22 Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Hastelloy Sheets & Plates',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    specs: ['ASTM B575', 'UNS N10276', 'Extreme Chemical Resistance'],
  },

  // 7. Alloy 20 Sheets & Plates
  {
    id: 'alloy-20-sheet',
    title: 'Alloy 20 Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Alloy 20 Sheets & Plates',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    specs: ['UNS N08020', 'ASTM B463', 'Sulfuric Acid Tank Plates'],
  },

  // 8. Titanium Sheets & Plates
  {
    id: 'ti-gr1-sheet',
    title: 'Titanium Gr 1 Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Titanium Sheets & Plates',
    image: '/images/titanium_plates.png',
    specs: ['ASTM B265 Grade 1', 'Commercially Pure Titanium'],
  },
  {
    id: 'ti-gr2-sheet',
    title: 'Titanium Gr 2 Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Titanium Sheets & Plates',
    image: '/images/titanium_plates.png',
    specs: ['ASTM B265 Grade 2', 'UNS R50400', 'Desalination Vessel'],
  },
  {
    id: 'ti-gr5-sheet',
    title: 'Titanium Gr 5 Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Titanium Sheets & Plates',
    image: '/images/titanium_plates.png',
    specs: ['Ti-6Al-4V', 'AMS 4911 / ASTM B265', 'Aerospace Structural'],
  },
  {
    id: 'ti-gr9-sheet',
    title: 'Titanium Gr 9 Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Titanium Sheets & Plates',
    image: '/images/titanium_plates.png',
    specs: ['Ti-3Al-2.5V', 'ASTM B265 Grade 9', 'High Strength Sheet'],
  },

  // 9. Aluminium Sheets & Plates
  {
    id: 'alu-5052-sheet',
    title: 'Aluminium Alloy 5052 Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Aluminium Sheets & Plates',
    image: '/images/titanium_plates.png',
    specs: ['ASTM B209', 'Alloy 5052-H32', 'Marine Grade Aluminium'],
  },
  {
    id: 'alu-5083-sheet',
    title: 'Aluminium Alloy 5083 Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Aluminium Sheets & Plates',
    image: '/images/titanium_plates.png',
    specs: ['ASTM B209', 'Alloy 5083-H111', 'Shipbuilding Heavy Plate'],
  },
  {
    id: 'alu-5086-sheet',
    title: 'Aluminium Alloy 5086 Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Aluminium Sheets & Plates',
    image: '/images/titanium_plates.png',
    specs: ['ASTM B209', 'Alloy 5086', 'High Corrosion Resistance'],
  },
  {
    id: 'alu-5454-sheet',
    title: 'Aluminium Alloy 5454 Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Aluminium Sheets & Plates',
    image: '/images/titanium_plates.png',
    specs: ['ASTM B209', 'Alloy 5454', 'Pressure Vessels & Tankers'],
  },
  {
    id: 'alu-6061-sheet',
    title: 'Aluminium Alloy 6061 Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Aluminium Sheets & Plates',
    image: '/images/titanium_plates.png',
    specs: ['ASTM B209', '6061-T6 / T651', 'Structural Aircraft Grade'],
  },

  // 10. Copper Nickel Sheets & Plates
  {
    id: 'cuni-7030-sheet',
    title: 'Cupro Nickel 70/30 Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Copper Nickel Sheets & Plates',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    specs: ['CuNi 70/30 (C71500)', 'ASTM B171', 'Marine Condenser Plates'],
  },
  {
    id: 'cuni-9010-sheet',
    title: 'Cupro Nickel 90/10 Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Copper Nickel Sheets & Plates',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    specs: ['CuNi 90/10 (C70600)', 'ASTM B171', 'Seawater Sheathing'],
  },

  // 11. Carbon Steel Sheets & Plates
  {
    id: 'cs-api-sheet',
    title: 'API Line Grade Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Carbon Steel Sheets & Plates',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    specs: ['API 5L Grade X42-X80', 'Oil & Gas Pipeline Plates'],
  },
  {
    id: 'cs-high-tensile-sheet',
    title: 'High Strength & Tensile Carbon Steel Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Carbon Steel Sheets & Plates',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    specs: ['IS 2062 E350 / E450', 'High Yield Structural'],
  },
  {
    id: 'cs-mild-steel-sheet',
    title: 'Mild Steel Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Carbon Steel Sheets & Plates',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    specs: ['IS 2062 Grade A/B', 'ASTM A36', 'General Fabrication'],
  },
  {
    id: 'cs-s500mc-sheet',
    title: 'S500MC Hot Rolled High Tensile Sheets',
    category: 'Plates & Sheets',
    subCat: 'Carbon Steel Sheets & Plates',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    specs: ['EN 10149-2', 'S500MC', 'Cold Forming High Tensile'],
  },
  {
    id: 'cs-s550mc-sheet',
    title: 'S550MC Hot Rolled High Tensile Sheets',
    category: 'Plates & Sheets',
    subCat: 'Carbon Steel Sheets & Plates',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    specs: ['EN 10149-2', 'S550MC', 'Chassis & Automotive Heavy Sheet'],
  },

  // 12. Alloy Steel Sheets & Plates
  {
    id: 'as-grade5-sheet',
    title: 'Alloy Steel 5 Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Alloy Steel Sheets & Plates',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    specs: ['ASTM A387 Grade 5', '5% Cr - 1/2% Mo', 'Boiler Pressure Vessel'],
  },
  {
    id: 'as-grade9-sheet',
    title: 'Alloy Steel 9 Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Alloy Steel Sheets & Plates',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    specs: ['ASTM A387 Grade 9', '9% Cr - 1% Mo', 'High Temp Refinery'],
  },
  {
    id: 'as-grade11-sheet',
    title: 'Alloy Steel 11 Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Alloy Steel Sheets & Plates',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    specs: ['ASTM A387 Grade 11', '1.25% Cr - 0.5% Mo', 'Class 1 & 2'],
  },
  {
    id: 'as-grade12-sheet',
    title: 'Alloy Steel 12 Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Alloy Steel Sheets & Plates',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    specs: ['ASTM A387 Grade 12', '1% Cr - 0.5% Mo', 'Power Station Plates'],
  },
  {
    id: 'as-grade22-sheet',
    title: 'Alloy Steel 22 Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Alloy Steel Sheets & Plates',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    specs: ['ASTM A387 Grade 22', '2.25% Cr - 1% Mo', 'High Boiler Pressure'],
  },
  {
    id: 'as-grade91-sheet',
    title: 'Alloy Steel 91 Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Alloy Steel Sheets & Plates',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    specs: ['ASTM A387 Grade 91', '9% Cr - 1% Mo - V', 'Ultra Thermal Grade'],
  },

  // 13. Other Sheets & Plates
  {
    id: 'smo-254-sheet',
    title: 'SMO 254 Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Other Sheets & Plates',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    specs: ['UNS S31254', 'ASTM A240', '6% Moly Super Austenitic'],
  },
  {
    id: 'alloy-28-sheet',
    title: 'Alloy 28 Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Other Sheets & Plates',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    specs: ['UNS N08282', 'High Phosphoric Acid Service'],
  },
  {
    id: 'ss-409l-sheet',
    title: '409L Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Other Sheets & Plates',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    specs: ['UNS S40903', 'Low Carbon Automotive Exhaust Sheet'],
  },
  {
    id: 'ss-409m-sheet',
    title: '409M Sheets & Plates',
    category: 'Plates & Sheets',
    subCat: 'Other Sheets & Plates',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    specs: ['Modified 12% Cr', 'Corrosion Resistant Structural Sheet'],
  },

  // Other Main Categories
  {
    id: 'solid-round-bars',
    title: 'Solid Stainless Steel Round Bars & Shafts',
    category: 'Round Bars',
    subCat: 'Round Bars',
    image: '/images/round_bars.png',
    specs: ['ASTM A276', 'Dia: 8mm - 500mm', 'Bright Drawn / Turned'],
  },
  {
    id: 'forged-flanges',
    title: 'Forged Pipe Flanges (Slip-On, Blind, Weld-Neck)',
    category: 'Flanges',
    subCat: 'Flanges',
    image: '/images/flanges_industrial.png',
    specs: ['ANSI B16.5', 'Class 150 - 2500', 'Forged SS316L / Carbon'],
  },
  {
    id: 'forged-fittings',
    title: 'High Pressure Socket Weld & Threaded Forged Fittings',
    category: 'Forged Fittings',
    subCat: 'Forged Fittings',
    image: '/images/pipe_fittings.png',
    specs: ['ASME B16.11', '3000# / 6000#', 'Forged Steel A105 / F316'],
  },
  {
    id: 'butt-weld-fittings',
    title: 'Butt-Weld Pipe Fittings (Elbows, Tees, Reducers)',
    category: 'Buttweld Fittings',
    subCat: 'Buttweld Fittings',
    image: '/images/pipe_fittings.png',
    specs: ['ASME B16.9', 'Sch 10S to Sch 160', 'SS316 / Monel / Inconel'],
  },
  {
    id: 'heavy-fasteners',
    title: 'High Tensile Stainless Steel Fasteners & Stud Bolts',
    category: 'Fasteners',
    subCat: 'Fasteners',
    image: '/images/precision_parts.png',
    specs: ['ASTM A193 B8M', 'Grade B7 / B8', 'Heavy Hex Bolts'],
  },
  {
    id: 'specialized-cnc',
    title: 'Precision CNC Machined Aerospace Components',
    category: 'Specialized Product',
    subCat: 'Specialized Product',
    image: '/images/precision_parts.png',
    specs: ['AS9100D Certified', 'Sub-Micron Tolerance', 'Inconel / Ti-64'],
  },
];
