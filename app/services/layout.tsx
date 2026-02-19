import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Services',
    template: '%s | A Clean Look Chicago Painters',
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
