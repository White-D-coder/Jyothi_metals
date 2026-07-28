import React, { useState } from 'react';
import {
  ArrowRight,
  Award,
  Cpu,
  ShieldCheck,
  Zap,
  Globe2,
} from 'lucide-react';

interface AboutPageProps {
  onOpenQuoteModal: (productName?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenQuoteModal }) => {
  const [isTimelineOpen, setIsTimelineOpen] = useState<boolean>(false);

  const executivePillars = [
    {
      num: '01',
      title: 'PRIMARY MELT & SPECTROGRAPHIC CONTROL',
      desc: 'Dual-shell Electric Arc Furnaces (EAF) paired with AOD secondary decarburization vessels to achieve sub-ppm gas purity and 100% spectral chemistry verification.',
      image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
      icon: Cpu,
      tag: 'EAF & AOD REFINING',
    },
    {
      num: '02',
      title: 'SUB-MICRON CNC LASER FABRICATION',
      desc: 'High-power fiber optic CNC laser cutting lines and automated cold rolling mills guaranteeing sub-micron kerf edge tolerances for defense assemblies.',
      image: '/images/pexels-bence-szemerey-337043-6804265.jpg',
      icon: Zap,
      tag: 'CNC LASER CELL',
    },
    {
      num: '03',
      title: 'AS9100D AEROSPACE & DEFENSE QA',
      desc: 'Phased-array ultrasonic volumetric scanning, high-energy X-ray radiography, and EN 10204 3.2 third-party witnessed mill test certificates.',
      image: '/images/pexels-willians-huerta-2157111846-36397988.jpg',
      icon: ShieldCheck,
      tag: 'AS9100D ACCREDITED',
    },
    {
      num: '04',
      title: '48H GLOBAL LOGISTICS & TRACEABILITY',
      desc: 'Strategic port stock hubs in Asia, Europe, and North America guaranteeing 48-hour container dispatch with QR-etched heat-lot tracking.',
      image: '/images/pexels-jakubzerdzicki-33813584.jpg',
      icon: Globe2,
      tag: '48H DISPATCH SLA',
    },
  ];

  const timelineMilestones = [
    {
      year: '1991',
      title: 'Foundation & Regional Foundry Hub',
      desc: 'Established as a specialized regional foundry in India providing precision stainless steel castings to domestic oil refineries and chemical plants with 100% heat-lot chemistry tracking.',
      image: '/images/pexels-bence-szemerey-337043-6804265.jpg',
    },
    {
      year: '2004',
      title: 'ISO 9001:2015 Quality Accreditation',
      desc: 'Achieved full ISO accreditation and introduced computer-guided ultrasonic non-destructive testing vaults across all continuous casting production lines.',
      image: '/images/pexels-tokuo-nobuhiro-79378678-20472153.jpg',
    },
    {
      year: '2012',
      title: 'Aerospace & Defense Titanium Expansion',
      desc: 'Commissioned titanium and nickel superalloy vacuum arc remelting (VAR) furnaces, securing AS9100D aerospace certification for Tier-1 defense turbine contractors.',
      image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    },
    {
      year: '2020',
      title: '98% Circular Electric Arc Recycling',
      desc: 'Transitioned melt shop operations to 98% circular scrap recycling and zero-discharge closed-loop water treatment systems with official EPD Environmental Declarations.',
      image: '/images/pexels-jakubzerdzicki-33813584.jpg',
    },
    {
      year: '2024',
      title: 'Multi-Axis CNC Laser Cell Integration',
      desc: 'Expanded fabrication floor area to 120,000 m² with 6kW & 12kW fiber optic CNC laser cutting lines for sub-micron kerf edge tolerance component manufacturing.',
      image: '/images/pexels-pppsdavid-5851494.jpg',
    },
    {
      year: '2026',
      title: 'Global Aerospace Stock Warehouse Expansion',
      desc: 'Established strategic stock holding hubs across Europe and North America guaranteeing 48-hour container dispatch on EN 10204 3.2 certified stock.',
      image: '/images/pexels-eugeniofr-30005294.jpg',
    },
  ];

  const certifications = [
    {
      code: 'ISO 9001:2015',
      title: 'Quality Management Systems',
      desc: 'Complete process control across raw melt, rolling, machining, and dispatch.',
    },
    {
      code: 'AS9100D / EN 9100',
      title: 'Aerospace & Defense Quality',
      desc: 'Sub-micron tolerance airframe and turbine components for defense contractors.',
    },
    {
      code: 'PED 2014/68/EU',
      title: 'Pressure Equipment Directive',
      desc: 'Certified manufacturing for high-pressure oil, gas, and nuclear pipelines.',
    },
    {
      code: 'ISO 14001:2015',
      title: 'Environmental Management',
      desc: 'Zero-discharge melt shop operations and circular alloy scrap recycling.',
    },
  ];

  return (
    <div className="about-page-root" style={{ background: '#F8F8F8', minHeight: '100vh', color: '#304050' }}>
      <style>{`
        .about-page-root {
          font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
          border: 5px solid #E0E8E8;
          z-index: 1;
        }
        .single-accordion-layer-1 {
          position: absolute;
          bottom: -4px;
          left: 7px;
          right: 7px;
          height: 12px;
          background: #F4F6F8;
          border: 1px solid #E0E8E8;
          z-index: 2;
        }
        .single-accordion-main {
          position: relative;
          z-index: 3;
          background: #FFFFFF;
          border: 1px solid #E0E8E8;
          border-radius: 0;
          overflow: hidden;
        }

        .timeline-row-item {
          display: grid;
          grid-template-columns: 120px 1fr 220px;
          gap: 28px;
          align-items: center;
          padding: 24px 28px;
          transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
          background: #ffffffff;
          border-left: 3px solid transparent;
          cursor: pointer;
        }
        .timeline-row-item:hover {
          background: #F8FAF9;
          border-left-color: #588078;
        }
        .timeline-row-item:hover .timeline-img-frame img {
          transform: scale(1.06);
        }
        .timeline-row-item:hover .timeline-year-text {
          color: #588078;
        }

        .timeline-img-frame {
          height: 140px;
          overflow: hidden;
          border: 1px solid #E0E8E8;
          position: relative;
        }
        .timeline-img-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 300ms ease;
        }

        @media (max-width: 768px) {
          .timeline-row-item {
            grid-template-columns: 1fr;
            gap: 16px;
            padding: 20px;
          }
          .timeline-img-frame {
            height: 180px;
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
          backgroundImage: 'linear-gradient(135deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.85) 100%), url("/images/pexels-sergey-sergeev-2153675005-32845683.jpg")',
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
              About Jyoti Metal India
            </h1>

            <p style={{ fontSize: '1.08rem', color: '#CBD5E1', lineHeight: 1.65, marginBottom: '28px', letterSpacing: '0.3px' }}>
              Three decades of metallurgical innovation, certified zero-defect alloy manufacturing, and high-yield continuous casting for global aerospace, defense, and nuclear contracts.
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

      {/* 2. Executive 4-Pillar Metallurgical Architecture Layout */}
      <section style={{ padding: '70px 0', background: '#FFFFFF', borderBottom: '1px solid #E0E8E8' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 48px' }}>
            <span style={{ color: '#588078', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.6px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              OPERATIONAL CORE
            </span>
            <h2 style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.3rem)', fontWeight: 700, color: '#304050', marginBottom: '12px', lineHeight: 1.25, letterSpacing: '0.6px' }}>
              Four Pillars of Metallurgical Excellence
            </h2>
            <p style={{ fontSize: '0.98rem', color: '#7C8894', lineHeight: 1.6, margin: 0 }}>
              Vertically integrated foundry capabilities, precision laser fabrication, and audit-certified quality systems.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '24px' }}>
            {executivePillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.num}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E0E8E8',
                    borderTop: '4px solid #588078',
                    borderRadius: 0,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
                      <img
                        src={pillar.image}
                        alt={pillar.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '14px',
                          left: '14px',
                          background: '#588078',
                          color: '#FFFFFF',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '4px 10px',
                          letterSpacing: '0.6px',
                        }}
                      >
                        {pillar.tag}
                      </div>
                    </div>

                    <div style={{ padding: '24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                        <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#588078', lineHeight: 1 }}>
                          {pillar.num}
                        </span>
                        <Icon size={20} color="#588078" />
                      </div>

                      <h3 style={{ fontSize: '1.02rem', fontWeight: 700, color: '#304050', marginBottom: '10px', lineHeight: 1.3, letterSpacing: '0.5px' }}>
                        {pillar.title}
                      </h3>

                      <p style={{ fontSize: '0.88rem', color: '#7C8894', lineHeight: 1.6, margin: 0 }}>
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Refined Master Accordion Card (With Smooth Hover Effects & Fine Touches) */}
      <section style={{ padding: '70px 0', background: '#ffffffff' }}>
        <div className="container" style={{ maxWidth: '1050px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 32px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#588078', letterSpacing: '0.6px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              HERITAGE &amp; EVOLUTION
            </span>
            <h2 style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.3rem)', fontWeight: 700, color: '#304050', marginBottom: '10px', letterSpacing: '0.6px' }}>
              Our Growth &amp; Engineering Timeline
            </h2>
            <p style={{ color: '#7C8894', fontSize: '0.96rem', lineHeight: 1.6 }}>
              Click the accordion card below to reveal our 35-year metallurgical journey from 1991 to present day.
            </p>
          </div>

          <div className="single-accordion-wrapper">
            <div className="single-accordion-layer-2" />
            <div className="single-accordion-layer-1" />

            <div className="single-accordion-main">
              {/* Accordion Header Strip */}
              <div
                onClick={() => setIsTimelineOpen(!isTimelineOpen)}
                style={{
                  padding: '38px 44px',
                  background: '#FFFFFF',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '20px',
                }}
              >
                <div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#304050', margin: 0, letterSpacing: '0.6px' }}>
                    COMPLETE METALLURGICAL TIMELINE (1991 – 2026)
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: '#7C8894', margin: '6px 0 0 0' }}>
                    {isTimelineOpen ? 'Click to collapse complete timeline' : 'Click to expand 6 major engineering milestones'}
                  </p>
                </div>
              </div>

              {/* Accordion Expanded Body */}
              {isTimelineOpen && (
                <div style={{ borderTop: '1px solid #E0E8E8', background: '#FFFFFF' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {timelineMilestones.map((item, idx) => (
                      <div
                        key={item.year}
                        className="timeline-row-item"
                        style={{
                          borderBottom: idx < timelineMilestones.length - 1 ? '1px solid #E0E8E8' : 'none',
                        }}
                      >
                        {/* Year Typography */}
                        <div>
                          <span className="timeline-year-text" style={{ fontSize: '2.2rem', fontWeight: 800, color: '#304050', lineHeight: 1, letterSpacing: '0.6px', transition: 'color 200ms ease' }}>
                            {item.year}
                          </span>
                        </div>

                        {/* Title & Description (No Boxed Checkmark Tags!) */}
                        <div>
                          <h4 style={{ fontSize: '1.12rem', fontWeight: 700, color: '#304050', marginBottom: '8px', lineHeight: 1.3, letterSpacing: '0.4px' }}>
                            {item.title}
                          </h4>
                          <p style={{ fontSize: '0.9rem', color: '#7C8894', lineHeight: 1.65, margin: 0 }}>
                            {item.desc}
                          </p>
                        </div>

                        {/* Photo with smooth zoom on hover */}
                        <div className="timeline-img-frame">
                          <img
                            src={item.image}
                            alt={item.title}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Certifications Grid */}
      <section style={{ padding: '70px 0', background: '#FFFFFF', borderTop: '1px solid #E0E8E8' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 48px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#588078', letterSpacing: '0.6px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              GLOBAL ACCREDITATION
            </span>
            <h2 style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.3rem)', fontWeight: 700, color: '#304050', marginBottom: '12px', letterSpacing: '0.6px' }}>
              International Metallurgical Certifications
            </h2>
            <p style={{ color: '#7C8894', fontSize: '0.98rem', lineHeight: 1.6 }}>
              Every alloy consignment carries official Mill Test Certificates (MTC) compliant with EN 10204 3.1 &amp; 3.2 standards.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {certifications.map((cert) => (
              <div
                key={cert.code}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E0E8E8',
                  borderTop: '3px solid #588078',
                  borderRadius: 0,
                  padding: '28px 24px',
                  textAlign: 'center',
                }}
              >
                <Award size={32} color="#588078" style={{ margin: '0 auto 14px' }} />
                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#304050', marginBottom: '6px', letterSpacing: '0.4px' }}>
                  {cert.code}
                </div>
                <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#588078', marginBottom: '10px' }}>
                  {cert.title}
                </div>
                <div style={{ fontSize: '0.84rem', color: '#7C8894', lineHeight: 1.55 }}>
                  {cert.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Light Theme Closing CTA */}
      <section
        style={{
          background: '#FFFFFF',
          color: '#304050',
          padding: '70px 0',
          borderTop: '3px solid #588078',
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
