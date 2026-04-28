export const BUSINESS = {
  name: 'A Clean Look',
  legalName: 'A Clean Look Painting',
  phone: '(773) 419-1718',
  phoneRaw: '+17734191718',
  email: 'steve@acleanlook.com',
  address: {
    street: '5444 N. La Crosse Ave',
    city: 'Chicago',
    state: 'IL',
    zip: '60630',
    full: '5444 N. La Crosse Ave, Chicago, IL 60630',
  },
  owner: 'Steve',
  yearsInBusiness: 30,
  projectsCompleted: 1000,
  founded: 1994,
  tagline: "Chicago's Trusted Painting Professionals",
  description:
    'A Clean Look has been transforming Chicago homes and businesses for over 30 years. Full-service painting, power washing, gutter cleaning, and handyman services.',
  url: 'https://acleanlook.com',
} as const

export const SOCIAL = {
  yelp: 'https://www.yelp.com/biz/a-clean-look-chicago',
  facebook: 'https://www.facebook.com/acleanlookpainting',
  houzz: 'https://www.houzz.com/professionals/painters/a-clean-look',
  google: 'https://g.page/acleanlook',
} as const

export const SERVICE_AREAS = [
  'Chicago',
  'Evanston',
  'Wilmette',
  'Winnetka',
  'Kenilworth',
  'Glencoe',
  'Highland Park',
  'Lake Forest',
  'Northbrook',
  'Glenview',
  'Skokie',
  'Lincolnwood',
  'Park Ridge',
  'Niles',
  'Morton Grove',
  'Des Plaines',
] as const

export const SERVICES = [
  {
    title: 'Interior Painting',
    slug: 'interior-painting',
    shortDescription: 'Transform any room with expert interior painting, from single accent walls to full home makeovers.',
    icon: 'Paintbrush',
  },
  {
    title: 'Exterior Painting',
    slug: 'exterior-painting',
    shortDescription: 'Protect and beautify your home with weather-resistant exterior coatings built for Chicago climate.',
    icon: 'Home',
  },
  {
    title: 'Commercial Painting',
    slug: 'commercial-painting',
    shortDescription: 'Professional painting for offices, retail, and commercial properties with minimal disruption.',
    icon: 'Building2',
  },
  {
    title: 'Power Washing',
    slug: 'power-washing',
    shortDescription: 'Restore driveways, siding, decks, and more with high-powered pressure washing services.',
    icon: 'Droplets',
  },
  {
    title: 'Gutter Cleaning',
    slug: 'gutter-cleaning',
    shortDescription: 'Keep your gutters clear and functioning with seasonal cleaning and maintenance.',
    icon: 'Waves',
  },
  {
    title: 'Handyman Services',
    slug: 'handyman',
    shortDescription: 'Drywall repair, carpentry, and general home improvement — one call does it all.',
    icon: 'Wrench',
  },
] as const

export type NavItem = {
  label: string
  href: string
  children?: {
    label: string
    href: string
    description: string
    icon: string
  }[]
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    children: SERVICES.map((s) => ({
      label: s.title,
      href: `/services/${s.slug}`,
      description: s.shortDescription,
      icon: s.icon,
    })),
  },
  {
    label: 'Free Tools',
    href: '/tools',
    children: [
      {
        label: 'Paint Estimate Calculator',
        href: '/tools/paint-estimator',
        description: 'Get instant cost estimates based on real Chicago pricing data.',
        icon: 'Calculator',
      },
      {
        label: 'Room Color Visualizer',
        href: '/tools/color-visualizer',
        description: 'Preview colors on template rooms or your own photos.',
        icon: 'Palette',
      },
      {
        label: 'Seasonal Planner',
        href: '/tools/seasonal-planner',
        description: 'Month-by-month maintenance guide for Chicago homes.',
        icon: 'Calendar',
      },
      {
        label: 'Color Palette Generator',
        href: '/tools/color-palette',
        description: 'Create beautiful color palettes for any room.',
        icon: 'Sparkles',
      },
      {
        label: 'Exterior Painting Guide',
        href: '/resources/chicago-homeowner-guide',
        description: 'Free guide to exterior painting in Chicago.',
        icon: 'BookOpen',
      },
      {
        label: 'Color Selection Guide',
        href: '/resources/paint-color-guide',
        description: '2025 trending colors and selection tips.',
        icon: 'BookOpen',
      },
    ],
  },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Areas', href: '/areas' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export const TESTIMONIALS = [
  {
    name: 'Christina Scott',
    rating: 5,
    projectType: 'Interior Painting',
    text: 'Steve and his team did an incredible job painting the interior of our home. They were professional, clean, and the attention to detail was remarkable. The colors look even better than we imagined. Highly recommend A Clean Look!',
  },
  {
    name: 'Joe Kelly',
    rating: 5,
    projectType: 'Exterior Painting',
    text: "We hired A Clean Look for our home's exterior and couldn't be happier. They prepped everything thoroughly, worked around the Chicago weather, and the finished product is stunning. Our house looks brand new!",
  },
  {
    name: 'Stellar Alba',
    rating: 5,
    projectType: 'Commercial Painting',
    text: "A Clean Look transformed our office space beautifully. Steve was responsive, gave us a fair estimate, and his crew finished on time. The quality of work is outstanding. We'll definitely use them again.",
  },
] as const
