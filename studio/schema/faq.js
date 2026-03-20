import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'faq',
  title: 'SSS (Sıkça Sorulan Sorular)',
  type: 'document',
  orderings: [
    {
      title: 'Sıralama No',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ],
  fields: [
    defineField({
      name: 'order',
      title: 'Sıralama No',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'q',
      title: 'Soru',
      type: 'localeString',
    }),
    defineField({
      name: 'a',
      title: 'Cevap',
      type: 'localeText',
    }),
  ],
});
