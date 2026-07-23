import React, { useState } from 'react';
import { Search, Download, ArrowRight, Check, Info, Filter } from 'lucide-react';

interface ProductsPageProps {
  onOpenQuoteModal: (productName?: string) => void;
}

interface ProductItem {
  id: string;
  title: string;
  category: string;
  subCategory: string;
  image: string;
  grade: string;
  tensileStrength: string;
  yieldStrength: string;
  standard: string;
  description: string;
  applications: string[];
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ onOpenQuoteModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const categories = [
    'All',
    'Stainless Steel',
    'Titanium Alloys',
    'Structural Steel',
    'Precision CNC',
    'Aluminum',
  ];

  // Map sub-categories per main category
  const subCategoryMap: Record<string, string[]> = {
    All: ['All Sub-Categories', 'Seamless Pipes', 'High Tensile Sheets', 'Structural Beams', 'CNC Components', 'Extrusions'],
    'Stainless Steel': ['All', 'Seamless Pipes', 'Cold Rolled Sheets', 'Flanges & Fittings', 'Forged Rods'],
    'Titanium Alloys': ['All', 'Grade 5 Sheets', 'AMS 4911 Plates', 'Aerospace Billets'],
    'Structural Steel': ['All', 'Heavy I-Beams', 'Channels & Angles', 'High Capacity Plates'],
    'Precision CNC': ['All', 'Turbine Nozzles', 'Hydraulic Actuators', 'Robotic Arms'],
    Aluminum: ['All', '6061-T6 Extrusions', 'Chassis Framing', 'Solar Racking'],
  };

  const productsList: ProductItem[] = [
    {
      id: 'ss-316l-pipe',
      title: 'Seamless Stainless Steel Pipes (316L / 304)',
      category: 'Stainless Steel',
      subCategory: 'Seamless Pipes',
      image: '/images/stainless_pipes.png',
      grade: 'AISI 316L / UNS S31603',
      tensileStrength: '515 MPa',
      yieldStrength: '220 MPa',
      standard: 'ASTM A312 / A269',
      description: 'High-corrosion resistance seamless piping engineered for marine chemical transport, oil refineries, and high-pressure steam distribution lines.',
      applications: ['Chemical Processing', 'Offshore Marine', 'Pharmaceutical Systems', 'High-Pressure Steam'],
    },
    {
      id: 'ti-6al-4v-plate',
      title: 'Aerospace Grade Titanium Sheets (Ti-6Al-4V)',
      category: 'Titanium Alloys',
      subCategory: 'Grade 5 Sheets',
      image: '/images/titanium_plates.png',
      grade: 'Grade 5 (Ti-6Al-4V)',
      tensileStrength: '950 MPa',
      yieldStrength: '880 MPa',
      standard: 'AMS 4911 / ASTM B265',
      description: 'Alpha-beta titanium alloy offering extreme tensile strength, low density, and exceptional bio-compatibility for aircraft fuselages and turbines.',
      applications: ['Aircraft Airframes', 'Jet Turbine Blades', 'Space Exploration', 'Cryogenic Vessels'],
    },
    {
      id: 'steel-ibeam-a36',
      title: 'Heavy Structural Steel I-Beams (A36 / S355)',
      category: 'Structural Steel',
      subCategory: 'Heavy I-Beams',
      image: '/images/structural_beams.png',
      grade: 'ASTM A36 / EN 10025 S355JR',
      tensileStrength: '400 - 550 MPa',
      yieldStrength: '250 MPa',
      standard: 'ASTM A6 / EN 10034',
      description: 'Hot-rolled carbon structural steel profiles providing maximum stiffness and yield endurance for heavy infrastructure construction.',
      applications: ['Commercial Skyscrapers', 'Highway Bridges', 'Crane Girder Framing', 'Heavy Warehouses'],
    },
    {
      id: 'cnc-aerospace-turbine',
      title: 'Precision Machined Aerospace CNC Components',
      category: 'Precision CNC',
      subCategory: 'Turbine Nozzles',
      image: '/images/precision_parts.png',
      grade: 'Inconel 718 / Titanium 6-4',
      tensileStrength: '1240 MPa',
      yieldStrength: '1100 MPa',
      standard: 'AS9100D / ISO 9001',
      description: 'Sub-micron tolerance CNC turned and milled components designed to endure continuous 1,200°C combustion environment thermal shocks.',
      applications: ['Jet Engine Nozzles', 'Rocket Propulsion Valves', 'Hydraulic Actuators', 'Nuclear Control Rods'],
    },
    {
      id: 'ss-304-plate',
      title: 'Cold Rolled Stainless Steel Sheet (304 2B)',
      category: 'Stainless Steel',
      subCategory: 'Cold Rolled Sheets',
      image: '/images/stainless_pipes.png',
      grade: 'AISI 304 / UNS S30400',
      tensileStrength: '520 MPa',
      yieldStrength: '210 MPa',
      standard: 'ASTM A240',
      description: 'Mirror polished cold-rolled stainless sheets with superior formability for food-grade machinery and architectural cladding.',
      applications: ['Food Machinery', 'Cleanroom Enclosures', 'Architectural Facades', 'Medical Equipment'],
    },
    {
      id: 'alu-6061-t6-beam',
      title: 'Structural Aluminum Extrusions (6061-T6)',
      category: 'Aluminum',
      subCategory: '6061-T6 Extrusions',
      image: '/images/titanium_plates.png',
      grade: 'Alloy 6061-T6',
      tensileStrength: '310 MPa',
      yieldStrength: '276 MPa',
      standard: 'ASTM B221 / AMS 4150',
      description: 'Precipitation-hardened aluminum structural profiles featuring low mass and excellent weldability for lightweight chassis.',
      applications: ['Automotive Framing', 'Solar Panel Racking', 'Automation Railings', 'Robotic Arms'],
    },
    {
      id: 'ti-ams-4911',
      title: 'Heavy Aerospace Titanium Plates (AMS 4911)',
      category: 'Titanium Alloys',
      subCategory: 'AMS 4911 Plates',
      image: '/images/titanium_plates.png',
      grade: 'AMS 4911 Ti-6Al-4V',
      tensileStrength: '980 MPa',
      yieldStrength: '910 MPa',
      standard: 'AMS 4911',
      description: 'Heavy gauge aerospace titanium plates certified for defense armor plates and turbine structural bulkheads.',
      applications: ['Defense Armor', 'Turbine Bulkheads', 'Missile Shells'],
    },
    {
      id: 'steel-channel',
      title: 'Hot Rolled Steel Channels & Angles (S275 / A36)',
      category: 'Structural Steel',
      subCategory: 'Channels & Angles',
      image: '/images/structural_beams.png',
      grade: 'S275JR / ASTM A36',
      tensileStrength: '430 MPa',
      yieldStrength: '275 MPa',
      standard: 'EN 10025-2',
      description: 'High durability steel channels for industrial equipment chassis, roof trusses, and modular building frames.',
      applications: ['Industrial Framing', 'Roof Trusses', 'Equipment Chassis'],
    },
  ];

  const currentSubCategories = subCategoryMap[selectedCategory] || ['All'];

  const filteredProducts = productsList.filter((prod) => {
    const matchesCategory = selectedCategory === 'All' || prod.category === selectedCategory;
    const matchesSubCategory =
      selectedSubCategory === 'All' ||
      selectedSubCategory === 'All Sub-Categories' ||
      prod.subCategory === selectedSubCategory;
    const matchesSearch =
      prod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.grade.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.standard.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSubCategory && matchesSearch;
  });

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setSelectedSubCategory(cat === 'All' ? 'All Sub-Categories' : 'All');
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '100px' }} className="bg-tint">
      <div className="container">
        {/* Catalog Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 40px' }}>
          <h1 className="section-title" style={{ fontSize: '3rem' }}>
            Certified Metallurgy Product Inventory
          </h1>
          <p style={{ color: '#475569', fontSize: '1.1rem' }}>
            Browse certified raw materials, structural shapes, and custom CNC milled components. Filter by material category, sub-category, or alloy grade.
          </p>
        </div>

        {/* Filter Bar & Search Container */}
        <div
          style={{
            background: '#ffffff',
            padding: '24px 28px',
            border: '1px solid #cbd5e1',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
            marginBottom: '40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* Top Row: Search Input & Main Category Tabs */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            {/* Search Box */}
            <div style={{ position: 'relative', flexGrow: 1, maxWidth: '380px' }}>
              <Search
                size={18}
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}
              />
              <input
                type="text"
                placeholder="Search by alloy, ASTM grade, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '40px', margin: 0, background: '#f8fafc' }}
              />
            </div>

            {/* Main Category Filter Pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  style={{
                    padding: '10px 20px',
                    border: '1px solid',
                    borderColor: selectedCategory === cat ? '#51847D' : '#cbd5e1',
                    background: selectedCategory === cat ? '#51847D' : '#ffffff',
                    color: selectedCategory === cat ? '#ffffff' : '#0f172a',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Sub-Category Filter Tab Bar (User Request) */}
          <div
            style={{
              borderTop: '1px solid #e2e8f0',
              paddingTop: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 800, color: '#51847D', textTransform: 'uppercase', letterSpacing: '0.06em', flexShrink: 0 }}>
              <Filter size={15} /> SUB-CATEGORIES:
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {currentSubCategories.map((subCat) => {
                const isSelected = selectedSubCategory === subCat;
                return (
                  <button
                    key={subCat}
                    onClick={() => setSelectedSubCategory(subCat)}
                    style={{
                      padding: '6px 14px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      border: '1px solid',
                      borderColor: isSelected ? '#0f172a' : '#cbd5e1',
                      background: isSelected ? '#0f172a' : '#f8fafc',
                      color: isSelected ? '#ffffff' : '#475569',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {subCat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#ffffff', border: '1px solid #cbd5e1' }}>
            <Info size={40} color="#51847D" style={{ marginBottom: '12px' }} />
            <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '8px' }}>
              No products found matching filters
            </h3>
            <p style={{ color: '#64748b' }}>Try clearing your search query or choosing a different sub-category.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedSubCategory('All Sub-Categories');
              }}
              className="btn btn-outline"
              style={{ marginTop: '16px' }}
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  <img src={product.image} alt={product.title} className="product-img" />
                  <span className="product-badge">{product.category}</span>
                </div>
                <div className="product-body">
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#51847D', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                    {product.subCategory}
                  </div>
                  <h3 className="card-title" style={{ fontSize: '1.2rem', marginBottom: '8px' }}>
                    {product.title}
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: '#0f172a', fontWeight: 700, marginBottom: '12px' }}>
                    Standard: {product.standard}
                  </div>
                  <p style={{ fontSize: '0.88rem', color: '#475569', marginBottom: '16px' }}>
                    {product.description}
                  </p>

                  <div
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #cbd5e1',
                      padding: '12px',
                      marginBottom: '20px',
                      fontSize: '0.8rem',
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '8px',
                    }}
                  >
                    <div>
                      <span style={{ color: '#64748b' }}>Tensile:</span>{' '}
                      <strong>{product.tensileStrength}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748b' }}>Yield:</span>{' '}
                      <strong>{product.yieldStrength}</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => onOpenQuoteModal(product.title)}
                      className="btn btn-accent"
                      style={{ flexGrow: 1, padding: '10px 16px', fontSize: '0.85rem' }}
                    >
                      Get Quote
                    </button>
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="btn btn-outline"
                      style={{ padding: '10px 16px', fontSize: '0.85rem' }}
                    >
                      Full Specs
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detailed Spec Sheet Modal Drawer */}
        {selectedProduct && (
          <div className="modal-backdrop" onClick={() => setSelectedProduct(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '750px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#51847D', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Technical Spec Sheet &amp; Metallurgy Data
                </span>
                <button
                  onClick={() => setSelectedProduct(null)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.4rem', fontWeight: 700, color: '#0f172a' }}
                >
                  &times;
                </button>
              </div>

              <h2 className="section-title" style={{ fontSize: '1.8rem', marginBottom: '16px' }}>
                {selectedProduct.title}
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                <div>
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                    style={{ width: '100%', height: '220px', objectFit: 'cover', border: '1px solid #cbd5e1' }}
                  />
                </div>
                <div>
                  <h4 style={{ color: '#0f172a', marginBottom: '10px' }}>Mechanical &amp; Chemical Properties</h4>
                  <table style={{ width: '100%', fontSize: '0.85rem', borderCollapse: 'collapse' }}>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '8px 0', color: '#64748b' }}>Alloy Designation:</td>
                        <td style={{ padding: '8px 0', fontWeight: 700 }}>{selectedProduct.grade}</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '8px 0', color: '#64748b' }}>Compliance Standard:</td>
                        <td style={{ padding: '8px 0', fontWeight: 700 }}>{selectedProduct.standard}</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '8px 0', color: '#64748b' }}>Tensile Strength:</td>
                        <td style={{ padding: '8px 0', fontWeight: 700 }}>{selectedProduct.tensileStrength}</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '8px 0', color: '#64748b' }}>Yield Strength:</td>
                        <td style={{ padding: '8px 0', fontWeight: 700 }}>{selectedProduct.yieldStrength}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ color: '#0f172a', marginBottom: '10px' }}>Recommended Industry Applications</h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {selectedProduct.applications.map((app, aIdx) => (
                    <span
                      key={aIdx}
                      style={{
                        background: '#f8fafc',
                        border: '1px solid #cbd5e1',
                        padding: '6px 14px',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: '#0f172a',
                      }}
                    >
                      <Check size={14} style={{ display: 'inline', marginRight: '4px', color: '#51847D' }} />
                      {app}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <button
                  onClick={() => {
                    const prodName = selectedProduct.title;
                    setSelectedProduct(null);
                    onOpenQuoteModal(prodName);
                  }}
                  className="btn btn-accent"
                  style={{ flexGrow: 1 }}
                >
                  Request Quote for this Alloy <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => alert(`Downloading official PDF spec sheet for ${selectedProduct.title}...`)}
                  className="btn btn-outline"
                >
                  <Download size={18} /> PDF Spec Sheet
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
