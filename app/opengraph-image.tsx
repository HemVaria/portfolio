import { ogImage, ogSize } from "@/lib/og"

export const size = ogSize
export const contentType = "image/png"
export const dynamic = "force-static"
export const alt = "Hem Varia, AI automation and full-stack engineer"

export default function Image() {
  return ogImage("PORTFOLIO", "AI automation and full-stack systems that ship")
}
