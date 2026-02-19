'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  ChevronRight,
  Phone,
  ArrowRight,
  MapPin,
  Shield,
  Star,
  CheckCircle2,
  Paintbrush,
  Home,
  Building2,
  Droplets,
  Waves,
  Wrench,
} from 'lucide-react'
import { BUSINESS, SERVICES } from '@/lib/constants'
import type { AreaData } from '@/data/areas'

const serviceIconMap: Record<string, React.ElementType> = {
  Paintbrush,
  Home,
  Building2,
  Droplets,
  Waves,
  Wrench,
}

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

export default function AreaPageClient({
  area,
  nearby,
}: {
  area: AreaData
  nearby: AreaData[]
}) {
  const regionLabel =
    area.region === 'chicago' ? 'Chicago' : 'the North Shore'

  return (
    <>
      {/* ━━━ HERO ━━━ */}
      <section className="relative bg-gradient-to-br from-primary via-primary-600 to-primary-800 pt-32 pb-20 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-cta/5 rounded-full blur-3xl" />

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
              href="/areas"
              className="hover:text-white transition-colors"
            >
              Service Areas
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">{area.name}</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm text-white/80 mb-4"
          >
            <MapPin className="h-4 w-4 text-accent" />
            {area.region === 'chicago'
              ? 'Chicago Neighborhood'
              : 'North Shore Suburb'}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="heading-display text-white max-w-3xl"
          >
            {area.name} Painting &amp; Home Services
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-lg text-white/80 mt-4 max-w-xl"
          >
            Professional painting, power washing, and home improvement services
            for {area.name} homeowners and businesses.
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

      {/* ━━━ ABOUT THIS AREA ━━━ */}
      <AnimSection className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <h2 className="heading-2 text-primary mb-4">
                Painting Services in {area.name}
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                A Clean Look proudly serves {area.name} homeowners and
                businesses with professional painting, power washing, gutter
                cleaning, and handyman services. With over 30 years of
                experience in {regionLabel}, we understand the unique needs of
                properties in this area — from local weather challenges to
                architectural styles.
              </p>
              <p className="text-text-secondary leading-relaxed mb-4">
                {area.description}
              </p>
              <p className="text-text-secondary leading-relaxed">
                Whether you need a single room refreshed or a complete exterior
                repaint, our team delivers the same meticulous preparation,
                premium Benjamin Moore paints, and clean-line execution that has
                earned us a 5-star reputation across {regionLabel}. Every
                project starts with a free, no-obligation estimate.
              </p>
            </div>

            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-background-light p-6 sticky top-28">
                <h3 className="text-lg font-bold text-primary mb-4">
                  Why {area.name} Chooses Us
                </h3>
                <div className="space-y-3">
                  {[
                    { icon: Shield, text: 'Fully insured & licensed' },
                    { icon: Star, text: '5-star rated on Google & Yelp' },
                    { icon: CheckCircle2, text: 'Free detailed estimates' },
                    {
                      icon: MapPin,
                      text: `Serving ${area.name} for 30+ years`,
                    },
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

      {/* ━━━ SERVICES IN THIS AREA ━━━ */}
      <AnimSection className="section-padding bg-background-light">
        <div className="container-wide">
          <div className="text-center mb-10">
            <span className="section-label mb-4">Our Services</span>
            <h2 className="heading-1 text-primary mt-4">
              Services Available in {area.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => {
              const Icon = serviceIconMap[service.icon]
              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
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
                      Learn More{' '}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </AnimSection>

      {/* ━━━ NEARBY AREAS ━━━ */}
      {nearby.length > 0 && (
        <AnimSection className="section-padding bg-white">
          <div className="container-wide">
            <div className="text-center mb-10">
              <span className="section-label mb-4">Nearby</span>
              <h2 className="heading-2 text-primary mt-4">
                Also Serving Nearby Areas
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {nearby.map((n) => (
                <Link
                  key={n.slug}
                  href={`/areas/${n.slug}`}
                  className="flex items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-primary/20 hover:shadow-soft transition-all group"
                >
                  <MapPin className="h-4 w-4 text-cta shrink-0" />
                  <span className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors">
                    {n.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </AnimSection>
      )}

      {/* ━━━ CTA ━━━ */}
      <section className="section-padding bg-gradient-to-br from-cta via-cta-500 to-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoLTZ2LTZoNnptMC0zMHY2aC02VjRoNnptMzAgMzB2Nmg2di02aC02em0wLTMwdjZoLTZWNGg2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="container-narrow relative z-10 text-center">
          <h2 className="heading-1 text-white mb-4">
            Ready to Transform Your {area.name} Home?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">
            Get a free, no-obligation estimate for your painting or home
            improvement project in {area.name}.
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
            name: `Painting & Home Services in ${area.name}`,
            description: `Professional painting, power washing, and home improvement services for ${area.name} homeowners and businesses.`,
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
              '@type': 'Place',
              name: area.name,
              geo: {
                '@type': 'GeoCoordinates',
                latitude: area.lat,
                longitude: area.lng,
              },
            },
          }),
        }}
      />
    </>
  )
}
