"use client"

import { useCallback, useEffect, useRef, useState, type RefObject } from "react"
import gsap from "gsap"
import { CalBookingButton } from "@/components/cal-booking"
import { dL, dM, FINE, focus, label, Scramble, useMedia, usePrefersMotion } from "./kit"

type Project = { title: string; impact: string; tag: string; image: string; href?: string; private?: boolean }

// My projects (RevTrack is the one team build). One line each: the difference it makes, not how it works.
const projects: Project[] = [
  {
    title: "Performance Marketing Automation",
    impact: "Daily ad reports, sharper suggestions and new campaigns built for a person to approve.",
    tag: "Private / demo on request",
    private: true,
    image: "/images/projects/thumbs/performance-marketing.webp",
  },
  {
    title: "Content Factory",
    impact: "From one brief to on-brand static ads and animated videos, end to end.",
    tag: "Private / demo on request",
    private: true,
    image: "/images/projects/thumbs/content-factory.webp",
  },
  {
    title: "Invoice Automation",
    impact: "Invoices that create and send themselves, so nobody chases paperwork.",
    tag: "Private / demo on request",
    private: true,
    image: "/images/projects/thumbs/invoice-automation.webp",
  },
  {
    title: "AICEK",
    impact: "Scores AI coding setups from 0 to 100, with fixes that save tokens.",
    tag: "npm CLI",
    image: "/images/projects/thumbs/aicek.webp",
    href: "https://github.com/HemVaria/aicek",
  },
  {
    title: "RevTrack",
    impact: "GST invoicing, expenses and revenue in one place for Indian small businesses.",
    tag: "Live / team build",
    image: "/images/projects/thumbs/revtrack.webp",
    href: "https://revtrack.in",
  },
  {
    title: "Text Switch",
    impact: "One shortcut becomes a full template, and AI rewrites the draft for you.",
    tag: "In progress",
    image: "/images/projects/thumbs/text-switch.webp",
  },
  {
    title: "AI Video Editor",
    impact: "Edits and captions video with code instead of a timeline.",
    tag: "Open source",
    image: "/images/projects/thumbs/ai-video-editor.webp",
    href: "https://github.com/HemVaria/AI-Multimodal-Video-Captioning-Tool",
  },
  {
    title: "IMS",
    impact: "Runs a creative agency's clients, jobs, approvals and invoices from one system.",
    tag: "Web app",
    image: "/images/projects/thumbs/ims.webp",
    href: "https://github.com/HemVaria/Ims",
  },
]

// Desktop: the thumbnail follows the cursor over the list.
function Preview({ listRef, active }: { listRef: RefObject<HTMLUListElement | null>; active: number | null }) {
  const ref = useRef<HTMLDivElement>(null)
  const motion = usePrefersMotion()

  useEffect(() => {
    const el = ref.current
    const list = listRef.current
    if (!el || !list) return
    const d = motion ? 0.45 : 0
    const x = gsap.quickTo(el, "x", { duration: d, ease: "power3" })
    const y = gsap.quickTo(el, "y", { duration: d, ease: "power3" })
    gsap.set(el, { autoAlpha: 0, scale: 0.92 })
    const move = (e: PointerEvent) => {
      const w = el.offsetWidth
      const h = el.offsetHeight
      x(e.clientX + 24 + w > innerWidth ? e.clientX - 24 - w : e.clientX + 24)
      y(e.clientY + 24 + h > innerHeight ? e.clientY - 24 - h : e.clientY + 24)
    }
    const show = (s: boolean) => () =>
      gsap.to(el, { autoAlpha: s ? 1 : 0, scale: s ? 1 : 0.92, duration: motion ? 0.25 : 0, ease: "power3.out", overwrite: "auto" })
    const enter = show(true)
    const leave = show(false)
    list.addEventListener("pointermove", move)
    list.addEventListener("pointerenter", enter)
    list.addEventListener("pointerleave", leave)
    return () => {
      list.removeEventListener("pointermove", move)
      list.removeEventListener("pointerenter", enter)
      list.removeEventListener("pointerleave", leave)
    }
  }, [listRef, motion])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none invisible fixed top-0 left-0 z-30 w-[380px] border border-[#111] bg-[#FBFAF7]"
    >
      {projects.map((p, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={p.title}
          src={p.image}
          alt=""
          className={`aspect-video w-full object-cover ${i === active ? "block" : "hidden"}`}
        />
      ))}
    </div>
  )
}

const PHONE = "918200487838"
const EMAIL = "hemvaria007@gmail.com"

// Private builds can't be shown publicly, so the row opens a short pitch with three ways to reach me.
function Funnel({ project, onClose }: { project: Project; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null)
  const motion = usePrefersMotion()

  useEffect(() => {
    const el = panel.current!
    const prev = document.activeElement as HTMLElement | null
    document.documentElement.style.overflow = "hidden"
    window.lenis?.stop()
    el.querySelector<HTMLElement>("button, a")?.focus()
    if (motion) {
      gsap.fromTo(el.parentElement, { opacity: 0 }, { opacity: 1, duration: 0.25 })
      gsap.fromTo(el, { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" })
    }
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    addEventListener("keydown", esc)
    return () => {
      document.documentElement.style.overflow = ""
      window.lenis?.start()
      removeEventListener("keydown", esc)
      prev?.focus()
    }
  }, [motion, onClose])

  const msg = `Hi Hem, I saw ${project.title} on your site. Could you build something like it for my team?`
  const cta = `${label} ${focus} flex min-h-11 items-center justify-between gap-4 border border-[#111] px-5 py-3`
  return (
    <div data-lenis-prevent className="fixed inset-0 z-50 flex items-end justify-center bg-[#111]/40 md:items-center" onClick={onClose}>
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="funnel-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[560px] border border-[#111] bg-[#F2F0EB] md:mx-5"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={project.image} alt="" className="aspect-video w-full border-b border-[#111] object-cover" />
        <div className="p-5 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <p className={`${label} text-[#5E5B55]`}>Private build</p>
            <button type="button" onClick={onClose} className={`${label} ${focus} -mt-3 -mr-2 min-h-11 px-2`}>
              Close
            </button>
          </div>
          <h3 id="funnel-title" className={`${dM} mt-2`}>
            Want this for your team?
          </h3>
          <p className="mt-4 text-[15px] leading-normal text-[#5E5B55]">
            {project.title} runs for real teams, so it isn&apos;t public. I can walk you through it and build one around
            your workflow.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <span onClickCapture={onClose}>
              <CalBookingButton
                calLink="hehehem-s8zjfl/15min"
                className={`${cta} w-full cursor-pointer border-[#2B3BFF] bg-[#2B3BFF] text-white hover:border-[#111] hover:bg-[#111]`}
              >
                Book a 15-min demo <span aria-hidden>→</span>
              </CalBookingButton>
            </span>
            <a
              href={`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${cta} hover:bg-[#111] hover:text-[#F2F0EB]`}
            >
              Message on WhatsApp <span aria-hidden>↗</span>
            </a>
            <a
              href={`mailto:${EMAIL}?subject=${encodeURIComponent(`${project.title} for my team`)}&body=${encodeURIComponent(msg)}`}
              className={`${cta} hover:bg-[#111] hover:text-[#F2F0EB]`}
            >
              Email me <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function WorkIndex() {
  const listRef = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState<number | null>(null)
  const [pitch, setPitch] = useState<Project | null>(null)
  const fine = useMedia(FINE)
  const closePitch = useCallback(() => setPitch(null), [])

  return (
    <section id="work" className="scroll-mt-20 px-5 py-20 md:px-12 md:py-48">
      <Scramble as="h2" text="Things I built." className={dL} />
      <ul ref={listRef} className="mt-10 md:mt-16">
        {projects.map((p, i) => {
          const Tag = p.href ? "a" : p.private ? "button" : "div"
          const ext = p.href?.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {}
          const props = p.href ? { href: p.href, ...ext } : p.private ? { type: "button" as const, onClick: () => setPitch(p) } : {}
          return (
            <li key={p.title} onPointerEnter={() => setActive(i)} className="border-t border-[#111] last:border-b">
              <Tag
                {...props}
                className={`${focus} group flex w-full flex-col gap-3 py-6 text-left transition-colors active:bg-[#E2DED6] md:grid md:grid-cols-12 md:items-baseline md:gap-6 md:py-8`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {p.image && (
                  <img src={p.image} alt="" loading="lazy" className="aspect-video w-full border border-[#111] object-cover md:hidden" />
                )}
                <span
                  className={`${dM} block transition-transform duration-300 group-hover:translate-x-4 group-hover:text-[#2B3BFF] md:col-span-5`}
                >
                  {p.title}
                  {(p.href || p.private) && (
                    <span className="ml-3 inline-block text-[0.6em] opacity-0 transition-opacity group-hover:opacity-100">
                      {p.private ? "→" : "↗"}
                    </span>
                  )}
                </span>
                <span className="text-[15px] leading-normal text-[#5E5B55] md:col-span-5">{p.impact}</span>
                <span className={`${label} md:col-span-2 md:text-right`}>{p.tag}</span>
              </Tag>
            </li>
          )
        })}
      </ul>
      {fine && <Preview listRef={listRef} active={active} />}
      {pitch && <Funnel project={pitch} onClose={closePitch} />}
    </section>
  )
}
