import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ChevronRight,
  Users,
  Briefcase,
  Trophy,
  Globe,
  X,
  Star,
  Search,
} from 'lucide-react';
import {
  catalogProducts,
  getSubCategoriesForCategory,
  getFirstSubCategoryForCategory,
} from '../data/catalogData';

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

  // Active Benefit Hover State (0, 1, 2, 3)
  const [activeBenefitIdx, setActiveBenefitIdx] = useState<number>(0);

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

  // 9 Enterprise Testimonials for 3-Column Vertical Infinite Marquee
  const testimonials = [
    {
      id: 1,
      quote:
        'Jyothi Metals provided 316L seamless pipes that exceeded our mill test certificates with sub-micron wall thickness precision and rapid dispatch.',
      author: 'Ethan Morales',
      handle: '@ethanmorales',
      role: 'Procurement Specialist, PetroChem',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 2,
      quote:
        'I appreciate how practical and thoughtfully crafted each metal specification is, making it easier for our engineers to extract exact CAD tolerances.',
      author: 'Daniel Hart',
      handle: '@danielhart',
      role: 'UX Engineering Lead, AeroTech',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 3,
      quote:
        'The system is reliable, adaptable, and easy to adopt. Their forged ANSI B16.5 flanges perform flawlessly under high-pressure testing.',
      author: 'Jonathan Reeves',
      handle: '@jonathanreeves',
      role: 'Product Designer, Siemens Energy',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 4,
      quote:
        'Working with this supplier has improved our operational efficiency in ways we did not expect. Rapid mill dispatch saved our project timeline.',
      author: 'Marcus Wright',
      handle: '@marcuswright',
      role: 'Operations Supervisor, Larsen Infra',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 5,
      quote:
        'Sub-micron CNC laser cutting precision on titanium plates. Best ISO 9001 certified raw metal supplier in the industry.',
      author: 'Dr. Aris Thorne',
      handle: '@aristhorne',
      role: 'Defense Metallurgy Lead, AeroSpace Inc',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 6,
      quote:
        'A seamless experience from start to finish. Their custom tube sheet drilling and mirror finish stainless sheets are second to none.',
      author: 'Karla Lynn',
      handle: '@karlalynn98',
      role: 'VP of Procurement, PetroChemical Systems',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 7,
      quote:
        'Impressed by the professionalism and attention to detail. Every consignment arrives with complete chemical composition test reports.',
      author: 'Guy Hawkins',
      handle: '@guyhawkins',
      role: 'Chief Supply Officer, Global Marine',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 8,
      quote:
        'Direct-from-mill raw materials delivered with unyielding structural stability. Their round bars and shaft stock meet exact aerospace tolerances.',
      author: 'Vikramaditya Rao',
      handle: '@vikramrao',
      role: 'Structural Engineering Head, Tata Power',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 9,
      quote:
        'Extremely high strength-to-weight ratio titanium alloy plates. The team at Jyothi Metals ensures zero defects across every production batch.',
      author: 'Sarah Jenkins',
      handle: '@sarahjenkins',
      role: 'Quality Audit Specialist, Defense Corp',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
    },
  ];

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

  // Interactive Catalog State
  const [activeCatalogTab, setActiveCatalogTab] = useState<string>('Pipes & Tubes');
  const [activeSubCat, setActiveSubCat] = useState<string>('Stainless Steel Pipes & Tubes');
  const [showAllProducts, setShowAllProducts] = useState<boolean>(false);
  const [homepageSearchQuery, setHomepageSearchQuery] = useState<string>('');
  const [showAllMobileCategories, setShowAllMobileCategories] = useState<boolean>(false);

  // Automatically select the first sub-category whenever activeCatalogTab changes
  useEffect(() => {
    const defaultSub = getFirstSubCategoryForCategory(activeCatalogTab);
    setActiveSubCat(defaultSub);
    setShowAllProducts(false);
  }, [activeCatalogTab]);

  const currentSubList = getSubCategoriesForCategory(activeCatalogTab);
  const effectiveSubCat = currentSubList.some(
    (s) => s.id === activeSubCat || s.id.toLowerCase() === activeSubCat.toLowerCase()
  )
    ? activeSubCat
    : currentSubList.length > 0
    ? currentSubList[0].id
    : activeSubCat;

  // Real-time catalog filtering logic
  const filteredCatalog = catalogProducts.filter((prod) => {
    let matchMain = true;
    if (activeCatalogTab !== 'all') {
      matchMain = prod.category.toLowerCase().includes(activeCatalogTab.toLowerCase()) ||
                  prod.subCat.toLowerCase().includes(activeCatalogTab.toLowerCase());
    }

    let matchSub = true;
    if (effectiveSubCat && effectiveSubCat !== 'all' && effectiveSubCat !== 'All Sub-Categories') {
      const q = effectiveSubCat.toLowerCase();
      matchSub = prod.subCat.toLowerCase() === q ||
                 prod.subCat.toLowerCase().includes(q) ||
                 prod.title.toLowerCase().includes(q);
    }

    let matchSearch = true;
    if (homepageSearchQuery.trim() !== '') {
      const q = homepageSearchQuery.toLowerCase();
      matchSearch = prod.title.toLowerCase().includes(q) ||
                    prod.category.toLowerCase().includes(q) ||
                    prod.subCat.toLowerCase().includes(q) ||
                    prod.specs.some(s => s.toLowerCase().includes(q));
    }

    return matchMain && matchSub && matchSearch;
  });

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
            <h1 className="hero-title" style={{ fontSize: 'clamp(2.1rem, 5.5vw, 4.2rem)', marginBottom: '24px', color: '#ffffff' }}>
              Precision Metal Solutions for <span style={{ color: '#77b8b0' }}>Modern Industry</span>
            </h1>
            <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: '#f1f5f9', margin: '0 auto 36px', maxWidth: '750px', lineHeight: 1.6, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
              Supplying certified high-performance stainless steel, titanium alloys, structural profiles, and custom fabricated components for global aerospace, energy, and defense projects.
            </p>
            <div className="hero-actions" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginTop: '36px' }}>
              <button
                onClick={() => onNavigate('products')}
                className="btn btn-accent"
                style={{
                  padding: '16px 36px',
                  fontSize: '1rem',
                  fontWeight: 700,
                  background: '#51847D',
                  color: '#ffffff',
                  border: '2px solid #51847D',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(81, 132, 125, 0.4)',
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
                  background: 'transparent',
                  color: '#ffffff',
                  border: '2px solid #ffffff',
                  cursor: 'pointer',
                }}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Floating White Elevated Stats Card Bar */}
      <div className="stats-floating-bar reveal" ref={statsRef}>
        <div className="container">
          <div className="stats-card-white">
            <div className="stats-grid">
              <div className="stat-item-white">
                <div className="stat-icon-container">
                  <Users size={32} />
                </div>
                <div>
                  <div className="stat-number-white">{stats.clients.toLocaleString()}+</div>
                  <div className="stat-label-white">Global Enterprise Clients</div>
                </div>
              </div>

              <div className="stat-item-white">
                <div className="stat-icon-container">
                  <Briefcase size={32} />
                </div>
                <div>
                  <div className="stat-number-white">{stats.projects.toLocaleString()}k+</div>
                  <div className="stat-label-white">Projects Delivered</div>
                </div>
              </div>

              <div className="stat-item-white">
                <div className="stat-icon-container">
                  <Trophy size={32} />
                </div>
                <div>
                  <div className="stat-number-white">{stats.awards}</div>
                  <div className="stat-label-white">ISO &amp; Quality Awards</div>
                </div>
              </div>

              <div className="stat-item-white">
                <div className="stat-icon-container">
                  <Globe size={32} />
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

      {/* 3. Multidisciplinary Engineering Feature Section (Image 2 Style Layout: Flush Left Arch Image, Right Text Column) */}
      <section
        style={{
          background: '#ffffff',
          padding: '90px 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          className="catalog-mobile-grid grid-responsive-about"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '60px',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Full-Bleed Flush Image Card with Top-Right Arch Curve */}
          <div className="reveal" style={{ width: '100%' }}>
            <div
              className="about-arch-frame-left"
              style={{
                width: '100%',
                height: '520px',
                borderTopRightRadius: '240px !important',
              }}
            >
              <img
                src="/images/pexels-alex-60339926-9878853.jpg"
                alt="Jyoti Metal Foundry Production Facilities"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
            </div>
          </div>

          {/* Right Column: Text & Pill Action Button (Constrained inside Right Padding) */}
          <div className="reveal" style={{ paddingRight: '5%', maxWidth: '620px' }}>
            <div
              style={{
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                color: '#51847D',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              About Jyoti Metal
            </div>

            <h2
              className="section-title multidisciplinary-title"
              style={{
                fontSize: '2.85rem',
                lineHeight: 1.2,
                marginBottom: '24px',
                color: '#0f172a',
                fontWeight: 800,
                fontFamily: 'Outfit, sans-serif',
                letterSpacing: '-0.02em',
              }}
            >
              Multidisciplinary engineering and metallurgy supply services
            </h2>

            <p
              style={{
                fontSize: '1.05rem',
                color: '#475569',
                lineHeight: 1.75,
                marginBottom: '36px',
                maxWidth: '540px',
              }}
            >
              With diverse knowledge spanning over three decades, our talented and versatile engineering team manufactures, cuts, and manages the construction supply of thousands of high-precision metal projects across energy, infrastructure, defense, and industrial manufacturing sectors.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button
                onClick={() => onNavigate('about')}
                style={{
                  padding: '14px 32px',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  background: '#1c2826',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '30px !important',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.12)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#51847D';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#1c2826';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Learn More <ArrowRight size={16} />
              </button>
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
          borderTop: '3px solid #51847D',
          borderBottom: '3px solid #51847D',
        }}
      >
        <div className="container reveal" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p
            style={{
              fontSize: '1rem',
              fontWeight: 800,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#77b8b0',
              marginBottom: '16px',
            }}
          >
            PIONEERING INDUSTRIAL EXCELLENCE
          </p>

          <h2
            className="font-runomic innovation-title"
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
              background: '#51847D',
              borderColor: '#51847D',
              color: '#ffffff',
              cursor: 'pointer',
            }}
          >
            Explore Our Metallurgical Innovation <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Why Industry Leaders Trust Jyothi Metals (Interactive Hover Animated 01-04 Layout) */}
      <section className="section bg-white" style={{ padding: '100px 0', position: 'relative', overflow: 'hidden', borderBottom: '1px solid #e2e8f0' }}>
        {/* Far Right Vertical Rotated Backdrop Typography */}
        <div
          className="rotated-backdrop-text"
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
          <div className="grid-responsive-about" style={{ display: 'grid', gap: '60px', alignItems: 'flex-start' }}>
            {/* Left Column: Title & Dynamic Crossfading Industrial Visual Frame */}
            <div className="reveal">
              <h2
                className="section-title benefits-title"
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
            <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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

      {/* 4.5. High Quality Products Category Grid Showcase (Image 2 Style 8-Category Arch Grid) */}
      <section className="section bg-white" style={{ paddingTop: '90px', paddingBottom: '80px', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 55px' }} className="reveal">
            <span className="small-label" style={{ color: '#51847D', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              OUR
            </span>
            <h2 className="section-title" style={{ fontSize: '2.5rem', color: '#061221', marginBottom: '14px', fontWeight: 900, letterSpacing: '0.02em' }}>
              HIGH QUALITY PRODUCTS
            </h2>
            <div style={{ width: '60px', height: '4px', background: '#51847D', margin: '0 auto 16px' }} />
            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Direct mill stock and precision manufactured metal components certified to exceed international ISO &amp; ASTM engineering standards.
            </p>
          </div>

          {/* 8 Product Category Cards Grid (Image 1 Style Luxury Dark Overlay Cards) */}
          <div
            className="category-arch-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '28px',
            }}
          >
            {[
              {
                title: 'Sheets',
                mainCat: 'Plates & Sheets',
                tag: 'ASTM A240 / 304 & 316',
                image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
              },
              {
                title: 'Pipe and Tubes',
                mainCat: 'Pipes & Tubes',
                tag: 'OD: 6mm - 1200mm',
                image: '/images/stainless_pipes.png',
              },
              {
                title: 'Plates',
                mainCat: 'Plates & Sheets',
                tag: 'Grade 5 Ti & Heavy SS',
                image: '/images/titanium_plates.png',
              },
              {
                title: 'Flanges',
                mainCat: 'Flanges',
                tag: 'ANSI B16.5 Class 150-2500',
                image: '/images/flanges_industrial.png',
              },
              {
                title: 'Round Bars',
                mainCat: 'Round Bars',
                tag: 'Solid Turned & Polished',
                image: '/images/round_bars.png',
              },
              {
                title: 'Buttweld Fittings',
                mainCat: 'Buttweld Fittings',
                tag: 'ASME B16.9 Fittings',
                image: '/images/pipe_fittings.png',
              },
              {
                title: 'Forged Fittings',
                mainCat: 'Forged Fittings',
                tag: '3000# / 6000# Socket Weld',
                image: '/images/pipe_fittings.png',
              },
              {
                title: 'Specialized Product',
                mainCat: 'Specialized Product',
                tag: 'Laser Cut & CNC Drilled',
                image: '/images/precision_parts.png',
              },
            ].map((cat, catIdx) => (
              <div
                key={cat.title}
                className={`category-arch-card reveal ${catIdx >= 4 ? 'category-card-extra' : ''} ${catIdx >= 4 && !showAllMobileCategories ? 'hide-on-mobile' : ''}`}
                onClick={() => {
                  setActiveCatalogTab(cat.mainCat);
                  setActiveSubCat('all');
                  const el = document.getElementById('catalog-browser');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                style={{
                  cursor: 'pointer',
                  height: '320px',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                {/* Full Height Background Image */}
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="category-arch-img"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />

                {/* Bottom Dark Gradient Overlay for Typography Contrast */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(6, 18, 33, 0.95) 0%, rgba(6, 18, 33, 0.45) 45%, transparent 100%)',
                    zIndex: 1,
                  }}
                />

                {/* Top-Right White Floating Circle Arrow Button (Image 1 Style) */}
                <div
                  style={{
                    position: 'absolute',
                    top: '18px',
                    right: '18px',
                    zIndex: 2,
                  }}
                >
                  <div className="arch-floating-btn">
                    <ArrowRight size={18} />
                  </div>
                </div>

                {/* Bottom Left Content Overlay (Sub-tag & Bold Title) */}
                <div
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    padding: '24px 20px',
                    marginTop: 'auto',
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      color: '#77b8b0',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      marginBottom: '6px',
                    }}
                  >
                    {cat.tag}
                  </div>
                  <h3
                    className="card-title-text"
                    style={{
                      fontSize: '1.35rem',
                      fontWeight: 800,
                      margin: 0,
                      lineHeight: 1.2,
                    }}
                  >
                    {cat.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile-Only See All Categories Button */}
          <div className="mobile-only-see-all-btn" style={{ textAlign: 'center', marginTop: '24px' }}>
            <button
              onClick={() => setShowAllMobileCategories(!showAllMobileCategories)}
              style={{
                padding: '12px 28px',
                fontSize: '0.88rem',
                fontWeight: 800,
                background: '#edf5f4',
                border: '2px solid #51847D',
                color: '#51847D',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                width: '100%',
                justifyContent: 'center',
              }}
            >
              {showAllMobileCategories ? 'Show Fewer Categories ▲' : 'See All 8 Product Categories ▼'}
            </button>
          </div>
        </div>
      </section>


      {/* 5. Interactive Industrial Product Catalog (Image 3 Style Catalog Browser with Image 2 Content) */}
      <section id="catalog-browser" className="section bg-tint" style={{ paddingTop: '90px', paddingBottom: '100px' }}>
        <div className="container">
          {/* Section Header */}
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 40px' }} className="reveal">
            <span className="small-label" style={{ color: '#51847D', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              ENTERPRISE METALLURGY CATALOG
            </span>
            <h2 className="section-title" style={{ fontSize: '2.6rem', color: '#0f172a', marginBottom: '16px' }}>
              Industrial Metal Product Catalog
            </h2>
            <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '28px' }}>
              Explore our complete range of certified stainless steel, titanium alloys, structural profiles, forged flanges, and precision machined components.
            </p>

            {/* Instant Product Search Bar for Homepage */}
            <div style={{ maxWidth: '640px', margin: '0 auto 10px', position: 'relative' }}>
              <div style={{ position: 'relative', width: '100%' }}>
                <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#51847D' }} />
                <input
                  type="text"
                  placeholder="Search instant alloy stock (e.g. 316L, Titanium, Flanges)..."
                  value={homepageSearchQuery}
                  onChange={(e) => setHomepageSearchQuery(e.target.value)}
                  aria-label="Search product catalog"
                  style={{
                    width: '100%',
                    paddingLeft: '46px',
                    paddingRight: '40px',
                    paddingTop: '14px',
                    paddingBottom: '14px',
                    fontSize: '16px', // Enforces 16px to prevent iOS Safari auto-zoom
                    border: '2px solid #51847D',
                    outline: 'none',
                    background: '#ffffff',
                    boxShadow: '0 4px 14px rgba(81, 132, 125, 0.12)',
                    borderRadius: '0px',
                  }}
                />
                {homepageSearchQuery && (
                  <button
                    onClick={() => setHomepageSearchQuery('')}
                    aria-label="Clear product search"
                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                  >
                    <X size={18} color="#64748b" />
                  </button>
                )}
              </div>
              {homepageSearchQuery && (
                <div style={{ textAlign: 'left', marginTop: '8px', fontSize: '0.84rem', color: '#51847D', fontWeight: 700 }}>
                  Found {filteredCatalog.length} matching product(s) for "{homepageSearchQuery}"
                </div>
              )}
            </div>
          </div>

          {/* Top Horizontal Main Category Tabs Bar (Original Button Size, Single Line Row) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              flexWrap: 'nowrap',
              overflowX: 'auto',
              marginBottom: '36px',
              paddingBottom: '6px',
              maxWidth: '100%',
            }}
          >
            {[
              { id: 'Pipes & Tubes', label: 'Pipes & Tubes' },
              { id: 'Plates & Sheets', label: 'Plates & Sheets' },
              { id: 'Round Bars', label: 'Round Bars' },
              { id: 'Flanges', label: 'Flanges' },
              { id: 'Forged Fittings', label: 'Forged Fittings' },
              { id: 'Buttweld Fittings', label: 'Buttweld Fittings' },
              { id: 'Fasteners', label: 'Fasteners' },
              { id: 'Specialized Product', label: 'Specialized Product' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveCatalogTab(tab.id);
                  const defaultSub = getFirstSubCategoryForCategory(tab.id);
                  setActiveSubCat(defaultSub);
                  setShowAllProducts(false);
                }}
                style={{
                  padding: '11px 20px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  background: activeCatalogTab === tab.id ? '#51847D' : '#ffffff',
                  color: activeCatalogTab === tab.id ? '#ffffff' : '#1e293b',
                  border: activeCatalogTab === tab.id ? '2px solid #51847D' : '1px solid #e2e8f0',
                  borderRadius: '0px',
                  boxShadow: activeCatalogTab === tab.id ? '0 6px 18px rgba(81, 132, 125, 0.25)' : '0 2px 4px rgba(0,0,0,0.02)',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  flexShrink: 0,
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Main 2-Column Catalog Container (Left Sub-Categories Sidebar + Right Product Grid) */}
          <div className="grid-responsive-catalog" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '32px', alignItems: 'start' }}>
            
            {/* Left Sub-Categories Sidebar (Modern Redesigned Navigation Panel with Scrolling System) */}
            <div className="sidebar-nav-panel">
              {/* Sub-Category Items List with Custom Scrollbar */}
              <div className="custom-sidebar-scroll">
                {getSubCategoriesForCategory(activeCatalogTab).map((sub) => {
                  const isActive = effectiveSubCat === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => {
                        setActiveSubCat(sub.id);
                        setShowAllProducts(false);
                      }}
                      className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                    >
                      <span>{sub.label}</span>
                      <ChevronRight size={15} style={{ opacity: isActive ? 1 : 0.35, color: isActive ? '#51847D' : '#64748b' }} />
                    </button>
                  );
                })}
              </div>

              {/* Sidebar Support & See All Callout */}
              <div
                style={{
                  padding: '20px',
                  background: '#f8fafc',
                  borderTop: '1px solid #EEF2F3',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                  Need Custom Mill Specs?
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '14px', lineHeight: 1.4 }}>
                  Speak directly with sales desk:
                  <div style={{ fontWeight: 700, color: '#51847D', marginTop: '4px', fontSize: '0.84rem' }}>
                    +91 9322281549
                  </div>
                </div>
                <button
                  onClick={() => onOpenQuoteModal()}
                  className="btn btn-accent"
                  style={{ width: '100%', padding: '10px 14px', fontSize: '0.8rem', borderRadius: '0px', marginBottom: filteredCatalog.length > 9 ? '10px' : '0' }}
                >
                  Custom Spec Inquiry
                </button>

                {filteredCatalog.length > 9 && (
                  <button
                    onClick={() => setShowAllProducts(!showAllProducts)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: '#51847D',
                      background: '#edf5f4',
                      border: '1px solid #77b8b0',
                      borderRadius: '0px',
                      cursor: 'pointer',
                    }}
                  >
                    {showAllProducts ? 'Show Max 3 Lines' : `See All (${filteredCatalog.length} Items)`}
                  </button>
                )}
              </div>
            </div>

            {/* Right Column: Product Cards Grid (Limited to Max 3 Lines / 9 Boxes) */}
            <div style={{ flex: 1 }}>
              {/* Product Cards Grid */}
              {filteredCatalog.length === 0 ? (
                <div style={{ background: '#ffffff', padding: '60px', textAlign: 'center', border: '1px solid #e2e8f0', borderRadius: '0px' }}>
                  <h3 style={{ color: '#0f172a', marginBottom: '8px' }}>No products match your search query</h3>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '20px' }}>Try clearing your search term or selecting another sub-category.</p>
                  <button
                    onClick={() => { setActiveCatalogTab('Pipes & Tubes'); setActiveSubCat('Stainless Steel Pipes & Tubes'); }}
                    className="btn btn-accent"
                    style={{ padding: '10px 24px', borderRadius: '0px' }}
                  >
                    Reset Catalog Filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px', alignItems: 'stretch' }}>
                    {(showAllProducts ? filteredCatalog : filteredCatalog.slice(0, 9)).map((prod) => (
                      <div
                        key={prod.id}
                        className="product-card"
                        style={{
                          background: '#ffffff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '0px',
                          display: 'flex',
                          flexDirection: 'column',
                          height: '100%',
                          transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
                        }}
                      >
                      <div className="product-image-container" style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
                        <img
                          src={prod.image}
                          alt={prod.title}
                          className="product-img"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <span className="product-badge" style={{ background: '#51847D', color: '#ffffff', padding: '4px 10px', fontSize: '0.72rem', fontWeight: 800, borderRadius: '0px' }}>
                          {prod.category}
                        </span>
                      </div>

                      <div className="product-body" style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <h3 className="card-title" style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px', lineHeight: 1.35, minHeight: '2.8rem' }}>
                          {prod.title}
                        </h3>

                        <div className="product-specs" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px', minHeight: '52px', alignContent: 'flex-start' }}>
                          {prod.specs.map((spec, sIdx) => (
                            <span
                              key={sIdx}
                              style={{
                                background: '#edf5f4',
                                color: '#51847D',
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                padding: '3px 8px',
                                borderRadius: '0px',
                              }}
                            >
                              {spec}
                            </span>
                          ))}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', marginTop: 'auto', borderTop: '1px solid #f1f5f9' }}>
                          <button
                            onClick={() => onOpenQuoteModal(prod.title)}
                            className="btn btn-accent"
                            style={{ padding: '8px 16px', fontSize: '0.82rem', fontWeight: 700 }}
                          >
                            Get Quote
                          </button>
                          <button
                            onClick={() => onNavigate('products')}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#51847D',
                              fontWeight: 700,
                              fontSize: '0.82rem',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            View Specs <ChevronRight size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredCatalog.length > 9 && (
                    <div style={{ textAlign: 'center', marginTop: '36px' }}>
                      <button
                        onClick={() => setShowAllProducts(!showAllProducts)}
                        className="btn btn-accent"
                        style={{ padding: '12px 32px', fontSize: '0.9rem', borderRadius: '0px', background: '#51847D' }}
                      >
                        {showAllProducts
                          ? 'Show Max 3 Lines'
                          : `See All ${activeCatalogTab !== 'all' ? activeCatalogTab : ''} Products (${filteredCatalog.length} Total Items)`}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

          </div>

          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <button
              onClick={() => onNavigate('products')}
              className="btn btn-outline"
              style={{ padding: '14px 36px' }}
            >
              Browse Full Product Catalog Specs <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* 7. Client Testimonials 3-Column Vertical Infinite Marquee Section (Image 1 Style) */}
      <section
        className="section bg-white"
        style={{
          padding: '95px 0 100px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Header Title */}
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 50px' }} className="reveal">
            <h2 className="section-title" style={{ fontSize: '2.7rem', color: '#0f172a', marginBottom: '14px', fontWeight: 900 }}>
              What our users are saying
            </h2>
            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Our direct-mill metallurgical stock has delivered consistent and measurable performance for industrial leaders across defense, energy, and infrastructure.
            </p>
          </div>

          {/* 3-Column Infinite Vertical Marquee Viewport */}
          <div className="vertical-marquee-viewport reveal">
            <div className="marquee-vertical-grid">
              {/* Column 1 (Scrolling UP) */}
              <div className="marquee-col-wrapper">
                <div className="marquee-vertical-col marquee-up">
                  {[...testimonials.slice(0, 3), ...testimonials.slice(0, 3)].map((t, idx) => (
                    <div
                      key={`col1-${t.id}-${idx}`}
                      className="testimonial-marquee-card"
                      style={{
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '16px !important',
                        padding: '26px 24px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                      }}
                    >
                      {/* 5 Gold Stars Rating */}
                      <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
                        {[...Array(5)].map((_, sIdx) => (
                          <Star key={sIdx} size={16} fill="#f59e0b" color="#f59e0b" />
                        ))}
                      </div>

                      <p style={{ fontSize: '0.94rem', color: '#334155', lineHeight: 1.6, marginBottom: '22px', fontWeight: 500 }}>
                        "{t.quote}"
                      </p>

                      <div style={{ paddingTop: '14px', borderTop: '1px solid #f1f5f9' }}>
                        <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.92rem' }}>{t.author}</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500, marginTop: '2px' }}>{t.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2 (Scrolling DOWN) */}
              <div className="marquee-col-wrapper">
                <div className="marquee-vertical-col marquee-down">
                  {[...testimonials.slice(3, 6), ...testimonials.slice(3, 6)].map((t, idx) => (
                    <div
                      key={`col2-${t.id}-${idx}`}
                      className="testimonial-marquee-card"
                      style={{
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '16px !important',
                        padding: '26px 24px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                      }}
                    >
                      {/* 5 Gold Stars Rating */}
                      <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
                        {[...Array(5)].map((_, sIdx) => (
                          <Star key={sIdx} size={16} fill="#f59e0b" color="#f59e0b" />
                        ))}
                      </div>

                      <p style={{ fontSize: '0.94rem', color: '#334155', lineHeight: 1.6, marginBottom: '22px', fontWeight: 500 }}>
                        "{t.quote}"
                      </p>

                      <div style={{ paddingTop: '14px', borderTop: '1px solid #f1f5f9' }}>
                        <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.92rem' }}>{t.author}</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500, marginTop: '2px' }}>{t.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3 (Scrolling UP Fast) */}
              <div className="marquee-col-wrapper">
                <div className="marquee-vertical-col marquee-up-fast">
                  {[...testimonials.slice(6, 9), ...testimonials.slice(6, 9)].map((t, idx) => (
                    <div
                      key={`col3-${t.id}-${idx}`}
                      className="testimonial-marquee-card"
                      style={{
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '16px !important',
                        padding: '26px 24px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                      }}
                    >
                      {/* 5 Gold Stars Rating */}
                      <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
                        {[...Array(5)].map((_, sIdx) => (
                          <Star key={sIdx} size={16} fill="#f59e0b" color="#f59e0b" />
                        ))}
                      </div>

                      <p style={{ fontSize: '0.94rem', color: '#334155', lineHeight: 1.6, marginBottom: '22px', fontWeight: 500 }}>
                        "{t.quote}"
                      </p>

                      <div style={{ paddingTop: '14px', borderTop: '1px solid #f1f5f9' }}>
                        <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.92rem' }}>{t.author}</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500, marginTop: '2px' }}>{t.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
