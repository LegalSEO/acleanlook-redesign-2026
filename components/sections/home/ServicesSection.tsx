import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { HOME_SERVICES } from '@/data/homepage'

export default function ServicesSection() {
  return (
    <section className="acl-services" id="services">
      <div className="shell">
        <header className="acl-secthead">
          <span className="acl-secthead__no">§ 01</span>
          <h2 className="acl-h2">
            One crew, six trades.
            <br />
            <span className="acl-soft">Painting first — everything else, while we&apos;re already there.</span>
          </h2>
        </header>

        <div className="acl-services__grid">
          {HOME_SERVICES.map((s) => (
            <article key={s.n} className="acl-service">
              <div className="acl-service__top">
                <span className="acl-service__num">{s.n}</span>
                <span className="acl-service__spec">{s.spec}</span>
              </div>
              <h3 className="acl-service__title">{s.title}</h3>
              <p className="acl-service__blurb">{s.blurb}</p>
              <Link href={`/services/${s.slug}`} className="acl-service__link">
                Read more <ArrowRight size={12} aria-hidden />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
