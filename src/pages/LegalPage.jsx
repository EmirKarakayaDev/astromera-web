import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../lib/sanity';
import Reveal from '../components/Reveal';
import usePageMeta from '../hooks/usePageMeta';
import { useSiteSettings } from '../context/SiteSettingsContext';

const LegalPage = () => {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const { localize } = useSiteSettings();

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const query = `*[_type == "legalPage" && slug.current == $slug][0]`;
        const result = await client.fetch(query, { slug });
        setPage(result);
      } catch (error) {
        console.error('Legal page fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, [slug]);

  usePageMeta(
    page ? localize(page.title) : 'Legal',
    page ? localize(page.subtitle) : ''
  );

  if (loading) {
    return (
      <div className="legal-page">
        <div className="container"><p>Loading...</p></div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="legal-page">
        <div className="container">
          <h2>Page not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="legal-page">
      <div className="container">
        <Reveal className="legal-header">
          <h1 className="legal-title">{localize(page.title)}</h1>
          {page.subtitle && (
            <p className="legal-subtitle">{localize(page.subtitle)}</p>
          )}
        </Reveal>

        <Reveal className="legal-content">
          {page.sections?.map((section, i) => (
            <div key={i} className="legal-section">
              {section.heading && (
                <h2 className="legal-section-heading">{localize(section.heading)}</h2>
              )}
              {section.body && (
                <p className="legal-section-body">{localize(section.body)}</p>
              )}
            </div>
          ))}
        </Reveal>
      </div>
    </div>
  );
};

export default LegalPage;
