import type { Metadata } from "next";
import { company, fullAddress } from "@/data/company";
import { absoluteUrl, siteUrl } from "./site";

export { absoluteUrl, siteUrl } from "./site";

/* ------------------------------------------------------------------------------------------------
 * Metadata
 * ---------------------------------------------------------------------------------------------- */

interface PageMetaInput {
  /** Page title without the brand – the root layout appends " | TerraLink". Keep it ≤ 47 characters. */
  title: string;
  /** Meta description, ≤ 155 characters, written for humans. */
  description: string;
  /** Site-relative path, e.g. "/services/fttp-installation-adelaide" */
  path: string;
  /** Use the title as-is (no " | TerraLink" suffix). */
  absoluteTitle?: boolean;
  type?: "website" | "article";
  article?: { publishedTime: string; modifiedTime?: string; authors?: string[]; section?: string; tags?: string[] };
  noindex?: boolean;
}

/** File name (without extension) of the generated share image for a page path. */
export function ogImageKey(path: string) {
  const clean = path.replace(/^\/|\/$/g, "");
  return clean ? clean.replace(/\//g, "--") : "home";
}

export function ogImagePath(path: string) {
  return `/og/${ogImageKey(path)}.png`;
}

/** Canonical, Open Graph and Twitter tags for a page, with its own generated share image (src/app/og). */
export function buildMetadata({ title, description, path, absoluteTitle, type = "website", article, noindex }: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = absoluteTitle ? title : `${title} | ${company.name}`;
  const image = { url: ogImagePath(path), width: 1200, height: 630, alt: title };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      locale: "en_AU",
      siteName: company.name,
      title: fullTitle,
      description,
      url,
      images: [image],
      ...(type === "article" && article
        ? {
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime ?? article.publishedTime,
            authors: article.authors,
            section: article.section,
            tags: article.tags,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.url],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/* ------------------------------------------------------------------------------------------------
 * JSON-LD structured data
 * ---------------------------------------------------------------------------------------------- */

type JsonLdObject = Record<string, unknown>;

export const businessId = `${siteUrl}/#business`;
export const websiteId = `${siteUrl}/#website`;

const adelaide = { "@type": "City", name: "Adelaide", containedInPlace: { "@type": "State", name: "South Australia" } };

/** Places the business serves, from company.serviceAreas. */
export function areaServedJsonLd() {
  return [adelaide, ...company.serviceAreas.map((name) => ({ "@type": "Place", name: `${name}, South Australia` }))];
}

/**
 * LocalBusiness schema built entirely from src/data/company.ts. Empty placeholder fields are left
 * out rather than published. No AggregateRating: there is no verified review data in the repo.
 */
export function localBusinessJsonLd(): JsonLdObject {
  const sameAs = Object.values(company.social).filter(Boolean);
  const schema: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": businessId,
    name: company.name,
    description: company.description,
    url: absoluteUrl("/"),
    telephone: company.phone.href.replace("tel:", ""),
    image: absoluteUrl(ogImagePath("/")),
    logo: absoluteUrl("/og/logo.png"),
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      addressLocality: company.address.suburb,
      addressRegion: company.address.state,
      postalCode: company.address.postcode,
      addressCountry: company.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: company.address.geo.latitude,
      longitude: company.address.geo.longitude,
    },
    hasMap: company.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`,
    areaServed: areaServedJsonLd(),
    openingHoursSpecification: company.openingHours.flatMap((row) =>
      row.schema
        ? [{ "@type": "OpeningHoursSpecification", dayOfWeek: row.schema.dayOfWeek, opens: row.schema.opens, closes: row.schema.closes }]
        : [],
    ),
    knowsAbout: ["nbn installation", "FTTP", "FTTN", "FTTC", "HFC", "data cabling", "CCTV installation", "security cameras"],
  };
  if (company.priceRange) schema.priceRange = company.priceRange;
  if (company.legalName) schema.legalName = company.legalName;
  if (company.email) schema.email = company.email;
  if (company.foundedYear) schema.foundingDate = String(company.foundedYear);
  if (company.abn) schema.taxID = company.abn;
  if (sameAs.length) schema.sameAs = sameAs;
  return schema;
}

export function websiteJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url: absoluteUrl("/"),
    name: company.name,
    inLanguage: "en-AU",
    publisher: { "@id": businessId },
  };
}

export function serviceJsonLd(input: { name: string; serviceType: string; description: string; path: string; image?: string; areaServed?: unknown }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(input.path)}#service`,
    name: input.name,
    serviceType: input.serviceType,
    description: input.description,
    url: absoluteUrl(input.path),
    ...(input.image ? { image: input.image.startsWith("http") ? input.image : absoluteUrl(input.image) } : {}),
    provider: { "@id": businessId },
    areaServed: input.areaServed ?? areaServedJsonLd(),
  };
}

/** FAQPage structured data. Only use where the same questions and answers are visible on the page. */
export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** Breadcrumb trail structured data */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleJsonLd(post: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  author: { name: string; url?: string };
  section?: string;
  wordCount?: number;
}) {
  const url = absoluteUrl(post.path);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: [absoluteUrl(ogImagePath(post.path))],
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
    author: { "@type": post.author.url ? "Person" : "Organization", name: post.author.name, ...(post.author.url ? { url: absoluteUrl(post.author.url) } : {}) },
    publisher: { "@id": businessId },
    isPartOf: { "@id": websiteId },
    inLanguage: "en-AU",
    ...(post.section ? { articleSection: post.section } : {}),
    ...(post.wordCount ? { wordCount: post.wordCount } : {}),
  };
}
