"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { dL, dM, label, MOTION, Scramble } from "./kit"

// The four services from the old site, cut to one line each.
const SERVICES = [
  { t: "Product engineering", d: "Whole products, from the database to the last pixel.", s: ["Next.js", "Node.js", "PostgreSQL"] },
  { t: "AI & agents", d: "AI as infrastructure: agents, multimodal pipelines and MCP tools.", s: ["Claude Code", "MCP", "Whisper"] },
  { t: "Automation", d: "Work that runs itself, on a schedule, without anyone touching it.", s: ["n8n", "Cron Workers", "GitHub Actions"] },
  { t: "Edge & speed", d: "Fast sites on Cloudflare's edge, tuned for Core Web Vitals.", s: ["Cloudflare", "Web Vitals", "Vercel"] },
]

export default function Services() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia(ref)
    mm.add(MOTION, () => {
      gsap.from("[data-row]", {
        yPercent: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ref.current!.querySelector("ul"), start: "top 80%", toggleActions: "play none none none" },
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={ref} id="services" className="scroll-mt-20 px-5 py-20 md:px-12 md:py-48">
      <Scramble as="h2" text="What I do." className={dL} />
      <ul className="mt-10 md:mt-16">
        {SERVICES.map((v, i) => (
          <li key={v.t} data-row className="group relative overflow-hidden border-t border-[#111] last:border-b">
            {/* gray wipe on hover */}
            <span
              aria-hidden
              className="absolute inset-0 origin-left scale-x-0 bg-[#D2CDC2] transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:scale-x-100 motion-reduce:transition-none"
            />
            <div className="relative flex flex-col gap-3 py-7 md:grid md:grid-cols-12 md:items-baseline md:gap-6 md:py-9">
              <span className={`${label} md:col-span-1`}>0{i + 1}</span>
              <h3 className={`${dM} md:col-span-4`}>{v.t}</h3>
              <p className="text-[15px] leading-normal text-[#5E5B55] group-hover:text-[#3F3C37] md:col-span-4">
                {v.d}
              </p>
              <ul className="flex flex-wrap gap-2 md:col-span-3 md:justify-end">
                {v.s.map((s) => (
                  <li
                    key={s}
                    className={`${label} border border-current px-2 py-1 transition-transform duration-500 group-hover:-translate-y-0.5`}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
