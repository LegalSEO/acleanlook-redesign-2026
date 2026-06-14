export type FinishItem   = { name: string; use: string }
export type FeatureItem  = { t: string; d: string }
export type ProcessStep  = { n: string; t: string; d: string }
export type PricingRow   = { rng: string; lo: string; hi: string; note: string }
export type FaqItem      = { q: string; a: string }
export type SampleColor  = { c: string; n: string; code: string }
export type RelatedSvc   = { slug: string; title: string; n: string }

export type ServiceData = {
  slug: string
  number: string
  title: string
  kicker: string
  titleLines: string[]
  accentLine: number
  lede: string
  heroLabel: string
  heroCaption: string
  specs: { dt: string; dd: string }[]
  body: string[]
  finishes?: FinishItem[]
  features: FeatureItem[]
  showSamples?: boolean
  samples?: SampleColor[]
  process: ProcessStep[]
  pricing: PricingRow[]
  pricingNote: string
  faqs: FaqItem[]
  related: RelatedSvc[]
}

export const SERVICES_EDITORIAL: Record<string, ServiceData> = {

  'interior-painting': {
    slug: 'interior-painting',
    number: '01',
    title: 'Interior Painting',
    kicker: 'Service',
    titleLines: ['Interior', 'painting,', 'done quietly.'],
    accentLine: 1,
    lede: 'From a single accent wall to a whole-home refresh — careful prep, premium paints, and trim work that earns the second coat.',
    heroLabel: 'HERO · Living room repaint, Lakeview — Hale Navy + Simply White trim',
    heroCaption: 'Interior repaint completed November 2025. Three coats Benjamin Moore Regal Select in Hale Navy on the accent wall, Simply White on trim, Linen White ceiling.',
    specs: [
      { dt: 'Typical room', dd: '1 day on site' },
      { dt: 'Whole home', dd: '3–5 days' },
      { dt: 'Warranty', dd: '2 years, written' },
      { dt: 'Brand', dd: 'Benjamin Moore' },
    ],
    body: [
      'A fresh coat of paint is the most cost-effective change you can make to a room. Done well, it reads as a small renovation. Done poorly, it shows in three months.',
      'We treat prep as the job, not the prelude. Furniture is moved and covered. Drop cloths down. Holes patched, cracks caulked, edges sanded, primer where the old surface needs it. Two-thirds of a great paint job happens before the first coat.',
      'Our standard finish is Benjamin Moore Aura or Regal — flat for ceilings, eggshell for living rooms, satin in kitchens and baths, semi-gloss on trim. We bring sample boards to your home so you can see how the color reads in your morning, afternoon, and evening light.',
    ],
    finishes: [
      { name: 'Flat',       use: 'Ceilings, low-traffic' },
      { name: 'Matte',      use: 'Bedrooms, formal rooms' },
      { name: 'Eggshell',   use: 'Living rooms, hallways' },
      { name: 'Satin',      use: 'Kitchens, baths, kids’ rooms' },
      { name: 'Semi-gloss', use: 'Trim, doors, cabinets' },
    ],
    features: [
      { t: 'Thorough surface prep',   d: 'Patch, sand, caulk, prime. We don’t paint over problems — we fix them first.' },
      { t: 'Color consultation',       d: 'Free with every estimate. Steve brings sample boards painted with the actual product.' },
      { t: 'Premium paints',           d: 'Benjamin Moore Aura, Regal, and Advance. Low-VOC, washable, true color.' },
      { t: 'Razor-sharp lines',        d: 'Cut-in by hand, taped where it matters. No bleeding ceilings, no fuzzy trim.' },
      { t: 'Furniture protection',     d: 'We move and cover. Floors are draped wall-to-wall. Outlets, fixtures, and baseboards taped off.' },
      { t: 'Walk-out punch list',      d: 'Final inspection together. Anything you flag is addressed within the same week.' },
    ],
    showSamples: true,
    samples: [
      { c: '#1f2d3d', n: 'Hale Navy',     code: 'HC-154' },
      { c: '#efe9dd', n: 'Simply White',   code: 'OC-117' },
      { c: '#3a4a3e', n: 'Forest Green',   code: '2047-10' },
      { c: '#9aa098', n: 'Cromwell Gray',  code: 'HC-103' },
      { c: '#5b3a4a', n: 'Caponata',       code: 'AF-650' },
      { c: '#ece4cf', n: 'Linen White',    code: '912' },
    ],
    process: [
      { n: 'I',   t: 'Free in-home estimate',  d: 'Steve visits, measures, photographs. You’ll have a written quote within 48 hours — itemized, not lump-sum.' },
      { n: 'II',  t: 'Color & finish',          d: 'Sample boards delivered to your home. Live with them for a week. Pick what works in your light, not in paint-store fluorescents.' },
      { n: 'III', t: 'Prep & protect',          d: 'Furniture moved, floors covered, surfaces patched, sanded, caulked, primed. Day one is almost always prep.' },
      { n: 'IV',  t: 'Paint',                   d: 'Two coats minimum, three on bold or red colors. Cut-in by hand, rolled in even sections, no spray indoors.' },
      { n: 'V',   t: 'Cleanup & walk-out',      d: 'Furniture replaced, fixtures put back, floors vacuumed. We walk every room with you before we leave.' },
    ],
    pricing: [
      { rng: 'Single room',         lo: '$400',   hi: '$900',   note: 'Average ~$640 · 1 day on site' },
      { rng: 'Per square foot',     lo: '$1.60',  hi: '$3.33',  note: 'Includes labor & premium paint' },
      { rng: 'Per hour',            lo: '$31.60', hi: '$53.60', note: 'For small repairs, touch-ups' },
      { rng: 'Whole-home interior', lo: '$3,500', hi: '$8,000', note: 'Average ~$5,814 · 3–5 days' },
    ],
    pricingNote: 'Real numbers from Chicago interior projects we completed in 2024–25. Final pricing depends on ceiling height, surface condition, number of colors, and paint tier. Every estimate is itemized — you’ll see the breakdown line by line.',
    faqs: [
      { q: 'How long does interior painting take?', a: 'A single room is usually one day. A 3–4 bedroom home runs 3–5 days, depending on prep work and number of colors. We’ll give you a day-by-day schedule with the estimate.' },
      { q: 'What paints do you use?', a: 'Benjamin Moore is our default — Aura for high-traffic, Regal for general interior, Advance for trim and cabinets. We’re happy to spec Sherwin-Williams Emerald, Farrow & Ball, or whatever you’ve fallen for.' },
      { q: 'Do you move furniture?', a: 'Yes — we move and cover everything that fits. Pianos, large entertainment centers, and wall-mounted items requiring a stud finder we ask you to handle in advance. Drop cloths cover the rest.' },
      { q: 'Will I need to leave the house?', a: 'No. We use low-VOC paints and keep good ventilation. We work room by room so most of the home stays usable. Pets and kids are fine — just keep them out of active rooms.' },
      { q: 'How do I choose the color?', a: 'Free color consultation comes with every estimate. We deliver large painted sample boards — not chips — so you can see them in your actual light at 7am, 2pm, and 8pm before committing.' },
      { q: 'What’s the warranty?', a: 'Two-year workmanship warranty in writing. If a coat fails for any reason that’s our fault — peeling, cracking, finish issues — we come back and fix it. No charge, no argument.' },
    ],
    related: [
      { slug: 'exterior-painting',   title: 'Exterior Painting', n: '02' },
      { slug: 'commercial-painting', title: 'Commercial Painting', n: '03' },
      { slug: 'handyman',            title: 'Handyman', n: '06' },
    ],
  },

  'exterior-painting': {
    slug: 'exterior-painting',
    number: '02',
    title: 'Exterior Painting',
    kicker: 'Service',
    titleLines: ['Exterior', 'coats,', 'built to last.'],
    accentLine: 1,
    lede: 'Chicago weather is tough on paint. We use the right products, the right timing, and the right prep to make a finish that survives a Midwest winter.',
    heroLabel: 'HERO · Two-flat, Logan Square — exterior repaint, Hale Navy + bone trim',
    heroCaption: 'Exterior repaint completed October 2025. Three coats Aura Exterior in Hale Navy over Benjamin Moore primer; trim in Simply White.',
    specs: [
      { dt: 'Small jobs', dd: '1–2 days' },
      { dt: 'Full exterior', dd: '3–5 days' },
      { dt: 'Warranty', dd: '5 years, written' },
      { dt: 'Brand', dd: 'Aura Exterior' },
    ],
    body: [
      'Exterior paint in Chicago takes a beating — freeze-thaw cycles, harsh UV, moisture. Cheap paint or bad prep fails in two seasons. Good prep and the right product can last a decade.',
      'We pressure-wash first. Then scrape, sand, caulk every gap, and prime any bare wood or previously painted metal. We don’t skip this. It’s how a house can go ten years without needing work again.',
      'We time exterior jobs for the window: above 50°F, below 90°F, no rain for 24 hours after. In Chicago that’s typically May through October, with the sweet spots in May–June and September.',
    ],
    finishes: [
      { name: 'Flat',       use: 'Siding, low-gloss look' },
      { name: 'Satin',      use: 'Siding, easier to clean' },
      { name: 'Semi-gloss', use: 'Trim, fascia, doors' },
      { name: 'Gloss',      use: 'Front door, accent accents' },
      { name: 'Primer',     use: 'All bare wood & metal' },
    ],
    features: [
      { t: 'Power wash first',        d: 'All surfaces cleaned before anything else. Mold, chalk, and loose paint removed.' },
      { t: 'Full surface prep',       d: 'Scrape, sand, caulk, prime. Every crack sealed before we open a can of topcoat.' },
      { t: 'Timing by weather',       d: 'We schedule around Chicago’s windows: above 50°F, dry, and out of direct afternoon sun.' },
      { t: 'Aura Exterior paint',     d: 'Benjamin Moore’s best exterior formula. Self-priming, moisture-resistant, won’t chalk or fade.' },
      { t: 'Trim included',           d: 'Soffits, fascia, gutters, shutters, and window trim done as part of any exterior quote.' },
      { t: '5-year warranty',         d: 'Longer than our interior warranty because the product and prep warrant it. In writing.' },
    ],
    process: [
      { n: 'I',   t: 'Estimate & scope',   d: 'We measure the entire envelope, note surface conditions, photograph problem areas. Written quote in 48 hours.' },
      { n: 'II',  t: 'Power wash & dry',   d: 'Minimum 24-hour dry time after washing before any scraping or paint goes on.' },
      { n: 'III', t: 'Prep',               d: 'Scrape loose paint, sand rough edges, caulk every gap at trim, window, and door frames.' },
      { n: 'IV',  t: 'Prime',              d: 'All bare wood, repaired spots, and any previously-painted metal get a coat of exterior primer.' },
      { n: 'V',   t: 'Paint',              d: 'Two coats of Aura Exterior minimum. Brush and roll on most surfaces; no airless spray unless the site permits overspray management.' },
    ],
    pricing: [
      { rng: 'Per square foot', lo: '$2.10',  hi: '$3.25',  note: 'Labor & premium paint included' },
      { rng: 'Average home',    lo: '$4,612', hi: '$9,836', note: 'Average ~$7,224' },
      { rng: 'Power wash only', lo: '$0.15',  hi: '$0.75',  note: 'Per sq ft; often bundled with paint' },
      { rng: 'Deck refinish',   lo: '$1,200', hi: '$3,500', note: 'Depending on size and condition' },
    ],
    pricingNote: 'Exterior pricing depends heavily on surface condition, number of stories, and amount of trim. Rotted wood, failed caulking, and peeling paint add prep time. Every estimate is itemized so you can see exactly what you’re paying for.',
    faqs: [
      { q: 'When is the best time to paint exterior in Chicago?', a: 'May through October is the safe window. We prefer May–June before the humidity spikes and September when temps are ideal and rain is less frequent.' },
      { q: 'Do you paint in cooler weather?', a: 'Down to 50°F with Aura Exterior, which has a lower temperature threshold than most paints. Below that, the film doesn’t form properly and we won’t apply it.' },
      { q: 'How long does exterior paint last?', a: 'With proper prep and Aura Exterior, expect 7–10 years on siding and 5–7 on trim. We warrant the workmanship for 5 years in writing.' },
      { q: 'Do I need to be home?', a: 'Not necessarily. We need access to the exterior only. You can leave us a gate code or key for the backyard. We’ll check in at start and finish.' },
      { q: 'What if you find rot or damage?', a: 'We flag it before we start and show you photos. Minor repairs (caulking, small wood fills) are included. Significant rot is handled by our handyman crew at an additional quoted rate.' },
      { q: 'Do you paint gutters and shutters?', a: 'Yes — both are included in an exterior quote. Gutters get cleaned and painted or left natural depending on your preference.' },
    ],
    related: [
      { slug: 'interior-painting', title: 'Interior Painting', n: '01' },
      { slug: 'power-washing',     title: 'Power Washing', n: '04' },
      { slug: 'gutter-cleaning',   title: 'Gutter Cleaning', n: '05' },
    ],
  },

  'commercial-painting': {
    slug: 'commercial-painting',
    number: '03',
    title: 'Commercial Painting',
    kicker: 'Service',
    titleLines: ['Commercial', 'spaces,', 'repainted right.'],
    accentLine: 1,
    lede: 'Offices, retail, multi-unit, and industrial — we work around your schedule and have the crew to do it without disrupting your operation.',
    heroLabel: 'HERO · Office repaint, West Loop — full suite, Simply White + Wrought Iron trim',
    heroCaption: 'Commercial office repaint completed March 2025. 4,200 sq ft in a single weekend, no business disruption. Benjamin Moore Aura in Simply White throughout.',
    specs: [
      { dt: 'Weekend jobs', dd: 'Available' },
      { dt: 'Crew size', dd: '2–8 painters' },
      { dt: 'Warranty', dd: '1 year, written' },
      { dt: 'Brand', dd: 'Benjamin Moore' },
    ],
    body: [
      'Commercial jobs are logistics problems as much as painting problems. We’ve painted offices, lobbies, restaurants, retail stores, and multi-unit buildings — always with an eye on minimizing disruption to your business or tenants.',
      'We offer weekend and overnight scheduling so your team walks in Monday morning to fresh paint. For larger jobs we stage sections to keep most of the space operational.',
      'We carry the insurance commercial landlords require — $2 million general liability, workers’ comp for all crew. Certificates of insurance issued within 24 hours of request.',
    ],
    features: [
      { t: 'Off-hours scheduling',   d: 'Evenings, weekends, and overnight shifts available. No business interruption required.' },
      { t: 'Scalable crew',          d: 'Two painters for a single office, up to eight for large floors or multi-unit buildings.' },
      { t: 'Insurance certificates', d: '$2M general liability + workers’ comp. COIs issued within 24 hours for landlord requirements.' },
      { t: 'Low-VOC paints',         d: 'Benjamin Moore Natura and Aura for occupied spaces. Low odor, fast dry, safe for next-day return.' },
      { t: 'Epoxy floors',           d: 'We handle concrete floor coatings for warehouses, garages, and utility spaces.' },
      { t: 'Multi-unit buildings',   d: 'Hallways, lobbies, stairwells — staged to keep the building accessible throughout the job.' },
    ],
    process: [
      { n: 'I',   t: 'Site walkthrough',   d: 'We assess the space, note surface conditions, and plan staging to minimize disruption. Quote within 48 hours.' },
      { n: 'II',  t: 'Schedule planning',  d: 'We work around your calendar. Identify which areas can be done during business hours vs. off-hours.' },
      { n: 'III', t: 'Prep',               d: 'Move or cover furniture and equipment. Patch, sand, prime. No paint on unprepared surfaces.' },
      { n: 'IV',  t: 'Paint',              d: 'Crew size matched to deadline. Two coats minimum. We leave no lap marks, no uncut edges.' },
      { n: 'V',   t: 'Clean & hand off',   d: 'Full cleanup before handoff. Walk-through with your facilities or property manager.' },
    ],
    pricing: [
      { rng: 'Small office suite',  lo: '$1,800',  hi: '$4,500',  note: 'Up to 2,000 sq ft interior' },
      { rng: 'Full floor',          lo: '$4,000',  hi: '$12,000', note: 'Depends on condition & finish' },
      { rng: 'Multi-unit hallways', lo: '$800',    hi: '$3,000',  note: 'Per floor, per building' },
      { rng: 'Per square foot',     lo: '$1.60',   hi: '$3.33',   note: 'Interior; exterior rates differ' },
    ],
    pricingNote: 'Commercial pricing varies significantly based on square footage, ceiling height, surface condition, and scheduling requirements (off-hours work adds a premium). Every estimate is itemized with a clear breakdown.',
    faqs: [
      { q: 'Can you work on weekends or overnight?', a: 'Yes. We regularly schedule commercial jobs over weekends and overnight to avoid business disruption. There is a modest scheduling premium for off-hours work.' },
      { q: 'How big a crew can you field?', a: 'Up to eight painters for large commercial jobs. For multi-unit buildings we stage by floor and maintain a crew of 2–4 per active section.' },
      { q: 'Do you carry commercial insurance?', a: '$2 million general liability and workers’ compensation for all crew members. Certificates of insurance issued within 24 hours of request.' },
      { q: 'Can you paint occupied spaces?', a: 'Yes, using Benjamin Moore Natura — our lowest-VOC product. Tenants can return within 2–4 hours. We coordinate room-by-room to keep disruption minimal.' },
      { q: 'Do you do exterior commercial work?', a: 'Yes. Office buildings, retail storefronts, restaurant exteriors, and warehouse exteriors. Same prep standards as residential exterior.' },
      { q: 'What’s the warranty on commercial work?', a: 'One year on commercial work (vs. two years residential interior). Product warranties from Benjamin Moore apply on top of our workmanship warranty.' },
    ],
    related: [
      { slug: 'interior-painting', title: 'Interior Painting', n: '01' },
      { slug: 'exterior-painting', title: 'Exterior Painting', n: '02' },
      { slug: 'power-washing',     title: 'Power Washing', n: '04' },
    ],
  },

  'power-washing': {
    slug: 'power-washing',
    number: '04',
    title: 'Power Washing',
    kicker: 'Service',
    titleLines: ['A season', 'of grime,', 'gone in a day.'],
    accentLine: 1,
    lede: 'Driveways, siding, decks, fences, and patios — we remove a winter’s worth of Chicago grit without damaging the surface underneath.',
    heroLabel: 'HERO · Brick two-flat, Andersonville — full exterior power wash',
    heroCaption: 'Brick and concrete power wash completed April 2025. Efflorescence and calcium deposits removed from north face; driveway and rear patio restored.',
    specs: [
      { dt: 'Typical job', dd: 'Half to full day' },
      { dt: 'Best season', dd: 'April – October' },
      { dt: 'Surfaces', dd: 'Siding, brick, concrete' },
      { dt: 'PSI range', dd: '1,500 – 3,500 psi' },
    ],
    body: [
      'A Chicago winter leaves a layer of road salt, exhaust, algae, and mildew on everything. Power washing removes it cleanly — and it’s the required first step before any exterior paint job.',
      'The right pressure matters. Too little doesn’t clean; too much damages soft brick mortar, composite decking, or painted wood. We adjust based on the surface, not a single setting.',
      'We also offer soft-washing for surfaces that can’t handle high pressure — older brick, stucco, painted wood siding, and cedar shakes. Same results, no damage risk.',
    ],
    features: [
      { t: 'Adjustable pressure',   d: '1,500–3,500 psi calibrated per surface type. Never the same setting for brick as for composite decking.' },
      { t: 'Soft-wash option',      d: 'Low-pressure + cleaning agent for painted siding, stucco, cedar, and older brick. No surface damage.' },
      { t: 'Concrete & driveways',  d: 'Surface cleaner attachment for flat concrete. Removes oil stains, salt residue, and tire marks evenly.' },
      { t: 'Deck & fence restore',  d: 'Pre-stain cleaning for wood and composite decks. Removes grayed oxidation and opens wood grain for stain.' },
      { t: 'Bundled with painting', d: 'Power washing always precedes an exterior paint job. Often bundled for a single-mobilization discount.' },
      { t: 'Gutter flush included', d: 'Downspouts flushed and tested during any full-exterior power wash as a standard add-on.' },
    ],
    process: [
      { n: 'I',   t: 'Surface assessment', d: 'We identify material types, condition, and any areas requiring soft-wash treatment or special cleaning agents.' },
      { n: 'II',  t: 'Pre-treat',          d: 'Mold, algae, and heavy deposits pre-treated with biodegradable cleaning solution and allowed to dwell.' },
      { n: 'III', t: 'Wash',               d: 'Pressure adjusted per surface. Top-down sequence. Windows and doors protected before we start.' },
      { n: 'IV',  t: 'Rinse & inspect',    d: 'Full rinse, then walkthrough to catch anything missed or needing a second pass.' },
      { n: 'V',   t: 'Dry time note',      d: 'If painting follows, we confirm minimum 24-hour dry time before any prep or paint application.' },
    ],
    pricing: [
      { rng: 'Per square foot', lo: '$0.15',  hi: '$0.75',  note: 'Higher for soft-wash or heavy build-up' },
      { rng: 'Typical home',    lo: '$250',   hi: '$600',   note: 'Single-family, all four sides' },
      { rng: 'Driveway',        lo: '$100',   hi: '$250',   note: 'Standard 2-car; add for oil treatment' },
      { rng: 'Deck (per sq ft)', lo: '$0.25', hi: '$0.65',  note: 'Wood or composite; pre-stain prep' },
    ],
    pricingNote: 'Power washing is often bundled with exterior painting for a combined mobilization discount. Standalone pricing above. Heavily soiled surfaces, mold treatment, or multi-story work may fall toward the higher end.',
    faqs: [
      { q: 'What’s the difference between power washing and soft washing?', a: 'Power washing uses high-pressure water (1,500–3,500 psi) for concrete, brick, and durable siding. Soft washing uses low pressure with a cleaning agent for painted surfaces, stucco, cedar, and older masonry where high pressure would cause damage.' },
      { q: 'Can you remove oil stains from a driveway?', a: 'Partially. Fresh oil comes out well with a degreaser pre-treatment and hot water. Old, deep-set stains lighten but may not disappear entirely. We’ll give you an honest assessment before we start.' },
      { q: 'Do I need to be home during the wash?', a: 'We just need access to a water spigot and, if necessary, a gate code. You don’t need to be present. We’ll send before-and-after photos.' },
      { q: 'How often should I power wash my house?', a: 'Every 1–3 years depending on your home’s exposure to shade (more mold), road salt, and surrounding trees. Chicago north-facing walls often need it annually.' },
      { q: 'Will power washing damage my windows?', a: 'We never direct high pressure at glass. Screens are removed and stored, windows are avoided or soft-washed at low pressure only.' },
      { q: 'Is power washing required before exterior painting?', a: 'Yes, always. We won’t apply paint over a dirty surface. If you hire us for exterior painting, the power wash is included in the prep stage.' },
    ],
    related: [
      { slug: 'exterior-painting', title: 'Exterior Painting', n: '02' },
      { slug: 'gutter-cleaning',   title: 'Gutter Cleaning', n: '05' },
      { slug: 'handyman',          title: 'Handyman', n: '06' },
    ],
  },

  'gutter-cleaning': {
    slug: 'gutter-cleaning',
    number: '05',
    title: 'Gutter Cleaning',
    kicker: 'Service',
    titleLines: ['Clear gutters,', 'no ladder,', 'no worry.'],
    accentLine: 1,
    lede: 'Clogged gutters cause foundation damage, fascia rot, and basement flooding. Twice a year keeps Chicago’s leaves and ice from turning into expensive repairs.',
    heroLabel: 'HERO · North Shore bungalow — full gutter clean + downspout flush',
    heroCaption: 'Fall gutter cleaning completed October 2025. Heavy oak leaf debris cleared from all gutters; three downspouts flushed and flow-tested.',
    specs: [
      { dt: 'Best timing', dd: 'Spring & Fall' },
      { dt: 'Typical job', dd: '1–2 hours' },
      { dt: 'Warranty', dd: 'Flow guaranteed' },
      { dt: 'Includes', dd: 'Downspout flush' },
    ],
    body: [
      'Chicago’s deciduous tree canopy is beautiful and relentless. By mid-November, most gutters are packed with oak, maple, and elm debris. Leave it through winter and you get ice dams, fascia rot, and water backing up under shingles.',
      'We clean by hand — no leaf blowers that redistribute debris onto freshly painted siding. Debris is bagged and removed. Every downspout is flushed and tested for flow.',
      'We do spring cleanings too — shingle grit and seed pods from spring trees are surprisingly damaging to gutters and block as badly as fall leaves.',
    ],
    features: [
      { t: 'Hand removal',       d: 'Debris removed by hand and bagged on site. No blowers, no redistribution onto your siding or yard.' },
      { t: 'Downspout flush',    d: 'Every downspout flushed with water and confirmed flowing clear before we leave.' },
      { t: 'Gutter inspection',  d: 'We note any sagging sections, separated joints, or damaged end caps while we’re up there.' },
      { t: 'Spring & fall',      d: 'We recommend twice a year: spring for seed pods and shingle grit, fall for leaf debris before first freeze.' },
      { t: 'Minor repairs',      d: 'Re-sealing separated gutter joints and resetting hangers included at no extra charge if caught during cleaning.' },
      { t: 'Bundled service',    d: 'Often combined with power washing or exterior painting for a single-mobilization discount.' },
    ],
    process: [
      { n: 'I',   t: 'Ladder setup',       d: 'We bring our own ladders. Soft feet on all ladder bases to protect siding and landscaping.' },
      { n: 'II',  t: 'Debris removal',     d: 'Hand-clean every linear foot. Debris bagged and staged for removal or added to your yard waste.' },
      { n: 'III', t: 'Downspout flush',    d: 'Flush each downspout top-down with a garden hose. Confirm clear flow at grade.' },
      { n: 'IV',  t: 'Gutter inspection',  d: 'Note any issues: sagging sections, rust spots, separated joints, damaged end caps.' },
      { n: 'V',   t: 'Minor repairs',      d: 'Re-seal separated joints with gutter caulk, reset loose hangers. At no extra charge if caught during cleaning.' },
    ],
    pricing: [
      { rng: 'Per linear foot',      lo: '$1.00', hi: '$2.50', note: 'Single-story lower end; two-story higher' },
      { rng: 'Typical single-family', lo: '$120',  hi: '$280',  note: '100–150 linear feet of gutter' },
      { rng: 'Two-story home',        lo: '$200',  hi: '$450',  note: 'Longer run, ladder complexity' },
      { rng: 'Add: gutter guards',    lo: 'Quote', hi: 'Quote', note: 'Installed after cleaning; varies by style' },
    ],
    pricingNote: 'Pricing depends on linear footage, number of stories, and degree of blockage. Heavily blocked gutters or those with standing water take longer to clean. Guards and repairs quoted separately after inspection.',
    faqs: [
      { q: 'How often should I clean my gutters in Chicago?', a: 'Twice a year is the Chicago standard: once in late spring (after cottonwood and tree flower season) and once in late fall after the leaves are down — typically November.' },
      { q: 'What happens if I don’t clean my gutters?', a: 'Blocked gutters overflow against the foundation, saturate soil, and cause basement seepage. In winter, standing water in gutters causes ice dams that can lift shingles and split the gutter itself.' },
      { q: 'Do you install gutter guards?', a: 'Yes — we install several types of guards after cleaning. We’ll give you an honest assessment of which style works best for your tree situation. Guards reduce — but don’t eliminate — cleaning frequency.' },
      { q: 'Can you clean gutters on a two-story home?', a: 'Yes. We have the ladders and crew to safely service two-story and some three-story homes. Pricing reflects the additional complexity.' },
      { q: 'What do you do with the debris?', a: 'We bag it and either haul it away (for a small fee) or leave the bags at the curb for your yard waste pickup, whichever you prefer.' },
      { q: 'Is gutter cleaning included with exterior painting?', a: 'Gutters get cleaned and flushed as part of our standard exterior prep. If you’re already having us paint, cleaning is included or bundled at a discount.' },
    ],
    related: [
      { slug: 'power-washing',     title: 'Power Washing', n: '04' },
      { slug: 'exterior-painting', title: 'Exterior Painting', n: '02' },
      { slug: 'handyman',          title: 'Handyman', n: '06' },
    ],
  },

  'handyman': {
    slug: 'handyman',
    number: '06',
    title: 'Handyman',
    kicker: 'Service',
    titleLines: ['Small jobs,', 'done right,', 'while we’re there.'],
    accentLine: 1,
    lede: 'The list of things you’ve been meaning to fix grows every season. We knock it out while we’re already on site — no second call, no second mobilization fee.',
    heroLabel: 'HERO · Chicago bungalow — trim repair, caulking, and finish touch-ups',
    heroCaption: 'Handyman scope completed alongside interior repaint, November 2025. Replaced rotted window sill, repaired plaster crack, re-caulked master bath.',
    specs: [
      { dt: 'Rate', dd: '$65 – $95/hr' },
      { dt: 'Min. job', dd: '2 hours' },
      { dt: 'Bundled', dd: 'Discount with paint' },
      { dt: 'Notice', dd: 'Same week usually' },
    ],
    body: [
      'We’ve been in Chicago homes for thirty years. That means we’ve seen a lot of minor but annoying things — sticking doors, cracked plaster, rotted window sills, bathroom caulking that’s gone gray, cabinet hinges that gave up. We fix them.',
      'When we’re already painting a room, it makes no sense to call a separate contractor for the sticking door or the hole in the drywall. We handle it as part of the same job.',
      'For standalone handyman work, we’re typically available with a week’s notice. No job is too small if it’s genuinely faster for a professional than for you.',
    ],
    features: [
      { t: 'Drywall repair',     d: 'Patches, skim coats, textured finishes. We match the surrounding surface and paint to match.' },
      { t: 'Trim & millwork',    d: 'Replace rotted sills, re-nail loose baseboard, install new casing around doors and windows.' },
      { t: 'Caulking',           d: 'Bathroom, kitchen, windows, and exterior — old caulk removed, surfaces cleaned, fresh bead applied.' },
      { t: 'Door adjustments',   d: 'Rehang sticking doors, replace worn hardware, adjust closers and deadbolts.' },
      { t: 'Minor plumbing',     d: 'Faucet replacement, toilet running, under-sink plumbing connections. Not full plumbing calls.' },
      { t: 'Painting touch-ups', d: 'Spot paint any repaired surfaces. We carry a wide range of Benjamin Moore stock colors to match.' },
    ],
    process: [
      { n: 'I',   t: 'Walk the list',       d: 'You show us the items. We assess what’s involved and give you an honest time and material estimate.' },
      { n: 'II',  t: 'Prioritize',          d: 'We work through your list by priority. Items that require drying time are staged to let other work proceed.' },
      { n: 'III', t: 'Repair',              d: 'One item at a time, done properly. We don’t rush past a sticking door to get to the next task.' },
      { n: 'IV',  t: 'Touch-up & paint',   d: 'Every repair that touches a painted surface gets touched up to match.' },
      { n: 'V',   t: 'Final walkthrough',   d: 'We walk the list with you before we leave. If something’s not right, we fix it.' },
    ],
    pricing: [
      { rng: 'Hourly rate',       lo: '$65',   hi: '$95',   note: 'Depends on complexity; 2-hr minimum' },
      { rng: 'Drywall repair',    lo: '$150',  hi: '$450',  note: 'Depends on size and texture match' },
      { rng: 'Caulking (full)',   lo: '$180',  hi: '$350',  note: 'Per bathroom or kitchen' },
      { rng: 'Bundled w/ paint',  lo: 'Quote', hi: 'Quote', note: 'Discount when combined with paint job' },
    ],
    pricingNote: 'Handyman work is billed time and materials unless scope is clear enough to quote a flat rate. We let you know upfront which it will be. When bundled with a painting job, mobilization is shared and the rate is discounted.',
    faqs: [
      { q: 'What kinds of handyman jobs do you take?', a: 'Drywall and plaster repair, trim work, door adjustments, caulking, light fixture swaps, faucet replacement, minor carpentry, and touch-up painting. We’re not electricians or plumbers for big work — but we handle the minor versions that don’t require a license.' },
      { q: 'Do you have a minimum job size?', a: 'Two hours is our minimum for standalone handyman calls. When bundled with painting, there’s no handyman minimum — we just tack it onto the project.' },
      { q: 'Can you match existing paint colors for touch-ups?', a: 'Usually yes. If you have the original paint, we use that. Otherwise, we can take a chip to Benjamin Moore and have a close match mixed. We won’t touch up without a match approval from you first.' },
      { q: 'How quickly can you get to a handyman job?', a: 'Typically within a week for standalone work. If it’s bundled with a painting job already on the schedule, same visit.' },
      { q: 'Do you do anything outside the home?', a: 'Yes — fence boards, deck boards, mailbox posts, exterior trim and sills. Anything that involves wood, paint, or minor carpentry.' },
      { q: 'What’s not in scope?', a: 'Full electrical, major plumbing (anything behind the wall), HVAC, roofing, and structural work. We’ll tell you when something is out of our lane and give you a recommendation.' },
    ],
    related: [
      { slug: 'interior-painting', title: 'Interior Painting', n: '01' },
      { slug: 'exterior-painting', title: 'Exterior Painting', n: '02' },
      { slug: 'power-washing',     title: 'Power Washing', n: '04' },
    ],
  },
}
