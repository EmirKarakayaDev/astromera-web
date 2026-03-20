import Reveal from './Reveal';
import Button from './common/Button';
import { useSiteSettings } from '../hooks/useSiteSettings';

const Hero = ({ heroHandPhone }) => {
  const copy = useSiteSettings();
  const heroContent = copy.hero;

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
          <Button to="/pricing" className="hero-btn">{heroContent.cta}</Button>
        </Reveal>

        <Reveal className="hero-phone-container" delay={0.4}>
          <div className="hero-phone-image-wrapper">
            <img src={heroHandPhone} alt="Hand holding phone" className="hero-phone-image" />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Hero;
