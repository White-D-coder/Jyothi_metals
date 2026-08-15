import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, ChevronRight, ChevronDown, Check, Info } from 'lucide-react';
import {
  catalogProducts,
  type CatalogProduct,
  getSubCategoriesForCategory,
  getFirstSubCategoryForCategory,
} from '../data/catalogData';

interface CatalogPageProps {
  initialCategory?: string;
  onOpenQuoteModal: (productName?: string) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  initialCategory = 'Pipes & Tubes',
  onOpenQuoteModal,
}) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategoryName = searchParams.get('category') || initialCategory || 'Pipes & Tubes';

  const [selectedSubCat, setSelectedSubCat] = useState<string>(() =>
    getFirstSubCategoryForCategory(currentCategoryName)
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAllProducts, setShowAllProducts] = useState<boolean>(false);
  const [isMainCatDropdownOpen, setIsMainCatDropdownOpen] = useState<boolean>(false);
  const [isSubCatDropdownOpen, setIsSubCatDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    const defaultSub = getFirstSubCategoryForCategory(currentCategoryName);
    setSelectedSubCat(defaultSub);
  }, [currentCategoryName]);

  const handleSelectMainCat = (catId: string) => {
    setSearchParams({ category: catId });
    const defaultSub = getFirstSubCategoryForCategory(catId);
    setSelectedSubCat(defaultSub);
    setShowAllProducts(false);
    setIsMainCatDropdownOpen(false);
  };

  const currentSubList = getSubCategoriesForCategory(currentCategoryName);
  const effectiveSubCat = currentSubList.some(
    (s) => s.id === selectedSubCat || s.id.toLowerCase() === selectedSubCat.toLowerCase()
  )
    ? selectedSubCat
    : currentSubList.length > 0
    ? currentSubList[0].id
    : selectedSubCat;

  const filteredProducts = catalogProducts.filter((prod) => {
    let matchCat = true;
    if (currentCategoryName && currentCategoryName !== 'All') {
      const curLow = currentCategoryName.toLowerCase();
      const prodCatLow = prod.category.toLowerCase();
      matchCat = prodCatLow === curLow ||
                 prodCatLow.includes(curLow) ||
                 curLow.includes(prodCatLow);
    }

    let matchSub = true;
    if (!showAllProducts && effectiveSubCat && effectiveSubCat !== 'all' && effectiveSubCat !== 'All Sub-Categories') {
      const subLow = effectiveSubCat.toLowerCase();
      const prodSubLow = prod.subCat.toLowerCase();

      matchSub = prodSubLow === subLow ||
                 prodSubLow.includes(subLow) ||
                 subLow.includes(prodSubLow);
    }

    let matchSearch = true;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      matchSearch = prod.title.toLowerCase().includes(q) ||
                    prod.category.toLowerCase().includes(q) ||
                    prod.subCat.toLowerCase().includes(q) ||
                    prod.specs.some(s => s.toLowerCase().includes(q));
    }

    return matchCat && matchSub && matchSearch;
  });

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh' }}>
      {/* 1. Hero Section — Plain White, Clean Editorial */}
      <section
        style={{
          background: '#FFFFFF',
          padding: '40px 0 24px',
        }}
      >
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ maxWidth: '1100px' }}>
            <h1 style={{ fontSize: '2.8rem', fontWeight: 800, color: '#0D1B2A', marginBottom: '22px', lineHeight: 1.2, letterSpacing: '-0.2px' }}>
              {currentCategoryName}
            </h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#374151', fontSize: '1.1rem', lineHeight: 1.78 }}>
              <p style={{ margin: 0 }}>
                Jyoti Metal (India) manufactures and distributes certified high-performance industrial <strong style={{ color: '#0D1B2A' }}>{currentCategoryName.toLowerCase()}</strong> engineered to satisfy stringent international ISO 9001:2015, ASTM, ASME, EN, and DIN manufacturing standards. Our stock is maintained in solution-annealed and heat-treated metallurgical states to support high-temperature, high-pressure, and corrosive environments across aerospace, defense, marine, chemical refining, and nuclear energy installations.
              </p>
              <p style={{ margin: 0 }}>
                Every component supplied from our facility carries authentic EN 10204 3.1 &amp; 3.2 Mill Test Certificates (MTC), 100% Positive Material Identification (PMI), hydrostatic pressure testing, and ultrasonic flaw detection. Whether your project requires standard seamless schedules or precision CNC-milled custom tolerances, our engineering team ensures total compliance with your technical bill of materials.
              </p>
              <p style={{ margin: 0 }}>
                With strategic inventory distribution centers across primary industrial trade corridors, we guarantee rapid dispatch and full shipment traceability. Select a sub-category from the left navigation panel or use the precision search bar below to filter specific alloy grades, chemical specifications, and mechanical yield criteria.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container" style={{ paddingBottom: '48px' }}>

        {/* Search & Filter Action Bar */}
        <div style={{ margin: '32px 0 44px', maxWidth: '760px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#51847D', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '10px' }}>
            SEARCH &amp; FILTER CATALOG
          </div>
          <div style={{ position: 'relative', width: '100%' }}>
            <Search
              size={18}
              style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: '#51847D' }}
            />
            <input
              type="text"
              placeholder="Search products by alloy grade (e.g. 304L, C276, Gr 2), ASTM spec, or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search catalog products"
              style={{
                width: '100%',
                paddingLeft: '48px',
                paddingRight: searchQuery ? '40px' : '20px',
                paddingTop: '15px',
                paddingBottom: '15px',
                margin: 0,
                background: '#ffffff',
                border: '1.5px solid #cbd5e1',
                borderRadius: 0,
                fontSize: '16px', // Prevents iOS Safari auto-zoom
                color: '#0f172a',
                outline: 'none',
                boxShadow: '0 6px 20px rgba(81, 132, 125, 0.08)',
                transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Clear search text"
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  color: '#64748b',
                }}
              >
                &times;
              </button>
            )}
          </div>
          {searchQuery && (
            <div style={{ marginTop: '8px', fontSize: '0.84rem', color: '#51847D', fontWeight: 700 }}>
              Showing {filteredProducts.length} matching product(s) for "{searchQuery}"
            </div>
          )}
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
              style={{ borderRadius: 0 }}
            >
              <span>{currentCategoryName}</span>
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
              <div className="custom-mobile-dropdown-menu" style={{ borderRadius: 0 }}>
                {[
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
                ].map((catId) => {
                  const isSelected = currentCategoryName === catId;
                  return (
                    <button
                      key={catId}
                      type="button"
                      onClick={() => handleSelectMainCat(catId)}
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

          {/* Dropdown 2: Sub-Category Selection */}
          <div className="mobile-dropdown-wrapper sub-cat-wrapper" style={{ zIndex: isSubCatDropdownOpen ? 100 : 9 }}>
            <button
              type="button"
              onClick={() => {
                setIsSubCatDropdownOpen(!isSubCatDropdownOpen);
                setIsMainCatDropdownOpen(false);
              }}
              className="custom-mobile-dropdown-btn"
              style={{ borderRadius: 0 }}
            >
              <span>
                {getSubCategoriesForCategory(currentCategoryName).find((s) => s.id === effectiveSubCat)?.label || effectiveSubCat}
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
              <div className="custom-mobile-dropdown-menu" style={{ borderRadius: 0 }}>
                {getSubCategoriesForCategory(currentCategoryName).map((sub) => {
                  const isSelected = effectiveSubCat === sub.id;
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => {
                        setSelectedSubCat(sub.id);
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

        {/* Main 2-Column Catalog Container (Left Sub-Categories Sidebar + Right Product Grid) */}
        <div className="grid-responsive-catalog" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '32px', alignItems: 'start' }}>
          
          {/* Left Sub-Categories Sidebar (Modern Redesigned Navigation Panel with Custom Scrollbar) */}
          <div className="sidebar-nav-panel">
            {/* Sub-Category Items List with Scrolling System */}
            <div className="custom-sidebar-scroll">
              {getSubCategoriesForCategory(currentCategoryName).map((sub) => {
                const isActive = effectiveSubCat === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => {
                      setSelectedSubCat(sub.id);
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

            {/* Sidebar Support Callout & See All Option */}
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
                style={{ width: '100%', padding: '10px 14px', fontSize: '0.8rem', borderRadius: 0, marginBottom: filteredProducts.length > 9 ? '10px' : '0' }}
              >
                Custom Spec Inquiry
              </button>

              {filteredProducts.length > 9 && (
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
                    borderRadius: 0,
                    cursor: 'pointer',
                  }}
                >
                  {showAllProducts ? 'Show Max 3 Lines' : `See All (${filteredProducts.length} Items)`}
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Product Cards Grid (Max 3 Lines / 9 Boxes Initially) */}
          <div style={{ flex: 1 }}>
            {filteredProducts.length === 0 ? (
              <div style={{ background: '#ffffff', padding: '60px', textAlign: 'center', border: '1px solid #e2e8f0', borderRadius: 0 }}>
                <Info size={40} color="#51847D" style={{ marginBottom: '12px' }} />
                <h3 style={{ color: '#0f172a', marginBottom: '8px' }}>No products match your search query</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '20px' }}>Try clearing your search term or selecting another sub-category.</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedSubCat(getFirstSubCategoryForCategory(currentCategoryName)); }}
                  className="btn btn-accent"
                  style={{ padding: '10px 24px', borderRadius: 0 }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px', alignItems: 'stretch' }}>
                  {(showAllProducts ? filteredProducts : filteredProducts.slice(0, 9)).map((prod: CatalogProduct) => (
                    <div
                      key={prod.id}
                      className="product-card"
                      onClick={() => navigate(`/product-detail?id=${encodeURIComponent(prod.id)}`)}
                      style={{
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: 0,
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
                          {prod.specs.map((spec: string, sIdx: number) => (
                            <span
                              key={sIdx}
                              style={{
                                background: '#edf5f4',
                                color: '#51847D',
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                padding: '4px 10px',
                                borderRadius: 0,
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
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/product-detail?id=${encodeURIComponent(prod.id)}`);
                            }}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#51847D',
                              fontSize: '0.82rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            View Specs &gt;
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredProducts.length > 9 && (
                  <div style={{ textAlign: 'center', marginTop: '36px' }}>
                    <button
                      onClick={() => setShowAllProducts(!showAllProducts)}
                      className="btn btn-accent"
                      style={{ padding: '12px 32px', fontSize: '0.9rem', borderRadius: 0 }}
                    >
                      {showAllProducts
                        ? 'Show Max 3 Lines'
                        : `See All ${currentCategoryName} Products (${filteredProducts.length} Total Items)`}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
