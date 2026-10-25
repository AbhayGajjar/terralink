"use client";

import { useMemo, useState } from "react";
import { Image as AntImage, Segmented } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { projectCategories, projects, type ProjectCategory } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import styles from "./ProjectsGallery.module.css";

type Filter = "all" | ProjectCategory;

export default function ProjectsGallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const [preview, setPreview] = useState<{ open: boolean; current: number }>({ open: false, current: 0 });

  const visible = useMemo(() => (filter === "all" ? projects : projects.filter((p) => p.category === filter)), [filter]);

  return (
    <div>
      <div className={styles.toolbar}>
        <Segmented<Filter>
          size="large"
          shape="round"
          value={filter}
          onChange={setFilter}
          options={projectCategories.map((c) => ({
            value: c.value,
            label: (
              <span className={styles.option}>
                {c.label}
                <span className={styles.count}>{c.value === "all" ? projects.length : projects.filter((p) => p.category === c.value).length}</span>
              </span>
            ),
          }))}
          aria-label="Filter projects"
        />
        <p className={styles.result} aria-live="polite">
          Showing {visible.length} project{visible.length === 1 ? "" : "s"}
        </p>
      </div>

      <motion.ul layout className={styles.grid}>
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project, index) => (
            <motion.li
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={project} onOpen={() => setPreview({ open: true, current: index })} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {/* Lightbox: AntD preview group fed by the currently filtered images */}
      <AntImage.PreviewGroup
        items={visible.map((p) => ({ src: p.image.src.replace(/w=\d+/, "w=2000"), alt: p.image.alt }))}
        preview={{
          open: preview.open,
          current: preview.current,
          onOpenChange: (open) => setPreview((s) => ({ ...s, open })),
          onChange: (current) => setPreview((s) => ({ ...s, current })),
          countRender: (current, total) => `${visible[current - 1]?.title ?? ""} · ${current} / ${total}`,
        }}
      />
    </div>
  );
}
