"use client"

import type React from "react"

import { motion, useScroll, useTransform } from "framer-motion"
// theme toggle removed
import Link from "next/link"
import { cn } from "@/lib/utils"

type NavItem = {
  label: string
  href: string
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

export default function FloatingNavbar({
  items,
  className,
}: {
  items: NavItem[]
  className?: string
}) {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 400], [0.98, 0.85])
  // theme removed

  return (
    <motion.nav
      style={{ opacity }}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
  className={cn("fixed top-[max(1rem,env(safe-area-inset-top))] left-0 right-0 z-50 flex justify-center px-3 md:px-4", className)}
      aria-label="Primary"
    >
  <div className="relative inline-flex items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.035] px-1 py-1 backdrop-blur-[40px] md:backdrop-blur-[80px] backdrop-saturate-200 shadow-[0_8px_32px_rgba(0,0,0,0.28)] ring-1 ring-white/5">
        {items.map((item) => {
          const Icon = item.Icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group relative rounded-full px-3 py-1.5 md:px-3.5 md:py-2 text-xs md:text-sm text-white transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 hover:bg-white/[0.08]"
            >
              <span className="sr-only">{item.label}</span>
              {Icon ? (
                <Icon className="size-4 text-white/90 group-hover:text-white transition-colors" aria-hidden />
              ) : null}
            </Link>
          )
        })}
        {/* CV button opens PDF in new tab */}
        <a
          href="/Hem-Varia-ONEPAGECV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-0.5 md:ml-1 rounded-full px-2.5 py-1.5 md:px-3 md:py-2 text-xs md:text-sm text-white hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        >
          CV
        </a>
        {/** Theme toggle removed by request **/}
      </div>
    </motion.nav>
  )
}
