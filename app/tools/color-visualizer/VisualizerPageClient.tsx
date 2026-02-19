'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  ChevronRight,
  ChevronDown,
  Palette,
  Phone,
  ArrowRight,
  Shield,
  Star,
  Clock,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { BUSINESS } from '@/lib/constants'
import ColorVisualizer from '@/components/tools/ColorVisualizer'

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
    question: 'How does the room color visualizer work?',
    answer:
      'Choose a template room (living room, bedroom, kitchen, etc.) and click on any wall to apply your selected color. You can also upload a photo of your own room and click on wall areas to see how colors look in your actual space.',
  },
  {
    question: 'Can I upload a photo of my own room?',
    answer:
      'Yes! Switch to "Upload Photo" mode, then upload a JPG or PNG of your room. Click on wall areas to apply your selected color. Use the tolerance slider to control how much area gets colored — lower values are more precise, higher values cover more area.',
  },
  {
    question: 'What paint brands are included?',
    answer:
      'We include 80+ curated colors from Benjamin Moore, Sherwin-Williams, a special Chicago Favorites collection inspired by local architecture, and Trending 2025 colors. You can also enter any custom hex code.',
  },
  {
    question: 'Will the colors look exactly the same on my walls?',
    answer:
      'Digital colors are a great starting point, but actual paint colors can look different depending on lighting, wall texture, and surrounding furnishings. We recommend getting paint samples to test on your wall. Use our day/night toggle to see how lighting affects the color.',
  },
  {
    question: 'Can I save or download my color choices?',
    answer:
      'Yes! Click the download button to save your visualization as a PNG image. Your recently used colors are also tracked during your session so you can easily compare and switch between favorites.',
  },
  {
    question: 'What are the Chicago Favorites colors?',
    answer:
      'Our Chicago Favorites collection features colors inspired by the city — Lake Michigan Blue, Wrigley Ivy, Lincoln Park Sage, Gold Coast Cream, and more. These colors complement Chicago\'s distinctive architectural styles.',
  },
  {
    question: 'How do I choose the right paint color?',
    answer:
      'Start by considering the room\'s lighting (north-facing rooms benefit from warmer tones, south-facing rooms can handle cooler tones). Test colors at different times of day. Use our visualizer to narrow your choices, then order physical samples. We also offer free color consultations with every estimate.',
  },
  {
    question: 'Can I visualize multiple colors in one room?',
    answer:
      'Absolutely! In template mode, click different walls to select them, then apply different colors to each wall. This is great for accent walls or complementary color schemes. Your full color palette is displayed below the room.',
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
export default function VisualizerPageClient() {
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
              href="/tools/color-visualizer"
              className="hover:text-white transition-colors"
            >
              Tools
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">Color Visualizer</span>
          </motion.nav>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm text-white/80 mb-4"
              >
                <Palette className="h-4 w-4 text-accent" />
                Free Tool — No Sign-Up Required
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="heading-display text-white max-w-2xl"
              >
                Room Color Visualizer
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="text-lg text-white/80 mt-4 max-w-xl"
              >
                Preview paint colors on template rooms or upload your own
                photo. 80+ curated colors from Benjamin Moore, Sherwin-Williams,
                and trending 2025 palettes.
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

      {/* ━━━ VISUALIZER ━━━ */}
      <section className="py-10 sm:py-14 bg-background-light">
        <div className="container-wide max-w-5xl">
          <ColorVisualizer />
        </div>
      </section>

      {/* ━━━ HOW IT WORKS ━━━ */}
      <AnimSection className="section-padding bg-white">
        <div className="container-wide max-w-3xl">
          <div className="text-center mb-10">
            <span className="section-label mb-4">How It Works</span>
            <h2 className="heading-1 text-primary mt-4">
              Visualize Your Perfect Color
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                step: '1',
                title: 'Choose a Room',
                desc: 'Pick a template room or upload a photo of your own space to use as the canvas.',
              },
              {
                step: '2',
                title: 'Browse Colors',
                desc: 'Explore 80+ curated colors from top brands, search by name, or enter a custom hex code.',
              },
              {
                step: '3',
                title: 'Preview & Compare',
                desc: 'Click walls to apply colors, try accent walls, toggle day/night lighting, and download your design.',
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
              Color Visualizer FAQ
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
            Found Your Perfect Color?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">
            Let us bring it to life. Get a free, no-obligation estimate
            for your painting project. We&apos;ll even help with final color selection.
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
