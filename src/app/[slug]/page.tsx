import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityClient } from "@/lib/sanity/client";
import { articleBySlugQuery, allArticleSlugsQuery } from "@/lib/sanity/queries";
import type { Article, ArticleSlug } from "@/lib/sanity/types";
import ArticleRenderer from "@/components/ArticleRenderer";
import JsonLd from "@/components/JsonLd";

// Required for Cloudflare Pages (next-on-pages)
export const runtime = "edge";
export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://actahub.com.br";

interface PageProps {
  params: { slug: string };
}

// ── Dynamic Metadata (SEO + OG + hreflang) ──────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const article: Article | null = await sanityClient.fetch(articleBySlugQuery, {
      slug: params.slug,
    });

    if (!article) return {};

    const title = article.seoTitle || article.title;
    const description =
      article.seoDescription || article.excerpt || article.aiSummary;
    const url = `${SITE_URL}/${article.slug.current}`;
    const imageUrl = article.mainImage?.asset?.url;

    return {
      title,
      description,
      keywords: article.relatedEntities?.join(", "),
      authors: article.author ? [{ name: article.author }] : undefined,
      openGraph: {
        title,
        description,
        url,
        type: "article",
        locale: "pt_BR",
        siteName: "Actahub",
        publishedTime: article.publishedAt,
        authors: article.author ? [article.author] : undefined,
        ...(imageUrl && {
          images: [
            {
              url: imageUrl,
              width: article.mainImage?.asset.metadata?.dimensions?.width || 1200,
              height: article.mainImage?.asset.metadata?.dimensions?.height || 630,
              alt: article.mainImage?.alt || article.title,
            },
          ],
        }),
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        ...(imageUrl && { images: [imageUrl] }),
      },
      alternates: {
        canonical: url,
        languages: {
          "pt-BR": url,
        },
      },
    };
  } catch {
    return {};
  }
}

// ── Page Component ──────────────────────────────
export default async function ArticlePage({ params }: PageProps) {
  let article: Article | null = null;

  try {
    article = await sanityClient.fetch(articleBySlugQuery, {
      slug: params.slug,
    });
  } catch {
    notFound();
  }

  if (!article) {
    notFound();
  }

  return (
    <>
      {/* JSON-LD (TechArticle + FAQPage + Breadcrumb) */}
      <JsonLd article={article} />

      <article className="container-content py-12">
        {/* Article Header */}
        <header className="mb-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-neutral-dark/60">
              <li>
                <a href="/" className="hover:text-primary-blue transition-colors">
                  Início
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-primary-blue font-medium truncate">
                {article.title}
              </li>
            </ol>
          </nav>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-blue leading-tight mb-4">
            {article.title}
          </h1>

          {/* Meta row: author, date */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-dark/70 mb-6">
            {article.author && (
              <span className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                {article.author}
              </span>
            )}
            <time
              dateTime={article.publishedAt}
              className="flex items-center gap-1"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {new Date(article.publishedAt).toLocaleDateString("pt-BR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          {/* AI Summary callout */}
          {article.aiSummary && (
            <div className="bg-primary-blue/5 border-l-4 border-accent-yellow p-4 rounded-r-lg mb-6">
              <p className="text-sm font-medium text-primary-blue">
                <span className="font-bold">📌 Resumo IA:</span>{" "}
                {article.aiSummary}
              </p>
            </div>
          )}

          {/* Related Entities */}
          {article.relatedEntities && article.relatedEntities.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6" aria-label="Entidades relacionadas">
              {article.relatedEntities.map((entity, i) => (
                <span key={i} className="entity-tag">
                  {entity}
                </span>
              ))}
            </div>
          )}

          {/* Hero Image */}
          {article.mainImage && (
            <figure className="rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.mainImage.asset.url}
                alt={article.mainImage.alt || article.title}
                width={
                  article.mainImage.asset.metadata?.dimensions?.width || 1200
                }
                height={
                  article.mainImage.asset.metadata?.dimensions?.height || 630
                }
                className="w-full h-auto"
                style={{ aspectRatio: "16/9", objectFit: "cover" }}
              />
            </figure>
          )}
        </header>

        {/* Article Body */}
        {article.body && (
          <ArticleRenderer body={article.body} faq={article.faq} />
        )}
      </article>
    </>
  );
}
