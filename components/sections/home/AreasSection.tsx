import Link from 'next/link'
import { BUSINESS } from '@/lib/constants'
import { NEIGHBORHOODS, SUBURBS } from '@/data/homepage'

export default function AreasSection() {
  return (
    <section className="acl-areas" id="areas">
      <div className="shell">
        <header className="acl-secthead acl-secthead--split">
          <div>
            <span className="acl-secthead__no">§ 06</span>
            <h2 className="acl-h2">From Edison Park<br />to Lake Forest.</h2>
          </div>
          <p className="acl-secthead__aside">
            We work the city north of I-290 and the North Shore as far as Lake Forest.
            Most weeks our trucks are on the road by 7:30am.
          </p>
        </header>

        <div className="acl-areas__grid">
          <div>
            <h3 className="acl-areas__sub">Chicago neighborhoods</h3>
            <ul className="acl-areas__list">
              {NEIGHBORHOODS.map(([name, zip]) => (
                <li key={name}>
                  <Link href={`/areas/${name.toLowerCase().replace(/\s+/g, '-')}`} className="acl-areas__name">
                    {name}
                  </Link>
                  <span className="acl-areas__zip">{zip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="acl-areas__sub">North Shore</h3>
            <ul className="acl-areas__list">
              {SUBURBS.map((s) => (
                <li key={s}>
                  <Link href={`/areas/${s.toLowerCase().replace(/\s+/g, '-')}`} className="acl-areas__name">
                    {s}
                  </Link>
                  <span className="acl-areas__zip">→</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="acl-areas__shop">
            <h3 className="acl-areas__sub">The shop</h3>
            <p className="acl-areas__addr">
              {BUSINESS.address.full}<br />
              By appointment, Mon–Fri.
            </p>
            <p className="acl-areas__addr">
              <a href={`tel:${BUSINESS.phoneRaw}`}>{BUSINESS.phone}</a><br />
              <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
            </p>
            <Link href="/free-estimate" className="acl-btn acl-btn--ink acl-btn--sm">
              Book a visit
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
