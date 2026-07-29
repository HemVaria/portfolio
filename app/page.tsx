"use client"

import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import Services from "@/components/services"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import Experience from "@/components/experience"
import Education from "@/components/education"
import Certifications from "@/components/certifications"
import About from "@/components/about"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <main className="relative">
      {/* Fixed Navigation */}
      <Navigation />

      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <section id="services">
        <Services />
      </section>

      {/* Projects Section */}
      <section id="projects">
        <Projects />
      </section>

      {/* Skills Section */}
      <section id="skills">
        <Skills />
      </section>

      {/* Experience Section */}
      <section id="experience">
        <Experience />
      </section>

      {/* Education Section */}
      <section id="education" className="bg-black">
        <Education />
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="bg-black">
        <Certifications />
      </section>

      {/* About Section */}
      <section id="about">
        <About />
      </section>

      {/* Contact Section */}
      <section id="contact">
        <Contact />
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
