import { company } from "@/data/company";

/**
 * FAQ hub (/faq). Answers are plain text (they're also used in FAQPage structured data).
 * `links` adds "Read more" links under an answer for internal linking.
 * Lines marked VERIFY describe nbn rules, timeframes or law that change; check before publishing.
 */
export interface FaqEntry {
  question: string;
  answer: string;
  links?: { href: string; label: string }[];
}

export interface FaqGroup {
  /** Anchor id, e.g. /faq#cctv-law */
  id: string;
  title: string;
  items: FaqEntry[];
}

export const faqGroups: FaqGroup[] = [
  {
    id: "nbn-technology",
    title: "nbn technology",
    items: [
      {
        question: "What is the difference between FTTP and FTTN?",
        answer:
          "With FTTP (Fibre to the Premises), fibre runs all the way into your home, so speed isn't limited by distance and the fastest plans are available. With FTTN (Fibre to the Node), fibre stops at a cabinet in your street and the old copper phone line covers the rest. FTTN speeds drop the further you are from the node and depend on the condition of the copper, so FTTN usually can't support the fastest plans.",
        links: [{ href: "/blog/fttp-vs-fttn-vs-fttc-vs-hfc-adelaide", label: "FTTP vs FTTN vs FTTC vs HFC explained" }],
      },
      {
        question: "How do I check which nbn technology my address has?",
        answer:
          "Enter your address in the address checker on the nbn website. It shows the technology serving your premises and whether a fibre upgrade is available. You can also ask your provider, or look at the equipment: an nbn connection box with a fibre cable means FTTP, a small device plugged into the phone socket usually means FTTC, a box connected to a coax wall outlet means HFC, and a modem plugged straight into the phone socket usually means FTTN.",
        links: [{ href: "/blog/how-to-check-nbn-technology-adelaide", label: "Step-by-step guide to checking your nbn technology" }],
      },
      {
        question: "Which nbn technology is the best?",
        answer:
          "FTTP is the most capable and reliable, followed by HFC. FTTC sits in between, and FTTN is the most limited because it relies on longer copper runs. Your technology is set by nbn for your address, but many FTTN and FTTC premises can now upgrade to FTTP.",
      },
      {
        question: `Is ${company.name} an internet provider or part of nbn?`,
        answer: `No. ${company.name} is an independent installation and cabling contractor. We don't sell internet plans and we're not part of nbn. Your plan comes from a provider of your choice, and we look after cabling, wiring and set-up at your property.`,
        links: [{ href: "/nbn-installation-adelaide", label: "How nbn installation works in Adelaide" }],
      },
    ],
  },
  {
    id: "installation",
    title: "Installation",
    items: [
      {
        question: "How long does nbn installation take?",
        answer:
          "An nbn installation appointment for FTTP usually takes a few hours, and nbn books it through your provider. Our cabling work in an existing home typically takes one to four hours depending on the job, and new-build conduit work depends on distance and ground conditions.",
      },
      {
        question: "What happens on FTTP installation day?",
        answer:
          "The technician checks the fibre route, connects the fibre to the utility box on the outside wall, installs the nbn connection box inside (near a power point and ideally where you want your router), then tests the connection. Someone aged 18 or over needs to be home to give access and agree where the equipment goes.",
        links: [{ href: "/blog/what-to-expect-fttp-installation-day", label: "What to expect on your FTTP installation day" }],
      },
      {
        question: "What should I do to prepare for installation?",
        answer:
          "Decide where you want your router (central, near a power point), clear access to the outside wall, meter box area and roof manhole, secure pets, and make sure an adult is home. If you have a monitored alarm on the phone line, tell us and your alarm provider beforehand.",
      },
      {
        question: "The nbn technician couldn't install because the conduit is blocked. What now?",
        answer:
          "The conduit on your property is the owner's responsibility. Have the blockage found and repaired, ideally with a draw wire left in place, then ask your provider to rebook the appointment. We do this work regularly.",
        links: [{ href: "/services/fttp-installation-adelaide", label: "Our FTTP installation service" }],
      },
      {
        question: "Can the nbn connection box be moved?",
        answer:
          "Moving nbn's equipment has to be requested through your provider and may involve a fee. Often a simpler option is to leave the box where it is and have a data cable run to a better spot for your router.",
      },
    ],
  },
  {
    id: "fttp-upgrade",
    title: "FTTP upgrades",
    items: [
      {
        question: "Does an FTTP upgrade cost anything?",
        // VERIFY: nbn Fibre Connect cost and plan conditions are current.
        answer:
          "For eligible FTTN and FTTC premises, nbn generally provides the standard upgrade installation at no cost when you order a qualifying plan through a participating provider. Conditions apply and change from time to time, so check the current terms with nbn or your provider. Extra work on your property, such as repairing a blocked conduit or running cabling, is separate.",
        links: [{ href: "/fttp-upgrade-adelaide", label: "FTTP upgrades in Adelaide" }],
      },
      {
        question: "Who is eligible for an FTTP upgrade?",
        answer:
          "Eligibility is set by nbn and depends on your address. Many FTTN and FTTC premises are now eligible and more are added over time. Check your address on the nbn website to see if an upgrade is available.",
        links: [{ href: "/blog/fttp-upgrade-explained-eligibility", label: "FTTP upgrade explained" }],
      },
      {
        question: "How long does an FTTP upgrade take from start to finish?",
        answer:
          "It often takes several weeks from ordering to activation, depending on nbn's scheduling and whether any blockages need fixing. The internal installation visit itself usually takes a few hours.",
      },
    ],
  },
  {
    id: "cctv-law",
    title: "CCTV, storage and privacy",
    items: [
      {
        question: "How long is CCTV footage stored?",
        answer:
          "On a recorder (NVR) system, footage is kept until the hard drive fills up and then the oldest footage is recorded over. How long that takes depends on the drive size, the number of cameras, resolution and whether recording is continuous or motion-only. Most home systems are set up to keep around two to four weeks. Save any important clip as soon as you know you need it.",
      },
      {
        question: "What are the privacy rules for home CCTV in South Australia?",
        // VERIFY: summary of the Surveillance Devices Act 2016 (SA); not legal advice.
        answer:
          "Surveillance devices in SA are regulated by the Surveillance Devices Act 2016 (SA). As a general guide, point cameras at your own property, avoid recording neighbours' private areas such as windows and backyards, and be very careful with audio, because recording private conversations without consent can be an offence. This is general information, not legal advice. If you're unsure, get legal advice or contact the relevant SA authority.",
      },
      {
        question: "Are there extra rules for CCTV in a business?",
        answer:
          "Businesses may have obligations under privacy and workplace laws, depending on their size and situation. Common good practice includes clear signage, telling staff about cameras, never placing cameras in toilets or change rooms, and controlling who can access footage. Get advice specific to your business if you're unsure.",
      },
      {
        question: "Do I need internet for my security cameras to work?",
        answer:
          "Wired cameras record to the recorder on site without internet. You only need internet to view them remotely on your phone. A UPS (battery backup) keeps them recording during short power outages.",
        links: [{ href: "/blog/choosing-home-security-camera-system", label: "Choosing a home security camera system" }],
      },
    ],
  },
  {
    id: "quotes",
    title: "Quotes and booking",
    items: [
      {
        question: "How much does installation cost?",
        answer:
          "Every job is different, so we give a free, fixed quote based on the work involved: cable distance, wall construction, access, the number of data points or cameras, and any conduit work. Any nbn charges for network work come from your provider.",
      },
      {
        question: "Which areas do you service?",
        answer: `We're based in ${company.address.suburb} and work across metropolitan Adelaide and surrounding areas. See our service areas page, or ask if your suburb isn't listed.`,
        links: [{ href: "/areas", label: "Our service areas" }],
      },
      {
        question: "How quickly can you come out?",
        answer:
          "We reply to quote requests within one business day and book a time that suits you. Availability depends on the time of year, so call us if it's urgent.",
      },
    ],
  },
];

export const allFaqs = faqGroups.flatMap((group) => group.items);
