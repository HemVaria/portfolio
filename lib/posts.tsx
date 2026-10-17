import type { ReactNode } from "react"

export type Post = {
  slug: string
  title: string
  metaTitle: string
  description: string
  keywords: string[]
  date: string
  caseStudy: string
  body: ReactNode
}

export const posts: Post[] = [
  {
    slug: "meta-ads-automation-without-auto-spend",
    title: "How to build a Meta Ads automation that never spends without approval",
    metaTitle: "Meta Ads Automation That Never Auto-Spends | Hem Varia",
    description:
      "How I built Meta Ads automation with Claude Code and the Meta Marketing API: daily reports, recommendations and a builder that makes paused campaigns.",
    keywords: ["Meta Ads automation", "Meta Marketing API", "Claude Code", "ad reporting automation"],
    date: "2026-10-14",
    caseStudy: "meta-ads-automation",
    body: (
      <>
        <p>
          Most people who want to automate Meta ads start with the scary part: letting software create and launch
          campaigns. I think that is backwards. The useful work, and the safe work, is everything before the money
          moves. So when a colleague and I built a Meta Ads automation for a D2C e-commerce brand, we split it into
          three tiers and made one rule that the code cannot break: the tool never spends without a human saying yes.
        </p>
        <p>
          This post walks through how the tiers work, why the campaign builder only creates paused campaigns, and what
          I would change if I built it again.
        </p>

        <h2>The setup: Claude Code skills on the Meta Marketing API</h2>
        <p>
          Everything runs as Claude Code skills. Each skill is a focused set of instructions and scripts that talk to
          the Meta Marketing API and write to Google Sheets. Sheets is not glamorous, but the marketing team already
          lived in it, so reports landed where people would actually read them.
        </p>
        <p>
          We built three tiers, and each tier only gets the permissions it needs.
        </p>

        <h3>Tier 1: daily performance reporting</h3>
        <p>
          The first tier is read only. It pulls campaign, ad set and ad level data from the Marketing API every day and
          writes a clean report to a sheet. This is the tier that earns trust. If the numbers match what the team sees
          in Ads Manager, they start believing the rest of the system. If they do not match, nothing else matters.
        </p>
        <p>
          Later we added a daily email brief routine on top of this, so the summary arrives in the inbox instead of
          waiting in a sheet.
        </p>

        <h3>Tier 2: optimization recommendations</h3>
        <p>
          The second tier reads the same data and writes recommendations: which ads look tired, where budget might move,
          what to test next. It is still read only. It suggests, a person decides. We later turned this into its own
          optimization skill so it could be run on demand, not only as part of the daily report.
        </p>

        <h3>Tier 3: the campaign builder</h3>
        <p>
          The third tier writes. It builds campaigns, ad sets and ads from a brief, including video ads. For video it
          uses ffmpeg to process the files and faster-whisper to produce transcripts. This is the tier where a mistake
          costs money, so it is the tier with the hardest rule.
        </p>

        <h2>Why Tier 3 only creates paused campaigns</h2>
        <p>
          Every campaign the builder creates is paused, with zero spend. There is no flag to turn that off. A person
          opens the campaign, checks the audience, budget and creative, and switches it on.
        </p>
        <p>
          I made this choice for three reasons.
        </p>
        <ul>
          <li>
            <strong>The cost of a mistake is not symmetric.</strong> A report with a wrong number wastes a few minutes.
            A live campaign with a wrong budget or audience spends real money before anyone notices.
          </li>
          <li>
            <strong>Review is fast, setup is slow.</strong> The builder does the slow part: naming, structure, targeting,
            uploading creative. Checking a finished campaign is quick. That is a good trade for the person approving.
          </li>
          <li>
            <strong>Trust grows in steps.</strong> When the team can see every campaign before it runs, they get
            comfortable with the tool. Removing the human from the loop on day one would have killed adoption.
          </li>
        </ul>
        <p>Here is a simplified example of the create call. The important line is the status.</p>
        <pre>
          <code>{`POST /act_<AD_ACCOUNT_ID>/campaigns
{
  "name": "Prospecting | Video",
  "objective": "OUTCOME_SALES",
  "status": "PAUSED",
  "special_ad_categories": []
}

# Ad sets and ads are created with "status": "PAUSED" as well.
# Nothing in the skill ever sends "ACTIVE".`}</code>
        </pre>
        <p>
          The skill sets <code>PAUSED</code> on the campaign, the ad sets and the ads. Even if one level were switched
          on by accident, the others would still hold. Belt and braces is the right amount of caution when the API can
          spend money.
        </p>

        <h2>Making it portable</h2>
        <p>
          A tool that only runs on the laptop of the person who wrote it is a demo. To make this one real, we made it
          multi account and portable. Account IDs and settings live in config, not inside the skills. We wrote an
          onboarding guide that takes a new person from zero to a working first report, and we installed it on a
          colleague&apos;s machine to prove the guide worked.
        </p>
        <p>
          That install was the real test. Every step that only worked because of something on my machine showed up as a
          failure, and we fixed it in the guide or in the code.
        </p>

        <h2>What I learned about ad reporting automation</h2>
        <p>
          The reporting tier looks like the boring part, but it carried the project. It is the tier people used every
          day, and it is what made them willing to try the other two. If you are starting your own Meta Ads automation,
          build the read only report first, make it boringly correct, and put it where the team already looks.
        </p>
        <p>
          Claude Code worked well for this because each tier is a clear, scoped job. A skill with one purpose is easier
          to test and easier to trust than one agent that can do everything.
        </p>

        <h2>What I would change</h2>
        <ul>
          <li>
            Log which recommendations the team accepts or ignores. That signal would make Tier 2 much better over time.
          </li>
          <li>
            Add a single review screen for paused campaigns, so approving one does not require clicking through Ads
            Manager.
          </li>
          <li>Write the onboarding guide first, before the code. It would have caught the portability gaps sooner.</li>
        </ul>
      </>
    ),
  },
  {
    slug: "shopify-shiprocket-automation-cloudflare-worker",
    title: "Automating Shopify and Shiprocket orders with a Cloudflare Worker",
    metaTitle: "Shopify and Shiprocket Automation on Workers | Hem Varia",
    description:
      "Automating Shopify, Shiprocket and Amazon orders with a Cloudflare Worker: order classification, HMAC signed approval links and moving to webhooks.",
    keywords: ["Shopify Shiprocket automation", "Cloudflare Workers cron", "HMAC approval webhook"],
    date: "2026-10-14",
    caseStudy: "ecommerce-order-automation",
    body: (
      <>
        <p>
          A D2C e-commerce brand I worked with sold on Shopify and Amazon and shipped through Shiprocket. Every order
          followed the same path: create the shipment, make the invoice and label, push tracking back to the
          marketplace, email the customer. Doing that by hand across several dashboards is slow and error prone. Doing
          all of it blindly is risky, because some orders need a person to look at them first.
        </p>
        <p>
          I built a Cloudflare Worker that handles the routine orders on its own and asks a human about the rest. This
          post covers how it classifies orders, how the signed approval links work, and why the first version, a daily
          cron job, turned into a webhook.
        </p>

        <h2>The stack</h2>
        <ul>
          <li>
            <strong>Cloudflare Workers</strong> for the logic, with <strong>KV</strong> to keep track of order state.
          </li>
          <li>
            <strong>Shopify</strong> as the main store, and <strong>Amazon</strong> connected through Codisto.
          </li>
          <li>
            <strong>Shiprocket</strong> for shipments, invoices and labels.
          </li>
          <li>
            <strong>Resend</strong> for customer emails.
          </li>
        </ul>
        <p>
          A Worker was a good fit because the job is a lot of small HTTP calls between services. There is no server to
          keep running, and KV is enough for the state each order needs.
        </p>

        <h2>Step 1: classify every order</h2>
        <p>
          The first thing the Worker does is decide what kind of order it is looking at. Each order is classified as
          either <strong>standard</strong> or <strong>cargo</strong>. Standard orders follow a known path, so they can
          ship without a person. Cargo orders need different handling, and those go to a human.
        </p>
        <p>
          Keeping this decision in one place matters. Every later step reads the classification instead of making its
          own guess, so there is exactly one rule to change when the business changes.
        </p>

        <h2>Step 2: ship the standard orders</h2>
        <p>
          For a standard order the Worker creates the shipment in Shiprocket, generates the invoice and label, writes
          tracking back to Amazon through Codisto when the order came from there, and emails the customer through Resend.
          State goes into KV so the Worker never processes the same order twice.
        </p>

        <h2>Step 3: a signed one click approval link</h2>
        <p>
          For orders that need a human, I did not want to build a dashboard with logins and sessions. The operations team
          already lives in email. So the Worker sends an approval email with a single link. Clicking it approves the
          order.
        </p>
        <p>
          The obvious risk is that anyone who can guess the URL could approve an order. The fix is to sign the link. The
          Worker builds an HMAC signature over the order ID and an expiry time using a secret only it knows. When the
          link is clicked, the Worker recomputes the signature and rejects anything that does not match or has expired.
          Here is a simplified sketch of the signing step.
        </p>
        <pre>
          <code>{`async function sign(orderId: string, expires: number, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  )
  const data = new TextEncoder().encode(\`\${orderId}.\${expires}\`)
  const sig = await crypto.subtle.sign("HMAC", key, data)
  return btoa(String.fromCharCode(...new Uint8Array(sig)))
    .replace(/\\+/g, "-").replace(/\\//g, "_").replace(/=+$/, "")
}

// Approval URL: /approve?order=<id>&exp=<unix>&sig=<signature>
// On click: recompute sign(order, exp), compare, check exp > now.`}</code>
        </pre>
        <p>
          This uses the Web Crypto API that Workers ship with, so there is no extra library. The secret lives in a
          Worker secret, never in the code.
        </p>

        <h2>Why KV is enough</h2>
        <p>
          Each order needs only a little state: has it been classified, is it waiting on approval, has it shipped. KV
          stores that as a small record keyed by the order ID. There are no joins and no reports to run on it, so a key
          value store is the right size. If I needed reporting across many orders, I would reach for D1 instead.
        </p>

        <h2>Why the cron job became a webhook</h2>
        <p>
          The first version ran on a Cloudflare Workers cron trigger once a day. It pulled new orders, processed them in a
          batch and sent approval emails. It worked, and it was the simplest thing to get running.
        </p>
        <p>
          The problem is that a daily batch means an order placed just after the run waits most of a day before anything
          happens. For shipping, that delay is the whole point of the automation lost. So I moved it to a webhook
          approach: the order event triggers the Worker, and each order starts its flow when it arrives.
        </p>
        <p>
          Cron was still a good first step. It let me prove the classification and shipping logic on real orders with a
          predictable schedule, and validate it with the operations teammate, before switching to event driven runs.
        </p>

        <h2>If you are building one</h2>
        <ul>
          <li>Write the classification rules first. Everything else depends on them.</li>
          <li>Sign every link that changes state, and give it an expiry.</li>
          <li>Keep API keys and the signing secret in Worker secrets, never in code or KV.</li>
          <li>Make every step safe to run twice, so a retry never creates a second shipment.</li>
        </ul>

        <h2>What is live and what is not</h2>
        <p>
          The standard order flow is live. Cargo orders are not shipped automatically; they still go to a person through
          the approval link. I would rather keep a human on the unusual cases than automate them before the rules are
          clear.
        </p>

        <h2>What I would change</h2>
        <ul>
          <li>Start with webhooks from day one if the platform supports them, and keep cron only as a safety sweep.</li>
          <li>Add a short daily digest of orders still waiting on approval, so nothing sits unnoticed.</li>
          <li>Write the classification rules down with the operations team before writing code, not after.</li>
        </ul>
      </>
    ),
  },
  {
    slug: "vapi-ai-voice-agent-lead-follow-up",
    title: "An AI voice agent that calls your leads in seconds: Vapi, Cloudflare D1 and drip emails",
    metaTitle: "Vapi AI Voice Agent for Lead Follow-up | Hem Varia",
    description:
      "How our team built a Vapi AI sales caller that phones new leads in seconds, logs outcomes to Cloudflare D1 and starts an email drip every 15 minutes.",
    keywords: ["Vapi voice agent", "AI sales caller", "lead follow-up automation", "Cloudflare D1"],
    date: "2026-10-14",
    caseStudy: "ai-voice-sales-agent",
    body: (
      <>
        <p>
          Speed matters with new leads. Someone who just signed up is paying attention now, not tomorrow. A US
          small-business web agency wanted every hot lead called right away, and then followed up with the right email
          based on how the call went. Our team built that with a Vapi voice agent, Cloudflare D1 and a small drip Worker.
          This was a team build; this post is my view of how the pieces fit.
        </p>

        <h2>The flow in one picture</h2>
        <ol>
          <li>A lead signs up and is marked as hot.</li>
          <li>The Vapi voice agent calls them within seconds.</li>
          <li>During the call the agent can use four tools.</li>
          <li>When the call ends, a webhook writes the outcome to Cloudflare D1.</li>
          <li>A drip Worker runs every 15 minutes, reads new outcomes and starts the right email sequence.</li>
        </ol>

        <h2>The voice agent and its four tools</h2>
        <p>
          The agent runs on Vapi, which handles the phone call, speech and the model. What makes it useful is the small
          set of tools it can call while it talks:
        </p>
        <ul>
          <li>
            <strong>Send payment SMS</strong>: text the lead a payment link when they are ready to buy.
          </li>
          <li>
            <strong>Send growth link</strong>: text a link to learn more when they are interested but not ready.
          </li>
          <li>
            <strong>Schedule callback</strong>: book a time to talk again.
          </li>
          <li>
            <strong>Log call outcome</strong>: record what happened so the follow up can match it.
          </li>
        </ul>
        <p>
          Four tools is deliberately few. Each one is a clear next step for the lead. A voice agent with a long list of
          tools spends more of the call deciding what to do, and the outcomes become harder to sort. With four, every call
          ends in a state we can act on.
        </p>

        <h2>Storing outcomes in Cloudflare D1</h2>
        <p>
          When a call ends, Vapi sends a webhook. A Worker receives it and writes the outcome to Cloudflare D1, which is
          SQLite at the edge. That table is the single source of truth for where each lead stands.
        </p>
        <p>
          Keeping outcomes in a database instead of acting on them inside the call was an important split. The voice
          agent only has to record what happened. Deciding what email to send is someone else&apos;s job, and that job
          can change without touching the agent.
        </p>

        <h2>The 15 minute drip Worker</h2>
        <p>
          The follow up runs on a Cloudflare Worker with a cron trigger every 15 minutes. Each run reads outcomes that do
          not have a sequence yet and starts the matching email sequence. The emails themselves use Loops templates. A
          simplified sketch of the setup:
        </p>
        <pre>
          <code>{`# wrangler config for the drip Worker
[triggers]
crons = ["*/15 * * * *"]

[[d1_databases]]
binding = "DB"
database_name = "calls"

-- each run: outcomes with no sequence started yet
SELECT lead_id, outcome
FROM call_outcomes
WHERE sequence_started_at IS NULL;`}</code>
        </pre>
        <p>
          Why every 15 minutes and not instantly? Email follow up does not need to be real time, and a scheduled Worker
          is simple to run and simple to reason about. There is no queue to maintain, and if one run fails the next one
          picks up the same rows.
        </p>

        <h2>Why Cloudflare for the glue</h2>
        <p>
          Everything between the call and the email runs on Cloudflare. The webhook receiver is a Worker, the outcomes
          live in D1 and the drip runs as a scheduled Worker. That keeps the moving parts in one account with one deploy
          tool. There is no server to patch and nothing sitting idle between calls.
        </p>
        <p>
          D1 fits this job because the data is small and relational: a lead, a call, an outcome, a sequence. A plain SQL
          table turns a question like &quot;which leads asked for a callback this week&quot; into one query instead of a
          search through logs.
        </p>

        <h2>The funnel around it</h2>
        <p>
          The voice agent is one part of a bigger lead funnel the team built. It also includes PayPal payments, a website
          audit tool that uses DataForSEO, produces a PDF report and adds AI recommendations, Loops email templates, and a
          security audit. The call is the fast first touch; the rest of the funnel gives the lead something useful to look
          at and a way to pay.
        </p>

        <h2>If you are building one</h2>
        <ol>
          <li>List every way a call can end, and decide what follow up each ending gets.</li>
          <li>Give the agent one tool per next step, and nothing else.</li>
          <li>Store outcomes somewhere your code can query, not only in call transcripts.</li>
          <li>Let a schedule handle the follow up, so the agent never has to remember it.</li>
        </ol>

        <h2>Lessons on lead follow-up automation</h2>
        <ul>
          <li>
            <strong>Fast first contact, calm follow up.</strong> The call happens in seconds. The emails can wait a few
            minutes. Matching the speed to the channel kept the system simple.
          </li>
          <li>
            <strong>Outcomes are the interface.</strong> Once every call ends in a known outcome, every later step is just
            a lookup.
          </li>
          <li>
            <strong>Small tool sets beat clever prompts.</strong> Limiting what the agent can do made its behavior easier
            to predict.
          </li>
        </ul>

        <h2>What I would change</h2>
        <ul>
          <li>Review a sample of calls with the sales team every week and tune the script from what they hear.</li>
          <li>Add a small report on top of D1 so the team can see outcomes by day without querying the database.</li>
          <li>Record which email sequence each outcome triggered, so the drip logic is easy to audit later.</li>
        </ul>
      </>
    ),
  },
]

export const getPost = (slug: string) => posts.find((p) => p.slug === slug)
