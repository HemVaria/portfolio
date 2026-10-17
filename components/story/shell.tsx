"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CalBookingButton } from "@/components/cal-booking"
import { CAL_LINK } from "@/lib/site"
import { bodyL, dM, dXL, focus, label, ScatterText, Scramble, usePrefersMotion } from "./kit"
import OrbitBand from "./orbit-band"

gsap.registerPlugin(ScrollTrigger)

const ext = { target: "_blank", rel: "noopener noreferrer" }
const contacts = [
  { text: "Email", href: "mailto:hemvaria007@gmail.com", detail: "hemvaria007@gmail.com" },
  { text: "WhatsApp", href: "https://wa.me/918200487838", detail: "+91 82004 87838", ...ext },
  { text: "LinkedIn", href: "https://linkedin.com/in/hem-varia", detail: "in/hem-varia", ...ext },
  { text: "Instagram", href: "https://instagram.com/hehehem.exe", detail: "@hehehem.exe", ...ext },
  { text: "GitHub", href: "https://github.com/HemVaria", detail: "HemVaria", ...ext },
  { text: "Resume", href: "/resume.pdf", detail: "PDF", ...ext },
  { text: "Buy me a coffee", href: "https://www.buymeacoffee.com/hehehem", detail: "Say thanks", ...ext },
]
const calls = [
  { text: "15-minute call", link: "hehehem-s8zjfl/15min", detail: "Quick question" },
  { text: "30-minute call", link: CAL_LINK, detail: "Talk it through" },
]
// "/#id" links scroll in place on the home page and navigate there from other pages.
const sections = [
  { text: "What I do", href: "/#services", detail: "Four things" },
  { text: "Projects", href: "/#work", detail: "Things I built" },
  { text: "Case studies", href: "/work", detail: "How they work" },
  { text: "Blog", href: "/blog", detail: "Build notes" },
  { text: "Let's talk", href: "#talk", detail: "Say hi" },
]
const row = "flex items-center justify-between gap-4 border-b border-[#111] py-4"
const rowLink = (size: string) => `${size} ${focus} inline-flex min-h-11 items-center text-left hover:text-[#2B3BFF] active:opacity-60`
// Menu type scales with the shorter of width and height, so the panel never overflows.
const menuBig = "text-[clamp(1.9rem,min(5.2vw,7vh),4.75rem)] font-bold leading-[0.95] tracking-[-0.045em]"
const menuSmall = "text-[clamp(1.25rem,min(2.4vw,3.6vh),2.25rem)] font-semibold leading-none tracking-[-0.03em]"
const menuRow = "flex items-center justify-between gap-4 border-b border-[#111] py-[min(1rem,1.6vh)]"
const barLink = `${focus} inline-flex h-11 items-center px-2 hover:text-[#2B3BFF]`

// Navigation that opens into the same link rows as the footer.
export function Menu() {
  const [open, setOpen] = useState(false)
  const panel = useRef<HTMLDivElement>(null)
  const progress = useRef<HTMLSpanElement>(null)
  const motion = usePrefersMotion()

  // Thin accent line under the bar: how far down the page you are.
  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => gsap.set(progress.current, { scaleX: self.progress }),
    })
    return () => st.kill()
  }, [])

  useEffect(() => {
    if (!open) return
    const el = panel.current!
    document.documentElement.style.overflow = "hidden"
    window.lenis?.stop()
    el.querySelector<HTMLElement>("a,button")?.focus()
    if (motion) {
      gsap
        .timeline()
        .fromTo(el, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.6, ease: "power4.inOut" })
        .from("[data-row]", { y: 18, opacity: 0, duration: 0.5, ease: "power3.out", stagger: 0.04, clearProps: "transform,opacity" }, 0.2)
    }
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    addEventListener("keydown", esc)
    return () => {
      document.documentElement.style.overflow = ""
      window.lenis?.start()
      removeEventListener("keydown", esc)
    }
  }, [open, motion])

  const close = () => setOpen(false)
  // A section on this page: close first (which unlocks page scroll), then glide to it.
  // Anything else (another page, or a home section from another page) navigates normally.
  const go = (e: React.MouseEvent, href: string) => {
    const hash = href.slice(href.indexOf("#"))
    const el = href.includes("#") && (href.startsWith("#") || location.pathname === "/") ? document.querySelector<HTMLElement>(hash) : null
    if (!el) return close()
    e.preventDefault()
    close()
    requestAnimationFrame(() => {
      if (window.lenis) window.lenis.scrollTo(el, { offset: -80 })
      else el.scrollIntoView({ behavior: motion ? "smooth" : "auto" })
    })
  }
  return (
    <>
      {/* Floating liquid-glass bar: no borders, just blur, a light rim and a sheen. */}
      <header className="pointer-events-none fixed inset-x-0 top-3 z-40 flex justify-center px-3 md:top-4">
        <div className="pointer-events-auto relative flex h-14 w-full max-w-[880px] items-center justify-between gap-3 overflow-hidden rounded-full bg-white/35 pr-2 pl-2 shadow-[0_10px_40px_-10px_rgba(17,17,17,0.18),inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-1px_0_rgba(255,255,255,0.3)] ring-1 ring-white/60 backdrop-blur-xl backdrop-saturate-150">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0)_38%,rgba(255,255,255,0)_62%,rgba(255,255,255,0.3)_100%)]"
          />
          <Link
            href="/"
            aria-label="Hem Varia, home"
            className={`${focus} relative block size-10 rounded-full transition-transform duration-300 hover:scale-105`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/avatar.webp"
              alt=""
              width={40}
              height={40}
              className="size-10 rounded-full object-cover ring-2 ring-white/80 transition-shadow hover:ring-[#2B3BFF]"
            />
          </Link>

          <p className={`${label} relative hidden items-center gap-3 md:flex`}>
            <span aria-hidden className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#2B3BFF] opacity-60 motion-reduce:animate-none" />
              <span className="relative size-2 rounded-full bg-[#2B3BFF]" />
            </span>
            Available for projects
            <span aria-hidden className="text-[#111]/30">/</span>
            <span className="text-[#5E5B55]">
              <Clock />
            </span>
          </p>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen(true)}
            className={`${label} ${focus} group relative flex h-10 items-center gap-3 rounded-full bg-[#111] pr-4 pl-5 text-[#F2F0EB] transition-colors hover:bg-[#2B3BFF] active:scale-95`}
          >
            Menu
            <span aria-hidden className="flex w-4 flex-col gap-[5px]">
              <span className="h-px w-full bg-current transition-transform duration-300 group-hover:translate-x-[3px]" />
              <span className="h-px w-full bg-current transition-transform duration-300 group-hover:-translate-x-[3px]" />
            </span>
          </button>
          <span ref={progress} aria-hidden className="absolute inset-x-8 bottom-0 h-0.5 origin-left scale-x-0 rounded-full bg-[#2B3BFF]" />
        </div>
      </header>
      {open && (
        <div
          id="menu"
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          data-lenis-prevent
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-[#F2F0EB] px-5 pb-8 md:px-12"
        >
          <div className="flex h-14 shrink-0 items-center justify-between pt-3 md:pt-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/avatar.webp" alt="" width={40} height={40} className="size-10 rounded-full object-cover ring-2 ring-white/80" />
            <button
              type="button"
              onClick={close}
              className={`${label} ${focus} flex h-10 items-center gap-3 rounded-full bg-[#111] px-5 text-[#F2F0EB] transition-colors hover:bg-[#2B3BFF] active:scale-95`}
            >
              Close <span aria-hidden className="text-sm leading-none">×</span>
            </button>
          </div>
          {/* Sized by viewport height too, so every row fits on short screens. */}
          <nav aria-label="Main" className="mt-6 grid flex-1 gap-10 md:mt-[4vh] md:grid-cols-2 md:gap-16">
            <ul>
              {sections.map((s) => (
                <li key={s.text} data-row className={`${row} first:border-t`}>
                  <a href={s.href} onClick={(e) => go(e, s.href)} className={rowLink(menuBig)}>
                    <ScatterText text={s.text} />
                  </a>
                  <span className={`${label} text-[#5E5B55]`}>{s.detail}</span>
                </li>
              ))}
            </ul>
            <ul>
              <li data-row className={`${menuRow} first:border-t`}>
                <CalBookingButton calLink={CAL_LINK} className={rowLink(menuSmall)}>
                  <ScatterText text="Book a call" />
                </CalBookingButton>
                <span className={`${label} text-[#5E5B55]`}>30 minutes</span>
              </li>
              {contacts.map(({ text, detail, ...a }) => (
                <li key={text} data-row className={`${menuRow} first:border-t`}>
                  <a {...a} className={rowLink(menuSmall)}>
                    <ScatterText text={text} />
                  </a>
                  <span className={`${label} text-right text-[#5E5B55]`}>{detail}</span>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  )
}

// Local time in India, ticking (from the old footer).
export function Clock() {
  const [t, setT] = useState("")
  useEffect(() => {
    const f = () =>
      setT(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata" }) + " IST")
    f()
    const id = setInterval(f, 15000)
    return () => clearInterval(id)
  }, [])
  return <time suppressHydrationWarning>{t}</time>
}

export function Footer() {
  return (
    <footer
      id="talk"
      className="flex min-h-svh scroll-mt-20 flex-col justify-between border-t-2 border-[#111] px-5 pt-16 pb-8 md:px-12"
    >
      <div>
        <OrbitBand />
        <Scramble as="h2" text="Let's talk." className={dXL.replace(" uppercase", "")} />
        <p className={`${bodyL} mt-6 max-w-[38ch] text-[#5E5B55]`}>
          Got a task your team repeats every week? Tell me about it.
        </p>
        <ul className="mt-10 md:mt-16 md:w-2/3">
          {calls.map((c) => (
            <li key={c.text} className={`${row} first:border-t`}>
              <CalBookingButton calLink={c.link} className={rowLink(dM)}>
                <ScatterText text={c.text} />
              </CalBookingButton>
              <span className={`${label} text-[#5E5B55]`}>{c.detail}</span>
            </li>
          ))}
          {contacts.map(({ text, detail, ...a }) => (
            <li key={text} className={row}>
              <a {...a} className={rowLink(dM)}>
                <ScatterText text={text} />
              </a>
              <span className={`${label} text-right text-[#5E5B55]`}>{detail}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={`${label} flex flex-col items-start gap-2 pt-8 md:flex-row md:items-center md:justify-between`}>
        <p>
          Hem Varia / Vadodara, <Clock />
        </p>
        <nav aria-label="Footer" className="-mx-2 flex flex-wrap gap-x-2">
          <Link href="/work" className={barLink}>
            Case studies
          </Link>
          <Link href="/blog" className={barLink}>
            Blog
          </Link>
          <a href="#top" className={barLink}>
            Back to top
          </a>
        </nav>
      </div>
    </footer>
  )
}

// Every page: paper ground, the floating bar and menu, then the page, then the footer.
export default function PageShell({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.fonts.ready.then(() => ScrollTrigger.refresh())
  }, [])

  return (
    <div
      id="top"
      className="min-h-screen bg-[#F2F0EB] font-(family-name:--font-story-sans) text-[#111] [-webkit-tap-highlight-color:transparent] selection:bg-[#2B3BFF] selection:text-white [&_a]:touch-manipulation [&_button]:touch-manipulation"
    >
      <Menu />
      {children}
      <Footer />
    </div>
  )
}
