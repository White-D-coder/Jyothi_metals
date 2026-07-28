import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { Home } from './pages/Home';
import { ProductsPage } from './pages/ProductsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ServicesPage } from './pages/ServicesPage';
import { InfrastructurePage } from './pages/InfrastructurePage';
import { QualityPage } from './pages/QualityPage';
import { BlogPage } from './pages/BlogPage';
import { CareersPage } from './pages/CareersPage';
import { FaqPage } from './pages/FaqPage';
import { LaserCuttingPage } from './pages/LaserCuttingPage';
import { ArcCastingPage } from './pages/ArcCastingPage';
import { WeldInspectionPage } from './pages/WeldInspectionPage';
import { QualityPolicyPage } from './pages/QualityPolicyPage';
import { CertificationsPage } from './pages/CertificationsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';

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

      {/* Main Page View — real URL routing */}
      <main style={{ flexGrow: 1 }}>
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
