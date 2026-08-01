import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Cpu,
  Layers,
  Zap,
  CheckCircle2,
} from 'lucide-react';
import { CapabilityNav } from '../components/CapabilityNav';

interface LaserCuttingPageProps {
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
  { label: 'Cutting Precision', value: '±0.01 mm', sub: 'Sub-micron optical alignment' },
  { label: 'Max Thickness', value: '60 mm', sub: 'High-density profile capacity' },
  { label: 'Laser Cell Power', value: '6 kW', sub: 'High-speed nitrogen assist' },
  { label: 'CNC Capability', value: '5-Axis', sub: 'Multi-axis vertical milling' },
];

const processHighlights = [
  {
    title: 'Oxide-Free Nitrogen Finish',
    desc: 'Clean, dross-free edge profile ready for direct welding — no post-cut grinding required.',
    icon: Zap,
  },
  {
    title: 'CAD-Direct Machining',
    desc: 'Direct import of STEP, DXF, and DWG schematics into automated optical positioning beds.',
    icon: Cpu,
  },
  {
    title: 'Zero Thermal Distortion',
    desc: 'Controlled beam focal points prevent micro-fracturing and structural strain on alloy plates.',
    icon: Layers,
  },
];

const specifications = [
  { step: 'I', label: 'Cutting Tolerance', value: '±0.01mm (Sub-micron optical alignment)', image: '/images/precision_parts.png' },
  { step: 'II', label: 'Bed Dimensions', value: 'Up to 4000mm x 2000mm full plate bed', image: '/images/titanium_plates.png' },
  { step: 'III', label: 'Material Range', value: 'Stainless Steel (304, 316L, 317L, 321, 310S), Titanium, Inconel, Monel, Duplex', image: '/images/stainless_pipes.png' },
  { step: 'IV', label: 'Thickness Capability', value: '0.5mm to 60mm high-density plate profile cutting', image: '/images/heavy_rolling_mill.jpg' },
  { step: 'V', label: 'Machine Capacity', value: '6kW High-Power Fiber Laser Cells & 5-Axis CNC Milling Centers', image: '/images/cnc_laser_blue.jpg' },
  { step: 'VI', label: 'Edge Finish', value: 'Dross-free nitrogen assist edge finish, ready for immediate welding', image: '/images/flanges_industrial.png' },
];

const equipmentList = [
  {
    title: '6kW TruLaser Fiber Cell',
    image: '/images/precision_parts.png',
    caption: 'High-speed nitrogen laser cutting cell for aerospace grade sheet profiles.',
  },
  {
    title: '5-Axis Heavy CNC Center',
    image: '/images/flanges_industrial.png',
    caption: 'Multi-axis milling center producing high-yield tube sheets and custom flanges.',
  },
  {
    title: 'Optical Laser Profiler',
    image: '/images/titanium_plates.png',
    caption: 'Sub-micron coordinate measuring and automated edge inspection cell.',
  },
];

const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Reveal: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(prefersReducedMotion);

  React.useEffect(() => {
    if (prefersReducedMotion) return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(10px)',
        transition: prefersReducedMotion ? 'none' : `opacity 350ms ease-out ${delay}ms, transform 350ms ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

  const SpecHoverList: React.FC<{ items: typeof specifications }> = ({ items }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  return (
    <div style={{ borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
      {items.map((spec, index) => {
        const isHovered = hoveredIndex === index;
        return (
          <div
            key={spec.label}
            onMouseEnter={() => setHoveredIndex(index)}
            style={{
              position: 'relative',
              padding: isHovered ? '26px 0' : '20px 0',
              borderBottom: index < items.length - 1 ? '1px solid #E2E8F0' : 'none',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'all 250ms ease',
              overflow: 'hidden',
            }}
          >
            {/* Image Thumbnail (Reveals/Expands on Hover) */}
            <div
              style={{
                width: isHovered ? '150px' : '0px',
                height: '92px',
                marginRight: isHovered ? '24px' : '0px',
                opacity: isHovered ? 1 : 0,
                overflow: 'hidden',
                borderRadius: '8px',
                flexShrink: 0,
                transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                zIndex: 2,
              }}
            >
              <img
                src={spec.image}
                alt={spec.label}
                style={{
                  width: '150px',
                  height: '92px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>

            {/* Low Opacity Background Watermark Roman Numeral Behind Title */}
            <div
              style={{
                position: 'absolute',
                left: isHovered ? '170px' : '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '4.5rem',
                fontWeight: 900,
                fontFamily: 'Outfit, serif',
                color: isHovered ? '#588078' : '#94A3B8',
                opacity: isHovered ? 0.18 : 0.10,
                userSelect: 'none',
                pointerEvents: 'none',
                zIndex: 0,
                transition: 'all 300ms ease',
              }}
            >
              {spec.step}
            </div>

            {/* Title / Label (BOLD UPPERCASE) */}
            <div
              style={{
                fontSize: '1.8rem',
                fontWeight: 800,
                letterSpacing: '0.4px',
                textTransform: 'uppercase',
                color: isHovered ? '#0F172A' : '#334155',
                flex: 1,
                paddingRight: '24px',
                position: 'relative',
                zIndex: 1,
                transition: 'color 200ms ease',
              }}
            >
              {spec.label}
            </div>

            {/* Description Value */}
            <div
              style={{
                fontSize: '1.02rem',
                fontWeight: 500,
                color: isHovered ? '#0F172A' : '#64748B',
                lineHeight: 1.55,
                maxWidth: '450px',
                paddingRight: '28px',
                transition: 'color 200ms ease',
              }}
            >
              {spec.value}
            </div>

            {/* Arrow Circle */}
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border: isHovered ? '1px solid #588078' : '1px solid #CBD5E1',
                background: isHovered ? '#588078' : 'transparent',
                color: isHovered ? '#FFFFFF' : '#64748B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 250ms ease',
                transform: isHovered ? 'translate(2px, -2px)' : 'none',
              }}
            >
              <ArrowUpRight size={22} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const LaserCuttingPage: React.FC<LaserCuttingPageProps> = ({ onOpenQuoteModal }) => {
  const navigate = useNavigate();

  return (
    <div className="laser-page-root" style={{ background: COLORS.bg, minHeight: '100vh', color: COLORS.text }}>
      <style>{`
        .laser-page-root {
          font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
        }

        .process-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: ${COLORS.divider};
          border: 1px solid ${COLORS.divider};
          margin-top: 28px;
        }
        .process-card {
          background: ${COLORS.panel};
          padding: 24px;
        }

        .equipment-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1px;
          background: ${COLORS.divider};
          border: 1px solid ${COLORS.divider};
        }
        .equipment-card {
          background: ${COLORS.panel};
          display: flex;
          flex-direction: column;
        }

        .spec-table-row {
          display: grid;
          grid-template-columns: 240px 1fr;
          padding: 18px 24px;
          margin: 0 -32px;
          border-bottom: 1px solid ${COLORS.divider};
          transition: background-color 200ms ease, padding-left 200ms ease;
          cursor: pointer;
        }
        .spec-table-row:hover {
          background-color: #EDF5F4;
          padding-left: 32px;
        }
        .spec-table-row:hover > div:first-child {
          color: ${COLORS.accent};
        }
        .spec-table-row:last-child { border-bottom: none; }

        @media (max-width: 1024px) {
          .feature-split-grid { grid-template-columns: 1fr; gap: 32px; }
          .hero-stats-grid { grid-template-columns: repeat(2, 1fr); row-gap: 20px; }
        }

        @media (max-width: 768px) {
          .process-cards-grid { grid-template-columns: 1fr; }
          .spec-table-row { grid-template-columns: 1fr; gap: 4px; }
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
          backgroundImage: 'linear-gradient(120deg, rgba(0, 0, 0, 0.6) 0%), url("/images/pexels-pppsdavid-5851494.jpg")',
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
              Custom Laser Cutting &amp; CNC Milling
            </h1>

            <p style={{ fontSize: '1.08rem', color: '#CBD5E1', lineHeight: 1.65, marginBottom: '28px', letterSpacing: '0.3px' }}>
              Multi-axis TruLaser cells and 5-axis CNC machining centers deliver sub-micron precision profiles engineered directly from client CAD schematics.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => onOpenQuoteModal('Laser Cut & Machined Plate')}
                className="btn btn-primary mobile-full-btn"
                style={{ padding: '14px 28px', fontSize: '0.9rem' }}
              >
                Request a Quote <ArrowRight size={18} />
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
      <CapabilityNav currentPath="/services/laser-cutting" showQualityTabs={false} />

      {/* 3. Section 1: Feature Split Showcase */}
      <section style={{ padding: '60px 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <Reveal>
            <div className="feature-split-grid">
              {/* Photo side */}
              <div style={{ border: `1px solid ${COLORS.divider}`, overflow: 'hidden', background: COLORS.panel }}>
                <img
                  src="/images/precision_parts.png"
                  alt="Multi-axis laser cutting machinery"
                  style={{ width: '100%', height: '400px', objectFit: 'cover', display: 'block' }}
                />
              </div>

              {/* Text side */}
              <div>
                <h2 style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.0rem)', fontWeight: 700, color: COLORS.text, marginBottom: '18px', lineHeight: 1.25 }}>
                  Sub-Micron Dimensional Cutting &amp; High-Yield Machining
                </h2>
                <p style={{ fontSize: '0.98rem', color: COLORS.textMuted, lineHeight: 1.7, marginBottom: '16px' }}>
                  Jyoti Metal India operates multi-axis fiber laser cutting beds integrated with heavy 5-axis CNC vertical milling centers. Our laser cutting technology utilizes high-purity nitrogen assist gas to produce 100% dross-free, oxide-free precision edges on stainless steel, nickel alloys, and titanium plates up to 60mm thick.
                </p>
                <p style={{ fontSize: '0.98rem', color: COLORS.textMuted, lineHeight: 1.7, marginBottom: '24px' }}>
                  Whether processing high-volume tube sheet plates for heat exchangers or custom structural gussets for offshore platforms, every cut is executed under automated optical calibration, ensuring tight tolerance repeatability across entire mill batches with zero heat distortion.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem', fontWeight: 600, color: COLORS.text }}>
                    <CheckCircle2 size={18} color={COLORS.accent} /> 100% Nitrogen assist gas preventing edge oxide scale
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem', fontWeight: 600, color: COLORS.text }}>
                    <CheckCircle2 size={18} color={COLORS.accent} /> Direct CAD schematics import (STEP, DXF, DWG)
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem', fontWeight: 600, color: COLORS.text }}>
                    <CheckCircle2 size={18} color={COLORS.accent} /> Integrated coordinate measuring &amp; PMI heat validation
                  </div>
                </div>
              </div>
            </div>

            {/* Process cards 3-grid */}
            <div className="process-cards-grid">
              {processHighlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="process-card">
                    <Icon size={24} color={COLORS.accent} style={{ marginBottom: '14px' }} />
                    <div style={{ fontWeight: 700, fontSize: '1rem', color: COLORS.text, marginBottom: '8px' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '0.86rem', color: COLORS.textMuted, lineHeight: 1.55 }}>
                      {item.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. Section 2: Technical Specifications Matrix */}
      <section style={{ padding: '60px 0', background: '#FFFFFF', borderTop: `1px solid ${COLORS.divider}`, borderBottom: `1px solid ${COLORS.divider}` }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <Reveal>
            <div style={{ maxWidth: '750px', marginBottom: '28px' }}>
              <h2 style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.0rem)', fontWeight: 700, color: COLORS.text, marginBottom: '12px' }}>
                Cutting &amp; Milling Technical Specifications
              </h2>
              <p style={{ fontSize: '0.96rem', color: COLORS.textMuted, lineHeight: 1.65 }}>
                Rigid machine calibration and multi-axis optics handle high-density alloy profiles with extreme precision.
              </p>
            </div>

            <SpecHoverList items={specifications} />
          </Reveal>
        </div>
      </section>

      {/* 5. Section 3: Equipment Showcase */}
      <section style={{ padding: '60px 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <Reveal>
            <div style={{ maxWidth: '750px', marginBottom: '32px' }}>
              <h2 style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.0rem)', fontWeight: 700, color: COLORS.text, marginBottom: '12px' }}>
                Machinery &amp; Equipment Showcase
              </h2>
              <p style={{ fontSize: '0.96rem', color: COLORS.textMuted, lineHeight: 1.65 }}>
                In-house TruLaser beds and heavy 5-axis CNC centers engineered for heavy industrial throughput.
              </p>
            </div>

            <div className="equipment-grid">
              {equipmentList.map((eq) => (
                <div key={eq.title} className="equipment-card">
                  <div style={{ height: '200px', overflow: 'hidden' }}>
                    <img src={eq.image} alt={eq.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '24px', flexGrow: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '1.05rem', color: COLORS.text, marginBottom: '8px' }}>
                      {eq.title}
                    </div>
                    <div style={{ fontSize: '0.88rem', color: COLORS.textMuted, lineHeight: 1.55 }}>
                      {eq.caption}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6. Light Theme Closing CTA (NO DARK THEME) */}
      <section
        style={{
          background: '#FFFFFF',
          color: COLORS.text,
          padding: '70px 0',
          textAlign: 'center',
        }}
      >
        <div className="container" style={{ maxWidth: '760px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.4vw, 2.3rem)', fontWeight: 700, color: COLORS.text, marginBottom: '14px', lineHeight: 1.25 }}>
            Ready to Submit Your CAD Schematics?
          </h2>
          <p style={{ color: COLORS.textMuted, fontSize: '1.02rem', lineHeight: 1.65, marginBottom: '32px' }}>
            Upload your plate cutting drawing or CAD file to receive an immediate mill-direct quotation.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => onOpenQuoteModal('Laser Cut & Machined Plate')}
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
              Explore Product Catalog
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};