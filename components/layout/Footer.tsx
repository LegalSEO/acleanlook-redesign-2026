'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Star,
  ExternalLink,
} from 'lucide-react'
import { BUSINESS, SOCIAL, SERVICE_AREAS, SERVICES } from '@/lib/constants'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-primary to-primary-900 text-white">
      {/* Main footer */}
      <div className="container-wide section-padding pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Company info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/logos/acleanlook8.png"
                alt="A Clean Look — Chicago Painting Services"
                width={320}
                height={120}
                className="h-20 sm:h-24 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Chicago&apos;s trusted painting professionals with {BUSINESS.yearsInBusiness}+ years
              of experience. Full-service painting, power washing, gutter
              cleaning, and handyman services.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={SOCIAL.yelp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Yelp"
              >
                <Star className="h-4 w-4" />
              </a>
              <a
                href={SOCIAL.houzz}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Houzz"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href={SOCIAL.google}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Google Business"
              >
                <MapPin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">
              Services
            </h3>
            <ul className="space-y-2.5">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-sm font-semibold text-accent hover:text-accent-300 transition-colors"
                >
                  View All Services &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">
              Areas We Serve
            </h3>
            <ul className="space-y-2.5">
              {SERVICE_AREAS.slice(0, 8).map((area) => (
                <li key={area}>
                  <Link
                    href={`/areas/${area.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {area}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/areas"
                  className="text-sm font-semibold text-accent hover:text-accent-300 transition-colors"
                >
                  See All Areas &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div
            itemScope
            itemType="https://schema.org/LocalBusiness"
          >
            <meta itemProp="name" content={BUSINESS.name} />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">
              Contact Us
            </h3>
            <div className="space-y-4">
              <a
                href={`tel:${BUSINESS.phoneRaw}`}
                className="flex items-center gap-3 text-white hover:text-accent transition-colors group"
                itemProp="telephone"
                content={BUSINESS.phone}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cta/20 group-hover:bg-cta transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-sm font-semibold">
                    {BUSINESS.phone}
                  </span>
                  <span className="block text-xs text-white/50">
                    Call or Text
                  </span>
                </div>
              </a>

              <a
                href={`mailto:${BUSINESS.email}`}
                className="flex items-center gap-3 text-white hover:text-accent transition-colors group"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/20 group-hover:bg-accent transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <span
                    className="block text-sm font-semibold"
                    itemProp="email"
                  >
                    {BUSINESS.email}
                  </span>
                  <span className="block text-xs text-white/50">Email Us</span>
                </div>
              </a>

              <div
                className="flex items-start gap-3"
                itemProp="address"
                itemScope
                itemType="https://schema.org/PostalAddress"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-sm text-white/70">
                    <span itemProp="streetAddress">
                      {BUSINESS.address.street}
                    </span>
                    <br />
                    <span itemProp="addressLocality">
                      {BUSINESS.address.city}
                    </span>
                    ,{' '}
                    <span itemProp="addressRegion">
                      {BUSINESS.address.state}
                    </span>{' '}
                    <span itemProp="postalCode">{BUSINESS.address.zip}</span>
                  </span>
                </div>
              </div>
            </div>

            <Link
              href="/free-estimate"
              className="mt-6 block w-full text-center py-3 rounded-full bg-cta text-white font-semibold hover:bg-cta-600 transition-colors"
            >
              Get Free Estimate
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-wide flex flex-col sm:flex-row items-center justify-between gap-4 py-6 text-sm text-white/50">
          <p>
            &copy; {currentYear} {BUSINESS.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
