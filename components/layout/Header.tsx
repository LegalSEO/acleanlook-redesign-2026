'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BUSINESS } from '@/lib/constants'

const NAV: { label: string; href: string }[] = [
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Areas', href: '/areas' },
  { label: 'Tools', href: '/tools' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'About', href: '/about' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Close mobile menu on route change.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/')

  return (
    <header className="sticky top-0 z-40 border-b border-rule-soft bg-paper/[0.92] backdrop-blur-md backdrop-saturate-150">
      <div className="shell flex items-center justify-between gap-6 py-[14px]">
        <Link
          href="/"
          className="flex items-center gap-3 text-ink no-underline"
          aria-label={`${BUSINESS.name} — home`}
        >
          <span className="acl-logo-mark" aria-hidden="true">
            <span className="acl-logo-mark__bar acl-logo-mark__bar--a" />
            <span className="acl-logo-mark__bar acl-logo-mark__bar--b" />
            <span className="acl-logo-mark__bar acl-logo-mark__bar--c" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-[19px] font-semibold tracking-[-0.01em]">
              {BUSINESS.name}
            </span>
            <span className="mt-1 text-[10.5px] uppercase tracking-[0.12em] text-ink-soft">
              Painters · Chicago · Est. {BUSINESS.founded}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-[26px] lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="acl-nav-link"
              aria-current={isActive(item.href) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-[18px] lg:flex">
          <a
            href={`tel:${BUSINESS.phoneRaw}`}
            className="text-sm font-medium text-ink hover:text-accent"
          >
            {BUSINESS.phone}
          </a>
          <Link href="/free-estimate" className="acl-btn acl-btn--ink">
            Free estimate
          </Link>
        </div>

        <button
          type="button"
          className="flex flex-col gap-1 p-2 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? (
            <X className="h-6 w-6 text-ink" />
          ) : (
            <Menu className="h-6 w-6 text-ink" />
          )}
        </button>
      </div>

      {open && (
        <div className="border-t border-rule-soft bg-paper px-6 pb-5 pt-3 lg:hidden">
          <nav className="flex flex-col" aria-label="Primary">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-rule-soft py-3 text-base font-medium text-ink"
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-5 flex flex-col gap-3">
              <a
                href={`tel:${BUSINESS.phoneRaw}`}
                className="acl-btn acl-btn--ghost justify-center"
              >
                {BUSINESS.phone}
              </a>
              <Link
                href="/free-estimate"
                className={cn('acl-btn acl-btn--ink', 'justify-center')}
              >
                Free estimate
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
