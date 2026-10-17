// Set NEXT_PUBLIC_SITE_URL to the final Cloudflare domain at build time.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "")
export const SITE_NAME = "Hem Varia"
export const CAL_LINK = "hehehem-s8zjfl/30min"

export const breadcrumbs = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
})
