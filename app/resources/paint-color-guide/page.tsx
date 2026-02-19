import type { Metadata } from 'next'
import EbookLandingPage from '@/components/sections/EbookLandingPage'

export const metadata: Metadata = {
  title: 'Free Guide: 2025 Chicago Paint Color Trends & Selection Guide',
  description:
    'Download our free 2025 paint color guide for Chicago homes. Trending colors, room-by-room recommendations, North Shore vs city palettes, and expert color selection tips.',
  keywords: [
    'paint color trends chicago 2025',
    'chicago home paint colors',
    'popular paint colors chicago',
    'interior paint color guide',
    'chicago paint color selection',
  ],
  openGraph: {
    title: '2025 Chicago Paint Color Trends Guide | A Clean Look',
    description:
      'Free guide to the hottest paint colors in Chicago for 2025. Room-by-room recommendations from 30+ years of experience.',
    url: 'https://acleanlook.com/resources/paint-color-guide',
  },
}

export default function PaintColorGuidePage() {
  return (
    <EbookLandingPage
      title="2025 Chicago Paint Color Trends & Selection Guide"
      subtitle="The definitive guide to choosing paint colors for your Chicago home"
      description="Discover which colors are trending in Chicago homes right now, learn color psychology for every room, and get expert tips from painters who've been helping Chicago homeowners choose colors for over 30 years."
      coverColor="#5B8A8F"
      coverAccent="#D4A843"
      benefits={[
        'See the top trending colors in Chicago homes right now (with real paint brand codes)',
        'Learn color psychology for every room — which colors promote calm, energy, or focus',
        'Discover North Shore vs city style differences and which palettes suit your neighborhood',
        'How to test colors before committing — avoid the most common color selection mistakes',
        'Expert tips from 30 years of helping Chicago homeowners choose the perfect palette',
        'Room-by-room color recommendations for kitchens, bedrooms, living rooms, and more',
        'Understand how Chicago\'s natural light affects color appearance throughout the day',
      ]}
      tableOfContents={[
        'Top 10 Trending Colors for 2025',
        'Color Psychology: Room-by-Room Guide',
        'North Shore vs City Style Palettes',
        'How Chicago Light Affects Color',
        'Testing Colors Before You Buy',
        'Benjamin Moore vs Sherwin-Williams Guide',
        'Exterior Color Selection for Curb Appeal',
        'Creating a Whole-House Color Flow',
        'Accent Walls: When and How',
        'Working with a Professional Colorist',
      ]}
      formId="paint-color-guide"
      downloadUrl="/resources/paint-color-guide"
      stats={[
        { value: '80+', label: 'Curated Colors' },
        { value: '10', label: 'Trending Palettes' },
        { value: '6', label: 'Room Guides' },
        { value: '500+', label: 'Guides Downloaded' },
      ]}
    />
  )
}
