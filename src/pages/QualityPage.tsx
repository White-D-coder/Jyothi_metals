import React from 'react';
import {
  ArrowRight,
  ChevronRight,
  FileCheck,
  ShieldCheck,
  FlaskConical,
  Fingerprint,
  ScanLine,
  Waves,
  Radiation,
  Gauge,
  Ruler,
  Layers,
  CheckCircle2,
} from 'lucide-react';

interface QualityPageProps {
  onOpenQuoteModal: () => void;
  onNavigate?: (tab: string) => void;
}

export const QualityPage: React.FC<QualityPageProps> = ({ onOpenQuoteModal, onNavigate }) => {
  const pillars = [
    {
      icon: <FlaskConical size={28} color="#51847D" />,
      title: 'Spectral Chemistry Analysis',
      desc: '100% optical emission spectrometry verifies exact elemental composition on every heat lot before release.',
    },
    {
      icon: <Layers size={28} color="#51847D" />,
      title: 'Heat-Lot Traceability',
      desc: 'Unique heat numbers link each item back to its melt, mechanical results, and dimensional inspection report.',
    },
    {
      icon: <Waves size={28} color="#51847D" />,
      title: 'Ultrasonic Weld Inspection',
      desc: 'Non-destructive UT scanning detects sub-surface flaws, laminations, and weld discontinuities down to micron level.',
    },
    {
      icon: <Fingerprint size={28} color="#51847D" />,
      title: 'Positive Material Identification',
      desc: 'Portable PMI analyzers confirm alloy grade at every stage, eliminating any risk of material mix-up.',
    },
  ];

  const certifications = [
    {
      code: 'ISO 9001:2015',
      label: 'Quality Management System',
      desc: 'Process-controlled manufacturing with full spectral chemistry and heat-lot validation.',
    },
    {
      code: 'AS9100D / EN 9100',
      label: 'Aerospace & Defense',
      desc: 'Sub-micron tolerance airframe and turbine components certified for prime contractors.',
    },
    {
      code: 'ASTM International',
      label: 'Material Testing Compliance',
      desc: 'Tensile, impact, and intergranular corrosion testing to recognized global standards.',
    },
    {
      code: 'PED 2014/68/EU',
      label: 'Pressure Equipment Directive',
      desc: 'Certified for high-pressure oil, gas, and process pipeline installations across Europe.',
    },
  ];

  const tests = [
    {
      icon: <FlaskConical size={26} color="#51847D" />,
      title: 'Optical Emission Spectrometry',
      desc: 'Full elemental composition analysis to confirm alloy chemistry against specification.',
    },
    {
      icon: <Waves size={26} color="#51847D" />,
      title: 'Ultrasonic Testing (UT)',
      desc: 'Detects internal laminations, inclusions, and weld defects without damaging the part.',
    },
    {
      icon: <Radiation size={26} color="#51847D" />,
      title: 'Radiographic / X-Ray Inspection',
      desc: 'High-resolution imaging reveals porosity and volumetric weld discontinuities.',
    },
    {
      icon: <Gauge size={26} color="#51847D" />,
      title: 'Tensile & Impact Testing',
      desc: 'Verifies yield strength, elongation, and notch toughness at operating temperatures.',
    },
    {
      icon: <ScanLine size={26} color="#51847D" />,
      title: 'Intergranular Corrosion (IGC)',
      desc: 'ASTM A262 testing confirms resistance to grain-boundary attack in corrosive service.',
    },
    {
      icon: <Ruler size={26} color="#51847D" />,
      title: 'Hydrostatic Pressure Testing',
      desc: 'Validates leak-tight integrity of pipes and fittings under certified test pressures.',
    },
  ];

  const mtcContents = [
    'Certified chemical composition per heat number',
    'Mechanical properties: yield, tensile, elongation & hardness',
    'Unique heat / melt number for full traceability',
    'Dimensional and visual inspection report',
    'Independent third-party endorsement on request',
  ];

  return (
    <div className="inner-page" style={{ background: '#ffffff', minHeight: '100vh' }}>
      {/* 1. Dark Industrial Hero */}
      <section
        className="page-hero"
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.92) 100%), url("/images/pexels-sergey-sergeev-2153675005-32845683.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: '#ffffff',
          padding: '120px 0 90px',
          borderBottom: '3px solid #51847D',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '850px', margin: '0 auto', textAlign: 'center' }}>
            <span
              className="small-label"
              style={{ color: '#77b8b0', letterSpacing: '0.14em', marginBottom: '16px' }}
            >
              Quality, Compliance &amp; Certifications
            </span>

            <h1
              className="hero-title"
              style={{ fontSize: '3.4rem', color: '#ffffff', marginBottom: '24px', lineHeight: 1.12 }}
            >
              Zero-Defect Metallurgy, Certified at Every Heat Lot
            </h1>

            <p
              style={{
                fontSize: '1.15rem',
                color: '#cbd5e1',
                lineHeight: 1.7,
                marginBottom: '36px',
                maxWidth: '680px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Every alloy we ship undergoes 100% spectral chemistry verification and carries full
              heat-lot traceability, backed by EN 10204 3.1 &amp; 3.2 Mill Test Certificates.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
              <button
                onClick={onOpenQuoteModal}
                className="btn btn-accent"
                style={{ padding: '16px 36px', fontSize: '1rem', background: '#51847D', borderColor: '#51847D' }}
              >
                Request Test Certificates <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Quality Policy Statement + Pillars */}
      <section className="section bg-white" style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px' }}>
            <span className="small-label" style={{ color: '#51847D' }}>Our Quality Policy</span>
            <h2 className="section-title" style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '16px' }}>
              A Documented Commitment to Zero-Defect Manufacturing
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: 1.7 }}>
              Quality is engineered into every stage of our process, from melt to dispatch, and independently
              verified before any material leaves our facility.
            </p>
          </div>

          {/* Prominent policy statement block */}
          <blockquote
            className="quality-policy-quote"
            style={{
              background: '#f8fafc',
              borderLeft: '6px solid #51847D',
              borderRadius: '16px',
              padding: '40px 44px',
              margin: '0 auto 56px',
              maxWidth: '1000px',
              boxShadow: '0 6px 20px rgba(0,0,0,0.04)',
            }}
          >
            <p
              style={{
                fontSize: '1.5rem',
                lineHeight: 1.55,
                fontWeight: 700,
                color: '#0f172a',
                margin: 0,
              }}
            >
              &ldquo;We are committed to delivering zero-defect metallurgical products through 100% inspection,
              full material traceability, and EN 10204 3.1 &amp; 3.2 Mill Test Certificates on every consignment
              &mdash; driven by a culture of continuous improvement and total customer confidence.&rdquo;
            </p>
            <footer style={{ marginTop: '20px', fontSize: '0.9rem', fontWeight: 700, color: '#51847D' }}>
              &mdash; Quality Assurance Department, Jyoti Metal India
            </footer>
          </blockquote>

          {/* Supporting pillar cards */}
          <div
            className="grid-responsive-4col"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}
          >
            {pillars.map((p) => (
              <div
                key={p.title}
                className="feature-card"
                style={{
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderLeft: '4px solid #51847D',
                  borderRadius: '16px',
                  padding: '30px 26px',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
                  <div className="feature-icon-wrapper" style={{ marginBottom: 0, flexShrink: 0 }}>{p.icon}</div>
                  <h3 className="card-title" style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    {p.title}
                  </h3>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Certifications Grid */}
      <section className="section bg-tint" style={{ padding: '90px 0', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 60px' }}>
            <span className="small-label" style={{ color: '#51847D' }}>Accreditations</span>
            <h2 className="section-title" style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '16px' }}>
              Internationally Recognized Certifications
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: 1.7 }}>
              Our management systems and material testing are audited against the most demanding global standards
              for aerospace, defense, and pressure equipment.
            </p>
          </div>

          <div
            className="grid-responsive-4col"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}
          >
            {certifications.map((cert, idx) => (
              <div
                key={cert.code}
                style={{
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderTop: '4px solid #51847D',
                  borderRadius: '16px',
                  padding: '32px 24px',
                  textAlign: 'center',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.04)',
                }}
              >
                {idx % 2 === 0 ? (
                  <FileCheck size={38} color="#51847D" style={{ margin: '0 auto 18px' }} />
                ) : (
                  <ShieldCheck size={38} color="#51847D" style={{ margin: '0 auto 18px' }} />
                )}
                <h3 className="card-title" style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a', marginBottom: '8px' }}>
                  {cert.code}
                </h3>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#51847D', marginBottom: '10px' }}>
                  {cert.label}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.55 }}>
                  {cert.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Testing & Inspection Capabilities */}
      <section className="section bg-white" style={{ padding: '100px 0', borderTop: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 60px' }}>
            <span className="small-label" style={{ color: '#51847D' }}>In-House Laboratory</span>
            <h2 className="section-title" style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '16px' }}>
              Testing &amp; Inspection Capabilities
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: 1.7 }}>
              A full suite of destructive and non-destructive testing methods validates the chemistry, integrity,
              and mechanical performance of every batch.
            </p>
          </div>

          <div
            className="grid-responsive-3col"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}
          >
            {tests.map((t) => (
              <div
                key={t.title}
                style={{
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderLeft: '4px solid #51847D',
                  borderRadius: '16px',
                  padding: '28px 26px',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.04)',
                  display: 'flex',
                  gap: '18px',
                  alignItems: 'flex-start',
                }}
              >
                <div style={{ flexShrink: 0, marginTop: '2px' }}>{t.icon}</div>
                <div>
                  <h3 className="card-title" style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                    {t.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
                    {t.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Mill Test Certificate (MTC) Explainer */}
      <section className="section bg-tint" style={{ padding: '100px 0', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
        <div className="container">
          <div
            className="grid-responsive-about"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '60px', alignItems: 'center' }}
          >
            {/* Image side */}
            <div
              className="about-arch-frame-reversed"
              style={{ overflow: 'hidden', boxShadow: '0 20px 45px rgba(0,0,0,0.14)', background: '#061221' }}
            >
              <img
                src="/images/precision_parts.png"
                alt="Mill Test Certificate documentation and precision alloy components"
                style={{ width: '100%', height: '460px', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Text side */}
            <div>
              <span className="small-label" style={{ color: '#51847D' }}>Documentation</span>
              <h2 className="section-title" style={{ fontSize: '2.4rem', color: '#0f172a', marginBottom: '18px', lineHeight: 1.2 }}>
                What&rsquo;s Inside Every EN 10204 3.1 &amp; 3.2 Certificate
              </h2>
              <p style={{ fontSize: '1.02rem', color: '#475569', lineHeight: 1.7, marginBottom: '28px' }}>
                Each consignment ships with a complete Mill Test Certificate that documents exactly what was tested,
                measured, and verified &mdash; giving your inspectors and auditors full confidence in the material.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                {mtcContents.map((item) => (
                  <div key={item} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <CheckCircle2 size={22} color="#51847D" style={{ flexShrink: 0, marginTop: '1px' }} />
                    <span style={{ fontSize: '1rem', color: '#334155', lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={onOpenQuoteModal}
                className="btn btn-outline"
                style={{ padding: '14px 30px', fontSize: '0.95rem' }}
              >
                Request a Sample Certificate <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Final CTA Band */}
      <section
        style={{
          background: '#061221',
          padding: '90px 0',
          borderTop: '3px solid #51847D',
          color: '#ffffff',
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>
            <span className="small-label" style={{ color: '#77b8b0' }}>Quality Assurance Team</span>
            <h2 className="section-title" style={{ fontSize: '2.5rem', color: '#ffffff', marginBottom: '18px', lineHeight: 1.2 }}>
              Need Material Test Reports for Your Contract?
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '36px' }}>
              Our QA specialists can supply sample Mill Test Certificates, walk through specific test standards, and
              tailor documentation to your project&rsquo;s compliance requirements.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <button
                onClick={onOpenQuoteModal}
                className="btn btn-accent"
                style={{ padding: '16px 36px', fontSize: '1rem', background: '#51847D', borderColor: '#51847D' }}
              >
                Download Sample MTC / Get Quote <ArrowRight size={18} />
              </button>

              {onNavigate && (
                <button
                  onClick={() => onNavigate('contact')}
                  className="btn btn-outline"
                  style={{ padding: '16px 36px', fontSize: '1rem', borderColor: '#77b8b0', color: '#ffffff' }}
                >
                  Talk to QA Team
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
