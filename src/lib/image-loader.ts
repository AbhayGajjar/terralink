/**
 * next/image loader for the static GitHub Pages export, which has no image optimisation server.
 * - Unsplash placeholder photos are resized and converted to WebP/AVIF by Unsplash's own CDN,
 *   so phones download small images instead of the full 1600px originals.
 * - Local files in /public are served as-is: export them at sensible sizes (≈1600px wide, WebP).
 * Only used when NEXT_PUBLIC_STATIC_EXPORT=true (see next.config.ts); on a Node server Next's
 * built-in optimiser is used instead.
 */
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 70));
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "crop");
    return url.toString();
  }
  // Static hosting ignores the query string; it's only there so each srcset entry is unique.
  return `${src}${src.includes("?") ? "&" : "?"}w=${width}`;
}
