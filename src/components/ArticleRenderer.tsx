import { slugify } from "@/lib/sanitize";
import type { FAQItem } from "@/lib/sanity/types";

interface ArticleRendererProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any[];
  faq?: FAQItem[];
}

/**
 * Renders article body with semantic HTML.
 * - Auto-generates IDs on H2/H3 headings (slugified) for deep-linking
 * - Renders FAQ sections with structured question/answer blocks
 * - Pre-defined dimensions for images (CLS < 0.1)
 * - Uses Tailwind typography plugin for prose styling
 */
export default function ArticleRenderer({ body, faq }: ArticleRendererProps) {
  return (
    <div className="article-content">
      {/* Article body */}
      <div className="prose prose-lg max-w-none">
        {body?.map((block, index) => {
          // Handle block-level content
          if (block._type === "block") {
            return renderBlock(block, index);
          }

          // Handle images
          if (block._type === "image") {
            return (
              <figure key={index} className="my-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={block.asset?.url || ""}
                  alt={block.alt || ""}
                  width={800}
                  height={450}
                  loading="lazy"
                  className="rounded-lg w-full h-auto"
                  style={{ aspectRatio: "16/9" }}
                />
                {block.caption && (
                  <figcaption className="text-center text-sm text-gray-500 mt-2">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          }

          return null;
        })}
      </div>

      {/* FAQ Section */}
      {faq && faq.length > 0 && (
        <section
          className="mt-12 pt-8 border-t border-neutral-light"
          aria-labelledby="faq-heading"
        >
          <h2
            id="faq-heading"
            className="text-2xl font-bold text-primary-blue mb-6"
          >
            Perguntas Frequentes
          </h2>
          <div className="space-y-1" role="list">
            {faq.map((item, index) => (
              <details
                key={index}
                className="faq-item group"
                role="listitem"
              >
                <summary className="faq-question cursor-pointer list-none flex items-center justify-between">
                  <span>{item.question}</span>
                  <svg
                    className="w-5 h-5 text-primary-blue transition-transform duration-200 group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <p className="faq-answer mt-3">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

/**
 * Renders a Portable Text block with auto-generated IDs for headings.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderBlock(block: any, index: number) {
  const text = block.children
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ?.map((child: any) => child.text)
    .join("") || "";

  const style = block.style || "normal";

  switch (style) {
    case "h2": {
      const id = slugify(text);
      return (
        <h2 key={index} id={id} className="scroll-mt-20">
          <a href={`#${id}`} className="no-underline hover:underline">
            {renderChildren(block.children)}
          </a>
        </h2>
      );
    }
    case "h3": {
      const id = slugify(text);
      return (
        <h3 key={index} id={id} className="scroll-mt-20">
          <a href={`#${id}`} className="no-underline hover:underline">
            {renderChildren(block.children)}
          </a>
        </h3>
      );
    }
    case "h4": {
      const id = slugify(text);
      return (
        <h4 key={index} id={id} className="scroll-mt-20">
          {renderChildren(block.children)}
        </h4>
      );
    }
    case "blockquote":
      return (
        <blockquote key={index}>
          {renderChildren(block.children)}
        </blockquote>
      );
    default:
      return <p key={index}>{renderChildren(block.children)}</p>;
  }
}

/**
 * Renders inline children with marks (bold, italic, code, links).
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderChildren(children: any[]) {
  if (!children) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return children.map((child: any, i: number) => {
    let content: React.ReactNode = child.text;

    if (child.marks?.includes("strong")) {
      content = <strong key={`strong-${i}`}>{content}</strong>;
    }
    if (child.marks?.includes("em")) {
      content = <em key={`em-${i}`}>{content}</em>;
    }
    if (child.marks?.includes("code")) {
      content = <code key={`code-${i}`}>{content}</code>;
    }

    return <span key={i}>{content}</span>;
  });
}
