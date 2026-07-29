import { useEffect, useState, lazy, Suspense } from 'react';
import { Routes, Route, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { PageLoader } from './components/PageLoader';

// Lazy-loaded Page Components for fast code-splitting and smooth transition loading
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const ProductsPage = lazy(() => import('./pages/ProductsPage').then(m => ({ default: m.ProductsPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const InfrastructurePage = lazy(() => import('./pages/InfrastructurePage').then(m => ({ default: m.InfrastructurePage })));
const QualityPage = lazy(() => import('./pages/QualityPage').then(m => ({ default: m.QualityPage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })));
const CareersPage = lazy(() => import('./pages/CareersPage').then(m => ({ default: m.CareersPage })));
const FaqPage = lazy(() => import('./pages/FaqPage').then(m => ({ default: m.FaqPage })));
const LaserCuttingPage = lazy(() => import('./pages/LaserCuttingPage').then(m => ({ default: m.LaserCuttingPage })));
const ArcCastingPage = lazy(() => import('./pages/ArcCastingPage').then(m => ({ default: m.ArcCastingPage })));
const WeldInspectionPage = lazy(() => import('./pages/WeldInspectionPage').then(m => ({ default: m.WeldInspectionPage })));
const QualityPolicyPage = lazy(() => import('./pages/QualityPolicyPage').then(m => ({ default: m.QualityPolicyPage })));
const CertificationsPage = lazy(() => import('./pages/CertificationsPage').then(m => ({ default: m.CertificationsPage })));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage').then(m => ({ default: m.ProductDetailPage })));

// Map a legacy "tab" id (used across Navbar/Footer/pages) to its real URL path.
const tabToPath = (tab: string): string => (tab === 'home' ? '/' : `/${tab}`);

// Derive the active tab id from the current URL path (drives nav highlighting).
const pathToTab = (pathname: string): string => (pathname === '/' ? 'home' : pathname.slice(1));

// Scroll to top whenever the route changes (mirrors the old per-click scroll).
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

// Reads the ?category= query param and feeds it to ProductsPage.
function ProductsRoute({ onOpenQuoteModal }: { onOpenQuoteModal: (productName?: string) => void }) {
  const [params] = useSearchParams();
  const category = params.get('category') || 'Pipes & Tubes';
  return <ProductsPage initialCategory={category} onOpenQuoteModal={onOpenQuoteModal} />;
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
              element={<ProductsRoute onOpenQuoteModal={handleOpenQuoteModal} />}
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
              path="/services/arc-casting"
              element={<ArcCastingPage onOpenQuoteModal={handleOpenQuoteModal} onNavigate={navigateTab} />}
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
