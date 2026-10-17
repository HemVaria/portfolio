import Link from "next/link"
import JsonLd from "@/components/json-ld"
import { bodyL, dL, focus, label } from "@/components/story/tokens"
import { posts } from "@/lib/posts"
import { breadcrumbs } from "@/lib/site"

const fmt = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })

export default function BlogPage() {
  return (
    <main className="px-5 pt-28 pb-24 md:px-12 md:pt-36">
      <nav aria-label="Breadcrumb" className={`${label} mb-10 text-[#5E5B55]`}>
        <Link href="/" className="hover:text-[#2B3BFF]">Home</Link> <span aria-hidden>/</span> <span className="text-[#111]">Blog</span>
      </nav>
      <h1 className={dL}>Build notes.</h1>
      <p className={`${bodyL} mt-5 max-w-[44ch] text-[#5E5B55]`}>
        How I build AI automation, written up after the work ships. Each post links to its{" "}
        <Link href="/work" className="text-[#111] underline underline-offset-4 hover:text-[#2B3BFF]">
          case study
        </Link>
        .
      </p>
      <ul className="mt-14 grid gap-5 md:mt-20 md:grid-cols-3">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/blog/${p.slug}`}
              className={`${focus} group flex h-full min-h-[300px] flex-col rounded-2xl bg-[#FBFAF7] p-6 ring-1 ring-[#111]/10 transition-shadow hover:ring-[#2B3BFF]`}
            >
              <time dateTime={p.date} className={`${label} text-[#5E5B55]`}>
                {fmt(p.date)}
              </time>
              <h2 className="mt-4 text-[22px] leading-snug font-semibold tracking-[-0.02em] transition-colors group-hover:text-[#2B3BFF]">
                {p.title}
              </h2>
              <p className="mt-3 text-[15px] leading-normal text-[#5E5B55]">{p.description}</p>
              <span className={`${label} mt-auto pt-6`}>Read →</span>
            </Link>
          </li>
        ))}
      </ul>
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }])} />
    </main>
  )
}
