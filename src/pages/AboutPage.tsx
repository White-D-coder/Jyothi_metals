import React, { useState } from 'react';
import {
  ArrowRight,
  Cpu,
  ShieldCheck,
  Zap,
  Globe2,
  CheckCircle2,
} from 'lucide-react';

interface AboutPageProps {
  onOpenQuoteModal: (productName?: string) => void;
}

const timelineMilestones = [
  {
    year: '1989',
    title: 'Foundation & Regional Foundry Hub',
    desc: 'Established as a specialized regional foundry in India providing precision stainless steel castings to domestic oil refineries and chemical plants with 100% heat-lot chemistry tracking.',
    image: '/images/heavy_rolling_mill.jpg',
  },
  {
    year: '2004',
    title: 'ISO 9001:2015 Quality Accreditation',
    desc: 'Achieved full ISO accreditation and introduced computer-guided ultrasonic non-destructive testing vaults across all continuous casting production lines.',
    image: '/images/quality_lab.jpg',
  },
  {
    year: '2012',
    title: 'Aerospace & Defense Titanium Expansion',
    desc: 'Commissioned titanium and nickel superalloy vacuum arc remelting (VAR) furnaces, securing AS9100D aerospace certification for Tier-1 defense turbine contractors.',
    image: '/images/titanium_plates.png',
  },
  {
    year: '2020',
    title: '98% Circular Electric Arc Recycling',
    desc: 'Transitioned melt shop operations to 98% circular scrap recycling and zero-discharge closed-loop water treatment systems with official EPD Environmental Declarations.',
    image: '/images/round_bars.png',
  },
  {
    year: '2024',
    title: 'Multi-Axis CNC Laser Cell Integration',
    desc: 'Expanded fabrication floor area to 120,000 m² with 6kW & 12kW fiber optic CNC laser cutting lines for sub-micron kerf edge tolerance component manufacturing.',
    image: '/images/cnc_laser_blue.jpg',
  },
  {
    year: '2026',
    title: 'Global Aerospace Stock Warehouse Expansion',
    desc: 'Established strategic stock holding hubs across Europe and North America guaranteeing 48-hour container dispatch on EN 10204 3.2 certified stock.',
    image: '/images/structural_beams.png',
  },
];

const TIMELINE_STEPS = timelineMilestones.length;

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenQuoteModal }) => {
  const [activeMilestone, setActiveMilestone] = useState<number>(0);

  /*
   * The year rail is a plain tab strip: clicking a year swaps the detail panel
   * in place. The section stays one screen tall so the rest of the About page
   * is reachable without scrolling through a milestone-per-viewport.
   */

  const executivePillars = [
    {
      num: 'I',
      title: 'PRIMARY MELT & SPECTROGRAPHIC CONTROL',
      desc: 'Dual-shell Electric Arc Furnaces (EAF) paired with AOD secondary decarburization vessels to achieve sub-ppm gas purity and 100% spectral chemistry verification.',
      image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
      icon: Cpu,
      tag: 'EAF & AOD REFINING',
    },
    {
      num: 'II',
      title: 'SUB-MICRON CNC LASER FABRICATION',
      desc: 'High-power fiber optic CNC laser cutting lines and automated cold rolling mills guaranteeing sub-micron kerf edge tolerances for defense assemblies.',
      image: '/images/pexels-bence-szemerey-337043-6804265.jpg',
      icon: Zap,
      tag: 'CNC LASER CELL',
    },
    {
      num: 'III',
      title: 'AS9100D AEROSPACE & DEFENSE QA',
      desc: 'Phased-array ultrasonic volumetric scanning, high-energy X-ray radiography, and EN 10204 3.2 third-party witnessed mill test certificates.',
      image: '/images/pexels-willians-huerta-2157111846-36397988.jpg',
      icon: ShieldCheck,
      tag: 'AS9100D ACCREDITED',
    },
    {
      num: 'IV',
      title: '48H GLOBAL LOGISTICS & TRACEABILITY',
      desc: 'Strategic port stock hubs in Asia, Europe, and North America guaranteeing 48-hour container dispatch with QR-etched heat-lot tracking.',
      image: '/images/pexels-jakubzerdzicki-33813584.jpg',
      icon: Globe2,
      tag: '48H DISPATCH SLA',
    },
  ];

  const certifications = [
    {
      code: 'ISO 9001:2015',
      title: 'Quality Management Systems',
      desc: 'Complete process control across raw melt, rolling, machining, and dispatch.',
      image: '/images/precision_parts.png',
    },
    {
      code: 'AS9100D / EN 9100',
      title: 'Aerospace & Defense Quality',
      desc: 'Sub-micron tolerance airframe and turbine components for defense contractors.',
      image: '/images/industrial_facility.png',
    },
    {
      code: 'PED 2014/68/EU',
      title: 'Pressure Equipment Directive',
      desc: 'Certified manufacturing for high-pressure oil, gas, and nuclear pipelines.',
      image: '/images/flanges_industrial.png',
    },
    {
      code: 'ISO 14001:2015',
      title: 'Environmental Management',
      desc: 'Zero-discharge melt shop operations and circular alloy scrap recycling.',
      image: '/images/stainless_pipes.png',
    },
  ];

  const legacyPillars = [
    {
      title: 'Our Mission',
      desc: 'To deliver certified zero-defect metallurgical products with complete chemical traceability, competitive lead times, and uncompromised technical integrity across global markets.',
    },
    {
      title: 'Our Vision',
      desc: "To be the world's most trusted partner for high-performance alloy stockholding, advanced structural steel supply, and custom engineering fabrication.",
    },
    {
      title: 'Core Values',
      desc: 'Absolute Spectral Purity, EN 10204 3.1/3.2 Certification, Customer-Centric SLA Execution, and Sustainable Electric Arc Furnace Melting.',
    },
  ];

  return (
    <div className="about-page-root" style={{ background: '#F8F8F8', minHeight: '100vh', color: '#304050' }}>
      <style>{`
        .about-page-root {
          font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .feature-split-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 40px;
          align-items: center;
        }

        @media (max-width: 1024px) {
          .feature-split-grid { grid-template-columns: 1fr; gap: 32px; }
        }

        /* Timeline section — ordinary flow height; the year rail switches the
           detail panel in place rather than consuming page scroll. */
        .timeline-pin-section {
          padding: 52px 0;
          background: #FFFFFF;
          border-bottom: 1px solid #E0E8E8;
        }

        /* The column stretches to the pillars grid beside it, and the chain
           below passes that height down to the detail card so both columns
           finish on the same line. */
        .timeline-col {
          display: flex;
          flex-direction: column;
        }

        /* Timeline: year rail on the left, one milestone detail on the right */
        .timeline-split {
          flex: 1;
          display: grid;
          grid-template-columns: 92px 1fr;
          gap: 24px;
          align-items: stretch;
        }

        .timeline-rail {
          position: relative;
          display: flex;
          flex-direction: column;
          border-left: 2px solid #E0E8E8;
          /* Kept at natural height so the progress fill stays aligned with
             the year buttons rather than the stretched column. */
          align-self: start;
        }
        .timeline-rail-progress {
          position: absolute;
          left: -2px;
          top: 0;
          width: 2px;
          background: #588078;
          transition: height 350ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .timeline-year-btn {
          position: relative;
          z-index: 1;
          appearance: none;
          background: none;
          border: 0;
          padding: 12px 0 12px 16px;
          font-family: inherit;
          font-size: 1.05rem;
          font-weight: 800;
          color: #A3AEB8;
          text-align: left;
          cursor: pointer;
          transition: color 200ms ease;
        }
        .timeline-year-btn:hover {
          color: #588078;
        }
        .timeline-year-btn.is-active {
          color: #304050;
        }
        .timeline-year-btn:focus-visible {
          outline: 2px solid #588078;
          outline-offset: 2px;
        }

        .timeline-detail {
          display: flex;
          flex-direction: column;
          background: #FFFFFF;
          border: 1px solid #E0E8E8;
          border-top: 4px solid #588078;
          overflow: hidden;
          animation: timelineFade 320ms ease;
          box-shadow: 0 4px 16px rgba(48, 64, 80, 0.06);
          /* Shadow only — the card runs timelineFade on mount, so a hover
             transform here would fight the keyframe mid-animation. */
          transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .timeline-detail:hover {
          box-shadow: 0 14px 32px rgba(48, 64, 80, 0.15);
        }
        @keyframes timelineFade {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        /* Absorbs the spare height, so a taller column grows the photo
           instead of leaving dead space under the description. */
        .timeline-detail-img {
          position: relative;
          flex: 1;
          min-height: 190px;
          overflow: hidden;
          border-bottom: 1px solid #E0E8E8;
        }
        /* Absolute so the photo contributes no intrinsic height: in a flex
           column a percentage height resolves against an indefinite parent and
           the browser falls back to the file's natural size, which would let
           the image drive the column height instead of filling what is left. */
        .timeline-detail-img img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .timeline-detail:hover .timeline-detail-img img {
          transform: scale(1.06);
        }
        /* Fixed floor so the card does not resize as descriptions change
           length as the reader tabs between years. */
        .timeline-detail-body {
          flex: none;
          padding: 22px 24px 26px;
          min-height: 172px;
        }
        .timeline-detail-year {
          display: block;
          font-size: 0.75rem;
          font-weight: 800;
          color: #588078;
          letter-spacing: 0.8px;
          margin-bottom: 8px;
        }
        .timeline-detail-title {
          font-size: 1.12rem;
          font-weight: 800;
          color: #304050;
          line-height: 1.3;
          text-transform: uppercase;
          letter-spacing: 0.2px;
          margin: 0 0 10px 0;
        }
        .timeline-detail-desc {
          font-size: 0.88rem;
          color: #64748B;
          line-height: 1.6;
          margin: 0;
        }

        /* Certification deck: card lifts, photo pushes in behind it. */
        .cert-card {
          position: relative;
          height: 420px;
          overflow: hidden;
          border: 1px solid #E0E8E8;
          box-shadow: 0 8px 24px rgba(48, 64, 80, 0.07);
          cursor: pointer;
          transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1),
                      box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .cert-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 40px rgba(48, 64, 80, 0.18);
        }
        .cert-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          /* Slower than the card lift so the photo reads as depth behind the
             frame rather than moving with it. */
          transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .cert-card:hover img {
          transform: scale(1.08);
        }

        @media (prefers-reduced-motion: reduce) {
          .timeline-detail { animation: none; }
          .timeline-detail-img img,
          .cert-card,
          .cert-card img {
            transition: none;
          }
          .timeline-detail:hover .timeline-detail-img img,
          .cert-card:hover,
          .cert-card:hover img {
            transform: none;
          }
        }

        /* Mobile: rail turns into a horizontal scrollable year strip */
        @media (max-width: 768px) {
          .timeline-split {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .timeline-rail {
            flex-direction: row;
            border-left: 0;
            border-bottom: 2px solid #E0E8E8;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }
          /* Vertical fill makes no sense on a horizontal strip; the active
             button underline carries the state instead. */
          .timeline-rail-progress {
            display: none;
          }
          .timeline-year-btn {
            padding: 10px 16px;
            flex-shrink: 0;
          }
          .timeline-year-btn.is-active {
            box-shadow: inset 0 -2px 0 #588078;
          }
          /* Single column on mobile, so there is no neighbour to match
             heights with — the photo goes back to a fixed band. */
          .timeline-detail-img {
            flex: none;
            height: 160px;
            min-height: 0;
          }
          .timeline-detail-body {
            min-height: 0;
          }
        }

        .btn {
          border-radius: 0 !important;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
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

      {/* 1. Hero with Rich Background Photography */}
      <section
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(0, 0, 0, 0.72) 0%, rgba(0, 0, 0, 0.82) 100%), url("/images/furnace_melt.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF',
          padding: '50px 0 36px',

        }}
      >
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ maxWidth: '850px' }}>
            <h1
              style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
                fontWeight: 700,
                color: '#FFFFFF',
                lineHeight: 1.15,
                marginBottom: '16px',
                letterSpacing: '0.6px',
              }}
            >
              About Jyoti Metal India
            </h1>

            <p style={{ fontSize: '1.08rem', color: '#CBD5E1', lineHeight: 1.65, marginBottom: '28px', letterSpacing: '0.3px' }}>
              Over three decades of metallurgical innovation, certified zero-defect alloy manufacturing, and high-yield continuous casting for global aerospace, defense, and nuclear contracts.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => onOpenQuoteModal()}
                className="btn btn-primary"
                style={{ padding: '14px 30px', fontSize: '0.92rem' }}
              >
                Request a Quote <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 1.5. About Us Overview Paragraphs & Mission / Vision Section */}
      <section style={{ padding: '50px 0', background: '#FFFFFF', borderBottom: '1px solid #E0E8E8' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div className="feature-split-grid">
            <div>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#588078', letterSpacing: '0.8px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                OUR METALLURGICAL LEGACY
              </span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 2.8vw, 2.4rem)', fontWeight: 700, color: '#0F172A', marginBottom: '24px', lineHeight: 1.2 }}>
                Engineering Trust &amp; Metallurgical Excellence Since 1989
              </h2>

              <p style={{ fontSize: '1.02rem', color: '#475569', lineHeight: 1.7, margin: '0 0 20px 0' }}>
                Founded in 1989, Jyoti Metal India has evolved into one of the country&rsquo;s most reliable manufacturers, stockists, and global exporters of high-grade Stainless Steel, Nickel Alloys, Titanium, Duplex, Carbon Steel, Gasketing Solutions, and Structural Steel products.
              </p>

              <p style={{ fontSize: '1.02rem', color: '#475569', lineHeight: 1.7, margin: 0 }}>
                Operating advanced continuous casting foundries and CNC laser fabrication units certified under ISO 9001:2015, we maintain 100% heat-lot chemistry traceability to serve critical defense, aerospace, nuclear power, oil &amp; gas, and heavy infrastructure sectors worldwide.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {legacyPillars.map((pillar) => (
                <div
                  key={pillar.title}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    padding: '24px 28px',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.03)',
                    transition: 'border-color 200ms ease, transform 200ms ease, box-shadow 200ms ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#588078';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(88, 128, 120, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.03)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                    <CheckCircle2 size={20} color="#588078" /> {pillar.title}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.6, paddingLeft: '32px' }}>
                    {pillar.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Timeline (Left, year tabs) & 4-Pillars 2x2 Grid (Right, static) */}
      <section className="timeline-pin-section">
        <div className="container" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 20px', width: '100%' }}>
          <div className="grid-responsive-about" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '36px', alignItems: 'stretch' }}>

            {/* LEFT COLUMN: Timeline (year rail + detail panel), stretched to match the pillars grid */}
            <div className="timeline-col">
              <div style={{ marginBottom: '24px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#588078', letterSpacing: '0.8px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  HERITAGE &amp; EVOLUTION
                </span>
                <h2 style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2.1rem)', fontWeight: 800, color: '#304050', marginBottom: '8px', lineHeight: 1.25 }}>
                  Our Growth &amp; Engineering Timeline
                </h2>
                <p style={{ color: '#7C8894', fontSize: '0.92rem', margin: 0 }}>
                  Select a year to explore our 37-year metallurgical journey (1989 – 2026).
                </p>
              </div>

              {/* Year rail + single milestone detail panel */}
              <div className="timeline-split">
                {/* Year rail */}
                <div className="timeline-rail">
                  <span
                    className="timeline-rail-progress"
                    style={{ height: `${(activeMilestone / (TIMELINE_STEPS - 1)) * 100}%` }}
                  />
                  {timelineMilestones.map((item, idx) => (
                    <button
                      key={item.year}
                      type="button"
                      className={`timeline-year-btn${idx === activeMilestone ? ' is-active' : ''}`}
                      onClick={() => setActiveMilestone(idx)}
                      aria-pressed={idx === activeMilestone}
                    >
                      {item.year}
                    </button>
                  ))}
                </div>

                {/* Detail panel for the selected year */}
                <div className="timeline-detail" key={timelineMilestones[activeMilestone].year}>
                  <div className="timeline-detail-img">
                    <img
                      src={timelineMilestones[activeMilestone].image}
                      alt={timelineMilestones[activeMilestone].title}
                    />
                  </div>
                  <div className="timeline-detail-body">
                    <span className="timeline-detail-year">
                      {timelineMilestones[activeMilestone].year}
                    </span>
                    <h3 className="timeline-detail-title">
                      {timelineMilestones[activeMilestone].title}
                    </h3>
                    <p className="timeline-detail-desc">
                      {timelineMilestones[activeMilestone].desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Four Pillars of Metallurgical Excellence (2x2 Grid, Title beside Number, No Images) */}
            <div>
              <div style={{ marginBottom: '24px' }}>
                <span style={{ color: '#588078', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.8px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  OPERATIONAL CORE
                </span>
                <h2 style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2.1rem)', fontWeight: 800, color: '#304050', marginBottom: '8px', lineHeight: 1.25 }}>
                  Four Pillars of Metallurgical Excellence
                </h2>
                <p style={{ fontSize: '0.92rem', color: '#7C8894', margin: 0 }}>
                  Vertically integrated foundry capabilities and certified quality systems.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', flex: 1 }}>
                {executivePillars.map((pillar) => (
                  <div
                    key={pillar.num}
                    style={{
                      position: 'relative',
                      background: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      borderTop: '5px solid #588078',
                      padding: '24px 20px',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                      transition: 'border-color 250ms ease, box-shadow 250ms ease, transform 250ms ease',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      overflow: 'hidden',
                      minHeight: '170px',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#588078';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 10px 24px rgba(88, 128, 120, 0.12)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#CBD5E1';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.04)';
                    }}
                  >
                    {/* Low Opacity Background Watermark Roman Numeral Behind Title */}
                    <span
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '12px',
                        fontSize: '4.8rem',
                        fontWeight: 900,
                        color: '#588078',
                        opacity: 0.12,
                        lineHeight: 0.9,
                        fontFamily: "'Inter', sans-serif",
                        letterSpacing: '-0.04em',
                        userSelect: 'none',
                        pointerEvents: 'none',
                        zIndex: 0,
                        transition: 'opacity 250ms ease, transform 250ms ease',
                      }}
                    >
                      {pillar.num}
                    </span>

                    {/* Card Content sitting cleanly in front */}
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#304050', marginTop: 0, marginBottom: '10px', lineHeight: 1.3, letterSpacing: '0.2px', textTransform: 'uppercase' }}>
                        {pillar.title}
                      </h3>
                      <p style={{ fontSize: '0.86rem', color: '#64748B', lineHeight: 1.58, margin: 0 }}>
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Certifications Grid */}
      <section style={{ padding: '48px 0', background: '#FFFFFF', borderTop: '1px solid #E0E8E8' }}>
        <div className="container" style={{ maxWidth: '1350px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 56px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#588078', letterSpacing: '0.8px', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
              GLOBAL ACCREDITATION
            </span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.4vw, 2.5rem)', fontWeight: 800, color: '#304050', marginBottom: '14px', letterSpacing: '0.6px' }}>
              International Metallurgical Certifications
            </h2>
            <p style={{ color: '#7C8894', fontSize: '1.02rem', lineHeight: 1.65, margin: 0 }}>
              Every alloy consignment carries official Mill Test Certificates (MTC) compliant with EN 10204 3.1 &amp; 3.2 standards.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '28px',
            }}
          >
            {certifications.map((cert) => (
              <div key={cert.code} className="cert-card">
                {/* Background Image */}
                <img src={cert.image} alt={cert.title} />

                {/* Dark Gradient Overlay for Readability */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0) 25%, rgba(15, 23, 42, 0.88) 100%)',
                    zIndex: 1,
                  }}
                />

                {/* Bottom Content Panel (Heading & Subheading Only) */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '32px 28px',
                    zIndex: 2,
                    color: '#FFFFFF',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '1.45rem',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      lineHeight: 1.25,
                      marginBottom: '8px',
                      letterSpacing: '0.4px',
                    }}
                  >
                    {cert.code}
                  </h3>

                  <div
                    style={{
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      color: '#CBD5E1',
                      textTransform: 'uppercase',
                      letterSpacing: '0.6px',
                    }}
                  >
                    {cert.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Executive Leadership & Direction */}
      <section style={{ padding: '48px 0', background: '#ffffff', borderTop: '1px solid #E0E8E8' }}>
        <div className="container" style={{ maxWidth: '1050px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#588078', letterSpacing: '0.8px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              EXECUTIVE LEADERSHIP
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.3rem)', fontWeight: 800, color: '#304050', marginBottom: '12px' }}>
              Guided by Decades of Metallurgical Vision
            </h2>
            <p style={{ color: '#7C8894', fontSize: '1rem', lineHeight: 1.6 }}>
              Under the strategic leadership of Dhawal Choudhary &amp; Dinesh Choudhary, Jyoti Metal (India) has expanded from a regional foundry to a premier global supplier of high-precision stainless steel and specialty alloys.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div style={{ background: '#FFFFFF', padding: '32px', border: '1px solid #CBD5E1', borderTop: '4px solid #588078', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#304050', marginBottom: '4px' }}>
                Dhawal Choudhary
              </h3>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#588078', letterSpacing: '0.06em', marginBottom: '10px', textTransform: 'uppercase' }}>
                Director &amp; Operations Head
              </div>
              <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#304050', marginBottom: '12px' }}>
                Mob: <a href="tel:+919322281549" style={{ color: '#588078', textDecoration: 'none' }}>+91 9322281549</a> / <a href="tel:+919137880994" style={{ color: '#588078', textDecoration: 'none' }}>+91 9137880994</a>
              </div>
              <p style={{ fontSize: '0.92rem', color: '#64748B', lineHeight: 1.65, margin: 0 }}>
                Spearheading enterprise supply logistics, international client relations, and quality management systems across aerospace and energy sectors.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', padding: '32px', border: '1px solid #CBD5E1', borderTop: '4px solid #588078', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#304050', marginBottom: '4px' }}>
                Dinesh Choudhary
              </h3>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#588078', letterSpacing: '0.06em', marginBottom: '10px', textTransform: 'uppercase' }}>
                Executive Director
              </div>
              <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#304050', marginBottom: '12px' }}>
                Mob: <a href="tel:+919769388813" style={{ color: '#588078', textDecoration: 'none' }}>+91 9769388813</a> / <a href="tel:+919082886991" style={{ color: '#588078', textDecoration: 'none' }}>+91 9082886991</a>
              </div>
              <p style={{ fontSize: '0.92rem', color: '#64748B', lineHeight: 1.65, margin: 0 }}>
                Directing metallurgical R&amp;D, continuous arc furnace infrastructure, and strategic manufacturing expansion (including our Alwar Rajasthan plant facility).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Light Theme Closing CTA */}
      <section
        style={{
          background: '#FFFFFF',
          color: '#304050',
          padding: '20px  0 30px',
          textAlign: 'center',
        }}
      >
        <div className="container" style={{ maxWidth: '760px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.4vw, 2.3rem)', fontWeight: 700, color: '#304050', marginBottom: '14px', lineHeight: 1.25, letterSpacing: '0.6px' }}>
            Partner with Jyoti Metal India
          </h2>
          <p style={{ color: '#7C8894', fontSize: '1.02rem', lineHeight: 1.65, marginBottom: '32px' }}>
            Discuss your material requirements, custom extrusion profiles, or third-party witnessed testing with our QA engineers.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => onOpenQuoteModal()}
              className="btn btn-primary"
              style={{ padding: '15px 32px', fontSize: '0.92rem', letterSpacing: '0.6px' }}
            >
              Request a Quote <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
