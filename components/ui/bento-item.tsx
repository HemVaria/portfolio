"use client"

import React, { useEffect, useRef } from "react"

type BentoProps = {
  className?: string
  children: React.ReactNode
}

/**
 * BentoItem
 * A reusable tilt-on-hover card wrapper. It only handles transforms and leaves colors/theme to callers.
 * Safe to use inside Server Components (this file is a Client Component).
 */
export default function BentoItem({ className, children }: BentoProps) {
  const itemRef = useRef<HTMLDivElement>(null)
  const MAX_ROTATION = 10

  useEffect(() => {
    const item = itemRef.current
    if (!item) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = item.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateY = ((x - centerX) / centerX) * MAX_ROTATION
      const rotateX = (-(y - centerY) / centerY) * MAX_ROTATION
      item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05,1.05,1.05)`
    }

    const handleMouseLeave = () => {
      item.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)"
    }

    item.addEventListener("mousemove", handleMouseMove)
    item.addEventListener("mouseleave", handleMouseLeave)
    return () => {
      item.removeEventListener("mousemove", handleMouseMove)
      item.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={itemRef}
      className={[
        // Keep styling minimal and neutral; rely on caller for theme
        "relative will-change-transform transition-transform duration-200 ease-out",
        className || "",
      ].join(" ")}
    >
      {children}
    </div>
  )
}
