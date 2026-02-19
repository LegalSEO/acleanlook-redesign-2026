import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reviews & Testimonials',
  description:
    'Read what Chicago homeowners say about A Clean Look. 5-star reviews for painting, power washing, and home improvement. 30+ years of happy customers.',
  openGraph: {
    title: 'Reviews | A Clean Look Chicago',
    description:
      '5-star rated painting contractor in Chicago. Read reviews from homeowners across Chicago & North Shore.',
    url: 'https://acleanlook.com/reviews',
  },
}

export default function ReviewsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
