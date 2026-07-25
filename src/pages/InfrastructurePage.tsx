import React, { useState } from 'react';
import {
  ArrowRight,
  Factory,
  Flame,
  Cpu,
  Layers,
  Gauge,
  FlaskConical,
  Warehouse,
  CheckCircle2,
  Recycle,
  ChevronRight,
} from 'lucide-react';

interface InfrastructurePageProps {
  onOpenQuoteModal: () => void;
  onNavigate?: (tab: string) => void;
}

export const InfrastructurePage: React.FC<InfrastructurePageProps> = ({ onOpenQuoteModal, onNavigate }) => {
  const [activeGalleryIdx, setActiveGalleryIdx] = useState<number>(-1);

  const equipment = [
    {
      icon: <Flame size={30} color="#51847D" />,
      title: 'Vacuum Arc Remelting (VAR) Furnaces',
      desc: 'Twin 12-ton VAR furnaces producing ultra-clean titanium and nickel superalloy ingots with <5 ppm oxygen and minimal non-metallic inclusions.',
    },
    {
      icon: <Cpu size={30} color="#51847D" />,
      title: 'Multi-Axis CNC Laser Cutting Cells',
      desc: '30+ fiber-laser TruLaser robotic cells delivering sub-0.05 mm tolerance profiles across sheet, plate, and tube up to 40 mm thickness.',
    },
    {
      icon: <Layers size={30} color="#51847D" />,
      title: 'Hot & Cold Rolling Mills',
      desc: 'Reversible 4-high hot and cold rolling lines calibrated for 0.3 mm to 120 mm gauges with automated thickness feedback and edge control.',
    },
    {
      icon: <Gauge size={30} color="#51847D" />,
      title: 'Continuous Casting Lines',
      desc: 'Six continuous casting strands with electromagnetic stirring producing billets, blooms, and slabs at 850k+ tons of annual throughput.',
    },
    {
      icon: <FlaskConical size={30} color="#51847D" />,
      title: 'In-House Spectrometry & NDT Lab',
      desc: 'Optical emission spectrometry, ultrasonic and X-ray NDT with 100% positive material identification and EN 10204 3.1/3.2 certification.',
    },
    {
      icon: <Warehouse size={30} color="#51847D" />,
      title: 'Automated Warehousing & Dispatch',
      desc: 'ASRS high-bay warehousing with barcode heat-lot traceability enabling 48-hour container dispatch to global ports.',
    },
  ];

  const capacityStats = [
    { value: '120,000 m²', label: 'Integrated Floor Area' },
    { value: '850k+', label: 'Tons Cast / Year' },
    { value: '6', label: 'Continuous Casting Lines' },
    { value: '30+', label: 'Multi-Axis CNC Cells' },
    { value: '24/7', label: 'Operations & Dispatch' },
  ];

  const gallery = [
    { image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg', caption: 'Casting Bay' },
    { image: '/images/pexels-alex-60339926-9878853.jpg', caption: 'Laser Cutting Cell' },
    { image: '/images/pexels-eugeniofr-30005294.jpg', caption: 'QA & Spectrometry Lab' },
    { image: '/images/pexels-jakubzerdzicki-33813584.jpg', caption: 'Rolling Mill Line' },
    { image: '/images/pexels-tokuo-nobuhiro-79378678-20472153.jpg', caption: 'Warehouse & Dispatch' },
    { image: '/images/pexels-willians-huerta-2157111846-36397988.jpg', caption: 'Structural Fabrication' },
  ];

  const sustainabilityPoints = [
    '98% circular electric arc recycling of returned scrap and machining swarf into new heats.',
    'Zero-carbon smelting powered by on-site solar arrays and certified renewable grid contracts.',
    'Closed-loop water cooling recovering 90%+ of process water across casting and rolling lines.',
    'Full cradle-to-gate Environmental Product Declarations (EPD) supplied on request.',
  ];

  return (
    <div className="inner-page" style={{ background: '#ffffff', minHeight: '100vh' }}>
      {/* 1. Dark Image Hero */}
      <section
        className="page-hero"
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.92) 100%), url("/images/industrial_facility.png")',
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
              OUR FOUNDRY &amp; PLANT INFRASTRUCTURE
            </span>
            <h1
              className="hero-title"
              style={{
                fontSize: '3.6rem',
                color: '#ffffff',
                marginBottom: '24px',
                marginTop: '10px',
                lineHeight: 1.1,
              }}
            >
              A 120,000 m&sup2; Integrated Metallurgical Manufacturing Hub
            </h1>
            <p style={{ fontSize: '1.15rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '36px' }}>
              A vertically-integrated plant uniting vacuum arc melting, continuous casting, hot &amp; cold rolling,
              and multi-axis CNC machining under one roof, delivering full heat-lot traceability from raw
              charge to finished component.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
              <button
                onClick={onOpenQuoteModal}
                className="btn btn-accent"
                style={{ padding: '16px 36px', fontSize: '1rem', background: '#51847D', borderColor: '#51847D' }}
              >
                Schedule a Plant Visit <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Overview Split Section */}
      <section className="section bg-white" style={{ padding: '100px 0 80px' }}>
        <div className="container">
          <div
            className="grid-responsive-about"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '60px', alignItems: 'center' }}
          >
            {/* Left: Narrative + mini feature cards */}
            <div>
              <span className="small-label">INSIDE THE PLANT</span>
              <h2
                className="section-title"
                style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '20px', marginTop: '10px', lineHeight: 1.2 }}
              >
                One Roof, End-to-End Metallurgical Control
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7, marginBottom: '20px' }}>
                Our flagship foundry consolidates every critical process, from primary melt and continuous casting
                through rolling, forging, and precision machining, into a single vertically-integrated campus. This
                eliminates supply-chain hand-offs and guarantees uninterrupted heat-lot traceability.
              </p>
              <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7, marginBottom: '32px' }}>
                Real-time process telemetry feeds a centralized MES, allowing our metallurgists to fine-tune
                heat-treatment schedules and rolling parameters against your exact CAD and specification files
                before a single component ships.
              </p>

              <div
                className="grid-responsive-2col"
                style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}
              >
                <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderLeft: '4px solid #51847D', padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                    <Factory size={26} color="#51847D" style={{ flexShrink: 0 }} />
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                      Vertically Integrated
                    </h4>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                    Melt, cast, roll, and machine, all controlled in-house with zero external hand-offs.
                  </p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderLeft: '4px solid #51847D', padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                    <Gauge size={26} color="#51847D" style={{ flexShrink: 0 }} />
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                      850k+ Tons / Year
                    </h4>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                    Sustained annual throughput backed by 24/7 continuous casting operations.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Arch frame image + stats overlay */}
            <div>
              <div className="about-arch-frame-reversed" style={{ border: '2px solid #0f172a', background: '#061221' }}>
                <img
                  src="/images/jm1.jpg"
                  alt="Jyoti Metal India integrated manufacturing hub"
                  style={{ width: '100%', height: '460px', objectFit: 'cover', display: 'block' }}
                />
                <div
                  className="infra-hero-overlay"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(to top, rgba(6, 18, 33, 0.95), rgba(6, 18, 33, 0.4))',
                    padding: '30px',
                    color: '#ffffff',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '16px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Factory size={32} color="#77b8b0" />
                    <div>
                      <div style={{ fontWeight: 900, fontSize: '1.2rem', color: '#ffffff' }}>120,000 m&sup2; Hub</div>
                      <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                        Integrated casting, rolling &amp; machining
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

      {/* 3. Equipment & Capabilities Grid */}
      <section className="section bg-tint" style={{ padding: '90px 0', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 60px' }}>
            <span className="small-label">EQUIPMENT &amp; CAPABILITIES</span>
            <h2 className="section-title" style={{ fontSize: '2.5rem', marginTop: '10px', marginBottom: '16px' }}>
              Precision Machinery Across Every Process Stage
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem' }}>
              From primary melt to final dispatch, each production stage runs on computer-controlled equipment
              maintained to aerospace-grade calibration standards.
            </p>
          </div>

          <div
            className="grid-responsive-3col"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}
          >
            {equipment.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderTop: '4px solid #51847D',
                  padding: '28px',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.04)',
                }}
              >
                <div className="feature-icon-wrapper" style={{ marginBottom: '18px' }}>
                  {item.icon}
                </div>
                <h3 className="card-title" style={{ color: '#0f172a', marginBottom: '10px' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.92rem', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Plant Capacity Stats Band (Dark) */}
      <section style={{ background: '#061221', padding: '80px 0', borderTop: '3px solid #51847D' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px' }}>
            <span className="small-label" style={{ color: '#77b8b0' }}>
              PLANT CAPACITY AT A GLANCE
            </span>
            <h2 className="section-title" style={{ fontSize: '2.4rem', color: '#ffffff', marginTop: '10px' }}>
              Built for High-Volume, Zero-Defect Output
            </h2>
          </div>
          <div
            className="grid-responsive-4col infra-capacity-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '24px' }}
          >
            {capacityStats.map((stat, idx) => (
              <div
                key={idx}
                className="capacity-item"
                style={{
                  textAlign: 'center',
                  padding: '24px 16px',
                  borderLeft: idx === 0 ? 'none' : '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div className="capacity-value" style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.6rem', fontWeight: 900, color: '#ffffff', lineHeight: 1.1 }}>
                  {stat.value}
                </div>
                <div className="capacity-label" style={{ fontSize: '0.85rem', fontWeight: 700, color: '#77b8b0', letterSpacing: '0.04em', textTransform: 'uppercase', marginTop: '10px' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Facility Gallery */}
      <section className="section bg-white" style={{ padding: '90px 0', borderTop: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px' }}>
            <span className="small-label">FACILITY GALLERY</span>
            <h2 className="section-title" style={{ fontSize: '2.5rem', marginTop: '10px', marginBottom: '16px' }}>
              A Walk Through Our Production Floor
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem' }}>
              From the casting bay to final dispatch, explore the environments where precision alloys take shape.
            </p>
          </div>

          <div
            className="grid-responsive-3col"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}
          >
            {gallery.map((item, idx) => {
              const isHovered = activeGalleryIdx === idx;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setActiveGalleryIdx(idx)}
                  onMouseLeave={() => setActiveGalleryIdx(-1)}
                  style={{
                    position: 'relative',
                    height: '240px',
                    border: '1px solid #cbd5e1',
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.caption}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transform: isHovered ? 'scale(1.06)' : 'scale(1)',
                      transition: 'transform 0.6s ease-out',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: isHovered
                        ? 'linear-gradient(to top, rgba(6, 18, 33, 0.85), rgba(6, 18, 33, 0.15))'
                        : 'linear-gradient(to top, rgba(6, 18, 33, 0.65), rgba(6, 18, 33, 0.0))',
                      transition: 'background 0.4s ease',
                      display: 'flex',
                      alignItems: 'flex-end',
                      padding: '20px',
                    }}
                  >
                    <div
                      style={{
                        color: '#ffffff',
                        fontWeight: 800,
                        fontSize: '1.05rem',
                        letterSpacing: '0.02em',
                        borderLeft: '3px solid #51847D',
                        paddingLeft: '12px',
                      }}
                    >
                      {item.caption}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Sustainability Split (Reverse Layout) */}
      <section className="section bg-tint" style={{ padding: '100px 0', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
        <div className="container">
          <div
            className="grid-responsive-about"
            style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '60px', alignItems: 'center' }}
          >
            {/* Left: Image in left-arch frame */}
            <div>
              <div className="about-arch-frame-left" style={{ border: '2px solid #0f172a', background: '#061221' }}>
                <img
                  src="/images/pexels-jakubzerdzicki-33813584.jpg"
                  alt="Zero-carbon electric arc recycling furnace"
                  style={{ width: '100%', height: '480px', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>

            {/* Right: Sustainability narrative + bullets */}
            <div>
              <span className="small-label">SUSTAINABLE METALLURGY</span>
              <h2
                className="section-title"
                style={{ fontSize: '2.5rem', color: '#0f172a', marginTop: '10px', marginBottom: '20px', lineHeight: 1.2 }}
              >
                98% Circular, Zero-Carbon Smelting
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7, marginBottom: '28px' }}>
                Our electric arc recycling program transforms returned scrap and machining swarf back into
                certified heats, dramatically cutting carbon intensity without compromising alloy purity or
                mechanical performance.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                {sustainabilityPoints.map((point, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <CheckCircle2 size={22} color="#51847D" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.98rem', color: '#334155', lineHeight: 1.6 }}>{point}</span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderLeft: '4px solid #51847D',
                  padding: '16px 22px',
                }}
              >
                <Recycle size={26} color="#51847D" />
                <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '1rem' }}>
                  Carbon intensity reduced by 65% since 2020
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Final CTA Band */}
      <section
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(6, 18, 33, 0.94) 0%, rgba(6, 18, 33, 0.78) 50%, rgba(6, 18, 33, 0.94) 100%), url("/images/industrial_facility.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          padding: '90px 0',
          borderTop: '3px solid #51847D',
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
            <span className="small-label" style={{ color: '#77b8b0' }}>
              PARTNER WITH OUR FOUNDRY
            </span>
            <h2 className="section-title" style={{ fontSize: '2.6rem', color: '#ffffff', marginTop: '10px', marginBottom: '20px' }}>
              Ready to Tour the Plant or Spec Your Next Program?
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '36px' }}>
              Request a full capability statement detailing our equipment envelope, certifications, and capacity,
              or reach out to our engineering team to discuss your project requirements.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <button
                onClick={onOpenQuoteModal}
                className="btn btn-accent"
                style={{ padding: '16px 36px', fontSize: '1rem', background: '#51847D', borderColor: '#51847D' }}
              >
                Request a Capability Statement <ArrowRight size={18} />
              </button>
              <button
                onClick={() => onNavigate && onNavigate('contact')}
                className="btn btn-outline"
                style={{ padding: '16px 36px', fontSize: '1rem', color: '#ffffff', borderColor: '#ffffff' }}
              >
                Contact Us <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
