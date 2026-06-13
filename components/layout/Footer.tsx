import Link from 'next/link'
import { BUSINESS, SERVICES, SERVICE_AREAS } from '@/lib/constants'

const RESOURCES = [
  { label: 'Paint estimate calculator', href: '/tools/paint-estimator' },
  { label: 'Color visualizer', href: '/tools/color-visualizer' },
  { label: 'Seasonal planner', href: '/tools/seasonal-planner' },
  { label: 'Color palette generator', href: '/tools/color-palette' },
  { label: 'Chicago homeowner guide', href: '/resources/chicago-homeowner-guide' },
] as const

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#0f1217] pb-8 pt-20 text-[#b3ac9a]">
      <div className="shell">
        <div className="grid gap-16 border-b border-[rgba(233,214,168,0.12)] pb-14 md:grid-cols-[1fr_1.6fr]">
          {/* Wordmark + pitch */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-3 text-[#f4ecd9] no-underline"
              aria-label={`${BUSINESS.name} — home`}
            >
              <span className="acl-logo-mark acl-logo-mark--light" aria-hidden="true">
                <span className="acl-logo-mark__bar acl-logo-mark__bar--a" />
                <span className="acl-logo-mark__bar acl-logo-mark__bar--b" />
                <span className="acl-logo-mark__bar acl-logo-mark__bar--c" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-[19px] font-semibold tracking-[-0.01em] text-[#f4ecd9]">
                  {BUSINESS.name}
                </span>
                <span className="mt-1 text-[10.5px] uppercase tracking-[0.12em] text-[#8e887a]">
                  Painters · Chicago · Est. {BUSINESS.founded}
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-[38ch] text-sm leading-[1.6]">
              A small, fully-insured Chicago painting outfit. We answer our phone, show up on
              time, and leave the place cleaner than we found it.
            </p>
          </div>

          {/* Columns */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <FooterCol title="Services">
              {SERVICES.map((s) => (
                <FooterLink key={s.slug} href={`/services/${s.slug}`}>
                  {s.title}
                </FooterLink>
              ))}
            </FooterCol>

            <FooterCol title="Areas">
              {SERVICE_AREAS.slice(0, 8).map((area) => (
                <FooterLink
                  key={area}
                  href={`/areas/${area.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {area}
                </FooterLink>
              ))}
              <li>
                <Link
                  href="/areas"
                  className="text-[13.5px] text-[var(--acl-accent-soft)] hover:text-[#f4ecd9]"
                >
                  All areas →
                </Link>
              </li>
            </FooterCol>

            <FooterCol title="Resources">
              {RESOURCES.map((r) => (
                <FooterLink key={r.href} href={r.href}>
                  {r.label}
                </FooterLink>
              ))}
            </FooterCol>

            <FooterCol title="Contact">
              <li className="text-[13.5px]">
                <a
                  href={`tel:${BUSINESS.phoneRaw}`}
                  className="hover:text-[var(--acl-accent-soft)]"
                >
                  {BUSINESS.phone}
                </a>
              </li>
              <li className="text-[13.5px]">
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="hover:text-[var(--acl-accent-soft)]"
                >
                  {BUSINESS.email}
                </a>
              </li>
              <li className="text-[13.5px] leading-[1.6]">{BUSINESS.address.full}</li>
              <li className="pt-2">
                <Link href="/free-estimate" className="acl-btn acl-btn--paper acl-btn--sm">
                  Book a visit
                </Link>
              </li>
            </FooterCol>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-8 text-xs text-[#6e6a5e]">
          <span>
            © {year} {BUSINESS.legalName} LLC · IL Lic. PC.000{BUSINESS.founded}
          </span>
          <span className="opacity-50" aria-hidden="true">
            ·
          </span>
          <Link href="/privacy" className="hover:text-[var(--acl-accent-soft)]">
            Privacy
          </Link>
          <span className="opacity-50" aria-hidden="true">
            ·
          </span>
          <Link href="/terms" className="hover:text-[var(--acl-accent-soft)]">
            Terms
          </Link>
          <span className="ml-auto font-display text-[13px] italic text-[#8e887a]">
            Painted in Chicago, since {BUSINESS.founded}.
          </span>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-3.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#f4ecd9]">
        {title}
      </h4>
      <ul className="space-y-2 list-none p-0 m-0">{children}</ul>
    </div>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li className="text-[13.5px]">
      <Link href={href} className="hover:text-[var(--acl-accent-soft)]">
        {children}
      </Link>
    </li>
  )
}
