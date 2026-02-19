'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  Star,
  ChevronRight,
  ArrowRight,
  Phone,
  MapPin,
  Shield,
  Award,
  ThumbsUp,
  ExternalLink,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { BUSINESS, SOCIAL } from '@/lib/constants'
import { REVIEWS, getAverageRating, REVIEW_SERVICES } from '@/data/testimonials'

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

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'lg' }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            size === 'lg' ? 'h-6 w-6' : 'h-4 w-4',
            i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'
          )}
        />
      ))}
    </div>
  )
}

export default function ReviewsPage() {
  const [filter, setFilter] = useState('All')
  const averageRating = getAverageRating()

  const filtered =
    filter === 'All'
      ? REVIEWS
      : REVIEWS.filter((r) => r.service === filter)

  return (
    <>
      {/* ━━━ HERO ━━━ */}
      <section className="relative bg-gradient-to-br from-primary via-primary-600 to-primary-800 pt-32 pb-20 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
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
            <span className="text-white">Reviews</span>
          </motion.nav>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="heading-display text-white max-w-3xl"
          >
            What Our Customers Say
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-lg text-white/80 mt-4 max-w-xl"
          >
            30+ years of 5-star service across Chicago and the North Shore.
            Don&apos;t take our word for it — hear from our customers.
          </motion.p>
        </div>
      </section>

      {/* ━━━ RATING SUMMARY ━━━ */}
      <AnimSection className="py-12 bg-white border-b border-gray-100">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Overall Rating */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-primary">
                  {averageRating}
                </div>
                <StarRating rating={Math.round(averageRating)} size="lg" />
                <p className="text-sm text-text-secondary mt-1">
                  {REVIEWS.length} reviews
                </p>
              </div>
              <div className="hidden sm:block w-px h-16 bg-gray-200" />
              <div className="hidden sm:flex flex-col gap-1.5">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = REVIEWS.filter(
                    (r) => r.rating === stars
                  ).length
                  const pct =
                    REVIEWS.length > 0
                      ? (count / REVIEWS.length) * 100
                      : 0
                  return (
                    <div
                      key={stars}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span className="text-text-secondary w-3">
                        {stars}
                      </span>
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-text-light w-6 text-right">
                        {count}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex gap-4">
              {[
                { icon: Shield, label: 'Fully Insured' },
                { icon: Award, label: '30+ Years' },
                { icon: ThumbsUp, label: '1000+ Projects' },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="flex flex-col items-center text-center p-3"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/5 text-primary mb-2">
                    <badge.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold text-text-primary">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimSection>

      {/* ━━━ FILTER TABS ━━━ */}
      <section className="bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="container-wide py-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {REVIEW_SERVICES.map((service) => (
              <button
                key={service}
                onClick={() => setFilter(service)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                  filter === service
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                )}
              >
                {service}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ REVIEWS GRID ━━━ */}
      <AnimSection className="section-padding bg-background-light">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((review, i) => (
              <motion.div
                key={review.name + review.date}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-white rounded-2xl p-6 shadow-soft border border-gray-50"
              >
                <StarRating rating={review.rating} />
                <blockquote className="mt-4 text-sm text-text-secondary leading-relaxed font-playfair italic">
                  &ldquo;{review.text}&rdquo;
                </blockquote>
                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      {review.name}
                    </p>
                    <p className="text-xs text-text-light flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3" />
                      {review.neighborhood}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-primary">
                      {review.service}
                    </p>
                    <p className="text-xs text-text-light mt-0.5">
                      {new Date(review.date).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-text-secondary">
                No reviews found for this service.
              </p>
            </div>
          )}
        </div>
      </AnimSection>

      {/* ━━━ LEAVE A REVIEW ━━━ */}
      <AnimSection className="section-padding bg-white">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center">
            <span className="section-label mb-4">Share Your Experience</span>
            <h2 className="heading-1 text-primary mt-4 mb-4">
              Leave Us a Review
            </h2>
            <p className="text-text-secondary mb-8">
              Had a great experience with A Clean Look? We&apos;d love to hear
              about it! Your review helps other homeowners find quality
              painting services.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={SOCIAL.google}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border-2 border-gray-200 text-sm font-semibold text-text-primary hover:border-primary/30 hover:shadow-soft transition-all"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google Review
                <ExternalLink className="h-3.5 w-3.5 text-text-light" />
              </a>
              <a
                href={SOCIAL.yelp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border-2 border-gray-200 text-sm font-semibold text-text-primary hover:border-[#FF1A1A]/30 hover:shadow-soft transition-all"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#FF1A1A">
                  <path d="M20.16 12.594l-4.995 1.433c-.96.276-1.74-.8-1.176-1.63l2.768-4.076c.564-.83 1.868-.392 1.868.627v3.046c0 .22-.18.4-.465.6zm-8.428 5.737l1.433-4.994c.276-.96-.8-1.74-1.63-1.176l-4.076 2.768c-.83.564-.392 1.868.627 1.868h3.046c.22 0 .4-.18.6-.466zm-1.06-8.662l-1.434-4.995c-.275-.96-1.74-.96-2.016 0l-1.433 4.995c-.276.96.8 1.74 1.63 1.176l1.81-1.232c.17-.116.34-.116.51 0l1.81 1.232c.83.564 1.907-.216 1.123-1.176zM5.84 12.594c.065.42-.245.6-.465.6H2.33c-1.02 0-1.46-1.304-.627-1.868l4.076-2.768c.83-.564 1.906.216 1.176 1.63l-1.116 2.406z" />
                </svg>
                Yelp Review
                <ExternalLink className="h-3.5 w-3.5 text-text-light" />
              </a>
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border-2 border-gray-200 text-sm font-semibold text-text-primary hover:border-[#1877F2]/30 hover:shadow-soft transition-all"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook Review
                <ExternalLink className="h-3.5 w-3.5 text-text-light" />
              </a>
            </div>
          </div>
        </div>
      </AnimSection>

      {/* ━━━ CTA ━━━ */}
      <section className="section-padding bg-gradient-to-br from-cta via-cta-500 to-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoLTZ2LTZoNnptMC0zMHY2aC02VjRoNnptMzAgMzB2Nmg2di02aC02em0wLTMwdjZoLTZWNGg2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="container-narrow relative z-10 text-center">
          <h2 className="heading-1 text-white mb-4">
            Join Our 1,000+ Happy Customers
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">
            Experience the A Clean Look difference. Get your free,
            no-obligation estimate today.
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

      {/* ━━━ JSON-LD REVIEWS ━━━ */}
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
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: averageRating,
              reviewCount: REVIEWS.length,
              bestRating: 5,
              worstRating: 1,
            },
            review: REVIEWS.map((r) => ({
              '@type': 'Review',
              author: { '@type': 'Person', name: r.name },
              reviewRating: {
                '@type': 'Rating',
                ratingValue: r.rating,
                bestRating: 5,
              },
              reviewBody: r.text,
              datePublished: r.date,
            })),
          }),
        }}
      />
    </>
  )
}
