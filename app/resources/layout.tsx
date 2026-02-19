import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | A Clean Look Chicago',
    default: 'Free Resources | A Clean Look Chicago',
  },
}

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
