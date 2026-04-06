import { useState, useEffect } from 'react';
import Reveal from './Reveal';
import { client, urlFor } from '../lib/sanity';
import { useSiteSettings } from '../context/SiteSettingsContext';

const Insights = () => {
  const [items, setItems] = useState([]);
  const { insights, localize } = useSiteSettings();

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const query = '*[_type == "insight" && isPublished != false] | order(order asc)';
        const result = await client.fetch(query);
        if (result && result.length > 0) setItems(result);
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
            {insights.label && <p className="features-label">{insights.label}</p>}
            {insights.title && <h2 className="h2-section">{insights.title}</h2>}
            {insights.subtitle && <p className="p-large">{insights.subtitle}</p>}

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
      </div>
    </section>
  );
};

export default Insights;
