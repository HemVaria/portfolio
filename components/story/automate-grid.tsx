"use client"

import { useEffect, useRef, useState } from "react"
import { dL, focus, label } from "./kit"

const LABELS = ["invoice", "reply", "report", "lead", "order", "post", "email", "follow-up"]
const SPAWN_MS = 260 // a new task arrives this often, all day
const HAND_MS = 900 // one task at a time when a person does it
const AUTO_MS = 30 // the machine clears the pile almost at once
const MAX_QUEUE = 140

type Task = { x: number; y: number; tx: number; ty: number; label: string; done: boolean; t: number }

// Tasks stream in on a belt. By hand they pile up at the station; one switch clears them.
export default function AutomateGrid() {
  const box = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const autoRef = useRef(false)
  const [auto, setAuto] = useState(false)
  const [counts, setCounts] = useState({ waiting: 0, done: 0 })

  useEffect(() => {
    const el = box.current!
    const cv = canvas.current!
    const g = cv.getContext("2d")!
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches
    let W = 0
    let H = 0
    let cw = 64 // card size
    let ch = 26
    let lane = 0
    let station = 0
    const queue: Task[] = []
    const flying: Task[] = []
    let done = 0
    let lastSpawn = 0
    let lastServe = 0
    let last = performance.now()
    let raf = 0
    let visible = false

    const layout = () => {
      W = el.clientWidth
      H = el.clientHeight
      const dpr = Math.min(devicePixelRatio, 2)
      cv.width = W * dpr
      cv.height = H * dpr
      g.setTransform(dpr, 0, 0, dpr, 0, 0)
      cw = W < 640 ? 58 : 80
      ch = W < 640 ? 20 : 26
      lane = H * 0.72
      station = W * (W < 640 ? 0.62 : 0.6)
      queue.forEach(slot)
    }

    // Queued tasks stack into a pile to the left of the station.
    const slot = (t: Task, q = queue.indexOf(t)) => {
      const perCol = Math.max(3, Math.floor((lane - 40) / (ch + 3)))
      t.tx = station - 24 - (Math.floor(q / perCol) + 1) * (cw + 3)
      t.ty = lane - (q % perCol) * (ch + 3)
    }

    function step(now: number) {
      const dt = Math.min(now - last, 50)
      last = now
      // Arrivals
      if (now - lastSpawn > SPAWN_MS && queue.length < MAX_QUEUE) {
        lastSpawn = now
        const t: Task = { x: -cw, y: lane, tx: 0, ty: 0, label: LABELS[Math.floor(Math.random() * LABELS.length)], done: false, t: now }
        queue.push(t)
        slot(t)
      }
      // Serving: slow by hand, instant when automated
      if (queue.length && now - lastServe > (autoRef.current ? AUTO_MS : HAND_MS)) {
        lastServe = now
        const t = queue.shift()!
        t.done = true
        t.tx = W + cw
        t.ty = lane
        flying.push(t)
        queue.forEach((q, i) => slot(q, i))
      }
      // Motion: ease toward targets; finished tasks race off to the right
      const k = Math.min(1, dt / (autoRef.current ? 60 : 140))
      for (const t of [...queue, ...flying]) {
        t.x += (t.tx - t.x) * k
        t.y += (t.ty - t.y) * k
      }
      for (let i = flying.length - 1; i >= 0; i--)
        if (flying[i].x > W) {
          flying.splice(i, 1)
          done++
        }
    }

    function draw() {
      g.clearRect(0, 0, W, H)
      // belt
      g.fillStyle = "#111111"
      g.fillRect(0, lane + ch + 6, W, 1)
      // station
      const on = autoRef.current
      g.fillStyle = on ? "#2B3BFF" : "#111111"
      g.fillRect(station - 6, lane - ch * 2.2, 12, ch * 3.2 + 6)
      g.font = `500 ${W < 640 ? 9 : 11}px ui-monospace, monospace`
      g.textBaseline = "middle"
      g.fillText(on ? "MACHINE" : "BY HAND", station - 6, lane - ch * 2.2 - 12)
      for (const t of [...queue, ...flying]) {
        g.fillStyle = t.done ? "#2B3BFF" : "#FBFAF7"
        g.fillRect(t.x, t.y, cw, ch)
        g.strokeStyle = t.done ? "#2B3BFF" : "#111111"
        g.strokeRect(t.x + 0.5, t.y + 0.5, cw - 1, ch - 1)
        g.fillStyle = t.done ? "#FFFFFF" : "#111111"
        g.fillText(t.done ? `✓ ${t.label}` : t.label, t.x + 6, t.y + ch / 2 + 1)
      }
    }

    let lastCount = 0
    function frame(now: number) {
      raf = 0
      step(now)
      draw()
      if (now - lastCount > 150) {
        lastCount = now
        setCounts({ waiting: queue.length, done })
      }
      if (visible) raf = requestAnimationFrame(frame)
    }

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      last = performance.now()
      if (visible && !raf && !reduce) raf = requestAnimationFrame(frame)
    })
    io.observe(el)
    const ro = new ResizeObserver(() => {
      layout()
      if (reduce) draw()
    })
    ro.observe(el)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
    }
  }, [])

  const toggle = () => {
    autoRef.current = !autoRef.current
    setAuto(autoRef.current)
  }

  return (
    <section className="px-5 py-16 md:px-12 md:py-32">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className={dL}>Same task, all day.</h2>
          <p className="mt-4 max-w-[36ch] text-[#5E5B55]">Work keeps arriving. Done by hand, it piles up. Flip the switch.</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={auto}
          onClick={toggle}
          className={`${focus} group flex min-h-11 items-center gap-4 self-start md:self-end`}
        >
          <span className={`${label}`}>Automation</span>
          <span
            aria-hidden
            className={`relative h-9 w-[4.5rem] border-2 border-[#111] transition-colors duration-300 ${auto ? "bg-[#2B3BFF]" : "bg-[#FBFAF7]"}`}
          >
            <span
              className={`absolute top-1 left-1 size-6 transition-transform duration-300 ease-[cubic-bezier(.7,0,.2,1)] ${auto ? "translate-x-9 bg-white" : "bg-[#111]"}`}
            />
          </span>
          <span className={`${label} w-[3ch] ${auto ? "text-[#2B3BFF]" : ""}`}>{auto ? "On" : "Off"}</span>
        </button>
      </div>

      <div ref={box} className="relative mt-8 h-[38vh] min-h-[260px] border-y border-[#111] md:mt-10 md:h-[46vh] md:min-h-[320px]">
        <canvas ref={canvas} aria-hidden className="absolute inset-0 size-full" />
      </div>
      <dl className={`${label} mt-4 flex gap-8`}>
        <div className="flex gap-2">
          <dt className="text-[#5E5B55]">Waiting</dt>
          <dd>{counts.waiting}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-[#2B3BFF]">Done</dt>
          <dd>{counts.done}</dd>
        </div>
      </dl>
    </section>
  )
}
