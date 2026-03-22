import { NextResponse } from "next/server";
import { sanityClient } from "@/lib/sanity/client";
import { articlesForLLMQuery } from "@/lib/sanity/queries";
import type { ArticleForLLM } from "@/lib/sanity/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://actahub.com.br";

/**
 * GET /llms-full.txt
 * 
 * Expanded version of llm.txt with full article content:
 * AI summaries, FAQ question/answer pairs, and related entities.
 * Designed for deeper LLM context consumption.
 */
export async function GET() {
  let articles: ArticleForLLM[] = [];

  try {
    articles = await sanityClient.fetch(articlesForLLMQuery);
  } catch {
    // Return basic structure if Sanity is unavailable
  }

  const lines: string[] = [];

  // Header
  lines.push("# Actahub — Conteúdo Completo para LLMs");
  lines.push("");
  lines.push(
    "> Este arquivo contém o conteúdo completo e estruturado de todos os artigos publicados no Actahub (actahub.com.br), otimizado para consumo por modelos de linguagem e agentes de IA."
  );
  lines.push("");
  lines.push(`Gerado em: ${new Date().toISOString()}`);
  lines.push(`Total de artigos: ${articles.length}`);
  lines.push("");

  // Each article as a full section
  for (const article of articles) {
    const url = `${SITE_URL}/${article.slug}`;

    lines.push("---");
    lines.push("");
    lines.push(`## ${article.title}`);
    lines.push("");
    lines.push(`**URL:** ${url}`);
    if (article.author) {
      lines.push(`**Autor:** ${article.author}`);
    }
    lines.push(
      `**Publicado:** ${new Date(article.publishedAt).toLocaleDateString("pt-BR")}`
    );
    lines.push("");

    // AI Summary
    if (article.aiSummary) {
      lines.push(`### Resumo IA`);
      lines.push("");
      lines.push(article.aiSummary);
      lines.push("");
    }

    // Excerpt
    if (article.excerpt) {
      lines.push(`### Resumo`);
      lines.push("");
      lines.push(article.excerpt);
      lines.push("");
    }

    // Related Entities
    if (article.relatedEntities && article.relatedEntities.length > 0) {
      lines.push(`### Entidades Relacionadas`);
      lines.push("");
      lines.push(article.relatedEntities.map((e) => `- ${e}`).join("\n"));
      lines.push("");
    }

    // FAQ
    if (article.faq && article.faq.length > 0) {
      lines.push(`### Perguntas Frequentes`);
      lines.push("");
      for (const faqItem of article.faq) {
        lines.push(`**P:** ${faqItem.question}`);
        lines.push(`**R:** ${faqItem.answer}`);
        lines.push("");
      }
    }
  }

  const content = lines.join("\n");

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
