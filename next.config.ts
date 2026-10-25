import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cache Components is deliberately left off: Ant Design evaluates Date.now()/Math.random()
  // at module scope (e.g. its portal scroll-locker), which Cache Components rejects during
  // prerendering. Every page here is static content, so all routes are still prerendered at build time.
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Tree-shake Ant Design and its icon set so only the components we use are bundled.
  experimental: {
    optimizePackageImports: ["antd", "@ant-design/icons"],
  },
};

export default nextConfig;
