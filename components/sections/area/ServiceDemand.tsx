import Link from 'next/link'
import type { AreaEditorial } from '@/data/areas-editorial'

const DEMAND_DOTS: Record<string, number> = {
  'very high': 4,
  high: 3,
  moderate: 2,
}

export default function ServiceDemand({ area }: { area: AreaEditorial }) {
  return (
    <section className="acl-servicedemand">
      <div className="shell">
        <header className="acl-servicedemand__head">
          <span className="acl-secthead__no">§ 04</span>
          <h2>What we do most in {area.name}.</h2>
        </header>

        <table className="acl-servicedemand__table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Demand</th>
              <th style={{ display: 'none' }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {area.serviceLines.map((line) => {
              const dots = DEMAND_DOTS[line.demand] ?? 2
              return (
                <tr key={line.svc}>
                  <td>
                    <span className="acl-servicedemand__svc-name">{line.svc}</span>
                    <span className="acl-servicedemand__svc-note">{line.note}</span>
                    <Link href={`/services/${line.slug}`} className="acl-servicedemand__svc-link">
                      Service details →
                    </Link>
                  </td>
                  <td>
                    <div className="acl-servicedemand__dots" aria-label={line.demand}>
                      {Array.from({ length: 4 }).map((_, i) => (
                        <span
                          key={i}
                          className={`acl-servicedemand__dot${i < dots ? ' acl-servicedemand__dot--fill' : ''}`}
                        />
                      ))}
                    </div>
                    <span style={{ display: 'block', fontSize: '10px', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--acl-ink-soft)' }}>
                      {line.demand}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
