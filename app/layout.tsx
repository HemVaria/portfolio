import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import SmoothScroll from "@/components/smooth-scroll"
import CustomCursor from "@/components/custom-cursor"
import { SITE_URL } from "@/lib/site"
import "./globals.css"

const sans = Geist({ subsets: ["latin"], variable: "--font-story-sans" })
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-story-mono" })

const title = "Hem Varia | AI Automation and Full-Stack Engineer"
const description =
  "Hem Varia builds AI automation and full-stack systems: Meta Ads automation, order workflows on Cloudflare Workers, AI voice agents and SEO tooling."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "Hem Varia", title, description, url: "/" },
  twitter: { card: "summary_large_image", title, description },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F2F0EB", // browser chrome on phones matches the paper background
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased ${sans.variable} ${mono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <SmoothScroll>
            <CustomCursor />
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}
