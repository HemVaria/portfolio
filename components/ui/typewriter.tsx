"use client"

import React, { useEffect, useState } from "react"

type TypewriterProps = {
  text: string | string[]
  speed?: number // ms per char
  startDelay?: number
  className?: string
  cursor?: boolean
  hideCursorOnComplete?: boolean
}

export default function Typewriter({
  text,
  speed = 50,
  startDelay = 0,
  className = "",
  cursor = true,
  hideCursorOnComplete = true,
}: TypewriterProps) {
  const texts = Array.isArray(text) ? text : [text]
  const [display, setDisplay] = useState("")
  const [showCursor, setShowCursor] = useState(cursor)

  useEffect(() => {
    let mounted = true
    let idx = 0
    let charIdx = 0
    let acc = ""
    let timerId: number | undefined
    let hideTimer: number | undefined

    const tick = () => {
      if (!mounted) return
      const current = texts[idx] || ""
      charIdx += 1
      const accumStr = acc ? acc + " " : ""
      setDisplay(accumStr + current.slice(0, charIdx))

      if (charIdx < current.length) {
        timerId = window.setTimeout(tick, speed)
      } else {
        // finished current segment
        if (idx < texts.length - 1) {
          // accumulate and move to next after a short pause
          acc = accumStr + current
          idx += 1
          charIdx = 0
          timerId = window.setTimeout(tick, Math.max(120, speed * 4))
        } else {
          // done all
          if (hideCursorOnComplete) {
            // hide cursor shortly after finish
            hideTimer = window.setTimeout(() => {
              if (mounted) setShowCursor(false)
            }, 600)
          }
        }
      }
    }

    // initial start
    timerId = window.setTimeout(tick, startDelay)

    return () => {
      mounted = false
      if (timerId) clearTimeout(timerId)
      if (hideTimer) clearTimeout(hideTimer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [texts.join("||"), speed, startDelay, hideCursorOnComplete])

  return (
    <span className={className} aria-label={Array.isArray(text) ? texts.join(", ") : text}>
      {display}
      {showCursor && <span aria-hidden className="ml-1 animate-blink">|</span>}
    </span>
  )
}
