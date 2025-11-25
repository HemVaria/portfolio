const categories = [
  {
    title: "Web Development",
    skills: [
      "Next.js",
      "React.js",
      "Node.js",
      "Supabase",
      "Firebase",
      "MongoDB",
      "Flutter",
      "JavaScript",
      "HTML",
      "CSS",
    ],
  },
  {
    title: "AI/ML",
    skills: [
      "TensorFlow",
      "Hugging Face",
      "Whisper",
      "YOLOv8",
      "BLIP",
      "Generative AI",
      "Agentic AI",
      "OpenCV",
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      "Gradio",
      "n8n.io",
      "Google Colab",
      "Twilio",
      "Google Cloud Console",
      "Power BI",
      "Git/GitHub",
      "VS Code",
    ],
  },
  {
    title: "Design & Editing",
    skills: [
      "Canva",
      "Figma",
      "Photoshop",
      "Premiere Pro",
      "Capcut",
      "Filmora",
    ],
  },
]

import ScrollReveal from "./ui/scroll-reveal"

export default function Skills() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-24 md:py-32">
      <h2 className="text-3xl md:text-4xl font-semibold text-white font-display uppercase tracking-wider">Skills</h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat, i) => (
          <ScrollReveal key={cat.title} delay={i * 0.1}>
            <div className="p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md hover:bg-white/[0.05] transition-all">
              <h3 className="text-xl font-medium text-white">{cat.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {cat.skills.map((s) => (
                  <span key={s} className="px-3 py-1 rounded-lg border border-white/20 bg-white/10 text-white/90 text-sm">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
