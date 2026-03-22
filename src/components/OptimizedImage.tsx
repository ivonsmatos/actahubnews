import Image from "next/image";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

/**
 * Optimized image component wrapping next/image.
 * - Pre-defined width/height to prevent CLS
 * - Priority loading for hero/LCP images
 * - Lazy loading for below-the-fold images
 * - AVIF/WebP format via Next.js config
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = "",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px",
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      sizes={sizes}
      quality={85}
      className={`rounded-lg ${className}`}
      style={{
        maxWidth: "100%",
        height: "auto",
      }}
    />
  );
}
