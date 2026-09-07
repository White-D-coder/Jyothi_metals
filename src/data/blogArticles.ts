/**
 * Blog article content.
 *
 * EDITORIAL CONSTRAINT — read before adding or editing an article.
 *
 * Jyoti Metal (India)'s certified scope is "manufacturer of S.S. pipes & tubes;
 * supplier, stockist, importer and exporter of all kinds of ferrous and
 * non-ferrous metals". Claims of vacuum arc remelting, an EAF/AOD melt shop and
 * aerospace (AS9100D) work were removed from this site in August 2026 because
 * no document supports them.
 *
 * Several article titles here cover exactly those processes. They are written
 * as industry education, in the third person, about what mills and specifiers
 * do — never as a description of Jyoti's own plant or project history. Keep it
 * that way: an article must not become a back door for a capability claim the
 * company cannot evidence. Where an article does speak for Jyoti (the EN 10204
 * piece), it stays inside what the certificates and the Khushkhera brochure
 * actually show.
 */

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  table?: { caption?: string; headers: string[]; rows: string[][] };
}

export interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
  authorRole: string;
  /** Opening paragraph, set larger than the body. */
  standfirst: string;
  sections: ArticleSection[];
  takeaways: string[];
}

export const blogCategories = [
  'All Blogs',
  'Materials Science',
  'Manufacturing',
  'Industry Trends',
  'Case Studies',
  'Sustainability',
];

export const articles: Article[] = [
  {
    id: 1,
    slug: 'choosing-between-304-and-316l-stainless-for-marine-service',
    title: 'CHOOSING BETWEEN 304 AND 316L STAINLESS FOR MARINE SERVICE',
    excerpt:
      'How 2-3% molybdenum addition prevents pitting and crevice corrosion in offshore marine & chemical process environments.',
    category: 'Materials Science',
    date: 'July 18, 2026',
    readTime: '8 min read',
    image: '/images/pexels-bence-szemerey-337043-6804265.jpg',
    author: 'Dr. Anita Rao',
    authorRole: 'Metallurgy & Materials',
    standfirst:
      'Both grades are austenitic, both are 18/8-family stainless, and on a mill test certificate they can look almost interchangeable. In chloride service they are not. The difference comes down to two or three percent of one element, and to a failure mode that gives very little warning.',
    sections: [
      {
        heading: 'The passive layer, and what breaks it',
        paragraphs: [
          'Stainless steel does not resist corrosion because it is inert. It resists corrosion because chromium above roughly 10.5% forms a chromium-oxide film a few nanometres thick that reforms almost instantly when scratched. Every performance question about a stainless grade is really a question about whether that film can keep repairing itself in the environment you are putting it in.',
          'Chloride ions are the classic attacker. They adsorb onto the passive film at its weakest points — an inclusion, a grain boundary, a scratch, an area starved of oxygen — and break it down locally. Because the surrounding surface stays passive and cathodic, the tiny depassivated spot becomes a concentrated anode. Metal dissolves fast in a very small area. That is pitting, and it is why chloride attack is dangerous: the surface can look sound while a pit drives through the wall.',
        ],
      },
      {
        heading: 'What molybdenum actually does',
        paragraphs: [
          '316L differs from 304L chiefly by the addition of 2.0-3.0% molybdenum. Molybdenum stabilises the passive film against chloride penetration and, just as importantly, helps repassivate a pit once it has initiated. It raises the chloride concentration and the temperature at which pitting will start, rather than eliminating the mechanism.',
          'The usual shorthand for this is the pitting resistance equivalent number, PREN = %Cr + 3.3 x %Mo + 16 x %N. It is only a ranking index, not a design figure, but it separates the grades cleanly.',
        ],
        table: {
          caption: 'Nominal composition and PREN — typical mid-range values',
          headers: ['Grade', 'Cr %', 'Ni %', 'Mo %', 'C % max', 'PREN (approx.)'],
          rows: [
            ['304', '18.0 - 20.0', '8.0 - 10.5', '—', '0.07', '18 - 20'],
            ['304L', '18.0 - 20.0', '8.0 - 12.0', '—', '0.030', '18 - 20'],
            ['316', '16.0 - 18.0', '10.0 - 14.0', '2.0 - 3.0', '0.08', '24 - 26'],
            ['316L', '16.0 - 18.0', '10.0 - 14.0', '2.0 - 3.0', '0.030', '24 - 26'],
          ],
        },
      },
      {
        heading: 'Crevice corrosion is the harder problem',
        paragraphs: [
          'Pitting gets the attention, but crevice corrosion is what usually decides a marine specification. Under a gasket face, beneath a deposit, inside a poorly drained flange joint or under marine growth, the trapped electrolyte loses oxygen, the pH falls and chloride concentrates. The passive film cannot rebuild in that chemistry.',
          'Crevice attack initiates at lower temperatures and lower chloride levels than open-surface pitting, so a joint detail can fail while the adjacent pipe is untouched. Molybdenum helps here too, which is why 316L is the practical floor for seawater-splash and washdown duty — but geometry matters as much as grade. A well-drained 316L assembly outlasts a badly detailed one every time.',
        ],
      },
      {
        heading: 'Why the L grade, and when H instead',
        paragraphs: [
          'The L suffix caps carbon at 0.030% rather than 0.07-0.08%. During welding, the heat-affected zone spends time in the 425-815 °C band where chromium carbides precipitate at grain boundaries. Those carbides pull chromium out of the adjacent metal, leaving a chromium-depleted zone that is no longer properly stainless — sensitisation, which shows up in service as intergranular corrosion running parallel to the weld.',
          'Low carbon starves that reaction. For any welded fabrication in a corrosive environment, specify the L grade; the cost difference is small next to the consequence. The H grades run carbon deliberately high for elevated-temperature creep strength, which is a different design problem entirely and not a marine one.',
        ],
      },
      {
        heading: 'Where 304 is still the right answer',
        paragraphs: [
          'None of this makes 304 a poor grade. It is the correct, and more economical, choice in the large majority of applications that never see meaningful chloride: potable water, food and dairy, architectural and structural work inland, pharmaceutical and general process service.',
          'Specifying 316L everywhere as insurance is a common and expensive habit. The useful question is not "which grade is better" but "does this component see chlorides, and if so at what concentration, temperature and crevice geometry".',
        ],
        bullets: [
          'Inland, dry, low-chloride service — 304/304L is usually sufficient',
          'Coastal atmosphere, splash zone, washdown, de-icing salt — 316L',
          'Warm seawater, higher chlorides, tight crevices — 316L may not be enough; look at duplex',
          'Any welded assembly in corrosive duty — specify the L grade',
        ],
      },
      {
        heading: 'The limit of 316L',
        paragraphs: [
          '316L is not a seawater grade in the general case. In warm, aerated, full-strength seawater — particularly with stagnant periods, crevices or deposits — it will pit and crevice-corrode. This is the point at which duplex and super duplex grades earn their cost, both for chloride resistance and for their much higher resistance to chloride stress corrosion cracking, which austenitic 300-series grades are notably poor at above roughly 60 °C.',
          'Whatever grade is chosen, ask for the actual heat chemistry on the mill test certificate rather than the specification range. Two heats can both be legitimate 316L while sitting at opposite ends of the molybdenum band, and in marginal chloride service that difference is real.',
        ],
      },
    ],
    takeaways: [
      '316L differs from 304L mainly by 2-3% molybdenum, which raises the chloride and temperature threshold for pitting',
      'Crevice corrosion initiates more readily than open-surface pitting — joint detailing matters as much as grade selection',
      'The L suffix caps carbon at 0.030% to prevent weld sensitisation; specify it for any welded corrosive-service fabrication',
      '304 remains correct and cheaper wherever chlorides are not a factor',
      '316L is not a general-purpose warm seawater grade — that is duplex territory',
    ],
  },

  {
    id: 2,
    slug: 'duplex-vs-super-duplex-corrosion-resistance-guide',
    title: 'DUPLEX VS SUPER DUPLEX CORROSION RESISTANCE GUIDE',
    excerpt:
      'Comparing PREN ratings and ferrite-austenite phase balance for aggressive oilfield and chemical processing pipelines.',
    category: 'Materials Science',
    date: 'June 28, 2026',
    readTime: '10 min read',
    image: '/images/pexels-eugeniofr-30005294.jpg',
    author: 'Dr. Anita Rao',
    authorRole: 'Metallurgy & Materials',
    standfirst:
      'Duplex stainless steels are specified for two reasons that rarely get separated properly: roughly double the yield strength of an austenitic grade, and a resistance to chloride stress corrosion cracking that 316L simply does not have. Understanding where standard duplex ends and super duplex begins keeps you from paying for one and needing the other.',
    sections: [
      {
        heading: 'Two phases, deliberately balanced',
        paragraphs: [
          'A duplex microstructure is roughly half ferrite and half austenite, by design. The target is commonly 45-55% ferrite. The ferrite contributes strength and resistance to chloride stress corrosion cracking; the austenite contributes toughness and general corrosion resistance. Neither phase alone gives the combination.',
          'That balance is the whole material. Push ferrite too high — through incorrect heat treatment or an uncontrolled weld thermal cycle — and toughness and corrosion resistance fall away. Push it too low and you lose strength and the stress corrosion cracking advantage. This is why duplex is less forgiving to fabricate than austenitic stainless, and why weld procedure qualification matters far more.',
        ],
      },
      {
        heading: 'Where the grades sit',
        paragraphs: [
          'PREN = %Cr + 3.3 x %Mo + 16 x %N is the conventional ranking. The industry convention is that super duplex begins at PREN 40.',
        ],
        table: {
          caption: 'Common duplex family grades',
          headers: ['Grade', 'UNS', 'Cr %', 'Ni %', 'Mo %', 'N %', 'PREN'],
          rows: [
            ['Lean duplex 2304', 'S32304', '21.5 - 24.5', '3.0 - 5.5', '0.05 - 0.60', '0.05 - 0.20', '24 - 26'],
            ['Duplex 2205', 'S31803 / S32205', '21.0 - 23.0', '4.5 - 6.5', '2.5 - 3.5', '0.08 - 0.20', '33 - 35'],
            ['Super duplex 2507', 'S32750', '24.0 - 26.0', '6.0 - 8.0', '3.0 - 5.0', '0.24 - 0.32', '40 - 43'],
            ['Super duplex 25Cr', 'S32760', '24.0 - 26.0', '6.0 - 8.0', '3.0 - 4.0', '0.20 - 0.30', '40 - 42'],
          ],
        },
      },
      {
        heading: 'S31803 and S32205 are not the same thing',
        paragraphs: [
          'Both are called 2205 and both appear on certificates as duplex, but S32205 is a deliberately narrowed version of S31803, raising the minimum chromium, molybdenum and nitrogen. A heat can legitimately meet S31803 while sitting at the bottom of the nitrogen band and delivering a PREN near 33; an S32205 heat will land closer to 35.',
          'For borderline chloride service, specify S32205 explicitly rather than accepting "2205". The dual-certified material most mills supply meets both, but the certificate is what you are buying.',
        ],
      },
      {
        heading: 'The strength advantage, and what it is worth',
        paragraphs: [
          'Duplex 2205 has a minimum yield strength around 450-480 MPa against roughly 170-205 MPa for annealed 316L. That is not a marginal gain; it lets a designer take wall thickness out of a pressure-containing component.',
          'On a large pipeline or vessel, the thinner wall can offset a substantial part of the higher price per kilogram, before counting the corrosion life. This is why duplex is often chosen on cost per unit of delivered strength rather than on corrosion grounds alone.',
        ],
      },
      {
        heading: 'Chloride stress corrosion cracking',
        paragraphs: [
          'This is the failure mode that most often forces the move away from austenitic stainless. Under tensile stress, in a chloride environment, above roughly 60 °C, 304 and 316 can crack transgranularly with very little section loss and very little warning. Residual stress from welding is frequently sufficient — no external load required.',
          'The ferrite in a duplex structure interrupts crack propagation, and the family is markedly more resistant. Resistant is not immune: at high enough temperature, chloride and stress, duplex will crack too. But the operating envelope is far wider, and for hot chloride process service it is usually the deciding factor.',
        ],
      },
      {
        heading: 'The fabrication penalty',
        paragraphs: [
          'Duplex punishes careless thermal handling. Held in the 700-1000 °C range it precipitates sigma phase, an intermetallic that destroys toughness and corrosion resistance. In the 300-525 °C range it suffers 475 °C embrittlement. Both are avoidable, neither is repairable.',
          'That means controlled heat input, controlled interpass temperature, correct filler, and solution annealing followed by rapid quench where required. Ferrite content should be verified after welding, not assumed.',
        ],
        bullets: [
          'Keep heat input within the qualified range — too low traps excess ferrite, too high risks intermetallics',
          'Control interpass temperature, typically below 150 °C for super duplex',
          'Use over-alloyed filler so weld metal austenite reforms',
          'Verify ferrite content after fabrication rather than relying on the parent certificate',
          'Solution anneal and water quench after hot forming',
        ],
      },
      {
        heading: 'Choosing between them',
        paragraphs: [
          'Standard duplex 2205 covers a very large share of aggressive chemical, oilfield and process duty, and it is the sensible default in the family. Super duplex earns its premium where the chloride load, temperature or acidity would take 2205 past its limit — seawater handling, subsea and topside offshore, desalination, and the more aggressive acid services.',
          'Super duplex is also less tolerant of fabrication error, since its higher alloy content makes intermetallic precipitation faster. Specifying it without the shop discipline to fabricate it correctly produces a worse component than well-made 2205.',
        ],
      },
    ],
    takeaways: [
      'Duplex targets roughly 50/50 ferrite-austenite; that balance carries the properties and is what fabrication can destroy',
      'Super duplex conventionally starts at PREN 40 — 2507 and S32760 sit there, 2205 sits near 33-35',
      'Specify S32205 rather than generic 2205 when chloride service is borderline',
      'Roughly double the yield strength of 316L allows thinner walls, offsetting part of the alloy premium',
      'Chloride stress corrosion cracking resistance is usually the real reason for moving off austenitic grades',
      'Sigma phase and 475 °C embrittlement are avoidable but not repairable — weld procedure control is not optional',
    ],
  },

  {
    id: 3,
    slug: 'vacuum-arc-remelting-and-high-cycle-alloy-fatigue',
    title: 'VACUUM ARC REMELTING & HIGH-CYCLE ALLOY FATIGUE',
    excerpt:
      'Refining grain boundaries and stripping non-metallic inclusions for aerospace-grade structural titanium & nickel forgings.',
    category: 'Manufacturing',
    date: 'July 09, 2026',
    readTime: '6 min read',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    author: 'Rajesh Menon',
    authorRole: 'Process & Quality',
    standfirst:
      'When a rotating component fails in high-cycle fatigue, the origin is very often a non-metallic inclusion a few tens of microns across. Secondary remelting exists to remove those inclusions. This is an explainer on how the process works and what it changes about the metal you receive — it describes mill practice, not our own plant.',
    sections: [
      {
        heading: 'Why inclusions decide fatigue life',
        paragraphs: [
          'High-cycle fatigue is a crack initiation problem. Once a crack has started in a well-designed component, propagation is comparatively predictable; the scatter in fatigue life comes almost entirely from how long initiation takes. A hard, angular oxide inclusion sitting near the surface concentrates stress and removes most of that initiation period.',
          'This is why fatigue-critical parts are specified with melt route requirements rather than only with a chemistry range and a tensile figure. Two heats can share an identical certificate chemistry and differ by an order of magnitude in fatigue scatter because of cleanliness.',
        ],
      },
      {
        heading: 'How vacuum arc remelting works',
        paragraphs: [
          'A consumable electrode, cast from the primary melt, is arc-melted under vacuum into a water-cooled copper crucible. Metal drips through the arc gap as a thin film — briefly, a very large surface area exposed to vacuum — and resolidifies progressively from the bottom up.',
          'Two things happen. Dissolved gases (hydrogen, nitrogen) and volatile tramp elements are stripped in the vacuum. And because solidification is directional and continuous rather than a static ingot freezing from all sides, macrosegregation and shrinkage porosity are largely designed out.',
        ],
      },
      {
        heading: 'The multi-stage routes',
        paragraphs: [
          'For the most demanding rotating parts, remelting is done more than once. VIM-VAR — vacuum induction melting followed by vacuum arc remelting — is the common route for nickel superalloys such as Inconel 718. Titanium alloys are frequently double or triple VAR.',
          'Electroslag remelting, ESR, is the alternative: the electrode is melted through a molten slag layer that chemically absorbs oxide inclusions. ESR is better at desulphurisation and gives a very good surface; VAR is better at removing dissolved gases. VAR-ESR combinations exist for the most critical work.',
        ],
        bullets: [
          'VIM — vacuum induction melting, controls chemistry under vacuum',
          'VAR — vacuum arc remelting, strips gases and directionalises solidification',
          'ESR — electroslag remelting, chemically absorbs oxides into the slag',
          'VIM-VAR / VAR-VAR — the double-melt routes typical for aero-engine rotating parts',
        ],
      },
      {
        heading: 'What it does not fix',
        paragraphs: [
          'Remelting improves the starting billet. It does not survive bad downstream processing. Forging that finishes below the recrystallisation temperature, an over-long soak that coarsens grain, or a quench that misses its cooling rate will undo the benefit.',
          'Nor does a clean melt substitute for surface condition. In high-cycle fatigue, machining marks, grinding burn and residual tensile stress at the surface routinely dominate over inclusion content. Shot peening and controlled surface finish often buy more fatigue life per rupee than upgrading the melt route.',
        ],
      },
      {
        heading: 'Reading it on a certificate',
        paragraphs: [
          'Melt route appears on the mill test certificate, and for fatigue-critical work it should be an explicit purchase requirement alongside the specification. AMS material specifications frequently mandate it directly.',
          'Where cleanliness is genuinely critical, the useful additions to a purchase order are a stated melt route, an ultrasonic inspection standard with a defined reference reflector, and macro-etch requirements. Chemistry alone will not tell you what you need to know.',
        ],
      },
    ],
    takeaways: [
      'High-cycle fatigue life is dominated by crack initiation, and inclusions remove most of the initiation period',
      'VAR strips dissolved gases and replaces static ingot freezing with directional solidification',
      'ESR absorbs oxides chemically; VAR removes gases better — the two are complementary, not interchangeable',
      'A clean melt is undone by poor forging, heat treatment or surface finish',
      'Specify melt route, ultrasonic standard and macro-etch on the order — chemistry alone is insufficient',
    ],
  },

  {
    id: 4,
    slug: 'zero-carbon-electric-arc-furnace-steelmaking',
    title: 'ZERO-CARBON ELECTRIC ARC FURNACE STEELMAKING',
    excerpt:
      'Transitioning to 100% renewable powered EAF production to cut carbon intensity by 65% across raw melt heats.',
    category: 'Sustainability',
    date: 'June 15, 2026',
    readTime: '7 min read',
    image: '/images/pexels-jakubzerdzicki-33813584.jpg',
    author: 'Priya Nair',
    authorRole: 'Sustainability & Supply Chain',
    standfirst:
      'Steel accounts for a large share of global industrial emissions, and the route a heat is melted by is the single biggest determinant of its embodied carbon. This is an overview of where the industry is heading and what buyers can reasonably ask their suppliers for.',
    sections: [
      {
        heading: 'Two routes, very different footprints',
        paragraphs: [
          'The blast furnace-basic oxygen furnace route reduces iron ore with coke. The carbon is not incidental — it is the reducing agent, chemically required by the process. That places a hard floor under emissions that efficiency improvements cannot cross.',
          'The electric arc furnace route melts scrap with electrical energy. The iron is already reduced, so no chemical reduction step is needed. Typical figures are roughly 1.8-2.2 tonnes of CO2 per tonne of crude steel for BF-BOF against roughly 0.3-0.6 for scrap-based EAF, though the EAF number moves substantially with the grid supplying it.',
        ],
      },
      {
        heading: 'Where the "zero-carbon" claim gets stretched',
        paragraphs: [
          'An EAF is only as clean as its electricity. The same furnace on a coal-heavy grid and on a hydro or renewable-backed grid produces steel with materially different embodied carbon. This is why credible claims are tied to a specific site and a specific power contract, not to the furnace type.',
          'Even fully renewable-powered, an EAF is not literally zero. Graphite electrodes are consumed, carbon is injected to foam the slag, alloy additions carry their own embodied emissions and the lime for the slag comes from calcination. "Near-zero" and "low-emissions" are the honest terms, and the serious standards define threshold bands rather than a binary.',
        ],
        bullets: [
          'Electrode consumption — graphite is consumed and is itself carbon-intensive to produce',
          'Slag foaming carbon and injected coal',
          'Ferroalloy additions carrying upstream emissions',
          'Lime calcination for slag chemistry',
          'The grid mix at that specific plant, hour by hour',
        ],
      },
      {
        heading: 'The scrap constraint',
        paragraphs: [
          'Scrap-based EAF cannot supply all demand, for a straightforward reason: there is not enough scrap. Steel in buildings and infrastructure has a service life measured in decades, so the scrap pool reflects what was built a generation ago, and global demand still exceeds it.',
          'Scrap quality is the second constraint. Residual copper and tin accumulate through repeated recycling and cannot be economically removed. High-quality flat products often need dilution with primary iron units, which is where DRI comes in — and where hydrogen direct reduction becomes the interesting development, replacing coke with hydrogen as the reducing agent.',
        ],
      },
      {
        heading: 'What a buyer can actually ask for',
        paragraphs: [
          'Vague sustainability claims are common and hard to check. Specific, verifiable requests are not.',
          'The most useful is an Environmental Product Declaration, an EPD — a third-party verified document to ISO 14025 and EN 15804 stating embodied carbon for a defined product and system boundary. Where an EPD is not available, ask for the melt route and the plant, which at least establishes the order of magnitude.',
        ],
        bullets: [
          'Ask for an EPD, and check its system boundary — cradle-to-gate is not the same as cradle-to-grave',
          'Ask for melt route and producing plant, not just a country of origin',
          'Treat "green steel" with no standard named behind it as marketing',
          'Remember that recycled content and low emissions are related but not the same claim',
        ],
      },
      {
        heading: 'Stainless has its own arithmetic',
        paragraphs: [
          'For stainless, the alloying elements often dominate. Nickel in particular carries very high embodied emissions, and the figure varies enormously with the ore body and process — laterite ores processed through certain routes are far more carbon-intensive than sulphide ores.',
          'The practical consequence is that grade selection can affect embodied carbon more than melt route does. Specifying a higher nickel grade than the service requires carries a real carbon cost as well as a real financial one — which is a further argument for matching grade to duty rather than over-specifying for comfort.',
        ],
      },
    ],
    takeaways: [
      'BF-BOF needs carbon as a chemical reducing agent; EAF does not, which is the structural difference',
      'An EAF is only as clean as the grid behind it — credible claims name the plant and the power contract',
      'Even renewable-powered EAF is near-zero, not zero: electrodes, slag carbon, alloys and lime all count',
      'Scrap availability and residual copper limit how far the scrap-EAF route can scale',
      'Ask for an EPD to ISO 14025 / EN 15804, and check the system boundary',
      'For stainless, nickel content can dominate embodied carbon more than melt route does',
    ],
  },

  {
    id: 5,
    slug: 'en-10204-3-1-vs-3-2-mill-certification-compliance',
    title: 'EN 10204 3.1 VS 3.2 MILL CERTIFICATION COMPLIANCE',
    excerpt:
      'Understanding independent third-party inspection (Lloyds/TUV) and full heat-lot material origin traceability.',
    category: 'Industry Trends',
    date: 'June 03, 2026',
    readTime: '5 min read',
    image: '/images/pexels-willians-huerta-2157111846-36397988.jpg',
    author: 'Vikram Shah',
    authorRole: 'Quality Assurance',
    standfirst:
      'EN 10204 does not define what tests are run or what the material must achieve. It defines who validates the results and how independent they are from the people who made the metal. Confusing the two is behind most certification disputes.',
    sections: [
      {
        heading: 'The document types',
        paragraphs: [
          'EN 10204 sets out four inspection document types. In practice only two matter for the alloy and stainless trade, and the distinction between them is exactly one thing: independence.',
        ],
        table: {
          caption: 'EN 10204:2004 inspection documents',
          headers: ['Type', 'Name', 'Basis', 'Validated by'],
          rows: [
            ['2.1', 'Declaration of compliance', 'Non-specific — no test results given', 'Manufacturer'],
            ['2.2', 'Test report', 'Non-specific — results from routine production tests, not your batch', 'Manufacturer'],
            ['3.1', 'Inspection certificate 3.1', 'Specific — tests on the actual product supplied', 'Manufacturer\'s authorised inspection representative, independent of the manufacturing department'],
            ['3.2', 'Inspection certificate 3.2', 'Specific — tests on the actual product supplied', 'Manufacturer\'s representative AND either the purchaser\'s representative or an independent third-party inspector'],
          ],
        },
      },
      {
        heading: 'Specific versus non-specific — the real dividing line',
        paragraphs: [
          'A 2.2 test report is non-specific inspection. The results are genuine, but they come from the mill\'s routine production testing and are not necessarily from the heat you were shipped. A 2.2 is not a substitute for a 3.1, and accepting one where the specification calls for 3.1 is a documentation failure that will be found at audit.',
          'A 3.1 is specific inspection: the test results relate to the material actually supplied, identified by heat or lot number. This is the working standard for pressure-containing and structural service, and it is what most process-industry specifications call for.',
        ],
      },
      {
        heading: 'What 3.2 adds',
        paragraphs: [
          'A 3.2 certificate covers the same tests on the same material. What changes is that a second party — the purchaser\'s own representative, or an independent inspection agency such as Lloyd\'s Register, TÜV, DNV, BV or SGS — witnesses the testing and counter-signs the certificate.',
          'That witnessing has practical cost and schedule consequences: the inspector must be present when the tests are run, so testing has to be scheduled around their availability. Requesting 3.2 late in a production run generally means re-testing.',
        ],
      },
      {
        heading: 'Traceability is what makes any of it useful',
        paragraphs: [
          'A certificate is only as good as the link between the paper and the metal in front of you. That link is the heat number, carried from the melt through every processing step and marked on the material itself.',
          'Where material is cut, the marking must be transferred before separation and the transfer recorded. An uncut length with a legible heat number and a matching certificate is traceable; an unmarked offcut with a photocopied certificate is not, whatever the certificate says.',
        ],
        bullets: [
          'Heat or cast number on the material, matching the certificate',
          'Marking transferred and recorded before any cutting',
          'Certificate stating the specification, grade and delivery condition',
          'Chemical analysis and mechanical results against the specified acceptance criteria',
          'Where required, NDT and corrosion test results referenced to the same heat',
        ],
      },
      {
        heading: 'What we supply',
        paragraphs: [
          'Jyoti Metal (India) issues EN 10204 3.1 mill test certificates with consignments as standard, and arranges 3.2 third-party witnessed inspection on request through the recognised agencies. Where 3.2 is required, tell us at enquiry stage rather than at dispatch — the inspector has to witness the testing, which has to be planned in.',
          'Our quality management system is certified to ISO 9001:2015 (certificate QMS/010898/0619), alongside ISO 14001:2015 for environment and ISO 45001:2018 for occupational health and safety.',
        ],
      },
    ],
    takeaways: [
      'EN 10204 governs who validates the certificate, not what the material must achieve',
      '2.2 is non-specific — results may not be from your heat; it does not satisfy a 3.1 requirement',
      '3.1 is specific inspection validated by the manufacturer\'s independent inspection representative',
      '3.2 adds a purchaser or third-party witness who counter-signs — and must be requested before testing',
      'Heat-number traceability, transferred correctly through cutting, is what makes a certificate meaningful',
    ],
  },

  {
    id: 6,
    slug: 'titanium-grade-5-dimensional-stability-under-thermal-cycling',
    title: 'TITANIUM GRADE 5 AEROSPACE FIELD CASE STUDY',
    excerpt:
      'Tracking Ti-6Al-4V structural bracket dimensional tolerance retention through 10,000 thermal shock cycles.',
    category: 'Case Studies',
    date: 'May 22, 2026',
    readTime: '12 min read',
    image: '/images/pexels-tokuo-nobuhiro-79378678-20472153.jpg',
    author: 'Rajesh Menon',
    authorRole: 'Process & Quality',
    standfirst:
      'Ti-6Al-4V holds tight tolerances through thermal cycling better than most structural metals, but not because it is inherently stable — it is because the residual stress was dealt with before the part left the shop. This is a technical explainer on why dimensional drift happens and how it is controlled.',
    sections: [
      {
        heading: 'Why Grade 5 in the first place',
        paragraphs: [
          'Ti-6Al-4V, titanium Grade 5, accounts for around half of all titanium used. It is an alpha-beta alloy with roughly 6% aluminium and 4% vanadium, and it earns its place on specific strength: comparable strength to many steels at roughly 56% of the density.',
          'Its coefficient of thermal expansion is around 8.6 µm/m·K, well below austenitic stainless at roughly 16-17. In an assembly that cycles through a wide temperature range, that lower expansion means less differential movement against surrounding structure and less thermally induced stress at joints.',
        ],
        table: {
          caption: 'Ti-6Al-4V (Grade 5), annealed — typical values',
          headers: ['Property', 'Typical value'],
          rows: [
            ['Density', '4.43 g/cm³'],
            ['Tensile strength', '895 - 930 MPa min'],
            ['Yield strength 0.2%', '825 - 860 MPa min'],
            ['Elongation', '10 - 14% min'],
            ['Modulus of elasticity', '110 - 114 GPa'],
            ['Coefficient of thermal expansion', '8.6 µm/m·K (20-100 °C)'],
            ['Beta transus', '980 - 1000 °C'],
          ],
        },
      },
      {
        heading: 'Where dimensional drift actually comes from',
        paragraphs: [
          'A part that moves in service is almost always releasing locked-in residual stress, not creeping. Machining a stressed billet removes material asymmetrically, unbalancing the stress field; the part relaxes into a new shape. Thermal cycling accelerates that relaxation by giving the microstructure the energy to move.',
          'The failure pattern is characteristic: most of the movement happens in the first few hundred cycles and then flattens out. A part that is still drifting after several thousand cycles usually has a different problem — a metallurgical instability or a fixture issue rather than simple stress relief.',
        ],
      },
      {
        heading: 'The controls that matter',
        paragraphs: [
          'Stress relief is the primary one. For Ti-6Al-4V this is typically 480-650 °C held for one to four hours, done after rough machining and before finishing so that the relaxation happens while there is still material left to cut away.',
          'Titanium also has low thermal conductivity, around 6.7 W/m·K, so machining heat concentrates at the cutting zone rather than dispersing into the workpiece. Aggressive finishing passes put a thermally damaged, tensile-stressed surface layer on the part — which is bad for both dimensional stability and fatigue.',
        ],
        bullets: [
          'Stress relieve between rough and finish machining, not after final machining',
          'Rough, stress relieve, semi-finish, stress relieve again for the tightest tolerance work',
          'Keep finishing passes light and well-cooled — low thermal conductivity concentrates heat at the tool',
          'Avoid clamping distortion; a part machined in a distorted fixture relaxes out of tolerance when released',
          'Specify surface treatment — shot peening puts the surface into compression, helping both fatigue and stability',
        ],
      },
      {
        heading: 'Alpha case, and why it matters here',
        paragraphs: [
          'Heated in air above roughly 600 °C, titanium takes oxygen into solution at the surface and forms a hard, brittle oxygen-enriched layer called alpha case. It cracks readily under load and those cracks run into the parent metal.',
          'Alpha case must be removed by chemical milling or machining after any high-temperature operation in air, or the operation must be done under vacuum or inert atmosphere. A stress relief cycle intended to improve stability will do net harm if it leaves alpha case behind — which is why the atmosphere specification belongs on the drawing alongside the temperature.',
        ],
      },
      {
        heading: 'Verifying stability rather than assuming it',
        paragraphs: [
          'Where dimensional retention genuinely matters, it is demonstrated rather than argued. A thermal cycling qualification runs representative parts through the service temperature range for a defined number of cycles, with dimensional inspection at intervals — commonly on a CMM against the same datum scheme used in production.',
          'What you are looking for is the curve flattening. Movement that decays and stabilises indicates residual stress working itself out, which a further stress relief will address. Movement that continues linearly points at something else and needs investigating before the part is qualified.',
        ],
      },
      {
        heading: 'On procurement',
        paragraphs: [
          'For this class of work, the purchase specification should state the material specification and grade, the delivery condition, the melt route where fatigue is critical, and the required surface condition. Ti-6Al-4V is supplied to ASTM B265 for plate and sheet, B348 for bar and billet, and B861 for pipe, with AMS specifications used where aerospace requirements apply.',
          'Ask for the heat chemistry rather than the specification range, particularly the oxygen content — oxygen is a potent strengthener in titanium and moves both strength and ductility within a single grade.',
        ],
      },
    ],
    takeaways: [
      'Ti-6Al-4V holds tolerance through thermal cycling largely because of low thermal expansion, 8.6 against 16-17 µm/m·K for austenitic stainless',
      'Dimensional drift is residual stress relaxing, not creep — it decays and flattens rather than continuing',
      'Stress relieve at 480-650 °C between rough and finish machining, not after final cuts',
      'Alpha case from heating in air above ~600 °C is brittle and must be removed or prevented',
      'Qualify stability by thermal cycling with dimensional inspection at intervals; look for the curve flattening',
      'Specify oxygen content on the order — it moves strength and ductility within the grade',
    ],
  },
];

export const getArticleBySlug = (slug: string): Article | undefined =>
  articles.find((a) => a.slug === slug);

export const getRelatedArticles = (article: Article, limit = 3): Article[] => {
  // Same category first, then fill from the rest so the rail is never short.
  const sameCategory = articles.filter((a) => a.id !== article.id && a.category === article.category);
  const others = articles.filter((a) => a.id !== article.id && a.category !== article.category);
  return [...sameCategory, ...others].slice(0, limit);
};
