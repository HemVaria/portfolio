"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import type Matter from "matter-js"
import { dL, FINE, focus, label, Scramble, usePrefersMotion } from "./kit"

// The full stack (old skills section plus what the automation work uses).
const TOOLS = [
  "Claude Code", "MCP", "Agentic AI", "Generative AI", "Hermes Agent", "n8n", "Cloudflare Workers", "D1", "KV",
  "GitHub Actions", "Next.js", "React", "Node.js", "JavaScript", "Python", "HTML", "CSS", "Astro", "Strapi",
  "PostgreSQL", "Prisma", "Supabase", "Firebase", "Whisper", "YOLOv8", "BLIP", "OpenCV", "TensorFlow",
  "Hugging Face", "OpenRouter", "GLM", "Gradio", "Remotion", "Twilio", "Vapi", "Shopify", "Shiprocket",
  "Meta Marketing API", "Microsoft Graph", "DataForSEO", "Resend", "SEO Tools", "Google Cloud", "Google Colab",
  "Google Antigravity", "Power BI", "Git", "GitHub", "VS Code", "Figma", "Canva", "Photoshop", "Premiere Pro",
  "CapCut", "Filmora",
]

// Simple Icons slugs for chips that have a brand mark.
const ICONS: Record<string, string> = {
  "Claude Code": "claude", n8n: "n8n", "Cloudflare Workers": "cloudflareworkers", D1: "cloudflare", KV: "cloudflare",
  "GitHub Actions": "githubactions", "Next.js": "nextdotjs", React: "react", "Node.js": "nodedotjs",
  JavaScript: "javascript", Python: "python", HTML: "html5", CSS: "css", Astro: "astro", Strapi: "strapi",
  PostgreSQL: "postgresql", Prisma: "prisma", Supabase: "supabase", Firebase: "firebase", OpenCV: "opencv",
  TensorFlow: "tensorflow", "Hugging Face": "huggingface", OpenRouter: "openrouter", Gradio: "gradio",
  Shopify: "shopify", "Meta Marketing API": "meta", Resend: "resend", "Google Cloud": "googlecloud",
  "Google Colab": "googlecolab", Git: "git", GitHub: "github", Figma: "figma",
}

const tone = (t: string) =>
  t === "Claude Code" || t === "n8n"
    ? "bg-[#2B3BFF] text-white border-[#2B3BFF]"
    : t === "Cloudflare Workers" || t === "Next.js" || t === "MCP" || t === "Python"
      ? "bg-[#111] text-[#F2F0EB]"
      : "bg-[#FBFAF7]"

// Icon colour follows the chip: white on the dark and blue chips, ink elsewhere.
const iconInk = (t: string) => (tone(t).includes("text-white") ? "FFFFFF" : tone(t).includes("bg-[#111]") ? "F2F0EB" : "111111")

const rand = (a: number, b: number) => a + Math.random() * (b - a)

export default function StackPile() {
  const listRef = useRef<HTMLUListElement>(null)
  const lib = useRef<typeof Matter | null>(null)
  const reset = useRef<() => void>(() => {})
  const [live, setLive] = useState(false)
  const motion = usePrefersMotion()

  // Load matter-js only when the pile nears view.
  useEffect(() => {
    const el = listRef.current
    if (!motion || !el) return
    const io = new IntersectionObserver(
      async ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        lib.current = (await import("matter-js")).default
        setLive(true)
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [motion])

  // Layout effect so words are placed before the first paint in physics mode.
  useLayoutEffect(() => {
    const M = lib.current
    const box = listRef.current
    if (!live || !M || !box) return
    const items = [...box.children] as HTMLElement[]
    const fine = matchMedia(FINE).matches
    const mouse = fine ? M.Mouse.create(box) : null
    if (mouse) {
      const wheel = (mouse as unknown as { mousewheel: EventListener }).mousewheel
      ;["wheel", "mousewheel", "DOMMouseScroll"].forEach((t) => box.removeEventListener(t, wheel))
    }

    let engine: Matter.Engine
    let bodies: Matter.Body[] = []
    let starts: { x: number; y: number; angle: number }[] = []
    let raf = 0
    let width = 0

    const init = () => {
      const W = box.clientWidth
      const H = box.clientHeight
      width = W
      engine = M.Engine.create({ gravity: { x: 0, y: 1, scale: 0.001 } })
      const wall = { isStatic: true }
      M.Composite.add(engine.world, [
        M.Bodies.rectangle(W / 2, H + 25, W * 2, 50, wall),
        M.Bodies.rectangle(-25, 0, 50, H * 4, wall),
        M.Bodies.rectangle(W + 25, 0, 50, H * 4, wall),
      ])
      starts = []
      bodies = items.map((el, i) => {
        const w = el.offsetWidth
        const h = el.offsetHeight
        const s = { x: rand(w / 2 + 20, W - w / 2 - 20), y: -h - i * 28, angle: rand(-0.3, 0.3) }
        starts.push(s)
        return M.Bodies.rectangle(s.x, s.y, w, h, { restitution: 0.25, friction: 0.6, frictionAir: 0.015, angle: s.angle })
      })
      M.Composite.add(engine.world, bodies)
      if (mouse) {
        M.Composite.add(engine.world, M.MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.2 } }))
      }
      render()
    }
    const render = () =>
      bodies.forEach((b, i) => {
        const el = items[i]
        el.style.transform = `translate(${b.position.x - el.offsetWidth / 2}px,${b.position.y - el.offsetHeight / 2}px) rotate(${b.angle}rad)`
      })
    const loop = () => {
      M.Engine.update(engine, 1000 / 60)
      render()
      raf = requestAnimationFrame(loop)
    }
    const teardown = () => {
      cancelAnimationFrame(raf)
      raf = 0
      M.Composite.clear(engine.world, false)
      M.Engine.clear(engine)
    }

    reset.current = () =>
      bodies.forEach((b, i) => {
        M.Body.setPosition(b, starts[i])
        M.Body.setAngle(b, starts[i].angle)
        M.Body.setVelocity(b, { x: 0, y: 0 })
        M.Body.setAngularVelocity(b, 0)
      })

    const bump = (e: PointerEvent) => {
      const b = bodies[items.indexOf(e.currentTarget as HTMLElement)]
      M.Body.setVelocity(b, { x: rand(-6, 6), y: -14 })
      M.Body.setAngularVelocity(b, rand(-0.2, 0.2))
    }
    if (!fine) items.forEach((el) => el.addEventListener("pointerdown", bump))

    init()
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !raf) raf = requestAnimationFrame(loop)
      else if (!e.isIntersecting) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    })
    io.observe(box)

    let timer = 0
    const resize = () => {
      clearTimeout(timer)
      timer = window.setTimeout(() => {
        if (Math.abs(box.clientWidth - width) <= 50) return
        const running = raf !== 0
        teardown()
        init()
        if (running) raf = requestAnimationFrame(loop)
      }, 200)
    }
    window.addEventListener("resize", resize)

    return () => {
      io.disconnect()
      clearTimeout(timer)
      window.removeEventListener("resize", resize)
      items.forEach((el) => el.removeEventListener("pointerdown", bump))
      if (mouse) {
        const m = mouse as unknown as Record<string, EventListener>
        box.removeEventListener("mousemove", m.mousemove)
        box.removeEventListener("mousedown", m.mousedown)
        box.removeEventListener("mouseup", m.mouseup)
        box.removeEventListener("touchmove", m.mousemove)
        box.removeEventListener("touchstart", m.mousedown)
        box.removeEventListener("touchend", m.mouseup)
      }
      teardown()
      reset.current = () => {}
    }
  }, [live])

  return (
    <section id="tools" className="scroll-mt-20 px-5 pt-20 md:px-12 md:pt-48">
      <Scramble as="h2" text="The tools I reach for." className={`${dL} text-center`} />
      <div className="mt-6 flex items-center justify-center gap-4">
        {live && (
          <>
            <p className={`${label} text-[#5E5B55]`}>
              <span className="hidden [@media(hover:hover)]:inline">Drag them around.</span>
              <span className="[@media(hover:hover)]:hidden">Tap one.</span>
            </p>
            <button
              type="button"
              onClick={() => reset.current()}
              className={`${label} ${focus} min-h-11 border border-[#111] px-4 hover:bg-[#111] hover:text-[#F2F0EB]`}
            >
              Drop again
            </button>
          </>
        )}
      </div>
      <ul
        ref={listRef}
        aria-label="Tools"
        className={
          live
            ? "relative mt-12 -mx-5 h-[110svh] min-h-[720px] overflow-hidden border-y border-[#111] md:-mx-12 md:h-svh md:min-h-[640px]"
            : "mt-12 flex flex-wrap justify-center gap-3 py-24"
        }
      >
        {TOOLS.map((t) => (
          <li
            key={t}
            className={`border border-[#111] px-3 py-1.5 text-[clamp(0.875rem,1.7vw,1.3rem)] md:px-4 md:py-2 font-semibold whitespace-nowrap select-none ${tone(t)} ${live ? "absolute top-0 left-0 cursor-grab touch-manipulation will-change-transform" : ""}`}
          >
            {ICONS[t] && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`https://cdn.simpleicons.org/${ICONS[t]}/${iconInk(t)}`}
                alt=""
                width={16}
                height={16}
                draggable={false}
                className="mr-2 inline-block size-[0.9em] align-[-0.1em]"
              />
            )}
            {t}
          </li>
        ))}
      </ul>
    </section>
  )
}
