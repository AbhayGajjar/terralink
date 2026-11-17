import { ImageResponse } from "next/og";
import { company } from "@/data/company";
import { ogImageKey } from "@/lib/seo";
import { siteRoutes, unlistedRoutes } from "@/lib/routes";

/**
 * Generated share images, one per page, written as real .png files at build time
 * (e.g. /og/services--fttp-installation-adelaide.png) so static hosts serve them as image/png.
 * /og/logo.png is the square logo referenced by the LocalBusiness structured data.
 */
export const dynamic = "force-static";
export const dynamicParams = false;

function allImages() {
  return [...siteRoutes(), ...unlistedRoutes].map((route) => ({
    file: `${ogImageKey(route.path)}.png`,
    title: route.ogTitle,
    eyebrow: route.ogEyebrow,
  }));
}

export function generateStaticParams() {
  return [...allImages().map((img) => ({ image: img.file })), { image: "logo.png" }];
}

const brandGradient = "radial-gradient(circle at 85% 15%, rgba(0,212,255,0.45), transparent 45%), linear-gradient(135deg, #061430 0%, #0A1F44 50%, #1450C8 100%)";

function Mark({ size }: { size: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.28,
        background: "linear-gradient(135deg, #1E6FFF, #00D4FF)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.55,
        fontWeight: 800,
        color: "#fff",
      }}
    >
      T
    </div>
  );
}

export async function GET(_request: Request, { params }: { params: Promise<{ image: string }> }) {
  const { image } = await params;

  if (image === "logo.png") {
    return new ImageResponse(
      (
        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0A1F44" }}>
          <Mark size={360} />
        </div>
      ),
      { width: 512, height: 512 },
    );
  }

  const entry = allImages().find((img) => img.file === image);
  const title = entry?.title ?? company.tagline;
  const eyebrow = entry?.eyebrow ?? "Adelaide · South Australia";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          color: "#fff",
          background: brandGradient,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <Mark size={64} />
          <div style={{ fontSize: 40, fontWeight: 800, display: "flex" }}>
            Terra<span style={{ color: "#00D4FF" }}>Link</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 26, color: "#00D4FF", letterSpacing: 4, textTransform: "uppercase", fontWeight: 700 }}>{eyebrow}</div>
          <div style={{ fontSize: title.length > 40 ? 64 : 76, fontWeight: 800, lineHeight: 1.08, marginTop: 18, letterSpacing: -2 }}>{title}</div>
        </div>

        <div style={{ display: "flex", gap: 28, fontSize: 26, color: "rgba(255,255,255,0.85)" }}>
          <span>Adelaide &amp; surrounds</span>
          <span style={{ color: "#FF8A1F" }}>●</span>
          <span>{company.phone.display}</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
