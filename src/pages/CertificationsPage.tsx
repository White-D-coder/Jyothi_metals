import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Download,
  Maximize2,
  ExternalLink,
  X,
} from 'lucide-react';

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

/*
 * Transcribed from the issued certificate scans. Every field here is printed on
 * the certificate itself, so it can be checked against the scan shown beside it
 * — do not edit these without a newer certificate in hand.
 */
const ISO_ISSUER = 'Quality Control Certification (QCC)';
const ISO_ACCREDITATION = 'Accredited by UASL, England, UK';
const ISO_VERIFY_URL = 'http://uasl.uk.com/certifiedorganization.html';
const ISO_SCOPE =
  'Manufacturer of S.S. Pipes & Tubes; supplier, stockist, importer & exporter of all kinds of ferrous & non-ferrous metals.';

const MUMBAI_SITE = '102/8, Praveen House, 4th Kumbharwada Lane, Mumbai 400004, Maharashtra';
const ALWAR_SITE = 'Plot No. E-41, G-1, RIICO Industrial Area, Khushkhera 301707, Distt. Alwar, Rajasthan';

const isoCertificates = [
  {
    code: 'ISO 9001:2015',
    system: 'Quality Management System',
    certNo: 'QMS/010898/0619',
    image: '/images/certificates/iso-9001-2015.jpg',
    sites: [MUMBAI_SITE],
  },
  {
    code: 'ISO 14001:2015',
    system: 'Environmental Management System',
    certNo: 'EMS/010896/0619',
    image: '/images/certificates/iso-14001-2015.jpg',
    sites: [MUMBAI_SITE, ALWAR_SITE],
  },
  {
    code: 'ISO 45001:2018',
    system: 'Occupational Health & Safety Management System',
    certNo: 'OHS/010897/0619',
    image: '/images/certificates/iso-45001-2018.jpg',
    sites: [MUMBAI_SITE, ALWAR_SITE],
  },
];

// All three certificates share one audit cycle, so the dates live outside the list.
const ISO_DATES = [
  { label: 'Original certification', value: '18 June 2019' },
  { label: 'Current issue', value: '10 June 2025' },
  { label: 'Valid until', value: '09 June 2028' },
];

export const CertificationsPage: React.FC<CertificationsPageProps> = ({ onOpenQuoteModal }) => {
  const navigate = useNavigate();
  const [openCert, setOpenCert] = useState<(typeof isoCertificates)[number] | null>(null);

  // Escape closes the enlarged certificate, matching the click-outside affordance.
  useEffect(() => {
    if (!openCert) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenCert(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openCert]);

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

        /* --- Issued ISO certificates --- */
        .iso-date-strip {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border: 1px solid ${COLORS.divider};
          background: #F8FAF9;
          margin-bottom: 28px;
        }
        .iso-date-item { padding: 16px 22px; }
        .iso-date-item:not(:first-child) { border-left: 1px solid ${COLORS.divider}; }

        .iso-cert-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .iso-cert-card {
          display: flex;
          flex-direction: column;
          background: #FFFFFF;
          border: 1px solid ${COLORS.divider};
          border-top: 4px solid ${COLORS.accent};
          box-shadow: 0 4px 16px rgba(48, 64, 80, 0.06);
          transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .iso-cert-card:hover { box-shadow: 0 14px 32px rgba(48, 64, 80, 0.15); }

        .iso-cert-thumb {
          position: relative;
          display: block;
          width: 100%;
          padding: 0;
          border: 0;
          border-bottom: 1px solid ${COLORS.divider};
          background: #F4F6F8;
          cursor: pointer;
          overflow: hidden;
        }
        /* Portrait A4 scans: contain, so no part of the certificate is cropped away. */
        .iso-cert-thumb img {
          display: block;
          width: 100%;
          height: 300px;
          object-fit: contain;
          object-position: center top;
          background: #FFFFFF;
          transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .iso-cert-thumb:hover img { transform: scale(1.03); }
        .iso-cert-zoom {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 9px;
          font-size: 0.78rem;
          font-weight: 700;
          color: #FFFFFF;
          background: rgba(48, 64, 80, 0.88);
          opacity: 0;
          transition: opacity 200ms ease;
        }
        .iso-cert-thumb:hover .iso-cert-zoom,
        .iso-cert-thumb:focus-visible .iso-cert-zoom { opacity: 1; }
        .iso-cert-thumb:focus-visible { outline: 2px solid ${COLORS.accent}; outline-offset: 2px; }

        .iso-cert-body { padding: 22px 24px 26px; }
        .iso-cert-meta { margin: 0; font-size: 0.84rem; line-height: 1.5; }
        .iso-cert-meta dt {
          font-weight: 700;
          color: ${COLORS.textMuted};
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-size: 0.7rem;
          margin-bottom: 3px;
        }
        .iso-cert-meta dd {
          margin: 0 0 12px;
          color: ${COLORS.text};
        }
        .iso-cert-meta dd:last-child { margin-bottom: 0; }

        .iso-scope-note {
          margin-top: 28px;
          padding: 24px 28px;
          background: #F8FAF9;
          border: 1px solid ${COLORS.divider};
          border-left: 4px solid ${COLORS.accent};
        }

        .iso-lightbox {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px;
          background: rgba(12, 18, 26, 0.92);
        }
        .iso-lightbox img {
          max-width: min(920px, 100%);
          max-height: 100%;
          object-fit: contain;
          background: #FFFFFF;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
        }
        .iso-lightbox-close {
          position: absolute;
          top: 20px;
          right: 24px;
          display: inline-flex;
          padding: 10px;
          color: #FFFFFF;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.25);
          cursor: pointer;
        }
        .iso-lightbox-close:hover { background: rgba(255, 255, 255, 0.22); }

        @media (max-width: 900px) {
          .iso-cert-grid { grid-template-columns: 1fr; }
          .iso-date-strip { grid-template-columns: 1fr; }
          .iso-date-item:not(:first-child) {
            border-left: none;
            border-top: 1px solid ${COLORS.divider};
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .iso-cert-card, .iso-cert-thumb img { transition: none; }
          .iso-cert-thumb:hover img { transform: none; }
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

      {/* 2. Issued ISO Management System Certificates (scans of the real certificates) */}
      <section style={{ padding: '60px 0', background: '#FFFFFF', borderBottom: `1px solid ${COLORS.divider}` }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 40px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: COLORS.accent, letterSpacing: '0.6px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
              ACCREDITED MANAGEMENT SYSTEMS
            </span>
            <h2 style={{ fontSize: 'clamp(1.7rem, 2.8vw, 2.2rem)', fontWeight: 700, color: COLORS.text, margin: '0 0 12px', letterSpacing: '0.4px' }}>
              Our ISO Certificates
            </h2>
            <p style={{ color: COLORS.textMuted, fontSize: '1rem', lineHeight: 1.65, margin: 0 }}>
              Issued by {ISO_ISSUER}, {ISO_ACCREDITATION.toLowerCase()}. Click any certificate to view it full size, or verify its status directly with the registrar.
            </p>
          </div>

          {/* Shared audit cycle — one row rather than repeating dates on all three cards */}
          <div className="iso-date-strip">
            {ISO_DATES.map((d) => (
              <div key={d.label} className="iso-date-item">
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '4px' }}>
                  {d.label}
                </div>
                <div style={{ fontSize: '1.02rem', fontWeight: 800, color: COLORS.text }}>{d.value}</div>
              </div>
            ))}
          </div>

          <div className="iso-cert-grid">
            {isoCertificates.map((cert) => (
              <div key={cert.certNo} className="iso-cert-card">
                <button
                  type="button"
                  className="iso-cert-thumb"
                  onClick={() => setOpenCert(cert)}
                  aria-label={`View the ${cert.code} certificate full size`}
                >
                  <img src={cert.image} alt={`${cert.code} certificate issued to Jyoti Metal (India)`} loading="lazy" />
                  <span className="iso-cert-zoom">
                    <Maximize2 size={16} /> View full size
                  </span>
                </button>

                <div className="iso-cert-body">
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: COLORS.text, margin: '0 0 4px', letterSpacing: '0.3px' }}>
                    {cert.code}
                  </h3>
                  <div style={{ fontSize: '0.84rem', fontWeight: 700, color: COLORS.accent, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '14px' }}>
                    {cert.system}
                  </div>

                  <dl className="iso-cert-meta">
                    <dt>Certificate no.</dt>
                    <dd>{cert.certNo}</dd>
                    <dt>Issued by</dt>
                    <dd>{ISO_ISSUER}</dd>
                    <dt>{cert.sites.length > 1 ? 'Covered sites' : 'Covered site'}</dt>
                    <dd>
                      {cert.sites.map((s) => (
                        <span key={s} style={{ display: 'block', marginBottom: '4px' }}>{s}</span>
                      ))}
                    </dd>
                  </dl>
                </div>
              </div>
            ))}
          </div>

          <div className="iso-scope-note">
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '6px' }}>
              Certified scope
            </div>
            <p style={{ margin: '0 0 16px', fontSize: '0.96rem', color: COLORS.text, lineHeight: 1.6 }}>
              {ISO_SCOPE}
            </p>
            <a
              href={ISO_VERIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ padding: '12px 22px', fontSize: '0.86rem', textDecoration: 'none' }}
            >
              Verify certificate status <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Enlarged certificate viewer */}
      {openCert && (
        <div
          className="iso-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${openCert.code} certificate`}
          onClick={() => setOpenCert(null)}
        >
          <button type="button" className="iso-lightbox-close" onClick={() => setOpenCert(null)} aria-label="Close">
            <X size={22} />
          </button>
          {/* Stop propagation so clicking the certificate itself does not dismiss it */}
          <img
            src={openCert.image}
            alt={`${openCert.code} certificate issued to Jyoti Metal (India)`}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

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
