import { areas } from "@/data/areas";
import { landingPages } from "@/data/landing-pages";
import { services } from "@/data/services";
import { getAllPosts } from "./blog";
import type { LinkCard } from "./content";

/**
 * Turns site paths into link cards (title + description) for "Related services / articles /
 * areas" blocks, so internal links always use descriptive anchor text and never point at
 * pages that don't exist.
 */
function catalogue(): Map<string, LinkCard> {
  const map = new Map<string, LinkCard>();
  for (const s of services) {
    map.set(`/services/${s.slug}`, { href: `/services/${s.slug}`, title: s.heading, description: s.excerpt, eyebrow: "Service" });
  }
  for (const p of landingPages) {
    map.set(`/${p.slug}`, { href: `/${p.slug}`, title: p.heading, description: p.lead, eyebrow: "Adelaide guide" });
  }
  for (const a of areas) {
    map.set(`/areas/${a.slug}`, { href: `/areas/${a.slug}`, title: a.heading, description: a.lead, eyebrow: "Service area" });
  }
  for (const post of getAllPosts()) {
    map.set(`/blog/${post.slug}`, {
      href: `/blog/${post.slug}`,
      title: post.title,
      description: post.description,
      eyebrow: `${post.category.name} · ${post.readingMinutes} min read`,
    });
  }
  map.set("/faq", { href: "/faq", title: "nbn & CCTV FAQs", description: "Straight answers about nbn technologies, installation, FTTP upgrades and CCTV rules in SA.", eyebrow: "FAQ" });
  map.set("/areas", { href: "/areas", title: "Areas we service", description: "Where our technicians work across Adelaide and surrounding regions.", eyebrow: "Service areas" });
  map.set("/blog", { href: "/blog", title: "Guides & articles", description: "Practical, local advice on nbn connections and security cameras.", eyebrow: "Blog" });
  map.set("/services", { href: "/services", title: "All installation services", description: "FTTP, FTTN, FTTC, HFC and CCTV installation in Adelaide.", eyebrow: "Services" });
  return map;
}

export function linkCards(paths: string[], exclude: string[] = []): LinkCard[] {
  const map = catalogue();
  const seen = new Set(exclude);
  const cards: LinkCard[] = [];
  for (const path of paths) {
    if (seen.has(path)) continue;
    const card = map.get(path);
    if (!card) {
      if (process.env.NODE_ENV !== "production") console.warn(`[links] No page found for related link ${path}`);
      continue;
    }
    seen.add(path);
    cards.push(card);
  }
  return cards;
}

/** Cards split by type, for separate "Related services" and "Related articles" blocks. */
export function splitLinks(paths: string[], exclude: string[] = []) {
  const cards = linkCards(paths, exclude);
  return {
    services: cards.filter((c) => !c.href.startsWith("/blog/")),
    articles: cards.filter((c) => c.href.startsWith("/blog/")),
  };
}
