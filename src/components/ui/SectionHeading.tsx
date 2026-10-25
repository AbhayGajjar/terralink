import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  id?: string;
  className?: string;
}

export default function SectionHeading({ eyebrow, title, lead, align = "center", as: Tag = "h2", id, className }: SectionHeadingProps) {
  return (
    <Reveal className={`section-heading ${align === "center" ? "section-heading--center" : ""} ${className ?? ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <Tag className="section-title" id={id}>
        {title}
      </Tag>
      {lead && <p className="section-lead">{lead}</p>}
    </Reveal>
  );
}
