import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../lib/sanity';
import { journalArticles as staticArticles } from '../data/content';
import Reveal from '../components/Reveal';
import RelatedBlogs from '../components/RelatedBlogs';
import usePageMeta from '../hooks/usePageMeta';

import { useSiteSettings } from '../hooks/useSiteSettings';

const BlogDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const { localize, language } = useSiteSettings();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // First try to find in Sanity by _id or original ID
        const query = `*[_type == "blog" && (_id == $id || string(id) == $id)][0]`;
        const result = await client.fetch(query, { id });
        
        if (result) {
          setArticle(result);
        } else {
          // Fallback to static data
          const staticMatch = staticArticles.find(a => String(a.id) === id);
          setArticle(staticMatch);
        }
      } catch (error) {
        console.error('Sanity fetch error:', error);
        const staticMatch = staticArticles.find(a => String(a.id) === id);
        setArticle(staticMatch);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  usePageMeta(
    localize(article?.title) ?? 'Article',
    localize(article?.body?.[0]) ?? 'Read the latest insights from the AstroMera Journal.'
  );

  if (loading) {
    return <div className="blog-detail-page"><div className="container"><h2>Loading...</h2></div></div>;
  }

  if (!article) {
    return (
      <div className="blog-detail-page">
        <div className="container">
          <h2>Article not found</h2>
          <Link to={`/${language}/blog`} className="blog-detail-back">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  const imageUrl = article.mainImage ? urlFor(article.mainImage).url() : article.img;
  const currentId = article._id || article.id;

  return (
    <>
    <div className="blog-detail-page">
      <div className="container" style={{ maxWidth: '1000px' }}>
        <Reveal>
          <Link to={`/${language}/blog`} className="blog-detail-back">← All Articles</Link>
          
          <div className="blog-detail-img-wrapper">
            <div 
              className="blog-detail-img" 
              style={{ backgroundImage: `url(${imageUrl})` }}
            ></div>
          </div>

          <div className="blog-detail-container">
            <div className="blog-detail-header">
              <div className="blog-detail-meta">
                <span className="blog-detail-date">{article.date}</span>
                {article.readTime && (
                  <span className="blog-detail-read-time">{localize(article.readTime)}</span>
                )}
              </div>
              <h1 className="blog-detail-title">{localize(article.title)}</h1>
            </div>
            
            <div className="blog-detail-content">
              {article.body && Array.isArray(article.body)
                ? article.body.map((paragraph, i) => (
                    <p key={i}>{localize(paragraph)}</p>
                  ))
                : <p>{localize(article.text) || 'Content coming soon.'}</p>
              }
            </div>
          </div>
        </Reveal>
      </div>
    </div>
    <RelatedBlogs currentId={currentId} />
    </>
  );
};

export default BlogDetail;
