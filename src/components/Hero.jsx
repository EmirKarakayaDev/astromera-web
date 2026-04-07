import Reveal from './Reveal';
import { useSiteSettings } from '../context/SiteSettingsContext';
import AppleIcon from '../assets/icons/apple.svg';
import PlayStoreIcon from '../assets/icons/playstore.svg';

const Hero = ({ heroHandPhone }) => {
  const copy = useSiteSettings();
  const heroContent = copy.hero;
  const ctaButtons = copy.getStarted?.ctaButtons || [];
  const marqueeItems = heroContent.marqueeItems || [];
  const showMarquee = copy.visibility?.showHeroMarquee && marqueeItems.length > 0;

  return (
    <section className="hero">
      <Reveal className="hero-bg-reveal" threshold={0} delay={0}>
        <div className="hero-bg-accent"></div>
      </Reveal>
      <div className="container">
        <Reveal delay={0.1}>
          <h1 className="h1-hero">
            {heroContent.title.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i < heroContent.title.split('\n').length - 1 && <br />}
              </span>
            ))}
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="p-large">{heroContent.subtitle}</p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="hero-store-buttons">
            {ctaButtons.map((btn, i) => {
              const isApple = btn.type === 'apple';
              const isGoogle = btn.type === 'google';
              const icon = isApple ? AppleIcon : isGoogle ? PlayStoreIcon : null;
              const isExternal = btn.href?.startsWith('http');
              const fallbackHref = isApple ? 'https://www.apple.com/app-store/' : isGoogle ? 'https://play.google.com' : '#';
              const href = btn.href || fallbackHref;
              return (
                <a
                  key={i}
                  href={href}
                  className="store-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {icon && <img src={icon} alt={btn.type} width="24" height="24" style={{ filter: 'invert(1)' }} />}
                  <span className="store-btn-content">
                    {btn.tag && <span className="store-btn-tag">{btn.tag}</span>}
                    <span className="store-btn-name">{btn.text}</span>
                  </span>
                </a>
              );
            })}
          </div>
        </Reveal>

        <Reveal className="hero-phone-container" delay={0.4}>
          <div className="hero-phone-image-wrapper">
            <img
              src={heroHandPhone}
              alt="Hand holding phone"
              className="hero-phone-image"
              fetchpriority="high"
              width="400"
              height="800"
            />
          </div>
        </Reveal>
      </div>

      {showMarquee && (
        <div className="hero-marquee">
          <div className="hero-marquee-track">
            {[...marqueeItems, ...marqueeItems].map((text, i) => (
              <span key={i} className="hero-marquee-item">
                <span className="hero-marquee-dot" aria-hidden="true" />
                {text}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
