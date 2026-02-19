import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { AREAS, getAreaBySlug, getNearbyAreas } from '@/data/areas'
import AreaPageClient from './AreaPageClient'

type Props = {
  params: { neighborhood: string }
}

export function generateStaticParams() {
  return AREAS.map((area) => ({ neighborhood: area.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const area = getAreaBySlug(params.neighborhood)
  if (!area) return {}

  return {
    title: `${area.name} Painting & Home Services`,
    description: `Professional painting, power washing, and home improvement in ${area.name}. A Clean Look has served ${area.name} for 30+ years. Free estimates. Call (773) 419-1718.`,
    openGraph: {
      title: `${area.name} Painters | A Clean Look Chicago`,
      description: `Trusted painting services in ${area.name}. Interior, exterior, commercial painting, power washing & more. Free estimates.`,
      url: `https://acleanlook.com/areas/${area.slug}`,
    },
  }
}

export default function AreaPage({ params }: Props) {
  const area = getAreaBySlug(params.neighborhood)
  if (!area) notFound()

  const nearby = getNearbyAreas(params.neighborhood, 4)

  return <AreaPageClient area={area} nearby={nearby} />
}
