import { useEffect } from 'react';

/**
 * Her sayfaya özgün <title> ve <meta description> atar.
 * Harici kütüphane gerektirmez.
 *
 * @param {string} title    - Tarayıcı sekmesinde & arama sonuçlarında görünen başlık
 * @param {string} [description] - Meta description (arama motoru snippet'i)
 */
const usePageMeta = (title, description) => {
  useEffect(() => {
    const BASE = 'Bloom';
    document.title = title ? `${title} — ${BASE}` : `${BASE} — Silence the noise, Find Your Peace`;

    // Meta description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }

    // OG title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title ? `${title} — Bloom` : 'Bloom — Silence the noise, Find Your Peace');

    // OG description
    if (description) {
      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (!ogDesc) {
        ogDesc = document.createElement('meta');
        ogDesc.setAttribute('property', 'og:description');
        document.head.appendChild(ogDesc);
      }
      ogDesc.setAttribute('content', description);
    }

    // Cleanup: sayfadan ayrılınca varsayılana dön
    return () => {
      document.title = 'Bloom — Silence the noise, Find Your Peace';
    };
  }, [title, description]);
};

export default usePageMeta;
