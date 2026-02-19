'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Phone, ArrowRight } from 'lucide-react'
import { BUSINESS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export default function StickyEstimateBar({
  serviceName,
}: {
  serviceName: string
}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 z-[45] transition-transform duration-300 hidden lg:block',
        isVisible ? 'translate-y-0' : '-translate-y-full'
      )}
    >
      <div className="bg-cta/95 backdrop-blur-sm text-white">
        <div className="container-wide flex items-center justify-between py-2.5">
          <p className="text-sm font-medium">
            Get a free estimate for{' '}
            <span className="font-bold">{serviceName}</span>
          </p>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              className="flex items-center gap-1.5 text-sm font-bold hover:text-white/80 transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              {BUSINESS.phone}
            </a>
            <Link
              href="/free-estimate"
              className="flex items-center gap-1.5 text-sm font-bold bg-white text-cta px-4 py-1.5 rounded-full hover:bg-white/90 transition-colors"
            >
              Request Online
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
