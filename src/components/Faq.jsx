import { useState, useEffect } from 'react';
import Reveal from './Reveal';
import SectionHeader from './common/SectionHeader';
import Button from './common/Button';
import { client } from '../lib/sanity';
import { faqs as staticFaqs } from '../data/content';
import { useSiteSettings } from '../hooks/useSiteSettings';

const Faq = () => {
  const [faqs, setFaqs] = useState([]);
  const [openFaqs, setOpenFaqs] = useState([]);
  const copy = useSiteSettings();
  const faqCopy = copy.faq;

  useEffect(() => {
    // Fetch FAQs from Sanity
    const fetchFaqs = async () => {
      try {
        const query = '*[_type == "faq"] | order(order asc)';
        const result = await client.fetch(query);
        if (result && result.length > 0) {
          setFaqs(result);
        } else {
          setFaqs(staticFaqs);
        }
      } catch (error) {
        console.error('Sanity fetch error:', error);
        setFaqs(staticFaqs);
      }
    };

    fetchFaqs();
  }, []);

  const toggleFaq = (index) => {
    if (openFaqs.includes(index)) {
      setOpenFaqs(openFaqs.filter(i => i !== index));
    } else {
      setOpenFaqs([...openFaqs, index]);
    }
  };

  return (
    <section id="faq">
      <div className="container">
        <SectionHeader 
          title={faqCopy.title}
          subtitle={faqCopy.subtitle}
        />

        <div className="faq-list">
          {faqs.map((faq, i) => (
            <Reveal key={i}>
              <div className={`faq-item ${openFaqs.includes(i) ? 'open' : ''}`} onClick={() => toggleFaq(i)}>
                <div className="faq-question">
                  <span>{copy.localize(faq.q)}</span>
                  <div className="faq-icon">{openFaqs.includes(i) ? '−' : '+'}</div>
                </div>
                <div className="faq-answer-wrapper">
                  <div className="faq-answer">{copy.localize(faq.a)}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center faq-btn-wrapper">
          <Button to="/contact">{faqCopy.cta}</Button>
        </Reveal>
      </div>
    </section>
  );
};

export default Faq;
