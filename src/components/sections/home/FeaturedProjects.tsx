import Link from "next/link";
import { featuredProjects } from "@/data/projects";
import SectionHeading from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import ProjectCard from "../ProjectCard";
import styles from "./FeaturedProjects.module.css";

export default function FeaturedProjects() {
  return (
    <section className="section section--light" aria-labelledby="projects-title">
      <div className="container">
        <div className={styles.head}>
          <SectionHeading
            id="projects-title"
            align="left"
            eyebrow="Recent work"
            title="Projects we're proud of"
            lead="A snapshot of recent NBN and CCTV installations for homes, builders and businesses across South Australia."
          />
          <Link href="/projects" className={`btn btn--outline ${styles.all}`}>
            View all projects <Icon name="arrowRight" />
          </Link>
        </div>
        <Stagger className="grid grid--3">
          {featuredProjects.slice(0, 3).map((project) => (
            <StaggerItem key={project.id}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
