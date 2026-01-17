"use client"

import { ReactNode, useEffect } from "react"
import Lenis from "lenis"
import { useIsMobile } from "@/hooks/use-mobile"

export default function SmoothScroll({ children }: { children: ReactNode }) {
    const isMobile = useIsMobile()

    useEffect(() => {
        // Don't initialize Lenis on mobile
        // We check window.innerWidth directly to avoid initial state delay from the hook
        if (isMobile || window.innerWidth < 768) return

        const lenis = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 0.8,
            touchMultiplier: 1.5,
            infinite: false,
        })

        // Connect lenis to scroll events
        lenis.on('scroll', () => {
            // This syncs with any scroll-based animations
        })

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        // Handle anchor links smoothly
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault()
                const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href')
                if (href && href !== '#') {
                    const target = document.querySelector(href)
                    if (target) {
                        lenis.scrollTo(target as HTMLElement, { offset: -80 })
                    }
                }
            })
        })

        return () => {
            lenis.destroy()
        }
    }, [isMobile])

    return <>{children}</>
}
