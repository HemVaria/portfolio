"use client"

import { ReactNode, useEffect } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useIsMobile } from "@/hooks/use-mobile"

gsap.registerPlugin(ScrollTrigger)

declare global {
    interface Window {
        lenis?: Lenis
    }
}

// Lenis smooth scrolling driven by GSAP's ticker, so ScrollTrigger animations move
// in lockstep with the smoothed scroll. Desktop only; phones keep native scrolling.
export default function SmoothScroll({ children }: { children: ReactNode }) {
    const isMobile = useIsMobile()

    useEffect(() => {
        // We check window.innerWidth directly to avoid initial state delay from the hook
        if (isMobile || window.innerWidth < 768) return
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) return

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 0.9,
        })
        window.lenis = lenis

        lenis.on("scroll", ScrollTrigger.update)
        const tick = (time: number) => lenis.raf(time * 1000)
        gsap.ticker.add(tick)
        gsap.ticker.lagSmoothing(0)

        // Same-page anchors scroll smoothly, including links mounted later (menus, panels).
        // A link whose own handler already called preventDefault is left alone.
        const onClick = (e: MouseEvent) => {
            if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return
            const a = (e.target as Element).closest?.('a[href^="#"]')
            const href = a?.getAttribute("href")
            if (!href || href === "#") return
            const target = document.querySelector(href)
            if (!target) return
            e.preventDefault()
            lenis.scrollTo(target as HTMLElement, { offset: -80 })
        }
        document.addEventListener("click", onClick)

        return () => {
            document.removeEventListener("click", onClick)
            gsap.ticker.remove(tick)
            lenis.destroy()
            delete window.lenis
        }
    }, [isMobile])

    return <>{children}</>
}
