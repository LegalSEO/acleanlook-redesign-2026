import { ArrowRight } from 'lucide-react'
import { BUSINESS } from '@/lib/constants'

export default function ServiceEstimateStrip({ sectionNum = '§ 07' }: { sectionNum?: string }) {
  return (
    <section className="acl-svccta" id="estimate">
      <div className="shell acl-svccta__row">
        <div>
          <span className="acl-secthead__no">{sectionNum}</span>
          <h2 className="acl-h2">Ready when you are.</h2>
          <p className="acl-svccta__lede">
            Free, itemized written estimate delivered within 48 hours. No obligation,
            no high-pressure follow-ups — just a number you can plan around.
          </p>
        </div>

        <div className="acl-svccta__actions">
          <a href="/free-estimate" className="acl-btn acl-btn--paper acl-btn--lg">
            Book a free estimate
            <ArrowRight size={14} aria-hidden />
          </a>
          <a href={`tel:${BUSINESS.phoneRaw}`} className="acl-svccta__phone">
            <span>Or call Steve directly</span>
            <strong>{BUSINESS.phone}</strong>
          </a>
        </div>
      </div>
    </section>
  )
}
