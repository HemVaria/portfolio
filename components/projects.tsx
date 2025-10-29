import BentoItem from "./ui/bento-item"
type Project = {
  title: string
  year: string
  size: "lg" | "md" | "sm"
  description: string
  stack: string[]
  image?: string
  repo?: string
  demo?: string
}

const projects: Project[] = [
  {
    title: "Ride Rescue",
    year: "2025",
    size: "lg",
    description:
      "Location‑based roadside help app. Finds nearby emergency services fast. Built with Next.js, TypeScript, secure login, maps and modern UI.",
    stack: ["Next.js", "TypeScript", "Auth", "Maps", "UI"],
    repo: "https://github.com/HemVaria/Ride-rescue-updated",
    demo: "https://www.youtube.com/embed/fXZ9sKJBNa8",
  },
  {
    title: "AI‑Powered Productivity Chrome Extension",
    year: "2024",
    size: "lg",
    description:
      "AI‑based Chrome extension that generates intelligent video summaries and enhances YouTube content experience.",
    stack: ["Chrome", "AI", "Summarization"],
    image: "/images/projects/ai-powered-chrome-thumb.svg",
    repo: "https://github.com/HemVaria/ai-powered-productive-extension",
    demo: "https://www.youtube.com/embed/MoHxkE8dpiI",
  },
  {
    title: "Nano‑Craft AI — Generative AI Creative Studio",
    year: "2025",
    size: "lg",
    description:
      "AI‑driven web app for image editing and generation using Google Gemini API with inpainting, text‑to‑image, and version history.",
    stack: ["Next.js", "Google Gemini API", "Image", "Inpainting"],
    repo: "https://github.com/HemVaria/nano-craft-ai",
    demo: "https://www.youtube.com/embed/25v6pZCIDno",
  },
  {
    title: "AI Multimodal Video Captioning Tool",
    year: "2025",
    size: "lg",
    description:
      "Gradio‑based video analysis tool using Whisper, BLIP, and YOLOv8 for multi‑layered video understanding.",
    stack: ["Gradio", "Whisper", "BLIP", "YOLOv8"],
    repo: "https://github.com/HemVaria/AI-Multimodal-Video-Captioning-Tool",
  },
  {
    title: "Instasphere",
    year: "2024",
    size: "lg",
    description:
      "Full‑stack social media platform featuring secure user authentication and real‑time chat.",
    stack: ["Auth", "Realtime Chat", "Full‑stack"],
    repo: "https://github.com/HemVaria/instasphere",
    demo: "https://www.youtube.com/embed/Md2WGlUOvKs",
  },
  {
    title: "EcoGen AI",
    year: "2025",
    size: "md",
    description:
      "Full‑stack Next.js app with Gemini AI integration for automated waste detection, featuring gamification, carbon tracking, interactive maps, and smart pickup scheduling using Supabase and Mapbox APIs.",
    stack: ["Next.js", "Gemini AI", "Supabase", "Mapbox", "Gamification"],
    repo: "https://github.com/HemVaria/ecogenai",
  },
  {
    title: "Automated Content & Social Media Pipeline",
    year: "2025",
    size: "sm",
    description:
      "Deployed n8n.io workflows to automate AI‑generated content from RSS feeds to social media platforms.",
    stack: ["n8n.io", "Automation", "RSS", "Social"],
    repo: "https://github.com/HemVaria/n8n-workflows",
  },
]

export default function Projects() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <h2 className="text-3xl md:text-4xl font-semibold text-white font-display uppercase tracking-wider">Projects</h2>
      {/* Bento grid: mirrors the style of the provided demo while keeping existing theme */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 auto-rows-auto">
        {projects.map((p) => {
          // Determine span classes similar to the demo
          const spanClasses = [
            p.size === "lg" ? "sm:col-span-2" : "",
            p.size === "md" ? "" : "",
            p.size === "sm" ? "" : "",
          ]
            .filter(Boolean)
            .join(" ")

          return (
            <BentoItem key={p.title} className={spanClasses}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-[box-shadow,background] duration-200">
                {/* Header: title, year, and GitHub button */}
                <header className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-medium text-white">{p.title}</h3>
                    <span className="text-sm text-white/70">{p.year}</span>
                  </div>
                  {p.repo && (
                    <div className="flex items-center gap-2">
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/90 hover:text-white inline-flex items-center gap-2 rounded-md border border-white/5 px-2 py-1 text-xs"
                        aria-label={`View ${p.title} repository`}
                      >
                        GitHub
                      </a>
                    </div>
                  )}
                </header>

                {/* Static image (if present and no demo) */}
                {p.image && !p.demo && (
                  <div className="mt-4 overflow-hidden rounded-xl border border-white/5">
                    <img src={p.image} alt={`${p.title} thumbnail`} className="w-full h-40 object-cover opacity-95" loading="lazy" />
                  </div>
                )}

                {/* Description and stack tags */}
                <p className="mt-3 text-sm text-white/80 flex-1">{p.description}</p>

                {/* YouTube video (if present) - BELOW description */}
                {p.demo && (
                  <div className="mt-4 overflow-hidden rounded-xl border border-white/5">
                    <div className="aspect-video w-full">
                      <iframe
                        src={p.demo}
                        title={`${p.title} demo`}
                        loading="lazy"
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}
                <div className="mt-auto pt-4 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 rounded-full border border-white/20 bg-white/10 text-white/90 text-[10px] sm:text-xs"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </article>
            </BentoItem>
          )
        })}
      </div>
      {/* Global-like responsive helpers via Tailwind classes above; no theme changes introduced */}
    </div>
  )
}
