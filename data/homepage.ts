// Editorial homepage data — sourced from prototype app.jsx

export const PRESS = [
  'Benjamin Moore Preferred Contractor',
  'BBB · A+ Accredited',
  'Houzz · Best of Service 2024',
  'Yelp · 5★ Local Favorite',
  'Licensed · Bonded · Insured',
] as const

export const HOME_SERVICES = [
  { n: '01', title: 'Interior Painting',  blurb: 'Single accent walls to whole-home refreshes — drywall prep, trim, ceilings, cabinetry.', spec: 'Benjamin Moore · Sherwin-Williams', slug: 'interior-painting' },
  { n: '02', title: 'Exterior Painting',  blurb: 'Built for Chicago weather. Proper prep, breathable coatings, lifetime warranty paints.', spec: '5–7 year finish life', slug: 'exterior-painting' },
  { n: '03', title: 'Commercial',         blurb: 'Offices, retail, multi-unit. After-hours scheduling so your business never closes.', spec: 'Insured to $2M', slug: 'commercial-painting' },
  { n: '04', title: 'Power Washing',      blurb: 'Driveways, decks, brick, and siding. Soft-wash on delicate surfaces.', spec: 'Eco-safe detergents', slug: 'power-washing' },
  { n: '05', title: 'Gutter Cleaning',    blurb: 'Spring & fall service routes. Inspection report with every visit.', spec: 'Hand-cleared, flushed', slug: 'gutter-cleaning' },
  { n: '06', title: 'Handyman',           blurb: 'Drywall repair, carpentry, caulking, fixture install. The small fixes between big jobs.', spec: 'By the hour or job', slug: 'handyman' },
] as const

export const PROJECTS = [
  { tag: 'Exterior · 2025', loc: 'Greystone, Lincoln Park',  before: '#9a8a72', after: '#1f2d3d', note: 'Limestone trim, navy clapboard' },
  { tag: 'Interior · 2025', loc: 'Townhouse, Bucktown',      before: '#c8b89a', after: '#e8e3d8', note: 'Warm white, walnut trim' },
  { tag: 'Exterior · 2024', loc: 'Tudor, Wilmette',          before: '#7a6b58', after: '#2b2a26', note: 'Dark slate, cream stucco' },
  { tag: 'Interior · 2024', loc: 'Loft, West Loop',          before: '#b9b0a1', after: '#252321', note: 'Library black, brass' },
  { tag: 'Cabinet · 2024',  loc: 'Kitchen, Andersonville',   before: '#e2d6bc', after: '#3a4a3e', note: 'Forest green, gold pulls' },
  { tag: 'Exterior · 2023', loc: 'Bungalow, Sauganash',      before: '#8a8268', after: '#5b3d2e', note: 'Brick red, ivory accent' },
] as const

export const PROCESS_STEPS = [
  { n: 'I',   t: 'Walk-through',       d: 'Steve visits the property — usually within 48 hours. Measures, photographs, listens. No sales pitch.' },
  { n: 'II',  t: 'Written estimate',   d: 'Itemized line-by-line. Surface prep, primer, finish, square footage, days on site. The number you see is the number you pay.' },
  { n: 'III', t: 'Schedule & color',   d: 'We hold dates with a small deposit. Stop by our shop or borrow sample boards — never trust a 2-inch chip.' },
  { n: 'IV',  t: 'Prep — properly',   d: 'Two-thirds of a great paint job is prep. Wash, scrape, sand, fill, caulk, prime. We don\'t skip steps.' },
  { n: 'V',   t: 'Coats & cure',       d: 'Premium paints from Benjamin Moore, Sherwin-Williams, and Farrow & Ball. Two coats minimum, three on bold colors.' },
  { n: 'VI',  t: 'Walk-out & warranty',d: 'Final walk with you, punch list addressed same week, and a written warranty you can call us back on.' },
] as const

export const PALETTE = [
  { name: 'Hale Navy',     code: 'HC-154',   hex: '#1f2d3d', note: 'Best on brick two-flats' },
  { name: 'Simply White',  code: 'OC-117',   hex: '#efe9dd', note: 'Bright trim, warm undertone' },
  { name: 'Cromwell Gray', code: 'HC-103',   hex: '#9aa098', note: 'Fits limestone and grey skies' },
  { name: 'Caponata',      code: 'AF-650',   hex: '#5b3a4a', note: 'Greystone front doors' },
  { name: 'Bronze Tone',   code: '2166-30',  hex: '#7a4a23', note: 'Warm exterior accent' },
  { name: 'Wrought Iron',  code: '2124-10',  hex: '#1f201d', note: 'Iron rails & fascia' },
  { name: 'Linen White',   code: '912',      hex: '#ece4cf', note: 'Plaster ceilings' },
  { name: 'Forest Green',  code: '2047-10',  hex: '#3a4a3e', note: 'Cabinet & library' },
] as const

export const HOME_REVIEWS = [
  { name: 'Christina S.', area: 'Lincoln Park',  project: 'Whole-home interior', rating: 5,
    quote: 'Steve walked us through every coat. The trim work alone is worth the call — the kind of detail you only get from someone who\'s been at it for thirty years.' },
  { name: 'Joe K.',        area: 'Wilmette',      project: 'Exterior repaint',    rating: 5,
    quote: 'They worked around three rain delays without a complaint and the house has never looked better. Cleaned up so well I couldn\'t tell they\'d been there.' },
  { name: 'Stellar A.',    area: 'West Loop',     project: 'Office build-out',    rating: 5,
    quote: 'Painted our 4,200 sq ft office on nights and weekends. Monday morning, business as usual. That\'s a real contractor.' },
  { name: 'M. Donovan',   area: 'Andersonville', project: 'Cabinet refinish',    rating: 5,
    quote: 'I\'d been quoted twice as much by a \'cabinet specialist\'. Steve\'s crew did it better and it\'s held up beautifully through two Chicago winters.' },
] as const

export const NEIGHBORHOODS: [string, string][] = [
  ['Lincoln Park', '60614'], ['Lakeview', '60657'], ['Bucktown', '60647'],
  ['Logan Square', '60647'], ['Andersonville', '60640'], ['West Loop', '60607'],
  ['Wicker Park', '60622'], ['Old Town', '60610'], ['Roscoe Village', '60618'],
  ['Edison Park', '60631'], ['Sauganash', '60646'], ['Forest Glen', '60630'],
]

export const SUBURBS = [
  'Evanston', 'Wilmette', 'Winnetka', 'Kenilworth', 'Glencoe',
  'Highland Park', 'Lake Forest', 'Northbrook', 'Glenview', 'Skokie',
  'Park Ridge', 'Des Plaines',
]

export const HERO_SWATCHES = [
  { hex: '#1f2d3d', label: 'Hale Navy',    sub: 'HC-154' },
  { hex: '#efe9dd', label: 'Simply White', sub: 'OC-117' },
  { hex: '#8b3b1e', label: 'Brick Red',    sub: 'CC-86'  },
] as const
