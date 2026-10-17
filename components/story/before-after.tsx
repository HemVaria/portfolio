"use client"

import { useState } from "react"
import { dL, dM, label } from "./kit"

// Pure metaphor: the busywork pile on the left, one clean line on the right.
const notes = [
  { t: "copy order ID", x: 6, y: 10, r: -6 },
  { t: "paste into sheet", x: 30, y: 26, r: 4 },
  { t: "email the customer", x: 8, y: 52, r: 3 },
  { t: "update tracking", x: 44, y: 60, r: -4 },
  { t: "remind the team", x: 58, y: 14, r: 7 },
  { t: "check again tomorrow", x: 22, y: 76, r: -3 },
  { t: "did I send it?", x: 66, y: 40, r: -8 },
]

export default function BeforeAfter() {
  const [pos, setPos] = useState(55) // divider position, % from left

  return (
    <section className="px-5 py-20 md:px-12 md:py-48">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <h2 className={`${dL} max-w-[14ch]`}>Busywork, then none.</h2>
        <p className={`${label} text-[#5E5B55]`}>Drag the line.</p>
      </div>

      <div className="relative mt-8 h-[58vh] min-h-[400px] select-none md:mt-12 md:h-[70vh] md:min-h-[440px] overflow-hidden border border-[#111] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#2B3BFF]">
        {/* Before: the pile */}
        <div aria-hidden className="absolute inset-0 bg-[#FBFAF7]">
          <div className="absolute inset-x-[8%] top-[34%] grid h-[30%] grid-cols-6 grid-rows-4 border border-[#111]/40">
            {Array.from({ length: 24 }, (_, i) => (
              <span key={i} className={`border border-[#111]/15 ${i % 5 === 2 ? "bg-[#111]/10" : ""}`} />
            ))}
          </div>
          {notes.map((n) => (
            <span
              key={n.t}
              className="absolute w-[min(40vw,190px)] border border-[#111] bg-[#F2F0EB] px-3 py-4 font-(family-name:--font-story-mono) text-[11px] uppercase tracking-[0.12em]"
              style={{ left: `${n.x}%`, top: `${n.y}%`, transform: `rotate(${n.r}deg)` }}
            >
              {n.t}
            </span>
          ))}
          <span className={`${label} absolute bottom-4 left-4 bg-[#111] px-2 py-1 text-[#F2F0EB]`}>Before</span>
        </div>

        {/* After: one clean line, revealed to the right of the divider */}
        <div
          aria-hidden
          className="absolute inset-0 flex items-center bg-[#F2F0EB]"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        >
          <div className="relative mx-[10%] h-px flex-1 bg-[#111]">
            <span className="absolute inset-0 animate-[ride_3.2s_linear_infinite] motion-reduce:animate-none">
              <span className="absolute -top-[5px] -left-[5px] size-[11px] bg-[#2B3BFF]" />
            </span>
          </div>
          <p className={`${dM} absolute right-[10%] bottom-[22%] text-right`}>It just runs.</p>
          <span className={`${label} absolute right-4 bottom-4 bg-[#2B3BFF] px-2 py-1 text-white`}>After</span>
        </div>

        {/* Divider handle (visual) */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 w-px bg-[#111]" style={{ left: `${pos}%` }}>
          <span className="absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-[#111] bg-[#F2F0EB] text-sm">
            ⇆
          </span>
        </div>

        {/* The real control: full-size range input, so mouse, touch and keyboard all work */}
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Compare before and after"
          className="absolute inset-0 size-full cursor-ew-resize touch-pan-y appearance-none bg-transparent opacity-0"
        />
      </div>
      <style>{`@keyframes ride { from { transform: translateX(0) } to { transform: translateX(100%) } }`}</style>
    </section>
  )
}
