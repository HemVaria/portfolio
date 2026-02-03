"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { Download, X, Home, Briefcase, Code, User, Mail, Layers } from "lucide-react"

const navLinks = [
    { label: "Works", href: "#projects", icon: Layers },
    { label: "Services", href: "#services", icon: Briefcase },
    { label: "Experience", href: "#experience", icon: Code },
    { label: "About", href: "#about", icon: User },
]

const mobileNavLinks = [
    { label: "Home", href: "#", index: "01", icon: Home },
    { label: "About", href: "#about", index: "02", icon: User },
    { label: "Projects", href: "#projects", index: "03", icon: Layers },
    { label: "Services", href: "#services", index: "04", icon: Briefcase },
    { label: "Skills", href: "#skills", index: "05", icon: Code },
    { label: "Experience", href: "#experience", index: "06", icon: Briefcase },
    { label: "Contact", href: "#contact", index: "07", icon: Mail },
]

// Magnetic button component for smooth hover effect
function MagneticLink({ children, href, className, onClick }: {
    children: React.ReactNode
    href: string
    className?: string
    onClick?: () => void
}) {
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const springConfig = { damping: 15, stiffness: 150 }
    const springX = useSpring(x, springConfig)
    const springY = useSpring(y, springConfig)

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        x.set((e.clientX - centerX) * 0.3)
        y.set((e.clientY - centerY) * 0.3)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.a
            href={href}
            className={className}
            style={{ x: springX, y: springY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        >
            {children}
        </motion.a>
    )
}

export default function Navigation() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [scrollProgress, setScrollProgress] = useState(0)
    const [hidden, setHidden] = useState(false)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [activeSection, setActiveSection] = useState("")

    // Track scroll for navbar effects
    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY

        // Scrolled state for background
        setScrolled(currentScrollY > 50)

        // Hide/show on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setHidden(true)
        } else {
            setHidden(false)
        }
        setLastScrollY(currentScrollY)

        // Calculate scroll progress
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const progress = docHeight > 0 ? (currentScrollY / docHeight) * 100 : 0
        setScrollProgress(progress)

        // Detect active section
        const sections = ["projects", "services", "skills", "experience", "about", "contact"]
        for (const section of sections.reverse()) {
            const element = document.getElementById(section)
            if (element) {
                const rect = element.getBoundingClientRect()
                if (rect.top <= 150) {
                    setActiveSection(section)
                    break
                }
            }
        }
    }, [lastScrollY])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [handleScroll])

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
            <motion.div
                className="fixed top-0 left-0 right-0 z-[9999] h-[2px] pointer-events-none bg-black/10"
            >
                <motion.div
                    className="h-full bg-black"
                    style={{ width: `${scrollProgress}%` }}
                    transition={{ duration: 0.1 }}
                />
            </motion.div>


            {/* Floating Centered Navigation */}
            <motion.header
                className="fixed top-4 left-0 right-0 z-[100] px-4"
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: hidden && !menuOpen ? -100 : 0, opacity: hidden && !menuOpen ? 0 : 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                {/* Desktop: Centered navigation */}
                <div className="hidden md:flex justify-center items-center gap-2">
                    {/* Center Navigation Pill - Desktop */}
                    <nav className="hidden lg:flex items-center gap-1 bg-black/80 backdrop-blur-xl rounded-full px-2 py-1.5 border border-white/10 shadow-2xl shadow-black/50">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href.replace("#", "")
                            return (
                                <MagneticLink
                                    key={link.label}
                                    href={link.href}
                                    className={`relative px-4 py-2 text-sm rounded-full transition-all duration-300 ${isActive
                                        ? "text-black"
                                        : "text-white/70 hover:text-white"
                                        }`}
                                >
                                    {isActive && (
                                        <motion.span
                                            className="absolute inset-0 bg-white rounded-full"
                                            layoutId="activeSection"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10">{link.label}</span>
                                </MagneticLink>
                            )
                        })}
                    </nav>

                    {/* Resume Button */}
                    <motion.a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm bg-black/80 backdrop-blur-xl text-white/70 hover:text-white transition-colors rounded-full border border-white/10 shadow-2xl shadow-black/50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Download className="size-4" />
                        <span className="hidden lg:inline">Resume</span>
                    </motion.a>

                    {/* Contact Button */}
                    <motion.a
                        href="#contact"
                        className="flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-colors shadow-2xl shadow-black/50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Contact
                    </motion.a>

                    {/* Menu Button - Desktop */}
                    <motion.button
                        className="flex items-center justify-center px-4 py-2.5 text-sm text-white/70 hover:text-white transition-colors rounded-full bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="mr-2">Menu</span>
                        <div className="flex flex-col gap-1 items-center justify-center">
                            <motion.span
                                className="w-5 h-0.5 bg-current block origin-center"
                                animate={menuOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            />
                            <motion.span
                                className="w-5 h-0.5 bg-current block origin-center"
                                animate={menuOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            />
                        </div>
                    </motion.button>
                </div>

                {/* Mobile: Menu button on top-right */}
                <div className="flex md:hidden justify-end">
                    <motion.button
                        className="flex items-center justify-center w-12 h-12 text-white/70 hover:text-white transition-colors rounded-full bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="flex flex-col gap-1.5 items-center justify-center">
                            <motion.span
                                className="w-5 h-0.5 bg-current block origin-center"
                                animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            />
                            <motion.span
                                className="w-5 h-0.5 bg-current block origin-center"
                                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                                transition={{ duration: 0.2 }}
                            />
                            <motion.span
                                className="w-5 h-0.5 bg-current block origin-center"
                                animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            />
                        </div>
                    </motion.button>
                </div>
            </motion.header>

            {/* Mobile Bottom Navigation Bar */}
            <motion.nav
                className="fixed bottom-3 left-3 right-3 z-[99] md:hidden"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: hidden ? 100 : 0, opacity: hidden ? 0 : 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <div className="flex items-center justify-evenly bg-black/90 backdrop-blur-xl rounded-2xl border border-white/10 px-1 py-2.5 shadow-xl shadow-black/50">
                    {[
                        { icon: Home, href: "#", label: "Home" },
                        { icon: Layers, href: "#projects", label: "Works" },
                        { icon: Briefcase, href: "#experience", label: "Exp" },
                        { icon: User, href: "#about", label: "About" },
                        { icon: Mail, href: "#contact", label: "Contact" },
                    ].map((item) => {
                        const Icon = item.icon
                        const isActive = activeSection === item.href.replace("#", "") || (item.href === "#" && !activeSection)
                        return (
                            <a
                                key={item.label}
                                href={item.href}
                                className={`flex flex-col items-center justify-center gap-0.5 min-w-[48px] px-2 py-1.5 rounded-xl transition-all ${isActive
                                    ? "text-black bg-white"
                                    : "text-white/50 hover:text-white"
                                    }`}
                            >
                                <Icon className="w-4 h-4 flex-shrink-0" />
                                <span className="text-[9px] font-medium leading-tight">{item.label}</span>
                            </a>
                        )
                    })}
                </div>
            </motion.nav>

            {/* Full Screen Menu Overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="fixed inset-0 z-[101] overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* Solid Black Background */}
                        <motion.div
                            className="absolute inset-0 bg-black"
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                        />

                        {/* Content Container */}
                        <div className="relative z-10 h-full flex flex-col">
                            {/* Menu Header */}
                            <div className="flex justify-between items-center px-4 sm:px-6 md:px-10 py-4">
                                <motion.span
                                    className="text-white/40 text-sm uppercase tracking-wider"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    Navigation
                                </motion.span>
                                <motion.button
                                    className="flex items-center gap-2 px-4 py-2 text-white/70 hover:text-white transition-colors rounded-full border border-white/20 hover:border-white/40"
                                    onClick={closeMenu}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="text-sm">Close</span>
                                    <X className="w-4 h-4" />
                                </motion.button>
                            </div>

                            {/* Navigation Links */}
                            <nav className="flex-1 flex flex-col justify-center px-4 sm:px-10 md:px-16 lg:px-24 overflow-y-auto">
                                {mobileNavLinks.map((link, i) => {
                                    const Icon = link.icon
                                    return (
                                        <motion.a
                                            key={link.label}
                                            href={link.href}
                                            className="group flex items-center gap-3 sm:gap-6 py-2.5 sm:py-4 border-b border-white/10 last:border-0"
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 50 }}
                                            transition={{
                                                delay: 0.1 + i * 0.05,
                                                duration: 0.4,
                                                type: "spring",
                                                stiffness: 100
                                            }}
                                            onClick={closeMenu}
                                        >
                                            <span className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-white/10 group-hover:bg-white group-hover:text-black transition-all flex-shrink-0">
                                                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white/40 group-hover:text-black transition-colors" />
                                            </span>
                                            <span className="text-xl sm:text-3xl md:text-4xl font-bold text-white/70 group-hover:text-white transition-all group-hover:translate-x-2">
                                                {link.label}
                                            </span>
                                            <span className="ml-auto text-[10px] sm:text-xs text-white/20 font-mono flex-shrink-0">{link.index}</span>
                                        </motion.a>
                                    )
                                })}
                            </nav>

                            {/* Footer */}
                            <motion.div
                                className="px-6 sm:px-10 md:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <div className="flex items-center gap-4">
                                    <a
                                        href="https://linkedin.com/in/hem-varia"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 text-sm text-white/50 hover:text-white transition-colors rounded-full border border-white/10 hover:border-white/30"
                                    >
                                        LinkedIn
                                    </a>
                                    <a
                                        href="https://github.com/HemVaria"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 text-sm text-white/50 hover:text-white transition-colors rounded-full border border-white/10 hover:border-white/30"
                                    >
                                        GitHub
                                    </a>
                                </div>
                                <a
                                    href="/resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-colors"
                                >
                                    <Download className="w-4 h-4" />
                                    Download CV
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
