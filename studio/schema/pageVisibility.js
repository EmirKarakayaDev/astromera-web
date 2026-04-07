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
    defineField({
      name: 'showContactPage',
      title: 'İletişim Sayfası (/contact)',
      type: 'boolean',
      initialValue: true,
      description: 'Kapalıyken /contact sayfası erişilemez olur.',
      group: 'pages',
    }),
    defineField({
      name: 'showLegalPages',
      title: 'Legal Sayfalar (/legal/*)',
      type: 'boolean',
      initialValue: true,
      description: 'Kapalıyken tüm /legal/* sayfaları erişilemez olur.',
      group: 'pages',
    }),

    // Header
    defineField({
      name: 'showFeaturesNavItem',
      title: 'Keşfet Linki (Header Menü)',
      type: 'boolean',
      initialValue: true,
      group: 'header',
    }),
    defineField({
      name: 'showTestimonialsNavItem',
      title: 'Testimonials Linki (Header Menü)',
      type: 'boolean',
      initialValue: true,
      group: 'header',
    }),
    defineField({
      name: 'showInsightsNavItem',
      title: 'Raporlar Linki (Header Menü)',
      type: 'boolean',
      initialValue: true,
      group: 'header',
    }),
    defineField({
      name: 'showAboutNavItem',
      title: 'Hakkında Linki (Header Menü)',
      type: 'boolean',
      initialValue: true,
      group: 'header',
    }),
    defineField({
      name: 'showHowItWorksNavItem',
      title: 'How It Works Linki (Header Menü)',
      type: 'boolean',
      initialValue: true,
      group: 'header',
    }),
    defineField({
      name: 'showPricingNavItem',
      title: 'Pricing Linki (Header Menü)',
      type: 'boolean',
      initialValue: true,
      group: 'header',
    }),
    defineField({
      name: 'showBlogNavItem',
      title: 'Blog Linki (Header Menü)',
      type: 'boolean',
      initialValue: true,
      description: 'Kapalıyken navigasyon menüsünden Blog linki kaldırılır.',
      group: 'header',
    }),
    defineField({
      name: 'showDownloadButton',
      title: 'Download Butonu (Header Sağ)',
      type: 'boolean',
      initialValue: true,
      group: 'header',
    }),

    // Home Sections
    defineField({
      name: 'showInsightsSection',
      title: 'Raporlar (Insights)',
      type: 'boolean',
      initialValue: true,
      group: 'home',
    }),
    defineField({
      name: 'showHeroSection',
      title: 'Hero (Ana Banner)',
      type: 'boolean',
      initialValue: true,
      group: 'home',
    }),
    defineField({
      name: 'showTaglineSection',
      title: 'Tagline Bölümü (Hero Altı)',
      type: 'boolean',
      initialValue: true,
      group: 'home',
    }),
    defineField({
      name: 'showFeaturesSection',
      title: 'Keşfet (Experience)',
      type: 'boolean',
      initialValue: true,
      group: 'home',
    }),
    defineField({
      name: 'showTestimonialsSection',
      title: 'Kullanıcı Yorumları',
      type: 'boolean',
      initialValue: true,
      group: 'home',
    }),
    defineField({
      name: 'showHowItWorksSection',
      title: 'Nasıl Çalışır',
      type: 'boolean',
      initialValue: true,
      group: 'home',
    }),
    defineField({
      name: 'showJournalSection',
      title: 'Blog / Journal',
      type: 'boolean',
      initialValue: true,
      group: 'home',
    }),
    defineField({
      name: 'showFaqSection',
      title: 'SSS (Sıkça Sorulan Sorular)',
      type: 'boolean',
      initialValue: true,
      group: 'home',
    }),
    defineField({
      name: 'showContactSection',
      title: 'İletişim Formu (Ana Sayfa)',
      type: 'boolean',
      initialValue: true,
      group: 'home',
    }),
    defineField({
      name: 'showGetStartedSection',
      title: 'CTA (Hemen Başlayın)',
      type: 'boolean',
      initialValue: true,
      group: 'home',
    }),
  ],
  groups: [
    { name: 'pages', title: 'Sayfalar' },
    { name: 'header', title: 'Header' },
    { name: 'home', title: 'Ana Sayfa Bölümleri' },
  ],
  preview: {
    prepare() {
      return { title: 'Görünürlük Ayarları' };
    },
  },
});
