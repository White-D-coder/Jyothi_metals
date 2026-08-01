// Generic fallback product data, used by the product detail page whenever a
// product has no published spec tables in `champakSpecs`. Kept in its own
// module so the catalogue export script renders exactly what the site renders.

// Price generator by alloy type
export const getAlloyPricePerKg = (title: string): number => {
  const t = title.toLowerCase();
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

export interface ScrapedGradeTableData {
  chemHeaders: string[];
  chemRows: string[][];
  mechHeaders: string[];
  mechRows: string[][];
}

export const getScrapedGradeTableData = (title: string): ScrapedGradeTableData => {
  const t = title.toLowerCase();

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
        ['316', '0.08max', '2.0max', '0.75max', '0.045max', '0.03max', 'min: 16.0 max: 18.0', 'min: 10.0 max: 14.0', 'min: 2.0 max: 3.0', '—'],
        ['316L', '0.03max', '2.0max', '0.75max', '0.045max', '0.03max', 'min: 16.0 max: 18.0', 'min: 10.0 max: 14.0', 'min: 2.0 max: 3.0', '0.10 max'],
        ['316H', 'min: 0.04 max: 0.10', '2.0max', '0.75max', '0.045max', '0.03max', 'min: 16.0 max: 18.0', 'min: 10.0 max: 14.0', 'min: 2.0 max: 3.0', '—'],
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
        ['2205', 'S31803 / S32205', '0.03max', 'min: 22.0 max: 23.0', 'min: 4.5 max: 6.5', 'min: 3.0 max: 3.5', 'min: 0.14 max: 0.20', '—', '≥ 34.5'],
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
        ['Ti Gr 1', 'R50250', 'Balance', '—', '—', '0.20max', '0.18max', '0.08max', '0.03max'],
        ['Ti Gr 2', 'R50400', 'Balance', '—', '—', '0.30max', '0.25max', '0.08max', '0.03max'],
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
        ['Inconel 600', 'N06600', 'min: 72.0', 'min: 14.0 max: 17.0', '—', '—', 'min: 6.0 max: 10.0', '0.15max', '0.50max'],
        ['Inconel 625', 'N06625', 'min: 58.0', 'min: 20.0 max: 23.0', 'min: 8.0 max: 10.0', 'min: 3.15 max: 4.15', '5.0max', '0.10max', '—'],
        ['Incoloy 825', 'N08825', 'min: 38.0 max: 46.0', 'min: 19.5 max: 23.5', 'min: 2.5 max: 3.5', '—', 'min: 22.0', '0.05max', 'min: 1.5 max: 3.0'],
        ['Hastelloy C276', 'N10276', 'Balance (~57%)', 'min: 14.5 max: 16.5', 'min: 15.0 max: 17.0', '—', 'min: 4.0 max: 7.0', '0.01max', '—'],
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
      ['304', '0.07max', '2.0max', '0.75max', '0.045max', '0.03max', 'min: 18.0 max: 20.0', 'min: 8.0 max: 10.5', '—'],
      ['304L', '0.03max', '2.0max', '0.75max', '0.045max', '0.03max', 'min: 18.0 max: 20.0', 'min: 8.0 max: 12.0', '0.10 max'],
      ['304H', 'min: 0.04 max: 0.10', '2.0max', '0.75max', '0.045max', '0.03max', 'min: 18.0 max: 20.0', 'min: 8.0 max: 10.5', '0.10 max'],
    ],
    mechHeaders: ['Grade', 'Tensile Strength ksi (min)', 'Yield Strength 0.2% ksi (min)', 'Elongation %', 'Hardness (Brinell) MAX', 'Hardness (Rockwell B) MAX'],
    mechRows: [
      ['304', '75', '30', '40', '201', '92'],
      ['304L', '70', '25', '40', '201', '92'],
      ['304H', '75', '30', '40', '201', '92'],
    ],
  };
};
