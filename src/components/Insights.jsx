import { useState, useEffect } from 'react';
import Reveal from './Reveal';
import { client, urlFor } from '../lib/sanity';
import { useSiteSettings } from '../context/SiteSettingsContext';

const Insights = () => {
  const [items, setItems] = useState([]);
  const [cards, setCards] = useState([]);
  const { insights, localize, language } = useSiteSettings();
  const featuredItems = items.slice(0, 3);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const [insightsResult, cardsResult] = await Promise.all([
          client.fetch('*[_type == "insight" && isPublished != false] | order(order asc)'),
          client.fetch('*[_type == "featuredReport" && isPublished != false] | order(order asc)')
        ]);
        if (insightsResult && insightsResult.length > 0) setItems(insightsResult);
        if (cardsResult && cardsResult.length > 0) setCards(cardsResult);
      } catch (error) {
        console.error('Insights fetch error:', error);
      }
    };
    fetchInsights();
  }, []);

  return (
    <section id="insights">
      <div className="container">
        <div className="insights-layout">
          <Reveal className="insights-content">
            {(insights.title || insights.subtitle || insights.bottomDesc) && (
              <div className="insights-header">
                {insights.title && <p className="section-label">{insights.title}</p>}
                {insights.subtitle && <h2 className="h2-section">{insights.subtitle}</h2>}
                {insights.bottomDesc && <p className="p-large">{insights.bottomDesc}</p>}
              </div>
            )}

            {items.length > 0 && (
              <ul className="insights-list">
                {items.map((item, i) => (
                  <li key={item._id || i} className="insights-item">
                    {item.icon && (
                      <img
                        className="insights-icon"
                        src={urlFor(item.icon).width(40).url()}
                        alt=""
                      />
                    )}
                    <div>
                      <p className="insights-item-title">{localize(item.title)}</p>
                      <p className="insights-item-desc">{localize(item.desc)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>

          {insights.image && (
            <Reveal className="insights-image-wrapper" delay={0.15}>
              <img className="insights-image" src={insights.image} alt={insights.title || ''} />
            </Reveal>
          )}
        </div>
        {cards.length > 0 && (
          <div className="insights-featured">
            <Reveal className="insights-featured-header">
              {insights.featuredLabel && <p className="section-label">{insights.featuredLabel}</p>}
              {insights.featuredTitle && <h3 className="h2-section">{insights.featuredTitle}</h3>}
              {insights.featuredSubtitle && <p className="p-large">{insights.featuredSubtitle}</p>}
            </Reveal>
            <div className="insights-featured-grid">
              {cards.map((item, i) => {
                const cardImage = item.cardImage ? urlFor(item.cardImage).url() : null;
                const tags = item.tags || [];
                const ctaLabel = item.ctaLabel ? localize(item.ctaLabel) : (language === 'en' ? 'Explore' : 'İncele');
                const ctaHref = item.ctaHref || '#';
                return (
                  <Reveal key={item._id || i} delay={i * 0.1} className="insights-featured-card">
                    <div className="insights-featured-media">
                      {cardImage && (
                        <div
                          className="insights-featured-image"
                          style={{ backgroundImage: `url(${cardImage})` }}
                        ></div>
                      )}
                    </div>
                    <div className="insights-featured-body">
                      <div className="insights-featured-text">
                        <h4 className="insights-featured-title">{localize(item.title)}</h4>
                        <p className="insights-featured-desc">{localize(item.desc)}</p>
                        {tags.length > 0 && (
                          <div className="insights-featured-tags">
                            {tags.map((tag, tagIdx) => (
                              <span key={`${tag}-${tagIdx}`} className="insights-featured-tag">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <a className="insights-featured-cta" href={ctaHref}>
                        {ctaLabel}
                      </a>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Insights;
