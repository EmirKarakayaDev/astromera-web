import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Lenis from 'lenis';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Blog from './pages/Blog';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import BlogDetail from './pages/BlogDetail';
import StudioPage from './pages/StudioPage';
import { SiteSettingsProvider, useSiteSettings } from './context/SiteSettingsContext';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Site layout wrapper to keep Navbar/Footer on main pages only
const MainLayout = ({ children, isMenuOpen, setIsMenuOpen, isNavVisible }) => {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');
  const { isLoading } = useSiteSettings();

  if (isAdmin) return <>{children}</>;

  if (isLoading) {
    return (
      <div style={{ height: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: 'Inter, sans-serif' }}>Loading...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <Navbar 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        isNavVisible={isNavVisible} 
      />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    lenis.on('scroll', (e) => {
      const pathname = window.location.pathname;
      if (pathname.startsWith('/admin')) return;
      if (e.direction === 1 && e.animatedScroll > 200) {
        setIsNavVisible(false);
      } else if (e.direction === -1) {
        setIsNavVisible(true);
      }
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      <SiteSettingsProvider>
        <ScrollToTop />
        <MainLayout 
          isMenuOpen={isMenuOpen} 
          setIsMenuOpen={setIsMenuOpen} 
          isNavVisible={isNavVisible}
        >
          <Routes>
            {/* Root redirect to default language */}
            <Route path="/" element={<Navigate to="/tr" replace />} />
            
            {/* Admin route - keep separate */}
            <Route path="/admin/*" element={<StudioPage />} />

            {/* Language-prefixed routes */}
            <Route path="/:lang">
              <Route index element={<Home />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:id" element={<BlogDetail />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<Navigate to="/tr" replace />} />
            </Route>

            {/* Global fallback */}
            <Route path="*" element={<Navigate to="/tr" replace />} />
          </Routes>
        </MainLayout>
      </SiteSettingsProvider>
    </BrowserRouter>
  );
}

export default App;
