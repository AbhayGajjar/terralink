# TerraLink SEO checklist

What still needs real information from you, how to configure the deployment, and how to get the
site into Google and Bing. Work through it top to bottom.

> **Why some things are hidden:** anything that would be a claim about TerraLink (ratings, reviews,
> stats, licences, insurance, team, projects, ABN…) is **hidden from the site and from Google's
> structured data until you fill it in**. Publishing unverified claims risks Google penalties and
> breaches the Australian Consumer Law, so the site was built to fail safe.

---

## 1. Placeholders to replace

### `src/data/company.ts` (most important – feeds the header, footer, contact page and structured data)

| Field | What to put | Currently |
| --- | --- | --- |
| `legalName` | Registered business/company name exactly as on ABN Lookup | `""` (hidden) |
| `email` | Public contact email, ideally on your own domain | `""` (hidden) |
| `abn` | Your ABN, e.g. `"12 345 678 901"` | `""` (hidden) |
| `mapsUrl` | Your Google Business Profile **Share** link (used for "Get directions") | `""` (falls back to a maps search) |
| `address.geo` | Exact latitude/longitude of 26B Carol Drive from Google Maps (right-click → coordinates) | approximate |
| `mapEmbedUrl` | Google Maps → your business → Share → Embed a map → copy the `src` URL | address search |
| `foundedYear` | Year you started trading | `null` (hidden) |
| `priceRange` | `"$"`–`"$$$$"` or `""` | `"$$"` |
| `openingHours` | Must match your Google Business Profile exactly | Mon–Fri 7:00–5:30 |
| `serviceAreas` | The regions you actually cover | 12 regions – confirm |
| `nbnNetworkAuthorised` | `true` **only** if your technicians may work on nbn's own network (e.g. as an nbn delivery partner or subcontractor). Changes wording site-wide about who installs the lead-in, utility box and connection box. | `false` |
| `social.*` | Facebook, Instagram, LinkedIn and Google Business Profile URLs (also used as `sameAs` in structured data) | `""` (hidden) |
| `trustBadges[].verified` | Set `true` only for claims you can prove (registered cablers, insured). This also switches on the "Fully insured" feature card and the "registered and insured" home FAQ. | only "Local Adelaide team" |
| `rating` | Your real Google rating, e.g. `{ value: 4.9, count: 37, url: "…" }`. Shown on the site only; deliberately **not** added to structured data (Google ignores self-published review markup for local businesses). | `null` (hidden) |
| `quoteEmail` | Inbox that receives quote requests on the live site | `abhaymgajjar@gmail.com` |

**FormSubmit:** the first quote request sent to a new `quoteEmail` triggers an activation email from
formsubmit.co – click the link in it or no further requests will be delivered. Test the form after
every change of address.

### Other content files

| File | What to do |
| --- | --- |
| `src/data/home.ts` | Replace `stats` with real figures, then set `STATS_ARE_REAL = true`. Replace `testimonials` with genuine reviews (word-for-word, with permission), then set `TESTIMONIALS_ARE_REAL = true`. Confirm the promises in `features` (e.g. "no surprise call-out fees"). |
| `src/data/about.ts` | Replace `story` with your real story. Fill in `team` (names, roles, photos), then `TEAM_IS_REAL = true`. Add real registrations/licences/insurance to `certifications` with numbers and set each `verified: true`. |
| `src/data/projects.ts` | Replace with real completed jobs and photos (with customer permission), then `PROJECTS_ARE_REAL = true`. Then move `/projects` from `unlistedRoutes` into the sitemap list in `src/lib/routes.ts` and add it back to `mainNav` in `src/data/navigation.ts`. Until then `/projects` is `noindex`. |
| `src/data/areas.ts` | The three area pages (northern suburbs, eastern suburbs, Adelaide Hills) are **examples**. Confirm you service them and their suburb lists, and add local detail only your team knows (jobs you've done there, common issues). Add more areas only when each can have genuinely different content; near-duplicate suburb pages are treated as doorway pages. |
| `src/data/blog.ts` | Replace the "TerraLink team" author with a real, named technician and their experience if possible. |
| `src/lib/images.ts` | Every image is an Unsplash stock photo. Replace with real job photos in `public/images/` (≈1600px wide, WebP/JPG) with descriptive alt text, e.g. "TerraLink technician running data cable from an nbn connection box in a Salisbury home". Once none are left, remove the Unsplash `ReactDOM.preconnect` in `src/app/layout.tsx` and the `remotePatterns` entry in `next.config.ts`. |
| `src/components/layout/Logo.tsx`, `src/app/icon.svg`, `src/app/og/[image]/route.tsx` | Temporary logo, favicon and share-image mark – replace with the real logo. |
| `src/content/blog/*.md` | Read every article before publishing and adjust anything that doesn't match how you work. |

### Facts to verify before publishing (`VERIFY` notes)

nbn rules, speed tiers, timeframes and laws change. Each item below has a `<!-- VERIFY: … -->` or
`// VERIFY:` note next to it in the source (comments are stripped from the live pages). Check each
against the current nbn website and SA legislation, then delete the note.

- **nbn Fibre Connect (FTTP upgrade)** eligibility, cost, qualifying-plan rules, minimum-term conditions, rollout timing, multi-dwelling rules – `src/data/landing-pages.ts` (FTTP installation and FTTP upgrade pages), `src/data/services.ts` (FTTN page), `src/data/faqs.ts`, `src/content/blog/fttp-upgrade-explained-eligibility.md`, `src/content/blog/fttp-vs-fttn-vs-fttc-vs-hfc-adelaide.md`
- **Speed tiers** available on FTTP, HFC, FTTC and FTTN – `src/content/blog/fttp-vs-fttn-vs-fttc-vs-hfc-adelaide.md`
- **Installation appointment process** (one visit vs separate external/internal visits) – `src/data/services.ts` (FTTP), `src/data/landing-pages.ts` (upgrade), `src/content/blog/what-to-expect-fttp-installation-day.md`
- **New-development applications and fees** for single dwellings – `src/data/landing-pages.ts` (FTTP installation)
- **Surveillance Devices Act 2016 (SA)** summary – `src/data/services.ts` (CCTV), `src/data/landing-pages.ts` (CCTV), `src/data/faqs.ts`, `src/content/blog/choosing-home-security-camera-system.md`. Consider a quick review by a lawyer.

To list them all: `grep -rn "VERIFY" src`

---

## 2. Environment variables

The live site **https://www.terralink.net.au** is served by **GitHub Pages** (static export built by
`.github/workflows/pages.yml` on every push to `main`). Render is configured in `render.yaml` but
does **not** serve the domain.

### GitHub Pages (live site)

GitHub → repository **AbhayGajjar/terralink** → **Settings → Secrets and variables → Actions →
Variables** tab → **New repository variable**:

| Variable | Value | Required |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://www.terralink.net.au` (no trailing slash) | Recommended (defaults to the Pages URL) |
| `GOOGLE_SITE_VERIFICATION` | The `content` value from Search Console's HTML-tag method (see §3) | Only if you verify with the HTML tag |
| `BING_SITE_VERIFICATION` | The `content` value of Bing's `msvalidate.01` meta tag (see §4) | Only if you verify with the meta tag |
| `NEXT_PUBLIC_GA_ID` | GA4 measurement ID, e.g. `G-ABC123XYZ` | Optional – analytics load only if set |

After adding or changing a variable, re-run the workflow (**Actions → Deploy to GitHub Pages →
Run workflow**) so the site is rebuilt with it.

### Render (only if you move hosting there)

Render dashboard → the **terralink** service → **Environment**: set the same four variables above,
plus `RESEND_API_KEY`, `CONTACT_EMAIL` and optionally `CONTACT_FROM_EMAIL` for the server-side quote
form. On Render, old URLs get real 308 redirects (see `next.config.ts`) and images are optimised by
Next.js. If you switch, point the domain's DNS at Render and **disable the GitHub Pages workflow** so
two copies of the site aren't live.

### Local development

Copy `.env.example` to `.env.local` and fill in the values you need.

---

## 3. Google Search Console

1. Go to <https://search.google.com/search-console> and sign in with the Google account that will own the site.
2. **Add property**. Choose one:
   - **Domain** (recommended – covers `www`, non-`www`, `http` and `https`): enter `terralink.net.au`, copy the **TXT record**, add it in your domain registrar's DNS settings, wait a few minutes, click **Verify**. No env var needed.
   - **URL prefix**: enter `https://www.terralink.net.au/`, choose **HTML tag**, copy only the `content="…"` value, set it as `GOOGLE_SITE_VERIFICATION` (§2), re-run the deploy, then click **Verify**.
3. **Submit the sitemap:** left menu **Sitemaps** → enter `sitemap.xml` (full URL `https://www.terralink.net.au/sitemap.xml`) → **Submit**. Status should become "Success" with about 28 URLs discovered.
4. **Request indexing** for the key pages: paste each URL into the **URL inspection** bar at the top → **Request indexing**:
   - `https://www.terralink.net.au/`
   - `https://www.terralink.net.au/nbn-installation-adelaide/`
   - `https://www.terralink.net.au/fttp-installation-adelaide/`
   - `https://www.terralink.net.au/fttp-upgrade-adelaide/`
   - `https://www.terralink.net.au/cctv-installation-adelaide/`
   - `https://www.terralink.net.au/services/`
5. Over the next 2–4 weeks check **Pages** (indexing), **Enhancements** (FAQ, Breadcrumbs), **Core Web Vitals** and **Performance → Search results** (queries you appear for).
6. Link Search Console to your Google Business Profile and GA4 property if you use them.

## 4. Bing Webmaster Tools (Bing also powers Yahoo and much of DuckDuckGo)

1. Go to <https://www.bing.com/webmasters> and sign in.
2. Easiest: **Import from Google Search Console** – this verifies the site and imports the sitemap in one step.
3. Or **Add your site manually**: enter `https://www.terralink.net.au/`, then verify with one of:
   - **Meta tag:** copy the `content` value of `<meta name="msvalidate.01" …>`, set it as `BING_SITE_VERIFICATION` (§2), re-run the deploy, click **Verify**; or
   - **DNS CNAME** record as shown by Bing.
4. **Sitemaps** → **Submit sitemap** → `https://www.terralink.net.au/sitemap.xml`.
5. Optional: **URL Submission** for the key pages listed in §3.

## 5. Google Business Profile (biggest lever for "near me" and map-pack rankings)

- Name, address and phone must match the website **exactly**: **TerraLink**, **26B Carol Drive, Para Hills SA 5096**, **0492 829 677**.
- Website link: `https://www.terralink.net.au/`. Add the "Get a quote" link as the appointment URL: `https://www.terralink.net.au/contact/`.
- Choose accurate categories and list your services and service areas.
- Ask happy customers for reviews. Once you have them, set `company.rating` in `company.ts` and add real quotes to the testimonials (§1).
- Post photos of real jobs regularly.

## 6. Ongoing checks

- `npm run build && npm run seo:check` after content changes: checks titles (≤60), descriptions (≤155), one H1 per page, canonicals, share images, JSON-LD, broken internal links and click depth.
- `npm run lint` before committing.
- Validate structured data occasionally at <https://search.google.com/test/rich-results> and <https://validator.schema.org>.
- Re-run Lighthouse (Chrome DevTools → Lighthouse → Mobile) on the home page and a service page after big design changes.
- Update `SITE_CONTENT_UPDATED` in `src/lib/site.ts` when you change page copy, and `updated:` in a blog post's frontmatter when you revise it (drives the sitemap's `lastmod`).
- **Never delete entries in `src/data/redirects.ts`** – they keep old links working.

## 7. Things to know

- **Landing pages vs service pages:** `/fttp-installation-adelaide` and `/services/fttp-installation-adelaide` (same for CCTV) target related searches with different intent: the landing page answers "how do I get this done in Adelaide", the service page details what TerraLink's service includes. Keep their content distinct. If Search Console shows them competing for the same query, consider merging one into the other with a redirect.
- **Old URLs** (`/services/fttp-installation`, `/services/fttn-installation`, `/services/fttc-hfc`, `/services/cctv-installation`) now forward to the new URLs. On GitHub Pages this is an instant meta-refresh page with a canonical tag (GitHub Pages can't send real 301s); Google treats it as a permanent redirect.
- **Next.js security notice:** the build prints a security advisory for Next.js 16.4.3 (fixed in 16.4.6; it affects `'use cache'`, which this site doesn't use). Upgrading is still recommended.
