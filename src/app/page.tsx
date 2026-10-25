import type { Metadata } from "next";
import { company } from "@/data/company";
import { homeFaqs } from "@/data/home";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import Hero from "@/components/sections/home/Hero";
import ServicesOverview from "@/components/sections/home/ServicesOverview";
import WhyChoose from "@/components/sections/home/WhyChoose";
import StatsStrip from "@/components/sections/home/StatsStrip";
import HowItWorks from "@/components/sections/home/HowItWorks";
import NbnExplainer from "@/components/sections/home/NbnExplainer";
import FeaturedProjects from "@/components/sections/home/FeaturedProjects";
import Testimonials from "@/components/sections/home/Testimonials";
import FaqSection from "@/components/sections/FaqSection";
import CtaBanner from "@/components/sections/CtaBanner";
import SectionHeading from "@/components/ui/SectionHeading";
import JsonLd from "@/components/ui/JsonLd";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "NBN & CCTV Installation Adelaide, SA",
    description:
      "TerraLink provides expert NBN installation (FTTP, FTTN, FTTC & HFC) and CCTV security camera installation across Adelaide and South Australia. Local, fully insured technicians. Get a free quote.",
    path: "/",
  }),
  // The home page uses the full brand title rather than the "%s | TerraLink" template.
  title: { absolute: `${company.name} | NBN & CCTV Installation Adelaide, SA` },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <WhyChoose />
      <StatsStrip />

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

      <FeaturedProjects />

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

      <FaqSection items={homeFaqs} />
      <CtaBanner tone="white" />
      <JsonLd data={faqJsonLd(homeFaqs)} />
    </>
  );
}
