'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

// ─── Event Tracking Helpers ────────────────────────────────
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === 'undefined') return
  window.gtag?.('event', eventName, params)
}

export function trackFormSubmission(formName: string) {
  trackEvent('form_submission', {
    form_name: formName,
    event_category: 'engagement',
  })
}

export function trackPhoneClick(location: string) {
  trackEvent('phone_click', {
    event_category: 'engagement',
    event_label: location,
  })
}

export function trackEbookDownload(ebookName: string) {
  trackEvent('ebook_download', {
    event_category: 'conversion',
    event_label: ebookName,
  })
}

export function trackToolUsage(toolName: string, action: string) {
  trackEvent('tool_usage', {
    event_category: 'engagement',
    tool_name: toolName,
    action,
  })
}

export function trackCTAClick(ctaName: string, location: string) {
  trackEvent('cta_click', {
    event_category: 'engagement',
    cta_name: ctaName,
    location,
  })
}

// ─── Page View Tracker ─────────────────────────────────────
function PageViewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '')
    window.gtag?.('config', GA_MEASUREMENT_ID, { page_path: url })
  }, [pathname, searchParams])

  return null
}

// ─── Main Component ────────────────────────────────────────
export default function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: true,
            });
          `,
        }}
      />
      <Suspense>
        <PageViewTracker />
      </Suspense>
    </>
  )
}
