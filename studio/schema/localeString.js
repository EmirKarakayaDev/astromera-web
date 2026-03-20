import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'localeString',
  title: 'Yerelleştirilmiş Metin (Locale String)',
  type: 'object',
  fields: [
    defineField({
      name: 'tr',
      title: 'Türkçe',
      type: 'string',
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'string',
    }),
  ],
});
