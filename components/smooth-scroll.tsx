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
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        })

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenis.destroy()
        }
    }, [isMobile])

    return <>{children}</>
}
