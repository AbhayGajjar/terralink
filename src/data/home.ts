import type { IconName } from "@/components/ui/Icon";

/** "Why choose TerraLink" feature points */
export const features: { title: string; description: string; icon: IconName }[] = [
  {
    title: "Experienced technicians",
    description: "Our team has completed thousands of NBN and security installs across SA – we've seen (and solved) it all.",
    icon: "tool",
  },
  {
    title: "Fully insured",
    description: "Public liability and professional indemnity cover on every job, so you're protected from start to finish.",
    icon: "insured",
  },
  {
    title: "Fast turnaround",
    description: "Quick quotes, flexible booking windows and technicians who turn up when they say they will.",
    icon: "clock",
  },
  {
    title: "Clean & tidy work",
    description: "Concealed cabling, sealed penetrations and a spotless site. We treat your property like our own.",
    icon: "sparkle",
  },
  {
    title: "Transparent pricing",
    description: "Clear, fixed-price quotes up front. No surprise call-out fees or hidden extras on the invoice.",
    icon: "dollar",
  },
  {
    title: "Local SA team",
    description: "Proudly South Australian. We know Adelaide's suburbs, housing stock and network quirks inside out.",
    icon: "location",
  },
];

/**
 * PLACEHOLDER STATS – replace with real figures, then set STATS_ARE_REAL to true.
 * While false, the stats strip (home) and mini stats (about) are hidden so nothing unverified is published.
 */
export const STATS_ARE_REAL = false;

export const stats: { value: number; decimals?: number; suffix?: string; label: string; icon: IconName }[] = [
  { value: 2500, suffix: "+", label: "Installations completed", icon: "checkCircle" },
  { value: 10, suffix: "+", label: "Years of experience", icon: "trophy" },
  { value: 150, suffix: "+", label: "Suburbs covered", icon: "location" },
  { value: 4.9, decimals: 1, suffix: "/5", label: "Average customer rating", icon: "star" },
];

export const processSteps: { title: string; description: string; icon: IconName }[] = [
  {
    title: "Request a quote",
    description: "Tell us what you need online or over the phone. We'll respond within one business day.",
    icon: "form",
  },
  {
    title: "Site assessment",
    description: "We confirm your connection type or security needs and recommend the right solution.",
    icon: "survey",
  },
  {
    title: "Professional install",
    description: "Our technicians arrive on time, complete the work neatly and keep you updated throughout.",
    icon: "tool",
  },
  {
    title: "Test & handover",
    description: "Everything is tested and explained, and the site is left clean. Support is just a call away.",
    icon: "checkCircle",
  },
];

export interface NbnTechnology {
  key: string;
  name: string;
  fullName: string;
  summary: string;
  howItWorks: string;
  bestFor: string;
  speed: { label: string; score: number };
  reliability: { label: string; score: number };
  equipment: string[];
  serviceSlug: string;
}

/** Plain-language NBN technology explainer */
export const nbnTechnologies: NbnTechnology[] = [
  {
    key: "fttp",
    name: "FTTP",
    fullName: "Fibre to the Premises",
    summary: "Fibre optic cable runs all the way from the street into your home or business. It's the gold standard of NBN connections.",
    howItWorks:
      "Light travels through a glass fibre directly to a utility box on your outside wall, then to an NBN connection box inside. There's no copper anywhere in the path.",
    bestFor: "Households and businesses wanting the fastest speeds, heavy streaming, gaming and working from home.",
    speed: { label: "Fastest", score: 100 },
    reliability: { label: "Excellent", score: 96 },
    equipment: ["Premises Connection Device (outside)", "NBN connection box (inside)", "Your router"],
    serviceSlug: "fttp-installation-adelaide",
  },
  {
    key: "fttn",
    name: "FTTN",
    fullName: "Fibre to the Node",
    summary: "Fibre runs to a cabinet (the 'node') in your street, then your existing copper phone line covers the last stretch.",
    howItWorks:
      "Your speed depends on how far you are from the node and the condition of the copper – including the wiring inside your home, which we can fix.",
    bestFor: "Everyday browsing and streaming. Many FTTN addresses are now eligible to upgrade to full fibre.",
    speed: { label: "Variable", score: 52 },
    reliability: { label: "Good", score: 64 },
    equipment: ["Phone wall socket", "VDSL2-compatible modem/router"],
    serviceSlug: "fttn-installation-adelaide",
  },
  {
    key: "fttc",
    name: "FTTC",
    fullName: "Fibre to the Curb",
    summary: "Fibre comes to a small pit on the kerb outside your property, with a short copper run to your home.",
    howItWorks:
      "Because the copper run is short, FTTC is faster and more stable than FTTN. An NBN connection device inside plugs into your phone socket and power.",
    bestFor: "Families and home offices needing strong, consistent performance.",
    speed: { label: "Fast", score: 78 },
    reliability: { label: "Very good", score: 82 },
    equipment: ["NBN connection device (inside)", "Phone wall socket", "Your router"],
    serviceSlug: "fttc-hfc-installation-adelaide",
  },
  {
    key: "hfc",
    name: "HFC",
    fullName: "Hybrid Fibre Coaxial",
    summary: "Uses the coaxial 'pay TV' cable network for the final connection, with fibre further back in the network.",
    howItWorks:
      "A coaxial cable runs from the street to a wall outlet and an NBN connection box inside your home. HFC supports high speeds when the in-home set-up is right.",
    bestFor: "Busy households wanting fast speeds without a fibre upgrade.",
    speed: { label: "Fast", score: 84 },
    reliability: { label: "Very good", score: 80 },
    equipment: ["Coaxial wall outlet", "NBN connection box (inside)", "Your router"],
    serviceSlug: "fttc-hfc-installation-adelaide",
  },
];

/**
 * PLACEHOLDER TESTIMONIALS – replace with genuine customer reviews (copied word-for-word, with permission),
 * then set TESTIMONIALS_ARE_REAL to true. While false, the reviews section is hidden.
 */
export const TESTIMONIALS_ARE_REAL = false;

export const testimonials: { name: string; location: string; service: string; rating: number; quote: string }[] = [
  {
    name: "Sarah M.",
    location: "Mawson Lakes",
    service: "FTTP Installation",
    rating: 5,
    quote:
      "The technician explained everything, put the NBN box exactly where I wanted it and left the place spotless. Our internet has never been faster.",
  },
  {
    name: "David K.",
    location: "Norwood",
    service: "CCTV Installation",
    rating: 5,
    quote:
      "TerraLink designed a six-camera system for our home. The picture quality at night is incredible and the phone app is so easy to use.",
  },
  {
    name: "Priya S.",
    location: "Glenelg",
    service: "FTTN Re-wiring",
    rating: 5,
    quote:
      "We had constant drop-outs for months. TerraLink found old wiring causing the problem and fixed it in an afternoon. Rock-solid ever since.",
  },
  {
    name: "Mark T.",
    location: "Mount Barker",
    service: "Commercial CCTV",
    rating: 5,
    quote:
      "Professional from quote to handover. Cabling was hidden perfectly in our warehouse and the team trained all our staff on the system.",
  },
  {
    name: "Emma L.",
    location: "Golden Grove",
    service: "HFC Relocation",
    rating: 5,
    quote:
      "Moved our HFC connection to the study so the Wi-Fi finally reaches the whole house. Fair price, on time and super friendly.",
  },
  {
    name: "James R.",
    location: "Henley Beach",
    service: "FTTP Upgrade",
    rating: 5,
    quote:
      "Upgraded from FTTN to full fibre. The crew were tidy, quick and kept me updated the whole way. Highly recommend TerraLink.",
  },
];

/** General FAQs shown on the home page */
export const homeFaqs: { question: string; answer: string }[] = [
  {
    question: "Which areas of South Australia do you service?",
    answer:
      "We cover all of metropolitan Adelaide plus the Adelaide Hills, Barossa, Gawler, Fleurieu Peninsula and surrounding regions. Contact us if you're further afield – we regularly travel for larger jobs.",
  },
  {
    question: "Do you work directly for NBN Co?",
    answer:
      "TerraLink works with NBN delivery partners and directly with homeowners, builders and businesses. We can complete installation, relocation and in-premises wiring work – your internet plan itself is arranged through your chosen provider.",
  },
  {
    question: "How quickly can you book in a job?",
    answer:
      "Most quotes are returned within one business day and we can usually schedule installations within the same week, depending on the work required.",
  },
  {
    question: "Are your technicians licensed and insured?",
    answer:
      "Yes. Our technicians hold the relevant cabling registrations and training for the work they perform, and TerraLink carries full public liability insurance.",
  },
  {
    question: "Do you offer fixed-price quotes?",
    answer:
      "Yes. After understanding your requirements we provide a clear, itemised quote up front. If anything unexpected comes up on site, we'll talk to you before doing any extra work.",
  },
  {
    question: "Can you install CCTV at my business as well as my home?",
    answer:
      "Absolutely. We design and install systems for homes, shops, offices, warehouses and worksites, and can integrate with your existing network.",
  },
];
