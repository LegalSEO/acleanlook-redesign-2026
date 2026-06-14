import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SERVICES_EDITORIAL } from '@/data/services-editorial'
import ServiceCrumbs from '@/components/sections/service/ServiceCrumbs'
import ServiceHero from '@/components/sections/service/ServiceHero'
import ServiceBody from '@/components/sections/service/ServiceBody'
import ServiceFeatures from '@/components/sections/service/ServiceFeatures'
import ServiceSamples from '@/components/sections/service/ServiceSamples'
import ServiceProcess from '@/components/sections/service/ServiceProcess'
import ServicePricing from '@/components/sections/service/ServicePricing'
import ServiceFAQ from '@/components/sections/service/ServiceFAQ'
import ServiceEstimateStrip from '@/components/sections/service/ServiceEstimateStrip'
import ServiceRelated from '@/components/sections/service/ServiceRelated'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return Object.keys(SERVICES_EDITORIAL).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const svc = SERVICES_EDITORIAL[slug]
  if (!svc) return {}
  return {
    title: `${svc.title} Chicago | A Clean Look`,
    description: svc.lede,
    openGraph: {
      title: `${svc.title} | A Clean Look Chicago`,
      description: svc.lede,
      url: `https://acleanlook.com/services/${slug}`,
    },
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const svc = SERVICES_EDITORIAL[slug]
  if (!svc) notFound()

  const faqNum = svc.showSamples ? '§ 06' : '§ 05'
  const ctaNum = svc.showSamples ? '§ 07' : '§ 06'
  const relNum = svc.showSamples ? '§ 08' : '§ 07'

  return (
    <>
      <ServiceCrumbs title={svc.title} />
      <ServiceHero svc={svc} />
      <ServiceBody svc={svc} />
      <ServiceFeatures svc={svc} />
      {svc.showSamples && svc.samples && <ServiceSamples samples={svc.samples} />}
      <ServiceProcess svc={svc} />
      <ServicePricing svc={svc} />
      <ServiceFAQ faqs={svc.faqs} sectionNum={faqNum} />
      <ServiceEstimateStrip sectionNum={ctaNum} />
      <ServiceRelated related={svc.related} sectionNum={relNum} />
    </>
  )
}
