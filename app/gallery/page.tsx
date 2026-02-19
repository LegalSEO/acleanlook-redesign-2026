'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  ChevronRight,
  X,
  ChevronLeft,
  ArrowRight,
  Phone,
  MapPin,
  Camera,
  GripHorizontal,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { BUSINESS } from '@/lib/constants'
import { GALLERY_PROJECTS, GALLERY_FILTERS } from '@/data/gallery'
import type { GalleryProject } from '@/data/gallery'

// ─── Before/After Slider ────────────────────────────────────
function BeforeAfterSlider({
  before,
  after,
  title,
}: {
  before: string
  after: string
  title: string
}) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current || !isDragging.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setPosition((x / rect.width) * 100)
  }, [])

  const handlePointerDown = () => {
    isDragging.current = true
  }

  const handlePointerUp = () => {
    isDragging.current = false
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] overflow-hidden rounded-xl cursor-col-resize select-none"
      onPointerMove={(e) => handleMove(e.clientX)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* After (full) */}
      <Image
        src={after}
        alt={`${title} - After`}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 800px"
      />
      {/* Before (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <Image
          src={before}
          alt={`${title} - Before`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </div>
      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center">
          <GripHorizontal className="h-5 w-5 text-primary" />
        </div>
      </div>
      {/* Labels */}
      <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full z-10">
        Before
      </div>
      <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full z-10">
        After
      </div>
    </div>
  )
}

// ─── Lightbox ───────────────────────────────────────────────
function Lightbox({
  project,
  onClose,
  onPrev,
  onNext,
}: {
  project: GalleryProject
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-primary">
              {project.title}
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-text-light" />
            </button>
          </div>

          <BeforeAfterSlider
            before={project.beforeImage}
            after={project.afterImage}
            title={project.title}
          />

          <div className="mt-4 flex items-center gap-2 text-sm text-text-secondary">
            <MapPin className="h-4 w-4 text-cta" />
            {project.neighborhood}
            <span className="mx-2 text-gray-300">|</span>
            <span className="capitalize">
              {project.type.replace('-', ' ')}
            </span>
          </div>

          <p className="mt-3 text-sm text-text-secondary leading-relaxed">
            {project.description}
          </p>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={onPrev}
                className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="h-5 w-5 text-text-primary" />
              </button>
              <button
                onClick={onNext}
                className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="h-5 w-5 text-text-primary" />
              </button>
            </div>
            <Link
              href="/free-estimate"
              className="btn-primary btn-sm rounded-full"
            >
              Get Free Estimate
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Gallery Card ───────────────────────────────────────────
function GalleryCard({
  project,
  index,
  onClick,
}: {
  project: GalleryProject
  index: number
  onClick: () => void
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
        <Image
          src={project.afterImage}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <p className="text-white font-semibold text-sm">{project.title}</p>
          <p className="text-white/70 text-xs flex items-center gap-1 mt-1">
            <MapPin className="h-3 w-3" />
            {project.neighborhood}
          </p>
        </div>
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
            <Camera className="h-4 w-4 text-primary" />
          </div>
        </div>
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-semibold text-text-primary">
          {project.title}
        </h3>
        <p className="text-xs text-text-secondary capitalize mt-0.5">
          {project.type.replace('-', ' ')} &middot; {project.neighborhood}
        </p>
      </div>
    </motion.div>
  )
}

// ─── Main Page ──────────────────────────────────────────────
export default function GalleryPage() {
  const [filter, setFilter] = useState('all')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const filtered =
    filter === 'all'
      ? GALLERY_PROJECTS
      : GALLERY_PROJECTS.filter((p) => p.type === filter)

  const handlePrev = () => {
    if (selectedIndex === null) return
    setSelectedIndex(
      selectedIndex === 0 ? filtered.length - 1 : selectedIndex - 1
    )
  }

  const handleNext = () => {
    if (selectedIndex === null) return
    setSelectedIndex(
      selectedIndex === filtered.length - 1 ? 0 : selectedIndex + 1
    )
  }

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
            <span className="text-white">Gallery</span>
          </motion.nav>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="heading-display text-white max-w-3xl"
          >
            Our Work Speaks for Itself
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-lg text-white/80 mt-4 max-w-xl"
          >
            Browse before-and-after transformations from projects across
            Chicago and the North Shore.
          </motion.p>
        </div>
      </section>

      {/* ━━━ FILTER TABS ━━━ */}
      <section className="bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="container-wide py-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {GALLERY_FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                  filter === f.value
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ GALLERY GRID ━━━ */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <GalleryCard
                key={project.id}
                project={project}
                index={i}
                onClick={() => setSelectedIndex(i)}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Camera className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-text-secondary">
                No projects found for this filter.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ━━━ MID-PAGE CTA ━━━ */}
      <section className="py-12 bg-background-warm">
        <div className="container-wide text-center">
          <h2 className="heading-2 text-primary mb-3">
            Want Results Like These?
          </h2>
          <p className="text-text-secondary max-w-md mx-auto mb-6">
            Every project starts with a free, no-obligation estimate. Let us
            show you what we can do for your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/free-estimate"
              className="btn-primary btn-md rounded-full"
            >
              Get Free Estimate
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              className="btn-outline-dark btn-md rounded-full"
            >
              <Phone className="mr-2 h-4 w-4" />
              {BUSINESS.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ━━━ PLACEHOLDER NOTE ━━━ */}
      <section className="py-8 bg-white">
        <div className="container-wide">
          <div className="rounded-xl bg-background-light border border-gray-100 p-6 text-center">
            <p className="text-sm text-text-secondary">
              <strong>Note:</strong> Project photos shown are placeholders.
              Actual before-and-after photos from A Clean Look projects will
              replace these images.
            </p>
          </div>
        </div>
      </section>

      {/* ━━━ LIGHTBOX ━━━ */}
      <AnimatePresence>
        {selectedIndex !== null && filtered[selectedIndex] && (
          <Lightbox
            project={filtered[selectedIndex]}
            onClose={() => setSelectedIndex(null)}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </>
  )
}
