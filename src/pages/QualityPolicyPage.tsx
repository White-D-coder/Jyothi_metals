import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Download,
  CheckCircle2,
} from 'lucide-react';

interface QualityPolicyPageProps {
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
  { label: 'Management Standard', value: 'ISO 9001:2015', sub: 'Certified Process Control' },
  { label: 'Aerospace Standard', value: 'AS9100D', sub: 'Tier-1 Defense Accreditations' },
  { label: 'Pressure Equipment', value: 'PED 2014/68/EU', sub: 'European Pipeline Certificate' },
  { label: 'Traceability', value: '100% Heat Lot', sub: 'Full Melt Batch Verification' },
];

const isoStandards = [
  {
    code: 'ISO 9001:2015',
    title: 'QUALITY MANAGEMENT SYSTEMS',
    issuer: 'TÜV NORD Cert GmbH',
    validity: 'VALID THROUGH 2028',
    desc: 'Complete process control across raw melt, rolling, machining, and dispatch with 100% heat-lot traceability.',
    image: '/images/pexels-tokuo-nobuhiro-79378678-20472153.jpg',
    verticalTag: 'ISO 9001:2015',
  },
  {
    code: 'AS9100D / EN 9100',
    title: 'AEROSPACE & DEFENSE QUALITY',
    issuer: 'Bureau Veritas Certification',
    validity: 'VALID THROUGH 2027',
    desc: 'Sub-micron tolerance airframe, turbine, and missile alloy components certified for Tier-1 defense contractors.',
    image: '/images/pexels-willians-huerta-2157111846-36397988.jpg',
    verticalTag: 'AS9100D DEFENSE',
  },
  {
    code: 'PED 2014/68/EU',
    title: 'PRESSURE EQUIPMENT DIRECTIVE',
    issuer: 'Lloyd’s Register Quality Assurance',
    validity: 'VALID THROUGH 2028',
    desc: 'Certified manufacturing for high-pressure oil, gas, chemical, and nuclear pipeline installations across Europe.',
    image: '/images/pexels-eugeniofr-30005294.jpg',
    verticalTag: 'PED 2014/68/EU',
  },
  {
    code: 'ISO 14001:2015',
    title: 'ENVIRONMENTAL MANAGEMENT',
    issuer: 'DNV GL Business Assurance',
    validity: 'VALID THROUGH 2027',
    desc: 'Zero-discharge melt shop operations and circular alloy scrap recycling protocols.',
    image: '/images/pexels-jakubzerdzicki-33813584.jpg',
    verticalTag: 'ISO 14001:2015',
  },
];

const qualityPillars = [
  {
    title: '100% Chemical Heat Analysis',
    desc: 'Optical Emission Spectrometry (OES) confirms exact elemental composition on every heat lot prior to ladle tapping.',
  },
  {
    title: 'Full Material Traceability',
    desc: 'Unique heat numbers laser-etched onto every finished item link directly to certified mechanical & dimensional reports.',
  },
  {
    title: 'Independent 3rd Party Audits',
    desc: 'Witnessed chemical pulling, impact toughness, and NDT validation endorsed by Lloyds, DNV, and TUV.',
  },
];

export const QualityPolicyPage: React.FC<QualityPolicyPageProps> = ({ onOpenQuoteModal }) => {
  const navigate = useNavigate();

  return (
    <div className="qp-page-root" style={{ background: COLORS.bg, minHeight: '100vh', color: COLORS.text }}>
      <style>{`
        .qp-page-root {
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

        .feature-split-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 40px;
          align-items: center;
        }

        @media (max-width: 1024px) {
          .feature-split-grid { grid-template-columns: 1fr; gap: 32px; }
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
          backgroundImage: 'linear-gradient(135deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.85) 100%), url("/images/pexels-tokuo-nobuhiro-79378678-20472153.jpg")',
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
              Quality Policy &amp; ISO Standards
            </h1>

            <p style={{ fontSize: '1.08rem', color: '#CBD5E1', lineHeight: 1.65, marginBottom: '28px', letterSpacing: '0.3px' }}>
              A documented, audit-proven commitment to zero-defect metallurgy, full heat-lot traceability, and global ISO management system compliance.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => onOpenQuoteModal('ISO Quality Audit Dossier')}
                className="btn btn-primary mobile-full-btn"
                style={{ padding: '14px 28px', fontSize: '0.9rem' }}
              >
                Request Quality Dossier <ArrowRight size={18} />
              </button>
              <button
                type="button"
                onClick={() => navigate('/certifications')}
                className="btn btn-secondary mobile-full-btn"
                style={{ padding: '14px 28px', fontSize: '0.9rem' }}
              >
                View Certifications
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

      {/* <CapabilityNav currentPath="/quality-policy" /> */}

      {/* 3. Section 1: Policy Statement Split (Crisp Light Theme Redesign) */}
      <section style={{ padding: '50px 0', background: '#FFFFFF'}}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div className="feature-split-grid">
            <div>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: COLORS.accent, letterSpacing: '0.8px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                ZERO-DEFECT METALLURGICAL FRAMEWORK
              </span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 2.8vw, 2.4rem)', fontWeight: 700, color: '#0F172A', marginBottom: '24px', lineHeight: 1.2 }}>
                Quality Policy Statement &amp; Executive Commitment
              </h2>

              <blockquote
                style={{
                  background: '#F8FAF9',
                  borderLeft: `4px solid ${COLORS.accent}`,
                  border: '1px solid #E2E8F0',
                  borderLeftWidth: '4px',
                  padding: '28px 32px',
                  marginBottom: '28px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                }}
              >
                <p style={{ fontSize: '1.08rem', fontWeight: 700, color: '#0F172A', lineHeight: 1.6, margin: 0, letterSpacing: '0.3px' }}>
                  &ldquo;Jyoti Metal India is committed to producing certified stainless steel, titanium, and nickel alloy components that meet or exceed global engineering standards through 100% spectral chemistry verification, rigorous non-destructive testing, and EN 10204 3.1 &amp; 3.2 Mill Test Certificates on every dispatch.&rdquo;
                </p>
              </blockquote>

              <p style={{ fontSize: '1.02rem', color: '#475569', lineHeight: 1.7, margin: 0 }}>
                Our Quality Management System (QMS) is structured around ISO 9001:2015 and AS9100D principles. Every incoming billet, forged component, cut plate, and machined flange is assigned a unique heat identification number that guarantees 100% material traceability back to its chemical melt heat.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {qualityPillars.map((pillar) => (
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
                    <CheckCircle2 size={20} color={COLORS.accent} /> {pillar.title}
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

      {/* 4. Section 2: ISO Standards Directory Deck (Centered) */}
      <section style={{ padding: '60px 0 40px', background: '#FFFFFF'}}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 32px', textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: COLORS.accent, letterSpacing: '0.6px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
            INTERNATIONAL ACCREDITATIONS
          </span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: COLORS.text, margin: 0, letterSpacing: '0.6px' }}>
            ISO Standards Directory
          </h2>
        </div>

        {/* Centered Deck Grid */}
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
            {isoStandards.map((std) => (
              <div
                key={std.code}
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
                src={std.image}
                alt={std.title}
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
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.25, margin: 0, textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                  {std.code}: {std.title}
                </h3>
              </div>

              <div
                style={{
                  position: 'absolute',
                  bottom: '32px',
                  left: '24px',
                  zIndex: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                }}
              >
                <div style={{ width: '2px', height: '24px', background: COLORS.accent }} />
                <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.8px', color: '#A8B4BE', textTransform: 'uppercase' }}>
                  {std.verticalTag}
                </span>
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
                  onClick={() => onOpenQuoteModal(`ISO Certificate Request (${std.code})`)}
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
                  View PDF <Download size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      </section>

      {/* 5. Closing CTA (Crisp Light Theme Redesign) */}
      <section
        style={{
          background: '#ffffffff',
          color: '#0F172A',
          padding: '50px 0',
          // borderTop: `3px solid ${COLORS.accent}`,
          textAlign: 'center',
        }}
      >
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: COLORS.accent, letterSpacing: '0.8px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
            QUALIFIED AUDIT DOSSIERS
          </span>
          <h2 style={{ fontSize: 'clamp(2.0rem, 3.6vw, 2.5rem)', fontWeight: 700, color: '#0F172A', marginBottom: '16px', lineHeight: 1.25, letterSpacing: '0.5px' }}>
            Need Sample ISO Quality Audit Documents?
          </h2>
          <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.65, marginBottom: '36px', maxWidth: '680px', margin: '0 auto 36px' }}>
            Our QA engineering team will provide certified audit packages, official ISO registration copies, and material compliance dossiers directly to your technical team.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => onOpenQuoteModal('ISO Audit Package')}
              className="btn btn-primary mobile-full-btn"
              style={{ padding: '16px 36px', fontSize: '0.96rem', background: '#588078', borderColor: '#588078' }}
            >
              Request a Quote <ArrowRight size={18} />
            </button>
            <button
              type="button"
              onClick={() => navigate('/certifications')}
              className="btn btn-secondary mobile-full-btn"
              style={{ padding: '16px 36px', fontSize: '0.96rem', background: '#FFFFFF', color: '#0F172A', border: '1px solid #E2E8F0' }}
            >
              View Certifications
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
