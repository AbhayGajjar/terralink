import { images, type SiteImage } from "@/lib/images";

export type ProjectCategory = "nbn" | "cctv";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  /** Related service page */
  serviceSlug: string;
  suburb: string;
  propertyType: "Residential" | "Commercial";
  summary: string;
  image: SiteImage;
  featured?: boolean;
}

export const projectCategories: { label: string; value: "all" | ProjectCategory }[] = [
  { label: "All", value: "all" },
  { label: "NBN", value: "nbn" },
  { label: "CCTV", value: "cctv" },
];

/**
 * PLACEHOLDER PROJECTS – replace titles, suburbs, summaries and images with
 * real TerraLink jobs (with the customer's permission), then set PROJECTS_ARE_REAL to true.
 * While false: the home page "featured projects" section is hidden, and /projects is labelled as
 * example job types, kept out of the sitemap and marked noindex.
 */
export const PROJECTS_ARE_REAL = false;

export const projects: Project[] = [
  {
    id: "fttp-new-estate",
    title: "FTTP connections for a new residential estate",
    category: "nbn",
    serviceSlug: "fttp-installation-adelaide",
    suburb: "Mawson Lakes",
    propertyType: "Residential",
    summary: "Fibre lead-ins and NBN connection boxes installed across 40 new homes, completed ahead of handover.",
    image: images.homeModern,
    featured: true,
  },
  {
    id: "cctv-warehouse",
    title: "16-camera CCTV system for a logistics warehouse",
    category: "cctv",
    serviceSlug: "cctv-installation-adelaide",
    suburb: "Wingfield",
    propertyType: "Commercial",
    summary: "4K perimeter and loading-dock coverage with a 30-day NVR and remote monitoring for management.",
    image: images.cctvWall,
    featured: true,
  },
  {
    id: "office-comms",
    title: "Office fit-out comms & NBN connection",
    category: "nbn",
    serviceSlug: "fttp-installation-adelaide",
    suburb: "Adelaide CBD",
    propertyType: "Commercial",
    summary: "Enterprise-grade fibre connection, comms cabinet and patching for a 60-seat office fit-out.",
    image: images.officeCorridor,
    featured: true,
  },
  {
    id: "fttn-rewire",
    title: "FTTN re-wire to fix constant drop-outs",
    category: "nbn",
    serviceSlug: "fttn-installation-adelaide",
    suburb: "Glenelg",
    propertyType: "Residential",
    summary: "Removed legacy extension wiring and installed a dedicated line – sync speed improved by 40%.",
    image: images.homeWhite,
  },
  {
    id: "home-cctv",
    title: "Six-camera home security system",
    category: "cctv",
    serviceSlug: "cctv-installation-adelaide",
    suburb: "Norwood",
    propertyType: "Residential",
    summary: "Turret cameras with colour night vision covering the driveway, entries and backyard, viewable on mobile.",
    image: images.homeEvening,
  },
  {
    id: "hfc-relocation",
    title: "HFC connection relocated to home office",
    category: "nbn",
    serviceSlug: "fttc-hfc-installation-adelaide",
    suburb: "Golden Grove",
    propertyType: "Residential",
    summary: "New coaxial run and outlet so the NBN box and router sit centrally for whole-home Wi-Fi.",
    image: images.homeTimber,
  },
  {
    id: "retail-cctv",
    title: "Retail store CCTV upgrade",
    category: "cctv",
    serviceSlug: "cctv-installation-adelaide",
    suburb: "Marion",
    propertyType: "Commercial",
    summary: "Replaced an ageing analogue system with HD IP cameras covering registers, entries and stockroom.",
    image: images.cameraLens,
  },
  {
    id: "fttc-install",
    title: "FTTC connection & network cabinet",
    category: "nbn",
    serviceSlug: "fttc-hfc-installation-adelaide",
    suburb: "Prospect",
    propertyType: "Residential",
    summary: "FTTC device installation with a structured cabling cabinet and data points to every bedroom.",
    image: images.patchPanelRed,
  },
  {
    id: "estate-cctv",
    title: "Acreage property perimeter cameras",
    category: "cctv",
    serviceSlug: "cctv-installation-adelaide",
    suburb: "Adelaide Hills",
    propertyType: "Residential",
    summary: "Long-range cameras on the gate and sheds with smart alerts for people and vehicles.",
    image: images.cctvPole,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
