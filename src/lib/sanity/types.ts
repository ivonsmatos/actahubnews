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

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Article {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  author?: string;
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
  slug: {
    current: string;
  };
  author?: string;
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
