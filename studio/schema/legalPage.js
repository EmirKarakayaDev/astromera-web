import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'legalPage',
  title: 'Legal Sayfaları',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Sayfa Başlığı',
      type: 'localeString',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug (örn: privacy-policy)',
      type: 'slug',
      options: { source: 'title.en', maxLength: 96 },
      validation: Rule => Rule.required(),
      description: 'Sayfanın URL yolu. Örn: "privacy-policy" → /legal/privacy-policy',
    }),
    defineField({
      name: 'subtitle',
      title: 'Alt Başlık / Kısa Açıklama',
      type: 'localeText',
    }),
    defineField({
      name: 'sections',
      title: 'İçerik Bölümleri',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'heading',
              title: 'Bölüm Başlığı',
              type: 'localeString',
            },
            {
              name: 'body',
              title: 'Bölüm İçeriği',
              type: 'localeText',
            },
          ],
          preview: {
            select: { title: 'heading.tr', subtitle: 'heading.en' },
            prepare({ title, subtitle }) {
              return { title: title || subtitle || 'Bölüm' };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title.tr', subtitle: 'slug.current' },
    prepare({ title, subtitle }) {
      return { title: title || 'Legal Sayfa', subtitle: subtitle };
    },
  },
});
