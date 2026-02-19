'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  CheckCircle2,
  Download,
  ArrowRight,
  Phone,
  Shield,
  Star,
  Users,
  BookOpen,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { BUSINESS } from '@/lib/constants'

// ─── Types ──────────────────────────────────────────────────

export interface EbookLandingPageProps {
  title: string
  subtitle: string
  description: string
  coverColor: string // gradient start color
  coverAccent: string // gradient end color
  benefits: string[]
  tableOfContents: string[]
  formId: string
  downloadUrl: string
  stats?: { label: string; value: string }[]
}

// ─── 3D Book Cover ──────────────────────────────────────────

function BookCover({
  title,
  subtitle,
  coverColor,
  coverAccent,
}: {
  title: string
  subtitle: string
  coverColor: string
  coverAccent: string
}) {
  return (
    <div className="relative" style={{ perspective: '1200px' }}>
      <div
        className="relative w-[220px] sm:w-[260px] mx-auto"
        style={{
          transform: 'rotateY(-15deg) rotateX(5deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Book front cover */}
        <div
          className="relative rounded-r-lg rounded-l-sm overflow-hidden shadow-2xl"
          style={{
            background: `linear-gradient(135deg, ${coverColor} 0%, ${coverAccent} 100%)`,
            aspectRatio: '3/4',
          }}
        >
          {/* Spine highlight */}
          <div
            className="absolute left-0 top-0 bottom-0 w-3"
            style={{ background: 'rgba(0,0,0,0.15)' }}
          />
          {/* Content */}
          <div className="relative p-6 sm:p-8 flex flex-col h-full">
            <div className="flex-1">
              <div className="w-10 h-0.5 bg-white/40 mb-4" />
              <h3 className="text-white text-base sm:text-lg font-bold leading-tight">
                {title}
              </h3>
              <p className="text-white/70 text-xs sm:text-sm mt-2 leading-snug">
                {subtitle}
              </p>
            </div>
            <div className="mt-auto pt-4 border-t border-white/20">
              <p className="text-white/60 text-[10px] font-medium uppercase tracking-wider">
                A Clean Look Chicago
              </p>
              <p className="text-white/40 text-[9px] mt-0.5">
                Since 1994
              </p>
            </div>
          </div>
          {/* Shine effect */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.08) 45%, transparent 55%)',
            }}
          />
        </div>

        {/* Book spine (3D effect) */}
        <div
          className="absolute top-0 left-0 h-full w-4 origin-left rounded-l-sm"
          style={{
            background: `linear-gradient(180deg, ${coverColor}, ${coverAccent})`,
            transform: 'rotateY(-90deg) translateX(-8px)',
            filter: 'brightness(0.7)',
          }}
        />

        {/* Book pages side */}
        <div
          className="absolute top-2 -right-2 h-[calc(100%-16px)] w-3 rounded-r-sm"
          style={{
            background:
              'repeating-linear-gradient(180deg, #f5f5f0, #f5f5f0 2px, #e8e8e3 2px, #e8e8e3 3px)',
          }}
        />

        {/* Shadow */}
        <div
          className="absolute -bottom-4 left-4 right-4 h-8 rounded-full blur-xl opacity-30"
          style={{ background: coverColor }}
        />
      </div>
    </div>
  )
}

// ─── Download Form ──────────────────────────────────────────

function DownloadForm({
  formId,
  downloadUrl,
  title,
}: {
  formId: string
  downloadUrl: string
  title: string
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSending(true)

    try {
      const res = await fetch('/api/resources/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, resourceId: formId, resourceTitle: title }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Something went wrong')
        return
      }

      setSent(true)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-6"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600 mx-auto mb-3">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="text-lg font-bold text-text-primary mb-1">
          Check Your Email!
        </h3>
        <p className="text-sm text-text-secondary mb-4">
          Your free guide is on its way. Check your inbox for the download link.
        </p>
        <a
          href={downloadUrl}
          className="btn-primary btn-md rounded-full"
        >
          <Download className="mr-2 h-4 w-4" />
          Download Now
        </a>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your first name"
          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </div>
      <div>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </div>
      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}
      <button
        type="submit"
        disabled={sending}
        className="w-full btn-primary btn-md rounded-full text-base"
      >
        {sending ? (
          'Sending...'
        ) : (
          <>
            <Download className="mr-2 h-5 w-5" />
            Download Your Free Guide
          </>
        )}
      </button>
      <p className="text-[10px] text-text-light text-center leading-relaxed">
        Free download. No spam — just helpful resources from A Clean Look.
        <br />
        We respect your privacy and never share your email.
      </p>
    </form>
  )
}

// ─── Animated Section ───────────────────────────────────────

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

// ─── Main Component ─────────────────────────────────────────

export default function EbookLandingPage({
  title,
  subtitle,
  description,
  coverColor,
  coverAccent,
  benefits,
  tableOfContents,
  formId,
  downloadUrl,
  stats,
}: EbookLandingPageProps) {
  return (
    <>
      {/* ━━━ HERO ━━━ */}
      <section className="relative bg-gradient-to-br from-primary via-primary-600 to-primary-800 pt-32 pb-20 overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cta/5 rounded-full blur-2xl" />

        <div className="container-wide relative z-10">
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 text-sm text-white/60 mb-8"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">Free Resources</span>
          </motion.nav>

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Text */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm text-white/80 mb-4"
              >
                <BookOpen className="h-4 w-4 text-accent" />
                Free Download
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="heading-1 text-white"
              >
                {title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="text-lg text-white/80 mt-4 max-w-lg mx-auto lg:mx-0"
              >
                {description}
              </motion.p>

              {/* Social proof */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-4 mt-6 justify-center lg:justify-start"
              >
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <Users className="h-4 w-4 text-accent" />
                  <span>Downloaded by <strong className="text-white">500+</strong> Chicago homeowners</span>
                </div>
              </motion.div>
            </div>

            {/* Book Cover */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="shrink-0"
            >
              <BookCover
                title={title}
                subtitle={subtitle}
                coverColor={coverColor}
                coverAccent={coverAccent}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ━━━ FORM + BENEFITS ━━━ */}
      <section className="py-12 sm:py-16 bg-background-light">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            {/* Benefits */}
            <div className="flex-1">
              <h2 className="heading-2 text-primary mb-6">
                What You&apos;ll Learn
              </h2>
              <ul className="space-y-4">
                {benefits.map((benefit, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-text-primary leading-relaxed">
                      {benefit}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* Trust badges */}
              <div className="flex items-center gap-6 mt-8 pt-6 border-t border-gray-200">
                {[
                  { icon: Shield, label: 'Insured & Licensed' },
                  { icon: Star, label: '5-Star Rated' },
                ].map((badge) => (
                  <div key={badge.label} className="flex items-center gap-2 text-text-secondary">
                    <badge.icon className="h-4 w-4 text-accent" />
                    <span className="text-xs font-medium">{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Card */}
            <div className="lg:w-[400px] shrink-0">
              <div className="sticky top-32 bg-white rounded-2xl shadow-medium border border-gray-100 p-6 sm:p-8">
                <h3 className="text-lg font-bold text-text-primary mb-1">
                  Get Your Free Copy
                </h3>
                <p className="text-sm text-text-secondary mb-6">
                  Enter your details below and we&apos;ll send the guide straight to your inbox.
                </p>
                <DownloadForm
                  formId={formId}
                  downloadUrl={downloadUrl}
                  title={title}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ TABLE OF CONTENTS ━━━ */}
      <AnimSection className="section-padding bg-white">
        <div className="container-narrow">
          <div className="text-center mb-10">
            <span className="section-label mb-4">Inside the Guide</span>
            <h2 className="heading-1 text-primary mt-4">
              Table of Contents
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tableOfContents.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-background-light"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary text-sm font-bold shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm text-text-primary font-medium">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimSection>

      {/* ━━━ STATS (optional) ━━━ */}
      {stats && stats.length > 0 && (
        <AnimSection className="section-padding bg-background-light">
          <div className="container-narrow">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-cta">
                    {stat.value}
                  </p>
                  <p className="text-xs text-text-secondary mt-1 font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimSection>
      )}

      {/* ━━━ FINAL CTA ━━━ */}
      <section className="section-padding bg-gradient-to-br from-cta via-cta-500 to-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoLTZ2LTZoNnptMC0zMHY2aC02VjRoNnptMzAgMzB2Nmg2di02aC02em0wLTMwdjZoLTZWNGg2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="container-narrow relative z-10 text-center">
          <h2 className="heading-1 text-white mb-4">
            Ready for Professional Help?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">
            Our guides help you plan — but our team makes it happen.
            Get a free, no-obligation estimate for your next project.
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

      {/* ━━━ FOOTER BADGE ━━━ */}
      <div className="py-6 bg-primary text-center">
        <p className="text-white/60 text-sm">
          By <strong className="text-white/80">A Clean Look</strong> — Chicago&apos;s Trusted Painters Since 1994
        </p>
      </div>
    </>
  )
}
