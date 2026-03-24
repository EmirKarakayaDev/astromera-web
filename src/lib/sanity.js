import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'hkxp5ggh',
  dataset: 'production',
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: '2023-05-03',
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

/**
 * Sanity imajını güvenli bir şekilde çeker, yoksa fallback döndürür.
 * @param {object} source - Sanity imaj objesi
 * @param {string} fallback - Varsayılan imaj URL'si
 */
export function getImgUrl(source, fallback = "") {
  if (!source) return fallback;
  try {
    return urlFor(source).url();
  } catch (error) {
    console.warn("Sanity imaj oluşturma hatası:", error);
    return fallback;
  }
}
