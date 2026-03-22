/**
 * HTML entity escaping for server-side data sanitization.
 * Used in Server Components before rendering CMS data to prevent XSS.
 */

const ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "/": "&#x2F;",
};

const ESCAPE_REGEX = /[&<>"'/]/g;

/**
 * Escapes HTML entities in a string to prevent XSS attacks.
 */
export function escapeHtml(str: string): string {
  if (typeof str !== "string") return "";
  return str.replace(ESCAPE_REGEX, (char) => ESCAPE_MAP[char] || char);
}

/**
 * Sanitizes an object by escaping all string values recursively.
 */
export function sanitizeData<T>(data: T): T {
  if (typeof data === "string") {
    return escapeHtml(data) as T;
  }

  if (Array.isArray(data)) {
    return data.map((item) => sanitizeData(item)) as T;
  }

  if (data !== null && typeof data === "object") {
    const sanitized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
      sanitized[key] = sanitizeData(value);
    }
    return sanitized as T;
  }

  return data;
}

/**
 * Strips all HTML tags from a string.
 */
export function stripHtml(str: string): string {
  if (typeof str !== "string") return "";
  return str.replace(/<[^>]*>/g, "");
}

/**
 * Creates a URL-safe slug from a string.
 */
export function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}
