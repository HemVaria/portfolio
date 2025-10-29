const roles = [
  {
    title: "Freelance Web Designer",
    place: "Fiverr, Upwork, Unstop, Personal Connections",
    period: "02/2024 — Present",
    points: [
      "Designed and launched 8+ responsive websites using Next.js/React with Figma UI/UX and Canva assets, boosting client brand launches and engagement across Fiverr/Upwork.",
    ],
  },
  {
    title: "Freelance Web Developer",
    place: "Fiverr, Upwork, Unstop, Personal Connections",
    period: "04/2025 — Present",
    points: [
      "Engineered and deployed scalable full‑stack apps with Node.js, Supabase, Firebase, and MongoDB, implementing robust authentication, analytics, and cloud services to maximize performance, security, and seamless user experience.",
    ],
  },
  {
    title: "AI/ML Developer Projects & Hackathons",
    place: "Fiverr and Personal Connections",
    period: "06/2025 — Present",
    points: [
      "Deployed advanced AI solutions using TensorFlow, HuggingFace, and Generative AI; developed AI WhatsApp Chatbot and automated workflows with n8n for significant efficiency improvements.",
    ],
  },
  {
    title: "Freelance Editor & Social Media Manager",
    place: "Freelance",
    period: "04/2023 — Present",
    points: [
      "Produced 50+ video editing and branding projects using Canva, Capcut and others.",
    ],
  },
]

export default function Experience() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-24 md:py-32">
  <h2 className="text-3xl md:text-4xl font-semibold text-white font-display uppercase tracking-wider">Experience</h2>
      <div className="mt-8 grid grid-cols-1 gap-6">
        {roles.map((r) => (
          <article
            key={r.title}
            className="p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md hover:bg-white/[0.05] transition-all"
          >
            <header className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xl font-medium text-white">{r.title}</h3>
              <div className="text-sm text-white/70">
                {r.place} · {r.period}
              </div>
            </header>
            <ul className="mt-4 grid list-disc gap-2 pl-5 text-white/80 marker:text-white/70">
              {r.points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  )
}
