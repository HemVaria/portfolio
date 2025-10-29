"use client"

import React, { useEffect, useRef, useState } from "react"

type TrueFocusProps = {
  text: string
  delay?: number
  className?: string
  speed?: number
}

export default function TrueFocus({ text, delay = 0, className = "", speed = 0.05 }: TrueFocusProps) {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInView(true)
    }, delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block transition-all duration-300"
          style={{
            filter: isInView ? "blur(0px)" : "blur(10px)",
            opacity: isInView ? 1 : 0,
            transitionDelay: isInView ? `${i * speed}s` : "0s",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  )
}
