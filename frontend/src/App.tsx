import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Products from './sections/Products';
import AboutUs from './sections/AboutUs';
import CitiesServed from './components/CitiesServed';
import WhyUs from './sections/WhyUs';
import FAQ from './sections/FAQ';
import Footer from './sections/Footer';
import ContactPage from './pages/ContactPage';
import Preloader from './components/Preloader';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'contact'>(() => {
    // Persist current page view across browser refresh
    return window.location.hash === '#contact' ? 'contact' : 'home';
  });
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Disable browser automatic scroll restoration so refresh always starts at the absolute top
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Force instant scroll to absolute top of current page on refresh
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    const handleHashChange = () => {
      if (window.location.hash === '#contact') {
        setCurrentPage('contact');
      } else {
        setCurrentPage('home');
      }
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      const navbarHeight = window.innerWidth >= 768 ? 96 : 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handlePageChange = (page: 'home' | 'contact', targetHref?: string) => {
    setCurrentPage(page);
    if (page === 'contact') {
      window.history.replaceState(null, '', '#contact');
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    } else {
      if (targetHref) {
        window.history.replaceState(null, '', targetHref);
      } else {
        window.history.replaceState(null, '', '#home');
      }
    }
  };

  const handleOpenContactWithProduct = (productName?: string) => {
    setSelectedProduct(productName);
    setCurrentPage('contact');
    window.history.replaceState(null, '', '#contact');

    setTimeout(() => {
      const formElement = document.getElementById('contact-form-section');
      if (formElement) {
        const navbarHeight = window.innerWidth >= 768 ? 96 : 80;
        const elementPosition = formElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 80);
  };

  return (
    <div className="relative min-h-screen w-full bg-white font-sans antialiased text-dark-text overflow-x-hidden">
      {/* Animated Splash Screen Preloader */}
      <Preloader />

      {/* Navigation bar */}
      <Navbar
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onQuoteClick={() => handleOpenContactWithProduct()}
      />

      {currentPage === 'contact' ? (
        /* Dedicated Standalone Contact Us Page */
        <ContactPage
          selectedProduct={selectedProduct}
          onBackToHome={() => handlePageChange('home')}
        />
      ) : (
        /* Main Landing Page Flow */
        <main className="w-full">
          {/* Hero Section */}
          <Hero
            onExploreProducts={() => scrollToSection('#products')}
            onContactClick={() => handleOpenContactWithProduct()}
          />

          {/* Interactive Products range */}
          <Products onProductSelect={(productName: string) => handleOpenContactWithProduct(productName)} />

          {/* About Us Section */}
          <AboutUs />

          {/* Dark theme Cities & Industrial Hubs Served section */}
          <CitiesServed />

          {/* Why Us Section */}
          <WhyUs />

          {/* FAQ Section */}
          <FAQ />
        </main>
      )}

      {/* Structured dark footer */}
      <Footer onPageChange={handlePageChange} />
    </div>
  );
}

export default App;
