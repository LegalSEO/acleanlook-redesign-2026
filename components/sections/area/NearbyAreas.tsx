import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type NearbyItem = { slug: string; name: string; n: string }

export default function NearbyAreas({ areas }: { areas: NearbyItem[] }) {
  return (
    <section className="acl-nearby">
      <div className="shell">
        <header className="acl-nearby__head">
          <span className="acl-secthead__no">§ 07</span>
          <h2>Other areas we serve.</h2>
        </header>

        <div className="acl-nearby__grid">
          {areas.map((a) => (
            <Link key={a.slug} href={`/areas/${a.slug}`} className="acl-nearby__card">
              <span className="acl-nearby__num">№ {a.n}</span>
              <span className="acl-nearby__name">{a.name}</span>
              <span className="acl-nearby__arrow">
                View area
                <ArrowRight size={11} aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
