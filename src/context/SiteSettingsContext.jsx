import { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { client, urlFor } from '../lib/sanity';
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

  const [visibility, setVisibility] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const [siteResult, visibilityResult] = await Promise.all([
          client.fetch('*[_type == "siteSettings"][0]'),
          client.fetch('*[_type == "pageVisibility"][0]'),
        ]);
        if (siteResult) setSettings(siteResult);
        if (visibilityResult) setVisibility(visibilityResult);
      } catch (error) {
        console.error('Sanity settings fetch error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const t = (field, fallback = '') => {
    if (!field) return fallback;
    if (typeof field === 'string') return field;
    return field[language] || field['tr'] || fallback;
  };

  const showBlogNavItem = visibility?.showBlogNavItem ?? true;
  const showFeaturesNavItem = visibility?.showFeaturesNavItem ?? true;
  const showTestimonialsNavItem = visibility?.showTestimonialsNavItem ?? true;
  const showHowItWorksNavItem = visibility?.showHowItWorksNavItem ?? true;
  const showPricingNavItem = visibility?.showPricingNavItem ?? true;
  const showDownloadButton = visibility?.showDownloadButton ?? true;
  const showContactPage = visibility?.showContactPage ?? true;
  const showLegalPages = visibility?.showLegalPages ?? true;

  const copy = {
    seo: {
      siteTitle: t(settings?.siteTitle, 'AstroMera — Kişisel Gökyüzü Rehberiniz'),
      siteSlogan: t(settings?.siteSlogan, 'AstroMera'),
      defaultMetaDescription: t(settings?.defaultMetaDescription, ''),
      favicon: settings?.favicon ? urlFor(settings.favicon).url() : null,
      faviconDark: settings?.faviconDark ? urlFor(settings.faviconDark).url() : null,
    },
    header: {
      siteName: t(settings?.siteName, 'AstroMera'),
      menuItems: (settings?.menuItems?.map(item => ({
        ...item,
        text: t(item.text, 'Link')
      })) || (isLoading ? [] : [
        { href: '/#features', text: 'Features' },
        { href: '/#testimonials', text: 'Testimonials' },
        { href: '/#how-it-works', text: 'How it works' },
        { href: '/pricing', text: 'Pricing' },
        { href: '/blog', text: 'Blog' },
      ])).filter(item => {
        if (!showBlogNavItem && (item.href === '/blog' || item.href?.startsWith('/blog'))) return false;
        if (!showPricingNavItem && item.href === '/pricing') return false;
        if (!showFeaturesNavItem && item.href === '/#features') return false;
        if (!showTestimonialsNavItem && item.href === '/#testimonials') return false;
        if (!showHowItWorksNavItem && (item.href === '/#how-it-works' || item.href === '#how-it-works')) return false;
        return true;
      })
    },
    hero: {
      badge: t(settings?.heroBadge, COPY.hero.badge),
      title: t(settings?.heroTitle, COPY.hero.title),
      subtitle: t(settings?.heroSubtitle, COPY.hero.subtitle),
      cta: t(settings?.heroCta, COPY.hero.cta),
      image: settings?.heroImage ? urlFor(settings.heroImage).url() : null
    },
    features: {
      title: t(settings?.featuresSubtitle, COPY.features.title),
      topDesc: t(settings?.featuresTopDesc, COPY.features.subtitle),
      bottomDesc: t(settings?.featuresBottomDesc, ''),
    },
    insights: {
      title: t(settings?.insightsTitle, ''),
      subtitle: t(settings?.insightsSubtitle, ''),
      bottomDesc: t(settings?.insightsBottomDesc, ''),
      image: settings?.insightsImage ? urlFor(settings.insightsImage).url() : null,
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
      featuredTag: t(settings?.journalFeaturedTag, COPY.journal.featuredTag),
      relatedArticles: t(settings?.blogRelatedArticles, 'Related Articles'),
      relatedSubtitle: t(settings?.blogRelatedSubtitle, 'Discover more from our latest posts.')
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
      address: t(settings?.contactAddress, 'AstroMera HQ\n123 Celestial Way\nLondon, UK'),
      nameLabel: t(settings?.contactNameLabel, language === 'tr' ? 'İsim' : 'Name'),
      namePlaceholder: t(settings?.contactNamePlaceholder, language === 'tr' ? 'Adınız Soyadınız' : 'Jane Smith'),
      emailLabel: t(settings?.contactEmailLabel, language === 'tr' ? 'E-posta' : 'Email'),
      emailPlaceholder: t(settings?.contactEmailPlaceholder, language === 'tr' ? 'ornek@email.com' : 'hello@example.com'),
      messageLabel: t(settings?.contactMessageLabel, language === 'tr' ? 'Mesaj' : 'Message'),
      messagePlaceholder: t(settings?.contactMessagePlaceholder, language === 'tr' ? 'Size nasıl yardımcı olabiliriz...' : 'Tell us how we can help...'),
      submitLabel: t(settings?.contactSubmitLabel, language === 'tr' ? 'Gönder' : 'Submit'),
    },
    footer: {
      socialInstagram: settings?.socialInstagram || null,
      socialTiktok: settings?.socialTiktok || null,
      socialFacebook: settings?.socialFacebook || null,
      socialLinkedin: settings?.socialLinkedin || null,
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
        { text: 'Privacy Policy', href: '/legal/privacy-policy' },
        { text: 'Cookies', href: '/legal/cookies' },
        { text: 'Terms & Conditions', href: '/legal/terms-and-conditions' }
      ])
    },
    visibility: {
      showBlogPage: visibility?.showBlogPage ?? true,
      showBlogNavItem,
      showFeaturesNavItem,
      showTestimonialsNavItem,
      showHowItWorksNavItem,
      showPricingNavItem,
      showDownloadButton,
      showContactPage,
      showLegalPages,
      showInsightsSection: visibility?.showInsightsSection ?? true,
      showPricingPage: visibility?.showPricingPage ?? true,
      showHeroSection: visibility?.showHeroSection ?? true,
      showFeaturesSection: visibility?.showFeaturesSection ?? true,
      showTestimonialsSection: visibility?.showTestimonialsSection ?? true,
      showHowItWorksSection: visibility?.showHowItWorksSection ?? true,
      showJournalSection: visibility?.showJournalSection ?? true,
      showFaqSection: visibility?.showFaqSection ?? true,
      showGetStartedSection: visibility?.showGetStartedSection ?? true,
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
