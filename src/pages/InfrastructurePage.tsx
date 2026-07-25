import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowDown,
  ChevronRight,
  Factory,
  Flame,
  Cpu,
  Layers,
  Gauge,
  FlaskConical,
  Warehouse,
  CheckCircle2,
  Recycle,
  ShieldCheck,
  Timer,
  Maximize2,
} from 'lucide-react';

interface InfrastructurePageProps {
  onOpenQuoteModal: () => void;
  onNavigate?: (tab: string) => void;
}

interface CapacityStat {
  countTo?: number;
  comma?: boolean;
  suffix?: string;
  staticValue?: string;
  label: string;
}

export const InfrastructurePage: React.FC<InfrastructurePageProps> = ({ onOpenQuoteModal, onNavigate }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const capacityRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const countedRef = useRef(false);

  const [activeGalleryIdx, setActiveGalleryIdx] = useState<number>(-1);
  const [capacityVisible, setCapacityVisible] = useState(false);
  const [timelineDrawn, setTimelineDrawn] = useState(false);

  const heroTitle = 'A 120,000 m² Integrated Manufacturing Hub';

  const heroChips = [
    { icon: <Factory size={15} color="#77b8b0" />, text: '120,000 m² Plant' },
    { icon: <ShieldCheck size={15} color="#77b8b0" />, text: 'ISO 9001:2015 Certified' },
    { icon: <Timer size={15} color="#77b8b0" />, text: '48-Hour Global Dispatch' },
  ];

  const processSteps = [
    { icon: <Flame size={24} />, label: 'Melt', sub: 'Vacuum Arc Remelting' },
    { icon: <Gauge size={24} />, label: 'Cast', sub: 'Continuous Casting' },
    { icon: <Layers size={24} />, label: 'Roll', sub: 'Hot & Cold Rolling' },
    { icon: <Cpu size={24} />, label: 'Machine', sub: 'Multi-Axis CNC' },
    { icon: <FlaskConical size={24} />, label: 'Inspect', sub: 'Spectrometry & NDT' },
    { icon: <Warehouse size={24} />, label: 'Dispatch', sub: '48h Logistics' },
  ];

  const equipment = [
    {
      icon: <Flame size={26} />,
      title: 'Vacuum Arc Remelting Furnaces',
      desc: 'Twin 12-ton VAR furnaces producing ultra-clean titanium and nickel superalloy ingots with <5 ppm oxygen.',
    },
    {
      icon: <Cpu size={26} />,
      title: 'Multi-Axis CNC Laser Cells',
      desc: '30+ fiber-laser TruLaser robotic cells delivering sub-0.05 mm tolerance profiles up to 40 mm thickness.',
    },
    {
      icon: <Layers size={26} />,
      title: 'Hot & Cold Rolling Mills',
      desc: 'Reversible 4-high rolling lines calibrated for 0.3–120 mm gauges with automated thickness feedback.',
    },
    {
      icon: <Gauge size={26} />,
      title: 'Continuous Casting Lines',
      desc: 'Six casting strands with electromagnetic stirring producing billets, blooms and slabs at 850k+ tons/yr.',
    },
    {
      icon: <FlaskConical size={26} />,
      title: 'Spectrometry & NDT Lab',
      desc: 'Optical emission spectrometry, ultrasonic and X-ray NDT with 100% positive material identification.',
    },
    {
      icon: <Warehouse size={26} />,
      title: 'Automated Warehousing',
      desc: 'ASRS high-bay storage with barcode heat-lot traceability enabling 48-hour container dispatch worldwide.',
    },
  ];

  const capacityStats: CapacityStat[] = [
    { countTo: 120000, comma: true, suffix: ' m²', label: 'Integrated Floor Area' },
    { countTo: 850, suffix: 'k+', label: 'Tons Cast / Year' },
    { countTo: 6, label: 'Continuous Casting Lines' },
    { countTo: 30, suffix: '+', label: 'Multi-Axis CNC Cells' },
    { staticValue: '24/7', label: 'Operations & Dispatch' },
  ];

  const [counts, setCounts] = useState<number[]>(capacityStats.map(() => 0));

  const gallery = [
    { image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg', caption: 'Casting Bay' },
    { image: '/images/pexels-alex-60339926-9878853.jpg', caption: 'Laser Cutting Cell' },
    { image: '/images/pexels-eugeniofr-30005294.jpg', caption: 'QA & Spectrometry Lab' },
    { image: '/images/pexels-jakubzerdzicki-33813584.jpg', caption: 'Rolling Mill Line' },
    { image: '/images/pexels-tokuo-nobuhiro-79378678-20472153.jpg', caption: 'Warehouse & Dispatch' },
  ];

  const marqueeItems = [
    'Vacuum Arc Remelting',
    'Continuous Casting',
    'Hot & Cold Rolling',
    'Multi-Axis CNC Laser',
    'Ultrasonic NDT',
    'X-Ray Inspection',
    'Heat Treatment',
    'Spectral Chemistry',
    'EN 10204 3.1 / 3.2',
    'Global Logistics',
  ];

  const sustainabilityPoints = [
    '98% circular electric arc recycling of returned scrap and machining swarf into new heats.',
    'Zero-carbon smelting powered by on-site solar arrays and certified renewable grid contracts.',
    'Closed-loop water cooling recovering 90%+ of process water across casting and rolling lines.',
    'Full cradle-to-gate Environmental Product Declarations (EPD) supplied on request.',
  ];

  // Scroll-reveal fade-up + word reveal (scoped to this page)
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll('.infra-reveal, .infra-word'));
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Timeline draw-in when scrolled into view
  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimelineDrawn(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Count-up + bar fill for the capacity band
  useEffect(() => {
    const el = capacityRef.current;
    if (!el) return;
    const targets = capacityStats.map((s) => s.countTo ?? 0);
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !countedRef.current) {
          countedRef.current = true;
          setCapacityVisible(true);
          const duration = 1700;
          let startTs = 0;
          const step = (ts: number) => {
            if (!startTs) startTs = ts;
            const t = Math.min(1, (ts - startTs) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setCounts(targets.map((v) => Math.round(v * eased)));
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderCapacityValue = (stat: CapacityStat, idx: number) => {
    if (stat.staticValue) return stat.staticValue;
    const n = counts[idx] ?? 0;
    const num = stat.comma ? n.toLocaleString('en-US') : String(n);
    return `${num}${stat.suffix ?? ''}`;
  };

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 10).toFixed(2)}deg) translateY(-6px)`;
  };
  const resetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = '';
  };

  return (
    <div ref={rootRef} className="inner-page" style={{ background: '#ffffff', minHeight: '100vh' }}>
      {/* 1. Kinetic Hero */}
      <section
        className="page-hero infra-sheen"
        style={{
          background: '#061221',
          color: '#ffffff',
          padding: '128px 0 96px',
          borderBottom: '3px solid #51847D',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ken Burns background layer */}
        <div
          className="infra-hero-bg"
          style={{
            backgroundImage:
              'linear-gradient(135deg, rgba(6, 18, 33, 0.92) 0%, rgba(6, 18, 33, 0.62) 50%, rgba(6, 18, 33, 0.94) 100%), url("/images/industrial_facility.png")',
          }}
        />
        <div className="infra-sheen-layer" />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '920px', margin: '0 auto', textAlign: 'center' }}>
            <span className="small-label infra-reveal is-visible" style={{ color: '#77b8b0' }}>
              OUR FOUNDRY &amp; PLANT INFRASTRUCTURE
            </span>
            <h1 className="hero-title" style={{ fontSize: '3.7rem', color: '#ffffff', marginBottom: '24px', marginTop: '10px', lineHeight: 1.08 }}>
              {heroTitle.split(' ').map((word, i) => (
                <span key={`${word}-${i}`} className="infra-word" style={{ transitionDelay: `${i * 65}ms`, marginRight: '0.28em' }}>
                  {word}
                </span>
              ))}
            </h1>
            <p className="infra-reveal is-visible" style={{ fontSize: '1.15rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '32px', maxWidth: '760px', marginLeft: 'auto', marginRight: 'auto', transitionDelay: '350ms' }}>
              Vacuum arc melting, continuous casting, hot &amp; cold rolling and multi-axis CNC machining under one
              roof — full heat-lot traceability from raw charge to finished component.
            </p>

            <div className="infra-reveal is-visible" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginBottom: '36px', transitionDelay: '450ms' }}>
              {heroChips.map((chip) => (
                <span
                  key={chip.text}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(119, 184, 176, 0.35)',
                    padding: '9px 16px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: '#e2e8f0',
                  }}
                >
                  {chip.icon} {chip.text}
                </span>
              ))}
            </div>

            <div className="infra-reveal is-visible" style={{ display: 'flex', justifyContent: 'center', gap: '16px', transitionDelay: '520ms' }}>
              <button onClick={onOpenQuoteModal} className="btn btn-accent" style={{ padding: '16px 36px', fontSize: '1rem', background: '#51847D', borderColor: '#51847D' }}>
                Schedule a Plant Visit <ArrowRight size={18} />
              </button>
            </div>

            <div className="infra-scroll-cue" style={{ marginTop: '48px', display: 'flex', justifyContent: 'center', color: '#77b8b0' }}>
              <ArrowDown size={26} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Capabilities Marquee Ticker */}
      <section style={{ background: '#0b1b2e', borderBottom: '1px solid rgba(119,184,176,0.2)', padding: '18px 0' }}>
        <div className="marquee-container">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '14px', color: '#cbd5e1', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>
                {item}
                <span style={{ width: '6px', height: '6px', background: '#51847D', borderRadius: '50%' }} />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Overview Split */}
      <section className="section bg-white" style={{ padding: '100px 0 80px' }}>
        <div className="container">
          <div className="grid-responsive-about" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '60px', alignItems: 'center' }}>
            <div className="infra-reveal">
              <span className="small-label">INSIDE THE PLANT</span>
              <h2 className="section-title" style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '20px', marginTop: '10px', lineHeight: 1.2 }}>
                One Roof, End-to-End Metallurgical Control
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7, marginBottom: '20px' }}>
                Our flagship foundry consolidates every critical process — from primary melt and continuous casting
                through rolling, forging and precision machining — into a single vertically-integrated campus,
                eliminating supply-chain hand-offs and guaranteeing uninterrupted heat-lot traceability.
              </p>
              <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7, marginBottom: '32px' }}>
                Real-time process telemetry feeds a centralized MES, letting our metallurgists fine-tune
                heat-treatment schedules and rolling parameters against your exact CAD files before a single
                component ships.
              </p>

              <div className="grid-responsive-2col" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderLeft: '4px solid #51847D', padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                    <Factory size={26} color="#51847D" style={{ flexShrink: 0 }} />
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Vertically Integrated</h4>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                    Melt, cast, roll and machine, all controlled in-house with zero external hand-offs.
                  </p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderLeft: '4px solid #51847D', padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                    <Gauge size={26} color="#51847D" style={{ flexShrink: 0 }} />
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>850k+ Tons / Year</h4>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                    Sustained annual throughput backed by 24/7 continuous casting operations.
                  </p>
                </div>
              </div>
            </div>

            <div className="infra-reveal" style={{ transitionDelay: '120ms' }}>
              <div className="about-arch-frame-reversed" style={{ border: '2px solid #0f172a', background: '#061221' }}>
                <img src="/images/jm1.jpg" alt="Jyoti Metal India integrated manufacturing hub" style={{ width: '100%', height: '460px', objectFit: 'cover', display: 'block' }} />
                <div
                  className="infra-hero-overlay"
                  style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(6, 18, 33, 0.95), rgba(6, 18, 33, 0.4))', padding: '30px', color: '#ffffff', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Factory size={32} color="#77b8b0" />
                    <div>
                      <div style={{ fontWeight: 900, fontSize: '1.2rem', color: '#ffffff' }}>120,000 m&sup2; Hub</div>
                      <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Integrated casting, rolling &amp; machining</div>
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

      {/* 4. Animated Process Timeline */}
      <section className="section bg-tint" style={{ padding: '100px 0', background: '#f8fafc', borderTop: '1px solid #e2e8f0', position: 'relative', overflow: 'hidden' }}>
        <div className="infra-backdrop-word">PROCESS</div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="infra-reveal" style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 70px' }}>
            <span className="small-label">FROM MELT TO DISPATCH</span>
            <h2 className="section-title" style={{ fontSize: '2.5rem', marginTop: '10px', marginBottom: '16px' }}>
              A Single Continuous Production Line
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem' }}>
              Every order flows through six tightly-integrated stages — each monitored, calibrated and certified
              before the material advances.
            </p>
          </div>

          <div ref={timelineRef} className="infra-timeline-track" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', gap: '10px' }}>
            {/* Connecting line (desktop) */}
            <div className="infra-timeline-line-wrap" style={{ position: 'absolute', top: '34px', left: '6%', right: '6%', height: '3px', background: '#e2e8f0', zIndex: 0 }}>
              <div className={`infra-timeline-progress ${timelineDrawn ? 'is-drawn' : ''}`} style={{ height: '100%', width: '100%', background: 'linear-gradient(90deg, #51847D, #77b8b0)' }} />
            </div>

            {processSteps.map((step, idx) => (
              <div
                key={step.label}
                className="infra-timeline-node infra-reveal"
                style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 1, transitionDelay: `${idx * 120}ms` }}
              >
                <div
                  className={`infra-node-ring ${timelineDrawn ? 'is-lit' : ''}`}
                  style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    border: '2px solid #51847D',
                    color: '#51847D',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 8px 20px rgba(81,132,125,0.15)',
                    animationDelay: `${idx * 0.25}s`,
                  }}
                >
                  {step.icon}
                </div>
                <div className="infra-node-labels" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '16px' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.1em', marginBottom: '4px' }}>
                    STEP 0{idx + 1}
                  </div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>
                    {step.label}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '2px' }}>{step.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Equipment — 3D Tilt Cards */}
      <section className="section bg-white" style={{ padding: '100px 0', borderTop: '1px solid #e2e8f0' }}>
        <div className="container">
          <div className="infra-reveal" style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 60px' }}>
            <span className="small-label">EQUIPMENT &amp; MACHINERY</span>
            <h2 className="section-title" style={{ fontSize: '2.5rem', marginTop: '10px', marginBottom: '16px' }}>
              Aerospace-Grade Machinery, End to End
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem' }}>
              Hover any station to explore the computer-controlled equipment behind each stage of production.
            </p>
          </div>

          <div className="grid-responsive-3col infra-reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {equipment.map((item) => (
              <div
                key={item.title}
                className="infra-tilt-card"
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
                style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderTop: '4px solid #51847D', padding: '32px 28px', boxShadow: '0 6px 20px rgba(0,0,0,0.04)' }}
              >
                <div className="infra-tilt-icon" style={{ width: '54px', height: '54px', background: '#edf5f4', color: '#51847D', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  {item.icon}
                </div>
                <h3 className="card-title" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Plant Capacity — count-up + fill bars */}
      <section style={{ background: '#061221', padding: '90px 0', borderTop: '3px solid #51847D', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="infra-reveal" style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 55px' }}>
            <span className="small-label" style={{ color: '#77b8b0' }}>PLANT CAPACITY AT A GLANCE</span>
            <h2 className="section-title" style={{ fontSize: '2.4rem', color: '#ffffff', marginTop: '10px' }}>
              Built for High-Volume, Zero-Defect Output
            </h2>
          </div>
          <div ref={capacityRef} className="grid-responsive-4col infra-capacity-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '24px' }}>
            {capacityStats.map((stat, idx) => (
              <div
                key={stat.label}
                className="capacity-item"
                style={{ textAlign: 'center', padding: '24px 16px', borderLeft: idx === 0 ? 'none' : '1px solid rgba(255,255,255,0.1)' }}
              >
                <div className="capacity-value" style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.6rem', fontWeight: 900, color: '#ffffff', lineHeight: 1.1 }}>
                  {renderCapacityValue(stat, idx)}
                </div>
                <div className="capacity-label" style={{ fontSize: '0.85rem', fontWeight: 700, color: '#77b8b0', letterSpacing: '0.04em', textTransform: 'uppercase', marginTop: '10px' }}>
                  {stat.label}
                </div>
                {/* animated fill bar */}
                <div style={{ height: '3px', background: 'rgba(255,255,255,0.10)', marginTop: '16px' }}>
                  <div
                    className="infra-cap-bar-fill"
                    style={{ height: '100%', background: 'linear-gradient(90deg, #51847D, #77b8b0)', width: capacityVisible ? '100%' : '0%', transitionDelay: `${idx * 110}ms` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Facility Gallery — Mosaic */}
      <section className="section bg-white" style={{ padding: '90px 0', borderTop: '1px solid #e2e8f0', position: 'relative', overflow: 'hidden' }}>
        <div className="infra-backdrop-word" style={{ left: '-18px', right: 'auto' }}>GALLERY</div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="infra-reveal" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px' }}>
            <span className="small-label">FACILITY GALLERY</span>
            <h2 className="section-title" style={{ fontSize: '2.5rem', marginTop: '10px', marginBottom: '16px' }}>
              A Walk Through Our Production Floor
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem' }}>
              From the casting bay to final dispatch, explore the environments where precision alloys take shape.
            </p>
          </div>

          <div
            className="grid-responsive-3col infra-reveal"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridAutoRows: '200px', gap: '18px' }}
          >
            {gallery.map((item, idx) => (
              <div
                key={item.caption}
                className={`infra-gallery-card ${idx === 0 ? 'infra-mosaic-feature' : ''}`}
                style={{ height: 'auto' }}
                onMouseEnter={() => setActiveGalleryIdx(idx)}
                onMouseLeave={() => setActiveGalleryIdx(-1)}
              >
                <img src={item.image} alt={item.caption} />
                <div
                  className="infra-gallery-btn"
                  style={{ position: 'absolute', top: '16px', right: '16px', width: '42px', height: '42px', borderRadius: '50%', background: '#ffffff', color: '#061221', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 16px rgba(0,0,0,0.25)', zIndex: 3 }}
                >
                  <Maximize2 size={18} />
                </div>
                <div
                  style={{ position: 'absolute', inset: 0, background: activeGalleryIdx === idx ? 'linear-gradient(to top, rgba(6, 18, 33, 0.85), rgba(6, 18, 33, 0.1))' : 'linear-gradient(to top, rgba(6, 18, 33, 0.7), rgba(6, 18, 33, 0.0))', transition: 'background 0.4s ease', display: 'flex', alignItems: 'flex-end', padding: '20px', zIndex: 2 }}
                >
                  <div className="infra-gallery-caption" style={{ color: '#ffffff', fontWeight: 800, fontSize: '1.05rem', borderLeft: '3px solid #51847D', paddingLeft: '12px', transition: 'color 0.3s ease' }}>
                    {item.caption}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Sustainability Split */}
      <section className="section bg-tint" style={{ padding: '100px 0', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
        <div className="container">
          <div className="grid-responsive-about" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div className="infra-reveal">
              <div className="about-arch-frame-left" style={{ border: '2px solid #0f172a', background: '#061221' }}>
                <img src="/images/pexels-jakubzerdzicki-33813584.jpg" alt="Zero-carbon electric arc recycling furnace" style={{ width: '100%', height: '480px', objectFit: 'cover', display: 'block' }} />
              </div>
            </div>

            <div className="infra-reveal" style={{ transitionDelay: '100ms' }}>
              <span className="small-label">SUSTAINABLE METALLURGY</span>
              <h2 className="section-title" style={{ fontSize: '2.5rem', color: '#0f172a', marginTop: '10px', marginBottom: '20px', lineHeight: 1.2 }}>
                98% Circular, Zero-Carbon Smelting
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7, marginBottom: '28px' }}>
                Our electric arc recycling program transforms returned scrap and machining swarf back into
                certified heats, dramatically cutting carbon intensity without compromising alloy purity.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                {sustainabilityPoints.map((point) => (
                  <div key={point} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <CheckCircle2 size={22} color="#51847D" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.98rem', color: '#334155', lineHeight: 1.6 }}>{point}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#ffffff', border: '1px solid #cbd5e1', borderLeft: '4px solid #51847D', padding: '16px 22px' }}>
                <Recycle size={26} color="#51847D" />
                <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '1rem' }}>Carbon intensity reduced by 65% since 2020</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Final CTA Band */}
      <section
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(6, 18, 33, 0.95) 0%, rgba(6, 18, 33, 0.82) 100%), url("/images/pexels-sergey-sergeev-2153675005-32845683.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '90px 0',
          borderTop: '3px solid #51847D',
        }}
      >
        <div className="container">
          <div className="infra-reveal" style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
            <span className="small-label" style={{ color: '#77b8b0' }}>PARTNER WITH OUR FOUNDRY</span>
            <h2 className="section-title" style={{ fontSize: '2.6rem', color: '#ffffff', marginTop: '10px', marginBottom: '20px' }}>
              Ready to Tour the Plant or Spec Your Next Program?
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '36px' }}>
              Request a full capability statement detailing our equipment envelope, certifications and capacity,
              or reach out to our engineering team to discuss your project requirements.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <button onClick={onOpenQuoteModal} className="btn btn-accent" style={{ padding: '16px 36px', fontSize: '1rem', background: '#51847D', borderColor: '#51847D' }}>
                Request a Capability Statement <ArrowRight size={18} />
              </button>
              <button onClick={() => onNavigate && onNavigate('contact')} className="btn btn-outline" style={{ padding: '16px 36px', fontSize: '1rem', color: '#ffffff', borderColor: '#ffffff' }}>
                Contact Us <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
