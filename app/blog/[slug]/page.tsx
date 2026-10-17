import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import JsonLd from "@/components/json-ld"
import { posts, getPost } from "@/lib/posts"
import { getCaseStudy } from "@/lib/work"
import { SITE_URL, breadcrumbs } from "@/lib/site"
import { focus, label } from "@/components/story/tokens"

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false
export const generateStaticParams = () => posts.map((p) => ({ slug: p.slug }))

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPost((await params).slug)
  if (!p) return {}
  return {
    title: { absolute: p.metaTitle },
    description: p.description,
    keywords: p.keywords,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: {
      type: "article",
      title: p.metaTitle,
      description: p.description,
      url: `/blog/${p.slug}`,
      publishedTime: p.date,
      authors: ["Hem Varia"],
    },
    twitter: { card: "summary_large_image", title: p.metaTitle, description: p.description },
  }
}

// Typography for the post body (no typography plugin installed).
const prose =
  "text-[#111]/80 leading-relaxed text-base sm:text-lg " +
  "[&_p]:mt-5 [&_h2]:mt-14 [&_h2]:mb-2 [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:font-bold [&_h2]:tracking-[-0.03em] [&_h2]:text-[#111] " +
  "[&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#111] " +
  "[&_ul]:mt-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:mt-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 " +
  "[&_strong]:text-[#111] [&_a]:text-[#111] [&_a]:underline [&_a]:underline-offset-4 " +
  "[&_:not(pre)>code]:rounded [&_:not(pre)>code]:bg-[#111]/[0.06] [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:text-[0.9em] " +
  "[&_pre]:mt-6 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-[#111] [&_pre]:p-5 [&_pre]:text-sm [&_pre]:leading-6 [&_pre]:text-[#F2F0EB]"

export default async function PostPage({ params }: Props) {
  const p = getPost((await params).slug)
  if (!p) notFound()
  const study = getCaseStudy(p.caseStudy)!
  const others = posts.filter((o) => o.slug !== p.slug)

  return (
    <main className="px-5 pt-28 pb-24 md:px-12 md:pt-36">
      <article className="mx-auto max-w-3xl">
        <nav aria-label="Breadcrumb" className={`${label} mb-10 text-[#5E5B55]`}>
          <Link href="/" className="hover:text-[#2B3BFF]">Home</Link> <span aria-hidden>/</span>{" "}
          <Link href="/blog" className="hover:text-[#2B3BFF]">Blog</Link> <span aria-hidden>/</span>{" "}
          <span className="text-[#111]">Post</span>
        </nav>
        <h1 className="text-[clamp(2rem,5.5vw,3.5rem)] leading-[1.02] font-bold tracking-[-0.045em]">{p.title}</h1>
        <p className={`${label} mt-5 text-[#5E5B55]`}>
          Hem Varia / <time dateTime={p.date}>{p.date}</time>
        </p>

        <div className={`mt-10 ${prose}`}>{p.body}</div>

        <aside className="mt-16 rounded-3xl bg-[#111] p-7 text-[#F2F0EB] sm:p-9">
          <p className={`${label} text-[#F2F0EB]/60`}>Case study</p>
          <Link
            href={`/work/${study.slug}`}
            className={`${focus} mt-2 block text-xl font-semibold tracking-[-0.02em] hover:text-[#8E99FF] sm:text-2xl`}
          >
            Read the full {study.title} case study →
          </Link>
        </aside>

        <nav aria-label="More posts" className="mt-14">
          <h2 className={`${label} mb-2 text-[#5E5B55]`}>More build notes</h2>
          <ul className="border-t border-[#111]">
            {others.map((o) => (
              <li key={o.slug} className="border-b border-[#111]">
                <Link href={`/blog/${o.slug}`} className={`${focus} group flex items-center justify-between gap-6 py-5 font-semibold`}>
                  <span className="transition-colors group-hover:text-[#2B3BFF]">{o.title}</span>
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </article>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: p.title,
            description: p.description,
            datePublished: p.date,
            dateModified: p.date,
            keywords: p.keywords.join(", "),
            mainEntityOfPage: `${SITE_URL}/blog/${p.slug}`,
            image: `${SITE_URL}/blog/${p.slug}/opengraph-image`,
            author: { "@type": "Person", name: "Hem Varia", url: SITE_URL },
          },
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: p.title, path: `/blog/${p.slug}` },
          ]),
        ]}
      />
    </main>
  )
}
