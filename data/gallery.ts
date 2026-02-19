export type GalleryProject = {
  id: string
  title: string
  type: 'interior' | 'exterior' | 'commercial' | 'power-washing'
  description: string
  beforeImage: string
  afterImage: string
  neighborhood: string
}

export const GALLERY_PROJECTS: GalleryProject[] = [
  {
    id: 'proj-1',
    title: 'Lincoln Park Victorian Interior',
    type: 'interior',
    description:
      'Complete interior repaint of a 4-bedroom Victorian home. Soft whites and warm grays throughout with navy accent walls in the living room. Benjamin Moore Regal Select.',
    beforeImage: 'https://picsum.photos/seed/lp-int-b/800/600',
    afterImage: 'https://picsum.photos/seed/lp-int-a/800/600',
    neighborhood: 'Lincoln Park',
  },
  {
    id: 'proj-2',
    title: 'Wilmette Colonial Exterior',
    type: 'exterior',
    description:
      'Full exterior repaint of a classic Colonial home. Power washed, scraped, primed, and finished with Benjamin Moore Aura Exterior in a fresh white with dark green shutters.',
    beforeImage: 'https://picsum.photos/seed/wil-ext-b/800/600',
    afterImage: 'https://picsum.photos/seed/wil-ext-a/800/600',
    neighborhood: 'Wilmette',
  },
  {
    id: 'proj-3',
    title: 'River North Restaurant Refresh',
    type: 'commercial',
    description:
      'Weekend repaint of a popular restaurant dining room. Deep charcoal walls with gold accents, completed over two nights to avoid business disruption.',
    beforeImage: 'https://picsum.photos/seed/rn-com-b/800/600',
    afterImage: 'https://picsum.photos/seed/rn-com-a/800/600',
    neighborhood: 'River North',
  },
  {
    id: 'proj-4',
    title: 'Lakeview Driveway & Patio',
    type: 'power-washing',
    description:
      'Heavy-duty power washing of a concrete driveway and flagstone patio. Removed years of salt staining, mildew, and grime. Like-new results in one afternoon.',
    beforeImage: 'https://picsum.photos/seed/lv-pw-b/800/600',
    afterImage: 'https://picsum.photos/seed/lv-pw-a/800/600',
    neighborhood: 'Lakeview',
  },
  {
    id: 'proj-5',
    title: 'Winnetka Estate Exterior',
    type: 'exterior',
    description:
      'Premium exterior painting of a 6,000 sq ft North Shore estate. Cedar siding prep, three-coat system with Benjamin Moore Aura for maximum weather protection.',
    beforeImage: 'https://picsum.photos/seed/win-ext-b/800/600',
    afterImage: 'https://picsum.photos/seed/win-ext-a/800/600',
    neighborhood: 'Winnetka',
  },
  {
    id: 'proj-6',
    title: 'Roscoe Village Kitchen & Bath',
    type: 'interior',
    description:
      'Kitchen cabinet painting and bathroom refresh. White shaker cabinets with satin finish, spa-inspired bathroom in calming blue-gray tones.',
    beforeImage: 'https://picsum.photos/seed/rv-int-b/800/600',
    afterImage: 'https://picsum.photos/seed/rv-int-a/800/600',
    neighborhood: 'Roscoe Village',
  },
  {
    id: 'proj-7',
    title: 'Gold Coast Condo Renovation',
    type: 'interior',
    description:
      'High-end condo interior in a luxury Gold Coast building. Custom color scheme with designer coordination, specialty finishes on accent walls, and trim detailing.',
    beforeImage: 'https://picsum.photos/seed/gc-int-b/800/600',
    afterImage: 'https://picsum.photos/seed/gc-int-a/800/600',
    neighborhood: 'Gold Coast',
  },
  {
    id: 'proj-8',
    title: 'Evanston Office Building',
    type: 'commercial',
    description:
      'Complete repaint of a 3-story office building common areas and tenant spaces. After-hours work over two weeks with zero disruption to daily business operations.',
    beforeImage: 'https://picsum.photos/seed/ev-com-b/800/600',
    afterImage: 'https://picsum.photos/seed/ev-com-a/800/600',
    neighborhood: 'Evanston',
  },
  {
    id: 'proj-9',
    title: 'Logan Square Greystone',
    type: 'exterior',
    description:
      'Exterior restoration of a classic Chicago greystone. Trim, porch, and decorative elements carefully prepped and painted to highlight the home\'s original character.',
    beforeImage: 'https://picsum.photos/seed/ls-ext-b/800/600',
    afterImage: 'https://picsum.photos/seed/ls-ext-a/800/600',
    neighborhood: 'Logan Square',
  },
  {
    id: 'proj-10',
    title: 'Northbrook Home Siding Wash',
    type: 'power-washing',
    description:
      'Full vinyl siding power wash for a large suburban home. Removed green algae and winter grime, restoring the bright white finish without any chemicals reaching the garden.',
    beforeImage: 'https://picsum.photos/seed/nb-pw-b/800/600',
    afterImage: 'https://picsum.photos/seed/nb-pw-a/800/600',
    neighborhood: 'Northbrook',
  },
  {
    id: 'proj-11',
    title: 'Bucktown Whole-Home Interior',
    type: 'interior',
    description:
      'Complete interior transformation of a renovated Bucktown home. Modern color palette with warm whites, soft sage, and charcoal accents throughout all three levels.',
    beforeImage: 'https://picsum.photos/seed/bt-int-b/800/600',
    afterImage: 'https://picsum.photos/seed/bt-int-a/800/600',
    neighborhood: 'Bucktown',
  },
  {
    id: 'proj-12',
    title: 'Park Ridge Deck Restoration',
    type: 'power-washing',
    description:
      'Cedar deck power wash and stain prep. Stripped old stain, cleaned and brightened the wood, then applied two coats of semi-transparent deck stain for lasting protection.',
    beforeImage: 'https://picsum.photos/seed/pr-pw-b/800/600',
    afterImage: 'https://picsum.photos/seed/pr-pw-a/800/600',
    neighborhood: 'Park Ridge',
  },
]

export const GALLERY_FILTERS = [
  { label: 'All Projects', value: 'all' },
  { label: 'Interior', value: 'interior' },
  { label: 'Exterior', value: 'exterior' },
  { label: 'Commercial', value: 'commercial' },
  { label: 'Power Washing', value: 'power-washing' },
] as const
