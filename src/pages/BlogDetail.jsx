import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../lib/sanity';
import { journalArticles as staticArticles } from '../data/content';
import Reveal from '../components/Reveal';
import RelatedBlogs from '../components/RelatedBlogs';
import usePageMeta from '../hooks/usePageMeta';

import { useSiteSettings } from '../context/SiteSettingsContext';

const BlogDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const { localize, language, journal } = useSiteSettings();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // First try to find in Sanity by _id or original ID
        const query = `*[_type == "blog" && isPublished != false && (_id == $id || string(id) == $id)][0]`;
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
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat(language === 'tr' ? 'tr-TR' : 'en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  const imageUrl = article.mainImage ? urlFor(article.mainImage).url() : article.img;
  const currentId = article._id || article.id;

  return (
    <>
    <div className="blog-detail-page" key={id}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <Reveal>
          <div className="blog-detail-img-wrapper">
            <div 
              className="blog-detail-img" 
              style={{ backgroundImage: `url(${imageUrl})` }}
            ></div>
          </div>

          <div className="blog-detail-container">
            <div className="blog-detail-header">
              <div className="blog-detail-meta">
                <span className="blog-detail-date">{formatDate(article.date)}</span>
                  <span className="blog-detail-read-time">{article.readingTime || '5'} {language === 'tr' ? 'dakikalık okuma' : 'min read'}</span>
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
