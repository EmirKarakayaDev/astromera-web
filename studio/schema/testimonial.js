import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'testimonial',
  title: 'Kullanıcı Yorumları',
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
      name: 'name',
      title: 'Kullanıcı Adı',
      type: 'string',
    }),
    defineField({
      name: 'text',
      title: 'Yorum Metni',
      type: 'localeText',
    }),
    defineField({
      name: 'mainImage',
      title: 'Kullanıcı Görseli',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'isImage',
      title: 'Kartın Tamamı Görsel mi? (Full Background)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'img',
      title: 'Eski Sistem Görsel ID (Opsiyonel)',
      type: 'string',
    }),
  ],
});
