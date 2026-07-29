"use client"

import { motion } from "framer-motion"

// Skills with colorful icon URLs — matches the tech stack listed on the current resume.
// Skills without a reliable brand icon fall back to a text badge instead of a broken image.
const skillCategories = [
  {
    title: "Web Development",
    skills: [
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
      { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
      { name: "Astro", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/astro/astro-original.svg" },
      { name: "Strapi", icon: "https://cdn.simpleicons.org/strapi" },
      { name: "Cloudflare D1 / KV", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudflareworkers/cloudflareworkers-original.svg" },
      { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
      { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
      { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
    ],
  },
  {
    title: "AI / ML",
    skills: [
      { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" },
      { name: "Generative AI" },
      { name: "Agentic AI" },
      { name: "Hermes Agent" },
      { name: "Whisper" },
      { name: "YOLOv8", icon: "https://cdn.simpleicons.org/yolo" },
      { name: "BLIP" },
      { name: "OpenCV", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg" },
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Claude Code", icon: "https://cdn.simpleicons.org/claude" },
      { name: "SEO Tools" },
      { name: "Hugging Face", icon: "https://cdn.simpleicons.org/huggingface" },
      { name: "OpenRouter", icon: "https://cdn.simpleicons.org/openrouter" },
      { name: "GLM" },
      { name: "Google Antigravity" },
      { name: "Cloudflare", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudflareworkers/cloudflareworkers-original.svg" },
      { name: "GitHub Actions", icon: "https://cdn.simpleicons.org/githubactions" },
      { name: "MCP" },
      { name: "Gradio", icon: "https://cdn.simpleicons.org/gradio" },
      { name: "n8n.io", icon: "https://n8n.io/favicon.ico" },
      { name: "Google Colab", icon: "https://cdn.simpleicons.org/googlecolab" },
      { name: "Twilio", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/twilio/twilio-original.svg" },
      { name: "Google Cloud Console", icon: "https://cdn.simpleicons.org/googlecloud" },
      { name: "Power BI" },
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
    ],
  },
  {
    title: "Design & Editing",
    skills: [
      { name: "Canva", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg" },
      { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
      { name: "Photoshop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-plain.svg" },
      { name: "Premiere Pro", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/premierepro/premierepro-plain.svg" },
      { name: "CapCut" },
      { name: "Filmora" },
      { name: "Remotion" },
    ],
  },
]

function initials(name: string) {
  const words = name.replace(/[^a-zA-Z0-9\s]/g, "").split(/\s+/).filter(Boolean)
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return words.slice(0, 2).map((w) => w[0]).join("").toUpperCase()
}

export default function Skills() {
  return (
    <section className="bg-black py-20 sm:py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          className="mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">Tech Stack</h2>
          <p className="text-sm sm:text-base text-white/50 max-w-xl">Technologies and tools I use to bring ideas to life.</p>
        </motion.div>

        {/* Skill categories */}
        <div className="space-y-10 sm:space-y-16">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: catIndex * 0.08, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-8">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-6">
                {category.skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    className="group flex flex-col items-center gap-3 w-16 md:w-20"
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, transition: { duration: 0.25, ease: [0.25, 1, 0.5, 1] } }}
                  >
                    <div className="relative w-16 h-16 md:w-20 md:h-20 bg-white/5 rounded-2xl p-3 border border-white/10 group-hover:border-white/30 group-hover:bg-white/10 transition-all duration-300 ease-out flex items-center justify-center">
                      {skill.icon ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-xs md:text-sm font-mono font-semibold text-white/50 group-hover:text-white/80 transition-colors">
                          {initials(skill.name)}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-white/50 group-hover:text-white/80 transition-colors text-center leading-tight">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
