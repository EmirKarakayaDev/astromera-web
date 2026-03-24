import { useState, useEffect } from 'react';
import Reveal from './Reveal';
import { client, urlFor } from '../lib/sanity';
import { hiwSteps as staticSteps } from '../data/content';
import { useSiteSettings } from '../context/SiteSettingsContext';

const HowItWorks = () => {
  const [data, setData] = useState([]);
  const [hiwActive, setHiwActive] = useState(0);
  const copy = useSiteSettings();
  const hiwCopy = copy.howItWorks;

  useEffect(() => {
    const fetchHiw = async () => {
      try {
        const query = '*[_type == "howItWorks"] | order(order asc)';
        const result = await client.fetch(query);
        if (result && result.length > 0) {
          setData(result);
        } else {
          setData(staticSteps);
        }
      } catch (error) {
        console.error('Sanity fetch error:', error);
        setData(staticSteps);
      }
    };

    fetchHiw();
  }, []);

  return (
    <section id="how-it-works" className="how-it-works">
      <div className="container">
        <div className="hiw-content">
          <Reveal className="hiw-header-part">
            <h2 className="h2-section">{hiwCopy.title}</h2>
            <p className="p-intro">{hiwCopy.subtitle}</p>
          </Reveal>

          <Reveal className="hiw-visuals">
            {data.slice(0, 3).map((item, i) => (
              <div key={i} className={`hiw-phone ${hiwActive === i ? 'phone-active' : ''}`}>
                <div className="hiw-screen-placeholder">
                  <div className="hiw-status-bar"></div>
                  <div 
                    className="hiw-app-content" 
                    style={{ 
                      backgroundImage: item.mainImage ? `url(${urlFor(item.mainImage).url()})` : (item.img ? `url(${item.img})` : 'none'),
                      backgroundSize: 'cover'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal className="hiw-list-part">
            <div className="hiw-list">
              {data.map((item, i) => (
                <div
                  key={i}
                  className={`hiw-item ${hiwActive === i ? 'selected' : ''}`}
                  onClick={() => setHiwActive(i)}
                >
                  <h3>{copy.localize(item.title)}</h3>
                  <p className="grey-text">{copy.localize(item.desc)}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
