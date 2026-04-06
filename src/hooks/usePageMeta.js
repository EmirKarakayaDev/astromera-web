import { useEffect } from 'react';
import { useSiteSettings } from '../context/SiteSettingsContext';

const usePageMeta = (title, description) => {
  const { seo } = useSiteSettings();

  useEffect(() => {
    const siteName = seo?.siteSlogan || 'AstroMera';
    const fullTitle = seo?.siteTitle || 'AstroMera — Kişisel Gökyüzü Rehberiniz';
    const desc = description || seo?.defaultMetaDescription || '';

    document.title = title ? `${title} — ${siteName}` : fullTitle;

    // Meta description
    if (desc) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', desc);
    }

    // OG title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title ? `${title} — ${siteName}` : fullTitle);

    // OG description
    if (desc) {
      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (!ogDesc) {
        ogDesc = document.createElement('meta');
        ogDesc.setAttribute('property', 'og:description');
        document.head.appendChild(ogDesc);
      }
      ogDesc.setAttribute('content', desc);
    }

    return () => {
      document.title = fullTitle;
    };
  }, [title, description, seo]);
};

export default usePageMeta;
