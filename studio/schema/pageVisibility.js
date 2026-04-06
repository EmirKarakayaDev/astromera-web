import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'pageVisibility',
  title: 'Sayfa & Bölüm Görünürlüğü',
  type: 'document',
  fields: [
    // Pages
    defineField({
      name: 'showBlogPage',
      title: 'Blog Sayfası (/blog)',
      type: 'boolean',
      initialValue: true,
      description: 'Kapalıyken /blog ve /blog/:id sayfaları erişilemez olur.',
      group: 'pages',
    }),
    defineField({
      name: 'showPricingPage',
      title: 'Fiyatlandırma Sayfası (/pricing)',
      type: 'boolean',
      initialValue: true,
      description: 'Kapalıyken /pricing sayfası erişilemez olur.',
      group: 'pages',
    }),

    // Header
    defineField({
      name: 'showBlogNavItem',
      title: 'Blog Linki (Header Menü)',
      type: 'boolean',
      initialValue: true,
      description: 'Kapalıyken navigasyon menüsünden Blog linki kaldırılır.',
      group: 'header',
    }),

    // Home Sections
    defineField({
      name: 'showJournalSection',
      title: 'Blog / Journal Bölümü (Ana Sayfa)',
      type: 'boolean',
      initialValue: true,
      description: 'Kapalıyken ana sayfadaki blog makaleleri bölümü gizlenir.',
      group: 'home',
    }),
  ],
  groups: [
    { name: 'pages', title: 'Sayfalar' },
    { name: 'header', title: 'Header' },
    { name: 'home', title: 'Ana Sayfa Bölümleri' },
  ],
});
