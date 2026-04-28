'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Phone,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Paintbrush,
  Home,
  Building2,
  Droplets,
  Waves,
  Wrench,
  Calculator,
  Palette,
  Calendar,
  Sparkles,
  BookOpen,
  ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { BUSINESS, NAV_ITEMS, SERVICES } from '@/lib/constants'

const iconMap: Record<string, React.ElementType> = {
  Paintbrush,
  Home,
  Building2,
  Droplets,
  Waves,
  Wrench,
  Calculator,
  Palette,
  Calendar,
  Sparkles,
  BookOpen,
}

// Emoji + color mapping for mega menu items
const serviceStyles: Record<string, { emoji: string; bg: string; text: string }> = {
  'Interior Painting': { emoji: '🎨', bg: 'bg-blue-50', text: 'text-blue-600' },
  'Exterior Painting': { emoji: '🏠', bg: 'bg-green-50', text: 'text-green-600' },
  'Commercial Painting': { emoji: '🏢', bg: 'bg-purple-50', text: 'text-purple-600' },
  'Power Washing': { emoji: '💦', bg: 'bg-cyan-50', text: 'text-cyan-600' },
  'Gutter Cleaning': { emoji: '🍂', bg: 'bg-amber-50', text: 'text-amber-600' },
  'Handyman Services': { emoji: '🔧', bg: 'bg-orange-50', text: 'text-orange-600' },
}

const toolStyles: Record<string, { emoji: string; bg: string; text: string }> = {
  'Paint Estimate Calculator': { emoji: '🧮', bg: 'bg-orange-50', text: 'text-orange-600' },
  'Room Color Visualizer': { emoji: '🖌️', bg: 'bg-pink-50', text: 'text-pink-600' },
  'Seasonal Planner': { emoji: '📅', bg: 'bg-emerald-50', text: 'text-emerald-600' },
  'Color Palette Generator': { emoji: '✨', bg: 'bg-violet-50', text: 'text-violet-600' },
  'Exterior Painting Guide': { emoji: '📖', bg: 'bg-blue-50', text: 'text-blue-600' },
  'Color Selection Guide': { emoji: '📚', bg: 'bg-rose-50', text: 'text-rose-600' },
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY

    setIsScrolled(currentScrollY > 20)

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsVisible(false)
    } else {
      setIsVisible(true)
    }

    setLastScrollY(currentScrollY)
  }, [lastScrollY])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const getItemStyle = (label: string, parentLabel: string) => {
    if (parentLabel === 'Services') return serviceStyles[label] || { emoji: '🔹', bg: 'bg-gray-50', text: 'text-gray-600' }
    if (parentLabel === 'Free Tools') return toolStyles[label] || { emoji: '🔹', bg: 'bg-gray-50', text: 'text-gray-600' }
    return { emoji: '🔹', bg: 'bg-gray-50', text: 'text-gray-600' }
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white',
          isScrolled && 'shadow-soft',
          isVisible ? 'translate-y-0' : '-translate-y-full'
        )}
      >
        {/* Top bar */}
        <div className="hidden md:block border-b border-gray-100 bg-primary text-white">
          <div className="container-wide flex items-center justify-between py-1.5 text-sm">
            <span className="text-white/80">
              Serving Chicago &amp; North Shore Suburbs for {BUSINESS.yearsInBusiness}+ Years
            </span>
            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              className="flex items-center gap-1.5 font-semibold hover:text-accent transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              {BUSINESS.phone}
            </a>
          </div>
        </div>

        {/* Main nav */}
        <div className="container-wide">
          <nav aria-label="Main navigation" className="flex items-center justify-between py-3 lg:py-4">
            {/* Logo */}
            <Link href="/" className="shrink-0">
              <Image
                src="/images/logos/new/logonew4.png"
                alt="A Clean Look — Chicago Painting Services"
                width={340}
                height={110}
                priority
                className="h-20 sm:h-24 w-auto"
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() =>
                    item.children && setOpenDropdown(item.label)
                  }
                  onMouseLeave={() =>
                    item.children && setOpenDropdown(null)
                  }
                >
                  {item.children ? (
                    <>
                      <button
                        className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-text-primary hover:bg-gray-50 transition-colors"
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 transition-transform text-text-light',
                            openDropdown === item.label && 'rotate-180'
                          )}
                        />
                      </button>

                      {/* Mega menu dropdown */}
                      <AnimatePresence>
                        {openDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 pt-2"
                          >
                            <div className={cn(
                              'rounded-2xl bg-white shadow-strong border border-gray-100 overflow-hidden',
                              item.label === 'Services' ? 'w-[680px] p-6' : 'w-[580px] p-6'
                            )}>
                              {/* Section header */}
                              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                                <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                                  {item.label === 'Services' ? '🛠️ Our Services' : '🚀 Free Tools & Resources'}
                                </h3>
                                <Link
                                  href={item.href}
                                  className="text-xs font-semibold text-cta hover:text-cta-600 flex items-center gap-1 transition-colors"
                                >
                                  View All <ArrowRight className="h-3 w-3" />
                                </Link>
                              </div>

                              <div className="grid grid-cols-2 gap-2">
                                {item.children.map((child) => {
                                  const style = getItemStyle(child.label, item.label)
                                  return (
                                    <Link
                                      key={child.href}
                                      href={child.href}
                                      className="flex items-start gap-3 rounded-xl p-3 transition-all hover:bg-gray-50 group"
                                    >
                                      <div className={cn(
                                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg transition-transform group-hover:scale-110',
                                        style.bg
                                      )}>
                                        {style.emoji}
                                      </div>
                                      <div className="min-w-0">
                                        <span className="block text-sm font-semibold text-text-primary group-hover:text-primary transition-colors">
                                          {child.label}
                                        </span>
                                        <span className="block text-xs text-text-secondary mt-0.5 line-clamp-2">
                                          {child.description}
                                        </span>
                                      </div>
                                    </Link>
                                  )
                                })}
                              </div>

                              {/* Bottom CTA for tools */}
                              {item.label === 'Free Tools' && (
                                <div className="mt-4 pt-3 border-t border-gray-100 bg-gradient-to-r from-cta/5 to-accent/5 -mx-6 -mb-6 px-6 py-4">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <p className="text-sm font-semibold text-text-primary">Need a custom estimate?</p>
                                      <p className="text-xs text-text-secondary">Get a free, no-obligation quote from our team</p>
                                    </div>
                                    <Link
                                      href="/free-estimate"
                                      className="btn-primary btn-sm rounded-full text-xs"
                                    >
                                      Free Estimate <ArrowRight className="ml-1 h-3 w-3" />
                                    </Link>
                                  </div>
                                </div>
                              )}

                              {/* Bottom CTA for services */}
                              {item.label === 'Services' && (
                                <div className="mt-4 pt-3 border-t border-gray-100 bg-gradient-to-r from-primary/5 to-accent/5 -mx-6 -mb-6 px-6 py-4">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <p className="text-sm font-semibold text-text-primary">Not sure what you need?</p>
                                      <p className="text-xs text-text-secondary">Call us — we&apos;ll help figure it out</p>
                                    </div>
                                    <a
                                      href={`tel:${BUSINESS.phoneRaw}`}
                                      className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-cta transition-colors"
                                    >
                                      <Phone className="h-4 w-4" />
                                      {BUSINESS.phone}
                                    </a>
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="px-3 py-2 rounded-lg text-sm font-medium text-text-primary hover:bg-gray-50 transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={`tel:${BUSINESS.phoneRaw}`}
                className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-cta transition-colors"
              >
                <Phone className="h-4 w-4" />
                {BUSINESS.phone}
              </a>
              <Link
                href="/free-estimate"
                className="btn-primary btn-md rounded-full"
              >
                Free Estimate
              </Link>
            </div>

            {/* Mobile hamburger */}
            <div className="flex lg:hidden items-center gap-3">
              <a
                href={`tel:${BUSINESS.phoneRaw}`}
                className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white"
              >
                <Phone className="h-5 w-5" />
              </a>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="flex items-center justify-center h-10 w-10 rounded-lg text-primary hover:bg-gray-100 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-white"
          >
            <div className="flex flex-col h-full">
              {/* Mobile header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <Link
                  href="/"
                  className="flex items-center gap-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Image
                    src="/images/logos/new/logonew4.png"
                    alt="A Clean Look"
                    width={220}
                    height={70}
                    className="h-14 w-auto"
                  />
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center h-10 w-10 rounded-lg text-text-primary hover:bg-gray-100"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Mobile nav links */}
              <div className="flex-1 overflow-y-auto px-4 py-6">
                <div className="space-y-1">
                  {NAV_ITEMS.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {item.children ? (
                        <div>
                          <button
                            onClick={() =>
                              setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                            }
                            className="flex items-center justify-between w-full px-4 py-3 text-lg font-medium text-text-primary rounded-lg hover:bg-gray-50"
                          >
                            {item.label}
                            <ChevronDown
                              className={cn(
                                'h-5 w-5 text-text-light transition-transform',
                                mobileExpanded === item.label && 'rotate-180'
                              )}
                            />
                          </button>
                          <AnimatePresence>
                            {mobileExpanded === item.label && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="pl-2 pb-2 space-y-1">
                                  {item.children.map((child) => {
                                    const style = getItemStyle(child.label, item.label)
                                    return (
                                      <Link
                                        key={child.href}
                                        href={child.href}
                                        onClick={() =>
                                          setIsMobileMenuOpen(false)
                                        }
                                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-50"
                                      >
                                        <span className="text-lg">{style.emoji}</span>
                                        <span className="text-base text-text-primary">
                                          {child.label}
                                        </span>
                                      </Link>
                                    )
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-4 py-3 text-lg font-medium text-text-primary rounded-lg hover:bg-gray-50"
                        >
                          {item.label}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Mobile CTA area */}
              <div className="px-4 py-6 border-t border-gray-100 space-y-3">
                <a
                  href={`tel:${BUSINESS.phoneRaw}`}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-primary text-white font-semibold text-lg"
                >
                  <Phone className="h-5 w-5" />
                  {BUSINESS.phone}
                </a>
                <Link
                  href="/free-estimate"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center py-3 rounded-full bg-cta text-white font-semibold text-lg hover:bg-cta-600 transition-colors"
                >
                  Get Free Estimate
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
