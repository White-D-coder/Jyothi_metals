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

/*
 * Milestones are kept to what the company can actually show on paper:
 *   - the Khushkhera (Alwar) tube mill and its 5,000 TPA capacity — cert1.pdf
 *   - the three ISO certificates, their scope, numbers and dates — the QCC
 *     certificates in the repo root (ISO - JYOTI METAL INDIA *.jpeg)
 * Do not add years for plant, capacity or approvals that have no certificate
 * or brochure behind them.
 */
const timelineMilestones = [
  {
    year: '1989',
    title: 'Business Started',
    desc: 'Jyoti Metal (India) started work from Mumbai as a supplier and stockist of stainless steel and other metals. From the first year itself, the aim was simple. Give the customer correct material, at the correct time, with proper papers.',
    image: '/images/plant/size-range-stock.jpg',
  },
  {
    year: '2009',
    title: 'Own Tube Mill at Alwar, Rajasthan',
    desc: 'Our own stainless steel pipe and tube plant started at Plot E-41 (G-1), RIICO Industrial Area, Khushkhera, Distt. Alwar, Rajasthan. Installed capacity is 5,000 tonnes per year. The line is fully automatic and runs to ASTM standards.',
    image: '/images/plant/plant-overview.jpg',
  },
  {
    year: '2019',
    title: 'Three ISO Certificates Received',
    desc: 'On 18 June 2019 we received ISO 9001:2015 for quality, ISO 14001:2015 for environment and ISO 45001:2018 for health and safety. All three cover both our Mumbai office and our Alwar plant.',
    image: '/images/plant/inspection-packaging.jpg',
  },
  {
    year: '2025',
    title: 'All Certificates Renewed up to 2028',
    desc: 'All three ISO certificates were re-issued on 10 June 2025 and are valid up to 9 June 2028. Certificate status can be checked online with the certifying body.',
    image: '/images/plant/annealing-line.jpg',
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

  /* The four pillars follow the certified scope word for word: manufacturer of
     S.S. pipes & tubes; supplier, stockist, importer & exporter of all kinds of
     ferrous & non-ferrous metals. */
  const executivePillars = [
    {
      num: 'I',
      title: 'OUR OWN PIPE & TUBE PLANT',
      desc: 'We make stainless steel pipes and tubes at our own plant in Alwar, Rajasthan. Capacity is 5,000 tonnes per year.',
      image: '/images/plant/plant-overview.jpg',
      icon: Cpu,
      tag: 'MANUFACTURING',
    },
    {
      num: 'II',
      title: 'READY STOCK IN MUMBAI',
      desc: 'We keep ready stock of ferrous and non-ferrous metal. Small quantity or full lot, material can be given quickly.',
      image: '/images/plant/size-range-stock.jpg',
      icon: Zap,
      tag: 'STOCKIST & SUPPLY',
    },
    {
      num: 'III',
      title: 'TESTING BEFORE DISPATCH',
      desc: 'Every piece is checked before packing. Test certificate and other papers go along with the material.',
      image: '/images/plant/inspection-packaging.jpg',
      icon: ShieldCheck,
      tag: 'QUALITY CHECK',
    },
    {
      num: 'IV',
      title: 'IMPORT & EXPORT',
      desc: 'We import and export all kinds of ferrous and non-ferrous metal, and supply to customers in India and outside.',
      image: '/images/plant/decoiler-coil-line.jpg',
      icon: Globe2,
      tag: 'INDIA & ABROAD',
    },
  ];

  /* These three are the only certificates the company holds. Scans are in
     public/images/certificates/ and the originals in the repo root. Numbers and
     dates are copied from the certificates — do not edit without a new scan. */
  const certifications = [
    {
      code: 'ISO 9001:2015',
      title: 'Quality Management System',
      desc: 'Cert. No. QMS/010898/0619, valid up to 9 June 2028',
      image: '/images/certificates/iso-9001-2015-thumb.jpg',
      full: '/images/certificates/iso-9001-2015.jpg',
    },
    {
      code: 'ISO 14001:2015',
      title: 'Environmental Management System',
      desc: 'Cert. No. EMS/010896/0619, valid up to 9 June 2028',
      image: '/images/certificates/iso-14001-2015-thumb.jpg',
      full: '/images/certificates/iso-14001-2015.jpg',
    },
    {
      code: 'ISO 45001:2018',
      title: 'Occupational Health and Safety',
      desc: 'Cert. No. OHS/010897/0619, valid up to 9 June 2028',
      image: '/images/certificates/iso-45001-2018-thumb.jpg',
      full: '/images/certificates/iso-45001-2018.jpg',
    },
  ];

  const legacyPillars = [
    {
      title: 'Our Mission',
      desc: 'Our mission is to provide customers with the correct material at the right time, backed by complete test certificates and documentation, at a fair and honest rate.',
    },
    {
      title: 'Our Vision',
      desc: 'Our vision is to become the first name customers think of for stainless steel pipes, tubes, and other metals both in India and internationally.',
    },
    {
      title: 'How We Work',
      desc: 'We work by supplying the right grade and size, ensuring proper testing, delivering on the promised date, and maintaining clear pricing with no hidden charges.',
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

        /* Certification deck. These are the client's own certificate scans, so
           the card is a document frame, not a photo tile: the previous version
           cropped a plant photograph to fill and laid a dark gradient over the
           lower half, which would render a certificate unreadable. */
        .cert-card {
          display: flex;
          flex-direction: column;
          background: #FFFFFF;
          border: 1px solid #E0E8E8;
          border-top: 4px solid #588078;
          box-shadow: 0 8px 24px rgba(48, 64, 80, 0.07);
          text-decoration: none;
          transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1),
                      box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .cert-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 40px rgba(48, 64, 80, 0.18);
        }
        .cert-card-scan {
          background: #F4F6F8;
          border-bottom: 1px solid #E0E8E8;
          padding: 18px;
        }
        /* Portrait A4 scans: contain, never cover — cropping a certificate cuts
           off the registrar's marks and the certificate number. */
        .cert-card-scan img {
          display: block;
          width: 100%;
          /* Tall enough that the scope wording and certificate number are
             legible in the card itself, not just in the full-size scan. */
          height: 380px;
          object-fit: contain;
          /* index.css applies a brightness/contrast lift to every img to make
             the plant photography pop. A certificate is a document of record,
             so it is reproduced as scanned. */
          filter: none;
        }
        .cert-card-body {
          padding: 22px 24px 24px;
        }

        @media (prefers-reduced-motion: reduce) {
          .timeline-detail { animation: none; }
          .timeline-detail-img img,
          .cert-card {
            transition: none;
          }
          .timeline-detail:hover .timeline-detail-img img,
          .cert-card:hover {
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
              About Jyoti Metal (India)
            </h1>

            <p style={{ fontSize: '1.08rem', color: '#CBD5E1', lineHeight: 1.65, marginBottom: '28px', letterSpacing: '0.3px' }}>
              We make stainless steel pipes and tubes at our own plant. We also supply, stock, import
              and export all kinds of ferrous and non-ferrous metal. Working in this line since 1989.
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
                WHO WE ARE
              </span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 2.8vw, 2.4rem)', fontWeight: 700, color: '#0F172A', marginBottom: '24px', lineHeight: 1.2 }}>
                In the Steel Line Since 1989
              </h2>

              <p style={{ fontSize: '1.02rem', color: '#475569', lineHeight: 1.7, margin: '0 0 20px 0' }}>
                Jyoti Metal (India) is a manufacturer of stainless steel pipes and tubes. We are also
                a supplier, stockist, importer and exporter of all kinds of ferrous and non-ferrous
                metal. Our office is in Mumbai and our plant is at Khushkhera, Distt. Alwar, Rajasthan.
              </p>

              <p style={{ fontSize: '1.02rem', color: '#475569', lineHeight: 1.7, margin: 0 }}>
                We supply stainless steel, nickel alloy, titanium, duplex, carbon steel, structural
                steel, flanges, fittings, fasteners and gasketing items. Material is used in chemical
                plants, refineries, pharma, dairy and food plants, water and power projects, railways,
                automobile work, and building and architectural work. Every lot is checked before
                dispatch and sent with proper test certificate.
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
                OUR JOURNEY
                </span>
                <h2 style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2.1rem)', fontWeight: 800, color: '#304050', marginBottom: '8px', lineHeight: 1.25 }}>
                  How the Company Has Grown
                </h2>
                <p style={{ color: '#7C8894', fontSize: '0.92rem', margin: 0 }}>
                  Click on any year to see what happened (1989 to 2025).
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

            {/* RIGHT COLUMN: Four main strengths (2x2 Grid, Title beside Number, No Images) */}
            <div>
              <div style={{ marginBottom: '24px' }}>
                <span style={{ color: '#588078', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.8px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  WHAT WE DO
                </span>
                <h2 style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2.1rem)', fontWeight: 800, color: '#304050', marginBottom: '8px', lineHeight: 1.25 }}>
                  Our Four Main Strengths
                </h2>
                <p style={{ fontSize: '0.92rem', color: '#7C8894', margin: 0 }}>
                  Making, stocking, checking and supplying. All four are handled by us.
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
              OUR CERTIFICATES
            </span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.4vw, 2.5rem)', fontWeight: 800, color: '#304050', marginBottom: '14px', letterSpacing: '0.6px' }}>
              We Are an ISO Certified Company
            </h2>
            <p style={{ color: '#7C8894', fontSize: '1.02rem', lineHeight: 1.65, margin: 0 }}>
              Certified scope: manufacturer of S.S. pipes &amp; tubes; supplier, stockist, importer
              and exporter of all kinds of ferrous and non-ferrous metals. Mill Test Certificate is
              given with every consignment.
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
              /* Opens the full-resolution scan. The card already carried a
                 pointer cursor but no handler; now the affordance is real. */
              <a
                key={cert.code}
                className="cert-card"
                href={cert.full}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View the full ${cert.code} certificate`}
              >
                <div className="cert-card-scan">
                  <img
                    src={cert.image}
                    alt={`${cert.code} ${cert.title} certificate issued to Jyoti Metal (India)`}
                    loading="lazy"
                  />
                </div>

                <div className="cert-card-body">
                  <h3
                    style={{
                      fontSize: '1.45rem',
                      fontWeight: 800,
                      color: '#304050',
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
                      color: '#588078',
                      textTransform: 'uppercase',
                      letterSpacing: '0.6px',
                    }}
                  >
                    {cert.title}
                  </div>

                  {/* Certificate number and validity — the detail a buyer checks. */}
                  <div
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: '#7C8894',
                      marginTop: '8px',
                      letterSpacing: '0.2px',
                    }}
                  >
                    {cert.desc}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Executive Leadership & Direction */}
      <section style={{ padding: '48px 0', background: '#ffffff', borderTop: '1px solid #E0E8E8' }}>
        <div className="container" style={{ maxWidth: '1050px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#588078', letterSpacing: '0.8px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              OUR TEAM
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.3rem)', fontWeight: 800, color: '#304050', marginBottom: '12px' }}>
              Who You Will Deal With
            </h2>
            <p style={{ color: '#7C8894', fontSize: '1rem', lineHeight: 1.6 }}>
              The company is run by Dhawal Choudhary and Dinesh Choudhary. For any enquiry, rate or
              delivery matter, you can call them directly on the numbers given below.
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
                Looks after supply and dispatch, customer dealing in India and abroad, and the
                quality system.
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
                Looks after the Alwar plant, production planning and purchase of raw material.
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
            Send Us Your Requirement
          </h2>
          <p style={{ color: '#7C8894', fontSize: '1.02rem', lineHeight: 1.65, marginBottom: '32px' }}>
            Tell us the grade, size and quantity you need. We will check the stock and send you the
            rate and delivery time.
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
