"use client"

import { useEffect, useRef } from "react"
import { dL, label } from "./kit"

const SRC = "/images/design-mode/497194244_18163154437353224_7281199870403729748_n.jpg"
const CELL = 3 // CSS px per dither dot, same as the hero shape

// 8x8 Bayer matrix, the same ordered dither the shape uses.
const BAYER = (() => {
  const b2 = (x: number, y: number) => ((x & 1) * 2 + (y & 1) * 3) % 4
  const m: number[] = []
  for (let y = 0; y < 8; y++)
    for (let x = 0; x < 8; x++) m.push((b2(x >> 2, y >> 2) + b2(x >> 1, y >> 1) * 4 + b2(x, y) * 16 + 0.5) / 64)
  return m
})()

// The portrait as a 1-bit dither. It "develops" when it scrolls in; a lens follows the
// pointer and shows the real photo underneath.
export default function Portrait() {
  const box = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = box.current!
    const cv = canvas.current!
    const g = cv.getContext("2d")!
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches
    const img = new Image()
    img.src = SRC

    let W = 0
    let H = 0
    let lum = new Float32Array(0) // luminance per dither cell
    let cols = 0
    let rows = 0
    const dots = document.createElement("canvas")
    const lens = { x: 0, y: 0, tx: 0, ty: 0, r: 0, tr: 0 }
    let develop = reduce ? 1 : 0 // 0 blank paper, 1 fully developed
    let raf = 0

    // Cover-crop source rect for the box aspect.
    const crop = () => {
      const s = Math.min(img.width / W, img.height / H)
      return { sw: W * s, sh: H * s, sx: (img.width - W * s) / 2, sy: (img.height - H * s) / 2 }
    }

    function build() {
      W = el.clientWidth
      H = el.clientHeight
      if (!W || !H || !img.complete) return
      const dpr = Math.min(devicePixelRatio, 2)
      cv.width = W * dpr
      cv.height = H * dpr
      g.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(W / CELL)
      rows = Math.ceil(H / CELL)
      const tmp = document.createElement("canvas")
      tmp.width = cols
      tmp.height = rows
      const t = tmp.getContext("2d", { willReadFrequently: true })!
      const { sx, sy, sw, sh } = crop()
      t.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows)
      const px = t.getImageData(0, 0, cols, rows).data
      lum = new Float32Array(cols * rows)
      for (let i = 0; i < lum.length; i++) {
        const l = (0.299 * px[i * 4] + 0.587 * px[i * 4 + 1] + 0.114 * px[i * 4 + 2]) / 255
        lum[i] = Math.min(1, Math.max(0, (l - 0.5) * 1.3 + 0.66)) // a little contrast for the dither
      }
      dots.width = cols
      dots.height = rows
      paintDots()
      draw()
    }

    // Threshold the luminance; `develop` lifts the bias so the print fades in from paper.
    function paintDots() {
      const d = dots.getContext("2d")!
      const out = d.createImageData(cols, rows)
      const bias = (1 - develop) * 1.1
      for (let y = 0; y < rows; y++)
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x
          if (lum[i] + bias <= BAYER[(y & 7) * 8 + (x & 7)]) {
            out.data[i * 4] = out.data[i * 4 + 1] = out.data[i * 4 + 2] = 17
            out.data[i * 4 + 3] = 255
          }
        }
      d.putImageData(out, 0, 0)
    }

    function draw() {
      g.clearRect(0, 0, W, H)
      g.imageSmoothingEnabled = false
      g.drawImage(dots, 0, 0, cols * CELL, rows * CELL)
      if (lens.r > 0.5) {
        const { sx, sy, sw, sh } = crop()
        g.save()
        g.beginPath()
        g.arc(lens.x, lens.y, lens.r, 0, Math.PI * 2)
        g.clip()
        g.imageSmoothingEnabled = true
        g.drawImage(img, sx, sy, sw, sh, 0, 0, W, H)
        g.restore()
        g.beginPath()
        g.arc(lens.x, lens.y, lens.r, 0, Math.PI * 2)
        g.strokeStyle = "#111111"
        g.lineWidth = 1
        g.stroke()
      }
    }

    function frame() {
      raf = 0
      const k = reduce ? 1 : 0.22
      lens.x += (lens.tx - lens.x) * k
      lens.y += (lens.ty - lens.y) * k
      lens.r += (lens.tr - lens.r) * k
      let busy = Math.abs(lens.tx - lens.x) + Math.abs(lens.ty - lens.y) + Math.abs(lens.tr - lens.r) > 0.3
      if (develop < 1) {
        develop = Math.min(1, develop + 0.018)
        paintDots()
        busy = true
      }
      draw()
      if (busy) raf = requestAnimationFrame(frame)
    }
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame)
    }

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      lens.tx = e.clientX - r.left
      lens.ty = e.clientY - r.top
      if (lens.r < 0.5) {
        lens.x = lens.tx
        lens.y = lens.ty
      }
      lens.tr = Math.min(W, H) * (W < 500 ? 0.3 : 0.22)
      kick()
    }
    const leave = () => {
      lens.tr = 0
      kick()
    }
    el.addEventListener("pointermove", move)
    el.addEventListener("pointerdown", move)
    el.addEventListener("pointerleave", leave)

    // Develop once, the first time it scrolls into view.
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && develop < 1) kick()
      },
      { threshold: 0.35 },
    )
    const ro = new ResizeObserver(build)
    img.onload = () => {
      build()
      ro.observe(el)
      io.observe(el)
    }

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      el.removeEventListener("pointermove", move)
      el.removeEventListener("pointerdown", move)
      el.removeEventListener("pointerleave", leave)
    }
  }, [])

  return (
    <section className="px-5 py-20 md:grid md:grid-cols-12 md:items-end md:gap-6 md:px-12 md:py-48">
      <div className="md:col-span-5">
        <h2 className={dL}>Hi, I&apos;m Hem.</h2>
        <p className={`${label} mt-4 text-[#5E5B55]`}>
          <span className="[@media(hover:none)]:hidden">Move over the photo.</span>
          <span className="hidden [@media(hover:none)]:inline">Touch the photo.</span>
        </p>
      </div>
      <div
        ref={box}
        className="relative mt-10 aspect-square w-full cursor-none touch-pan-y select-none md:col-span-6 md:col-start-7 md:mt-0 md:max-h-[80vh]"
      >
        <canvas ref={canvas} role="img" aria-label="Portrait of Hem Varia" className="absolute inset-0 size-full" />
      </div>
    </section>
  )
}
