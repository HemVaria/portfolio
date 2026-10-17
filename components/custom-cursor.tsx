"use client"

import { useEffect, useRef } from "react"

// Smooth cursor follower (after cursify's "smooth cursor follower"): a dot that tracks
// the pointer closely and a ring that trails it, growing over anything clickable.
// Mouse/trackpad only; white with a difference blend so it reads on light and dark.
const DOT_EASE = 0.2
const RING_EASE = 0.1
const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, summary"

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches
    const d = dot.current!
    const r = ring.current!
    const mouse = { x: -100, y: -100 }
    const dp = { ...mouse }
    const rp = { ...mouse }
    let scale = 1
    let target = 1
    let raf = 0

    const lerp = (a: number, b: number, k: number) => a + (b - a) * (reduce ? 1 : k)
    const frame = () => {
      dp.x = lerp(dp.x, mouse.x, DOT_EASE)
      dp.y = lerp(dp.y, mouse.y, DOT_EASE)
      rp.x = lerp(rp.x, mouse.x, RING_EASE)
      rp.y = lerp(rp.y, mouse.y, RING_EASE)
      scale = lerp(scale, target, 0.18)
      d.style.transform = `translate3d(${dp.x}px, ${dp.y}px, 0) translate(-50%, -50%)`
      r.style.transform = `translate3d(${rp.x}px, ${rp.y}px, 0) translate(-50%, -50%) scale(${scale})`
      // Keep going only while something is still catching up.
      const moving = Math.abs(rp.x - mouse.x) + Math.abs(rp.y - mouse.y) + Math.abs(scale - target) > 0.1
      raf = moving ? requestAnimationFrame(frame) : 0
    }
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame)
    }
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      if (mouse.x < -50) Object.assign(dp, { x: e.clientX, y: e.clientY }), Object.assign(rp, { x: e.clientX, y: e.clientY })
      mouse.x = e.clientX
      mouse.y = e.clientY
      d.style.opacity = r.style.opacity = "1"
      kick()
    }
    const over = (e: PointerEvent) => {
      target = (e.target as Element).closest?.(INTERACTIVE) ? 1.6 : 1
      kick()
    }
    const hide = () => {
      d.style.opacity = r.style.opacity = "0"
    }
    addEventListener("pointermove", move, { passive: true })
    addEventListener("pointerover", over, { passive: true })
    document.documentElement.addEventListener("pointerleave", hide)
    return () => {
      cancelAnimationFrame(raf)
      removeEventListener("pointermove", move)
      removeEventListener("pointerover", over)
      document.documentElement.removeEventListener("pointerleave", hide)
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999] mix-blend-difference">
      <div ref={dot} className="absolute top-0 left-0 size-2 rounded-full bg-white opacity-0 transition-opacity duration-200" />
      <div
        ref={ring}
        className="absolute top-0 left-0 size-10 rounded-full border border-white opacity-0 transition-opacity duration-200"
      />
    </div>
  )
}
