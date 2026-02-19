import ServicePageTemplate from '@/components/sections/ServicePageTemplate'
import { SERVICE_DATA } from '@/data/services'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Handyman Services Chicago',
  description:
    'Professional handyman services in Chicago. Drywall repair, carpentry, tile, faux finishing, minor electrical. One call does it all. Call (773) 419-1718.',
  openGraph: {
    title: 'Handyman Services | A Clean Look Chicago',
    description:
      'Drywall, carpentry, tile, and general home improvement. One trusted contractor for everything.',
    url: 'https://acleanlook.com/services/handyman',
  },
}

export default function HandymanPage() {
  return <ServicePageTemplate data={SERVICE_DATA['handyman']} />
}
