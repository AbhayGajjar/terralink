import { ImageResponse } from "next/og";
import { company } from "@/data/company";

export const alt = `${company.name} – NBN & CCTV installation across South Australia`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Branded social share image used for every page. */
export default function OpengraphImage() {
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
          background: "radial-gradient(circle at 85% 15%, rgba(0,212,255,0.45), transparent 45%), linear-gradient(135deg, #061430 0%, #0A1F44 50%, #1450C8 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "linear-gradient(135deg, #1E6FFF, #00D4FF)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 800,
            }}
          >
            T
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, display: "flex" }}>
            Terra<span style={{ color: "#00D4FF" }}>Link</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 26, color: "#00D4FF", letterSpacing: 4, textTransform: "uppercase", fontWeight: 700 }}>
            Adelaide · South Australia
          </div>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, marginTop: 18, letterSpacing: -2 }}>
            NBN &amp; CCTV installation specialists
          </div>
        </div>

        <div style={{ display: "flex", gap: 28, fontSize: 26, color: "rgba(255,255,255,0.85)" }}>
          <span>FTTP · FTTN · FTTC · HFC</span>
          <span style={{ color: "#FF8A1F" }}>●</span>
          <span>Security cameras</span>
          <span style={{ color: "#FF8A1F" }}>●</span>
          <span>{company.phone.display}</span>
        </div>
      </div>
    ),
    size,
  );
}
