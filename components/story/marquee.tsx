"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { dL, label } from "./kit"

// Kinds of work I automate (general, not project names).
const ROWS = [
  ["Instagram replies", "Meta Ads", "Invoices", "Performance marketing", "Order shipping"],
  ["Recruitment", "Drip campaigns", "Lead magnets", "Lead follow-up calls", "Blog publishing", "SEO research"],
]

// Two rows of things I automate. They drift on their own; scrolling speeds them up
// and leans them in the scroll direction, then they settle.
export default function Marquee() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia(ref)
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tracks = gsap.utils.toArray<HTMLElement>("[data-track]")
      const pos = tracks.map(() => 0)
      let boost = 0
      let skew = 0
      const st = ScrollTrigger.create({
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (s) => {
          const v = s.getVelocity() / 300
          boost = gsap.utils.clamp(-12, 12, v)
        },
      })
      const tick = () => {
        boost *= 0.92
        skew += (gsap.utils.clamp(-12, 12, boost * 1.4) - skew) * 0.15
        tracks.forEach((t, i) => {
          const half = t.scrollWidth / 2 // each track holds its words twice
          const dir = i % 2 ? 1 : -1
          pos[i] = (pos[i] + dir * (0.6 + Math.abs(boost))) % half
          if (dir === 1 && pos[i] > 0) pos[i] -= half
          gsap.set(t, { x: pos[i], skewX: -skew * dir })
        })
      }
      gsap.ticker.add(tick)
      return () => {
        gsap.ticker.remove(tick)
        st.kill()
      }
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={ref} aria-labelledby="automate-title" className="overflow-hidden border-y border-[#111] py-16 md:py-24">
      <h2 id="automate-title" className={`${label} px-5 text-[#5E5B55] md:px-12`}>
        I automate
      </h2>
      {ROWS.map((words, r) => (
        <div key={r} className="mt-6 whitespace-nowrap motion-reduce:whitespace-normal motion-reduce:px-5 md:mt-8">
          <ul data-track className="inline-flex will-change-transform motion-reduce:flex motion-reduce:flex-wrap">
            {[...words, ...words].map((w, i) => (
              <li
                key={i}
                aria-hidden={i >= words.length || undefined}
                className={`${dL} flex shrink-0 items-center gap-[0.35em] pr-[0.35em] motion-reduce:aria-hidden:hidden`}
              >
                <span className={i % 2 ? "font-light italic" : ""}>{w}</span>
                <span aria-hidden className="inline-block size-[0.22em] bg-[#2B3BFF]" />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}
