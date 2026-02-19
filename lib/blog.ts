// ─── Types ──────────────────────────────────────────────────

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string // ISO date string
  author: string
  category: BlogCategory
  tags: string[]
  readTime: number // minutes
  coverImage?: string
  content: string // HTML content
}

export type BlogCategory =
  | 'painting-tips'
  | 'color-guides'
  | 'home-maintenance'
  | 'chicago-local'
  | 'cost-guides'

export const BLOG_CATEGORIES: { value: BlogCategory; label: string }[] = [
  { value: 'painting-tips', label: 'Painting Tips' },
  { value: 'color-guides', label: 'Color Guides' },
  { value: 'home-maintenance', label: 'Home Maintenance' },
  { value: 'chicago-local', label: 'Chicago Local' },
  { value: 'cost-guides', label: 'Cost Guides' },
]

// ─── Blog Posts ─────────────────────────────────────────────
// Posts are stored as TypeScript data for simplicity.
// Can be migrated to MDX or CMS in the future.

const POSTS: BlogPost[] = [
  {
    slug: 'best-time-to-paint-exterior-chicago',
    title: 'The Best Time to Paint Your Home\'s Exterior in Chicago',
    excerpt:
      'Chicago\'s extreme weather means timing is everything for exterior painting. Learn the ideal months, temperature requirements, and how to plan around the Midwest climate.',
    date: '2025-03-15',
    author: 'Steve',
    category: 'painting-tips',
    tags: ['exterior painting', 'chicago weather', 'timing', 'seasonal'],
    readTime: 7,
    content: `
<p>If you're planning to paint your home's exterior in Chicago, timing is one of the most critical decisions you'll make. Paint needs specific temperature and humidity conditions to cure properly, and Chicago's climate creates a relatively narrow window for optimal exterior painting.</p>

<h2>The Ideal Exterior Painting Season</h2>
<p>In Chicago, the best time for exterior painting is <strong>mid-May through early October</strong>. This is when temperatures consistently stay above 50°F — the minimum temperature most paint manufacturers require for proper adhesion and curing.</p>

<h3>Temperature Requirements</h3>
<ul>
<li><strong>Minimum daytime temperature:</strong> 50°F (10°C)</li>
<li><strong>Minimum overnight temperature:</strong> 50°F — paint continues curing overnight</li>
<li><strong>Maximum temperature:</strong> Below 90°F in direct sun — paint applied in extreme heat dries too fast</li>
<li><strong>Humidity:</strong> Below 85% relative humidity for best results</li>
</ul>

<h2>Month-by-Month Breakdown</h2>

<h3>May: Season Opener</h3>
<p>May marks the beginning of exterior painting season. Temperatures start reliably hitting the 50°F threshold, though late-season cold snaps can still occur. The advantage of booking in May is getting ahead of the summer rush — contractors have more availability and can give your project more attention.</p>

<h3>June–August: Peak Season</h3>
<p>These are the most popular months for exterior painting in Chicago. Long days, warm temperatures, and generally dry conditions make for ideal painting weather. However, this is also when contractors are busiest, so expect 2–3 week lead times.</p>

<p><strong>Pro tip:</strong> We avoid painting in direct sunlight when temperatures exceed 90°F. On hot days, we work on the shaded side of the house and follow the shade throughout the day.</p>

<h3>September: Last Call</h3>
<p>September is your last reliable month for exterior painting. The weather is still warm, humidity drops, and the moderate temperatures actually provide excellent curing conditions. Many professional painters consider September ideal because the lower humidity means less moisture interference.</p>

<h3>October: Closing Window</h3>
<p>Early October may still work if temperatures cooperate, but this is risky territory. Night temps can drop below 50°F unexpectedly, and paint that doesn't cure properly will peel within months.</p>

<h2>How Chicago Weather Affects Paint</h2>
<p>Chicago's freeze-thaw cycles are particularly tough on exterior paint. During winter, moisture seeps into tiny cracks and imperfections. When that moisture freezes, it expands — causing peeling, flaking, and bubbling. This is why proper surface preparation and timing are so critical.</p>

<h2>Planning Ahead</h2>
<p>If you want to paint your exterior this year, here's our recommended timeline:</p>
<ul>
<li><strong>January–February:</strong> Get estimates and choose colors</li>
<li><strong>March:</strong> Book your project date</li>
<li><strong>April:</strong> Power wash and prep surfaces</li>
<li><strong>May–September:</strong> Paint!</li>
</ul>

<p>The earlier you plan, the better your scheduling options. We offer free in-home estimates year-round and can lock in your preferred dates well in advance.</p>
`,
  },
  {
    slug: 'interior-painting-cost-chicago-2025',
    title: 'How Much Does Interior Painting Cost in Chicago? (2025 Guide)',
    excerpt:
      'A comprehensive breakdown of interior painting costs in the Chicago area for 2025, including per-room pricing, factors that affect cost, and tips for getting the best value.',
    date: '2025-02-28',
    author: 'Steve',
    category: 'cost-guides',
    tags: ['interior painting', 'cost guide', 'pricing', 'chicago'],
    readTime: 8,
    content: `
<p>One of the most common questions we hear is "How much does it cost to paint a room in Chicago?" The answer depends on several factors, but we're going to give you real numbers based on current 2025 Chicago market data.</p>

<h2>Quick Cost Summary</h2>
<p>Here's what you can expect to pay for professional interior painting in the Chicago area:</p>

<ul>
<li><strong>Single room:</strong> $400–$900 (average: $640)</li>
<li><strong>Full interior (3-bed home):</strong> $3,500–$8,000 (average: $5,814)</li>
<li><strong>Per square foot:</strong> $1.60–$3.33</li>
<li><strong>Per hour (labor):</strong> $31.60–$53.60</li>
</ul>

<h2>What Affects the Price?</h2>

<h3>Room Size</h3>
<p>This is the biggest factor. A small bathroom costs significantly less than a large living room with vaulted ceilings. We measure every room precisely during our free estimates to give you an accurate quote.</p>

<h3>Surface Condition</h3>
<p>Walls in good condition need minimal prep — just a light sand and clean. Walls with cracks, holes, peeling paint, or water damage require significantly more preparation, which adds to the cost. We categorize conditions as:</p>
<ul>
<li><strong>Good:</strong> Minimal prep needed (standard pricing)</li>
<li><strong>Fair:</strong> Some patching and repair needed (+25%)</li>
<li><strong>Poor:</strong> Extensive prep work required (+60%)</li>
</ul>

<h3>Paint Quality</h3>
<p>We offer three tiers of paint quality:</p>
<ul>
<li><strong>Standard:</strong> Quality contractor-grade paint with good coverage</li>
<li><strong>Premium:</strong> Benjamin Moore Regal Select — superior coverage, durability, and washability (+20%)</li>
<li><strong>Ultra Premium:</strong> Benjamin Moore Aura — the best coverage available, self-priming, lowest VOC (+40%)</li>
</ul>

<h3>Ceilings and Trim</h3>
<p>Most quotes assume walls only. Adding ceiling painting typically adds 30% to the room cost, and trim (baseboards, crown molding, door frames) adds about 20%. These are worth including for a complete transformation.</p>

<h2>How to Get the Best Value</h2>
<ol>
<li><strong>Bundle rooms:</strong> Painting multiple rooms at once is more cost-effective than one at a time</li>
<li><strong>Book during off-season:</strong> January–March offers better availability and sometimes pricing</li>
<li><strong>Invest in quality paint:</strong> Premium paint lasts longer and covers better, saving money long-term</li>
<li><strong>Get multiple estimates:</strong> We encourage you to compare — just make sure you're comparing similar scope and quality</li>
</ol>

<p>Try our free <a href="/tools/paint-estimator">Paint Estimate Calculator</a> for an instant estimate, or schedule a free in-home estimate for precise pricing.</p>
`,
  },
  {
    slug: 'trending-paint-colors-chicago-2025',
    title: 'Top 10 Trending Paint Colors in Chicago Homes (2025)',
    excerpt:
      'From warm terracotta to calming sage green, discover the paint colors Chicago homeowners are choosing in 2025 — and why they work so well in Midwest homes.',
    date: '2025-01-20',
    author: 'Steve',
    category: 'color-guides',
    tags: ['color trends', '2025', 'interior design', 'chicago'],
    readTime: 6,
    content: `
<p>Every year brings new color trends, but Chicago homes have their own distinctive palette. The city's architecture, natural light, and seasonal changes all influence which colors work best. Here are the top 10 colors we're seeing in Chicago homes this year.</p>

<h2>1. Mocha Mousse</h2>
<p>Pantone's 2025 Color of the Year has been a hit in Chicago dining rooms and living spaces. This warm, earthy brown-pink creates a cozy atmosphere that's perfect for our long winters. It pairs beautifully with cream trim and gold-toned accents.</p>

<h2>2. Sage Green</h2>
<p>Sage continues its reign as one of the most popular colors in Chicago homes. It works in virtually every room — kitchens, bedrooms, bathrooms — and brings a natural, calming quality. Benjamin Moore's "Sage Green" (2138-40) and Sherwin-Williams' "Evergreen Fog" (SW 9130) are our most-requested greens.</p>

<h2>3. Hale Navy</h2>
<p>This rich, sophisticated navy from Benjamin Moore (HC-154) has become a modern classic in Chicago. We paint it on accent walls, in home offices, and even in kitchens. It pairs perfectly with white trim and brass fixtures — a combination we see constantly in Lincoln Park and Gold Coast homes.</p>

<h2>4. Warm White (Not Stark White)</h2>
<p>The all-white trend continues but with a warm twist. Chicago homeowners are gravitating toward creamy whites like Benjamin Moore "White Dove" (OC-17) and Sherwin-Williams "Alabaster" (SW 7008) rather than harsh, cool whites. These warmer tones feel more inviting in Chicago's variable natural light.</p>

<h2>5. Agreeable Gray</h2>
<p>Sherwin-Williams' "Agreeable Gray" (SW 7029) might be the single most popular color in Chicago real estate. It's the quintessential greige — warm enough to feel cozy but neutral enough to appeal to everyone. We paint entire homes in this color for sellers prepping for market.</p>

<h2>6. Terracotta Rise</h2>
<p>Warm terracotta tones are making a strong showing this year, especially in accent walls and entryways. This earthy color adds personality and warmth without being overwhelming. It's particularly popular in Pilsen and Logan Square homes.</p>

<h2>7. Palladian Blue</h2>
<p>Benjamin Moore's "Palladian Blue" (HC-144) is a soft, sophisticated blue-green that's been trending in bedrooms and bathrooms. It creates a spa-like atmosphere and works beautifully with both warm wood tones and cool marble.</p>

<h2>8. Iron Ore</h2>
<p>Dark, moody colors are in, and Sherwin-Williams' "Iron Ore" (SW 7069) leads the pack. We're painting it on accent walls, in powder rooms, and even on all four walls in home offices. It creates a dramatic, cocooning effect that Chicago homeowners love.</p>

<h2>9. Dried Lavender</h2>
<p>A surprise entry this year — soft lavender and muted purple tones are appearing in bedrooms and nurseries across the city. It's a refreshing departure from the greige-and-blue palette that's dominated for years.</p>

<h2>10. Revere Pewter</h2>
<p>Benjamin Moore's "Revere Pewter" (HC-172) remains a perennial Chicago favorite. This warm gray-beige is the perfect whole-house neutral, adapting beautifully to any room's lighting. It's been one of our top-requested colors for over a decade.</p>

<h2>How to Choose Your Color</h2>
<p>The best way to find your perfect color is to try before you buy. Use our free <a href="/tools/color-visualizer">Color Visualizer</a> to preview colors on virtual rooms, or our <a href="/tools/color-palette">Color Palette Generator</a> to build a complete color scheme.</p>
`,
  },
  {
    slug: 'chicago-gutter-cleaning-guide',
    title: 'The Chicago Homeowner\'s Guide to Gutter Cleaning',
    excerpt:
      'Why gutter cleaning is critical in Chicago, when to schedule it, what happens if you skip it, and how much it costs. Your complete guide to protecting your home.',
    date: '2025-04-10',
    author: 'Steve',
    category: 'home-maintenance',
    tags: ['gutter cleaning', 'home maintenance', 'chicago', 'seasonal'],
    readTime: 5,
    content: `
<p>Gutters might not be the most exciting topic, but in Chicago, they're one of your home's most important defenses. Our extreme weather — from heavy spring rains to winter ice — makes gutter maintenance essential for preventing costly damage.</p>

<h2>Why Gutters Matter in Chicago</h2>
<p>Gutters direct water away from your foundation, siding, and landscaping. When they're clogged, water overflows and can cause:</p>
<ul>
<li><strong>Foundation damage:</strong> Water pooling around your foundation can crack and weaken it</li>
<li><strong>Ice dams:</strong> Clogged gutters in winter lead to ice buildup that can damage your roof</li>
<li><strong>Basement flooding:</strong> Improper drainage is a leading cause of Chicago basement water issues</li>
<li><strong>Siding damage:</strong> Overflowing water stains and damages your siding and paint</li>
<li><strong>Fascia rot:</strong> Standing water in gutters rots the fascia board they're attached to</li>
</ul>

<h2>When to Clean Your Gutters</h2>
<p>In Chicago, we recommend cleaning gutters at least twice a year:</p>

<h3>Spring (March–April)</h3>
<p>After winter, gutters are typically full of debris from wind, ice damage, and accumulated leaves. Clean them before spring rains to ensure proper drainage.</p>

<h3>Fall (Late October–November)</h3>
<p>This is the most critical cleaning. After leaves have dropped but before the first hard freeze, clear everything out. Gutters must be clean going into winter to prevent ice dams.</p>

<h3>Additional Cleanings</h3>
<p>If you have mature trees near your home (especially oaks, which drop leaves late), you may need a third cleaning in early December. Homes surrounded by pine trees may need more frequent cleanings due to needle accumulation.</p>

<h2>How Much Does Gutter Cleaning Cost?</h2>
<p>In the Chicago area, professional gutter cleaning typically costs:</p>
<ul>
<li><strong>Per linear foot:</strong> $1.00–$2.50</li>
<li><strong>Average home (150 linear ft):</strong> $150–$350</li>
<li><strong>Multi-story premium:</strong> Two-story homes typically cost 20–30% more</li>
</ul>

<h2>DIY vs. Professional</h2>
<p>While you can clean gutters yourself, there are good reasons to hire a pro:</p>
<ul>
<li><strong>Safety:</strong> Ladder work on a two-story Chicago home is genuinely dangerous</li>
<li><strong>Thoroughness:</strong> Professionals check for damage, loose brackets, and drainage issues</li>
<li><strong>Efficiency:</strong> What takes you a weekend takes a crew an hour or two</li>
<li><strong>Inspection:</strong> We check your gutters, downspouts, fascia, and soffit during every cleaning</li>
</ul>

<p>We include gutter cleaning as part of our full-service approach. <a href="/free-estimate">Get a free estimate</a> or call us at <a href="tel:+17734191718">(773) 419-1718</a>.</p>
`,
  },
  {
    slug: 'how-to-choose-painting-contractor-chicago',
    title: 'How to Choose a Painting Contractor in Chicago (Without Getting Burned)',
    excerpt:
      'Learn the 8 things you should verify before hiring any painting contractor in Chicago. From licensing to warranties, this guide helps you hire with confidence.',
    date: '2025-05-05',
    author: 'Steve',
    category: 'painting-tips',
    tags: ['contractor selection', 'hiring tips', 'chicago', 'painting'],
    readTime: 6,
    content: `
<p>After 30+ years in the Chicago painting business, we've seen it all — including the aftermath of homeowners hiring the wrong contractor. Here's what to look for (and watch out for) when choosing a painting contractor.</p>

<h2>8 Things to Verify Before Hiring</h2>

<h3>1. Insurance (This is Non-Negotiable)</h3>
<p>Ask for a certificate of insurance showing both <strong>general liability</strong> and <strong>workers' compensation</strong>. If a worker is injured on your property and the contractor doesn't have workers' comp, you could be liable. Don't just take their word for it — ask for the actual certificate.</p>

<h3>2. Years in Business</h3>
<p>While everyone starts somewhere, a contractor with a track record is less risky. Look for at least 5 years in business. Companies that have been around 10+ years have proven they can deliver quality consistently. (We've been serving Chicago since 1994.)</p>

<h3>3. Written Estimates</h3>
<p>Never accept a verbal estimate. A professional contractor provides a detailed written estimate that includes:</p>
<ul>
<li>Scope of work (exactly what's being painted)</li>
<li>Number of coats</li>
<li>Paint brand and product being used</li>
<li>Surface preparation included</li>
<li>Timeline</li>
<li>Total cost with payment terms</li>
</ul>

<h3>4. Online Reviews</h3>
<p>Check Google, Yelp, and the BBB. Look for:</p>
<ul>
<li>Overall rating (4.5+ is excellent)</li>
<li>How they respond to negative reviews (this tells you a lot)</li>
<li>Recency of reviews (are they still active?)</li>
<li>Specific details in reviews (not just "great job" but mentions of professionalism, cleanup, etc.)</li>
</ul>

<h3>5. References</h3>
<p>Ask for 3 recent references and actually call them. Ask about the experience, not just the end result. Were they on time? Did they clean up? Were there any surprises?</p>

<h3>6. Paint Quality</h3>
<p>Ask what paint brand they use. Reputable contractors use quality paint — Benjamin Moore, Sherwin-Williams, or equivalent. If a contractor is vague about paint or uses unknown brands, that's a red flag. Cheap paint costs less upfront but fails faster.</p>

<h3>7. Preparation Process</h3>
<p>The quality of the prep work determines the quality of the finish. A good contractor should explain their preparation process — cleaning, scraping, sanding, priming, caulking, patching. If they skip prep, the paint won't last.</p>

<h3>8. Warranty</h3>
<p>Ask about the warranty. Quality contractors stand behind their work with at least a 2-year warranty on labor. Make sure it's in writing.</p>

<h2>Red Flags to Watch For</h2>
<ul>
<li>Asking for full payment upfront (standard is 0–30% deposit, balance on completion)</li>
<li>No written contract or estimate</li>
<li>Pressure to decide immediately</li>
<li>Significantly lower price than competitors (usually means cut corners)</li>
<li>No physical address or business presence</li>
</ul>

<p>We're happy to provide all of this information and more during our free estimate process. <a href="/free-estimate">Schedule yours today</a>.</p>
`,
  },
  {
    slug: 'north-shore-painting-styles-guide',
    title: 'North Shore Home Painting: Styles, Colors, and What Works',
    excerpt:
      'From Wilmette colonials to Winnetka Tudor estates, discover the painting styles and color palettes that define Chicago\'s prestigious North Shore.',
    date: '2025-06-12',
    author: 'Steve',
    category: 'chicago-local',
    tags: ['north shore', 'exterior painting', 'home styles', 'color selection'],
    readTime: 7,
    content: `
<p>The North Shore has some of the most beautiful residential architecture in the Midwest. From grand Kenilworth estates to charming Evanston bungalows, each community has its own character. After painting hundreds of North Shore homes over 30 years, here's what we've learned about what works.</p>

<h2>Common North Shore Home Styles</h2>

<h3>Georgian & Colonial Revival</h3>
<p>Found throughout Winnetka, Kenilworth, and Lake Forest, these stately homes look best in classic color schemes. Think white or cream body with black or dark green shutters. For a modern update, try a warm white like Benjamin Moore "White Dove" with Sherwin-Williams "Iron Ore" trim.</p>

<h3>Tudor Revival</h3>
<p>Wilmette and Winnetka have gorgeous Tudor homes. The key is painting the stucco portions in warm, creamy tones while maintaining the dark wood timbers. Avoid pure white — it looks harsh against the dark wood. "Swiss Coffee" or "Manchester Tan" work beautifully.</p>

<h3>Prairie Style</h3>
<p>Frank Lloyd Wright's influence is all over the North Shore. These horizontal-oriented homes look best in earth tones — warm browns, deep greens, and muted reds that connect the home to its landscape. Honor the architecture by keeping colors natural and understated.</p>

<h3>Craftsman Bungalows</h3>
<p>Popular in Evanston and Highland Park, Craftsman homes shine in rich, earthy colors. Deep greens, warm browns, and golden accents highlight the detailed woodwork these homes are known for. Use contrasting trim colors to emphasize the craftsmanship.</p>

<h2>North Shore Color Trends</h2>
<p>North Shore homeowners tend toward more traditional, sophisticated palettes compared to the city. Current favorites include:</p>
<ul>
<li><strong>Navy + White:</strong> The timeless combination, especially on colonials</li>
<li><strong>Sage Green + Cream:</strong> Gaining popularity for its natural, organic feel</li>
<li><strong>Charcoal + White:</strong> A modern update on the traditional dark/light scheme</li>
<li><strong>Warm Greige:</strong> Whole-house neutrals like Revere Pewter for interiors</li>
</ul>

<h2>Special Considerations</h2>
<p>North Shore painting projects often involve:</p>
<ul>
<li><strong>Historic preservation:</strong> Some neighborhoods have architectural guidelines</li>
<li><strong>Larger scale:</strong> These homes are often larger, requiring more planning</li>
<li><strong>Premium materials:</strong> Investment-level homes deserve investment-level paint</li>
<li><strong>Mature landscaping:</strong> Protecting gardens and trees during exterior work</li>
</ul>

<p>We've been painting North Shore homes since 1994 and understand the unique requirements of these communities. <a href="/free-estimate">Get your free estimate</a> today.</p>
`,
  },
]

// ─── Query Functions ────────────────────────────────────────

export function getAllPosts(): BlogPost[] {
  return [...POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug)
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return getAllPosts().filter((p) => p.category === category)
}

export function getRelatedPosts(slug: string, limit: number = 3): BlogPost[] {
  const post = getPostBySlug(slug)
  if (!post) return []

  // Score by category match + tag overlap
  return getAllPosts()
    .filter((p) => p.slug !== slug)
    .map((p) => {
      let score = 0
      if (p.category === post.category) score += 3
      for (const tag of p.tags) {
        if (post.tags.includes(tag)) score += 1
      }
      return { post: p, score }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.post)
}

export function getAllSlugs(): string[] {
  return POSTS.map((p) => p.slug)
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
