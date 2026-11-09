import { ImageResponse } from "next/og";

export const alt = "Waseem Abbas, Flutter Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "radial-gradient(120% 90% at 80% 0%, #eee8dc 0%, #f6f2ea 60%)",
          color: "#16130f",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 24, color: "#c2410c", letterSpacing: 4 }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#1d7a54" }} /> AVAILABLE FOR REMOTE WORK
        </div>
        <div style={{ fontSize: 88, fontWeight: 700, marginTop: 28, lineHeight: 1.05 }}>Waseem Abbas</div>
        <div style={{ fontSize: 40, marginTop: 18, color: "#c2410c" }}>Flutter Developer for Android, iOS and AI apps</div>
        <div style={{ fontSize: 26, marginTop: 36, color: "#5c5448" }}>3+ years of freelance experience, based in Faisalabad, Pakistan</div>
      </div>
    ),
    size,
  );
}
