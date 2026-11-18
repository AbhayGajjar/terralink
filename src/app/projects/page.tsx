import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PROJECTS_ARE_REAL } from "@/data/projects";
import PageHero from "@/components/sections/PageHero";
import ProjectsGallery from "@/components/sections/ProjectsGallery";
import AntdProvider from "@/components/layout/AntdProvider";
import CtaBanner from "@/components/sections/CtaBanner";
import Icon from "@/components/ui/Icon";

export const metadata: Metadata = buildMetadata({
  title: PROJECTS_ARE_REAL ? "NBN & CCTV Installation Projects Adelaide" : "Typical NBN & CCTV Jobs in Adelaide",
  description:
    "Examples of the nbn installation, cabling and CCTV jobs TerraLink does for homes, builders and businesses across Adelaide.",
  path: "/projects",
  // Kept out of Google until the gallery shows real, completed TerraLink jobs (see src/data/projects.ts).
  noindex: !PROJECTS_ARE_REAL,
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our projects"
        title={
          <>
            {PROJECTS_ARE_REAL ? "NBN & CCTV installation projects" : "Typical NBN & CCTV jobs"} <span className="text-gradient">in Adelaide</span>
          </>
        }
        lead={
          PROJECTS_ARE_REAL
            ? "From single-home fibre connections to multi-camera commercial security systems – a selection of installations our team has completed."
            : "Examples of the kinds of jobs we do, from single-home fibre connections to multi-camera business systems. Photos are illustrative; real project photos are coming soon."
        }
        breadcrumbs={[{ name: "Projects", path: "/projects" }]}
      >
        <Link href="/contact" className="btn btn--cta btn--lg">
          Start your project <Icon name="arrowRight" />
        </Link>
      </PageHero>

      <section className="section section--light" aria-label="Project gallery">
        <div className="container">
          <AntdProvider>
            <ProjectsGallery />
          </AntdProvider>
        </div>
      </section>

      <CtaBanner title="Have a project in mind?" text="Tell us about your property and what you need – we'll come back with a clear, fixed-price quote." />
    </>
  );
}
