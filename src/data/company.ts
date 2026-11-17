/**
 * ============================================================================
 *  TERRALINK — COMPANY DETAILS (single source of truth)
 * ============================================================================
 *  Every contact detail, address, ABN and social link used across the site
 *  (header, footer, contact page, SEO metadata and JSON-LD schema) is read
 *  from this file. Update it once and the whole site updates.
 *
 *  Anything marked  // PLACEHOLDER  must be replaced with real TerraLink
 *  information. Fields set to "" / null / false are hidden from the site and
 *  from Google's structured data until you fill them in — this is deliberate,
 *  so nothing unverified is ever published. See SEO-CHECKLIST.md.
 * ============================================================================
 */

export const company = {
  name: "TerraLink",
  // PLACEHOLDER – exact registered business/company name (as on ABN Lookup). "" hides it.
  legalName: "",
  tagline: "NBN & CCTV installation specialists in Adelaide",
  description:
    "TerraLink is an Adelaide telecommunications contractor installing and cabling nbn connections (FTTP, FTTN, FTTC and HFC) and CCTV security camera systems for homes and businesses across Adelaide and surrounding areas.",

  // Production URL – used for canonical links, sitemap and Open Graph.
  // Overridden by the NEXT_PUBLIC_SITE_URL environment variable when it is set.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.terralink.net.au",

  phone: {
    display: "0492 829 677",
    href: "tel:+61492829677", // keep in sync with display
  },
  // PLACEHOLDER – public contact email on your own domain. "" hides it.
  email: "",

  // Inbox that receives "Get a free quote" form submissions on the static (GitHub Pages) site,
  // delivered by FormSubmit (formsubmit.co).
  quoteEmail: "abhaymgajjar@gmail.com",

  address: {
    street: "26B Carol Drive",
    suburb: "Para Hills",
    state: "SA",
    postcode: "5096",
    country: "AU",
    // Approximate coordinates of the business (used in JSON-LD). PLACEHOLDER – confirm from Google Maps.
    geo: { latitude: -34.8066, longitude: 138.6619 },
  },

  // PLACEHOLDER – real ABN, e.g. "12 345 678 901". "" hides it.
  abn: "",

  // Google Maps embed for the contact page.
  mapEmbedUrl: "https://www.google.com/maps?q=26B+Carol+Drive,+Para+Hills+SA+5096&output=embed",
  // PLACEHOLDER – your Google Business Profile "share" link (used for the "Get directions" button). "" falls back to a maps search.
  mapsUrl: "",

  // Rough price level for structured data ("$" to "$$$$"). PLACEHOLDER – confirm or set to "".
  priceRange: "$$",

  // PLACEHOLDER – year TerraLink started trading. null hides "Since …" and foundingDate.
  foundedYear: null as number | null,

  openingHours: [
    // PLACEHOLDER – confirm trading hours (must match your Google Business Profile)
    { days: "Monday – Friday", hours: "7:00am – 5:30pm", schema: { dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "17:30" } },
    { days: "Saturday, Sunday & public holidays", hours: "Closed", schema: null },
  ],

  /**
   * Regions you serve. Used for areaServed in structured data and the footer.
   * PLACEHOLDER – confirm the regions TerraLink actually covers. Only the regions that also
   * have an entry in src/data/areas.ts get their own landing page.
   */
  serviceAreas: [
    "Adelaide CBD",
    "Northern Suburbs",
    "Southern Suburbs",
    "Eastern Suburbs",
    "Western Suburbs",
    "Adelaide Hills",
    "Barossa Valley",
    "Gawler",
    "Mount Barker",
    "Fleurieu Peninsula",
    "Murray Bridge",
    "Port Adelaide",
  ],

  /**
   * IMPORTANT (honesty / Australian Consumer Law):
   * Set to true ONLY if TerraLink's technicians are authorised to work on the nbn network itself
   * (e.g. as an nbn delivery partner or its subcontractor). It changes wording across the site
   * about who installs the network-side equipment (lead-in, utility box, connection box).
   * PLACEHOLDER – confirm.
   */
  nbnNetworkAuthorised: false,

  // Social profile URLs. "" hides the icon and removes it from structured data. PLACEHOLDER
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    google: "", // Google Business Profile link
  },

  /**
   * Trust badges shown under the hero. Each one only renders when `verified` is true.
   * PLACEHOLDER – set verified: true only for claims you can back up.
   */
  trustBadges: [
    { label: "Registered cablers", icon: "safety", verified: false },
    { label: "Fully insured", icon: "insured", verified: false },
    { label: "Local Adelaide team", icon: "location", verified: true },
  ] as const,

  /**
   * Your real Google review rating. Leave null until you have it — when set, it shows on the
   * site. It is NOT added to structured data: Google ignores self-published review markup on
   * LocalBusiness pages, and showing a rating you can't back up breaches consumer law.
   * PLACEHOLDER – e.g. { value: 4.9, count: 37, url: "https://g.page/r/..." }
   */
  rating: null as { value: number; count: number; url: string } | null,
};

export type Company = typeof company;

export const fullAddress = `${company.address.street}, ${company.address.suburb} ${company.address.state} ${company.address.postcode}`;

/** Link that opens the business in Google Maps */
export const mapsLink =
  company.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${company.name}, ${fullAddress}`)}`;
