"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Download } from "lucide-react"
import Link from "next/link"

import Typewriter from "./ui/typewriter"
import TrueFocus from "./ui/true-focus"
import ShinyText from "./ui/shiny-text"

const socials = [
  { href: "https://github.com/HemVaria", label: "GitHub", Icon: Github },
  { href: "https://linkedin.com/in/hem-varia", label: "LinkedIn", Icon: Linkedin },
  { href: "mailto:hemvaria007@gmail.com", label: "Email", Icon: Mail },
]

type AnimationProps = {
  speed?: number
  nameDuration?: number
  roleDuration?: number
  nameDelay?: number
  roleDelay?: number
}

export default function Hero({ animation }: { animation?: AnimationProps } = {}) {
  // We'll use the Typewriter component for a clean typing animation instead of GSAP split/scramble.

  return (
    <section className="relative isolate z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center md:px-8 pt-28 md:pt-36">
      {/* Top glow ribbon */}
      <div className="pointer-events-none absolute inset-x-0 -top-44 mx-auto h-64 w-[min(900px,90vw)] rounded-full bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--color-primary)_28%,transparent)_0%,transparent_60%)] blur-2xl" />

      <motion.h1
        className="relative text-white text-center font-ios"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.7, ease: "easeOut" }}
      >
        {/* Greeting line 1 (true focus) */}
        <div className="drop-shadow-[0_6px_24px_rgba(0,0,0,0.45)] text-[clamp(2rem,7vw,5rem)] tracking-[0.005em] leading-[1.06] font-semibold">
          <span className="inline-block">
            <span aria-hidden>👋✨ </span>
            <em className="italic">
              <TrueFocus text="Hey, I'm" delay={200} speed={0.08} className="inline-block" />
            </em>
          </span>
        </div>

        {/* Greeting line 2 (true focus) */}
        <div className="mt-1 md:mt-2 drop-shadow-[0_6px_24px_rgba(0,0,0,0.45)] text-[clamp(2.25rem,7.5vw,5.5rem)] tracking-[0.005em] leading-[1.06] font-bold">
          <span className="inline-block">
            <em className="italic">
              <TrueFocus text="Hem Varia" delay={900} speed={0.06} className="inline-block" />
            </em>
            {" "}
            <span aria-hidden>👾</span>
          </span>
        </div>

        {/* Avatar + Role row */}
        <div className="mt-6 md:mt-8 flex items-center justify-center gap-3 md:gap-4">
          <span className="inline-flex items-center justify-center rounded-full p-1 bg-white/5 border border-white/10 backdrop-blur-md shadow-lg">
            <img
              src="/images/design-mode/497194244_18163154437353224_7281199870403729748_n.jpg"
              alt="Hem Varia avatar"
              className="inline-block size-12 md:size-[3.75rem] rounded-full border border-white/10"
            />
          </span>
          <div className="text-left font-ios">
            <div className="text-white/90 tracking-[0.01em] text-[clamp(0.9rem,1.4vw,1.1rem)] md:text-[clamp(1rem,1.6vw,1.2rem)] font-semibold italic leading-[1.15]">
              <span aria-hidden className="mr-1">💻</span>
              <TrueFocus text="FULL STACK CREATOR" delay={900} speed={0.03} className="inline-block" />
              <span aria-hidden className="ml-1">🛠️</span>
            </div>
            <div className="text-white/90 tracking-[0.01em] text-[clamp(0.9rem,1.4vw,1.1rem)] md:text-[clamp(1rem,1.6vw,1.2rem)] font-semibold italic leading-[1.15]">
              <span aria-hidden className="mr-1">🤖</span>
              <TrueFocus text="AI / ML" delay={1400} speed={0.04} className="inline-block" />
              <span aria-hidden className="ml-1">🧠</span>
            </div>
          </div>
        </div>
      </motion.h1>

      <motion.p
        className="hero-bio mt-7 max-w-3xl text-[clamp(1rem,1.5vw,1.125rem)] leading-relaxed text-white font-ios tracking-[-0.01em]"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <ShinyText
          text="I craft fast, accessible web apps and practical AI workflows. I enjoy turning complex ideas into intuitive experiences—shipping for brands and startups, and building my own tools along the way."
          speed={8}
        />
      </motion.p>

      <motion.div
        className="hero-social mt-8 flex flex-wrap items-center justify-center gap-3"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
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
