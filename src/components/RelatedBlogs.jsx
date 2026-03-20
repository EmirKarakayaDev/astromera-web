import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import { client, urlFor } from '../lib/sanity';
import { journalArticles as staticArticles } from '../data/content';
import { useSiteSettings } from '../hooks/useSiteSettings';

const RelatedBlogs = ({ currentId }) => {
  const [blogs, setBlogs] = useState([]);
  const { language, localize, journal } = useSiteSettings();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const query = '*[_type == "blog"]';
        const result = await client.fetch(query);
        if (result && result.length > 0) {
          setBlogs(result);
        } else {
          setBlogs(staticArticles);
        }
      } catch (error) {
        console.error('Sanity fetch error:', error);
        setBlogs(staticArticles);
      }
    };

    fetchBlogs();
  }, []);

  const otherBlogs = blogs
    .filter(blog => (blog._id || String(blog.id)) !== String(currentId))
    .slice(0, 3);

  if (otherBlogs.length === 0) return null;

  return (
    <section className="related-blogs">
      <div className="container">
        <Reveal className="text-center" style={{ marginBottom: '60px' }}>
          <div className="blog-section-header">
            <h2 className="journal-related-title">{journal.relatedArticles}</h2>
            <p className="journal-related-desc">{journal.relatedSubtitle}</p>
          </div>
        </Reveal>
        <div className="blog-grid">
          {otherBlogs.map((article, i) => {
            const articleId = article._id || article.id;
            const imageUrl = article.mainImage ? urlFor(article.mainImage).url() : article.img;
            
            return (
              <Reveal key={articleId} delay={i * 0.1}>
                <Link to={`/${language}/blog/${articleId}`} className="blog-card" style={{ textDecoration: 'none' }}>
                  <div className="blog-card-img-wrapper">
                    <div 
                      className="blog-card-img" 
                      style={{ backgroundImage: `url(${imageUrl})` }}
                    ></div>
                  </div>
                  <div className="blog-card-date">{article.date}</div>
                  <h4 className="blog-card-title">{localize(article.title)}</h4>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RelatedBlogs;
