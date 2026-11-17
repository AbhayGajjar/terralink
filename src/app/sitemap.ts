import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { siteRoutes } from "@/lib/routes";

export const dynamic = "force-static";

/** Every indexable page – see src/lib/routes.ts to add new page types. */
export default function sitemap(): MetadataRoute.Sitemap {
  return siteRoutes().map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
