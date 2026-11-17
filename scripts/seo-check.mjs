#!/usr/bin/env node
/**
 * Post-build SEO sanity check. Reads the prerendered HTML and reports, per page:
 * title length (≤ 60), meta description length (≤ 155), exactly one <h1>, canonical,
 * og:image, robots noindex, and whether every JSON-LD block parses and has @context/@type.
 *
 *   npm run build && npm run seo:check          (reads .next/server/app)
 *   npm run seo:check -- out                    (reads a static export in ./out)
 *
 * Exits with code 1 if any indexable page has an error.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.argv[2] ?? ".next/server/app";
const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (name.endsWith(".html") && !/_not-found|_global-error|404|500/.test(p)) files.push(p);
  }
})(root);

const decode = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const attr = (html, re) => (html.match(re)?.[1] ? decode(html.match(re)[1]) : "");

/** Required / strongly recommended properties per schema type (Google rich result docs). */
const required = {
  HomeAndConstructionBusiness: ["name", "address", "telephone", "url", "geo", "openingHoursSpecification", "areaServed"],
  LocalBusiness: ["name", "address", "telephone", "url"],
  WebSite: ["name", "url"],
  Service: ["name", "serviceType", "provider", "areaServed", "url"],
  FAQPage: ["mainEntity"],
  BreadcrumbList: ["itemListElement"],
  BlogPosting: ["headline", "datePublished", "dateModified", "author", "image", "publisher", "mainEntityOfPage"],
  CollectionPage: ["name", "url"],
};

let errors = 0;
const rows = [];
for (const file of files.sort()) {
  const html = readFileSync(file, "utf8");
  const page = "/" + relative(root, file).split("\\").join("/").replace(/(index)?\.html$/, "").replace(/\/index$/, "");
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);
  const redirect = /http-equiv="refresh"/i.test(html);
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
  const desc = attr(html, /<meta name="description" content="([^"]*)"/);
  const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/);
  const ogImage = attr(html, /<meta property="og:image" content="([^"]*)"/);
  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  const types = [];
  const problems = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(m[1]);
      for (const item of Array.isArray(data) ? data : [data]) {
        if (item["@context"] !== "https://schema.org" || !item["@type"]) problems.push("JSON-LD missing @context/@type");
        const type = [].concat(item["@type"]).join("+");
        types.push(type);
        for (const field of required[type] ?? []) {
          if (item[field] === undefined || item[field] === "" || (Array.isArray(item[field]) && !item[field].length)) problems.push(`${type} missing ${field}`);
        }
        if (type === "FAQPage" && item.mainEntity?.some((q) => !q.name || !q.acceptedAnswer?.text)) problems.push("FAQPage question without answer");
        if (type === "BreadcrumbList" && item.itemListElement?.some((li, i) => li.position !== i + 1 || !li.name || !String(li.item).startsWith("http"))) problems.push("BreadcrumbList item invalid");
        if (JSON.stringify(item).includes('"ratingValue"') && !process.env.ALLOW_RATINGS) problems.push("contains rating markup – only allowed with real review data");
      }
    } catch {
      problems.push("JSON-LD does not parse");
    }
  }
  if (!redirect && !noindex) {
    if (!title) problems.push("no <title>");
    else if (title.length > 60) problems.push(`title ${title.length} chars`);
    if (!desc) problems.push("no description");
    else if (desc.length > 155) problems.push(`description ${desc.length} chars`);
    if (h1 !== 1) problems.push(`${h1} <h1>`);
    if (!canonical) problems.push("no canonical");
    if (!ogImage) problems.push("no og:image");
  }
  if (problems.length && !redirect && !noindex) errors++;
  rows.push({ page, title: `${title.length}`, desc: `${desc.length}`, h1, schema: [...new Set(types)].join(", "), flags: [noindex && "noindex", redirect && "redirect"].filter(Boolean).join(" "), problems: problems.join("; ") });
}

console.table(rows);
console.log(`${rows.length} pages checked, ${errors} with problems.`);
process.exit(errors ? 1 : 0);
