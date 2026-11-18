import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import ReactDOM from "react-dom";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { company } from "@/data/company";
import { localBusinessJsonLd, siteUrl, websiteJsonLd } from "@/lib/seo";
import Analytics from "@/components/layout/Analytics";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import JsonLd from "@/components/ui/JsonLd";
import Icon from "@/components/ui/Icon";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `NBN & CCTV Installation Adelaide | ${company.name}`,
    template: `%s | ${company.name}`,
  },
  description: company.description,
  applicationName: company.name,
  authors: [{ name: company.name }],
  creator: company.name,
  formatDetection: { telephone: true, email: true, address: true },
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  verification: {
    ...(googleVerification ? { google: googleVerification } : {}),
    ...(bingVerification ? { other: { "msvalidate.01": bingVerification } } : {}),
  },
};

export const viewport: Viewport = {
  themeColor: "#0A1F44",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  // Placeholder photos are served from Unsplash: open that connection early (hero image = LCP).
  // Remove once all images are local files in /public.
  ReactDOM.preconnect("https://images.unsplash.com");
  return (
    <html lang="en-AU" className={`${inter.variable} ${jakarta.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Suspense fallback={null}>
          <FloatingActions callIcon={<Icon name="phone" />} quoteIcon={<Icon name="form" />} />
        </Suspense>
        <JsonLd data={[localBusinessJsonLd(), websiteJsonLd()]} />
        <Analytics />
      </body>
    </html>
  );
}
