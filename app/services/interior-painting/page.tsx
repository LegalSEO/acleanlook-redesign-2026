import ServicePageTemplate from '@/components/sections/ServicePageTemplate'
import { SERVICE_DATA } from '@/data/services'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Interior Painting Chicago',
  description:
    'Expert interior painting in Chicago & North Shore. Bedrooms, living rooms, kitchens, full homes. Benjamin Moore paints, meticulous prep, free estimates. Call (773) 419-1718.',
  openGraph: {
    title: 'Interior Painting | A Clean Look Chicago',
    description:
      'Transform any room with expert interior painting. Premium paints, clean lines, free estimates.',
    url: 'https://acleanlook.com/services/interior-painting',
  },
}

export default function InteriorPaintingPage() {
  return <ServicePageTemplate data={SERVICE_DATA['interior-painting']} />
}
