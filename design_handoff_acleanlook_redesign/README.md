# Handoff: A Clean Look — Site Redesign

## Overview

A complete editorial redesign of acleanlook.com — a 30-year-old Chicago painting business (Steve, est. 1994). The redesign moves the site away from generic-trades-website language ("five-star reviews! free quotes!") toward the voice and visual quality of a publication: large serif display type, paper-toned palette, generous whitespace, careful information density, restrained motion.

This bundle contains three production-ready design references that establish the full visual system:

1. **Homepage** — sets the typography, palette, components, and rhythm
2. **Service page (Interior Painting)** — template for all 6 services
3. **Area page (Lincoln Park)** — template for all 16 neighborhoods

Once these three templates are implemented, the remaining ~30 pages on the site (other services, other areas, about/reviews/privacy/terms, tools, blog, resources) are mechanical applications of the same components.

## About the Design Files

The files in `prototypes/` are **design references created in HTML/CSS/React** — they show intended look and behavior, not production code to copy directly. Your task is to **recreate these designs in the existing Next.js 14 / TypeScript / Tailwind codebase** at `acleanlook.com`, using its established patterns:

- App Router (`app/` directory)
- Server components by default; `'use client'` only where needed (FAQ accordion, interactive map, etc.)
- Tailwind CSS for styling — port the design tokens below into `tailwind.config.ts`
- `framer-motion` for any animations (already a dependency — see existing `ServicePageTemplate.tsx`)
- `lucide-react` for icons
- Existing data files in `data/services.tsx`, `data/areas.ts`, `data/testimonials.ts` are the source of truth — do not duplicate copy in components

Do **not** ship the prototype HTML directly. Do **not** import the prototype CSS into the real site. The prototypes are a spec.

## Fidelity

**High-fidelity.** Final colors, typography, spacing, border treatments, and interactions are all intentional. Match them precisely. Where the prototypes use placeholder house images (`HousePlaceholder` with diagonal stripes), substitute real photography from the existing `public/images/` library.

---

## Design Tokens

Add these to `tailwind.config.ts` under `theme.extend`:

### Color
```ts
colors: {
  paper:        '#f7f2e8',  // base background
  'paper-2':    '#efe9dd',  // alt section bg
  'paper-3':    '#e6dfd0',  // tertiary
  ink:          '#1a1d24',  // primary text, dark CTAs, dark sections
  'ink-soft':   '#4a4d56',  // secondary text
  rule:         '#d8cfb9',  // strong dividers, table borders
  'rule-soft':  '#e8e0cb',  // soft dividers
  accent:       '#b9842b',  // ochre — italic display words, CTAs hover, accents
  'accent-soft':'#e9d6a8',  // accent on dark backgrounds
}
```

### Type
```ts
fontFamily: {
  display: ['Fraunces', 'Cormorant Garamond', 'Georgia', 'serif'],
  body:    ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
  mono:    ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
}
```

Load via `next/font/google`:
- **Fraunces** — wghts 400, 500, 600; italic 400, 500. Used for ALL headings (`h1`–`h3`), large numerals, pull-quotes. Always `font-weight: 400` for hero titles; italics carry the accent color.
- **Inter** — wghts 400, 500, 600, 700. Used for body, navigation, buttons, labels.
- **JetBrains Mono** — wghts 400, 500. Used for eyebrows, section numbers (`§ 01`), kicker labels, color codes (`HC-154`), tabular meta, monospace tags.

### Type Scale
| Token | Size | Use |
|-------|------|-----|
| `acl-h1` | `clamp(44px, 7vw, 96px)` | Hero titles. `line-height: 0.95`, `letter-spacing: -0.025em`, `text-wrap: balance`. Three-line stacked, with one line italic + accent color. |
| `acl-h2` | `clamp(30px, 4.4vw, 54px)` | Section headings. `line-height: 1.0`, `letter-spacing: -0.02em`. |
| Section number | `12px` mono, accent color, uppercase, letterspacing 0.06em | "§ 01", "§ 02" |
| Eyebrow | `12px` Inter 500, uppercase, letterspacing 0.18em, ink-soft | With flanking 60–80px hairlines |
| Lede | `clamp(16px, 1.4vw, 19px)`, `line-height: 1.55`, ink-soft, `max-width: 56ch` | Standfirst paragraphs |
| Body | `16.5px`, `line-height: 1.7`, ink, `max-width: 64ch` | Long-form prose |

### Spacing & Rhythm
- **Section padding:** 80–100px vertical
- **Section dividers:** 1px `rule-soft` borders between sections; alternating `paper` / `paper-2` backgrounds
- **Container:** `max-width: 1400px`, `padding: 0 32px`. Add a `.shell` utility.
- **Grid gutter:** 22–24px for cards, 64–80px for editorial column gaps
- **Border radius:** **0px everywhere.** This is intentional. No rounded corners on cards, buttons, inputs, or images. The only exceptions are dot indicators (`border-radius: 50%`).

### Borders & Rules
- `1px solid var(--rule)` for table-style content (pricing, demand)
- `1px solid var(--rule-soft)` for section dividers
- `1px solid var(--ink)` for the strong top/bottom rules around pricing tables
- All grids and cards: render as a **bordered grid** (top + left on parent, right + bottom on each cell) — see `.acl-services__grid` pattern in `prototypes/styles.css`

### Buttons
- All buttons: `padding: 14px 22px`, `font-size: 14px`, `font-weight: 600`, `border-radius: 0`, `border: 1px solid`
- `.btn-ink` — ink bg, paper text. Hover: bg becomes accent, transform `translateY(-1px)`, shadow `0 10px 30px -12px rgba(26,29,36,0.4)`
- `.btn-ghost` — transparent bg, ink border. Hover: fills with ink
- `.btn-paper` — paper bg, ink text (used on dark sections)
- Sizes: `.btn-lg` adds 4px padding vertically; `.btn-sm` reduces

### Motion
- Hover transitions: `0.2–0.25s ease`
- FAQ accordion expand: `grid-template-rows: 0fr → 1fr` over `0.35s ease`
- Map pin pulse: 2.6s ease-out infinite (see `aclpinpulse` keyframe)
- Top-bar dot pulse: 2.4s ease-in-out infinite
- Sticky CTA bar: slide-up entrance over 0.4s
- **No fancy scroll-triggered animations.** The page should feel like a quiet magazine, not a tech demo.

---

## Templates & Sections

### Template 1: Homepage (`prototypes/A Clean Look - Homepage.html`)

Sections, in order:
1. **TopBar** — Ink-colored strip with status pill ("Booking spring 2026 exteriors") and phone/email
2. **Header** — Sticky, blurred-paper background, logo (3-bar mark + wordmark + "Painters · Chicago · Est. 1994" tagline), nav, phone, ink CTA
3. **Hero** — Three-line stacked title ("Painters who / show up — / and clean up."), lede, dual CTAs, 4-stat strip (Years, Projects, Insurance, Response), captioned hero image plate, color-swatch rail
4. **Press/credentials ticker** — Horizontal scrolling marquee of credentials/awards
5. **Services grid** — 3×2 bordered grid of 6 service cards, each with mono number, title, blurb, "Read more" link
6. **Process** — 5-step Roman-numeral list with detailed copy
7. **Featured project** — Editorial split layout, full-bleed image plate + caption + project metadata
8. **Areas** — 2-column list of Chicago neighborhoods + North Shore towns with directional indicators
9. **Reviews** — Pull-quote treatment with attribution
10. **Resources / Tools** — Card grid linking to estimator, color visualizer, planner, guide
11. **Estimate CTA** — Ink-dark section with form prompt
12. **Footer** — Multi-column with logo, services, areas, contact

**Implementation note:** Build each as its own server component under `components/sections/home/`. Lift any text already living in `data/` (testimonials, services, areas) — never duplicate.

### Template 2: Service Page (`prototypes/A Clean Look - Interior Painting.html`)

This is the template for all 6 service pages. Build one `<ServicePageTemplate>` (the existing one already exists at `components/sections/ServicePageTemplate.tsx` — replace it) that takes the existing `ServicePageData` shape and renders:

1. **Crumbs** — Home / Services / [Title]
2. **Hero** — Service number ("№ 01"), kicker ("Service"), three-line title with one italic+accent line, lede, dual CTAs, 4-stat strip (Typical room / Whole home / Warranty / Brand), captioned hero plate
3. **Body copy + finishes block** — Two-column: rail with section number + h2 / prose with finish-recommendation card (left-bordered with accent)
4. **Features grid** — 3×2 bordered grid of 6 features, each with two-digit number, title, blurb
5. **Sample boards** *(interior only)* — Rotated 6-up rail of color swatches with BM color codes (`HC-154`, `OC-117`, etc.)
6. **Process** — 5-step Roman-numeral list (reused from homepage)
7. **Pricing table** — Strong-bordered editorial table: Scope / Low / High / Notes columns. Mobile collapses to 2-col. Disclaimer paragraph below with accent left border.
8. **FAQ accordion** — Numbered questions, click to expand. Caret rotates 180° + colors accent on open. Animation via `grid-template-rows`.
9. **Estimate CTA** — Ink-dark band
10. **Related services** — 3-up cards linking to other services
11. **Sticky bottom bar** *(client component)* — Fixed bottom CTA with phone + estimate button. Hide on mobile when partial info.

Add a `SAMPLE_BOARDS` field to `ServicePageData` for the interior-painting sample-boards section. Other services skip that section.

### Template 3: Area Page (`prototypes/A Clean Look - Lincoln Park.html`)

Template for all 16 neighborhood pages. Build `<AreaPageTemplate>` consuming an extended `AreaData` shape:

```ts
type AreaLocalContext = {
  yearsServed: number
  projectsCompleted: number
  blurb: string                 // 2-3 sentence neighborhood-specific intro
  whatTheseHomesNeed: { t: string; d: string }[]   // 5 items
  recentProjects: { addr: string; scope: string; color: string; season: string }[]   // 4 items
  serviceLines: { svc: string; demand: 'very high'|'high'|'moderate'; note: string }[]  // 6 items
  testimonial: { text: string; author: string; cred: string }
  nearby: { slug: string; name: string; n: string; dist: string }[]   // 4 items
  faqs: { q: string; a: string }[]   // 4 items
}
```

Sections:
1. **Crumbs** — Home / Areas / [Name]
2. **Hero** — Same structure as service hero, but stats are local: "Serving since 1994 / 412+ Lincoln Park projects / 31 years / <24h response"
3. **Neighborhood map** *(client component)* — Stylized CSS map with grid streets, lake/river bands, animated pulsing pin for primary recent project, secondary pins for others, legend card. **For production, replace the CSS map with a real map** — use Mapbox or a static map image with React-rendered pin overlays. The current CSS map is an editorial illustration, not a real geographic map.
4. **What these homes need** — 5-item numbered list of locally-specific patterns (heritage trim, lakefront moisture, coach houses, etc.). This is the section that makes the page feel local — copy must be neighborhood-specific.
5. **Recently in [Area]** — 4-up project card grid with season eyebrow, address, scope, color spec
6. **Service demand table** — Strong-bordered table: Service / Demand (4-dot indicator) / Note / Read link. Mobile collapses to 1-col.
7. **Local testimonial** — Large oversized quote mark (180px Fraunces italic accent color), italic display body, author + cred footer
8. **FAQ accordion** — Same component as service page, area-specific questions
9. **Estimate CTA** — Same dark band, copy mentions area name
10. **Nearby areas** — 4-up cards with mono distance label
11. **Sticky bottom bar** — Same component

The task for Steve / the content team: write a `localContext` block per area (~20 minutes per neighborhood). The component renders identically for all 16.

---

## Components to Build (Reusable)

Build these once, reuse across templates. Suggested locations:

```
components/
  layout/
    TopBar.tsx
    Header.tsx                 // sticky, blurred bg
    Footer.tsx
    Breadcrumb.tsx
    StickyEstimateBar.tsx      // 'use client'
  ui/
    Button.tsx                 // variants: ink, ghost, paper. sizes: sm, default, lg
    Eyebrow.tsx                // mono uppercase with flanking rules
    SectionHead.tsx            // section number + h2, with optional aside ("split" variant)
    HousePlaceholder.tsx       // dev-only; replace with <Image> in prod
  sections/
    Hero.tsx                   // composable hero shell — title slot, lede slot, ctas, stats, plate
    FAQAccordion.tsx           // 'use client'
    EstimateStrip.tsx          // dark band CTA
    RelatedGrid.tsx            // 3-up or 4-up card grid
  service/
    ServiceHero.tsx
    ServiceFeaturesGrid.tsx
    SampleBoardsRail.tsx
    PricingTable.tsx
    FinishesBlock.tsx
  area/
    AreaHero.tsx
    NeighborhoodMap.tsx        // 'use client' if interactive
    HouseProfileList.tsx
    LocalProjectsGrid.tsx
    ServiceDemandTable.tsx
    LocalQuote.tsx
```

---

## Interactions & Behavior

- **FAQ accordion:** Click question → toggle open. One open at a time (state in parent). CSS animation via `grid-template-rows`. Caret rotates 180°, colors shift to accent.
- **Sticky bar:** Always visible after scroll past hero. Phone link is `tel:` href. Hides on small mobile (only the CTA button shows).
- **Header:** Backdrop-filter blur. Underline animation on nav links via `::after` scaleX.
- **Service/area cards:** Hover → background shift to `paper-2`, subtle `translateY(-3px)` + shadow.
- **Map pins:** Primary pin has pulsing ring (2.6s ease-out infinite). Secondary pins are smaller dark dots.
- **Sample boards:** Cards rotate slightly (-1deg / +0.8deg / -0.4deg alternating). Hover → straighten + lift.
- **Top bar status dot:** Continuous pulse, 2.4s ease-in-out.

---

## Responsive Behavior

- All grids collapse 3-col → 2-col at `880px`, 2-col → 1-col at `560px`
- Hero plates stack below copy at `980px`
- Pricing table → 2-col at `720px`, with scope/note spanning full width
- FAQ caret column fixed; question text wraps
- Sticky bar: hide sub-text and phone label below `600px` — keep only CTA button
- Map: keep aspect ratio `5:3`, legend stacks below at `880px`

---

## Files in This Bundle

```
prototypes/
  A Clean Look - Homepage.html         // template 1
  A Clean Look - Interior Painting.html // template 2
  A Clean Look - Lincoln Park.html     // template 3
  styles.css                           // base tokens + shared components
  service-page.css                     // service-page additions
  area-page.css                        // area-page additions
  app.jsx                              // homepage React tree
  service-page.jsx                     // service-page React tree
  area-page.jsx                        // area-page React tree
  tweaks-panel.jsx                     // design-tool only — ignore for production
```

To run the prototypes locally: open the `.html` files in a browser. They depend on `unpkg.com` CDN for React/Babel.

**Ignore `tweaks-panel.jsx`** — it's a design-time tool that lets the user toggle accent color and section visibility. Not for production.

---

## Build Order (recommended)

1. **Tailwind tokens + global CSS** (1–2 hours) — paper/ink/accent colors, font loading, `text-wrap: balance` defaults, 0-radius reset
2. **Shared layout** (3–4 hours) — TopBar, Header, Footer, Breadcrumb, Button, Eyebrow, SectionHead
3. **Homepage** (1–2 days) — port section by section
4. **Service page template** (1 day) — replace existing `ServicePageTemplate.tsx`. All 6 service routes work immediately.
5. **Area page template** (1–2 days) — including the map component decision (real map vs. illustrative)
6. **Content backfill** — Steve writes `localContext` for the other 15 areas; write `SAMPLE_BOARDS` data for non-interior services
7. **Remaining pages** (about, reviews, contact, free-estimate, privacy, terms, 404, tools, blog, resources) — apply the established components, no new visual decisions

Total estimated effort: **5–8 dev days** for the three templates + shared system. Remaining pages should compose entirely from existing components.

---

## Open Questions for Designer (Steve / project lead)

- [ ] Real photography library — confirm `public/images/` has hero-quality photos for each service and several neighborhoods. If not, commission or use the placeholder pattern in development.
- [ ] Map decision — Mapbox (interactive, costs $), static map images (free, looks good), or keep the editorial CSS illustration (cheapest, most distinctive)?
- [ ] Content audit for area pages — Steve to write the 5-item "what these homes need" + 4 recent projects per neighborhood
- [ ] Sample boards — confirm BM color codes are accurate or get from Steve's actual product
- [ ] Press/credentials ticker — what credentials/awards/certifications go in there?

---

## Voice & Tone Notes (Important)

The redesign deliberately moves away from generic trades-website voice. **Don't let copy regress when you fill in placeholder text.**

- Avoid: "five-star service", "your trusted local painter", "satisfaction guaranteed", emoji
- Prefer: specific facts, block-level addresses (not full addresses), exact paint codes, dollar ranges, dates
- Headings: declarative, often italic + accent on the key word ("Painters who *show up* — and clean up.")
- Lede: 2–3 sentences, conversational, no jargon
- FAQs: full sentences, no bullet lists hiding inside answers, written as if Steve is talking
