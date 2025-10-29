# 🚀 Hem Varia — Portfolio Website

A modern, full-stack portfolio showcasing projects, skills, and expertise in **Full-stack Development** and **AI/ML Engineering**. Built with Next.js, TypeScript, and Tailwind CSS featuring interactive animations and a beautiful Bento-style grid layout.

![Portfolio Preview](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## ✨ Features

- 🎨 **Modern Design**: Glassmorphic UI with dark theme and smooth animations
- ⌨️ **Typewriter Animations**: Sequential text typing effects with cursor
- 🎯 **Bento Grid Layout**: Responsive card grid with 3D tilt effects on hover
- 📱 **Fully Responsive**: Mobile, tablet, and desktop optimized
- 🎬 **Project Showcase**: Embedded YouTube videos for featured projects
- 🌓 **Dark Mode**: Built-in theme switching support
- ⚡ **Performance**: Server-side rendering with Next.js App Router
- 🔗 **Social Links**: Direct contact via email, phone, GitHub, and LinkedIn

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom tokens
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Development Tools
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Version Control**: Git + GitHub
- **Code Quality**: TypeScript strict mode

## 📂 Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── hero.tsx            # Hero section with typewriter
│   ├── projects.tsx        # Bento grid project showcase
│   ├── about.tsx           # About section
│   ├── skills.tsx          # Skills showcase
│   ├── certifications.tsx   # Certifications list
│   ├── experience.tsx       # Work experience
│   ├── contact.tsx         # Contact section
│   ├── navigation.tsx      # Navigation bar
│   ├── footer.tsx          # Footer
│   ├── theme-provider.tsx  # Dark/light theme logic
│   └── ui/
│       ├── bento-item.tsx  # 3D tilt card wrapper
│       ├── typewriter.tsx  # Typewriter animation component
│       └── ...             # Other shadcn components
├── hooks/
│   ├── use-toast.ts        # Toast notifications
│   └── use-mobile.ts       # Mobile detection
├── lib/
│   └── utils.ts            # Utility functions
├── public/
│   ├── images/             # Image assets
│   └── Hem-Varia-ONEPAGECV.pdf
├── styles/
│   └── globals.css         # Global styles
├── package.json
├── tsconfig.json
├── next.config.mjs
├── tailwind.config.js
└── postcss.config.mjs
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
   - Edit `app/page.tsx` or component files to see live updates

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

# Format code with Prettier (if configured)
pnpm format
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
- **`components/certifications.tsx`**: Certifications and achievements

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

### Theme Customization

- **Colors**: Edit `tailwind.config.js` to customize the color palette
- **Fonts**: Modify imports in `app/layout.tsx` (Geist, Poppins, Aalto)
- **Animations**: Adjust timing and effects in component files

## 📊 Featured Projects

### 🎯 Ride Rescue
AI-powered emergency coordination platform with real-time location tracking and resource management.

### 🤖 EcoGen AI
Full-stack waste classification system with Gemini AI, gamification, carbon tracking, and smart pickup scheduling.

### 🎨 Nano-Craft AI
Interactive AI-powered design tool with real-time collaboration and creative suggestions.

### 💬 Instasphere
Full-stack social media platform with secure authentication and real-time chat capabilities.

### 🧠 AI Multimodal Video Captioning Tool
Advanced video analysis using Whisper, BLIP, and YOLOv8 for comprehensive video understanding.

### 📱 AI-Powered Productivity Chrome Extension
Intelligent browser extension for productivity enhancement with AI suggestions and automation.

### 🔄 Automated Content & Social Media Pipeline
Orchestrated n8n.io workflows for AI-generated content distribution across social platforms.

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

### Deploy to Other Platforms

The project is compatible with:
- [Netlify](https://netlify.com)
- [Railway](https://railway.app)
- [AWS Amplify](https://aws.amazon.com/amplify/)
- Self-hosted servers (Docker, VPS)

## 📝 Performance Optimizations

- ✅ Server-side rendering (SSR) for better SEO
- ✅ Static generation for pages where applicable
- ✅ Image optimization with Next.js Image component
- ✅ Code splitting and lazy loading
- ✅ CSS-in-JS with Tailwind for minimal bundle size

## 🔐 Environment Variables

Create a `.env.local` file if you need environment-specific configuration:

```env
# Example if needed for future integrations
NEXT_PUBLIC_SITE_URL=https://hemvaria.dev
```

## 🤝 Contributing

This is a personal portfolio, but feel free to fork and customize it for your own use!

### Steps to Fork:
1. Click the "Fork" button on GitHub
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/portfolio.git`
3. Make your changes
4. Push to your fork and open a pull request

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Portfolio**: [hemvaria.dev](https://hemvaria.dev)
- **GitHub**: [@HemVaria](https://github.com/HemVaria)
- **LinkedIn**: [Hem Varia](https://linkedin.com/in/hemvaria)
- **Email**: hemvaria007@gmail.com
- **Phone**: +91 820-0487-838

## 💡 What's Inside

This portfolio demonstrates:

- **Frontend Excellence**: Modern React patterns, hooks, and component composition
- **Full-Stack Architecture**: Next.js App Router with TypeScript strict mode
- **UI/UX Design**: Responsive layouts, animations, and accessibility
- **AI/ML Integration**: Showcase of AI projects and machine learning expertise
- **DevOps**: Git workflow, deployment automation, and best practices

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Framer Motion](https://www.framer.com/motion/)
- [shadcn/ui Components](https://ui.shadcn.com/)

## 🙏 Acknowledgments

- Inspired by modern portfolio design trends
- Built with [shadcn/ui](https://ui.shadcn.com/) components
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
- Icons from [Lucide React](https://lucide.dev/)

---

**Made with ❤️ by [Hem Varia](https://github.com/HemVaria)**

Last updated: October 2025
