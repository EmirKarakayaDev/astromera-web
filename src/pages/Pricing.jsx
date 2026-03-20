import { useState, useEffect } from 'react';
import SectionHeader from '../components/common/SectionHeader';
import Button from '../components/common/Button';
import Reveal from '../components/Reveal';
import '../styles/pricing.css';
import usePageMeta from '../hooks/usePageMeta';
import { client } from '../lib/sanity';
import { useSiteSettings } from '../hooks/useSiteSettings';

const Pricing = () => {
  const copy = useSiteSettings();
  const pricingCopy = copy.pricing;
  usePageMeta(pricingCopy.title, pricingCopy.subtitle);
  
  const [plans, setPlans] = useState([
    { title: "Free", price: "$0", features: ["Limited library", "Basic tracking", "Community access"], cta: "Get Started" },
    { title: "Premium", price: "$9.99/mo", features: ["Full library", "Offline access", "Advanced programs", "Personalized coaching"], cta: "Try for free", highlighted: true },
    { title: "Lifetime", price: "$199", features: ["All premium features", "One-time payment", "Priority support", "Exclusive content"], cta: "One payment" }
  ]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const query = '*[_type == "pricingPlan"] | order(order asc)';
        const result = await client.fetch(query);
        if (result && result.length > 0) {
          setPlans(result);
        }
      } catch (error) {
        console.error('Sanity fetch error:', error);
      }
    };
    fetchPlans();
  }, []);

  return (
    <div className="pricing-page">
      <div className="container" style={{ textAlign: 'center' }}>
        <Reveal className="pricing-header">
          <SectionHeader 
            title={pricingCopy.title}
            subtitle={pricingCopy.subtitle}
          />
        </Reveal>
        
        <div className="pricing-grid">
          {plans.map((plan, i) => (
            <Reveal key={plan._id || i} delay={i * 0.1} className={`pricing-card ${plan.highlighted ? 'highlighted' : ''}`}>
              <h3 className="pricing-tag">{copy.localize(plan.title)}</h3>
              <div className="pricing-price">{copy.localize(plan.price)}</div>
              
              <ul className="pricing-features-list">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="pricing-feature-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    {copy.localize(feature)}
                  </li>
                ))}
              </ul>
              
              <Button style={{ width: '100%', marginTop: '32px' }} variant={plan.highlighted ? "white" : "maroon"}>
                {copy.localize(plan.cta)}
              </Button>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
