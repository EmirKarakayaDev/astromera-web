import Reveal from './Reveal';
import { useSiteSettings } from '../context/SiteSettingsContext';
import { Link } from 'react-router-dom';

const Footer = ({ delay = 0.5 }) => {
  const copy = useSiteSettings();
  const { siteName } = copy.header;
  const { language, setLanguage } = copy;
  const {
    intro,
    copyright,
    showSupport,
    showBlog,
    navTitle,
    navItems,
    supportTitle,
    blogTitle,
    supportItems,
    blogItems,
    legalItems
  } = copy.footer;

  return (
    <footer className="footer">
      <div className="container">
        <Reveal className="footer-logo-massive" delay={delay}>
          <span className="scrolling-logo">{siteName}</span>
        </Reveal>

        <Reveal className="footer-body" delay={delay + 0.05}>
          <div className="footer-main">
          <div className="footer-left">
            <p className="footer-intro-text">
              {intro.split(',').map((line, i) => (
                <span key={i}>
                  {line}{i === 0 && ','}<br />
                </span>
              ))}
            </p>
            <div className="footer-socials">
              <a href={copy.footer.socialInstagram || '#'} className="social-icon" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href={copy.footer.socialTiktok || '#'} className="social-icon" aria-label="TikTok" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/></svg>
              </a>
              <a href={copy.footer.socialFacebook || '#'} className="social-icon" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href={copy.footer.socialLinkedin || '#'} className="social-icon" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>

          <div className="footer-right">
            <div>
              <h3 className="footer-col-title">{navTitle}</h3>
              <ul className="footer-links">
                {navItems.map(item => {
                  const cleanPath = item.href.replace(/^\//, '');
                  const href = `/${copy.language}/${cleanPath}`.replace(/\/+/g, '/');
                  return <li key={item.text}><Link to={href}>{item.text}</Link></li>;
                })}
              </ul>
            </div>

            {showSupport && (
              <div>
                 <h3 className="footer-col-title">{supportTitle}</h3>
                <ul className="footer-links">
                  {supportItems.map(item => {
                    const cleanPath = item.href.replace(/^\//, '');
                    const href = item.href.startsWith('http') ? item.href : `/${copy.language}/${cleanPath}`.replace(/\/+/g, '/');
                    return (
                      <li key={item.text}>
                        {href?.startsWith('http') ? (
                          <a href={href} target="_blank" rel="noopener noreferrer">{item.text}</a>
                        ) : (
                          <Link to={href}>{item.text}</Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {showBlog && (
              <div>
                 <h3 className="footer-col-title">{blogTitle}</h3>
                <ul className="footer-links">
                  {blogItems.map(item => {
                    const cleanPath = item.href.replace(/^\//, '');
                    const href = `/${copy.language}/${cleanPath}`.replace(/\/+/g, '/');
                    return (
                      <li key={item.text}><Link to={href}>{item.text}</Link></li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
          </div>

          <div className="footer-bottom">
          <p>{copyright}</p>
          <div className="footer-lang-picker">
            <button
              className={`lang-btn ${language === 'tr' ? 'active' : ''}`}
              onClick={() => setLanguage('tr')}
              aria-label="Türkçe"
            >
              TR
            </button>
            <span className="lang-sep">|</span>
            <button
              className={`lang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
              aria-label="English"
            >
              EN
            </button>
          </div>
          <div className="footer-legal">
            {legalItems.map(item => {
              const isExternal = item.href?.startsWith('http');
              const isHash = !item.href || item.href === '#';
              if (isExternal || isHash) {
                return <a key={item.text} href={item.href || '#'}>{item.text}</a>;
              }
              const cleanPath = item.href.replace(/^\//, '');
              const href = `/${copy.language}/${cleanPath}`.replace(/\/+/g, '/');
              return <Link key={item.text} to={href}>{item.text}</Link>;
            })}
          </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
};

export default Footer;
