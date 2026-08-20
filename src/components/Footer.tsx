import React, { useState } from 'react';
import {
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
        borderTop: 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* 1. Top Newsletter Bar (Logo + Newsletter Form matching Reference Image) */}
        <div
          className="footer-newsletter-grid"
          style={{
            paddingBottom: '50px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '50px',
          }}
        >
          <div className="footer-logo-brand" style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <img
              src="/images/jmi_logo.png"
              alt="JMI - Jyoti Metal (India)"
              style={{
                height: '92px',
                width: 'auto',
                objectFit: 'contain',
                transform: 'scale(1.15)',
                transformOrigin: 'center left',
                filter: 'drop-shadow(0 3px 10px rgba(0,0,0,0.4))',
              }}
            />
            <div>
              <span className="footer-brand-title" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '1.45rem', color: '#ffffff', lineHeight: 1.1, letterSpacing: '0.02em', display: 'block' }}>
                JYOTI METAL (INDIA)
              </span>
              <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#77b8b0', letterSpacing: '0.12em', marginTop: '4px' }}>
                AN ISO 9001:2015 CERTIFIED COMPANY
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
              <div style={{ background: '#51847D', color: '#ffffff', padding: '12px 20px', fontWeight: 700, fontSize: '0.9rem', textAlign: 'center' }}>
                Thank you! You are subscribed to updates.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="footer-subscribe-form" style={{ display: 'flex', width: '100%', gap: '8px' }}>
                <input
                  type="email"
                  placeholder="Email Address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  aria-label="Email address for newsletter"
                  required
                  style={{
                    flex: 1,
                    minWidth: '0',
                    background: '#1e293b',
                    border: '1px solid #334155',
                    color: '#ffffff',
                    padding: '14px 18px',
                    fontSize: '16px', // Prevents iOS Safari auto-zoom
                    outline: 'none',
                    minHeight: '44px',
                  }}
                />
                <button
                  type="submit"
                  className="footer-join-btn"
                  style={{
                    background: '#51847D',
                    color: '#ffffff',
                    border: 'none',
                    padding: '14px 24px',
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    letterSpacing: '0.05em',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    whiteSpace: 'nowrap',
                    transition: 'background 0.2s',
                    minHeight: '44px',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#3d6963')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#51847D')}
                >
                  JOIN US <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 2. Main 4-Column Footer Content */}
        <div
          className="footer-main-grid"
          style={{
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
              <div style={{ color: '#77b8b0', fontSize: '1.5rem', fontWeight: 900, fontFamily: 'Outfit, sans-serif' }}>
                Since 1989
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
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab('services');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.88rem' }}
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#infrastructure"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab('infrastructure');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.88rem' }}
                  >
                    Infrastructure
                  </a>
                </li>
                <li>
                  <a
                    href="#blog"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab('blog');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.88rem' }}
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#careers"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab('careers');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.88rem' }}
                  >
                    Careers
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
                    href="#quality"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab('quality');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.88rem' }}
                  >
                    Certifications
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab('faq');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.88rem' }}
                  >
                    FAQ
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

          {/* Column 3: Office Addresses */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 800, marginBottom: '10px' }}>
              Regd. Office (Mumbai)
            </h4>
            <p style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '14px' }}>
              102, Praveen House, 4th Kumbharwada Lane, Mumbai-400004.<br />
              <span style={{ color: '#94a3b8' }}>Tel: 022-66363385 / 66595923 / 66595771</span>
            </p>

            <h4 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 800, marginBottom: '10px' }}>
              Branch Office (Delhi)
            </h4>
            <p style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '14px' }}>
              302, Indra Prastha Tower, 6th Community Centre, Wazirpur, DELHI - 110 052.
            </p>

            <h4 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 800, marginBottom: '10px' }}>
              Plant Address (Rajasthan)
            </h4>
            <p style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
              Plot No. E-41 (G-1) RIICO Industrial Area, Alwar - 301019, Rajasthan, India
            </p>
          </div>

          {/* Column 4: Contact Persons & Emails */}
          <div className="footer-contact-group">
            <div>
              <h4 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 800, marginBottom: '10px' }}>
                Leadership &amp; Sales
              </h4>
              <div style={{ color: '#cbd5e1', fontSize: '0.84rem', lineHeight: 1.6, marginBottom: '16px' }}>
                <div style={{ marginBottom: '8px' }}>
                  <strong style={{ color: '#ffffff' }}>Dhawal Choudhary:</strong><br />
                  <a href="tel:+919322281549" style={{ color: '#77b8b0', textDecoration: 'none', fontWeight: 700 }}>+91 9322281549</a>
                </div>
                <div>
                  <strong style={{ color: '#ffffff' }}>Dinesh Choudhary:</strong><br />
                  <a href="tel:+919769388813" style={{ color: '#77b8b0', textDecoration: 'none', fontWeight: 700 }}>+91 9769388813</a>
                </div>
              </div>
            </div>

            <div>
              <h4 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 800, marginBottom: '10px' }}>
                Email Address
              </h4>
              <p style={{ color: '#cbd5e1', fontSize: '0.82rem', margin: 0, lineHeight: 1.6 }}>
                info@jyotimetal.co.in
              </p>
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
            &copy; {new Date().getFullYear()} Jyoti Metal (India) - ISO 9001:2015 Certified Company. All Rights Reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {/* Back To Top Scroll Button in Matching JMI Teal */}
            <button
              onClick={scrollToTop}
              style={{
                width: '36px',
                height: '36px',
                background: '#51847D',
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
              onMouseEnter={(e) => (e.currentTarget.style.background = '#3d6963')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#51847D')}
            >
              <ChevronUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
