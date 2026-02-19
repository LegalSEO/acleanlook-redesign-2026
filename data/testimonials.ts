export type Testimonial = {
  name: string
  text: string
  rating: number
  service: string
  neighborhood: string
  date: string
}

export const REVIEWS: Testimonial[] = [
  {
    name: 'Christina Scott',
    rating: 5,
    service: 'Interior Painting',
    neighborhood: 'Lincoln Park',
    date: '2024-11-15',
    text: 'Steve and his team did an incredible job painting the interior of our home. They were professional, clean, and the attention to detail was remarkable. The colors look even better than we imagined. Highly recommend A Clean Look!',
  },
  {
    name: 'Joe Kelly',
    rating: 5,
    service: 'Exterior Painting',
    neighborhood: 'Edison Park',
    date: '2024-09-22',
    text: "We hired A Clean Look for our home's exterior and couldn't be happier. They prepped everything thoroughly, worked around the Chicago weather, and the finished product is stunning. Our house looks brand new!",
  },
  {
    name: 'Stellar Alba',
    rating: 5,
    service: 'Commercial Painting',
    neighborhood: 'River North',
    date: '2024-08-10',
    text: "A Clean Look transformed our office space beautifully. Steve was responsive, gave us a fair estimate, and his crew finished on time. The quality of work is outstanding. We'll definitely use them again.",
  },
  {
    name: 'Maria Gonzalez',
    rating: 5,
    service: 'Interior Painting',
    neighborhood: 'Roscoe Village',
    date: '2024-12-03',
    text: 'We had our entire first floor painted — living room, dining room, and kitchen. The crew was meticulous with prep work, covered everything carefully, and the finish is flawless. Clean lines everywhere. Worth every penny.',
  },
  {
    name: 'David Chen',
    rating: 5,
    service: 'Power Washing',
    neighborhood: 'Wilmette',
    date: '2024-07-18',
    text: "Our driveway and patio hadn't been cleaned in years. A Clean Look made them look brand new in one afternoon. They were careful around our landscaping and the results were dramatic. Neighbors noticed immediately.",
  },
  {
    name: 'Sarah & Tom Anderson',
    rating: 5,
    service: 'Exterior Painting',
    neighborhood: 'Winnetka',
    date: '2024-06-28',
    text: 'Steve and his crew painted the entire exterior of our home — siding, trim, shutters, and front door. The prep work was extensive and the results show it. Two years later and it still looks perfect through Chicago winters.',
  },
  {
    name: 'Karen Phillips',
    rating: 5,
    service: 'Interior Painting',
    neighborhood: 'Gold Coast',
    date: '2025-01-12',
    text: "I've used A Clean Look for three different projects now. Steve helped me pick the perfect colors for my condo and the execution was immaculate. They're my go-to painters and I recommend them to everyone in my building.",
  },
  {
    name: 'Michael Torres',
    rating: 5,
    service: 'Gutter Cleaning',
    neighborhood: 'Norwood Park',
    date: '2024-10-30',
    text: "Signed up for their spring and fall gutter cleaning service. They show up on schedule, do a thorough job, and even let me know about a loose section they noticed. Reliable and reasonably priced. Can't ask for more.",
  },
  {
    name: 'Jennifer Walsh',
    rating: 5,
    service: 'Handyman Services',
    neighborhood: 'Lakeview',
    date: '2024-11-05',
    text: 'Had drywall damage from a leak that needed patching, plus some trim work in the hallway. They repaired everything and painted it to match perfectly — you can\'t even tell where the damage was. Fast, clean, and professional.',
  },
  {
    name: 'Robert Kim',
    rating: 5,
    service: 'Commercial Painting',
    neighborhood: 'Evanston',
    date: '2025-02-01',
    text: 'We manage several commercial properties and A Clean Look has become our preferred painting contractor. They accommodate our scheduling needs, communicate well, and the work is consistently excellent across every project.',
  },
]

export function getAverageRating(): number {
  const total = REVIEWS.reduce((sum, r) => sum + r.rating, 0)
  return Math.round((total / REVIEWS.length) * 10) / 10
}

export function getReviewsByService(service: string): Testimonial[] {
  if (service === 'all') return REVIEWS
  return REVIEWS.filter((r) => r.service === service)
}

export const REVIEW_SERVICES = [
  'All',
  'Interior Painting',
  'Exterior Painting',
  'Commercial Painting',
  'Power Washing',
  'Gutter Cleaning',
  'Handyman Services',
] as const
