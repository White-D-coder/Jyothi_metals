/**
 * Category-level overview content for the /products landing page.
 *
 * The catalogue in `catalogData` is grade-level (291 items) — far too granular
 * for a landing page. This module rolls it up to the ten main categories and
 * pairs each with the editorial copy the alternating product rows render.
 *
 * `slug` doubles as the section anchor id, so `/products?category=Round Bars`
 * and `/products#round-bars` both scroll to the same row.
 */
export interface ProductCategory {
  /** Must match `CatalogProduct.category` so the row can link into the catalogue. */
  name: string;
  slug: string;
  image: string;
  description: string;
  dimensions: string;
}

export const primaryCategories: ProductCategory[] = [
  {
    name: 'Pipes & Tubes',
    slug: 'pipes-tubes',
    image: '/images/products/ss-304-pipe.jpg',
    description:
      'Seamless, welded and ERW pipes and tubes supplied in solution-annealed condition for high-pressure, high-temperature and corrosive service across refining, petrochemical, power and marine installations.',
    dimensions:
      'Sizes 1/8" NB to 36" NB in SCH 5S through SCH XXS, in stainless, duplex, nickel alloy, titanium, carbon and alloy steel. Conforms to ASTM A312, A213, A269 and A106.',
  },
  {
    name: 'Plates & Sheets',
    slug: 'plates-sheets',
    image: '/images/products/ss-409l-sheet.jpg',
    description:
      'Hot and cold rolled plates, sheets and coils in mill-finish, 2B, No. 4 and BA surfaces, cut to size on our CNC laser and plasma beds for pressure vessels, tanks, heat exchangers and structural fabrication.',
    dimensions:
      'Thickness 0.5 mm to 100 mm, widths up to 2500 mm and lengths up to 12000 mm. Conforms to ASTM A240, A516 and A387.',
  },
  {
    name: 'Round Bars',
    slug: 'round-bars',
    image: '/images/products/ss-304-bar.jpg',
    description:
      'Forged, rolled, peeled and centreless-ground bars in bright and black finish, machined to close tolerance for shafts, fasteners, valve stems, pump components and precision turned parts.',
    dimensions:
      'Diameters 4 mm to 500 mm in random and cut lengths, in stainless, duplex, nickel alloy, titanium, brass, tantalum and carbon steel. Conforms to ASTM A276, A479 and A182.',
  },
  {
    name: 'Flanges',
    slug: 'flanges',
    image: '/images/products/ss-weld-neck-flange.jpg',
    description:
      'Weld neck, slip-on, blind, socket weld, lap joint, threaded, orifice and long weld neck flanges forged from certified billets with raised, flat and ring-type joint facings.',
    dimensions:
      'Sizes 1/2" NB to 60" NB in Class 150 to Class 2500, plus PN6 to PN100. Conforms to ASME B16.5, B16.47, EN 1092-1 and DIN standards.',
  },
  {
    name: 'Forged Fittings',
    slug: 'forged-fittings',
    image: '/images/products/socket-weld-elbow.jpg',
    description:
      'High-pressure socket weld and threaded elbows, tees, crosses, couplings, unions, caps, plugs and bushings, closed-die forged for hydraulic, instrumentation and small-bore process piping.',
    dimensions:
      'Sizes 1/8" NB to 4" NB in Class 3000, 6000 and 9000. Conforms to ASME B16.11, BS 3799 and MSS SP-79/83/95.',
  },
  {
    name: 'Buttweld Fittings',
    slug: 'buttweld-fittings',
    image: '/images/products/bw-ss-elbow.jpg',
    description:
      'Seamless and welded elbows, tees, reducers, caps, stub ends and pipe bends with bevelled ends for full-penetration welds, giving a smooth bore and uninterrupted flow in critical process lines.',
    dimensions:
      'Sizes 1/2" NB to 48" NB in SCH 10S through SCH 160, in short and long radius. Conforms to ASME B16.9, B16.28 and MSS SP-43.',
  },
];

export const additionalCategories: ProductCategory[] = [
  {
    name: 'Fasteners',
    slug: 'fasteners',
    image: '/images/products/ss-hex-bolts.jpg',
    description:
      'Heavy hex bolts, stud bolts, hex nuts, washers, screws, anchor bolts and threaded rods, cold forged and hot dip galvanised or PTFE coated on request for structural and flange-joint assemblies.',
    dimensions:
      'Sizes M3 to M100 and 3 mm to 100 mm diameter, lengths 3 mm to 200 mm. Conforms to ASTM A193, A194, A320 and DIN/ISO metric standards.',
  },
  {
    name: 'Gasketing Solutions',
    slug: 'gasketing-solutions',
    image: '/images/products/af-fibre-sheet-standard.jpg',
    description:
      'Spiral wound gaskets, compressed fibre and asbestos-free jointing sheets, and pre-cut gaskets profiled to your flange drawings for leak-tight sealing under thermal cycling and pressure fluctuation.',
    dimensions:
      'Sheets 0.5 mm to 6 mm thick in 1500 x 1500 mm and 2000 x 2000 mm. Spiral wound gaskets 1/2" NB to 24" NB. Conforms to ASME B16.20 and B16.21.',
  },
  {
    name: 'Structural Steel',
    slug: 'structural-steel',
    image: '/images/products/mild-steel-angles.jpg',
    description:
      'Mild steel angles, beams and channels, parallel flange sections, universal beams and columns, and rail sections for building frames, industrial sheds, crane runways and railway track work.',
    dimensions:
      'Angles 25 x 25 mm to 250 x 250 mm, beams 100 x 50 mm to 900 x 300 mm, channels 75 x 40 mm to 400 x 100 mm, and rails from 24 kg/m to 60 kg/m.',
  },
  {
    name: 'Specialized Product',
    slug: 'specialized-product',
    image: '/images/champak/other-items-manufacturer-exporter.jpg',
    description:
      'Abrasion resistant, armour, boiler, Corten weathering, manganese, quenched and tempered, DSQ and molybdenum alloy plates for wear-critical, ballistic and elevated-temperature duty.',
    dimensions:
      'Hardness grades 400 BHN to 600 BHN in thicknesses 3 mm to 150 mm. Supplied to ASTM A516, A204, A588 and EN 10025-6 as applicable.',
  },
];

export const allProductCategories: ProductCategory[] = [
  ...primaryCategories,
  ...additionalCategories,
];

/** Resolves a `?category=` value (or hash) to a section anchor id. */
export const getCategorySlug = (category: string): string | undefined =>
  allProductCategories.find(
    (c) => c.name.toLowerCase() === category.trim().toLowerCase()
  )?.slug;
