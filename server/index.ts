import express from 'express';
import cors from 'cors';
import { scrapeAllProducts, scrapeTargetProduct } from './scraper';
import { runIngestionSync } from './scheduler';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// In-memory stored database cache for instant responsive frontend access
let dbProducts = [
  {
    id: 'ss-304-304l-304h-pipes-tubes',
    slug: 'ss-304-304l-304h-pipes-tubes',
    name: 'SS 304/304L/304H Pipes & Tubes',
    category: 'Pipes & Tubes',
    subCategory: 'Stainless Steel Pipes & Tubes',
    shortDescription:
      'Manufactured and stocked by Jyoti Metal (India) to stringent ASTM, ASME, and EN standards. Fully solution annealed and tested for high-pressure, severe corrosion environments.',
    fullDescription:
      'SS 304/304L/304H Pipes & Tubes are engineered for exceptional corrosion resistance, high tensile strength, and uniform microstructural integrity in critical process applications.',
    mainImage: '/images/stainless_pipes.png',
    galleryImages: [
      '/images/stainless_pipes.png',
      '/images/pipe_fittings.png',
      '/images/flanges_industrial.png',
      '/images/round_bars.png',
    ],
    metaTitle: 'SS 304/304L/304H Seamless & Welded Pipes & Tubes Manufacturer',
    metaDescription: 'High quality SS 304/304L/304H pipes and tubes stocked per ASTM A312 / ASME SA312 standards.',
    chemicalComposition: [
      { element: 'Carbon (C)', value: '0.08% Max' },
      { element: 'Manganese (Mn)', value: '2.00% Max' },
      { element: 'Silicon (Si)', value: '0.75% Max' },
      { element: 'Chromium (Cr)', value: '18.00 - 20.00%' },
      { element: 'Nickel (Ni)', value: '8.00 - 10.50%' },
      { element: 'Phosphorus (P)', value: '0.045% Max' },
      { element: 'Sulfur (S)', value: '0.030% Max' },
    ],
    mechanicalProperties: [
      {
        grade: 'SS 304',
        tensileStrength: '515 MPa Min',
        yieldStrength: '205 MPa Min',
        elongation: '40% Min',
        hardnessBrinell: '201 HB Max',
      },
    ],
    physicalProperties: [
      { propertyName: 'Density', value: '8.00 g/cm³' },
      { propertyName: 'Melting Point', value: '1400 - 1450 °C' },
      { propertyName: 'Modulus of Elasticity', value: '193 GPa' },
      { propertyName: 'Electrical Resistivity', value: '0.72 x 10^-6 Ω.m' },
      { propertyName: 'Thermal Conductivity', value: '16.2 W/m.K at 100°C' },
    ],
    applications: [
      'Chemical and Petrochemical Processing',
      'Offshore Oil & Gas Production Platforms',
      'Food and Beverage Processing Plants',
      'Pharmaceutical Machinery & High-Purity Pipelines',
      'Power Generation & Heat Exchangers',
    ],
    tables: [
      {
        title: 'Dimensional Tolerances per ASTM A312',
        headers: ['NPS Designator', 'Outer Diameter (OD)', 'Wall Thickness Tolerance'],
        rows: [
          { 'NPS Designator': '1/8" to 1-1/2"', 'Outer Diameter (OD)': '±0.4 mm', 'Wall Thickness Tolerance': '±12.5%' },
          { 'NPS Designator': '2" to 4"', 'Outer Diameter (OD)': '±0.8 mm', 'Wall Thickness Tolerance': '±12.5%' },
          { 'NPS Designator': '5" to 8"', 'Outer Diameter (OD)': '±1.2 mm', 'Wall Thickness Tolerance': '±12.5%' },
        ],
      },
    ],
    standards: ['ASTM A312', 'ASTM A213', 'ASME SA312', 'EN 10216-5', 'DIN 17458'],
    equivalentGrades: ['UNS S30400', 'W.Nr. 1.4301', 'AFNOR Z7 CN 18-09', 'BS 304S31'],
    dimensions: ['1/2" NB to 24" NB', 'Sch 5S, 10S, 40S, 80S, 160S, XXS'],
  },
];

// GET /api/products - List all products
app.get('/api/products', (req, res) => {
  res.json({ status: 'success', data: dbProducts });
});

// GET /api/products/:slug - Get product by slug
app.get('/api/products/:slug', (req, res) => {
  const { slug } = req.params;
  const product = dbProducts.find((p) => p.slug === slug || p.id === slug);
  if (product) {
    return res.json({ status: 'success', data: product });
  }
  return res.status(404).json({ status: 'error', message: 'Product not found' });
});

// POST /api/scrape/sync - Trigger sync
app.post('/api/scrape/sync', async (req, res) => {
  try {
    const scrapedData = await runIngestionSync();
    res.json({ status: 'success', message: 'Scrape completed', count: scrapedData.length });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Scrape failed' });
  }
});

app.listen(PORT, () => {
  console.log(`[API Server] Running on http://localhost:${PORT}`);
});
