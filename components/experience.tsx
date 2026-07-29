"use client"

import { Linkedin, ExternalLink, Briefcase, Award, Calendar, MapPin } from "lucide-react"
import { motion } from "framer-motion"

interface ExperienceItem {
  title: string
  company: string
  type?: string
  period: string
  location?: string
  points: string[]
  linkedinPost?: string
  techStack: string[]
}

interface ActivityItem {
  title: string
  description: string
  linkedinPost?: string
  icon?: "award" | "briefcase"
}

const experiences: ExperienceItem[] = [
  {
    title: "Software Engineer Trainee",
    company: "Promact Global",
    type: "Trainee",
    period: "05/2026 — Present",
    points: [
      "Migrated and optimized multiple production websites on Cloudflare",
      "Built e-commerce, performance marketing, and marketing automation using Cloudflare Cron Workers and GitHub Actions",
      "Set up multiple MCP servers and developed a broad full-stack and Gen AI skill set across several live projects",
    ],
    techStack: ["Cloudflare", "GitHub Actions", "MCP", "Next.js", "Gen AI"],
  },
  {
    title: "Full-stack Developer + Gen AI",
    company: "What an Aldea",
    type: "Internship",
    period: "2026",
    location: "Dubai, UAE",
    points: [
      "Developed full-stack features for a real estate platform showcased at PropTech Connect Dubai 2026",
      "Built with Next.js/Node.js with integrated Gen AI APIs",
      "Designed n8n workflows for image processing and automation",
    ],
    linkedinPost: "https://www.linkedin.com/posts/hem-varia_having-rented-5-houses-in-my-life-so-far-activity-7421918803296501762-3Kho",
    techStack: ["Next.js", "Node.js", "n8n", "Gemini AI", "Supabase"],
  },
  {
    title: "Freelance Web Developer",
    company: "Fiverr, Upwork, Unstop, Personal Connections",
    period: "04/2025 — Present",
    points: [
      "Built scalable full-stack apps using Node.js, Supabase, and Firebase",
      "Implemented GSAP animations and Three.js 3D visualizations",
      "Enhanced performance with robust authentication and cloud optimization",
    ],
    techStack: ["Node.js", "Supabase", "Firebase", "GSAP", "Three.js"],
  },
  {
    title: "AI/ML Developer",
    company: "Personal & Freelance",
    period: "2024 — Present",
    points: [
      "Deployed AI solutions using TensorFlow, HuggingFace, and Gen AI",
      "Built AI WhatsApp Chatbot and n8n automation workflows",
      "Improved operational efficiency through intelligent automation",
    ],
    techStack: ["Python", "TensorFlow", "HuggingFace", "n8n", "OpenAI"],
  },
]

const activities: ActivityItem[] = [
  {
    title: "SIH 2025 Nationals Finalist",
    description: "Competed at the national level in Smart India Hackathon 2025",
    linkedinPost: "https://www.linkedin.com/posts/vishal-desai-030b39251_teamvoid-hackathon-sih2025-ugcPost-7377582804332687360-WgYH",
    icon: "award",
  },
  {
    title: "PropTech Connect Dubai 2026",
    description: "Contributed to platform development featured at the international conference",
    linkedinPost: "https://www.linkedin.com/posts/hem-varia_having-rented-5-houses-in-my-life-so-far-activity-7421918803296501762-3Kho",
    icon: "award",
  },
  {
    title: "Technical Coordinator & Social Media Manager",
    description: "Career Development Cell, Parul University — Managed technical operations and social media",
    icon: "briefcase",
  },
]

export default function Experience() {
  return (
    <section id="experience" className="bg-black py-16 sm:py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 sm:mb-24 text-center"
        >
          <p className="text-white/30 text-sm font-mono mb-3">experience</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Where I&apos;ve Made an Impact
          </h2>
        </motion.div>

        {/* Mobile: Horizontal Scroll Snap */}
        <div className="sm:hidden -mx-4 px-4">
          {/* Swipe tip */}
          <p className="text-white/20 text-xs text-center mb-4 flex items-center justify-center gap-2">
            <span>←</span>
            <span>Swipe to explore</span>
            <span>→</span>
          </p>

          <div
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex-shrink-0 w-[85vw] snap-center"
              >
                <div
                  className="p-5 rounded-2xl h-full
                    bg-white/[0.03] backdrop-blur-xl
                    border border-white/[0.08]"
                >
                  {/* Type */}
                  {exp.type && (
                    <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                      {exp.type}
                    </span>
                  )}

                  {/* Title & Company */}
                  <h3 className="text-lg font-semibold text-white mt-1">
                    {exp.title}
                  </h3>
                  <p className="text-white/50 text-sm">{exp.company}</p>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-white/30">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      {exp.period}
                    </span>
                    {exp.location && (
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </span>
                    )}
                  </div>

                  {/* Points */}
                  <ul className="space-y-1.5 mt-4">
                    {exp.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white/50">
                        <span className="w-1 h-1 rounded-full bg-white/30 mt-2 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] font-medium rounded-full 
                          bg-white/[0.03] text-white/50 border border-white/[0.06]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Link */}
                  {exp.linkedinPost && (
                    <a
                      href={exp.linkedinPost}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-4 text-xs text-white/30"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      View Post
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          {/* Scroll indicator */}
          <div className="flex justify-center gap-1.5 mt-4">
            {experiences.map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />
            ))}
          </div>
        </div>

        {/* Desktop: Vertical Timeline */}
        <div className="hidden sm:block relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

          {/* Experience Items */}
          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-start mb-16 ${isEven ? "flex-row" : "flex-row-reverse"
                  }`}
              >
                {/* Dot */}
                <div className="absolute left-1/2 -translate-x-1/2 z-10">
                  <div className="w-3 h-3 rounded-full bg-white" />
                </div>

                {/* Card - Flat glass, no gradient */}
                <div className={`flex-1 ${isEven ? "pr-12 text-right" : "pl-12 text-left"}`}>
                  <div
                    className="p-5 sm:p-6 rounded-2xl 
                      bg-white/[0.03] backdrop-blur-xl
                      border border-white/[0.08]
                      hover:bg-white/[0.05] hover:border-white/[0.12]
                      transition-all duration-300"
                  >
                    {/* Type */}
                    {exp.type && (
                      <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                        {exp.type}
                      </span>
                    )}

                    {/* Title & Company */}
                    <h3 className="text-lg sm:text-xl font-semibold text-white mt-1">
                      {exp.title}
                    </h3>
                    <p className="text-white/50 text-sm sm:text-base">{exp.company}</p>

                    {/* Meta */}
                    <div className={`flex flex-wrap items-center gap-4 mt-3 text-xs text-white/30 ${isEven ? "justify-end" : "justify-start"}`}>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {exp.period}
                      </span>
                      {exp.location && (
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3" />
                          {exp.location}
                        </span>
                      )}
                    </div>

                    {/* Points */}
                    <ul className={`space-y-2 mt-4 ${isEven ? "text-right" : "text-left"}`}>
                      {exp.points.map((point, i) => (
                        <li key={i} className={`flex items-start gap-2 text-sm text-white/50 ${isEven ? "flex-row-reverse" : ""}`}>
                          <span className="w-1 h-1 rounded-full bg-white/30 mt-2 shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Stack */}
                    <div className={`flex flex-wrap gap-2 mt-4 ${isEven ? "justify-end" : "justify-start"}`}>
                      {exp.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-[11px] font-medium rounded-full 
                            bg-white/[0.03] text-white/50 border border-white/[0.06]
                            hover:bg-white/[0.06] hover:text-white/70 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Link */}
                    {exp.linkedinPost && (
                      <div className={`mt-4 ${isEven ? "text-right" : "text-left"}`}>
                        <a
                          href={exp.linkedinPost}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-white/30 hover:text-white transition-colors"
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                          View Post
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Empty space */}
                <div className="flex-1" />
              </motion.div>
            )
          })}
        </div>

        {/* Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 sm:mt-32 mb-8 sm:mb-12 text-center"
        >
          <p className="text-white/30 text-sm font-mono mb-3">activities</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Beyond the Code
          </h2>
        </motion.div>

        {/* Mobile: Horizontal Scroll Snap */}
        <div className="md:hidden -mx-4 px-4">
          {/* Swipe tip */}
          <p className="text-white/20 text-xs text-center mb-4 flex items-center justify-center gap-2">
            <span>←</span>
            <span>Swipe to explore</span>
            <span>→</span>
          </p>

          <div
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {activities.map((activity, index) => (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex-shrink-0 w-[80vw] snap-center"
              >
                <div
                  className="p-5 rounded-2xl h-full
                    bg-white/[0.03] backdrop-blur-xl
                    border border-white/[0.08]"
                >
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-4">
                    {activity.icon === "award" ? (
                      <Award className="w-5 h-5 text-white/50" />
                    ) : (
                      <Briefcase className="w-5 h-5 text-white/50" />
                    )}
                  </div>

                  {/* Content */}
                  <h3 className="text-base font-semibold text-white mb-2">
                    {activity.title}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed mb-4">
                    {activity.description}
                  </p>

                  {/* Link */}
                  {activity.linkedinPost && (
                    <a
                      href={activity.linkedinPost}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-white/30"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      View Post
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid grid-cols-3 gap-5 max-w-4xl mx-auto">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-5 sm:p-6 rounded-2xl 
                bg-white/[0.03] backdrop-blur-xl
                border border-white/[0.08]
                hover:bg-white/[0.05] hover:border-white/[0.12]
                transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-4">
                {activity.icon === "award" ? (
                  <Award className="w-5 h-5 text-white/50" />
                ) : (
                  <Briefcase className="w-5 h-5 text-white/50" />
                )}
              </div>

              {/* Content */}
              <h3 className="text-base font-semibold text-white mb-2">
                {activity.title}
              </h3>
              <p className="text-sm text-white/40 leading-relaxed mb-4">
                {activity.description}
              </p>

              {/* Link */}
              {activity.linkedinPost && (
                <a
                  href={activity.linkedinPost}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-white/30 hover:text-white transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  View Post
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
