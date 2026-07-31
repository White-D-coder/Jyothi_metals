import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Cpu,
  ShieldCheck,
  Zap,
  Globe2,
  ChevronDown,
} from 'lucide-react';

interface AboutPageProps {
  onOpenQuoteModal: (productName?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenQuoteModal }) => {
  const [isTimelineOpen, setIsTimelineOpen] = useState<boolean>(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const hasAutoOpened = useRef<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAutoOpened.current) {
          hasAutoOpened.current = true;
          setIsTimelineOpen(true);
        }
      },
      { threshold: 0.2 }
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
      image: '/images/pexels-tokuo-nobuhiro-79378678-20472153.jpg',
    },
    {
      code: 'AS9100D / EN 9100',
      title: 'Aerospace & Defense Quality',
      desc: 'Sub-micron tolerance airframe and turbine components for defense contractors.',
      image: '/images/pexels-willians-huerta-2157111846-36397988.jpg',
    },
    {
      code: 'PED 2014/68/EU',
      title: 'Pressure Equipment Directive',
      desc: 'Certified manufacturing for high-pressure oil, gas, and nuclear pipelines.',
      image: '/images/pexels-eugeniofr-30005294.jpg',
    },
    {
      code: 'ISO 14001:2015',
      title: 'Environmental Management',
      desc: 'Zero-discharge melt shop operations and circular alloy scrap recycling.',
      image: '/images/pexels-jakubzerdzicki-33813584.jpg',
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

      {/* 1.5. About Us Overview Paragraphs & Mission / Vision Section */}
      <section style={{ padding: '48px 0 40px', background: '#F8FAFC', borderBottom: '1px solid #E0E8E8' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          {/* Paragraphs Overview */}
          <div style={{ maxWidth: '960px', margin: '0 auto 40px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#588078', letterSpacing: '0.8px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              OUR METALLURGICAL LEGACY
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, color: '#304050', marginBottom: '18px', lineHeight: 1.25 }}>
              Engineering Trust &amp; Metallurgical Excellence Since 1991
            </h2>
            <p style={{ fontSize: '1.02rem', color: '#475569', lineHeight: 1.7, marginBottom: '14px' }}>
              Founded in 1991, <strong>Jyoti Metal India</strong> has evolved into one of the country's most reliable manufacturers, stockists, and global exporters of high-grade Stainless Steel, Nickel Alloys, Titanium, Duplex, Carbon Steel, Gasketing Solutions, and Structural Steel products.
            </p>
            <p style={{ fontSize: '0.98rem', color: '#64748B', lineHeight: 1.7, margin: 0 }}>
              Operating advanced continuous casting foundries and CNC laser fabrication units certified under ISO 9001:2015, we maintain 100% heat-lot chemistry traceability to serve critical defense, aerospace, nuclear power, oil &amp; gas, and heavy infrastructure sectors worldwide.
            </p>
          </div>

          {/* Mission, Vision & Values Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div
              style={{
                background: '#FFFFFF',
                border: '1px solid #CBD5E1',
                borderTop: '4px solid #588078',
                padding: '28px 24px',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.03)',
              }}
            >
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#588078', letterSpacing: '0.6px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                PURPOSE
              </span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#304050', marginBottom: '10px' }}>
                Our Mission
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#64748B', lineHeight: 1.6, margin: 0 }}>
                To deliver certified zero-defect metallurgical products with complete chemical traceability, competitive lead times, and uncompromised technical integrity across global markets.
              </p>
            </div>

            <div
              style={{
                background: '#FFFFFF',
                border: '1px solid #CBD5E1',
                borderTop: '4px solid #588078',
                padding: '28px 24px',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.03)',
              }}
            >
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#588078', letterSpacing: '0.6px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                ASPIRATION
              </span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#304050', marginBottom: '10px' }}>
                Our Vision
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#64748B', lineHeight: 1.6, margin: 0 }}>
                To be the world's most trusted partner for high-performance alloy stockholding, advanced structural steel supply, and custom engineering fabrication.
              </p>
            </div>

            <div
              style={{
                background: '#FFFFFF',
                border: '1px solid #CBD5E1',
                borderTop: '4px solid #588078',
                padding: '28px 24px',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.03)',
              }}
            >
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#588078', letterSpacing: '0.6px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                PRINCIPLES
              </span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#304050', marginBottom: '10px' }}>
                Core Values
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#64748B', lineHeight: 1.6, margin: 0 }}>
                Absolute Spectral Purity, EN 10204 3.1/3.2 Certification, Customer-Centric SLA Execution, and Sustainable Electric Arc Furnace Melting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Side-by-Side Section: Timeline Accordion (Left) & 4-Pillars 2x2 Grid (Right) */}
      <section style={{ padding: '52px 0', background: '#FFFFFF', borderBottom: '1px solid #E0E8E8' }}>
        <div className="container" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 20px' }}>
          <div className="grid-responsive-about" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '36px', alignItems: 'start' }}>
            
            {/* LEFT COLUMN: Timeline Accordion (Compact when collapsed, scrollable when open) */}
            <div>
              <div style={{ marginBottom: '24px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#588078', letterSpacing: '0.8px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  HERITAGE &amp; EVOLUTION
                </span>
                <h2 style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2.1rem)', fontWeight: 800, color: '#304050', marginBottom: '8px', lineHeight: 1.25 }}>
                  Our Growth &amp; Engineering Timeline
                </h2>
                <p style={{ color: '#7C8894', fontSize: '0.92rem', margin: 0 }}>
                  Click or scroll down to expand our 35-year metallurgical milestones (1991 – 2026).
                </p>
              </div>

              {/* Master Accordion Card */}
              <div className="single-accordion-wrapper" ref={timelineRef}>
                <div className="single-accordion-layer-2" />
                <div className="single-accordion-layer-1" />

                <div className="single-accordion-main">
                  {/* Accordion Header Strip */}
                  <div
                    onClick={() => setIsTimelineOpen(!isTimelineOpen)}
                    style={{
                      padding: '22px 26px',
                      background: '#FFFFFF',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '16px',
                    }}
                  >
                    <div>
                      <h3 style={{ fontSize: '1.08rem', fontWeight: 800, color: '#304050', margin: 0, letterSpacing: '0.4px' }}>
                        COMPLETE METALLURGICAL TIMELINE (1991 – 2026)
                      </h3>
                      <p style={{ fontSize: '0.84rem', color: '#7C8894', margin: '4px 0 0 0' }}>
                        {isTimelineOpen ? 'Click to collapse timeline' : 'Click to expand 6 engineering milestones'}
                      </p>
                    </div>
                    <ChevronDown
                      size={22}
                      color="#588078"
                      style={{
                        transform: isTimelineOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 300ms ease',
                      }}
                    />
                  </div>

                  {/* Accordion Expanded Body */}
                  <div
                    style={{
                      maxHeight: isTimelineOpen ? '380px' : '0px',
                      opacity: isTimelineOpen ? 1 : 0,
                      overflowY: isTimelineOpen ? 'auto' : 'hidden',
                      transition: 'max-height 450ms ease, opacity 350ms ease',
                      borderTop: isTimelineOpen ? '1px solid #E0E8E8' : '1px solid transparent',
                      background: '#FFFFFF',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {timelineMilestones.map((item, idx) => (
                        <div
                          key={item.year}
                          className="timeline-row-item"
                          style={{
                            padding: '14px 18px',
                            borderBottom: idx < timelineMilestones.length - 1 ? '1px solid #E0E8E8' : 'none',
                            display: 'grid',
                            gridTemplateColumns: '60px 1fr 95px',
                            gap: '12px',
                            alignItems: 'center',
                          }}
                        >
                          <div>
                            <span className="timeline-year-text" style={{ fontSize: '1.45rem', fontWeight: 800, color: '#304050', lineHeight: 1 }}>
                              {item.year}
                            </span>
                          </div>
                          <div>
                            <h4 style={{ fontSize: '0.94rem', fontWeight: 700, color: '#304050', marginBottom: '3px', lineHeight: 1.28 }}>
                              {item.title}
                            </h4>
                            <p style={{ fontSize: '0.82rem', color: '#7C8894', lineHeight: 1.45, margin: 0 }}>
                              {item.desc}
                            </p>
                          </div>
                          <div style={{ width: '95px', height: '64px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #CBD5E1', flexShrink: 0 }}>
                            <img
                              src={item.image}
                              alt={item.title}
                              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
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
                        opacity: 0.3,
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
              <div
                key={cert.code}
                style={{
                  position: 'relative',
                  height: '420px',
                  overflow: 'hidden',
                  borderRadius: '0px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
                  cursor: 'pointer',
                  border: '1px solid #E0E8E8',
                  transition: 'transform 300ms ease, box-shadow 300ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 16px 36px rgba(0, 0, 0, 0.16)';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.06)';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1)';
                }}
              >
                {/* Background Image */}
                <img
                  src={cert.image}
                  alt={cert.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 400ms cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />

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
