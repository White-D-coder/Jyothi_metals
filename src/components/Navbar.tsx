import React, { useState } from 'react';
import { ChevronDown, Layers, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenQuoteModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenQuoteModal,
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
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

  return (
    <header style={{ width: '100%', position: 'sticky', top: 0, zIndex: 1000 }}>
      {/* Main White Navigation Bar with Dropdowns (Top Utility Bar Removed) */}
      <div className="navbar-main">
        <div className="container nav-main-container">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="logo-link"
          >
            <div className="logo-box">
              <Layers size={22} />
            </div>
            <div className="brand-text-full">
              <span className="brand-title-text">JYOTHI</span>
              <span className="brand-subtitle-text">METAL PRIVATE LIMITED</span>
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
                <a
                  href="#products"
                  className="dropdown-item"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('products');
                  }}
                >
                  Seamless Stainless Steel Pipes
                </a>
                <a
                  href="#products"
                  className="dropdown-item"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('products');
                  }}
                >
                  Aerospace Titanium Sheets &amp; Plates
                </a>
                <a
                  href="#products"
                  className="dropdown-item"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('products');
                  }}
                >
                  Heavy Structural Steel I-Beams
                </a>
                <a
                  href="#products"
                  className="dropdown-item"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('products');
                  }}
                >
                  Precision Machined CNC Parts
                </a>
                <a
                  href="#products"
                  className="dropdown-item"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('products');
                  }}
                >
                  Structural Aluminum Extrusions
                </a>
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
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              background: '#ffffff',
              borderTop: '1px solid #cbd5e1',
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <a href="#home" className="dropdown-item" onClick={() => handleNavClick('home')}>Home</a>
            <a href="#about" className="dropdown-item" onClick={() => handleNavClick('about')}>Company / About Us</a>
            <a href="#products" className="dropdown-item" onClick={() => handleNavClick('products')}>Products Catalog</a>
            <a href="#contact" className="dropdown-item" onClick={() => handleNavClick('contact')}>Contact &amp; Weight Estimator</a>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenQuoteModal(); }}
              className="btn btn-accent"
              style={{ marginTop: '10px', width: '100%' }}
            >
              Get Instant Quote
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
