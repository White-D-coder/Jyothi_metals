import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  User,
  BookOpen,
  Clock,
  CheckCircle2,
  Mail,
} from 'lucide-react';

interface BlogPageProps {
  onOpenQuoteModal: (productName?: string) => void;
  onNavigate?: (tab: string) => void;
}

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
  verticalTag: string;
  highlights?: string[];
}

const categories = [
  'Materials Science',
  'Industry Trends',
  'Case Studies',
  'Manufacturing',
  'Sustainability',
];

const articles: Article[] = [
  {
    id: 1,
    title: 'CHOOSING BETWEEN 304 AND 316L STAINLESS FOR MARINE SERVICE',
    excerpt: 'How 2-3% molybdenum addition prevents pitting and crevice corrosion in offshore marine & chemical process environments.',
    category: 'Materials Science',
    verticalTag: 'MATERIALS SCIENCE',
    date: 'July 18, 2026',
    readTime: '8 min read',
    image: '/images/pexels-bence-szemerey-337043-6804265.jpg',
    author: 'Dr. Anita Rao',
    highlights: [
      'PREN resistance comparison between 304 (19.0) and 316L (24.5)',
      'Intergranular corrosion control via low-carbon 0.03% max chemistry',
      'Cost-benefit analysis for seawater & splash-zone applications',
    ],
  },
  {
    id: 2,
    title: 'VACUUM ARC REMELTING & HIGH-CYCLE ALLOY FATIGUE',
    excerpt: 'Refining grain boundaries and stripping non-metallic inclusions for aerospace-grade structural titanium & nickel forgings.',
    category: 'Manufacturing',
    verticalTag: 'MANUFACTURING',
    date: 'July 09, 2026',
    readTime: '6 min read',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    author: 'Rajesh Menon',
    highlights: [
      'Double & triple VAR melt refinement cycles explained',
      'Ultrasonic cleanliness grading per SAE AMS 2631 standards',
      'Yield strength retention at elevated 650°C operational thresholds',
    ],
  },
  {
    id: 3,
    title: 'DUPLEX VS SUPER DUPLEX CORROSION RESISTANCE GUIDE',
    excerpt: 'Comparing PREN ratings and ferrite-austenite phase balance for aggressive oilfield and chemical processing pipelines.',
    category: 'Materials Science',
    verticalTag: 'CORROSION CONTROL',
    date: 'June 28, 2026',
    readTime: '10 min read',
    image: '/images/pexels-eugeniofr-30005294.jpg',
    author: 'Dr. Anita Rao',
    highlights: [
      '50/50 phase balance optimization via nitrogen alloying',
      'Critical Pitting Temperature (CPT) testing per ASTM G48 Method A',
      'NACE MR0175 / ISO 15156 sour service compliance rules',
    ],
  },
  {
    id: 4,
    title: 'ZERO-CARBON ELECTRIC ARC FURNACE STEELMAKING',
    excerpt: 'Transitioning to 100% renewable powered EAF production to cut carbon intensity by 65% across raw melt heats.',
    category: 'Sustainability',
    verticalTag: 'SUSTAINABILITY',
    date: 'June 15, 2026',
    readTime: '7 min read',
    image: '/images/pexels-jakubzerdzicki-33813584.jpg',
    author: 'Priya Nair',
    highlights: [
      'Green hydrogen direct reduced iron (DRI) charge feeding',
      'Scope 1 & 2 carbon footprint transparency in EN 10204 3.1 MTCs',
      'Recycled scrap steel purity verification via OES spectrometers',
    ],
  },
  {
    id: 5,
    title: 'EN 10204 3.1 VS 3.2 MILL CERTIFICATION COMPLIANCE',
    excerpt: 'Understanding independent third-party inspection (Lloyds/TUV) and full heat-lot material origin traceability.',
    category: 'Industry Trends',
    verticalTag: 'QUALITY & SPECS',
    date: 'June 03, 2026',
    readTime: '5 min read',
    image: '/images/pexels-willians-huerta-2157111846-36397988.jpg',
    author: 'Vikram Shah',
    highlights: [
      'Manufacturer 3.1 self-validation vs 3.2 witnessed stamping',
      '25-year digital QR archival system for Mill Test Certificates',
      'Avoiding counterfeit material test reports in nuclear & defense supply',
    ],
  },
  {
    id: 6,
    title: 'TITANIUM GRADE 5 AEROSPACE FIELD CASE STUDY',
    excerpt: 'Tracking Ti-6Al-4V structural bracket dimensional tolerance retention through 10,000 thermal shock cycles.',
    category: 'Case Studies',
    verticalTag: 'AEROSPACE STUDY',
    date: 'May 22, 2026',
    readTime: '12 min read',
    image: '/images/pexels-tokuo-nobuhiro-79378678-20472153.jpg',
    author: 'Rajesh Menon',
    highlights: [
      'Sub-micron optical alignment retention under ±0.01 mm tolerance',
      'Weight reduction vs 17-4PH stainless structural airframe components',
      'Fatigue crack propagation rate (da/dN) analysis curves',
    ],
  },
  {
    id: 7,
    title: 'PREVENTING SENSITIZATION IN WELDED STAINLESS ASSEMBLIES',
    excerpt: 'Using low-carbon L-grades and controlled interpass heat input to eliminate chromium carbide precipitation.',
    category: 'Manufacturing',
    verticalTag: 'METALLURGY INSIGHT',
    date: 'May 10, 2026',
    readTime: '9 min read',
    image: '/images/pexels-pppsdavid-5851494.jpg',
    author: 'Priya Nair',
    highlights: [
      'Solution annealing heat treatment cycles at 1050°C',
      'Intergranular corrosion testing per ASTM A262 Practice E',
      'Purging gas protocols for GTAW root pass weld integrity',
    ],
  },
];

export const BlogPage: React.FC<BlogPageProps> = ({ onOpenQuoteModal }) => {
  const [selectedCategory] = useState<string>(categories[0]);
  const [emailInput, setEmailInput] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const filteredArticles = articles.filter((a) => a.category === selectedCategory);
  const featuredLead = articles[0];
  const bentoSides = articles.slice(1, 3);
  const zigZagItems = articles.slice(3, 5);
  const gridArticles = filteredArticles.length >= 3
    ? filteredArticles
    : [...filteredArticles, ...articles.filter((a) => !filteredArticles.some((f) => f.id === a.id)).slice(0, 3 - filteredArticles.length)];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
    }
  };

  return (
    <div className="blog-page-root" style={{ background: '#F8FAF9', minHeight: '100vh', color: '#0F172A' }}>
      <style>{`
        .blog-page-root {
          font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .slash-tab-btn {
          background: transparent;
          border: none;
          color: #475569;
          font-size: 0.84rem;
          font-weight: 600;
          cursor: pointer;
          padding: 12px 16px;
          position: relative;
          transition: color 150ms ease;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .slash-tab-btn:hover,
        .slash-tab-btn.active {
          color: #0F172A;
          font-weight: 700;
        }
        .slash-tab-btn::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 12px;
          right: 12px;
          height: 3px;
          background: #588078;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .slash-tab-btn:hover::after,
        .slash-tab-btn.active::after {
          transform: scaleX(1);
        }

        .btn {
          border-radius: 0 !important;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: background-color 150ms ease, border-color 150ms ease, transform 150ms ease;
        }
        .btn-primary {
          background: #588078;
          color: #FFFFFF;
          border: none;
        }
        .btn-primary:hover { background: #4D716A; }
        .btn-secondary {
          background: #FFFFFF;
          color: #588078;
          border: 1px solid #E2E8F0;
        }
        .btn-secondary:hover { background: #F8FAF9; border-color: #588078; }

        .bento-hero-grid {
          display: grid;
          grid-template-columns: 1.8fr 1fr;
          gap: 24px;
        }

        .zigzag-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }

        @media (max-width: 992px) {
          .bento-hero-grid { grid-template-columns: 1fr; }
          .zigzag-row { grid-template-columns: 1fr; gap: 28px; }
          .zigzag-row.reverse { display: flex; flex-direction: column-reverse; }
        }
      `}</style>

      {/* 1. Hero Header Section */}
      <section
        style={{
          backgroundImage: 'linear-gradient(120deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.58) 100%), url("/images/pexels-bence-szemerey-337043-6804265.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF',
          padding: '80px 0 50px',
          borderBottom: '3px solid #588078',
        }}
      >
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ maxWidth: '850px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#70C0B0', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              METALLURGICAL KNOWLEDGE HUB
            </span>
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
              Metallurgy Journal &amp; Technical Insights
            </h1>
            <p style={{ fontSize: '1.08rem', color: '#CBD5E1', lineHeight: 1.65, margin: 0, letterSpacing: '0.3px' }}>
              Peer-reviewed technical guides, material selection benchmarks, and EN 10204 compliance standards from our metallurgical engineering team.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Top Horizontal Sticky Sub-Navigation Slash Bar */}
      {/* <nav
        style={{
          position: 'sticky',
          top: '72px',
          zIndex: 900,
          background: '#FFFFFF',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
        }}
      >
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              padding: '4px 0',
            }}
          >
            {categories.map((cat, index) => {
              const isActive = selectedCategory === cat;
              return (
                <React.Fragment key={cat}>
                  {index > 0 && (
                    <span
                      style={{
                        color: '#588078',
                        opacity: 0.45,
                        fontSize: '1.1rem',
                        fontWeight: 300,
                        transform: 'skewX(-18deg)',
                        userSelect: 'none',
                        margin: '0 4px',
                      }}
                    >
                      /
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`slash-tab-btn ${isActive ? 'active' : ''}`}
                  >
                    {cat}
                  </button>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </nav> */}

      {/* 3. Section 1: FEATURED BENTO MAGAZINE GRID */}
      <section style={{ padding: '60px 0 70px', background: '#FFFFFF'}}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
            <div>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#588078', letterSpacing: '0.8px', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                EDITORIAL SPOTLIGHT
              </span>
              <h2 style={{ fontSize: 'clamp(1.7rem, 3vw, 2.2rem)', fontWeight: 800, color: '#0F172A', margin: 0, letterSpacing: '0.5px' }}>
                Featured Engineering Whitepaper
              </h2>
            </div>
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BookOpen size={18} color="#588078" /> Updated Monthly
            </span>
          </div>

          <div className="bento-hero-grid">
            {/* Main Lead Bento Card (2/3 width) */}
            <div
              style={{
                position: 'relative',
                height: '500px',
                overflow: 'hidden',
                background: '#0F172A',
                border: '1px solid #E2E8F0',
                boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}
              onClick={() => onOpenQuoteModal(featuredLead.title)}
            >
              <img
                src={featuredLead.image}
                alt={featuredLead.title}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.65) contrast(1.1)',
                  transition: 'transform 400ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.1) 0%, rgba(15, 23, 42, 0.92) 85%)',
                }}
              />

              <div style={{ position: 'relative', zIndex: 2, padding: '36px' }}>
                <span
                  style={{
                    background: '#588078',
                    color: '#FFFFFF',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    padding: '6px 14px',
                    letterSpacing: '0.8px',
                    textTransform: 'uppercase',
                    display: 'inline-block',
                    marginBottom: '14px',
                  }}
                >
                  {featuredLead.category}
                </span>

                <h3
                  style={{
                    fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    lineHeight: 1.25,
                    marginBottom: '12px',
                    letterSpacing: '0.4px',
                  }}
                >
                  {featuredLead.title}
                </h3>

                <p style={{ fontSize: '0.98rem', color: '#E2E8F0', lineHeight: 1.6, marginBottom: '20px', maxWidth: '650px' }}>
                  {featuredLead.excerpt}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.82rem', color: '#CBD5E1' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <User size={14} color="#70C0B0" /> {featuredLead.author}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Clock size={14} color="#70C0B0" /> {featuredLead.readTime}
                    </span>
                  </div>

                  <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#70C0B0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    Read Full Whitepaper <ArrowUpRight size={18} />
                  </span>
                </div>
              </div>
            </div>

            {/* Side Bento Stack (1/3 width) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {bentoSides.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    padding: '24px',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'border-color 200ms ease, transform 200ms ease, box-shadow 200ms ease',
                  }}
                  onClick={() => onOpenQuoteModal(item.title)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#588078';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    // e.currentTarget.style.boxShadow = '0 8px 24px rgba(88, 128, 120, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.04)';
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#588078', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                        {item.category}
                      </span>
                      <span style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: 600 }}>
                        {item.readTime}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', lineHeight: 1.35, marginBottom: '8px' }}>
                      {item.title}
                    </h4>

                    <p style={{ fontSize: '0.86rem', color: '#475569', lineHeight: 1.55, margin: 0 }}>
                      {item.excerpt}
                    </p>
                  </div>

                  <div style={{ paddingTop: '16px', borderTop: '1px solid #F1F5F9', marginTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>By {item.author}</span>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#588078', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      Read <ArrowRight size={15} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section 2: ZIG-ZAG EDITORIAL DEEP DIVES */}
      <section style={{ padding: '80px 0', background: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 50px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#588078', letterSpacing: '0.8px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              TECHNICAL DEEP DIVES
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', fontWeight: 800, color: '#0F172A', margin: 0, letterSpacing: '0.5px' }}>
              In-Depth Metallurgical Analysis
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
            {/* Zig-Zag Item 1 (Photo Left, Text Right) */}
            {zigZagItems[0] && (
              <div className="zigzag-row">
                <div style={{ border: '1px solid #E2E8F0', overflow: 'hidden', height: '360px', boxShadow: '0 8px 24px rgba(0,0,0,0.04)' }}>
                  <img
                    src={zigZagItems[0].image}
                    alt={zigZagItems[0].title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#588078', borderLeft: '3px solid #588078', paddingLeft: '12px', marginBottom: '12px' }}>
                    FEATURED CASE 01
                  </div>

                  <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.3, marginBottom: '12px' }}>
                    {zigZagItems[0].title}
                  </h3>

                  <p style={{ fontSize: '0.96rem', color: '#475569', lineHeight: 1.65, marginBottom: '20px' }}>
                    {zigZagItems[0].excerpt}
                  </p>

                  {zigZagItems[0].highlights && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                      {zigZagItems[0].highlights.map((h, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: '#0F172A', fontWeight: 600 }}>
                          <CheckCircle2 size={16} color="#588078" /> {h}
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => onOpenQuoteModal(zigZagItems[0].title)}
                    className="btn btn-primary"
                    style={{ padding: '14px 28px', fontSize: '0.9rem' }}
                  >
                    Read Technical Study <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Zig-Zag Item 2 (Text Left, Photo Right) */}
            {zigZagItems[1] && (
              <div className="zigzag-row reverse">
                <div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#588078', borderLeft: '3px solid #588078', paddingLeft: '12px', marginBottom: '12px' }}>
                    FEATURED CASE 02
                  </div>

                  <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.3, marginBottom: '12px' }}>
                    {zigZagItems[1].title}
                  </h3>

                  <p style={{ fontSize: '0.96rem', color: '#475569', lineHeight: 1.65, marginBottom: '20px' }}>
                    {zigZagItems[1].excerpt}
                  </p>

                  {zigZagItems[1].highlights && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                      {zigZagItems[1].highlights.map((h, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: '#0F172A', fontWeight: 600 }}>
                          <CheckCircle2 size={16} color="#588078" /> {h}
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => onOpenQuoteModal(zigZagItems[1].title)}
                    className="btn btn-primary"
                    style={{ padding: '14px 28px', fontSize: '0.9rem' }}
                  >
                    Read Technical Study <ArrowRight size={16} />
                  </button>
                </div>

                <div style={{ border: '1px solid #E2E8F0', overflow: 'hidden', height: '360px', boxShadow: '0 8px 24px rgba(0,0,0,0.04)' }}>
                  <img
                    src={zigZagItems[1].image}
                    alt={zigZagItems[1].title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. Section 3: CURATED MAGAZINE ARTICLE GRID */}
      <section style={{ padding: '70px 0 80px', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 40px', textAlign: 'center' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#588078', letterSpacing: '0.8px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
            DIRECTORY CATALOG
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', fontWeight: 800, color: '#0F172A', margin: 0, letterSpacing: '0.5px' }}>
            All Metallurgy Articles ({selectedCategory})
          </h2>
        </div>

        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '32px',
            }}
          >
            {gridArticles.map((article) => (
              <div
                key={article.id}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'border-color 250ms ease, transform 250ms ease, box-shadow 250ms ease',
                }}
                onClick={() => onOpenQuoteModal(article.title)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#588078';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 14px 32px rgba(88, 128, 120, 0.14)';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.03)';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1)';
                }}
              >
                <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={article.image}
                    alt={article.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 400ms ease',
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      background: '#588078',
                      color: '#FFFFFF',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '5px 12px',
                      letterSpacing: '0.6px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {article.category}
                  </span>
                </div>

                <div style={{ padding: '26px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.8rem', color: '#64748B', marginBottom: '12px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <Calendar size={14} color="#588078" /> {article.date}
                    </span>
                    <span>&bull;</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <User size={14} color="#588078" /> {article.author}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '1.18rem',
                      fontWeight: 800,
                      color: '#0F172A',
                      lineHeight: 1.35,
                      marginBottom: '12px',
                      letterSpacing: '0.3px',
                    }}
                  >
                    {article.title}
                  </h3>

                  <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.65, marginBottom: '24px', flex: 1 }}>
                    {article.excerpt}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '18px', borderTop: '1px solid #F1F5F9', fontSize: '0.82rem', color: '#64748B' }}>
                    <span style={{ fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={14} color="#588078" /> {article.readTime}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#588078', fontWeight: 800, fontSize: '0.86rem' }}>
                      Read Article <ArrowUpRight size={16} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Section 4: EXECUTIVE NEWSLETTER & SPEC CTA BANNER */}
      <section
        style={{
          background: '#ffffffff',
          color: '#0F172A',
          padding: '80px 0',
          textAlign: 'center',
        }}
      >
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#588078', letterSpacing: '0.8px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
            ENGINEERING BULLETIN SUBSCRIPTION
          </span>
          <h2 style={{ fontSize: 'clamp(1.9rem, 3.4vw, 2.5rem)', fontWeight: 800, color: '#0F172A', marginBottom: '14px', lineHeight: 1.25 }}>
            Subscribe to Monthly Metallurgy Bulletins
          </h2>
          <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.65, marginBottom: '36px', maxWidth: '640px', margin: '0 auto 36px' }}>
            Get expert alloy selection guides, market nickel &amp; titanium price trends, and EN 10204 compliance updates delivered to your inbox.
          </p>

          {subscribed ? (
            <div
              style={{
                background: '#EDF5F4',
                border: '1px solid #588078',
                color: '#588078',
                padding: '16px 24px',
                fontWeight: 700,
                fontSize: '0.96rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <CheckCircle2 size={20} /> Thank you! You are subscribed to technical bulletins.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: 'flex', justifyContent: 'center', gap: '12px', maxWidth: '540px', margin: '0 auto 28px', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
                <Mail size={18} color="#64748B" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="email"
                  required
                  placeholder="Enter your work email address"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 16px 14px 44px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.92rem',
                    color: '#0F172A',
                    outline: 'none',
                    borderRadius: 0,
                  }}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ padding: '14px 28px', fontSize: '0.92rem', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}
              >
                Subscribe <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};