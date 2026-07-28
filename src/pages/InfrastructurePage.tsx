import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Factory,
  Flame,
  Cpu,
  Layers,
  Gauge,
  FlaskConical,
  CheckCircle2,
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

export const InfrastructurePage: React.FC<InfrastructurePageProps> = ({ onOpenQuoteModal }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const capacityRef = useRef<HTMLDivElement>(null);
  const processTrackRef = useRef<HTMLDivElement>(null);
  const countedRef = useRef(false);

  const [activeGalleryIdx, setActiveGalleryIdx] = useState<number>(-1);
  const [activeProcessIdx, setActiveProcessIdx] = useState<number>(0);

  const heroTitle = 'A 120,000 m² Integrated Manufacturing Hub';

  const processCards = [
    {
      number: '01',
      title: 'Industrial Cleaning & Degreasing',
      sub: 'Surface preparation & scale removal',
      image: '/images/furnace_melt.jpg',
    },
    {
      number: '02',
      title: 'Shot Blasting & Mechanical Profiling',
      sub: 'Mechanical surface profiling',
      image: '/images/heavy_rolling_mill.jpg',
    },
    {
      number: '03',
      title: 'Phosphate & Passivation Coating',
      sub: 'Corrosion resistance treatment',
      image: '/images/cnc_laser_blue.jpg',
    },
    {
      number: '04',
      title: 'Electrostatic Powder Coating',
      sub: 'Precision protective finish',
      image: '/images/cnc_laser_blue.jpg',
    },
    {
      number: '05',
      title: 'Quality Inspection & NDT',
      sub: 'Dimensional & coat check',
      image: '/images/quality_lab.jpg',
    },
    {
      number: '06',
      title: 'Packaging & Global Dispatch',
      sub: 'Secure transit preparation',
      image: '/images/jm1.jpg',
    },
  ];

  const equipment = [
    {
      icon: <Flame size={20} />,
      title: 'Vacuum Arc Remelting Furnaces',
      desc: 'Twin 12-ton VAR furnaces producing ultra-clean titanium and nickel superalloy ingots with <5 ppm oxygen.',
      image: '/images/furnace_melt.jpg',
      tag: 'MELT & REMELT',
    },
    {
      icon: <Cpu size={20} />,
      title: 'Multi-Axis CNC Laser Cells',
      desc: '30+ fiber-laser TruLaser robotic cells delivering sub-0.05 mm tolerance profiles up to 40 mm thickness.',
      image: '/images/cnc_laser_blue.jpg',
      tag: 'LASER & MILLING',
    },
    {
      icon: <Layers size={20} />,
      title: 'Hot & Cold Rolling Mills',
      desc: 'Reversible 4-high rolling lines calibrated for 0.3–120 mm gauges with automated thickness feedback.',
      image: '/images/heavy_rolling_mill.jpg',
      tag: 'PRECISION ROLLING',
    },
    {
      icon: <Gauge size={20} />,
      title: 'Continuous Casting Lines',
      desc: 'Six casting strands with electromagnetic stirring producing billets, blooms and slabs at 850k+ tons/yr.',
      image: '/images/jm1.jpg',
      tag: 'CONTINUOUS CASTING',
    },
    {
      isDarkCallout: true,
      title: 'Machinery Catalogue',
      sub: 'Explore Full Equipment & Tolerance Specs',
    },
    {
      icon: <FlaskConical size={20} />,
      title: 'Spectrometry & NDT Lab',
      desc: 'Optical emission spectrometry, ultrasonic and X-ray NDT with 100% positive material identification.',
      image: '/images/quality_lab.jpg',
      tag: 'QUALITY & TESTING',
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

  // Count-up + bar fill for the capacity band
  useEffect(() => {
    const el = capacityRef.current;
    if (!el) return;
    const targets = capacityStats.map((s) => s.countTo ?? 0);
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !countedRef.current) {
          countedRef.current = true;
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
          <div style={{ maxWidth: '850px', margin: '0 auto', textAlign: 'center' }}>
            <span className="small-label infra-reveal is-visible" style={{ color: '#77b8b0' }}>
              OUR FOUNDRY &amp; PLANT INFRASTRUCTURE
            </span>
            <h1 className="hero-title" style={{ color: '#ffffff', marginBottom: '24px', marginTop: '10px' }}>
              {heroTitle.split(' ').map((word, i) => (
                <span key={`${word}-${i}`} className="infra-word" style={{ transitionDelay: `${i * 65}ms`, marginRight: '0.28em' }}>
                  {word}
                </span>
              ))}
            </h1>
            <p className="infra-reveal is-visible" style={{ fontSize: '1.15rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '36px', maxWidth: '680px', marginLeft: 'auto', marginRight: 'auto', transitionDelay: '350ms' }}>
              Vacuum arc melting, continuous casting, hot &amp; cold rolling and multi-axis CNC machining under one
              roof — full heat-lot traceability from raw charge to finished component.
            </p>
            <div className="infra-reveal is-visible" style={{ display: 'flex', justifyContent: 'center', gap: '16px', transitionDelay: '420ms' }}>
              <button
                onClick={onOpenQuoteModal}
                className="btn btn-accent"
                style={{
                  padding: '16px 36px',
                  fontSize: '1rem',
                  background: '#51847D',
                  borderColor: '#51847D',
                }}
              >
                Schedule a Plant Visit <ArrowRight size={18} />
              </button>
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
                Our flagship foundry consolidates every critical process from primary melt and continuous casting
                through rolling, forging and precision machining into a single vertically-integrated campus
                eliminating supply-chain hand-offs and guaranteeing uninterrupted heat-lot traceability.
              </p>
              <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7, marginBottom: '32px' }}>
                Real time process telemetry feeds a centralized MES, letting our metallurgists fine tune
                heat-treatment schedules and rolling parameters against your exact CAD files before a single
                component ships.
              </p>

              <div className="grid-responsive-2col" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderLeft: '4px solid #51847D', borderRadius: '16px', padding: '24px', boxShadow: '0 6px 20px rgba(0,0,0,0.03)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                    <Factory size={26} color="#51847D" style={{ flexShrink: 0 }} />
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Vertically Integrated</h4>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                    Melt, cast, roll and machine, all controlled in-house with zero external hand-offs.
                  </p>
                </div>
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderLeft: '4px solid #51847D', borderRadius: '16px', padding: '24px', boxShadow: '0 6px 20px rgba(0,0,0,0.03)' }}>
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
              <div className="about-arch-frame-reversed" style={{ overflow: 'hidden', boxShadow: '0 20px 45px rgba(0,0,0,0.14)', background: '#061221' }}>
                <img src="/images/jm1.jpg" alt="Jyoti Metal India integrated manufacturing hub" style={{ width: '100%', height: '460px', objectFit: 'cover', display: 'block' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Horizontal Sliding Process Carousel (Replacing Timeline) */}
      <section
        className="section bg-tint relative overflow-hidden"
        style={{
          padding: '100px 0',
          background: '#F2F3F5',
          borderTop: '1px solid #e2e8f0',
          position: 'relative',
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        {/* Background Watermark */}
        <div className="infra-backdrop-word">PROCESS</div>

        <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="infra-reveal text-center max-w-[760px] mx-auto mb-14">
            <span
              className="small-label block mb-3 text-xs sm:text-sm font-bold uppercase tracking-[0.2em]"
              style={{ color: '#51847D' }}
            >
              FROM MELT TO DISPATCH
            </span>
            <h2
              className="section-title text-4xl sm:text-5xl font-bold tracking-tight mb-4"
              style={{ color: '#0F172A' }}
            >
              A Single Continuous Production Line
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: '#64748b' }}>
              Every order flows through six tightly-integrated stages — each monitored, calibrated and certified before advancing.
            </p>
          </div>

          {/* Horizontal Sliding Track */}
          <div
            ref={processTrackRef}
            style={{
              display: 'flex',
              gap: '32px',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
              paddingTop: '35px',
              paddingBottom: '25px',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            className="hide-scrollbar"
            onScroll={(e) => {
              const el = e.currentTarget;
              const first = el.firstElementChild as HTMLElement | null;
              if (!first) return;
              const step = first.offsetWidth + 32;
              const idx = Math.round(el.scrollLeft / step);
              setActiveProcessIdx(Math.min(processCards.length - 1, Math.max(0, idx)));
            }}
          >
            {processCards.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                style={{
                  flex: '0 0 360px',
                  scrollSnapAlign: 'start',
                  position: 'relative',
                  cursor: 'pointer',
                }}
                className="group"
                onClick={onOpenQuoteModal}
              >
                {/* Absolute Positioned Large White Number overlapping top-left edge */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: '-28px',
                    left: '16px',
                    zIndex: 25,
                    color: '#ffffff',
                    fontSize: '92px',
                    fontWeight: 800,
                    lineHeight: 0.8,
                    letterSpacing: '-0.04em',
                    userSelect: 'none',
                    pointerEvents: 'none',
                    textShadow: '0 4px 16px rgba(0,0,0,0.45)',
                  }}
                >
                  {step.number}
                </div>

                {/* Card Container */}
                <div
                  style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '460px',
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#51847D';
                    e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.14)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#cbd5e1';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)';
                  }}
                >
                  {/* Grayscale High-Contrast Image Wrapper */}
                  <div style={{ position: 'relative', flex: 1, width: '100%', overflow: 'hidden', background: '#090d14' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.12)', zIndex: 10, transition: 'opacity 0.4s ease' }} className="group-hover:opacity-0" />
                    <img
                      src={step.image}
                      alt={step.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                      className="infra-process-img group-hover:scale-105"
                    />
                  </div>

                  {/* Dark Information Bar (#121A24) */}
                  <div
                    style={{
                      height: '80px',
                      background: '#121A24',
                      padding: '0 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      zIndex: 20,
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', paddingRight: '12px' }}>
                      <span style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 600, letterSpacing: '0.01em', lineHeight: 1.25 }}>
                        {step.title}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '3px' }}>
                        {step.sub}
                      </span>
                    </div>

                    <div style={{ color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <ArrowUpRight
                        size={24}
                        style={{ transition: 'transform 0.3s ease-out' }}
                        className="group-hover:translate-x-1.5 group-hover:-translate-y-1.5"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Carousel Pagination Dots */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
              marginTop: '32px',
            }}
          >
            {processCards.map((step, idx) => {
              const isActive = idx === activeProcessIdx;
              return (
                <button
                  key={`dot-${step.number}`}
                  type="button"
                  aria-label={`Go to step ${step.number}: ${step.title}`}
                  aria-current={isActive}
                  onClick={() => {
                    const el = processTrackRef.current;
                    const first = el?.firstElementChild as HTMLElement | null;
                    if (!el || !first) return;
                    el.scrollTo({ left: idx * (first.offsetWidth + 32), behavior: 'smooth' });
                  }}
                  style={{
                    width: isActive ? '28px' : '10px',
                    height: '10px',
                    padding: 0,
                    border: 'none',
                    borderRadius: '999px',
                    cursor: 'pointer',
                    background: isActive ? '#51847D' : '#cbd5e1',
                    transition: 'width 0.3s ease, background-color 0.3s ease',
                  }}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Equipment — Full-Bleed Overlay Card Architecture (Matching User Reference Image) */}
      <section className="section bg-white" style={{ padding: '100px 0', borderTop: '1px solid #e2e8f0' }}>
        <div className="container" style={{ maxWidth: '1440px', width: '95%' }}>
          <div className="infra-reveal" style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 60px' }}>
            <span className="small-label">EQUIPMENT &amp; MACHINERY</span>
            <h2 className="section-title" style={{ fontSize: '2.5rem', marginTop: '10px', marginBottom: '16px' }}>
              Aerospace-Grade Machinery, End to End
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem' }}>
              Computer-controlled precision equipment behind each stage of production.
            </p>
          </div>

          <div className="grid-responsive-3col infra-reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '36px' }}>
            {equipment.map((item, idx) => {
              if (item.isDarkCallout) {
                return (
                  <div
                    key={`callout-${idx}`}
                    onClick={onOpenQuoteModal}
                    style={{
                      position: 'relative',
                      height: '420px',
                      background: '#061221',
                      border: '1px solid rgba(119, 184, 176, 0.4)',
                      borderRadius: '18px',
                      boxShadow: '0 8px 30px rgba(6, 18, 33, 0.2)',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '32px',
                      textAlign: 'center',
                      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#77b8b0';
                      e.currentTarget.style.boxShadow = '0 16px 40px rgba(81, 132, 125, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(119, 184, 176, 0.4)';
                      e.currentTarget.style.boxShadow = '0 8px 30px rgba(6, 18, 33, 0.2)';
                    }}
                  >
                    {/* Inner Frame */}
                    <div style={{ position: 'absolute', inset: '16px', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', pointerEvents: 'none' }} />
                    
                    <span style={{ fontSize: '0.78rem', color: '#77b8b0', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '8px' }}>
                      Click for more
                    </span>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#51847D', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '16px 0' }}>
                      <ArrowRight size={22} />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff', margin: '4px 0 8px', letterSpacing: '-0.01em' }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: '#cbd5e1', margin: 0, fontWeight: 500 }}>
                      {item.sub}
                    </p>
                  </div>
                );
              }

              return (
                <div
                  key={item.title}
                  onClick={onOpenQuoteModal}
                  style={{
                    position: 'relative',
                    height: '420px',
                    background: '#061221',
                    border: '1px solid #1e293b',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '28px',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#77b8b0';
                    e.currentTarget.style.boxShadow = '0 16px 40px rgba(6, 18, 33, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#1e293b';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
                  }}
                >
                  {/* Full-Bleed Photo */}
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      zIndex: 1,
                    }}
                  />

                  {/* Dark Gradient Overlay for Readability */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(6, 18, 33, 0.88) 0%, rgba(6, 18, 33, 0.25) 45%, rgba(6, 18, 33, 0.92) 100%)',
                      zIndex: 2,
                    }}
                  />

                  {/* Top-Left Title & Desc */}
                  <div style={{ position: 'relative', zIndex: 3 }}>
                    <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.25, margin: 0, letterSpacing: '-0.01em' }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '0.86rem', color: '#cbd5e1', marginTop: '8px', marginBottom: 0, lineHeight: 1.55, fontWeight: 500, maxWidth: '92%' }}>
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom-Left Read More Link */}
                  <div style={{ position: 'relative', zIndex: 3, display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                    <span>READ MORE</span>
                    <ArrowRight size={16} color="#77b8b0" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Plant Capacity — Minimalist Counter Strip (Matching Image 1 Architecture) */}
      <section style={{ background: '#ffffff', padding: '75px 0', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container" style={{ maxWidth: '1300px' }}>
          <div ref={capacityRef} className="infra-capacity-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '32px', textAlign: 'center' }}>
            {capacityStats.map((stat, idx) => (
              <div key={stat.label} style={{ padding: '12px 8px' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '3.2rem', fontWeight: 600, color: '#0f172a', lineHeight: 1, letterSpacing: '-0.02em' }}>
                  {renderCapacityValue(stat, idx)}
                </div>
                <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#64748b', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: '12px' }}>
                  {stat.label}
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

      {/* 8. Sustainability Split (Matching Image 1 Architecture) */}
      <section className="section bg-tint" style={{ padding: '100px 0', background: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
        <div className="container">
          <div className="grid-responsive-about" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '60px', alignItems: 'center' }}>
            {/* Left Column: Headline, Paragraph, Phone Widget & Pill CTA (Matching Image 1 Left Side) */}
            <div className="infra-reveal">
              <span className="small-label" style={{ color: '#51847D', letterSpacing: '0.12em' }}>SUSTAINABLE METALLURGY</span>
              <h2 className="section-title" style={{ fontSize: '2.7rem', color: '#0f172a', marginTop: '10px', marginBottom: '20px', lineHeight: 1.18, fontWeight: 900 }}>
                98% Circular, Zero-Carbon Smelting
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7, marginBottom: '24px' }}>
                Our electric arc recycling program transforms returned scrap and machining swarf back into
                certified heats, dramatically cutting carbon intensity without compromising alloy purity.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                {sustainabilityPoints.map((point) => (
                  <div key={point} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <CheckCircle2 size={20} color="#51847D" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span style={{ fontSize: '0.94rem', color: '#334155', lineHeight: 1.5, fontWeight: 600 }}>{point}</span>
                  </div>
                ))}
              </div>

              {/* Clean CTA Button */}
              <div style={{ marginTop: '20px' }}>
                <button
                  onClick={onOpenQuoteModal}
                  className="btn"
                  style={{
                    padding: '16px 36px',
                    fontSize: '0.95rem',
                    fontWeight: 800,
                    background: '#061221',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    boxShadow: '0 10px 25px rgba(6, 18, 33, 0.25)',
                    transition: 'transform 0.25s ease, background 0.25s ease',
                  }}
                >
                  Request Sustainability Audit <ArrowRight size={18} />
                </button>
              </div>
            </div>

            {/* Right Column: Arch Frame with User-Uploaded Furnace Image */}
            <div className="infra-reveal" style={{ transitionDelay: '100ms' }}>
              <div
                className="about-arch-frame-reversed"
                style={{ overflow: 'hidden', boxShadow: '0 20px 45px rgba(0,0,0,0.14)', background: '#061221' }}
              >
                <img
                  src="/images/furnace_melt.jpg"
                  alt="Zero-carbon electric arc recycling furnace"
                  style={{ width: '100%', height: '460px', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
