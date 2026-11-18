import { company } from "@/data/company";
import type { PageContent } from "@/lib/content";
import { images, type SiteImage } from "@/lib/images";

/**
 * Service area pages (/areas/<slug>).
 *
 * PLACEHOLDER – these three areas are EXAMPLES to show the structure. Before publishing:
 *  1. Confirm TerraLink really services each area (and its suburb list).
 *  2. Add local detail only your team knows: jobs you've done there, common issues you see.
 *  3. Add more areas only when you can write genuinely different content for each one.
 *     Near-identical "suburb + keyword" pages are treated by Google as doorway pages and can hurt rankings.
 * `name` should match an entry in company.serviceAreas.
 * Statements about which nbn technologies are common are deliberately general – nbn's address
 * checker is the only reliable source for a specific address.
 */
export interface AreaPage {
  slug: string;
  /** Matches an entry in company.serviceAreas */
  name: string;
  heading: string;
  lead: string;
  /** Suburbs we service in this area – PLACEHOLDER, confirm */
  suburbs: string[];
  image: SiteImage;
  content: PageContent;
  /** Slugs of neighbouring area pages */
  nearby: string[];
  seo: { title: string; description: string };
}

export const areas: AreaPage[] = [
  /* ---------------------------------------------------------------------------------------- */
  {
    slug: "northern-suburbs-adelaide",
    name: "Northern Suburbs",
    heading: "NBN & CCTV installation in Adelaide's northern suburbs",
    lead: `Based in ${company.address.suburb}, we're local to Adelaide's north and north-east, from established suburbs like Salisbury and Modbury to new estates around Mawson Lakes and beyond.`,
    suburbs: [
      "Para Hills",
      "Para Hills West",
      "Salisbury",
      "Mawson Lakes",
      "Pooraka",
      "Ingle Farm",
      "Parafield Gardens",
      "Modbury",
      "Tea Tree Gully",
      "Golden Grove",
      "Greenwith",
      "Elizabeth",
      "Munno Para",
      "Blakeview",
    ],
    image: images.homeModern,
    content: {
      intro: `Adelaide's northern suburbs are home base for ${company.name}. Our workshop is in ${company.address.suburb}, so for most northern and north-eastern suburbs we can quote quickly and get to you without a long trip across town.

The north is also one of the most varied parts of Adelaide for telecommunications work. Within a few kilometres you can go from 1960s brick homes on large blocks to brand-new estates where the fibre went in before the houses did, and the work each one needs is quite different.`,
      facts: [
        { label: "Base", value: `${company.address.suburb} – local to the north and north-east` },
        { label: "Common technologies", value: "A mix: FTTN and FTTC in established areas, fibre in many newer estates" },
        { label: "Popular jobs", value: "FTTP upgrades, new-build conduit, data cabling, home CCTV" },
        { label: "Quote", value: "Free, usually within one business day" },
      ],
      sections: [
        {
          id: "housing",
          heading: "Established suburbs and new estates",
          body: `**Established suburbs** such as Para Hills, Salisbury, Ingle Farm, Elizabeth and Modbury were largely built between the 1950s and 1980s. Homes here often have original phone wiring with several extension sockets, which is a common cause of slow or unstable FTTN and FTTC connections. Many of these areas are now seeing [FTTP upgrades](/fttp-upgrade-adelaide), and the original underground conduits are sometimes cracked or blocked after decades in reactive clay soil.

**Newer estates** around Mawson Lakes, Greenwith, Blakeview and the outer north were generally built with fibre. Some estates use nbn fibre and others use a different network operator, so it's worth checking which one serves your lot. New builds need the lead-in conduit installed correctly before connection. See our [FTTP installation guide](/fttp-installation-adelaide).`,
        },
        {
          id: "technologies",
          heading: "Which nbn technologies are common in the north?",
          body: `There's no single answer. Established areas are mostly served by FTTN and FTTC, with pockets of other technologies, while newer developments are mostly fibre. The only reliable way to know is to check your address with nbn. Our guide on [how to check which nbn technology your address has](/blog/how-to-check-nbn-technology-adelaide) shows you how, and explains what the result means.`,
        },
        {
          id: "jobs",
          heading: "Jobs we commonly do in the northern suburbs",
          body: `- **Clearing blocked lead-in conduit** so an FTTP upgrade can go ahead.
- **FTTN and FTTC wiring fixes**: finding the main socket, removing old extensions and isolating alarm wiring. See [FTTN installation and wiring](/services/fttn-installation-adelaide).
- **New-build lead-ins and data cabling** in growth areas, ideally before the plaster goes on.
- **Moving the router out of the garage** with a data cable to a central room.
- **Home CCTV** covering driveways, side gates and sheds. Larger blocks in older suburbs often have long side access that benefits from a camera. See [security camera installation](/services/cctv-installation-adelaide).`,
        },
        {
          id: "cctv",
          heading: "Security cameras for northern suburbs homes and businesses",
          body: `We install CCTV for homes, small shops and light-industrial units across the north, from Pooraka and Parafield to Elizabeth. For homes, the priorities are usually the front door and parcels, the driveway and number plates, and side gates. For businesses, it's entries, counters and yards. We design around what you need to capture and set everything up on your phone before we leave. Read our [CCTV installation guide](/cctv-installation-adelaide) for what to consider.`,
        },
        {
          id: "booking",
          heading: "Booking in the north",
          body: `Send us your suburb and a quick description of the job; photos help. Because we're local, we can often fit in site visits at short notice. Not on the list below? We cover most of the northern and north-eastern suburbs, so just ask.`,
        },
      ],
      faqs: [
        {
          question: "Do you charge extra to come to my suburb?",
          answer: `For most northern and north-eastern suburbs there's no travel surcharge because we're based in ${company.address.suburb}. Your quote will always show the full price.`,
        },
        {
          question: "My new estate home has fibre but no internet. What do I do?",
          answer:
            "First check which network serves your estate (nbn or another fibre operator) and choose a provider that sells plans on it. If the nbn equipment is installed, it's a matter of ordering a plan. If not, the lead-in and connection need to be arranged first.",
        },
        {
          question: "Can you help with an FTTP upgrade in Para Hills or Salisbury?",
          answer:
            "Yes. The upgrade is ordered through your provider, and we can fix any blocked conduit on your property and run cabling to where you want your router afterwards.",
        },
      ],
    },
    nearby: ["eastern-suburbs-adelaide", "adelaide-hills"],
    seo: {
      title: "NBN & CCTV Installers – Northern Adelaide",
      description: `Local nbn installation, cabling and CCTV for Adelaide's northern suburbs, from Salisbury and Modbury to Mawson Lakes. Based in ${company.address.suburb}.`,
    },
  },

  /* ---------------------------------------------------------------------------------------- */
  {
    slug: "eastern-suburbs-adelaide",
    name: "Eastern Suburbs",
    heading: "NBN & CCTV installation in Adelaide's eastern suburbs",
    lead: "Careful cabling for character homes, solid walls and established streets, from Norwood and Kensington to Burnside and Magill.",
    suburbs: [
      "Norwood",
      "Kensington",
      "St Peters",
      "Stepney",
      "Payneham",
      "Marden",
      "Campbelltown",
      "Rostrevor",
      "Magill",
      "Burnside",
      "Toorak Gardens",
      "Glen Osmond",
    ],
    image: images.homeWhite,
    content: {
      intro: `Adelaide's eastern suburbs have some of the city's oldest and most distinctive homes: stone villas, return-verandah cottages, bungalows and solid double-brick houses, alongside newer infill townhouses. They're great homes to live in, but they can be tricky for cabling. Thick walls, decorative ceilings and heritage frontages mean the "quick" way of running a cable is rarely the right way.

${company.name} plans every eastern suburbs job around the house, not just the shortest cable route. We hide cabling where it can't be seen and agree every hole and wall plate with you before we start.`,
      facts: [
        { label: "Typical homes", value: "Stone villas, bungalows, double brick and modern infill" },
        { label: "Common technologies", value: "A mix of FTTN, FTTC and HFC, with some fibre; check your address" },
        { label: "Popular jobs", value: "Router relocation, data points, discreet CCTV" },
        { label: "Quote", value: "Free, often after a short site visit" },
      ],
      sections: [
        {
          id: "character-homes",
          heading: "Cabling in character and heritage homes",
          body: `Sandstone, bluestone and double-brick walls don't have cavities to drop cables through, so planning matters:

- **Use the roof space and under-floor** wherever possible, entering rooms through the ceiling or skirting rather than through feature walls.
- **Keep the front clean.** On heritage-style frontages we route external cabling down the side or rear of the house and use colour-matched conduit where something has to be visible.
- **Protect finishes** such as ornate cornices, ceiling roses, timber floors and original skirtings.
- **Check the local rules.** If your home is in a heritage or character area, some external changes may need approval. Check with your council if you're unsure.`,
        },
        {
          id: "technologies",
          heading: "nbn technologies in the eastern suburbs",
          body: `The eastern suburbs have a mix of fixed-line technologies, with FTTN, FTTC and HFC all present depending on the street, and FTTP upgrades rolling out to many addresses. Because older homes often have long internal phone runs and several extension sockets, [FTTN and FTTC wiring fixes](/services/fttn-installation-adelaide) can make a noticeable difference. On HFC, old pay-TV splitters are a common culprit; see our [FTTC and HFC service](/services/fttc-hfc-installation-adelaide). To find out what your address has, use our guide on [checking your nbn technology](/blog/how-to-check-nbn-technology-adelaide).`,
        },
        {
          id: "wifi",
          heading: "Getting Wi-Fi through solid walls",
          body: `Solid stone and brick block Wi-Fi far more than plasterboard. In a long villa with the connection in the front room, the kitchen and back living area often get a weak signal. Moving the router doesn't always help; running a data cable to a second access point does. We typically install one wired mesh point towards the back of the house, plus data points for the TV and home office, so the most important devices don't rely on Wi-Fi at all.`,
        },
        {
          id: "cctv",
          heading: "Discreet security cameras for established homes",
          body: `In established streets, CCTV needs to protect the home without spoiling its look or intruding on neighbours. We use compact camera styles in colours that suit the house, mount them under verandahs and eaves where possible, and use privacy masking so cameras don't record neighbouring windows or yards. Side lanes and rear access, common in older blocks, are usually the most important areas to cover. See our [CCTV installation guide](/cctv-installation-adelaide) for more.`,
        },
        {
          id: "infill",
          heading: "Townhouses and infill developments",
          body: `Many eastern suburbs blocks have been subdivided into townhouses. These often share a lead-in or have a small comms cupboard, and space for equipment can be tight. We can help plan data cabling during construction, tidy up an overcrowded cupboard, or add cameras that cover a shared driveway with the other owners' agreement.`,
        },
      ],
      faqs: [
        {
          question: "Can you run cables without damaging my period home?",
          answer:
            "Yes. We plan routes through the roof space and under the floor, avoid feature walls and decorative finishes, and agree every penetration with you before drilling.",
        },
        {
          question: "Why is my Wi-Fi so poor at the back of the house?",
          answer:
            "Stone and double-brick walls absorb Wi-Fi signals. A wired access point towards the back of the house is usually the most reliable fix.",
        },
        {
          question: "Do I need council approval for cameras or cabling on a heritage home?",
          answer:
            "Most internal cabling doesn't need approval, but some external changes to heritage-listed or character-zoned homes might. Check with your council if you're unsure; we'll keep external work as discreet as possible.",
        },
      ],
    },
    nearby: ["northern-suburbs-adelaide", "adelaide-hills"],
    seo: {
      title: "NBN & CCTV Installers – Eastern Suburbs",
      description:
        "nbn cabling, Wi-Fi and CCTV for Adelaide's eastern suburbs. Careful work in stone, brick and character homes from Norwood to Burnside. Free quotes.",
    },
  },

  /* ---------------------------------------------------------------------------------------- */
  {
    slug: "adelaide-hills",
    name: "Adelaide Hills",
    heading: "NBN & CCTV installation in the Adelaide Hills",
    lead: "Cabling, connectivity and security cameras for Hills townships and semi-rural properties, from Stirling and Crafers to Hahndorf, Woodside and Mount Barker.",
    suburbs: [
      "Stirling",
      "Aldgate",
      "Crafers",
      "Bridgewater",
      "Mylor",
      "Hahndorf",
      "Mount Barker",
      "Littlehampton",
      "Nairne",
      "Woodside",
      "Lobethal",
      "Uraidla",
    ],
    image: images.streetLines,
    content: {
      intro: `Working in the Adelaide Hills is different from working on the plains. Blocks are bigger, driveways are longer, sheds and studios sit well away from the house, and the terrain, trees and weather all play a part. ${company.name} plans Hills jobs around those realities, whether it's a townhouse in Mount Barker or a few acres outside Woodside.`,
      facts: [
        { label: "Typical properties", value: "Township homes, acreage, rural-residential" },
        { label: "Connectivity", value: "Fixed-line in many townships; fixed wireless or satellite on some rural properties" },
        { label: "Popular jobs", value: "Long cable runs to sheds, gate and driveway cameras, backup power" },
        { label: "Quote", value: "Free; site visit recommended for larger properties" },
      ],
      sections: [
        {
          id: "connectivity",
          heading: "How Hills properties connect",
          body: `Townships such as Mount Barker, Stirling and Hahndorf are mostly served by fixed-line nbn technologies, with fibre in newer developments, particularly around Mount Barker's growth areas. Further out, some rural and semi-rural properties use nbn fixed wireless or satellite instead of a fixed line. Check your address to see which applies; our guide on [how to check your nbn technology](/blog/how-to-check-nbn-technology-adelaide) explains each result.

Whatever the connection, we can run cabling from where it enters the house to where you need it, and out to studios, offices and sheds.`,
        },
        {
          id: "long-runs",
          heading: "Getting the connection to sheds, studios and granny flats",
          body: `Wi-Fi rarely reaches a shed 50 metres from the house. For outbuildings we typically:

- run a buried, outdoor-rated network cable in conduit for distances within ethernet limits;
- use fibre for longer runs, which also avoids lightning-induced surges between buildings; or
- install a point-to-point wireless link where trenching isn't practical.

Each option is planned around trenching distance, rock and tree roots, and where power is available.`,
        },
        {
          id: "cctv",
          heading: "Security cameras for acreage and rural properties",
          body: `Rural security is less about the front door and more about **gates, driveways, sheds and machinery**. Points we plan for:

- **Gate and driveway cameras** that read number plates at the property entrance, sometimes well away from the house.
- **Sheds and workshops**, often the first target for theft.
- **Lighting:** dark rural nights need cameras with good infrared range, or lighting added near key areas.
- **Wildlife and trees:** kangaroos, birds and moving branches cause false alerts unless motion zones and smart detection are set carefully.

See our [CCTV installation guide](/cctv-installation-adelaide) and [security camera installation service](/services/cctv-installation-adelaide) for more.`,
        },
        {
          id: "power",
          heading: "Storms, bushfire season and backup power",
          body: `The Hills see more storm damage and power outages than the plains, and during the fire danger season power can be cut as a precaution. A UPS (battery backup) keeps the router, recorder and cameras running through short outages. FTTP connections also need power at the premises to work. We can recommend a UPS size based on how long you want your system to stay up. For bushfire planning, follow the CFS's guidance and don't rely on internet or cameras as your source of warnings.`,
        },
        {
          id: "booking",
          heading: "Booking a job in the Hills",
          body: `For larger properties we usually recommend a quick site visit so we can check distances, ground conditions and where equipment can go. Send us your town or locality and a short description, and we'll arrange a time.`,
        },
      ],
      faqs: [
        {
          question: "Can you get internet to my shed or studio?",
          answer:
            "Yes. Depending on distance we use buried network cable, fibre or a point-to-point wireless link. We'll recommend the most reliable option for your property.",
        },
        {
          question: "Do you install for fixed wireless or satellite properties?",
          answer:
            "nbn installs its own fixed wireless or satellite equipment through your provider. We can do the cabling inside and around your property, plus Wi-Fi, outbuilding links and CCTV.",
        },
        {
          question: "Will my cameras work during a power outage?",
          answer:
            "Not without backup power. A UPS keeps the recorder, cameras and router running for a period depending on its size. We can recommend one to suit your system.",
        },
      ],
    },
    nearby: ["eastern-suburbs-adelaide", "northern-suburbs-adelaide"],
    seo: {
      title: "NBN & CCTV Installation – Adelaide Hills",
      description:
        "Cabling, outbuilding connections and CCTV for Adelaide Hills homes and acreage, from Stirling to Mount Barker. Gate cameras and backup power. Free quotes.",
    },
  },
];

export function getArea(slug: string) {
  return areas.find((area) => area.slug === slug);
}
