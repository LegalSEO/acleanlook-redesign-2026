import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export type Crumb = {
  label: string
  href?: string
}

type Props = {
  items: Crumb[]
  className?: string
}

export default function Breadcrumb({ items, className }: Props) {
  if (!items.length) return null
  const last = items.length - 1

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        'shell flex items-center gap-2 pt-6 pb-2 font-mono text-[11.5px] uppercase tracking-[0.06em] text-ink-soft',
        className,
      )}
    >
      <ol className="flex flex-wrap items-center gap-1.5 list-none p-0 m-0">
        {items.map((item, i) => {
          const isLast = i === last
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-ink"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={isLast ? 'text-ink' : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight className="h-3 w-3 opacity-60" aria-hidden="true" />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
