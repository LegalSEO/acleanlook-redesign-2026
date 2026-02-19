# A Clean Look — Chicago Painters Website

A modern, high-performance website for **A Clean Look** — a Chicago painting contractor with 30+ years of experience serving Chicago and North Shore suburbs.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3.4
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod validation
- **Email:** Resend
- **Icons:** Lucide React
- **Deployment:** Vercel

## Features

### 85 Pages
- Homepage with animated stats, testimonial carousel, before/after sliders
- 6 service detail pages with FAQ, pricing, and JSON-LD structured data
- 44 neighborhood/suburb service area pages with dynamic content
- 6 blog posts with related posts and category filtering
- 3 lead magnet ebook landing pages with email capture
- Gallery with lightbox and before/after comparison
- Reviews page with aggregate ratings

### 4 Interactive Tools
- **Paint Estimate Calculator** — Multi-step wizard with Chicago market pricing
- **Room Color Visualizer** — Template rooms + photo upload with canvas flood fill
- **Seasonal Home Maintenance Planner** — Month-by-month Chicago-specific timeline
- **AI Color Palette Generator** — Mood/keyword-based palette creation with color harmony algorithms

### SEO & Performance
- JSON-LD structured data (LocalBusiness, WebSite, Service, Article, FAQ, Breadcrumb)
- Dynamic sitemap and robots.txt
- OG image generation (edge runtime)
- Google Analytics 4 integration with event tracking
- Old WordPress URL redirects (301 permanent)
- Security headers (X-Frame-Options, CSP, etc.)

### Conversion Optimization
- Floating mobile CTA bar (Call Now + Free Estimate)
- Exit-intent popup with 10% off coupon (desktop, session-based)
- Sticky estimate bar on service pages
- Internal cross-linking between services, tools, and blog

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 ID (e.g., G-XXXXXXXXXX) | No |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps API key for embedded maps | No |
| `RESEND_API_KEY` | Resend API key for email delivery | Yes (for forms) |
| `CONTACT_EMAIL` | Email address for form submissions | Yes |
| `NEXT_PUBLIC_SITE_URL` | Production URL for canonical/OG | Yes |

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repo to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy — Vercel auto-builds on push to `main`

### Environment Variables for Vercel Dashboard

Add these in **Settings > Environment Variables**:
- `RESEND_API_KEY`
- `CONTACT_EMAIL`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- `NEXT_PUBLIC_SITE_URL`

### Domain Setup

Point `acleanlook.com` DNS to Vercel or configure custom nameservers.

## Project Structure

```
app/
├── layout.tsx              # Root layout (fonts, SEO, analytics, JSON-LD)
├── page.tsx                # Homepage
├── about/                  # About page
├── services/               # Services hub + 6 detail pages
├── areas/                  # Areas hub + 44 neighborhood pages
├── gallery/                # Project gallery with lightbox
├── reviews/                # Reviews + ratings
├── blog/                   # Blog hub + 6 posts
├── tools/                  # Tools hub + 4 interactive tools
├── resources/              # 3 ebook landing pages
├── contact/                # Contact page
├── free-estimate/          # High-conversion estimate form
├── privacy/                # Privacy policy
├── terms/                  # Terms of service
├── api/                    # API routes (contact, estimate, OG, etc.)
├── sitemap.ts              # Dynamic sitemap
├── robots.ts               # Robots.txt
├── not-found.tsx            # Custom 404
├── loading.tsx              # Loading skeleton
└── error.tsx                # Error boundary

components/
├── layout/                 # Header, Footer, LayoutShell, MobileCTA
├── sections/               # ServicePageTemplate, EbookLandingPage
├── tools/                  # Calculator, Visualizer, Planner, Generator
└── shared/                 # GoogleAnalytics, ExitIntentPopup, StickyEstimateBar

lib/
├── constants.ts            # Business info, services, areas
├── utils.ts                # Utility functions (cn, formatPhone)
├── seo.ts                  # JSON-LD schema generators
├── pricing.ts              # Chicago market pricing calculations
├── color-utils.ts          # Color harmony algorithms
└── blog.ts                 # Blog post system

data/
├── services.tsx            # Service page content
├── areas.ts                # 44 neighborhood entries
├── colors.ts               # 80+ paint colors
├── gallery.ts              # Gallery projects
├── testimonials.ts         # Customer reviews
└── seasonal-tasks.ts       # Monthly maintenance tasks
```

## Business Info

- **Phone:** (773) 419-1718
- **Email:** steve@acleanlook.com
- **Address:** 5444 N. La Crosse Ave, Chicago, IL 60630
- **Website:** [acleanlook.com](https://acleanlook.com)
