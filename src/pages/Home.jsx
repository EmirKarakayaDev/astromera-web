import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import HowItWorks from '../components/HowItWorks';
import Journal from '../components/Journal';
import Faq from '../components/Faq';
import GetStarted from '../components/GetStarted';
import fallbackHeroImage from '../assets/Asset-1.svg';
import usePageMeta from '../hooks/usePageMeta';
import { useSiteSettings } from '../context/SiteSettingsContext';

const Home = () => {
  usePageMeta(null, 'Short, simple meditations to help you reset, unwind, and feel present — whenever you need a break.');
  const { hash } = useLocation();
  const { hero, visibility } = useSiteSettings();

  // Sanity'den görsel geldiyse onu kullan, yoksa local SVG fallback
  const heroImage = hero?.image || fallbackHeroImage;

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [hash]);

  return (
    <>
      <Hero heroHandPhone={heroImage} />
      <Features />
      <Testimonials />
      <HowItWorks />
      {visibility.showJournalSection && <Journal />}
      <Faq />
      <GetStarted />
    </>
  );
};

export default Home;
