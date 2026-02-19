'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  ChevronRight,
  ArrowRight,
  Phone,
  HelpCircle,
  Paintbrush,
  Home,
  Building2,
  Droplets,
  Waves,
  Wrench,
} from 'lucide-react'
import { BUSINESS, SERVICES } from '@/lib/constants'
import { breadcrumbSchema, combineSchemas } from '@/lib/seo'

const iconMap: Record<string, React.ElementType> = {
  Paintbrush, Home, Building2, Droplets, Waves, Wrench,
}

function AnimSection({ children, className }: { children: React.ReactNode; className?: string }) {
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

export default function ServicesPage() {
  const servicesListSchema = {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'Painting & Home Services',
    provider: { '@id': 'https://acleanlook.com/#business' },
    itemListElement: SERVICES.map((s, i) => ({
      '@type': 'Offer',
      position: i + 1,
      itemOffered: {
        '@type': 'Service',
        name: s.title,
        description: s.shortDescription,
        url: `https://acleanlook.com/services/${s.slug}`,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: combineSchemas(
            breadcrumbSchema([
              { name: 'Home', href: '/' },
              { name: 'Services', href: '/services' },
            ]),
            servicesListSchema
          ),
        }}
      />

      {/* ━━━ HERO ━━━ */}
      <section className="relative bg-gradient-to-br from-primary via-primary-600 to-primary-800 pt-32 pb-20 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="container-wide relative z-10">
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-white/60 mb-6"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">Services</span>
          </motion.nav>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="heading-display text-white"
          >
            Our <span className="gradient-text">Services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-white/80 mt-4 max-w-xl"
          >
            Full-service painting, power washing, gutter cleaning, and handyman
            work. One call does it all — serving Chicago &amp; the North Shore
            for {BUSINESS.yearsInBusiness}+ years.
          </motion.p>
        </div>
      </section>

      {/* ━━━ SERVICES GRID ━━━ */}
      <AnimSection className="section-padding bg-background-light">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, i) => {
              const Icon = iconMap[service.icon]
              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className="card-hover block h-full group p-8"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors mb-6">
                      {Icon && <Icon className="h-8 w-8" />}
                    </div>
                    <h2 className="text-xl font-bold text-primary mb-3">
                      {service.title}
                    </h2>
                    <p className="text-text-secondary text-sm leading-relaxed mb-5">
                      {service.shortDescription}
                    </p>
                    <span className="inline-flex items-center text-sm font-semibold text-cta group-hover:gap-2 transition-all">
                      Learn More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </AnimSection>

      {/* ━━━ NOT SURE? ━━━ */}
      <AnimSection className="section-padding bg-white">
        <div className="container-narrow">
          <div className="rounded-3xl bg-gradient-to-br from-primary to-primary-700 p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <HelpCircle className="h-12 w-12 text-accent mx-auto mb-4" />
              <h2 className="heading-2 text-white mb-3">
                Not Sure What You Need?
              </h2>
              <p className="text-white/70 mb-8 max-w-md mx-auto">
                No problem. Give us a call or request a free estimate — we&apos;ll
                visit your property, assess the work needed, and recommend the
                best approach.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/free-estimate"
                  className="btn btn-lg rounded-full bg-cta text-white font-bold hover:bg-cta-600 shadow-lg"
                >
                  Get Free Estimate
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <a
                  href={`tel:${BUSINESS.phoneRaw}`}
                  className="btn btn-lg rounded-full border-2 border-white text-white hover:bg-white hover:text-primary"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  {BUSINESS.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </AnimSection>
    </>
  )
}
