// ─── Types ──────────────────────────────────────────────────

export type TaskCategory = 'painting' | 'power-washing' | 'gutters' | 'maintenance'

export type TaskPriority = 'critical' | 'recommended' | 'optional'

export interface SeasonalTask {
  title: string
  category: TaskCategory
  priority: TaskPriority
  description: string
  costRange?: { low: number; high: number }
  serviceSlug?: string // links to /services/:slug or /free-estimate
}

export interface MonthData {
  month: number // 1–12
  name: string
  shortName: string
  season: 'winter' | 'spring' | 'summer' | 'fall'
  headline: string
  tip: string
  tasks: SeasonalTask[]
}

// ─── Constants ──────────────────────────────────────────────

export const TASK_CATEGORIES: { value: TaskCategory; label: string; icon: string }[] = [
  { value: 'painting', label: 'Painting', icon: 'Paintbrush' },
  { value: 'power-washing', label: 'Power Washing', icon: 'Droplets' },
  { value: 'gutters', label: 'Gutters', icon: 'Waves' },
  { value: 'maintenance', label: 'Maintenance', icon: 'Wrench' },
]

export const PRIORITY_META: Record<TaskPriority, { label: string; color: string }> = {
  critical: { label: 'Critical', color: '#E8630A' },
  recommended: { label: 'Recommended', color: '#1B365D' },
  optional: { label: 'Optional', color: '#4A5568' },
}

// ─── Month Data ─────────────────────────────────────────────

export const MONTHS: MonthData[] = [
  {
    month: 1,
    name: 'January',
    shortName: 'Jan',
    season: 'winter',
    headline: 'Winter Inspection & Planning',
    tip: 'Chicago winters reveal hidden damage. Inspect now, plan for spring, and save with early-bird pricing.',
    tasks: [
      {
        title: 'Inspect interior walls for cracks from heating & settling',
        category: 'painting',
        priority: 'recommended',
        description:
          'Dry winter heating causes walls to expand and contract, leading to hairline cracks. Inspect every room and note areas that need patching before repainting.',
        costRange: { low: 200, high: 500 },
        serviceSlug: 'interior-painting',
      },
      {
        title: 'Plan spring painting projects and get estimates',
        category: 'painting',
        priority: 'recommended',
        description:
          'Beat the spring rush by planning now. Colors chosen in January mean faster project starts in March. Book a free estimate while availability is high.',
        serviceSlug: 'interior-painting',
      },
      {
        title: 'Check for ice dam damage around gutters',
        category: 'gutters',
        priority: 'critical',
        description:
          'Chicago ice dams can pull gutters away from fascia and cause water damage. Look for sagging, ice buildup, and water stains inside near eaves.',
        costRange: { low: 150, high: 400 },
        serviceSlug: 'gutter-cleaning',
      },
      {
        title: 'Schedule early-bird exterior painting (off-season savings)',
        category: 'painting',
        priority: 'optional',
        description:
          'Booking exterior painting now for spring/summer guarantees your spot and often comes with off-season pricing discounts.',
      },
    ],
  },
  {
    month: 2,
    name: 'February',
    shortName: 'Feb',
    season: 'winter',
    headline: 'Color Selection & Interior Booking',
    tip: 'Painters have the most availability in February. Book now for faster scheduling and more attention.',
    tasks: [
      {
        title: 'Select interior paint colors for spring refresh',
        category: 'painting',
        priority: 'recommended',
        description:
          'Use our Color Visualizer tool to preview colors on your walls. Consider how natural light changes with the seasons — north-facing rooms benefit from warmer tones.',
      },
      {
        title: 'Book interior painting projects',
        category: 'painting',
        priority: 'recommended',
        description:
          'Painters have significantly more availability in February. Projects start faster, get more crew attention, and weather is irrelevant for interiors.',
        costRange: { low: 400, high: 900 },
        serviceSlug: 'interior-painting',
      },
      {
        title: 'Inspect windows and trim for winter damage',
        category: 'maintenance',
        priority: 'recommended',
        description:
          'Check window frames and exterior trim for peeling paint, cracked caulking, and moisture damage. Note everything for spring repairs.',
        serviceSlug: 'handyman',
      },
      {
        title: 'Download our Paint Color Guide',
        category: 'painting',
        priority: 'optional',
        description:
          'Get our free 2025 Chicago Paint Color Trends guide — featuring trending colors, room-by-room recommendations, and pro tips for choosing the right palette.',
      },
    ],
  },
  {
    month: 3,
    name: 'March',
    shortName: 'Mar',
    season: 'spring',
    headline: 'Spring Prep Begins',
    tip: 'March is the transition month. Start gutter cleaning and interior projects while planning exterior work.',
    tasks: [
      {
        title: 'Schedule spring gutter cleaning (post-winter debris)',
        category: 'gutters',
        priority: 'critical',
        description:
          'Winter leaves, ice, and debris clog gutters. Clean before spring rains to prevent water damage and foundation issues.',
        costRange: { low: 150, high: 350 },
        serviceSlug: 'gutter-cleaning',
      },
      {
        title: 'Interior painting — ideal time (ventilation weather coming)',
        category: 'painting',
        priority: 'recommended',
        description:
          'Start interior painting in March as warmer days allow opening windows for ventilation. Paint dries better with proper airflow.',
        costRange: { low: 400, high: 900 },
        serviceSlug: 'interior-painting',
      },
      {
        title: 'Inspect exterior for winter damage',
        category: 'maintenance',
        priority: 'recommended',
        description:
          'Walk the perimeter of your home. Look for peeling paint, cracked siding, damaged trim, and water stains. Document everything for spring repairs.',
        serviceSlug: 'exterior-painting',
      },
      {
        title: 'Plan power washing projects',
        category: 'power-washing',
        priority: 'optional',
        description:
          'Identify surfaces that need power washing: driveways, walkways, siding, decks. Schedule for April/May when temps are consistently above 40\u00B0F.',
        serviceSlug: 'power-washing',
      },
    ],
  },
  {
    month: 4,
    name: 'April',
    shortName: 'Apr',
    season: 'spring',
    headline: 'Spring Cleaning Season',
    tip: 'April showers reveal gutter problems. Clean gutters now and start prepping for painting season.',
    tasks: [
      {
        title: 'Spring gutter cleaning — critical after winter',
        category: 'gutters',
        priority: 'critical',
        description:
          'With spring rains arriving, clean and functional gutters are essential. Clear debris, check downspouts, and ensure proper drainage away from foundation.',
        costRange: { low: 150, high: 350 },
        serviceSlug: 'gutter-cleaning',
      },
      {
        title: 'Begin exterior damage assessment',
        category: 'maintenance',
        priority: 'recommended',
        description:
          'Schedule a professional exterior assessment. We identify peeling, cracking, mildew, and wood rot — then provide a repair and painting plan.',
        serviceSlug: 'exterior-painting',
      },
      {
        title: 'Power wash prep for painting season',
        category: 'power-washing',
        priority: 'recommended',
        description:
          'Power washing before painting removes dirt, mildew, and loose paint — ensuring the new coat adheres properly and lasts longer.',
        costRange: { low: 200, high: 600 },
        serviceSlug: 'power-washing',
      },
      {
        title: 'Interior painting continues (good ventilation weather)',
        category: 'painting',
        priority: 'optional',
        description:
          'Spring weather is ideal for interior painting — open windows provide great cross-ventilation for faster drying and better results.',
        costRange: { low: 400, high: 900 },
        serviceSlug: 'interior-painting',
      },
    ],
  },
  {
    month: 5,
    name: 'May',
    shortName: 'May',
    season: 'spring',
    headline: 'Exterior Painting Season Begins!',
    tip: 'Temps above 50\u00B0F mean exterior painting can begin. Book now — summer fills up fast.',
    tasks: [
      {
        title: 'Exterior painting season begins (temps above 50\u00B0F)',
        category: 'painting',
        priority: 'critical',
        description:
          'May marks the start of exterior painting season in Chicago. Paint needs consistent temperatures above 50\u00B0F to cure properly. The earlier you start, the better.',
        costRange: { low: 4612, high: 9836 },
        serviceSlug: 'exterior-painting',
      },
      {
        title: 'Power washing — ideal time (prep for paint or standalone)',
        category: 'power-washing',
        priority: 'recommended',
        description:
          'May is perfect for power washing siding, decks, patios, and driveways. Do this before painting for best adhesion, or as a standalone refresh.',
        costRange: { low: 200, high: 800 },
        serviceSlug: 'power-washing',
      },
      {
        title: 'Deck and porch assessment',
        category: 'maintenance',
        priority: 'recommended',
        description:
          'Check deck boards, railings, and porch floors for winter damage. Sand, stain, and seal before summer entertaining season.',
        costRange: { low: 500, high: 2000 },
        serviceSlug: 'handyman',
      },
      {
        title: 'Gutter check after spring rains',
        category: 'gutters',
        priority: 'optional',
        description:
          'After April rains, verify gutters are still flowing properly. Check for new clogs, sagging sections, or leaks at joints.',
        serviceSlug: 'gutter-cleaning',
      },
    ],
  },
  {
    month: 6,
    name: 'June',
    shortName: 'Jun',
    season: 'summer',
    headline: 'Peak Painting & Outdoor Season',
    tip: 'Summer is the busiest time for exterior work. Projects booked now may have 2-3 week lead times.',
    tasks: [
      {
        title: 'Peak exterior painting season',
        category: 'painting',
        priority: 'critical',
        description:
          'June offers ideal painting conditions — warm temps, longer days, and generally dry weather. This is when most Chicago homeowners tackle exterior projects.',
        costRange: { low: 4612, high: 9836 },
        serviceSlug: 'exterior-painting',
      },
      {
        title: 'Power washing for summer entertaining',
        category: 'power-washing',
        priority: 'recommended',
        description:
          'Get your outdoor spaces guest-ready. Power wash patios, decks, walkways, and outdoor furniture areas before summer gatherings.',
        costRange: { low: 200, high: 800 },
        serviceSlug: 'power-washing',
      },
      {
        title: 'Deck staining and sealing',
        category: 'painting',
        priority: 'recommended',
        description:
          'Apply stain and sealant to protect your deck from summer sun, rain, and foot traffic. Best done in early summer before peak use.',
        costRange: { low: 500, high: 2000 },
        serviceSlug: 'exterior-painting',
      },
      {
        title: 'Touch up exterior trim and accents',
        category: 'painting',
        priority: 'optional',
        description:
          'Quick touch-ups to window trim, door frames, shutters, and accent areas keep your home looking fresh without a full repaint.',
        costRange: { low: 300, high: 800 },
        serviceSlug: 'exterior-painting',
      },
    ],
  },
  {
    month: 7,
    name: 'July',
    shortName: 'Jul',
    season: 'summer',
    headline: 'Mid-Summer Projects',
    tip: 'Hot days mean paint dries fast — but too fast. We monitor conditions to ensure perfect application.',
    tasks: [
      {
        title: 'Exterior painting continues (avoid extreme heat days)',
        category: 'painting',
        priority: 'recommended',
        description:
          'July is great for exterior painting, but we avoid painting in direct sun above 90\u00B0F. Early morning and late afternoon application yields best results.',
        costRange: { low: 4612, high: 9836 },
        serviceSlug: 'exterior-painting',
      },
      {
        title: 'Mid-summer gutter inspection',
        category: 'gutters',
        priority: 'optional',
        description:
          'Summer storms can deposit debris in gutters. A quick visual check after major storms prevents problems before fall.',
        serviceSlug: 'gutter-cleaning',
      },
      {
        title: 'Power wash driveways and walkways',
        category: 'power-washing',
        priority: 'optional',
        description:
          'Remove dirt, oil stains, and algae buildup from concrete surfaces. Improves curb appeal and prevents slip hazards.',
        costRange: { low: 150, high: 400 },
        serviceSlug: 'power-washing',
      },
      {
        title: 'Interior accent wall or room refresh',
        category: 'painting',
        priority: 'optional',
        description:
          'Summer is a great time for a quick interior refresh — paint an accent wall, update a bathroom, or freshen up a guest room before visitors arrive.',
        costRange: { low: 300, high: 600 },
        serviceSlug: 'interior-painting',
      },
    ],
  },
  {
    month: 8,
    name: 'August',
    shortName: 'Aug',
    season: 'summer',
    headline: 'Back-to-School Painting Rush',
    tip: 'Refresh kids\u2019 rooms and common areas before school starts. Exterior season still going strong.',
    tasks: [
      {
        title: 'Exterior painting — strong season continues',
        category: 'painting',
        priority: 'recommended',
        description:
          'August provides reliable painting weather. If you haven\'t started your exterior project yet, now is the time before fall weather moves in.',
        costRange: { low: 4612, high: 9836 },
        serviceSlug: 'exterior-painting',
      },
      {
        title: 'Back-to-school room refresh',
        category: 'painting',
        priority: 'optional',
        description:
          'Update kids\u2019 bedrooms, playrooms, or home office spaces before the school year starts. A fresh coat of paint sets the tone for a productive year.',
        costRange: { low: 400, high: 900 },
        serviceSlug: 'interior-painting',
      },
      {
        title: 'Power wash before fall arrives',
        category: 'power-washing',
        priority: 'optional',
        description:
          'Get one more power wash in before leaves start falling. Clean siding and outdoor surfaces will be easier to maintain through autumn.',
        costRange: { low: 200, high: 600 },
        serviceSlug: 'power-washing',
      },
      {
        title: 'Inspect caulking and weatherstripping',
        category: 'maintenance',
        priority: 'recommended',
        description:
          'Check all exterior caulking around windows, doors, and trim. Replace any cracked or missing caulking before fall and winter.',
        serviceSlug: 'handyman',
      },
    ],
  },
  {
    month: 9,
    name: 'September',
    shortName: 'Sep',
    season: 'fall',
    headline: 'Last Call for Exterior Work',
    tip: 'September is your last reliable month for exterior painting. Don\u2019t miss the window!',
    tasks: [
      {
        title: 'Last call for exterior painting before cold',
        category: 'painting',
        priority: 'critical',
        description:
          'September is the final reliable month for exterior painting in Chicago. Night temps start dropping below 50\u00B0F by mid-October. Book now or wait until May.',
        costRange: { low: 4612, high: 9836 },
        serviceSlug: 'exterior-painting',
      },
      {
        title: 'Fall gutter cleaning — leaf season starts',
        category: 'gutters',
        priority: 'critical',
        description:
          'Leaves are starting to fall. Schedule your first fall gutter cleaning now, with a follow-up in late October after peak leaf drop.',
        costRange: { low: 150, high: 350 },
        serviceSlug: 'gutter-cleaning',
      },
      {
        title: 'Power wash before winter',
        category: 'power-washing',
        priority: 'recommended',
        description:
          'Remove summer grime, pollen, and mildew before winter sets in. A clean exterior surface weathers winter better.',
        costRange: { low: 200, high: 600 },
        serviceSlug: 'power-washing',
      },
      {
        title: 'Inspect exterior paint for end-of-season touch-ups',
        category: 'painting',
        priority: 'recommended',
        description:
          'Walk around your home and note any areas where paint is peeling, chipping, or showing wear. Touch up before winter freeze-thaw cycles cause worse damage.',
        costRange: { low: 300, high: 800 },
        serviceSlug: 'exterior-painting',
      },
    ],
  },
  {
    month: 10,
    name: 'October',
    shortName: 'Oct',
    season: 'fall',
    headline: 'Fall Cleanup & Interior Season',
    tip: 'Exterior painting window is closing. Shift focus to fall gutter cleaning and interior projects.',
    tasks: [
      {
        title: 'Fall gutter cleaning — critical before freeze',
        category: 'gutters',
        priority: 'critical',
        description:
          'This is the most important gutter cleaning of the year. Clear all leaves and debris before freeze. Clogged gutters in winter cause ice dams and water damage.',
        costRange: { low: 150, high: 350 },
        serviceSlug: 'gutter-cleaning',
      },
      {
        title: 'Final exterior painting window closing',
        category: 'painting',
        priority: 'recommended',
        description:
          'Early October may still offer painting weather, but only if temps stay above 50\u00B0F overnight. Monitor forecasts carefully.',
        costRange: { low: 4612, high: 9836 },
        serviceSlug: 'exterior-painting',
      },
      {
        title: 'Interior painting — holiday prep begins',
        category: 'painting',
        priority: 'recommended',
        description:
          'Start interior painting projects now to have your home looking perfect for holiday entertaining. Great time for living rooms, dining rooms, and entryways.',
        costRange: { low: 400, high: 900 },
        serviceSlug: 'interior-painting',
      },
      {
        title: 'Winterization prep and inspection',
        category: 'maintenance',
        priority: 'recommended',
        description:
          'Check weatherstripping, storm windows, caulking, and insulation. Seal gaps and cracks before heating season begins.',
        serviceSlug: 'handyman',
      },
    ],
  },
  {
    month: 11,
    name: 'November',
    shortName: 'Nov',
    season: 'fall',
    headline: 'Holiday Refresh & Final Prep',
    tip: 'Fresh paint makes everything pop for the holidays. Interior painting is the perfect November project.',
    tasks: [
      {
        title: 'Interior painting — holiday refresh',
        category: 'painting',
        priority: 'recommended',
        description:
          'A freshly painted room transforms your home for holiday gatherings. Focus on high-traffic areas: living room, dining room, entryway, and powder room.',
        costRange: { low: 400, high: 900 },
        serviceSlug: 'interior-painting',
      },
      {
        title: 'Final gutter cleaning before freeze',
        category: 'gutters',
        priority: 'critical',
        description:
          'Last chance to clear gutters before Chicago\u2019s freeze. After the final leaf drop, ensure everything is clear for winter snow and ice.',
        costRange: { low: 150, high: 350 },
        serviceSlug: 'gutter-cleaning',
      },
      {
        title: 'Check weatherstripping and caulking',
        category: 'maintenance',
        priority: 'recommended',
        description:
          'Seal drafts around windows and doors. Proper weatherstripping reduces heating costs and prevents moisture intrusion that damages paint.',
        serviceSlug: 'handyman',
      },
      {
        title: 'Plan holiday decorating (fresh paint first!)',
        category: 'painting',
        priority: 'optional',
        description:
          'Holiday decor looks best against fresh walls. A quick coat of paint in your entertaining spaces makes decorations pop and impresses guests.',
        costRange: { low: 300, high: 600 },
        serviceSlug: 'interior-painting',
      },
    ],
  },
  {
    month: 12,
    name: 'December',
    shortName: 'Dec',
    season: 'winter',
    headline: 'Review, Plan & Budget',
    tip: 'Winter is for planning. Review this year, budget for next year, and book early to lock in pricing.',
    tasks: [
      {
        title: 'Interior painting projects only',
        category: 'painting',
        priority: 'optional',
        description:
          'December is an interior-only month. If you have rooms that still need attention, painters have great availability and may offer end-of-year deals.',
        costRange: { low: 400, high: 900 },
        serviceSlug: 'interior-painting',
      },
      {
        title: 'Review yearly home maintenance log',
        category: 'maintenance',
        priority: 'recommended',
        description:
          'Review what was accomplished this year and what got deferred. Note which projects to prioritize next year.',
      },
      {
        title: 'Plan and budget next year\u2019s projects',
        category: 'maintenance',
        priority: 'recommended',
        description:
          'Create your maintenance budget for the coming year. Use our Paint Estimate Calculator to get cost ranges for planned projects.',
      },
      {
        title: 'Book early for spring to lock in pricing',
        category: 'painting',
        priority: 'optional',
        description:
          'Booking spring exterior painting in December means guaranteed scheduling, potential early-bird discounts, and first priority when the season opens.',
      },
    ],
  },
]

// ─── Helpers ────────────────────────────────────────────────

export function getMonthData(month: number): MonthData | undefined {
  return MONTHS.find((m) => m.month === month)
}

export function getCurrentMonth(): number {
  return new Date().getMonth() + 1
}

export function getTasksByCategory(
  month: number,
  category: TaskCategory
): SeasonalTask[] {
  const m = getMonthData(month)
  if (!m) return []
  return m.tasks.filter((t) => t.category === category)
}

export function getSeasonMonths(season: MonthData['season']): MonthData[] {
  return MONTHS.filter((m) => m.season === season)
}
