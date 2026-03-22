// ============================================
// Sanity TypeScript Types
// ============================================

export interface SanityImage {
  asset: {
    _id: string;
    url: string;
    metadata?: {
      dimensions?: {
        width: number;
        height: number;
      };
    };
  };
  alt: string;
  caption?: string;
}

export interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  /** Hex color from Actahub palette: #2C5273 | #F29F05 | #D93D04 | #D9D9D9 | #0D0D0D */
  color: string;
  icon?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  author?: string;
  category?: Category;
  publishedAt: string;
  excerpt?: string;
  mainImage?: SanityImage;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[];
  aiSummary: string;
  relatedEntities?: string[];
  faq?: FAQItem[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface ArticleListItem {
  _id: string;
  title: string;
  slug: { current: string };
  author?: string;
  category?: Category;
  publishedAt: string;
  excerpt?: string;
  mainImage?: SanityImage;
  aiSummary: string;
}

export interface ArticleSlug {
  slug: string;
  _updatedAt: string;
}

export interface ArticleForLLM {
  title: string;
  slug: string;
  aiSummary: string;
  excerpt?: string;
  relatedEntities?: string[];
  faq?: FAQItem[];
  publishedAt: string;
  author?: string;
}
