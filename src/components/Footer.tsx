import React, { useState } from 'react';
import {
  Layers,
  ArrowRight,
  ChevronUp,
} from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenQuoteModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenQuoteModal }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundImage: 'linear-gradient(135deg, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0.65) 50%, rgba(0, 0, 0, 0.92) 100%), url("/images/jm1.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: '#cbd5e1',
        padding: '70px 0 30px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* 1. Top Newsletter Bar (Logo + Newsletter Form matching Reference Image) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr 1.6fr',
            gap: '30px',
            alignItems: 'center',
            paddingBottom: '50px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '50px',
          }}
        >
          {/* Brand Logo Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                background: '#0284c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
              }}
            >
              <Layers size={22} />
            </div>
            <div>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '1.4rem', color: '#ffffff', lineHeight: 1, letterSpacing: '0.02em' }}>
                JYOTHI METALS
              </span>
              <div style={{ fontSize: '0.62rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.14em', marginTop: '2px' }}>
                PRIVATE LIMITED
              </div>
            </div>
          </div>

          {/* Newsletter Text Prompt */}
          <div style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.4 }}>
            Subscribe to receive latest metallurgical stock news &amp; enterprise offers from us.
          </div>

          {/* Newsletter Form Input */}
          <div>
            {subscribed ? (
              <div style={{ background: '#0284c7', color: '#ffffff', padding: '12px 20px', fontWeight: 700, fontSize: '0.9rem', textAlign: 'center' }}>
                Thank you! You are subscribed to updates.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', width: '100%' }}>
                <input
                  type="email"
                  placeholder="Email Address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  style={{
                    flex: 1,
                    background: '#1e293b',
                    border: '1px solid #334155',
                    color: '#ffffff',
                    padding: '14px 18px',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: '#0284c7',
                    color: '#ffffff',
                    border: 'none',
                    padding: '14px 28px',
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    letterSpacing: '0.05em',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    whiteSpace: 'nowrap',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#0369a1')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#0284c7')}
                >
                  JOIN US <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 2. Main 4-Column Footer Content */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1.6fr 1.2fr 1fr',
            gap: '40px',
            paddingBottom: '50px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Column 1: About Company */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 800, marginBottom: '18px' }}>
              About Company
            </h4>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '24px' }}>
              Leading manufacturer and supplier of certified precision stainless steel, titanium plates, and structural metal profiles across global aerospace, energy, and defense projects.
            </p>
            <div>
              <div style={{ color: '#38bdf8', fontSize: '1.5rem', fontWeight: 900, fontFamily: 'Outfit, sans-serif' }}>
                Since 1991
              </div>
              <div style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', marginTop: '2px', textTransform: 'uppercase' }}>
                OVER 30+ YEARS EXPERIENCE
              </div>
            </div>
          </div>

          {/* Column 2: Useful Links (2 Sub-Columns) */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 800, marginBottom: '18px' }}>
              Useful Links
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li>
                  <a
                    href="#about"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab('about');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.88rem' }}
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#products"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab('products');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.88rem' }}
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab('about');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.88rem' }}
                  >
                    Work Process
                  </a>
                </li>
                <li>
                  <a
                    href="#home"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab('home');
                    }}
                    style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.88rem' }}
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab('about');
                    }}
                    style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.88rem' }}
                  >
                    Team
                  </a>
                </li>
              </ul>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li>
                  <a
                    href="#products"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab('products');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.88rem' }}
                  >
                    Our Catalog
                  </a>
                </li>
                <li>
                  <a
                    href="#products"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab('products');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.88rem' }}
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab('about');
                    }}
                    style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.88rem' }}
                  >
                    Certifications
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onOpenQuoteModal();
                    }}
                    style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.88rem' }}
                  >
                    Instant Quote
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab('contact');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.88rem' }}
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: Office Address & Email Address */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 800, marginBottom: '14px' }}>
              Office Address
            </h4>
            <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '24px' }}>
              Plot 42, Industrial Development Zone, Phase II, Hyderabad, Telangana 500032
            </p>

            <h4 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 800, marginBottom: '10px' }}>
              Email Address
            </h4>
            <p style={{ color: '#cbd5e1', fontSize: '0.88rem', margin: 0, lineHeight: 1.6 }}>
              info@jyothimetals.com<br />
              sales@jyothimetals.com
            </p>
          </div>

          {/* Column 4: Phone Number & Follow Us */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 800, marginBottom: '14px' }}>
              Phone Number
            </h4>
            <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '24px' }}>
              +91 98765 43210<br />
              +91 40 1234 5678
            </p>

            <h4 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 800, marginBottom: '14px' }}>
              Follow Us
            </h4>
            <div style={{ display: 'flex', gap: '10px' }}>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{
                  width: '36px',
                  height: '36px',
                  background: '#1e293b',
                  border: '1px solid #334155',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  transition: 'background 0.2s, border-color 0.2s',
                }}
                aria-label="Facebook"
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{
                  width: '36px',
                  height: '36px',
                  background: '#1e293b',
                  border: '1px solid #334155',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  transition: 'background 0.2s, border-color 0.2s',
                }}
                aria-label="Twitter"
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z"/>
                </svg>
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{
                  width: '36px',
                  height: '36px',
                  background: '#1e293b',
                  border: '1px solid #334155',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  transition: 'background 0.2s, border-color 0.2s',
                }}
                aria-label="LinkedIn"
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{
                  width: '36px',
                  height: '36px',
                  background: '#1e293b',
                  border: '1px solid #334155',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  transition: 'background 0.2s, border-color 0.2s',
                }}
                aria-label="Instagram"
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* 3. Bottom Legal & Copyright Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '24px',
            fontSize: '0.85rem',
            color: '#64748b',
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} Jyothi Metals Private Limited. All Rights Reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {/* Back To Top Scroll Button in Matching Industrial Blue */}
            <button
              onClick={scrollToTop}
              style={{
                width: '36px',
                height: '36px',
                background: '#0284c7',
                border: 'none',
                color: '#ffffff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                marginLeft: '12px',
                transition: 'background 0.2s',
              }}
              aria-label="Scroll to top"
              onMouseEnter={(e) => (e.currentTarget.style.background = '#0369a1')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#0284c7')}
            >
              <ChevronUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
