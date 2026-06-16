import type { AreaEditorial } from '@/data/areas-editorial'

export default function LocalProjects({ area }: { area: AreaEditorial }) {
  return (
    <section className="acl-localprojects">
      <div className="shell">
        <header className="acl-localprojects__head">
          <span className="acl-secthead__no">§ 03</span>
          <h2>Recent work in {area.name}.</h2>
        </header>

        <div className="acl-localprojects__grid">
          {area.recentProjects.map((p) => (
            <div key={p.addr} className="acl-localprojects__card">
              <div className="acl-localprojects__img">
                <div className="acl-placeholder" style={{ height: '100%' }}>
                  <span className="acl-placeholder__tag">{p.scope.split(',')[0]}</span>
                </div>
                <span className="acl-localprojects__img-label">{p.season}</span>
              </div>
              <div className="acl-localprojects__meta">
                <span className="acl-localprojects__addr">{p.addr}</span>
                <span className="acl-localprojects__scope">{p.scope}</span>
                <span className="acl-localprojects__color">{p.color}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
