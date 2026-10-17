"use client"

import { useEffect, useRef, useState } from "react"
import { Ascii } from "ascii.rest/react"
import * as edgeOrbit from "./pieces/edge-orbit"

// "edge orbit" from ascii.rest (MIT, @bas3line): the night earth with requests arcing
// across Cloudflare's edge, in its own colours. Mounted only when the footer comes near.
export default function OrbitBand() {
  const ref = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "400px" })
    io.observe(ref.current!)
    return () => io.disconnect()
  }, [])

  return (
    <figure ref={ref} className="relative -mx-5 mb-12 overflow-hidden bg-[#04060c] md:-mx-12 md:mb-16">
      <div className="aspect-[4/3] max-h-[60vh] w-full md:aspect-[2/1]">
        {near && (
          <Ascii
            piece={edgeOrbit}
            label="The night earth from orbit, with requests arcing city to city across Cloudflare's edge"
            className="block size-full object-cover"
          />
        )}
      </div>
    </figure>
  )
}
