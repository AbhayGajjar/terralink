import { renderMarkdown } from "@/lib/markdown";

/** Renders trusted, repo-authored Markdown as HTML at build time. */
export default function Markdown({ source, className }: { source: string; className?: string }) {
  return <div className={`prose ${className ?? ""}`} dangerouslySetInnerHTML={{ __html: renderMarkdown(source) }} />;
}
