import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/sections/PageHero";
import ProjectsGallery from "@/components/sections/ProjectsGallery";
import CtaBanner from "@/components/sections/CtaBanner";
import Icon from "@/components/ui/Icon";

export const metadata: Metadata = buildMetadata({
  title: "Our Projects – NBN & CCTV Installations in Adelaide",
  description:
    "See recent TerraLink projects: FTTP, FTTN, FTTC and HFC NBN installations and CCTV security camera systems for homes and businesses across Adelaide and South Australia.",
  path: "/projects",
  keywords: ["NBN installation projects Adelaide", "CCTV installation examples Adelaide"],
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our projects"
        title={
          <>
            Recent work across <span className="text-gradient">South Australia</span>
          </>
        }
        lead="From single-home fibre connections to multi-camera commercial security systems – browse a selection of the installations our team has completed."
        breadcrumbs={[{ name: "Projects", path: "/projects" }]}
      >
        <Link href="/contact" className="btn btn--cta btn--lg">
          Start your project <Icon name="arrowRight" />
        </Link>
      </PageHero>

      <section className="section section--light" aria-label="Project gallery">
        <div className="container">
          <ProjectsGallery />
        </div>
      </section>

      <CtaBanner title="Have a project in mind?" text="Tell us about your property and what you need – we'll come back with a clear, fixed-price quote." />
    </>
  );
}
