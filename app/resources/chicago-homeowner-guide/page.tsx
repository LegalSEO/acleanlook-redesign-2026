import type { Metadata } from 'next'
import EbookLandingPage from '@/components/sections/EbookLandingPage'

export const metadata: Metadata = {
  title: 'Free Guide: Chicago Homeowner\'s Complete Guide to Exterior Painting',
  description:
    'Download our free guide to exterior painting in Chicago. Learn when to paint, how to choose a contractor, understand true costs, and protect your investment from Chicago weather.',
  keywords: [
    'chicago exterior painting guide',
    'when to paint house exterior chicago',
    'exterior painting tips chicago',
    'chicago home painting guide',
    'house painting contractor guide',
  ],
  openGraph: {
    title: 'Free Exterior Painting Guide for Chicago Homeowners | A Clean Look',
    description:
      'Everything you need to know about exterior painting in Chicago. Timing, costs, contractor selection, and weather preparation.',
    url: 'https://acleanlook.com/resources/chicago-homeowner-guide',
  },
}

export default function ChicagoHomeownerGuidePage() {
  return (
    <EbookLandingPage
      title="The Chicago Homeowner's Complete Guide to Exterior Painting"
      subtitle="Everything you need to know before painting your home's exterior in the Midwest"
      description="From ideal timing and contractor selection to cost expectations and weather prep — this free guide gives you the insider knowledge from 30+ years of painting Chicago homes."
      coverColor="#1B365D"
      coverAccent="#3C5A7D"
      benefits={[
        'Know exactly when to schedule exterior painting in Chicago (the window is shorter than you think)',
        'Learn what to look for — and what to avoid — when choosing a painting contractor',
        'Understand true costs so there are no surprises (with real 2025 Chicago pricing)',
        'Protect your investment with paint products and prep techniques built for Chicago weather',
        'Save money with pro timing tips — when to book for best pricing and availability',
        'Discover which exterior paint brands and products perform best in the Midwest climate',
        'Get a step-by-step preparation checklist to ensure your project goes smoothly',
      ]}
      tableOfContents={[
        'Why Timing Is Everything in Chicago',
        'Month-by-Month Exterior Painting Calendar',
        'How to Choose a Painting Contractor',
        'Understanding Exterior Painting Costs',
        'Surface Preparation: The Key to Longevity',
        'Choosing the Right Paint for Chicago Weather',
        'Color Selection for Chicago Architecture',
        'Project Timeline: What to Expect',
        'Maintenance Tips to Extend Your Paint Job',
        'When to DIY vs. Hire a Professional',
      ]}
      formId="chicago-homeowner-guide"
      downloadUrl="/resources/chicago-homeowner-guide"
      stats={[
        { value: '30+', label: 'Years Experience' },
        { value: '1,000+', label: 'Homes Painted' },
        { value: '5-Star', label: 'Average Rating' },
        { value: '500+', label: 'Guides Downloaded' },
      ]}
    />
  )
}
