import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'insight',
  title: 'Raporlar (Insights)',
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
      name: 'isPublished',
      title: 'Yayında',
      type: 'boolean',
      initialValue: true,
      description: 'Kapalıyken bu içerik sitede görünmez.',
    }),
    defineField({
      name: 'icon',
      title: 'İkon Görseli',
      type: 'image',
      description: 'SVG veya PNG ikon.',
    }),
    defineField({
      name: 'cardImage',
      title: 'Kart Görseli',
      type: 'image',
      options: { hotspot: true },
      description: 'Öne çıkan kartlar için geniş görsel.',
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
      name: 'tags',
      title: 'Etiketler',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Kart CTA Metni',
      type: 'localeString',
    }),
    defineField({
      name: 'ctaHref',
      title: 'Kart CTA Linki',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title.tr',
      published: 'isPublished',
      order: 'order',
    },
    prepare({ title, published, order }) {
      return {
        title: `${order ?? '?'}. ${title || 'İsimsiz'}`,
        subtitle: published ? 'Yayında' : 'Gizli',
      };
    },
  },
});
