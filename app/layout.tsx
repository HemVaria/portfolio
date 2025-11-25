import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Newsreader, Poppins } from "next/font/google"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import SmoothScroll from "@/components/smooth-scroll"
import CustomCursor from "@/components/custom-cursor"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _newsreader = Newsreader({ subsets: ["latin"] }) // loads the serif font
const _display = localFont({
  src: "../styles/aalto-display-personal-use.otf",
  variable: "--font-display",
  display: "swap",
})
const _hero = Poppins({ subsets: ["latin"], variable: "--font-hero", weight: ["300", "400", "700", "800"] })

export const metadata: Metadata = {
  title: "Hem Varia — Full‑stack & AI/ML Developer",
  description: "Portfolio of Hem Varia — projects, skills, certifications, and contact.",
  generator: "next.js",
  viewport: {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased ${_display.variable} ${_hero.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SmoothScroll>
            <CustomCursor />
            {children}
            <Analytics />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}
