"use client"

import { Coffee } from "lucide-react"

interface BuyMeCoffeeProps {
    variant?: "default" | "compact"
    className?: string
}

export default function BuyMeCoffee({ variant = "default", className = "" }: BuyMeCoffeeProps) {
    const bmcUrl = "https://www.buymeacoffee.com/hehehem"

    if (variant === "compact") {
        return (
            <a
                href={bmcUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFDD00] text-black font-medium text-sm transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#FFDD00]/30 ${className}`}
            >
                <Coffee className="w-4 h-4" />
                <span>Buy me a coffee</span>
            </a>
        )
    }

    return (
        <a
            href={bmcUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#FFDD00] text-black font-medium transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#FFDD00]/40 ${className}`}
        >
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black/10 group-hover:bg-black/20 transition-colors">
                <Coffee className="w-5 h-5" />
            </span>
            <span className="flex flex-col items-start">
                <span className="text-xs text-black/60">Support my work</span>
                <span className="text-sm font-semibold">Buy me a coffee</span>
            </span>
        </a>
    )
}
