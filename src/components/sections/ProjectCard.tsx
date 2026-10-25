import Image from "next/image";
import type { Project } from "@/data/projects";
import Icon from "@/components/ui/Icon";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  project: Project;
  /** When provided the card becomes a button (used to open the gallery lightbox). */
  onOpen?: () => void;
  sizes?: string;
}

export default function ProjectCard({ project, onOpen, sizes = "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" }: ProjectCardProps) {
  const content = (
    <>
      <div className={styles.media}>
        <Image src={project.image.src} alt={project.image.alt} fill sizes={sizes} className={styles.image} />
        <span className={`${styles.tag} ${project.category === "cctv" ? styles.tagCctv : ""}`}>
          <Icon name={project.category === "cctv" ? "camera" : "fibre"} />
          {project.category === "cctv" ? "CCTV" : "NBN"}
        </span>
        {onOpen && (
          <span className={styles.zoom} aria-hidden="true">
            <Icon name="search" />
          </span>
        )}
      </div>
      <div className={styles.body}>
        <div className={styles.meta}>
          <span>
            <Icon name="location" /> {project.suburb}
          </span>
          <span>
            <Icon name={project.propertyType === "Commercial" ? "shop" : "home"} /> {project.propertyType}
          </span>
        </div>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.summary}>{project.summary}</p>
      </div>
    </>
  );

  if (onOpen) {
    return (
      <button type="button" className={`card card--hover ${styles.card}`} onClick={onOpen} aria-label={`View photo: ${project.title}`}>
        {content}
      </button>
    );
  }

  return <article className={`card card--hover ${styles.card}`}>{content}</article>;
}
