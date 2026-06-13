import Link from 'next/link'
import * as React from 'react'
import { cn } from '@/lib/utils'

type Variant = 'ink' | 'ghost' | 'paper'
type Size = 'sm' | 'default' | 'lg'

const VARIANT_CLASS: Record<Variant, string> = {
  ink: 'acl-btn acl-btn--ink',
  ghost: 'acl-btn acl-btn--ghost',
  paper: 'acl-btn acl-btn--paper',
}

const SIZE_CLASS: Record<Size, string> = {
  sm: 'acl-btn--sm',
  default: '',
  lg: 'acl-btn--lg',
}

type CommonProps = {
  variant?: Variant
  size?: Size
  className?: string
  children: React.ReactNode
}

type AnchorProps = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className'> & {
    href: string
  }

type ButtonProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> & {
    href?: undefined
  }

export type ButtonOrLinkProps = AnchorProps | ButtonProps

function classes(variant: Variant = 'ink', size: Size = 'default', extra?: string) {
  return cn(VARIANT_CLASS[variant], SIZE_CLASS[size], extra)
}

export default function Button(props: ButtonOrLinkProps) {
  const { variant, size, className, children } = props

  if ('href' in props && props.href !== undefined) {
    const { href, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props
    const isExternal = /^(https?:|tel:|mailto:|#)/i.test(href)
    const merged = classes(variant, size, className)

    if (isExternal) {
      return (
        <a href={href} className={merged} {...rest}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={merged} {...rest}>
        {children}
      </Link>
    )
  }

  const { variant: _v, size: _s, className: _c, children: _ch, type, ...rest } =
    props as ButtonProps
  return (
    <button type={type ?? 'button'} className={classes(variant, size, className)} {...rest}>
      {children}
    </button>
  )
}
