import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/common/SectionHeader';
import { client, urlFor } from '../lib/sanity';
import Reveal from '../components/Reveal';
import GetStarted from '../components/GetStarted';
import usePageMeta from '../hooks/usePageMeta';
import { useSiteSettings } from '../context/SiteSettingsContext';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const copy = useSiteSettings();
  const { insights, localize, language } = copy;

  const title = insights.featuredTitle || (language === 'tr' ? 'Raporlar' : 'Reports');
  const subtitle = insights.featuredSubtitle || '';

  usePageMeta(title, subtitle);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const result = await client.fetch('*[_type == "featuredReport" && isPublished != false] | order(order asc)');
        if (result && result.length > 0) setReports(result);
      } catch (error) {
        console.error('Reports fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  return (
    <>
      <div className="blog-page">
        <Reveal className="blog-bg-reveal" threshold={0} delay={0}>
          <div className="blog-bg-accent"></div>
        </Reveal>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <SectionHeader title={title} subtitle={subtitle} />

          <div className="insights-featured-grid" style={{ minHeight: '400px', marginTop: '80px' }}>
            {!loading && reports.map((item, i) => {
              const cardImage = item.cardImage ? urlFor(item.cardImage).url() : null;
              const tags = item.tags || [];
              const ctaLabel = item.ctaLabel ? localize(item.ctaLabel) : (language === 'en' ? 'Explore' : 'İncele');

              return (
                <Reveal key={item._id || i} delay={i * 0.1} className="insights-featured-card">
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
      </div>
      <GetStarted delay={0.2} />
    </>
  );
};

export default Reports;
