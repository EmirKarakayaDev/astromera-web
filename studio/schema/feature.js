import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'feature',
  title: 'Keşfet (Experience)',
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
      name: 'gridSpan',
      title: 'Grid Genişliği (Bento Span)',
      type: 'string',
      description: 'Kartın ne kadar yer kaplayacağını belileyin (Örn: span 4, span 5, span 6)',
      options: {
        list: [
          { title: 'Yarım (Span 5)', value: 'span-5' },
          { title: 'Küçük Orta (Span 4)', value: 'span-4' },
          { title: 'Büyük Orta (Span 6)', value: 'span-6' },
          { title: 'Tam Genişlik (Span 10)', value: 'span-10' },
        ],
      },
      initialValue: 'span-5',
    }),
    defineField({
      name: 'title',
      title: 'Başlık',
      type: 'localeString',
    }),
    defineField({
      name: 'desc',
      title: 'Açıklama',
      type: 'localeText',
    }),
    defineField({
      name: 'mainImage',
      title: 'Ana Görsel',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'imgMid',
      title: 'Orta Katman Görsel (Opsiyonel)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'imgBack',
      title: 'Arka Katman Görsel (Opsiyonel)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'customLayout',
      title: 'Özel Yerleşim Tipi',
      type: 'string',
      options: {
        list: [
          { title: 'Normal', value: 'normal' },
          { title: 'Location Stack', value: 'location-stack' },
          { title: 'Stack', value: 'stack' },
          { title: 'Contained', value: 'contained' },
        ],
      },
      initialValue: 'normal',
    }),
  ],
});
