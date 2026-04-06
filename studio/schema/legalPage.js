import { defineType, defineField } from 'sanity';

const localePT = (name, title, group) =>
  defineField({
    name,
    title,
    type: 'object',
    group,
    fields: [
      {
        name: 'tr',
        title: 'Türkçe',
        type: 'array',
        of: [{ type: 'block' }],
      },
      {
        name: 'en',
        title: 'English',
        type: 'array',
        of: [{ type: 'block' }],
      },
    ],
  });

export default defineType({
  name: 'legalPage',
  title: 'Legal Sayfaları',
  type: 'document',
  groups: [
    { name: 'meta', title: 'Sayfa Bilgisi' },
    { name: 'content', title: 'İçerik' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Sayfa Başlığı',
      type: 'localeString',
      group: 'meta',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug (örn: privacy-policy)',
      type: 'slug',
      group: 'meta',
      options: { source: 'title.en', maxLength: 96 },
      validation: Rule => Rule.required(),
      description: 'Sayfa URL yolu. Örn: "privacy-policy" → /legal/privacy-policy',
    }),
    localePT('intro', 'Giriş Metni (Başlıklar Öncesi)', 'content'),
    defineField({
      name: 'sections',
      title: 'İçerik Bölümleri',
      type: 'array',
      group: 'content',
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
              type: 'object',
              fields: [
                {
                  name: 'tr',
                  title: 'Türkçe',
                  type: 'array',
                  of: [{ type: 'block' }],
                },
                {
                  name: 'en',
                  title: 'English',
                  type: 'array',
                  of: [{ type: 'block' }],
                },
              ],
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
