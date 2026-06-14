import type { ServiceData } from '@/data/services-editorial'

export default function ServiceBody({ svc }: { svc: ServiceData }) {
  return (
    <section className="acl-svcbody">
      <div className="shell acl-svcbody__grid">
        <aside className="acl-svcbody__rail">
          <span className="acl-secthead__no">§ 01</span>
          <h2 className="acl-h2">What a careful {svc.title.toLowerCase()} job looks like.</h2>
        </aside>

        <div className="acl-svcbody__prose">
          {svc.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          {svc.finishes && svc.finishes.length > 0 && (
            <div className="acl-finishes">
              <span className="acl-finishes__label">
                {svc.slug.includes('paint') ? 'Finishes we recommend' : 'What we cover'}
              </span>
              <ul className="acl-finishes__list">
                {svc.finishes.map((f) => (
                  <li key={f.name}>
                    <span className="acl-finishes__name">{f.name}</span>
                    <span className="acl-finishes__use">{f.use}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
