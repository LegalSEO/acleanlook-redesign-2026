'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  ArrowRight,
  ChevronRight,
  Clock,
  Shield,
  Star,
  Award,
  Heart,
  Users,
  Target,
  Paintbrush,
  ClipboardCheck,
  Palette,
  Sparkles,
  CheckCircle2,
  Phone,
  MapPin,
} from 'lucide-react'
import { BUSINESS, SERVICE_AREAS } from '@/lib/constants'

// ─── Animated Counter ───────────────────────────────────────
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const timer = setInterval(() => {
      start += Math.ceil(target / 50)
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 40)
    return () => clearInterval(timer)
  }, [isInView, target])

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

// ─── Animated Section ───────────────────────────────────────
function AnimatedSection({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

export default function AboutPage() {
  return (
    <>
      {/* ━━━ HERO ━━━ */}
      <section className="relative bg-gradient-to-br from-primary via-primary-600 to-primary-800 pt-32 pb-20 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-cta/5 rounded-full blur-3xl" />

        <div className="container-wide relative z-10">
          {/* Breadcrumb */}
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
            <span className="text-white">About</span>
          </motion.nav>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="heading-display text-white max-w-2xl"
          >
            About <span className="gradient-text">A Clean Look</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-lg text-white/80 mt-4 max-w-xl"
          >
            {BUSINESS.yearsInBusiness}+ years of trust, craftsmanship, and
            Chicago pride. Learn what makes us different.
          </motion.p>
        </div>
      </section>

      {/* ━━━ OUR STORY ━━━ */}
      <AnimatedSection className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Story image placeholder */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <div className="text-center">
                  <Paintbrush className="h-16 w-16 text-primary/30 mx-auto mb-3" />
                  <span className="text-sm text-text-secondary">
                    Photo: Steve &amp; team on site
                  </span>
                </div>
              </div>
              {/* Floating stat */}
              <div className="absolute -bottom-6 -right-4 bg-white rounded-2xl shadow-strong p-5 border border-gray-100">
                <span className="block text-3xl font-bold text-primary">
                  {BUSINESS.yearsInBusiness}+
                </span>
                <span className="text-sm text-text-secondary">
                  Years in Chicago
                </span>
              </div>
            </div>

            {/* Story content */}
            <div>
              <span className="section-label mb-4">Our Story</span>
              <h2 className="heading-1 text-primary mt-4 mb-6">
                Built on Hard Work, Driven by Pride
              </h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  A Clean Look was founded by Steve with a simple mission: deliver
                  honest, high-quality painting services to Chicago homeowners and
                  businesses. What started as a one-man operation has grown into
                  one of Chicago&apos;s most trusted painting contractors — but the
                  values haven&apos;t changed.
                </p>
                <p>
                  For over {BUSINESS.yearsInBusiness} years, we&apos;ve been
                  transforming spaces across Chicago and the North Shore suburbs.
                  We&apos;ve painted everything from Lincoln Park brownstones to
                  Wilmette mansions, Evanston condos to Loop office buildings. We
                  know this city, and we know what it takes to make a home look
                  its best through every Chicago season.
                </p>
                <p>
                  What sets us apart is our full-service approach. We&apos;re not
                  just painters — we handle power washing, gutter cleaning, and
                  handyman work too. One call, and everything gets taken care of.
                  That&apos;s the kind of convenience and reliability Chicago
                  homeowners deserve.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ━━━ BY THE NUMBERS ━━━ */}
      <AnimatedSection className="py-16 bg-primary">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Clock, value: 30, suffix: '+', label: 'Years Experience' },
              {
                icon: CheckCircle2,
                value: 1000,
                suffix: '+',
                label: 'Projects Completed',
              },
              { icon: Star, value: 5, suffix: '-Star', label: 'Average Rating' },
              { icon: MapPin, value: 16, suffix: '', label: 'Areas Served' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <stat.icon className="h-8 w-8 text-accent mx-auto mb-3" />
                <span className="block text-3xl sm:text-4xl font-bold text-white">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-sm text-white/60 mt-1">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ━━━ OUR PROCESS ━━━ */}
      <AnimatedSection className="section-padding bg-background-light">
        <div className="container-wide">
          <div className="text-center mb-14">
            <span className="section-label mb-4">How We Work</span>
            <h2 className="heading-1 text-primary mt-4">Our Process</h2>
            <p className="text-text-secondary text-lg mt-4 max-w-2xl mx-auto">
              From first call to final walkthrough — here&apos;s how we deliver
              exceptional results every time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                icon: Phone,
                title: 'Free Consultation & Estimate',
                description:
                  'Call or fill out our form. We\'ll visit your property, assess the project, and provide a detailed, transparent estimate — no obligation.',
              },
              {
                step: 2,
                icon: Palette,
                title: 'Color Selection & Planning',
                description:
                  'We help you choose the perfect colors and finishes. We\'ll plan the timeline around your schedule and Chicago\'s weather.',
              },
              {
                step: 3,
                icon: Paintbrush,
                title: 'Professional Prep & Painting',
                description:
                  'Thorough surface prep, premium Benjamin Moore paints, and meticulous application. We protect your furniture and keep the site clean.',
              },
              {
                step: 4,
                icon: ClipboardCheck,
                title: 'Final Walkthrough & Cleanup',
                description:
                  'We walk through the finished project together to ensure you\'re 100% satisfied. We leave your space cleaner than we found it.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                {/* Connector line */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-accent/20 z-0" />
                )}

                <div className="relative z-10 text-center">
                  {/* Step number */}
                  <div className="flex items-center justify-center mx-auto mb-4">
                    <div className="relative">
                      <div className="h-24 w-24 rounded-2xl bg-white shadow-soft flex items-center justify-center">
                        <item.icon className="h-10 w-10 text-primary" />
                      </div>
                      <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-cta text-white text-sm font-bold flex items-center justify-center">
                        {item.step}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ━━━ OUR VALUES ━━━ */}
      <AnimatedSection className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-center mb-14">
            <span className="section-label mb-4">What Drives Us</span>
            <h2 className="heading-1 text-primary mt-4">Our Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: 'Craftsmanship & Care',
                description:
                  'Every brushstroke matters. We take pride in delivering flawless results because your home deserves nothing less. We treat every project like it\'s our own.',
              },
              {
                icon: Users,
                title: 'Customer First',
                description:
                  'Your satisfaction is our reputation. We listen, communicate clearly, show up on time, and never cut corners. That\'s why clients keep coming back.',
              },
              {
                icon: Target,
                title: 'Reliability & Integrity',
                description:
                  'We say what we mean and deliver what we promise. Transparent pricing, honest timelines, and fully insured work. No surprises, no excuses.',
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="card-hover text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent mx-auto mb-5">
                  <value.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">
                  {value.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ━━━ BENJAMIN MOORE / QUALITY ━━━ */}
      <AnimatedSection className="section-padding bg-background-warm">
        <div className="container-wide">
          <div className="rounded-3xl bg-white shadow-soft p-8 sm:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="section-label mb-4">
                  <Sparkles className="h-4 w-4" />
                  Premium Quality
                </span>
                <h2 className="heading-2 text-primary mt-4 mb-4">
                  Benjamin Moore Preferred Contractor
                </h2>
                <p className="text-text-secondary leading-relaxed mb-6">
                  We use Benjamin Moore paints because we believe our customers
                  deserve the best. Their industry-leading formulas deliver
                  superior coverage, rich color, and lasting durability — exactly
                  what Chicago homes need to stand up to harsh winters and humid
                  summers.
                </p>
                <ul className="space-y-3">
                  {[
                    'Superior coverage and color consistency',
                    'Exceptional durability for Midwest weather',
                    'Low-VOC formulas for healthier indoor air',
                    'Industry-leading color selection',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-text-primary"
                    >
                      <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quality badge placeholder */}
              <div className="flex items-center justify-center">
                <div className="w-64 h-64 rounded-3xl bg-gradient-to-br from-primary/5 to-accent/10 flex flex-col items-center justify-center text-center p-6">
                  <Award className="h-16 w-16 text-accent mb-4" />
                  <span className="text-lg font-bold text-primary">
                    Benjamin Moore
                  </span>
                  <span className="text-sm text-text-secondary mt-1">
                    Preferred Contractor
                  </span>
                  <div className="flex items-center gap-1 mt-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-accent text-accent"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ━━━ SERVICE AREAS ━━━ */}
      <AnimatedSection className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-center mb-10">
            <span className="section-label mb-4">Where We Work</span>
            <h2 className="heading-2 text-primary mt-4">
              Proudly Serving Chicago &amp; the North Shore
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {SERVICE_AREAS.map((area) => (
              <Link
                key={area}
                href={`/areas/${area.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-background-light border border-gray-100 text-sm text-text-primary hover:border-primary/20 hover:bg-primary/5 transition-all"
              >
                <MapPin className="h-3.5 w-3.5 text-accent" />
                {area}
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/areas"
              className="btn-outline-dark btn-md rounded-full"
            >
              Explore All Areas
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* ━━━ CTA ━━━ */}
      <section className="section-padding bg-gradient-to-br from-cta via-cta-500 to-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoLTZ2LTZoNnptMC0zMHY2aC02VjRoNnptMzAgMzB2Nmg2di02aC02em0wLTMwdjZoLTZWNGg2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

        <div className="container-narrow relative z-10 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="heading-1 text-white mb-4"
          >
            Ready to Work With Us?
          </motion.h2>
          <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">
            Get your free, no-obligation estimate today. We&apos;d love to help
            transform your space.
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
    </>
  )
}
