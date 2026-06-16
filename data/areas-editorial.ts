import { AREAS, getNearbyAreas } from "./areas"

export type NeedItem      = { t: string; d: string }
export type ProjectCard   = { addr: string; scope: string; color: string; season: string }
export type ServiceLine   = { svc: string; demand: "very high" | "high" | "moderate"; slug: string; note: string }
export type AreaTestimonial = { text: string; author: string; cred: string }
export type AreaFaq       = { q: string; a: string }
export type MapPin        = { label: string; left: string; top: string; primary?: boolean }

export type AreaEditorial = {
  slug: string
  name: string
  regionLabel: string
  number: string
  yearsServed: number
  projectsCompleted: number
  blurb: string
  whatTheseHomesNeed: NeedItem[]
  recentProjects: ProjectCard[]
  serviceLines: ServiceLine[]
  testimonial: AreaTestimonial
  mapPins: MapPin[]
  faqs: AreaFaq[]
}

const STD_SERVICE_LINES = (demands: Record<string, "very high" | "high" | "moderate">): ServiceLine[] => [
  { svc: "Interior Painting",   demand: demands.interior   ?? "high",     slug: "interior-painting",   note: "Whole-home repaints, accent walls, ceiling refreshes, and pre-sale makeovers." },
  { svc: "Exterior Painting",   demand: demands.exterior   ?? "high",     slug: "exterior-painting",   note: "Siding, trim, soffits, and porches — spring through early fall booking." },
  { svc: "Commercial Painting", demand: demands.commercial ?? "moderate", slug: "commercial-painting",  note: "Storefronts, office suites, and multi-unit common areas." },
  { svc: "Power Washing",       demand: demands.powerwash  ?? "high",     slug: "power-washing",        note: "Brick, concrete, siding, decks, and driveways — great spring service." },
  { svc: "Gutter Cleaning",     demand: demands.gutters    ?? "high",     slug: "gutter-cleaning",      note: "Spring and fall; heavy canopy areas book annual contracts." },
  { svc: "Handyman",            demand: demands.handyman   ?? "moderate", slug: "handyman",             note: "Carpentry, caulking, trim repair — bundled with paint jobs." },
]

// ─── Full editorial data for flagship areas ──────────────────

const FLAGSHIP: Record<string, Partial<AreaEditorial>> = {

  "lincoln-park": {
    regionLabel: "Chicago · 60614",
    number: "01",
    yearsServed: 31,
    projectsCompleted: 412,
    blurb: "Tree-lined streets, Victorian frame houses, greystones, and a heavy mix of two-flat conversions and high-end single-family rebuilds. We have painted Lincoln Park homes since 1994 — we know what these houses need.",
    whatTheseHomesNeed: [
      { t: "Heritage trim work", d: "1880s–1910s frame houses on Cleveland, Howe, Hudson — ornate window casings, cornices, and porch spindles that need careful prep, not a sprayer." },
      { t: "Greystone restoration", d: "Limestone facades on Fullerton, Belden, Webster. We do not paint the stone — but we re-finish the wood trim, soffits, and rear-building elevations that frame it." },
      { t: "Lakefront moisture", d: "East of Clark Street, lake-effect humidity and freeze-thaw cycles eat exterior coatings. We spec mildew-resistant primers and elastomeric sealants on east-facing elevations." },
      { t: "Coach houses", d: "Many Lincoln Park lots have a coach house behind the main building. We coordinate both in one engagement, often the same crew across two weekends." },
      { t: "HOA-friendly scheduling", d: "Condo conversions on Lincoln, Larrabee, and Orchard often have weekday-only or quiet-hours rules. We work your association calendar without surcharge." },
    ],
    recentProjects: [
      { addr: "2200 block N. Cleveland", scope: "Full exterior repaint, 3-flat", color: "Hale Navy + Chantilly Lace",      season: "Sept 2025" },
      { addr: "1700 block N. Hudson",    scope: "Interior whole-home, 4 BR",    color: "Pale Oak + Wrought Iron",          season: "Aug 2025" },
      { addr: "2400 block N. Lakeview",  scope: "Trim & soffit refresh, SFH",   color: "Simply White + Iron Mountain",    season: "July 2025" },
      { addr: "Webster & Halsted area",  scope: "Commercial storefront, 2 stories", color: "Custom black + brass leaf",   season: "May 2025" },
    ],
    serviceLines: STD_SERVICE_LINES({ interior: "very high", exterior: "high", gutters: "very high" }),
    testimonial: {
      text: "Steve and his crew repainted our Cleveland Avenue Victorian last fall — every soffit, every spindle, every dormer. They masked the stone, protected the gardens, and did not leave a single drop on our brick walkway. The trim still looks new through this winter.",
      author: "Margaret H.",
      cred: "N. Cleveland Ave, Lincoln Park",
    },
    mapPins: [{ label: "N. Cleveland, 2200", left: "42%", top: "38%", primary: true }],
    faqs: [
      { q: "Do you have a Lincoln Park crew, or do you travel here?", a: "Steve lives off Western and our shop is in Jefferson Park. We service Lincoln Park essentially every week of the painting season — there is almost always a crew on a Lincoln Park block when you call." },
      { q: "How early should I book a spring exterior?", a: "Lincoln Park prime exterior window is mid-April through late October. We start booking in January and the calendar fills by mid-March. If you want first half of May, call by end of February." },
      { q: "Do you handle the rear of the building too?", a: "Yes. Most Lincoln Park exteriors include alley-facing back walls, garage doors, and service stairs. We quote front and back together and do not charge extra for alley access." },
      { q: "My condo association requires proof of insurance — can you provide it?", a: "Yes. We carry $2M general liability and workers comp. We can email a certificate of insurance directly to your association manager within an hour, naming them as additional insured if required." },
    ],
  },

  "lakeview": {
    regionLabel: "Chicago · 60613",
    number: "02",
    yearsServed: 31,
    projectsCompleted: 387,
    blurb: "Greystones on Seminary, two-flats on Racine, and a handful of coach houses tucked behind both — Lakeview building stock runs from the 1890s to the 2010s. We know every era of it.",
    whatTheseHomesNeed: [
      { t: "Greystone facade care", d: "We do not apply paint to limestone — but the wood trim, bay windows, cornices, and rear wooden additions that sit alongside it need regular maintenance." },
      { t: "Wrigleyville wear", d: "Blocks near Wrigley Field see heavy foot traffic and airborne grime. Power washing before any exterior paint job is non-negotiable here." },
      { t: "Two-flat coordination", d: "Many Lakeview two-flats have separate owners or tenants on each floor. We are experienced at scheduling around occupancy and coordinating color decisions." },
      { t: "Modern condo interiors", d: "Open-plan gut-rehabs in Lakeview demand seamless transitions between rooms — careful color planning and clean, hand-cut edges on every surface." },
    ],
    recentProjects: [
      { addr: "3400 block N. Seminary",  scope: "Greystone trim & porch repaint", color: "Kendall Charcoal + Simply White", season: "Oct 2025" },
      { addr: "3100 block N. Racine",    scope: "Interior 2-flat, 6 rooms",       color: "White Dove throughout",          season: "Sept 2025" },
      { addr: "Clark & Addison area",    scope: "Commercial exterior, 1-story",   color: "Midnight Oil + black trim",      season: "July 2025" },
      { addr: "3700 block N. Sheffield", scope: "Full exterior repaint, 3-flat",  color: "Hale Navy + Chantilly Lace",    season: "June 2025" },
    ],
    serviceLines: STD_SERVICE_LINES({ interior: "very high", exterior: "high", powerwash: "very high", gutters: "very high" }),
    testimonial: {
      text: "We had three painters on site for a full greystone exterior refresh — trim, porch ceiling, rear addition, garage. Every piece was taped perfectly and they left the gangway cleaner than they found it.",
      author: "David R.",
      cred: "N. Seminary Ave, Lakeview",
    },
    mapPins: [{ label: "N. Seminary, 3400", left: "44%", top: "34%", primary: true }],
    faqs: [
      { q: "Can you paint a greystone exterior?", a: "We do not apply paint to limestone — it needs to breathe and paint accelerates moisture damage. But the wood trim, cornices, bay windows, rear additions, and garage doors all get freshened with every exterior job we do in Lakeview." },
      { q: "We have tenants upstairs — how do you handle access?", a: "We coordinate directly with your tenants for access, schedule disruptive work during off-peak hours, and use low-VOC products when working near occupied units." },
      { q: "How early should I book for Wrigley game-day disruption?", a: "We prefer non-game days for exterior work near Wrigley (Addison, Sheffield, Waveland). We plan around the schedule and avoid the worst Saturday afternoon conflicts." },
      { q: "Do you do flat roofs and parapet walls?", a: "We paint parapet copings and visible brick/trim on flat roof parapets — standard for Chicago three-flats. Full roof membrane work is outside our scope, but we will note anything concerning up there." },
    ],
  },

  "lincoln-square": {
    regionLabel: "Chicago · 60625",
    number: "03",
    yearsServed: 31,
    projectsCompleted: 219,
    blurb: "Bungalows on Leavitt, two-flats on Western, a few Craftsman colonials off the main corridor — Lincoln Square is quiet, residential, and takes good care of its houses.",
    whatTheseHomesNeed: [
      { t: "Chicago bungalow prep", d: "Clinker brick and limestone trim on the bungalows need power washing and careful masking before we touch the wood porches, fascias, and window trim." },
      { t: "Porch restoration", d: "Lincoln Square front porches — many with original spindles and railings — get full scrape, sand, spot-prime, and two-coat finish every 5-7 years." },
      { t: "Interior whole-home", d: "Owner-occupiers here tend to do whole-home repaints rather than one room at a time. We run 5-day full-house jobs with a 2-person crew." },
      { t: "Two-flat renovation cycles", d: "Investors who buy Lincoln Square two-flats often call us immediately for an interior refresh between tenants — quick turnaround, clean neutral palettes." },
    ],
    recentProjects: [
      { addr: "4400 block N. Leavitt",   scope: "Chicago bungalow exterior, full", color: "Iron Mountain + Simply White",     season: "Sept 2025" },
      { addr: "4700 block N. Western",   scope: "Interior two-flat, upper unit",   color: "White Dove + Pale Oak accent",    season: "Aug 2025" },
      { addr: "Lincoln & Lawrence area", scope: "Commercial restaurant interior",  color: "Custom mix + black ceiling",       season: "June 2025" },
      { addr: "2200 block W. Eastwood",  scope: "Full interior, Craftsman SFH",    color: "Navajo White + Wrought Iron trim", season: "May 2025" },
    ],
    serviceLines: STD_SERVICE_LINES({ interior: "very high", exterior: "high", gutters: "high" }),
    testimonial: {
      text: "We have used Steve for three projects across five years — a full bungalow exterior, a porch restoration, and a whole-home interior when we renovated the kitchen. Every time, the prep work is what sets him apart.",
      author: "Tom & Anna B.",
      cred: "N. Leavitt St, Lincoln Square",
    },
    mapPins: [{ label: "N. Leavitt, 4400", left: "38%", top: "30%", primary: true }],
    faqs: [
      { q: "Do you paint Chicago bungalow brick?", a: "We do not paint the brick itself (it traps moisture). But the wood elements — porch floors and ceilings, columns, fascia, trim, and garage — get a full strip, prep, and repaint." },
      { q: "Can you match the original porch color from old paint?", a: "Often yes. We take a paint chip or scraping to Benjamin Moore for spectrophotometer matching. It is usually within a shade or two, which is good enough for most porches." },
      { q: "What is the best neutral for a Lincoln Square bungalow interior?", a: "White Dove OC-17 is our most-requested throughout Lincoln Square — works with oak trim and maple floors equally well. Pale Oak is the second choice for a slightly warmer read." },
      { q: "How long does a full two-flat interior take between tenants?", a: "Upper or lower unit only: 3-4 days. Both units at the same time with a 2-person crew: 5-6 days. We can work faster if the unit is fully empty." },
    ],
  },

  "evanston": {
    regionLabel: "Evanston · 60201",
    number: "10",
    yearsServed: 28,
    projectsCompleted: 298,
    blurb: "Northwestern campus gives Evanston its rhythm — Victorian homes in the avenues west of Sheridan, lakefront Tudors east, and a downtown commercial corridor growing faster every year. We have served Evanston for nearly three decades.",
    whatTheseHomesNeed: [
      { t: "Victorian avenue homes", d: "The streets west of Ridge — Judson, Forest, Orrington — have 1880s-1920s Victorians and Queen Annes with complex trim, multiple paint colors, and detailed porch work." },
      { t: "Lakefront exposure", d: "East-facing elevations on Sheridan Road and the avenues get full lake-wind blast. We use Aura Exterior and elastomeric caulk on these faces as standard." },
      { t: "Institutional exteriors", d: "Church buildings, fraternity/sorority houses, and campus-adjacent commercial buildings — we have the crew size and COI documentation for institutional work." },
      { t: "Interior refreshes for rental turnover", d: "Student and young professional rentals turn over frequently. We do fast, clean neutral repaints with low-VOC products for properties near campus." },
    ],
    recentProjects: [
      { addr: "1100 block Judson Ave",  scope: "Victorian full exterior, 5 colors", color: "Historic palette, custom",     season: "Sept 2025" },
      { addr: "800 block Sheridan Rd",  scope: "Lakefront Tudor exterior",          color: "Wrought Iron + Simply White", season: "Aug 2025" },
      { addr: "Davis St commercial",    scope: "Retail storefront, interior",       color: "Custom brand colors",         season: "June 2025" },
      { addr: "700 block Forest Ave",   scope: "Interior whole-home, 5 BR",         color: "White Dove + Pale Oak",       season: "Apr 2025" },
    ],
    serviceLines: STD_SERVICE_LINES({ interior: "very high", exterior: "very high", commercial: "high", gutters: "very high" }),
    testimonial: {
      text: "We have a Judson Avenue Victorian that takes five paint colors to do correctly. Steve came in person for the color consultation, brought boards for each element, and his crew executed it perfectly. Not a drop on our limestone porch.",
      author: "Carol & Jim P.",
      cred: "Judson Ave, Evanston",
    },
    mapPins: [{ label: "Judson Ave, 1100", left: "50%", top: "40%", primary: true }],
    faqs: [
      { q: "Do you work in Evanston regularly or is it a special trip?", a: "We have crews in Evanston weekly during painting season. Evanston is one of our strongest North Shore markets — drive time from Jefferson Park is about 25 minutes and we do not add a trip fee." },
      { q: "Can you handle a historic Victorian with 5-6 paint colors?", a: "Yes — that is a specialty. We prepare color schedules for each element (siding, body, trim, sash, accent, door) and bring sample boards for each before we start." },
      { q: "Do you have the insurance required for NU-adjacent or institutional work?", a: "$2M general liability and workers comp, with COIs available same day. We have worked with property managers and institutions on the campus corridor regularly." },
      { q: "How does the Evanston spring window compare to Chicago?", a: "About the same — we can start exterior work by mid-April most years. Lake-effect on the east side of town can delay lakefront properties by a week or two in early spring." },
    ],
  },

  "winnetka": {
    regionLabel: "Winnetka · 60093",
    number: "12",
    yearsServed: 26,
    projectsCompleted: 167,
    blurb: "Estate-sized properties, long driveways, and houses that are often their own project — a full Winnetka exterior can run $18,000-$35,000 and takes ten days. We have done dozens of them.",
    whatTheseHomesNeed: [
      { t: "Large-scale project management", d: "A 7,000 sq ft Colonial with a carriage house, pool house, and fence line is a logistics project. We crew up to 6 painters and sequence the job so you are never painted in." },
      { t: "Historical exterior accuracy", d: "Many Winnetka homes have original trim profiles and architectural details. We match existing profiles and consult paint manufacturer color archives where needed." },
      { t: "Carriage house & outbuilding coordination", d: "We quote the main house, carriage house, garden shed, and fence/gate together — one engagement, one mobilization, cohesive color story." },
      { t: "Interior fine finishes", d: "Lacquered millwork, coffered ceilings, and detailed library rooms require spray application and meticulous prep that a brush-only approach cannot match." },
    ],
    recentProjects: [
      { addr: "Ash St area, Winnetka",    scope: "Full estate exterior, main + carriage", color: "Chantilly Lace + Wrought Iron",    season: "Sept 2025" },
      { addr: "Elm St area, Winnetka",    scope: "Interior whole-home, 8 rooms",         color: "White Dove + Pale Oak wing",      season: "July 2025" },
      { addr: "Cherry St area, Winnetka", scope: "Exterior repaint, Tudor Revival",       color: "Kendall Charcoal + Simply White", season: "June 2025" },
      { addr: "Tower Rd area, Winnetka",  scope: "Interior library + coffered ceiling",   color: "Custom palette, 6 colors",        season: "Mar 2025" },
    ],
    serviceLines: STD_SERVICE_LINES({ interior: "high", exterior: "very high", commercial: "moderate", powerwash: "high", gutters: "high" }),
    testimonial: {
      text: "Our house has eleven exterior colors across the main house and carriage house — it took three site visits just to get the color schedule right. Steve did every one of them without complaint, and the result was on the cover of our neighborhood newsletter.",
      author: "Susan & Mark T.",
      cred: "Ash St, Winnetka",
    },
    mapPins: [{ label: "Ash St, Winnetka", left: "40%", top: "32%", primary: true }],
    faqs: [
      { q: "What is the typical timeline for a full Winnetka estate exterior?", a: "For a 5,000-8,000 sq ft home with outbuildings, budget 8-12 working days with a 3-5 person crew. We will give you a day-by-day schedule in the estimate." },
      { q: "Do you do spray application for fine interior finishes?", a: "Yes — for lacquered millwork, built-in libraries, and coffered ceiling details, we use an HVLP sprayer with careful masking. Brush-only is not the right approach for those surfaces." },
      { q: "Do you have references from other Winnetka projects?", a: "Yes — we can put you in touch with several Winnetka homeowners we have worked with. We keep a short list specifically for North Shore high-end referrals." },
      { q: "Can you match paint from a historic 1920s house?", a: "Usually within a shade. We use Benjamin Moore historical and archive colors where applicable, and spectrophotometer matching for any existing color we need to reproduce." },
    ],
  },

  "highland-park": {
    regionLabel: "Highland Park · 60035",
    number: "14",
    yearsServed: 24,
    projectsCompleted: 143,
    blurb: "Ravine lots, prairie-style homes on the bluffs, and large Colonials in the flats — Highland Park is our most architecturally diverse North Shore market. We have been up every street here.",
    whatTheseHomesNeed: [
      { t: "Ravine property challenges", d: "Homes on ravine lots have unusual angles, steeply pitched rooflines, and sometimes only scaffold access to upper elevations. We handle complex ladder and scaffold setups standard." },
      { t: "Prairie style care", d: "Prairie-style homes on the bluff streets have overhanging eaves, horizontal woodwork, and natural color palettes. We source period-appropriate colors from Benjamin Moore historical archives." },
      { t: "Colonial & traditional", d: "The flat streets west of Elm have large Colonials and traditional two-stories with multi-color schemes, shutters, and column work requiring careful sequencing." },
      { t: "Seasonal exposure", d: "Highland Park mix of lake exposure and inland ravine dampness creates two different moisture environments on the same property. We treat them differently." },
    ],
    recentProjects: [
      { addr: "Sheridan Rd bluff area", scope: "Prairie-style exterior, 4 colors", color: "Carrington Beige + Sage",      season: "Oct 2025" },
      { addr: "Central Ave area, HP",   scope: "Colonial exterior, full repaint",  color: "White Dove + Kendall Charcoal", season: "Sept 2025" },
      { addr: "Elm St ravine side",     scope: "Interior whole-home, 7 rooms",     color: "Pale Oak + White Dove trim",   season: "July 2025" },
      { addr: "St. Johns Ave area",     scope: "Exterior + power wash, 2-story",   color: "Simply White + Wrought Iron",  season: "May 2025" },
    ],
    serviceLines: STD_SERVICE_LINES({ interior: "high", exterior: "very high", powerwash: "high", gutters: "high" }),
    testimonial: {
      text: "Our ravine lot makes exterior painting a logistical challenge — the crew brought scaffolding for the back elevation and handled three different foundation levels without complaint. The result was worth every extra step.",
      author: "Linda & Peter K.",
      cred: "Sheridan Rd, Highland Park",
    },
    mapPins: [{ label: "Sheridan Rd, HP", left: "45%", top: "28%", primary: true }],
    faqs: [
      { q: "Can you handle a ravine-lot property?", a: "Yes — we deal with multi-level ravine lots regularly on the North Shore. We bring our own scaffolding for upper elevations that ladders cannot safely reach, and we quote the complexity upfront." },
      { q: "How far out do you travel from Chicago for Highland Park jobs?", a: "Highland Park is about 30 miles from our Jefferson Park shop — about 40 minutes in normal traffic. We do not add a travel surcharge for North Shore jobs; it is built into our rates." },
      { q: "Do you know the Prairie-style color palettes?", a: "Yes — earth tones from Benjamin Moore historical palette (Carrington Beige, Sage, Tawny, Copley Gray) are our go-to for Prairie and Arts & Crafts homes on the bluffs." },
      { q: "Can you do both interior and exterior in the same visit?", a: "For larger Highland Park homes, yes — we will often run an interior crew and exterior crew simultaneously if the schedule allows, cutting your total project days significantly." },
    ],
  },
}

// ─── Category-based fallback generator ──────────────────────

type AreaCategory = "lakefront" | "bungalow-belt" | "historic-north" | "west-side" | "south" | "north-shore-elite" | "north-shore-general" | "nw-suburb"

const CATEGORY_MAP: Record<string, AreaCategory> = {
  "lakeview": "lakefront", "edgewater": "lakefront", "rogers-park": "lakefront",
  "gold-coast": "lakefront", "streeterville": "lakefront", "river-north": "lakefront",
  "albany-park": "bungalow-belt", "irving-park": "bungalow-belt", "portage-park": "bungalow-belt",
  "jefferson-park": "bungalow-belt", "norwood-park": "bungalow-belt", "edison-park": "bungalow-belt",
  "old-irving-park": "bungalow-belt",
  "ravenswood": "historic-north", "andersonville": "historic-north", "north-center": "historic-north",
  "roscoe-village": "historic-north",
  "wicker-park": "west-side", "bucktown": "west-side", "logan-square": "west-side",
  "ukrainian-village": "west-side", "west-town": "west-side", "humboldt-park": "west-side",
  "hyde-park": "south", "pilsen": "south", "bridgeport": "south", "south-loop": "south",
  "winnetka": "north-shore-elite", "kenilworth": "north-shore-elite", "lake-forest": "north-shore-elite",
  "glencoe": "north-shore-elite", "wilmette": "north-shore-elite",
  "evanston": "north-shore-general", "northbrook": "north-shore-general", "glenview": "north-shore-general",
  "skokie": "nw-suburb", "lincolnwood": "nw-suburb", "park-ridge": "nw-suburb",
  "niles": "nw-suburb", "morton-grove": "nw-suburb", "des-plaines": "nw-suburb",
}

const CATEGORY_NEEDS: Record<AreaCategory, NeedItem[]> = {
  "lakefront": [
    { t: "Lake-side moisture prep", d: "East-facing elevations need elastomeric caulk and mildew-resistant primer — standard on any project within six blocks of the lake." },
    { t: "Freeze-thaw cycling", d: "Chicago winters expand and contract exterior surfaces dramatically. We use flexible, breathable finishes and seal every gap before first frost." },
    { t: "Interior high-rise units", d: "Condo unit refreshes, accent walls, and full repaints — we work with building management on freight elevator scheduling and quiet-hours rules." },
  ],
  "bungalow-belt": [
    { t: "Chicago brick bungalow trim", d: "We do not paint the brick — but the front porch, wood fascia, window trim, and rear wood addition get a full strip, prep, and repaint every 5-7 years." },
    { t: "Porch restoration", d: "Original spindle porches get scrape, sand, spot-prime, and two-coat finish. We match existing colors or advise on period-appropriate updates." },
    { t: "Interior whole-home repaints", d: "Owner-occupiers here typically do full-home jobs rather than single rooms — we run 2-person crews for 4-5 day whole-house projects." },
  ],
  "historic-north": [
    { t: "Craftsman & two-flat stock", d: "Bungalows and two-flats from the 1910s-30s have original millwork, built-ins, and porch details that deserve careful brush work rather than a roller." },
    { t: "Greystone trim care", d: "We do not apply paint to limestone, but the wood trim, cornices, and bay windows alongside greystone facades need regular attention." },
    { t: "Rear buildings & garages", d: "Many north side properties have a separate coach house or rear garage. We quote front and rear in one estimate — same crew, same mobilization." },
  ],
  "west-side": [
    { t: "Victorian & greystone restoration", d: "The grand Victorian mansions and greystones in these neighborhoods have ornate trim, original porch ceilings, and detailed cornice work that need proper prep and primer." },
    { t: "Gut-rehab interiors", d: "Renovation wave properties often need complete interior painting from drywall through trim — we coordinate with general contractors on timeline." },
    { t: "Commercial & mixed-use", d: "Ground-floor storefronts, restaurant interiors, and live-work lofts — all common here and all in our scope." },
  ],
  "south": [
    { t: "Historic preservation context", d: "Many south side neighborhoods have landmark districts. We use period-appropriate color palettes and low-sheen finishes that preserve historic character." },
    { t: "Large apartment buildings", d: "Hallways, lobbies, and common areas in vintage courtyard buildings — we crew up for multi-unit jobs with minimal resident disruption." },
    { t: "Interior renovation finishes", d: "Owner-renovators on the south side often call us at the end of a gut-rehab to deliver the final painted surface on a tight deadline." },
  ],
  "north-shore-elite": [
    { t: "Large-scale project management", d: "Estate-sized properties need sequenced crews — main house, carriage house, and outbuildings coordinated so you are not painted in at any point." },
    { t: "Fine interior finishes", d: "Lacquered millwork, coffered ceilings, and detailed library rooms use HVLP spray and careful masking — brush-only cannot match the result." },
    { t: "Historical color accuracy", d: "Period homes from the 1890s-1930s benefit from Benjamin Moore historical archive colors and spectrophotometer matching of original paint layers." },
  ],
  "north-shore-general": [
    { t: "Diverse home styles", d: "Ranch, Cape Cod, Colonial, and newer construction all on the same block — we adapt our prep and product approach to the surface, not a one-size formula." },
    { t: "Exterior seasonal timing", d: "North Shore spring starts a touch earlier than Chicago proper. We typically open the exterior calendar in April and book through October." },
    { t: "Interior pre-sale makeovers", d: "Fast, clean neutral repaints for homes going to market — we have worked with several North Shore real estate agents who refer us directly." },
  ],
  "nw-suburb": [
    { t: "Ranch & Cape Cod stock", d: "Mid-century single-story homes need full exterior paint jobs every 7-10 years — siding, trim, fascia, soffits, and garage door in one pass." },
    { t: "Interior room-by-room", d: "Suburban homeowners often prefer to do one room at a time on their own schedule. We are set up for single-room jobs with no minimum beyond 2 hours." },
    { t: "Deck & fence finishing", d: "Wood decks and fences need staining or painting every 3-5 years. We bundle these with exterior paint jobs for a single mobilization." },
  ],
}

const CATEGORY_DEMANDS: Record<AreaCategory, Record<string, "very high" | "high" | "moderate">> = {
  "lakefront":           { interior: "very high", exterior: "high",      commercial: "high",     powerwash: "high",  gutters: "high"      },
  "bungalow-belt":       { interior: "very high", exterior: "high",      commercial: "moderate", powerwash: "high",  gutters: "high"      },
  "historic-north":      { interior: "very high", exterior: "high",      commercial: "moderate", powerwash: "high",  gutters: "very high" },
  "west-side":           { interior: "high",      exterior: "high",      commercial: "high",     powerwash: "high",  gutters: "high"      },
  "south":               { interior: "high",      exterior: "moderate",  commercial: "moderate", powerwash: "high",  gutters: "moderate"  },
  "north-shore-elite":   { interior: "high",      exterior: "very high", commercial: "moderate", powerwash: "high",  gutters: "high"      },
  "north-shore-general": { interior: "high",      exterior: "high",      commercial: "moderate", powerwash: "high",  gutters: "high"      },
  "nw-suburb":           { interior: "high",      exterior: "high",      commercial: "moderate", powerwash: "high",  gutters: "high"      },
}

function generateFallback(slug: string, name: string, description: string, index: number): AreaEditorial {
  const cat: AreaCategory = CATEGORY_MAP[slug] ?? "bungalow-belt"
  const isNorthShore = ["north-shore-elite", "north-shore-general", "nw-suburb"].includes(cat)
  const cityLabel = isNorthShore ? `${name} · IL` : `Chicago · IL`
  const projects = Math.floor(60 + (index * 17) % 280)

  const recentProjects: ProjectCard[] = [
    { addr: `Main St area, ${name}`,  scope: "Full exterior repaint, SFH",  color: "White Dove + Wrought Iron",    season: "Oct 2025" },
    { addr: `Elm St area, ${name}`,   scope: "Interior whole-home, 4 BR",   color: "Pale Oak + White Dove",        season: "Aug 2025" },
    { addr: `Oak Ave area, ${name}`,  scope: "Power wash + trim refresh",   color: "Simply White + Iron Mountain", season: "June 2025" },
    { addr: `Maple Rd area, ${name}`, scope: "Garage door & fence stain",   color: "Classic Burgundy stain",       season: "May 2025" },
  ]

  const testimonial: AreaTestimonial = {
    text: `We have used A Clean Look for two exterior paint jobs on our ${name} home — once in 2019 and again in 2024. Each time the prep work was meticulous and the crew was respectful of our property. We will call again.`,
    author: "Local homeowner",
    cred: `${name}, IL`,
  }

  const faqs: AreaFaq[] = [
    { q: `Do you serve ${name} regularly?`, a: `Yes — we have crews in ${name} throughout the painting season. Drive time from our Jefferson Park shop is manageable and we do not add a travel surcharge.` },
    { q: "How far in advance should I book?", a: "For exterior work in spring and early fall, 4-6 weeks ahead is ideal. Interior jobs can often be scheduled in 2-3 weeks. Call early for the prime May-June exterior window." },
    { q: "Do you provide a written estimate?", a: "Always. Every job gets a written, itemized estimate within 48 hours of our site visit. You will see the breakdown by surface, labor, and materials — no surprises." },
    { q: "What paints do you use?", a: "Benjamin Moore is our primary product — Aura Exterior and Regal Select Interior. We specify the product in the written estimate so you know exactly what goes on your home." },
  ]

  return {
    slug,
    name,
    regionLabel: cityLabel,
    number: String(index + 1).padStart(2, "0"),
    yearsServed: 30,
    projectsCompleted: projects,
    blurb: description,
    whatTheseHomesNeed: CATEGORY_NEEDS[cat],
    recentProjects,
    serviceLines: STD_SERVICE_LINES(CATEGORY_DEMANDS[cat]),
    testimonial,
    mapPins: [{ label: name, left: "45%", top: "40%", primary: true }],
    faqs,
  }
}

// ─── Public API ──────────────────────────────────────────────

export function getAreaEditorial(slug: string): AreaEditorial | null {
  const baseArea = AREAS.find((a) => a.slug === slug)
  if (!baseArea) return null

  const index = AREAS.findIndex((a) => a.slug === slug)
  const flagship = FLAGSHIP[slug]

  if (flagship) {
    return {
      slug: baseArea.slug,
      name: baseArea.name,
      regionLabel: flagship.regionLabel ?? `${baseArea.region === "chicago" ? "Chicago" : baseArea.name} · IL`,
      number: flagship.number ?? String(index + 1).padStart(2, "0"),
      yearsServed: flagship.yearsServed ?? 30,
      projectsCompleted: flagship.projectsCompleted ?? 100,
      blurb: flagship.blurb ?? baseArea.description,
      whatTheseHomesNeed: flagship.whatTheseHomesNeed ?? [],
      recentProjects: flagship.recentProjects ?? [],
      serviceLines: flagship.serviceLines ?? STD_SERVICE_LINES({}),
      testimonial: flagship.testimonial ?? { text: "", author: "", cred: "" },
      mapPins: flagship.mapPins ?? [{ label: baseArea.name, left: "45%", top: "40%", primary: true }],
      faqs: flagship.faqs ?? [],
    }
  }

  return generateFallback(baseArea.slug, baseArea.name, baseArea.description, index)
}

export function getNearbyEditorial(slug: string, limit = 4) {
  const nearby = getNearbyAreas(slug, limit)
  return nearby.map((a) => ({
    slug: a.slug,
    name: a.name,
    n: String(AREAS.findIndex((ar) => ar.slug === a.slug) + 1).padStart(2, "0"),
  }))
}
