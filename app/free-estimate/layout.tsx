import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Painting Estimate',
  description:
    'Get your free painting estimate in minutes from A Clean Look. No obligation, transparent pricing. Serving Chicago & North Shore suburbs since 1994.',
  openGraph: {
    title: 'Free Painting Estimate | A Clean Look Chicago',
    description:
      'No obligation, no surprises. Get honest pricing from Chicago\'s trusted painters. Free estimates in minutes.',
    url: 'https://acleanlook.com/free-estimate',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function FreeEstimateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
