import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'featuredReport',
  title: 'Öne Çıkan Rapor Kartı',
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
    }),
    defineField({
      name: 'cardImage',
      title: 'Kart Görseli',
      type: 'image',
      options: { hotspot: true },
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
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Metni',
      type: 'localeString',
    }),
    defineField({
      name: 'ctaHref',
      title: 'CTA Linki',
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
        title: `${order ?? '?'} • ${title || 'İsimsiz'}`,
        subtitle: published ? 'Yayında' : 'Gizli',
      };
    },
  },
});
