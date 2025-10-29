const certifications = [
  { title: "Foundations of User Experience (UX) Design", issuer: "Google" },
  { title: "Prompting Essentials", issuer: "Google" },
  { title: "Machine Learning with TensorFlow", issuer: "Infosys Springboard" },
  { title: "Supervised ML: Regression & Classification", issuer: "DeepLearning.AI" },
  { title: "Theory of Computation", issuer: "NPTEL" },
  { title: "Computer Networks and Internet Protocol", issuer: "NPTEL" },
]

export default function Certifications() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-24 md:py-32">
  <h2 className="text-3xl md:text-4xl font-semibold text-white font-display uppercase tracking-wider">Certifications</h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {certifications.map((c) => (
          <div
            key={c.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md hover:bg-white/7 transition-all"
          >
            <h3 className="text-lg font-medium text-white">{c.title}</h3>
            <p className="mt-1 text-sm text-white/70">{c.issuer}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-wrap gap-2 text-base md:text-lg" aria-label="Achievements">
        <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-white/85">🎓 Multiple Certifications in AI & ML</span>
        <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-white/85">🛠️ Full‑Stack & Automation Expert</span>
        <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-white/85">🌍 Projects for Global Clients</span>
        <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-white/85">📊 Power User of Next.js & Supabase</span>
        <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-white/85">🤖 Deployed Agentic AI</span>
        <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-white/85">📈 Boosted Client Engagement</span>
  <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-white/85">🏅 Smart India Hackathon 2025 Nationals Finalist</span>
        <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-white/85">🖥️ Creator of Chrome Extensions</span>
        <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-white/85">🎥 50+ Video/Branding Projects Delivered</span>
        <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-white/85">🔄 Automated Social Pipelines</span>
        <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-white/85">🌐 Shipped for Startups & Brands</span>
        <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-white/85">🚀 Built 10+ apps</span>
        <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-white/85">💡 AI Pipelines in Production</span>
      </div>
    </div>
  )
}
