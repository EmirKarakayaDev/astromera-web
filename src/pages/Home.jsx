import React, { useEffect, Suspense, lazy } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Features from '../components/Features';

const Testimonials = lazy(() => import('../components/Testimonials'));
const HowItWorks = lazy(() => import('../components/HowItWorks'));
const Journal = lazy(() => import('../components/Journal'));
const Faq = lazy(() => import('../components/Faq'));
const GetStarted = lazy(() => import('../components/GetStarted'));

import fallbackHeroImage from '../assets/Asset-1.svg';
import usePageMeta from '../hooks/usePageMeta';
import { useSiteSettings } from '../context/SiteSettingsContext';

const Home = () => {
  usePageMeta(null, 'Short, simple meditations to help you reset, unwind, and feel present — whenever you need a break.');
  const { hash } = useLocation();
  const { hero } = useSiteSettings();

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
      <Suspense fallback={<div style={{ height: '30vh' }} />}>
        <Testimonials />
        <HowItWorks />
        <Journal />
        <Faq />
        <GetStarted />
      </Suspense>
    </>
  );
};

export default Home;
