import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';

/* ---------------------------------------------------------------------------
   Manufacturing Facilities (route: /infrastructure)

   Every fact, figure, process step, size, grade and test name on this page is
   taken from the company brochure (cert1.pdf) — the plant description, the
   welded pipe & tube line, the annealing/straightening/polishing/inspection
   write-ups, the size range, the manufacturing process flow, the testing
   regime and the industries list. Nothing here is sourced from outside that
   document, so do not add stats, certifications or capabilities that cannot be
   pointed to on a brochure page.

   Photography under /images/plant/ was extracted from the same PDF.
--------------------------------------------------------------------------- */

interface InfrastructurePageProps {
  onOpenQuoteModal: () => void;
  onNavigate?: (tab: string) => void;
}

interface CapacityStat {
  countTo?: number;
  comma?: boolean;
  decimals?: number;
  suffix?: string;
  staticValue?: string;
  label: string;
}

export const InfrastructurePage: React.FC<InfrastructurePageProps> = ({ onOpenQuoteModal }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const capacityRef = useRef<HTMLDivElement>(null);
  const countedRef = useRef(false);

  const heroTitle = 'Stainless Steel Tube, Pipe & Pipe Fittings';

  /* Brochure: "MANUFACTURING PROCESS" flow diagram, read in sequence. */
  const processCards = [
    {
      number: '01',
      title: 'Cold Rolled Coils',
      sub: 'Incoming stainless steel strip',
      image: '/images/plant/decoiler-coil-line.jpg',
    },
    {
      number: '02',
      title: 'Slitting Line',
      sub: 'Strips slit to width for the tube diameter',
      image: '/images/plant/slitting-tube-mill.jpg',
    },
    {
      number: '03',
      title: 'Tube Mill',
      sub: 'Roll forming & TIG welding without filler metal',
      image: '/images/plant/plant-overview.jpg',
    },
    {
      number: '04',
      title: 'Cutter',
      sub: 'Tubes cut to required lengths',
      image: '/images/plant/straightening-machine.jpg',
    },
    {
      number: '05',
      title: 'Continuous Anneal & Pickle Line',
      sub: 'Heat treatment and immediate quenching',
      image: '/images/plant/annealing-line.jpg',
    },
    {
      number: '06',
      title: 'Chamfering',
      sub: 'Tube ends prepared',
      image: '/images/plant/polishing-line.jpg',
    },
    {
      number: '07',
      title: 'Buffing or Pickling Bath',
      sub: 'Surface finishing route as specified',
      image: '/images/plant/polishing-line.jpg',
    },
    {
      number: '08',
      title: 'Inspecting',
      sub: 'Every single piece inspected',
      image: '/images/plant/inspection-packaging.jpg',
    },
    {
      number: '09',
      title: 'Packing & Delivery',
      sub: 'Labelled bundles dispatched with test certificates',
      image: '/images/plant/size-range-stock.jpg',
    },
  ];

  /* Brochure: "MANUFACTURING FACILITIES" — the four named operations. */
  const facilities = [
    {
      title: 'Annealing',
      desc:
        'Annealing, or heat treatment, of the tube is carried out through a fully automatic conveyor. It consists of heating the tubes to a specified temperature and immediate quenching in circulating water thereafter.',
      image: '/images/plant/annealing-line.jpg',
      tag: 'HEAT TREATMENT',
    },
    {
      title: 'Straightening',
      desc:
        'After the annealing operation, the tubes are straightened with a straightening machine. In addition to giving a high degree of straightness, the tubes are also rounded up during the operation.',
      image: '/images/plant/straightening-machine.jpg',
      tag: 'GEOMETRY CONTROL',
    },
    {
      title: 'Polishing',
      desc:
        'To meet demand for high-quality externally polished tubes and pipes in architecture, general engineering, dairy and food-processing sectors, the plant is equipped with a state-of-the-art polishing machine.',
      image: '/images/plant/polishing-line.jpg',
      tag: '220 – 1200 GRIT',
    },
    {
      isDarkCallout: true,
      title: 'Size Range & Grades',
      sub: 'Request the full dimensional and grade schedule',
    },
    {
      title: 'Inspection & Packaging',
      desc:
        'Every single piece is inspected before packaging and dispatch. Material is packed in proper plastic cover to avoid scratch and damage in transport, then labelled with grade, dimension and quantity on each bundle.',
      image: '/images/plant/inspection-packaging.jpg',
      tag: 'DEFECT-FREE SUPPLY',
    },
    {
      title: 'Marking & Traceability',
      desc:
        'To ensure complete identification and traceability, all information required by the standards — brand name, size, grade, specifications, heat no. and lot no. — is marked on all pipes and tubes using the latest inkjet marking machine.',
      image: '/images/plant/size-range-stock.jpg',
      tag: 'HEAT & LOT NO.',
    },
  ];

  /* Brochure: "SIZE RANGE". */
  const sizeRange = [
    { label: 'Outside Diameter', value: '8.0 mm OD to 219.08 mm OD' },
    { label: 'Thickness', value: '0.5 mm THK to 6.0 mm THK' },
    { label: 'Length', value: "As per customer's requirement" },
    { label: 'Grade (AISI)', value: '202, 304, 304L, 316, 316L' },
    { label: 'Grade (DIN)', value: '1.4301, 1.4306, 1.4401, 1.4404' },
    { label: 'Finish', value: '220–1200 grit mirror · 80–220 grit mat' },
  ];

  /* Brochure: plant description on the introduction spread. */
  const capacityStats: CapacityStat[] = [
    { countTo: 5000, comma: true, label: 'Tonnes Per Annum Installed' },
    { countTo: 2009, label: 'Plant Commissioned' },
    { countTo: 219.08, decimals: 2, suffix: ' mm', label: 'Maximum Outside Diameter' },
    { countTo: 1200, comma: true, suffix: ' grit', label: 'Mirror Finish Capability' },
    { staticValue: '100%', label: 'Hydrostatic Testing' },
  ];

  const [counts, setCounts] = useState<number[]>(capacityStats.map(() => 0));

  /* Brochure: "TESTING". */
  const mechanicalTests = [
    'Tensile',
    'Hardness',
    'Flattening',
    'Flare',
    'Flange',
    'Reverse-bend and re-flat tests',
  ];

  const testingBlocks = [
    {
      title: 'Chemical Analysis',
      desc: 'Chemical test as to ensure a specific quality.',
    },
    {
      title: 'Corrosion Test',
      desc: 'Corrosion test is conducted only when specially requested by the client.',
    },
    {
      title: 'Eddy Current Testing',
      desc:
        'To detect homogeneities in subsurface, eddy current testing is carried out using a Digital Flaw-mark Testing System.',
    },
    {
      title: 'Hydrostatic Testing',
      desc:
        '100% hydrostatic testing is carried out according to ASTM A-450 norms to check the tube leakage.',
    },
    {
      title: 'Air Under Pressure Test',
      desc:
        'Tubes are internally pressurised with clean and dry compressed air and submerged in clear water to check any evidence of air leakage.',
    },
    {
      title: 'Visual Inspection',
      desc:
        'After passivation, every single length of tubes and pipes is subjected to a visual inspection by trained staff to detect surface flaws and other imperfections.',
    },
  ];

  const supplementaryTests = [
    'Eddy Current Testing',
    'O.P Testing',
    'Radiography Testing',
    'Corrosion Testing — Micro, Macro, IGC as per practice ABC',
    'Ultrasonic Testing',
    'Liquid Penetrate Testing',
  ];

  /* Brochure: "STAINLESS STEEL FOR FOLLOWING INDUSTRIES". */
  const industries = [
    'Chemical Plants',
    'Heat Exchangers',
    'Fertilizer Plants',
    'Pulp & Paper Mills',
    'Pharmaceutical',
    'Food Industries',
    'Railway Coaches',
    'Energy Industries',
    'Refrigeration',
    'Submersible Pumps',
    'Metallurgical Industries',
    'Fabrication',
    'Oil & Gas Industries',
    'Automobile Industries',
    'Sugar Industries',
    'Sanitary / Plumbing',
    'Decoratives',
    'Boilers',
    'Dairy & Food Products',
    'Space Applications',
    'Instrumentation',
    'Ships',
    'Power Plants',
    'Architectural & Construction',
    'Furniture / Railing',
  ];

  const marqueeItems = [
    'Slitting Line',
    'Tube Mill',
    'TIG Welding',
    'Bead Polishing',
    'Sizing Rolls',
    'Cold Drawn',
    'Solution Annealed',
    'Straightened',
    'Pickled & Passivated',
    'Eddy Current Testing',
    'Hydrostatic Testing',
    'ISO 9001:2015 & ISO 14001:2015',
  ];

  // Scroll-reveal fade-up + word reveal (scoped to this page)
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll('.infra-reveal, .infra-word'));
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Count-up for the capacity band
  useEffect(() => {
    const el = capacityRef.current;
    if (!el) return;
    const targets = capacityStats.map((s) => s.countTo ?? 0);
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !countedRef.current) {
          countedRef.current = true;
          const duration = 1700;
          let startTs = 0;
          const step = (ts: number) => {
            if (!startTs) startTs = ts;
            const t = Math.min(1, (ts - startTs) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setCounts(targets.map((v) => v * eased));
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderCapacityValue = (stat: CapacityStat, idx: number) => {
    if (stat.staticValue) return stat.staticValue;
    const raw = counts[idx] ?? 0;
    const dp = stat.decimals ?? 0;
    const num = stat.comma
      ? raw.toLocaleString('en-US', { minimumFractionDigits: dp, maximumFractionDigits: dp })
      : raw.toFixed(dp);
    return `${num}${stat.suffix ?? ''}`;
  };

  return (
    <div ref={rootRef} className="inner-page" style={{ background: '#ffffff', minHeight: '100vh' }}>
      {/* 1. Hero */}
      <section
        className="page-hero infra-sheen"
        style={{
          background: '#061221',
          color: '#ffffff',
          padding: '60px 0 40px',
          borderBottom: '3px solid #51847D',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          className="infra-hero-bg"
          style={{
            backgroundImage:
              'linear-gradient(135deg, rgba(6, 18, 33, 0.92) 0%, rgba(6, 18, 33, 0.62) 50%, rgba(6, 18, 33, 0.94) 100%), url("/images/plant/tube-mill-floor.jpg")',
          }}
        />
        <div className="infra-sheen-layer" />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '920px', margin: '0 auto', textAlign: 'center' }}>
            <span className="small-label infra-reveal is-visible" style={{ color: '#77b8b0' }}>
              MANUFACTURING FACILITIES
            </span>
            <h1
              className="hero-title"
              style={{ fontSize: '3.7rem', color: '#ffffff', marginBottom: '24px', marginTop: '10px', lineHeight: 1.08 }}
            >
              {heroTitle.split(' ').map((word, i) => (
                <span key={`${word}-${i}`} className="infra-word" style={{ transitionDelay: `${i * 65}ms`, marginRight: '0.28em' }}>
                  {word}
                </span>
              ))}
            </h1>
            <p
              className="infra-reveal is-visible"
              style={{
                fontSize: '1.15rem',
                color: '#cbd5e1',
                lineHeight: 1.7,
                marginBottom: '32px',
                maxWidth: '780px',
                marginLeft: 'auto',
                marginRight: 'auto',
                transitionDelay: '350ms',
              }}
            >
              A state-of-the-art ERW (Electro Refusal Welded) manufacturing plant with an installed
              capacity of 5,000 tonnes per annum — fully automatic to ASTM standards and supported by
              a high quality testing laboratory to meet international market / EOU requirements.
            </p>
            <div
              className="infra-reveal is-visible"
              style={{ display: 'flex', justifyContent: 'center', gap: '16px', transitionDelay: '420ms', marginTop: '28px' }}
            >
              <button
                onClick={onOpenQuoteModal}
                className="btn btn-accent"
                style={{
                  padding: '16px 38px',
                  fontSize: '1rem',
                  borderRadius: '12px',
                  boxShadow: '0 8px 24px rgba(81, 132, 125, 0.4)',
                }}
              >
                Schedule a Plant Visit <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Capabilities Marquee Ticker */}
      <section style={{ background: '#0b1b2e', padding: '18px 0' }}>
        <div className="marquee-container">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '14px',
                  color: '#cbd5e1',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {item}
                <span style={{ width: '6px', height: '6px', background: '#51847D', borderRadius: '50%' }} />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Welded Pipes & Tubes */}
      <section className="section bg-white" style={{ padding: '48px 0 36px' }}>
        <div className="container">
          <div
            className="grid-responsive-about"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '60px', alignItems: 'center' }}
          >
            <div className="infra-reveal">
              <span className="small-label">INSIDE THE PLANT</span>
              <h2
                className="section-title"
                style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '20px', marginTop: '10px', lineHeight: 1.2 }}
              >
                Welded Pipes &amp; Tubes
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7, marginBottom: '18px' }}>
                Cold rolled stainless steel strips are welded into tubes in the state of the art tube
                mills under fully automated precision process. Manufacturing begins with slitting of
                strips to the required width based on the diameter of the tubes to be formed.
              </p>
              <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7, marginBottom: '18px' }}>
                These slitted strips are passed through a series of rollers and form tubes
                automatically on different stands with rolls, welded on a fully automated TIG welding
                process without the addition of filler metal. The welding head line is polished
                continuously with the help of an automatic bead polishing machine to produce a
                perfect even surface, and the tubes are then passed through a series of sizing rolls
                to ensure joviality and tolerances.
              </p>
              <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7 }}>
                Tubes are then cut into required lengths, cold-drawn, solution annealed, straightened,
                pickled, passivated and polished before other destructive and nondestructive testing
                and dispatch. The systematic chain-type processes have been approved and granted
                certification of maintaining International standard ISO 9001:2015 &amp; ISO 14001:2015.
              </p>
            </div>

            <div className="infra-reveal" style={{ transitionDelay: '120ms' }}>
              <div
                className="about-arch-frame-reversed"
                style={{ borderRadius: '0px', overflow: 'hidden', boxShadow: '0 20px 45px rgba(0,0,0,0.14)', background: '#061221' }}
              >
                <img
                  src="/images/plant/plant-overview.jpg"
                  alt="Stainless steel tube mill shop floor with cold rolled coils"
                  style={{ width: '100%', height: '460px', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Manufacturing Process — horizontal sliding carousel */}
      <section
        className="section bg-tint relative overflow-hidden"
        style={{
          padding: '48px 0',
          background: '#F2F3F5',
          borderTop: '1px solid #e2e8f0',
          position: 'relative',
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        <div className="infra-backdrop-word">PROCESS</div>

        <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="infra-reveal text-center max-w-[760px] mx-auto mb-14">
            <span
              className="small-label block mb-3 text-xs sm:text-sm font-bold uppercase tracking-[0.2em]"
              style={{ color: '#51847D' }}
            >
              FROM COIL TO DELIVERY
            </span>
            <h2 className="section-title text-4xl sm:text-5xl font-bold tracking-tight mb-4" style={{ color: '#0F172A' }}>
              The Manufacturing Process
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: '#64748b' }}>
              A systematic chain-type process — cold rolled coils enter the slitting line and leave as
              inspected, packed and labelled stainless steel tube.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '32px',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
              paddingTop: '35px',
              paddingBottom: '25px',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            className="hide-scrollbar"
          >
            {processCards.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                style={{ flex: '0 0 360px', scrollSnapAlign: 'start', position: 'relative', cursor: 'pointer' }}
                className="group"
                onClick={onOpenQuoteModal}
              >
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: '-28px',
                    left: '16px',
                    zIndex: 25,
                    color: '#ffffff',
                    fontSize: '92px',
                    fontWeight: 800,
                    lineHeight: 0.8,
                    letterSpacing: '-0.04em',
                    userSelect: 'none',
                    pointerEvents: 'none',
                    textShadow: '0 4px 16px rgba(0,0,0,0.45)',
                  }}
                >
                  {step.number}
                </div>

                <div
                  style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '460px',
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '0px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#51847D';
                    e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.14)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#cbd5e1';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)';
                  }}
                >
                  <div style={{ position: 'relative', flex: 1, width: '100%', overflow: 'hidden', background: '#090d14' }}>
                    <div
                      style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.12)', zIndex: 10, transition: 'opacity 0.4s ease' }}
                      className="group-hover:opacity-0"
                    />
                    <img
                      src={step.image}
                      alt={step.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'grayscale(100%)',
                        transition: 'transform 0.5s ease-out',
                      }}
                      className="group-hover:scale-105"
                    />
                  </div>

                  <div
                    style={{
                      height: '80px',
                      background: '#121A24',
                      padding: '0 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      zIndex: 20,
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', paddingRight: '12px' }}>
                      <span style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 600, letterSpacing: '0.01em', lineHeight: 1.25 }}>
                        {step.title}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '3px' }}>{step.sub}</span>
                    </div>

                    <div style={{ color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <ArrowUpRight
                        size={24}
                        style={{ transition: 'transform 0.3s ease-out' }}
                        className="group-hover:translate-x-1.5 group-hover:-translate-y-1.5"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Plant operations */}
      <section className="section bg-white" style={{ padding: '48px 0', borderTop: '1px solid #e2e8f0' }}>
        <div className="container" style={{ maxWidth: '1440px', width: '95%' }}>
          <div className="infra-reveal" style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 60px' }}>
            <span className="small-label">PLANT OPERATIONS</span>
            <h2 className="section-title" style={{ fontSize: '2.5rem', marginTop: '10px', marginBottom: '16px' }}>
              Fully Automatic, End to End
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem' }}>
              Each operation on the line — heat treatment, straightening, polishing, inspection and
              marking — is carried out in-house.
            </p>
          </div>

          <div
            className="grid-responsive-3col infra-reveal"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '36px' }}
          >
            {facilities.map((item, idx) => {
              if (item.isDarkCallout) {
                return (
                  <div
                    key={`callout-${idx}`}
                    onClick={onOpenQuoteModal}
                    style={{
                      position: 'relative',
                      height: '420px',
                      background: '#061221',
                      border: '1px solid rgba(119, 184, 176, 0.4)',
                      borderRadius: '0px',
                      boxShadow: '0 8px 30px rgba(6, 18, 33, 0.2)',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '32px',
                      textAlign: 'center',
                      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#77b8b0';
                      e.currentTarget.style.boxShadow = '0 16px 40px rgba(81, 132, 125, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(119, 184, 176, 0.4)';
                      e.currentTarget.style.boxShadow = '0 8px 30px rgba(6, 18, 33, 0.2)';
                    }}
                  >
                    <div
                      style={{ position: 'absolute', inset: '16px', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '0px', pointerEvents: 'none' }}
                    />

                    <span
                      style={{ fontSize: '0.78rem', color: '#77b8b0', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '8px' }}
                    >
                      Click for more
                    </span>
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '0px',
                        background: '#51847D',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '16px 0',
                      }}
                    >
                      <ArrowRight size={22} />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff', margin: '4px 0 8px', letterSpacing: '-0.01em' }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: '#cbd5e1', margin: 0, fontWeight: 500 }}>{item.sub}</p>
                  </div>
                );
              }

              return (
                <div
                  key={item.title}
                  onClick={onOpenQuoteModal}
                  style={{
                    position: 'relative',
                    height: '420px',
                    background: '#061221',
                    border: '1px solid #1e293b',
                    borderRadius: '0px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '28px',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#77b8b0';
                    e.currentTarget.style.boxShadow = '0 16px 40px rgba(6, 18, 33, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#1e293b';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}
                  />

                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(180deg, rgba(6, 18, 33, 0.88) 0%, rgba(6, 18, 33, 0.25) 45%, rgba(6, 18, 33, 0.92) 100%)',
                      zIndex: 2,
                    }}
                  />

                  <div style={{ position: 'relative', zIndex: 3 }}>
                    <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.25, margin: 0, letterSpacing: '-0.01em' }}>
                      {item.title}
                    </h3>
                    <p
                      style={{ fontSize: '0.86rem', color: '#cbd5e1', marginTop: '8px', marginBottom: 0, lineHeight: 1.55, fontWeight: 500, maxWidth: '95%' }}
                    >
                      {item.desc}
                    </p>
                  </div>

                  <div
                    style={{
                      position: 'relative',
                      zIndex: 3,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#ffffff',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                    }}
                  >
                    <span>{item.tag}</span>
                    <ArrowRight size={16} color="#77b8b0" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Plant capacity counter strip */}
      <section style={{ background: '#ffffff', padding: '75px 0', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container" style={{ maxWidth: '1300px' }}>
          <div
            ref={capacityRef}
            className="infra-capacity-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', textAlign: 'center', alignItems: 'center' }}
          >
            {capacityStats.map((stat, idx) => (
              <div key={stat.label} style={{ padding: '12px 4px' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '2.8rem',
                    fontWeight: 700,
                    color: '#0f172a',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {renderCapacityValue(stat, idx)}
                </div>
                <div
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: '#64748b',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    marginTop: '12px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Size range */}
      <section className="section bg-white" style={{ padding: '48px 0', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <div
            className="grid-responsive-about"
            style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '60px', alignItems: 'center' }}
          >
            <div className="infra-reveal">
              <span className="small-label">SIZE RANGE</span>
              <h2
                className="section-title"
                style={{ fontSize: '2.5rem', color: '#0f172a', marginTop: '10px', marginBottom: '20px', lineHeight: 1.2 }}
              >
                Dimensions, Grades &amp; Finishes
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7, marginBottom: '26px' }}>
                Ranges of finish from 220 grit to 1200 grit (mirror finish) and 80 grit to 220 grit
                (mat finish) are made as per customer's requirement.
              </p>

              <div style={{ borderTop: '1px solid #e2e8f0' }}>
                {sizeRange.map((row) => (
                  <div
                    key={row.label}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      gap: '20px',
                      padding: '16px 0',
                      borderBottom: '1px solid #e2e8f0',
                    }}
                  >
                    <span
                      style={{ fontSize: '0.74rem', fontWeight: 800, color: '#64748b', letterSpacing: '0.1em', textTransform: 'uppercase', flexShrink: 0 }}
                    >
                      {row.label}
                    </span>
                    <span style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', textAlign: 'right' }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="infra-reveal" style={{ transitionDelay: '100ms' }}>
              <div
                style={{ borderRadius: '0 90px 0 140px', overflow: 'hidden', boxShadow: '0 25px 60px rgba(6, 18, 33, 0.15)', background: '#061221' }}
              >
                <img
                  src="/images/plant/size-range-stock.jpg"
                  alt="Packed stainless steel pipes and tubes in the dispatch stockyard"
                  style={{ width: '100%', height: '520px', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Testing */}
      <section
        className="section bg-tint"
        style={{ padding: '48px 0', background: '#F2F3F5', borderTop: '1px solid #e2e8f0', position: 'relative', overflow: 'hidden' }}
      >
        <div className="infra-backdrop-word" style={{ left: '-18px', right: 'auto' }}>TESTING</div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="infra-reveal" style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 56px' }}>
            <span className="small-label">TESTING &amp; INSPECTION</span>
            <h2 className="section-title" style={{ fontSize: '2.5rem', marginTop: '10px', marginBottom: '16px' }}>
              Tested to ASTM A-450 &amp; A-530
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem' }}>
              Reverse-bend and re-flat tests are carried out in full compliance with the relevant
              standards, ensuring trouble-free expansion, welding and use at the customer's end.
            </p>
          </div>

          <div
            className="grid-responsive-3col infra-reveal"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '36px' }}
          >
            {testingBlocks.map((block) => (
              <div
                key={block.title}
                style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '26px 24px', display: 'flex', flexDirection: 'column', gap: '10px' }}
              >
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.01em' }}>
                  {block.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>{block.desc}</p>
              </div>
            ))}
          </div>

          <div
            className="grid-responsive-about infra-reveal"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}
          >
            <div style={{ background: '#061221', padding: '32px 30px' }}>
              <h3
                style={{ fontSize: '0.78rem', fontWeight: 800, color: '#77b8b0', letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 20px' }}
              >
                Destructive / Mechanical Testing
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {mechanicalTests.map((test) => (
                  <div key={test} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <CheckCircle2 size={18} color="#51847D" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.94rem', color: '#e2e8f0', lineHeight: 1.5, fontWeight: 600 }}>{test}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '32px 30px' }}>
              <h3
                style={{ fontSize: '0.78rem', fontWeight: 800, color: '#51847D', letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 20px' }}
              >
                Supplementary Testing
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {supplementaryTests.map((test) => (
                  <div key={test} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <CheckCircle2 size={18} color="#51847D" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.94rem', color: '#334155', lineHeight: 1.5, fontWeight: 600 }}>{test}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '0.82rem', color: '#64748b', fontStyle: 'italic', margin: '20px 0 0', lineHeight: 1.55 }}>
                Note: Supplementary tests are conducted only when specially requested by the client.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Industries served */}
      <section className="section bg-white" style={{ padding: '48px 0', borderTop: '1px solid #e2e8f0' }}>
        <div className="container">
          <div className="infra-reveal" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px' }}>
            <span className="small-label">APPLICATIONS</span>
            <h2 className="section-title" style={{ fontSize: '2.5rem', marginTop: '10px', marginBottom: '16px' }}>
              Stainless Steel for Following Industries
            </h2>
          </div>

          <div
            className="infra-reveal"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px', marginBottom: '44px' }}
          >
            {industries.map((industry) => (
              <div
                key={industry}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px 18px',
                  background: '#F8FAFC',
                  borderLeft: '3px solid #51847D',
                  fontSize: '0.94rem',
                  fontWeight: 700,
                  color: '#0f172a',
                }}
              >
                {industry}
              </div>
            ))}
          </div>

          <div className="infra-reveal" style={{ textAlign: 'center' }}>
            <button
              onClick={onOpenQuoteModal}
              className="btn"
              style={{
                padding: '16px 36px',
                fontSize: '0.95rem',
                fontWeight: 800,
                background: '#061221',
                color: '#ffffff',
                border: 'none',
                borderRadius: '0px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 10px 25px rgba(6, 18, 33, 0.25)',
                transition: 'transform 0.25s ease, background 0.25s ease',
              }}
            >
              Request a Quotation <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
