"use client"

import React, { CSSProperties } from "react"

type ShinyTextProps = {
  text: string
  disabled?: boolean
  speed?: number
  className?: string
}

export default function ShinyText({ text, disabled = false, speed = 5, className = "" }: ShinyTextProps) {
  const animationStyle: CSSProperties = {
    backgroundImage: `linear-gradient(110deg, 
      rgba(255, 255, 255, 0) 0%, 
      rgba(255, 255, 255, 0) 40%, 
      rgba(255, 255, 255, 0.5) 50%, 
      rgba(255, 255, 255, 0) 60%, 
      rgba(255, 255, 255, 0) 100%)`,
    backgroundSize: "200% 100%",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    animation: disabled ? undefined : `shiny ${speed}s infinite linear`,
  }

  return (
    <>
      <span className={`inline-block ${className}`} style={animationStyle}>
        {text}
      </span>
      <style jsx global>{`
        @keyframes shiny {
          0% {
            background-position: 200% center;
          }
          100% {
            background-position: -200% center;
          }
        }
      `}</style>
    </>
  )
}
