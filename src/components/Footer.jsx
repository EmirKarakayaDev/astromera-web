import Reveal from './Reveal';
import { useSiteSettings } from '../context/SiteSettingsContext';
import { Link } from 'react-router-dom';

const Footer = ({ delay = 0.5 }) => {
  const copy = useSiteSettings();
  const { siteName } = copy.header;
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

        <Reveal className="footer-main" delay={delay + 0.05}>
          <div className="footer-left">
            <p className="footer-intro-text">
              {intro.split(',').map((line, i) => (
                <span key={i}>
                  {line}{i === 0 && ','}<br />
                </span>
              ))}
            </p>
            <div className="footer-socials">
              <a href="#" className="social-icon" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="social-icon" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="social-icon" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
            </div>
          </div>

          <div className="footer-right">
            <div>
              <h5 className="footer-col-title">{navTitle}</h5>
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
                <h5 className="footer-col-title">{supportTitle}</h5>
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
                <h5 className="footer-col-title">{blogTitle}</h5>
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
        </Reveal>

        <Reveal className="footer-bottom" delay={delay + 0.1}>
          <p>{copyright}</p>
          <div className="footer-legal">
            {legalItems.map(item => (
               <a key={item.text} href={item.href || '#'}>{item.text}</a>
            ))}
          </div>
        </Reveal>
      </div>
    </footer>
  );
};

export default Footer;
