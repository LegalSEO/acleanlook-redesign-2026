'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion'
import {
  Phone,
  ArrowRight,
  Shield,
  Clock,
  Star,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Paintbrush,
  Home,
  Building2,
  Droplets,
  Waves,
  Wrench,
  Award,
  Thermometer,
  DollarSign,
  Download,
  Mail,
  User,
  MapPin,
  Calculator,
  Palette,
  Calendar,
  Sparkles,
  BookOpen,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  BUSINESS,
  SERVICES,
  SERVICE_AREAS,
  TESTIMONIALS,
} from '@/lib/constants'

// ─── Icon Map ───────────────────────────────────────────────
const iconMap: Record<string, React.ElementType> = {
  Paintbrush,
  Home,
  Building2,
  Droplets,
  Waves,
  Wrench,
}

// ─── Animated Counter ───────────────────────────────────────
function AnimatedCounter({
  target,
  suffix = '',
  prefix = '',
  duration = 2,
}: {
  target: number
  suffix?: string
  prefix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const end = target
    const stepTime = (duration * 1000) / end
    const timer = setInterval(() => {
      start += Math.ceil(end / 60)
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [isInView, target, duration])

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

// ─── Before/After Slider ────────────────────────────────────
function BeforeAfterSlider({
  beforeLabel,
  afterLabel,
  beforeColor,
  afterColor,
}: {
  beforeLabel: string
  afterLabel: string
  beforeColor: string
  afterColor: string
}) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setSliderPosition((x / rect.width) * 100)
  }, [])

  const handleMouseDown = () => {
    isDragging.current = true
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return
      handleMove(e.clientX)
    }
    const handleMouseUp = () => {
      isDragging.current = false
    }
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return
      handleMove(e.touches[0].clientX)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleMouseUp)
    }
  }, [handleMove])

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-col-resize select-none"
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      {/* After (full background) */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ backgroundColor: afterColor }}
      >
        <span className="text-white text-lg font-semibold px-3 py-1 bg-black/30 rounded-lg">
          {afterLabel}
        </span>
      </div>

      {/* Before (clipped) */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          backgroundColor: beforeColor,
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
        }}
      >
        <span className="text-white text-lg font-semibold px-3 py-1 bg-black/30 rounded-lg">
          {beforeLabel}
        </span>
      </div>

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
          <div className="flex items-center gap-0.5 text-primary">
            <ChevronLeft className="h-4 w-4" />
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Section Wrapper with Scroll Animation ──────────────────
function AnimatedSection({
  children,
  className,
  id,
}: {
  children: React.ReactNode
  className?: string
  id?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

// ─── Main Homepage ──────────────────────────────────────────
export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      {/* ━━━ HERO SECTION ━━━ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/hero loop videos/chicagopainters1.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-primary-900/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-transparent to-primary-900/40" />
        </div>

        <div className="container-wide relative z-10 pt-32 pb-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-accent backdrop-blur-sm border border-white/10 mb-6">
                <Award className="h-4 w-4" />
                Trusted Since 1994
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="heading-display text-white mb-6"
            >
              Chicago&apos;s Trusted{' '}
              <span className="gradient-text">Painting</span>{' '}
              Professionals
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl leading-relaxed"
            >
              {BUSINESS.yearsInBusiness}+ years transforming Chicago homes &amp;
              businesses. Interior &amp; exterior painting, power washing,
              gutter cleaning, and more.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <Link
                href="/free-estimate"
                className="btn-primary btn-lg rounded-full shadow-glow-orange"
              >
                Get Free Estimate
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/gallery"
                className="btn-outline btn-lg rounded-full"
              >
                View Our Work
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <a
                href={`tel:${BUSINESS.phoneRaw}`}
                className="inline-flex items-center gap-3 text-white/90 hover:text-white transition-colors group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cta/20 group-hover:bg-cta transition-colors">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs text-white/60 uppercase tracking-wider">
                    Call Now
                  </span>
                  <span className="block text-xl font-bold">
                    {BUSINESS.phone}
                  </span>
                </div>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="scroll-indicator flex flex-col items-center gap-2 text-white/50"
          >
            <span className="text-xs uppercase tracking-wider">Scroll</span>
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </div>
      </section>

      {/* ━━━ TRUST BAR ━━━ */}
      <AnimatedSection className="relative -mt-1 bg-white py-12 shadow-soft z-10">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              {
                icon: Clock,
                value: 30,
                suffix: '+',
                label: 'Years Experience',
              },
              {
                icon: Shield,
                value: 1000,
                suffix: '+',
                label: 'Projects Completed',
              },
              { icon: Star, value: 5, suffix: '-Star', label: 'Rated' },
              { icon: Award, value: 100, suffix: '%', label: 'Fully Insured' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                <stat.icon className="h-8 w-8 text-accent mb-3" />
                <span className="text-3xl sm:text-4xl font-bold text-primary">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                  />
                </span>
                <span className="text-sm text-text-secondary mt-1">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-10 pt-8 border-t border-gray-100">
            {['Benjamin Moore Preferred', 'Fully Insured', 'BBB Accredited', 'Licensed Contractor'].map(
              (badge) => (
                <div
                  key={badge}
                  className="flex items-center gap-2 text-sm text-text-secondary"
                >
                  <Shield className="h-4 w-4 text-accent" />
                  {badge}
                </div>
              )
            )}
          </div>
        </div>
      </AnimatedSection>

      {/* ━━━ SERVICES OVERVIEW ━━━ */}
      <AnimatedSection
        id="services"
        className="section-padding bg-background-light"
      >
        <div className="container-wide">
          <div className="text-center mb-14">
            <span className="section-label mb-4">What We Do</span>
            <h2 className="heading-1 text-primary mt-4">Our Services</h2>
            <p className="text-text-secondary text-lg mt-4 max-w-2xl mx-auto">
              From interior painting to gutter cleaning — one call does it all.
              {BUSINESS.yearsInBusiness}+ years serving Chicago &amp; the North Shore.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, index) => {
              const Icon = iconMap[service.icon]
              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className="card-hover block h-full group"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors mb-5">
                      {Icon && <Icon className="h-7 w-7" />}
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2">
                      {service.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-4">
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
      </AnimatedSection>

      {/* ━━━ BEFORE/AFTER SHOWCASE ━━━ */}
      <AnimatedSection className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-center mb-14">
            <span className="section-label mb-4">Our Work</span>
            <h2 className="heading-1 text-primary mt-4">
              See the Transformation
            </h2>
            <p className="text-text-secondary text-lg mt-4 max-w-2xl mx-auto">
              Drag the slider to see the dramatic before &amp; after of our
              recent projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <BeforeAfterSlider
                beforeLabel="Before — Faded Exterior"
                afterLabel="After — Fresh Coat"
                beforeColor="#8B7355"
                afterColor="#1B365D"
              />
              <p className="text-center text-sm text-text-secondary mt-3">
                Exterior Repaint — Lincoln Park
              </p>
            </div>
            <div>
              <BeforeAfterSlider
                beforeLabel="Before — Dated Interior"
                afterLabel="After — Modern Refresh"
                beforeColor="#A0926B"
                afterColor="#E8630A"
              />
              <p className="text-center text-sm text-text-secondary mt-3">
                Living Room — Evanston
              </p>
            </div>
            <div className="hidden lg:block">
              <BeforeAfterSlider
                beforeLabel="Before — Weathered Siding"
                afterLabel="After — Like New"
                beforeColor="#6B7B5E"
                afterColor="#D4A843"
              />
              <p className="text-center text-sm text-text-secondary mt-3">
                Full Exterior — Wilmette
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/gallery"
              className="btn-outline-dark btn-md rounded-full"
            >
              View Full Gallery
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* ━━━ WHY CHOOSE US ━━━ */}
      <AnimatedSection className="section-padding bg-background-warm">
        <div className="container-wide">
          <div className="text-center mb-14">
            <span className="section-label mb-4">Why Us</span>
            <h2 className="heading-1 text-primary mt-4">
              Why Choose A Clean Look
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Thermometer,
                title: 'Chicago Weather Experts',
                description:
                  'We know what paints, primers, and prep work stand up to harsh Midwest winters and humid summers. Our products and techniques are chosen specifically for Chicago\'s climate.',
              },
              {
                icon: Shield,
                title: 'One Call Does It All',
                description:
                  'Painting, power washing, gutter cleaning, and handyman services under one roof. No need to juggle multiple contractors — we handle everything.',
              },
              {
                icon: DollarSign,
                title: 'Transparent Pricing',
                description:
                  'Free detailed estimates with no hidden fees. We break down every cost so you know exactly what you\'re paying for. Fair pricing backed by 30+ years of trust.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white mx-auto mb-5">
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ━━━ TESTIMONIALS ━━━ */}
      <AnimatedSection className="section-padding bg-primary relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cta/5 rounded-full blur-3xl" />

        <div className="container-narrow relative z-10">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-accent mb-4">
              Testimonials
            </span>
            <h2 className="heading-1 text-white mt-4">
              What Our Clients Say
            </h2>
          </div>

          <div className="relative min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                {/* Stars */}
                <div className="flex items-center justify-center gap-1 mb-6">
                  {Array.from({ length: TESTIMONIALS[currentTestimonial].rating }).map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="h-6 w-6 fill-accent text-accent"
                      />
                    )
                  )}
                </div>

                {/* Quote */}
                <blockquote className="font-accent text-xl sm:text-2xl text-white/90 italic leading-relaxed mb-8 max-w-2xl mx-auto">
                  &ldquo;{TESTIMONIALS[currentTestimonial].text}&rdquo;
                </blockquote>

                {/* Author */}
                <div>
                  <span className="block text-white font-semibold text-lg">
                    {TESTIMONIALS[currentTestimonial].name}
                  </span>
                  <span className="block text-white/60 text-sm mt-1">
                    {TESTIMONIALS[currentTestimonial].projectType}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={cn(
                  'h-2.5 rounded-full transition-all',
                  index === currentTestimonial
                    ? 'w-8 bg-accent'
                    : 'w-2.5 bg-white/30 hover:bg-white/50'
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/reviews"
              className="btn-outline btn-md rounded-full"
            >
              Read All Reviews
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* ━━━ SERVICE AREAS ━━━ */}
      <AnimatedSection className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-center mb-14">
            <span className="section-label mb-4">Coverage</span>
            <h2 className="heading-1 text-primary mt-4">
              Serving Chicago &amp; North Shore Suburbs
            </h2>
            <p className="text-text-secondary text-lg mt-4 max-w-2xl mx-auto">
              We proudly serve Chicago and the surrounding North Shore
              communities.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {SERVICE_AREAS.map((area, index) => (
              <motion.div
                key={area}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
              >
                <Link
                  href={`/areas/${area.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center gap-2 p-3 rounded-xl border border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition-all group"
                >
                  <MapPin className="h-4 w-4 text-accent shrink-0" />
                  <span className="text-sm font-medium text-text-primary group-hover:text-primary">
                    {area}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/areas"
              className="btn-outline-dark btn-md rounded-full"
            >
              See All Service Areas
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* ━━━ FREE TOOLS & RESOURCES ━━━ */}
      <AnimatedSection className="section-padding bg-background-light">
        <div className="container-wide">
          <div className="text-center mb-14">
            <span className="section-label mb-4">Free Tools</span>
            <h2 className="heading-1 text-primary mt-4">
              Free Tools &amp; Resources for Homeowners
            </h2>
            <p className="text-text-secondary text-lg mt-4 max-w-2xl mx-auto">
              Plan your project with our free interactive tools. Get estimates, explore colors, and download expert guides — all at no cost.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Paint Estimator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
            >
              <Link href="/tools/paint-estimator" className="block rounded-2xl bg-white border border-gray-100 p-6 hover:shadow-lg hover:border-cta/20 transition-all group h-full">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-50 text-2xl mb-4 group-hover:scale-110 transition-transform">
                  🧮
                </div>
                <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-cta transition-colors">Paint Estimate Calculator</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">Get instant cost estimates for interior &amp; exterior painting based on real Chicago market data.</p>
                <span className="inline-flex items-center text-sm font-semibold text-cta">
                  Try It Free <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </Link>
            </motion.div>

            {/* Color Visualizer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Link href="/tools/color-visualizer" className="block rounded-2xl bg-white border border-gray-100 p-6 hover:shadow-lg hover:border-cta/20 transition-all group h-full">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-pink-50 text-2xl mb-4 group-hover:scale-110 transition-transform">
                  🖌️
                </div>
                <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-cta transition-colors">Room Color Visualizer</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">Preview paint colors on template rooms or upload your own photo. 80+ curated colors available.</p>
                <span className="inline-flex items-center text-sm font-semibold text-cta">
                  Try It Free <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </Link>
            </motion.div>

            {/* Seasonal Planner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link href="/tools/seasonal-planner" className="block rounded-2xl bg-white border border-gray-100 p-6 hover:shadow-lg hover:border-cta/20 transition-all group h-full">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50 text-2xl mb-4 group-hover:scale-110 transition-transform">
                  📅
                </div>
                <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-cta transition-colors">Seasonal Planner</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">Month-by-month home maintenance guide tailored to Chicago weather and seasonal needs.</p>
                <span className="inline-flex items-center text-sm font-semibold text-cta">
                  Try It Free <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </Link>
            </motion.div>

            {/* Color Palette */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link href="/tools/color-palette" className="block rounded-2xl bg-white border border-gray-100 p-6 hover:shadow-lg hover:border-cta/20 transition-all group h-full">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-violet-50 text-2xl mb-4 group-hover:scale-110 transition-transform">
                  ✨
                </div>
                <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-cta transition-colors">Color Palette Generator</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">Create beautiful, complementary color palettes for any room style or mood.</p>
                <span className="inline-flex items-center text-sm font-semibold text-cta">
                  Try It Free <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Free Guides row */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/resources/chicago-homeowner-guide" className="flex items-center gap-4 rounded-xl bg-white border border-gray-100 p-4 hover:shadow-md hover:border-primary/20 transition-all group">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl">📖</div>
              <div>
                <span className="block text-sm font-bold text-primary group-hover:text-cta transition-colors">Exterior Painting Guide</span>
                <span className="block text-xs text-text-secondary">Free download for Chicago homeowners</span>
              </div>
            </Link>
            <Link href="/resources/paint-color-guide" className="flex items-center gap-4 rounded-xl bg-white border border-gray-100 p-4 hover:shadow-md hover:border-primary/20 transition-all group">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-xl">📚</div>
              <div>
                <span className="block text-sm font-bold text-primary group-hover:text-cta transition-colors">Color Selection Guide</span>
                <span className="block text-xs text-text-secondary">2025 trending colors &amp; tips</span>
              </div>
            </Link>
            <Link href="/resources/home-maintenance-checklist" className="flex items-center gap-4 rounded-xl bg-white border border-gray-100 p-4 hover:shadow-md hover:border-primary/20 transition-all group">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-xl">✅</div>
              <div>
                <span className="block text-sm font-bold text-primary group-hover:text-cta transition-colors">Maintenance Checklist</span>
                <span className="block text-xs text-text-secondary">Seasonal checklist for your home</span>
              </div>
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* ━━━ LEAD MAGNET BANNER ━━━ */}
      <AnimatedSection className="section-padding bg-background-warm">
        <div className="container-wide">
          <div className="rounded-3xl bg-gradient-to-br from-primary to-primary-700 p-8 sm:p-12 lg:p-16 overflow-hidden relative">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5 text-sm font-medium text-accent mb-4">
                  <Download className="h-4 w-4" />
                  Free Download
                </span>
                <h2 className="heading-2 text-white mb-4">
                  The Chicago Homeowner&apos;s Guide to Painting
                </h2>
                <p className="text-white/70 leading-relaxed mb-6">
                  Everything you need to know about painting your Chicago home —
                  from the best time of year to paint, choosing the right
                  contractor, cost expectations, and paint selection for
                  Midwest climate.
                </p>
                <ul className="space-y-2 mb-8">
                  {[
                    'When to paint (Chicago seasonal timing)',
                    'How to choose the right contractor',
                    'Cost expectations & budgeting tips',
                    'Paint selection for Midwest weather',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-white/80"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                {/* Mock ebook cover */}
                <div className="bg-white rounded-2xl p-8 shadow-strong max-w-sm mx-auto">
                  <div className="aspect-[3/4] rounded-xl bg-gradient-to-br from-primary via-primary-600 to-primary-800 flex flex-col items-center justify-center p-6 text-center mb-6">
                    <Paintbrush className="h-12 w-12 text-accent mb-4" />
                    <h3 className="text-white font-bold text-lg leading-tight">
                      The Chicago Homeowner&apos;s Guide to Painting
                    </h3>
                    <span className="text-white/60 text-sm mt-2">
                      by A Clean Look
                    </span>
                  </div>

                  <form
                    className="space-y-3"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-light" />
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-cta/50 focus:border-cta"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full btn-primary btn-md rounded-lg"
                    >
                      Download Free Guide
                      <Download className="ml-2 h-4 w-4" />
                    </button>
                    <p className="text-xs text-text-light text-center">
                      No spam. Unsubscribe anytime.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ━━━ CTA SECTION ━━━ */}
      <section className="section-padding bg-gradient-to-br from-cta via-cta-500 to-accent relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoLTZ2LTZoNnptMC0zMHY2aC02VjRoNnptMzAgMzB2Nmg2di02aC02em0wLTMwdjZoLTZWNGg2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

        <div className="container-wide relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="heading-1 text-white mb-4"
              >
                Ready to Transform Your Space?
              </motion.h2>
              <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto lg:mx-0">
                Get your free, no-obligation estimate today. We&apos;ll assess
                your project, answer all your questions, and provide a
                transparent quote.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <a
                  href={`tel:${BUSINESS.phoneRaw}`}
                  className="btn btn-lg rounded-full bg-white text-cta font-bold hover:bg-white/90 shadow-lg"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  {BUSINESS.phone}
                </a>
              </div>

              <p className="text-white/60 text-sm">
                Average response time: under 2 hours
              </p>
            </div>

            {/* Quick contact form */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-strong">
              <h3 className="text-xl font-bold text-primary mb-1">
                Get Your Free Estimate
              </h3>
              <p className="text-text-secondary text-sm mb-6">
                Fill out the form and we&apos;ll get back to you within 2 hours.
              </p>

              <form
                className="space-y-4"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-light" />
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-cta/50 focus:border-cta"
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-light" />
                  <input
                    type="tel"
                    placeholder="Phone number"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-cta/50 focus:border-cta"
                  />
                </div>

                <div>
                  <select className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-text-secondary focus:outline-none focus:ring-2 focus:ring-cta/50 focus:border-cta appearance-none bg-white">
                    <option value="">Select a service</option>
                    {SERVICES.map((service) => (
                      <option key={service.slug} value={service.slug}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary btn-lg rounded-lg"
                >
                  Request Free Estimate
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>

                <p className="text-xs text-text-light text-center">
                  Free, no-obligation estimate. We respect your privacy.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
