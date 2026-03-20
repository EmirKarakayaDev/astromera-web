import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'blog',
  title: 'Blog Arşiv',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Başlık',
      type: 'localeString',
    }),
    defineField({
      name: 'id',
      title: 'Sayısal ID (Opsiyonel)',
      type: 'number',
    }),
    defineField({
      name: 'date',
      title: 'Tarih',
      type: 'string',
      initialValue: 'Mar 1, 2025',
    }),
    defineField({
      name: 'readTime',
      title: 'Okuma Süresi',
      type: 'localeString',
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
      name: 'body',
      title: 'İçerik (Paragraflar)',
      type: 'array',
      of: [{ type: 'localeText' }],
    }),
  ],
});
