import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { client, urlFor } from '../lib/sanity';
import Reveal from '../components/Reveal';
import RelatedReports from '../components/RelatedReports';
import usePageMeta from '../hooks/usePageMeta';
import { useSiteSettings } from '../context/SiteSettingsContext';

const ReportDetail = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const { localize, language } = useSiteSettings();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const query = `*[_type == "featuredReport" && isPublished != false && _id == $id][0]`;
        const result = await client.fetch(query, { id });
        if (result) setReport(result);
      } catch (error) {
        console.error('Report fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [id]);

  usePageMeta(
    localize(report?.title) ?? (language === 'tr' ? 'Rapor' : 'Report'),
    localize(report?.desc) ?? ''
  );

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return new Intl.DateTimeFormat(language === 'tr' ? 'tr-TR' : 'en-US', {
        day: 'numeric', month: 'long', year: 'numeric'
      }).format(new Date(dateString));
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return <div className="blog-detail-page" style={{ minHeight: '60vh' }} />;
  }

  if (!report) {
    return (
      <div className="blog-detail-page">
        <div className="container">
          <h2>{language === 'tr' ? 'Rapor bulunamadı' : 'Report not found'}</h2>
        </div>
      </div>
    );
  }

  const imageUrl = report.cardImage ? urlFor(report.cardImage).url() : null;
  const tags = report.tags || [];
  const isExternalCta = report.ctaHref?.startsWith('http');

  return (
    <>
    <div className="blog-detail-page" key={id}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <Reveal>
          {imageUrl && (
            <div className="blog-detail-img-wrapper">
              <div className="blog-detail-img" style={{ backgroundImage: `url(${imageUrl})` }} />
            </div>
          )}

          <div className="blog-detail-container">
            <div className="blog-detail-header">
              <div className="blog-detail-meta">
                {report.date && <span className="blog-detail-date">{formatDate(report.date)}</span>}
                {report.readingTime && (
                  <span className="blog-detail-read-time">
                    {report.readingTime} {language === 'tr' ? 'dk okuma' : 'min read'}
                  </span>
                )}
              </div>
              <h1 className="blog-detail-title">{localize(report.title)}</h1>
              {tags.length > 0 && (
                <div className="insights-featured-tags" style={{ marginTop: '16px' }}>
                  {tags.map((tag, i) => (
                    <span key={i} className="insights-featured-tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>

            <div className="blog-detail-content">
              {report.body && Array.isArray(report.body) && report.body.length > 0
                ? report.body.map((paragraph, i) => (
                    <p key={i}>{localize(paragraph)}</p>
                  ))
                : <p>{localize(report.desc)}</p>
              }
            </div>

            {isExternalCta && (
              <a
                href={report.ctaHref}
                className="btn-maroon"
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginTop: '40px', display: 'inline-block' }}
              >
                {report.ctaLabel ? localize(report.ctaLabel) : (language === 'tr' ? 'Rapora Git' : 'View Report')}
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </div>
    <RelatedReports currentId={id} />
    </>
  );
};

export default ReportDetail;
