import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ChevronRight,
  Users,
  Briefcase,
  Trophy,
  Globe,
  Play,
  X,
} from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
  onOpenQuoteModal: (productName?: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, onOpenQuoteModal }) => {
  // Stats Animation Counter State
  const [stats, setStats] = useState({
    clients: 0,
    projects: 0,
    awards: 0,
    countries: 0,
  });

  // Video Modal State
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Testimonial Carousel Auto-Slide State
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  // Active Benefit Hover State (0, 1, 2, 3)
  const [activeBenefitIdx, setActiveBenefitIdx] = useState(0);

  // Benefits Data with Corresponding Visuals
  const benefits = [
    {
      num: '01',
      title: 'ADVANCED METALLURGY TECHNOLOGY',
      desc: 'Multi-axis CNC laser cutting and computer-controlled rolling lines ensure sub-micron tolerance precision across all metal components and titanium sheets.',
      image: '/images/pexels-alex-60339926-9878853.jpg',
      alt: 'Multi-axis CNC Laser Cutting Production Line',
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
      image: '/images/pexels-bence-szemerey-337043-6804265.jpg',
      alt: 'Expert Metallurgical Engineering & Technical CAD Advisory',
    },
    {
      num: '04',
      title: 'EXPEDITED 48H GLOBAL SUPPLY CHAIN',
      desc: 'Strategic warehouses in North America, Europe, and Asia guaranteeing rapid dispatch and real-time tracking on standard alloy stock.',
      image: '/images/pexels-willians-huerta-2157111846-36397988.jpg',
      alt: 'Global Supply Logistics & Heavy Infrastructure Freight',
    },
  ];

  // 4 Pexels Industrial Hero Background Slides
  const heroSlides = [
    {
      id: 1,
      url: '/images/pexels-alex-60339926-9878853.jpg',
      title: 'Precision Metal Solutions for Modern Industry',
    },
    {
      id: 2,
      url: '/images/pexels-bence-szemerey-337043-6804265.jpg',
      title: 'Certified High-Performance Alloy Metallurgy',
    },
    {
      id: 3,
      url: '/images/pexels-eugeniofr-30005294.jpg',
      title: 'Advanced Robotic Casting & Fabrication',
    },
    {
      id: 4,
      url: '/images/pexels-jakubzerdzicki-33813584.jpg',
      title: 'Sub-Micron CNC Aerospace Calibration',
    },
  ];

  const [currentSlideIdx, setCurrentSlideIdx] = useState<number>(0);

  // Automatic Background Slide Rotation (Every 4.5 seconds)
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlideIdx((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(slideTimer);
  }, [heroSlides.length]);

  const statsRef = useRef<HTMLDivElement>(null);
  const [hasAnimatedStats, setHasAnimatedStats] = useState(false);

  // Testimonial Automatic Sliding Rotation (Every 4 seconds)
  const testimonials = [
    {
      id: 1,
      quote: 'Impressed by the professionalism and attention to detail.',
      author: 'Guy Hawkins',
      handle: '@guyhawkins',
      role: 'Chief Supply Officer, AeroTech',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 2,
      quote: 'A seamless experience from start to finish. Highly recommend!',
      author: 'Karla Lynn',
      handle: '@karlalynn98',
      role: 'VP of Procurement, PetroChem',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 3,
      quote: 'Their 48-hour dispatch on 316L stainless pipes saved our offshore refinery project.',
      author: 'Rajesh Varma',
      handle: '@rajeshvarma',
      role: 'Director of Operations, Larsen Infra',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 4,
      quote: 'Sub-micron CNC laser cutting precision on titanium plates. Outstanding partner.',
      author: 'Dr. Aris Thorne',
      handle: '@aristhorne',
      role: 'Defense Metallurgy Lead',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    },
  ];

  useEffect(() => {
    const testimonialTimer = setInterval(() => {
      setTestimonialIdx((prev) => (prev + 1) % (testimonials.length - 1));
    }, 4000);
    return () => clearInterval(testimonialTimer);
  }, [testimonials.length]);

  // Scroll Reveal Observer & Stats Counter Observer
  useEffect(() => {
    // 1. Intersection Observer for Scroll Reveals
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    // 2. Intersection Observer for Stats Counter
    const statsObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimatedStats) {
          setHasAnimatedStats(true);
          animateStats();
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      statsObserver.observe(statsRef.current);
    }

    return () => {
      revealObserver.disconnect();
      statsObserver.disconnect();
    };
  }, [hasAnimatedStats]);

  // Data-Driven Animation with requestAnimationFrame and ease-out cubic
  const animateStats = () => {
    const duration = 2000;
    const startTime = performance.now();

    const targetClients = 1250;
    const targetProjects = 850;
    const targetAwards = 35;
    const targetCountries = 30;

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      setStats({
        clients: Math.floor(easeProgress * targetClients),
        projects: Math.floor(easeProgress * targetProjects),
        awards: Math.floor(easeProgress * targetAwards),
        countries: Math.floor(easeProgress * targetCountries),
      });

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const featuredProducts = [
    {
      id: 'stainless-pipes',
      title: 'Seamless Stainless Steel Pipes (316L / 304)',
      category: 'Pipe & Tube',
      image: '/images/stainless_pipes.png',
      specs: ['ASTM A312', 'OD: 6mm - 1200mm', 'Corrosion Resistant'],
      description:
        'Engineered for extreme pressure environments, chemical processing plants, and marine infrastructure with tight wall thickness tolerances.',
    },
    {
      id: 'titanium-plates',
      title: 'Aerospace Grade Titanium Plates (Ti-6Al-4V)',
      category: 'Plates & Sheets',
      image: '/images/titanium_plates.png',
      specs: ['Grade 5 Ti', 'AMS 4911', 'High Strength-to-Weight'],
      description:
        'Ultra-lightweight high-tensile titanium sheets designed for defense, aviation turbines, and high-temperature industrial heat exchangers.',
    },
    {
      id: 'structural-beams',
      title: 'Heavy Structural Steel I-Beams (A36 / S355)',
      category: 'Structural Beams',
      image: '/images/structural_beams.png',
      specs: ['EN 10025', 'Custom Lengths', 'High Load Capacity'],
      description:
        'Hot-rolled structural steel profiles delivering unyielding structural stability for skyscrapers, bridges, and heavy industrial facilities.',
    },
  ];

  return (
    <div>
      {/* 1. Hero Section with Automated Seamless Background Image Carousel */}
      <section
        className="hero-section"
        style={{
          position: 'relative',
          minHeight: '78vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          color: '#ffffff',
          padding: '100px 0 90px',
        }}
      >
        {/* Full-Bleed Animated Sliding Background Images Stack */}
        {heroSlides.map((slide, sIdx) => (
          <div
            key={slide.id}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.65) 100%), url("${slide.url}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: sIdx === currentSlideIdx ? 1 : 0,
              transform: sIdx === currentSlideIdx ? 'scale(1)' : 'scale(1.05)',
              transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), transform 1.4s ease-out',
              zIndex: 1,
            }}
          />
        ))}

        {/* Hero Content Container */}
        <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
          <div className="hero-content reveal" style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
            <h1 className="hero-title" style={{ fontSize: '4.2rem', marginBottom: '24px', color: '#ffffff' }}>
              Precision Metal Solutions for <span style={{ color: '#38bdf8' }}>Modern Industry</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#f1f5f9', margin: '0 auto 36px', maxWidth: '750px', lineHeight: 1.6, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
              Supplying certified high-performance stainless steel, titanium alloys, structural profiles, and custom fabricated components for global aerospace, energy, and defense projects.
            </p>
            <div className="hero-actions" style={{ justifyContent: 'center', gap: '20px', marginTop: '36px' }}>
              <button
                onClick={() => onNavigate('products')}
                className="btn btn-accent"
                style={{
                  padding: '16px 36px',
                  fontSize: '1rem',
                  fontWeight: 700,
                  background: '#0284c7',
                  color: '#ffffff',
                  border: '2px solid #0284c7',
                  cursor: 'pointer',
                }}
              >
                Explore Catalog <ArrowRight size={18} />
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="btn btn-outline"
                style={{
                  padding: '16px 36px',
                  fontSize: '1rem',
                  fontWeight: 700,
                  border: '2px solid #ffffff',
                  color: '#ffffff',
                  background: 'transparent',
                  cursor: 'pointer',
                }}
              >
                Learn Our Process
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Floating White Elevated Stats Card Bar */}
      <div className="stats-floating-bar" ref={statsRef}>
        <div className="container">
          <div className="stats-card-white reveal">
            <div className="stats-grid">
              <div className="stat-item-white">
                <div className="stat-icon-container">
                  <Users size={30} />
                </div>
                <div>
                  <div className="stat-number-white">{stats.clients.toLocaleString()}+</div>
                  <div className="stat-label-white">Global Clients</div>
                </div>
              </div>

              <div className="stat-item-white">
                <div className="stat-icon-container">
                  <Briefcase size={30} />
                </div>
                <div>
                  <div className="stat-number-white">{stats.projects.toLocaleString()}k+</div>
                  <div className="stat-label-white">Projects Delivered</div>
                </div>
              </div>

              <div className="stat-item-white">
                <div className="stat-icon-container">
                  <Trophy size={30} />
                </div>
                <div>
                  <div className="stat-number-white">{stats.awards}+</div>
                  <div className="stat-label-white">Awards &amp; Certifications</div>
                </div>
              </div>

              <div className="stat-item-white">
                <div className="stat-icon-container">
                  <Globe size={30} />
                </div>
                <div>
                  <div className="stat-number-white">{stats.countries}+</div>
                  <div className="stat-label-white">Countries Served</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Multidisciplinary Engineering Video Feature Section */}
      <section className="section bg-white" style={{ padding: '100px 0 80px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div className="reveal" style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '-16px',
                  width: '100%',
                  height: '100%',
                  background: '#d4a017',
                  zIndex: 1,
                }}
              />
              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  height: '340px',
                  overflow: 'hidden',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
                  cursor: 'pointer',
                }}
                onClick={() => setIsVideoModalOpen(true)}
              >
                <img
                  src="/images/pexels-alex-60339926-9878853.jpg"
                  alt="Jyothi Metals Foundry Production Facilities"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0, 0, 0, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '68px',
                      height: '68px',
                      borderRadius: '50% !important',
                      background: '#ffffff',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Play size={26} fill="#d4a017" color="#d4a017" style={{ marginLeft: '4px' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal">
              <h2
                className="section-title"
                style={{
                  fontSize: '2.4rem',
                  lineHeight: 1.25,
                  marginBottom: '20px',
                  color: '#0f172a',
                  fontWeight: 800,
                }}
              >
                Multidisciplinary engineering and metallurgy supply services
              </h2>

              <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7, marginBottom: '32px' }}>
                With diverse knowledge spanning over three decades, our talented and versatile engineering team manufactures, cuts, and manages the construction supply of thousands of high-precision metal projects across energy, infrastructure, defense, and industrial manufacturing sectors.
              </p>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => onNavigate('products')}
                  className="btn"
                  style={{
                    padding: '14px 32px',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    background: '#d4a017',
                    color: '#0f172a',
                    border: '2px solid #d4a017',
                    cursor: 'pointer',
                  }}
                >
                  Our Services
                </button>
                <button
                  onClick={() => onNavigate('about')}
                  className="btn"
                  style={{
                    padding: '14px 32px',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    background: 'transparent',
                    color: '#d4a017',
                    border: '2px solid #d4a017',
                    cursor: 'pointer',
                  }}
                >
                  View Projects
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Video Modal Overlay */}
      {isVideoModalOpen && (
        <div
          className="modal-backdrop"
          onClick={() => setIsVideoModalOpen(false)}
          style={{ zIndex: 3000 }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '840px', padding: '0', background: '#000000' }}
          >
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              <iframe
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Jyothi Metals Industrial Foundry Showcase"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <button
                onClick={() => setIsVideoModalOpen(false)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(0,0,0,0.8)',
                  border: '1px solid #ffffff',
                  color: '#ffffff',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                }}
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. INNOVATION Parallax Section */}
      <section
        style={{
          position: 'relative',
          padding: '100px 0',
          backgroundImage: 'linear-gradient(rgba(6, 18, 33, 0.7), rgba(6, 18, 33, 0.8)), url("/images/pexels-alex-60339926-9878853.jpg")',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: '#ffffff',
          overflow: 'hidden',
          borderTop: '3px solid #0284c7',
          borderBottom: '3px solid #0284c7',
        }}
      >
        <div className="container reveal" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p
            style={{
              fontSize: '1rem',
              fontWeight: 800,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#38bdf8',
              marginBottom: '16px',
            }}
          >
            PIONEERING INDUSTRIAL EXCELLENCE
          </p>

          <h2
            className="font-runomic"
            style={{
              fontSize: 'clamp(4.8rem, 14vw, 10.5rem)',
              fontWeight: 900,
              fontFamily: "'Runomic', 'Outfit', sans-serif",
              letterSpacing: '0.06em',
              lineHeight: 1,
              color: '#ffffff',
              WebkitTextStroke: 'none',
              margin: '0 auto 24px',
              textTransform: 'uppercase',
              textAlign: 'center',
              textShadow: '0 8px 32px rgba(0, 0, 0, 0.75)',
            }}
          >
            INNOVATION
          </h2>

          <p
            style={{
              fontSize: '1.15rem',
              maxWidth: '720px',
              margin: '0 auto 32px',
              color: '#e2e8f0',
              lineHeight: 1.6,
            }}
          >
            Integrating sub-micron laser calibration, high-capacity arc furnaces, and certified global supply logistics to power tomorrow's infrastructure.
          </p>

          <button
            onClick={() => onNavigate('about')}
            className="btn btn-accent"
            style={{
              padding: '16px 40px',
              fontSize: '1rem',
              fontWeight: 700,
              background: '#0284c7',
              borderColor: '#0284c7',
              color: '#ffffff',
              cursor: 'pointer',
            }}
          >
            Explore Our Metallurgical Innovation <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* 5. Featured Products Section */}
      <section className="section bg-tint" style={{ paddingTop: '80px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 60px' }} className="reveal">
            <h2 className="section-title">Engineered Metal Stock &amp; Fabrication</h2>
            <p>
              Direct-from-mill raw materials and finished structural products tested to exceed global aerospace and industrial standards.
            </p>
          </div>

          <div className="products-grid">
            {featuredProducts.map((prod, index) => (
              <div
                key={prod.id}
                className={`product-card reveal reveal-delay-${index + 1}`}
              >
                <div className="product-image-container">
                  <img src={prod.image} alt={prod.title} className="product-img" />
                  <span className="product-badge">{prod.category}</span>
                </div>
                <div className="product-body">
                  <h3 className="card-title">{prod.title}</h3>
                  <div className="product-specs">
                    {prod.specs.map((spec, sIdx) => (
                      <span key={sIdx} className="spec-pill">
                        {spec}
                      </span>
                    ))}
                  </div>
                  <p style={{ fontSize: '0.9rem', marginBottom: '20px' }}>{prod.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                      onClick={() => onOpenQuoteModal(prod.title)}
                      className="btn btn-accent"
                      style={{ padding: '8px 18px', fontSize: '0.85rem' }}
                    >
                      Get Quote
                    </button>
                    <button
                      onClick={() => onNavigate('products')}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#0284c7',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      View Specs <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <button
              onClick={() => onNavigate('products')}
              className="btn btn-outline"
              style={{ padding: '14px 36px' }}
            >
              Browse Full 2026 Product Catalog <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* 6. Why Industry Leaders Trust Jyothi Metals (Interactive Hover Animated 01-04 Layout) */}
      <section className="section bg-white" style={{ padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: '60px', alignItems: 'center' }}>
            {/* Left Column: Title & Dynamic Crossfading Industrial Visual Frame */}
            <div className="reveal">
              <h2
                className="section-title"
                style={{
                  fontSize: '2.8rem',
                  lineHeight: 1.15,
                  marginBottom: '28px',
                  color: '#0f172a',
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
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>
                    BENEFIT FOCUS {benefits[activeBenefitIdx].num}
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>
                    {benefits[activeBenefitIdx].alt}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Numbered List (01, 02, 03, 04) with Interactive Hover Animations */}
            <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {benefits.map((b, idx) => {
                const isActive = activeBenefitIdx === idx;
                return (
                  <div
                    key={b.num}
                    onMouseEnter={() => setActiveBenefitIdx(idx)}
                    style={{
                      display: 'flex',
                      gap: '24px',
                      alignItems: 'flex-start',
                      padding: '20px 24px',
                      background: isActive ? '#ffffff' : 'transparent',
                      border: 'none',
                      boxShadow: isActive ? '0 12px 30px rgba(0, 0, 0, 0.06)' : 'none',
                      transform: isActive ? 'translateX(12px)' : 'translateX(0px)',
                      transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'Outfit, sans-serif',
                        fontSize: '3.2rem',
                        fontWeight: 900,
                        color: isActive ? '#0284c7' : '#cbd5e1',
                        lineHeight: 0.9,
                        flexShrink: 0,
                        transform: isActive ? 'scale(1.1)' : 'scale(1)',
                        transition: 'color 0.35s ease, transform 0.35s ease',
                      }}
                    >
                      {b.num}
                    </span>
                    <div>
                      <h3
                        style={{
                          fontSize: '1.15rem',
                          fontWeight: 800,
                          color: isActive ? '#0284c7' : '#0f172a',
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          marginBottom: '8px',
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

      {/* 7. Client Testimonials Automated Sliding Carousel Section */}
      <section
        className="section bg-tint"
        style={{
          padding: '90px 0 110px',
          position: 'relative',
          overflow: 'hidden',
          background: '#ffffff',
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '280px',
            backgroundImage: 'url("/images/factory_skyline_lineart.png")',
            backgroundRepeat: 'repeat-x',
            backgroundPosition: 'bottom center',
            backgroundSize: 'contain',
            opacity: 0.18,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 60px' }} className="reveal">
            <h2 className="section-title">What Enterprise Leaders Say About Jyothi Metals</h2>
            <p>
              Trusted by defense contractors, petroleum refiners, and aerospace engineers worldwide.
            </p>
          </div>

          <div className="reveal" style={{ position: 'relative', maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '28px' }}>
              {[
                testimonials[testimonialIdx],
                testimonials[(testimonialIdx + 1) % testimonials.length],
              ].map((t) => (
                <div
                  key={t.id}
                  style={{
                    background: '#ffffff',
                    borderRadius: '16px !important',
                    border: '1px solid #e2e8f0',
                    padding: '36px 32px 28px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '260px',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
                    transition: 'all 0.5s ease',
                  }}
                >
                  <div>
                    <div style={{ color: '#cbd5e1', fontSize: '3.5rem', fontFamily: 'serif', lineHeight: 0.8, marginBottom: '16px', userSelect: 'none' }}>
                      ““
                    </div>
                    <p style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', lineHeight: 1.4, marginBottom: '28px' }}>
                      {t.quote}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <img
                      src={t.avatar}
                      alt={t.author}
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50% !important',
                        objectFit: 'cover',
                        border: '2px solid #ffffff',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      }}
                    />
                    <div>
                      <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.98rem', lineHeight: 1.2 }}>{t.author}</div>
                      <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 500, marginTop: '2px' }}>{t.handle}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Enterprise Clients Infinite Logo Marquee Section (No Boxes, Clean Company Logo Images) */}
      <section
        style={{
          background: '#ffffff',
          padding: '40px 0',
          borderTop: '1px solid #e2e8f0',
          borderBottom: '1px solid #e2e8f0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Infinite Scrolling Logo Marquee Container */}
        <div className="marquee-container">
          <div className="marquee-track" style={{ gap: '70px', alignItems: 'center' }}>
            {/* Duplicated 2x for smooth 100% continuous infinite loop */}
            {[...Array(2)].map((_, loopIdx) => (
              <React.Fragment key={loopIdx}>
                {/* Boeing */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Boeing_full_logo.svg"
                    alt="Boeing Aerospace"
                    style={{ height: '36px', objectFit: 'contain' }}
                  />
                </div>

                {/* Siemens */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Siemens-logo.svg"
                    alt="Siemens Energy"
                    style={{ height: '32px', objectFit: 'contain' }}
                  />
                </div>

                {/* Chevron */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Chevron_Logo.svg"
                    alt="Chevron Petroleum"
                    style={{ height: '40px', objectFit: 'contain' }}
                  />
                </div>

                {/* General Electric */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/f/ff/General_Electric_logo.svg"
                    alt="General Electric"
                    style={{ height: '42px', objectFit: 'contain' }}
                  />
                </div>

                {/* Tata Steel */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Tata_logo.svg"
                    alt="Tata Metallurgy"
                    style={{ height: '34px', objectFit: 'contain' }}
                  />
                </div>

                {/* Lockheed Martin */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/9/99/Lockheed_Martin_logo.svg"
                    alt="Lockheed Defense"
                    style={{ height: '38px', objectFit: 'contain' }}
                  />
                </div>

                {/* Larsen & Toubro */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Larsen%26Toubro_logo.svg"
                    alt="Larsen &amp; Toubro Infra"
                    style={{ height: '36px', objectFit: 'contain' }}
                  />
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
