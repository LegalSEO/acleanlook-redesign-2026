import { ArrowRight, Phone } from 'lucide-react'
import { BUSINESS } from '@/lib/constants'
import type { ServiceData } from '@/data/services-editorial'

export default function ServiceHero({ svc }: { svc: ServiceData }) {
  return (
    <section className="acl-svchero">
      <div className="shell acl-svchero__grid">
        <div className="acl-svchero__copy">
          <div className="acl-svchero__meta">
            <span className="acl-svchero__num">№ {svc.number}</span>
            <span className="acl-svchero__sep" aria-hidden="true" />
            <span className="acl-svchero__kicker">{svc.kicker}</span>
          </div>

          <h1 className="acl-svchero__title">
            {svc.titleLines.map((line, i) => (
              <span key={i} className={i === svc.accentLine ? 'acl-svchero__title--ink' : undefined}>
                {line}
              </span>
            ))}
          </h1>

          <p className="acl-svchero__lede">{svc.lede}</p>

          <div className="acl-svchero__ctas">
            <a href="#estimate" className="acl-btn acl-btn--ink acl-btn--lg">
              Quote this project
              <ArrowRight size={14} aria-hidden />
            </a>
            <a href={`tel:${BUSINESS.phoneRaw}`} className="acl-btn acl-btn--ghost acl-btn--lg">
              <Phone size={14} aria-hidden /> {BUSINESS.phone}
            </a>
          </div>

          <dl className="acl-svchero__specs">
            {svc.specs.map((s, i) => (
              <div key={i}>
                <dt>{s.dt}</dt>
                <dd>{s.dd}</dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="acl-svchero__plate">
          <div
            className="acl-placeholder"
            style={{
              aspectRatio: '4/5',
              background: 'repeating-linear-gradient(135deg, #efe9dd 0 12px, #e6dfd0 12px 24px)',
            }}
            aria-label={svc.heroLabel}
          >
            <span className="acl-placeholder__tag">{svc.heroLabel}</span>
          </div>

          <div className="acl-svchero__caption">
            <span className="acl-svchero__capnum">№ {svc.number}</span>
            <span className="acl-svchero__captext">{svc.heroCaption}</span>
          </div>
        </aside>
      </div>
    </section>
  )
}
