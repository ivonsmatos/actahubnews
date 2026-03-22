import type { Article } from "@/lib/sanity/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://actahub.com.br";

interface JsonLdProps {
  article: Article;
}

/**
 * Generates TechArticle + FAQPage JSON-LD structured data.
 * Pulls GEO fields (aiSummary, relatedEntities, faq) from Sanity
 * and injects them as schema.org structured data.
 */
export default function JsonLd({ article }: JsonLdProps) {
  const articleUrl = `${SITE_URL}/${article.slug.current}`;

  // TechArticle schema with GEO fields
  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.seoDescription || article.excerpt || "",
    abstract: article.aiSummary,
    url: articleUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    ...(article.author && {
      author: {
        "@type": "Person",
        name: article.author,
        url: `${SITE_URL}/autor/${encodeURIComponent(article.author.toLowerCase().replace(/\s+/g, "-"))}`,
      },
    }),
    publisher: {
      "@type": "Organization",
      name: "Actahub",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    ...(article.mainImage && {
      image: {
        "@type": "ImageObject",
        url: article.mainImage.asset.url,
        ...(article.mainImage.asset.metadata?.dimensions && {
          width: article.mainImage.asset.metadata.dimensions.width,
          height: article.mainImage.asset.metadata.dimensions.height,
        }),
      },
    }),
    // GEO: mentions from relatedEntities
    ...(article.relatedEntities &&
      article.relatedEntities.length > 0 && {
        mentions: article.relatedEntities.map((entity) => ({
          "@type": "Thing",
          name: entity,
        })),
        keywords: article.relatedEntities.join(", "),
      }),
    inLanguage: "pt-BR",
    isAccessibleForFree: true,
  };

  // FAQPage schema from faq array
  const faqSchema =
    article.faq && article.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: article.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  // BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: article.title,
        item: articleUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(techArticleSchema),
        }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}
