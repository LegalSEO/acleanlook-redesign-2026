export type AreaData = {
  slug: string
  name: string
  region: 'chicago' | 'north-shore'
  description: string
  lat: number
  lng: number
}

export const AREAS: AreaData[] = [
  // ─── Chicago Neighborhoods ──────────────────────────────────
  {
    slug: 'lincoln-park',
    name: 'Lincoln Park',
    region: 'chicago',
    description:
      'One of Chicago\'s most desirable neighborhoods with beautiful Victorian-era homes, tree-lined streets, and a mix of condos and single-family homes that benefit from expert painting and maintenance.',
    lat: 41.9214,
    lng: -87.6513,
  },
  {
    slug: 'lakeview',
    name: 'Lakeview',
    region: 'chicago',
    description:
      'A vibrant lakefront neighborhood with classic Chicago greystones, vintage walk-ups, and newer construction. Regular exterior maintenance keeps Lakeview homes looking their best.',
    lat: 41.9434,
    lng: -87.6553,
  },
  {
    slug: 'lincoln-square',
    name: 'Lincoln Square',
    region: 'chicago',
    description:
      'A charming neighborhood known for its European character, bungalows, and two-flats. Lincoln Square homeowners appreciate quality craftsmanship and attention to detail.',
    lat: 41.9681,
    lng: -87.6892,
  },
  {
    slug: 'ravenswood',
    name: 'Ravenswood',
    region: 'chicago',
    description:
      'Quiet, residential neighborhood with stately single-family homes and well-maintained two-flats. Ravenswood residents value preserving their homes\' historic character.',
    lat: 41.9745,
    lng: -87.6744,
  },
  {
    slug: 'edgewater',
    name: 'Edgewater',
    region: 'chicago',
    description:
      'A diverse lakefront community with large vintage apartment buildings, condos, and single-family homes. Edgewater properties benefit from regular exterior upkeep against lake-effect weather.',
    lat: 41.9838,
    lng: -87.6600,
  },
  {
    slug: 'rogers-park',
    name: 'Rogers Park',
    region: 'chicago',
    description:
      'Chicago\'s northernmost neighborhood with eclectic architecture, from Victorian homes to mid-century apartment buildings. Lakefront properties need extra attention due to weather exposure.',
    lat: 42.0087,
    lng: -87.6664,
  },
  {
    slug: 'andersonville',
    name: 'Andersonville',
    region: 'chicago',
    description:
      'A charming neighborhood with well-preserved Victorian homes, local shops, and a strong sense of community. Andersonville homeowners take pride in their properties\' appearance.',
    lat: 41.9795,
    lng: -87.6694,
  },
  {
    slug: 'albany-park',
    name: 'Albany Park',
    region: 'chicago',
    description:
      'One of Chicago\'s most diverse neighborhoods with bungalows, two-flats, and multi-unit buildings. Affordable and family-oriented, with homeowners investing in regular maintenance.',
    lat: 41.9681,
    lng: -87.7234,
  },
  {
    slug: 'irving-park',
    name: 'Irving Park',
    region: 'chicago',
    description:
      'A northwest side neighborhood with beautiful brick bungalows and larger homes in the Villa Historic District. Interior and exterior painting preserves these architectural treasures.',
    lat: 41.9542,
    lng: -87.7353,
  },
  {
    slug: 'portage-park',
    name: 'Portage Park',
    region: 'chicago',
    description:
      'A family-friendly northwest side neighborhood with well-maintained bungalows and Cape Cods. Portage Park homeowners appreciate reliable, affordable painting services.',
    lat: 41.9583,
    lng: -87.7653,
  },
  {
    slug: 'jefferson-park',
    name: 'Jefferson Park',
    region: 'chicago',
    description:
      'A northwest side neighborhood with strong community roots, featuring bungalows and multi-family homes. Convenient Metra access makes it a popular choice for families.',
    lat: 41.9706,
    lng: -87.7601,
  },
  {
    slug: 'norwood-park',
    name: 'Norwood Park',
    region: 'chicago',
    description:
      'One of Chicago\'s safest neighborhoods with suburban-feeling streets and well-kept single-family homes. Norwood Park homeowners invest in curb appeal and regular home maintenance.',
    lat: 41.9856,
    lng: -87.8017,
  },
  {
    slug: 'edison-park',
    name: 'Edison Park',
    region: 'chicago',
    description:
      'Chicago\'s most northwest neighborhood with a small-town feel and beautiful single-family homes. Edison Park residents value quality workmanship and reliable service.',
    lat: 42.0044,
    lng: -87.8133,
  },
  {
    slug: 'old-irving-park',
    name: 'Old Irving Park',
    region: 'chicago',
    description:
      'A historic residential neighborhood with grand homes dating back to the late 1800s. Painting and restoration here requires an understanding of period-appropriate techniques.',
    lat: 41.9531,
    lng: -87.7291,
  },
  {
    slug: 'north-center',
    name: 'North Center',
    region: 'chicago',
    description:
      'A family-friendly neighborhood with a mix of historic and newer homes along the North Branch of the Chicago River. High property values make professional maintenance essential.',
    lat: 41.9542,
    lng: -87.6808,
  },
  {
    slug: 'roscoe-village',
    name: 'Roscoe Village',
    region: 'chicago',
    description:
      'A trendy residential neighborhood with charming brick row houses and vintage frame homes. Roscoe Village homeowners appreciate detail-oriented painting and careful prep work.',
    lat: 41.9437,
    lng: -87.6877,
  },
  {
    slug: 'wicker-park',
    name: 'Wicker Park',
    region: 'chicago',
    description:
      'A vibrant neighborhood with stunning Victorian mansions, modern condos, and converted lofts. From historic restoration to contemporary updates, every project is unique.',
    lat: 41.9088,
    lng: -87.6796,
  },
  {
    slug: 'bucktown',
    name: 'Bucktown',
    region: 'chicago',
    description:
      'An eclectic neighborhood with a mix of renovated cottages, brick two-flats, and modern new construction. Bucktown homeowners want bold colors and flawless finishes.',
    lat: 41.9193,
    lng: -87.6795,
  },
  {
    slug: 'logan-square',
    name: 'Logan Square',
    region: 'chicago',
    description:
      'Known for its grand boulevards and historic greystones, Logan Square is home to beautifully detailed architecture that deserves professional care and premium paints.',
    lat: 41.9231,
    lng: -87.7094,
  },
  {
    slug: 'humboldt-park',
    name: 'Humboldt Park',
    region: 'chicago',
    description:
      'A culturally rich neighborhood centered around its namesake park, with historic homes and growing investment. Painting projects here help revitalize and protect beautiful properties.',
    lat: 41.9022,
    lng: -87.7225,
  },
  {
    slug: 'ukrainian-village',
    name: 'Ukrainian Village',
    region: 'chicago',
    description:
      'An architecturally significant neighborhood with ornate Victorian homes, churches, and walk-up buildings. Preservation-minded residents value experienced painters who respect historic details.',
    lat: 41.8987,
    lng: -87.6864,
  },
  {
    slug: 'west-town',
    name: 'West Town',
    region: 'chicago',
    description:
      'A diverse west side neighborhood with industrial loft conversions, new condos, and classic Chicago homes. West Town projects range from modern interiors to full exterior restorations.',
    lat: 41.8977,
    lng: -87.6832,
  },
  {
    slug: 'gold-coast',
    name: 'Gold Coast',
    region: 'chicago',
    description:
      'Chicago\'s most prestigious residential neighborhood with elegant high-rises, brownstones, and historic mansions. Gold Coast clients expect the highest quality finishes and service.',
    lat: 41.9048,
    lng: -87.6286,
  },
  {
    slug: 'streeterville',
    name: 'Streeterville',
    region: 'chicago',
    description:
      'A near-north lakefront neighborhood with luxury high-rise condos and commercial properties. Interior painting and condo unit refreshes are popular services in Streeterville.',
    lat: 41.8926,
    lng: -87.6210,
  },
  {
    slug: 'river-north',
    name: 'River North',
    region: 'chicago',
    description:
      'A high-energy neighborhood with converted lofts, luxury condos, restaurants, and galleries. Commercial and residential painting projects keep River North spaces looking sharp.',
    lat: 41.8921,
    lng: -87.6352,
  },
  {
    slug: 'south-loop',
    name: 'South Loop',
    region: 'chicago',
    description:
      'A rapidly growing neighborhood with new construction, loft conversions, and historic buildings. South Loop residents invest in both new-build finishes and renovation painting.',
    lat: 41.8568,
    lng: -87.6251,
  },
  {
    slug: 'hyde-park',
    name: 'Hyde Park',
    region: 'chicago',
    description:
      'Home to the University of Chicago, Hyde Park features stunning architecture, from Frank Lloyd Wright homes to grand apartment buildings. Painting here requires sensitivity to historic materials.',
    lat: 41.7943,
    lng: -87.5907,
  },
  {
    slug: 'pilsen',
    name: 'Pilsen',
    region: 'chicago',
    description:
      'A vibrant cultural neighborhood with colorful murals, renovated lofts, and classic Chicago architecture. Pilsen embraces bold colors and creative painting approaches.',
    lat: 41.8523,
    lng: -87.6615,
  },
  {
    slug: 'bridgeport',
    name: 'Bridgeport',
    region: 'chicago',
    description:
      'A historically working-class neighborhood with well-maintained bungalows and two-flats. Bridgeport homeowners value practical, durable painting solutions at fair prices.',
    lat: 41.8379,
    lng: -87.6505,
  },

  // ─── North Shore Suburbs ──────────────────────────────────
  {
    slug: 'evanston',
    name: 'Evanston',
    region: 'north-shore',
    description:
      'A sophisticated college town with stunning Victorian homes, lakefront properties, and a walkable downtown. Evanston homeowners appreciate quality painting with an eye for architectural detail.',
    lat: 42.0451,
    lng: -87.6877,
  },
  {
    slug: 'wilmette',
    name: 'Wilmette',
    region: 'north-shore',
    description:
      'An upscale North Shore suburb with beautiful homes ranging from classic Colonials to modern new builds. Wilmette residents expect premium paints, meticulous prep, and flawless execution.',
    lat: 42.0722,
    lng: -87.7239,
  },
  {
    slug: 'winnetka',
    name: 'Winnetka',
    region: 'north-shore',
    description:
      'One of the most affluent suburbs in America, featuring grand estates and beautifully maintained properties. Winnetka projects demand the highest level of craftsmanship and attention.',
    lat: 42.1081,
    lng: -87.7359,
  },
  {
    slug: 'kenilworth',
    name: 'Kenilworth',
    region: 'north-shore',
    description:
      'The smallest and most exclusive North Shore village, known for its elegant homes and manicured properties. Kenilworth homeowners choose experienced painters who understand fine finishes.',
    lat: 42.0853,
    lng: -87.7173,
  },
  {
    slug: 'glencoe',
    name: 'Glencoe',
    region: 'north-shore',
    description:
      'A picturesque lakefront suburb with architecturally significant homes, including works by notable architects. Glencoe properties deserve painters who appreciate fine design.',
    lat: 42.1350,
    lng: -87.7567,
  },
  {
    slug: 'highland-park',
    name: 'Highland Park',
    region: 'north-shore',
    description:
      'A diverse North Shore suburb with charming ravine homes, lakefront estates, and a vibrant downtown. Highland Park homeowners invest in regular exterior maintenance and interior refreshes.',
    lat: 42.1817,
    lng: -87.8003,
  },
  {
    slug: 'lake-forest',
    name: 'Lake Forest',
    region: 'north-shore',
    description:
      'One of the most prestigious addresses on the North Shore, featuring historic estates and sprawling properties. Lake Forest projects are among the most rewarding in our portfolio.',
    lat: 42.2586,
    lng: -87.8407,
  },
  {
    slug: 'northbrook',
    name: 'Northbrook',
    region: 'north-shore',
    description:
      'A family-friendly suburb with well-maintained homes, excellent schools, and strong property values. Northbrook residents trust A Clean Look for reliable, quality painting services.',
    lat: 42.1275,
    lng: -87.8290,
  },
  {
    slug: 'glenview',
    name: 'Glenview',
    region: 'north-shore',
    description:
      'A growing suburb with a mix of established homes and new developments. Glenview homeowners appreciate professional painting that protects their investment and boosts curb appeal.',
    lat: 42.0698,
    lng: -87.7878,
  },
  {
    slug: 'skokie',
    name: 'Skokie',
    region: 'north-shore',
    description:
      'A diverse, centrally located suburb with a mix of housing from mid-century ranches to newer townhomes. Skokie residents value dependable service and fair pricing.',
    lat: 42.0324,
    lng: -87.7416,
  },
  {
    slug: 'lincolnwood',
    name: 'Lincolnwood',
    region: 'north-shore',
    description:
      'A compact residential suburb bordering Chicago\'s north side. Lincolnwood homes feature well-maintained ranch and split-level styles that benefit from regular painting refreshes.',
    lat: 42.0045,
    lng: -87.7329,
  },
  {
    slug: 'park-ridge',
    name: 'Park Ridge',
    region: 'north-shore',
    description:
      'A classic northwest suburb with tree-lined streets, charming homes, and a walkable downtown. Park Ridge homeowners take pride in their properties and trust experienced contractors.',
    lat: 42.0111,
    lng: -87.8403,
  },
  {
    slug: 'niles',
    name: 'Niles',
    region: 'north-shore',
    description:
      'A welcoming suburb with affordable homes, diverse residents, and convenient access. Niles homeowners appreciate quality painting services at competitive prices.',
    lat: 42.0189,
    lng: -87.8028,
  },
  {
    slug: 'morton-grove',
    name: 'Morton Grove',
    region: 'north-shore',
    description:
      'A family-oriented suburb with a range of home styles from brick ranches to newer construction. Morton Grove residents value practical, quality home improvement services.',
    lat: 42.0401,
    lng: -87.7823,
  },
  {
    slug: 'des-plaines',
    name: 'Des Plaines',
    region: 'north-shore',
    description:
      'A large suburb near O\'Hare with residential neighborhoods, commercial properties, and a revitalizing downtown. Both residential and commercial painting services are in demand.',
    lat: 42.0334,
    lng: -87.8834,
  },
]

export function getAreaBySlug(slug: string): AreaData | undefined {
  return AREAS.find((a) => a.slug === slug)
}

export function getNearbyAreas(slug: string, limit = 4): AreaData[] {
  const area = getAreaBySlug(slug)
  if (!area) return []

  return AREAS.filter((a) => a.slug !== slug)
    .map((a) => ({
      ...a,
      distance: Math.sqrt(
        Math.pow(a.lat - area.lat, 2) + Math.pow(a.lng - area.lng, 2)
      ),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit)
}
