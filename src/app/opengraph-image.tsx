import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Vyllo — Software para Dentista Autônomo"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a1628 0%, #0f1d35 50%, #0a1628 100%)",
          position: "relative",
        }}
      >
        {/* Subtle gradient orbs */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "120px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,102,255,0.15) 0%, transparent 60%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 60%)",
          }}
        />

        {/* Logo V mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "32px",
          }}
        >
          <svg width="80" height="72" viewBox="0 0 80 72" fill="none">
            <path
              d="M40 72L0 28C0 28 0 12 12 4C24 -4 32 8 32 8L40 20L48 8C48 8 56 -4 68 4C80 12 80 28 80 28L40 72Z"
              fill="#3B82F6"
            />
            <path
              d="M40 72L0 28C0 28 0 12 12 4C24 -4 32 8 32 8L40 20"
              fill="#2C3E6B"
            />
          </svg>
        </div>

        {/* Brand name */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-2px",
            marginBottom: "16px",
          }}
        >
          Vyllo
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "28px",
            fontWeight: 500,
            color: "rgba(255,255,255,0.7)",
            textAlign: "center",
            maxWidth: "700px",
            lineHeight: 1.4,
          }}
        >
          Software para Dentista Autônomo
        </div>

        {/* Subline */}
        <div
          style={{
            fontSize: "18px",
            color: "rgba(255,255,255,0.4)",
            marginTop: "16px",
            textAlign: "center",
            maxWidth: "600px",
            lineHeight: 1.5,
          }}
        >
          Agenda, prontuário e financeiro conectados — uma ação alimenta a próxima
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            height: "4px",
            background: "linear-gradient(90deg, transparent, #0066ff, #8b5cf6, transparent)",
          }}
        />
      </div>
    ),
    { ...size }
  )
}
