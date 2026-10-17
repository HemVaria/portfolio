import type { Metadata } from "next"
import type { ReactNode } from "react"
import PageShell from "@/components/story/shell"

export const metadata: Metadata = {
  title: { absolute: "Blog: AI Automation Build Notes | Hem Varia" },
  description:
    "Practical notes on building AI automation: Meta Ads automation, Shopify and Shiprocket workflows on Cloudflare Workers and AI voice agents.",
  alternates: { canonical: "/blog" },
}

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <PageShell>{children}</PageShell>
}
