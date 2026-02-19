'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  ChevronRight,
  ChevronDown,
  Sparkles,
  Phone,
  ArrowRight,
  Shield,
  Star,
  Clock,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { BUSINESS } from '@/lib/constants'
import PaletteGenerator from '@/components/tools/PaletteGenerator'

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
    question: 'How does the color palette generator work?',
    answer:
      'Our generator uses color harmony theory — the same principles professional designers use. Choose your input method (describe a style, pick a mood, start with a color, or select a room type), and we generate a complete 5-color palette: main walls, accent wall, trim, ceiling, and a pop accent color.',
  },
  {
    question: 'What are color harmonies?',
    answer:
      'Color harmonies are combinations of colors that naturally look pleasing together. Complementary colors sit opposite on the color wheel for bold contrast. Analogous colors sit next to each other for a cohesive feel. Triadic colors are evenly spaced for balanced vibrancy. Monochromatic uses shades of one color for subtle elegance.',
  },
  {
    question: 'Are the paint color matches accurate?',
    answer:
      'We show the closest Benjamin Moore and Sherwin-Williams matches from our curated database of 80+ popular colors. For exact matching, we recommend bringing the hex code to your local paint store where they can color-match precisely.',
  },
  {
    question: 'How do I choose between complementary and analogous palettes?',
    answer:
      'Complementary palettes create bold, energetic contrast — great for accent walls and dramatic spaces. Analogous palettes create calm, cohesive flow — ideal for bedrooms and serene spaces. Split-complementary offers a middle ground with subtle contrast.',
  },
  {
    question: 'Can I use these palettes for exterior painting?',
    answer:
      'These palettes work for any painting project. For exteriors, the "main walls" color would be your siding, "accent" for the front door or shutters, "trim" for window and door frames, and "pop" for small accents. We recommend testing samples in outdoor light.',
  },
  {
    question: 'What if I don\'t like the generated palette?',
    answer:
      'Click "Regenerate" to get a new variation using the same inputs. Each regeneration produces a unique palette based on your selection. You can also switch between input modes or harmony types to explore different directions.',
  },
  {
    question: 'Do you offer color consultations?',
    answer:
      'Yes! Every free estimate includes color guidance from our experienced team. We can help finalize your palette, suggest adjustments for your specific lighting, and recommend the right paint products. Schedule a free estimate to get started.',
  },
  {
    question: 'Can I try the colors on a room before buying paint?',
    answer:
      'Absolutely! Click "Try in Color Visualizer" to preview your palette on virtual rooms or upload a photo of your own space. This helps you see how colors actually look on walls before committing.',
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
export default function PalettePageClient() {
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
            <span className="text-white">Color Palette Generator</span>
          </motion.nav>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm text-white/80 mb-4"
              >
                <Sparkles className="h-4 w-4 text-accent" />
                Free Tool — No Sign-Up Required
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="heading-display text-white max-w-2xl"
              >
                Color Palette Generator
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="text-lg text-white/80 mt-4 max-w-xl"
              >
                Describe your style, pick a mood, or start with a color you
                love — and get a complete 5-color palette matched to real
                paint brands.
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

      {/* ━━━ GENERATOR ━━━ */}
      <section className="py-10 sm:py-14 bg-background-light">
        <div className="container-wide max-w-4xl">
          <PaletteGenerator />
        </div>
      </section>

      {/* ━━━ HOW IT WORKS ━━━ */}
      <AnimSection className="section-padding bg-white">
        <div className="container-wide max-w-3xl">
          <div className="text-center mb-10">
            <span className="section-label mb-4">How It Works</span>
            <h2 className="heading-1 text-primary mt-4">
              Your Perfect Palette in 3 Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                step: '1',
                title: 'Choose Your Input',
                desc: 'Describe your style, pick a mood, select a starting color, or choose a room type.',
              },
              {
                step: '2',
                title: 'Generate & Explore',
                desc: 'Get a 5-color palette with brand matches. Regenerate for variations until it feels right.',
              },
              {
                step: '3',
                title: 'Preview & Apply',
                desc: 'See the palette on a room mockup, then try it in our Color Visualizer or book a free consultation.',
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
              Color Palette FAQ
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
            Love Your Palette?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">
            Let us bring it to life. Get a free color consultation and
            detailed estimate for your painting project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/free-estimate"
              className="btn btn-lg rounded-full bg-white text-cta font-bold hover:bg-white/90 shadow-lg"
            >
              Get Free Color Consultation
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
