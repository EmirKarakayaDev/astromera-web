import { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { client } from '../lib/sanity';
import { COPY } from '../data/content';

const SiteSettingsContext = createContext();

export const SiteSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Detect language from URL (first segment)
  const pathParts = location.pathname.split('/');
  const language = ['tr', 'en'].includes(pathParts[1]) ? pathParts[1] : 'tr';

  const setLanguage = (newLang) => {
    const currentPath = location.pathname;
    const pathSegments = currentPath.split('/');
    
    // Replace language segment or add it
    if (pathSegments[1] && ['tr', 'en'].includes(pathSegments[1])) {
      pathSegments[1] = newLang;
    } else {
      pathSegments.splice(1, 0, newLang);
    }
    
    navigate(pathSegments.join('/'));
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const query = '*[_type == "siteSettings"][0]';
        const result = await client.fetch(query);
        if (result) {
          setSettings(result);
        }
      } catch (error) {
        console.error('Sanity settings fetch error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const t = (field, fallback = '') => {
    if (!field) return isLoading ? '' : fallback;
    if (typeof field === 'string') return field; // Fallback for any forgotten strings
    return field[language] || field['tr'] || (isLoading ? '' : fallback);
  };

  const copy = {
    header: {
      siteName: t(settings?.siteName, 'AstroMera'),
      menuItems: settings?.menuItems?.map(item => ({
        ...item,
        text: t(item.text, 'Link')
      })) || (isLoading ? [] : [
        { href: '/#features', text: 'Features' },
        { href: '/#testimonials', text: 'Testimonials' },
        { href: '/#how-it-works', text: 'How it works' },
        { href: '/pricing', text: 'Pricing' },
        { href: '/blog', text: 'Blog' },
      ])
    },
    hero: {
      badge: t(settings?.heroBadge, COPY.hero.badge),
      title: t(settings?.heroTitle, COPY.hero.title),
      subtitle: t(settings?.heroSubtitle, COPY.hero.subtitle),
      cta: t(settings?.heroCta, COPY.hero.cta)
    },
    features: {
      title: t(settings?.featuresTitle, COPY.features.title),
      subtitle: t(settings?.featuresSubtitle, COPY.features.subtitle)
    },
    howItWorks: {
      title: t(settings?.hiwTitle, COPY.howItWorks.title),
      subtitle: t(settings?.hiwSubtitle, COPY.howItWorks.subtitle)
    },
    testimonials: {
      title: t(settings?.testimonialsTitle, COPY.testimonials.title)
    },
    journal: {
      title: t(settings?.journalTitle, COPY.journal.title),
      subtitle: t(settings?.journalSubtitle, COPY.journal.subtitle),
      viewAll: t(settings?.journalViewAll, COPY.journal.viewAll),
      cta: t(settings?.journalCta, COPY.journal.cta),
      featuredTag: t(settings?.journalFeaturedTag, COPY.journal.featuredTag)
    },
    pricing: {
      title: t(settings?.pricingTitle, 'Simple, transparent pricing'),
      subtitle: t(settings?.pricingSubtitle, 'Invest in your digital health with plans that fit your lifestyle.')
    },
    faq: {
      title: t(settings?.faqTitle, COPY.faq.title),
      subtitle: t(settings?.faqSubtitle, COPY.faq.subtitle),
      cta: t(settings?.faqCta, COPY.faq.cta)
    },
    contact: {
      title: t(settings?.contactTitle, 'Get in touch'),
      subtitle: t(settings?.contactSubtitle, 'Let us know how we can help you find your balance.'),
      email: settings?.contactEmail || (isLoading ? '' : 'hi@astromera.com'),
      address: t(settings?.contactAddress, 'AstroMera HQ\n123 Celestial Way\nLondon, UK')
    },
    footer: {
      intro: t(settings?.footerIntro, 'Find your calm, one breath at a time.'),
      copyright: t(settings?.footerCopyright, '© 2026 Nukai Labs FZ-LLC'),
      showSupport: settings?.showFooterSupport ?? true,
      showBlog: settings?.showFooterBlog ?? true,
      navTitle: t(settings?.footerNavTitle, 'NAVIGATION'),
      navItems: settings?.footerNavItems?.map(item => ({
        ...item,
        text: t(item.text, 'Link')
      })) || (isLoading ? [] : [
        { href: '/#features', text: 'Features' },
        { href: '/#testimonials', text: 'Testimonials' },
        { href: '/#how-it-works', text: 'How it works' },
        { href: '/pricing', text: 'Pricing' },
      ]),
      supportTitle: t(settings?.footerSupportTitle, 'SUPPORT'),
      blogTitle: t(settings?.footerBlogTitle, 'BLOG'),
      supportItems: settings?.footerSupportItems?.map(item => ({
        ...item,
        text: t(item.text, 'Link')
      })) || (isLoading ? [] : [
        { text: 'FAQ', href: '#faq' },
        { text: 'Contact', href: '/contact' }
      ]),
      blogItems: settings?.footerBlogItems?.map(item => ({
        ...item,
        text: t(item.text, 'Link')
      })) || (isLoading ? [] : [
        { text: 'Blog', href: '/blog' }
      ]),
      legalItems: settings?.footerLegalItems?.map(item => ({
        ...item,
        text: t(item.text, 'Link')
      })) || (isLoading ? [] : [
        { text: 'Privacy Policy', href: '#' },
        { text: 'Cookies', href: '#' },
        { text: 'Terms & Conditions', href: '#' }
      ])
    },
    getStarted: {
      title: t(settings?.ctaTitle, COPY.getStarted.title),
      subtitle: t(settings?.ctaSubtitle, COPY.getStarted.subtitle),
      ctaButtons: settings?.ctaButtons?.map(btn => ({
        ...btn,
        tag: t(btn.tag, ''),
        text: t(btn.text, '')
      })) || (isLoading ? [] : [
        { type: 'apple', tag: COPY.getStarted.appleTag, text: COPY.getStarted.appleName, href: '#' },
        { type: 'google', tag: COPY.getStarted.googleTag, text: COPY.getStarted.googleName, href: '#' }
      ]),
      images: settings?.ctaImages || null
    }
  };

  return (
    <SiteSettingsContext.Provider value={{ ...copy, isLoading, language, setLanguage, localize: t }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
};
