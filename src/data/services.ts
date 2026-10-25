import type { IconName } from "@/components/ui/Icon";
import { images, type SiteImage } from "@/lib/images";

export type ServiceCategory = "nbn" | "cctv";

export interface Service {
  slug: string;
  title: string;
  /** Short name for nav, footer and cards */
  shortTitle: string;
  category: ServiceCategory;
  icon: IconName;
  tagline: string;
  /** One or two sentences for service cards */
  excerpt: string;
  description: string[];
  image: SiteImage;
  included: string[];
  benefits: { title: string; description: string; icon: IconName }[];
  process: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  seo: { title: string; description: string; keywords: string[] };
}

/**
 * Service content. Copy is written to be accurate but generic – review it with
 * the TerraLink team and adjust inclusions/pricing language to match how you work.
 */
export const services: Service[] = [
  {
    slug: "fttp-installation",
    title: "FTTP Installation",
    shortTitle: "FTTP Installation",
    category: "nbn",
    icon: "fibre",
    tagline: "Full fibre to your door – the fastest, most future-proof NBN connection.",
    excerpt:
      "End-to-end Fibre to the Premises installs – lead-in, utility box and NBN connection box – fitted neatly and tested before we leave.",
    description: [
      "Fibre to the Premises (FTTP) runs optical fibre all the way from the street to your home or business. It's the fastest and most reliable NBN technology available, supporting the top speed tiers today and whatever comes next.",
      "TerraLink's technicians handle the whole installation: running the fibre lead-in from the pit or pole, mounting the Premises Connection Device (utility box) on the outside wall, and installing the NBN connection box inside where it suits your layout – not just where it's quickest for us.",
      "Whether it's a new build, an upgrade from FTTN or a commercial site, we plan the cable route with you, keep the work tidy and test the service end to end so you're ready to connect with your provider.",
    ],
    image: images.fibreStrands,
    included: [
      "Pre-install site survey and cable route planning",
      "Fibre lead-in from the street pit or pole",
      "Premises Connection Device (utility box) mounted outside",
      "NBN connection box installed inside at your preferred location",
      "Conduit, cable clips and wall penetrations sealed and weatherproofed",
      "Optical signal testing and service activation checks",
      "Clean-up of all off-cuts and packaging",
      "Advice on router placement for the best Wi-Fi coverage",
    ],
    benefits: [
      { title: "Top-tier speeds", description: "Supports the fastest NBN plans available, including gigabit tiers.", icon: "rocket" },
      { title: "Rock-solid reliability", description: "Fibre isn't affected by distance or copper degradation like older technologies.", icon: "shield" },
      { title: "Adds property value", description: "Full-fibre homes are increasingly sought after by buyers and tenants.", icon: "home" },
      { title: "Future-proof", description: "Fibre has the headroom to handle tomorrow's streaming, gaming and work-from-home demands.", icon: "bolt" },
    ],
    process: [
      { title: "Book & survey", description: "We confirm eligibility, check access and agree on the cable route and equipment locations." },
      { title: "Lead-in installed", description: "Fibre is run from the street to your property using existing conduit or new trenching where needed." },
      { title: "Equipment fitted", description: "The utility box and NBN connection box are mounted, connected and neatly finished." },
      { title: "Test & handover", description: "We test the optical signal, confirm the service is live and walk you through the set-up." },
    ],
    faqs: [
      {
        question: "How long does an FTTP installation take?",
        answer:
          "Most residential FTTP installs are completed in two to four hours. If new conduit or trenching is required, we'll let you know in advance and plan the extra time.",
      },
      {
        question: "Can I choose where the NBN connection box goes?",
        answer:
          "Yes. We'll work with you to place it near where you want your router – usually a central spot with a nearby power point – within the limits of the cable route.",
      },
      {
        question: "Do I need to be home during the install?",
        answer:
          "Someone over 18 needs to be on site to give access to the inside of the property and confirm the equipment locations.",
      },
      {
        question: "I'm on FTTN – can I upgrade to FTTP?",
        answer:
          "Many FTTN premises are now eligible for a fibre upgrade. Check eligibility with your internet provider, then we can complete the installation work.",
      },
    ],
    seo: {
      title: "FTTP NBN Installation Adelaide",
      description:
        "Professional FTTP NBN installation across Adelaide and South Australia. Fibre lead-in, utility box and NBN connection box installed neatly by experienced, fully insured technicians.",
      keywords: ["FTTP installation Adelaide", "NBN fibre installation", "FTTP upgrade SA", "NBN installer Adelaide"],
    },
  },
  {
    slug: "fttn-installation",
    title: "FTTN Installation",
    shortTitle: "FTTN Installation",
    category: "nbn",
    icon: "node",
    tagline: "Get the most out of your copper line with a clean, correctly wired FTTN connection.",
    excerpt:
      "Fibre to the Node connections, internal re-wiring and wall socket fixes that remove the faults slowing your NBN down.",
    description: [
      "With Fibre to the Node (FTTN), fibre runs to a cabinet in your street and the existing copper phone line covers the final stretch to your premises. The quality of that copper – especially the wiring inside your home – has a big impact on your speeds and stability.",
      "TerraLink installs and tidies FTTN connections properly: identifying the correct main socket, removing old extension wiring and filters that cause interference, and installing a dedicated, clean line to where your modem lives.",
      "If you're experiencing drop-outs or speeds well below your plan, our technicians can diagnose in-premises wiring issues and fix them, giving your connection the best possible chance to perform.",
    ],
    image: images.patchPanelBlue,
    included: [
      "Identification of the main telephone socket (first point of entry)",
      "Installation or relocation of the primary wall socket",
      "Removal of redundant extension sockets and old wiring",
      "Isolation of alarm or legacy phone wiring where required",
      "Line testing for noise, faults and sync speed",
      "Modem placement and connection check",
      "Tidy cable runs with clips, ducting and sealed penetrations",
    ],
    benefits: [
      { title: "Better speeds", description: "Clean internal wiring helps your line sync at the best speed it's capable of.", icon: "dashboard" },
      { title: "Fewer drop-outs", description: "Removing faulty extension wiring and old sockets reduces interference and line noise.", icon: "wifi" },
      { title: "Fault diagnosis", description: "We test and pinpoint in-home wiring problems so you're not stuck going back and forth with your provider.", icon: "search" },
      { title: "Upgrade-ready", description: "We'll advise if your address is eligible for an upgrade to full fibre.", icon: "fibre" },
    ],
    process: [
      { title: "Assess the line", description: "We test your existing copper line and trace the internal wiring back to the main socket." },
      { title: "Plan the fix", description: "We explain what's causing issues and agree on socket locations and any re-wiring." },
      { title: "Re-wire & install", description: "Old wiring is isolated or removed and a clean, dedicated line is installed to your modem location." },
      { title: "Test & verify", description: "We confirm line sync and stability, then show you everything before we leave." },
    ],
    faqs: [
      {
        question: "Why is my FTTN connection slower than my plan?",
        answer:
          "FTTN speeds depend on the distance to the node and the condition of the copper. Faulty extension sockets and old internal wiring are common culprits – these are the things we can fix.",
      },
      {
        question: "Can you move my NBN wall socket to another room?",
        answer:
          "Yes. We can relocate or install a new primary socket so your modem can sit in a better spot for Wi-Fi coverage.",
      },
      {
        question: "Will removing old phone sockets affect my landline?",
        answer:
          "On the NBN, home phone services run through your modem, so old extension sockets aren't needed. We'll confirm your set-up before removing anything.",
      },
      {
        question: "Is FTTN being replaced with fibre?",
        answer:
          "Many FTTN areas are eligible for a full-fibre upgrade. We can help you understand the process and complete the FTTP installation work.",
      },
    ],
    seo: {
      title: "FTTN NBN Installation & Wiring Adelaide",
      description:
        "FTTN NBN installation, socket relocation and internal re-wiring in Adelaide. Fix drop-outs and slow speeds with TerraLink's experienced NBN technicians.",
      keywords: ["FTTN installation Adelaide", "NBN wall socket relocation", "NBN wiring fix Adelaide", "FTTN technician SA"],
    },
  },
  {
    slug: "fttc-hfc",
    title: "FTTC & HFC Installation",
    shortTitle: "FTTC & HFC",
    category: "nbn",
    icon: "cable",
    tagline: "Expert installs for Fibre to the Curb and Hybrid Fibre Coaxial connections.",
    excerpt:
      "FTTC and HFC connections installed, relocated and tested – including connection devices, wall outlets and lead-in repairs.",
    description: [
      "Fibre to the Curb (FTTC) brings fibre to a small distribution point in the pit outside your property, with a short copper run to your home. Hybrid Fibre Coaxial (HFC) uses the coaxial 'pay TV' cable network for the final connection to your premises.",
      "Both technologies depend on getting the in-home set-up right. For FTTC, that means the correct wall socket and a properly installed NBN connection device. For HFC, it means a quality coaxial lead-in, wall outlet and NBN connection box placed where it works for you.",
      "TerraLink's technicians install, relocate and repair FTTC and HFC connections for homes and businesses – with neat workmanship and full testing to make sure your service performs as it should.",
    ],
    image: images.networkRack,
    included: [
      "FTTC: connection of the NBN connection device to the correct wall socket",
      "FTTC: socket installation, relocation and internal line re-wiring",
      "HFC: coaxial wall outlet installation or relocation",
      "HFC: NBN connection box mounting and power set-up",
      "Lead-in inspection and repair or replacement where needed",
      "Signal and line testing to confirm stable performance",
      "Neat cable management and sealed wall penetrations",
    ],
    benefits: [
      { title: "Right first time", description: "Correct socket and device set-up avoids the most common FTTC and HFC faults.", icon: "checkCircle" },
      { title: "Flexible placement", description: "Relocate your connection to a better room for coverage and convenience.", icon: "home" },
      { title: "Stable signal", description: "We test signal levels so your connection is stable at peak times.", icon: "dashboard" },
      { title: "Tidy workmanship", description: "Cables are concealed or neatly clipped – no messy runs across walls.", icon: "sparkle" },
    ],
    process: [
      { title: "Identify technology", description: "We confirm whether your premises is FTTC or HFC and review your current set-up." },
      { title: "Plan placement", description: "Together we choose the best location for your connection device and router." },
      { title: "Install or relocate", description: "Outlets, cabling and connection devices are installed with tidy, durable workmanship." },
      { title: "Test & confirm", description: "Signal levels and sync are tested, and we confirm the service is ready to use." },
    ],
    faqs: [
      {
        question: "How do I know if I have FTTC or HFC?",
        answer:
          "Your internet provider can confirm your connection type, or you can check your address on the NBN website. We can also identify it on site.",
      },
      {
        question: "Does the FTTC connection device need power?",
        answer:
          "Yes – the FTTC NBN connection device plugs into a power point, and it also sends power back to the distribution point in the street via the phone line. Keeping it switched on is important.",
      },
      {
        question: "Can you move my HFC NBN box to another room?",
        answer:
          "Yes. We can run a new coaxial cable and outlet to a different location and relocate the connection box so your router sits where you need it.",
      },
      {
        question: "My HFC connection keeps dropping out – can you help?",
        answer:
          "Drop-outs are often caused by damaged lead-ins, old splitters or poor-quality coaxial cable. We'll test the line and fix any in-premises issues we find.",
      },
    ],
    seo: {
      title: "FTTC & HFC NBN Installation Adelaide",
      description:
        "FTTC and HFC NBN installation, relocation and repairs across Adelaide and SA. Neat workmanship, full signal testing and experienced local technicians.",
      keywords: ["FTTC installation Adelaide", "HFC NBN installation", "NBN box relocation Adelaide", "NBN technician Adelaide"],
    },
  },
  {
    slug: "cctv-installation",
    title: "CCTV & Security Camera Installation",
    shortTitle: "CCTV & Security Cameras",
    category: "cctv",
    icon: "camera",
    tagline: "Crystal-clear security cameras for homes and businesses – view them from anywhere.",
    excerpt:
      "Custom-designed CCTV systems with HD and 4K cameras, night vision and phone app viewing – professionally installed and configured.",
    description: [
      "A well-designed CCTV system deters intruders, gives you peace of mind while you're away and provides clear footage if something does happen. TerraLink designs and installs security camera systems for homes, small businesses, retail, offices and worksites across South Australia.",
      "We start with a site assessment to understand what you want to protect, then recommend the right cameras, positions and recording set-up. Our installs use quality IP cameras with HD or 4K resolution, infrared night vision and smart motion detection.",
      "Every system is configured for remote viewing on your phone, tablet or computer, and we show you how to use it before we leave. Cables are concealed wherever possible for a clean, professional finish.",
    ],
    image: images.cctvPole,
    included: [
      "On-site security assessment and camera placement plan",
      "HD and 4K IP cameras (bullet, dome and turret options)",
      "Network video recorder (NVR) with hard drive storage",
      "Concealed cabling with PoE (power over ethernet)",
      "Infrared night vision and smart motion detection set-up",
      "Remote viewing app configured on your devices",
      "Handover training on playback, exporting footage and alerts",
      "Ongoing support and system health checks",
    ],
    benefits: [
      { title: "Deter crime", description: "Visible, well-placed cameras are a proven deterrent for break-ins and theft.", icon: "shield" },
      { title: "View from anywhere", description: "Check live and recorded footage on your phone, wherever you are.", icon: "mobile" },
      { title: "Clear day & night", description: "High-resolution sensors and infrared night vision capture usable detail 24/7.", icon: "eye" },
      { title: "Smart alerts", description: "Get notified about people and vehicle movement – without constant false alarms.", icon: "bolt" },
    ],
    process: [
      { title: "Security assessment", description: "We walk your property, identify entry points and blind spots and discuss your goals." },
      { title: "Tailored design & quote", description: "You receive a clear camera plan and fixed-price quote – no hidden extras." },
      { title: "Professional install", description: "Cameras, cabling and recorder are installed with concealed, weatherproof workmanship." },
      { title: "Set-up & training", description: "We configure apps, alerts and recording, then show you how to use everything." },
    ],
    faqs: [
      {
        question: "How many cameras do I need?",
        answer:
          "Most homes need between four and eight cameras to cover entry points, driveways and yards. We'll recommend the right number after assessing your property.",
      },
      {
        question: "Can I watch my cameras on my phone?",
        answer:
          "Yes. Every system we install is set up for remote viewing via a mobile app, so you can check live and recorded footage from anywhere with an internet connection.",
      },
      {
        question: "How long is footage stored?",
        answer:
          "It depends on the number of cameras, resolution and hard drive size. A typical home system stores around two to four weeks of footage before older recordings are overwritten.",
      },
      {
        question: "Are there rules about where I can point cameras?",
        answer:
          "Yes – you should avoid recording areas where people expect privacy, such as neighbours' yards. We'll position cameras to protect your property while respecting privacy laws in South Australia.",
      },
    ],
    seo: {
      title: "CCTV & Security Camera Installation Adelaide",
      description:
        "CCTV and security camera installation in Adelaide for homes and businesses. HD and 4K cameras, night vision and phone app viewing, professionally installed by TerraLink.",
      keywords: ["CCTV installation Adelaide", "security camera installation Adelaide", "home CCTV SA", "business security cameras Adelaide"],
    },
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getRelatedServices(slug: string, limit = 3) {
  return services.filter((service) => service.slug !== slug).slice(0, limit);
}
