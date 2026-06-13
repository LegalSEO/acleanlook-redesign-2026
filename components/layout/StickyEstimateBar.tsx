'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BUSINESS } from '@/lib/constants'

type Props = {
  /** Override the display label (e.g. service or area name). Defaults to business name. */
  label?: string
  /** Override the mono sub-label. Defaults to the business tagline. */
  sub?: string
}

export default function StickyEstimateBar({
  label = BUSINESS.name,
  sub = `Painters · Chicago · Est. ${BUSINESS.founded}`,
}: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <div className="acl-sticky">
      <div className="acl-sticky__row shell">
        <div className="acl-sticky__copy">
          <span className="acl-sticky__label">{label}</span>
          <span className="acl-sticky__sub">{sub}</span>
        </div>
        <div className="acl-sticky__actions">
          <a
            href={`tel:${BUSINESS.phoneRaw}`}
            className="acl-sticky__phone"
            aria-label={`Call ${BUSINESS.phone}`}
          >
            {BUSINESS.phone}
          </a>
          <Link href="/free-estimate" className="acl-btn acl-btn--ink">
            Free estimate
          </Link>
        </div>
      </div>
    </div>
  )
}
