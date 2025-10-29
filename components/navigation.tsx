"use client"

import { Home, Wrench, Briefcase, Grid3X3, User, Mail } from "lucide-react"
import FloatingNavbar from "./ui/floating-navbar"

const items = [
  { label: "home", href: "#", Icon: Home },
  { label: "skills", href: "#skills", Icon: Wrench },
  { label: "experience", href: "#experience", Icon: Briefcase },
  { label: "projects", href: "#projects", Icon: Grid3X3 },
  { label: "contact", href: "#contact", Icon: Mail },
  { label: "about", href: "#about", Icon: User },
]

export default function Navigation() {
  return <FloatingNavbar items={items} />
}
