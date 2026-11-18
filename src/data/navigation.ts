export const mainNav = [
  { label: "Services", href: "/services" },
  { label: "Service areas", href: "/areas" },
  { label: "Guides", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/** Footer service links – descriptive anchor text pointing at the main keyword pages. */
export const footerServiceLinks = [
  { label: "NBN installation Adelaide", href: "/nbn-installation-adelaide" },
  { label: "FTTP installation Adelaide", href: "/fttp-installation-adelaide" },
  { label: "FTTP upgrades (FTTN & FTTC to fibre)", href: "/fttp-upgrade-adelaide" },
  { label: "FTTP fibre installation service", href: "/services/fttp-installation-adelaide" },
  { label: "FTTN installation & wiring", href: "/services/fttn-installation-adelaide" },
  { label: "FTTC & HFC installation", href: "/services/fttc-hfc-installation-adelaide" },
  { label: "CCTV installation Adelaide", href: "/cctv-installation-adelaide" },
  { label: "Security camera installation", href: "/services/cctv-installation-adelaide" },
] as const;

export function isActivePath(pathname: string | null, href: string) {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
