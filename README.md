🌐 Frontend

Next.js 14 (App Router) → modern React framework, SSR/SSG for SEO-friendly dashboards.

Tailwind CSS → fast styling.

Shadcn/ui → ready-to-use components (forms, modals, buttons).

Framer Motion → smooth animations.

Recharts / Chart.js → analytics charts.

🗄 Backend

Next.js API Routes (or Server Actions) → keep frontend + backend in one codebase.

Prisma ORM → type-safe database queries + migrations.

PostgreSQL (hosted on Neon.tech, Railway, or Render) → reliable, scalable SQL database.

🔐 Authentication

NextAuth.js (Auth.js v5) → handle email/password, OAuth (Google, Twitter, LinkedIn, etc.).

Stores sessions and accounts in PostgreSQL.

💳 Payments

Stripe → subscriptions, tiered pricing (Free, Pro, Agency).

Webhooks → update subscription status in PostgreSQL.

📩 Emails / Notifications

Resend (super clean Next.js integration) → transactional emails (weekly reports, welcome emails).

Alternative: Nodemailer + SMTP if you want fully self-managed.

⚙️ Background Jobs (for fetching social media data daily)

Vercel Cron Jobs → if you stay on Vercel.

Or BullMQ + Upstash Redis → if you need more control.

☁️ Infrastructure

Frontend/Backend Hosting: Vercel (best fit for Next.js).

Database Hosting: Neon.tech / Railway (Postgres hosting).

File Storage (if needed): UploadThing, Cloudinary, or AWS S3.