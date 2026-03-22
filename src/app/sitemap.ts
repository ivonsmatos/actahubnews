import type { MetadataRoute } from "next";
import { sanityClient } from "@/lib/sanity/client";
import { allArticleSlugsQuery } from "@/lib/sanity/queries";
import type { ArticleSlug } from "@/lib/sanity/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://actahub.com.br";

/**
 * Dynamic XML sitemap pulling all article slugs + lastmod from Sanity.
 * Includes images sitemap data for image indexing.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/sobre`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contato`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/privacidade`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic article pages from Sanity
  let articlePages: MetadataRoute.Sitemap = [];

  try {
    const slugs: ArticleSlug[] = await sanityClient.fetch(allArticleSlugsQuery);
    articlePages = slugs.map((article) => ({
      url: `${SITE_URL}/${article.slug}`,
      lastModified: new Date(article._updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch {
    // Sanity unavailable — return static pages only
  }

  return [...staticPages, ...articlePages];
}
