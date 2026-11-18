# TerraLink website

Marketing website for **TerraLink** – NBN (FTTP, FTTN, FTTC, HFC) and CCTV installation specialists in South Australia.

Built with **Next.js 16** (App Router, TypeScript), **Ant Design 6**, **framer-motion**, **zod** and **Resend**. Every page is statically prerendered at build time; the only server code is the contact form endpoint.

---

## Quick start

Requirements: Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local   # then fill in the values (see below)
npm run dev                  # http://localhost:3000
```

| Command         | What it does                         |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the development server         |
| `npm run build` | Create an optimised production build |
| `npm run start` | Serve the production build           |
| `npm run lint`  | Run ESLint                           |

---

## Environment variables

Set these in `.env.local` for local development, and for the live site as **GitHub Actions variables** (Settings → Secrets and variables → Actions → Variables). See [SEO-CHECKLIST.md](SEO-CHECKLIST.md) for step-by-step instructions.

| Variable | Used for |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, Open Graph and structured data. `https://www.terralink.net.au` |
| `GOOGLE_SITE_VERIFICATION` | Google Search Console HTML-tag verification (optional) |
| `BING_SITE_VERIFICATION` | Bing Webmaster Tools meta-tag verification (optional) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 (optional – only loaded when set) |
| `RESEND_API_KEY`, `CONTACT_EMAIL`, `CONTACT_FROM_EMAIL` | Server-side quote form (`/api/contact`) – only used when running on a Node server such as Render, not on GitHub Pages |

On GitHub Pages the quote form is delivered by FormSubmit to `company.quoteEmail` (see `src/data/company.ts`). In development without Resend keys, submissions are printed to the terminal.

---

## Updating content

All content lives in plain TypeScript files in `src/data/` – no CMS needed. Edit, save, and the site updates.

### Company details – `src/data/company.ts`

The **single source of truth** for name, phone, email, address, ABN, opening hours, service areas, social links, trust badges, rating and the Google Maps embed. These values feed the header, footer, contact page, SEO metadata and the LocalBusiness JSON-LD schema. Every placeholder is marked `// PLACEHOLDER`.

- Keep `phone.display` and `phone.href` in sync (`href` uses international format: `tel:+618…`).
- `mapEmbedUrl`: in Google Maps, search your address → Share → Embed a map → copy the `src` URL from the iframe code.
- Social links you don't use can be set to `""` and their icons disappear.

### Services – `src/data/services.ts`

Each service object generates a card on the home and services pages, a detail page at `/services/<slug>`, a footer link, a sitemap entry and a contact form option. Fields include the description, "What's included" checklist, benefits, process steps, FAQs and SEO title/description/keywords.

- **Edit** a service by changing its fields.
- **Add** a service by appending a new object with a unique `slug` – its page is generated automatically.
- Changing a `slug` changes its URL, so update any links you've shared.

### Landing pages – `src/data/landing-pages.ts`

Keyword landing pages at the site root (`/nbn-installation-adelaide`, `/fttp-installation-adelaide`, `/fttp-upgrade-adelaide`, `/cctv-installation-adelaide`). Content is Markdown inside the data file.

### Service areas – `src/data/areas.ts`

One page per area at `/areas/<slug>`. The three included areas are examples – see the comments in the file before adding more.

### FAQ hub – `src/data/faqs.ts`

Grouped questions shown on `/faq` (with FAQPage structured data). Link to a group with `/faq#<group-id>`.

### Blog – `src/content/blog/*.md`

One Markdown file per post with a small frontmatter block (title, description, date, category, author, tags, related links) – the format is documented at the top of `src/lib/blog.ts`. Categories and authors live in `src/data/blog.ts`. Files starting with `_` are drafts. Posts automatically get a page, an Article schema, a share image, a sitemap entry, related posts and a place in the blog index.

### Honesty flags

Placeholder claims are hidden until you confirm them: `STATS_ARE_REAL`, `TESTIMONIALS_ARE_REAL` (`src/data/home.ts`), `TEAM_IS_REAL` and `certifications[].verified` (`src/data/about.ts`), `PROJECTS_ARE_REAL` (`src/data/projects.ts`), and `trustBadges[].verified`, `rating`, `nbnNetworkAuthorised` (`src/data/company.ts`).

### Projects – `src/data/projects.ts`

Each project appears in the filterable gallery on `/projects`; set `featured: true` on three of them to show on the home page. `category` is `"nbn"` or `"cctv"` (controls the filter).

### Other content

| File                 | Contents                                                                  |
| -------------------- | ------------------------------------------------------------------------- |
| `src/data/home.ts`   | Why-choose features, stats, process steps, NBN explainer, testimonials, home FAQs |
| `src/data/about.ts`  | Company story, mission, values, team and certifications                    |
| `src/lib/images.ts`  | Every image URL and its alt text                                          |

### Images

Placeholder photos come from Unsplash. To use your own:

1. Put files in `public/images/` (e.g. `public/images/fttp-job.jpg`). Use JPG/WebP around 2000px wide – Next.js automatically resizes and converts them.
2. In `src/lib/images.ts`, replace the entry, e.g.
   `fibreStrands: { src: "/images/fttp-job.jpg", alt: "TerraLink technician installing an NBN connection box" }`
3. Always write a descriptive `alt` text – it helps accessibility and SEO.

Once all Unsplash images are replaced you can remove the `images.unsplash.com` entry from `next.config.ts`.

### Logo

The temporary logo is an inline SVG in `src/components/layout/Logo.tsx`, plus the favicon at `src/app/icon.svg`. Replace both with the real artwork. The social share image is generated by `src/app/opengraph-image.tsx`.

### Colours & fonts

Brand colours are defined twice and should be kept in sync: CSS variables at the top of `src/app/globals.css`, and the Ant Design theme in `src/lib/theme.ts`. Fonts (Plus Jakarta Sans + Inter) are loaded in `src/app/layout.tsx`.

---

## Project structure

```
src/
├─ app/                     Routes (App Router)
│  ├─ page.tsx              Home
│  ├─ services/             /services and /services/[slug]
│  ├─ projects/ about/ contact/
│  ├─ api/contact/route.ts  Contact form endpoint (zod + Resend)
│  ├─ sitemap.ts robots.ts opengraph-image.tsx icon.svg
│  ├─ not-found.tsx loading.tsx
│  └─ globals.css           Design tokens and shared styles
├─ components/
│  ├─ layout/               Header, Footer, floating actions, providers
│  ├─ sections/             Page sections (hero, FAQ, gallery, form…)
│  └─ ui/                   Reusable primitives (Reveal, Counter, Icon…)
├─ data/                    Editable content (company, services, projects…)
└─ lib/                     Theme, SEO helpers, validation, images
```

---

## Deployment

The live site, **https://www.terralink.net.au**, is a static export hosted on **GitHub Pages**. Every push to `main` runs `.github/workflows/pages.yml`, which builds with `NEXT_PUBLIC_STATIC_EXPORT=true` and publishes the `out/` folder. The custom domain is set under GitHub → Settings → Pages.

`render.yaml` describes an alternative Node deployment on Render (real redirects, image optimisation and the Resend-powered quote API). Only one host should serve the domain.

---

## SEO tooling

- `npm run seo:check` (after `npm run build`, or `npm run seo:check -- out` for the static export) – titles, descriptions, H1s, canonicals, share images, JSON-LD validity, broken internal links and click depth from the home page.
- `src/lib/routes.ts` lists every indexable page; it drives `sitemap.xml` and the per-page share images in `src/app/og/[image]/route.tsx`.
- `src/lib/seo.ts` builds page metadata and all structured data.
- `src/data/redirects.ts` keeps old URLs working – never remove entries.
- See [SEO-CHECKLIST.md](SEO-CHECKLIST.md) for placeholders, env vars and Search Console / Bing setup.

---

## Technical notes

- **Cache Components is disabled on purpose.** `create-next-app` enables `cacheComponents` by default in Next 16, but Ant Design evaluates `Date.now()` at module scope (e.g. its portal scroll-locker), which Cache Components rejects during prerendering. All pages are still fully static.
- **AntD SSR styles** are extracted with `@ant-design/nextjs-registry`, so there's no flash of unstyled components.
- **Contact form protection:** server-side zod validation, a hidden honeypot field, and a basic in-memory rate limit (5 requests / 10 minutes per IP, per server instance). For heavier spam, add a service such as Cloudflare Turnstile.
- **Accessibility & motion:** animations respect `prefers-reduced-motion`; the testimonials carousel pauses on hover/focus/touch.
- **SEO:** per-page metadata, canonical URLs, generated share images, `sitemap.xml`, `robots.txt`, and JSON-LD for LocalBusiness, WebSite, Service, FAQPage, BreadcrumbList and BlogPosting.
- **Performance:** icons come from one cached SVG sprite (`/icons.svg`); scroll reveals are CSS-only; Ant Design and framer-motion are only loaded by the (unlisted) projects gallery.
