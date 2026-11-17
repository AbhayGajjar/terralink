/**
 * Permanent redirects from old URLs to their new homes. Never delete an entry: old links
 * shared on social media, in emails or already indexed by Google keep working.
 *
 * Kept free of imports so next.config.ts can read it directly.
 * - On a Node server (next start / Render) these become real 308 redirects (next.config.ts).
 * - On the static GitHub Pages export, each `source` gets a generated page that instantly
 *   forwards to `destination` and points its canonical tag at it.
 */
export const legacyRedirects: { source: string; destination: string }[] = [
  { source: "/services/fttp-installation", destination: "/services/fttp-installation-adelaide" },
  { source: "/services/fttn-installation", destination: "/services/fttn-installation-adelaide" },
  { source: "/services/fttc-hfc", destination: "/services/fttc-hfc-installation-adelaide" },
  { source: "/services/cctv-installation", destination: "/services/cctv-installation-adelaide" },
];
