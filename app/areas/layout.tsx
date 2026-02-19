import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Service Areas',
  description:
    'A Clean Look serves Chicago neighborhoods and North Shore suburbs with professional painting, power washing, and home improvement. Find painters near you. Call (773) 419-1718.',
  openGraph: {
    title: 'Service Areas | A Clean Look Chicago',
    description:
      'Professional painting services across Chicago & North Shore suburbs. Find painters in your neighborhood.',
    url: 'https://acleanlook.com/areas',
  },
}

export default function AreasLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
