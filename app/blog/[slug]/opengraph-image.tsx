import { ogImage, ogSize } from "@/lib/og"
import { posts, getPost } from "@/lib/posts"

export const size = ogSize
export const contentType = "image/png"
export const dynamic = "force-static"
export const alt = "Blog post by Hem Varia"
export const generateStaticParams = () => posts.map((p) => ({ slug: p.slug }))

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return ogImage("BLOG", getPost(slug)!.title)
}
