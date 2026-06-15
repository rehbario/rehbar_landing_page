import { ImageResponse } from "next/og";

export const alt = "Rehbar — You have the ability. We'll show you the way.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Dynamic OG image generated at build via next/og (§5). Latin-only for font safety. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #1B3A57 0%, #2A9D8F 100%)",
          padding: "72px",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              width: "72px",
              height: "72px",
              borderRadius: "18px",
              background: "rgba(255,255,255,0.16)",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "44px",
              fontWeight: 800,
            }}
          >
            R
          </div>
          <div style={{ fontSize: "40px", fontWeight: 800, letterSpacing: "-1px" }}>
            Rehbar
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div
            style={{
              fontSize: "68px",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-2px",
              maxWidth: "1000px",
            }}
          >
            You have the ability. We&apos;ll show you the way.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div
              style={{
                display: "flex",
                width: "56px",
                height: "8px",
                borderRadius: "999px",
                background: "#E9A23B",
              }}
            />
            <div style={{ fontSize: "30px", color: "rgba(255,255,255,0.92)" }}>
              Free AI guidance to the right university · rehbar.io
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
