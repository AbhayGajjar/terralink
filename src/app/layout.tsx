import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { company } from "@/data/company";
import { baseKeywords, localBusinessJsonLd, siteUrl } from "@/lib/seo";
import Providers from "@/components/layout/Providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import JsonLd from "@/components/ui/JsonLd";
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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name} | NBN & CCTV Installation Adelaide, SA`,
    template: `%s | ${company.name}`,
  },
  description: company.description,
  applicationName: company.name,
  keywords: baseKeywords,
  authors: [{ name: company.name }],
  creator: company.name,
  formatDetection: { telephone: true, email: true, address: true },
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: company.name,
    url: siteUrl,
    title: `${company.name} | NBN & CCTV Installation Adelaide`,
    description: company.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.name} | NBN & CCTV Installation Adelaide`,
    description: company.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A1F44",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-AU" className={`${inter.variable} ${jakarta.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <AntdRegistry>
          <Providers>
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <Suspense fallback={null}>
              <FloatingActions />
            </Suspense>
          </Providers>
        </AntdRegistry>
        <JsonLd data={localBusinessJsonLd()} />
      </body>
    </html>
  );
}
