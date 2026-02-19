import ServicePageTemplate from '@/components/sections/ServicePageTemplate'
import { SERVICE_DATA } from '@/data/services'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gutter Cleaning Chicago',
  description:
    'Professional gutter cleaning in Chicago. Prevent ice dams, water damage, and foundation issues. Spring & fall cleaning, downspout clearing. Call (773) 419-1718.',
  openGraph: {
    title: 'Gutter Cleaning | A Clean Look Chicago',
    description:
      'Keep your gutters clear and your home protected. Seasonal cleaning for Chicago homes. Free estimates.',
    url: 'https://acleanlook.com/services/gutter-cleaning',
  },
}

export default function GutterCleaningPage() {
  return <ServicePageTemplate data={SERVICE_DATA['gutter-cleaning']} />
}
