"use client"

import PageShell from "./shell"
import Hero from "./hero"
import Marquee from "./marquee"
import Services from "./services"
import WorkIndex from "./work-index"
import AutomateGrid from "./automate-grid"
import BeforeAfter from "./before-after"
import PixelWord from "./pixel-word"
import StackPile from "./stack-pile"
import Portrait from "./portrait"

// The home page.
export default function Story() {
  return (
    <PageShell>
      <main>
        <Hero />
        <Marquee />
        <Services />
        <WorkIndex />
        <AutomateGrid />
        <BeforeAfter />
        <PixelWord />
        <StackPile />
        <Portrait />
      </main>
    </PageShell>
  )
}
