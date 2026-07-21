import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { Home } from './pages/Home';
import { ProductsPage } from './pages/ProductsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  const [quoteProduct, setQuoteProduct] = useState<string>('Stainless Steel 316L');

  const handleOpenQuoteModal = (productName?: string) => {
    if (productName) {
      setQuoteProduct(productName);
    }
    setIsQuoteModalOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Primary Fixed Navbar with Frosted Glass scroll effect */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
      />

      {/* Main Page View Routing */}
      <main style={{ flexGrow: 1 }}>
        {activeTab === 'home' && (
          <Home
            onNavigate={(page) => setActiveTab(page)}
            onOpenQuoteModal={handleOpenQuoteModal}
          />
        )}

        {activeTab === 'products' && (
          <ProductsPage onOpenQuoteModal={handleOpenQuoteModal} />
        )}

        {activeTab === 'about' && (
          <AboutPage onOpenQuoteModal={() => handleOpenQuoteModal()} />
        )}

        {activeTab === 'contact' && (
          <ContactPage onOpenQuoteModal={() => handleOpenQuoteModal()} />
        )}
      </main>

      {/* Site Footer */}
      <Footer
        setActiveTab={setActiveTab}
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
