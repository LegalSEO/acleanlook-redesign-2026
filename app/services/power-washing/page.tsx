import ServicePageTemplate from '@/components/sections/ServicePageTemplate'
import { SERVICE_DATA } from '@/data/services'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Power Washing Chicago',
  description:
    'Professional power washing in Chicago. Driveways, siding, decks, patios, fences. Eco-friendly solutions, all surface types. Free estimates. Call (773) 419-1718.',
  openGraph: {
    title: 'Power Washing | A Clean Look Chicago',
    description:
      'Restore driveways, siding, decks, and more with professional pressure washing. Free estimates.',
    url: 'https://acleanlook.com/services/power-washing',
  },
}

export default function PowerWashingPage() {
  return <ServicePageTemplate data={SERVICE_DATA['power-washing']} />
}
