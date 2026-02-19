'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCw, Home, Phone } from 'lucide-react'
import { BUSINESS } from '@/lib/constants'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Page error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-background-light flex items-center justify-center py-20 px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500 mx-auto mb-6">
          <AlertTriangle className="h-8 w-8" />
        </div>

        <h1 className="heading-2 text-primary mb-3">
          Something Went Wrong
        </h1>
        <p className="text-text-secondary mb-8">
          We hit a snag loading this page. This has been logged and
          we&apos;ll look into it.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="btn-primary btn-md rounded-full"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </button>
          <Link
            href="/"
            className="btn-outline-dark btn-md rounded-full"
          >
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </Link>
        </div>

        <p className="mt-8 text-sm text-text-light">
          Need help?{' '}
          <a
            href={`tel:${BUSINESS.phoneRaw}`}
            className="font-semibold text-primary"
          >
            <Phone className="inline h-3.5 w-3.5 mr-1" />
            {BUSINESS.phone}
          </a>
        </p>
      </div>
    </div>
  )
}
