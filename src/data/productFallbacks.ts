// Generic fallback product data, used by the product detail page whenever a
// product has no published spec tables in `champakSpecs`. Kept in its own
// module so the catalogue export script renders exactly what the site renders.

// TMT reinforcement bar is IS 1786 carbon steel, not an alloy — every generator
// below has to branch on it before the alloy keyword tests, or a rebar page
// publishes 18/8 stainless chemistry and stainless pricing.
const IS_REBAR = /\btmt\b|rebar|reinforcement bar/;

// Price generator by alloy type
export const getAlloyPricePerKg = (title: string): number => {
  const t = title.toLowerCase();
  if (IS_REBAR.test(t)) return 62;
  if (t.includes('titanium')) return 1850;
  if (t.includes('inconel') || t.includes('hastelloy')) return 2450;
  if (t.includes('monel') || t.includes('nickel')) return 1650;
  if (t.includes('duplex') || t.includes('2205') || t.includes('2507')) return 480;
  if (t.includes('copper') || t.includes('brass')) return 620;
  if (t.includes('stainless') || t.includes('316') || t.includes('304')) return 320;
  if (t.includes('carbon') || t.includes('steel')) return 95;
  return 280;
};

// Composition generator by alloy title
export const getAlloyComposition = (title: string): Record<string, string> => {
  const t = title.toLowerCase();
  if (IS_REBAR.test(t)) {
    // IS 1786 ladle analysis limits for Fe-500 / Fe-550D.
    return {
      Carbon: '0.30% Max (0.25% Max for D grades)',
      Sulphur: '0.055% Max (0.040% Max for D grades)',
      Phosphorus: '0.055% Max (0.040% Max for D grades)',
      'Sulphur + Phosphorus': '0.105% Max (0.075% Max for D grades)',
      Iron: 'Balance',
    };
  }
  if (t.includes('titanium') || t.includes('ti-')) {
    return { Titanium: 'Balance (90%+)', Aluminum: '5.5 - 6.75%', Vanadium: '3.5 - 4.5%', Iron: '0.40% Max', Oxygen: '0.20% Max' };
  }
  if (t.includes('inconel') || t.includes('625')) {
    return { Nickel: '58.0% Min', Chromium: '20.0 - 23.0%', Molybdenum: '8.0 - 10.0%', Niobium: '3.15 - 4.15%', Iron: '5.0% Max' };
  }
  if (t.includes('hastelloy') || t.includes('c276')) {
    return { Nickel: 'Balance (~57%)', Molybdenum: '15.0 - 17.0%', Chromium: '14.5 - 16.5%', Tungsten: '3.0 - 4.5%', Iron: '4.0 - 7.0%' };
  }
  if (t.includes('duplex') || t.includes('2205')) {
    return { Chromium: '22.0 - 23.0%', Nickel: '4.5 - 6.5%', Molybdenum: '3.0 - 3.5%', Nitrogen: '0.14 - 0.20%', Iron: 'Balance' };
  }
  if (t.includes('monel') || t.includes('400')) {
    return { Nickel: '63.0% Min', Copper: '28.0 - 34.0%', Iron: '2.5% Max', Manganese: '2.0% Max', Silicon: '0.5% Max' };
  }
  if (t.includes('316')) {
    return { Chromium: '16.0 - 18.0%', Nickel: '10.0 - 14.0%', Molybdenum: '2.0 - 3.0%', Carbon: '0.030% Max', Iron: 'Balance' };
  }
  // Default Stainless 304 / Alloy composition
  return { Chromium: '18.0 - 20.0%', Nickel: '8.0 - 10.5%', Manganese: '2.0% Max', Silicon: '0.75% Max', Iron: 'Balance' };
};

// Mechanical Properties generator by alloy type
export const getMechanicalProperties = (title: string): Record<string, string> => {
  const t = title.toLowerCase();
  if (IS_REBAR.test(t)) {
    return {
      'Yield Strength 0.2% Proof (MPa)': '500 MPa Min (Fe-500) / 550 MPa Min (Fe-550D)',
      'Tensile Strength (MPa)': '545 MPa Min (Fe-500) / 600 MPa Min (Fe-550D)',
      'Elongation in 50mm (%)': '12% Min (Fe-500) / 14.5% Min (Fe-550D)',
      'Total Elongation at Maximum Force (%)': '5.0% Min',
      'Bend / Re-bend Test': 'Passes IS 1786 bend and re-bend requirement',
    };
  }
  if (t.includes('titanium')) {
    return {
      'Tensile Strength (MPa)': '880 MPa Min',
      'Yield Strength 0.2% Proof (MPa)': '830 MPa Min',
      'Elongation in 50mm (%)': '14% Min',
      'Hardness (Rockwell C)': '36 HRC Max',
      'Impact Strength (Charpy V-Notch)': '42 J Min at -20°C',
    };
  }
  if (t.includes('inconel') || t.includes('hastelloy')) {
    return {
      'Tensile Strength (MPa)': '830 MPa Min',
      'Yield Strength 0.2% Proof (MPa)': '415 MPa Min',
      'Elongation in 50mm (%)': '30% Min',
      'Hardness (Brinell HB)': '220 HB Max',
      'Impact Strength (Charpy V-Notch)': '60 J Min at RT',
    };
  }
  if (t.includes('duplex') || t.includes('2205')) {
    return {
      'Tensile Strength (MPa)': '655 - 880 MPa',
      'Yield Strength 0.2% Proof (MPa)': '450 MPa Min',
      'Elongation in 50mm (%)': '25% Min',
      'Hardness (Brinell HB)': '290 HB Max',
      'Pitting Resistance (PREN)': '34.5 Min',
    };
  }
  if (t.includes('316')) {
    return {
      'Tensile Strength (MPa)': '515 MPa Min',
      'Yield Strength 0.2% Proof (MPa)': '205 MPa Min',
      'Elongation in 50mm (%)': '40% Min',
      'Hardness (Brinell HB)': '217 HB Max',
      'Hardness (Rockwell B)': '95 HRB Max',
    };
  }
  // Default Stainless 304 / Alloy mechanical properties
  return {
    'Tensile Strength (MPa)': '515 MPa Min',
    'Yield Strength 0.2% Proof (MPa)': '205 MPa Min',
    'Elongation in 50mm (%)': '40% Min',
    'Hardness (Brinell HB)': '201 HB Max',
    'Hardness (Rockwell B)': '92 HRB Max',
  };
};

// Physical Properties generator by alloy type
export const getPhysicalProperties = (title: string): Record<string, string> => {
  const t = title.toLowerCase();
  if (IS_REBAR.test(t)) {
    return {
      Density: '7.85 g/cm³',
      'Melting Range': '1425 - 1540 °C',
      'Modulus of Elasticity': '200 GPa',
      'Thermal Conductivity': '50 W/m·K at 20°C',
      'Electrical Resistivity': '0.17 µΩ·m',
      'Specific Heat': '470 J/kg·K',
    };
  }
  if (t.includes('titanium')) {
    return {
      Density: '4.43 g/cm³',
      'Melting Range': '1604 - 1660 °C',
      'Modulus of Elasticity': '114 GPa',
      'Thermal Conductivity': '6.7 W/m·K at 20°C',
      'Electrical Resistivity': '1.78 µΩ·m',
      'Specific Heat': '526 J/kg·K',
    };
  }
  if (t.includes('inconel') || t.includes('625')) {
    return {
      Density: '8.44 g/cm³',
      'Melting Range': '1290 - 1350 °C',
      'Modulus of Elasticity': '205 GPa',
      'Thermal Conductivity': '9.8 W/m·K at 100°C',
      'Electrical Resistivity': '1.29 µΩ·m',
      'Specific Heat': '427 J/kg·K',
    };
  }
  if (t.includes('duplex') || t.includes('2205')) {
    return {
      Density: '7.80 g/cm³',
      'Melting Range': '1380 - 1440 °C',
      'Modulus of Elasticity': '200 GPa',
      'Thermal Conductivity': '19.0 W/m·K at 100°C',
      'Electrical Resistivity': '0.85 µΩ·m',
      'Specific Heat': '500 J/kg·K',
    };
  }
  return {
    Density: '8.00 g/cm³',
    'Melting Range': '1400 - 1450 °C',
    'Modulus of Elasticity': '193 GPa',
    'Thermal Conductivity': '16.2 W/m·K at 100°C',
    'Electrical Resistivity': '0.72 µΩ·m',
    'Specific Heat': '500 J/kg·K',
  };
};

// Certified Applications generator
export const getCertifiedApplications = (title: string): string[] => {
  const t = title.toLowerCase();
  if (IS_REBAR.test(t)) {
    return [
      'RCC Foundations, Columns, Beams & Slab Reinforcement',
      'High-Rise Residential & Commercial Building Frames',
      'Bridges, Flyovers & Elevated Corridor Substructures',
      'Dams, Reservoirs & Canal Lining Works',
      'Industrial Sheds, Plant Foundations & Equipment Plinths',
    ];
  }
  if (t.includes('titanium') || t.includes('aerospace')) {
    return [
      'Aerospace Structural Airframes & Jet Engine Components',
      'Offshore Subsea Wellheads & Marine Propulsion Hardware',
      'High-Concentration Nitric & Organic Acid Synthesis',
      'Medical Implant Assemblies & Surgical Grade Tubing',
      'Desalination Plant Evaporators & Brine Heaters',
    ];
  }
  if (t.includes('inconel') || t.includes('hastelloy')) {
    return [
      'Chemical Process Vessels & Sour Gas Flare Stacks',
      'Gas Turbine Exhaust Systems & Afterburners',
      'Nuclear Reactor Core Components & Control Rods',
      'High-Temperature Furnace Retorts & Radiant Tubes',
      'Offshore Oilfield Downhole Valve Assemblies',
    ];
  }
  return [
    'Petrochemical & Oil & Gas Hydrocarbon Pipelines',
    'Chemical Processing Plants & High-Pressure Vessels',
    'Power Generation Steam Lines & Condenser Units',
    'Defense & Naval Submarine Hull Assemblies',
    'Food Processing & High-Purity Pharmaceutical Lines',
  ];
};

// Manufacturing Standards generator
export const getManufacturingStandards = (title: string): string[] => {
  const t = title.toLowerCase();
  if (IS_REBAR.test(t)) {
    return ['IS 1786', 'IS 13920', 'IS 456', 'BS 4449', 'ASTM A615'];
  }
  if (t.includes('titanium')) {
    return ['ASTM B338', 'ASTM B861', 'AMS 4928', 'DIN 17861', 'ISO 5832-3'];
  }
  if (t.includes('inconel')) {
    return ['ASTM B444', 'ASTM B705', 'AMS 5581', 'ASME SB444', 'EN 10216-5'];
  }
  return ['ASTM A312', 'ASTM A213', 'ASME SA312', 'EN 10216-5', 'DIN 17458'];
};

// International Equivalent Grades generator
export const getEquivalentGrades = (title: string): string[] => {
  const t = title.toLowerCase();
  if (IS_REBAR.test(t)) {
    return ['IS 1786 Fe-500 / Fe-550D', 'BS 4449 B500B / B500C', 'ASTM A615 Gr 60 / Gr 75', 'ISO 6935-2 B500B'];
  }
  if (t.includes('titanium')) {
    return ['UNS R56400', 'W.Nr. 3.7165', 'Grade 5 / Ti-6Al-4V', 'JIS Class 60'];
  }
  if (t.includes('inconel')) {
    return ['UNS N06625', 'W.Nr. 2.4856', 'NC22DNb', 'NA 21 / Inconel 625'];
  }
  if (t.includes('duplex')) {
    return ['UNS S31803 / S32205', 'W.Nr. 1.4462', 'AFNOR Z3 CND 22-05', 'BS 318S13'];
  }
  if (t.includes('316')) {
    return ['UNS S31603', 'W.Nr. 1.4404', 'AFNOR Z3 CND 17-11-02', 'JIS SUS 316L'];
  }
  return ['UNS S30400 / S30403', 'W.Nr. 1.4301 / 1.4307', 'AFNOR Z7 CN 18-09', 'BS 304S31'];
};

// ---------------------------------------------------------------------------
// "Grades and Specification" summary box
//
// The stock summary a buyer scans before the detail tables: standard, dimension
// standard, size envelope, finish, forms we carry. Which rows apply depends on
// the product *form* (a pipe has a schedule, a flange has a pressure class), and
// the governing standard depends on the *material*, so the two are resolved
// separately and combined.
// ---------------------------------------------------------------------------

export interface GradeSpecRow {
  label: string;
  value: string;
}

export interface GradeSpecification {
  heading: string;
  rows: GradeSpecRow[];
}

export type ProductFormKey =
  | 'pipe'
  | 'plate'
  | 'bar'
  | 'flange'
  | 'forged'
  | 'buttweld'
  | 'fastener'
  | 'gasket'
  | 'structural'
  | 'rebar'
  | 'specialized';

type MaterialKey =
  | 'stainless'
  | 'duplex'
  | 'nickel'
  | 'monel'
  | 'hastelloy'
  | 'alloy20'
  | 'titanium'
  | 'cupronickel'
  | 'aluminium'
  | 'brass'
  | 'tantalum'
  | 'carbon'
  | 'alloysteel';

const FORM_BY_CATEGORY: Record<string, ProductFormKey> = {
  'Pipes & Tubes': 'pipe',
  'Plates & Sheets': 'plate',
  'Round Bars': 'bar',
  Flanges: 'flange',
  'Forged Fittings': 'forged',
  'Buttweld Fittings': 'buttweld',
  Fasteners: 'fastener',
  'Gasketing Solutions': 'gasket',
  'Structural Steel': 'structural',
  'Specialized Product': 'specialized',
};

const resolveFormKey = (category: string, subCat: string, title: string): ProductFormKey => {
  // Rebar sits inside Structural Steel but is a different product entirely —
  // IS 1786 bar diameters, not IS 808 section sizes — so it is matched first.
  if (/tmt|rebar|reinforcement bar/i.test(`${subCat} ${title}`)) return 'rebar';

  const byCategory = FORM_BY_CATEGORY[category];
  if (byCategory) return byCategory;

  // Categories are stable, but fall back to the wording so a newly added
  // category still renders a sensible row set instead of the plate default.
  const t = `${subCat} ${title}`.toLowerCase();
  if (t.includes('buttweld')) return 'buttweld';
  if (t.includes('forged fitting')) return 'forged';
  if (t.includes('flange')) return 'flange';
  if (t.includes('bolt') || t.includes('nut') || t.includes('fastener') || t.includes('screw')) return 'fastener';
  if (t.includes('gasket') || t.includes('jointing sheet')) return 'gasket';
  if (t.includes('pipe') || t.includes('tube')) return 'pipe';
  if (t.includes('bar') || t.includes('rod')) return 'bar';
  if (t.includes('beam') || t.includes('channel') || t.includes('angle')) return 'structural';
  return 'plate';
};

// Plenty of listings name more than one family ("Inconel 625 / 718 & Monel 400
// Studs", "Hastelloy C276 / C22 & Alloy 20 Flanges"), so the family whose
// keyword appears *earliest* wins — that is the grade the listing leads with.
// Array order only breaks ties, which is why the narrower family (copper nickel,
// alloy 20) is listed ahead of the broader one it contains.
const MATERIAL_PATTERNS: Array<[MaterialKey, RegExp]> = [
  ['duplex', /duplex|2205|2507|31803|32205|32750|32760/],
  ['cupronickel', /copper\s*nickel|cupro\s*nickel|cupro|cu-?ni\b|90\/10|70\/30/],
  ['alloy20', /alloy 20|carpenter 20|n08020/],
  ['hastelloy', /hastelloy/],
  ['monel', /monel/],
  ['nickel', /inconel|incoloy|nickel/],
  ['titanium', /titanium|ti-6al/],
  ['tantalum', /tantalum/],
  ['brass', /brass|bronze/],
  ['aluminium', /alumini?um/],
  ['stainless', /stainless|\bss\b/],
  ['carbon', /carbon steel|mild steel|\bms\b|\btmt\b|rebar/],
  ['alloysteel', /alloy steel/],
];

const resolveMaterialKey = (subCat: string, title: string, fallback: MaterialKey): MaterialKey => {
  // Title first: it carries the leading grade, the sub-category only qualifies it.
  const t = `${title} ${subCat}`.toLowerCase();
  let best: MaterialKey | null = null;
  let bestAt = Number.POSITIVE_INFINITY;

  for (const [key, pattern] of MATERIAL_PATTERNS) {
    const at = t.search(pattern);
    if (at >= 0 && at < bestAt) {
      best = key;
      bestAt = at;
    }
  }

  return best ?? fallback;
};

const MATERIAL_LABELS: Record<MaterialKey, string> = {
  stainless: 'Stainless Steel',
  duplex: 'Duplex / Super Duplex Stainless Steel',
  nickel: 'Nickel Alloy (Inconel / Incoloy)',
  monel: 'Monel Nickel-Copper Alloy',
  hastelloy: 'Hastelloy Nickel-Molybdenum Alloy',
  alloy20: 'Alloy 20 (Carpenter 20)',
  titanium: 'Titanium & Titanium Alloy',
  cupronickel: 'Copper Nickel (Cu-Ni)',
  aluminium: 'Aluminium Alloy',
  brass: 'Brass / Bronze',
  tantalum: 'Tantalum',
  carbon: 'Carbon Steel',
  alloysteel: 'Alloy Steel',
};

// Governing product standard, keyed by form then material. A form's `stainless`
// entry doubles as the fallback for any material we have not spelled out.
const STANDARDS: Record<ProductFormKey, Partial<Record<MaterialKey, string>>> = {
  pipe: {
    stainless: 'ASTM A312 / A213 / A269 · ASME SA312 / SA213',
    duplex: 'ASTM A790 / A789 · ASME SA790 / SA789',
    nickel: 'ASTM B444 / B161 / B167 · ASME SB444 / SB167',
    monel: 'ASTM B165 / B163 · ASME SB165',
    hastelloy: 'ASTM B622 / B619 / B626 · ASME SB622',
    alloy20: 'ASTM B729 / B464 · ASME SB729',
    titanium: 'ASTM B337 / B338 / B861 / B862',
    cupronickel: 'ASTM B466 / B467 · ASME SB466',
    aluminium: 'ASTM B210 / B221 / B241',
    carbon: 'ASTM A106 Gr. B / A53 / API 5L · ASME SA106',
    alloysteel: 'ASTM A335 / A213 · ASME SA335 (P1 to P91)',
  },
  plate: {
    stainless: 'ASTM A240 / A480 · ASME SA240',
    duplex: 'ASTM A240 / A480 · ASME SA240 (S31803 / S32205 / S32750)',
    nickel: 'ASTM B168 / B443 / B424 · ASME SB168',
    monel: 'ASTM B127 · ASME SB127',
    hastelloy: 'ASTM B575 · ASME SB575',
    alloy20: 'ASTM B463 · ASME SB463',
    titanium: 'ASTM B265 · ASME SB265',
    cupronickel: 'ASTM B171 / B122 · ASME SB171',
    aluminium: 'ASTM B209 / B928',
    brass: 'ASTM B36 / B121',
    carbon: 'ASTM A36 / A283 / A516 · ASME SA516',
    alloysteel: 'ASTM A387 / A204 · ASME SA387',
  },
  bar: {
    stainless: 'ASTM A276 / A479 / A484 · ASME SA276',
    duplex: 'ASTM A276 / A479 · ASME SA479 (S31803 / S32750)',
    nickel: 'ASTM B160 / B166 / B446 · ASME SB166',
    monel: 'ASTM B164 · ASME SB164',
    hastelloy: 'ASTM B574 · ASME SB574',
    alloy20: 'ASTM B473 · ASME SB473',
    titanium: 'ASTM B348 / F136 · ASME SB348',
    cupronickel: 'ASTM B151 / B21',
    aluminium: 'ASTM B211 / B221',
    brass: 'ASTM B16 / B124 / B453',
    tantalum: 'ASTM B365 (UNS R05200 / R05400)',
    carbon: 'ASTM A36 / A105 · IS 2062',
    alloysteel: 'ASTM A322 / A182 · EN 10083',
  },
  flange: {
    stainless: 'ASTM A182 · ASME SA182 (F304 / F316 / F321 / F347)',
    duplex: 'ASTM A182 · ASME SA182 (F51 / F53 / F55 / F60)',
    nickel: 'ASTM B564 · ASME SB564',
    monel: 'ASTM B564 · ASME SB564 (UNS N04400)',
    hastelloy: 'ASTM B564 · ASME SB564 (UNS N10276 / N06022)',
    alloy20: 'ASTM B462 · ASME SB462',
    titanium: 'ASTM B381 · ASME SB381',
    cupronickel: 'ASTM B171 / B151',
    carbon: 'ASTM A105 / A350 LF2 · ASME SA105',
    alloysteel: 'ASTM A182 F5 / F9 / F11 / F22 / F91',
  },
  forged: {
    stainless: 'ASTM A182 · ASME SA182 (F304 / F316)',
    duplex: 'ASTM A182 · ASME SA182 (F51 / F53 / F55)',
    nickel: 'ASTM B564 · ASME SB564',
    monel: 'ASTM B564 (UNS N04400)',
    hastelloy: 'ASTM B564 (UNS N10276)',
    alloy20: 'ASTM B462 · ASME SB462',
    titanium: 'ASTM B381 · ASME SB381',
    carbon: 'ASTM A105 / A350 LF2 · ASME SA105',
    alloysteel: 'ASTM A182 F11 / F22 / F91',
  },
  buttweld: {
    stainless: 'ASTM A403 · ASME SA403 (WP304 / WP316)',
    duplex: 'ASTM A815 · ASME SA815 (WP S31803 / S32750)',
    nickel: 'ASTM B366 · ASME SB366',
    monel: 'ASTM B366 (WPNC / UNS N04400)',
    hastelloy: 'ASTM B366 (WPHC276)',
    alloy20: 'ASTM B366 (WPN08020)',
    titanium: 'ASTM B363 / B366',
    cupronickel: 'ASTM B466 / B122 · MSS SP-43',
    carbon: 'ASTM A234 WPB / WPC · ASME SA234',
    alloysteel: 'ASTM A234 WP11 / WP22 / WP91',
  },
  fastener: {
    stainless: 'ASTM A193 B8 / B8M · ASTM A194 Gr. 8 / 8M · ASME SA193',
    duplex: 'ASTM A276 / A479 / F593 (S31803 / S32750)',
    nickel: 'ASTM B166 / B637 · AMS 5662 / AMS 5663',
    monel: 'ASTM B164 / F468 (UNS N04400)',
    hastelloy: 'ASTM B574 / F468 (UNS N10276)',
    titanium: 'ASTM F467 / F468 · AMS 4928',
    carbon: 'ASTM A307 / A325 / A563 · IS 1367',
    alloysteel: 'ASTM A193 B7 / B16 · ASTM A194 2H · ASTM A320 L7',
  },
  gasket: {
    stainless: 'ASME B16.20 / B16.21 · API 601 · IS 2712 · BS 7531',
  },
  structural: {
    stainless: 'ASTM A276 / A484 · EN 10088-4',
    carbon: 'IS 2062 E250 / E350 · IS 808 · ASTM A36 · EN 10025 S275 / S355',
  },
  rebar: {
    carbon: 'IS 1786 · IS 13920 (ductile detailing) · BS 4449 · ASTM A615',
  },
  specialized: {
    stainless: 'ASTM / ASME / EN / IS as applicable to grade',
  },
};

// Specialized plates are grouped by mill programme rather than alloy family, so
// their standard, hardness and material description come from the sub-category.
interface SpecializedProgramme {
  needle: string;
  standard: string;
  hardness: string;
  material: string;
}

const SPECIALIZED_PROGRAMMES: SpecializedProgramme[] = [
  {
    needle: 'abrasion resistant',
    standard: 'EN 10029 / EN 10025-6 · Mill standard (AR 400 / 450 / 500 / 600)',
    hardness: '400, 450, 500 & 600 HBW (grade dependent)',
    material: 'Quenched & tempered abrasion resistant steel',
  },
  {
    needle: 'armour',
    standard: 'MIL-DTL-46100 / MIL-DTL-12560 · EN 10025-6',
    hardness: '480 to 640 HBW ballistic hardness',
    material: 'Ballistic / armour grade alloy steel',
  },
  {
    needle: 'boiler',
    standard: 'ASTM A516 / A515 · ASME SA516 · EN 10028-2',
    hardness: '≤ 200 HBW (normalised)',
    material: 'Pressure vessel quality carbon steel',
  },
  {
    needle: 'corten',
    standard: 'ASTM A242 / A588 · IRSM 41-97 · EN 10025-5',
    hardness: '≤ 220 HBW weathering steel',
    material: 'Weathering (Corten) structural steel',
  },
  {
    needle: 'manganese',
    standard: 'ASTM A128 Gr. A / B2 / B3 · IS 276',
    hardness: '200 to 230 HBW as supplied, work hardens to 550 HBW',
    material: 'Austenitic manganese (Hadfield) steel',
  },
  {
    needle: 'quenched',
    standard: 'EN 10025-6 S690QL / S890QL · Mill standard',
    hardness: '250 to 350 HBW · 690 to 890 MPa yield',
    material: 'High yield quenched & tempered alloy steel',
  },
  {
    needle: 'dsq',
    standard: 'IS 2062 E250 / E350 · Deep drawing quality',
    hardness: '≤ 180 HBW (deep drawing quality)',
    material: 'Deep drawing quality (DSQ) carbon steel',
  },
  {
    needle: '15mo3',
    standard: 'DIN 17155 15Mo3 · EN 10028-2 16Mo3 · ASTM A204',
    hardness: '≤ 190 HBW (normalised)',
    material: 'Molybdenum alloy steel (Cr-Mo)',
  },
  {
    needle: '16mo3',
    standard: 'DIN 17155 15Mo3 · EN 10028-2 16Mo3 · ASTM A204',
    hardness: '≤ 190 HBW (normalised)',
    material: 'Molybdenum alloy steel (Cr-Mo)',
  },
  {
    needle: 'tiscral',
    standard: 'SAIL SAILHARD / TISCRAL mill standard · IS 3039',
    hardness: '380 to 450 HBW abrasion resistant',
    material: 'SAILHARD / TISCRAL abrasion resistant steel',
  },
];

// Gasket material is the construction, not an alloy family.
const GASKET_MATERIALS: Array<[string, string]> = [
  ['asbestos free', 'Non-asbestos synthetic fibre (aramid / glass) with NBR, SBR or Neoprene binder'],
  ['compressed fibre', 'Compressed fibre (CAF) with rubber binder, wire reinforced on request'],
  ['spiral wound', 'SS 304 / 316L / 321, Monel & Inconel winding with graphite, PTFE or ceramic filler'],
  ['pre cut', 'Non-metallic, semi-metallic & metallic, cut to flange profile'],
];

const CERTIFICATE_VALUE = 'EN 10204 3.1 / 3.2 mill test certificate, third-party & NABL lab reports';

const buildRows = (form: ProductFormKey, material: MaterialKey, subCat: string): GradeSpecRow[] => {
  const standard = STANDARDS[form][material] ?? STANDARDS[form].stainless ?? '';
  const materialLabel = MATERIAL_LABELS[material];

  switch (form) {
    case 'pipe':
      return [
        { label: 'Pipe & Tube Standards', value: standard },
        { label: 'Pipe & Tube Dimensions', value: 'ASTM, ASME, API, DIN, EN & JIS' },
        { label: 'Material', value: materialLabel },
        { label: 'Outside Diameter', value: '1/8" NB to 30" NB (6.00 mm to 762.00 mm), larger on request' },
        { label: 'Wall Thickness', value: '0.3 mm to 50 mm · SCH 5S to SCH XXS' },
        { label: 'Schedule', value: 'SCH 5S, 10S, 20, 40, 40S, 60, 80, 80S, 100, 120, 140, 160, XS & XXS' },
        { label: 'Length', value: 'Single Random, Double Random & cut length' },
        { label: 'Type', value: 'Seamless, ERW, EFW, Welded, Fabricated & LSAW' },
        { label: 'Form', value: 'Round, Square, Rectangular, Hydraulic, Coil, "U" bend & hollow section' },
        { label: 'End Finish', value: 'Plain end, bevelled end & threaded' },
        { label: 'Test Certificate', value: CERTIFICATE_VALUE },
      ];

    case 'plate':
      return [
        { label: 'Sheet & Plate Standards', value: standard },
        { label: 'Sheet & Plate Dimensions', value: 'ASTM, ASME, API, DIN, EN & JIS' },
        { label: 'Material', value: materialLabel },
        { label: 'Width', value: '1000 mm, 1219 mm, 1500 mm, 2000 mm, 2500 mm, 3000 mm & custom' },
        { label: 'Thickness', value: 'Sheet 0.3 mm to 6.0 mm · Plate 3.0 mm to 100 mm (thicker on request)' },
        { label: 'Length', value: '2000 mm, 2440 mm, 3000 mm, 5800 mm, 6000 mm & cut length' },
        { label: 'Tolerance', value: 'acc. EN ISO 9445:2006, other on request' },
        {
          label: 'Surface Finish',
          value:
            '2B, 2D, BA, No.1, No.4, No.8, 8K, mirror, hairline, sand blast, brush, etching, hot rolled (HR), cold rolled (CR), satin (PVC coated) etc.',
        },
        { label: 'Hardness', value: 'Soft, hard, half hard, quarter hard, spring hard etc.' },
        {
          label: 'Form',
          value: 'Sheet, plate, coil, foil, strip, shim sheet, perforated sheet, chequered plate, circle, ring & blank',
        },
        { label: 'Test Certificate', value: CERTIFICATE_VALUE },
      ];

    case 'bar':
      return [
        { label: 'Round Bar Standards', value: standard },
        { label: 'Round Bar Dimensions', value: 'ASTM, ASME, API, DIN, EN & JIS' },
        { label: 'Material', value: materialLabel },
        { label: 'Diameter / Size', value: '3 mm to 500 mm (larger on request)' },
        { label: 'Length', value: '100 mm to 6000 mm · Single Random, Double Random & cut length' },
        { label: 'Tolerance', value: 'h8, h9, h10, h11, k12 & IT-9, other on request' },
        { label: 'Surface Finish', value: 'Black, bright, polished, peeled, rough turned, centreless ground & cold drawn' },
        { label: 'Condition', value: 'Annealed, solution annealed, hot rolled, forged, cold drawn, quenched & tempered' },
        { label: 'Hardness', value: 'Soft, hard, half hard, quarter hard, spring hard etc.' },
        { label: 'Form', value: 'Round bar, square bar, hex bar, flat bar, rod, billet, ingot, wire, forged bar & hollow bar' },
        { label: 'Test Certificate', value: CERTIFICATE_VALUE },
      ];

    case 'flange':
      return [
        { label: 'Flange Standards', value: standard },
        {
          label: 'Flange Dimensions',
          value: 'ANSI / ASME B16.5, B16.47 Series A & B, B16.48, BS 4504, BS 10, EN 1092, DIN, JIS & IS',
        },
        { label: 'Material', value: materialLabel },
        { label: 'Size', value: '1/2" (15 NB) to 48" (1200 NB), larger on request' },
        {
          label: 'Class / Pressure Rating',
          value: '150#, 300#, 600#, 900#, 1500#, 2500#, PN6, PN10, PN16, PN25, PN40 & PN64',
        },
        {
          label: 'Flange Face Type',
          value: 'Flat face (FF), raised face (RF), ring type joint (RTJ), tongue & groove, male & female',
        },
        { label: 'Standard', value: 'ANSI, ASME, BS, DIN, EN, JIS, GOST & IS flanges' },
        {
          label: 'Types',
          value:
            'Weld neck (WNRF), slip-on (SORF), blind, socket weld, lap joint, threaded / screwed, orifice, long weld neck, spectacle blind, reducing, plate & ring type joint flanges',
        },
        { label: 'Test Certificate', value: CERTIFICATE_VALUE },
      ];

    case 'forged':
      return [
        { label: 'Forged Fitting Standards', value: standard },
        {
          label: 'Forged Fitting Dimensions',
          value: 'ASME B16.11, MSS SP-79, MSS SP-83, MSS SP-95, MSS SP-97 & BS 3799',
        },
        { label: 'Material', value: materialLabel },
        { label: 'Size', value: '1/8" NB to 4" NB' },
        { label: 'Class / Pressure Rating', value: '2000#, 3000#, 6000# & 9000#' },
        { label: 'End Connection', value: 'Socket weld (SW) & screwed / threaded (NPT, BSP, BSPT)' },
        {
          label: 'Types',
          value:
            '90° & 45° elbow, equal & reducing tee, cross, full & half coupling, union, plug, bushing, cap, nipple, swage nipple, boss & adaptor',
        },
        { label: 'Test Certificate', value: CERTIFICATE_VALUE },
      ];

    case 'buttweld':
      return [
        { label: 'Buttweld Fitting Standards', value: standard },
        {
          label: 'Buttweld Fitting Dimensions',
          value: 'ASME B16.9, ASME B16.28, MSS SP-43, MSS SP-75 & BS 1640',
        },
        { label: 'Material', value: materialLabel },
        { label: 'Size', value: '1/2" NB to 48" NB, larger on request' },
        { label: 'Thickness / Schedule', value: 'SCH 5S, 10S, 20, 40, 40S, 80, 80S, 120, 160, XS & XXS' },
        { label: 'Bend Radius', value: 'R = 1D, 1.5D, 2D, 3D, 5D, 6D, 8D & 10D' },
        { label: 'Type', value: 'Seamless, welded & fabricated' },
        {
          label: 'Types',
          value:
            '90°, 45° & 180° elbow, equal & reducing tee, concentric & eccentric reducer, cap, stub end, cross & pipe bend',
        },
        { label: 'Test Certificate', value: CERTIFICATE_VALUE },
      ];

    case 'fastener':
      return [
        { label: 'Fastener Standards', value: standard },
        {
          label: 'Fastener Dimensions',
          value: 'ASME B18.2.1, B18.2.2, B18.22.1, DIN, ISO, JIS & IS 1367',
        },
        { label: 'Material', value: materialLabel },
        { label: 'Size', value: 'M2 to M160 · 3 mm to 200 mm · 1/4" to 6"' },
        { label: 'Length', value: '3 mm to 200 mm & custom lengths' },
        { label: 'Thread', value: 'Metric coarse & fine, UNC, UNF, BSW, BSF, ACME, NPT & BSP' },
        { label: 'Property Class / Grade', value: '4.6, 4.8, 8.8, 10.9, 12.9 · B7, B8, B8M, B16, 2H & 8M' },
        {
          label: 'Surface Finish',
          value: 'Plain / black, zinc plated, hot dip galvanised, PTFE / Xylan coated, cadmium plated & passivated',
        },
        {
          label: 'Types',
          value:
            'Hex bolts, stud bolts, threaded rods, hex & heavy hex nuts, washers, machine screws, anchor bolts, eye bolts & U-bolts',
        },
        { label: 'Test Certificate', value: CERTIFICATE_VALUE },
      ];

    case 'gasket': {
      const gasketMaterial = GASKET_MATERIALS.find(([needle]) => subCat.toLowerCase().includes(needle));
      return [
        { label: 'Gasket Standards', value: standard },
        { label: 'Gasket Dimensions', value: 'ASME B16.5, B16.47 Series A & B, EN 1514, DIN & JIS' },
        { label: 'Material', value: gasketMaterial ? gasketMaterial[1] : 'Non-metallic, semi-metallic & metallic gasket materials' },
        { label: 'Size', value: '1/2" (15 NB) to 48" (1200 NB) & custom profiles' },
        { label: 'Sheet Size', value: '1500 × 1500 mm, 2000 × 1500 mm, 3000 × 1500 mm & roll form' },
        { label: 'Thickness', value: '0.4 mm to 6.0 mm (sheet) · 3.2 mm to 6.4 mm (spiral wound)' },
        { label: 'Class / Pressure Rating', value: '150#, 300#, 600#, 900#, 1500#, 2500# · PN6 to PN64' },
        { label: 'Temperature Range', value: '−196 °C to +550 °C (grade dependent)' },
        {
          label: 'Types',
          value:
            'Spiral wound, ring type joint (RTJ), metal jacketed, kammprofile, corrugated, full face, inside bolt circle & cut sheet gaskets',
        },
        { label: 'Test Certificate', value: CERTIFICATE_VALUE },
      ];
    }

    case 'structural':
      return [
        { label: 'Structural Steel Standards', value: STANDARDS.structural[material] ?? STANDARDS.structural.carbon ?? '' },
        { label: 'Structural Dimensions', value: 'IS 808, IS 2062, ASTM A6, EN 10365 & JIS G3192' },
        { label: 'Material', value: material === 'stainless' ? MATERIAL_LABELS.stainless : 'Mild / structural carbon steel' },
        { label: 'Size', value: '25 × 25 mm to 600 × 210 mm (section dependent)' },
        { label: 'Thickness', value: '3 mm to 50 mm' },
        { label: 'Length', value: '6 m, 9 m, 12 m & cut length' },
        { label: 'Grade', value: 'E250 (Fe 410), E350, E410, S235JR, S275JR, S355JR & ASTM A36' },
        { label: 'Surface Finish', value: 'Hot rolled, black, shot blasted, primer coated & hot dip galvanised' },
        {
          label: 'Types',
          value: 'Angles (ISA), beams (ISMB), channels (ISMC), columns (ISHB), parallel flange beams, tees & flats',
        },
        { label: 'Test Certificate', value: CERTIFICATE_VALUE },
      ];

    // Figures below follow IS 1786 and the size/weight schedule the rolling
    // mills publish for Fe-500 / Fe-550D bar.
    case 'rebar':
      return [
        { label: 'Rebar Standards', value: STANDARDS.rebar[material] ?? STANDARDS.rebar.carbon ?? '' },
        { label: 'Grade', value: 'Fe-500 & Fe-550D (Fe-500D / Fe-550 on indent)' },
        { label: 'Material', value: 'Thermo-mechanically treated (TMT) carbon steel' },
        { label: 'Size', value: '8 mm, 10 mm, 12 mm, 16 mm, 20 mm, 25 mm & 32 mm diameter' },
        { label: 'Length', value: '12 m standard; cut length & bent-to-shape on request' },
        {
          label: 'Unit Weight',
          value:
            '8 mm 0.395 kg/m · 10 mm 0.617 kg/m · 12 mm 0.888 kg/m · 16 mm 1.580 kg/m · 20 mm 2.470 kg/m · 25 mm 3.850 kg/m · 32 mm 6.310 kg/m',
        },
        { label: 'Surface', value: 'Ribbed / deformed high-bond pattern, mill black finish' },
        {
          label: 'Applications',
          value: 'RCC construction, high-rise buildings, bridges & flyovers, dams and industrial structures',
        },
        { label: 'Test Certificate', value: CERTIFICATE_VALUE },
      ];

    case 'specialized':
    default: {
      const key = subCat.toLowerCase();
      const programme = SPECIALIZED_PROGRAMMES.find((p) => key.includes(p.needle));
      return [
        { label: 'Plate Standards', value: programme?.standard ?? STANDARDS.specialized.stainless ?? '' },
        { label: 'Plate Dimensions', value: 'ASTM, ASME, EN, DIN & IS' },
        { label: 'Material', value: programme?.material ?? materialLabel },
        { label: 'Width', value: '1000 mm to 3200 mm' },
        { label: 'Thickness', value: '3 mm to 150 mm (thicker on request)' },
        { label: 'Length', value: '2000 mm to 12000 mm & cut length' },
        { label: 'Hardness', value: programme?.hardness ?? 'As per grade specification' },
        { label: 'Condition', value: 'Quenched & tempered, normalised, as-rolled & annealed' },
        { label: 'Surface Finish', value: 'Hot rolled, descaled, shot blasted & primer coated' },
        { label: 'Test Certificate', value: CERTIFICATE_VALUE },
      ];
    }
  }
};

// Detail-page gallery thumbnails, from the client's product photography.
// Keyed by form so a flange page shows other flanges rather than a mix of
// pipes and bars.
const GALLERY_BY_FORM: Record<ProductFormKey, string[]> = {
  pipe: ['client/ss-seamless-piping.jpg', 'client/images-2.jpg', 'client/stainless-steel-pipe.jpg', 'client/02.jpg'],
  plate: ['client/stainless-steel-sheets-plates.jpg', 'client/images-5.jpg', 'client/3.webp', 'client/304-ss-sheet-500x500.webp'],
  bar: ['client/images-8.jpg', 'client/8776124.jpg', 'client/ss-316-hex-and-square-bars-thumbs-500x500.jpg', 'client/super-duplex-steel-round-bar.webp'],
  flange: ['client/ss-flanges.jpg', 'client/images-10.jpg', 'client/stainless-steel-flange.webp', 'client/large-diameter-stainless-steel-flanges.jpg'],
  forged: ['client/stainless-steel-forged-fittings.jpg', 'client/threaded-forged-fitting.jpg', 'client/images-13.jpg', 'client/ms-forged-elbow-45degree.jpg'],
  buttweld: ['client/stainless-steel-buttweld-fittings.jpg', 'client/butt-welding-fitting.jpg', 'client/images-15.jpg', 'client/buttweld-fittings.jpg'],
  fastener: ['client/stainless-steel-fasteners-500x500.webp', 'client/images-16.jpg', 'client/60f27d878e28f-fasteners.jpg', 'client/ss-fastners.webp'],
  // One representative of each sealing family. The old list here was flange and
  // fitting photography — the hardware a gasket is bolted between, not the
  // gasket — so every gasket page showed three pictures of the wrong product.
  gasket: [
    'products/af-fibre-sheet-standard.jpg',
    'products/caf-jointing-sheet-std.jpg',
    'products/spiral-wound-gasket-ss304.jpg',
    'products/pre-cut-flange-gasket-fullface.jpg',
  ],
  // Rolled sections photographed as stock, not the generic plant shots that
  // used to sit here — a beam page should show beams.
  structural: [
    'products/mild-steel-beams.jpg',
    'products/mild-steel-angles.jpg',
    'products/mild-steel-channels.jpg',
    'products/universal-column.jpg',
  ],
  rebar: [
    'products/tmt-rebar.jpg',
    'products/structural-steel-sections.jpg',
    'products/mild-steel-beams.jpg',
    'products/mild-steel-angles.jpg',
  ],
  // The specialized plate programmes are carbon-steel wear, armour and boiler
  // plate — the client's stainless photography reads wrong here, and the plant
  // shots we used before showed no product at all, so this row draws on the
  // heavy-plate photographs Champak publishes for the same programmes.
  specialized: [
    'champak/other-items-manufacturer-exporter.jpg',
    'champak/quenched-tempered-steel-plates-supplier-stockist.jpg',
    'champak/boiler-steel-plates-sheets-supplier-stockist.jpg',
    'champak/abrex-400-plates.jpg',
  ],
};

/**
 * Same forms again, in carbon and alloy steel.
 *
 * The pools above are the client's stainless photography — bright, polished
 * stock. Carbon and alloy steel ship in black mill-scale finish, so filling an
 * alloy steel pipe's gallery from the stainless pool misrepresents the
 * material. These are Champak's own photographs of carbon/alloy stock.
 *
 * Forms absent here (gasket, structural, specialized) are never resolved to a
 * carbon/alloy material in a way the stainless pool would misrepresent.
 */
const BLACK_GALLERY_BY_FORM: Partial<Record<ProductFormKey, string[]>> = {
  pipe: [
    'champak/alloy-steel-welded-pipe-manufacturer.jpg',
    'champak/alloy-steel-a691-welded-pipe-manufacturer.jpg',
    'champak/alloy-steel-p22-seamless-welded-pipe-manufacturer.jpg',
    'champak/carbon-steel-seamless-ERW-pipes-tubes-manufacturer-exporter.jpg',
  ],
  plate: [
    'champak/mild-steel-plates-sheets-manufacturer-exporter.jpg',
    'champak/sa-387-gr-5-sheets-plates-manufacturer-stockiest-supplier.jpg',
    'champak/sa-387-gr-11-sheets-plates-manufacturer-stockiest-supplier.jpg',
    'champak/api-5l-x-series-plates-sheets-manufacturer-exporter.jpg',
  ],
  bar: [
    'champak/alloy-steel-f5-round-bars-rods-supplier-stockist.jpg',
    'champak/alloy-steel-f22-round-bars-rods-supplier-stockist.jpg',
    'champak/alloy-steel-f12-round-bars-rods-supplier-stockist.jpg',
    'champak/alloy-steel-f92-round-bars-rods-supplier-stockist.jpg',
  ],
  flange: [
    'champak/alloy-steel-f11-flanges-suppliers-exporters.jpg',
    'champak/alloy-steel-f22-flanges-suppliers-exporters.jpg',
    'champak/alloy-steel-f92-flanges-suppliers-exporters.jpg',
    'champak/alloy-steel-f12-flanges-suppliers-exporters.jpg',
  ],
  forged: ['champak/carbon-steel-forged-fittings-suppliers-exporters.jpg'],
  buttweld: [
    'champak/alloy-steel-buttweld-fittings-suppliers-exporters.jpg',
    'champak/carbon-steel-buttweld-fittings-suppliers-exporters.jpg',
  ],
  fastener: [
    'champak/carbon-steel-fasteners-manufacturer-exporter.jpg',
    'champak/alloy-steel-fasteners-suppliers-exporters.jpg',
  ],
};

/**
 * Gaskets are the one form where the sub-category *is* the product: a compressed
 * fibre sheet, a spiral wound ring and a metal jacketed heat exchanger gasket
 * share a category and look nothing alike. A single pool cannot serve all four,
 * so each sub-category draws on its own siblings, with one neighbouring family
 * to fill the fourth slot once the product's own image is deduped out.
 */
const GASKET_GALLERY_BY_SUBCAT: Record<string, string[]> = {
  'Asbestos Free (AF) Fibre Jointing Sheets': [
    'products/af-fibre-sheet-standard.jpg',
    'products/af-fibre-sheet-ht.jpg',
    'products/af-fibre-sheet-reinforced.jpg',
    'products/caf-jointing-sheet-std.jpg',
  ],
  'Compressed Fibre (CAF) Jointing Sheets': [
    'products/caf-jointing-sheet-std.jpg',
    'products/caf-jointing-sheet-acid.jpg',
    'products/caf-jointing-sheet-metallic.jpg',
    'products/af-fibre-sheet-standard.jpg',
  ],
  'Spiral Wound Gaskets': [
    'products/spiral-wound-gasket-ss304.jpg',
    'products/spiral-wound-gasket-ss316l.jpg',
    'products/spiral-wound-gasket-inconel.jpg',
    'products/pre-cut-gasket-metal-jacketed.jpg',
  ],
  'Pre Cut Gaskets': [
    'products/pre-cut-flange-gasket-fullface.jpg',
    'products/pre-cut-flange-gasket-ring.jpg',
    'products/pre-cut-gasket-metal-jacketed.jpg',
    'products/spiral-wound-gasket-ss304.jpg',
  ],
};

/**
 * Thumbnails for the detail-page gallery.
 *
 * Order: the product's own card image, then the photograph Champak publishes
 * for that exact grade (when we hold one — it is the real article, so it earns
 * second place), then same-form shots. Carbon and alloy steel draw those
 * same-form shots from the black pool, so a black mill-scale product is never
 * padded out with polished stainless.
 */
export const getGalleryImages = (
  product: { title: string; category: string; subCat: string; image: string },
  /** Champak's photo of this exact grade, from `getChampakImage`. */
  champakImage?: string | null
): string[] => {
  const form = resolveFormKey(product.category, product.subCat, product.title);
  const material = resolveMaterialKey(product.subCat, product.title, 'stainless');
  const isBlackSteel = material === 'carbon' || material === 'alloysteel';
  const sameForm =
    (form === 'gasket' && GASKET_GALLERY_BY_SUBCAT[product.subCat]) ||
    (isBlackSteel && BLACK_GALLERY_BY_FORM[form]) ||
    GALLERY_BY_FORM[form];

  const pool = [
    product.image,
    ...(champakImage ? [champakImage] : []),
    ...sameForm.map((f) => `/images/${f}`),
  ];
  return [...new Set(pool)].slice(0, 4);
};

export const getGradeSpecification = (product: {
  title: string;
  category: string;
  subCat: string;
}): GradeSpecification => {
  const form = resolveFormKey(product.category, product.subCat, product.title);
  // Structural sections and the specialized plate programmes are carbon/alloy
  // steel unless the listing says otherwise; everywhere else stainless is the
  // safer default for an unnamed grade.
  const fallbackMaterial: MaterialKey = form === 'structural' || form === 'specialized' ? 'carbon' : 'stainless';
  const material = resolveMaterialKey(product.subCat, product.title, fallbackMaterial);

  return {
    heading: `${product.title} Grades and Specification`,
    rows: buildRows(form, material, product.subCat),
  };
};

export interface ScrapedGradeTableData {
  chemHeaders: string[];
  chemRows: string[][];
  mechHeaders: string[];
  mechRows: string[][];
}

export const getScrapedGradeTableData = (title: string): ScrapedGradeTableData => {
  const t = title.toLowerCase();

  if (IS_REBAR.test(t)) {
    // IS 1786:2008, Tables 3 and 5. Chemistry is the ladle analysis limit;
    // UTS is expressed as the standard does, relative to the actual yield.
    return {
      chemHeaders: ['Grade', 'C % Max', 'S % Max', 'P % Max', 'S + P % Max', 'Fe'],
      chemRows: [
        ['Fe-500', '0.300', '0.055', '0.055', '0.105', 'Balance'],
        ['Fe-500D', '0.250', '0.040', '0.040', '0.075', 'Balance'],
        ['Fe-550', '0.300', '0.055', '0.050', '0.100', 'Balance'],
        ['Fe-550D', '0.250', '0.040', '0.040', '0.075', 'Balance'],
      ],
      mechHeaders: [
        'Grade',
        'Yield Strength MPa (min)',
        'Tensile Strength MPa (min)',
        'UTS / YS Ratio (min)',
        'Elongation % (min)',
        'Total Elongation at Max Force % (min)',
      ],
      mechRows: [
        ['Fe-500', '500', '545', '1.08', '12.0', '5.0'],
        ['Fe-500D', '500', '565', '1.10', '16.0', '5.0'],
        ['Fe-550', '550', '585', '1.06', '10.0', '5.0'],
        ['Fe-550D', '550', '600', '1.08', '14.5', '5.0'],
      ],
    };
  }

  if (t.includes('409') || t.includes('410') || t.includes('430')) {
    return {
      chemHeaders: ['Grade', 'C', 'Mn', 'Si', 'P', 'S', 'Cr', 'Ni', 'Other Elements'],
      chemRows: [
        ['409', '0.08max', '1.0max', '1.0max', '0.040max', '0.03max', 'min: 10.5 max: 11.7', '0.5 max', 'Ti=6X(C+N)Min'],
        ['409L', '0.03max', '1.0max', '1.0max', '0.040max', '0.03max', 'min: 10.5 max: 11.7', '1.5 max', 'Ti=6X(C+N)Min., 0.75Max'],
        ['410', '0.15max', '1.0max', '1.0max', '0.040max', '0.03max', 'min: 11.5 max: 13.5', '0.75 max', '-'],
        ['430', '0.12max', '1.0max', '1.0max', '0.040max', '0.03max', 'min: 16.0 max: 18.0', '0.75 max', '-'],
      ],
      mechHeaders: ['Grade', 'Tensile Strength ksi (min)', 'Yield Strength 0.2% ksi (min)', 'Elongation %', 'Hardness (Brinell) MAX', 'Hardness (Rockwell B) MAX'],
      mechRows: [
        ['409', '55', '25', '20', '175', '88'],
        ['409L', '55', '25', '20', '175', '88'],
        ['410', '65', '35', '20', '210', '96'],
        ['430', '65', '30', '22', '183', '89'],
      ],
    };
  }

  if (t.includes('316')) {
    return {
      chemHeaders: ['Grade', 'C', 'Mn', 'Si', 'P', 'S', 'Cr', 'Ni', 'Mo', 'N'],
      chemRows: [
        ['316', '0.08max', '2.0max', '0.75max', '0.045max', '0.03max', 'min: 16.0 max: 18.0', 'min: 10.0 max: 14.0', 'min: 2.0 max: 3.0', 'NA'],
        ['316L', '0.03max', '2.0max', '0.75max', '0.045max', '0.03max', 'min: 16.0 max: 18.0', 'min: 10.0 max: 14.0', 'min: 2.0 max: 3.0', '0.10 max'],
        ['316H', 'min: 0.04 max: 0.10', '2.0max', '0.75max', '0.045max', '0.03max', 'min: 16.0 max: 18.0', 'min: 10.0 max: 14.0', 'min: 2.0 max: 3.0', 'NA'],
        ['316Ti', '0.08max', '2.0max', '0.75max', '0.045max', '0.03max', 'min: 16.0 max: 18.0', 'min: 10.0 max: 14.0', 'min: 2.0 max: 3.0', 'Ti=5x(C+N)'],
      ],
      mechHeaders: ['Grade', 'Tensile Strength ksi (min)', 'Yield Strength 0.2% ksi (min)', 'Elongation %', 'Hardness (Brinell) MAX', 'Hardness (Rockwell B) MAX'],
      mechRows: [
        ['316', '75', '30', '40', '217', '95'],
        ['316L', '70', '25', '40', '217', '95'],
        ['316H', '75', '30', '40', '217', '95'],
        ['316Ti', '75', '30', '40', '217', '95'],
      ],
    };
  }

  if (t.includes('2205') || t.includes('duplex')) {
    return {
      chemHeaders: ['Grade', 'UNS', 'C', 'Cr', 'Ni', 'Mo', 'N', 'Cu', 'PREN'],
      chemRows: [
        ['2205', 'S31803 / S32205', '0.03max', 'min: 22.0 max: 23.0', 'min: 4.5 max: 6.5', 'min: 3.0 max: 3.5', 'min: 0.14 max: 0.20', 'NA', '≥ 34.5'],
        ['2507', 'S32750', '0.03max', 'min: 24.0 max: 26.0', 'min: 6.0 max: 8.0', 'min: 3.0 max: 5.0', 'min: 0.24 max: 0.32', '0.50', '≥ 42.0'],
        ['2101', 'S32101', '0.04max', 'min: 21.0 max: 22.0', 'min: 1.35 max: 1.70', 'min: 0.10 max: 0.80', 'min: 0.20 max: 0.25', '0.80 max', '≥ 26.0'],
      ],
      mechHeaders: ['Grade', 'Tensile Strength ksi (min)', 'Yield Strength 0.2% ksi (min)', 'Elongation %', 'Hardness (Brinell) MAX', 'Hardness (Rockwell C) MAX'],
      mechRows: [
        ['2205', '95', '65', '25', '290', '31'],
        ['2507', '116', '80', '15', '310', '32'],
        ['2101', '101', '65', '30', '290', '29'],
      ],
    };
  }

  if (t.includes('titanium')) {
    return {
      chemHeaders: ['Grade', 'UNS', 'Ti', 'Al', 'V', 'Fe', 'O', 'C', 'N'],
      chemRows: [
        ['Ti Gr 1', 'R50250', 'Balance', 'NA', 'NA', '0.20max', '0.18max', '0.08max', '0.03max'],
        ['Ti Gr 2', 'R50400', 'Balance', 'NA', 'NA', '0.30max', '0.25max', '0.08max', '0.03max'],
        ['Ti Gr 5', 'R56400', 'Balance', 'min: 5.5 max: 6.75', 'min: 3.5 max: 4.5', '0.40max', '0.20max', '0.08max', '0.05max'],
      ],
      mechHeaders: ['Grade', 'Tensile Strength ksi (min)', 'Yield Strength 0.2% ksi (min)', 'Elongation %', 'Hardness (Brinell) MAX', 'Hardness (Rockwell C) MAX'],
      mechRows: [
        ['Ti Gr 1', '35', '25', '24', '120', '15'],
        ['Ti Gr 2', '50', '40', '20', '160', '20'],
        ['Ti Gr 5', '130', '120', '14', '330', '36'],
      ],
    };
  }

  if (t.includes('inconel') || t.includes('625') || t.includes('hastelloy')) {
    return {
      chemHeaders: ['Grade', 'UNS', 'Ni', 'Cr', 'Mo', 'Nb + Ta', 'Fe', 'C', 'Cu'],
      chemRows: [
        ['Inconel 600', 'N06600', 'min: 72.0', 'min: 14.0 max: 17.0', 'NA', 'NA', 'min: 6.0 max: 10.0', '0.15max', '0.50max'],
        ['Inconel 625', 'N06625', 'min: 58.0', 'min: 20.0 max: 23.0', 'min: 8.0 max: 10.0', 'min: 3.15 max: 4.15', '5.0max', '0.10max', 'NA'],
        ['Incoloy 825', 'N08825', 'min: 38.0 max: 46.0', 'min: 19.5 max: 23.5', 'min: 2.5 max: 3.5', 'NA', 'min: 22.0', '0.05max', 'min: 1.5 max: 3.0'],
        ['Hastelloy C276', 'N10276', 'Balance (~57%)', 'min: 14.5 max: 16.5', 'min: 15.0 max: 17.0', 'NA', 'min: 4.0 max: 7.0', '0.01max', 'NA'],
      ],
      mechHeaders: ['Grade', 'Tensile Strength ksi (min)', 'Yield Strength 0.2% ksi (min)', 'Elongation %', 'Hardness (Brinell) MAX', 'Hardness (Rockwell B) MAX'],
      mechRows: [
        ['Inconel 600', '80', '35', '30', '180', '90'],
        ['Inconel 625', '120', '60', '30', '220', '98'],
        ['Incoloy 825', '85', '35', '30', '180', '90'],
        ['Hastelloy C276', '100', '41', '40', '220', '98'],
      ],
    };
  }

  // Default SS 304 / 304L / 304H Series (Exact Champak Steel Screenshot format)
  return {
    chemHeaders: ['Grade', 'C', 'Mn', 'Si', 'P', 'S', 'Cr', 'Ni', 'N'],
    chemRows: [
      ['304', '0.07max', '2.0max', '0.75max', '0.045max', '0.03max', 'min: 18.0 max: 20.0', 'min: 8.0 max: 10.5', 'NA'],
      ['304L', '0.03max', '2.0max', '0.75max', '0.045max', '0.03max', 'min: 18.0 max: 20.0', 'min: 8.0 max: 12.0', '0.10 max'],
      // Champak seats this row's values under shifted headers. Re-seated on
      // 2026-08-20 to match palgottametal.com, the reference the site owner
      // chose — same change as the `304H-column-shift` rule in
      // scripts/champak/generate.cjs, which fixes the published tables. This
      // copy feeds the 14 products that have no source page, so the two must be
      // kept in step or the same grade prints two different chemistries.
      ['304H', '0.04 - 0.10', '2.00 max', '0.75 max', '0.045 max', '0.030 max', '18.00 - 20.00', '8.0 - 10.5', '0.10 max'],
    ],
    mechHeaders: ['Grade', 'Tensile Strength ksi (min)', 'Yield Strength 0.2% ksi (min)', 'Elongation %', 'Hardness (Brinell) MAX', 'Hardness (Rockwell B) MAX'],
    mechRows: [
      ['304', '75', '30', '40', '201', '92'],
      ['304L', '70', '25', '40', '201', '92'],
      ['304H', '75', '30', '40', '201', '92'],
    ],
  };
};
