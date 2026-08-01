import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Download,
} from 'lucide-react';
import { CapabilityNav } from '../components/CapabilityNav';

interface CertificationsPageProps {
  onOpenQuoteModal: (productName?: string) => void;
  onNavigate?: (tab: string) => void;
}

const COLORS = {
  bg: '#F8F8F8',
  panel: '#FFFFFF',
  divider: '#E0E8E8',
  text: '#304050',
  textMuted: '#7C8894',
  accent: '#588078',
  accentHover: '#4D716A',
};

const heroStats = [
  { label: 'Standard Certificate', value: 'EN 10204 3.1', sub: 'In-House Certified Reports' },
  { label: 'Witnessed Certificate', value: 'EN 10204 3.2', sub: 'Third-Party Agency Witness' },
  { label: 'Sour Gas Compliance', value: 'NACE MR0175', sub: 'H2S Oilfield Corrosion Spec' },
  { label: 'ASTM / ASME Specs', value: 'Guaranteed', sub: 'Full Material Compliance' },
];

const certificates = [
  {
    code: 'EN 10204 3.1',
    title: 'MILL TEST CERTIFICATE',
    issuer: 'In-House Accredited Laboratory',
    scope: 'Issued directly by our QA department with full chemical heat analysis and mechanical test data.',
    image: '/images/pexels-bence-szemerey-337043-6804265.jpg',
    verticalTag: 'EN 10204 3.1',
  },
  {
    code: 'EN 10204 3.2',
    title: 'THIRD-PARTY WITNESSED MTC',
    issuer: 'Lloyd’s, DNV, TÜV, Bureau Veritas',
    scope: 'Independently witnessed chemical testing, tensile pulling, and non-destructive examination.',
    image: '/images/pexels-pppsdavid-5851494.jpg',
    verticalTag: 'EN 10204 3.2',
  },
  {
    code: 'NACE MR0175',
    title: 'SOUR SERVICE CORROSION',
    issuer: 'Corrosion Testing International',
    scope: 'Sulfide stress cracking (SSC) and stress corrosion cracking (SCC) compliance for H2S oilfield service.',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    verticalTag: 'NACE MR0175',
  },
  {
    code: 'ASTM / ASME',
    title: 'MATERIAL SPECIFICATION',
    issuer: 'ASTM International / ASME BPVC',
    scope: 'Guaranteed compliance with ASTM A240, A312, B16.5, B16.9, B16.11, and SB-575 titanium & nickel specs.',
    image: '/images/pexels-alex-60339926-9878853.jpg',
    verticalTag: 'ASTM / ASME',
  },
];

const auditTimeline = [
  {
    step: '01',
    title: 'Melt Heat Sampling & Spectral Analysis',
    desc: 'Double-sample Optical Emission Spectrometry (OES) verifies exact elemental chemistry before ladle tapping, assigning 100% heat-lot numbers.',
  },
  {
    step: '02',
    title: 'Mechanical Testing & NDT Volumetric Audit',
    desc: 'Tensile, impact toughness, 25,000 PSI hydrostatic pressure, and ASME Sec V ultrasonic scanning executed on test coupons.',
  },
  {
    step: '03',
    title: 'Third-Party Independent Agency Witnessing',
    desc: 'Independent inspector (DNV/Lloyds/TUV) reviews test results, performs physical coupon stamping, and signs EN 10204 3.2 certificates.',
  },
  {
    step: '04',
    title: 'Sealed Dispatch & Digital Archiving',
    desc: 'Final material batch dispatched with QR-code laser-etched Mill Test Certificate archived in our secure database for 25 years.',
  },
];

export const CertificationsPage: React.FC<CertificationsPageProps> = ({ onOpenQuoteModal }) => {
  const navigate = useNavigate();

  return (
    <div className="cert-page-root" style={{ background: COLORS.bg, minHeight: '100vh', color: COLORS.text }}>
      <style>{`
        .cert-page-root {
          font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .hero-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          margin-top: 40px;
          padding: 24px 28px;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.25);
        }
        .hero-stat-item {
          padding: 0 20px;
        }
        .hero-stat-item:not(:first-child) {
          border-left: 1px solid rgba(255, 255, 255, 0.18);
        }

        .single-accordion-wrapper {
          position: relative;
          margin-top: 20px;
        }
        .single-accordion-layer-2 {
          position: absolute;
          bottom: -8px;
          left: 14px;
          right: 14px;
          height: 16px;
          background: #FFFFFF;
          border: 1px solid ${COLORS.divider};
          z-index: 1;
        }
        .single-accordion-layer-1 {
          position: absolute;
          bottom: -4px;
          left: 7px;
          right: 7px;
          height: 12px;
          background: #F4F6F8;
          border: 1px solid ${COLORS.divider};
          z-index: 2;
        }
        .single-accordion-main {
          position: relative;
          z-index: 3;
          background: #FFFFFF;
          border: 1px solid ${COLORS.divider};
          border-left: 5px solid ${COLORS.accent};
          border-radius: 0;
          overflow: hidden;
        }

        .audit-row-item {
          display: grid;
          grid-template-columns: 110px 1fr 220px;
          gap: 28px;
          align-items: center;
          padding: 24px 28px;
          transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
          background: #FFFFFF;
          border-left: 3px solid transparent;
          cursor: pointer;
        }
        .audit-row-item:hover {
          background: #F8FAF9;
          border-left-color: ${COLORS.accent};
        }
        .audit-row-item:hover .audit-img-frame img {
          transform: scale(1.06);
        }
        .audit-row-item:hover .audit-stage-text {
          color: ${COLORS.accent};
        }

        .audit-img-frame {
          height: 140px;
          overflow: hidden;
          border: 1px solid ${COLORS.divider};
          position: relative;
        }
        .audit-img-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 300ms ease;
        }

        @media (max-width: 1024px) {
          .hero-stats-grid { grid-template-columns: repeat(2, 1fr); row-gap: 20px; }
        }

        @media (max-width: 768px) {
          .hero-stats-grid { grid-template-columns: 1fr; row-gap: 20px; padding-top: 20px; }
          .hero-stat-item { padding: 0; }
          .hero-stat-item:not(:first-child) {
            border-left: none;
            border-top: 1px solid ${COLORS.divider};
            padding-top: 16px;
          }
          .audit-row-item { grid-template-columns: 1fr; gap: 16px; padding: 20px; }
          .audit-img-frame { height: 180px; }
          .mobile-full-btn { width: 100% !important; justify-content: center !important; }
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
          background: ${COLORS.accent};
          color: #FFFFFF;
          border: none;
        }
        .btn-primary:hover { background: ${COLORS.accentHover}; }
        .btn-secondary {
          background: #FFFFFF;
          color: ${COLORS.text};
          border: 1px solid ${COLORS.divider};
        }
        .btn-secondary:hover { background: #F4F6F8; border-color: ${COLORS.text}; }
      `}</style>

      {/* 1. Hero Section with Rich Photography */}
      <section
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.85) 100%), url("/images/pexels-willians-huerta-2157111846-36397988.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF',
          padding: '80px 0 60px',
          borderBottom: '3px solid #588078',
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
              Certifications &amp; Compliance
            </h1>

            <p style={{ fontSize: '1.08rem', color: '#CBD5E1', lineHeight: 1.65, marginBottom: '28px', letterSpacing: '0.3px' }}>
              EN 10204 3.1 &amp; 3.2 Mill Test Certificates, NACE MR0175 sour service compliance, and third-party witnessed material inspection reports.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => onOpenQuoteModal('EN 10204 3.2 Witnessed MTC')}
                className="btn btn-primary mobile-full-btn"
                style={{ padding: '14px 28px', fontSize: '0.9rem' }}
              >
                Request Witnessed MTC <ArrowRight size={18} />
              </button>
              <button
                type="button"
                onClick={() => navigate('/products')}
                className="btn btn-secondary mobile-full-btn"
                style={{ padding: '14px 28px', fontSize: '0.9rem' }}
              >
                Explore Product Catalog
              </button>
            </div>
          </div>

          {/* Hero Stat Row */}
          <div className="hero-stats-grid">
            {heroStats.map((stat) => (
              <div key={stat.label} className="hero-stat-item">
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.1, whiteSpace: 'nowrap' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#70C0B0', marginTop: '6px', whiteSpace: 'nowrap', letterSpacing: '0.3px' }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#F1F5F9', marginTop: '3px', whiteSpace: 'nowrap', fontWeight: 500 }}>
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Top Horizontal Sticky Sub-Navigation Bar */}
      <CapabilityNav currentPath="/certifications" />

      {/* 3. Section 1: Certifications Carousel Deck */}
      {/* 3. Section 1: Certifications Directory Deck (Centered) */}
      <section style={{ padding: '60px 0 70px', background: '#FFFFFF', borderBottom: `1px solid ${COLORS.divider}` }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 32px', textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: COLORS.accent, letterSpacing: '0.6px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
            DOCUMENTATION DIRECTORY
          </span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: COLORS.text, margin: 0, letterSpacing: '0.6px' }}>
            Product Certification Directory
          </h2>
        </div>

        {/* Centered Card Deck Grid */}
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '16px',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            {certificates.map((cert) => (
              <div
                key={cert.code}
                style={{
                  height: '460px',
                  position: 'relative',
                  overflow: 'hidden',
                  background: '#121a24',
                  cursor: 'pointer',
                  border: `1px solid ${COLORS.divider}`,
                }}
              >
                <img
                src={cert.image}
                alt={cert.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.55) contrast(1.1)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(12, 18, 26, 0.88) 0%, rgba(12, 18, 26, 0.25) 45%, rgba(12, 18, 26, 0.95) 100%)',
                }}
              />

              <div style={{ position: 'absolute', top: '28px', left: '24px', right: '24px', zIndex: 2 }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.25, margin: 0, textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                  {cert.title}
                </h3>
              </div>

              <div
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  right: '24px',
                  zIndex: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <button
                  type="button"
                  onClick={() => onOpenQuoteModal(`Sample Certificate Request (${cert.code})`)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.12)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    color: '#FFFFFF',
                    padding: '8px 14px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  PDF Sample <Download size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      </section>

      {/* 4. Section 2: Single Master Accordion for 4-Stage Audit Process (Crisp Light Theme Redesign) */}
      <section style={{ padding: '80px 0 40px', background: '#ffffffff'}}>
        <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 40px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: COLORS.accent, letterSpacing: '0.8px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              VERIFICATION LIFECYCLE
            </span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.4vw, 2.5rem)', fontWeight: 700, color: '#0F172A', marginBottom: '12px', letterSpacing: '0.6px' }}>
              4-Stage Certification &amp; Audit Process
            </h2>
            <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.65, margin: 0 }}>
              Inspect all 4 stages of our rigorous metallurgical verification workflow.
            </p>
          </div>

          {/* Horizontal Timeline — Spaced Grid Cards */}
          <div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '24px',
              }}
            >
              {auditTimeline.map((item) => (
                <div
                  key={item.step}
                  style={{
                    position: 'relative',
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderTop: '5px solid #588078',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                    padding: '28px 24px',
                    minHeight: '210px',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    transition: 'border-color 250ms ease, box-shadow 250ms ease, transform 250ms ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 10px 24px rgba(88, 128, 120, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.03)';
                  }}
                >
                  {/* Low opacity background watermark number at the right corner */}
                  <span
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '12px',
                      fontSize: '4.8rem',
                      fontWeight: 900,
                      color: '#588078',
                      opacity: 0.3,
                      lineHeight: 0.9,
                      fontFamily: "'Inter', sans-serif",
                      letterSpacing: '-0.04em',
                      userSelect: 'none',
                      pointerEvents: 'none',
                      zIndex: 0,
                    }}
                  >
                    {item.step}
                  </span>

                  {/* Card content sitting cleanly in front */}
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <p
                      style={{
                        fontSize: '0.88rem',
                        color: '#1e293b',
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      <strong style={{ display: 'block', marginBottom: '8px', fontSize: '0.95rem', color: '#0F172A' }}>{item.title}</strong>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* 5. Light Theme Closing CTA */}
      <section
        style={{
          background: '#FFFFFF',
          color: COLORS.text,
          padding: '30px 0 70px',
          textAlign: 'center',
        }}
      >
        <div className="container" style={{ maxWidth: '760px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.4vw, 2.3rem)', fontWeight: 700, color: COLORS.text, marginBottom: '14px', lineHeight: 1.25 }}>
            Need EN 10204 3.2 Witnessed Certification?
          </h2>
          <p style={{ color: COLORS.textMuted, fontSize: '1.02rem', lineHeight: 1.65, marginBottom: '32px' }}>
            Request sample Mill Test Certificates or coordinate independent agency inspection with our QA team.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => onOpenQuoteModal('EN 10204 3.2 Witnessed MTC')}
              className="btn btn-primary mobile-full-btn"
              style={{ padding: '15px 32px', fontSize: '0.92rem' }}
            >
              Request a Quote <ArrowRight size={18} />
            </button>
            <button
              type="button"
              onClick={() => navigate('/products')}
              className="btn btn-secondary mobile-full-btn"
              style={{ padding: '15px 32px', fontSize: '0.92rem' }}
            >
              Explore Catalog
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
