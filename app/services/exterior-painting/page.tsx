import ServicePageTemplate from '@/components/sections/ServicePageTemplate'
import { SERVICE_DATA } from '@/data/services'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Exterior Painting Chicago',
  description:
    'Professional exterior painting in Chicago built for Midwest weather. Wood, vinyl, brick, stucco. Power wash prep, premium coatings, free estimates. Call (773) 419-1718.',
  openGraph: {
    title: 'Exterior Painting | A Clean Look Chicago',
    description:
      'Protect and beautify your home with weather-resistant exterior coatings. Free estimates.',
    url: 'https://acleanlook.com/services/exterior-painting',
  },
}

export default function ExteriorPaintingPage() {
  return <ServicePageTemplate data={SERVICE_DATA['exterior-painting']} />
}
