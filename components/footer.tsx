export default function Footer() {
  return (
    <footer className="mx-auto mt-10 max-w-6xl px-6 pb-16 pt-10 border-t border-white/10">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <p className="text-pretty text-white/80">“Stay hungry, stay foolish.” — Steve Jobs</p>
        <nav className="flex flex-wrap gap-3 text-white/80">
          <a href="#about" className="hover:text-white">
            About
          </a>
          <a href="#skills" className="hover:text-white">
            Skills
          </a>
          <a href="#experience" className="hover:text-white">
            Experience
          </a>
          <a href="#projects" className="hover:text-white">
            Projects
          </a>
          <a href="#contact" className="hover:text-white">
            Contact
          </a>
        </nav>
        <div className="flex flex-col items-start md:items-end gap-3">
          <a
            href="/Hem-Varia-ONEPAGECV.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-white hover:bg-white/[0.1]"
          >
            Download CV
          </a>
          <div className="text-white/70">© {new Date().getFullYear()} Hem Varia • All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}
