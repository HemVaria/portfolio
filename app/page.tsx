"use client"

import { useIsMobile } from "@/hooks/use-mobile"
import Navigation from "@/components/navigation"
import Prism from "@/components/ui/prism"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Certifications from "@/components/certifications"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function HomePage() {
  const isMobile = useIsMobile()

  return (
    <main className="relative min-h-screen">
      {/* global animated background (Prism only) */}
      {!isMobile && (
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 opacity-[0.55] mix-blend-screen">
            <Prism
              animationType="rotate"
              timeScale={0.45}
              height={3.5}
              baseWidth={5.5}
              scale={3.6}
              hueShift={0.0}
              colorFrequency={1}
              noise={0.45}
              glow={1.0}
            />
          </div>
        </div>
      )}
      {/* floating navigation */}
      <Navigation />

      {/* reference image for accessibility/testing (not visibly shown) */}
      <figure className="sr-only">
        <img
          src="/images/reference-vjy.png"
          alt="Reference screenshot used for visual direction of this portfolio (vjy.me inspired)"
        />
        <figcaption>Design reference screenshot.</figcaption>
      </figure>

  {/* sections */}
      <Hero />
      <section id="projects">
        <Projects />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="experience">
        <Experience />
      </section>
      {/** Education section removed by request **/}
      <section id="certifications">
        <Certifications />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <section id="about">
        <About />
      </section>
      <Footer />
    </main>
  )
}
