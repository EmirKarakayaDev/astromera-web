import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSiteSettings } from '../hooks/useSiteSettings';

const Navbar = ({ isMenuOpen, setIsMenuOpen, isNavVisible }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const copy = useSiteSettings();
  const { siteName, menuItems } = copy.header;

  const navRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Close menu on click outside or scroll
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && 
          navRef.current && !navRef.current.contains(event.target) &&
          hamburgerRef.current && !hamburgerRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    const handleScroll = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMenuOpen, setIsMenuOpen]);

  const { language, setLanguage } = copy;

  const handleLogoClick = (e) => {
    const isLangHome = location.pathname === `/${language}` || location.pathname === `/${language}/`;
    if (isLangHome) {
      e.preventDefault();
      navigate(`/${language}/`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleNavClick = (e, link) => {
    setIsMenuOpen(false);

    // Prepare link with language prefix
    const isSectionLink = link.href?.startsWith('#') || link.href?.startsWith('/#');
    const cleanHref = isSectionLink ? link.href.replace(/^\//, '') : link.href.replace(/^\//, '');
    const langHref = `/${language}/${cleanHref}`.replace(/\/+/g, '/');

    if (isSectionLink) {
      const sectionId = cleanHref.startsWith('#') ? cleanHref.substring(1) : cleanHref.split('#')[1];
      const element = document.getElementById(sectionId);

      if (element) {
        e.preventDefault();
        navigate(langHref);
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className={`nav-wrapper ${!isNavVisible ? 'nav-hidden' : ''}`}>
      <Link to={`/${language}/`} className="nav-logo-pill" onClick={handleLogoClick}>{siteName}</Link>

      <nav ref={navRef} className={`nav-links-pill ${isMenuOpen ? 'mobile-open' : ''}`}>
        {menuItems.map((link) => {
          const isSectionLink = link.href.startsWith('#') || link.href.startsWith('/#');
          const cleanPath = link.href.replace(/^\//, '');
          const href = `/${language}/${cleanPath}`.replace(/\/+/g, '/');
          
          return (
            <Link
              key={link.text}
              to={href}
              className="nav-link"
              onClick={(e) => handleNavClick(e, link)}
            >
              <span className="nav-link-wrapper">
                <span className="nav-link-text">{link.text}</span>
                <span className="nav-link-text">{link.text}</span>
              </span>
            </Link>
          );
        })}
        {/* Mobile Language Section */}
        <div className="nav-lang-picker mobile-menu-lang">
          <button 
            className={`lang-btn ${language === 'tr' ? 'active' : ''}`}
            onClick={() => { setLanguage('tr'); setIsMenuOpen(false); }}
          >
            TR
          </button>
          <span className="lang-sep">|</span>
          <button 
            className={`lang-btn ${language === 'en' ? 'active' : ''}`}
            onClick={() => { setLanguage('en'); setIsMenuOpen(false); }}
          >
            EN
          </button>
        </div>
      </nav>

      <div className="nav-right">
        {/* Desktop Language Picker */}
        <div className="nav-lang-picker desktop-nav-lang">
          <button 
            className={`lang-btn ${language === 'tr' ? 'active' : ''}`}
            onClick={() => setLanguage('tr')}
          >
            TR
          </button>
          <span className="lang-sep">|</span>
          <button 
            className={`lang-btn ${language === 'en' ? 'active' : ''}`}
            onClick={() => setLanguage('en')}
          >
            EN
          </button>
        </div>

        <button
          ref={hamburgerRef}
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
