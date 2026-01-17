"use client"

import { motion } from "framer-motion"

type ScrollRevealProps = {
    children: React.ReactNode
    className?: string
    delay?: number
    direction?: "up" | "down" | "left" | "right"
    distance?: number
}

export default function ScrollReveal({ 
    children, 
    className, 
    delay = 0,
    direction = "up",
    distance = 40
}: ScrollRevealProps) {
    const getInitialPosition = () => {
        switch (direction) {
            case "up": return { opacity: 0, y: distance }
            case "down": return { opacity: 0, y: -distance }
            case "left": return { opacity: 0, x: distance }
            case "right": return { opacity: 0, x: -distance }
            default: return { opacity: 0, y: distance }
        }
    }

    const getAnimatePosition = () => {
        switch (direction) {
            case "up":
            case "down": return { opacity: 1, y: 0 }
            case "left":
            case "right": return { opacity: 1, x: 0 }
            default: return { opacity: 1, y: 0 }
        }
    }

    return (
        <motion.div
            initial={getInitialPosition()}
            whileInView={getAnimatePosition()}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
                duration: 0.8, 
                delay, 
                ease: [0.16, 1, 0.3, 1] // Custom easing for smooth feel
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
