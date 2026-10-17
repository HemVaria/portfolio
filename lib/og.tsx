import { ImageResponse } from "next/og"

export const ogSize = { width: 1200, height: 630 }

export function ogImage(kicker: string, title: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#F2F0EB",
          color: "#111111",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 4, color: "#2B3BFF", fontFamily: "monospace" }}>{kicker}</div>
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, maxWidth: 1000 }}>{title}</div>
        <div style={{ fontSize: 28, color: "#5E5B55" }}>Hem Varia / AI Automation and Full-Stack Engineer</div>
      </div>
    ),
    ogSize,
  )
}
