"use client"

import { useEffect } from "react"
import { getCalApi } from "@calcom/embed-react"

interface CalBookingButtonProps {
  calLink: string
  children: React.ReactNode
  className?: string
}

export function CalBookingButton({ calLink, children, className }: CalBookingButtonProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "booking" })
      cal("ui", {
        theme: "light",
        styles: {
          branding: { brandColor: "#ff6b35" },
        },
        hideEventTypeDetails: false,
      })
    })()
  }, [])

  return (
    <button
      data-cal-namespace="booking"
      data-cal-link={calLink}
      data-cal-config='{"layout":"month_view"}'
      className={className}
    >
      {children}
    </button>
  )
}

export function useCalEmbed() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "booking" })
      cal("ui", {
        theme: "light",
        styles: {
          branding: { brandColor: "#ff6b35" },
        },
        hideEventTypeDetails: false,
      })
    })()
  }, [])
}
