import React, { useState } from 'react';
import {
  ArrowUpRight,
  Calendar,
  User,
  Clock,
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
}

const categories = [
  'All Blogs',
  'Materials Science',
  'Manufacturing',
  'Industry Trends',
  'Case Studies',
  'Sustainability',
];

const articles: Article[] = [
  {
    id: 1,
    title: 'CHOOSING BETWEEN 304 AND 316L STAINLESS FOR MARINE SERVICE',
    excerpt: 'How 2-3% molybdenum addition prevents pitting and crevice corrosion in offshore marine & chemical process environments.',
    category: 'Materials Science',
    date: 'July 18, 2026',
    readTime: '8 min read',
    image: '/images/pexels-bence-szemerey-337043-6804265.jpg',
    author: 'Dr. Anita Rao',
  },
  {
    id: 2,
    title: 'DUPLEX VS SUPER DUPLEX CORROSION RESISTANCE GUIDE',
    excerpt: 'Comparing PREN ratings and ferrite-austenite phase balance for aggressive oilfield and chemical processing pipelines.',
    category: 'Materials Science',
    date: 'June 28, 2026',
    readTime: '10 min read',
    image: '/images/pexels-eugeniofr-30005294.jpg',
    author: 'Dr. Anita Rao',
  },
  {
    id: 3,
    title: 'VACUUM ARC REMELTING & HIGH-CYCLE ALLOY FATIGUE',
    excerpt: 'Refining grain boundaries and stripping non-metallic inclusions for aerospace-grade structural titanium & nickel forgings.',
    category: 'Manufacturing',
    date: 'July 09, 2026',
    readTime: '6 min read',
    image: '/images/pexels-sergey-sergeev-2153675005-32845683.jpg',
    author: 'Rajesh Menon',
  },
  {
    id: 4,
    title: 'ZERO-CARBON ELECTRIC ARC FURNACE STEELMAKING',
    excerpt: 'Transitioning to 100% renewable powered EAF production to cut carbon intensity by 65% across raw melt heats.',
    category: 'Sustainability',
    date: 'June 15, 2026',
    readTime: '7 min read',
    image: '/images/pexels-jakubzerdzicki-33813584.jpg',
    author: 'Priya Nair',
  },
  {
    id: 5,
    title: 'EN 10204 3.1 VS 3.2 MILL CERTIFICATION COMPLIANCE',
    excerpt: 'Understanding independent third-party inspection (Lloyds/TUV) and full heat-lot material origin traceability.',
    category: 'Industry Trends',
    date: 'June 03, 2026',
    readTime: '5 min read',
    image: '/images/pexels-willians-huerta-2157111846-36397988.jpg',
    author: 'Vikram Shah',
  },
  {
    id: 6,
    title: 'TITANIUM GRADE 5 AEROSPACE FIELD CASE STUDY',
    excerpt: 'Tracking Ti-6Al-4V structural bracket dimensional tolerance retention through 10,000 thermal shock cycles.',
    category: 'Case Studies',
    date: 'May 22, 2026',
    readTime: '12 min read',
    image: '/images/pexels-tokuo-nobuhiro-79378678-20472153.jpg',
    author: 'Rajesh Menon',
  },
];

export const BlogPage: React.FC<BlogPageProps> = ({ onOpenQuoteModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Blogs');

  const filteredArticles = selectedCategory === 'All Blogs'
    ? articles
    : articles.filter((a) => a.category === selectedCategory);

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh', paddingBottom: '80px' }}>
      
      {/* 1. Cinematic Industrial Hero Banner (Matching Screenshot Layout & Crosshair Grid) */}
      <section
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(0, 0, 0, 0.72) 0%, rgba(0, 0, 0, 0.84) 100%), url("/images/pexels-sergey-sergeev-2153675005-32845683.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          overflow: 'hidden',
          color: '#FFFFFF',
          padding: '64px 0 54px',
          borderBottom: '3px solid #588078',
          marginBottom: '36px',
        }}
      >
        {/* Thin Architectural Grid Lines Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '160px 160px',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '750px', textAlign: 'left' }}>
            
            {/* Breadcrumb Trail */}
            <div style={{ fontSize: '0.84rem', color: '#CBD5E1', marginBottom: '14px', letterSpacing: '0.4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#588078', fontWeight: 800 }}>&raquo;</span>
              <span>Home</span>
              <span style={{ color: '#64748B' }}>/</span>
              <span style={{ color: '#FFFFFF', fontWeight: 600 }}>Blogs &amp; Technical Insights</span>
            </div>

            {/* Main Left-Aligned Heading */}
            <h1
              style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
                fontWeight: 800,
                color: '#FFFFFF',
                lineHeight: 1.15,
                marginBottom: '14px',
                letterSpacing: '0.5px',
              }}
            >
              Blogs &amp; Technical Insights
            </h1>

            {/* Subtitle Description */}
            <p style={{ fontSize: '1.05rem', color: '#CBD5E1', lineHeight: 1.6, margin: 0, letterSpacing: '0.3px' }}>
              Discover insights, technical whitepapers, and stories that matter across defense, aerospace, and energy infrastructure.
            </p>

          </div>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Showing Posts Counter Bar */}
        <div style={{ marginBottom: '20px', fontSize: '0.88rem', color: '#64748B' }}>
          Showing <strong style={{ color: '#0F172A' }}>{filteredArticles.length}</strong> of{' '}
          <strong style={{ color: '#0F172A' }}>{articles.length}</strong> blogs
        </div>

        {/* Category Filter Bar */}
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '36px' }}>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '10px 20px',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  background: isActive ? '#588078' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#304050',
                  border: isActive ? '1px solid #588078' : '1px solid #CBD5E1',
                  borderRadius: 0,
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* 3-Column Articles Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '28px',
          }}
        >
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              style={{
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.02)',
                transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
              }}
              onClick={() => onOpenQuoteModal(article.title)}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#588078';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(88, 128, 120, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E2E8F0';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.02)';
              }}
            >
              {/* Image Container with Category Badge */}
              <div style={{ height: '230px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={article.image}
                  alt={article.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
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
                    padding: '6px 12px',
                    letterSpacing: '0.8px',
                    textTransform: 'uppercase',
                  }}
                >
                  {article.category}
                </span>
              </div>

              {/* Card Body */}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#64748B', marginBottom: '14px' }}>
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
                    fontSize: '1.15rem',
                    fontWeight: 800,
                    color: '#0F172A',
                    lineHeight: 1.35,
                    marginBottom: '12px',
                    letterSpacing: '0.3px',
                  }}
                >
                  {article.title}
                </h3>

                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, marginBottom: '24px', flex: 1 }}>
                  {article.excerpt}
                </p>

                {/* Footer Row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '16px',
                    borderTop: '1px solid #F1F5F9',
                    fontSize: '0.82rem',
                    color: '#64748B',
                  }}
                >
                  <span style={{ fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
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
    </div>
  );
};