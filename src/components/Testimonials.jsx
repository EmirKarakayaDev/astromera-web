import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Reveal from './Reveal';
import { client, urlFor } from '../lib/sanity';

import { useSiteSettings } from '../context/SiteSettingsContext';

const Testimonials = () => {
  const [data, setData] = useState([]);
  const [swiper, setSwiper] = useState(null);
  const [realIndex, setRealIndex] = useState(0);
  const copy = useSiteSettings();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const query = '*[_type == "testimonial"] | order(order asc)';
        const result = await client.fetch(query);
        if (result && result.length > 0) {
          setData(result);
        }
      } catch (error) {
        console.error('Sanity fetch error:', error);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section id="testimonials">
      <div className="container">
        <Reveal className="testimonials-header">
          <h2 className="h2-section">{copy.testimonials.title}</h2>
        </Reveal>

        <div className="slider-container">
          <div className="slider-nav">
            <button className="nav-btn" onClick={() => swiper?.slidePrev()} aria-label="Önceki">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button className="nav-btn" onClick={() => swiper?.slideNext()} aria-label="Sonraki">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <Reveal className="testimonials-slider">
            {data.length === 0 ? (
              <div className="skeleton-testimonials">
                <div className="testimonial-card skeleton" style={{ minHeight: '300px', width: '350px' }}></div>
                <div className="testimonial-card skeleton" style={{ minHeight: '300px', width: '350px' }}></div>
                <div className="testimonial-card skeleton" style={{ minHeight: '300px', width: '350px' }}></div>
              </div>
            ) : (
              <Swiper
                key={data.length} // Veri geldiğinde slider'ı sıfırdan başlat
                modules={[Navigation, Pagination]}
                onSwiper={setSwiper}
                onSlideChange={(s) => setRealIndex(s.realIndex)}
                loop={data.length > 2}
                initialSlide={0} // İlk slayttan başla
                centeredSlides={true}
                spaceBetween={16}
                slidesPerView={'auto'}
                breakpoints={{
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 24,
                    centeredSlides: false
                  },
                  1100: {
                    slidesPerView: 3,
                    spaceBetween: 32,
                    centeredSlides: true
                  }
                }}
                className="testimonials-swiper"
              >
                {data.map((item, i) => {
                  const imageUrl = item.mainImage
                    ? item.isImage
                      ? urlFor(item.mainImage).width(700).height(900).fit('crop').url()
                      : urlFor(item.mainImage).width(96).height(96).fit('crop').url()
                    : `https://i.pravatar.cc/150?u=${item.name}`;
                  
                  return (
                    <SwiperSlide key={item._id || i}>
                      <div className={`testimonial-card ${item.isImage ? 'image-card' : ''}`}>
                        {item.isImage ? (
                          <>
                            <div className="testimonial-image-inner">
                              <p className="testimonial-image-quote">"{copy.localize(item.text)}"</p>
                              <div className="user-info">{item.name}</div>
                            </div>
                            <div
                              className="testimonial-image-overlay"
                              style={{ backgroundImage: `url(${imageUrl})` }}
                            ></div>
                          </>
                        ) : (
                          <>
                            <div className="user-img" style={{ backgroundImage: `url(${imageUrl})` }}></div>
                            <p>"{copy.localize(item.text)}"</p>
                            <div className="user-info">{item.name}</div>
                          </>
                        )}
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            )}
          </Reveal>
        </div>

        <Reveal className="slider-controls">
          <div className="slider-dots">
            {data.map((_, idx) => (
              <span
                key={idx}
                className={`dot ${realIndex === idx ? 'active' : ''}`}
                onClick={() => swiper?.slideToLoop(idx)}
              ></span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Testimonials;
