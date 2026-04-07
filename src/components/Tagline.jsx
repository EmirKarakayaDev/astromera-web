import Reveal from './Reveal';
import { useSiteSettings } from '../context/SiteSettingsContext';

const Tagline = () => {
  const { hero } = useSiteSettings();

  if (!hero.tagline) return null;

  return (
    <section className="tagline-section">
      <div className="container">
        <Reveal>
          <p className="tagline-text">{hero.tagline}</p>
        </Reveal>
      </div>
    </section>
  );
};

export default Tagline;
