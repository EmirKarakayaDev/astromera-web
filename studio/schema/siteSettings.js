import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Ayarları (Başlıklar ve Metinler)',
  type: 'document',
  fields: [
    // SEO & Global
    defineField({
      name: 'siteTitle',
      title: 'Site Başlığı (Tarayıcı Sekmesi)',
      type: 'localeString',
      group: 'seo',
      description: 'Örn: "AstroMera — Kişisel Gökyüzü Rehberiniz"',
    }),
    defineField({
      name: 'siteSlogan',
      title: 'Site Sloganı (Başlık sonrası)',
      type: 'localeString',
      group: 'seo',
      description: 'Sayfa başlıklarına eklenir: "Blog — AstroMera". Boşsa site başlığı kullanılır.',
    }),
    defineField({
      name: 'defaultMetaDescription',
      title: 'Varsayılan Meta Açıklaması',
      type: 'localeText',
      group: 'seo',
      description: 'Ana sayfada ve sayfa açıklaması olmayan sayfalarda kullanılır.',
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon (Light Mode)',
      type: 'image',
      group: 'seo',
      description: 'Light mode tarayıcılarda görünen ikon. PNG veya SVG önerilir.',
    }),
    defineField({
      name: 'faviconDark',
      title: 'Favicon (Dark Mode)',
      type: 'image',
      group: 'seo',
      description: 'Dark mode tarayıcılarda görünen ikon (açık renkli versiyon). Yüklenmezse normal favicon kullanılır.',
    }),

    // Header & Global
    defineField({
      name: 'siteName',
      title: 'Site İsmi (Logo)',
      type: 'localeString',
      group: 'header',
    }),
    defineField({
      name: 'menuItems',
      title: 'Navigasyon Menüsü',
      type: 'array',
      group: 'header',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'text', title: 'Buton Yazısı', type: 'localeString' },
            { name: 'href', title: 'Link (örn: /pricing veya /#features)', type: 'string' },
          ],
        },
      ],
    }),
    // Hero Section
    defineField({
      name: 'heroTitle',
      title: 'Ana Başlık (Hero Title)',
      type: 'localeString',
      group: 'hero',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Ana Alt Metin (Hero Subtitle)',
      type: 'localeText',
      group: 'hero',
    }),
    defineField({
      name: 'heroCta',
      title: 'Ana Buton Metni (Hero CTA)',
      type: 'localeString',
      group: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Görseli (Telefon / Uygulama Görseli)',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
      description: 'Boş bırakılırsa varsayılan görsel kullanılır.'
    }),

    // Features / Experience Section
    defineField({
      name: 'featuresTitle',
      title: 'Keşfet Başlığı',
      type: 'localeText',
      group: 'features',
    }),
    defineField({
      name: 'featuresSubtitle',
      title: 'Keşfet Alt Metni',
      type: 'localeText',
      group: 'features',
    }),

    // How It Works Section
    defineField({
      name: 'hiwTitle',
      title: 'Nasıl Çalışır Başlığı',
      type: 'localeString',
      group: 'hiw',
    }),
    defineField({
      name: 'hiwSubtitle',
      title: 'Nasıl Çalışır Alt Metni',
      type: 'localeText',
      group: 'hiw',
    }),

    // Testimonials Section
    defineField({
      name: 'testimonialsTitle',
      title: 'Yorumlar Başlığı',
      type: 'localeString',
      group: 'testimonials',
    }),

    // Journal Section
    defineField({
      name: 'journalTitle',
      title: 'Blog Arşiv Başlığı',
      type: 'localeString',
      group: 'journal',
    }),
    defineField({
      name: 'journalSubtitle',
      title: 'Blog Arşiv Alt Metni',
      type: 'localeText',
      group: 'journal',
    }),
    defineField({
      name: 'journalFeaturedTag',
      title: 'Öne Çıkan Yazı Rozeti',
      type: 'localeString',
      group: 'journal',
    }),
    defineField({
      name: 'journalCta',
      title: 'Öne Çıkan Yazı Buton Yazısı',
      type: 'localeString',
      group: 'journal',
    }),
    defineField({
      name: 'journalViewAll',
      title: 'Tümünü Gör Buton Yazısı',
      type: 'localeString',
      group: 'journal',
    }),
    defineField({
      name: 'blogRelatedArticles',
      title: 'İlgili Yazılar Başlığı',
      type: 'localeString',
      group: 'journal',
      initialValue: { tr: 'İlgili Yazılar', en: 'Related Articles' }
    }),
    defineField({
      name: 'blogRelatedSubtitle',
      title: 'İlgili Yazılar Alt Metni',
      type: 'localeText',
      group: 'journal',
      initialValue: { tr: 'En güncel yazılarımızı keşfedin.', en: 'Discover more from our latest posts.' }
    }),

    // Pricing Section
    defineField({
      name: 'pricingTitle',
      title: 'Fiyatlandırma Başlığı',
      type: 'localeString',
      group: 'pricing',
    }),
    defineField({
      name: 'pricingSubtitle',
      title: 'Fiyatlandırma Alt Metni',
      type: 'localeText',
      group: 'pricing',
    }),

    // FAQ Section
    defineField({
      name: 'faqTitle',
      title: 'SSS Başlığı',
      type: 'localeString',
      group: 'faq',
    }),
    defineField({
      name: 'faqSubtitle',
      title: 'SSS Alt Metni',
      type: 'localeText',
      group: 'faq',
    }),
    defineField({
      name: 'faqCta',
      title: 'SSS Buton Metni',
      type: 'localeString',
      group: 'faq',
    }),

    // Contact Section
    defineField({
      name: 'contactTitle',
      title: 'İletişim Başlığı',
      type: 'localeString',
      group: 'contact',
    }),
    defineField({
      name: 'contactSubtitle',
      title: 'İletişim Alt Metni',
      type: 'localeText',
      group: 'contact',
    }),
    defineField({
      name: 'contactEmail',
      title: 'İletişim E-postası',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'contactAddress',
      title: 'Adres Bilgisi',
      type: 'localeText',
      group: 'contact',
    }),
    defineField({
      name: 'contactNameLabel',
      title: 'Form: İsim Etiketi',
      type: 'localeString',
      group: 'contact',
    }),
    defineField({
      name: 'contactNamePlaceholder',
      title: 'Form: İsim Placeholder',
      type: 'localeString',
      group: 'contact',
    }),
    defineField({
      name: 'contactEmailLabel',
      title: 'Form: E-posta Etiketi',
      type: 'localeString',
      group: 'contact',
    }),
    defineField({
      name: 'contactEmailPlaceholder',
      title: 'Form: E-posta Placeholder',
      type: 'localeString',
      group: 'contact',
    }),
    defineField({
      name: 'contactMessageLabel',
      title: 'Form: Mesaj Etiketi',
      type: 'localeString',
      group: 'contact',
    }),
    defineField({
      name: 'contactMessagePlaceholder',
      title: 'Form: Mesaj Placeholder',
      type: 'localeString',
      group: 'contact',
    }),
    defineField({
      name: 'contactSubmitLabel',
      title: 'Form: Gönder Butonu',
      type: 'localeString',
      group: 'contact',
    }),

    // Footer / GET STARTED Section
    defineField({
      name: 'socialInstagram',
      title: 'Instagram URL',
      type: 'url',
      group: 'footer',
    }),
    defineField({
      name: 'socialTiktok',
      title: 'TikTok URL',
      type: 'url',
      group: 'footer',
    }),
    defineField({
      name: 'socialFacebook',
      title: 'Facebook URL',
      type: 'url',
      group: 'footer',
    }),
    defineField({
      name: 'socialLinkedin',
      title: 'LinkedIn URL',
      type: 'url',
      group: 'footer',
    }),
    defineField({
      name: 'footerIntro',
      title: 'Footer Tanıtım Yazısı',
      type: 'localeText',
      group: 'footer',
    }),
    defineField({
      name: 'footerCopyright',
      title: 'Copyright Metni',
      type: 'localeString',
      group: 'footer',
    }),
    defineField({
      name: 'showFooterSupport',
      title: 'Destek Bölümünü Göster',
      type: 'boolean',
      group: 'footer',
      initialValue: true,
    }),
    defineField({
      name: 'showFooterBlog',
      title: 'Blog Bölümünü Göster',
      type: 'boolean',
      group: 'footer',
      initialValue: true,
    }),
    defineField({
      name: 'footerNavTitle',
      title: 'Navigation Kolon Başlığı',
      type: 'localeString',
      group: 'footer',
    }),
    defineField({
      name: 'footerNavItems',
      title: 'Navigation Kolon Linkleri',
      type: 'array',
      group: 'footer',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'text', title: 'Buton Yazısı', type: 'localeString' },
            { name: 'href', title: 'Link (örn: /#features)', type: 'string' },
          ],
        },
      ],
      initialValue: [
        { href: '/#features', text: 'Features' },
        { href: '/#testimonials', text: 'Testimonials' },
        { href: '/#how-it-works', text: 'How it works' },
        { href: '/pricing', text: 'Pricing' },
      ]
    }),
    defineField({
      name: 'footerSupportTitle',
      title: 'Support Kolon Başlığı',
      type: 'localeString',
      group: 'footer',
    }),
    defineField({
      name: 'footerBlogTitle',
      title: 'Blog Kolon Başlığı',
      type: 'localeString',
      group: 'footer',
    }),
    defineField({
      name: 'footerSupportItems',
      title: 'Destek Linkleri',
      type: 'array',
      group: 'footer',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'text', title: 'Buton Yazısı', type: 'localeString' },
            { name: 'href', title: 'Link (örn: /contact veya #faq)', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'footerBlogItems',
      title: 'Blog Linkleri',
      type: 'array',
      group: 'footer',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'text', title: 'Buton Yazısı', type: 'localeString' },
            { name: 'href', title: 'Link (örn: /blog)', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'footerLegalItems',
      title: 'Yasal Linkler (Privacy, Cookies vb.)',
      type: 'array',
      group: 'footer',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'text', title: 'Buton Yazısı', type: 'localeString' },
            { name: 'href', title: 'Link (örn: /privacy)', type: 'string' },
          ],
        },
      ],
      initialValue: [
        { text: 'Privacy Policy', href: '/legal/privacy-policy' },
        { text: 'Cookies', href: '/legal/cookies' },
        { text: 'Terms & Conditions', href: '/legal/terms-and-conditions' },
      ],
    }),
    defineField({
      name: 'ctaTitle',
      title: 'Hemen Başlayın Başlığı',
      type: 'localeString',
      group: 'cta',
    }),
    defineField({
      name: 'ctaSubtitle',
      title: 'Hemen Başlayın Alt Metni',
      type: 'localeText',
      group: 'cta',
    }),
    defineField({
      name: 'ctaImages',
      title: 'Polaroid Görselleri (Max 3)',
      type: 'array',
      group: 'cta',
      of: [{ type: 'image' }],
      validation: Rule => Rule.max(3),
    }),
    defineField({
      name: 'ctaButtons',
      title: 'Butonlar / Mağaza Linkleri',
      type: 'array',
      group: 'cta',
      of: [
        {
          type: 'object',
          fields: [
            { 
              name: 'type', 
              title: 'Buton Tipi', 
              type: 'string',
              options: {
                list: [
                  { title: 'Apple App Store', value: 'apple' },
                  { title: 'Google Play Store', value: 'google' },
                  { title: 'Normal Buton', value: 'default' },
                ],
              },
              initialValue: 'default',
            },
            { name: 'tag', title: 'Üst Küçük Yazı (örn: Download on)', type: 'localeString' },
            { name: 'text', title: 'Buton Ana Yazısı (örn: App Store)', type: 'localeString' },
            { name: 'href', title: 'Link (URL)', type: 'string' },
          ],
        },
      ],
    }),
  ],
  groups: [
    { name: 'seo', title: 'SEO & Favicon' },
    { name: 'header', title: 'Header / Global' },
    { name: 'hero', title: 'Hero' },
    { name: 'features', title: 'Keşfet (Experience)' },
    { name: 'hiw', title: 'Nasıl Çalışır' },
    { name: 'testimonials', title: 'Yorumlar' },
    { name: 'journal', title: 'Blog' },
    { name: 'pricing', title: 'Fiyatlandırma' },
    { name: 'faq', title: 'SSS' },
    { name: 'contact', title: 'İletişim' },
    { name: 'footer', title: 'Alt Kısım' },
    { name: 'cta', title: 'CTA (Hemen Başlayın)' },
  ],
  preview: {
    prepare() {
      return { title: 'Site Ayarları' };
    },
  },
});
