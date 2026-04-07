import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'aboutPage',
  title: 'Hakkında Sayfası',
  type: 'document',
  groups: [
    { name: 'intro', title: 'Giriş' },
    { name: 'values', title: 'Değerler' },
    { name: 'team', title: 'Ekip' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Sayfa Başlığı',
      type: 'localeString',
      group: 'intro',
    }),
    defineField({
      name: 'subtitle',
      title: 'Alt Başlık',
      type: 'localeString',
      group: 'intro',
    }),

    // Değerler
    defineField({
      name: 'valuesTitle',
      title: 'Değerler Bölümü Başlığı',
      type: 'localeString',
      group: 'values',
    }),
    defineField({
      name: 'values',
      title: 'Değer Kartları',
      type: 'array',
      group: 'values',
      of: [{
        type: 'object',
        fields: [
          { name: 'icon', title: 'İkon (emoji)', type: 'string' },
          { name: 'title', title: 'Başlık', type: 'localeString' },
          { name: 'desc', title: 'Açıklama', type: 'localeString' },
        ],
        preview: {
          select: { title: 'title.tr', subtitle: 'icon' },
          prepare({ title, subtitle }) {
            return { title: title || 'Kart', subtitle };
          },
        },
      }],
    }),

    // Ekip
    defineField({
      name: 'teamTitle',
      title: 'Ekip Bölümü Başlığı',
      type: 'localeString',
      group: 'team',
    }),
    defineField({
      name: 'teamMembers',
      title: 'Ekip Üyeleri',
      type: 'array',
      group: 'team',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', title: 'İsim Soyisim', type: 'string' },
          { name: 'role', title: 'Rol / Unvan', type: 'localeString' },
          { name: 'avatar', title: 'Fotoğraf', type: 'image', options: { hotspot: true } },
        ],
        preview: {
          select: { title: 'name', subtitle: 'role.tr' },
          prepare({ title, subtitle }) {
            return { title: title || 'Üye', subtitle };
          },
        },
      }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Hakkında Sayfası' };
    },
  },
});
