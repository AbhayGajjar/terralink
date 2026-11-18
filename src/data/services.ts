import type { IconName } from "@/components/ui/Icon";
import type { PageContent } from "@/lib/content";
import { company } from "@/data/company";
import { whoDoesWhatSection } from "@/lib/nbn";
import { images, type SiteImage } from "@/lib/images";

export type ServiceCategory = "nbn" | "cctv";

export interface Service {
  /** URL: /services/<slug> */
  slug: string;
  /** The page H1 – contains the main keyword */
  heading: string;
  /** schema.org serviceType */
  serviceType: string;
  title: string;
  /** Short name for nav, footer and cards */
  shortTitle: string;
  category: ServiceCategory;
  icon: IconName;
  tagline: string;
  /** One or two sentences for service cards */
  excerpt: string;
  image: SiteImage;
  /** "What's included" checklist (sidebar + services page) */
  included: string[];
  content: PageContent;
  /** Paths of the most closely related landing pages, guides and FAQ (internal links) */
  related: string[];
  /** <title> (≤ 47 chars, " | TerraLink" is appended) and meta description (≤ 155 chars) */
  seo: { title: string; description: string };
}

/**
 * Service pages. Copy is written to be accurate but general – review it with the TerraLink team.
 * Lines marked VERIFY describe nbn rules or timeframes that change; check them before publishing.
 * No prices are given on purpose: quote ranges only once you're happy to stand behind them.
 */
export const services: Service[] = [
  /* ---------------------------------------------------------------------------------------- */
  {
    slug: "fttp-installation-adelaide",
    heading: "FTTP fibre installation service in Adelaide",
    serviceType: "FTTP installation",
    title: "FTTP Installation",
    shortTitle: "FTTP Installation",
    category: "nbn",
    icon: "fibre",
    tagline: "Get full fibre working properly, from the conduit in your front yard to the router in your lounge room.",
    excerpt:
      "Lead-in conduit preparation for new builds, data cabling from the nbn connection box and Wi-Fi set-up, so your FTTP connection reaches every room.",
    image: images.fibreStrands,
    included: [
      "Site visit and cable route planning",
      "Lead-in conduit and pit preparation on your property (new builds and blocked conduits)",
      "Data cabling from the nbn connection box to your router location",
      "Extra data points for TVs, home offices and access points",
      "Router, mesh Wi-Fi and wired device set-up",
      "Testing of every cable run before we leave",
      "Clean-up and a plain-English handover",
    ],
    content: {
      intro: `Fibre to the Premises (FTTP) is the best fixed-line nbn technology you can have: optical fibre runs all the way from the street to your home, so speed isn't limited by old copper. But a fibre connection only performs as well as the work around it. A blocked conduit can stop an installation on the day, and a connection box in the garage can leave the rest of the house with patchy Wi-Fi.

TerraLink's FTTP installation service covers the parts of the job that sit on your side of the network. We get your property ready for nbn to connect, then make sure the connection reaches the rooms where you actually use it. If you're still deciding whether fibre is available at your address, start with our guide to [FTTP installation in Adelaide](/fttp-installation-adelaide).`,
      facts: [
        { label: "Typical on-site time", value: "2–4 hours for most homes" },
        { label: "Best for", value: "New builds, FTTP upgrades and homes with the box in the wrong spot" },
        { label: "You'll need", value: "Someone 18+ home, and access to the roof space or under-floor if possible" },
        { label: "Quote", value: "Free and fixed once we've seen the job" },
      ],
      sections: [
        {
          id: "what-is-fttp",
          heading: "What FTTP is and how it reaches your home",
          body: `With FTTP, a fibre optic cable runs from nbn's network in the street, through a pit or from a pole, to a small utility box (the premises connection device) on an outside wall. From there a short internal fibre goes to the nbn connection box inside, and your router plugs into that box with an ethernet cable. Because the whole path is fibre, FTTP supports the fastest residential plans and isn't slowed by distance like FTTN. Compare the technologies in [FTTP vs FTTN vs FTTC vs HFC explained](/blog/fttp-vs-fttn-vs-fttc-vs-hfc-adelaide).`,
        },
        {
          id: "who-needs-it",
          heading: "Who this service is for",
          body: `We most often help:

- **New-build owners and builders** who need the lead-in conduit and pit installed to nbn's requirements before nbn will connect the house.
- **People upgrading from FTTN or FTTC** under nbn's fibre upgrade program, who want the new connection box in a sensible place and cabling to their home office. See [FTTP upgrades in Adelaide](/fttp-upgrade-adelaide).
- **Households with the connection box in a bad spot**, such as the garage, a front bedroom or a laundry, where Wi-Fi can't reach the back of the house.
- **Renovators, home offices and small businesses** who want data points built in and reliable wired connections, not just Wi-Fi.`,
        },
        whoDoesWhatSection(),
        {
          id: "process",
          heading: "How an FTTP job works, step by step",
          body: `1. **Quote and questions.** Tell us your suburb, whether the house is new or existing, and what you'd like to achieve. Photos of the outside wall, the existing box and the meter box help us quote accurately.
2. **Site visit (if needed).** For new builds or longer cable runs we check the conduit route, wall construction and roof access before giving a fixed price.
3. **Preparation.** For new builds we install or repair the lead-in conduit and pit on your property, with a draw wire so the fibre can be pulled through. For existing homes we plan where the cabling will run and where new data points go.
4. **Installation day.** We run and terminate the cables, fit wall plates and keep cables hidden in walls, roof space or neat external conduit.
5. **Testing.** Every cable run is tested, and once your provider has activated the service we can check that the router connects and the speeds are what your plan should give.
6. **Handover.** We show you where everything is, label the cables and leave the site clean.`,
        },
        {
          id: "how-long",
          heading: "How long FTTP work takes",
          body: `Most cabling jobs in an existing single-storey home take two to four hours. Two-storey homes, double-brick or stone walls and jobs with several data points can take most of a day. New-build conduit work depends on the distance from the boundary and how hard the ground is: Adelaide's clay soils can be slow going in summer.

The nbn side has its own timeline. Once your provider places an order, nbn books its own appointment. If you're upgrading, that can involve one visit for outside work and another for inside. <!-- VERIFY: current nbn appointment process and typical lead times for FTTP upgrades. --> We're happy to work around those dates. For example, we can prepare the conduit beforehand and come back after activation to run cabling to the rooms you need. Read [what to expect on FTTP installation day](/blog/what-to-expect-fttp-installation-day) for more detail.`,
        },
        {
          id: "your-prep",
          heading: "What you need to do before we arrive",
          body: `- **Decide where you want your router.** A central spot gives the best Wi-Fi. If the nbn connection box can't go there, we'll run cabling to that spot.
- **Make sure there's a power point.** The nbn connection box and router both need power. If a new power point is needed, it must be installed by a licensed electrician; we can let you know where it should go.
- **Clear access** to the outside wall, the meter box area, the roof manhole and any cupboards we'll be working in.
- **Tell us about pets, alarms and access codes**, and have someone aged 18 or over at home.`,
        },
        {
          id: "common-problems",
          heading: "Common FTTP problems we fix",
          body: `- **Blocked or crushed lead-in conduit.** This is one of the most common reasons an FTTP installation can't go ahead on the day. Tree roots, landscaping and old Telstra conduits that were never designed for fibre are frequent culprits. We locate the problem and repair or replace the private section.
- **Connection box in the wrong room.** Rather than relying on a weak Wi-Fi signal, we run a cable from the box to where the router should be.
- **Wi-Fi black spots.** Large or long Adelaide homes, especially double-brick ones, often need a wired mesh access point at the far end.

If the fault is with nbn's own equipment, such as a red light on the connection box, your provider needs to log it with nbn. We can help you work out which side the problem is on. See [common nbn connection problems](/blog/common-nbn-connection-problems-adelaide).`,
        },
        {
          id: "pricing",
          heading: "What affects the price",
          body: `We don't publish one-size-fits-all prices because FTTP jobs vary a lot. The main factors are:

- **Distance and route:** how far the cable has to travel and whether it can go through the roof, under the floor or in external conduit.
- **Wall construction:** double-brick, stone and rendered walls take longer to penetrate neatly than weatherboard or plasterboard.
- **Number of data points** and whether you want a small data cabinet.
- **Conduit work:** the length of trenching or repairs needed for new builds or blocked conduits.
- **Access:** two-storey homes, low roof pitches and tiled roofs add time.

You'll get a fixed quote in writing before any work starts. The nbn side of an upgrade is arranged through your provider, and any nbn fees or conditions come from them, not from us.`,
        },
      ],
      faqs: [
        {
          question: "Do you install the nbn connection box?",
          answer: company.nbnNetworkAuthorised
            ? "Our technicians are authorised to work on the nbn network, so depending on how your connection is booked we can complete the network installation as well as the cabling from the connection box to your router and devices."
            : "The nbn utility box and connection box are nbn's equipment and are installed by nbn's authorised technicians when your provider books the connection. We prepare your property beforehand and do the cabling from the connection box to where you want your router and devices.",
        },
        {
          question: "How long does an FTTP installation take?",
          answer:
            "Our cabling work usually takes two to four hours in an existing home. nbn's own installation appointment is separate and is booked by your internet provider.",
        },
        {
          question: "Can the nbn connection box be moved to another room?",
          answer:
            "Moving nbn's equipment has to be requested through your internet provider and may involve a fee. Often a simpler option is to leave the box where it is and run a data cable to a better router location, which we can do.",
        },
        {
          question: "My FTTP install was cancelled because the conduit was blocked. Can you help?",
          answer:
            "Yes. Blocked or damaged conduit on your property is the owner's responsibility to fix. We locate the blockage, repair or replace the private section of conduit and leave a draw wire in place, then you can rebook the nbn appointment through your provider.",
        },
      ],
    },
    related: ["/fttp-installation-adelaide", "/fttp-upgrade-adelaide", "/blog/what-to-expect-fttp-installation-day", "/faq"],
    seo: {
      title: "FTTP Fibre Installation Service Adelaide",
      description:
        "FTTP fibre installation and cabling in Adelaide: what is included, how the job runs, how long it takes and what affects the cost. Free quotes.",
    },
  },

  /* ---------------------------------------------------------------------------------------- */
  {
    slug: "fttn-installation-adelaide",
    heading: "FTTN installation and wiring in Adelaide",
    serviceType: "FTTN installation",
    title: "FTTN Installation & Wiring",
    shortTitle: "FTTN Installation",
    category: "nbn",
    icon: "node",
    tagline: "Get the most from your copper line with clean, correctly wired phone sockets.",
    excerpt:
      "Main socket installation, removal of old extension wiring and line testing to fix the in-home faults that slow FTTN connections down.",
    image: images.patchPanelBlue,
    included: [
      "Line testing at the main socket",
      "Finding the first (main) telephone socket",
      "Installing or relocating the main wall socket",
      "Disconnecting or removing redundant extension sockets",
      "Isolating old alarm and phone wiring where needed",
      "Modem placement and connection check",
      "Advice on FTTP upgrade eligibility",
    ],
    content: {
      intro: `With Fibre to the Node (FTTN), fibre runs to a cabinet (the node) somewhere in your street and the existing copper phone line covers the last stretch to your home. Many Adelaide homes are still on FTTN, and many of them get slower speeds or more drop-outs than they should. The cause is often not the nbn network itself but decades-old phone wiring inside the house.

TerraLink's FTTN service fixes that internal wiring. We find the main socket, remove the extension sockets and old cabling that add noise to the line, and make sure your modem is connected to the cleanest possible point. If your address is eligible, we'll also tell you whether an [FTTP upgrade](/fttp-upgrade-adelaide) is the better long-term move.`,
      facts: [
        { label: "Typical on-site time", value: "1–3 hours" },
        { label: "Best for", value: "Slow speeds, drop-outs, or moving the modem to a better room" },
        { label: "You'll need", value: "Access to all phone sockets and, ideally, the roof space" },
        { label: "Quote", value: "Free, fixed price" },
      ],
      sections: [
        {
          id: "how-fttn-works",
          heading: "How FTTN works and why wiring matters",
          body: `FTTN uses VDSL2 technology over copper. The speed your line can reach depends mainly on two things: the length of the copper between the node and your modem, and the condition of that copper. You can't change the distance to the node, but you can change what happens inside your home.

In many older Adelaide homes, the phone line passes through several extension sockets, old junction boxes and sometimes a monitored alarm dialler before it reaches the modem. Each one can add interference and reflect signal back down the line. Removing them, so the modem sits on a clean, direct connection to the main socket, often improves stability and sometimes improves speed. It's one of the most worthwhile fixes on FTTN.`,
        },
        {
          id: "who-needs-it",
          heading: "Who needs FTTN wiring work",
          body: `- Households whose speeds are well below what their plan should deliver, or which drop out in the evening or after rain.
- Homes with phone sockets in several rooms, especially houses built before the 1990s.
- People who want the modem moved to a central room for better Wi-Fi coverage.
- Homes with an old back-to-base alarm connected to the phone line.
- Anyone who has been told by their provider that a fault is "in-premises", meaning it's on your side of the network.`,
        },
        whoDoesWhatSection(),
        {
          id: "process",
          heading: "Our FTTN process, step by step",
          body: `1. **Assessment.** We test the line at the main socket and look at how the wiring runs through the house.
2. **Find the main socket.** The first socket after the line enters the house is the one your modem should use. In older homes it is not always the one you'd expect.
3. **Plan the fix.** We explain what we found and agree where the main socket and modem should be.
4. **Re-wire.** Redundant extension sockets are disconnected or removed, old wiring is isolated, and if needed a new main socket is installed in a better location using quality cable.
5. **Test and confirm.** We re-test the line, reconnect your modem and check that it syncs reliably.`,
        },
        {
          id: "how-long",
          heading: "How long it takes",
          body: `A simple job, such as finding the main socket and disconnecting a few extensions, often takes about an hour. Relocating the main socket to another room or untangling alarm wiring usually takes two to three hours. After work like this, a modem can take some time to settle at its final speed, so we'll explain what to look for over the following days.`,
        },
        {
          id: "your-prep",
          heading: "What you need to do",
          body: `- Show us every phone socket you know of, including ones behind furniture.
- Let us know if you have a monitored alarm or medical alert that uses the phone line, so it isn't disconnected without a plan.
- Have your modem and its power supply handy, and tell us where you'd ideally like it.
- Make sure someone aged 18 or over is home.`,
        },
        {
          id: "common-problems",
          heading: "Common FTTN problems we find",
          body: `- **Extension sockets left connected.** Even unused extension sockets can degrade a VDSL signal.
- **Corroded or loose connections** in old sockets and junction boxes.
- **Modem plugged into the wrong socket**, far from the main socket.
- **Old line filters or splitters** still in place from ADSL days.
- **Alarm diallers** wired in series with the phone line.

Some faults are beyond your property, such as a problem in the street pit or at the node. Those must be reported by your provider to nbn. Our [guide to common nbn connection problems](/blog/common-nbn-connection-problems-adelaide) explains how to tell the difference.`,
        },
        {
          id: "pricing",
          heading: "What affects the price",
          body: `- How many extension sockets there are and how easy they are to reach.
- Whether the main socket needs to move to another room, and how far.
- Wall construction and roof or under-floor access.
- Alarm or other services connected to the line.

We give a fixed quote before starting. If the line tests show the problem is outside your property, we'll tell you so you don't pay for work that won't help.`,
        },
        {
          id: "upgrade",
          heading: "Should you upgrade to FTTP instead?",
          body: `If your FTTN line is long or you want faster plans than FTTN can support, check whether your address is eligible for nbn's fibre upgrade. Eligible upgrades are ordered through your provider and are often available with no standard installation cost. <!-- VERIFY: nbn Fibre Connect eligibility and cost conditions are current. --> Find out how in [FTTP upgrade explained](/blog/fttp-upgrade-explained-eligibility).`,
        },
      ],
      faqs: [
        {
          question: "Why is my FTTN connection slower than my plan?",
          answer:
            "FTTN speeds depend on the distance from your home to the node and on the condition of the copper. We can't change the distance, but faulty extension sockets and old internal wiring are common causes that we can fix.",
        },
        {
          question: "Can you move my nbn phone socket to another room?",
          answer:
            "Yes. We can install a new main socket in a better location so your modem can sit somewhere central for better Wi-Fi coverage.",
        },
        {
          question: "Will removing old phone sockets affect my landline?",
          answer:
            "On the nbn, home phone services run through your modem rather than the old phone wiring, so extension sockets are usually no longer needed. We confirm how your phone and any alarm are set up before removing anything.",
        },
        {
          question: "Is FTTN being replaced with fibre?",
          answer:
            "nbn has been offering FTTP upgrades to many FTTN premises, usually when the customer orders an eligible plan through their provider. Check your address with nbn or your provider to see if you're eligible.",
        },
      ],
    },
    related: ["/nbn-installation-adelaide", "/fttp-upgrade-adelaide", "/blog/common-nbn-connection-problems-adelaide", "/blog/how-to-check-nbn-technology-adelaide"],
    seo: {
      title: "FTTN Installation & Wiring Adelaide",
      description:
        "FTTN installation and internal wiring in Adelaide. We fix slow speeds and drop-outs caused by old phone sockets and copper wiring. Free quotes.",
    },
  },

  /* ---------------------------------------------------------------------------------------- */
  {
    slug: "fttc-hfc-installation-adelaide",
    heading: "FTTC and HFC nbn installation in Adelaide",
    serviceType: "FTTC and HFC installation",
    title: "FTTC & HFC Installation",
    shortTitle: "FTTC & HFC Installation",
    category: "nbn",
    icon: "cable",
    tagline: "Correct set-up, tidy cabling and a stable signal for Fibre to the Curb and HFC connections.",
    excerpt:
      "Socket and cabling work, signal checks and data cabling for FTTC and HFC homes, so the connection device and router sit where they work best.",
    image: images.routerCables,
    included: [
      "Check of your connection device, wall socket and cabling",
      "Main telephone socket work for FTTC homes",
      "Removal of old splitters and pay-TV cabling on HFC lines",
      "Data cabling from the connection device to your router location",
      "Router and mesh Wi-Fi set-up",
      "Testing before we leave",
    ],
    content: {
      intro: `Fibre to the Curb (FTTC) and Hybrid Fibre Coaxial (HFC) are two quite different technologies, but they have one thing in common: most problems we see are caused by how the equipment is connected inside the home, not by the network outside.

TerraLink sorts out that internal set-up for FTTC and HFC homes across Adelaide. We check the wall socket, cabling and connection device, remove old splitters and wiring that weaken the signal, and run data cabling so your router can sit where your Wi-Fi works best. Not sure which technology you have? Our guide on [how to check your nbn technology](/blog/how-to-check-nbn-technology-adelaide) takes two minutes.`,
      facts: [
        { label: "Typical on-site time", value: "1–3 hours" },
        { label: "Best for", value: "Drop-outs, a router in the wrong spot, or messy cabling" },
        { label: "You'll need", value: "Access to the connection device, wall sockets and roof space" },
        { label: "Quote", value: "Free, fixed price" },
      ],
      sections: [
        {
          id: "fttc-vs-hfc",
          heading: "FTTC and HFC in plain English",
          body: `**FTTC** runs fibre to a small distribution point unit in the pit outside your property. The last few metres use the existing copper phone line to your main telephone socket. Inside, an nbn connection device (NCD) plugs into that socket, and your modem plugs into the NCD. The NCD powers the equipment in the pit, so it must stay plugged into power.

**HFC** uses the coaxial cable network originally built for pay TV. A coaxial cable comes into the home to a wall outlet, and an nbn connection box plugs into that outlet. HFC can support very fast plans, but it is sensitive to splitters, old pay-TV amplifiers and damaged coax inside the home.

Both are explained side by side with FTTP and FTTN in [our technology comparison](/blog/fttp-vs-fttn-vs-fttc-vs-hfc-adelaide).`,
        },
        {
          id: "who-needs-it",
          heading: "Who this service is for",
          body: `- FTTC homes where the connection drops out or the NCD keeps showing a fault light.
- HFC homes with old pay-TV cabling, splitters or wall plates in several rooms.
- Anyone who wants the router moved from a front room or cupboard to a central spot.
- Home offices that need wired ethernet rather than Wi-Fi.
- New owners or tenants who have inherited a confusing tangle of cables.`,
        },
        whoDoesWhatSection(),
        {
          id: "process",
          heading: "How the job works",
          body: `1. **Identify the technology** and look at how the connection device, socket and router are currently set up.
2. **Check the cabling.** On FTTC we find the main socket and remove extension wiring. On HFC we look for splitters, old amplifiers and damaged leads.
3. **Agree the plan** for where the router should go and what cabling is needed.
4. **Install.** We run data cabling from the connection device to the router location, fit wall plates and keep everything concealed.
5. **Test** the cabling, check the router connects and confirm the connection is stable.`,
        },
        {
          id: "how-long",
          heading: "How long it takes",
          body: `Simple jobs, such as removing old splitters and tidying the set-up, take about an hour. Running a data cable to another room typically takes two to three hours depending on the house. We'll give you an estimated time with your quote.`,
        },
        {
          id: "your-prep",
          heading: "What you need to do",
          body: `- Don't unplug or move the FTTC connection device yourself; it powers equipment in the street.
- Show us where the connection device and every phone or coax wall plate are.
- Decide where you'd like the router, ideally near a power point.
- Have someone aged 18 or over at home.`,
        },
        {
          id: "common-problems",
          heading: "Common FTTC and HFC problems",
          body: `### FTTC
- The NCD plugged into an extension socket instead of the main socket.
- Old extension wiring left connected, which adds interference.
- The NCD switched off at the wall or on a power board that gets turned off.

### HFC
- Splitters left over from pay TV that weaken the signal.
- Old amplifiers or damaged coaxial cables and connectors.
- The connection box in a front room, leaving the back of the house with weak Wi-Fi.

Faults with nbn's own equipment or the street network must be reported through your provider. See [common nbn connection problems](/blog/common-nbn-connection-problems-adelaide).`,
        },
        {
          id: "pricing",
          heading: "What affects the price",
          body: `- The distance from the connection device to your preferred router location.
- Wall construction and roof or under-floor access.
- How many old sockets, splitters or cables need removing.
- Additional data points or mesh access points.

Every quote is fixed and agreed before we start.`,
        },
      ],
      faqs: [
        {
          question: "Can my FTTC address be upgraded to FTTP?",
          answer:
            "nbn has extended its fibre upgrade program to many FTTC premises. Check your address on the nbn website or ask your provider. If you're eligible, the upgrade is ordered through them.",
        },
        {
          question: "Why must the FTTC connection device stay plugged in?",
          answer:
            "On FTTC, the nbn connection device inside your home supplies power to nbn's equipment in the pit outside. If it is switched off, your connection drops out.",
        },
        {
          question: "Can you move my HFC wall outlet?",
          answer:
            "The HFC wall outlet and connection box are nbn equipment, and moving them is requested through your provider. In most cases it's simpler for us to run a data cable from the connection box to wherever you want your router.",
        },
        {
          question: "Do HFC connections support fast plans?",
          answer:
            "Yes. HFC can support some of the fastest residential nbn plans, provided the in-home cabling is in good condition.",
        },
      ],
    },
    related: ["/nbn-installation-adelaide", "/blog/how-to-check-nbn-technology-adelaide", "/blog/common-nbn-connection-problems-adelaide", "/faq"],
    seo: {
      title: "FTTC & HFC NBN Installation Adelaide",
      description:
        "FTTC and HFC nbn installation, socket and cabling work, and signal checks in Adelaide. Tidy cabling by local technicians. Free, no-obligation quotes.",
    },
  },

  /* ---------------------------------------------------------------------------------------- */
  {
    slug: "cctv-installation-adelaide",
    heading: "Security camera installation in Adelaide",
    serviceType: "CCTV installation",
    title: "CCTV & Security Camera Installation",
    shortTitle: "CCTV Installation",
    category: "cctv",
    icon: "camera",
    tagline: "Clear footage day and night, viewable on your phone, installed neatly with concealed cabling.",
    excerpt:
      "Security camera systems for homes and businesses: planned around your property, cabled properly and set up so you can actually find the footage you need.",
    image: images.cctvPole,
    included: [
      "On-site security assessment",
      "Camera and recorder recommendation to suit your budget",
      "Concealed, weatherproof cabling",
      "Network video recorder (NVR) set-up and storage settings",
      "Phone app and remote viewing set-up",
      "Motion detection zones and alerts",
      "Walk-through of how to find and save footage",
    ],
    content: {
      intro: `A good security camera system does two jobs: it deters people from trying their luck, and if something does happen, it gives you footage clear enough to be useful. Most disappointing systems fail at the second job. Cameras are mounted too high, point into the sun, record over themselves after a few days or stop working on the app when the router is replaced.

TerraLink designs and installs CCTV systems for Adelaide homes and businesses with that second job in mind. We plan camera positions around what you actually need to see, run proper cabling, set up recording and alerts, and show you how to find and export footage. For a broader look at options and Adelaide-specific considerations, see our [CCTV installation Adelaide](/cctv-installation-adelaide) guide.`,
      facts: [
        { label: "Typical on-site time", value: "Most 4–8 camera home systems in one day" },
        { label: "Best for", value: "Homes, rentals (with approval), shops, offices and sheds" },
        { label: "You'll need", value: "Roof access, a spot for the recorder near your router" },
        { label: "Quote", value: "Free site assessment and fixed quote" },
      ],
      sections: [
        {
          id: "system-types",
          heading: "What a CCTV system includes",
          body: `Most systems we install use **wired IP cameras** connected to a **network video recorder (NVR)**. Each camera gets one network cable that carries both power and video (called PoE, power over ethernet), so there's no need for a power point at every camera. The NVR records to a hard drive and connects to your router so you can watch live and recorded footage on your phone.

**Wi-Fi and battery cameras** are easier to put up, but they depend on a strong Wi-Fi signal and regular charging, and many store footage in a paid cloud subscription. They suit some situations, such as a single camera at a granny flat. For whole-property coverage, wired systems are generally more reliable. Our [guide to choosing a home security camera system](/blog/choosing-home-security-camera-system) explains the trade-offs.`,
        },
        {
          id: "who-needs-it",
          heading: "Who we install for",
          body: `- **Homeowners** who want to cover entry points, driveways, side gates and parcels at the front door.
- **Landlords and tenants.** Tenants need the owner's written approval before cameras are fixed to the building.
- **Shops, offices and warehouses** that need coverage of counters, entries, stock areas and car parks.
- **Rural and semi-rural properties** with sheds, gates and long driveways.
- **Anyone with an old DVR system** whose footage is too blurry to be useful.`,
        },
        {
          id: "process",
          heading: "Our CCTV installation process",
          body: `1. **Security assessment.** We walk the property with you, look at entry points, lighting and blind spots, and talk about what you most want to capture.
2. **Design and fixed quote.** You get a written plan showing camera positions, camera types, recorder size and storage, and a fixed price.
3. **Installation.** Cameras are mounted at heights and angles that capture faces and number plates, not just the tops of heads. Cabling runs through the roof space or in neat conduit, and every entry point is sealed.
4. **Configuration.** We set recording schedules, motion zones that ignore trees and passing cars, retention time and the phone app on your devices.
5. **Handover.** We show you how to view, search and export footage, and how to share access with family or staff.`,
        },
        {
          id: "how-long",
          heading: "How long installation takes",
          body: `A typical home system with four to eight cameras is usually installed and configured in a day. Larger homes, two-storey buildings and commercial sites can take longer, and we'll tell you how long when we quote. There's no need to be home the whole time, but we'll need you at the start to confirm positions and at the end for the handover.`,
        },
        {
          id: "your-prep",
          heading: "What you need to do",
          body: `- Think about what matters most: faces at the door, number plates in the driveway, a side gate or a shed.
- Decide where the recorder should live. It should sit near your router, out of sight and somewhere that doesn't get hot.
- Have your Wi-Fi name and password ready, and install the app on your phone if you can.
- If you rent, get the owner's written permission first.`,
        },
        {
          id: "privacy",
          heading: "Privacy and the law in South Australia",
          body: `In South Australia, surveillance devices are regulated by the *Surveillance Devices Act 2016 (SA)*. As a general guide, aim cameras at your own property, avoid pointing them into neighbours' yards or windows, and be very careful about audio: recording private conversations without consent can be an offence. Businesses may have extra obligations under privacy and workplace laws, and signage is recommended. <!-- VERIFY: summary of SA surveillance law; not legal advice. --> This is general information, not legal advice. We set up cameras and privacy masking to keep your system on the right side of these rules, and our [FAQ](/faq#cctv-law) covers the common questions.`,
        },
        {
          id: "common-problems",
          heading: "Common CCTV problems we fix",
          body: `- **Blurry footage at night** caused by infrared reflecting off eaves, walls or spider webs near the lens.
- **Faces in silhouette** from cameras pointed towards bright sky or a sunny street.
- **Footage overwritten too quickly** because the hard drive is too small or recording is set to continuous at full quality.
- **The app stopped working** after the router was changed.
- **Unreliable Wi-Fi cameras** that drop out at the far end of the property.`,
        },
        {
          id: "pricing",
          heading: "What affects the price",
          body: `- The number of cameras and their type, such as fixed, varifocal, wide-angle or turret.
- Resolution and night-vision performance.
- Recorder capacity and how many days of footage you want to keep.
- Cabling distance, building height and roof type.
- Extras such as a doorbell camera, a monitor or a separate network for the cameras.

We'll give you good, better and best options where it makes sense, and the quote is fixed before we start.`,
        },
      ],
      faqs: [
        {
          question: "How many cameras do I need?",
          answer:
            "Most homes need four to six: the front door, driveway, side gates and the backyard entry. We recommend covering entry points well rather than putting cameras everywhere.",
        },
        {
          question: "Can I view my cameras on my phone?",
          answer: "Yes. We set up the manufacturer's app on your phone and show you how to watch live, search recordings and save clips.",
        },
        {
          question: "How long is footage kept?",
          answer:
            "That depends on the hard drive size, number of cameras and recording settings. Most home systems are set to keep around two to four weeks, and we'll size the drive to suit what you want.",
        },
        {
          question: "Do the cameras work if the internet goes down?",
          answer:
            "Wired cameras keep recording to the NVR without internet. You just can't view them remotely until the internet is back. Adding a UPS (battery backup) keeps them recording during short power outages.",
        },
        {
          question: "Is it legal to have cameras facing the street?",
          answer:
            "Generally a camera may capture part of the street while covering your property, but you should avoid aiming at neighbours' private areas and be careful with audio recording. We can set privacy masks to block out areas you shouldn't record.",
        },
      ],
    },
    related: ["/cctv-installation-adelaide", "/blog/choosing-home-security-camera-system", "/faq"],
    seo: {
      title: "Security Camera Installation Adelaide",
      description:
        "Security camera installation in Adelaide for homes and businesses: system design, cabling, recorder set-up and phone viewing. Get a free quote.",
    },
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getRelatedServices(slug: string, limit = 3) {
  const current = getService(slug);
  // Same-category services first, then the rest.
  return [...services]
    .filter((service) => service.slug !== slug)
    .sort((a, b) => Number(b.category === current?.category) - Number(a.category === current?.category))
    .slice(0, limit);
}
