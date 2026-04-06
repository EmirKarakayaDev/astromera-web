import { useState, useEffect } from 'react';
import Reveal from './Reveal';
import { client, urlFor } from '../lib/sanity';
import { useSiteSettings } from '../context/SiteSettingsContext';

const Features = () => {
  const [data, setData] = useState([]);
  const copy = useSiteSettings();
  const featuresCopy = copy.features;

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const query = '*[_type == "feature"] | order(order asc)';
        const result = await client.fetch(query);
        if (result && result.length > 0) {
          setData(result);
        }
      } catch (error) {
        console.error('Sanity fetch error:', error);
      }
    };

    fetchFeatures();
  }, []);

  return (
    <section id="features">
      <div className="container">
        <Reveal className="features-header">
          <h2 className="h2-section">{featuresCopy.title}</h2>
          {featuresCopy.subtitle && <p className="p-large">{featuresCopy.subtitle}</p>}
          {featuresCopy.bottomDesc && <p className="p-large">{featuresCopy.bottomDesc}</p>}
        </Reveal>

        <div className="bento-grid">
          {data.length === 0 ? (
            // Skeleton State - Boş kutular görünür (zıplamayı engeller)
            Array(6).fill(0).map((_, i) => (
              <div key={i} className="bento-card skeleton" style={{ minHeight: '300px' }}></div>
            ))
          ) : (
            data.map((feature, i) => {
              const isCustom = feature.customLayout === "stack" || feature.customLayout === "location-stack";
              
              // Get Image URLs
              const mainImg = feature.mainImage ? urlFor(feature.mainImage).url() : feature.img;
              const midImg = feature.imgMid ? (typeof feature.imgMid === 'string' ? feature.imgMid : urlFor(feature.imgMid).url()) : null;
              const backImg = feature.imgBack ? (typeof feature.imgBack === 'string' ? feature.imgBack : urlFor(feature.imgBack).url()) : null;

              const imageCount = [mainImg, midImg, backImg].filter(Boolean).length;

              return (
                <Reveal 
                  key={feature._id || i} 
                  className={`bento-card ${isCustom ? "custom-bento" : ""} ${feature.customLayout || ""} has-${imageCount}-images ${feature.gridSpan || ''}`}
                >
                  {isCustom ? (
                    <div className="bento-stack">
                      {backImg && (
                        <div
                          className="bento-card-bg back"
                          style={{ backgroundImage: `url(${backImg})` }}
                        ></div>
                      )}
                      {midImg && (
                        <div
                          className="bento-card-bg mid"
                          style={{ backgroundImage: `url(${midImg})` }}
                        ></div>
                      )}
                      <div
                        className="bento-card-bg front"
                        style={{ backgroundImage: `url(${mainImg})` }}
                      ></div>
                    </div>
                  ) : (
                    <div
                      className="bento-card-bg"
                      style={{ backgroundImage: `url(${mainImg})` }}
                    ></div>
                  )}
                  <div className="bento-info">
                    <h3>{copy.localize(feature.title)}</h3>
                    <p>{copy.localize(feature.desc)}</p>
                  </div>
                </Reveal>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default Features;
