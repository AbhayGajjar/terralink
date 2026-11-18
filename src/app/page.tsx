import type { Metadata } from "next";
import { company } from "@/data/company";
import { homeFaqs, STATS_ARE_REAL, TESTIMONIALS_ARE_REAL } from "@/data/home";
import { PROJECTS_ARE_REAL } from "@/data/projects";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import Hero from "@/components/sections/home/Hero";
import ServicesOverview from "@/components/sections/home/ServicesOverview";
import WhyChoose from "@/components/sections/home/WhyChoose";
import dynamic from "next/dynamic";
import HowItWorks from "@/components/sections/home/HowItWorks";
import NbnExplainer from "@/components/sections/home/NbnExplainer";
import FeaturedProjects from "@/components/sections/home/FeaturedProjects";
// Hidden until real data is added (see src/data/home.ts) – code-split so their JS only loads when shown.
const StatsStrip = dynamic(() => import("@/components/sections/home/StatsStrip"));
const Testimonials = dynamic(() => import("@/components/sections/home/Testimonials"));
import FaqSection from "@/components/sections/FaqSection";
import CtaBanner from "@/components/sections/CtaBanner";
import SectionHeading from "@/components/ui/SectionHeading";
import JsonLd from "@/components/ui/JsonLd";
import RelatedLinks from "@/components/content/RelatedLinks";
import { linkCards } from "@/lib/links";
import { getAllPosts } from "@/lib/blog";
import { landingPages } from "@/data/landing-pages";
import { areas } from "@/data/areas";

export const metadata: Metadata = buildMetadata({
  title: `NBN & CCTV Installation Adelaide | ${company.name}`,
  absoluteTitle: true,
  description:
    "nbn installation and cabling (FTTP, FTTN, FTTC, HFC) and CCTV security camera installation for Adelaide homes and businesses. Free local quotes.",
  path: "/",
});

export default function HomePage() {
  const guides = linkCards(landingPages.map((page) => `/${page.slug}`));
  const latestPosts = linkCards(getAllPosts().slice(0, 3).map((post) => `/blog/${post.slug}`));
  const areaLinks = linkCards([...areas.map((area) => `/areas/${area.slug}`), "/areas"]);
  return (
    <>
      <Hero />
      <ServicesOverview />
      <RelatedLinks id="adelaide-guides" eyebrow="Popular in Adelaide" title="Find the right help for your home" items={guides} tone="white" />
      <WhyChoose />
      {STATS_ARE_REAL && <StatsStrip />}

      <section className="section section--white" aria-labelledby="process-title">
        <div className="container">
          <SectionHeading
            id="process-title"
            eyebrow="How it works"
            title="From quote to connected in four simple steps"
            lead="No jargon, no runaround. Here's what to expect when you book with TerraLink."
          />
          <HowItWorks />
        </div>
      </section>

      <section className="section section--dark" aria-labelledby="nbn-title">
        <div className="container">
          <SectionHeading
            id="nbn-title"
            eyebrow="NBN explained"
            title={
              <>
                Which <span className="text-gradient">NBN technology</span> do you have?
              </>
            }
            lead="Your address is assigned one of four main fixed-line technologies. Here's what each one means for you – in plain English."
          />
          <NbnExplainer />
        </div>
      </section>

      {PROJECTS_ARE_REAL && <FeaturedProjects />}

      {TESTIMONIALS_ARE_REAL && (
      <section className="section section--dark" aria-labelledby="reviews-title">
        <div className="container">
          <SectionHeading
            id="reviews-title"
            eyebrow="Customer reviews"
            title={
              <>
                Trusted by homes &amp; businesses <span className="text-gradient">across SA</span>
              </>
            }
          />
          <Testimonials />
        </div>
      </section>
      )}

      <RelatedLinks id="latest-guides" eyebrow="Guides" title="Latest nbn and CCTV guides" items={latestPosts} />
      <RelatedLinks id="home-areas" eyebrow="Service areas" title="Local technicians across Adelaide" items={areaLinks} tone="white" />
      <FaqSection items={homeFaqs} />
      <CtaBanner tone="white" />
      <JsonLd data={faqJsonLd(homeFaqs)} />
    </>
  );
}
