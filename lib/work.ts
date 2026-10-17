export type Status = "live" | "built and tested" | "in development" | "team build"

export type FlowStep = { kind: "trigger" | "step" | "approval" | "output"; label: string; detail: string }

export type CaseStudy = {
  slug: string
  title: string
  h1: string
  metaTitle: string
  description: string
  summary: string
  card: string
  status: Status
  role: "Solo" | "Team build"
  stack: string[]
  problem: string
  built: string[]
  flow: FlowStep[]
  decisions: { title: string; body: string }[]
  result: string[]
  next: string[]
  relatedWork: string[]
  relatedPost?: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "meta-ads-automation",
    title: "Performance Marketing Automation",
    h1: "Meta Ads automation that reports, recommends and never spends without approval",
    metaTitle: "Meta Ads Automation with Claude Code | Hem Varia",
    description:
      "Case study: Claude Code skills on the Meta Marketing API for daily ad reporting, optimization ideas and a campaign builder that waits for human approval.",
    summary:
      "Claude Code skills on the Meta Marketing API that report on ads daily, suggest optimizations and build campaigns that stay paused until a person approves them.",
    card: "Daily Meta Ads reports, optimization ideas and a campaign builder that never spends without approval.",
    status: "built and tested",
    role: "Team build",
    stack: ["Claude Code", "Meta Marketing API", "Google Sheets", "ffmpeg", "faster-whisper"],
    problem:
      "A D2C e-commerce brand ran its Meta ads by hand: pulling numbers from Ads Manager, deciding what to change and building each campaign in the UI. That work repeats every day and is easy to get wrong. The brand wanted help with all three jobs without giving software the power to spend money on its own.",
    built: [
      "Tier 1: a daily performance report that pulls campaign data from the Meta Marketing API into Google Sheets.",
      "Tier 2: optimization recommendations based on that data, written for a person to review.",
      "Tier 3: a campaign builder that always creates campaigns paused with zero spend, so a human approves before any money moves.",
      "Video ad support in the builder, using ffmpeg for processing and faster-whisper for transcripts.",
      "Multi-account setup with an onboarding guide, installed and running on a colleague's machine.",
      "Later additions: a dedicated optimization skill and a daily email brief routine.",
    ],
    flow: [
      { kind: "trigger", label: "Daily run", detail: "A Claude Code skill starts the reporting routine" },
      { kind: "step", label: "Pull data", detail: "Meta Marketing API to Google Sheets" },
      { kind: "step", label: "Recommend", detail: "Optimization ideas for a person to read" },
      { kind: "step", label: "Build campaign", detail: "Created paused, zero spend" },
      { kind: "approval", label: "Human approval", detail: "A person reviews and turns it on" },
      { kind: "output", label: "Live campaign", detail: "Money moves only after approval" },
    ],
    decisions: [
      {
        title: "Paused by default, every time",
        body: "The builder could have launched campaigns directly. I ruled that out. A wrong budget or audience costs real money within hours, so the tool does the slow setup work and a person makes the one decision that spends.",
      },
      {
        title: "Tiers instead of one big agent",
        body: "Reporting, recommendations and building are separate skills. Each tier is useful on its own, and the team can trust the read only tiers before ever touching the one that writes.",
      },
      {
        title: "Portable from day one",
        body: "Account details live in config, not in the skills, and the setup has an onboarding guide. That is what made it possible to install it on a colleague's machine and hand it over.",
      },
    ],
    result: [
      "The team gets a daily performance report and a daily email brief without opening Ads Manager.",
      "New campaigns, including video ads, are built by the tool and wait in a paused state for review.",
      "The system works across multiple ad accounts and has been handed over to the team that uses it.",
    ],
    next: [
      "Track which recommendations the team accepts, so the optimization skill learns what is useful.",
      "Add a simple approval view so reviewing a paused campaign takes one screen.",
    ],
    relatedWork: ["content-seo-automation", "ecommerce-order-automation"],
    relatedPost: "meta-ads-automation-without-auto-spend",
  },
  {
    slug: "ecommerce-order-automation",
    title: "E-commerce Order and Shipping Automation",
    h1: "Shopify, Shiprocket and Amazon order automation on a Cloudflare Worker",
    metaTitle: "Shopify and Shiprocket Order Automation | Hem Varia",
    description:
      "Case study: a Cloudflare Worker that classifies orders, creates shipments, sends signed approval links and writes tracking back to Amazon.",
    summary:
      "A Cloudflare Worker that sorts incoming orders, creates shipments, asks a person to approve the unusual ones and keeps every channel updated.",
    card: "A Cloudflare Worker that ships standard orders on its own and asks a human about the rest.",
    status: "live",
    role: "Solo",
    stack: ["Cloudflare Workers", "Cloudflare KV", "Shopify", "Shiprocket", "Resend"],
    problem:
      "A D2C e-commerce brand sold on Shopify and Amazon and shipped through Shiprocket. Every order needed the same steps across several dashboards: create the shipment, generate the invoice and label, update tracking and email the customer. Some orders need a person to look at them first, so full automation without a check was not an option.",
    built: [
      "A Cloudflare Worker that classifies each order as standard or cargo.",
      "Automatic shipment creation in Shiprocket for orders that are safe to ship.",
      "A signed (HMAC) one click approval link, sent to the operations team for orders that need a human.",
      "Tracking written back to Amazon through Codisto, plus invoice and label generation.",
      "Customer emails sent through Resend, with state kept in Cloudflare KV.",
      "A move from a daily cron job to a webhook approach, validated with the operations teammate.",
    ],
    flow: [
      { kind: "trigger", label: "New order", detail: "Shopify or Amazon (via Codisto)" },
      { kind: "step", label: "Classify", detail: "Standard or cargo" },
      { kind: "approval", label: "Signed approval link", detail: "HMAC link for orders that need a human" },
      { kind: "step", label: "Create shipment", detail: "Shiprocket, invoice and label" },
      { kind: "output", label: "Updates sent", detail: "Tracking to Amazon, email via Resend" },
    ],
    decisions: [
      {
        title: "Signed links instead of a login",
        body: "Approvers click one link from their inbox. The link carries an HMAC signature, so the Worker can trust it without building a dashboard or user accounts.",
      },
      {
        title: "From daily cron to webhooks",
        body: "The first version ran once a day, which meant orders waited for the next run. Moving to webhooks lets each order start its flow when it arrives.",
      },
      {
        title: "Only standard orders run unattended",
        body: "Standard orders follow a known path, so they ship on their own. Anything outside that path goes to a person. Cargo orders are not shipped automatically.",
      },
    ],
    result: [
      "The standard order flow is live: shipments, invoices, labels, tracking and customer emails happen without manual steps.",
      "Orders that need a decision reach the operations team as a single signed approval link.",
    ],
    next: [
      "Add a daily summary of orders that are waiting on approval.",
      "Extend automatic shipping to cargo orders once the rules for them are settled with the operations team.",
    ],
    relatedWork: ["meta-ads-automation", "ai-voice-sales-agent"],
    relatedPost: "shopify-shiprocket-automation-cloudflare-worker",
  },
  {
    slug: "ai-voice-sales-agent",
    title: "AI Sales Voice Agent and Lead Funnel",
    h1: "An AI voice agent that calls new leads in seconds, plus the funnel around it",
    metaTitle: "AI Voice Agent for Lead Follow-up with Vapi | Hem Varia",
    description:
      "Case study: a Vapi voice agent that calls hot leads within seconds of signup, logs outcomes to Cloudflare D1 and triggers the right email drip.",
    summary:
      "A Vapi voice agent that calls hot leads within seconds of signup, logs what happened and starts the matching email sequence.",
    card: "A Vapi voice agent that calls new leads in seconds and starts the right follow-up emails.",
    status: "live",
    role: "Team build",
    stack: ["Vapi", "Cloudflare Workers", "Cloudflare D1", "Loops", "PayPal"],
    problem:
      "A US small-business web agency got signups from people who were ready to talk, but follow up depended on someone being free to call. Leads cool off fast. The agency wanted every hot lead called right away and followed up with the right message based on how the call went.",
    built: [
      "A Vapi voice agent that calls hot leads within seconds of signup.",
      "Four tools the agent can use during a call: send a payment SMS, send a growth link, schedule a callback and log the call outcome.",
      "A webhook that writes each call outcome to Cloudflare D1.",
      "A Cloudflare drip Worker that runs every 15 minutes and starts the right email sequence for each outcome.",
      "The wider funnel it sits in: PayPal payments, a website audit tool (DataForSEO, a PDF report and AI recommendations), Loops email templates and a security audit.",
    ],
    flow: [
      { kind: "trigger", label: "Lead signs up", detail: "Hot lead enters the funnel" },
      { kind: "step", label: "Voice call", detail: "Vapi agent calls within seconds" },
      { kind: "step", label: "Agent tools", detail: "Payment SMS, growth link, callback, log" },
      { kind: "step", label: "Store outcome", detail: "Webhook writes to Cloudflare D1" },
      { kind: "output", label: "Email drip", detail: "Worker every 15 minutes starts the sequence" },
    ],
    decisions: [
      {
        title: "Small set of tools",
        body: "The agent has four tools and nothing else. Each one maps to a clear next step for the lead, which keeps calls focused and makes outcomes easy to log.",
      },
      {
        title: "Outcomes in a database, not in the call",
        body: "The call only records what happened. A separate Worker reads D1 and decides which emails to send. That keeps the voice agent simple and lets the email logic change without touching it.",
      },
      {
        title: "A 15 minute drip loop",
        body: "A scheduled Worker every 15 minutes is simple to run on Cloudflare and fast enough for email follow up, without a queue to maintain.",
      },
    ],
    result: [
      "The voice agent is live and calls hot leads within seconds of signup.",
      "Every call outcome is stored, and the matching email sequence starts on its own.",
      "The agent is one part of a live funnel that also takes payments and runs website audits.",
    ],
    next: [
      "Review call outcomes with the sales team to tune the agent's script.",
      "Show the D1 outcome data in a small report so the team can see the funnel at a glance.",
    ],
    relatedWork: ["ecommerce-order-automation", "content-seo-automation"],
    relatedPost: "vapi-ai-voice-agent-lead-follow-up",
  },
  {
    slug: "content-seo-automation",
    title: "Content and SEO Automation Engine",
    h1: "A content and SEO automation engine on Cloudflare and Claude",
    metaTitle: "Content and SEO Automation on Cloudflare | Hem Varia",
    description:
      "Case study: automated blog publishing on Cloudflare Cron Workers, an open source SEO research stack and an 800+ post migration from Wix.",
    summary:
      "Blog automation on Cloudflare Cron Workers, an SEO research stack built on open source tools, an 800+ post migration and faster websites.",
    card: "Automated blog publishing, SEO research tooling and an 800+ post migration off Wix.",
    status: "built and tested",
    role: "Solo",
    stack: ["Cloudflare Workers", "Claude", "GitHub Actions", "DataForSEO", "Search Console"],
    problem:
      "A marketing team needed a steady flow of posts, keyword and backlink research, and fast websites, with a small team to do it. Content work is slow by hand, and paid SEO suites are expensive for a team that only needs part of what they offer.",
    built: [
      "Blog automation: trend and judgment based post generation on Cloudflare Cron Workers, then a daily Claude routine that publishes editorial posts.",
      "A GitHub Actions workflow that merges the generated posts on its own.",
      "A Substack pipeline that generates a podcast, a newsletter and a cover image. It is in testing and not live yet.",
      "An SEO research stack: OpenSEO (open source) with the DataForSEO API for keywords, backlinks and domain overview, plus Google Search Console. Tested on a company site.",
      "A migration of 800+ blog posts from Wix to a new framework on Cloudflare for a legal-tech publisher.",
      "Website performance work that raised PageSpeed lab scores on two company sites.",
    ],
    flow: [
      { kind: "trigger", label: "Cron Worker", detail: "Scheduled run on Cloudflare" },
      { kind: "step", label: "Generate", detail: "Trend and judgment based drafts" },
      { kind: "step", label: "Daily routine", detail: "Claude publishes editorial posts" },
      { kind: "step", label: "Merge", detail: "GitHub Actions self merge" },
      { kind: "output", label: "Published post", detail: "Live on the site" },
    ],
    decisions: [
      {
        title: "Open source SEO tooling",
        body: "OpenSEO with the DataForSEO API covers keyword research, backlinks and domain overview. The team pays for API calls it makes instead of a full SEO suite seat.",
      },
      {
        title: "Git as the publishing path",
        body: "Posts land as commits and merge through GitHub Actions. Every post has history, and a bad post can be reverted like any other change.",
      },
      {
        title: "Lab scores, stated as lab scores",
        body: "Lighthouse results vary from run to run, so I report them as lab scores and treat them as direction, not a promise.",
      },
    ],
    result: [
      "Blog posts are generated and published on a schedule, with a daily editorial routine.",
      "800+ posts now live on the new framework on Cloudflare instead of Wix.",
      "PageSpeed lab scores: mobile from 70 to 99 and desktop to 100 on one company site; mobile from 55 to 75 and desktop to 85 on another.",
      "The team has a working SEO research stack for keywords, backlinks and domain overviews.",
    ],
    next: [
      "Take the Substack pipeline from testing to live.",
      "Feed Search Console data back into topic selection for the blog automation.",
    ],
    relatedWork: ["meta-ads-automation", "hr-automation-platform"],
  },
  {
    slug: "hr-automation-platform",
    title: "HR Automation Platform",
    h1: "An HR automation platform for onboarding, offboarding and buddy assignment",
    metaTitle: "HR Onboarding Automation Platform | Hem Varia",
    description:
      "Case study: an HR platform with preboarding forms, onboarding and offboarding task automation and buddy assignment through Microsoft Graph and Teams.",
    summary:
      "An HR platform that runs preboarding, onboarding and offboarding tasks, assigns buddies through Microsoft Teams and helps HR write faster with AI.",
    card: "Preboarding, onboarding and offboarding automation with buddy assignment through Microsoft Teams.",
    status: "in development",
    role: "Team build",
    stack: ["Microsoft Graph", "PostgreSQL", "Cloudflare", "Azure", "AI assist"],
    problem:
      "Onboarding and offboarding involve the same checklist every time: forms, welcome material, task lists and introductions. When it lives in emails and spreadsheets, steps get missed and new hires wait. HR wanted one place that runs the checklist.",
    built: [
      "A preboarding form and a welcome guide for new hires.",
      "Onboarding and offboarding task automation.",
      "Buddy assignment by email using Microsoft Graph and Teams through an Azure app.",
      "An employee management UI.",
      "AI assist to rewrite text and fetch details automatically.",
      "A Postgres database, Cloudflare deployment and security guardrails.",
    ],
    flow: [
      { kind: "trigger", label: "New hire added", detail: "HR creates the employee record" },
      { kind: "step", label: "Preboarding", detail: "Form and welcome guide" },
      { kind: "step", label: "Onboarding tasks", detail: "Checklist runs automatically" },
      { kind: "step", label: "Buddy assignment", detail: "Email via Microsoft Graph and Teams" },
      { kind: "output", label: "Employee ready", detail: "Offboarding runs the same way at exit" },
    ],
    decisions: [
      {
        title: "Use the tools the company already has",
        body: "Buddy assignment goes through Microsoft Graph and Teams, where people already work, instead of a new notification channel.",
      },
      {
        title: "AI as an assist, not an owner",
        body: "AI rewrites and fills in details, but HR reviews and sends. People data is too sensitive for a model to act on alone.",
      },
    ],
    result: [
      "The platform is in development with teammates. Preboarding, task automation, buddy assignment and the employee UI are being built on a Postgres and Cloudflare stack with security guardrails.",
    ],
    next: ["Finish the build and run a first onboarding end to end with HR.", "Add reminders for tasks that stall."],
    relatedWork: ["content-seo-automation", "revtrack-gst-invoicing"],
  },
  {
    slug: "revtrack-gst-invoicing",
    title: "RevTrack",
    h1: "RevTrack: GST invoicing and revenue management for Indian SMBs",
    metaTitle: "RevTrack GST Invoicing SaaS Case Study | Hem Varia",
    description:
      "Case study: RevTrack, a team-built Next.js SaaS for GST-compliant invoicing, expenses, inventory and revenue with GSTR-ready exports.",
    summary:
      "A team-built SaaS for Indian SMBs that handles GST-compliant invoicing, expenses, inventory and revenue, live at revtrack.in.",
    card: "GST-compliant invoicing, expenses and inventory for Indian SMBs, live at revtrack.in.",
    status: "live",
    role: "Team build",
    stack: ["Next.js", "GST", "RBAC"],
    problem:
      "Small businesses in India need GST-compliant invoices and returns-ready data, but many still track sales, expenses and stock in separate sheets. That makes filing slow and mistakes common.",
    built: [
      "My part: I helped with the UI and the deployment.",
      "GST-compliant invoicing.",
      "Expense tracking, inventory and revenue management in one app.",
      "GSTR-ready exports for filing.",
      "Role-based access control for teams.",
      "Built with Next.js as a team.",
    ],
    flow: [
      { kind: "trigger", label: "Sale or expense", detail: "Entered by a team member" },
      { kind: "step", label: "GST invoice", detail: "Compliant invoice created" },
      { kind: "step", label: "Books updated", detail: "Revenue, expenses and inventory" },
      { kind: "output", label: "GSTR-ready export", detail: "Data ready for filing" },
    ],
    decisions: [
      {
        title: "One app for the whole cycle",
        body: "Invoices, expenses and inventory share one data model, so the GSTR export comes from the same records the business works in every day.",
      },
      {
        title: "Roles from the start",
        body: "Role-based access control means an owner, an accountant and staff can each see only what they need.",
      },
    ],
    result: ["RevTrack is live at revtrack.in."],
    next: ["Add more export formats as filing needs change."],
    relatedWork: ["hr-automation-platform", "ecommerce-order-automation"],
  },
]

export const otherBuilds = [
  {
    title: "AICEK",
    line: "TypeScript CLI on npm that scores Claude Code and Cursor configs from 0 to 100.",
    href: "https://github.com/HemVaria/aicek",
  },
  {
    title: "Text Switch",
    line: "Rust desktop text expander. In development.",
  },
  {
    title: "AI Video Editing and Captioning Tool",
    line: "Programmatic video editing and multimodal captioning.",
    href: "https://github.com/HemVaria/AI-Multimodal-Video-Captioning-Tool",
  },
  {
    title: "Ride Rescue",
    line: "Roadside assistance app connecting drivers with mechanics.",
    href: "https://github.com/HemVaria/Ride-rescue-updated",
  },
  {
    title: "IMS",
    line: "Agency management system with 12 roles.",
    href: "https://github.com/HemVaria/Ims",
  },
]

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug)
