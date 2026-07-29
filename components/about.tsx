"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Download } from "lucide-react"

export default function About() {
  return (
    <section className="bg-black py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="relative aspect-[4/5] rounded-2xl overflow-hidden"
          >
            <Image
              src="/images/design-mode/497194244_18163154437353224_7281199870403729748_n.jpg"
              alt="Hem Varia"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <p className="text-2xl md:text-3xl text-white/90 leading-relaxed font-medium">
              I&apos;m a software engineer who ships production systems — full-stack, AI-integrated, and built to
              hold up under real users.
            </p>

            <div className="mt-6 text-sm text-white/40 uppercase tracking-wider">
              (ABOUT ME)
            </div>

            <div className="mt-6 space-y-4 text-white/70 leading-relaxed">
              <p>
                I&apos;m currently a Software Engineer at Promact Global, where I migrate and optimize production
                sites on Cloudflare&apos;s edge, build marketing and e-commerce automation with Cron Workers and
                GitHub Actions, and wire MCP servers into live projects.
              </p>
              <p>
                Alongside that I build my own products — a GST invoicing SaaS, an agency management platform,
                and a published npm CLI for auditing AI agent configs. I&apos;ve shipped a real estate platform
                featured at PropTech Connect Dubai 2026 and reached the SIH 2025 national finals.
              </p>
              <p>
                I care about the unglamorous parts: systems that don&apos;t break, pages that load fast, and
                automation that quietly removes work instead of adding it.
              </p>
            </div>

            {/* Download CV Button */}
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white rounded-full hover:bg-white hover:text-black transition-colors duration-300 ease-out"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Download className="size-4" />
              Download CV
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
