"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { useIsMobile } from "@/hooks/use-mobile"

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false)
    const isMobile = useIsMobile()

    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    const springConfig = { damping: 25, stiffness: 700 }
    const cursorXSpring = useSpring(cursorX, springConfig)
    const cursorYSpring = useSpring(cursorY, springConfig)

    useEffect(() => {
        if (isMobile) return

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16)
            cursorY.set(e.clientY - 16)
            if (!isVisible) setIsVisible(true)
        }

        window.addEventListener("mousemove", moveCursor)

        return () => {
            window.removeEventListener("mousemove", moveCursor)
        }
    }, [cursorX, cursorY, isMobile, isVisible])

    if (isMobile) return null

    return (
        <motion.div
            className="fixed left-0 top-0 z-[9999] pointer-events-none mix-blend-difference"
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
            }}
        >
            <div className="relative">
                {/* Main Ring */}
                <div className="h-8 w-8 rounded-full border border-white/50 bg-transparent" />

                {/* Center Dot */}
                <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
            </div>
        </motion.div>
    )
}
