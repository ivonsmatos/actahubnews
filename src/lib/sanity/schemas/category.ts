/**
 * Sanity Schema: Category
 * Defines content categories with a color from the Actahub palette
 * and an icon (emoji) for visual identification in the UI.
 */

import { defineType, defineField } from "sanity";

// Actahub color palette options
const COLOR_OPTIONS = [
  { title: "Azul Principal (primary-blue)", value: "#2C5273" },
  { title: "Amarelo Destaque (accent-yellow)", value: "#F29F05" },
  { title: "Laranja Destaque (accent-orange)", value: "#D93D04" },
  { title: "Neutro Claro (neutral-light)", value: "#D9D9D9" },
  { title: "Neutro Escuro (neutral-dark)", value: "#0D0D0D" },
];

const category = defineType({
  name: "category",
  title: "Categoria",
  type: "document",
  icon: () => "🏷️",
  fields: [
    defineField({
      name: "title",
      title: "Nome da Categoria",
      type: "string",
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 60 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "text",
      rows: 2,
      description: "Breve descrição da categoria (exibida em listagens e tooltips).",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "color",
      title: "Cor da Categoria",
      type: "string",
      description: "Cor da paleta Actahub usada para destacar esta categoria no frontend.",
      options: {
        list: COLOR_OPTIONS,
        layout: "radio",
      },
      initialValue: "#2C5273",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Ícone (Emoji)",
      type: "string",
      description: "Emoji ou símbolo que representa visualmente esta categoria. Ex: 🛡️ 🔍 🤖 ⚡ 📊",
      validation: (Rule) => Rule.max(8),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      color: "color",
      icon: "icon",
    },
    prepare({ title, subtitle, icon }) {
      return {
        title: `${icon ?? "🏷️"} ${title ?? "Sem nome"}`,
        subtitle: subtitle ?? "",
      };
    },
  },
});

export default category;
