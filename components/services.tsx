"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const services = [
  {
    number: "(01)",
    title: "Full-Stack Development",
    description:
      "From frontend interactions to backend APIs, I build complete web solutions. I work with modern stacks to deliver apps that are scalable, maintainable, and ready for real-world users.",
    skills: [
      { num: "01", text: "React, Node.js, Express.js" },
      { num: "02", text: "REST APIs, Firebase, Docker" },
      { num: "03", text: "Git, GitHub, Postman" },
    ],
  },
  {
    number: "(02)",
    title: "UI/UX & Frontend",
    description:
      "Design is more than looks — it's about clarity and connection. I design and develop clean, responsive interfaces that feel intuitive across devices. My focus is on clarity, accessibility, and seamless user experiences.",
    skills: [
      { num: "01", text: "Next.js, TailwindCSS, GSAP" },
      { num: "02", text: "Figma to Code" },
      { num: "03", text: "HTML, CSS, JavaScript" },
    ],
  },
  {
    number: "(03)",
    title: "Optimization",
    description:
      "Beyond handling data, I'm driven by the challenge of turning complex raw inputs into reliable, usable systems. I enjoy designing pipelines that power insights and apply core CS principles to build for scale, speed, and stability.",
    skills: [
      { num: "01", text: "Data Structures & Algorithms" },
      { num: "02", text: "DBMS, OOP, OS Fundamentals" },
      { num: "03", text: "Data Pipelines, ETL, and Scalability" },
    ],
  },
]

export default function Services() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  return (
    <section id="services" className="bg-[#111111] text-[#E8E8E3] py-24 md:py-32 px-6 md:px-10">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="font-sans text-[clamp(2.5rem,8vw,5rem)] font-bold uppercase tracking-tight mb-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          WHAT I DO <span className="text-[#9A9A9A]">/</span>
        </motion.h2>

        {/* Services Description */}
        <motion.div 
          className="flex flex-col md:flex-row gap-8 md:gap-16 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <div className="text-sm text-[#9A9A9A] uppercase tracking-wider shrink-0">
            (SERVICES)
          </div>
          <p className="text-lg md:text-xl text-[#9A9A9A] leading-relaxed max-w-2xl">
            I specialize in building full-stack web applications that are fast, reliable, and user-friendly. 
            With a solid foundation in both frontend and backend technologies, I help bring ideas to life 
            whether it's for a business, a startup, or a product team.
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
                className="w-full py-8 md:py-10 flex items-center justify-between group cursor-pointer"
                onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
              >
                <div className="flex items-center gap-8 md:gap-16 lg:gap-32">
                  {/* Number */}
                  <span className="font-mono text-2xl md:text-4xl font-bold text-[#E8E8E3]/40">
                    {service.number}
                  </span>
                  
                  {/* Title */}
                  <h3 className="font-sans text-2xl md:text-4xl lg:text-5xl font-bold text-[#E8E8E3] group-hover:text-[#D4C5A9] transition-colors duration-300 text-left">
                    {service.title}
                  </h3>
                </div>

                {/* Toggle Indicator */}
                <motion.div
                  className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center"
                  animate={{ rotate: expandedIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg className="w-6 h-6 text-[#E8E8E3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    <div className="pb-10 md:pb-16 pl-0 md:pl-[calc(4rem+64px)] lg:pl-[calc(4rem+128px)]">
                      {/* Description */}
                      <p className="text-base md:text-lg text-[#9A9A9A] leading-relaxed max-w-2xl mb-8">
                        {service.description}
                      </p>

                      {/* Skills List */}
                      <div className="space-y-4">
                        {service.skills.map((skill, j) => (
                          <motion.div
                            key={skill.num}
                            className="flex items-center gap-4 py-3 border-t border-white/5"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: j * 0.1, duration: 0.4 }}
                          >
                            <span className="font-mono text-xs text-[#9A9A9A]">{skill.num}</span>
                            <span className="font-medium text-[#D4C5A9] text-lg">{skill.text}</span>
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
