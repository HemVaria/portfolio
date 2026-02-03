"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

const menuLinks = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "Works", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/in/hem-varia" },
  { label: "GitHub", href: "https://github.com/HemVaria" },
  { label: "Instagram", href: "https://instagram.com/hem_007_" },
]

export default function Footer() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        }) + ", IST"
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-[#f5f5f0] border-t border-black/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12 py-10 sm:py-12 pb-24 sm:pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Menu */}
          <div>
            <h3 className="text-xs sm:text-sm font-medium text-black/40 uppercase tracking-wider mb-3 sm:mb-4">Menu</h3>
            <nav className="flex flex-col gap-1.5 sm:gap-2">
              {menuLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm sm:text-base text-black/70 hover:text-black transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-xs sm:text-sm font-medium text-black/40 uppercase tracking-wider mb-3 sm:mb-4">Socials</h3>
            <nav className="flex flex-col gap-1.5 sm:gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base text-black/70 hover:text-black transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Local Time */}
          <div>
            <h3 className="text-xs sm:text-sm font-medium text-black/40 uppercase tracking-wider mb-3 sm:mb-4">Local Time</h3>
            <p className="text-black/70 font-mono text-xs sm:text-sm">{time}</p>
          </div>

          {/* Back to top */}
          <div className="flex justify-end items-start">
            <button
              onClick={scrollToTop}
              className="group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-black/10 bg-white hover:bg-black hover:text-white transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="size-4 sm:size-5 text-black/70 group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-black/40">
            {new Date().getFullYear()} Hem Varia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
