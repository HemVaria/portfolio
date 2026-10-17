"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import Morph from "./morph"
import { bodyL, dXL, FINE, focus, label, MOTION, Scramble, useMedia, usePrefersMotion } from "./kit"

const CELL = 24


export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const motion = usePrefersMotion()
  const trail = useMedia(FINE) && motion

  useEffect(() => {
    const mm = gsap.matchMedia(ref)
    mm.add({ motion: MOTION }, (ctx) => {
      if (!ctx.conditions?.motion) return
      gsap.from("[data-intro]", { y: 16, opacity: 0, duration: 0.6, ease: "power3.out", stagger: 0.08, delay: 0.5 })
    })
    return () => mm.revert()
  }, [])

  useEffect(() => {
    const sec = ref.current
    const cv = canvasRef.current
    if (!trail || !sec || !cv) return
    const g = cv.getContext("2d")!
    const dpr = Math.min(devicePixelRatio, 2)
    let W = 0
    let H = 0
    const size = () => {
      W = sec.clientWidth
      H = sec.clientHeight
      cv.width = W * dpr
      cv.height = H * dpr
      g.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    size()

    const cells = new Map<string, { x: number; y: number; life: number; accent: boolean }>()
    let lit = 0
    let prev: [number, number] | null = null
    let raf = 0
    let last = 0

    const light = (x: number, y: number) => {
      lit++
      cells.set(`${x},${y}`, { x, y, life: 1, accent: lit % 9 === 0 })
    }
    // Bresenham, so fast moves leave a continuous trail.
    const line = (x0: number, y0: number, x1: number, y1: number) => {
      const dx = Math.abs(x1 - x0)
      const dy = -Math.abs(y1 - y0)
      const sx = x0 < x1 ? 1 : -1
      const sy = y0 < y1 ? 1 : -1
      let err = dx + dy
      for (;;) {
        light(x0, y0)
        if (x0 === x1 && y0 === y1) break
        const e2 = 2 * err
        if (e2 >= dy) {
          err += dy
          x0 += sx
        }
        if (e2 <= dx) {
          err += dx
          y0 += sy
        }
      }
    }
    const draw = (now: number) => {
      const dt = now - last
      last = now
      g.clearRect(0, 0, W, H)
      for (const [k, c] of cells) {
        c.life -= dt / 450
        if (c.life <= 0) {
          cells.delete(k)
          continue
        }
        g.globalAlpha = c.life * 0.85
        g.fillStyle = c.accent ? "#2B3BFF" : "#111111"
        g.fillRect(c.x * CELL + 1, c.y * CELL + 1, CELL - 2, CELL - 2)
      }
      raf = cells.size ? requestAnimationFrame(draw) : 0
    }
    const move = (e: PointerEvent) => {
      const r = sec.getBoundingClientRect()
      const cx = Math.floor((e.clientX - r.left) / CELL)
      const cy = Math.floor((e.clientY - r.top) / CELL)
      if (prev) line(prev[0], prev[1], cx, cy)
      else light(cx, cy)
      prev = [cx, cy]
      if (!raf) {
        last = performance.now()
        raf = requestAnimationFrame(draw)
      }
    }
    const leave = () => (prev = null)
    const detach = () => {
      sec.removeEventListener("pointermove", move)
      sec.removeEventListener("pointerleave", leave)
      prev = null
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        sec.addEventListener("pointermove", move)
        sec.addEventListener("pointerleave", leave)
      } else detach()
    })
    io.observe(sec)
    window.addEventListener("resize", size)
    return () => {
      io.disconnect()
      detach()
      window.removeEventListener("resize", size)
      cancelAnimationFrame(raf)
    }
  }, [trail])

  return (
    <section
      ref={ref}
      className="relative flex min-h-svh flex-col justify-between overflow-hidden bg-[linear-gradient(#D9D5CC66_1px,transparent_1px),linear-gradient(90deg,#D9D5CC66_1px,transparent_1px)] bg-[size:24px_24px] px-5 pt-20 pb-8 md:block md:h-svh md:min-h-[600px] md:p-0"
    >
      {trail && <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 size-full" />}
      <Scramble
        as="h1"
        text="Hem Varia"
        trigger="load"
        className={`${dXL} relative z-10 max-md:text-[27vw] md:pointer-events-none md:absolute md:bottom-[5vh] md:left-12 md:whitespace-nowrap`}
      />
      <Morph className="z-[5] h-[46svh] md:absolute md:top-20 md:right-0 md:h-[58%] md:w-[44%]" />
      <div className="relative z-10 flex flex-col gap-5 md:absolute md:top-[18vh] md:left-12 md:w-[34ch]">
        <p data-intro className={bodyL}>
          I build AI tools and automation that take slow, repeated work off people&apos;s hands.
        </p>
        <div data-intro className="flex flex-col gap-2 md:flex-row">
          <a
            href="#work"
            className={`${label} ${focus} flex min-h-11 items-center justify-center bg-[#111] px-5 py-3 text-[#F2F0EB] hover:bg-[#2B3BFF]`}
          >
            See projects ↓
          </a>
          <a
            href="#talk"
            className={`${label} ${focus} flex min-h-11 items-center justify-center border border-[#111] px-5 py-3 hover:bg-[#111] hover:text-[#F2F0EB]`}
          >
            Let&apos;s talk
          </a>
        </div>
      </div>
    </section>
  )
}
