import { company } from "@/data/company";
import type { PageContent } from "@/lib/content";
import { whoDoesWhatSection } from "@/lib/nbn";
import { images, type SiteImage } from "@/lib/images";

/**
 * Keyword landing pages at the site root (e.g. /nbn-installation-adelaide).
 * Each page has a different job from the matching /services page, so they don't compete:
 * the landing page answers "how do I get this done in Adelaide?" and the service page
 * details TerraLink's service (inclusions, process, pricing factors).
 * Lines marked VERIFY describe nbn rules or timeframes that change; check before publishing.
 */
export interface LandingPage {
  slug: string;
  heading: string;
  eyebrow: string;
  lead: string;
  image: SiteImage;
  /** Pre-selects the service on the quote form */
  quoteService: string;
  schema: { name: string; serviceType: string };
  content: PageContent;
  related: string[];
  seo: { title: string; description: string };
}

export const landingPages: LandingPage[] = [
  /* ---------------------------------------------------------------------------------------- */
  {
    slug: "nbn-installation-adelaide",
    heading: "NBN installation in Adelaide",
    eyebrow: "nbn installation & cabling",
    lead: "Local technicians for every fixed-line nbn technology. We get your property ready, fix the wiring and make sure your connection reaches every room.",
    image: images.technician,
    quoteService: "other",
    schema: { name: "nbn installation and cabling in Adelaide", serviceType: "nbn installation" },
    content: {
      intro: `Searching for an "nbn installer" or "nbn technician" in Adelaide usually means one of three things: you're moving into a home that needs connecting, your connection isn't performing, or you want to upgrade. This page explains how getting an nbn connection actually works, which parts ${company.name} can help with, and how to get each job done with the fewest phone calls.

${company.name} is an Adelaide telecommunications contractor based in ${company.address.suburb}. We work on all four fixed-line technologies (FTTP, FTTN, FTTC and HFC) for homes and businesses across metropolitan Adelaide and surrounding areas.`,
      facts: [
        { label: "Technologies", value: "FTTP, FTTN, FTTC and HFC" },
        { label: "Based in", value: `${company.address.suburb}, servicing greater Adelaide` },
        { label: "Typical job", value: "1–4 hours on site" },
        { label: "Quote", value: "Free and fixed before work starts" },
      ],
      sections: [
        whoDoesWhatSection(),
        {
          id: "getting-connected",
          heading: "How to get an nbn connection in Adelaide",
          body: `1. **Check your address.** Use the address checker on the nbn website to see which technology serves your premises and whether it's ready to connect. Our guide on [how to check your nbn technology](/blog/how-to-check-nbn-technology-adelaide) walks you through it.
2. **Choose an internet provider and plan.** The provider places the order with nbn. Speeds available depend on your technology: the fastest plans need FTTP or HFC.
3. **Prepare the property.** New builds need lead-in conduit and a pit installed to nbn's requirements before nbn can connect. Existing homes may need a blocked conduit cleared or old wiring fixed. This is where we come in.
4. **nbn installation (if needed).** nbn books a technician through your provider to install or activate its equipment.
5. **Get the connection to where you need it.** Once the service is live, we can run cabling to your router location, add data points and set up Wi-Fi so the whole home is covered.`,
        },
        {
          id: "by-technology",
          heading: "What we do for each nbn technology",
          body: `| Technology | What it is | Typical TerraLink work |
| --- | --- | --- |
| **FTTP** | Fibre all the way to your home | Lead-in conduit and pits for new builds, clearing blocked conduit, data cabling from the connection box, Wi-Fi set-up. See [FTTP installation](/services/fttp-installation-adelaide). |
| **FTTN** | Fibre to a street cabinet, copper to your home | Finding the main socket, removing extension wiring, relocating the socket, fault-finding. See [FTTN installation and wiring](/services/fttn-installation-adelaide). |
| **FTTC** | Fibre to the pit outside, short copper run | Main socket and wiring fixes, connection device set-up, data cabling. See [FTTC and HFC installation](/services/fttc-hfc-installation-adelaide). |
| **HFC** | Coaxial cable from the old pay-TV network | Removing splitters and old cabling, data cabling to a better router spot. See [FTTC and HFC installation](/services/fttc-hfc-installation-adelaide). |

If you're on FTTN or FTTC and want faster speeds, read about [FTTP upgrades in Adelaide](/fttp-upgrade-adelaide).`,
        },
        {
          id: "common-jobs",
          heading: "Common reasons Adelaide customers call us",
          body: `- **"The nbn tech couldn't install because the conduit is blocked."** Private conduit is the property owner's responsibility. We find the blockage and repair it so the appointment can be rebooked.
- **"The connection box is in the garage and the Wi-Fi doesn't reach."** We run a data cable to a central spot or add wired mesh access points.
- **"My speeds are much lower than my plan."** On FTTN and FTTC the cause is often old phone wiring in the house, which we can fix.
- **"We're building and the builder asked for nbn pit and pipe."** We install lead-in conduit to nbn's specifications with a draw wire ready for the fibre.
- **"I work from home and need a wired connection."** We add data points to your office, TV and gaming areas.`,
        },
        {
          id: "connection-vs-internet",
          heading: "nbn connection vs internet service: what's the difference?",
          body: `People often use "nbn connection" to mean the internet service itself. Strictly, the **connection** is the physical link from nbn's network into your home, and the **internet service** is the plan you buy from a provider that runs over it. If your service isn't working at all, start by contacting your provider: they can run remote tests and, if the fault is on nbn's network, raise it with nbn.

If the provider says the fault is "in-premises", meaning it's on your side of the network, or you just want better coverage around the house, that's where a local technician like ${company.name} can help. Our article on [common nbn connection problems](/blog/common-nbn-connection-problems-adelaide) explains how to tell which is which.`,
        },
        {
          id: "near-me",
          heading: "Looking for an nbn installer near you?",
          body: `We're based in ${company.address.suburb} in Adelaide's north and work across the metropolitan area and nearby regions. See our [service areas](/areas) for local information about the [northern suburbs](/areas/northern-suburbs-adelaide), [eastern suburbs](/areas/eastern-suburbs-adelaide) and [Adelaide Hills](/areas/adelaide-hills). If your suburb isn't listed, ask anyway; we regularly travel for larger jobs.`,
        },
        {
          id: "booking",
          heading: "How booking works",
          body: `Send us your suburb, your nbn technology (if you know it) and a short description of the problem or what you want done. Photos of the connection box, phone sockets or outside wall help. We'll reply within one business day with a fixed quote or a few quick questions, then book a time that suits you.`,
        },
      ],
      faqs: [
        {
          question: `Is ${company.name} an internet provider?`,
          answer: `No. ${company.name} is an independent installation and cabling contractor. You buy your internet plan from a provider of your choice; we take care of the cabling, wiring and set-up on your property.`,
        },
        {
          question: "Do I need a technician to connect to the nbn?",
          answer:
            "Not always. Many homes already have the nbn equipment installed and just need a plan and a modem. A technician is needed when equipment has to be installed, when a conduit is blocked, or when in-home wiring is causing problems.",
        },
        {
          question: "How much does nbn installation cost?",
          answer:
            "Standard nbn connections are arranged through your provider, and any nbn charges come from them. Our work, such as conduit, cabling and wiring, is quoted at a fixed price based on the job. We don't charge for quotes.",
        },
        {
          question: "Which nbn technology is best?",
          answer:
            "FTTP is the most capable, followed by HFC. FTTC sits in the middle and FTTN is the most limited because it relies on longer copper runs. Your technology is set by nbn for your address, although many FTTN and FTTC homes can now upgrade to FTTP.",
        },
      ],
    },
    related: ["/services/fttp-installation-adelaide", "/services/fttn-installation-adelaide", "/blog/how-to-check-nbn-technology-adelaide", "/areas"],
    seo: {
      title: "NBN Installation Adelaide – Local Technicians",
      description:
        "nbn installation, cabling and wiring in Adelaide for FTTP, FTTN, FTTC and HFC. Find out who does what and how to get connected. Free local quotes.",
    },
  },

  /* ---------------------------------------------------------------------------------------- */
  {
    slug: "fttp-installation-adelaide",
    heading: "FTTP installation in Adelaide",
    eyebrow: "Full fibre for Adelaide homes",
    lead: "New build, existing home or upgrade: what an FTTP installation involves for your situation, and how we get your property ready for fibre.",
    image: images.fibreStrands,
    quoteService: "fttp-installation-adelaide",
    schema: { name: "FTTP installation in Adelaide", serviceType: "FTTP installation" },
    content: {
      intro: `Fibre to the Premises is the connection most Adelaide households want: it supports the fastest nbn plans, it's not slowed by distance like copper, and it's increasingly expected by buyers and renters. How you get FTTP installed depends on which of three situations you're in. This page explains each one and where ${company.name} fits in.

If you'd rather go straight to what's included in our work, see the [FTTP installation service](/services/fttp-installation-adelaide) page.`,
      facts: [
        { label: "Situation 1", value: "New build in a fibre-ready area" },
        { label: "Situation 2", value: "Existing home already on FTTP" },
        { label: "Situation 3", value: "FTTN or FTTC home upgrading" },
        { label: "Our part", value: "Conduit, cabling, data points and Wi-Fi" },
      ],
      sections: [
        {
          id: "new-builds",
          heading: "Situation 1: FTTP for a new build",
          body: `Most new homes in Adelaide's growth areas, such as new estates in the north and south, are built in areas where fibre is available. The fibre network in a new estate may belong to nbn or, in some estates, to another network operator, so check which one serves your lot before choosing a provider.

For nbn connections, the property owner or builder is responsible for the **lead-in conduit and pit** on the property, built to nbn's specifications, and for applying to connect the new premises. <!-- VERIFY: nbn new developments application process and any fees for single dwellings. --> Once that's in place, nbn installs the fibre and equipment.

We can:

- install the lead-in conduit from the boundary pit to the house wall, at the right depth, with sweep bends and a draw wire;
- plan where the utility box, connection box and router should go before the walls are lined; and
- run data cabling to bedrooms, the home office and TV areas while it's easy to do.`,
        },
        {
          id: "existing-fttp",
          heading: "Situation 2: an existing home already on FTTP",
          body: `If the house already has an nbn connection box on the wall, the fibre is in. Connecting is usually just a matter of ordering a plan and plugging in a router. The common problem is **where** the box was installed. In many Adelaide homes it ended up in the garage, the front bedroom or a laundry cupboard, and Wi-Fi from there doesn't reach the back of the house, especially through double-brick walls.

Moving nbn's equipment has to be requested through your provider. Usually a better option is to leave the box where it is and have us run a data cable to a central location for the router, with extra data points for the TV, office or a mesh access point.`,
        },
        {
          id: "upgrades",
          heading: "Situation 3: upgrading from FTTN or FTTC",
          body: `Many Adelaide premises on FTTN and FTTC are now eligible to upgrade to FTTP through nbn's fibre upgrade program. The upgrade is ordered through your internet provider, typically when you order an eligible plan. <!-- VERIFY: current eligibility and plan conditions for nbn Fibre Connect. --> Our page on [FTTP upgrades in Adelaide](/fttp-upgrade-adelaide) explains eligibility, the steps and what you can do to prepare.`,
        },
        whoDoesWhatSection(),
        {
          id: "adelaide-factors",
          heading: "Adelaide factors that affect FTTP installation",
          body: `- **Underground or overhead.** Much of Adelaide's network runs underground, but some streets use overhead cabling on Stobie poles. Overhead lead-ins need a clear path and a suitable attachment point on the house.
- **Reactive clay soils.** Large parts of the Adelaide plains have reactive clay that moves between wet and dry seasons. That can crush or separate old conduits, which is a common reason for blocked lead-ins.
- **Solid walls.** Double-brick, sandstone and bluestone homes are common in older suburbs and need more care, and more time, to get cables through neatly.
- **Heat.** Equipment in sheds, garages and roof spaces can get very hot in an Adelaide summer, which matters when choosing where to put routers and network gear.`,
        },
        {
          id: "on-the-day",
          heading: "What happens on installation day",
          body: `nbn's installation appointment is booked by your provider. For an existing home, it usually involves running or connecting the fibre to the utility box outside, then installing the connection box inside and testing it. Someone aged 18 or over needs to be home. Our article on [what to expect on your FTTP installation day](/blog/what-to-expect-fttp-installation-day) covers the day hour by hour, including how to choose the best spot for the box.`,
        },
        {
          id: "how-we-help",
          heading: "How TerraLink helps",
          body: `We focus on the parts that make the difference between "connected" and "works well everywhere":

- getting conduit and pits right so the nbn appointment isn't cancelled;
- advising on equipment placement before the day;
- running cabling from the connection box to where you need it; and
- setting up Wi-Fi that covers the whole home.

Every job gets a fixed written quote. Tell us your suburb and which of the three situations you're in, and we'll come back within one business day.`,
        },
      ],
      faqs: [
        {
          question: "How do I know if my Adelaide address can get FTTP?",
          answer:
            "Enter your address in the checker on the nbn website. It shows your current technology and, if you're on FTTN or FTTC, whether a fibre upgrade is available. Your provider can also check for you.",
        },
        {
          question: "How long does FTTP installation take?",
          answer:
            "nbn's installation visit usually takes a few hours. Our cabling work in an existing home typically takes two to four hours. New-build conduit work depends on distance and ground conditions.",
        },
        {
          question: "Who is responsible for a blocked lead-in conduit?",
          answer:
            "The conduit on your property is the property owner's responsibility. If nbn can't install because of a blockage, you need to have it fixed before the appointment can be rebooked. We can do that.",
        },
        {
          question: "Can I choose where the nbn connection box goes?",
          answer:
            "You can tell the nbn technician where you'd prefer it, within the limits of the cable route and power. If the box ends up in an awkward spot, we can run cabling to where you want your router.",
        },
      ],
    },
    related: ["/services/fttp-installation-adelaide", "/fttp-upgrade-adelaide", "/blog/what-to-expect-fttp-installation-day", "/blog/fttp-vs-fttn-vs-fttc-vs-hfc-adelaide"],
    seo: {
      title: "FTTP Installation in Adelaide – New & Existing",
      description:
        "Getting FTTP installed in Adelaide: new builds, existing fibre homes and upgrades from FTTN or FTTC. What's involved and how we help. Free quotes.",
    },
  },

  /* ---------------------------------------------------------------------------------------- */
  {
    slug: "fttp-upgrade-adelaide",
    heading: "FTTP upgrade in Adelaide: from FTTN or FTTC to full fibre",
    eyebrow: "FTTN & FTTC to fibre",
    lead: "Many Adelaide homes on copper can now switch to full fibre. Here's who is eligible, how the upgrade works and how to get the most from it.",
    image: images.technicianRepair,
    quoteService: "fttp-installation-adelaide",
    schema: { name: "FTTP upgrade support in Adelaide", serviceType: "FTTP upgrade" },
    content: {
      intro: `If your home is on Fibre to the Node (FTTN) or Fibre to the Curb (FTTC), you may be able to upgrade to Fibre to the Premises (FTTP). nbn has been extending fibre to millions of FTTN and FTTC premises, and for eligible homes the standard installation is generally provided at no extra cost when you order a qualifying plan through a participating provider. <!-- VERIFY: nbn Fibre Connect: current eligibility, cost and plan conditions. -->

The upgrade itself is arranged with your provider and carried out by nbn. ${company.name}'s role is to make sure the upgrade goes smoothly and that the new connection is set up properly in your home.`,
      facts: [
        { label: "Who can upgrade", value: "Eligible FTTN and FTTC addresses" },
        { label: "Ordered through", value: "Your internet provider" },
        { label: "Usual nbn cost", value: "No standard install cost if eligible (check current terms)" },
        { label: "Our part", value: "Conduit repairs, cabling, data points and Wi-Fi" },
      ],
      sections: [
        {
          id: "why-upgrade",
          heading: "Why upgrade from FTTN or FTTC?",
          body: `- **Speed.** FTTN speeds drop with distance from the node and with the condition of the copper. FTTP supports the fastest residential plans and isn't affected by distance.
- **Reliability.** Fibre doesn't suffer from corroded joints, water in old pits or the line noise that causes evening drop-outs on copper.
- **Working from home.** Fibre's upload speeds and stability make video calls and large file transfers easier.
- **Property appeal.** Full fibre is increasingly something buyers and tenants look for.

If your FTTN connection already does everything you need, there's no obligation to upgrade. But if you're regularly frustrated, it's worth checking.`,
        },
        {
          id: "eligibility",
          heading: "Checking whether your address is eligible",
          body: `1. Go to the nbn website and enter your address in the address checker.
2. If an upgrade is available, the result will say so and explain what kind of plan you need to order.
3. Not every provider offers the upgrade, so check with yours or compare providers.

Eligibility is rolled out in stages, so if your address isn't eligible today, check again in a few months. <!-- VERIFY: rollout completion timeframes. --> Our guide [FTTP upgrade explained](/blog/fttp-upgrade-explained-eligibility) goes into more detail.`,
        },
        {
          id: "steps",
          heading: "How the upgrade works, step by step",
          body: `1. **Order** an eligible plan with your provider and request the fibre upgrade.
2. **External work.** nbn runs fibre from the street to your property, either underground through the existing lead-in conduit or overhead, and installs the utility box on the outside wall. You may not need to be home for this part. <!-- VERIFY: whether nbn currently uses a separate external visit. -->
3. **Internal installation.** An nbn technician installs the connection box inside, connects it to the utility box and tests it. Someone aged 18 or over must be home.
4. **Switch over.** Your provider moves your service from copper to fibre. Your old modem may need replacing or reconfiguring because FTTP connects by ethernet, not the phone socket.
5. **Set up the home network.** Connect the router, move devices across and, if needed, have cabling run to where you want the router.`,
        },
        {
          id: "blocked-conduit",
          heading: "The most common hold-up: blocked conduit",
          body: `The upgrade usually reuses the existing underground conduit that carries your phone line. In older Adelaide suburbs that conduit can be decades old, crushed by tree roots or shifted by reactive clay soil. If nbn can't get the fibre through, the part on your property has to be fixed before the job can continue.

We locate blockages, repair or replace the private section of conduit, and leave a draw wire in place so the fibre can be pulled through on the rebooked visit.`,
        },
        whoDoesWhatSection(),
        {
          id: "placement",
          heading: "Choosing where the new connection box goes",
          body: `Before the internal installation, decide where you want your router. Ideally it's central, near a power point and close to where the phone line or fibre enters. The nbn technician will work with you within the limits of the cable route. If the best spot for the box isn't the best spot for Wi-Fi, we can run a data cable from the connection box to a central router location, or add wired mesh access points.`,
        },
        {
          id: "after-upgrade",
          heading: "After the upgrade",
          body: `- Old phone sockets are no longer used for internet. They can stay or be disconnected.
- If you had a monitored alarm or medical alert on the phone line, check with its provider that it will keep working on fibre.
- FTTP needs power to work. Consider a UPS for the router if you rely on the connection during power outages.

${company.name} can do the cabling, data points and Wi-Fi set-up in one visit. See our [FTTP installation service](/services/fttp-installation-adelaide) for what's included.`,
        },
      ],
      faqs: [
        {
          question: "Does the FTTP upgrade cost anything?",
          answer:
            "For eligible premises, nbn generally provides the standard upgrade installation at no cost when you order a qualifying plan through a participating provider. Conditions apply and can change, so check the current terms with nbn or your provider. Extra work on your property, such as fixing a blocked conduit or running cabling, is separate.",
        },
        {
          question: "How long does an FTTP upgrade take?",
          answer:
            "From order to activation it often takes several weeks, depending on nbn's scheduling and whether there are any blockages. The internal installation appointment itself usually takes a few hours.",
        },
        {
          question: "Will I lose internet during the upgrade?",
          answer:
            "Usually your copper service keeps working until the fibre is installed and your provider switches you over, so downtime is short. Ask your provider how they handle the cut-over.",
        },
        {
          question: "Can TerraLink do the upgrade for me?",
          answer: company.nbnNetworkAuthorised
            ? "The upgrade is ordered through your internet provider. Depending on how it is booked, our authorised technicians can complete the work, and we also handle all the cabling and set-up inside your home."
            : "The upgrade is ordered through your internet provider and installed by nbn. We handle the work around it: fixing blocked conduit on your property, running cabling to your router location and setting up Wi-Fi.",
        },
      ],
    },
    related: ["/blog/fttp-upgrade-explained-eligibility", "/services/fttp-installation-adelaide", "/services/fttn-installation-adelaide", "/faq"],
    seo: {
      title: "FTTP Upgrade Adelaide – Switch FTTN to Fibre",
      description:
        "Upgrading from FTTN or FTTC to FTTP in Adelaide: eligibility, cost, the step-by-step process and how to avoid delays. Local help with cabling and Wi-Fi.",
    },
  },

  /* ---------------------------------------------------------------------------------------- */
  {
    slug: "cctv-installation-adelaide",
    heading: "CCTV installation in Adelaide for homes and businesses",
    eyebrow: "Security cameras",
    lead: "Security camera systems designed for Adelaide properties: clear footage day and night, remote viewing on your phone and tidy, concealed cabling.",
    image: images.cctvWall,
    quoteService: "cctv-installation-adelaide",
    schema: { name: "CCTV installation in Adelaide", serviceType: "CCTV installation" },
    content: {
      intro: `Whether it's parcels going missing from the front porch, a shed that's been broken into or a shop counter you want covered, a properly planned CCTV system gives you both deterrence and evidence. This page covers what to think about before buying a system for an Adelaide home or business, and how ${company.name} plans and installs one.

For details of exactly what's included in our installation, see the [security camera installation service](/services/cctv-installation-adelaide).`,
      facts: [
        { label: "Systems", value: "Wired IP cameras with a network video recorder (NVR)" },
        { label: "Typical home", value: "4–6 cameras, installed in a day" },
        { label: "View on", value: "Phone, tablet or computer" },
        { label: "Quote", value: "Free site assessment" },
      ],
      sections: [
        {
          id: "homes",
          heading: "CCTV for Adelaide homes",
          body: `Most homes need four to six cameras covering the front door, driveway, side gates and back entry. Good placement matters more than camera count:

- **Front door:** mounted at about head height or slightly above, to capture faces and parcel deliveries. A video doorbell can complement this.
- **Driveway:** angled to read number plates as cars enter, not just show the roofs of cars.
- **Side gates and back entries:** where most break-ins start, and often poorly lit.
- **Sheds and garages:** common targets for tool theft in both suburban and semi-rural areas.

Our [practical guide to choosing a home security camera system](/blog/choosing-home-security-camera-system) covers camera types, resolution and storage in more detail.`,
        },
        {
          id: "business",
          heading: "CCTV for Adelaide businesses",
          body: `Business systems usually cover entries, the counter and register, stock and storage areas, loading docks and car parks. Points to plan for:

- **Retention:** how many days of footage you need to keep, and who can access it.
- **Lighting changes:** shopfront glass, bright car parks and dim storerooms all need different camera settings.
- **Staff privacy:** cameras should not be placed in toilets, change rooms or similar areas. Tell staff about cameras and display clear signage.
- **Multi-site viewing:** owners can view several sites from one app.`,
        },
        {
          id: "adelaide-conditions",
          heading: "Adelaide conditions that affect camera choice",
          body: `- **Summer heat.** Adelaide regularly sees days above 40°C. Choose cameras rated for high temperatures and avoid mounting them where they get full afternoon sun if you can.
- **Low sun and glare.** West-facing cameras can be blinded by afternoon sun. Good wide-dynamic-range (WDR) cameras and careful angling help.
- **Coastal air.** Near the coast, such as Glenelg, Henley Beach and the Port Adelaide area, salt air corrodes cheap brackets and connectors. Use quality, weather-sealed hardware.
- **Dust and spider webs.** Webs in front of infrared lights cause blurry night footage and false motion alerts. Thoughtful placement and regular cleaning help.
- **Power outages.** Storms and heatwaves can cause outages. A small UPS keeps the recorder and cameras running.`,
        },
        {
          id: "wired-vs-wifi",
          heading: "Wired or Wi-Fi cameras?",
          body: `For most properties we recommend **wired PoE cameras**: one cable per camera supplies power and data, recording is local (no subscription needed) and the picture doesn't drop out when Wi-Fi is busy. Wi-Fi and battery cameras are easier to install but need good Wi-Fi coverage and regular charging, and many store footage in the cloud for a monthly fee. They can work well as an add-on, but rarely as a whole-property system.`,
        },
        {
          id: "privacy-law",
          heading: "Privacy and surveillance law in SA",
          body: `In South Australia, the *Surveillance Devices Act 2016 (SA)* governs the use of cameras and listening devices. In broad terms: record your own property, avoid capturing neighbours' private areas such as windows and backyards, and be very careful with audio recording, which can be an offence without consent. Businesses may also have obligations under privacy and workplace laws. <!-- VERIFY: summary of SA surveillance law; not legal advice. --> This is general information, not legal advice. See the [CCTV questions in our FAQ](/faq#cctv-law).`,
        },
        {
          id: "process",
          heading: "How we plan and install your system",
          body: `1. **Assessment:** we walk the property with you and identify entry points, lighting and blind spots.
2. **Design:** you receive a camera plan and a fixed quote.
3. **Install:** cameras are mounted and cabling is concealed through the roof space or in neat conduit, with sealed entry points.
4. **Set-up:** we configure the recorder, storage, motion zones, privacy masks and the phone app.
5. **Handover:** we show you how to find, save and share footage.

If your home also needs nbn or data cabling work, we can do both in the same visit.`,
        },
      ],
      faqs: [
        {
          question: "How much does CCTV installation cost in Adelaide?",
          answer:
            "It depends on the number and type of cameras, recorder storage, cabling distance and building height. We provide a free assessment and a fixed written quote, often with a couple of options to suit different budgets.",
        },
        {
          question: "Do I need a monthly subscription?",
          answer:
            "Not with a wired NVR system. Footage is stored on the recorder at your property and viewed through a free app. Some Wi-Fi cameras do require a cloud subscription to store footage.",
        },
        {
          question: "Can I install cameras in a rental property?",
          answer:
            "You'll need the property owner's written permission before fixing cameras to the building. Battery or plug-in cameras that don't require drilling may be an alternative, but check your lease first.",
        },
        {
          question: "Will cameras record at night?",
          answer:
            "Yes. Most cameras have infrared night vision, and some offer colour night vision in low light. Placement matters: infrared reflecting off eaves or nearby walls is the most common cause of poor night footage.",
        },
      ],
    },
    related: ["/services/cctv-installation-adelaide", "/blog/choosing-home-security-camera-system", "/faq", "/areas"],
    seo: {
      title: "CCTV Installation Adelaide – Homes & Business",
      description:
        "CCTV installation in Adelaide: camera placement, wired vs Wi-Fi, local conditions and SA privacy rules explained. Free site assessment and quote.",
    },
  },
];

export function getLandingPage(slug: string) {
  return landingPages.find((page) => page.slug === slug);
}
