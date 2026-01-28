"use client"

import { useState } from "react"
import { Linkedin, ExternalLink, Briefcase, Award, Calendar, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { motion } from "framer-motion"

interface ExperienceItem {
  title: string
  company: string
  type?: string
  period: string
  location?: string
  points: string[]
  highlight?: boolean
  linkedinPost?: string
  image?: string
}

interface ActivityItem {
  title: string
  description: string
  linkedinPost?: string
  icon?: "award" | "briefcase"
}

const experiences: ExperienceItem[] = [
  {
    title: "Full-stack Developer + Gen AI",
    company: "What an Aldea",
    type: "Internship",
    period: "2026",
    location: "Dubai, UAE",
    points: [
      "Developed full-stack features for a real estate platform showcased at PropTech Connect Dubai 2026",
      "Built with Next.js/Node.js with integrated Gen AI APIs",
      "Designed n8n workflows for image processing and automation",
    ],
    highlight: true,
    linkedinPost: "https://www.linkedin.com/posts/hem-varia_having-rented-5-houses-in-my-life-so-far-activity-7421918803296501762-3Kho",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop",
  },
  {
    title: "Full-Stack Developer + Gen AI",
    company: "CodeBucks",
    type: "Internship",
    period: "2026",
    points: [
      "Built React/Next.js dashboards and components with optimized performance and UX",
      "Implemented AI-driven agentic workflows with third-party API integrations",
      "Connected backend services for end-to-end feature delivery",
    ],
    image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&h=400&fit=crop",
  },
  {
    title: "Freelance Web Developer",
    company: "Fiverr, Upwork, Unstop",
    period: "04/2025 — Present",
    points: [
      "Built scalable full-stack apps using Node.js, Supabase, and Firebase",
      "Implemented GSAP animations and Three.js 3D visualizations",
      "Enhanced performance with robust authentication and cloud optimization",
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  },
  {
    title: "Freelance Web Designer",
    company: "Fiverr, Upwork, Unstop",
    period: "02/2024 — Present",
    points: [
      "Built 15+ responsive websites in Next.js/React",
      "Designed with Figma UI/UX and Canva assets",
      "Delivered client projects on Fiverr/Upwork",
    ],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
  },
  {
    title: "AI/ML Developer",
    company: "Personal & Freelance",
    period: "2024 — Present",
    points: [
      "Deployed AI solutions using TensorFlow, HuggingFace, and Gen AI",
      "Built AI WhatsApp Chatbot and n8n automation workflows",
      "Improved operational efficiency through intelligent automation",
    ],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
  },
]

const activities: ActivityItem[] = [
  {
    title: "SIH 2025 Nationals Finalist",
    description: "Competed at the national level in Smart India Hackathon 2025",
    linkedinPost: "https://www.linkedin.com/posts/vishal-desai-030b39251_teamvoid-hackathon-sih2025-ugcPost-7377582804332687360-WgYH",
    icon: "award",
  },
  {
    title: "PropTech Connect Dubai 2026",
    description: "Contributed to platform development featured at the conference",
    linkedinPost: "https://www.linkedin.com/posts/hem-varia_having-rented-5-houses-in-my-life-so-far-activity-7421918803296501762-3Kho",
    icon: "award",
  },
  {
    title: "Technical Coordinator & Social Media Manager",
    description: "Career Development Cell, Parul University — Managed technical operations and social media",
    icon: "briefcase",
  },
]

export default function Experience() {
  const [expandedLinkedIn, setExpandedLinkedIn] = useState<string | null>(null)

  return (
    <section className="bg-black py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Experience Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30">
            Experience
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Where I&apos;ve Made an Impact
          </h2>
          <p className="text-lg text-white/60 max-w-2xl">
            Building products, shipping features, and creating meaningful experiences across startups and freelance projects.
          </p>
        </motion.div>

        {/* Experience Carousel */}
        <div className="w-full max-w-6xl mx-auto px-8">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {experiences.map((exp, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`h-full rounded-2xl border backdrop-blur-md transition-all duration-300 overflow-hidden group ${exp.highlight
                        ? "bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30 hover:border-blue-400/50"
                        : "bg-white/[0.03] border-white/[0.08] hover:border-white/20"
                      }`}
                  >
                    {/* Image */}
                    {exp.image && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={exp.image}
                          alt={exp.company}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        {exp.type && (
                          <Badge className="absolute top-4 right-4 bg-blue-500/80 text-white border-none">
                            {exp.type}
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                          <p className="text-blue-400 font-medium">{exp.company}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-white/60">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {exp.period}
                        </span>
                        {exp.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {exp.location}
                          </span>
                        )}
                      </div>

                      <ul className="space-y-2 mb-4">
                        {exp.points.map((point, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>

                      {exp.linkedinPost && (
                        <a
                          href={exp.linkedinPost}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/80 bg-[#0A66C2]/20 hover:bg-[#0A66C2]/30 border border-[#0A66C2]/40 rounded-lg transition-all hover:scale-[1.02]"
                        >
                          <Linkedin className="w-4 h-4" />
                          View LinkedIn Post
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4 bg-white/10 border-white/20 text-white hover:bg-white/20" />
            <CarouselNext className="hidden md:flex -right-4 bg-white/10 border-white/20 text-white hover:bg-white/20" />
          </Carousel>
        </div>

        {/* Activities Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 mb-12"
        >
          <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30">
            Activities
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Beyond the Code
          </h2>
        </motion.div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md hover:border-white/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {activity.icon === "award" ? (
                  <Award className="w-6 h-6 text-purple-400" />
                ) : (
                  <Briefcase className="w-6 h-6 text-blue-400" />
                )}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{activity.title}</h3>
              <p className="text-sm text-white/60 mb-4">{activity.description}</p>
              {activity.linkedinPost && (
                <a
                  href={activity.linkedinPost}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#0A66C2] hover:text-[#0A66C2]/80 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  View Post
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
