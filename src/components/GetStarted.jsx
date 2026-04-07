import Reveal from './Reveal';
import SectionHeader from './common/SectionHeader';
import { useSiteSettings } from '../context/SiteSettingsContext';
import { urlFor } from '../lib/sanity';
import AppleIcon from '../assets/icons/apple.svg';
import PlayStoreIcon from '../assets/icons/playstore.svg';

// Import default photos in case Sanity images are missing
import polaroid1 from '../assets/photos/1PfLTJoaw2wzQAGaOGvZnkn4fjQ.avif';
import polaroid2 from '../assets/photos/CHQPViNi7GH7Bta1TkaI7fuxYI.avif';
import polaroid3 from '../assets/photos/t3zWrMla0x9XUTd93a1J7gqnAA.avif';

const GetStarted = ({ delay = 0 }) => {
  const copy = useSiteSettings();
  const cta = copy.getStarted;

  // Handle Dynamic Buttons
  const renderButtons = () => {
    return cta.ctaButtons.map((btn, i) => {
      const isApple = btn.type === 'apple';
      const isGoogle = btn.type === 'google';
      const icon = isApple ? AppleIcon : isGoogle ? PlayStoreIcon : null;

      const fallbackHref = isApple ? 'https://www.apple.com/app-store/' : isGoogle ? 'https://play.google.com' : '#';

      return (
        <a key={i} href={btn.href || fallbackHref} className="store-btn">
          {icon && (
            <img 
              src={icon} 
              alt={btn.type} 
              width="24" 
              height="24" 
              style={{ filter: 'invert(1)' }} 
            />
          )}
          <span className="store-btn-content">
            {btn.tag && <span className="store-btn-tag">{btn.tag}</span>}
            <span className="store-btn-name">{btn.text}</span>
          </span>
        </a>
      );
    });
  };

  // Handle Dynamic Images (Polaroids)
  const renderImages = () => {
    const images = cta.images;
    
    // If no images in Sanity, use defaults
    if (!images || images.length === 0) {
      return (
        <>
          <div className="polaroid polaroid--left">
            <div className="img" style={{ backgroundImage: `url(${polaroid2})`, backgroundSize: 'cover' }}></div>
          </div>
          <div className="polaroid polaroid--center">
            <div className="img" style={{ backgroundImage: `url(${polaroid1})`, backgroundSize: 'cover' }}></div>
          </div>
          <div className="polaroid polaroid--right">
            <div className="img" style={{ backgroundImage: `url(${polaroid3})`, backgroundSize: 'cover' }}></div>
          </div>
        </>
      );
    }

    // Map Sanity images to positions
    return images.map((img, idx) => {
      let positionClass = '';
      if (images.length === 1) positionClass = 'polaroid--center';
      else if (images.length === 2) {
        positionClass = idx === 0 ? 'polaroid--left' : 'polaroid--right';
      } else {
        positionClass = idx === 0 ? 'polaroid--left' : idx === 1 ? 'polaroid--center' : 'polaroid--right';
      }

      return (
        <div key={idx} className={`polaroid ${positionClass}`}>
          <div 
            className="img" 
            style={{ 
              backgroundImage: `url(${urlFor(img).url()})`, 
              backgroundSize: 'cover' 
            }}
          ></div>
        </div>
      );
    });
  };

  return (
    <section id="download" className="polaroid-section">
      <div className="container">
        <SectionHeader
          title={cta.title}
          subtitle={cta.subtitle}
          delay={delay}
        />
        <Reveal delay={delay + 0.1}>
          <div className="store-buttons">
            {renderButtons()}
          </div>
        </Reveal>

        <Reveal delay={delay + 0.2} className="polaroid-stack">
          {renderImages()}
        </Reveal>
      </div>
    </section>
  );
};

export default GetStarted;
