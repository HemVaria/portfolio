"use client"

import Prism from "@/components/ui/prism"

const DemoOne = () => {
  return (
    <div className="w-full h-[600px] relative">
      <Prism
        animationType="rotate"
        timeScale={0.5}
        height={3.5}
        baseWidth={5.5}
        scale={3.6}
        hueShift={0}
        colorFrequency={1}
        noise={0.5}
        glow={1}
      />
    </div>
  )
}

export { DemoOne }
