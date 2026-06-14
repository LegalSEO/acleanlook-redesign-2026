import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { RelatedSvc } from '@/data/services-editorial'

export default function ServiceRelated({ related, sectionNum = '§ 08' }: { related: RelatedSvc[]; sectionNum?: string }) {
  return (
    <section className="acl-related">
      <div className="shell">
        <header className="acl-secthead">
          <span className="acl-secthead__no">{sectionNum}</span>
          <h2 className="acl-h2">Other things we do, while we&apos;re there.</h2>
        </header>

        <div className="acl-related__grid">
          {related.map((r) => (
            <Link key={r.slug} href={`/services/${r.slug}`} className="acl-related__card">
              <span className="acl-related__num">№ {r.n}</span>
              <h3>{r.title}</h3>
              <span className="acl-related__arrow">
                Read more
                <ArrowRight size={12} aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
