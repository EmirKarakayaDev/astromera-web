import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import { client, urlFor } from '../lib/sanity';
import { useSiteSettings } from '../context/SiteSettingsContext';

const RelatedReports = ({ currentId }) => {
  const [reports, setReports] = useState([]);
  const { language, localize, insights } = useSiteSettings();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const result = await client.fetch('*[_type == "featuredReport" && isPublished != false] | order(order asc)');
        if (result && result.length > 0) setReports(result);
      } catch (error) {
        console.error('Related reports fetch error:', error);
      }
    };
    fetchReports();
  }, []);

  const otherReports = reports
    .filter(r => r._id !== currentId)
    .slice(0, 3);

  if (otherReports.length === 0) return null;

  const title = language === 'tr' ? 'Diğer Raporlar' : 'More Reports';
  const subtitle = language === 'tr' ? 'En güncel raporlarımızı keşfedin.' : 'Discover more from our latest reports.';

  return (
    <section className="related-blogs">
      <div className="container">
        <Reveal className="text-center" style={{ marginBottom: '60px' }}>
          <div className="blog-section-header">
            <h2 className="journal-related-title">{title}</h2>
            <p className="journal-related-desc">{subtitle}</p>
          </div>
        </Reveal>
        <div className="insights-featured-grid">
          {otherReports.map((item, i) => {
            const cardImage = item.cardImage ? urlFor(item.cardImage).url() : null;
            const tags = item.tags || [];
            const ctaLabel = item.ctaLabel ? localize(item.ctaLabel) : (language === 'en' ? 'Explore' : 'İncele');

            return (
              <Reveal key={item._id} delay={i * 0.1} className="insights-featured-card">
                <div className="insights-featured-media">
                  {cardImage && (
                    <div
                      className="insights-featured-image"
                      style={{ backgroundImage: `url(${cardImage})` }}
                    />
                  )}
                </div>
                <div className="insights-featured-body">
                  <div className="insights-featured-text">
                    <h4 className="insights-featured-title">{localize(item.title)}</h4>
                    <p className="insights-featured-desc">{localize(item.desc)}</p>
                    {tags.length > 0 && (
                      <div className="insights-featured-tags">
                        {tags.map((tag, tagIdx) => (
                          <span key={`${tag}-${tagIdx}`} className="insights-featured-tag">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <Link className="insights-featured-cta" to={`/${language}/reports/${item._id}`}>
                    {ctaLabel}
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RelatedReports;
