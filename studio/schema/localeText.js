import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'localeText',
  title: 'Yerelleştirilmiş Uzun Metin (Locale Text)',
  type: 'object',
  fields: [
    defineField({
      name: 'tr',
      title: 'Türkçe',
      type: 'text',
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'text',
    }),
  ],
});
