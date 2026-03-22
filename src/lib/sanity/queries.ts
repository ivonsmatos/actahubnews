import { groq } from "next-sanity";

// ============================================
// Article Queries
// ============================================

export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    author,
    publishedAt,
    excerpt,
    mainImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      alt
    },
    body,
    aiSummary,
    relatedEntities,
    faq[] {
      question,
      answer
    },
    seoTitle,
    seoDescription
  }
`;

export const allArticlesQuery = groq`
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    author,
    publishedAt,
    excerpt,
    mainImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      alt
    },
    aiSummary
  }
`;

export const allArticleSlugsQuery = groq`
  *[_type == "article" && defined(slug.current)] {
    "slug": slug.current,
    _updatedAt
  }
`;

export const articlesForLLMQuery = groq`
  *[_type == "article"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    aiSummary,
    excerpt,
    relatedEntities,
    faq[] {
      question,
      answer
    },
    publishedAt,
    author
  }
`;
