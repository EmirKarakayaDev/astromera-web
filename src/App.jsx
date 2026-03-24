import { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Lenis from 'lenis';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
const Home = lazy(() => import('./pages/Home'));
const Blog = lazy(() => import('./pages/Blog'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Contact = lazy(() => import('./pages/Contact'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const StudioPage = lazy(() => import('./pages/StudioPage'));

import { SiteSettingsProvider } from './context/SiteSettingsContext';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);
  return null;
};

// Site layout wrapper to keep Navbar/Footer on main pages only
const MainLayout = ({ children, isMenuOpen, setIsMenuOpen, isNavVisible }) => {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) return <>{children}</>;

  return (
    <div className="app">
      <Navbar 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        isNavVisible={isNavVisible} 
      />
      <main>{children}</main>
      <Footer key={pathname} />
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

    // Make lenis globally accessible for route changes
    window.lenis = lenis;

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
          <Suspense fallback={<div className="loader-overlay" />}>
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
          </Suspense>
        </MainLayout>
      </SiteSettingsProvider>
    </BrowserRouter>
  );
}

export default App;
