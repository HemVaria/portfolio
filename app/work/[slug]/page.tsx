import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import PageShell from "@/components/story/shell"
import JsonLd from "@/components/json-ld"
import FlowDiagram from "@/components/flow-diagram"
import { CalBookingButton } from "@/components/cal-booking"
import { bodyL, focus, label } from "@/components/story/tokens"
import { caseStudies, getCaseStudy } from "@/lib/work"
import { posts, getPost } from "@/lib/posts"
import { SITE_URL, CAL_LINK, breadcrumbs } from "@/lib/site"

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false
export const generateStaticParams = () => caseStudies.map((c) => ({ slug: c.slug }))

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCaseStudy((await params).slug)
  if (!c) return {}
  return {
    title: { absolute: c.metaTitle },
    description: c.description,
    alternates: { canonical: `/work/${c.slug}` },
    openGraph: { type: "article", title: c.metaTitle, description: c.description, url: `/work/${c.slug}` },
    twitter: { card: "summary_large_image", title: c.metaTitle, description: c.description },
  }
}

const h2 = "mt-16 mb-5 text-2xl font-bold tracking-[-0.03em] sm:text-3xl"
const bullet = "mt-2.5 size-1.5 shrink-0"

function Bullets({ items, dot }: { items: string[]; dot: string }) {
  return (
    <ul className="space-y-3">
      {items.map((b) => (
        <li key={b} className="flex gap-3 leading-relaxed text-[#111]/80">
          <span aria-hidden className={`${bullet} ${dot}`} />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  )
}

export default async function CaseStudyPage({ params }: Props) {
  const c = getCaseStudy((await params).slug)
  if (!c) notFound()

  const post = getPost(c.relatedPost ?? "") ?? posts[0]
  const related = [
    ...c.relatedWork.map((s) => {
      const w = getCaseStudy(s)!
      return { href: `/work/${w.slug}`, label: w.h1, kind: "Case study" }
    }),
    { href: `/blog/${post.slug}`, label: post.title, kind: "Blog post" },
  ]

  return (
    <PageShell>
      <main className="px-5 pt-28 pb-24 md:px-12 md:pt-36">
        <article className="mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className={`${label} mb-10 text-[#5E5B55]`}>
            <Link href="/" className="hover:text-[#2B3BFF]">Home</Link> <span aria-hidden>/</span>{" "}
            <Link href="/work" className="hover:text-[#2B3BFF]">Case studies</Link> <span aria-hidden>/</span>{" "}
            <span className="text-[#111]">{c.title}</span>
          </nav>

          <h1 className="text-[clamp(2.1rem,5.5vw,4rem)] leading-[0.98] font-bold tracking-[-0.045em]">{c.h1}</h1>
          <p className={`${bodyL} mt-6 text-[#5E5B55]`}>{c.summary}</p>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className={`${label} flex items-center gap-2 rounded-full bg-[#111] px-3 py-1.5 text-[#F2F0EB]`}>
              <span aria-hidden className={`size-1.5 rounded-full ${c.status === "live" ? "bg-[#2B3BFF]" : "bg-[#F2F0EB]/60"}`} />
              {c.status}
            </span>
            <span className={`${label} rounded-full px-3 py-1.5 ring-1 ring-[#111]/20`}>{c.role}</span>
            {c.stack.map((s) => (
              <span key={s} className={`${label} rounded-full bg-[#111]/5 px-3 py-1.5 text-[#5E5B55]`}>
                {s}
              </span>
            ))}
          </div>

          <section>
            <h2 className={h2}>The problem</h2>
            <p className="leading-relaxed text-[#111]/80">{c.problem}</p>
          </section>

          <section>
            <h2 className={h2}>What I built</h2>
            {c.role === "Team build" && <p className="mb-4 text-sm text-[#5E5B55]">A team build. The list covers what the team shipped.</p>}
            <Bullets items={c.built} dot="bg-[#111]" />
          </section>

          <section>
            <h2 className={h2}>How it works</h2>
            <FlowDiagram id={`flow-${c.slug}`} title={`How ${c.title} works`} steps={c.flow} />
          </section>

          <section>
            <h2 className={h2}>Key decisions</h2>
            <div className="space-y-4">
              {c.decisions.map((d) => (
                <div key={d.title} className="rounded-2xl bg-[#FBFAF7] p-5 ring-1 ring-[#111]/10 sm:p-6">
                  <h3 className="text-lg font-semibold">{d.title}</h3>
                  <p className="mt-2 leading-relaxed text-[#111]/75">{d.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className={h2}>Result</h2>
            <Bullets items={c.result} dot="bg-[#2B3BFF]" />
          </section>

          <section>
            <h2 className={h2}>What I would do next</h2>
            <Bullets items={c.next} dot="bg-[#111]/40" />
          </section>

          <section className="mt-20 rounded-3xl bg-[#111] p-8 text-center text-[#F2F0EB] sm:p-12">
            <h2 className="text-2xl font-bold tracking-[-0.03em] sm:text-4xl">Need something like this?</h2>
            <p className="mt-3 text-[#F2F0EB]/70">Tell me what you want to automate and I will tell you how I would build it.</p>
            <CalBookingButton
              calLink={CAL_LINK}
              className={`${label} ${focus} mt-7 inline-flex h-11 cursor-pointer items-center rounded-full bg-[#2B3BFF] px-6 text-white transition-colors hover:bg-white hover:text-[#111]`}
            >
              Book a call
            </CalBookingButton>
          </section>

          <section>
            <h2 className={h2}>Related</h2>
            <ul className="border-t border-[#111]">
              {related.map((r) => (
                <li key={r.href} className="border-b border-[#111]">
                  <Link href={r.href} className={`${focus} group flex items-center justify-between gap-6 py-5`}>
                    <span>
                      <span className={`${label} block text-[#5E5B55]`}>{r.kind}</span>
                      <span className="mt-1 block font-semibold transition-colors group-hover:text-[#2B3BFF]">{r.label}</span>
                    </span>
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </main>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: c.h1,
            headline: c.h1,
            description: c.description,
            url: `${SITE_URL}/work/${c.slug}`,
            keywords: c.stack.join(", "),
            author: { "@type": "Person", name: "Hem Varia", url: SITE_URL },
          },
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Case studies", path: "/work" },
            { name: c.title, path: `/work/${c.slug}` },
          ]),
        ]}
      />
    </PageShell>
  )
}
