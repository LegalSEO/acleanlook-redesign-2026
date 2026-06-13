import { cn } from '@/lib/utils'

type Props = {
  /** When true, renders flanking 60–80px hairlines on both sides (centered layout). */
  centered?: boolean
  /** When true, renders only a leading hairline (default — left-flush). */
  leadingRule?: boolean
  className?: string
  children: React.ReactNode
}

export default function Eyebrow({
  centered = false,
  leadingRule = true,
  className,
  children,
}: Props) {
  return (
    <span
      className={cn(
        'acl-eyebrow',
        centered && 'justify-center text-center',
        className,
      )}
    >
      {(centered || leadingRule) && <span className="acl-eyebrow__rule" />}
      <span>{children}</span>
      {centered && <span className="acl-eyebrow__rule" />}
    </span>
  )
}
