"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Download } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const socials = [
  { href: "https://github.com/HemVaria", label: "GitHub", Icon: Github },
  { href: "https://linkedin.com/in/hem-varia", label: "LinkedIn", Icon: Linkedin },
  { href: "mailto:hemvaria007@gmail.com", label: "Email", Icon: Mail },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
}

export default function Hero() {
  return (
    <section className="relative isolate z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center md:px-8 pt-28 md:pt-36">

      <motion.h1
        className="relative text-white text-center font-ios"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Greeting line 1 */}
        <motion.div
          variants={itemVariants}
          className="drop-shadow-[0_6px_24px_rgba(0,0,0,0.45)] text-[clamp(2rem,7vw,5rem)] tracking-[0.005em] leading-[1.06] font-semibold"
        >
          <span aria-hidden>👋✨ </span>
          <em className="italic">Hey, I'm</em>
        </motion.div>

        {/* Greeting line 2 */}
        <motion.div
          variants={itemVariants}
          className="mt-1 md:mt-2 drop-shadow-[0_6px_24px_rgba(0,0,0,0.45)] text-[clamp(2.25rem,7.5vw,5.5rem)] tracking-[0.005em] leading-[1.06] font-bold"
        >
          <em className="italic">Hem Varia</em> <span aria-hidden>👾</span>
        </motion.div>

        {/* Avatar + Role row */}
        <motion.div
          variants={itemVariants}
          className="mt-6 md:mt-8 flex items-center justify-center gap-3 md:gap-4"
        >
          <span className="inline-flex items-center justify-center rounded-full p-1 bg-white/5 border border-white/10 backdrop-blur-md shadow-lg">
            <Image
              src="/images/design-mode/497194244_18163154437353224_7281199870403729748_n.jpg"
              alt="Hem Varia avatar"
              width={60}
              height={60}
              className="inline-block size-12 md:size-[3.75rem] rounded-full border border-white/10"
            />
          </span>
          <div className="text-left font-ios">
            <div className="text-white/90 tracking-[0.01em] text-[clamp(0.9rem,1.4vw,1.1rem)] md:text-[clamp(1rem,1.6vw,1.2rem)] font-semibold italic leading-[1.15]">
              <span aria-hidden className="mr-1">💻</span>
              <span>FULL STACK CREATOR</span>
              <span aria-hidden className="ml-1">🛠️</span>
            </div>
            <div className="text-white/90 tracking-[0.01em] text-[clamp(0.9rem,1.4vw,1.1rem)] md:text-[clamp(1rem,1.6vw,1.2rem)] font-semibold italic leading-[1.15]">
              <span aria-hidden className="mr-1">🤖</span>
              <span>AI / ML</span>
              <span aria-hidden className="ml-1">🧠</span>
            </div>
          </div>
        </motion.div>
      </motion.h1>

      <motion.p
        className="hero-bio mt-7 max-w-3xl text-[clamp(1rem,1.5vw,1.125rem)] leading-relaxed text-white font-ios tracking-[-0.01em]"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        I craft fast, accessible web apps and practical AI workflows. I enjoy
        turning complex ideas into intuitive experiences—shipping for brands and
        startups, and building my own tools along the way.
      </motion.p>

      <motion.div
        className="hero-social mt-8 flex flex-wrap items-center justify-center gap-3"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {/* Download CV (primary) */}
        <a
          href="/Hem-Varia-ONEPAGECV.pdf"
          download
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white backdrop-blur-md transition-colors hover:bg-white/[0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <Download className="size-4" aria-hidden />
          <span>Download CV</span>
        </a>
        {/* View CV (opens in new tab) */}
        <a
          href="/Hem-Varia-ONEPAGECV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-white backdrop-blur-md transition-colors hover:bg-white/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <span>View CV</span>
        </a>
        {socials.map(({ href, label, Icon }) => (
          <Link
            key={href}
            href={href}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-white backdrop-blur-md transition-colors hover:bg-white/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <Icon className="size-4" aria-hidden />
            <span>{label}</span>
          </Link>
        ))}
      </motion.div>
    </section>
  )
}
