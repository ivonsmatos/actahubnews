import Link from "next/link";
import { sanityClient } from "@/lib/sanity/client";
import { allArticlesQuery } from "@/lib/sanity/queries";
import type { Metadata } from "next";
import type { ArticleListItem } from "@/lib/sanity/types";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Artigos",
  description:
    "Explore todos os artigos técnicos do Actahub — conteúdo verificável, otimizado para humanos e IAs generativas.",
  alternates: {
    canonical: "https://actahub.com.br/artigos",
  },
};

export default async function ArtigosPage() {
  let articles: ArticleListItem[] = [];

  try {
    articles = await sanityClient.fetch(allArticlesQuery);
  } catch {
    // Sanity unavailable
  }

  return (
    <section className="py-12">
      <div className="container-wide">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-primary-blue mb-3">
            Artigos
          </h1>
          <p className="text-neutral-dark/70 max-w-xl">
            Conteúdo técnico verificável, com dados estruturados e resumos
            otimizados para humanos e IAs generativas.
          </p>
        </header>

        {/* Article Grid */}
        {articles.length === 0 ? (
          <div className="text-center py-20 text-neutral-dark/50">
            <p className="text-xl mb-2">Nenhum artigo publicado ainda.</p>
            <p className="text-sm">
              Publique artigos no{" "}
              <Link
                href="/studio"
                className="text-primary-blue underline hover:text-accent-yellow"
              >
                Sanity Studio
              </Link>{" "}
              para que apareçam aqui.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => {
              const categoryColor = article.category?.color ?? "#2C5273";
              const categoryIcon = article.category?.icon ?? "📄";

              return (
                <article key={article._id} className="card group">
                  {/* Category badge */}
                  {article.category && (
                    <span
                      className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full text-bg-white mb-3"
                      style={{ backgroundColor: categoryColor }}
                    >
                      {categoryIcon} {article.category.title}
                    </span>
                  )}

                  {/* Hero image */}
                  {article.mainImage && (
                    <div className="aspect-video bg-neutral-light rounded-lg mb-4 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={article.mainImage.asset.url}
                        alt={article.mainImage.alt || article.title}
                        width={400}
                        height={225}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Date */}
                  <time
                    dateTime={article.publishedAt}
                    className="text-xs text-neutral-dark/50"
                  >
                    {new Date(article.publishedAt).toLocaleDateString("pt-BR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-primary-blue mt-2 mb-3 group-hover:text-accent-yellow transition-colors">
                    <Link href={`/${article.slug.current}`}>
                      {article.title}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  {article.excerpt && (
                    <p className="text-neutral-dark/70 text-sm line-clamp-3 mb-3">
                      {article.excerpt}
                    </p>
                  )}

                  {/* AI Summary */}
                  {article.aiSummary && (
                    <p className="text-xs text-primary-blue/60 italic border-t border-neutral-light pt-3">
                      🤖 {article.aiSummary}
                    </p>
                  )}

                  {/* Read more */}
                  <Link
                    href={`/${article.slug.current}`}
                    className="inline-block mt-4 text-sm font-medium text-accent-yellow hover:text-primary-blue transition-colors"
                  >
                    Ler artigo →
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
