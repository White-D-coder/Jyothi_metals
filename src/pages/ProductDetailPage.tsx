import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Star,
  ShieldCheck,
  CheckCircle2,
  Send,
  Plus,
  Layers,
  FileCheck,
  ArrowRight,
  ZoomIn,
  ChevronDown,
} from 'lucide-react';
import { catalogProducts, type CatalogProduct } from '../data/catalogData';
import { champakSpecs, type SpecTable } from '../data/champakSpecs';
import { getChampakImage } from '../data/champakImages';
import {
  getAlloyPricePerKg,
  getAlloyComposition,
  getMechanicalProperties,
  getPhysicalProperties,
  getCertifiedApplications,
  getManufacturingStandards,
  getEquivalentGrades,
  getScrapedGradeTableData,
  getGradeSpecification,
  getGalleryImages,
} from '../data/productFallbacks';

interface ProductDetailPageProps {
  onOpenQuoteModal: (productName?: string) => void;
}

// Application industries shown before the list collapses behind "View More".
const APPS_PREVIEW_COUNT = 4;


// Renders a scraped specification table exactly as published, including the
// grouped headers (colspan/rowspan) and single-cell section divider rows.
const SpecTableView: React.FC<{ table: SpecTable }> = ({ table }) => {
  // Some sections are published as prose rather than a table.
  if (!table.rows.length && table.note) {
    return (
      <div
        style={{
          border: '1px solid #E0E8E8',
          background: '#F8F8F8',
          padding: '18px 20px',
          fontSize: '0.9rem',
          lineHeight: 1.7,
          color: '#304050',
          marginBottom: '24px',
        }}
      >
        {table.note}
      </div>
    );
  }

  const widest = table.rows.reduce(
    (max, row) => Math.max(max, row.reduce((n, c) => n + (c.cs ?? 1), 0)),
    0
  );

  return (
    <div style={{ overflowX: 'auto', border: '1px solid #588078', marginBottom: '24px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'center' }}>
        <tbody>
          {table.rows.map((row, rIdx) => {
            const span = row.reduce((n, c) => n + (c.cs ?? 1), 0);
            // A lone full-width cell is a section divider (e.g. "SS 304H").
            const isDivider = row.length === 1 && (widest === 0 || span >= widest || row.length < widest);
            const isHeader = rIdx === 0 || isDivider || row.every((c) => c.h);

            return (
              <tr
                key={rIdx}
                style={{
                  background: isHeader ? '#588078' : rIdx % 2 === 0 ? '#FFFFFF' : '#F8F8F8',
                  borderBottom: '1px solid #E0E8E8',
                }}
              >
                {row.map((c, i) => {
                  const Tag = isHeader || c.h ? 'th' : 'td';
                  return (
                    <Tag
                      key={i}
                      colSpan={c.cs}
                      rowSpan={c.rs}
                      style={{
                        padding: '11px 12px',
                        borderRight: '1px solid ' + (isHeader ? 'rgba(255,255,255,0.25)' : '#E0E8E8'),
                        background: isHeader ? '#588078' : 'transparent',
                        color: isHeader ? '#FFFFFF' : '#304050',
                        fontWeight: isHeader ? 700 : 600,
                        textAlign: isDivider ? 'left' : 'center',
                        verticalAlign: 'middle',
                        minWidth: '68px',
                      }}
                    >
                      {c.t}
                    </Tag>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// The published heading for a table, shown under the fixed section label.
const SpecHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="pd-section-sub">{children}</p>
);

// One spec section. Every section renders on load — nothing sits behind a click.
const SpecSection: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <section className="pd-spec-section">
    <h3 className="pd-section-label">{label}</h3>
    {children}
  </section>
);

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

  // Published spec tables for this exact product, when we carry them.
  const spec = useMemo(() => champakSpecs[currentProduct.id], [currentProduct]);

  const composition = useMemo(
    () => getAlloyComposition(currentProduct.title),
    [currentProduct]
  );

  const mechanicalProps = useMemo(
    () => getMechanicalProperties(currentProduct.title),
    [currentProduct]
  );

  const physicalProps = useMemo(
    () => getPhysicalProperties(currentProduct.title),
    [currentProduct]
  );

  const scrapedTable = useMemo(
    () => getScrapedGradeTableData(currentProduct.title),
    [currentProduct]
  );

  const appList = useMemo(
    () => getCertifiedApplications(currentProduct.title),
    [currentProduct]
  );

  const stdList = useMemo(
    () => getManufacturingStandards(currentProduct.title),
    [currentProduct]
  );

  const eqList = useMemo(
    () => getEquivalentGrades(currentProduct.title),
    [currentProduct]
  );

  // Stock summary panel shown above the spec tabs. Row set depends on the
  // product form, so it is derived from the whole product, not just the title.
  const gradeSpec = useMemo(() => getGradeSpecification(currentProduct), [currentProduct]);

  // Gallery imagery
  const galleryImages = useMemo(
    () => getGalleryImages(currentProduct, getChampakImage(currentProduct.id)),
    [currentProduct]
  );

  const [activeImage, setActiveImage] = useState<string>(galleryImages[0]);
  const [quantityKgs] = useState<number>(500);

  const [appsExpanded, setAppsExpanded] = useState(false);

  // Product changes (related-product links reuse this page) must re-collapse
  // the application list and swap the gallery back to the new product's photo.
  useEffect(() => {
    setAppsExpanded(false);
    setActiveImage(getGalleryImages(currentProduct, getChampakImage(currentProduct.id))[0]);
  }, [currentProduct]);

  // Champak-sourced products only ever show the published list (empty hides
  // the section); the generic list is for products with no source page.
  const allApps = spec ? spec.applications ?? [] : appList;
  const visibleApps = appsExpanded ? allApps : allApps.slice(0, APPS_PREVIEW_COUNT);

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
          height: 84px;
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

        /* Grades & Specification summary panel */
        .pd-spec-box {
          display: flex;
          align-items: center;
          gap: 36px;
          background: #F1F6F5;
          border: 1px solid #C9DBD7;
          padding: 32px 36px;
          margin-bottom: 40px;
        }
        .pd-spec-figure {
          flex: 0 0 218px;
          width: 218px;
          height: 218px;
          border-radius: 50%;
          overflow: hidden;
          background: #FFFFFF;
          box-shadow: 0 0 0 6px #FFFFFF, 0 0 0 7px #C9DBD7;
        }
        .pd-spec-figure img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .pd-spec-body { flex: 1 1 auto; min-width: 0; }
        .pd-spec-heading {
          font-size: 1.22rem;
          font-weight: 800;
          color: #304050;
          margin: 0 0 18px 0;
          line-height: 1.3;
          letter-spacing: 0.2px;
        }
        .pd-spec-row {
          font-size: 0.88rem;
          line-height: 1.65;
          color: #46586A;
          margin-bottom: 7px;
        }
        .pd-spec-row:last-child { margin-bottom: 0; }
        .pd-spec-row b {
          font-weight: 700;
          color: #304050;
        }

        /* Spec sections run down the page in order — no tabs, nothing hidden
           behind a click. */
        .pd-spec-section { margin-bottom: 52px; }
        .pd-spec-section:last-child { margin-bottom: 0; }
        .pd-section-label {
          font-size: 1.05rem;
          font-weight: 800;
          color: #304050;
          text-transform: uppercase;
          letter-spacing: 0.9px;
          margin: 0 0 6px 0;
          padding-bottom: 12px;
          border-bottom: 2px solid #588078;
        }
        .pd-section-sub {
          font-size: 0.84rem;
          font-weight: 600;
          color: #7C8894;
          margin: 14px 0 16px 0;
          line-height: 1.5;
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

        /* Long product titles must wrap instead of pushing the page sideways. */
        .pd-breadcrumb {
          flex-wrap: wrap;
          row-gap: 4px;
        }

        /* Phone / small tablet. Inline styles win over the cascade, so the
           overrides below need !important (same convention as index.css). */
        @media (max-width: 768px) {
          .pd-section { padding: 26px 0 34px !important; }
          .pd-container { padding: 0 16px !important; }

          /* Sticky has no travel once the grid is one column, and it fights
             the sticky navbar on iOS — pin it off. */
          .pd-gallery { position: static !important; top: auto !important; }
          .pd-hero-image { height: 260px !important; }
          .thumb-grid { gap: 8px !important; }
          .thumb-item { height: 64px !important; }

          .pd-hero-panel { padding: 24px 20px !important; min-height: 0 !important; }
          .pd-title { font-size: 1.45rem !important; }

          /* Spec panel: circle above the list. Alignment stays at stretch — with
             flex-start the text block sizes to max-content and runs off-screen. */
          .pd-spec-box {
            flex-direction: column;
            gap: 22px;
            padding: 24px 20px !important;
            margin-bottom: 30px;
          }
          .pd-spec-figure {
            flex: 0 0 auto;
            width: 160px;
            height: 160px;
            align-self: center;
          }
          .pd-spec-heading { font-size: 1.08rem; }
          .pd-spec-row { font-size: 0.84rem; }

          .pd-spec-section { margin-bottom: 38px; }
          .pd-section-label { font-size: 0.92rem; letter-spacing: 0.6px; }
          .pd-section-sub { font-size: 0.79rem; }

          /* Fixed 180-220px label columns leave the value column narrower than
             its own text, which overflows the card. Stack them instead. */
          .pd-kv {
            grid-template-columns: 1fr !important;
            row-gap: 2px;
            padding: 11px 14px !important;
          }

          /* minmax(300px,...) exceeds the content box on a 320px viewport. */
          .pd-supp-grid,
          .pd-related-grid { grid-template-columns: 1fr !important; }

          .pd-related-head { flex-wrap: wrap; gap: 12px; }
          .pd-related-title { font-size: 1.15rem !important; }
        }
      `}</style>

      {/* 1. Breadcrumb Bar */}
      <section style={{ background: '#FFFFFF', borderBottom: '1px solid #E0E8E8', padding: '16px 0' }}>
        <div className="container pd-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div className="pd-breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#7C8894' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Home</span>
            <span>/</span>
            <span style={{ cursor: 'pointer' }} onClick={() => navigate('/products')}>Products Catalog</span>
            <span>/</span>
            <span>{currentProduct.category}</span>
            <span>/</span>
            <span style={{ color: '#304050', fontWeight: 600 }}>{currentProduct.title}</span>
          </div>
        </div>
      </section>

      {/* 2. Top Main E-Commerce Product Layout */}
      <section className="pd-section" style={{ padding: '40px 0 60px' }}>
        <div className="container pd-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div className="grid-responsive-about" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '48px', alignItems: 'start' }}>
            
            {/* Left: Product Image Gallery (Sticky on scroll until right column finishes) */}
            <div className="pd-gallery" style={{ position: 'sticky', top: '96px', alignSelf: 'start' }}>
              <div
                className="pd-hero-image"
                style={{
                  height: '410px',
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

            {/* Right: Product Details Panel (Stretched to match Left height & aligned at bottom) */}
            <div
              className="pd-hero-panel"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E0E8E8',
                padding: '36px 40px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '508px',
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#588078', letterSpacing: '0.8px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  {currentProduct.category} &bull; {currentProduct.subCat}
                </span>

                <h1 className="pd-title" style={{ fontSize: '1.9rem', fontWeight: 700, color: '#304050', marginBottom: '12px', lineHeight: 1.25, letterSpacing: '0.5px' }}>
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
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
              </div>

              {/* Bottom Action Area */}
              <div>
                {/* Action Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '18px' }}>
                  <button
                    type="button"
                    onClick={() => onOpenQuoteModal(`${currentProduct.title} (${quantityKgs} Kgs)`)}
                    className="btn btn-primary"
                    style={{ padding: '16px', fontSize: '0.92rem', letterSpacing: '0.6px', textTransform: 'uppercase' }}
                  >
                    Request Formal Quote <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Middle Specification Tabbed Section */}
      <section className="pd-section" style={{ background: '#FFFFFF', borderTop: '1px solid #E0E8E8', borderBottom: '1px solid #E0E8E8', padding: '40px 0 60px' }}>
        <div className="container pd-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>

          {/* Grades & Specification summary — the stock envelope a buyer scans
              before opening the detail tables. */}
          <div className="pd-spec-box">
            <div className="pd-spec-figure">
              <img src={currentProduct.image || galleryImages[0]} alt={currentProduct.title} />
            </div>
            <div className="pd-spec-body">
              <h2 className="pd-spec-heading">{gradeSpec.heading}</h2>
              {gradeSpec.rows.map((row) => (
                <div key={row.label} className="pd-spec-row">
                  <b>{row.label}</b>: {row.value}
                </div>
              ))}
            </div>
          </div>

            <div>
              {/* Section 0: Equivalent Grades */}
              {spec?.equivalent && (
                <SpecSection label="EQUIVALENT GRADES">
                  <SpecHeading>{spec.equivalent.heading}</SpecHeading>
                  <SpecTableView table={spec.equivalent} />
                </SpecSection>
              )}

              {/* Section 1: Chemical Composition */}
              {spec?.chemical && (
                <SpecSection label="CHEMICAL COMPOSITION">
                  <SpecHeading>{spec.chemical.heading}</SpecHeading>
                  <SpecTableView table={spec.chemical} />
                </SpecSection>
              )}

              {/* Generic fallbacks below are for products with no Champak source
                  page only. A Champak-sourced product whose page lacks a table
                  shows nothing for that section — never invented data. */}
              {!spec && (
                <SpecSection label="CHEMICAL COMPOSITION">
                  <SpecHeading>Chemical composition of {currentProduct.title}</SpecHeading>
                  <div style={{ overflowX: 'auto', border: '1px solid #588078', marginBottom: '24px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'center' }}>
                      <thead>
                        <tr style={{ background: '#588078', color: '#FFFFFF', fontWeight: 700 }}>
                          {scrapedTable.chemHeaders.map((h, i) => (
                            <th key={i} style={{ padding: '12px 10px', borderRight: i < scrapedTable.chemHeaders.length - 1 ? '1px solid rgba(255,255,255,0.25)' : 'none', whiteSpace: 'nowrap' }}>
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {scrapedTable.chemRows.map((row, rIdx) => (
                          <tr key={rIdx} style={{ background: rIdx % 2 === 0 ? '#FFFFFF' : '#F8F8F8', borderBottom: rIdx < scrapedTable.chemRows.length - 1 ? '1px solid #E0E8E8' : 'none' }}>
                            {row.map((val, i) => (
                              <td
                                key={i}
                                style={{
                                  padding: '12px 10px',
                                  borderRight: i < row.length - 1 ? (i === 0 ? '1px solid rgba(255,255,255,0.3)' : '1px solid #E0E8E8') : 'none',
                                  fontWeight: i === 0 ? 800 : 600,
                                  background: i === 0 ? '#588078' : 'transparent',
                                  color: i === 0 ? '#FFFFFF' : '#304050',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {val}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Vertical Breakdown List */}
                  <div style={{ border: '1px solid #E0E8E8' }}>
                    {Object.entries(composition).map(([element, range], i) => (
                      <div
                        key={element}
                        className="pd-kv"
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '180px 1fr',
                          padding: '10px 16px',
                          background: i % 2 === 0 ? '#FFFFFF' : '#F8F8F8',
                          borderBottom: i < Object.keys(composition).length - 1 ? '1px solid #E0E8E8' : 'none',
                          fontSize: '0.86rem',
                        }}
                      >
                        <span style={{ fontWeight: 700, color: '#304050' }}>{element}</span>
                        <span style={{ color: '#588078', fontWeight: 700 }}>{range}</span>
                      </div>
                    ))}
                  </div>
                </SpecSection>
              )}

              {/* Section 2: Mechanical Properties */}
              {spec?.mechanical && (
                <SpecSection label="MECHANICAL PROPERTIES">
                  <SpecHeading>{spec.mechanical.heading}</SpecHeading>
                  <SpecTableView table={spec.mechanical} />
                </SpecSection>
              )}

              {!spec && (
                <SpecSection label="MECHANICAL PROPERTIES">
                  <SpecHeading>Mechanical properties of {currentProduct.title}</SpecHeading>
                  <div style={{ overflowX: 'auto', border: '1px solid #588078', marginBottom: '24px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'center' }}>
                      <thead>
                        <tr style={{ background: '#588078', color: '#FFFFFF', fontWeight: 700 }}>
                          {scrapedTable.mechHeaders.map((h, i) => (
                            <th key={i} style={{ padding: '12px 10px', borderRight: i < scrapedTable.mechHeaders.length - 1 ? '1px solid rgba(255,255,255,0.25)' : 'none', whiteSpace: 'nowrap' }}>
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {scrapedTable.mechRows.map((row, rIdx) => (
                          <tr key={rIdx} style={{ background: rIdx % 2 === 0 ? '#FFFFFF' : '#F8F8F8', borderBottom: rIdx < scrapedTable.mechRows.length - 1 ? '1px solid #E0E8E8' : 'none' }}>
                            {row.map((val, i) => (
                              <td
                                key={i}
                                style={{
                                  padding: '12px 10px',
                                  borderRight: i < row.length - 1 ? (i === 0 ? '1px solid rgba(255,255,255,0.3)' : '1px solid #E0E8E8') : 'none',
                                  fontWeight: i === 0 ? 800 : 600,
                                  background: i === 0 ? '#588078' : 'transparent',
                                  color: i === 0 ? '#FFFFFF' : '#304050',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {val}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Vertical Breakdown List */}
                  <div style={{ border: '1px solid #E0E8E8' }}>
                    {Object.entries(mechanicalProps).map(([propKey, propVal], i) => (
                      <div
                        key={propKey}
                        className="pd-kv"
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '220px 1fr',
                          padding: '10px 16px',
                          background: i % 2 === 0 ? '#FFFFFF' : '#F8F8F8',
                          borderBottom: i < Object.keys(mechanicalProps).length - 1 ? '1px solid #E0E8E8' : 'none',
                          fontSize: '0.86rem',
                        }}
                      >
                        <span style={{ fontWeight: 700, color: '#304050' }}>{propKey}</span>
                        <span style={{ color: '#588078', fontWeight: 700 }}>{propVal}</span>
                      </div>
                    ))}
                  </div>
                </SpecSection>
              )}

              {/* Section 3: Physical Properties */}
              {spec?.physical && (
                <SpecSection label="PHYSICAL PROPERTIES">
                  <SpecHeading>{spec.physical.heading}</SpecHeading>
                  <SpecTableView table={spec.physical} />
                </SpecSection>
              )}

              {!spec && (
                <SpecSection label="PHYSICAL PROPERTIES">
                  <SpecHeading>Physical &amp; thermal properties</SpecHeading>
                  <div style={{ border: '1px solid #E0E8E8' }}>
                    {Object.entries(physicalProps).map(([pKey, pVal], i) => (
                      <div
                        key={pKey}
                        className="pd-kv"
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '200px 1fr',
                          padding: '12px 18px',
                          background: i % 2 === 0 ? '#FFFFFF' : '#F8F8F8',
                          borderBottom: i < Object.keys(physicalProps).length - 1 ? '1px solid #E0E8E8' : 'none',
                          fontSize: '0.88rem',
                        }}
                      >
                        <span style={{ fontWeight: 700, color: '#304050' }}>{pKey}</span>
                        <span style={{ color: '#588078', fontWeight: 700 }}>{pVal}</span>
                      </div>
                    ))}
                  </div>
                </SpecSection>
              )}

              {/* Section 4: Application Industries */}
              {allApps.length > 0 && (
              <SpecSection label="APPLICATION INDUSTRIES">
                <SpecHeading>Certified application industries</SpecHeading>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {visibleApps.map((app) => (
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

                    {/* Beyond four, the rest collapse behind this row. */}
                    {allApps.length > APPS_PREVIEW_COUNT && (
                      <button
                        type="button"
                        onClick={() => setAppsExpanded((v) => !v)}
                        aria-expanded={appsExpanded}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          width: '100%',
                          padding: '14px 18px',
                          background: '#FFFFFF',
                          border: '1px dashed #588078',
                          fontSize: '0.9rem',
                          fontWeight: 700,
                          color: '#588078',
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                        }}
                      >
                        {appsExpanded
                          ? 'View Less'
                          : `View More (${allApps.length - APPS_PREVIEW_COUNT} more)`}
                        <ChevronDown
                          size={16}
                          style={{
                            transition: 'transform 200ms ease',
                            transform: appsExpanded ? 'rotate(180deg)' : 'none',
                          }}
                        />
                      </button>
                    )}
                  </div>
              </SpecSection>
              )}
            </div>

          {/* 5. Supplementary Section. Products carrying published Champak data
              show that page's "Specification of …" block verbatim (nothing at all
              when the source page has none); only products without a published
              source keep the generic fallback chips. */}
          {spec ? (
            spec.specification && (
              <div style={{ marginTop: '48px', paddingTop: '36px', borderTop: '1px solid #E0E8E8' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#304050', marginBottom: '20px' }}>
                  Manufacturing Standards &amp; Specification
                </h3>
                <div style={{ background: '#F8F8F8', border: '1px solid #E0E8E8', padding: '20px' }}>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#588078', marginBottom: '12px', textTransform: 'uppercase' }}>
                    {spec.specification.heading || 'Specification'}
                  </h4>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>
                      {spec.specification.rows.map((row, idx) => (
                        <tr key={`${row.label}-${idx}`}>
                          <td style={{ padding: '8px 16px 8px 0', fontSize: '0.86rem', fontWeight: 700, color: '#304050', verticalAlign: 'top', width: '220px', borderBottom: '1px solid #E0E8E8' }}>
                            {row.label}
                          </td>
                          <td style={{ padding: '8px 0', fontSize: '0.86rem', color: '#304050', verticalAlign: 'top', borderBottom: '1px solid #E0E8E8' }}>
                            {row.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )
          ) : (
            <div style={{ marginTop: '48px', paddingTop: '36px', borderTop: '1px solid #E0E8E8' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#304050', marginBottom: '20px' }}>
                Manufacturing Standards, Dimensions &amp; Equivalent Grades
              </h3>
              <div className="pd-supp-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                <div style={{ background: '#F8F8F8', border: '1px solid #E0E8E8', padding: '20px' }}>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#588078', marginBottom: '12px', textTransform: 'uppercase' }}>
                    Manufacturing Standards
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {stdList.map((std) => (
                      <span key={std} style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', padding: '6px 12px', fontSize: '0.82rem', fontWeight: 700, color: '#304050' }}>
                        {std}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ background: '#F8F8F8', border: '1px solid #E0E8E8', padding: '20px' }}>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#588078', marginBottom: '12px', textTransform: 'uppercase' }}>
                    International Equivalent Grades
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {eqList.map((eq) => (
                      <span key={eq} style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', padding: '6px 12px', fontSize: '0.82rem', fontWeight: 700, color: '#304050' }}>
                        {eq}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. Bottom Related Stock Grid */}
      <section className="pd-section" style={{ padding: '60px 0 20px' }}>
        <div className="container pd-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div className="pd-related-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
            <h2 className="pd-related-title" style={{ fontSize: '1.4rem', fontWeight: 700, color: '#304050', margin: 0, letterSpacing: '0.4px' }}>
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

          <div className="pd-related-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
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
