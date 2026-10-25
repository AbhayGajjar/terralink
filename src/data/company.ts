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
    display: "08 7010 1234", // PLACEHOLDER – reserved fictional number
    href: "tel:+61870101234", // PLACEHOLDER – keep in sync with display
  },
  email: "hello@terralink.com.au", // PLACEHOLDER

  address: {
    street: "Unit 1, 100 Example Road", // PLACEHOLDER
    suburb: "Adelaide", // PLACEHOLDER
    state: "SA",
    postcode: "5000", // PLACEHOLDER
    country: "AU",
    // Approximate coordinates of the business (used in JSON-LD). PLACEHOLDER
    geo: { latitude: -34.9285, longitude: 138.6007 },
  },

  abn: "00 000 000 000", // PLACEHOLDER – real ABN

  // Google Maps embed for the contact page. Replace with the "Embed a map"
  // URL from Google Maps for the real business address. PLACEHOLDER
  mapEmbedUrl:
    "https://www.google.com/maps?q=Adelaide+SA+5000&output=embed",

  foundedYear: 2016, // PLACEHOLDER

  openingHours: [
    // PLACEHOLDER – real trading hours
    { days: "Monday – Friday", hours: "7:00am – 5:30pm", schema: { dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "17:30" } },
    { days: "Saturday", hours: "8:00am – 1:00pm", schema: { dayOfWeek: ["Saturday"], opens: "08:00", closes: "13:00" } },
    { days: "Sunday & public holidays", hours: "Closed", schema: null },
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
