import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

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

export const InfrastructurePage: React.FC<InfrastructurePageProps> = ({ onOpenQuoteModal }) => {
  const rootRef = useRef<HTMLDivElement>(null);

  /* Manufacturing-process carousel. The track is a plain overflow-x flex row with
     its scrollbar hidden, so on desktop there is no visible affordance that it
     scrolls — hence the explicit prev/next arrows. `edge` tracks which ends are
     reached so the arrows can grey out instead of looking broken at the limits. */
  const processTrackRef = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState<{ start: boolean; end: boolean }>({ start: true, end: false });

  const syncEdges = () => {
    const el = processTrackRef.current;
    if (!el) return;
    // 2px of slack: fractional scroll widths mean scrollLeft rarely hits the exact max.
    setEdge({
      start: el.scrollLeft <= 2,
      end: el.scrollLeft >= el.scrollWidth - el.clientWidth - 2,
    });
  };

  useEffect(() => {
    const el = processTrackRef.current;
    if (!el) return;
    syncEdges();
    el.addEventListener('scroll', syncEdges, { passive: true });
    window.addEventListener('resize', syncEdges);
    return () => {
      el.removeEventListener('scroll', syncEdges);
      window.removeEventListener('resize', syncEdges);
    };
  }, []);

  // Step by one whole card (flex-basis 360px + 32px gap) rather than a fixed
  // pixel guess, so the scroll-snap always lands cleanly on the next card.
  const scrollProcess = (dir: -1 | 1) => {
    processTrackRef.current?.scrollBy({ left: dir * 392, behavior: 'smooth' });
  };

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
      // No brochure photo shows chamfering itself, so this step carries the
      // tube mill floor shot. It is the one plant image not already spoken for
      // by another card — 07 keeps the polishing-line bench, which is what that
      // photo actually depicts.
      image: '/images/plant/tube-mill-floor.jpg',
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
    'Corrosion Testing: Micro, Macro, IGC as per practice ABC',
    'Ultrasonic Testing',
    'Liquid Penetrate Testing',
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
              capacity of 5,000 tonnes per annum. The plant is fully automatic to ASTM standards and supported by
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
              A systematic chain type process. Cold rolled coils enter the slitting line and leave as
              inspected, packed and labelled stainless steel tube.
            </p>
          </div>

          {/* Prev/next controls, right-aligned above the track. Square and teal to
              match the other buttons on the site.

              position/zIndex are set inline and deliberately: this file's
              "relative z-10" utility classes are inert (the project has no
              Tailwind build), so the absolutely-positioned .infra-backdrop-word
              — the giant grey "PROCESS" at the right edge, z-index 0 — paints
              over static content and was clipping the right-hand button. */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', position: 'relative', zIndex: 2 }}>
            {([
              { dir: -1 as const, label: 'Show previous process steps', Icon: ChevronLeft, disabled: edge.start },
              { dir: 1 as const, label: 'Show next process steps', Icon: ChevronRight, disabled: edge.end },
            ]).map(({ dir, label, Icon, disabled }) => (
              <button
                key={dir}
                type="button"
                onClick={() => scrollProcess(dir)}
                disabled={disabled}
                aria-label={label}
                style={{
                  width: '44px',
                  height: '44px',
                  background: disabled ? '#cbd5e1' : '#51847D',
                  border: 'none',
                  color: '#ffffff',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: disabled ? 'default' : 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (!disabled) e.currentTarget.style.background = '#3d6963';
                }}
                onMouseLeave={(e) => {
                  if (!disabled) e.currentTarget.style.background = '#51847D';
                }}
              >
                <Icon size={22} />
              </button>
            ))}
          </div>

          <div
            ref={processTrackRef}
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

      {/* 9. Closing call to action */}
      <section className="section bg-white" style={{ padding: '48px 0', borderTop: '1px solid #e2e8f0' }}>
        <div className="container">
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
