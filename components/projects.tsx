"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Github, Play } from "lucide-react"
import Image from "next/image"

type Project = {
  title: string
  category: string
  year: string
  description: string
  image?: string
  repo?: string
  demo?: string
  demoColdStart?: boolean
  status?: "wip"
}

const projects: Project[] = [
  {
    title: "AICEK",
    category: "AI Agent Config Optimizer",
    year: "2026",
    description: "TypeScript CLI that audits and scores Claude Code / Cursor configs (0–100) and recommends token-saving fixes. Published on npm.",
    image: "/images/projects/aicek.png",
    repo: "https://github.com/HemVaria/aicek",
  },
  {
    title: "RevTrack",
    category: "GST Invoicing SaaS",
    year: "2026",
    description: "GST-compliant invoicing, expense tracking, inventory, and revenue management for Indian SMBs — built as part of a small team. Built with Next.js, with GSTR-ready exports and role-based access control.",
    image: "/images/projects/revtrack.png",
    demo: "https://revtrack.in",
  },
  {
    title: "Text Switch",
    category: "Rust Desktop App",
    year: "2026",
    description: "Text expander + AI rewriter for Windows. Type a keyword shortcut and a hotkey expands it into a full saved template — great for prompts and repeated snippets. Also rewrites drafted text on demand (tone, grammar, style) using a Gemini-powered pipeline with pre-set shortcuts.",
    image: "/images/projects/text-switch.png",
    status: "wip",
  },
  {
    title: "AI Video Editing & Captioning Tool",
    category: "AI/ML Development",
    year: "2025",
    description: "Extended Remotion to build an AI-powered programmatic video editing tool with code-driven React compositions, plus a Gradio-based video analysis tool using Whisper, BLIP, and YOLOv8 for multi-layered video understanding and captioning.",
    image: "/images/projects/ai-video-engine.png",
    repo: "https://github.com/HemVaria/AI-Multimodal-Video-Captioning-Tool",
  },
  {
    title: "IMS",
    category: "Agency Management System",
    year: "2026",
    description: "Full internal management platform for a creative agency — client onboarding, Kanban job pipeline, multi-level approvals, GST invoicing, and HR & workload tracking across 12 role types. Built with Next.js, Express, Prisma, and PostgreSQL.",
    image: "/images/projects/agency-management-ims.png",
    repo: "https://github.com/HemVaria/Ims",
  },
  {
    title: "Ride Rescue",
    category: "Emergency Services App",
    year: "2025",
    description: "24/7 roadside assistance app connecting stranded drivers with certified mechanics. Built with Next.js 15, Supabase, and real-time GPS tracking.",
    image: "https://img.youtube.com/vi/fXZ9sKJBNa8/maxresdefault.jpg",
    repo: "https://github.com/HemVaria/Ride-rescue-updated",
    demo: "https://www.youtube.com/watch?v=fXZ9sKJBNa8",
  },
]

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="projects" className="bg-black py-20 sm:py-24 md:py-32 pb-28 sm:pb-24 md:pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-12 sm:mb-20">
          <motion.h2
            className="text-[clamp(2rem,8vw,5rem)] font-bold text-white uppercase tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            Selected Works <span className="text-[#9A9A9A]">/</span>
          </motion.h2>
          <motion.p
            className="text-white/50 max-w-xl mt-3 sm:mt-4 text-base sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            A collection of projects showcasing my expertise in full-stack development and AI integration.
          </motion.p>
        </div>

        {/* Projects List - zunedaalim style */}
        <div className="space-y-0">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              className="group border-t border-white/10 first:border-t-0"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <a
                href={project.demo || project.repo}
                target={project.demo || project.repo ? "_blank" : undefined}
                rel="noopener noreferrer"
                className={`block py-8 md:py-12 ${!project.demo && !project.repo ? "cursor-default" : ""}`}
                onClick={(e) => {
                  if (!project.demo && !project.repo) e.preventDefault()
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-16 items-center">
                  {/* Left: Large Number */}
                  <div className="flex items-baseline gap-2 sm:gap-4 md:gap-8">
                    {/* Large stylized number */}
                    <div className="relative">
                      <span className="text-[clamp(4rem,15vw,14rem)] font-bold leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.3)] select-none">
                        {String(i + 1).padStart(2, "0").charAt(0)}
                      </span>
                      <span className="text-[clamp(4rem,15vw,14rem)] font-bold leading-none text-[#9A9A9A]/30 select-none ml-[-0.1em]">
                        {String(i + 1).padStart(2, "0").charAt(1)}
                      </span>
                    </div>
                  </div>

                  {/* Right: Project Image & Info */}
                  <div className="relative">
                    {/* Image */}
                    <motion.div
                      className="aspect-video relative bg-white/5 overflow-hidden rounded-lg mb-6"
                      animate={{
                        scale: hoveredIndex === i ? 1.02 : 1,
                      }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-6xl font-bold text-white/10">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                      )}

                      {/* Hover overlay */}
                      <motion.div
                        className="absolute inset-0 bg-black/60 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredIndex === i ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="flex items-center gap-2 text-white font-medium px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                          {!project.demo && !project.repo ? (
                            "Coming Soon"
                          ) : project.demo?.includes('youtube') ? (
                            <>
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                              Watch Demo
                            </>
                          ) : (
                            <>
                              View Project <ArrowUpRight className="size-4" />
                            </>
                          )}
                        </span>
                      </motion.div>

                      {/* Play button for videos - hidden on hover */}
                      {project.demo?.includes('youtube') && (
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center pointer-events-none"
                          animate={{
                            opacity: hoveredIndex === i ? 0 : 1,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>

                    {/* Project Info */}
                    <div className="flex flex-col gap-2 sm:gap-3">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                        <div className="min-w-0">
                          <p className="text-[10px] sm:text-xs md:text-sm font-mono text-white/40 mb-1 sm:mb-2 tracking-wider">
                            {project.category}
                          </p>
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#D4C5A9] font-mono group-hover:text-white transition-colors duration-300">
                            {project.title}
                          </h3>
                        </div>

                        {/* Tags & Links */}
                        <div className="flex items-center gap-2 flex-wrap mt-1 sm:mt-0 sm:shrink-0 sm:justify-end">
                          {project.status === "wip" && (
                            <span className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs border border-amber-400/40 bg-amber-400/10 rounded-full text-amber-300 font-medium">
                              In Progress
                            </span>
                          )}
                          {project.repo && (
                            <a
                              href={project.repo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 text-[10px] sm:text-xs border border-white/20 rounded-full text-white/60 hover:bg-white hover:text-black transition-colors duration-300 ease-out hover:scale-105 active:scale-95"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Github className="size-3" />
                              GitHub
                            </a>
                          )}
                          <span className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs border border-white/20 rounded-full text-white/60">
                            {project.year}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Cold-start note for live demos on free hosting tiers */}
                      {project.demoColdStart && (
                        <p className="text-[10px] sm:text-xs text-white/30 italic">
                          Live demo may take a few seconds to wake up (free-tier hosting)
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
