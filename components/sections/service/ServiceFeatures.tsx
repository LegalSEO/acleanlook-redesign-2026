import type { ServiceData } from '@/data/services-editorial'

export default function ServiceFeatures({ svc }: { svc: ServiceData }) {
  return (
    <section className="acl-svcfeat">
      <div className="shell">
        <header className="acl-secthead">
          <span className="acl-secthead__no">§ 02</span>
          <h2 className="acl-h2">
            What&apos;s included with every {svc.title.toLowerCase()} job.
          </h2>
        </header>

        <div className="acl-svcfeat__grid">
          {svc.features.map((f, i) => (
            <article key={i} className="acl-svcfeat__cell">
              <span className="acl-svcfeat__num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{f.t}</h3>
              <p>{f.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
