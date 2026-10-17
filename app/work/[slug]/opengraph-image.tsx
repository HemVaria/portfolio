import { ogImage, ogSize } from "@/lib/og"
import { caseStudies, getCaseStudy } from "@/lib/work"

export const size = ogSize
export const contentType = "image/png"
export const dynamic = "force-static"
export const alt = "Case study by Hem Varia"
export const generateStaticParams = () => caseStudies.map((c) => ({ slug: c.slug }))

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return ogImage("CASE STUDY", getCaseStudy(slug)!.title)
}
