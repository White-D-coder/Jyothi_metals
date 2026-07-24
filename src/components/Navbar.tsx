import React, { useState } from 'react';
import { ChevronDown, Menu, X, Phone, Mail, Clock } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenQuoteModal: () => void;
  onSelectCategory?: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenQuoteModal,
  onSelectCategory,
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string, category?: string) => {
    if (category && onSelectCategory) {
      onSelectCategory(category);
    }
    setActiveTab(id);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDropdownClick = (dropdownName: string) => {
    if (activeDropdown === dropdownName) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdownName);
    }
  };

  const productDropdownItems = [
    'Pipes & Tubes',
    'Plates & Sheets',
    'Round Bars',
    'Flanges',
    'Forged Fittings',
    'Buttweld Fittings',
    'Fasteners',
    'Specialized Product',
  ];

  return (
    <header style={{ width: '100%', position: 'sticky', top: 0, zIndex: 1000 }}>
      {/* Top Announcement Bar: Static on Desktop (>768px), Sliding Marquee Ticker on Mobile/Tablet (<=768px) */}
      <div className="top-announcement-bar">
        {/* Desktop Static Layout */}
        <div className="top-announcement-desktop">
          <div className="container top-announcement-container">
            <div className="top-announcement-wrapper">
              <a href="tel:+919322281549" className="top-bar-item">
                <Phone size={13} className="top-bar-icon" />
                <span className="top-bar-label">CALL US:</span>
                <span className="top-bar-val">+91 9322281549</span>
              </a>

              <span className="top-bar-divider">|</span>

              <a href="mailto:info@jyotimetal.co.in" className="top-bar-item">
                <Mail size={13} className="top-bar-icon" />
                <span className="top-bar-label">MAIL US:</span>
                <span className="top-bar-val">info@jyotimetal.co.in</span>
              </a>

              <span className="top-bar-divider">|</span>

              <div className="top-bar-item">
                <Clock size={13} className="top-bar-icon" />
                <span className="top-bar-label">TIMING:</span>
                <span className="top-bar-val">Mon - Sat: 9:00 AM - 7:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Infinite Sliding Marquee Ticker */}
        <div className="top-announcement-mobile-ticker">
          <div className="top-announcement-track">
            {[...Array(3)].map((_, loopIdx) => (
              <React.Fragment key={loopIdx}>
                <a href="tel:+919322281549" className="top-bar-item">
                  <Phone size={13} className="top-bar-icon" />
                  <span className="top-bar-label">CALL US:</span>
                  <span className="top-bar-val">+91 9322281549</span>
                </a>

                <span className="top-bar-divider">|</span>

                <a href="mailto:info@jyotimetal.co.in" className="top-bar-item">
                  <Mail size={13} className="top-bar-icon" />
                  <span className="top-bar-label">MAIL US:</span>
                  <span className="top-bar-val">info@jyotimetal.co.in</span>
                </a>

                <span className="top-bar-divider">|</span>

                <div className="top-bar-item">
                  <Clock size={13} className="top-bar-icon" />
                  <span className="top-bar-label">TIMING:</span>
                  <span className="top-bar-val">Mon - Sat: 9:00 AM - 7:00 PM</span>
                </div>

                <span className="top-bar-divider">|</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Main White Navigation Bar with Dropdowns */}
      <div className="navbar-main">
        <div className="container nav-main-container">
          {/* Official JMI Brand Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="logo-link"
          >
            <img
              src="/images/jmi_logo.png"
              alt="JMI - Jyoti Metal (India) Logo"
              style={{ height: '48px', width: 'auto', objectFit: 'contain' }}
            />
            <div className="brand-text-full">
              <span className="brand-title-text">JYOTI METAL (INDIA)</span>
              <span className="brand-subtitle-text">AN ISO 9001:2015 CERTIFIED COMPANY</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <ul className="nav-menu">
            <li className="nav-item">
              <a
                href="#home"
                className={`nav-menu-link ${activeTab === 'home' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('home');
                }}
              >
                Home
              </a>
            </li>

            {/* Company ▾ Dropdown */}
            <li
              className="nav-item"
              onMouseEnter={() => setActiveDropdown('company')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a
                href="#about"
                className={`nav-menu-link ${activeTab === 'about' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleDropdownClick('company');
                }}
              >
                Company <ChevronDown size={14} />
              </a>
              <div className={`dropdown-menu ${activeDropdown === 'company' ? 'is-open' : ''}`}>
                <a
                  href="#about"
                  className="dropdown-item"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('about');
                  }}
                >
                  About Us &amp; Heritage
                </a>
                <a
                  href="#about"
                  className="dropdown-item"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('about');
                  }}
                >
                  Foundry Infrastructure
                </a>
                <a
                  href="#about"
                  className="dropdown-item"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('about');
                  }}
                >
                  Quality Policy &amp; ISO Standards
                </a>
                <a
                  href="#about"
                  className="dropdown-item"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('about');
                  }}
                >
                  Certifications &amp; Compliance
                </a>
              </div>
            </li>

            {/* Products ▾ Dropdown */}
            <li
              className="nav-item"
              onMouseEnter={() => setActiveDropdown('products')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a
                href="#products"
                className={`nav-menu-link ${activeTab === 'products' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleDropdownClick('products');
                }}
              >
                Products <ChevronDown size={14} />
              </a>
              <div className={`dropdown-menu ${activeDropdown === 'products' ? 'is-open' : ''}`}>
                {productDropdownItems.map((item) => (
                  <a
                    key={item}
                    href="#products"
                    className="dropdown-item"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('products', item);
                    }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </li>

            {/* Materials ▾ Dropdown */}
            <li
              className="nav-item"
              onMouseEnter={() => setActiveDropdown('materials')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a
                href="#products"
                className="nav-menu-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleDropdownClick('materials');
                }}
              >
                Materials <ChevronDown size={14} />
              </a>
              <div className={`dropdown-menu ${activeDropdown === 'materials' ? 'is-open' : ''}`}>
                <a
                  href="#products"
                  className="dropdown-item"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('products');
                  }}
                >
                  Stainless Steel 316L / 304
                </a>
                <a
                  href="#products"
                  className="dropdown-item"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('products');
                  }}
                >
                  Titanium Alloy Grade 5
                </a>
                <a
                  href="#products"
                  className="dropdown-item"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('products');
                  }}
                >
                  Structural Carbon Steel A36
                </a>
                <a
                  href="#products"
                  className="dropdown-item"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('products');
                  }}
                >
                  Superalloys &amp; Inconel
                </a>
              </div>
            </li>

            {/* Services ▾ Dropdown */}
            <li
              className="nav-item"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a
                href="#about"
                className="nav-menu-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleDropdownClick('services');
                }}
              >
                Services <ChevronDown size={14} />
              </a>
              <div className={`dropdown-menu ${activeDropdown === 'services' ? 'is-open' : ''}`}>
                <a
                  href="#about"
                  className="dropdown-item"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('about');
                  }}
                >
                  Custom Laser Cutting &amp; Milling
                </a>
                <a
                  href="#about"
                  className="dropdown-item"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('about');
                  }}
                >
                  Continuous Electric Arc Casting
                </a>
                <a
                  href="#about"
                  className="dropdown-item"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('about');
                  }}
                >
                  Ultrasonic Weld Inspection
                </a>
              </div>
            </li>

            {/* Price ▾ Dropdown */}
            <li
              className="nav-item"
              onMouseEnter={() => setActiveDropdown('price')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a
                href="#contact"
                className="nav-menu-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleDropdownClick('price');
                }}
              >
                Price <ChevronDown size={14} />
              </a>
              <div className={`dropdown-menu ${activeDropdown === 'price' ? 'is-open' : ''}`}>
                <a
                  href="#"
                  className="dropdown-item"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenQuoteModal();
                  }}
                >
                  Instant Alloy Quote Calculator
                </a>
                <a
                  href="#contact"
                  className="dropdown-item"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('contact');
                  }}
                >
                  Sheet &amp; Plate Weight Estimator
                </a>
              </div>
            </li>

            <li className="nav-item">
              <a
                href="#about"
                className="nav-menu-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('about');
                }}
              >
                Blog
              </a>
            </li>

            <li className="nav-item">
              <a
                href="#contact"
                className={`nav-menu-link nav-link-cta ${activeTab === 'contact' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('contact');
                }}
              >
                Contact Us
              </a>
            </li>
          </ul>

          {/* Mobile Hamburger Toggle */}
          <button
            className="hamburger-sharp"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            style={{ minWidth: '44px', minHeight: '44px', alignItems: 'center', justifyContent: 'center' }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer & Backdrop */}
        {mobileMenuOpen && (
          <>
            <div
              style={{
                position: 'fixed',
                inset: 0,
                top: '120px',
                background: 'rgba(15, 23, 42, 0.5)',
                zIndex: 998,
              }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <div
              id="mobile-nav-drawer"
              style={{
                position: 'relative',
                zIndex: 999,
                background: '#ffffff',
                borderTop: '1px solid #cbd5e1',
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                maxHeight: 'calc(100vh - 120px)',
                overflowY: 'auto',
                boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
              }}
            >
              <a href="#home" className="dropdown-item" onClick={() => handleNavClick('home')} style={{ padding: '12px 16px', fontWeight: 700 }}>Home</a>
              <a href="#about" className="dropdown-item" onClick={() => handleNavClick('about')} style={{ padding: '12px 16px', fontWeight: 700 }}>Company &amp; Infrastructure</a>
              <a href="#products" className="dropdown-item" onClick={() => handleNavClick('products')} style={{ padding: '12px 16px', fontWeight: 700 }}>Products Catalog</a>
              <a href="#contact" className="dropdown-item" onClick={() => handleNavClick('contact')} style={{ padding: '12px 16px', fontWeight: 700 }}>Contact &amp; Weight Estimator</a>

              <div style={{ padding: '12px 16px', borderTop: '1px solid #e2e8f0', marginTop: '6px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#51847D', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Popular Product Categories
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {productDropdownItems.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleNavClick('products', item)}
                      style={{
                        background: '#edf5f4',
                        border: '1px solid #cbd5e1',
                        padding: '8px 10px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: '#0f172a',
                        textAlign: 'left',
                        cursor: 'pointer',
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => { setMobileMenuOpen(false); onOpenQuoteModal(); }}
                className="btn btn-accent"
                style={{ marginTop: '12px', width: '100%', padding: '14px' }}
              >
                Get Instant Quote
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};
