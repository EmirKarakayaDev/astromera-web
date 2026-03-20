import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import SectionHeader from './common/SectionHeader';
import Button from './common/Button';
import { client, urlFor } from '../lib/sanity';
import { journalArticles as staticArticles } from '../data/content';
import { useSiteSettings } from '../hooks/useSiteSettings';

const Journal = () => {
  const [articles, setArticles] = useState([]);
  const copy = useSiteSettings();
  const journalCopy = copy.journal;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const query = '*[_type == "blog"] | order(date desc)';
        const result = await client.fetch(query);
        if (result && result.length > 0) {
          setArticles(result);
        } else {
          setArticles(staticArticles);
        }
      } catch (error) {
        console.error('Sanity fetch error:', error);
        setArticles(staticArticles);
      }
    };

    fetchArticles();
  }, []);

  const featuredArticle = articles[0] || staticArticles[0];
  const sideArticles = articles.length > 1 ? articles.slice(1, 4) : staticArticles.slice(1, 4);

  return (
    <section id="blog">
      <div className="container">
        <SectionHeader 
          title={journalCopy.title}
          subtitle={journalCopy.subtitle}
          className="bento-header"
          centered={false}
        />

        <div className="journal-grid">
          <Reveal className="journal-featured" delay={0}>
            <Link to={`/${copy.language}/blog/${featuredArticle?._id || featuredArticle?.id}`} className="journal-featured-link">
              <div className="journal-featured-img-wrapper">
                <div 
                  className="journal-img-placeholder" 
                  style={{ 
                    backgroundImage: `url(${featuredArticle?.mainImage ? urlFor(featuredArticle.mainImage).url() : featuredArticle?.img})`, 
                    backgroundSize: 'cover' 
                  }}
                ></div>
              </div>
              <div className="journal-featured-content">
                <span className="badge-trusted badge-pink">{journalCopy.featuredTag}</span>
                <h3 className="journal-featured-title">{copy.localize(featuredArticle?.title)}</h3>
                <span className="journal-featured-btn">{journalCopy.cta}</span>
              </div>
            </Link>
          </Reveal>

          {sideArticles.map((article, i) => (
            <Reveal key={article._id || article.id} delay={(i + 1) * 0.1}>
              <Link to={`/${copy.language}/blog/${article._id || article.id}`} className="journal-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="journal-card-img-wrapper">
                  <div 
                    className="img" 
                    style={{ 
                      backgroundImage: `url(${article.mainImage ? urlFor(article.mainImage).url() : article.img})`, 
                      backgroundSize: 'cover' 
                    }}
                  ></div>
                </div>
                <div className="content">
                  <h4 className="journal-card-title">{copy.localize(article.title)}</h4>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="text-center journal-btn-wrapper" style={{ marginTop: '40px' }}>
          <Button to="/blog">{journalCopy.viewAll}</Button>
        </div>
      </div>
    </section>
  );
};

export default Journal;
