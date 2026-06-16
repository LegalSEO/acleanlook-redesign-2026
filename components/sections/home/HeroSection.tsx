import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Phone } from 'lucide-react'
import { BUSINESS } from '@/lib/constants'
import { HERO_SWATCHES } from '@/data/homepage'

export default function HeroSection() {
  return (
    <section className="acl-hero" id="top">
      <div className="shell acl-hero__grid">
        {/* Copy */}
        <div className="acl-hero__copy">
          <span className="acl-eyebrow mb-8">
            <span className="acl-eyebrow__rule" />
            <span>Vol. 30 — A Chicago Painter&apos;s Almanac</span>
          </span>

          <h1 className="acl-h1">
            <span className="acl-h1__line">A clean,</span>
            <span className="acl-h1__line acl-h1__line--accent">careful coat</span>
            <span className="acl-h1__line">on the city we love.</span>
          </h1>

          <p className="acl-lede mb-12">
            For three decades, Steve and crew have painted Chicago bungalows, North Shore Tudors,
            and West Loop offices — one room, one season, one careful coat at a time.{' '}
            <strong className="font-medium text-ink">Free estimates within 48&nbsp;hours.</strong>
          </p>

          <div className="acl-hero__ctas">
            <Link href="/free-estimate" className="acl-btn acl-btn--ink acl-btn--lg">
              Book a free estimate <ArrowRight size={14} aria-hidden />
            </Link>
            <a href={`tel:${BUSINESS.phoneRaw}`} className="acl-btn acl-btn--ghost acl-btn--lg">
              <Phone size={14} aria-hidden /> {BUSINESS.phone}
            </a>
          </div>

          <dl className="acl-hero__stats">
            <div><dt>Years</dt><dd>30+</dd></div>
            <div><dt>Homes</dt><dd>1,000+</dd></div>
            <div><dt>Stars</dt><dd>5.0</dd></div>
            <div><dt>Insured</dt><dd>$2M</dd></div>
          </dl>
        </div>

        {/* Plate */}
        <aside className="acl-hero__plate">
          <div
            style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', border: '1px solid var(--acl-rule)' }}
            aria-label="Chicago Victorian home exterior — professional painters at work"
          >
            <Image
              src="/images/hero/hero-painters.jpg"
              alt="Professional house painters working on a Chicago Victorian home exterior, golden hour light"
              fill
              priority
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="acl-hero__caption">
            <span className="acl-hero__capnum">№ 142</span>
            <span className="acl-hero__captext">
              North Side Victorian — repainted September 2025. Three coats Aura Exterior
              in <em>Hale Navy</em> over Benjamin Moore primer; trim in <em>Simply White</em>.
            </span>
          </div>

          <div className="acl-hero__rail">
            {HERO_SWATCHES.map((s) => (
              <div key={s.sub} className="acl-swatch">
                <div className="acl-swatch__chip" style={{ background: s.hex }} />
                <div className="acl-swatch__meta">
                  <span className="acl-swatch__label">{s.label}</span>
                  <span className="acl-swatch__sub">{s.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* Credentials ticker */}
      <div className="acl-ticker" aria-hidden="true">
        <div className="acl-ticker__track">
          {['Interior', 'Exterior', 'Commercial', 'Power Wash', 'Gutters', 'Handyman', 'Free Estimates', 'Since 1994',
            'Interior', 'Exterior', 'Commercial', 'Power Wash', 'Gutters', 'Handyman', 'Free Estimates', 'Since 1994',
            'Interior', 'Exterior', 'Commercial', 'Power Wash', 'Gutters', 'Handyman', 'Free Estimates', 'Since 1994',
          ].map((t, i) => (
            <span key={i} className="acl-ticker__item">
              <span className="acl-ticker__dot" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
