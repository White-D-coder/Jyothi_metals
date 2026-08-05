import React, { useState } from 'react';
import { ChevronDown, Menu, X, Plus, Minus, Phone, Mail, Clock } from 'lucide-react';

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
  // Which mobile accordion is expanded — only one at a time, so a long drawer
  // never buries Contact Us under every open sub-list.
  const [mobileSection, setMobileSection] = useState<string | null>(null);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileSection(null);
  };

  const handleNavClick = (id: string, category?: string) => {
    if (category && onSelectCategory) {
      onSelectCategory(category);
    } else {
      setActiveTab(id);
    }
    setActiveDropdown(null);
    closeMobileMenu();
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
    'Gasketing Solutions',
    'Structural Steel',
    'Specialized Product',
  ];

  /* Mirrors the desktop <ul className="nav-menu"> above so the drawer offers the
     same seven entries with the same sub-lists — keep the two in step when a
     link is added. `items` present ⇒ renders as an accordion. */
  const mobileNav: {
    key: string;
    label: string;
    id?: string;
    items?: { label: string; id?: string; category?: string; onClick?: () => void }[];
  }[] = [
    { key: 'home', label: 'Home', id: 'home' },
    {
      key: 'company',
      label: 'Company',
      items: [
        { label: 'About Us & Heritage', id: 'about' },
        { label: 'Foundry Infrastructure', id: 'infrastructure' },
        { label: 'Quality Policy & ISO Standards', id: 'quality-policy' },
        { label: 'Certifications & Compliance', id: 'certifications' },
      ],
    },
    {
      key: 'products',
      label: 'Products',
      items: productDropdownItems.map((item) => ({ label: item, id: 'products', category: item })),
    },
    {
      key: 'services',
      label: 'Services',
      items: [
        { label: 'Custom Laser Cutting & Milling', id: 'services/laser-cutting' },
        { label: 'Open Die & Closed Die Forging', id: 'services/forging' },
        { label: 'Ultrasonic Weld Inspection', id: 'services/weld-inspection' },
      ],
    },
    { key: 'blog', label: 'Blog', id: 'blog' },
    { key: 'contact', label: 'Contact Us', id: 'contact' },
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
              style={{
                height: '76px',
                width: 'auto',
                objectFit: 'contain',
                transform: 'scale(1.12)',
                transformOrigin: 'center left',
                filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.18))',
              }}
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
                  href="#infrastructure"
                  className="dropdown-item"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('infrastructure');
                  }}
                >
                  Foundry Infrastructure
                </a>
                <a
                  href="#quality-policy"
                  className="dropdown-item"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('quality-policy');
                  }}
                >
                  Quality Policy &amp; ISO Standards
                </a>
                <a
                  href="#certifications"
                  className="dropdown-item"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('certifications');
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


            {/* Services ▾ Dropdown */}
            <li
              className="nav-item"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a
                href="#services"
                className={`nav-menu-link ${activeTab === 'services' || activeTab.startsWith('services/') ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleDropdownClick('services');
                }}
              >
                Services <ChevronDown size={14} />
              </a>
              <div className={`dropdown-menu ${activeDropdown === 'services' ? 'is-open' : ''}`}>
                <a
                  href="#services/laser-cutting"
                  className="dropdown-item"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('services/laser-cutting');
                  }}
                >
                  Custom Laser Cutting &amp; Milling
                </a>
                <a
                  href="#services/forging"
                  className="dropdown-item"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('services/forging');
                  }}
                >
                  Open Die &amp; Closed Die Forging
                </a>
                <a
                  href="#services/weld-inspection"
                  className="dropdown-item"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('services/weld-inspection');
                  }}
                >
                  Ultrasonic Weld Inspection
                </a>
              </div>
            </li>

            <li className="nav-item">
              <a
                href="#blog"
                className={`nav-menu-link ${activeTab === 'blog' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('blog');
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
            onClick={() => (mobileMenuOpen ? closeMobileMenu() : setMobileMenuOpen(true))}
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
              onClick={closeMobileMenu}
            />
            <div
              id="mobile-nav-drawer"
              style={{
                position: 'relative',
                zIndex: 999,
                background: '#ffffff',
                borderTop: '1px solid #cbd5e1',
                /* No horizontal padding: every row draws its own full-bleed
                   divider, so the rules run edge to edge down the drawer. */
                padding: '0 0 20px',
                display: 'flex',
                flexDirection: 'column',
                maxHeight: 'calc(100vh - 120px)',
                overflowY: 'auto',
                boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
              }}
            >
              {mobileNav.map((entry) => {
                const isOpen = mobileSection === entry.key;

                if (!entry.items) {
                  return (
                    <a
                      key={entry.key}
                      href={`#${entry.id}`}
                      className={`mobile-nav-link${activeTab === entry.id ? ' is-active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(entry.id!);
                      }}
                    >
                      {entry.label}
                    </a>
                  );
                }

                return (
                  <div key={entry.key} className="mobile-nav-group">
                    <button
                      type="button"
                      className={`mobile-nav-link mobile-nav-toggle${isOpen ? ' is-open' : ''}`}
                      aria-expanded={isOpen}
                      onClick={() => setMobileSection(isOpen ? null : entry.key)}
                    >
                      {entry.label}
                      {isOpen
                        ? <Minus size={20} className="mobile-nav-chevron" strokeWidth={1.75} />
                        : <Plus size={20} className="mobile-nav-chevron" strokeWidth={1.75} />}
                    </button>

                    {isOpen && (
                      <div className="mobile-nav-sublist">
                        {entry.items.map((item) => (
                          <a
                            key={item.label}
                            href={item.id ? `#${item.id}` : '#'}
                            className="mobile-nav-sublink"
                            onClick={(e) => {
                              e.preventDefault();
                              if (item.onClick) item.onClick();
                              else handleNavClick(item.id!, item.category);
                            }}
                          >
                            {item.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              <button
                onClick={() => { closeMobileMenu(); onOpenQuoteModal(); }}
                className="btn btn-accent"
                style={{ margin: '20px 20px 0', width: 'calc(100% - 40px)', padding: '15px' }}
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
