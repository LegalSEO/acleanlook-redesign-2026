'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  ChevronRight,
  ChevronDown,
  Calculator,
  Phone,
  ArrowRight,
  Shield,
  Star,
  Clock,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { BUSINESS } from '@/lib/constants'
import EstimateCalculator from '@/components/tools/EstimateCalculator'

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
const FAQS = [
  {
    question: 'How much does it cost to paint a room in Chicago?',
    answer:
      'The average cost to paint a single room in Chicago ranges from $400 to $900, with the average around $640. This includes labor, paint, and basic prep work. Factors like room size, ceiling height, surface condition, and paint quality affect the final price.',
  },
  {
    question: 'How much does exterior painting cost in Chicago?',
    answer:
      'Exterior painting in Chicago typically costs $2.10 to $3.25 per square foot, or $4,612 to $9,836 for a full home exterior. The average is around $7,224. Factors include home size, number of stories, siding material, surface condition, and paint quality.',
  },
  {
    question: 'What affects the cost of a painting project?',
    answer:
      'The main factors are: room/home size, surface condition (good surfaces need less prep), paint quality tier, number of stories (exterior), whether ceilings and trim are included, and the number of colors. Our calculator accounts for all of these.',
  },
  {
    question: 'Is this estimate accurate?',
    answer:
      'Our calculator uses real Chicago market pricing data and produces reliable range estimates. For an exact quote, we recommend scheduling a free in-home estimate where we can assess specific conditions, measure precisely, and provide a detailed written quote.',
  },
  {
    question: 'What paint brands do you recommend?',
    answer:
      'We primarily use Benjamin Moore paints. Our "Standard" tier uses quality paint with good coverage. "Premium" uses Benjamin Moore Regal Select for superior coverage and durability. "Ultra Premium" uses Benjamin Moore Aura — the best coverage, self-priming, and lowest VOC.',
  },
  {
    question: 'When is the best time to paint in Chicago?',
    answer:
      'Interior painting can be done year-round. For exterior painting, the best season in Chicago is late May through early October, when temperatures consistently stay above 50°F. We monitor weather closely and schedule around rain.',
  },
  {
    question: 'Do you offer free estimates?',
    answer:
      'Yes! We provide free, no-obligation in-home estimates for all projects. We measure rooms, assess surface conditions, discuss color options, and provide a detailed written estimate — typically within 24 hours of the visit.',
  },
  {
    question: 'How long does a typical painting project take?',
    answer:
      'A single room typically takes 1 day. A full home interior (3–4 bedrooms) usually takes 3–5 days. Exterior projects for an average home take 5–7 days depending on prep work and weather. We provide a timeline with every estimate.',
  },
]

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {FAQS.map((faq, i) => (
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

// ─── Main Page ──────────────────────────────────────────────
export default function EstimatorPageClient() {
  return (
    <>
      {/* ━━━ HERO ━━━ */}
      <section className="relative bg-gradient-to-br from-primary via-primary-600 to-primary-800 pt-32 pb-16 overflow-hidden">
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
            <Link
              href="/tools/paint-estimator"
              className="hover:text-white transition-colors"
            >
              Tools
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">Paint Estimator</span>
          </motion.nav>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm text-white/80 mb-4"
              >
                <Calculator className="h-4 w-4 text-accent" />
                Free Tool — No Sign-Up Required
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="heading-display text-white max-w-2xl"
              >
                Paint Estimate Calculator
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="text-lg text-white/80 mt-4 max-w-xl"
              >
                Get an instant estimate for your painting project based on
                real Chicago market pricing. Takes less than 60 seconds.
              </motion.p>
            </div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex gap-6"
            >
              {[
                { icon: Shield, label: 'Insured & Licensed' },
                { icon: Star, label: '5-Star Rated' },
                { icon: Clock, label: 'Free Estimates' },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="flex flex-col items-center text-center"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white mb-1.5">
                    <badge.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs text-white/70 font-medium">
                    {badge.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ━━━ CALCULATOR ━━━ */}
      <section className="py-10 sm:py-14 bg-background-light">
        <div className="container-wide max-w-3xl">
          <EstimateCalculator />
        </div>
      </section>

      {/* ━━━ HOW IT WORKS ━━━ */}
      <AnimSection className="section-padding bg-white">
        <div className="container-wide max-w-3xl">
          <div className="text-center mb-10">
            <span className="section-label mb-4">How It Works</span>
            <h2 className="heading-1 text-primary mt-4">
              From Estimate to Finished Project
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                step: '1',
                title: 'Use the Calculator',
                desc: 'Get an instant range estimate based on your project details and Chicago market data.',
              },
              {
                step: '2',
                title: 'Get an Exact Quote',
                desc: 'Schedule a free in-home estimate. We measure, assess, and provide a detailed written quote.',
              },
              {
                step: '3',
                title: 'Love Your Results',
                desc: 'Our team delivers flawless painting with meticulous prep, premium paints, and a clean finish.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cta text-white text-lg font-bold mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="text-sm font-bold text-primary mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </AnimSection>

      {/* ━━━ FAQ ━━━ */}
      <AnimSection className="section-padding bg-background-light">
        <div className="container-wide max-w-3xl">
          <div className="text-center mb-10">
            <span className="section-label mb-4">FAQ</span>
            <h2 className="heading-1 text-primary mt-4">
              Chicago Painting Cost FAQ
            </h2>
          </div>
          <FAQSection />
        </div>
      </AnimSection>

      {/* ━━━ CTA ━━━ */}
      <section className="section-padding bg-gradient-to-br from-cta via-cta-500 to-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoLTZ2LTZoNnptMC0zMHY2aC02VjRoNnptMzAgMzB2Nmg2di02aC02em0wLTMwdjZoLTZWNGg2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="container-narrow relative z-10 text-center">
          <h2 className="heading-1 text-white mb-4">
            Ready for an Exact Quote?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">
            Our free in-home estimates are detailed, accurate, and come with
            no obligation. Average response time: under 2 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/free-estimate"
              className="btn btn-lg rounded-full bg-white text-cta font-bold hover:bg-white/90 shadow-lg"
            >
              Schedule Free Estimate
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

      {/* ━━━ JSON-LD FAQPage ━━━ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQS.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </>
  )
}
