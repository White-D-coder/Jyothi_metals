/*
 * Technical reference sheets published on /certifications and opened in the
 * standalone viewer at /library/:slug.
 *
 * `pages` and `size` are read off the files in public/docs — if a PDF is
 * replaced, re-check both rather than leaving a stale figure on the card.
 */

export interface TechnicalDocument {
  slug: string;
  title: string;
  /** Short line under the title on the card, and the viewer's subtitle. */
  summary: string;
  /** Grouping label shown as a chip on the card. */
  category: 'Material Data' | 'Dimensional Data' | 'Reference Tables';
  file: string;
  cover: string;
  pages: number;
  size: string;
}

export const technicalDocuments: TechnicalDocument[] = [
  {
    slug: 'stainless-steel-properties',
    title: 'Stainless Steel — Chemical & Mechanical Properties',
    summary:
      'Full chemistry and tensile data for seamless and welded stainless pipe grades, TP304 through TPXM-11, plus A240 radiography classes.',
    category: 'Material Data',
    file: '/docs/stainless-steel-properties.pdf',
    cover: '/images/docs/stainless-steel-properties.jpg',
    pages: 1,
    size: '750 KB',
  },
  {
    slug: 'carbon-alloy-steel-properties',
    title: 'Carbon & Alloy Steel — Chemical, Mechanical & Dimensional',
    summary:
      'Chemical analysis and mechanical properties for carbon, alloy and low-temperature pipe and tube specifications, with ANSI B 36.10 pipe dimensions.',
    category: 'Material Data',
    file: '/docs/carbon-alloy-steel-properties.pdf',
    cover: '/images/docs/carbon-alloy-steel-properties.jpg',
    pages: 2,
    size: '1.6 MB',
  },
  {
    slug: 'pipe-dimensions-weights',
    title: 'Pipe Dimensions & Weights',
    summary:
      'Nominal size, OD, schedule designation, wall thickness, weight and internal diameter in both US and metric units, 1/8" through 36".',
    category: 'Dimensional Data',
    file: '/docs/pipe-dimensions-weights.pdf',
    cover: '/images/docs/pipe-dimensions-weights.jpg',
    pages: 2,
    size: '1.2 MB',
  },
  {
    slug: 'pipe-tube-specification-tolerance',
    title: 'ASTM Specification & Tolerance for Tubing & Piping',
    summary:
      'Permitted OD variation, wall thickness variation, length tolerance and required testing for ASTM A213, A249, A269, A270, A312 and A358.',
    category: 'Reference Tables',
    file: '/docs/pipe-tube-specification-tolerance.pdf',
    cover: '/images/docs/pipe-tube-specification-tolerance.jpg',
    pages: 1,
    size: '164 KB',
  },
  {
    slug: 'buttweld-fittings-dimensions',
    title: 'Butt Weld Fittings — Dimensions',
    summary:
      'ANSI B16.9 / B16.28 dimensions for elbows, tees, reducers, caps, stub ends and returns, with socket-weld and threaded fitting tables.',
    category: 'Dimensional Data',
    file: '/docs/buttweld-fittings-dimensions.pdf',
    cover: '/images/docs/buttweld-fittings-dimensions.jpg',
    pages: 8,
    size: '3.6 MB',
  },
  {
    slug: 'flange-dimensions',
    title: 'Flange Dimensions',
    summary:
      'Forged flange dimensions for ANSI B16.5 classes 150 to 900, plus BS 10 tables D to H, DIN ND 10/16/40 and IS 1538 standards.',
    category: 'Dimensional Data',
    file: '/docs/flange-dimensions.pdf',
    cover: '/images/docs/flange-dimensions.jpg',
    pages: 4,
    size: '1.9 MB',
  },
  {
    slug: 'weight-calculation-formulae',
    title: 'Weight Calculation Formulae',
    summary:
      'Working formulae for pipe, sheet, plate, circle, round, hex and square bar weights in stainless, carbon, copper, lead and aluminium.',
    category: 'Reference Tables',
    file: '/docs/weight-calculation-formulae.pdf',
    cover: '/images/docs/weight-calculation-formulae.jpg',
    pages: 1,
    size: '583 KB',
  },
];

export const findTechnicalDocument = (slug?: string): TechnicalDocument | undefined =>
  technicalDocuments.find((doc) => doc.slug === slug);
