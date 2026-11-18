import { Marked } from "marked";
import { sitePath } from "./site";

/**
 * Markdown → HTML at build time (server only, no client JavaScript).
 * - Internal links ("/faq") are rewritten to the exact form the host serves ("/faq/").
 * - External links open in a new tab.
 * - HTML comments (used for "VERIFY:" editor notes) are stripped so they never reach the page.
 */
const marked = new Marked({
  gfm: true,
  async: false,
  walkTokens(token) {
    if (token.type === "link" && token.href.startsWith("/")) {
      const [path, hash] = token.href.split("#");
      token.href = sitePath(path) + (hash ? `#${hash}` : "");
    }
  },
  renderer: {
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const external = /^https?:\/\//.test(href);
      return `<a href="${href}"${title ? ` title="${title}"` : ""}${external ? ' target="_blank" rel="noopener"' : ""}>${text}</a>`;
    },
    table(token) {
      // Wrap tables so they scroll sideways on phones instead of widening the page.
      const header = token.header.map((cell) => `<th>${this.parser.parseInline(cell.tokens)}</th>`).join("");
      const rows = token.rows
        .map((row) => `<tr>${row.map((cell) => `<td>${this.parser.parseInline(cell.tokens)}</td>`).join("")}</tr>`)
        .join("");
      return `<div class="table-scroll"><table><thead><tr>${header}</tr></thead><tbody>${rows}</tbody></table></div>`;
    },
  },
});

export function stripComments(src: string) {
  return src.replace(/<!--[\s\S]*?-->/g, "");
}

export function renderMarkdown(src: string): string {
  return marked.parse(stripComments(src)) as string;
}

/** Plain-text version (for word counts, reading time and schema). */
export function markdownToText(src: string) {
  return stripComments(src)
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`|-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function wordCount(src: string) {
  return markdownToText(src).split(" ").filter(Boolean).length;
}
