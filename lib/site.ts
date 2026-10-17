// Override with NEXT_PUBLIC_SITE_URL when a custom domain is added.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio.hemvaria007.workers.dev").replace(/\/$/, "")
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
