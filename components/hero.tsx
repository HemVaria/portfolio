"use client"

import { motion, Variants } from "framer-motion"
import { ArrowUpRight, Download } from "lucide-react"
import Image from "next/image"

export default function Hero() {
  // Animation variants for staggered text reveal
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const letterVariants: Variants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <section className="relative min-h-screen bg-[#f5f5f0]">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left content */}
        <div className="flex flex-col justify-center px-5 sm:px-6 md:px-12 lg:px-16 py-20 sm:py-24 lg:py-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Name - Large with text reveal animation */}
            <div className="overflow-hidden">
              <motion.h1
                className="text-[clamp(3rem,12vw,10rem)] font-bold text-black leading-[0.85] tracking-tighter"
                variants={letterVariants}
              >
                HEM
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                className="text-[clamp(3rem,12vw,10rem)] font-bold text-black leading-[0.85] tracking-tighter"
                variants={letterVariants}
              >
                VARIA
              </motion.h1>
            </div>

            {/* Tagline */}
            <motion.p
              className="mt-6 sm:mt-8 text-black/70 text-base sm:text-lg max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Full-Stack Developer & Designer. Turning ideas into polished digital solutions.
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 bg-black text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium text-sm sm:text-base hover:bg-black/80 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                CONTACT
                <ArrowUpRight className="size-4" />
              </motion.a>

              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-transparent text-black px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium text-sm sm:text-base border-2 border-black hover:bg-black hover:text-white transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="size-4" />
                DOWNLOAD CV
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Right image with frame - shifted more to the left */}
        <motion.div
          className="relative flex items-center justify-center px-5 pb-24 sm:pb-8 lg:p-12 lg:-ml-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[500px] aspect-[3/4]">
            {/* Framed Image */}
            <div className="relative w-full h-full border-3 sm:border-4 border-black shadow-[6px_6px_0px_#000] sm:shadow-[8px_8px_0px_#000] hover:shadow-[10px_10px_0px_#000] sm:hover:shadow-[12px_12px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-500 overflow-hidden group">
              <Image
                src="/images/design-mode/497194244_18163154437353224_7281199870403729748_n.jpg"
                alt="Hem Varia"
                fill
                className="object-cover md:grayscale md:group-hover:grayscale-0 transition-all duration-700"
                priority
              />
            </div>

            {/* Available badge */}
            <motion.div
              className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 flex items-center gap-1.5 sm:gap-2 bg-white px-3 py-1.5 sm:px-4 sm:py-2 shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-[10px] sm:text-xs font-medium text-black uppercase tracking-wide">Available</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator - hidden on mobile to avoid bottom nav overlap */}
      <motion.div
        className="absolute bottom-8 left-6 md:left-12 lg:left-16 hidden sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <div className="flex items-center gap-2 text-black/50">
          <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <span className="text-xs uppercase tracking-wider">Scroll</span>
        </div>
      </motion.div>
    </section>
  )
}
