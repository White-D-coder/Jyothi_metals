import { useLayoutEffect, useState, lazy, Suspense } from 'react';
import { Routes, Route, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { PageLoader } from './components/PageLoader';

// Lazy-loaded Page Components for fast code-splitting and smooth transition loading
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const ProductsPage = lazy(() => import('./pages/ProductsPage').then(m => ({ default: m.ProductsPage })));
const CatalogPage = lazy(() => import('./pages/CatalogPage').then(m => ({ default: m.CatalogPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const InfrastructurePage = lazy(() => import('./pages/InfrastructurePage').then(m => ({ default: m.InfrastructurePage })));
const QualityPage = lazy(() => import('./pages/QualityPage').then(m => ({ default: m.QualityPage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })));
const CareersPage = lazy(() => import('./pages/CareersPage').then(m => ({ default: m.CareersPage })));
const FaqPage = lazy(() => import('./pages/FaqPage').then(m => ({ default: m.FaqPage })));
const LaserCuttingPage = lazy(() => import('./pages/LaserCuttingPage').then(m => ({ default: m.LaserCuttingPage })));
const ForgingPage = lazy(() => import('./pages/ForgingPage').then(m => ({ default: m.ForgingPage })));
const WeldInspectionPage = lazy(() => import('./pages/WeldInspectionPage').then(m => ({ default: m.WeldInspectionPage })));
const QualityPolicyPage = lazy(() => import('./pages/QualityPolicyPage').then(m => ({ default: m.QualityPolicyPage })));
const CertificationsPage = lazy(() => import('./pages/CertificationsPage').then(m => ({ default: m.CertificationsPage })));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage').then(m => ({ default: m.ProductDetailPage })));

// Map a legacy "tab" id (used across Navbar/Footer/pages) to its real URL path.
const tabToPath = (tab: string): string => (tab === 'home' ? '/' : `/${tab}`);

// Derive the active tab id from the current URL path (drives nav highlighting).
// The catalogue lives under its own path but still belongs to the Products nav item.
const pathToTab = (pathname: string): string => {
  if (pathname === '/') return 'home';
  if (pathname === '/catalog') return 'products';
  return pathname.slice(1);
};

// Jump to the top whenever the route changes, so a new page always opens at its
// hero rather than wherever the previous page was scrolled to.
//
// This must be an INSTANT jump, not a smooth one. Navigating from the bottom of
// a long page (e.g. "View Details" at the foot of /products) would otherwise
// render the new page already scrolled to its footer and then visibly animate
// all the way up. Two things have to be defeated for that:
//   1. behavior: 'smooth' here, and
//   2. `html { scroll-behavior: smooth }` in index.css — which also applies to
//      the plain window.scrollTo(0, 0) form, so an inline override is needed.
// useLayoutEffect runs before paint, so the jump is never rendered.
function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    const html = document.documentElement;
    const previous = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    html.style.scrollBehavior = previous;
  }, [pathname]);
  return null;
}

// Reads the ?category= query param and feeds it to the filterable catalogue.
function CatalogRoute({ onOpenQuoteModal }: { onOpenQuoteModal: (productName?: string) => void }) {
  const [params] = useSearchParams();
  const category = params.get('category') || 'Pipes & Tubes';
  return <CatalogPage initialCategory={category} onOpenQuoteModal={onOpenQuoteModal} />;
}

export function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  const [quoteProduct, setQuoteProduct] = useState<string>('Stainless Steel 316L');

  const activeTab = pathToTab(location.pathname);

  const handleOpenQuoteModal = (productName?: string) => {
    if (productName) {
      setQuoteProduct(productName);
    }
    setIsQuoteModalOpen(true);
  };

  // Navigate by legacy tab id — lets Navbar/Footer/pages keep calling setActiveTab('about') etc.
  const navigateTab = (tab: string) => {
    navigate(tabToPath(tab));
  };

  const handleSelectCategory = (categoryName: string) => {
    navigate(`/products?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ScrollToTop />

      {/* Primary Fixed Navbar with Frosted Glass scroll effect */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={navigateTab}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
        onSelectCategory={handleSelectCategory}
      />

      {/* Main Page View — real URL routing with Lazy Suspense Fallback */}
      <main style={{ flexGrow: 1 }}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route
              path="/"
              element={<Home onNavigate={navigateTab} onOpenQuoteModal={handleOpenQuoteModal} />}
            />
            <Route
              path="/products"
              element={<ProductsPage onOpenQuoteModal={handleOpenQuoteModal} />}
            />
            <Route
              path="/catalog"
              element={<CatalogRoute onOpenQuoteModal={handleOpenQuoteModal} />}
            />
            <Route path="/about" element={<AboutPage onOpenQuoteModal={() => handleOpenQuoteModal()} />} />
            <Route path="/contact" element={<ContactPage onOpenQuoteModal={() => handleOpenQuoteModal()} />} />
            <Route
              path="/services"
              element={<ServicesPage onOpenQuoteModal={handleOpenQuoteModal} onNavigate={navigateTab} />}
            />
            <Route
              path="/infrastructure"
              element={<InfrastructurePage onOpenQuoteModal={handleOpenQuoteModal} onNavigate={navigateTab} />}
            />
            <Route
              path="/quality"
              element={<QualityPage onOpenQuoteModal={handleOpenQuoteModal} onNavigate={navigateTab} />}
            />
            <Route
              path="/blog"
              element={<BlogPage onOpenQuoteModal={handleOpenQuoteModal} onNavigate={navigateTab} />}
            />
            <Route
              path="/careers"
              element={<CareersPage onOpenQuoteModal={handleOpenQuoteModal} onNavigate={navigateTab} />}
            />
            <Route
              path="/faq"
              element={<FaqPage onOpenQuoteModal={handleOpenQuoteModal} onNavigate={navigateTab} />}
            />
            <Route
              path="/services/laser-cutting"
              element={<LaserCuttingPage onOpenQuoteModal={handleOpenQuoteModal} onNavigate={navigateTab} />}
            />
            <Route
              path="/services/forging"
              element={<ForgingPage onOpenQuoteModal={handleOpenQuoteModal} onNavigate={navigateTab} />}
            />
            <Route
              path="/services/weld-inspection"
              element={<WeldInspectionPage onOpenQuoteModal={handleOpenQuoteModal} onNavigate={navigateTab} />}
            />
            <Route
              path="/quality-policy"
              element={<QualityPolicyPage onOpenQuoteModal={handleOpenQuoteModal} onNavigate={navigateTab} />}
            />
            <Route
              path="/certifications"
              element={<CertificationsPage onOpenQuoteModal={handleOpenQuoteModal} onNavigate={navigateTab} />}
            />
            <Route
              path="/product-detail"
              element={<ProductDetailPage onOpenQuoteModal={handleOpenQuoteModal} />}
            />
            {/* Unknown paths fall back to Home */}
            <Route
              path="*"
              element={<Home onNavigate={navigateTab} onOpenQuoteModal={handleOpenQuoteModal} />}
            />
          </Routes>
        </Suspense>
      </main>

      {/* Site Footer */}
      <Footer
        setActiveTab={navigateTab}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
      />

      {/* Quote Calculator & Inquiry Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialProduct={quoteProduct}
      />
    </div>
  );
}

export default App;
