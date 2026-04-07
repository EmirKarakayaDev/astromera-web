import SectionHeader from './common/SectionHeader';
import Reveal from './Reveal';
import { useSiteSettings } from '../context/SiteSettingsContext';

const ContactSection = () => {
  const copy = useSiteSettings();
  const contactCopy = copy.contact;

  const handleInput = (e) => {
    const target = e.target;
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;
  };

  return (
    <section className="contact-section">
      <div className="container">
        <div className="contact-container">
          <SectionHeader
            title={contactCopy.title}
            subtitle={contactCopy.subtitle}
          />

          <Reveal className="contact-form-wrapper">
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label className="form-label">{contactCopy.nameLabel}</label>
                <input className="form-input" type="text" placeholder={contactCopy.namePlaceholder} />
              </div>

              <div className="form-group">
                <label className="form-label">{contactCopy.emailLabel}</label>
                <input className="form-input" type="email" placeholder={contactCopy.emailPlaceholder} />
              </div>

              <div className="form-group">
                <label className="form-label">{contactCopy.messageLabel}</label>
                <textarea
                  className="form-input form-textarea"
                  placeholder={contactCopy.messagePlaceholder}
                  onInput={handleInput}
                ></textarea>
              </div>

              <button type="submit" className="form-submit-btn">{contactCopy.submitLabel}</button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
