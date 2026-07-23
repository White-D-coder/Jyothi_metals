import React, { useState } from 'react';
import {
  ShieldCheck,
  Factory,
  Cpu,
  Flame,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Globe2,
  FileCheck,
} from 'lucide-react';

interface AboutPageProps {
  onOpenQuoteModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenQuoteModal }) => {
  const [activeBenefitIdx, setActiveBenefitIdx] = useState<number>(1);

  const benefits = [
    {
      num: '01',
      title: 'ADVANCED METALLURGY TECHNOLOGY',
      desc: 'Multi-axis CNC laser cutting and computer-controlled rolling lines ensure sub-micron tolerance precision across all metal components and titanium sheets.',
      image: '/images/pexels-alex-60339926-9878853.jpg',
      alt: 'Computer Controlled CNC Laser Cutting Line',
    },
    {
      num: '02',
      title: 'DUAL ISO 9001 & AS9100D CERTIFIED',
      desc: 'Comprehensive lab testing, X-ray weld inspection, and full heat-lot traceability reports included with every shipment for aerospace compliance.',
      image: '/images/titanium_plates.png',
      alt: 'Aerospace Grade Titanium Testing & Accreditation',
    },
    {
      num: '03',
      title: '30+ YEARS EXPERT ENGINEERING TEAMS',
      desc: 'In-house metallurgists assist in customizing heat-treatment schedules and bespoke extrusion profiles tailored to your exact CAD files.',
      image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
      alt: 'In-house Metallurgical Testing & Heat-Treatment Facility',
    },
    {
      num: '04',
      title: 'EXPEDITED 48H GLOBAL SUPPLY CHAIN',
      desc: 'Strategic warehouses in North America, Europe, and Asia guaranteeing rapid dispatch and real-time tracking on standard alloy stock.',
      image: '/images/stainless_pipes.png',
      alt: 'Global Port Stock Warehouse Distribution',
    },
  ];

  const timelineMilestones = [
    {
      year: '1991',
      title: 'Foundation & Regional Foundry Hub',
      desc: 'Established as a specialized regional foundry in India providing precision stainless steel castings to domestic oil refineries and chemical plants.',
    },
    {
      year: '2004',
      title: 'ISO 9001:2015 Quality Accreditation',
      desc: 'Achieved full ISO accreditation and introduced computer-guided ultrasonic non-destructive testing across all continuous casting production lines.',
    },
    {
      year: '2012',
      title: 'Aerospace & Defense Titanium Expansion',
      desc: 'Commissioned titanium and nickel superalloy vacuum arc remelting furnaces, securing AS9100D aerospace certification for defense turbines.',
    },
    {
      year: '2020',
      title: '98% Circular Electric Arc Recycling',
      desc: 'Transitioned 100% of carbon steel production to zero-carbon electric arc smelting furnaces, reducing carbon intensity by 65%.',
    },
    {
      year: '2026',
      title: 'Automated TruLaser Robotic Cells',
      desc: 'Expanded into multi-axis robotic TruLaser cutting cells delivering sub-micron tolerance components to global prime contractors.',
    },
  ];

  const certifications = [
    { code: 'ISO 9001:2015', label: 'Quality Management System', desc: 'Full spectral chemistry & heat-lot validation' },
    { code: 'AS9100D / EN 9100', label: 'Aerospace & Defense Quality', desc: 'Sub-micron tolerance airframe calibration' },
    { code: 'ASTM International', label: 'Material Testing Compliance', desc: 'Tensile, impact & intergranular corrosion certified' },
    { code: 'PED 2014/68/EU', label: 'Pressure Equipment Directive', desc: 'Certified for high-pressure oil & gas pipelines' },
  ];

  const keyPillars = [
    {
      icon: <Flame size={28} color="#51847D" />,
      title: 'Electric Arc Smelting',
      desc: 'High-purity vacuum arc remelting providing ultra-clean alloy grain structures with minimal non-metallic inclusions.',
    },
    {
      icon: <Cpu size={28} color="#51847D" />,
      title: 'Micron Laser Calibration',
      desc: 'Multi-axis CNC laser cutting lines maintaining sub-millimeter tolerances across heavy structural profiles.',
    },
    {
      icon: <ShieldCheck size={28} color="#51847D" />,
      title: 'Spectral Lab Testing',
      desc: '100% positive material identification (PMI) and ultrasonic weld inspection included with every mill test certificate.',
    },
    {
      icon: <Globe2 size={28} color="#51847D" />,
      title: 'Global Warehouse Logistics',
      desc: 'Redundant inventory stock located near major international ports ensuring rapid 48-hour container dispatch.',
    },
  ];

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      {/* 1. Dark Industrial Hero Header */}
      <section
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
            <h1
              className="hero-title"
              style={{
                fontSize: '3.6rem',
                color: '#ffffff',
                marginBottom: '32px',
                lineHeight: 1.1,
              }}
            >
              Over Three Decades of Precision Metallurgy &amp; Engineering Innovation
            </h1>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
              <button
                onClick={onOpenQuoteModal}
                className="btn btn-accent"
                style={{ padding: '16px 36px', fontSize: '1rem', background: '#51847D', borderColor: '#51847D' }}
              >
                Request Enterprise Specifications <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Overview & Industrial Facility Section */}
      <section className="section bg-white" style={{ padding: '100px 0 80px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '60px', alignItems: 'center' }}>
            {/* Left Side: Mission & Heritage Narrative */}
            <div>
              <h2
                className="section-title"
                style={{
                  fontSize: '2.5rem',
                  color: '#0f172a',
                  marginBottom: '20px',
                  lineHeight: 1.2,
                }}
              >
                Uncompromising Quality in Every Alloy Batch
              </h2>

              <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7, marginBottom: '20px' }}>
                Founded with a strict commitment to zero-defect manufacturing, Jyothi Metals operates state-of-the-art continuous casting, cold rolling, and multi-axis CNC machining facilities spanning over 120,000 m².
              </p>

              <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7, marginBottom: '32px' }}>
                Whether supplying high-tensile titanium plates for aerospace airframes or heavy structural I-beams for skyscraper foundations, our materials undergo 100% spectral chemistry analysis and heat-lot validation.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                {keyPillars.slice(0, 2).map((p, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #cbd5e1',
                      borderLeft: '4px solid #51847D',
                      padding: '20px',
                    }}
                  >
                    <div style={{ marginBottom: '12px' }}>{p.icon}</div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                      {p.title}
                    </h4>
                    <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: Industrial Visual Frame & Stats */}
            <div>
              <div
                className="about-arch-frame-reversed"
                style={{
                  border: '2px solid #0f172a',
                  background: '#061221',
                }}
              >
                <img
                  src="/images/pexels-alex-60339926-9878853.jpg"
                  alt="Jyothi Metals Precision Manufacturing Hub"
                  style={{
                    width: '100%',
                    height: '460px',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />

                {/* Overlapping Facility Stats Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(to top, rgba(6, 18, 33, 0.95), rgba(6, 18, 33, 0.4))',
                    padding: '30px',
                    color: '#ffffff',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Factory size={32} color="#77b8b0" />
                    <div>
                      <div style={{ fontWeight: 900, fontSize: '1.2rem', color: '#ffffff' }}>
                        120,000 m&sup2; Manufacturing Hub
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                        Integrated casting, rolling &amp; laser milling lines
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', borderLeft: '2px solid #51847D', paddingLeft: '20px' }}>
                    <div style={{ fontWeight: 900, fontSize: '1.4rem', color: '#d4a017' }}>850k+ Tons</div>
                    <div style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Annual Throughput</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Industry Leaders Trust Jyothi Metals (Interactive Hover Animated 01-04 Layout) */}
      <section className="section bg-white" style={{ padding: '100px 0', position: 'relative', overflow: 'hidden', borderTop: '1px solid #e2e8f0' }}>
        {/* Far Right Vertical Rotated Backdrop Typography */}
        <div
          style={{
            position: 'absolute',
            right: '-10px',
            top: '50%',
            transform: 'translateY(-50%)',
            writingMode: 'vertical-rl',
            fontSize: 'clamp(5rem, 12vw, 9rem)',
            fontWeight: 900,
            fontFamily: 'Outfit, sans-serif',
            letterSpacing: '0.12em',
            color: '#f1f5f9',
            textTransform: 'uppercase',
            userSelect: 'none',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          BENEFIT
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: '60px', alignItems: 'flex-start' }}>
            {/* Left Column: Title & Dynamic Crossfading Industrial Visual Frame */}
            <div>
              <h2
                className="section-title"
                style={{
                  fontSize: '2.6rem',
                  lineHeight: 1.15,
                  marginBottom: '28px',
                  color: '#0f172a',
                  marginTop: 0,
                }}
              >
                Why Industry Leaders Trust Jyothi Metals
              </h2>

              {/* Dynamic Crossfading Visual Frame responding to activeBenefitIdx */}
              <div
                style={{
                  position: 'relative',
                  height: '400px',
                  border: '2px solid #0f172a',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
                  overflow: 'hidden',
                  background: '#061221',
                }}
              >
                {benefits.map((b, bIdx) => (
                  <div
                    key={b.num}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url("${b.image}")`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      opacity: activeBenefitIdx === bIdx ? 1 : 0,
                      transform: activeBenefitIdx === bIdx ? 'scale(1)' : 'scale(1.06)',
                      transition: 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s ease-out',
                    }}
                  />
                ))}

                {/* Badge Overlay for Active Benefit */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(to top, rgba(6, 18, 33, 0.95), transparent)',
                    padding: '24px',
                    color: '#ffffff',
                  }}
                >
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#77b8b0', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>
                    BENEFIT FOCUS {benefits[activeBenefitIdx].num}
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>
                    {benefits[activeBenefitIdx].alt}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Numbered List (01, 02, 03, 04) with Interactive Hover Animations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {benefits.map((b, idx) => {
                const isActive = activeBenefitIdx === idx;
                return (
                  <div
                    key={b.num}
                    onMouseEnter={() => setActiveBenefitIdx(idx)}
                    style={{
                      display: 'flex',
                      gap: '20px',
                      alignItems: 'flex-start',
                      padding: '18px 24px',
                      background: isActive ? '#ffffff' : 'transparent',
                      border: 'none',
                      boxShadow: isActive ? '0 12px 30px rgba(0, 0, 0, 0.06)' : 'none',
                      transform: isActive ? 'translateX(10px)' : 'translateX(0px)',
                      transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'Outfit, sans-serif',
                        fontSize: '2.5rem',
                        fontWeight: 900,
                        color: isActive ? '#51847D' : '#cbd5e1',
                        lineHeight: 1,
                        flexShrink: 0,
                        marginTop: '-2px',
                        transform: isActive ? 'scale(1.05)' : 'scale(1)',
                        transition: 'color 0.35s ease, transform 0.35s ease',
                      }}
                    >
                      {b.num}
                    </span>
                    <div style={{ flex: 1 }}>
                      <h3
                        style={{
                          fontSize: '1.1rem',
                          fontWeight: 800,
                          color: isActive ? '#51847D' : '#0f172a',
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          marginTop: 0,
                          marginBottom: '6px',
                          lineHeight: 1.25,
                          transition: 'color 0.35s ease',
                        }}
                      >
                        {b.title}
                      </h3>
                      <p
                        style={{
                          fontSize: '0.92rem',
                          color: isActive ? '#334155' : '#64748b',
                          lineHeight: 1.6,
                          margin: 0,
                          transition: 'color 0.35s ease',
                        }}
                      >
                        {b.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Milestones Timeline */}
      <section className="section bg-tint" style={{ padding: '90px 0', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 60px' }}>
            <h2 className="section-title" style={{ fontSize: '2.5rem' }}>
              Our Growth &amp; Engineering Timeline
            </h2>
            <p style={{ color: '#64748b' }}>
              Key milestones marking our evolution from a regional foundry to a global defense and aerospace alloy supplier.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '960px', margin: '0 auto' }}>
            {timelineMilestones.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderLeft: '6px solid #51847D',
                  padding: '28px 32px',
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr',
                  gap: '24px',
                  alignItems: 'center',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                }}
              >
                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.2rem', fontWeight: 900, color: '#51847D' }}>
                  {item.year}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: '#475569', margin: 0, lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Certifications & Mill Test Compliance Grid */}
      <section className="section bg-white" style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 60px' }}>
            <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
              International Metallurgical Certifications
            </h2>
            <p style={{ color: '#475569', fontSize: '1.05rem' }}>
              Every alloy shipment from Jyothi Metals carries official Mill Test Certificates (MTC) compliant with EN 10204 3.1 &amp; 3.2 international standards.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {certifications.map((cert, cIdx) => (
              <div
                key={cIdx}
                style={{
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderTop: '4px solid #51847D',
                  padding: '30px 24px',
                  textAlign: 'center',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.04)',
                }}
              >
                <FileCheck size={36} color="#51847D" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a', marginBottom: '8px' }}>
                  {cert.code}
                </h3>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#51847D', marginBottom: '8px' }}>
                  {cert.label}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                  {cert.desc}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#0f172a', fontWeight: 800, fontSize: '1.1rem', marginBottom: '24px' }}>
              <CheckCircle2 size={22} color="#51847D" /> Need Material Test Reports (MTR) for an upcoming contract?
            </div>
            <div>
              <button
                onClick={onOpenQuoteModal}
                className="btn btn-accent"
                style={{ padding: '16px 36px', fontSize: '1rem', background: '#51847D' }}
              >
                Download Test Certificate Samples or Get Quote <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
