import type { NextConfig } from "next";
import { legacyRedirects } from "./src/data/redirects";

// Set by the GitHub Pages workflow: build plain static files (no server, so no /api routes or
// image optimisation) served from the repo's sub-path, e.g. https://user.github.io/terralink.
const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  ...(isStaticExport && {
    output: "export",
    basePath: process.env.PAGES_BASE_PATH || undefined,
    trailingSlash: true,
  }),
  // Cache Components is deliberately left off: Ant Design evaluates Date.now()/Math.random()
  // at module scope (e.g. its portal scroll-locker), which Cache Components rejects during
  // prerendering. Every page here is static content, so all routes are still prerendered at build time.
  images: {
    unoptimized: isStaticExport,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Old URLs → new keyword-rich URLs. Only works with a Node server (e.g. Render); the static
  // export can't send redirects, so it gets generated redirect pages instead (see services/[slug]).
  ...(!isStaticExport && {
    async redirects() {
      return legacyRedirects.map((r) => ({ ...r, permanent: true }));
    },
  }),
  // Tree-shake Ant Design and its icon set so only the components we use are bundled.
  experimental: {
    optimizePackageImports: ["antd", "@ant-design/icons"],
  },
};

export default nextConfig;
