/**
 * Angles & Channels — page content for the structural sections.
 *
 * The specification figures, profile types and the grade line-ups are the ones
 * published for this product family (sizes, thicknesses, lengths, processing
 * and the angle/channel type lists). The prose is written for Jyoti Metal
 * rather than lifted: the source pages name their own company throughout, so
 * only the factual content carries over.
 *
 * Unlike the rest of the catalogue these pages deliberately carry no chemical,
 * mechanical, physical or equivalent-grade tables. A buyer of a structural
 * section is choosing a profile and a size, not comparing heat chemistry, and
 * the site owner asked for exactly three blocks: photo + description, the
 * specification panel, and the grade line-up. `ProductDetailPage` keys off
 * `isAnglesChannelsProduct` to suppress the rest.
 *
 * One product is published per material group, and its page lists every grade
 * that group carries. Adding a grade later means adding a catalogue entry plus
 * an `anglesChannelsContent` record — the list below already names it.
 */

export interface AnglesChannelsSpecRow {
  label: string;
  value: string;
}

export interface AnglesChannelsContent {
  /** Sits beside the gallery, in place of the generic stock blurb. */
  description: string;
  specHeading: string;
  specRows: AnglesChannelsSpecRow[];
}

export interface AnglesChannelsGroup {
  /** Bar above the grade list. */
  heading: string;
  grades: string[];
}

export const ANGLES_CHANNELS_CATEGORY = 'Angles & Channels';

/** True for any catalogue item in the Angles & Channels category. */
export const isAnglesChannelsProduct = (product: { category: string }): boolean =>
  product.category === ANGLES_CHANNELS_CATEGORY;

/* The size envelope is identical across every grade in this family — only the
   alloy changes — so the rows are built once rather than repeated four times. */
const commonSpecRows = (): AnglesChannelsSpecRow[] => [
  { label: 'Dimensions', value: 'ASME, ASTM, EN, BS, GB, DIN, JIS, etc' },
  { label: 'Angle Size', value: '3/4" thru 8"' },
  { label: 'Channel Size', value: 'Base: 80 to 150 mm  |  Side: 40 to 75 mm' },
  { label: 'Angle Thickness', value: '1/8" thru 5/8"' },
  { label: 'Channel Thickness', value: 'Base: 5 to 6 mm (depending on size)' },
  { label: 'Angle Length', value: 'Up to 6 metres long' },
  { label: 'Processing', value: 'Bar cutting' },
  {
    label: 'Application',
    value:
      'Paper industry, architecture, construction, kitchen equipment, pharma, engineering industries and many more',
  },
  {
    label: 'Angle Types',
    value:
      'Angles, angle bars, equal angle, unequal angle, L shape angles, equal leg angle, unequal leg angle, T shaped angle',
  },
  {
    label: 'Channel Types',
    value:
      'Channel, channel bars, C-channel, U-channel, strut channels, miscellaneous channel, MC channels, unistrut channels',
  },
];

export const anglesChannelsContent: Record<string, AnglesChannelsContent> = {
  'ss-304-angles-channels': {
    description:
      'Stainless Steel 304 angles and channels combine formability, strength and corrosion resistance with straightforward fabrication, which is why they are specified for structural and architectural work alike — staircases, walkways, frames, shelving, railings and equipment skids. The 18/8 austenitic chemistry holds up in humid, washdown and chemically aggressive environments where a mild steel section would need coating and would still corrode at the cut ends. Supplied in equal, unequal and L-shaped angles and in C, U, strut and slotted channels, cut to length up to 6 metres.',
    specHeading: 'Stainless Steel 304 Angle & Channels Specification',
    specRows: commonSpecRows(),
  },

  'duplex-s31803-angles-channels': {
    description:
      'Duplex UNS S31803 / S32205 angles and channels have a mixed austenitic-ferritic structure, which gives roughly twice the yield strength of standard 304 or 316 sections and markedly better resistance to chloride stress corrosion cracking — the failure mode that limits ordinary austenitic stainless in warm chloride service. The higher strength lets a lighter section carry the same load, so the grade is chosen on cost per unit of strength as much as on corrosion life. Typical duty is marine and offshore structures, handrails, gates, ladders, framing and guardrails, and chemical and process plant supports. Supplied in equal, unequal and L-shaped angles and in C, U and strut channels.',
    specHeading: 'Duplex Steel S31803 Angle & Channels Specification',
    specRows: commonSpecRows(),
  },

  'super-duplex-s32750-angles-channels': {
    description:
      'Super Duplex UNS S32750 / 2507 angles and channels carry roughly 25% chromium, 7% nickel and 3.7% molybdenum, taking the pitting resistance well beyond standard duplex while keeping the high strength and good weldability of the duplex family. It is the grade specified where the chloride load, temperature or acidity would take S31803 out of service — seawater handling, offshore and subsea structures, desalination, and aggressive chemical and pharmaceutical process plant. Supplied in equal, unequal and L-shaped angles and in C, U and strut channels.',
    specHeading: 'Super Duplex Steel S32750 Angle & Channels Specification',
    specRows: commonSpecRows(),
  },

  'inconel-600-angles-channels': {
    description:
      'Inconel 600 angles and channels are nickel-chromium sections for service where both heat and corrosion are in play. The alloy resists chloride-ion stress corrosion cracking, oxidising and reducing atmospheres and general corrosion, and holds its mechanical properties across a wide temperature band rather than softening off as carbon and stainless sections do. Typical duty is furnace and heat-treatment internals, retorts and muffles, chemical and petrochemical process structures and supports carrying corrosive condensate. Supplied in equal, unequal and L-shaped angles and in C, U, strut and slotted channels.',
    specHeading: 'Inconel 600 Angle & Channels Specification',
    specRows: commonSpecRows(),
  },

  'titanium-gr2-angles-channels': {
    description:
      'Titanium Grade 2 angles and channels give the highest strength-to-weight ratio in this family — commercially pure titanium at roughly half the density of steel, with the tenacious oxide film that makes it near-immune to seawater, wet chlorine and most oxidising acids. That combination suits marine and offshore structures, desalination and chlor-alkali plant, anodising and plating lines, and any frame where added mass is a cost in itself. Low thermal expansion keeps assemblies dimensionally stable through wide temperature swings. Supplied in equal, unequal and L-shaped angles and in C, U and strut channels.',
    specHeading: 'Titanium Gr 2 Angle & Channels Specification',
    specRows: commonSpecRows(),
  },

  'alloy-20-angles-channels': {
    description:
      'Alloy 20 angles and channels are a niobium-stabilised austenitic grade developed specifically for sulphuric acid service, resisting concentrations up to about 85% along with pitting, crevice attack and chloride stress corrosion cracking that would take ordinary austenitic sections out of service. It welds by all fusion and resistance methods without the sensitisation that normally follows, so fabricated frames keep their corrosion resistance at the heat-affected zone. Typical duty is chemical processing, pickling and plating lines, pharmaceutical plant, pulp and paper, and food processing. Supplied in equal, unequal and L-shaped angles and in C, U and strut channels.',
    specHeading: 'Alloy 20 Angle & Channels Specification',
    specRows: commonSpecRows(),
  },
};

/**
 * The grades stocked in angle and channel form, by sub-category.
 *
 * Display only — deliberately NOT links. One grade per group has a published
 * page so far; anchoring the rest would promise routes that do not exist. They
 * are listed so a buyer can see the range and ask for a grade by name. Entries
 * must match the catalogue `title` exactly, or the published grade will not be
 * highlighted as the current one.
 */
export const anglesChannelsGroups: Record<string, AnglesChannelsGroup> = {
  'Stainless Steel Angles & Channels': {
    heading: 'Stainless Steel Angles & Channels',
    grades: [
      'Stainless Steel 304 Angles & Channels',
      'Stainless Steel 304L Angles & Channels',
      'Stainless Steel 304H Angles & Channels',
      'Stainless Steel 310 / 310S Angles & Channels',
      'Stainless Steel 316 / 316L Angles & Channels',
      'Stainless Steel 316Ti Angles & Channels',
      'Stainless Steel 317L Angles & Channels',
      'Stainless Steel 321 / 321H Angles & Channels',
      'Stainless Steel 347H Angles & Channels',
      'Stainless Steel 410 Angles & Channels',
      'Stainless Steel 446 Angles & Channels',
      'Stainless Steel 904L Angles & Channels',
    ],
  },

  'Duplex / Super Duplex Angles & Channels': {
    heading: 'Duplex & Super Duplex Angles & Channels',
    grades: [
      'EN 1.4462 / Duplex UNS S31803 / F51 / UNS S32205 / F60 Angles & Channels',
      'EN 1.4410 / Super Duplex UNS S32750 / F53 / 2507 Angles & Channels',
    ],
  },

  'Inconel / Incoloy Angles & Channels': {
    heading: 'Inconel & Incoloy Angles & Channels',
    grades: [
      'Inconel 600 Angles & Channels',
      'Inconel 601 Angles & Channels',
      'Inconel 625 Angles & Channels',
      'Inconel 718 Angles & Channels',
      'Incoloy 800 Angles & Channels',
      'Incoloy 825 Angles & Channels',
    ],
  },

  'Titanium Angles & Channels': {
    heading: 'Titanium Angles & Channels',
    grades: ['Titanium Gr 2 Angles & Channels', 'Titanium Gr 5 Angles & Channels'],
  },

  'Other Angles & Channels': {
    heading: 'Other Angles & Channels',
    grades: [
      'Alloy 20 Angles & Channels',
      'SMO 254 Angles & Channels',
      'Aluminium Angles & Channels',
    ],
  },
};
