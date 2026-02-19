'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import { BUSINESS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export default function MobileCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40 lg:hidden transition-transform duration-300',
        isVisible ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      <div className="bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <a
            href={`tel:${BUSINESS.phoneRaw}`}
            className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-full bg-primary text-white font-semibold text-sm"
          >
            <Phone className="h-4 w-4" />
            Call Now
          </a>
          <Link
            href="/free-estimate"
            className="flex items-center justify-center flex-1 py-2.5 rounded-full bg-cta text-white font-semibold text-sm"
          >
            Free Estimate
          </Link>
        </div>
      </div>
    </div>
  )
}
