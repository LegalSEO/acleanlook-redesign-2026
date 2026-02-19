'use client'

import { useState, useMemo, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  Search,
  MapPin,
  ArrowRight,
  Phone,
  ChevronRight,
  Building2,
  Trees,
} from 'lucide-react'
import { BUSINESS, SERVICES } from '@/lib/constants'
import { AREAS } from '@/data/areas'

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

export default function AreasPage() {
  const [search, setSearch] = useState('')

  const chicagoAreas = useMemo(
    () =>
      AREAS.filter(
        (a) =>
          a.region === 'chicago' &&
          a.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  )

  const northShoreAreas = useMemo(
    () =>
      AREAS.filter(
        (a) =>
          a.region === 'north-shore' &&
          a.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  )

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
            <span className="text-white">Service Areas</span>
          </motion.nav>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="heading-display text-white max-w-3xl"
          >
            Serving Chicago &amp; North Shore Since 1994
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-lg text-white/80 mt-4 max-w-xl"
          >
            Over 30 years of trusted painting and home improvement services
            across {AREAS.length} neighborhoods and suburbs.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 max-w-md"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-light" />
              <input
                type="text"
                placeholder="Search your neighborhood..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white text-text-primary placeholder:text-text-light text-sm focus:outline-none focus:ring-2 focus:ring-accent shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ━━━ CHICAGO NEIGHBORHOODS ━━━ */}
      <AnimSection className="section-padding bg-white">
        <div className="container-wide">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="heading-2 text-primary">Chicago Neighborhoods</h2>
              <p className="text-sm text-text-secondary">
                {chicagoAreas.length} neighborhoods served
              </p>
            </div>
          </div>

          {chicagoAreas.length === 0 ? (
            <p className="text-text-secondary text-sm py-8 text-center">
              No Chicago neighborhoods match &ldquo;{search}&rdquo;
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {chicagoAreas.map((area, i) => (
                <motion.div
                  key={area.slug}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Link
                    href={`/areas/${area.slug}`}
                    className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-primary/20 hover:bg-primary/[0.02] hover:shadow-soft transition-all group"
                  >
                    <MapPin className="h-4 w-4 text-cta shrink-0" />
                    <span className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors">
                      {area.name}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-text-light ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </AnimSection>

      {/* ━━━ NORTH SHORE SUBURBS ━━━ */}
      <AnimSection className="section-padding bg-background-light">
        <div className="container-wide">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Trees className="h-5 w-5" />
            </div>
            <div>
              <h2 className="heading-2 text-primary">North Shore Suburbs</h2>
              <p className="text-sm text-text-secondary">
                {northShoreAreas.length} suburbs served
              </p>
            </div>
          </div>

          {northShoreAreas.length === 0 ? (
            <p className="text-text-secondary text-sm py-8 text-center">
              No North Shore suburbs match &ldquo;{search}&rdquo;
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {northShoreAreas.map((area, i) => (
                <motion.div
                  key={area.slug}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Link
                    href={`/areas/${area.slug}`}
                    className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-accent/20 hover:bg-accent/[0.02] hover:shadow-soft transition-all group"
                  >
                    <MapPin className="h-4 w-4 text-accent shrink-0" />
                    <span className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors">
                      {area.name}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-text-light ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </AnimSection>

      {/* ━━━ SERVICES AVAILABLE ━━━ */}
      <AnimSection className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-center mb-10">
            <span className="section-label mb-4">Our Services</span>
            <h2 className="heading-1 text-primary mt-4">
              Available in Every Area We Serve
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-background-light transition-colors group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors mb-3">
                  <MapPin className="h-5 w-5" />
                </div>
                <span className="text-xs font-semibold text-text-primary">
                  {service.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </AnimSection>

      {/* ━━━ DON'T SEE YOUR AREA CTA ━━━ */}
      <section className="section-padding bg-gradient-to-br from-cta via-cta-500 to-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoLTZ2LTZoNnptMC0zMHY2aC02VjRoNnptMzAgMzB2Nmg2di02aC02em0wLTMwdjZoLTZWNGg2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="container-narrow relative z-10 text-center">
          <h2 className="heading-1 text-white mb-4">
            Don&apos;t See Your Area?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">
            We may still serve your neighborhood! Give us a call and we&apos;ll
            let you know if we can help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              className="btn btn-lg rounded-full bg-white text-cta font-bold hover:bg-white/90 shadow-lg"
            >
              <Phone className="mr-2 h-5 w-5" />
              {BUSINESS.phone}
            </a>
            <Link
              href="/free-estimate"
              className="btn btn-lg rounded-full border-2 border-white text-white hover:bg-white hover:text-cta"
            >
              Get Free Estimate
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ━━━ JSON-LD ━━━ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
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
            areaServed: AREAS.map((a) => ({
              '@type': a.region === 'chicago' ? 'City' : 'City',
              name: a.name,
            })),
          }),
        }}
      />
    </>
  )
}
