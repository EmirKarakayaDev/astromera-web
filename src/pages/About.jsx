import { useState, useEffect } from 'react';
import { PortableText } from '@portabletext/react';
import Reveal from '../components/Reveal';
import GetStarted from '../components/GetStarted';
import usePageMeta from '../hooks/usePageMeta';
import { client } from '../lib/sanity';
import { useSiteSettings } from '../context/SiteSettingsContext';
import '../styles/about.css';

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
      <a href={value?.href} target="_blank" rel="noopener noreferrer">{children}</a>
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

const About = () => {
  const { language, localize } = useSiteSettings();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.fetch('*[_type == "aboutPage"][0]')
      .then(result => { if (result) setData(result); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const title = data?.title ? localize(data.title) : (language === 'tr' ? 'Hakkımızda' : 'About Us');
  const subtitle = data?.subtitle ? localize(data.subtitle) : '';
  const body = data?.body?.[language] || data?.body?.tr || null;

  usePageMeta(title, subtitle);

  if (loading) return <div className="about-page" style={{ minHeight: '60vh' }} />;

  return (
    <>
      <div className="about-page">
        <Reveal className="about-bg-reveal" threshold={0} delay={0}>
          <div className="about-bg-accent" />
        </Reveal>

        <div className="container" style={{ maxWidth: '800px' }}>
          <Reveal className="about-header">
            <p className="section-label">{language === 'tr' ? 'Hakkımızda' : 'About'}</p>
            <h1 className="h2-section">{title}</h1>
            {subtitle && <p className="p-large">{subtitle}</p>}
          </Reveal>

          {body && (
            <Reveal className="about-body">
              <PortableText value={body} components={portableComponents} />
            </Reveal>
          )}
        </div>
      </div>
      <GetStarted delay={0.2} />
    </>
  );
};

export default About;
