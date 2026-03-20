import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'howItWorks',
  title: 'Nasıl Çalışır (How It Works)',
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
      title: 'Adım Oranı / Sıralama',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'title',
      title: 'Adım Başlığı',
      type: 'localeString',
    }),
    defineField({
      name: 'desc',
      title: 'Açıklama',
      type: 'localeText',
    }),
    defineField({
      name: 'mainImage',
      title: 'Adım Görseli (Telefon ekranı için)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
});
