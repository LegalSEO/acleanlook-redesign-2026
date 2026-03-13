'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  ChevronRight,
  ChevronDown,
  Phone,
  ArrowRight,
  Shield,
  Star,
  CheckCircle2,
  Paintbrush,
  Home,
  Building2,
  Droplets,
  Waves,
  Wrench,
  Layers,
  Palette,
  Ruler,
  Thermometer,
  SprayCan,
  BrickWall,
  Eye,
  Clock,
  HardHat,
  Target,
  Users,
  Leaf,
  Maximize,
  SunSnow,
  CalendarDays,
  AlertTriangle,
  Hammer,
  Blinds,
  Zap,
  Calculator,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { BUSINESS, SERVICES } from '@/lib/constants'
import { serviceSchema, breadcrumbSchema, faqSchema, combineSchemas } from '@/lib/seo'
import StickyEstimateBar from '@/components/shared/StickyEstimateBar'

const iconMap: Record<string, React.ElementType> = {
  Paintbrush, Home, Building2, Droplets, Waves, Wrench,
  Layers, Palette, Shield, Ruler, CheckCircle2, Thermometer,
  SprayCan, BrickWall, Eye, Clock, HardHat, Target, Users,
  Leaf, Maximize, Star, SunSnow, CalendarDays, AlertTriangle,
  Hammer, Blinds, Zap,
}

// ─── Types ──────────────────────────────────────────────────
export type ServiceFeature = {
  icon: string
  title: string
  description: string
}

export type ProcessStep = {
  title: string
  description: string
}

export type PricingItem = {
  label: string
  range: string
}

export type FAQ = {
  question: string
  answer: string
}

export type ServicePageData = {
  slug: string
  title: string
  subtitle: string
  heroVideo?: string
  description: React.ReactNode
  features: ServiceFeature[]
  process: ProcessStep[]
  pricing: {
    items: PricingItem[]
    disclaimer: string
  }
  faqs: FAQ[]
  relatedSlugs: string[]
}

// ─── Animated Section ───────────────────────────────────────
function AnimSection({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

// ─── FAQ Accordion ──────────────────────────────────────────
function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="rounded-xl border border-gray-100 bg-white overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex items-center justify-between w-full px-5 py-4 text-left"
          >
            <span className="text-sm font-semibold text-text-primary pr-4">
              {faq.question}
            </span>
            <ChevronDown
              className={cn(
                'h-5 w-5 text-text-light shrink-0 transition-transform',
                openIndex === i && 'rotate-180'
              )}
            />
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-4 text-sm text-text-secondary leading-relaxed">
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

// ─── Main Template ──────────────────────────────────────────
export default function ServicePageTemplate({
  data,
}: {
  data: ServicePageData
}) {
  const related = SERVICES.filter(
    (s) => data.relatedSlugs.includes(s.slug) && s.slug !== data.slug
  )

  return (
    <>
      <StickyEstimateBar serviceName={data.title} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: combineSchemas(
            serviceSchema({
              name: data.title,
              description: data.subtitle,
              slug: data.slug,
              priceRange: data.pricing.items.length > 0
                ? `${data.pricing.items[0].range}`
                : undefined,
            }),
            breadcrumbSchema([
              { name: 'Home', href: '/' },
              { name: 'Services', href: '/services' },
              { name: data.title, href: `/services/${data.slug}` },
            ]),
            faqSchema(data.faqs)
          ),
        }}
      />

      {/* ━━━ HERO ━━━ */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Video or gradient background */}
        {data.heroVideo ? (
          <div className="absolute inset-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={data.heroVideo} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-primary-900/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-transparent to-primary-900/40" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-600 to-primary-800">
            <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-64 h-64 bg-cta/5 rounded-full blur-3xl" />
          </div>
        )}

        <div className="container-wide relative z-10">
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 text-sm text-white/60 mb-6"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              href="/services"
              className="hover:text-white transition-colors"
            >
              Services
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">{data.title}</span>
          </motion.nav>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="heading-display text-white max-w-3xl"
          >
            {data.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-lg text-white/80 mt-4 max-w-xl"
          >
            {data.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            <Link
              href="/free-estimate"
              className="btn-primary btn-lg rounded-full"
            >
              Get Free Estimate
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              className="btn-outline btn-lg rounded-full"
            >
              <Phone className="mr-2 h-5 w-5" />
              {BUSINESS.phone}
            </a>
          </motion.div>
        </div>
      </section>

      {/* ━━━ DESCRIPTION ━━━ */}
      <AnimSection className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 prose prose-lg max-w-none text-text-secondary leading-relaxed">
              {data.description}
            </div>
            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-background-light p-6 sticky top-28">
                <h3 className="text-lg font-bold text-primary mb-4">
                  Quick Facts
                </h3>
                <div className="space-y-3">
                  {[
                    { icon: Shield, text: 'Fully insured & licensed' },
                    { icon: Star, text: '5-star rated on Google & Yelp' },
                    { icon: CheckCircle2, text: 'Free detailed estimates' },
                    { icon: CheckCircle2, text: 'Benjamin Moore preferred' },
                  ].map((item) => (
                    <div
                      key={item.text}
                      className="flex items-center gap-3 text-sm text-text-primary"
                    >
                      <item.icon className="h-5 w-5 text-accent shrink-0" />
                      {item.text}
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-5 border-t border-gray-200">
                  <a
                    href={`tel:${BUSINESS.phoneRaw}`}
                    className="flex items-center gap-2 text-cta font-semibold hover:text-cta-600 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    {BUSINESS.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimSection>

      {/* ━━━ FEATURES ━━━ */}
      <AnimSection className="section-padding bg-background-light">
        <div className="container-wide">
          <div className="text-center mb-14">
            <span className="section-label mb-4">What&apos;s Included</span>
            <h2 className="heading-1 text-primary mt-4">
              Why Choose Us for {data.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.features.map((feature, i) => {
              const FeatureIcon = iconMap[feature.icon]
              return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="card-hover"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary mb-4">
                  {FeatureIcon && <FeatureIcon className="h-6 w-6" />}
                </div>
                <h3 className="text-base font-bold text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
              )
            })}
          </div>
        </div>
      </AnimSection>

      {/* ━━━ PROCESS ━━━ */}
      <AnimSection className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-center mb-14">
            <span className="section-label mb-4">How It Works</span>
            <h2 className="heading-1 text-primary mt-4">Our Process</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {data.process.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-5 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cta text-white text-sm font-bold shrink-0">
                    {i + 1}
                  </div>
                  {i < data.process.length - 1 && (
                    <div className="w-0.5 flex-1 bg-gray-200 mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="text-lg font-bold text-primary mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimSection>

      {/* ━━━ PRICING ━━━ */}
      <AnimSection className="section-padding bg-background-warm">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="section-label mb-4">Pricing</span>
              <h2 className="heading-1 text-primary mt-4">
                {data.title} Pricing
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
              <div className="divide-y divide-gray-100">
                {data.pricing.items.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between px-6 py-4"
                  >
                    <span className="text-sm font-medium text-text-primary">
                      {item.label}
                    </span>
                    <span className="text-sm font-bold text-primary">
                      {item.range}
                    </span>
                  </div>
                ))}
              </div>
              <div className="bg-background-light px-6 py-4">
                <p className="text-xs text-text-secondary">
                  {data.pricing.disclaimer}
                </p>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link
                href="/free-estimate"
                className="btn-primary btn-md rounded-full"
              >
                Get Your Exact Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </AnimSection>

      {/* ━━━ FAQ ━━━ */}
      <AnimSection className="section-padding bg-white">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="section-label mb-4">FAQ</span>
              <h2 className="heading-1 text-primary mt-4">
                Frequently Asked Questions
              </h2>
            </div>
            <FAQAccordion faqs={data.faqs} />
          </div>
        </div>
      </AnimSection>

      {/* ━━━ FREE TOOLS ━━━ */}
      <AnimSection className="py-12 bg-white border-t border-gray-100">
        <div className="container-wide">
          <div className="rounded-2xl bg-background-light border border-gray-100 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-primary mb-4 text-center">
              Try Our Free Tools
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href="/tools/paint-estimator"
                className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100 hover:border-primary/20 hover:shadow-sm transition-all group"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cta/10 text-cta shrink-0">
                  <Calculator className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-sm font-semibold text-primary group-hover:text-cta transition-colors">
                    Paint Estimator
                  </span>
                  <span className="block text-xs text-text-light">
                    Get instant cost estimates
                  </span>
                </div>
              </Link>
              <Link
                href="/tools/color-visualizer"
                className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100 hover:border-primary/20 hover:shadow-sm transition-all group"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent shrink-0">
                  <Palette className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-sm font-semibold text-primary group-hover:text-cta transition-colors">
                    Color Visualizer
                  </span>
                  <span className="block text-xs text-text-light">
                    Preview colors on your walls
                  </span>
                </div>
              </Link>
              <Link
                href="/tools/color-palette"
                className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100 hover:border-primary/20 hover:shadow-sm transition-all group"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                  <Paintbrush className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-sm font-semibold text-primary group-hover:text-cta transition-colors">
                    Palette Generator
                  </span>
                  <span className="block text-xs text-text-light">
                    Find your perfect colors
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </AnimSection>

      {/* ━━━ RELATED SERVICES ━━━ */}
      {related.length > 0 && (
        <AnimSection className="section-padding bg-background-light">
          <div className="container-wide">
            <div className="text-center mb-10">
              <span className="section-label mb-4">More Services</span>
              <h2 className="heading-2 text-primary mt-4">
                Related Services
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((service) => {
                const Icon = iconMap[service.icon]
                return (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="card-hover block group"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors mb-4">
                      {Icon && <Icon className="h-6 w-6" />}
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-1">
                      {service.title}
                    </h3>
                    <p className="text-sm text-text-secondary mb-3">
                      {service.shortDescription}
                    </p>
                    <span className="text-sm font-semibold text-cta inline-flex items-center">
                      Learn More <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </AnimSection>
      )}

      {/* ━━━ CTA ━━━ */}
      <section className="section-padding bg-gradient-to-br from-cta via-cta-500 to-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoLTZ2LTZoNnptMC0zMHY2aC02VjRoNnptMzAgMzB2Nmg2di02aC02em0wLTMwdjZoLTZWNGg2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="container-narrow relative z-10 text-center">
          <h2 className="heading-1 text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">
            Get your free, no-obligation {data.title.toLowerCase()} estimate
            today. We&apos;d love to help transform your space.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/free-estimate"
              className="btn btn-lg rounded-full bg-white text-cta font-bold hover:bg-white/90 shadow-lg"
            >
              Get Free Estimate
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              className="btn btn-lg rounded-full border-2 border-white text-white hover:bg-white hover:text-cta"
            >
              <Phone className="mr-2 h-5 w-5" />
              {BUSINESS.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ━━━ JSON-LD ━━━ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: data.title,
            description: data.subtitle,
            provider: {
              '@type': 'LocalBusiness',
              name: BUSINESS.name,
              telephone: BUSINESS.phone,
              address: {
                '@type': 'PostalAddress',
                streetAddress: BUSINESS.address.street,
                addressLocality: BUSINESS.address.city,
                addressRegion: BUSINESS.address.state,
                postalCode: BUSINESS.address.zip,
              },
            },
            areaServed: {
              '@type': 'City',
              name: 'Chicago',
            },
          }),
        }}
      />
    </>
  )
}
