"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Mail } from "lucide-react"
import Link from "next/link"

const topics = [
  "Full-stack development (Next.js, Node.js, Cloudflare)",
  "AI/ML engineering & agentic workflows",
  "Building & shipping side projects",
  "Lessons from real client work",
]

export default function BlogPage() {
  return (
    <main className="relative min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 py-24">
      <motion.div
        className="max-w-2xl w-full text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-white/30 text-sm font-mono uppercase tracking-widest mb-4">(BLOG)</p>

        <h1 className="text-[clamp(2.5rem,10vw,6rem)] font-bold text-white leading-[0.95] tracking-tight mb-6">
          Coming Soon
        </h1>

        <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10">
          I&apos;m writing up notes on what I&apos;m building and learning. First posts are on the way — here&apos;s
          what to expect:
        </p>

        <ul className="flex flex-col gap-3 mb-12 max-w-md mx-auto text-left">
          {topics.map((topic, i) => (
            <motion.li
              key={topic}
              className="flex items-start gap-3 text-white/70 text-sm sm:text-base"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 shrink-0" />
              <span>{topic}</span>
            </motion.li>
          ))}
        </ul>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium text-sm hover:bg-white/90 transition-colors duration-300"
          >
            <ArrowLeft className="size-4" />
            Back to Home
          </Link>
          <a
            href="mailto:hemvaria007@gmail.com?subject=Notify%20me%20when%20the%20blog%20launches"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-colors duration-300"
          >
            <Mail className="size-4" />
            Get notified
          </a>
        </motion.div>
      </motion.div>
    </main>
  )
}
