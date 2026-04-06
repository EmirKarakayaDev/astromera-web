import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/common/SectionHeader';
import { client, urlFor } from '../lib/sanity';
import Reveal from '../components/Reveal';
import GetStarted from '../components/GetStarted';
import usePageMeta from '../hooks/usePageMeta';
import { useSiteSettings } from '../context/SiteSettingsContext';

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const copy = useSiteSettings();
  const journalCopy = copy.journal;

  usePageMeta(journalCopy.title, journalCopy.subtitle);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const query = '*[_type == "blog" && isPublished != false] | order(date desc)';
        const result = await client.fetch(query);
        if (result && result.length > 0) {
          setArticles(result);
        }
      } catch (error) {
        console.error('Sanity fetch error:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <>
    <div className="blog-page">
      <Reveal className="blog-bg-reveal" threshold={0} delay={0}>
        <div className="blog-bg-accent"></div>
      </Reveal>
      <div className="container" style={{ maxWidth: '1100px' }}>
        <SectionHeader 
          title={journalCopy.title}
          subtitle={journalCopy.subtitle}
        />
        
        <div className="blog-grid">
          {articles.map((article, i) => {
            const articleId = article._id || article.id;
            const imageUrl = article.mainImage ? urlFor(article.mainImage).url() : article.img;
            
            return (
              <Reveal key={articleId} delay={i * 0.1}>
                <Link to={`/${copy.language}/blog/${articleId}`} className="blog-card" style={{ textDecoration: 'none' }}>
                  <div className="blog-card-img-wrapper">
                    <div 
                      className="blog-card-img" 
                      style={{ backgroundImage: `url(${imageUrl})` }}
                    ></div>
                  </div>
                  <div className="blog-card-date">{article.date}</div>
                  <h4 className="blog-card-title">{copy.localize(article.title)}</h4>
                </Link>
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

export default Blog;
