/**
 * Sanity Schema: Article
 * Content type for the Actahub portal with full GEO (Generative Engine Optimization) support.
 * Includes aiSummary, relatedEntities, and faq fields for LLM optimization.
 */

import { defineType, defineField, defineArrayMember } from "sanity";

const article = defineType({
  name: "article",
  title: "Artigo",
  type: "document",
  groups: [
    { name: "content", title: "Conteúdo", default: true },
    { name: "seo", title: "SEO" },
    { name: "geo", title: "GEO / IA" },
  ],
  fields: [
    // ── Content Group ──────────────────────────
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Autor",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "publishedAt",
      title: "Data de Publicação",
      type: "datetime",
      group: "content",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "excerpt",
      title: "Resumo (Excerpt)",
      type: "text",
      group: "content",
      rows: 3,
      description: "Breve resumo do artigo exibido em listagens e cards.",
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: "mainImage",
      title: "Imagem Principal",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto Alternativo (Alt)",
          type: "string",
          description: "Importante para acessibilidade e SEO.",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "Corpo do Artigo",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Citação", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              defineArrayMember({
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (Rule) =>
                      Rule.uri({
                        allowRelative: true,
                        scheme: ["https", "http", "mailto", "tel"],
                      }),
                  }),
                ],
              }),
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Texto Alternativo",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "caption",
              type: "string",
              title: "Legenda",
            }),
          ],
        }),
      ],
    }),

    // ── SEO Group ──────────────────────────────
    defineField({
      name: "seoTitle",
      title: "Título SEO",
      type: "string",
      group: "seo",
      description: "Título otimizado para mecanismos de busca (50-60 caracteres).",
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: "seoDescription",
      title: "Meta Description",
      type: "text",
      group: "seo",
      rows: 3,
      description: "Descrição para resultados de busca (120-150 caracteres).",
      validation: (Rule) => Rule.max(160),
    }),

    // ── GEO Group (Generative Engine Optimization) ──
    defineField({
      name: "aiSummary",
      title: "Resumo para IA (AI Summary)",
      type: "text",
      group: "geo",
      rows: 3,
      description:
        "Resumo semântico de até 200 caracteres, otimizado para respostas de IAs generativas.",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "relatedEntities",
      title: "Entidades Relacionadas",
      type: "array",
      group: "geo",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
      description:
        "Tags de entidades do mundo real (ex: 'LGPD', 'Cloudflare', 'Next.js').",
    }),
    defineField({
      name: "faq",
      title: "Perguntas Frequentes (FAQ)",
      type: "array",
      group: "geo",
      description: "Pares de pergunta/resposta para FAQPage JSON-LD e respostas de IAs.",
      of: [
        defineArrayMember({
          type: "object",
          name: "faqItem",
          title: "Item de FAQ",
          fields: [
            defineField({
              name: "question",
              title: "Pergunta",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Resposta",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "question", subtitle: "answer" },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author",
      media: "mainImage",
    },
    prepare({ title, author, media }) {
      return {
        title: title ?? "Sem título",
        subtitle: author ? `por ${author}` : "",
        media,
      };
    },
  },
});

export default article;
