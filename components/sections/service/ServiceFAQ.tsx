'use client'

import { useState } from 'react'
import type { FaqItem } from '@/data/services-editorial'

export default function ServiceFAQ({ faqs, sectionNum = '§ 06' }: { faqs: FaqItem[]; sectionNum?: string }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="acl-faq">
      <div className="shell">
        <header className="acl-secthead">
          <span className="acl-secthead__no">{sectionNum}</span>
          <h2 className="acl-h2">Common questions.</h2>
        </header>

        <ul className="acl-faq__list">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <li key={i} className={`acl-faq__item${isOpen ? ' is-open' : ''}`}>
                <button
                  className="acl-faq__q"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="acl-faq__qnum">{String(i + 1).padStart(2, '0')}</span>
                  <span className="acl-faq__qtext">{f.q}</span>
                  <span className="acl-faq__caret" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>
                <div className="acl-faq__a" role="region" aria-hidden={!isOpen}>
                  <p>{f.a}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
