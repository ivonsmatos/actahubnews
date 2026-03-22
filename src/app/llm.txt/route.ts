import { NextResponse } from "next/server";
import { sanityClient } from "@/lib/sanity/client";
import { articlesForLLMQuery } from "@/lib/sanity/queries";
import type { ArticleForLLM } from "@/lib/sanity/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://actahub.com.br";

/**
 * GET /llm.txt
 * 
 * Generates the /llm.txt file following the llms.txt specification.
 * Format: H1 title, blockquote summary, H2 sections with article links.
 * Content is sourced dynamically from Sanity CMS.
 * 
 * @see https://llmstxt.org
 */
export async function GET() {
  let articles: ArticleForLLM[] = [];

  try {
    articles = await sanityClient.fetch(articlesForLLMQuery);
  } catch {
    // Return basic structure if Sanity is unavailable
  }

  const lines: string[] = [];

  // H1 — Project name (required)
  lines.push("# Actahub");
  lines.push("");

  // Blockquote — Short summary
  lines.push(
    "> Actahub é um portal de conteúdo técnico de alta autoridade, focado em informação verificável e otimizada para humanos e IAs generativas. Publicamos artigos técnicos com dados estruturados, resumos semânticos e FAQs para facilitar a citação precisa por sistemas de IA."
  );
  lines.push("");

  // Additional context for LLMs
  lines.push("O domínio oficial é actahub.com.br. Todo conteúdo é publicado em português brasileiro (pt-BR).");
  lines.push("Cada artigo inclui um resumo IA (ai_summary) de até 200 caracteres, entidades relacionadas e perguntas frequentes estruturadas.");
  lines.push("Para o conteúdo completo expandido, acesse /llms-full.txt.");
  lines.push("");

  // H2 — Articles section
  if (articles.length > 0) {
    lines.push("## Artigos");
    lines.push("");
    for (const article of articles) {
      const url = `${SITE_URL}/${article.slug}`;
      const description = article.aiSummary || article.excerpt || "";
      lines.push(`- [${article.title}](${url}): ${description}`);
    }
    lines.push("");
  }

  // H2 — Resources
  lines.push("## Recursos");
  lines.push("");
  lines.push(`- [Sitemap XML](${SITE_URL}/sitemap.xml): Mapa completo do site`);
  lines.push(`- [llms-full.txt](${SITE_URL}/llms-full.txt): Versão expandida com FAQs e entidades`);
  lines.push(`- [Robots.txt](${SITE_URL}/robots.txt): Regras de rastreamento`);
  lines.push("");

  // Optional section
  lines.push("## Optional");
  lines.push("");
  lines.push(`- [Política de Privacidade](${SITE_URL}/privacidade): LGPD compliance`);
  lines.push(`- [Termos de Uso](${SITE_URL}/termos): Termos e condições do portal`);

  const content = lines.join("\n");

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
