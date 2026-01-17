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
            transition={{ duration: 0.6 }}
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
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-2xl md:text-3xl text-white/90 leading-relaxed font-medium">
              I'm a software engineer focused on turning ideas into clean, intuitive digital experiences.
            </p>

            <div className="mt-6 text-sm text-white/40 uppercase tracking-wider">
              (ABOUT ME)
            </div>

            <div className="mt-6 space-y-4 text-white/70 leading-relaxed">
              <p>
                I am a dedicated Software Engineer with a knack for building full-stack web applications 
                using modern technologies like Next.js and Tailwind CSS. My journey in tech began with a 
                curiosity for solving real-world problems through innovative solutions.
              </p>
              <p>
                Beyond coding, I thrive in collaborative environments and enjoy tackling challenging 
                problems with creative solutions. I aim to contribute to impactful projects that make 
                a difference in users' lives.
              </p>
            </div>

            {/* Download CV Button */}
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white rounded-full hover:bg-white hover:text-black transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
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
