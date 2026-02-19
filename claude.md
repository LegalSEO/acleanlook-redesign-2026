CLAUDE.md — A Clean Look Chicago Painters Website
Project Overview
A modern, high-performance website for A Clean Look — a Chicago painting contractor with 30+ years of experience serving Chicago and North Shore suburbs. This is a complete rebuild of their existing WordPress site (acleanlook.com) into a Next.js application deployed on Vercel.
Business: A Clean Look
Phone: (773) 419-1718
Address: 5444 N. La Crosse Ave, Chicago, IL
Owner/Lead: Steve
Years in Business: 30+
Service Area: Chicago proper + North Shore suburbs (Evanston, Wilmette, Winnetka, Kenilworth, Glencoe, Highland Park, Lake Forest, Northbrook, Glenview, Skokie, Lincolnwood, Park Ridge, Niles, Morton Grove, Des Plaines)

Tech Stack

Framework: Next.js 14+ (App Router)
Language: TypeScript
Styling: Tailwind CSS 4
UI Components: shadcn/ui
Animations: Framer Motion
Forms: React Hook Form + Zod validation
Email: Resend (or Nodemailer) for form submissions
Maps: Google Maps API or Mapbox
Analytics: Google Analytics 4 + Google Tag Manager
Deployment: Vercel
Version Control: GitHub (managed via GitHub Desktop)
CMS (optional future): Sanity or Contentlayer for blog posts
Image Optimization: Next.js Image component + Cloudinary or Vercel OG


Brand Identity
Colors

Primary: Deep Navy Blue #1B365D (trust, professionalism)
Secondary: Clean White #FFFFFF (cleanliness, fresh start)
Accent: Vibrant Gold/Amber #D4A843 (premium quality, warmth)
CTA: Bold Orange #E8630A (urgency, action)
Success Green: #2D8A4E (for form confirmations)
Background Light: #F8F9FA
Background Warm: #FFF9F0
Text Primary: #1A1A2E
Text Secondary: #4A5568

Typography

Headings: Inter or Montserrat (bold, clean)
Body: Inter or Open Sans
Accent/Quotes: Playfair Display (for testimonials)

Brand Voice

Professional but approachable
Confident, not boastful — "30 years of trust" messaging
Chicago-proud — reference neighborhoods, local landmarks
Emphasis on cleanliness, reliability, attention to detail
Tagline candidates: "Chicago's Trusted Painting Professionals Since 1994" or "Transforming Chicago Homes, One Brushstroke at a Time"


Site Architecture
/                           → Homepage (hero, services overview, social proof, CTA)
/about                      → About (story, team, values, 30+ years)
/services                   → Services hub page
  /services/interior-painting    → Interior painting detail
  /services/exterior-painting    → Exterior painting detail
  /services/commercial-painting  → Commercial painting
  /services/power-washing        → Power washing services
  /services/gutter-cleaning      → Gutter cleaning services
  /services/handyman             → General handyman / home improvement
/areas                      → Service areas hub with interactive map
  /areas/[neighborhood]     → Dynamic pages per neighborhood/suburb
/gallery                    → Project gallery with before/after
/reviews                    → Testimonials + review links
/blog                       → Blog / resources hub
  /blog/[slug]              → Individual blog posts
/tools                      → Interactive tools hub
  /tools/paint-estimator    → Painting cost estimate calculator
  /tools/color-visualizer   → Room color visualizer tool
  /tools/seasonal-planner   → Chicago seasonal home maintenance planner
  /tools/color-palette      → AI color palette generator
/resources                  → Lead magnet / ebook landing pages
  /resources/chicago-homeowner-guide    → Ebook: Chicago homeowner guide
  /resources/paint-color-guide          → Ebook: Paint color selection guide
  /resources/home-maintenance-checklist → Ebook: Seasonal maintenance checklist
/contact                    → Contact + free estimate form
/free-estimate              → Dedicated estimate landing page (high-conversion)
/privacy                    → Privacy policy
/terms                      → Terms of service

Key Pages & Features
Homepage

Full-width hero with video background or high-quality image of Chicago skyline/homes
Animated stats counter (30+ years, 1000+ projects, 5-star rating)
Services grid with icons and hover effects
Before/After image slider component
Testimonials carousel
Service area map preview
Trust badges (insured, licensed, BBB, Benjamin Moore)
Prominent CTA: "Get Your Free Estimate" sticky bar
Recent blog posts preview
Lead magnet banner for ebook downloads

Interactive Tools (DIFFERENTIATORS)
1. Paint Estimate Calculator (/tools/paint-estimator)

Multi-step form wizard
Room-by-room input (dimensions, ceiling height, doors/windows)
Surface condition selector (good/fair/poor — affects prep cost)
Paint quality tier selection (good/better/best)
Interior vs exterior toggle
Outputs itemized estimate range based on Chicago market rates
Email capture: "Get your detailed estimate PDF sent to your inbox"
Data from project research: $1.60–$3.33/sqft interior, $2.10–$3.25/sqft exterior

2. Room Color Visualizer (/tools/color-visualizer)

Upload a photo of your room OR choose from template rooms
Color picker with popular paint brand palettes (Benjamin Moore, Sherwin-Williams)
Apply color to walls in the photo using canvas manipulation
Side-by-side comparison mode (before/after with different colors)
Save and share color schemes
"Love this color? Book a free estimate" CTA
Implementation: HTML5 Canvas + color detection algorithms for wall segmentation

3. Chicago Seasonal Home Maintenance Planner (/tools/seasonal-planner)

Interactive calendar/timeline for Chicago homeowners
Month-by-month maintenance tasks tailored to Chicago weather
Painting-season indicators (best months for exterior work: May–October)
Gutter cleaning reminders (spring + fall)
Power washing scheduling
Email reminder signup integration
Downloadable PDF calendar

4. AI Color Palette Generator (/tools/color-palette)

User describes room mood, style preferences, or uploads inspiration image
Generates complementary color palettes
Shows palette applied to room mockups
Links to specific paint brand color codes
Share palette functionality

Lead Magnets (Ebook Landing Pages)
Ebook 1: "The Chicago Homeowner's Complete Guide to Exterior Painting"

When to paint (Chicago seasonal timing)
How to choose contractors
Cost expectations
Prep requirements for Chicago weather
Paint selection for Midwest climate

Ebook 2: "2025 Chicago Paint Color Trends & Selection Guide"

Trending colors for Chicago homes
Color psychology for each room
North Shore vs city style differences
How to test colors properly

Ebook 3: "The Seasonal Home Maintenance Checklist for Chicago Homeowners"

Month-by-month maintenance schedule
Painting, power washing, gutter cleaning timing
Winter prep, spring refresh guides
Cost budgeting worksheet

Free Estimate Page (High-Conversion Landing Page)

Minimal navigation (reduce exit points)
Social proof sidebar (reviews, badges)
Multi-step estimate form:

Service type (painting/power washing/gutters/handyman)
Property type (residential/commercial)
Project scope (rooms, sqft, interior/exterior)
Timeline (ASAP, within month, flexible)
Contact info


Calendar integration for scheduling consultations
Phone number click-to-call prominent
"Average response time: under 2 hours" badge


SEO Strategy
Target Keywords (embed naturally in content)

"Chicago painters" / "Chicago painting contractors"
"house painters Chicago" / "house painting Chicago"
"interior painting Chicago" / "exterior painting Chicago"
"commercial painters Chicago"
"power washing Chicago"
"gutter cleaning Chicago"
"painters near me Chicago"
"North Shore painters" / "painters [suburb name]"
"best painters in Chicago"
"painting estimate Chicago"

Technical SEO

Next.js metadata API for all pages
JSON-LD structured data (LocalBusiness, Service, Review, FAQs)
Auto-generated sitemap.xml
robots.txt
OpenGraph + Twitter Card images
Canonical URLs
Breadcrumb navigation
Internal linking strategy between service pages and area pages

Local SEO

Google Business Profile optimization content
NAP consistency (Name, Address, Phone)
Service area pages with unique content per neighborhood
Embedded Google Maps on contact/areas pages
Schema markup for each service area


Component Library
Shared Components

<Header /> — Sticky nav with mega menu, phone CTA, mobile hamburger
<Footer /> — Links, contact info, social, areas served, trust badges
<Hero /> — Reusable hero with variants (home, service, landing)
<CTABanner /> — Floating/sticky estimate CTA
<TestimonialCarousel /> — Auto-rotating reviews
<BeforeAfter /> — Image comparison slider
<ServiceCard /> — Icon + title + description + link
<StatCounter /> — Animated number counter on scroll
<TrustBadges /> — Insurance, license, BBB, brand logos
<LeadMagnetBanner /> — Ebook download with email capture
<EstimateForm /> — Multi-step form wizard
<FAQAccordion /> — Expandable Q&A sections
<AreaMap /> — Interactive service area map
<BlogCard /> — Post preview card
<GalleryGrid /> — Masonry grid for project photos
<ContactInfo /> — Reusable contact block

Tool Components

<EstimateCalculator /> — Multi-step paint cost calculator
<ColorVisualizer /> — Canvas-based room color tool
<SeasonalPlanner /> — Interactive maintenance timeline
<PaletteGenerator /> — Color palette creation tool


Performance Targets

Lighthouse Score: 95+ across all categories
First Contentful Paint: < 1.5s
Largest Contentful Paint: < 2.5s
Cumulative Layout Shift: < 0.1
Time to Interactive: < 3.5s
Core Web Vitals: All green


Development Phases
Phase 1: Foundation (Prompts 1–3)

Project setup, design system, layout components
Homepage, About, Contact pages
Free estimate form with email integration

Phase 2: Service Pages & Content (Prompts 4–6)

All service detail pages
Service areas hub + neighborhood pages
Gallery and reviews pages

Phase 3: Interactive Tools (Prompts 7–10)

Paint estimate calculator
Room color visualizer
Seasonal planner
AI color palette generator

Phase 4: Lead Magnets & Blog (Prompts 11–13)

Ebook landing pages with email capture
Blog infrastructure
Initial blog posts (5–10 SEO-optimized articles)

Phase 5: SEO & Polish (Prompts 14–15)

Structured data / JSON-LD across all pages
Sitemap, robots.txt, meta optimization
Performance audit and optimization
Accessibility audit (WCAG 2.1 AA)
Final QA and Vercel deployment configuration


Environment Variables Required
env# .env.local
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
RESEND_API_KEY=
CONTACT_EMAIL=steve@acleanlook.com
NEXT_PUBLIC_SITE_URL=https://acleanlook.com

Deployment Notes

Hosting: Vercel (connected to GitHub repo)
Domain: acleanlook.com (transfer DNS to Vercel or use custom nameservers)
Branch Strategy: main → production, dev → preview deployments
CI: Vercel auto-deploys on push to main
Image CDN: Vercel Image Optimization or Cloudinary


File Structure
acleanlook/
├── app/
│   ├── layout.tsx              # Root layout with Header/Footer
│   ├── page.tsx                # Homepage
│   ├── about/page.tsx
│   ├── services/
│   │   ├── page.tsx            # Services hub
│   │   ├── interior-painting/page.tsx
│   │   ├── exterior-painting/page.tsx
│   │   ├── commercial-painting/page.tsx
│   │   ├── power-washing/page.tsx
│   │   ├── gutter-cleaning/page.tsx
│   │   └── handyman/page.tsx
│   ├── areas/
│   │   ├── page.tsx            # Areas hub with map
│   │   └── [neighborhood]/page.tsx
│   ├── gallery/page.tsx
│   ├── reviews/page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── tools/
│   │   ├── page.tsx            # Tools hub
│   │   ├── paint-estimator/page.tsx
│   │   ├── color-visualizer/page.tsx
│   │   ├── seasonal-planner/page.tsx
│   │   └── color-palette/page.tsx
│   ├── resources/
│   │   ├── chicago-homeowner-guide/page.tsx
│   │   ├── paint-color-guide/page.tsx
│   │   └── home-maintenance-checklist/page.tsx
│   ├── contact/page.tsx
│   ├── free-estimate/page.tsx
│   ├── privacy/page.tsx
│   └── terms/page.tsx
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── layout/                 # Header, Footer, Nav
│   ├── sections/               # Page sections (Hero, CTA, etc.)
│   ├── tools/                  # Calculator, Visualizer, etc.
│   └── shared/                 # Reusable components
├── lib/
│   ├── constants.ts            # Business info, pricing data
│   ├── utils.ts                # Utility functions
│   ├── seo.ts                  # SEO helpers, structured data
│   └── email.ts                # Email sending logic
├── data/
│   ├── services.ts             # Service page content
│   ├── areas.ts                # Neighborhood data
│   ├── testimonials.ts         # Review data
│   ├── blog/                   # MDX blog posts
│   └── pricing.ts              # Chicago market pricing data
├── public/
│   ├── images/
│   ├── icons/
│   └── downloads/              # Ebook PDFs
├── styles/
│   └── globals.css
├── CLAUDE.md                   # This file
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── .env.local

Chicago Market Pricing Data (for Calculator)
Source: Research data from early 2025
ServiceUnitLowAverageHighInterior paintingper sqft$1.60$2.47$3.33Interior paintingper hour$31.60$42.60$53.60Single roomflat$400$640$900Full interiorflat$3,500$5,814$8,000Exterior paintingper sqft$2.10$2.68$3.25Full exteriorflat$4,612$7,224$9,836Texture paintingper sqft$3.00$4.50$6.00Faux paintingper sqft$2.24$3.36$4.48Paint removalper sqft$3.25$3.38$3.50Color consultationflat fee$46.00$50.50$55.00Specialty/muralsper hour$60.00$90.00$120.00Power washingper sqft$0.15$0.35$0.75Gutter cleaningper linear ft$1.00$1.75$2.50

Key Business Differentiators to Highlight

30+ years in Chicago — longevity = trust
Full-service — painting + power washing + gutters + handyman (one call does it all)
Chicago weather expertise — knows what products and timing work for Midwest climate
Free estimates — easy, no-obligation
Both residential & commercial — versatile
North Shore coverage — premium suburb market
Insured & reliable — fully covered, on-time
Interactive online tools — estimate calculator, color visualizer (competitors don't have these)
Educational resources — free ebooks position as authority
Benjamin Moore quality paints — brand partnership/preference