"use client"

import { useEffect, useRef } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { dM } from "./kit"

const WORDS = ["SHIP", "IT"] // second word renders in the accent
const INK = "#111111"
const ACCENT = "#2B3BFF"

type P = { x0: number; y0: number; tx: number; ty: number; ox: number; oy: number; vx: number; vy: number; d: number; a: boolean }

// A giant word made of dither-sized pixels. Scroll pulls them in from a scatter;
// the cursor shoves them aside and they spring back.
export default function PixelWord() {
  const section = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const host = stage.current!
    const cv = canvas.current!
    const g = cv.getContext("2d")!
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches
    let parts: P[] = []
    let W = 0
    let H = 0
    let cell = 8
    let target = reduce ? 1 : 0
    let shown = target
    const ptr = { x: -9999, y: -9999 }
    let raf = 0
    let visible = false

    function build() {
      const dpr = Math.min(devicePixelRatio, 2)
      W = host.clientWidth
      H = host.clientHeight
      cv.width = W * dpr
      cv.height = H * dpr
      g.setTransform(dpr, 0, 0, dpr, 0, 0)
      cell = W < 768 ? 5 : 8

      // Rasterise the words at cell resolution and keep the filled cells.
      const cols = Math.floor(W / cell)
      const rows = Math.floor(H / cell)
      const off = document.createElement("canvas")
      off.width = cols
      off.height = rows
      const o = off.getContext("2d", { willReadFrequently: true })!
      const family = getComputedStyle(host).fontFamily
      // One line on wide screens; stacked (SHIP over IT) on phones so the word stays big.
      const stacked = W < 768
      const lines = stacked ? WORDS : [WORDS.join(" ")]
      o.font = `900 100px ${family}`
      const widest = Math.max(...lines.map((l) => o.measureText(l).width))
      const size = Math.min((100 * cols * 0.92) / widest, (rows * (stacked ? 0.9 : 0.55)) / lines.length)
      o.font = `900 ${size}px ${family}`
      o.textBaseline = "middle"
      const lineY = (i: number) => (stacked ? rows * 0.5 + (i - 0.5) * size * 0.92 : rows * 0.58)
      lines.forEach((l, i) => o.fillText(l, (cols - o.measureText(l).width) / 2, lineY(i)))
      // Pixels belonging to the second word render in the accent.
      const isAccent = (x: number, y: number) =>
        stacked ? y > rows * 0.5 : x >= (cols - o.measureText(lines[0]).width) / 2 + o.measureText(`${WORDS[0]} `).width
      const data = o.getImageData(0, 0, cols, rows).data

      parts = []
      for (let y = 0; y < rows; y++)
        for (let x = 0; x < cols; x++)
          if (data[(y * cols + x) * 4 + 3] > 128)
            parts.push({
              tx: x * cell,
              ty: y * cell,
              x0: Math.random() * W,
              y0: Math.random() * H,
              ox: 0,
              oy: 0,
              vx: 0,
              vy: 0,
              d: Math.random() * 0.45, // staggered arrival
              a: isAccent(x, y),
            })
      draw()
    }

    const ease = (t: number) => 1 - (1 - t) ** 3
    function draw() {
      g.clearRect(0, 0, W, H)
      const s = cell - 1
      const R = cell * 11
      let moving = Math.abs(target - shown) > 0.001
      shown += (target - shown) * 0.12
      for (const p of parts) {
        const k = ease(Math.min(1, Math.max(0, (shown - p.d) / 0.55)))
        let x = p.x0 + (p.tx - p.x0) * k
        let y = p.y0 + (p.ty - p.y0) * k
        if (!reduce) {
          // Cursor pushes nearby pixels; a spring returns them.
          const dx = x + p.ox - ptr.x
          const dy = y + p.oy - ptr.y
          const d2 = dx * dx + dy * dy
          if (d2 < R * R) {
            const f = (1 - Math.sqrt(d2) / R) * 3
            const inv = 1 / (Math.sqrt(d2) || 1)
            p.vx += dx * inv * f
            p.vy += dy * inv * f
          }
          p.vx = (p.vx - p.ox * 0.08) * 0.82
          p.vy = (p.vy - p.oy * 0.08) * 0.82
          p.ox += p.vx
          p.oy += p.vy
          if (Math.abs(p.ox) + Math.abs(p.oy) > 0.2) moving = true
          x += p.ox
          y += p.oy
        }
        g.fillStyle = p.a ? ACCENT : INK
        g.fillRect(x, y, s, s)
      }
      return moving
    }

    function loop() {
      raf = 0
      const moving = draw()
      if (visible && (moving || ptr.x > -9999)) raf = requestAnimationFrame(loop)
    }
    const kick = () => {
      if (!raf && visible) raf = requestAnimationFrame(loop)
    }

    const st = reduce
      ? null
      : ScrollTrigger.create({
          trigger: section.current,
          start: "top 75%",
          end: "bottom bottom",
          onUpdate: (self) => {
            target = Math.min(1, self.progress / 0.75) // assembled by 75%, then holds
            kick()
          },
        })

    const move = (e: PointerEvent) => {
      const r = host.getBoundingClientRect()
      ptr.x = e.clientX - r.left
      ptr.y = e.clientY - r.top
      kick()
    }
    const leave = () => {
      ptr.x = ptr.y = -9999
      kick()
    }
    if (!reduce) {
      host.addEventListener("pointermove", move)
      host.addEventListener("pointerleave", leave)
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      kick()
    })
    io.observe(host)

    let w = 0
    const ro = new ResizeObserver(() => {
      if (Math.abs(host.clientWidth - w) < 2 && parts.length) return
      w = host.clientWidth
      build()
    })
    document.fonts.ready.then(() => ro.observe(host))

    return () => {
      cancelAnimationFrame(raf)
      st?.kill()
      io.disconnect()
      ro.disconnect()
      host.removeEventListener("pointermove", move)
      host.removeEventListener("pointerleave", leave)
    }
  }, [])

  return (
    <section ref={section} className="relative h-[170vh] motion-reduce:h-auto md:h-[220vh]">
      <h2 className="sr-only">Ship it. Ideas are easy. Shipping is the work.</h2>
      <div className="sticky top-0 flex h-svh flex-col px-5 pt-16 motion-reduce:relative md:px-12">
        <p aria-hidden className={`${dM} mt-8 max-w-[18ch] self-end text-right md:mt-[10vh]`}>
          Ideas are easy. Shipping is the work.
        </p>
        <div ref={stage} aria-hidden className="relative min-h-0 flex-1 cursor-crosshair">
          <canvas ref={canvas} className="absolute inset-0 size-full" />
        </div>
      </div>
    </section>
  )
}
