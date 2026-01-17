"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Send, Calendar } from "lucide-react"
import Image from "next/image"
import { getCalApi } from "@calcom/embed-react"

// Twitter/X Card Component
function TwitterCard({ 
  content, 
  date, 
  likes, 
  retweets, 
  className = "",
  style = {}
}: {
  content: string
  date: string
  likes: number
  retweets: number
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <motion.div
      className={`absolute w-[320px] min-h-[160px] bg-[#141414]/95 backdrop-blur-sm border border-white/10 rounded-2xl p-4 -skew-y-[8deg] cursor-pointer transition-all duration-500 hover:border-white/20 ${className}`}
      style={style}
      whileHover={{ y: -10 }}
    >
      {/* Card Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 via-yellow-400 to-green-500 p-0.5 flex-shrink-0">
          <div className="w-full h-full rounded-full bg-black overflow-hidden">
            <Image 
              src="/images/design-mode/497194244_18163154437353224_7281199870403729748_n.jpg" 
              alt="Hem Varia"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="font-bold text-white text-sm">Hem Varia</span>
            <svg className="w-4 h-4 text-[#1d9bf0]" viewBox="0 0 22 22" fill="currentColor">
              <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681.132-.637.075-1.299-.165-1.903.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
            </svg>
          </div>
          <span className="text-white/50 text-xs">@hemvaria</span>
        </div>
        {/* X Logo */}
        <svg className="w-5 h-5 text-white flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>

      {/* Content */}
      <p className="text-white text-sm leading-relaxed mb-3 line-clamp-3">{content}</p>

      {/* Footer */}
      <div className="flex items-center justify-between text-white/50 text-xs">
        <span>{date}</span>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>{likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            <span>{retweets}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })

  // Initialize Cal.com embed
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Format WhatsApp message
    const whatsappMessage = `Portfolio Contact

From: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}

---
Sent from portfolio`
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage)
    
    // Your WhatsApp number (India: +91)
    const phoneNumber = "918200487838"
    
    // Redirect to WhatsApp
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank")
  }

  const twitterCards = [
    {
      content: "Deep diving into AI development! 🧠 Working on video captioning with Whisper & YOLOv8. The results are incredible! #AI #MachineLearning #BuildInPublic",
      date: "Jan 3, 2026",
      likes: 42,
      retweets: 8,
    },
    {
      content: "Just shipped a real-time chat app using Socket.io and the MERN stack. ⚡️ Handling concurrency like a pro! #WebDev #FullStack",
      date: "Jan 2, 2026",
      likes: 28,
      retweets: 5,
    },
    {
      content: "Officially OPEN FOR WORK! 🚀 Specializing in Next.js, React, and scalable backend systems. Ready to build robust applications. Let's make it happen! 💎 #OpenForWork #HireMe",
      date: "Jan 1, 2026",
      likes: 156,
      retweets: 23,
    },
  ]

  return (
    <section className="bg-[#f5f5f0] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Top Section - Title + Cards */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-16 mb-20">
          {/* Left - Big Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[clamp(3rem,10vw,8rem)] font-bold text-black leading-[0.9] tracking-tight">
              LET&apos;S<br />
              MAKE IT<br />
              <span className="text-[#ff6b35]">HAPPEN</span>
            </h2>
          </motion.div>

          {/* Right - Stacked Twitter Cards */}
          <motion.div
            className="relative w-full lg:w-auto h-[280px] flex justify-center lg:justify-end"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative w-[400px] h-[250px]">
              {twitterCards.map((card, i) => (
                <TwitterCard
                  key={i}
                  {...card}
                  style={{
                    zIndex: i + 1,
                    transform: `skewY(-8deg) translate(${i * 50}px, ${i * 35}px)`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section - Form + Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left - Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-black mb-8">Say Hello</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-0 py-4 bg-transparent border-b border-black/20 text-black placeholder:text-black/40 focus:outline-none focus:border-black transition-colors"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-0 py-4 bg-transparent border-b border-black/20 text-black placeholder:text-black/40 focus:outline-none focus:border-black transition-colors"
                required
              />
              <textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full px-0 py-4 bg-transparent border-b border-black/20 text-black placeholder:text-black/40 focus:outline-none focus:border-black transition-colors resize-none"
                required
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-black text-white font-medium transition-all hover:bg-black/80 hover:scale-105"
              >
                Send Message
                <Send className="size-4" />
              </button>
            </form>
          </motion.div>

          {/* Right - Contact Info */}
          <motion.div
            className="flex flex-col gap-8 lg:pt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div>
              <span className="text-xs text-black/40 uppercase tracking-wider">Email</span>
              <a href="mailto:hemvaria007@gmail.com" className="block text-lg text-black hover:text-black/70 transition-colors">
                hemvaria007@gmail.com
              </a>
            </div>
            <div>
              <span className="text-xs text-black/40 uppercase tracking-wider">Phone</span>
              <a href="tel:+918200487838" className="block text-lg text-black hover:text-black/70 transition-colors">
                +91 8200487838
              </a>
            </div>
            <div>
              <span className="text-xs text-black/40 uppercase tracking-wider">Location</span>
              <span className="block text-lg text-black">Gujarat, India</span>
            </div>

            {/* Book a Call - Cal.com */}
            <div className="pt-4 border-t border-black/10">
              <span className="text-xs text-black/40 uppercase tracking-wider block mb-3">Schedule a Meeting</span>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  data-cal-namespace="booking"
                  data-cal-link="hehehem-s8zjfl/15min"
                  data-cal-config='{"layout":"month_view"}'
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border-2 border-black text-black font-medium transition-all hover:bg-black hover:text-white cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  15 Min Call
                </button>
                <button
                  data-cal-namespace="booking"
                  data-cal-link="hehehem-s8zjfl/30min"
                  data-cal-config='{"layout":"month_view"}'
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-black text-white font-medium transition-all hover:bg-black/80 hover:scale-105 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  30 Min Call
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
