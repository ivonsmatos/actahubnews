import Link from "next/link";
import { sanityClient } from "@/lib/sanity/client";
import { allArticlesQuery } from "@/lib/sanity/queries";
import type { ArticleListItem } from "@/lib/sanity/types";

export const revalidate = 3600; // ISR: rebuild every hour

export default async function HomePage() {
  let articles: ArticleListItem[] = [];

  try {
    articles = await sanityClient.fetch(allArticlesQuery);
  } catch {
    // Sanity unavailable — render with empty articles
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary-blue text-bg-white py-20 sm:py-28">
        <div className="container-content text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-bg-white mb-6 leading-tight">
            Conteúdo Técnico de{" "}
            <span className="text-accent-yellow">Alta Autoridade</span>
          </h1>
          <p className="text-lg sm:text-xl text-neutral-light/90 max-w-2xl mx-auto mb-8 leading-relaxed">
            Artigos verificáveis, dados estruturados e informação otimizada
            tanto para humanos quanto para IAs generativas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/artigos" className="btn-secondary">
              Explorar Artigos
            </Link>
            <a href="/llm.txt" className="btn-primary border border-bg-white/30">
              Ver llm.txt
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-bg-white" aria-labelledby="features-heading">
        <div className="container-wide">
          <h2
            id="features-heading"
            className="text-3xl font-bold text-primary-blue text-center mb-12"
          >
            Por Que Actahub?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-primary-blue mb-3">
                SEO Técnico Completo
              </h3>
              <p className="text-neutral-dark/80">
                Canonical tags, sitemaps dinâmicos, JSON-LD estruturado e
                Core Web Vitals otimizados nativamente.
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-primary-blue mb-3">
                Otimizado para IAs
              </h3>
              <p className="text-neutral-dark/80">
                llm.txt, resumos semânticos, entidades e FAQ estruturadas
                para citação precisa por IAs generativas.
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold text-primary-blue mb-3">
                Segurança de Borda
              </h3>
              <p className="text-neutral-dark/80">
                CSP, HSTS, WAF integrado e sanitização server-side.
                Deploy na edge via Cloudflare Workers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      {articles.length > 0 && (
        <section
          className="py-16 bg-neutral-light/30"
          aria-labelledby="articles-heading"
        >
          <div className="container-wide">
            <div className="flex items-center justify-between mb-10">
              <h2
                id="articles-heading"
                className="text-3xl font-bold text-primary-blue"
              >
                Últimos Artigos
              </h2>
              <Link
                href="/artigos"
                className="text-primary-blue hover:text-accent-yellow font-medium transition-colors"
              >
                Ver todos →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.slice(0, 6).map((article) => (
                <article key={article._id} className="card group">
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
                  <time
                    dateTime={article.publishedAt}
                    className="text-sm text-neutral-dark/60"
                  >
                    {new Date(article.publishedAt).toLocaleDateString("pt-BR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <h3 className="text-xl font-bold text-primary-blue mt-2 mb-3 group-hover:text-accent-yellow transition-colors">
                    <Link href={`/${article.slug.current}`}>
                      {article.title}
                    </Link>
                  </h3>
                  {article.excerpt && (
                    <p className="text-neutral-dark/80 text-sm line-clamp-3">
                      {article.excerpt}
                    </p>
                  )}
                  {article.aiSummary && (
                    <p className="mt-3 text-xs text-primary-blue/70 italic">
                      IA: {article.aiSummary}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-bg-white">
        <div className="container-content text-center">
          <h2 className="text-3xl font-bold text-primary-blue mb-4">
            Transparência Total
          </h2>
          <p className="text-neutral-dark/80 max-w-xl mx-auto mb-8">
            Todo nosso conteúdo é verificável, rastreável e estruturado para
            máxima citabilidade — por humanos e IAs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/sitemap.xml" className="entity-tag">
              📋 Sitemap XML
            </a>
            <a href="/llm.txt" className="entity-tag">
              🤖 llm.txt
            </a>
            <a href="/llms-full.txt" className="entity-tag">
              📄 llms-full.txt
            </a>
            <a href="/robots.txt" className="entity-tag">
              🔒 robots.txt
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
