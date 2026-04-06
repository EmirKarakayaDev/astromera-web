import { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { SiteSettingsProvider, useSiteSettings } from './context/SiteSettingsContext';
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
const LegalPage = lazy(() => import('./pages/LegalPage'));

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

  useEffect(() => {
    const hasHash = Boolean(window.location.hash);
    const navEntries = typeof performance?.getEntriesByType === 'function'
      ? performance.getEntriesByType('navigation')
      : [];
    const isReload = navEntries.some((entry) => entry.type === 'reload');

    if (hasHash && isReload) {
      const cleanUrl = `${window.location.pathname}${window.location.search}`;
      window.history.replaceState(null, '', cleanUrl);
    }
  }, []);
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

const SiteMeta = () => {
  const { seo } = useSiteSettings();

  useEffect(() => {
    if (!seo?.favicon) return;

    // Remove existing favicon links
    document.querySelectorAll("link[rel='icon']").forEach(el => el.remove());

    if (seo.faviconDark) {
      // Light mode favicon
      const lightLink = document.createElement('link');
      lightLink.setAttribute('rel', 'icon');
      lightLink.setAttribute('href', seo.favicon);
      lightLink.setAttribute('media', '(prefers-color-scheme: light)');
      document.head.appendChild(lightLink);

      // Dark mode favicon
      const darkLink = document.createElement('link');
      darkLink.setAttribute('rel', 'icon');
      darkLink.setAttribute('href', seo.faviconDark);
      darkLink.setAttribute('media', '(prefers-color-scheme: dark)');
      document.head.appendChild(darkLink);
    } else {
      const link = document.createElement('link');
      link.setAttribute('rel', 'icon');
      link.setAttribute('href', seo.favicon);
      document.head.appendChild(link);
    }
  }, [seo?.favicon, seo?.faviconDark]);

  return null;
};

const AppRoutes = ({ isMenuOpen, setIsMenuOpen, isNavVisible }) => {
  const { visibility } = useSiteSettings();
  return (
    <MainLayout isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} isNavVisible={isNavVisible}>
      <SiteMeta />
      <Suspense fallback={<div className="loader-overlay" />}>
        <Routes>
          <Route path="/" element={<Navigate to="/tr" replace />} />
          <Route path="/privacy.html" element={<Navigate to="/tr/legal/privacy-policy" replace />} />
          <Route path="/cookies.html" element={<Navigate to="/tr/legal/cookies" replace />} />
          <Route path="/terms.html" element={<Navigate to="/tr/legal/terms-and-conditions" replace />} />
          <Route path="/admin/*" element={<StudioPage />} />
          <Route path="/:lang">
            <Route index element={<Home />} />
            {visibility.showBlogPage && <Route path="blog" element={<Blog />} />}
            {visibility.showBlogPage && <Route path="blog/:id" element={<BlogDetail />} />}
            {visibility.showPricingPage && <Route path="pricing" element={<Pricing />} />}
            {visibility.showContactPage && <Route path="contact" element={<Contact />} />}
            {visibility.showLegalPages && <Route path="legal/:slug" element={<LegalPage />} />}
            <Route path="*" element={<Navigate to="/tr" replace />} />
          </Route>
          <Route path="*" element={<Navigate to="/tr" replace />} />
        </Routes>
      </Suspense>
    </MainLayout>
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
        <AppRoutes
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          isNavVisible={isNavVisible}
        />
      </SiteSettingsProvider>
    </BrowserRouter>
  );
}

export default App;
