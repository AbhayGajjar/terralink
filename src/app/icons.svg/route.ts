import { iconSprite } from "@/components/ui/icon-registry";

/** /icons.svg – every site icon as an SVG sprite, written as a static file at build time. */
export const dynamic = "force-static";

export function GET() {
  return new Response(iconSprite(), {
    headers: { "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=86400" },
  });
}
