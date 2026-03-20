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
      title: 'Yayınlanma Tarihi',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
        calendarTodayLabel: 'Bugün'
      }
    }),
    defineField({
      name: 'readingTime',
      title: 'Okuma Süresi (Dakika)',
      type: 'number',
      initialValue: 5
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
