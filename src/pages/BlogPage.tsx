import React, { useState } from 'react';
import { ArrowRight, ChevronRight, Calendar, Clock, User, CheckCircle2, Mail } from 'lucide-react';

interface BlogPageProps {
  onOpenQuoteModal: () => void;
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
    title: 'Choosing Between 304 and 316L Stainless for Marine Environments',
    excerpt:
      'Chloride exposure is the silent enemy of stainless steel. We break down how the 2-3% molybdenum content in 316L dramatically extends service life in coastal, offshore, and saltwater processing applications versus standard 304.',
    category: 'Materials Science',
    date: 'July 18, 2026',
    readTime: '8 min read',
    image: '/images/stainless_pipes.png',
    author: 'Dr. Anita Rao',
  },
  {
    id: 2,
    title: 'How Vacuum Arc Remelting Improves Alloy Purity',
    excerpt:
      'Non-metallic inclusions compromise fatigue life in critical components. Discover how our VAR furnaces refine grain structure and strip volatile impurities to deliver aerospace-grade cleanliness across titanium and nickel superalloys.',
    category: 'Manufacturing',
    date: 'July 09, 2026',
    readTime: '6 min read',
    image: '/images/pexels-alex-60339926-9878853.jpg',
    author: 'Rajesh Menon',
  },
  {
    id: 3,
    title: 'Duplex vs Super Duplex: A Corrosion Resistance Guide',
    excerpt:
      'Pitting Resistance Equivalent Number (PREN) is the metric that separates duplex from super duplex grades. Learn where each family earns its place in oil, gas, and chemical processing pipelines under aggressive service conditions.',
    category: 'Materials Science',
    date: 'June 28, 2026',
    readTime: '10 min read',
    image: '/images/round_bars.png',
    author: 'Dr. Anita Rao',
  },
  {
    id: 4,
    title: 'The Road to Zero-Carbon Electric Arc Steelmaking',
    excerpt:
      'Transitioning from blast furnaces to renewable-powered electric arc furnaces cut our carbon intensity by 65%. Here is the operational playbook behind our shift to a fully circular, scrap-fed production model.',
    category: 'Sustainability',
    date: 'June 15, 2026',
    readTime: '7 min read',
    image: '/images/industrial_facility.png',
    author: 'Priya Nair',
  },
  {
    id: 5,
    title: 'Understanding EN 10204 3.1 vs 3.2 Certification',
    excerpt:
      'The difference between a 3.1 and a 3.2 Mill Test Certificate can decide contract compliance. We explain who validates each report, when third-party inspection is mandatory, and how full heat-lot traceability protects your project.',
    category: 'Industry Trends',
    date: 'June 03, 2026',
    readTime: '5 min read',
    image: '/images/titanium_plates.png',
    author: 'Vikram Shah',
  },
  {
    id: 6,
    title: 'Titanium Grade 5 in Aerospace: A Field Study',
    excerpt:
      'Ti-6Al-4V remains the workhorse of modern airframes. This field study follows a batch of Grade 5 plates from vacuum remelt to installed structural bracket, tracking tolerance retention through thermal cycling and fatigue loading.',
    category: 'Case Studies',
    date: 'May 22, 2026',
    readTime: '12 min read',
    image: '/images/precision_parts.png',
    author: 'Rajesh Menon',
  },
  {
    id: 7,
    title: 'Preventing Intergranular Corrosion in Welded Assemblies',
    excerpt:
      'Sensitization during welding can quietly destroy corrosion resistance at the grain boundaries. Learn how low-carbon L-grades, stabilized alloys, and controlled heat input keep your welded assemblies field-ready for decades.',
    category: 'Manufacturing',
    date: 'May 10, 2026',
    readTime: '9 min read',
    image: '/images/pipe_fittings.png',
    author: 'Priya Nair',
  },
];

export const BlogPage: React.FC<BlogPageProps> = ({ onOpenQuoteModal, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);
  const [hoveredPill, setHoveredPill] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const featured = articles[0];
  const restArticles = articles.slice(1);

  const filteredArticles =
    selectedCategory === 'All'
      ? restArticles
      : restArticles.filter((a) => a.category === selectedCategory);

  const filterOptions = ['All', ...categories];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().length > 0) {
      setSubscribed(true);
    }
  };

  return (
    <div className="inner-page" style={{ background: '#ffffff', minHeight: '100vh' }}>
      {/* 1. Dark Image Hero */}
      <section
        className="page-hero"
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.92) 100%), url("/images/pexels-eugeniofr-30005294.jpg")',
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
            <span
              className="small-label"
              style={{ color: '#77b8b0', letterSpacing: '0.14em', marginBottom: '16px' }}
            >
              Insights &amp; Industry News
            </span>
            <h1
              className="hero-title"
              style={{
                fontSize: '3.6rem',
                color: '#ffffff',
                marginBottom: '20px',
                lineHeight: 1.1,
              }}
            >
              The Metallurgy Journal
            </h1>
            <p style={{ fontSize: '1.15rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
              Field studies, materials science deep-dives, and manufacturing insight from the
              metallurgists and engineers behind Jyothi Metals.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Featured Post + Filter + Articles Grid */}
      <section className="section bg-white" style={{ padding: '80px 0' }}>
        <div className="container">
          {/* Featured Post */}
          <div style={{ marginBottom: '20px' }}>
            <span
              className="small-label"
              style={{ color: '#51847D', letterSpacing: '0.12em' }}
            >
              Featured Article
            </span>
          </div>

          <div
            className="grid-responsive-about"
            style={{
              display: 'grid',
              gridTemplateColumns: '1.1fr 1fr',
              gap: '0',
              alignItems: 'stretch',
              border: '1px solid #e2e8f0',
              borderRadius: '18px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
              marginBottom: '70px',
            }}
          >
            <div style={{ position: 'relative', minHeight: '380px' }}>
              <img
                src={featured.image}
                alt={featured.title}
                style={{
                  width: '100%',
                  height: '100%',
                  minHeight: '380px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>

            <div
              className="blog-featured-body"
              style={{
                background: '#ffffff',
                padding: '44px 44px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <div style={{ marginBottom: '18px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    background: '#51847D',
                    color: '#ffffff',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    padding: '6px 14px',
                    borderRadius: '50px',
                  }}
                >
                  {featured.category}
                </span>
              </div>

              <h2
                className="card-title"
                style={{
                  fontSize: '2rem',
                  color: '#0f172a',
                  lineHeight: 1.2,
                  marginTop: 0,
                  marginBottom: '18px',
                }}
              >
                {featured.title}
              </h2>

              <p style={{ fontSize: '1.02rem', color: '#475569', lineHeight: 1.7, marginBottom: '24px' }}>
                {featured.excerpt}
              </p>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: '18px',
                  marginBottom: '28px',
                  fontSize: '0.85rem',
                  color: '#64748b',
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <User size={15} color="#51847D" /> {featured.author}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={15} color="#51847D" /> {featured.date}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={15} color="#51847D" /> {featured.readTime}
                </span>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => {}}
                  className="btn btn-accent"
                  style={{ padding: '14px 30px', fontSize: '0.98rem', background: '#51847D', borderColor: '#51847D' }}
                >
                  Read Article <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div style={{ marginBottom: '40px' }}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                justifyContent: 'center',
              }}
            >
              {filterOptions.map((cat) => {
                const isActive = selectedCategory === cat;
                const isHovered = hoveredPill === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    onMouseEnter={() => setHoveredPill(cat)}
                    onMouseLeave={() => setHoveredPill(null)}
                    style={{
                      padding: '10px 20px',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      letterSpacing: '0.02em',
                      cursor: 'pointer',
                      borderRadius: '50px',
                      background: isActive ? '#51847D' : isHovered ? '#f8fafc' : '#ffffff',
                      color: isActive ? '#ffffff' : '#334155',
                      border: `1px solid ${isActive || isHovered ? '#51847D' : '#cbd5e1'}`,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Articles Grid */}
          <div
            className="grid-responsive-3col"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}
          >
            {filteredArticles.map((article) => {
              const isHovered = hoveredCardId === article.id;
              return (
                <article
                  key={article.id}
                  onMouseEnter={() => setHoveredCardId(article.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  style={{
                    background: '#ffffff',
                    border: `1px solid ${isHovered ? '#51847D' : '#e2e8f0'}`,
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: isHovered
                      ? '0 14px 32px rgba(0,0,0,0.10)'
                      : '0 6px 20px rgba(0,0,0,0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                  }}
                >
                  {/* Image with category pill overlay */}
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <img
                      src={article.image}
                      alt={article.title}
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        top: '14px',
                        left: '14px',
                        background: '#51847D',
                        color: '#ffffff',
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        padding: '5px 12px',
                        borderRadius: '50px',
                      }}
                    >
                      {article.category}
                    </span>
                  </div>

                  {/* Body */}
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        gap: '14px',
                        fontSize: '0.78rem',
                        color: '#94a3b8',
                        marginBottom: '12px',
                      }}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                        <Calendar size={13} /> {article.date}
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                        <Clock size={13} /> {article.readTime}
                      </span>
                    </div>

                    <h3
                      className="card-title"
                      style={{
                        fontSize: '1.2rem',
                        color: '#0f172a',
                        lineHeight: 1.3,
                        marginTop: 0,
                        marginBottom: '12px',
                      }}
                    >
                      {article.title}
                    </h3>

                    <p
                      style={{
                        fontSize: '0.9rem',
                        color: '#64748b',
                        lineHeight: 1.6,
                        margin: 0,
                        marginBottom: '18px',
                        flex: 1,
                      }}
                    >
                      {article.excerpt}
                    </p>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderTop: '1px solid #e2e8f0',
                        paddingTop: '14px',
                      }}
                    >
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '0.78rem',
                          color: '#94a3b8',
                        }}
                      >
                        <User size={13} color="#51847D" /> {article.author}
                      </span>

                      <button
                        type="button"
                        onClick={() => {}}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          background: 'transparent',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          color: '#51847D',
                          letterSpacing: '0.02em',
                        }}
                      >
                        Read more <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {filteredArticles.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                color: '#64748b',
                fontSize: '1rem',
                padding: '40px 0',
              }}
            >
              No articles found in this category yet. Check back soon.
            </div>
          )}
        </div>
      </section>

      {/* 3. Newsletter CTA Band */}
      <section style={{ background: '#061221', padding: '80px 0', borderTop: '3px solid #51847D' }}>
        <div className="container">
          <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
            <span
              className="small-label"
              style={{ color: '#77b8b0', letterSpacing: '0.14em' }}
            >
              Stay Informed
            </span>
            <h2
              className="section-title"
              style={{ fontSize: '2.3rem', color: '#ffffff', marginTop: '8px', marginBottom: '16px', lineHeight: 1.2 }}
            >
              Subscribe to The Metallurgy Journal
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '32px' }}>
              Get new materials science guides, case studies, and manufacturing insight delivered
              to your inbox. No spam, unsubscribe anytime.
            </p>

            {subscribed ? (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: '#1e293b',
                  border: '1px solid #51847D',
                  borderRadius: '16px',
                  color: '#ffffff',
                  padding: '18px 28px',
                  fontSize: '1rem',
                  fontWeight: 700,
                }}
              >
                <CheckCircle2 size={22} color="#77b8b0" /> Thank you for subscribing. Your first
                issue is on its way.
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '14px',
                  justifyContent: 'center',
                  maxWidth: '540px',
                  margin: '0 auto',
                }}
              >
                <div style={{ position: 'relative', flex: '1 1 260px', minWidth: '240px' }}>
                  <Mail
                    size={18}
                    color="#94a3b8"
                    style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email"
                    style={{
                      width: '100%',
                      minHeight: '44px',
                      padding: '12px 16px 12px 44px',
                      fontSize: '16px',
                      color: '#ffffff',
                      background: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '10px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-accent"
                  style={{
                    padding: '12px 30px',
                    fontSize: '1rem',
                    minHeight: '44px',
                    background: '#51847D',
                    borderColor: '#51847D',
                    flex: '0 0 auto',
                  }}
                >
                  Subscribe <ArrowRight size={18} />
                </button>
              </form>
            )}

            <div style={{ marginTop: '36px', display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={onOpenQuoteModal}
                className="btn btn-outline"
                style={{
                  padding: '12px 26px',
                  fontSize: '0.92rem',
                  color: '#cbd5e1',
                  borderColor: '#334155',
                  background: 'transparent',
                }}
              >
                Have a project spec instead? Request a Quote <ChevronRight size={16} />
              </button>
              {onNavigate && (
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="btn btn-outline"
                  style={{
                    padding: '12px 26px',
                    fontSize: '0.92rem',
                    color: '#cbd5e1',
                    borderColor: '#334155',
                    background: 'transparent',
                  }}
                >
                  Talk to Our Team <ChevronRight size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
