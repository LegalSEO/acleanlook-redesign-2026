'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Calculator,
  Palette,
  Calendar,
  Sparkles,
  ArrowRight,
  Phone,
  Shield,
  Star,
  Clock,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { BUSINESS } from '@/lib/constants'

// ─── Tool Data ──────────────────────────────────────────────

const TOOLS = [
  {
    title: 'Paint Estimate Calculator',
    description:
      'Get an instant cost estimate for your painting project based on real Chicago market pricing. Interior and exterior, room-by-room.',
    href: '/tools/paint-estimator',
    icon: Calculator,
    color: 'bg-cta/10 text-cta',
    badge: 'Most Popular',
    features: [
      'Interior & exterior pricing',
      'Room-by-room estimates',
      'Chicago market data',
      'Email your estimate',
    ],
  },
  {
    title: 'Room Color Visualizer',
    description:
      'Preview paint colors on template rooms or upload your own photo. 80+ curated colors from Benjamin Moore, Sherwin-Williams, and trending 2025 palettes.',
    href: '/tools/color-visualizer',
    icon: Palette,
    color: 'bg-primary/10 text-primary',
    badge: null,
    features: [
      '6 room templates',
      'Upload your own photo',
      '80+ curated colors',
      'Day/night preview',
    ],
  },
  {
    title: 'Seasonal Maintenance Planner',
    description:
      'Month-by-month home maintenance guide tailored to Chicago weather. Know exactly when to paint, clean gutters, and power wash.',
    href: '/tools/seasonal-planner',
    icon: Calendar,
    color: 'bg-green-50 text-green-600',
    badge: null,
    features: [
      '12-month schedule',
      'Chicago weather-specific',
      'Priority task levels',
      'Set email reminders',
    ],
  },
  {
    title: 'Color Palette Generator',
    description:
      'Generate beautiful 5-color palettes using color harmony theory. Describe your style, pick a mood, or start with a color you love.',
    href: '/tools/color-palette',
    icon: Sparkles,
    color: 'bg-purple-50 text-purple-600',
    badge: 'New',
    features: [
      '4 input methods',
      '5 harmony algorithms',
      'Brand color matching',
      'Room mockup preview',
    ],
  },
]

// ─── Tool Card ──────────────────────────────────────────────

function ToolCard({
  tool,
  index,
}: {
  tool: (typeof TOOLS)[number]
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link
        href={tool.href}
        className="group block rounded-2xl border border-gray-100 bg-white overflow-hidden hover:shadow-medium hover:border-gray-200 transition-all"
      >
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-xl',
                tool.color
              )}
            >
              <tool.icon className="h-6 w-6" />
            </div>
            {tool.badge && (
              <span
                className={cn(
                  'px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide',
                  tool.badge === 'Most Popular'
                    ? 'bg-cta/10 text-cta'
                    : 'bg-purple-50 text-purple-600'
                )}
              >
                {tool.badge}
              </span>
            )}
          </div>

          <h3 className="text-lg font-bold text-text-primary group-hover:text-primary transition-colors">
            {tool.title}
          </h3>
          <p className="text-sm text-text-secondary mt-2 leading-relaxed">
            {tool.description}
          </p>
        </div>

        {/* Features */}
        <div className="px-6 pb-4">
          <ul className="space-y-1.5">
            {tool.features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 text-xs text-text-secondary"
              >
                <div className="h-1 w-1 rounded-full bg-accent shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-background-light border-t border-gray-50 flex items-center justify-between">
          <span className="text-xs font-semibold text-primary">
            Free — No Sign-Up
          </span>
          <span className="flex items-center gap-1 text-xs font-medium text-cta group-hover:gap-2 transition-all">
            Try It Now
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

// ─── Main Page ──────────────────────────────────────────────

export default function ToolsHubPage() {
  return (
    <>
      {/* ━━━ HERO ━━━ */}
      <section className="relative bg-gradient-to-br from-primary via-primary-600 to-primary-800 pt-32 pb-16 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-cta/10 rounded-full blur-2xl" />
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
            <span className="text-white">Tools</span>
          </motion.nav>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="heading-display text-white max-w-2xl"
              >
                Free Tools for Chicago Homeowners
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="text-lg text-white/80 mt-4 max-w-xl"
              >
                Estimate costs, preview colors, plan maintenance, and generate
                palettes — all free, no sign-up required. Built by painters,
                for homeowners.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex gap-6"
            >
              {[
                { icon: Shield, label: '30+ Years' },
                { icon: Star, label: '5-Star Rated' },
                { icon: Clock, label: 'Always Free' },
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

      {/* ━━━ TOOLS GRID ━━━ */}
      <section className="py-12 sm:py-16 bg-background-light">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TOOLS.map((tool, i) => (
              <ToolCard key={tool.href} tool={tool} index={i} />
            ))}
          </div>

          {/* Coming Soon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 rounded-2xl border border-dashed border-gray-200 p-8 text-center"
          >
            <p className="text-sm font-semibold text-text-secondary">
              More tools coming soon
            </p>
            <p className="text-xs text-text-light mt-1">
              Budget planning worksheets, contractor comparison checklists,
              and more
            </p>
          </motion.div>
        </div>
      </section>

      {/* ━━━ CTA ━━━ */}
      <section className="section-padding bg-gradient-to-br from-cta via-cta-500 to-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoLTZ2LTZoNnptMC0zMHY2aC02VjRoNnptMzAgMzB2Nmg2di02aC02em0wLTMwdjZoLTZWNGg2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="container-narrow relative z-10 text-center">
          <h2 className="heading-1 text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">
            Tools are great for planning — but nothing beats a personalized
            estimate from our 30+ year team. Free, no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/free-estimate"
              className="btn btn-lg rounded-full bg-white text-cta font-bold hover:bg-white/90 shadow-lg"
            >
              Get Your Free Estimate
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
    </>
  )
}
