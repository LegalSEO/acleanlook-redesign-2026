'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Home,
  ArrowRight,
  Phone,
  Search,
  Paintbrush,
  Calculator,
  Palette,
  MapPin,
} from 'lucide-react'
import { BUSINESS } from '@/lib/constants'

const POPULAR_LINKS = [
  { title: 'Interior Painting', href: '/services/interior-painting', icon: Paintbrush },
  { title: 'Free Estimate', href: '/free-estimate', icon: Calculator },
  { title: 'Color Visualizer', href: '/tools/color-visualizer', icon: Palette },
  { title: 'Service Areas', href: '/areas', icon: MapPin },
]

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background-light flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* 404 number */}
            <div className="relative inline-block mb-6">
              <span className="text-[120px] sm:text-[160px] font-bold text-primary/10 leading-none select-none">
                404
              </span>
              <div className="absolute inset-0 flex items-center justify-center">
                <Paintbrush className="h-16 w-16 text-cta" />
              </div>
            </div>

            <h1 className="heading-1 text-primary mb-3">
              Page Not Found
            </h1>
            <p className="text-lg text-text-secondary mb-8 max-w-md mx-auto">
              Looks like this page got a fresh coat and moved! Let us help
              you find what you&apos;re looking for.
            </p>

            {/* Popular Links */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {POPULAR_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white border border-gray-100 hover:border-primary/20 hover:shadow-sm transition-all group"
                >
                  <link.icon className="h-5 w-5 text-text-light group-hover:text-primary transition-colors" />
                  <span className="text-xs font-semibold text-text-secondary group-hover:text-primary transition-colors">
                    {link.title}
                  </span>
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="btn-primary btn-md rounded-full"
              >
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
              <Link
                href="/free-estimate"
                className="btn-outline-dark btn-md rounded-full"
              >
                Get Free Estimate
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            {/* Phone */}
            <p className="mt-8 text-sm text-text-light">
              Need help?{' '}
              <a
                href={`tel:${BUSINESS.phoneRaw}`}
                className="font-semibold text-primary hover:text-cta transition-colors"
              >
                <Phone className="inline h-3.5 w-3.5 mr-1" />
                {BUSINESS.phone}
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
