import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Star,
  ShieldCheck,
  CheckCircle2,
  Send,
  Truck,
  Plus,
  Layers,
  FileCheck,
  ArrowRight,
  ZoomIn,
} from 'lucide-react';
import { catalogProducts, type CatalogProduct } from '../data/catalogData';

interface ProductDetailPageProps {
  onOpenQuoteModal: (productName?: string) => void;
}

// Price generator by alloy type
const getAlloyPricePerKg = (title: string): number => {
  const t = title.toLowerCase();
  if (t.includes('titanium')) return 1850;
  if (t.includes('inconel') || t.includes('hastelloy')) return 2450;
  if (t.includes('monel') || t.includes('nickel')) return 1650;
  if (t.includes('duplex') || t.includes('2205') || t.includes('2507')) return 480;
  if (t.includes('copper') || t.includes('brass')) return 620;
  if (t.includes('stainless') || t.includes('316') || t.includes('304')) return 320;
  if (t.includes('carbon') || t.includes('steel')) return 95;
  return 280;
};

// Composition generator by alloy title
const getAlloyComposition = (title: string): Record<string, string> => {
  const t = title.toLowerCase();
  if (t.includes('titanium') || t.includes('ti-')) {
    return { Titanium: 'Balance (90%+)', Aluminum: '5.5 - 6.75%', Vanadium: '3.5 - 4.5%', Iron: '0.40% Max', Oxygen: '0.20% Max' };
  }
  if (t.includes('inconel') || t.includes('625')) {
    return { Nickel: '58.0% Min', Chromium: '20.0 - 23.0%', Molybdenum: '8.0 - 10.0%', Niobium: '3.15 - 4.15%', Iron: '5.0% Max' };
  }
  if (t.includes('hastelloy') || t.includes('c276')) {
    return { Nickel: 'Balance (~57%)', Molybdenum: '15.0 - 17.0%', Chromium: '14.5 - 16.5%', Tungsten: '3.0 - 4.5%', Iron: '4.0 - 7.0%' };
  }
  if (t.includes('duplex') || t.includes('2205')) {
    return { Chromium: '22.0 - 23.0%', Nickel: '4.5 - 6.5%', Molybdenum: '3.0 - 3.5%', Nitrogen: '0.14 - 0.20%', Iron: 'Balance' };
  }
  if (t.includes('monel') || t.includes('400')) {
    return { Nickel: '63.0% Min', Copper: '28.0 - 34.0%', Iron: '2.5% Max', Manganese: '2.0% Max', Silicon: '0.5% Max' };
  }
  if (t.includes('316')) {
    return { Chromium: '16.0 - 18.0%', Nickel: '10.0 - 14.0%', Molybdenum: '2.0 - 3.0%', Carbon: '0.030% Max', Iron: 'Balance' };
  }
  // Default Stainless 304 / Alloy composition
  return { Chromium: '18.0 - 20.0%', Nickel: '8.0 - 10.5%', Manganese: '2.0% Max', Silicon: '0.75% Max', Iron: 'Balance' };
};

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ onOpenQuoteModal }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const rawId = searchParams.get('id') || '';

  // Find exact product in catalog database by ID or title
  const currentProduct: CatalogProduct = useMemo(() => {
    if (!rawId) return catalogProducts[0];
    const match = catalogProducts.find(
      (p) => p.id === rawId || p.title.toLowerCase() === rawId.toLowerCase() || encodeURIComponent(p.id) === rawId
    );
    return match || catalogProducts[0];
  }, [rawId]);

  const composition = useMemo(
    () => getAlloyComposition(currentProduct.title),
    [currentProduct]
  );

  // Gallery imagery
  const galleryImages = useMemo(() => {
    const main = currentProduct.image || '/images/stainless_pipes.png';
    const pool = [
      '/images/stainless_pipes.png',
      '/images/pipe_fittings.png',
      '/images/flanges_industrial.png',
      '/images/round_bars.png',
      '/images/titanium_plates.png',
      '/images/precision_parts.png',
    ].filter((img) => img !== main);
    return [main, ...pool.slice(0, 3)];
  }, [currentProduct]);

  const [activeImage, setActiveImage] = useState<string>(galleryImages[0]);
  const [quantityKgs] = useState<number>(500);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'comp' | 'apps'>('desc');

  // Related products from same category
  const relatedProducts = useMemo(() => {
    const sameCat = catalogProducts.filter(
      (p) => p.category === currentProduct.category && p.id !== currentProduct.id
    );
    const selected = sameCat.length >= 3 ? sameCat.slice(0, 3) : catalogProducts.slice(1, 4);
    return selected;
  }, [currentProduct]);

  return (
    <div className="product-detail-root" style={{ background: '#F8F8F8', minHeight: '100vh', color: '#304050', paddingBottom: '80px' }}>
      <style>{`
        .product-detail-root {
          font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .thumb-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-top: 14px;
        }
        .thumb-item {
          height: 90px;
          border: 1px solid #E0E8E8;
          cursor: pointer;
          overflow: hidden;
          background: #FFFFFF;
          transition: border-color 150ms ease;
        }
        .thumb-item.active {
          border: 2px solid #588078;
        }
        .thumb-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .tab-btn {
          padding: 16px 24px;
          font-size: 0.84rem;
          font-weight: 700;
          cursor: pointer;
          border: none;
          background: transparent;
          color: #7C8894;
          position: relative;
          transition: all 150ms ease;
          letter-spacing: 0.6px;
          text-transform: uppercase;
        }
        .tab-btn.active {
          color: #588078;
          font-weight: 800;
        }
        .tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 3px;
          background: #588078;
        }

        .btn {
          border-radius: 0 !important;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background-color 150ms ease, border-color 150ms ease;
        }
        .btn-primary {
          background: #588078;
          color: #FFFFFF;
          border: none;
        }
        .btn-primary:hover { background: #4D716A; }
        .btn-secondary {
          background: #FFFFFF;
          color: #304050;
          border: 1px solid #E0E8E8;
        }
        .btn-secondary:hover { background: #F4F6F8; border-color: #304050; }
      `}</style>

      {/* 1. Breadcrumb Bar */}
      <section style={{ background: '#FFFFFF', borderBottom: '1px solid #E0E8E8', padding: '16px 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#7C8894' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Home</span>
            <span>/</span>
            <span style={{ cursor: 'pointer' }} onClick={() => navigate('/products')}>Products Catalog</span>
            <span>/</span>
            <span>{currentProduct.category}</span>
            <span>/</span>
            <span style={{ color: '#588078', fontWeight: 700 }}>{currentProduct.title}</span>
          </div>
        </div>
      </section>

      {/* 2. Top Main E-Commerce Product Layout */}
      <section style={{ padding: '40px 0 60px' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div className="grid-responsive-about" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '48px', alignItems: 'start' }}>
            
            {/* Left: Product Image Gallery (Sticky on scroll until right column finishes) */}
            <div style={{ position: 'sticky', top: '100px', alignSelf: 'flex-start' }}>
              <div
                style={{
                  height: '460px',
                  background: '#FFFFFF',
                  border: '1px solid #E0E8E8',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={activeImage || galleryImages[0]}
                  alt={currentProduct.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <button
                  type="button"
                  onClick={() => onOpenQuoteModal(currentProduct.title)}
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    width: '38px',
                    height: '38px',
                    background: '#FFFFFF',
                    border: '1px solid #E0E8E8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#304050',
                    cursor: 'pointer',
                  }}
                  title="Enlarge specs view"
                >
                  <ZoomIn size={18} />
                </button>
              </div>

              {/* 4 Thumbnails Underneath */}
              <div className="thumb-grid">
                {galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    className={`thumb-item ${activeImage === img ? 'active' : ''}`}
                    onClick={() => setActiveImage(img)}
                  >
                    <img src={img} alt={`Gallery ${idx + 1}`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Product Details Panel */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E0E8E8', padding: '36px 40px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#588078', letterSpacing: '0.8px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                {currentProduct.category} &bull; {currentProduct.subCat}
              </span>

              <h1 style={{ fontSize: '1.9rem', fontWeight: 700, color: '#304050', marginBottom: '12px', lineHeight: 1.25, letterSpacing: '0.5px' }}>
                {currentProduct.title}
              </h1>

              {/* Rating Star Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', color: '#D97706', gap: '2px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="#D97706" />
                  ))}
                </div>
                <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#304050' }}>
                  4.9 / 5.0
                </span>
                <span style={{ fontSize: '0.82rem', color: '#7C8894' }}>
                  (Certified ISO 9001:2015 &amp; ASME Audit Compliant)
                </span>
              </div>

              {/* Short Description */}
              <p style={{ fontSize: '0.92rem', color: '#7C8894', lineHeight: 1.65, marginBottom: '24px' }}>
                Manufactured and stocked by Jyoti Metal (India) to stringent ASTM, ASME, and EN standards. Fully solution annealed and tested for high-pressure, severe corrosion environments.
              </p>

              {/* Key Bullet Highlights */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px', paddingBottom: '24px'}}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.86rem', color: '#304050', fontWeight: 600 }}>
                  <ShieldCheck size={16} color="#588078" /> 100% Spectral chemistry verification &amp; heat-lot tracking
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.86rem', color: '#304050', fontWeight: 600 }}>
                  <Layers size={16} color="#588078" /> Hydrostatic pressure tested &amp; ultrasonic flaw scanned
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.86rem', color: '#304050', fontWeight: 600 }}>
                  <FileCheck size={16} color="#588078" /> EN 10204 3.1 &amp; 3.2 Mill Test Certificate included
                </div>
              </div>

              {/* Price Row */}
              {/* <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#588078', letterSpacing: '0.5px' }}>
                  &#8377;{pricePerKg} <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#7C8894' }}>INR / Kg</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#7C8894', marginTop: '2px' }}>
                  Bulk tonnage pricing calculated upon formal RFQ submission.
                </div>
              </div> */}

              {/* Quantity Counter */}
              {/* <div style={{ marginBottom: '24px' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#304050', textTransform: 'uppercase', letterSpacing: '0.6px', display: 'block', marginBottom: '8px' }}>
                  Required Quantity (Kgs)
                </label>
                <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #E0E8E8' }}>
                  <button
                    type="button"
                    onClick={() => setQuantityKgs(Math.max(50, quantityKgs - 50))}
                    style={{ width: '40px', height: '40px', background: '#F4F6F8', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    value={quantityKgs}
                    onChange={(e) => setQuantityKgs(Math.max(1, parseInt(e.target.value) || 1))}
                    style={{ width: '90px', height: '40px', border: 'none', textAlign: 'center', fontSize: '0.95rem', fontWeight: 700, color: '#304050' }}
                  />
                  <button
                    type="button"
                    onClick={() => setQuantityKgs(quantityKgs + 50)}
                    style={{ width: '40px', height: '40px', background: '#F4F6F8', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div> */}

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                <button
                  type="button"
                  onClick={() => onOpenQuoteModal(`${currentProduct.title} (${quantityKgs} Kgs)`)}
                  className="btn btn-primary"
                  style={{ padding: '16px', fontSize: '0.92rem', letterSpacing: '0.6px', textTransform: 'uppercase' }}
                >
                  Request Formal Quote <Send size={16} />
                </button>
              </div>

              {/* Fast Dispatch Badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.82rem'}}>
                <Truck size={18} color="#588078" />
                <span>100% Heat-Lot Traceability Fast Container Dispatch</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Middle Specification Tabbed Section */}
      <section style={{ background: '#FFFFFF', borderTop: '1px solid #E0E8E8', borderBottom: '1px solid #E0E8E8', padding: '40px 0 60px' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          
          {/* Horizontal Tab Navigation */}
          <div style={{ display: 'flex', borderBottom: '1px solid #E0E8E8', marginBottom: '32px', overflowX: 'auto' }}>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'desc' ? 'active' : ''}`}
              onClick={() => setActiveTab('desc')}
            >
              TECHNICAL DESCRIPTION
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
              onClick={() => setActiveTab('specs')}
            >
              DIMENSIONAL SPECS
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'comp' ? 'active' : ''}`}
              onClick={() => setActiveTab('comp')}
            >
              CHEMICAL COMPOSITION
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'apps' ? 'active' : ''}`}
              onClick={() => setActiveTab('apps')}
            >
              APPLICATIONS
            </button>
          </div>

          {/* Active Tab Content */}
          <div className="grid-responsive-about" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px', alignItems: 'center' }}>
            <div>
              {activeTab === 'desc' && (
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#304050', marginBottom: '14px' }}>
                    Process Engineering &amp; Metallurgical Integrity
                  </h3>
                  <p style={{ fontSize: '0.94rem', color: '#7C8894', lineHeight: 1.7, marginBottom: '16px' }}>
                    Manufactured through continuous casting and precision rolling lines at Jyoti Metal India. Every batch of <strong>{currentProduct.title}</strong> is refined to minimize non-metallic inclusions and achieve uniform microstructural grain distribution.
                  </p>
                  <p style={{ fontSize: '0.94rem', color: '#7C8894', lineHeight: 1.7, margin: 0 }}>
                    Certified for severe duty service in oil refineries, chemical processing plants, defense assemblies, and high-pressure steam lines.
                  </p>
                </div>
              )}

              {activeTab === 'specs' && (
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#304050', marginBottom: '16px' }}>
                    Standard Specifications &amp; Tolerances
                  </h3>
                  <div style={{ border: '1px solid #E0E8E8' }}>
                    {currentProduct.specs.map((s, i) => {
                      const parts = s.split(':');
                      const key = parts[0] || `Spec ${i + 1}`;
                      const val = parts.slice(1).join(':') || s;
                      return (
                        <div
                          key={i}
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '200px 1fr',
                            padding: '12px 18px',
                            background: i % 2 === 0 ? '#FFFFFF' : '#F8F8F8',
                            borderBottom: i < currentProduct.specs.length - 1 ? '1px solid #E0E8E8' : 'none',
                            fontSize: '0.88rem',
                          }}
                        >
                          <span style={{ fontWeight: 700, color: '#304050' }}>{key}</span>
                          <span style={{ color: '#7C8894' }}>{val}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'comp' && (
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#304050', marginBottom: '16px' }}>
                    Elemental Chemical Heat Composition
                  </h3>
                  <div style={{ border: '1px solid #E0E8E8' }}>
                    {Object.entries(composition).map(([element, range], i) => (
                      <div
                        key={element}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '180px 1fr',
                          padding: '12px 18px',
                          background: i % 2 === 0 ? '#FFFFFF' : '#F8F8F8',
                          borderBottom: i < Object.keys(composition).length - 1 ? '1px solid #E0E8E8' : 'none',
                          fontSize: '0.88rem',
                        }}
                      >
                        <span style={{ fontWeight: 700, color: '#304050' }}>{element}</span>
                        <span style={{ color: '#588078', fontWeight: 700 }}>{range}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'apps' && (
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#304050', marginBottom: '16px' }}>
                    Certified Field Applications
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      'Offshore Oil & Gas Subsea Manifolds & Piping',
                      'High-Purity Chemical & Petrochemical Refining',
                      'Aerospace & Defense Structural Components',
                      'High-Pressure Steam & Nuclear Power Installations',
                    ].map((app) => (
                      <div
                        key={app}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '14px 18px',
                          background: '#F8F8F8',
                          border: '1px solid #E0E8E8',
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          color: '#304050',
                        }}
                      >
                        <CheckCircle2 size={18} color="#588078" /> {app}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Showcase Visual */}
            <div style={{ height: '320px', border: '1px solid #E0E8E8', overflow: 'hidden' }}>
              <img
                src={activeImage || currentProduct.image}
                alt={currentProduct.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bottom Related Stock Grid */}
      <section style={{ padding: '60px 0 20px' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#304050', margin: 0, letterSpacing: '0.4px' }}>
              Related Metallurgical Stock ({currentProduct.category})
            </h2>
            <button
              type="button"
              onClick={() => navigate('/products')}
              style={{ background: 'none', border: 'none', color: '#588078', fontWeight: 700, fontSize: '0.86rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              View Full Catalog <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => navigate(`/product-detail?id=${encodeURIComponent(rel.id)}`)}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E0E8E8',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  cursor: 'pointer',
                }}
              >
                <div style={{ width: '80px', height: '80px', flexShrink: 0, overflow: 'hidden', border: '1px solid #E0E8E8' }}>
                  <img src={rel.image} alt={rel.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#304050', margin: '0 0 4px 0', lineHeight: 1.3 }}>
                    {rel.title}
                  </h4>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#588078' }}>
                    &#8377;{getAlloyPricePerKg(rel.title)} INR / Kg
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenQuoteModal(rel.title);
                  }}
                  style={{
                    width: '36px',
                    height: '36px',
                    background: '#F4F6F8',
                    border: '1px solid #E0E8E8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#304050',
                    cursor: 'pointer',
                    borderRadius: 0,
                  }}
                  title="Request quote"
                >
                  <Plus size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
