import Story from "@/components/story/story"
import JsonLd from "@/components/json-ld"
import { SITE_URL } from "@/lib/site"

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Hem Varia",
  url: SITE_URL,
  jobTitle: "AI Automation Engineer",
  address: { "@type": "PostalAddress", addressLocality: "Vadodara", addressCountry: "IN" },
  knowsAbout: ["AI automation", "Claude Code", "Cloudflare Workers", "Next.js", "Meta Marketing API"],
  sameAs: ["https://linkedin.com/in/hem-varia", "https://github.com/HemVaria", "https://instagram.com/hehehem.exe"],
}

export default function HomePage() {
  return (
    <>
      <Story />
      <JsonLd data={person} />
    </>
  )
}
