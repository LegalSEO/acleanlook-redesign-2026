import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | A Clean Look Chicago',
    default: 'Free Tools | A Clean Look Chicago',
  },
}

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
