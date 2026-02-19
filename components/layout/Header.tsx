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
  Paintbrush,
  Home,
  Building2,
  Droplets,
  Waves,
  Wrench,
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
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)

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

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-soft'
            : 'bg-transparent',
          isVisible ? 'translate-y-0' : '-translate-y-full'
        )}
      >
        {/* Top bar - visible on desktop */}
        <div
          className={cn(
            'hidden md:block border-b transition-all duration-300',
            isScrolled
              ? 'border-gray-100 bg-primary text-white'
              : 'border-white/10 bg-primary/90 text-white'
          )}
        >
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
                src="/images/logos/A Clean Look Logo1.png"
                alt="A Clean Look — Chicago Painting Services"
                width={220}
                height={70}
                priority
                className={cn(
                  'h-14 sm:h-16 w-auto transition-all',
                  isScrolled ? 'brightness-100' : 'brightness-0 invert'
                )}
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() =>
                    item.label === 'Services' && setIsServicesOpen(true)
                  }
                  onMouseLeave={() =>
                    item.label === 'Services' && setIsServicesOpen(false)
                  }
                >
                  {item.children ? (
                    <>
                      <button
                        className={cn(
                          'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                          isScrolled
                            ? 'text-text-primary hover:bg-gray-100'
                            : 'text-white/90 hover:text-white hover:bg-white/10'
                        )}
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 transition-transform',
                            isServicesOpen && 'rotate-180'
                          )}
                        />
                      </button>

                      {/* Mega menu */}
                      <AnimatePresence>
                        {isServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 pt-2"
                          >
                            <div className="w-[640px] rounded-2xl bg-white shadow-strong border border-gray-100 p-6">
                              <div className="grid grid-cols-2 gap-3">
                                {SERVICES.map((service) => {
                                  const Icon = iconMap[service.icon]
                                  return (
                                    <Link
                                      key={service.slug}
                                      href={`/services/${service.slug}`}
                                      className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-background-light group"
                                    >
                                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                        {Icon && <Icon className="h-5 w-5" />}
                                      </div>
                                      <div>
                                        <span className="block text-sm font-semibold text-text-primary">
                                          {service.title}
                                        </span>
                                        <span className="block text-xs text-text-secondary mt-0.5 line-clamp-2">
                                          {service.shortDescription}
                                        </span>
                                      </div>
                                    </Link>
                                  )
                                })}
                              </div>
                              <div className="mt-4 pt-4 border-t border-gray-100">
                                <Link
                                  href="/services"
                                  className="text-sm font-semibold text-cta hover:text-cta-600 transition-colors"
                                >
                                  View All Services &rarr;
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                        isScrolled
                          ? 'text-text-primary hover:bg-gray-100'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                      )}
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
                className={cn(
                  'flex items-center gap-2 text-sm font-semibold transition-colors',
                  isScrolled
                    ? 'text-primary hover:text-cta'
                    : 'text-white hover:text-accent'
                )}
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
                className={cn(
                  'flex items-center justify-center h-10 w-10 rounded-full transition-colors',
                  isScrolled
                    ? 'bg-primary text-white'
                    : 'bg-white/15 text-white'
                )}
              >
                <Phone className="h-5 w-5" />
              </a>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={cn(
                  'flex items-center justify-center h-10 w-10 rounded-lg transition-colors',
                  isScrolled
                    ? 'text-primary hover:bg-gray-100'
                    : 'text-white hover:bg-white/10'
                )}
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
            className="fixed inset-0 z-[60] bg-primary"
          >
            <div className="flex flex-col h-full">
              {/* Mobile header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                <Link
                  href="/"
                  className="flex items-center gap-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Image
                    src="/images/logos/A Clean Look Logo1.png"
                    alt="A Clean Look"
                    width={180}
                    height={58}
                    className="h-12 w-auto brightness-0 invert"
                  />
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center h-10 w-10 rounded-lg text-white hover:bg-white/10"
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
                              setIsMobileServicesOpen(!isMobileServicesOpen)
                            }
                            className="flex items-center justify-between w-full px-4 py-3 text-lg font-medium text-white rounded-lg hover:bg-white/5"
                          >
                            {item.label}
                            <ChevronDown
                              className={cn(
                                'h-5 w-5 transition-transform',
                                isMobileServicesOpen && 'rotate-180'
                              )}
                            />
                          </button>
                          <AnimatePresence>
                            {isMobileServicesOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="pl-4 pb-2 space-y-1">
                                  {SERVICES.map((service) => {
                                    const Icon = iconMap[service.icon]
                                    return (
                                      <Link
                                        key={service.slug}
                                        href={`/services/${service.slug}`}
                                        onClick={() =>
                                          setIsMobileMenuOpen(false)
                                        }
                                        className="flex items-center gap-3 px-4 py-2.5 text-white/80 hover:text-white rounded-lg hover:bg-white/5"
                                      >
                                        {Icon && (
                                          <Icon className="h-4 w-4 text-accent" />
                                        )}
                                        <span className="text-base">
                                          {service.title}
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
                          className="block px-4 py-3 text-lg font-medium text-white rounded-lg hover:bg-white/5"
                        >
                          {item.label}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Mobile CTA area */}
              <div className="px-4 py-6 border-t border-white/10 space-y-3">
                <a
                  href={`tel:${BUSINESS.phoneRaw}`}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-white/10 text-white font-semibold text-lg"
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
