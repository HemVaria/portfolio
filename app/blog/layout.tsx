import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Blog — Hem Varia",
  description:
    "Notes on full-stack development, AI/ML engineering, and building products — coming soon from Hem Varia.",
}

export default function BlogLayout({ children }: { children: ReactNode }) {
  return children
}
