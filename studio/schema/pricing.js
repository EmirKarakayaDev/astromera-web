import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'pricingPlan',
  title: 'Fiyatlandırma Planları',
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
      name: 'title',
      title: 'Plan Başlığı',
      type: 'localeString',
    }),
    defineField({
      name: 'price',
      title: 'Fiyat',
      type: 'localeString',
    }),
    defineField({
      name: 'features',
      title: 'Özellikler',
      type: 'array',
      of: [{ type: 'localeString' }],
    }),
    defineField({
      name: 'cta',
      title: 'Buton Metni',
      type: 'localeString',
    }),
    defineField({
      name: 'highlighted',
      title: 'Öne Çıkarılan Plan mı?',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});
