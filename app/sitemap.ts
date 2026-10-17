import type { MetadataRoute } from "next"
import { caseStudies } from "@/lib/work"
import { posts } from "@/lib/posts"
import { SITE_URL } from "@/lib/site"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, priority: 1 },
    { url: `${SITE_URL}/work`, priority: 0.9 },
    ...caseStudies.map((c) => ({ url: `${SITE_URL}/work/${c.slug}`, priority: 0.8 })),
    { url: `${SITE_URL}/blog`, priority: 0.7 },
    ...posts.map((p) => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: p.date, priority: 0.7 })),
  ]
}
