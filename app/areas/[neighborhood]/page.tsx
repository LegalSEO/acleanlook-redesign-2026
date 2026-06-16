import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { AREAS } from '@/data/areas'
import { getAreaEditorial, getNearbyEditorial } from '@/data/areas-editorial'
import AreaCrumbs from '@/components/sections/area/AreaCrumbs'
import AreaHero from '@/components/sections/area/AreaHero'
import AreaMap from '@/components/sections/area/AreaMap'
import HouseProfile from '@/components/sections/area/HouseProfile'
import LocalProjects from '@/components/sections/area/LocalProjects'
import ServiceDemand from '@/components/sections/area/ServiceDemand'
import LocalQuote from '@/components/sections/area/LocalQuote'
import ServiceFAQ from '@/components/sections/service/ServiceFAQ'
import ServiceEstimateStrip from '@/components/sections/service/ServiceEstimateStrip'
import NearbyAreas from '@/components/sections/area/NearbyAreas'

type Props = { params: Promise<{ neighborhood: string }> }

export function generateStaticParams() {
  return AREAS.map((area) => ({ neighborhood: area.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { neighborhood } = await params
  const area = getAreaEditorial(neighborhood)
  if (!area) return {}
  return {
    title: `${area.name} Painting & Home Services | A Clean Look`,
    description: `Professional painting, power washing, and home improvement in ${area.name}. A Clean Look has served ${area.name} for ${area.yearsServed}+ years. Free estimates. Call (773) 419-1718.`,
    openGraph: {
      title: `${area.name} Painters | A Clean Look Chicago`,
      description: `Trusted painting services in ${area.name}. ${area.projectsCompleted}+ projects completed.`,
      url: `https://acleanlook.com/areas/${neighborhood}`,
    },
  }
}

export default async function AreaPage({ params }: Props) {
  const { neighborhood } = await params
  const area = getAreaEditorial(neighborhood)
  if (!area) notFound()

  const nearby = getNearbyEditorial(neighborhood, 4)

  return (
    <>
      <AreaCrumbs title={area.name} />
      <AreaHero area={area} />
      <AreaMap area={area} />
      <HouseProfile area={area} />
      <LocalProjects area={area} />
      <ServiceDemand area={area} />
      <LocalQuote area={area} />
      <ServiceFAQ faqs={area.faqs} sectionNum="§ 05" className="acl-faq--area" />
      <ServiceEstimateStrip sectionNum="§ 06" />
      <NearbyAreas areas={nearby} />
    </>
  )
}
