"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Download } from "lucide-react"
import { Facebook, Instagram, Github } from "lucide-react"

const navLinks = [
  { label: "Works", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
]

const mobileNavLinks = [
  { label: "Home", href: "#", index: "01" },
  { label: "About", href: "#about", index: "02" },
  { label: "Projects", href: "#projects", index: "03" },
  { label: "Services", href: "#services", index: "04" },
  { label: "Skills", href: "#skills", index: "05" },
  { label: "Contact", href: "#contact", index: "06" },
]

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/in/hem-varia", icon: "linkedin" },
  { label: "GitHub", href: "https://github.com/HemVaria", icon: "github" },
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
]

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Track scroll for navbar background and progress bar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Calculate scroll progress
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setScrollProgress(progress)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 right-0 z-[9999] h-[3px] pointer-events-none"
        style={{ background: 'transparent' }}
      >
        <div
          className="h-full"
          style={{ 
            width: `${scrollProgress}%`,
            background: 'linear-gradient(90deg, #FF6B35, #ff9966)',
            transition: 'width 0.1s ease'
          }}
        />
      </div>

      {/* Fixed Header - Mix Blend Mode Difference for auto color inversion */}
      <header
        className="fixed top-[3px] left-0 right-0 z-[100] mix-blend-difference"
      >
        <div className="flex justify-between items-center px-6 md:px-10 py-4">
          {/* Logo */}
          <a href="#" className="font-bold text-xl tracking-tight text-white">
            HEM VARIA
          </a>

          {/* Center Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Side - CV + Contact + Menu */}
          <div className="flex items-center gap-3">
            {/* CV Button - Desktop */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-4 py-2.5 text-sm text-white/70 hover:text-white transition-colors"
            >
              <Download className="size-4" />
              CV
            </a>

            {/* Contact Button - Desktop */}
            <a
              href="#contact"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm rounded-full hover:bg-white/80 transition-colors"
            >
              Contact
            </a>

            {/* Menu Button */}
            <button
              className="flex items-center gap-2 px-4 py-2 text-sm text-white/70 hover:text-white transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className="hidden sm:inline">Menu</span>
              <div className="flex flex-col gap-1">
                <motion.span
                  className="w-5 h-0.5 bg-current block origin-center"
                  animate={menuOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-5 h-0.5 bg-current block origin-center"
                  animate={menuOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Menu Overlay - iOS Glass Effect */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[101] overflow-y-auto overflow-x-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Glass Background */}
            <div className="absolute inset-0 bg-black/85 backdrop-blur-xl" />
            
            {/* Content Container - Right Aligned */}
            <div className="relative z-10 min-h-full flex flex-col">
              {/* Menu Header */}
              <div className="flex justify-end items-center px-4 sm:px-6 md:px-10 py-4">
                {/* Close Button */}
                <button
                  className="flex items-center gap-2 sm:gap-3 text-sm text-white/70 hover:text-white transition-colors"
                  onClick={closeMenu}
                >
                  <span className="w-4 sm:w-5 h-[2px] bg-current" />
                  <span>Close</span>
                </button>
              </div>

              {/* Navigation Links - Right Aligned */}
              <nav className="flex-1 flex flex-col justify-center px-4 sm:px-6 md:px-16 lg:px-24 py-8">
                {mobileNavLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    className="group flex items-center justify-end gap-2 sm:gap-4 py-2 sm:py-3 text-right"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                    onClick={closeMenu}
                  >
                    <span className="text-[clamp(1.75rem,8vw,4rem)] font-bold text-white/90 group-hover:text-white transition-colors tracking-tight">
                      {link.label}
                    </span>
                    <span className="text-[10px] sm:text-xs text-white/30 font-mono">{link.index}</span>
                  </motion.a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
