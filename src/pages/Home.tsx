import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Check,
  Users,
  Briefcase,
  Trophy,
  Globe,
  X,
  Star,
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
      image: '/images/industrial_facility.png',
      alt: 'Multi-axis CNC Laser Cutting Production Line',
    },
    {
      num: '02',
      title: 'DUAL ISO 9001 & AS9100D CERTIFIED',
      desc: 'Comprehensive lab testing, X-ray weld inspection, and full heat-lot traceability reports included with every shipment for aerospace compliance.',
      image: '/images/quality_lab.jpg',
      alt: 'Aerospace Grade Titanium Testing & Accreditation',
    },
    {
      num: '03',
      title: '30+ YEARS EXPERT ENGINEERING TEAMS',
      desc: 'In-house metallurgists assist in customizing heat-treatment schedules and bespoke extrusion profiles tailored to your exact CAD files.',
      image: '/images/heavy_rolling_mill.jpg',
      alt: 'Expert Metallurgical Engineering & Technical CAD Advisory',
    },
    {
      num: '04',
      title: 'EXPEDITED 48H GLOBAL SUPPLY CHAIN',
      desc: 'Strategic warehouses in North America, Europe, and Asia guaranteeing rapid dispatch and real-time tracking on standard alloy stock.',
      image: '/images/stock_warehouse_racks.jpg',
      alt: 'Global Supply Logistics & Heavy Infrastructure Freight',
    },
    {
      num: '05',
      title: 'INDEPENDENT THIRD-PARTY INSPECTION',
      desc: 'We arrange third-party inspection on request. Independent agencies such as DNV, Lloyd’s and TÜV witness the testing, stamp the coupons, and counter-sign EN 10204 3.2 mill test certificates before dispatch.',
      image: '/images/precision_parts.png',
      alt: 'Third-Party Witnessed Inspection & EN 10204 3.2 Certification',
    },
  ];

  /* Three logo rails, matching the company's own "logo WEB SITE" deck:
     the TPI agencies that witness inspection, the clients we supply, and the
     mills we source from. Assets are served from public/ rather than
     hotlinked — upstream CDN paths are content-hashed and go stale. */
  const logoRails = [
    {
      key: 'tpi',
      label: 'Third-Party Inspection',
      title: 'TPI AGENCIES',
      blurb: 'Independent agencies that witness our testing and counter-sign EN 10204 3.2 certificates.',
      duration: '38s',
      reverse: false,
      logos: [
        { src: '/images/logos/tpi/tuv-sud.png', alt: 'TÜV SÜD South Asia' },
        { src: '/images/logos/tpi/tuv-india.png', alt: 'TÜV India — TÜV NORD Group' },
        { src: '/images/logos/tpi/sgs.png', alt: 'SGS' },
        { src: '/images/logos/tpi/tuv-rheinland.png', alt: 'TÜV Rheinland' },
        { src: '/images/logos/tpi/tcs.png', alt: 'Tata Consultancy Services' },
        { src: '/images/logos/tpi/bureau-veritas.png', alt: 'Bureau Veritas' },
        { src: '/images/logos/tpi/lloyds-register.png', alt: "Lloyd's Register" },
        { src: '/images/logos/tpi/pdil.png', alt: 'Projects & Development India Ltd (PDIL)' },
        { src: '/images/logos/tpi/irclass.png', alt: 'Indian Register of Shipping (IRCLASS)' },
        { src: '/images/logos/tpi/intertek.png', alt: 'Intertek' },
      ],
    },
    {
      key: 'clients',
      label: 'Supplied To',
      title: 'OUR CLIENTS',
      blurb: 'Refineries, fertiliser plants, power utilities and defence PSUs served across India.',
      duration: '55s',
      reverse: true,
      logos: [
        { src: '/images/logos/clients/indian-oil.png', alt: 'Indian Oil Corporation Limited' },
        { src: '/images/logos/clients/bharat-petroleum.png', alt: 'Bharat Petroleum Corporation Ltd.' },
        { src: '/images/logos/clients/hindustan-petroleum.png', alt: 'Hindustan Petroleum Corporation Ltd.' },
        { src: '/images/logos/clients/cpcl.png', alt: 'Chennai Petroleum Corporation Ltd.' },
        { src: '/images/logos/clients/ongc.png', alt: 'Oil and Natural Gas Corporation' },
        { src: '/images/logos/clients/gail.png', alt: 'GAIL (India) Limited' },
        { src: '/images/logos/clients/rcf.png', alt: 'Rashtriya Chemicals & Fertilizers Ltd.' },
        { src: '/images/logos/clients/deepak-fertilisers.png', alt: 'Deepak Fertilisers and Petrochemicals Corporation Ltd.' },
        { src: '/images/logos/clients/iffco.png', alt: 'IFFCO' },
        { src: '/images/logos/clients/fact.png', alt: 'Fertilisers and Chemicals Travancore (FACT)' },
        { src: '/images/logos/clients/ntpc.png', alt: 'NTPC' },
        { src: '/images/logos/clients/bhel.png', alt: 'BHEL' },
        { src: '/images/logos/clients/larsen-toubro.png', alt: 'Larsen & Toubro' },
        { src: '/images/logos/clients/barc.png', alt: 'Bhabha Atomic Research Centre' },
        { src: '/images/logos/clients/npcil.png', alt: 'Nuclear Power Corporation of India Ltd.' },
        { src: '/images/logos/clients/isgec.png', alt: 'ISGEC Heavy Engineering Ltd.' },
        { src: '/images/logos/clients/adani.png', alt: 'Adani Group' },
      ],
    },
    {
      key: 'sources',
      label: 'Approved Mills',
      title: 'OUR SOURCES',
      blurb: 'Material drawn only from reputed domestic and international mills, with mill test certificates.',
      duration: '50s',
      reverse: false,
      logos: [
        { src: '/images/logos/sources/jindal-steel-power.png', alt: 'Jindal Steel & Power' },
        { src: '/images/logos/sources/jindal-stainless.png', alt: 'Jindal Stainless (JSL)' },
        { src: '/images/logos/sources/sail.png', alt: 'Steel Authority of India (SAIL)' },
        { src: '/images/logos/sources/vizag-steel.png', alt: 'Vizag Steel — RINL' },
        { src: '/images/logos/sources/mukand.png', alt: 'Mukand Ltd — Bajaj Group' },
        { src: '/images/logos/sources/viraj.png', alt: 'Viraj Profiles' },
        { src: '/images/logos/sources/maharashtra-seamless.png', alt: 'Maharashtra Seamless Limited' },
        { src: '/images/logos/sources/venus-pipes.png', alt: 'Venus Pipes and Tubes' },
        { src: '/images/logos/sources/remi.png', alt: 'Remi Group' },
        { src: '/images/logos/sources/rimjhim-ispat.png', alt: 'Rimjhim Ispat' },
        { src: '/images/logos/sources/arcelormittal.png', alt: 'ArcelorMittal' },
        { src: '/images/logos/sources/amns-india.png', alt: 'AM/NS India' },
        { src: '/images/logos/sources/nippon-steel.png', alt: 'Nippon Steel & Sumitomo Metal Corporation' },
        { src: '/images/logos/sources/tubacex.png', alt: 'Tubacex Group' },
        { src: '/images/logos/sources/sij-acroni.png', alt: 'SIJ Acroni' },
        { src: '/images/logos/sources/dkc.png', alt: 'DKC Steel' },
      ],
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

  // Ref for the "High Quality Products" category carousel (auto-scrolls on mobile)
  const categoryCarouselRef = useRef<HTMLDivElement>(null);

  // 9 Enterprise Testimonials for 3-Column Vertical Infinite Marquee
  const testimonials = [
    {
      id: 1,
      quote:
        'Jyoti Metal provided 316L seamless pipes that exceeded our mill test certificates with sub-micron wall thickness precision and rapid dispatch.',
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
        'Extremely high strength-to-weight ratio titanium alloy plates. The team at Jyoti Metal ensures zero defects across every production batch.',
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

  const [activeCatalogTab, setActiveCatalogTab] = useState<string>('Pipes & Tubes');
  const [activeSubCat, setActiveSubCat] = useState<string>('Stainless Steel Pipes & Tubes');
  const [showAllProducts, setShowAllProducts] = useState<boolean>(false);
  const [isMainCatDropdownOpen, setIsMainCatDropdownOpen] = useState<boolean>(false);
  const [isSubCatDropdownOpen, setIsSubCatDropdownOpen] = useState<boolean>(false);
  const [activeCategoryDot, setActiveCategoryDot] = useState<number>(0);
  const [isMobileView, setIsMobileView] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const initialProductsLimit = isMobileView ? 4 : 9;

  const handleCategoryScroll = () => {
    if (categoryCarouselRef.current) {
      const el = categoryCarouselRef.current;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll > 0) {
        const scrollRatio = el.scrollLeft / maxScroll;
        const index = Math.min(7, Math.max(0, Math.round(scrollRatio * 7)));
        setActiveCategoryDot(index);
      }
    }
  };

  // Automatically select the first sub-category whenever activeCatalogTab changes
  useEffect(() => {
    const defaultSub = getFirstSubCategoryForCategory(activeCatalogTab);
    setActiveSubCat(defaultSub);
    setShowAllProducts(false);
  }, [activeCatalogTab]);

  // Continuously auto-scroll the "High Quality Products" category carousel — mobile view only.
  // Smoothly ping-pongs end-to-end, pauses while the user is touching it, and respects reduced-motion.
  useEffect(() => {
    const el = categoryCarouselRef.current;
    if (!el) return;

    const mql = window.matchMedia('(max-width: 768px)');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const SPEED = 0.7; // px per animation frame (~42px/s) — gentle, tunable

    let rafId = 0;
    let direction = 1;
    let paused = false;
    let resumeTimer = 0;
    let pos = 0;

    const step = () => {
      if (!paused) {
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (maxScroll > 4) {
          pos += direction * SPEED;
          if (pos >= maxScroll) {
            pos = maxScroll;
            direction = -1;
          } else if (pos <= 0) {
            pos = 0;
            direction = 1;
          }
          el.scrollLeft = pos;
        }
      }
      rafId = requestAnimationFrame(step);
    };

    const pause = () => {
      paused = true;
      window.clearTimeout(resumeTimer);
    };
    const resumeSoon = () => {
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => {
        pos = el.scrollLeft; // re-sync after any manual swipe
        paused = false;
      }, 2000);
    };

    const start = () => {
      if (rafId) return;
      pos = el.scrollLeft;
      el.style.scrollSnapType = 'none'; // avoid snap tug so motion stays smooth
      el.addEventListener('pointerdown', pause);
      el.addEventListener('touchstart', pause, { passive: true });
      el.addEventListener('mouseenter', pause);
      el.addEventListener('pointerup', resumeSoon);
      el.addEventListener('touchend', resumeSoon, { passive: true });
      el.addEventListener('mouseleave', resumeSoon);
      rafId = requestAnimationFrame(step);
    };

    const stop = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
      window.clearTimeout(resumeTimer);
      el.style.scrollSnapType = '';
      el.removeEventListener('pointerdown', pause);
      el.removeEventListener('touchstart', pause);
      el.removeEventListener('mouseenter', pause);
      el.removeEventListener('pointerup', resumeSoon);
      el.removeEventListener('touchend', resumeSoon);
      el.removeEventListener('mouseleave', resumeSoon);
    };

    const evaluate = () => {
      if (mql.matches && !reduceMotion.matches) start();
      else stop();
    };

    evaluate();
    mql.addEventListener('change', evaluate);
    reduceMotion.addEventListener('change', evaluate);

    return () => {
      stop();
      mql.removeEventListener('change', evaluate);
      reduceMotion.removeEventListener('change', evaluate);
    };
  }, []);

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

    return matchMain && matchSub;
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
          padding: '64px 0 52px',
        }}
      >
        {/* Full-Bleed Animated Sliding Background Images Stack */}
        {heroSlides.map((slide, sIdx) => (
          <div
            key={slide.id}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.45) 100%), url("${slide.url}")`,
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
          padding: '48px 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          className="container catalog-mobile-grid grid-responsive-about"
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
                src="/images/pipe_stockyard.jpg"
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

          {/* Right Column: Text & Pill Action Button */}
          <div className="reveal multidisciplinary-text-col" style={{ paddingRight: '5%', maxWidth: '620px' }}>
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
                title="Jyoti Metal Industrial Foundry Showcase"
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
          padding: '52px 0',
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

      {/* Why Industry Leaders Trust Jyoti Metal (Interactive Hover Animated 01-04 Layout) */}
      <section className="section bg-white" style={{ padding: '48px 0', position: 'relative', overflow: 'hidden', borderBottom: '1px solid #e2e8f0' }}>
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
                Why Industry Leaders Trust Jyoti Metal
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

          {/* 8 Product Category Cards Grid on Desktop / Phone View Horizontal Carousel */}
          <div
            ref={categoryCarouselRef}
            onScroll={handleCategoryScroll}
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
                image: '/images/plate_forming_mill.jpg',
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
                image: '/images/machine_shop_floor.jpg',
              },
              {
                title: 'Specialized Product',
                mainCat: 'Specialized Product',
                tag: 'Laser Cut & CNC Drilled',
                image: '/images/plate_laser_cutting.jpg',
              },
            ].map((cat, catIdx) => (
              <div
                key={cat.title}
                className={`category-arch-card reveal ${catIdx >= 4 ? 'category-card-extra' : ''}`}
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

          {/* Mobile / Phone View Manual Carousel Controls & Animated Dotted Pagination */}
          <div
            className="mobile-carousel-controls"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              marginTop: '24px',
            }}
          >


            {/* Dotted Sliding Animation Pagination Dots */}
            <div className="carousel-dots-container" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {[0, 1, 2, 3, 4, 5, 6, 7].map((dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => {
                    if (categoryCarouselRef.current) {
                      const el = categoryCarouselRef.current;
                      const maxScroll = el.scrollWidth - el.clientWidth;
                      const targetScroll = (dotIdx / 7) * maxScroll;
                      el.scrollTo({ left: targetScroll, behavior: 'smooth' });
                      setActiveCategoryDot(dotIdx);
                    }
                  }}
                  className={`carousel-dot ${activeCategoryDot === dotIdx ? 'active' : ''}`}
                  style={{
                    width: activeCategoryDot === dotIdx ? '26px' : '8px',
                    height: '8px',
                    borderRadius: activeCategoryDot === dotIdx ? '4px' : '50%',
                    background: activeCategoryDot === dotIdx ? '#51847D' : '#cbd5e1',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                />
              ))}
            </div>


          </div>
        </div>
      </section>


      {/* 5. Interactive Industrial Product Catalog */}
      <section id="catalog-browser" className="section bg-tint" style={{ paddingTop: '48px', paddingBottom: '32px' }}>
        <div className="container">
          {/* Section Header */}
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 30px' }} className="reveal">
            <span className="small-label" style={{ color: '#51847D', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              ENTERPRISE METALLURGY CATALOG
            </span>
            <h2 className="section-title" style={{ fontSize: '2.6rem', color: '#0f172a', marginBottom: '16px' }}>
              Industrial Metal Product Catalog
            </h2>
            <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '28px' }}>
              Explore our complete range of certified stainless steel, titanium alloys, structural profiles, forged flanges, and precision machined components.
            </p>
          </div>

          {/* Mobile Phone View: Custom White Theme Dropdowns (Matching Image 1 Popup Theme) */}
          <div className="mobile-catalog-dropdowns">
            {/* Backdrop overlay for closing dropdowns when clicking outside */}
            {(isMainCatDropdownOpen || isSubCatDropdownOpen) && (
              <div
                style={{ position: 'fixed', inset: 0, zIndex: 90, background: 'transparent' }}
                onClick={() => {
                  setIsMainCatDropdownOpen(false);
                  setIsSubCatDropdownOpen(false);
                }}
              />
            )}

            {/* Dropdown 1: Main Category Selection */}
            <div className="mobile-dropdown-wrapper main-cat-wrapper" style={{ zIndex: isMainCatDropdownOpen ? 100 : 10 }}>
              <button
                type="button"
                onClick={() => {
                  setIsMainCatDropdownOpen(!isMainCatDropdownOpen);
                  setIsSubCatDropdownOpen(false);
                }}
                className="custom-mobile-dropdown-btn"
              >
                <span>{activeCatalogTab}</span>
                <ChevronDown
                  size={18}
                  style={{
                    transform: isMainCatDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.25s ease',
                    color: '#51847D',
                  }}
                />
              </button>

              {isMainCatDropdownOpen && (
                <div className="custom-mobile-dropdown-menu">
                  {[
                    'Pipes & Tubes',
                    'Plates & Sheets',
                    'Round Bars',
                    'Flanges',
                    'Forged Fittings',
                    'Buttweld Fittings',
                    'Fasteners',
                    'Specialized Product',
                  ].map((catId) => {
                    const isSelected = activeCatalogTab === catId;
                    return (
                      <button
                        key={catId}
                        type="button"
                        onClick={() => {
                          setActiveCatalogTab(catId);
                          const defaultSub = getFirstSubCategoryForCategory(catId);
                          setActiveSubCat(defaultSub);
                          setShowAllProducts(false);
                          setIsMainCatDropdownOpen(false);
                        }}
                        className={`custom-mobile-dropdown-item ${isSelected ? 'is-selected' : ''}`}
                      >
                        <span>{catId}</span>
                        {isSelected && <Check size={16} color="#51847D" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Dropdown 2: Sub-Category Selection (Default Selected = First) */}
            <div className="mobile-dropdown-wrapper sub-cat-wrapper" style={{ zIndex: isSubCatDropdownOpen ? 100 : 9 }}>
              <button
                type="button"
                onClick={() => {
                  setIsSubCatDropdownOpen(!isSubCatDropdownOpen);
                  setIsMainCatDropdownOpen(false);
                }}
                className="custom-mobile-dropdown-btn"
              >
                <span>
                  {getSubCategoriesForCategory(activeCatalogTab).find((s) => s.id === effectiveSubCat)?.label || effectiveSubCat}
                </span>
                <ChevronDown
                  size={18}
                  style={{
                    transform: isSubCatDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.25s ease',
                    color: '#51847D',
                  }}
                />
              </button>

              {isSubCatDropdownOpen && (
                <div className="custom-mobile-dropdown-menu">
                  {getSubCategoriesForCategory(activeCatalogTab).map((sub) => {
                    const isSelected = effectiveSubCat === sub.id;
                    return (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => {
                          setActiveSubCat(sub.id);
                          setShowAllProducts(false);
                          setIsSubCatDropdownOpen(false);
                        }}
                        className={`custom-mobile-dropdown-item ${isSelected ? 'is-selected' : ''}`}
                      >
                        <span>{sub.label}</span>
                        {isSelected && <Check size={16} color="#51847D" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Top Horizontal Main Category Tabs Bar (Desktop View Only) */}
          <div
            className="desktop-catalog-tabs"
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
              { id: 'Gasketing Solutions', label: 'Gasketing Solutions' },
              { id: 'Structural Steel', label: 'Structural Steel' },
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
                  padding: '11px 22px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  background: activeCatalogTab === tab.id ? '#51847D' : '#ffffff',
                  color: activeCatalogTab === tab.id ? '#ffffff' : '#1e293b',
                  border: activeCatalogTab === tab.id ? '2px solid #51847D' : '1px solid #e2e8f0',
                  borderRadius: '50px',
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
                  style={{ width: '100%', padding: '10px 14px', fontSize: '0.8rem', borderRadius: '10px', marginBottom: filteredCatalog.length > initialProductsLimit ? '10px' : '0' }}
                >
                  Custom Spec Inquiry
                </button>

                {filteredCatalog.length > initialProductsLimit && (
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
                      borderRadius: '10px',
                      cursor: 'pointer',
                    }}
                  >
                    {showAllProducts ? 'Show Less' : `See All (${filteredCatalog.length} Items)`}
                  </button>
                )}
              </div>
            </div>

            {/* Right Column: Product Cards Grid (Limited to Max 3 Lines / 9 Boxes) */}
            <div style={{ flex: 1 }}>
              {/* Product Cards Grid */}
              {filteredCatalog.length === 0 ? (
                <div style={{ background: '#ffffff', padding: '60px', textAlign: 'center', border: '1px solid #e2e8f0', borderRadius: '16px' }}>
                  <h3 style={{ color: '#0f172a', marginBottom: '8px' }}>No products match your search query</h3>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '20px' }}>Try clearing your search term or selecting another sub-category.</p>
                  <button
                    onClick={() => { setActiveCatalogTab('Pipes & Tubes'); setActiveSubCat('Stainless Steel Pipes & Tubes'); }}
                    className="btn btn-accent"
                    style={{ padding: '10px 24px', borderRadius: '10px' }}
                  >
                    Reset Catalog Filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px', alignItems: 'stretch' }}>
                    {(showAllProducts ? filteredCatalog : filteredCatalog.slice(0, initialProductsLimit)).map((prod) => (
                      <div
                        key={prod.id}
                        className="product-card"
                        onClick={() => onNavigate(`product-detail?id=${encodeURIComponent(prod.id)}`)}
                        style={{
                          background: '#ffffff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '0px',
                          display: 'flex',
                          flexDirection: 'column',
                          height: '100%',
                          cursor: 'pointer',
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
                        <span className="product-badge">
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
                                padding: '4px 10px',
                                borderRadius: '0px',
                              }}
                            >
                              {spec}
                            </span>
                          ))}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', marginTop: 'auto', borderTop: '1px solid #f1f5f9' }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenQuoteModal(prod.title);
                            }}
                            className="btn btn-accent"
                            style={{ padding: '8px 16px', fontSize: '0.82rem', fontWeight: 700 }}
                          >
                            Get Quote
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigate(`product-detail?id=${encodeURIComponent(prod.id)}`);
                            }}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#588078',
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

                {filteredCatalog.length > initialProductsLimit && (
                    <div style={{ textAlign: 'center', marginTop: '36px' }}>
                      <button
                        onClick={() => setShowAllProducts(!showAllProducts)}
                        className="btn btn-accent"
                        style={{ padding: '12px 32px', fontSize: '0.9rem', borderRadius: '0px' }}
                      >
                        {showAllProducts
                          ? 'Show Less'
                          : `See All ${activeCatalogTab !== 'all' ? activeCatalogTab : ''} Products (${filteredCatalog.length} Total Items)`}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

          </div>

          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <button
              onClick={() => onNavigate('products')}
              className="btn btn-outline"
              style={{ padding: '12px 32px' }}
            >
              Browse Full Product Catalog Specs <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* 7. Client Testimonials 3-Column Vertical Infinite Marquee Section */}
      <section
        className="section bg-white"
        style={{
          padding: '44px 0 48px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Header Title */}
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 24px' }} className="reveal">
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
                          <Star key={sIdx} size={16} fill="#51847D" color="#51847D" />
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
                          <Star key={sIdx} size={16} fill="#51847D" color="#51847D" />
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
                          <Star key={sIdx} size={16} fill="#51847D" color="#51847D" />
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

      {/* 8. TPI Agencies / Clients / Sources — three infinite logo rails */}
      <section
        style={{
          background: '#ffffff',
          padding: '70px 0 60px',
          borderTop: '1px solid #e2e8f0',
          borderBottom: '1px solid #e2e8f0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 46px' }} className="reveal">
            <span className="small-label" style={{ color: '#51847D', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              WHO WE WORK WITH
            </span>
            <h2 className="section-title" style={{ fontSize: '2.5rem', color: '#061221', marginBottom: '14px', fontWeight: 900, letterSpacing: '0.02em' }}>
              INSPECTED, TRUSTED &amp; SOURCED
            </h2>
            <div style={{ width: '60px', height: '4px', background: '#51847D', margin: '0 auto 16px' }} />
            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Every consignment passes through recognised third-party inspection, reaches India&rsquo;s
              largest process and power industries, and starts life at an approved mill.
            </p>
          </div>
        </div>

        {logoRails.map((rail) => (
          <div key={rail.key} className="logo-rail">
            <div className="container">
              <div className="logo-rail-head">
                <span className="logo-rail-label">{rail.label}</span>
                <h3 className="logo-rail-title">{rail.title}</h3>
                <p className="logo-rail-blurb">{rail.blurb}</p>
              </div>
            </div>

            {/* Infinite scroll: the list is duplicated so the -50% keyframe lands
                on an identical frame and the loop reads as continuous. */}
            <div className="marquee-container">
              <div
                className={`marquee-track${rail.reverse ? ' marquee-reverse' : ''}`}
                style={{ gap: '64px', alignItems: 'center', animationDuration: rail.duration }}
              >
                {[...Array(2)].map((_, loopIdx) => (
                  <React.Fragment key={loopIdx}>
                    {rail.logos.map((logo) => (
                      <div
                        key={logo.src}
                        /* Uniform slot: wordmarks are far wider than the square
                           marks, so each logo is fitted inside the same box
                           instead of sharing one height — otherwise IRCLASS
                           (5:1) would run several times the width of BARC. */
                        style={{
                          flexShrink: 0,
                          width: '170px',
                          height: '62px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <img
                          src={logo.src}
                          alt={logo.alt}
                          title={logo.alt}
                          loading="lazy"
                          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                        />
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
