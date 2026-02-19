import ServicePageTemplate from '@/components/sections/ServicePageTemplate'
import { SERVICE_DATA } from '@/data/services'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Commercial Painting Chicago',
  description:
    'Professional commercial painting in Chicago. Offices, retail, restaurants, HOA common areas. After-hours scheduling, minimal disruption. Call (773) 419-1718.',
  openGraph: {
    title: 'Commercial Painting | A Clean Look Chicago',
    description:
      'Professional painting for offices, retail, and commercial properties. Minimal disruption guaranteed.',
    url: 'https://acleanlook.com/services/commercial-painting',
  },
}

export default function CommercialPaintingPage() {
  return <ServicePageTemplate data={SERVICE_DATA['commercial-painting']} />
}
