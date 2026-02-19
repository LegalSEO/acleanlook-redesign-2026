'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  ChevronRight,
  ChevronDown,
  Calendar,
  Phone,
  ArrowRight,
  Shield,
  Star,
  Clock,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { BUSINESS } from '@/lib/constants'
import SeasonalPlanner from '@/components/tools/SeasonalPlanner'

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

// ─── FAQ ────────────────────────────────────────────────────
const FAQS = [
  {
    question: 'When is the best time to paint the exterior of a house in Chicago?',
    answer:
      'The best exterior painting season in Chicago runs from May through early October, when temperatures consistently stay above 50°F. Paint needs temps above 50°F to cure properly. We recommend booking in spring for the best scheduling options.',
  },
  {
    question: 'How often should I clean my gutters in Chicago?',
    answer:
      'Chicago homeowners should clean gutters at least twice a year: once in spring (March–April) after winter debris, and once in late fall (October–November) after leaves drop. Additional cleanings may be needed if you have many trees nearby.',
  },
  {
    question: 'When should I power wash my house in Chicago?',
    answer:
      'The best time to power wash in Chicago is May through September. If you\'re planning to paint, power wash first as it removes dirt and loose paint, helping new paint adhere better. Standalone power washing is great for spring cleanup or before summer entertaining.',
  },
  {
    question: 'Is it safe to paint indoors during winter in Chicago?',
    answer:
      'Absolutely! Interior painting can be done year-round in Chicago. In fact, winter is a great time for interior projects since painters have more availability and you can have rooms refreshed before spring. Just ensure adequate ventilation.',
  },
  {
    question: 'How do Chicago winters affect exterior paint?',
    answer:
      'Chicago\'s freeze-thaw cycles are tough on exterior paint. Moisture gets into tiny cracks, freezes, and expands — causing peeling and chipping. That\'s why fall touch-ups and proper surface prep before painting are critical for long-lasting results.',
  },
  {
    question: 'Can I set reminders for specific maintenance tasks?',
    answer:
      'Yes! Click the "Set Reminder" button on any month to receive an email reminder when that month arrives. We\'ll send you a heads-up with the key maintenance tasks so nothing falls through the cracks.',
  },
  {
    question: 'How much does seasonal home maintenance cost in Chicago?',
    answer:
      'Costs vary by service: single room interior painting $400–$900, gutter cleaning $150–$350, power washing $200–$800, and full exterior painting $4,600–$9,800. Use our Paint Estimate Calculator for detailed pricing.',
  },
  {
    question: 'Should I book painting services in advance?',
    answer:
      'Absolutely. Spring and summer are peak seasons with 2–3 week lead times. Booking in winter or early spring for summer work ensures your preferred dates and may come with early-bird pricing.',
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
export default function SeasonalPlannerPageClient() {
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
              href="/tools"
              className="hover:text-white transition-colors"
            >
              Tools
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">Seasonal Planner</span>
          </motion.nav>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm text-white/80 mb-4"
              >
                <Calendar className="h-4 w-4 text-accent" />
                Free Tool — No Sign-Up Required
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="heading-display text-white max-w-2xl"
              >
                Chicago Seasonal Planner
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="text-lg text-white/80 mt-4 max-w-xl"
              >
                Month-by-month home maintenance guide tailored to Chicago
                weather. Know exactly when to paint, clean gutters, and
                power wash.
              </motion.p>
            </div>

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

      {/* ━━━ PLANNER ━━━ */}
      <section className="py-10 sm:py-14 bg-background-light">
        <div className="container-wide max-w-3xl">
          <SeasonalPlanner />
        </div>
      </section>

      {/* ━━━ WHY THIS MATTERS ━━━ */}
      <AnimSection className="section-padding bg-white">
        <div className="container-wide max-w-3xl">
          <div className="text-center mb-10">
            <span className="section-label mb-4">Why It Matters</span>
            <h2 className="heading-1 text-primary mt-4">
              Chicago Weather Demands a Plan
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                stat: '-20° to 95°F',
                title: 'Temperature Swing',
                desc: 'Chicago\'s extreme range means timing your maintenance correctly is critical for long-lasting results.',
              },
              {
                stat: '5 Months',
                title: 'Painting Season',
                desc: 'Exterior painting is only viable May–September. Plan ahead to secure your preferred dates.',
              },
              {
                stat: '2× per Year',
                title: 'Gutter Cleaning',
                desc: 'Spring and fall cleanings prevent ice dams, water damage, and foundation issues.',
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="text-2xl font-bold text-cta mb-1">
                  {item.stat}
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
              Chicago Home Maintenance FAQ
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
            Ready to Tackle Your Projects?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">
            Whether it&apos;s painting, gutters, or power washing — we handle it
            all. Get a free estimate and check items off your maintenance list.
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
