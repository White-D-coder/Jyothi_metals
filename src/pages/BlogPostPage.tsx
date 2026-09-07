import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { getArticleBySlug, getRelatedArticles } from '../data/blogArticles';

interface BlogPostPageProps {
  onOpenQuoteModal: (productName?: string) => void;
}

const ACCENT = '#588078';
const INK = '#0F172A';
const BODY = '#334155';
const MUTED = '#64748B';

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ onOpenQuoteModal }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const article = slug ? getArticleBySlug(slug) : undefined;

  // A mistyped or retired slug gets a real message and a way back, rather than
  // silently rendering the first article as if it were the one requested.
  if (!article) {
    return (
      <div style={{ background: '#F8FAFC', minHeight: '70vh', padding: '120px 24px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: INK, marginBottom: '12px' }}>
          Article not found
        </h1>
        <p style={{ color: MUTED, marginBottom: '28px' }}>
          That article may have been moved or renamed.
        </p>
        <Link
          to="/blog"
          style={{ color: ACCENT, fontWeight: 800, textDecoration: 'underline', textUnderlineOffset: '3px' }}
        >
          Back to all articles
        </Link>
      </div>
    );
  }

  const related = getRelatedArticles(article);

  return (
    <div style={{ background: '#FFFFFF' }}>
      {/* Hero: image behind a scrim, title and byline over it. */}
      <div style={{ position: 'relative', minHeight: '420px', display: 'flex', alignItems: 'flex-end' }}>
        <img
          src={article.image}
          alt=""
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(6,18,33,0.55) 0%, rgba(6,18,33,0.90) 100%)',
          }}
        />
        <div
          className="container"
          style={{ position: 'relative', maxWidth: '860px', margin: '0 auto', padding: '48px 24px 46px', width: '100%' }}
        >
          <button
            type="button"
            onClick={() => navigate('/blog')}
            style={{
              // Block-level so the category badge below starts a new line;
              // as inline-flex the two ran together on the same row.
              display: 'flex',
              width: 'fit-content',
              alignItems: 'center',
              gap: '8px',
              background: 'transparent',
              border: 'none',
              padding: 0,
              color: '#A7C4BE',
              fontSize: '0.84rem',
              fontWeight: 800,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              marginBottom: '20px',
              fontFamily: 'inherit',
            }}
          >
            <ArrowLeft size={16} /> All Articles
          </button>

          <span
            style={{
              display: 'inline-block',
              background: ACCENT,
              color: '#FFFFFF',
              fontSize: '0.72rem',
              fontWeight: 800,
              padding: '6px 12px',
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
              marginBottom: '18px',
            }}
          >
            {article.category}
          </span>

          <h1
            style={{
              fontSize: 'clamp(1.7rem, 4vw, 2.6rem)',
              fontWeight: 900,
              color: '#FFFFFF',
              lineHeight: 1.2,
              letterSpacing: '0.3px',
              margin: '0 0 20px',
            }}
          >
            {article.title}
          </h1>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '18px',
              color: '#CBD5E1',
              fontSize: '0.86rem',
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <User size={15} color="#A7C4BE" /> {article.author}
              <span style={{ color: '#7C8894' }}>&middot; {article.authorRole}</span>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={15} color="#A7C4BE" /> {article.date}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={15} color="#A7C4BE" /> {article.readTime}
            </span>
          </div>
        </div>
      </div>

      {/* Body. Narrow measure — long technical prose is unreadable full-width. */}
      <article style={{ maxWidth: '860px', margin: '0 auto', padding: '52px 24px 12px' }}>
        <p
          style={{
            fontSize: '1.16rem',
            lineHeight: 1.7,
            color: INK,
            fontWeight: 500,
            margin: '0 0 40px',
            paddingLeft: '20px',
            borderLeft: `4px solid ${ACCENT}`,
          }}
        >
          {article.standfirst}
        </p>

        {article.sections.map((section) => (
          <section key={section.heading} style={{ marginBottom: '40px' }}>
            <h2
              style={{
                fontSize: '1.42rem',
                fontWeight: 800,
                color: INK,
                lineHeight: 1.3,
                margin: '0 0 16px',
                letterSpacing: '0.2px',
              }}
            >
              {section.heading}
            </h2>

            {section.paragraphs.map((p, i) => (
              <p key={i} style={{ fontSize: '1.02rem', lineHeight: 1.78, color: BODY, margin: '0 0 18px' }}>
                {p}
              </p>
            ))}

            {section.bullets && (
              <ul style={{ margin: '0 0 18px', paddingLeft: '0', listStyle: 'none' }}>
                {section.bullets.map((b) => (
                  <li
                    key={b}
                    style={{
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'flex-start',
                      fontSize: '1rem',
                      lineHeight: 1.7,
                      color: BODY,
                      marginBottom: '10px',
                    }}
                  >
                    <span style={{ color: ACCENT, fontWeight: 900, flexShrink: 0, lineHeight: 1.7 }}>&bull;</span>
                    {b}
                  </li>
                ))}
              </ul>
            )}

            {section.table && (
              <div style={{ margin: '0 0 18px' }}>
                {/* Spec tables run wide; scroll inside the block so the page never does. */}
                <div style={{ overflowX: 'auto', border: '1px solid #E0E8E8' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', minWidth: '520px' }}>
                    <thead>
                      <tr style={{ background: ACCENT, color: '#FFFFFF' }}>
                        {section.table.headers.map((h) => (
                          <th
                            key={h}
                            style={{
                              padding: '11px 14px',
                              textAlign: 'left',
                              fontWeight: 700,
                              whiteSpace: 'nowrap',
                              borderRight: '1px solid rgba(255,255,255,0.2)',
                            }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row, rIdx) => (
                        <tr key={rIdx} style={{ background: rIdx % 2 ? '#F8FAFA' : '#FFFFFF' }}>
                          {row.map((cell, cIdx) => (
                            <td
                              key={cIdx}
                              style={{
                                padding: '10px 14px',
                                color: cIdx === 0 ? INK : BODY,
                                fontWeight: cIdx === 0 ? 700 : 400,
                                borderTop: '1px solid #E0E8E8',
                                borderRight: '1px solid #EDF2F2',
                              }}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {section.table.caption && (
                  <p style={{ fontSize: '0.8rem', color: MUTED, margin: '8px 0 0' }}>{section.table.caption}</p>
                )}
              </div>
            )}
          </section>
        ))}

        {/* Key points */}
        <div style={{ background: '#F4F6F8', border: '1px solid #E0E8E8', borderTop: `4px solid ${ACCENT}`, padding: '26px 28px', marginBottom: '44px' }}>
          <h2 style={{ fontSize: '0.86rem', fontWeight: 800, color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.9px', margin: '0 0 16px' }}>
            Key Points
          </h2>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {article.takeaways.map((t) => (
              <li key={t} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '0.96rem', lineHeight: 1.65, color: BODY, marginBottom: '11px' }}>
                <CheckCircle2 size={17} color={ACCENT} style={{ flexShrink: 0, marginTop: '3px' }} />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA — the quote modal moves here, off the card click target. */}
        <div style={{ background: '#061221', padding: '32px 30px', marginBottom: '56px' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            Need this grade for a live enquiry?
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '0.96rem', lineHeight: 1.65, margin: '0 0 20px' }}>
            Send us the specification, size and quantity and our desk will come back with grade
            options, available stock and an EN 10204 3.1 certified quotation.
          </p>
          <button
            type="button"
            onClick={() => onOpenQuoteModal()}
            style={{
              background: ACCENT,
              color: '#FFFFFF',
              border: 'none',
              padding: '13px 26px',
              fontSize: '0.9rem',
              fontWeight: 800,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Request a Quote
          </button>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <div style={{ background: '#F8FAFC', borderTop: '1px solid #E2E8F0', padding: '50px 24px 60px' }}>
          <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: INK, margin: '0 0 26px' }}>
              More from the technical desk
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {related.map((r) => (
                <Link
                  key={r.id}
                  to={`/blog/${r.slug}`}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ height: '160px', overflow: 'hidden' }}>
                    <img src={r.image} alt="" aria-hidden="true" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '18px 20px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.7px', marginBottom: '9px' }}>
                      {r.category}
                    </span>
                    <h3 style={{ fontSize: '1rem', fontWeight: 800, color: INK, lineHeight: 1.35, margin: '0 0 12px', flex: 1 }}>
                      {r.title}
                    </h3>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.84rem', fontWeight: 800, color: ACCENT }}>
                      Read Article <ArrowUpRight size={15} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
