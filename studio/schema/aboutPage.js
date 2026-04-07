import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'aboutPage',
  title: 'Hakkında Sayfası',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Sayfa Başlığı',
      type: 'localeString',
    }),
    defineField({
      name: 'subtitle',
      title: 'Alt Başlık',
      type: 'localeString',
    }),
    defineField({
      name: 'body',
      title: 'İçerik',
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
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Hakkında Sayfası' };
    },
  },
});
