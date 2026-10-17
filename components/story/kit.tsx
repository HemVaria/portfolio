"use client"

import { useEffect, useRef, useSyncExternalStore, type ElementType, type RefObject } from "react"
import gsap from "gsap"

import { dXL, dL, dM, bodyL, body, mono, label, focus } from "./tokens"
export { dXL, dL, dM, bodyL, body, mono, label, focus }

export const MOTION = "(prefers-reduced-motion: no-preference)"
export const FINE = "(hover: hover) and (pointer: fine)"

export function useMedia(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const m = matchMedia(query)
      m.addEventListener("change", cb)
      return () => m.removeEventListener("change", cb)
    },
    () => matchMedia(query).matches,
    () => false,
  )
}

export const usePrefersMotion = () => useMedia(MOTION)

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/<>_"

export function Scramble({
  text,
  as: Tag = "span",
  className,
  trigger = "view",
}: {
  text: string
  as?: ElementType
  className?: string
  trigger?: "load" | "view"
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const motion = usePrefersMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || !motion) return
    let raf = 0

    const run = () => {
      const chars = [...text]
      const step = Math.min(45, 900 / chars.length)
      const at = chars.map((_, i) => 250 + i * step + Math.random() * 180)
      const end = Math.max(...at)
      const start = performance.now()
      let last = -Infinity
      const tick = (now: number) => {
        const t = now - start
        if (t >= end) {
          el.textContent = text
          return
        }
        if (now - last >= 50) {
          last = now
          el.textContent = chars
            .map((c, i) => {
              if (t >= at[i] || !/[a-z0-9]/i.test(c)) return c
              const r = CHARSET[Math.floor(Math.random() * CHARSET.length)]
              return c === c.toLowerCase() ? r.toLowerCase() : r
            })
            .join("")
        }
        raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    const stop = () => {
      cancelAnimationFrame(raf)
      el.textContent = text
    }
    if (trigger === "load") {
      run()
      return stop
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        run()
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      stop()
    }
  }, [text, trigger, motion])

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="relative inline-block">
        <span className="invisible">{text}</span>
        <span ref={ref} className="absolute inset-0">
          {text}
        </span>
      </span>
    </Tag>
  )
}

function useScatter(ref: RefObject<HTMLElement | null>) {
  const motion = usePrefersMotion()
  const fine = useMedia(FINE)

  useEffect(() => {
    const host = ref.current?.closest<HTMLElement>("a,button")
    if (!host || !motion || !fine) return
    const chars = ref.current!.querySelectorAll("[data-char]")
    const r = gsap.utils.random
    const enter = () =>
      gsap.to(chars, {
        x: () => r(-14, 14),
        y: () => r(-12, 12),
        rotation: () => r(-25, 25),
        duration: 0.35,
        ease: "power3.out",
        overwrite: true,
      })
    const leave = () =>
      gsap.to(chars, { x: 0, y: 0, rotation: 0, duration: 0.7, ease: "elastic.out(1,0.5)", overwrite: true })
    host.addEventListener("pointerenter", enter)
    host.addEventListener("pointerleave", leave)
    return () => {
      host.removeEventListener("pointerenter", enter)
      host.removeEventListener("pointerleave", leave)
      gsap.set(chars, { clearProps: "transform" })
    }
  }, [ref, motion, fine])
}

export function ScatterText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useScatter(ref)
  return (
    <>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden>
        {/* Letters scatter individually, but each word stays unbreakable so it wraps whole. */}
        {text.split(" ").map((word, w) => (
          <span key={w} className="whitespace-nowrap">
            {w > 0 && " "}
            {[...word].map((c, i) => (
              <span key={i} data-char className="inline-block">
                {c}
              </span>
            ))}
          </span>
        ))}
      </span>
    </>
  )
}
