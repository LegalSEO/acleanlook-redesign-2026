import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { AreaEditorial } from '@/data/areas-editorial'

export default function AreaHero({ area }: { area: AreaEditorial }) {
  return (
    <section className="acl-areahero">
      <div className="shell acl-areahero__inner">
        <div className="acl-areahero__copy">
          <p className="acl-areahero__kicker">
            <span className="acl-areahero__number">№ {area.number}</span>
            {area.regionLabel}
          </p>
          <h1 className="acl-areahero__title">
            Painting<br />
            <em>{area.name}</em><br />
            since 1994.
          </h1>
          <p className="acl-areahero__blurb">{area.blurb}</p>
          <Link href="/free-estimate" className="acl-areahero__cta">
            Get a free estimate
            <ArrowRight size={14} aria-hidden />
          </Link>
        </div>

        <dl className="acl-areahero__stats">
          <div className="acl-areahero__stat">
            <dt>Serving since</dt>
            <dd><em>1994</em></dd>
          </div>
          <div className="acl-areahero__stat">
            <dt>{area.name} projects</dt>
            <dd>{area.projectsCompleted}<em>+</em></dd>
          </div>
          <div className="acl-areahero__stat">
            <dt>Years on these blocks</dt>
            <dd>{area.yearsServed}<em>+</em></dd>
          </div>
          <div className="acl-areahero__stat">
            <dt>Avg. response</dt>
            <dd>&lt;<em>24h</em></dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
