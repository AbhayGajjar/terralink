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

Set these in `.env.local` for local development and in your hosting provider (e.g. Vercel → Project → Settings → Environment Variables) for production.

| Variable               | Required | Description                                                                                                                                  |
| ---------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`       | Yes      | API key from [resend.com/api-keys](https://resend.com/api-keys).                                                                             |
| `CONTACT_EMAIL`        | Yes      | Inbox that receives quote requests. Comma-separate multiple addresses.                                                                       |
| `CONTACT_FROM_EMAIL`   | No       | "From" address, e.g. `TerraLink Website <website@terralink.com.au>`. Must be on a domain verified in Resend. Defaults to `onboarding@resend.dev`. |
| `NEXT_PUBLIC_SITE_URL` | No       | Public URL used for canonical links, sitemap and Open Graph. Defaults to the `url` in `src/data/company.ts`.                                 |

**Testing locally without Resend:** if `RESEND_API_KEY` / `CONTACT_EMAIL` are missing in development, form submissions are validated and printed to the terminal instead of emailed, so you can test the form straight away. In production, missing keys return a friendly error asking the visitor to call or email.

**Resend setup:** create an account, add and verify your domain (DNS records), create an API key, then set `CONTACT_FROM_EMAIL` to an address on that domain. Until the domain is verified, Resend's test sender can only deliver to the email address on your Resend account.

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

## Deploying to Vercel

1. Push this repository to GitHub, GitLab or Bitbucket.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository. The Next.js preset is detected automatically – no build settings need changing.
3. Add the environment variables listed above (`RESEND_API_KEY`, `CONTACT_EMAIL`, and optionally `CONTACT_FROM_EMAIL`, `NEXT_PUBLIC_SITE_URL`).
4. Click **Deploy**.
5. Add your domain under Project → Settings → Domains and follow the DNS instructions.
6. After launch, submit `https://your-domain/sitemap.xml` in [Google Search Console](https://search.google.com/search-console) and link your Google Business Profile to the site.

Every push to the main branch redeploys automatically; other branches get preview URLs.

---

## Technical notes

- **Cache Components is disabled on purpose.** `create-next-app` enables `cacheComponents` by default in Next 16, but Ant Design evaluates `Date.now()` at module scope (e.g. its portal scroll-locker), which Cache Components rejects during prerendering. All pages are still fully static.
- **AntD SSR styles** are extracted with `@ant-design/nextjs-registry`, so there's no flash of unstyled components.
- **Contact form protection:** server-side zod validation, a hidden honeypot field, and a basic in-memory rate limit (5 requests / 10 minutes per IP, per server instance). For heavier spam, add a service such as Cloudflare Turnstile.
- **Accessibility & motion:** animations respect `prefers-reduced-motion`; the testimonials carousel pauses on hover/focus/touch.
- **SEO:** per-page metadata and Open Graph tags, canonical URLs, `sitemap.xml`, `robots.txt`, and JSON-LD for LocalBusiness, Service, FAQPage and BreadcrumbList.
