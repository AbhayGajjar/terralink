/**
 * Placeholder photography from Unsplash. Replace these with real TerraLink job
 * photos (drop files into /public/images and use paths like "/images/job-1.jpg").
 */
export function unsplash(id: string, width = 1600) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;
}

export interface SiteImage {
  src: string;
  alt: string;
}

// PLACEHOLDER IMAGES – every entry below should be swapped for real photos.
export const images = {
  fibreStrands: { src: unsplash("1597733336794-12d05021d510"), alt: "Glowing blue fibre optic strands carrying light" },
  patchPanelBlue: { src: unsplash("1544197150-b99a580bb7a8"), alt: "Network patch panel with neatly routed blue data cables" },
  patchPanelRed: { src: unsplash("1606765962248-7ff407b51667"), alt: "Rows of red network cables terminated in a patch panel" },
  networkRack: { src: unsplash("1520869562399-e772f042f422"), alt: "Network switch with colour-coded ethernet cables" },
  serverRacks: { src: unsplash("1558494949-ef010cbdcc31"), alt: "Server racks with organised fibre and copper cabling" },
  cablesGreen: { src: unsplash("1551703599-6b3e8379aa8c"), alt: "Close-up of network cabling being organised in a comms cabinet" },
  routerCables: { src: unsplash("1591808216268-ce0b82787efe"), alt: "Red ethernet cables plugged into a network device" },
  streetLines: { src: unsplash("1473341304170-971dccb5ac1e"), alt: "Overhead lines and poles at sunset in a regional area" },
  technician: { src: unsplash("1621905251189-08b45d6a269e"), alt: "Technician in a hard hat installing equipment in a wall cabinet" },
  technicianPlans: { src: unsplash("1581092160562-40aa08e78837"), alt: "Technician reviewing installation plans and tools on a workbench" },
  technicianRepair: { src: unsplash("1563770660941-20978e870e26"), alt: "Technician using a screwdriver on electronic equipment" },
  cctvWall: { src: unsplash("1557597774-9d273605dfa9"), alt: "Wall of mounted CCTV security cameras" },
  cctvPole: { src: unsplash("1589935447067-5531094415d1"), alt: "Security camera mounted on a pole against a blue sky" },
  cameraLens: { src: unsplash("1626379953822-baec19c3accd"), alt: "Close-up of a security camera lens" },
  smartLock: { src: unsplash("1558002038-1055907df827"), alt: "Homeowner controlling home security from a smartphone app" },
  homeEvening: { src: unsplash("1568605114967-8130f3a36994"), alt: "Family home lit up in the evening" },
  homeModern: { src: unsplash("1600585154340-be6161a56a0c"), alt: "Modern two-storey home with large windows" },
  homePool: { src: unsplash("1580587771525-78b9dba3b914"), alt: "Contemporary home with a pool in the backyard" },
  homeTimber: { src: unsplash("1600566753190-17f0baa2a6c3"), alt: "New-build home with timber and concrete facade" },
  homeWhite: { src: unsplash("1512917774080-9991f1c4c750"), alt: "White rendered modern home with landscaped garden" },
  officeCorridor: { src: unsplash("1497366216548-37526070297c"), alt: "Modern office fit-out with open-plan workspace" },
  officeEmpty: { src: unsplash("1622126807280-9b5b32b28e77"), alt: "Newly fitted out office with desks and lighting" },
  officeTowers: { src: unsplash("1486406146926-c627a92ad1ab"), alt: "Commercial office towers viewed from street level" },
  officeTeam: { src: unsplash("1542744173-8e7e53415bb0"), alt: "Business team working in a connected office" },
  team: { src: unsplash("1522071820081-009f0129c71c"), alt: "Team collaborating around a table with laptops" },
} satisfies Record<string, SiteImage>;
