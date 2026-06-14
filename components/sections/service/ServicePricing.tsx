import type { ServiceData } from '@/data/services-editorial'

export default function ServicePricing({ svc }: { svc: ServiceData }) {
  const sectionNum = svc.showSamples ? '§ 05' : '§ 04'

  return (
    <section className="acl-pricing">
      <div className="shell">
        <header className="acl-secthead acl-secthead--split">
          <div>
            <span className="acl-secthead__no">{sectionNum}</span>
            <h2 className="acl-h2">
              What it
              <br />
              actually costs.
            </h2>
          </div>
          <p className="acl-secthead__aside">
            Real numbers from {svc.title.toLowerCase()} projects we completed across Chicago
            and the North Shore in 2024–25. No hidden fees, no upsells once we start.
          </p>
        </header>

        <div className="acl-pricing__table">
          <div className="acl-pricing__head">
            <span>Scope</span>
            <span>Low</span>
            <span>High</span>
            <span>Notes</span>
          </div>
          {svc.pricing.map((p, i) => (
            <div key={i} className="acl-pricing__row">
              <span className="acl-pricing__scope">{p.rng}</span>
              <span className="acl-pricing__num">{p.lo}</span>
              <span className="acl-pricing__num">{p.hi}</span>
              <span className="acl-pricing__note">{p.note}</span>
            </div>
          ))}
        </div>

        <p className="acl-pricing__disclaimer">{svc.pricingNote}</p>
      </div>
    </section>
  )
}
