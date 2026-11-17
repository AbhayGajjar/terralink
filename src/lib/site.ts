import { company } from "@/data/company";

/** True when building the static GitHub Pages export (see next.config.ts). */
export const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

/** The static export serves every page at a trailing-slash URL (/about/), so all absolute URLs must match. */
export const trailingSlash = isStaticExport;

export const siteUrl = company.url.replace(/\/$/, "");

/** Site-relative path in the exact form the host serves it, e.g. "/about" → "/about/" on the static export. */
export function sitePath(path: string) {
  if (path === "/" || path === "") return "/";
  const clean = path.replace(/\/$/, "");
  const hasExtension = /\.[a-z0-9]+$/i.test(clean);
  return trailingSlash && !hasExtension ? `${clean}/` : clean;
}

/** Absolute URL for sitemap, canonical, Open Graph and JSON-LD. */
export function absoluteUrl(path: string) {
  const p = sitePath(path);
  return p === "/" ? `${siteUrl}/` : `${siteUrl}${p}`;
}

/** Date the static pages' content last changed meaningfully (used by the sitemap). Update when you edit copy. */
export const SITE_CONTENT_UPDATED = "2026-11-18";
