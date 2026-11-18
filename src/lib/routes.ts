import { areas } from "@/data/areas";
import { blogCategories } from "@/data/blog";
import { landingPages } from "@/data/landing-pages";
import { services } from "@/data/services";
import { getAllPosts } from "./blog";
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
  { path: "/areas", ogTitle: "Areas we service across Adelaide", ogEyebrow: "Service areas", priority: 0.7, changeFrequency: "monthly" },
  { path: "/faq", ogTitle: "NBN & CCTV questions answered", ogEyebrow: "FAQ", priority: 0.7, changeFrequency: "monthly" },
  { path: "/blog", ogTitle: "Guides for nbn & security cameras", ogEyebrow: "Blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/about", ogTitle: "Local NBN & CCTV installers in Adelaide", ogEyebrow: "About TerraLink", priority: 0.5, changeFrequency: "yearly" },
  { path: "/contact", ogTitle: "Get a free NBN or CCTV quote", ogEyebrow: "Contact us", priority: 0.7, changeFrequency: "yearly" },
];

export function siteRoutes(): SiteRoute[] {
  const posts = getAllPosts();
  return [
    ...staticPages.filter((page) => page.path !== "/blog" || posts.length > 0).map((page) => ({
      ...page,
      lastModified: page.path === "/blog" && posts[0] ? posts[0].updated : SITE_CONTENT_UPDATED,
    })),
    ...landingPages.map((page) => ({
      path: `/${page.slug}`,
      ogTitle: page.heading,
      ogEyebrow: page.eyebrow,
      lastModified: SITE_CONTENT_UPDATED,
      priority: 0.9,
      changeFrequency: "monthly" as const,
    })),
    ...services.map((service) => ({
      path: `/services/${service.slug}`,
      ogTitle: service.heading,
      ogEyebrow: service.category === "nbn" ? "nbn installation" : "Security cameras",
      lastModified: SITE_CONTENT_UPDATED,
      priority: 0.85,
      changeFrequency: "monthly" as const,
    })),
    ...areas.map((area) => ({
      path: `/areas/${area.slug}`,
      ogTitle: area.heading,
      ogEyebrow: "Service area",
      lastModified: SITE_CONTENT_UPDATED,
      priority: 0.6,
      changeFrequency: "monthly" as const,
    })),
    ...posts.map((post) => ({
      path: `/blog/${post.slug}`,
      ogTitle: post.title,
      ogEyebrow: post.category.name,
      lastModified: post.updated,
      priority: 0.6,
      changeFrequency: "yearly" as const,
    })),
    ...blogCategories
      .filter((category) => posts.some((post) => post.category.slug === category.slug))
      .map((category) => ({
        path: `/blog/category/${category.slug}`,
        ogTitle: category.name,
        ogEyebrow: "Blog category",
        lastModified: posts.find((post) => post.category.slug === category.slug)!.updated,
        priority: 0.4,
        changeFrequency: "monthly" as const,
      })),
  ];
}

/** Pages that exist but should not be indexed or listed in the sitemap (they still get a share image). */
export const unlistedRoutes: Pick<SiteRoute, "path" | "ogTitle" | "ogEyebrow">[] = [
  { path: "/projects", ogTitle: "Typical NBN & CCTV jobs", ogEyebrow: "Projects" },
];
