import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import { client } from '../lib/sanity';
import Reveal from '../components/Reveal';
import usePageMeta from '../hooks/usePageMeta';
import { useSiteSettings } from '../context/SiteSettingsContext';

const slugify = (text) =>
  text
    ?.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-çğışöü]/g, '')
    || '';

const portableComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => <span style={{ textDecoration: 'underline' }}>{children}</span>,
    link: ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
};

const LegalPage = () => {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const { localize, language } = useSiteSettings();

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
    ''
  );

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat(language === 'tr' ? 'tr-TR' : 'en-US', {
        day: 'numeric', month: 'long', year: 'numeric'
      }).format(date);
    } catch {
      return dateStr;
    }
  };

  const getLocalizedPT = (field) => {
    if (!field) return null;
    return field[language] || field['tr'] || null;
  };

  if (loading) {
    return <div className="legal-page" style={{ minHeight: '60vh' }} />;
  }

  if (!page) {
    return (
      <div className="legal-page">
        <div className="container"><h2>Page not found</h2></div>
      </div>
    );
  }

  const sections = page.sections || [];
  const introContent = getLocalizedPT(page.intro);

  return (
    <div className="legal-page">
      <div className="container">
        <Reveal className="legal-header">
          <h1 className="legal-title">{localize(page.title)}</h1>
          {page.subtitle && (
            <p className="legal-subtitle">{localize(page.subtitle)}</p>
          )}
          {page.lastUpdated && (
            <p className="legal-last-updated">
              {language === 'tr' ? 'Son Güncelleme' : 'Last Updated'}: {formatDate(page.lastUpdated)}
            </p>
          )}
        </Reveal>

        {sections.length > 0 && (
          <Reveal className="legal-anchor-nav">
            {sections.map((section) => {
              const headingText = localize(section.heading);
              return (
                <a
                  key={headingText}
                  href={`#${slugify(headingText)}`}
                  className="legal-anchor-link"
                >
                  {headingText}
                </a>
              );
            })}
          </Reveal>
        )}

        {introContent && introContent.length > 0 && (
          <Reveal className="legal-intro">
            <PortableText value={introContent} components={portableComponents} />
          </Reveal>
        )}

        <div className="legal-content">
          {sections.map((section, i) => {
            const headingText = localize(section.heading);
            const bodyContent = getLocalizedPT(section.body);
            return (
              <div key={i}>
                <span id={slugify(headingText)} className="legal-anchor-target" />
                <Reveal className="legal-section">
                  {headingText && (
                    <h2 className="legal-section-heading">
                      {i + 1}. {headingText}
                    </h2>
                  )}
                  {bodyContent && bodyContent.length > 0 && (
                    <div className="legal-section-body">
                      <PortableText value={bodyContent} components={portableComponents} />
                    </div>
                  )}
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
