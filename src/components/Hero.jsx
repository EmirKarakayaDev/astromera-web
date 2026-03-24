import Reveal from './Reveal';
import Button from './common/Button';
import { useSiteSettings } from '../context/SiteSettingsContext';

const Hero = ({ heroHandPhone }) => {
  const copy = useSiteSettings();
  const heroContent = copy.hero;
  const isLoading = copy.isLoading;

  return (
    <section className="hero">
      <Reveal className="hero-bg-reveal" threshold={0} delay={0}>
        <div className="hero-bg-accent"></div>
      </Reveal>
      <div className="container">
        <Reveal delay={0.1}>
          <h1 
            className="h1-hero"
            style={{ 
              opacity: isLoading ? 0 : 1, 
              transition: 'opacity 0.5s ease',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '2em'
            }}
          >
            {heroContent.title.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i < heroContent.title.split('\n').length - 1 && <br />}
              </span>
            ))}
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p 
            className="p-large"
            style={{ 
              opacity: isLoading ? 0 : 1, 
              transition: 'opacity 0.5s ease'
            }}
          >
            {heroContent.subtitle}
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <Button to="/pricing" className="hero-btn">{heroContent.cta}</Button>
        </Reveal>

        <Reveal className="hero-phone-container" delay={0.4}>
          <div className="hero-phone-image-wrapper">
            <img 
              src={heroHandPhone} 
              alt="Hand holding phone" 
              className="hero-phone-image" 
              fetchpriority="high"
              width="600"
              height="800"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Hero;
