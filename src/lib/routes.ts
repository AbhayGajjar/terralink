import { services } from "@/data/services";
import { SITE_CONTENT_UPDATED } from "./site";

/**
 * Every indexable page on the site, in one place. Drives sitemap.xml and the generated
 * Open Graph share images (src/app/og/[image]/route.tsx). Add new page types here.
 */
export interface SiteRoute {
  path: string;
  /** Headline printed on the share image */
  ogTitle: string;
  /** Small label above the headline on the share image */
  ogEyebrow: string;
  lastModified: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
}

const staticPages: Omit<SiteRoute, "lastModified">[] = [
  { path: "/", ogTitle: "NBN & CCTV installation in Adelaide", ogEyebrow: "Adelaide · South Australia", priority: 1, changeFrequency: "weekly" },
  { path: "/services", ogTitle: "NBN & CCTV installation services", ogEyebrow: "Our services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/about", ogTitle: "Local NBN & CCTV installers in Adelaide", ogEyebrow: "About TerraLink", priority: 0.5, changeFrequency: "yearly" },
  { path: "/contact", ogTitle: "Get a free NBN or CCTV quote", ogEyebrow: "Contact us", priority: 0.7, changeFrequency: "yearly" },
];

export function siteRoutes(): SiteRoute[] {
  return [
    ...staticPages.map((page) => ({ ...page, lastModified: SITE_CONTENT_UPDATED })),
    ...services.map((service) => ({
      path: `/services/${service.slug}`,
      ogTitle: service.seo.title,
      ogEyebrow: service.category === "nbn" ? "NBN installation" : "Security cameras",
      lastModified: SITE_CONTENT_UPDATED,
      priority: 0.85,
      changeFrequency: "monthly" as const,
    })),
  ];
}

/** Pages that exist but should not be indexed or listed in the sitemap (they still get a share image). */
export const unlistedRoutes: Pick<SiteRoute, "path" | "ogTitle" | "ogEyebrow">[] = [
  { path: "/projects", ogTitle: "Typical NBN & CCTV jobs", ogEyebrow: "Projects" },
];
