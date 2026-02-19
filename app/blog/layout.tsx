import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | A Clean Look Chicago Blog',
    default: 'Blog — Painting Tips, Color Guides & Chicago Home Maintenance',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
