import { cn } from '@/lib/utils'

type Props = {
  /** Section number/marker — rendered as "§ 01" by default; pass own prefix if needed. */
  number?: string
  /** Override the prefix glyph (e.g. "№", "§"). Default "§". Pass empty string to omit. */
  prefix?: string
  /** Section heading. Inline JSX OK (e.g. line breaks, soft secondary lines). */
  title: React.ReactNode
  /** Optional aside paragraph — when present, renders the split layout (heading left, aside right). */
  aside?: React.ReactNode
  /** Tag for the heading element. Defaults to h2. */
  as?: 'h1' | 'h2' | 'h3'
  /** When true, drop the bottom padding (used inside hero sections that already pad themselves). */
  flush?: boolean
  className?: string
}

export default function SectionHead({
  number,
  prefix = '§',
  title,
  aside,
  as: Tag = 'h2',
  flush = false,
  className,
}: Props) {
  const heading = (
    <Tag className={Tag === 'h1' ? 'acl-h1' : 'acl-h2'}>{title}</Tag>
  )

  const numberLabel =
    number !== undefined ? (
      <span className="acl-secnum">
        {prefix ? `${prefix} ${number}` : number}
      </span>
    ) : null

  if (aside) {
    return (
      <header
        className={cn(
          'flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-12',
          flush ? 'pt-0' : 'pt-22 pb-11',
          className,
        )}
      >
        <div className="min-w-0 flex-1 space-y-4">
          {numberLabel}
          {heading}
        </div>
        <p className="m-0 max-w-[42ch] flex-none basis-[360px] text-[14.5px] leading-[1.6] text-ink-soft">
          {aside}
        </p>
      </header>
    )
  }

  return (
    <header
      className={cn(
        'flex flex-col gap-4',
        flush ? 'pt-0' : 'pt-22 pb-11',
        className,
      )}
    >
      {numberLabel}
      {heading}
    </header>
  )
}
