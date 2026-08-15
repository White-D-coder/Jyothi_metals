import React, { useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import {
  primaryCategories,
  additionalCategories,
  getCategorySlug,
  type ProductCategory,
} from '../data/productCategories';

interface ProductsPageProps {
  onOpenQuoteModal: (productName?: string) => void;
}

/** One alternating image/copy row. Even rows put the image on the left. */
const CategoryRow: React.FC<{
  category: ProductCategory;
  index: number;
  onViewDetails: (category: ProductCategory) => void;
}> = ({ category, index, onViewDetails }) => (
  <div
    id={category.slug}
    className={`pp-row pp-scale-in ${index % 2 === 1 ? 'pp-row-reverse' : ''}`}
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <div
      className="pp-media"
      onClick={() => onViewDetails(category)}
      role="presentation"
    >
      <img src={category.image} alt={category.name} loading="lazy" />
      <div className="pp-media-scrim" />
      <div className="pp-media-caption">{category.name}</div>
    </div>

    <div className="pp-body">
      <div>
        <h3 className="pp-body-title">{category.name}</h3>
      </div>

      <div>
        <div className="pp-info-card">
          <h4 className="pp-info-head">Product Description</h4>
          <p>{category.description}</p>
        </div>
        <div className="pp-info-card">
          <h4 className="pp-info-head">Range &amp; Dimensions</h4>
          <p>{category.dimensions}</p>
        </div>
      </div>

      <button
        type="button"
        className="pp-btn"
        onClick={() => onViewDetails(category)}
      >
        View Details
        <ArrowRight size={18} />
      </button>
    </div>
  </div>
);

export const ProductsPage: React.FC<ProductsPageProps> = ({ onOpenQuoteModal }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Keep the old deep links alive: /products?category=Round Bars and
  // /products#round-bars both scroll to that category's row.
  useEffect(() => {
    const fromQuery = searchParams.get('category');
    const slug = fromQuery ? getCategorySlug(fromQuery) : location.hash.slice(1);
    if (!slug) return;

    const target = document.getElementById(slug);
    if (!target) return;

    const timer = setTimeout(
      () => target.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      150
    );
    return () => clearTimeout(timer);
  }, [searchParams, location.hash]);

  const handleViewDetails = (category: ProductCategory) => {
    navigate(`/catalog?category=${encodeURIComponent(category.name)}`);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff' }}>
      {/* 1. Hero */}
      <section className="pp-hero">
        <div
          className="pp-hero-bg"
          style={{ backgroundImage: 'url("/images/heavy_rolling_mill.jpg")' }}
        />
        <div className="pp-hero-scrim" />
        <div className="pp-hero-inner">
          <h1 className="pp-hero-title pp-fade-up">Our Products</h1>
          <p className="pp-hero-sub pp-fade-up" style={{ animationDelay: '0.2s' }}>
            Certified alloy and stainless steel solutions for critical process,
            infrastructure and industrial projects.
          </p>
        </div>
      </section>

      {/* 2. Primary Products */}
      <section id="primary-products" className="pp-section pp-section-top">
        <div className="container">
          <div className="pp-section-head">
            <h2 className="pp-section-title pp-fade-up">Primary Products</h2>
            <p className="pp-section-sub pp-fade-up" style={{ animationDelay: '0.2s' }}>
              Core Stainless, Duplex and Nickel Alloy Product Forms
            </p>
          </div>

          <div className="pp-rows">
            {primaryCategories.map((category, index) => (
              <CategoryRow
                key={category.slug}
                category={category}
                index={index}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Additional Products */}
      <section id="additional-products" className="pp-section pp-section-alt">
        <div className="container">
          <div className="pp-section-head">
            <h2 className="pp-section-title pp-fade-up">Additional Products</h2>
            <p className="pp-section-sub pp-fade-up" style={{ animationDelay: '0.2s' }}>
              Extended Range of Fastening, Sealing and Structural Products
            </p>
          </div>

          <div className="pp-rows">
            {additionalCategories.map((category, index) => (
              <CategoryRow
                key={category.slug}
                category={category}
                index={index}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Closing CTA */}
      <section className="pp-cta">
        <div className="pp-cta-inner">
          <h2 className="pp-fade-up">
            Need expert guidance on selecting the right alloy grade?
          </h2>
          <p className="pp-fade-up" style={{ animationDelay: '0.2s' }}>
            Our metallurgists and sales engineers are ready to help you match the
            right specification, grade and tolerance to your project.
          </p>
          <button
            type="button"
            className="pp-cta-btn pp-scale-in"
            style={{ animationDelay: '0.4s' }}
            onClick={() => onOpenQuoteModal()}
          >
            Send Enquiry
            <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
};
