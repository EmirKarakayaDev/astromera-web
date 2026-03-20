import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import HowItWorks from '../components/HowItWorks';
import Journal from '../components/Journal';
import Faq from '../components/Faq';
import GetStarted from '../components/GetStarted';
import heroHandPhone from '../assets/hero_hand_phone.avif';
import usePageMeta from '../hooks/usePageMeta';

const Home = () => {
  usePageMeta(null, 'Short, simple meditations to help you reset, unwind, and feel present — whenever you need a break.');
  const { hash } = useLocation();

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
      <Hero heroHandPhone={heroHandPhone} />
      <Features />
      <Testimonials />
      <HowItWorks />
      <Journal />
      <Faq />
      <GetStarted />
    </>
  );
};

export default Home;
