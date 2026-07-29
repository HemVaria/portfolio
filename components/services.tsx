"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const services = [
  {
    number: "(01)",
    title: "Full-Stack Product Engineering",
    description:
      "I ship production systems end to end — not just screens. Recent work spans a GST-compliant invoicing SaaS, an agency management platform with multi-level approval flows and role-based access across 12 roles, and a real estate platform featured at PropTech Connect Dubai 2026.",
    skills: [
      { num: "01", text: "Next.js, React, Node.js, Express" },
      { num: "02", text: "PostgreSQL, Prisma, Supabase, Firebase" },
      { num: "03", text: "Astro, Strapi, Cloudflare D1 & KV" },
    ],
  },
  {
    number: "(02)",
    title: "Gen AI & Agentic Systems",
    description:
      "I build with AI as infrastructure, not a feature bolt-on. That means multimodal pipelines, agentic workflows, and developer tooling — including a published npm CLI that audits and scores AI agent configs, and MCP servers wired into live production projects.",
    skills: [
      { num: "01", text: "Agentic AI, MCP Servers, Claude Code" },
      { num: "02", text: "Whisper, YOLOv8, BLIP, OpenCV" },
      { num: "03", text: "Hugging Face, OpenRouter, TensorFlow" },
    ],
  },
  {
    number: "(03)",
    title: "Automation & Workflow Engineering",
    description:
      "I replace manual, repetitive operations with systems that run themselves. I design n8n and Gen AI pipelines for marketing automation, content generation, and image processing — plus scheduled jobs that keep everything running without anyone touching it.",
    skills: [
      { num: "01", text: "n8n, Cloudflare Cron Workers" },
      { num: "02", text: "GitHub Actions, CI/CD Pipelines" },
      { num: "03", text: "Marketing & Performance Automation" },
    ],
  },
  {
    number: "(04)",
    title: "Edge Performance & Cloud",
    description:
      "Fast isn't a nice-to-have, it's the product. I migrate and optimize production sites onto Cloudflare's edge, tune Core Web Vitals, and architect deployments that stay quick and cheap under real traffic.",
    skills: [
      { num: "01", text: "Cloudflare Migrations & Edge Deploys" },
      { num: "02", text: "Core Web Vitals & Performance Tuning" },
      { num: "03", text: "Vercel, Railway, Google Cloud" },
    ],
  },
]

export default function Services() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  return (
    <section id="services" className="bg-[#111111] text-[#E8E8E3] py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="font-sans text-[clamp(2rem,8vw,5rem)] font-bold uppercase tracking-tight mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          WHAT I DO <span className="text-[#9A9A9A]">/</span>
        </motion.h2>

        {/* Services Description */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 sm:gap-8 md:gap-16 mb-12 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <div className="text-xs sm:text-sm text-[#9A9A9A] uppercase tracking-wider shrink-0">
            (SERVICES)
          </div>
          <p className="text-base sm:text-lg md:text-xl text-[#9A9A9A] leading-relaxed max-w-2xl">
            I build and ship full-stack products with AI and automation baked in — from GST invoicing SaaS
            and agency management platforms to Gen AI tooling and edge-deployed sites. Currently a Software
            Engineer at Promact Global, working across live production systems.
          </p>
        </motion.div>

        {/* Accordion Services */}
        <div className="border-t border-white/10">
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              className="border-b border-white/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              {/* Header Row - Always Visible */}
              <button
                className="w-full py-5 sm:py-8 md:py-10 flex items-center justify-between group cursor-pointer"
                onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
              >
                <div className="flex items-center gap-3 sm:gap-8 md:gap-16 lg:gap-32 min-w-0">
                  {/* Number */}
                  <span className="font-mono text-lg sm:text-2xl md:text-4xl font-bold text-[#E8E8E3]/40 flex-shrink-0">
                    {service.number}
                  </span>

                  {/* Title */}
                  <h3 className="font-sans text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold text-[#E8E8E3] group-hover:text-[#D4C5A9] transition-colors duration-300 text-left truncate sm:whitespace-normal">
                    {service.title}
                  </h3>
                </div>

                {/* Toggle Indicator */}
                <motion.div
                  className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center flex-shrink-0 ml-2"
                  animate={{ rotate: expandedIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#E8E8E3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </motion.div>
              </button>

              {/* Expandable Content */}
              <AnimatePresence>
                {expandedIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 sm:pb-10 md:pb-16 pl-0 sm:pl-[calc(2rem+32px)] md:pl-[calc(4rem+64px)] lg:pl-[calc(4rem+128px)]">
                      {/* Description */}
                      <p className="text-sm sm:text-base md:text-lg text-[#9A9A9A] leading-relaxed max-w-2xl mb-6 sm:mb-8">
                        {service.description}
                      </p>

                      {/* Skills List */}
                      <div className="space-y-3 sm:space-y-4">
                        {service.skills.map((skill, j) => (
                          <motion.div
                            key={skill.num}
                            className="flex items-center gap-3 sm:gap-4 py-2 sm:py-3 border-t border-white/5"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: j * 0.1, duration: 0.4 }}
                          >
                            <span className="font-mono text-[10px] sm:text-xs text-[#9A9A9A] flex-shrink-0">{skill.num}</span>
                            <span className="font-medium text-[#D4C5A9] text-sm sm:text-lg">{skill.text}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
