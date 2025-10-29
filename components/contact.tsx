import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react"

export default function Contact() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24 md:py-32">
  <h2 className="text-3xl md:text-4xl font-semibold text-white font-display uppercase tracking-wider">Contact</h2>
      <div className="mt-8 space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <div className="flex items-center gap-2 text-white/70">
              <Mail className="size-4" /> Email
            </div>
            <a
              href="mailto:hemvaria007@gmail.com"
              className="mt-2 inline-block text-xl text-white hover:underline underline-offset-4"
              aria-label="Send email to hemvaria007@gmail.com"
            >
              hemvaria007@gmail.com
            </a>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <div className="flex items-center gap-2 text-white/70">
              <Phone className="size-4" /> Phone
            </div>
            <a
              href="tel:+918200487838"
              className="mt-2 inline-block text-xl text-white hover:underline underline-offset-4"
              aria-label="Call phone number +91 8200487838"
            >
              +91 8200487838
            </a>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <div className="flex items-center gap-2 text-white/70">
              <MapPin className="size-4" /> Location
            </div>
            <div className="mt-2 text-xl text-white">India (IST)</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="/Hem-Varia-ONEPAGECV.pdf"
            download
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/15 px-4 py-2 text-white hover:bg-white/20"
          >
            Download CV
          </a>
          <a
            href="/Hem-Varia-ONEPAGECV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white/90 hover:text-white"
          >
            View CV
          </a>
          <a
            href="https://github.com/HemVaria"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white/90 hover:text-white"
          >
            <Github className="size-4" /> GitHub
          </a>
          <a
            href="https://linkedin.com/in/hem-varia"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white/90 hover:text-white"
          >
            <Linkedin className="size-4" /> LinkedIn
          </a>
          {/** Twitter removed by request **/}
        </div>
      </div>
    </div>
  )
}
