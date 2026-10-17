import type { Metadata } from "next"
import Link from "next/link"
import PageShell from "@/components/story/shell"
import JsonLd from "@/components/json-ld"
import { bodyL, dL, dM, focus, label } from "@/components/story/tokens"
import { caseStudies } from "@/lib/work"
import { breadcrumbs } from "@/lib/site"

const title = "Case Studies: AI Automation and Full-Stack | Hem Varia"
const description =
  "Case studies on Meta Ads automation, Shopify order automation, an AI voice sales agent, SEO automation, HR automation and a GST invoicing SaaS."

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/work" },
  openGraph: { title, description, url: "/work" },
  twitter: { card: "summary_large_image", title, description },
}

export default function WorkPage() {
  return (
    <PageShell>
      <main className="px-5 pt-28 pb-24 md:px-12 md:pt-36">
        <nav aria-label="Breadcrumb" className={`${label} mb-10 text-[#5E5B55]`}>
          <Link href="/" className="hover:text-[#2B3BFF]">Home</Link> <span aria-hidden>/</span> <span className="text-[#111]">Case studies</span>
        </nav>
        <h1 className={dL}>Case studies.</h1>
        <p className={`${bodyL} mt-5 max-w-[46ch] text-[#5E5B55]`}>
          What the problem was, what I built, how it works and what it does now. The build notes behind them are on the{" "}
          <Link href="/blog" className="text-[#111] underline underline-offset-4 hover:text-[#2B3BFF]">
            blog
          </Link>
          .
        </p>

        <ul className="mt-14 border-t border-[#111] md:mt-20">
          {caseStudies.map((c) => (
            <li key={c.slug} className="border-b border-[#111]">
              <Link
                href={`/work/${c.slug}`}
                className={`${focus} group flex flex-col gap-3 py-7 transition-colors active:bg-[#E2DED6] md:grid md:grid-cols-12 md:items-center md:gap-6 md:py-9`}
              >
                <span className={`${dM} transition-transform duration-300 group-hover:translate-x-3 group-hover:text-[#2B3BFF] md:col-span-5`}>
                  {c.title}
                </span>
                <span className="text-[15px] leading-normal text-[#5E5B55] md:col-span-5">{c.card}</span>
                <span className={`${label} flex items-center gap-2 md:col-span-2 md:justify-end`}>
                  <span aria-hidden className={`size-1.5 rounded-full ${c.status === "live" ? "bg-[#2B3BFF]" : "bg-[#111]/30"}`} />
                  {c.status}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Case studies", path: "/work" }])} />
    </PageShell>
  )
}
