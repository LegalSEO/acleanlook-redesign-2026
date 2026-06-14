import type { ServiceData } from '@/data/services-editorial'

export default function ServiceProcess({ svc }: { svc: ServiceData }) {
  const sectionNum = svc.showSamples ? '§ 04' : '§ 03'

  return (
    <section className="acl-svcproc">
      <div className="shell">
        <header className="acl-secthead">
          <span className="acl-secthead__no">{sectionNum}</span>
          <h2 className="acl-h2">From phone call to final coat.</h2>
        </header>

        <ol className="acl-process__list">
          {svc.process.map((s) => (
            <li key={s.n} className="acl-process__step">
              <span className="acl-process__num">{s.n}</span>
              <div>
                <h3 className="acl-process__title">{s.t}</h3>
                <p className="acl-process__copy">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
