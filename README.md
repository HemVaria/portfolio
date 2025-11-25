# 🚀 Hem Varia — Portfolio Website

A modern, full-stack portfolio showcasing projects, skills, and expertise in **Full-stack Development** and **AI/ML Engineering**. Built with Next.js 16, React 19, and Tailwind CSS, featuring premium interactive animations, a custom cursor, and a beautiful Bento-style grid layout.

![Portfolio Preview](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## ✨ Features

- 🎨 **Premium Design**: Glassmorphic UI with dark theme, smooth scrolling, and custom cursor.
- 🖱️ **Interactive Elements**: Magnetic buttons and a "Trailing Ring" custom cursor.
- 🎬 **Scroll Reveal Animations**: Sections gently fade in and slide up as you scroll.
- ⌨️ **Typewriter Animations**: Sequential text typing effects with cursor.
- 🎯 **Bento Grid Layout**: Responsive card grid for projects and skills.
- 📱 **Fully Responsive**: Mobile, tablet, and desktop optimized (custom cursor and smooth scroll disabled on mobile for performance).
- 🌓 **Dark Mode**: Built-in theme switching support.
- ⚡ **Performance**: Server-side rendering with Next.js App Router and React 19.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom tokens
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scroll**: [Lenis](https://lenis.studiofreight.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Development Tools
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Version Control**: Git + GitHub
- **Code Quality**: TypeScript strict mode

## 📂 Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout with smooth scroll & custom cursor
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── hero.tsx            # Hero section with typewriter
│   ├── projects.tsx        # Bento grid project showcase with scroll reveal
│   ├── about.tsx           # About section
│   ├── skills.tsx          # Skills showcase with scroll reveal
│   ├── experience.tsx      # Work experience with scroll reveal
│   ├── contact.tsx         # Contact section
│   ├── navigation.tsx      # Navigation bar
│   ├── custom-cursor.tsx   # Custom trailing cursor component
│   ├── smooth-scroll.tsx   # Lenis smooth scroll wrapper
│   └── ui/
│       ├── magnetic-button.tsx # Magnetic button wrapper
│       ├── scroll-reveal.tsx   # Scroll animation wrapper
│       └── ...                 # Other shadcn components
├── public/
│   ├── images/             # Image assets
│   └── Hem-Varia-ONEPAGECV.pdf
└── ...
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- pnpm (or npm/yarn)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/HemVaria/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   ```

4. **Open in browser**
   - Visit [http://localhost:3000](http://localhost:3000)

## 📦 Available Scripts

```bash
# Development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run TypeScript type checking
pnpm type-check
```

## 🎨 Customization

### Update Personal Information

Edit the following files to customize with your own information:

- **`components/hero.tsx`**: Hero greeting, name, and roles
- **`components/about.tsx`**: Bio and professional summary
- **`components/contact.tsx`**: Email, phone, and social links
- **`components/projects.tsx`**: Project showcase with descriptions
- **`components/skills.tsx`**: Technical skills and tools
- **`components/experience.tsx`**: Work experience timeline

### Add a New Project

Edit `components/projects.tsx` and add to the `projects` array:

```typescript
{
  title: "Your Project Title",
  year: "2025",
  size: "lg", // "lg" | "md" | "sm"
  description: "Brief project description",
  stack: ["Tech1", "Tech2", "Tech3"],
  repo: "https://github.com/username/project",
  demo: "https://www.youtube.com/embed/VIDEO_ID", // optional
  image: "/images/projects/project.jpg" // optional
}
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Deploy with Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Connect your GitHub repository
   - Click "Deploy"
   - Vercel will auto-deploy on every push to `main`

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Portfolio**: [hehehem.vercel.app](https://hehehem.vercel.app)
- **GitHub**: [@HemVaria](https://github.com/HemVaria)
- **LinkedIn**: [Hem Varia](https://linkedin.com/in/hemvaria)
- **Email**: hemvaria007@gmail.com

---

**Made with ❤️ by [Hem Varia](https://github.com/HemVaria)**
