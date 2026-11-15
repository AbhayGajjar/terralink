/**
 * ============================================================================
 *  TERRALINK — COMPANY DETAILS (single source of truth)
 * ============================================================================
 *  Every contact detail, address, ABN and social link used across the site
 *  (header, footer, contact page, SEO metadata and JSON-LD schema) is read
 *  from this file. Update it once and the whole site updates.
 *
 *  Anything marked  // PLACEHOLDER  must be replaced with real TerraLink
 *  information before the site goes live.
 * ============================================================================
 */

export const company = {
  name: "TerraLink",
  legalName: "TerraLink Communications Pty Ltd", // PLACEHOLDER – registered business name
  tagline: "NBN & CCTV installation specialists across South Australia",
  description:
    "TerraLink is a South Australian telecommunications contractor specialising in NBN installation (FTTP, FTTN, FTTC and HFC) and professional CCTV and security camera systems for homes and businesses across Adelaide and regional SA.",

  // Production URL – used for canonical links, sitemap and Open Graph.
  // Can be overridden with the NEXT_PUBLIC_SITE_URL environment variable.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.terralink.com.au", // PLACEHOLDER – real domain

  phone: {
    display: "0492 829 677",
    href: "tel:+61492829677", // keep in sync with display
  },
  email: "hello@terralink.com.au", // PLACEHOLDER

  // Inbox that receives "Get a free quote" form submissions on the static (GitHub Pages) site,
  // delivered by FormSubmit (formsubmit.co).
  quoteEmail: "abhaymgajjar@gmail.com",

  address: {
    street: "26B Carol Drive",
    suburb: "Para Hills",
    state: "SA",
    postcode: "5096",
    country: "AU",
    // Approximate coordinates of the business (used in JSON-LD).
    geo: { latitude: -34.8066, longitude: 138.6619 },
  },

  abn: "00 000 000 000", // PLACEHOLDER – real ABN

  // Google Maps embed for the contact page.
  mapEmbedUrl:
    "https://www.google.com/maps?q=26B+Carol+Drive,+Para+Hills+SA+5096&output=embed",

  foundedYear: 2016, // PLACEHOLDER

  openingHours: [
    // PLACEHOLDER – real trading hours
    { days: "Monday – Friday", hours: "7:00am – 5:30pm", schema: { dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "17:30" } },
    { days: "Saturday, Sunday & public holidays", hours: "Closed", schema: null },
  ],

  serviceAreas: [
    // PLACEHOLDER – confirm the regions TerraLink actually covers
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

  // Remove any you don't use – icons only render for links that are set.
  social: {
    facebook: "https://www.facebook.com/", // PLACEHOLDER
    instagram: "https://www.instagram.com/", // PLACEHOLDER
    linkedin: "https://www.linkedin.com/", // PLACEHOLDER
    google: "https://www.google.com/maps", // PLACEHOLDER – Google Business Profile link
  },

  // Trust badges shown under the hero. PLACEHOLDER – only claim what's true.
  trustBadges: [
    { label: "NBN Accredited Technicians", icon: "safety" },
    { label: "Fully Insured", icon: "insured" },
    { label: "5-Star Rated", icon: "star" },
  ],

  rating: { value: 4.9, count: 120 }, // PLACEHOLDER – real Google review rating & count
} as const;

export type Company = typeof company;

export const fullAddress = `${company.address.street}, ${company.address.suburb} ${company.address.state} ${company.address.postcode}`;
