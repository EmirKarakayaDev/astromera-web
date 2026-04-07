import { useState, useEffect } from 'react';
import Reveal from '../components/Reveal';
import GetStarted from '../components/GetStarted';
import usePageMeta from '../hooks/usePageMeta';
import { client, urlFor } from '../lib/sanity';
import { useSiteSettings } from '../context/SiteSettingsContext';
import '../styles/about.css';

const FALLBACK_VALUES = [
  { title: { tr: 'Misyonumuz', en: 'Our Mission' }, desc: { tr: 'İçerik yakında eklenecek.', en: 'Content coming soon.' } },
  { title: { tr: 'Vizyonumuz', en: 'Our Vision' }, desc: { tr: 'İçerik yakında eklenecek.', en: 'Content coming soon.' } },
  { title: { tr: 'Değerlerimiz', en: 'Our Values' }, desc: { tr: 'İçerik yakında eklenecek.', en: 'Content coming soon.' } },
];

const FALLBACK_TEAM = [
  { name: 'İsim Soyisim', role: { tr: 'Kurucu & CEO', en: 'Founder & CEO' } },
  { name: 'İsim Soyisim', role: { tr: 'Ürün Tasarımı', en: 'Product Design' } },
  { name: 'İsim Soyisim', role: { tr: 'Yazılım Geliştirme', en: 'Engineering' } },
];

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
  const subtitle = data?.subtitle ? localize(data.subtitle) : (language === 'tr' ? 'AstroMera\'yı kim yaptı, neden yaptı ve nereye gidiyor.' : 'Who built AstroMera, why, and where it\'s headed.');
  const valuesTitle = data?.valuesTitle ? localize(data.valuesTitle) : (language === 'tr' ? 'Neden AstroMera?' : 'Why AstroMera?');
  const teamTitle = data?.teamTitle ? localize(data.teamTitle) : (language === 'tr' ? 'Ekibimiz' : 'Our Team');
  const values = data?.values?.length > 0 ? data.values : FALLBACK_VALUES;
  const team = data?.teamMembers?.length > 0 ? data.teamMembers : FALLBACK_TEAM;

  usePageMeta(title, subtitle);

  if (loading) return <div className="about-page" style={{ minHeight: '60vh' }} />;

  return (
    <>
      <div className="about-page">
        <Reveal className="about-bg-reveal" threshold={0} delay={0}>
          <div className="about-bg-accent" />
        </Reveal>

        <div className="container" style={{ maxWidth: '1100px' }}>

          {/* Intro */}
          <Reveal className="about-intro">
            <p className="section-label">{language === 'tr' ? 'Hakkımızda' : 'About'}</p>
            <h1 className="h2-section" style={{ margin: '16px 0' }}>{title}</h1>
            <p className="p-large" style={{ maxWidth: 'none' }}>{subtitle}</p>
          </Reveal>

          {/* Değerler */}
          <Reveal>
            <h2 className="h2-section text-center" style={{ marginBottom: '48px' }}>{valuesTitle}</h2>
          </Reveal>
          <div className="about-values">
            {values.map((v, i) => (
              <Reveal key={i} delay={i * 0.1} className="about-value-card">
                {v.icon?.asset && (
                  <div className="about-value-icon">
                    <img src={urlFor(v.icon).width(48).height(48).url()} alt="" />
                  </div>
                )}
                <h4 className="about-value-title">{localize(v.title)}</h4>
                <p className="about-value-desc">{localize(v.desc)}</p>
              </Reveal>
            ))}
          </div>

          {/* Ekip */}
          <div className="about-team">
            <Reveal className="about-team-header">
              <h2 className="h2-section">{teamTitle}</h2>
            </Reveal>
            <div className="about-team-grid">
              {team.map((member, i) => (
                <Reveal key={i} delay={i * 0.1} className="about-team-card">
                  {member.avatar?.asset
                    ? <img className="about-team-avatar" src={urlFor(member.avatar).width(200).height(200).url()} alt={member.name} />
                    : <div className="about-team-avatar" />
                  }
                  <h4 className="about-team-name">{member.name}</h4>
                  <p className="about-team-role">{localize(member.role)}</p>
                </Reveal>
              ))}
            </div>
          </div>

        </div>
      </div>
      <GetStarted delay={0.2} />
    </>
  );
};

export default About;
