import Reveal from './Reveal';
import Button from './common/Button';
import { useSiteSettings } from '../context/SiteSettingsContext';

const Hero = ({ heroHandPhone }) => {
  const copy = useSiteSettings();
  const heroContent = copy.hero;

  return (
    <section className="hero">
      <Reveal className="hero-bg-reveal" threshold={0} delay={0} initialActive={true}>
        <div className="hero-bg-accent"></div>
      </Reveal>
      <div className="container">
        <Reveal threshold={0} delay={0} initialActive={true}>
          <h1 className="h1-hero">
            {heroContent.title.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i < heroContent.title.split('\n').length - 1 && <br />}
              </span>
            ))}
          </h1>
        </Reveal>

        <Reveal threshold={0} delay={0.1}>
          <p className="p-large">{heroContent.subtitle}</p>
        </Reveal>

        <Reveal threshold={0} delay={0.2}>
          <Button to="/pricing" className="hero-btn">{heroContent.cta}</Button>
        </Reveal>

        <Reveal className="hero-phone-container" threshold={0} delay={0} initialActive={true}>
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
