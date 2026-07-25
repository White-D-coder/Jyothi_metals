import React, { useState } from 'react';
import {
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Scissors,
  Flame,
  ScanLine,
  Thermometer,
  Hammer,
  Ship,
  MessagesSquare,
  Layers,
  Cpu,
  ShieldCheck,
  Globe2,
  Gauge,
  Clock,
  Boxes,
  Headphones,
} from 'lucide-react';

interface ServicesPageProps {
  onOpenQuoteModal: () => void;
  onNavigate?: (tab: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenQuoteModal, onNavigate }) => {
  const [activeService, setActiveService] = useState<number>(-1);

  const coreServices = [
    {
      icon: <Scissors size={24} />,
      title: 'Custom Laser Cutting & CNC Milling',
      desc: 'Multi-axis TruLaser cells and 5-axis CNC centers deliver sub-micron tolerance profiles cut directly from your CAD files.',
    },
    {
      icon: <Flame size={24} />,
      title: 'Continuous Electric Arc Casting',
      desc: 'Zero-carbon electric arc furnaces produce ultra-clean billets, blooms and slabs across 200+ certified alloy grades.',
    },
    {
      icon: <ScanLine size={24} />,
      title: 'Ultrasonic Weld Inspection & NDT',
      desc: 'Phased-array ultrasonic, X-ray and dye-penetrant NDT verify 100% weld integrity before any component leaves the floor.',
    },
    {
      icon: <Thermometer size={24} />,
      title: 'Heat Treatment & Vacuum Annealing',
      desc: 'Computer-controlled vacuum annealing and quench lines tune grain structure, hardness and residual stress to spec.',
    },
    {
      icon: <Hammer size={24} />,
      title: 'Custom Fabrication & Forming',
      desc: 'Press-braking, rolling, welding and bespoke assembly turn raw stock into finished fabricated structures and skids.',
    },
    {
      icon: <Ship size={24} />,
      title: 'Global Logistics & Warehousing',
      desc: 'Redundant port-side inventory and real-time tracking guarantee rapid 48-hour container dispatch worldwide.',
    },
  ];

  const processSteps = [
    {
      num: '01',
      icon: <MessagesSquare size={22} color="#51847D" />,
      title: 'Technical Consultation',
      desc: 'Our metallurgists review your drawings, tolerances and service environment to scope the ideal manufacturing route.',
    },
    {
      num: '02',
      icon: <Layers size={22} color="#51847D" />,
      title: 'Material Selection & Grade Advisory',
      desc: 'We recommend the optimal alloy grade and temper, balancing mechanical performance, corrosion resistance and cost.',
    },
    {
      num: '03',
      icon: <Cpu size={22} color="#51847D" />,
      title: 'Precision Manufacturing',
      desc: 'Casting, laser cutting, machining and forming run on calibrated lines with full heat-lot traceability at every stage.',
    },
    {
      num: '04',
      icon: <ShieldCheck size={22} color="#51847D" />,
      title: 'Quality Assurance & Testing',
      desc: 'Spectral chemistry, tensile, impact and ultrasonic NDT validate every batch against EN 10204 3.1 / 3.2 standards.',
    },
    {
      num: '05',
      icon: <Globe2 size={22} color="#51847D" />,
      title: 'Global Dispatch & Support',
      desc: 'Certified shipments dispatch from port-side warehouses with dedicated engineering support through installation.',
    },
  ];

  const stats = [
    { icon: <Gauge size={26} color="#77b8b0" />, value: '±0.01mm', label: 'Machining Tolerance' },
    { icon: <Clock size={26} color="#77b8b0" />, value: '48h', label: 'Standard Turnaround' },
    { icon: <Boxes size={26} color="#77b8b0" />, value: '200+', label: 'Certified Alloy Grades' },
    { icon: <Headphones size={26} color="#77b8b0" />, value: '24/7', label: 'Engineering Support' },
  ];

  const capabilityBullets = [
    'Full heat-lot traceability with Mill Test Certificates (MTC) on every order.',
    'In-house spectral chemistry and positive material identification (PMI).',
    'Vacuum arc remelting for ultra-clean aerospace and defense superalloys.',
    'Bespoke heat-treatment schedules tailored to your exact CAD specifications.',
    'Multi-axis robotic laser cells holding sub-micron dimensional accuracy.',
  ];

  return (
    <div className="inner-page" style={{ background: '#ffffff', minHeight: '100vh' }}>
      {/* 1. Dark Industrial Hero */}
      <section
        className="page-hero"
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.92) 100%), url("/images/pexels-alex-60339926-9878853.jpg")',
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
            <span className="small-label" style={{ color: '#77b8b0' }}>
              END-TO-END METALLURGICAL SERVICES
            </span>
            <h1
              className="hero-title"
              style={{
                fontSize: '3.4rem',
                color: '#ffffff',
                marginBottom: '24px',
                lineHeight: 1.1,
              }}
            >
              Precision Services From Molten Alloy to Finished Component
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
              A single integrated partner for casting, cutting, machining, testing and global delivery.
              We manage every stage in-house so your specifications are met with zero-defect precision.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
              <button
                onClick={onOpenQuoteModal}
                className="btn btn-accent"
                style={{ padding: '16px 36px', fontSize: '1rem', background: '#51847D', borderColor: '#51847D' }}
              >
                Discuss Your Project <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Services Grid */}
      <section className="section bg-white" style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px' }}>
            <span className="small-label">OUR CAPABILITIES</span>
            <h2 className="section-title" style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '16px' }}>
              Core Metallurgical Services
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: 1.7 }}>
              From primary smelting through final inspection, our vertically integrated facilities cover the
              complete manufacturing lifecycle under one accredited roof.
            </p>
          </div>

          <div
            className="grid-responsive-3col"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}
          >
            {coreServices.map((service, idx) => {
              const isActive = activeService === idx;
              return (
                <div
                  key={service.title}
                  onMouseEnter={() => setActiveService(idx)}
                  onMouseLeave={() => setActiveService(-1)}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderTop: '4px solid #51847D',
                    padding: '30px 24px',
                    boxShadow: isActive
                      ? '0 14px 34px rgba(81, 132, 125, 0.16)'
                      : '0 6px 20px rgba(0,0,0,0.04)',
                    transform: isActive ? 'translateY(-4px)' : 'translateY(0)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                >
                  <div className="feature-icon-wrapper">{service.icon}</div>
                  <h3
                    className="card-title"
                    style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}
                  >
                    {service.title}
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: 1.6, marginBottom: '18px' }}>
                    {service.desc}
                  </p>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: '#51847D',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    Learn more
                    <ChevronRight
                      size={16}
                      style={{
                        transform: isActive ? 'translateX(4px)' : 'translateX(0)',
                        transition: 'transform 0.3s ease',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. How We Work — Process Steps */}
      <section
        className="section bg-tint"
        style={{ padding: '100px 0', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px' }}>
            <span className="small-label">HOW WE WORK</span>
            <h2 className="section-title" style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '16px' }}>
              A Proven Five-Stage Engineering Workflow
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: 1.7 }}>
              Every project moves through a disciplined, transparent process — so you always know exactly where
              your order stands from first consultation to final dispatch.
            </p>
          </div>

          <div
            className="grid-responsive-3col"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}
          >
            {processSteps.map((step) => (
              <div
                key={step.num}
                style={{
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderLeft: '4px solid #51847D',
                  padding: '32px 28px',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.04)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '18px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Outfit, sans-serif',
                      fontSize: '2.5rem',
                      fontWeight: 900,
                      color: '#51847D',
                      lineHeight: 1,
                    }}
                  >
                    {step.num}
                  </span>
                  <div className="feature-icon-wrapper" style={{ marginBottom: 0 }}>
                    {step.icon}
                  </div>
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Capabilities / Stats Strip (Dark) */}
      <section style={{ padding: '80px 0', background: '#061221', borderTop: '3px solid #51847D' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
            <span className="small-label" style={{ color: '#77b8b0' }}>
              MEASURABLE PERFORMANCE
            </span>
            <h2 className="section-title" style={{ fontSize: '2.3rem', color: '#ffffff', marginBottom: '12px' }}>
              Engineering You Can Quantify
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.7 }}>
              Backed by calibrated machinery, deep inventory and round-the-clock specialists.
            </p>
          </div>

          <div
            className="grid-responsive-4col inner-stat-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(119, 184, 176, 0.25)',
                  borderTop: '4px solid #51847D',
                  padding: '32px 24px',
                  textAlign: 'center',
                }}
              >
                <div style={{ marginBottom: '14px' }}>{stat.icon}</div>
                <div
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '2.4rem',
                    fontWeight: 900,
                    color: '#ffffff',
                    lineHeight: 1,
                    marginBottom: '8px',
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Image + Text Split — In-house Capability */}
      <section className="section bg-white" style={{ padding: '100px 0', borderTop: '1px solid #e2e8f0' }}>
        <div className="container">
          <div
            className="grid-responsive-about"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '60px', alignItems: 'center' }}
          >
            {/* Image */}
            <div style={{ border: '2px solid #0f172a', background: '#061221' }}>
              <img
                src="/images/precision_parts.png"
                alt="In-house precision machining and inspection cell"
                style={{ width: '100%', height: '460px', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Text */}
            <div>
              <span className="small-label">IN-HOUSE PRECISION</span>
              <h2
                className="section-title"
                style={{ fontSize: '2.4rem', color: '#0f172a', marginBottom: '20px', lineHeight: 1.2 }}
              >
                One Facility, Total Control Over Every Tolerance
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7, marginBottom: '28px' }}>
                Because casting, machining, treatment and testing all happen under our own roof, we eliminate
                subcontractor handoffs — protecting quality, traceability and lead times on even the most
                demanding aerospace and defense contracts.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {capabilityBullets.map((bullet) => (
                  <div key={bullet} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <CheckCircle2 size={20} color="#51847D" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.98rem', color: '#334155', lineHeight: 1.5 }}>{bullet}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '36px' }}>
                <button
                  onClick={onOpenQuoteModal}
                  className="btn btn-outline"
                  style={{ padding: '14px 30px', fontSize: '0.95rem' }}
                >
                  Request a Capability Statement <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Final CTA Band (Dark) */}
      <section
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(6, 18, 33, 0.94) 0%, rgba(6, 18, 33, 0.82) 100%), url("/images/pexels-sergey-sergeev-2153675005-32845683.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#ffffff',
          padding: '100px 0',
          borderTop: '3px solid #51847D',
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
            <span className="small-label" style={{ color: '#77b8b0' }}>
              LET&apos;S BUILD IT TOGETHER
            </span>
            <h2 className="section-title" style={{ fontSize: '2.7rem', color: '#ffffff', marginBottom: '20px' }}>
              Ready to Move Your Project Into Production?
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '40px' }}>
              Share your drawings or specifications and our engineering team will return a detailed,
              grade-specific quote — typically within one business day.
            </p>
            <div
              style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}
            >
              <button
                onClick={onOpenQuoteModal}
                className="btn btn-accent"
                style={{ padding: '16px 36px', fontSize: '1rem', background: '#51847D', borderColor: '#51847D' }}
              >
                Get Instant Quote <ArrowRight size={18} />
              </button>
              <button
                onClick={() => onNavigate && onNavigate('contact')}
                className="btn btn-outline"
                style={{ padding: '16px 36px', fontSize: '1rem', borderColor: '#77b8b0', color: '#ffffff' }}
              >
                Contact Engineering Team <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
