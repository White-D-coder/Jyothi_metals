import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Star,
  ShieldCheck,
  CheckCircle2,
  Send,
  Truck,
  Plus,
  Layers,
  FileCheck,
  ArrowRight,
  ZoomIn,
} from 'lucide-react';
import { catalogProducts, type CatalogProduct } from '../data/catalogData';

interface ProductDetailPageProps {
  onOpenQuoteModal: (productName?: string) => void;
}

// Price generator by alloy type
const getAlloyPricePerKg = (title: string): number => {
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
const getAlloyComposition = (title: string): Record<string, string> => {
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
const getMechanicalProperties = (title: string): Record<string, string> => {
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
const getPhysicalProperties = (title: string): Record<string, string> => {
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
const getCertifiedApplications = (title: string): string[] => {
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
const getManufacturingStandards = (title: string): string[] => {
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
const getEquivalentGrades = (title: string): string[] => {
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

interface ScrapedGradeTableData {
  chemHeaders: string[];
  chemRows: string[][];
  mechHeaders: string[];
  mechRows: string[][];
}

const getScrapedGradeTableData = (title: string): ScrapedGradeTableData => {
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

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ onOpenQuoteModal }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const rawId = searchParams.get('id') || '';

  // Find exact product in catalog database by ID or title
  const currentProduct: CatalogProduct = useMemo(() => {
    if (!rawId) return catalogProducts[0];
    const match = catalogProducts.find(
      (p) => p.id === rawId || p.title.toLowerCase() === rawId.toLowerCase() || encodeURIComponent(p.id) === rawId
    );
    return match || catalogProducts[0];
  }, [rawId]);

  const composition = useMemo(
    () => getAlloyComposition(currentProduct.title),
    [currentProduct]
  );

  const mechanicalProps = useMemo(
    () => getMechanicalProperties(currentProduct.title),
    [currentProduct]
  );

  const physicalProps = useMemo(
    () => getPhysicalProperties(currentProduct.title),
    [currentProduct]
  );

  const scrapedTable = useMemo(
    () => getScrapedGradeTableData(currentProduct.title),
    [currentProduct]
  );

  const appList = useMemo(
    () => getCertifiedApplications(currentProduct.title),
    [currentProduct]
  );

  const stdList = useMemo(
    () => getManufacturingStandards(currentProduct.title),
    [currentProduct]
  );

  const eqList = useMemo(
    () => getEquivalentGrades(currentProduct.title),
    [currentProduct]
  );

  // Gallery imagery
  const galleryImages = useMemo(() => {
    const main = currentProduct.image || '/images/stainless_pipes.png';
    const pool = [
      '/images/stainless_pipes.png',
      '/images/pipe_fittings.png',
      '/images/flanges_industrial.png',
      '/images/round_bars.png',
      '/images/titanium_plates.png',
      '/images/precision_parts.png',
    ].filter((img) => img !== main);
    return [main, ...pool.slice(0, 3)];
  }, [currentProduct]);

  const [activeImage, setActiveImage] = useState<string>(galleryImages[0]);
  const [quantityKgs] = useState<number>(500);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'comp' | 'apps'>('desc');

  // Related products from same category
  const relatedProducts = useMemo(() => {
    const sameCat = catalogProducts.filter(
      (p) => p.category === currentProduct.category && p.id !== currentProduct.id
    );
    const selected = sameCat.length >= 3 ? sameCat.slice(0, 3) : catalogProducts.slice(1, 4);
    return selected;
  }, [currentProduct]);

  return (
    <div className="product-detail-root" style={{ background: '#F8F8F8', minHeight: '100vh', color: '#304050', paddingBottom: '80px' }}>
      <style>{`
        .product-detail-root {
          font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .thumb-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-top: 14px;
        }
        .thumb-item {
          height: 84px;
          border: 1px solid #E0E8E8;
          cursor: pointer;
          overflow: hidden;
          background: #FFFFFF;
          transition: border-color 150ms ease;
        }
        .thumb-item.active {
          border: 2px solid #588078;
        }
        .thumb-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .tab-btn {
          padding: 16px 24px;
          font-size: 0.84rem;
          font-weight: 700;
          cursor: pointer;
          border: none;
          background: transparent;
          color: #7C8894;
          position: relative;
          transition: all 150ms ease;
          letter-spacing: 0.6px;
          text-transform: uppercase;
        }
        .tab-btn.active {
          color: #588078;
          font-weight: 800;
        }
        .tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 3px;
          background: #588078;
        }

        .btn {
          border-radius: 0 !important;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background-color 150ms ease, border-color 150ms ease;
        }
        .btn-primary {
          background: #588078;
          color: #FFFFFF;
          border: none;
        }
        .btn-primary:hover { background: #4D716A; }
        .btn-secondary {
          background: #FFFFFF;
          color: #304050;
          border: 1px solid #E0E8E8;
        }
        .btn-secondary:hover { background: #F4F6F8; border-color: #304050; }
      `}</style>

      {/* 1. Breadcrumb Bar */}
      <section style={{ background: '#FFFFFF', borderBottom: '1px solid #E0E8E8', padding: '16px 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#7C8894' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Home</span>
            <span>/</span>
            <span style={{ cursor: 'pointer' }} onClick={() => navigate('/products')}>Products Catalog</span>
            <span>/</span>
            <span>{currentProduct.category}</span>
            <span>/</span>
            <span style={{ color: '#304050', fontWeight: 600 }}>{currentProduct.title}</span>
          </div>
        </div>
      </section>

      {/* 2. Top Main E-Commerce Product Layout */}
      <section style={{ padding: '40px 0 60px' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div className="grid-responsive-about" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '48px', alignItems: 'start' }}>
            
            {/* Left: Product Image Gallery (Sticky on scroll until right column finishes) */}
            <div style={{ position: 'sticky', top: '96px', alignSelf: 'start' }}>
              <div
                style={{
                  height: '410px',
                  background: '#FFFFFF',
                  border: '1px solid #E0E8E8',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={activeImage || galleryImages[0]}
                  alt={currentProduct.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <button
                  type="button"
                  onClick={() => onOpenQuoteModal(currentProduct.title)}
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    width: '38px',
                    height: '38px',
                    background: '#FFFFFF',
                    border: '1px solid #E0E8E8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#304050',
                    cursor: 'pointer',
                  }}
                  title="Enlarge specs view"
                >
                  <ZoomIn size={18} />
                </button>
              </div>

              {/* 4 Thumbnails Underneath */}
              <div className="thumb-grid">
                {galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    className={`thumb-item ${activeImage === img ? 'active' : ''}`}
                    onClick={() => setActiveImage(img)}
                  >
                    <img src={img} alt={`Gallery ${idx + 1}`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Product Details Panel (Stretched to match Left height & aligned at bottom) */}
            <div
              style={{
                background: '#FFFFFF',
                border: '1px solid #E0E8E8',
                padding: '36px 40px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '508px',
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#588078', letterSpacing: '0.8px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  {currentProduct.category} &bull; {currentProduct.subCat}
                </span>

                <h1 style={{ fontSize: '1.9rem', fontWeight: 700, color: '#304050', marginBottom: '12px', lineHeight: 1.25, letterSpacing: '0.5px' }}>
                  {currentProduct.title}
                </h1>

                {/* Rating Star Row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', color: '#D97706', gap: '2px' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill="#D97706" />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#304050' }}>
                    4.9 / 5.0
                  </span>
                  <span style={{ fontSize: '0.82rem', color: '#7C8894' }}>
                    (Certified ISO 9001:2015 &amp; ASME Audit Compliant)
                  </span>
                </div>

                {/* Short Description */}
                <p style={{ fontSize: '0.92rem', color: '#7C8894', lineHeight: 1.65, marginBottom: '24px' }}>
                  Manufactured and stocked by Jyoti Metal (India) to stringent ASTM, ASME, and EN standards. Fully solution annealed and tested for high-pressure, severe corrosion environments.
                </p>

                {/* Key Bullet Highlights */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.86rem', color: '#304050', fontWeight: 600 }}>
                    <ShieldCheck size={16} color="#588078" /> 100% Spectral chemistry verification &amp; heat-lot tracking
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.86rem', color: '#304050', fontWeight: 600 }}>
                    <Layers size={16} color="#588078" /> Hydrostatic pressure tested &amp; ultrasonic flaw scanned
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.86rem', color: '#304050', fontWeight: 600 }}>
                    <FileCheck size={16} color="#588078" /> EN 10204 3.1 &amp; 3.2 Mill Test Certificate included
                  </div>
                </div>
              </div>

              {/* Bottom Action Area */}
              <div>
                {/* Action Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '18px' }}>
                  <button
                    type="button"
                    onClick={() => onOpenQuoteModal(`${currentProduct.title} (${quantityKgs} Kgs)`)}
                    className="btn btn-primary"
                    style={{ padding: '16px', fontSize: '0.92rem', letterSpacing: '0.6px', textTransform: 'uppercase' }}
                  >
                    Request Formal Quote <Send size={16} />
                  </button>
                </div>

                {/* Fast Dispatch Badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.82rem', color: '#7C8894' }}>
                  <Truck size={18} color="#588078" />
                  <span>100% Heat-Lot Traceability Fast Container Dispatch</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Middle Specification Tabbed Section */}
      <section style={{ background: '#FFFFFF', borderTop: '1px solid #E0E8E8', borderBottom: '1px solid #E0E8E8', padding: '40px 0 60px' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          
          {/* Horizontal Tab Navigation (Renamed per Database Scraping Mandate) */}
          <div style={{ display: 'flex', borderBottom: '1px solid #E0E8E8', marginBottom: '32px', overflowX: 'auto' }}>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'comp' ? 'active' : ''}`}
              onClick={() => setActiveTab('comp')}
            >
              CHEMICAL COMPOSITION
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
              onClick={() => setActiveTab('specs')}
            >
              MECHANICAL PROPERTIES
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'desc' ? 'active' : ''}`}
              onClick={() => setActiveTab('desc')}
            >
              PHYSICAL PROPERTIES
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'apps' ? 'active' : ''}`}
              onClick={() => setActiveTab('apps')}
            >
              APPLICATION INDUSTRIES
            </button>
          </div>

          {/* Active Tab Content (Full Width Layout) */}
          <div style={{ width: '100%' }}>
            <div>
              {/* Section 1: Chemical Composition (Exact Champak Steel Scraped HTML Table Layout) */}
              {activeTab === 'comp' && (
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#304050', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                    CHEMICAL COMPOSITION OF STAINLESS STEEL {currentProduct.title.toUpperCase()}
                  </h3>
                  <div style={{ overflowX: 'auto', border: '1px solid #588078', marginBottom: '24px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'center' }}>
                      <thead>
                        <tr style={{ background: '#588078', color: '#FFFFFF', fontWeight: 700 }}>
                          {scrapedTable.chemHeaders.map((h, i) => (
                            <th key={i} style={{ padding: '12px 10px', borderRight: i < scrapedTable.chemHeaders.length - 1 ? '1px solid rgba(255,255,255,0.25)' : 'none', whiteSpace: 'nowrap' }}>
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {scrapedTable.chemRows.map((row, rIdx) => (
                          <tr key={rIdx} style={{ background: rIdx % 2 === 0 ? '#FFFFFF' : '#F8F8F8', borderBottom: rIdx < scrapedTable.chemRows.length - 1 ? '1px solid #E0E8E8' : 'none' }}>
                            {row.map((val, i) => (
                              <td
                                key={i}
                                style={{
                                  padding: '12px 10px',
                                  borderRight: i < row.length - 1 ? (i === 0 ? '1px solid rgba(255,255,255,0.3)' : '1px solid #E0E8E8') : 'none',
                                  fontWeight: i === 0 ? 800 : 600,
                                  background: i === 0 ? '#588078' : 'transparent',
                                  color: i === 0 ? '#FFFFFF' : '#304050',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {val}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Vertical Breakdown List */}
                  <div style={{ border: '1px solid #E0E8E8' }}>
                    {Object.entries(composition).map(([element, range], i) => (
                      <div
                        key={element}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '180px 1fr',
                          padding: '10px 16px',
                          background: i % 2 === 0 ? '#FFFFFF' : '#F8F8F8',
                          borderBottom: i < Object.keys(composition).length - 1 ? '1px solid #E0E8E8' : 'none',
                          fontSize: '0.86rem',
                        }}
                      >
                        <span style={{ fontWeight: 700, color: '#304050' }}>{element}</span>
                        <span style={{ color: '#588078', fontWeight: 700 }}>{range}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Section 2: Mechanical Properties (Exact Champak Steel Scraped HTML Table Layout) */}
              {activeTab === 'specs' && (
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#304050', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                    MECHANICAL PROPERTIES OF STAINLESS STEEL {currentProduct.title.toUpperCase()}
                  </h3>
                  <div style={{ overflowX: 'auto', border: '1px solid #588078', marginBottom: '24px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'center' }}>
                      <thead>
                        <tr style={{ background: '#588078', color: '#FFFFFF', fontWeight: 700 }}>
                          {scrapedTable.mechHeaders.map((h, i) => (
                            <th key={i} style={{ padding: '12px 10px', borderRight: i < scrapedTable.mechHeaders.length - 1 ? '1px solid rgba(255,255,255,0.25)' : 'none', whiteSpace: 'nowrap' }}>
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {scrapedTable.mechRows.map((row, rIdx) => (
                          <tr key={rIdx} style={{ background: rIdx % 2 === 0 ? '#FFFFFF' : '#F8F8F8', borderBottom: rIdx < scrapedTable.mechRows.length - 1 ? '1px solid #E0E8E8' : 'none' }}>
                            {row.map((val, i) => (
                              <td
                                key={i}
                                style={{
                                  padding: '12px 10px',
                                  borderRight: i < row.length - 1 ? (i === 0 ? '1px solid rgba(255,255,255,0.3)' : '1px solid #E0E8E8') : 'none',
                                  fontWeight: i === 0 ? 800 : 600,
                                  background: i === 0 ? '#588078' : 'transparent',
                                  color: i === 0 ? '#FFFFFF' : '#304050',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {val}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Vertical Breakdown List */}
                  <div style={{ border: '1px solid #E0E8E8' }}>
                    {Object.entries(mechanicalProps).map(([propKey, propVal], i) => (
                      <div
                        key={propKey}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '220px 1fr',
                          padding: '10px 16px',
                          background: i % 2 === 0 ? '#FFFFFF' : '#F8F8F8',
                          borderBottom: i < Object.keys(mechanicalProps).length - 1 ? '1px solid #E0E8E8' : 'none',
                          fontSize: '0.86rem',
                        }}
                      >
                        <span style={{ fontWeight: 700, color: '#304050' }}>{propKey}</span>
                        <span style={{ color: '#588078', fontWeight: 700 }}>{propVal}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Section 3: Physical Properties */}
              {activeTab === 'desc' && (
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#304050', marginBottom: '14px' }}>
                    Physical &amp; Thermal Properties
                  </h3>
                  <div style={{ border: '1px solid #E0E8E8' }}>
                    {Object.entries(physicalProps).map(([pKey, pVal], i) => (
                      <div
                        key={pKey}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '200px 1fr',
                          padding: '12px 18px',
                          background: i % 2 === 0 ? '#FFFFFF' : '#F8F8F8',
                          borderBottom: i < Object.keys(physicalProps).length - 1 ? '1px solid #E0E8E8' : 'none',
                          fontSize: '0.88rem',
                        }}
                      >
                        <span style={{ fontWeight: 700, color: '#304050' }}>{pKey}</span>
                        <span style={{ color: '#588078', fontWeight: 700 }}>{pVal}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Section 4: Application Industries */}
              {activeTab === 'apps' && (
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#304050', marginBottom: '16px' }}>
                    Certified Application Industries
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {appList.map((app) => (
                      <div
                        key={app}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '14px 18px',
                          background: '#F8F8F8',
                          border: '1px solid #E0E8E8',
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          color: '#304050',
                        }}
                      >
                        <CheckCircle2 size={18} color="#588078" /> {app}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 5. Supplementary Scraped Database Sections (Standards, Equivalent Grades, Dimensions) */}
          <div style={{ marginTop: '48px', paddingTop: '36px', borderTop: '1px solid #E0E8E8' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#304050', marginBottom: '20px' }}>
              Manufacturing Standards, Dimensions &amp; Equivalent Grades
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              <div style={{ background: '#F8F8F8', border: '1px solid #E0E8E8', padding: '20px' }}>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#588078', marginBottom: '12px', textTransform: 'uppercase' }}>
                  Manufacturing Standards
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {stdList.map((std) => (
                    <span key={std} style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', padding: '6px 12px', fontSize: '0.82rem', fontWeight: 700, color: '#304050' }}>
                      {std}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ background: '#F8F8F8', border: '1px solid #E0E8E8', padding: '20px' }}>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#588078', marginBottom: '12px', textTransform: 'uppercase' }}>
                  International Equivalent Grades
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {eqList.map((eq) => (
                    <span key={eq} style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', padding: '6px 12px', fontSize: '0.82rem', fontWeight: 700, color: '#304050' }}>
                      {eq}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bottom Related Stock Grid */}
      <section style={{ padding: '60px 0 20px' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#304050', margin: 0, letterSpacing: '0.4px' }}>
              Related Metallurgical Stock ({currentProduct.category})
            </h2>
            <button
              type="button"
              onClick={() => navigate('/products')}
              style={{ background: 'none', border: 'none', color: '#588078', fontWeight: 700, fontSize: '0.86rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              View Full Catalog <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => navigate(`/product-detail?id=${encodeURIComponent(rel.id)}`)}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E0E8E8',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  cursor: 'pointer',
                }}
              >
                <div style={{ width: '80px', height: '80px', flexShrink: 0, overflow: 'hidden', border: '1px solid #E0E8E8' }}>
                  <img src={rel.image} alt={rel.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#304050', margin: '0 0 4px 0', lineHeight: 1.3 }}>
                    {rel.title}
                  </h4>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#588078' }}>
                    &#8377;{getAlloyPricePerKg(rel.title)} INR / Kg
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenQuoteModal(rel.title);
                  }}
                  style={{
                    width: '36px',
                    height: '36px',
                    background: '#F4F6F8',
                    border: '1px solid #E0E8E8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#304050',
                    cursor: 'pointer',
                    borderRadius: 0,
                  }}
                  title="Request quote"
                >
                  <Plus size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
