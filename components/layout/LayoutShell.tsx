'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'
import MobileCTA from './MobileCTA'

const MINIMAL_LAYOUT_ROUTES = ['/free-estimate']

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isMinimal = MINIMAL_LAYOUT_ROUTES.some((route) =>
    pathname.startsWith(route)
  )

  if (isMinimal) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <MobileCTA />
    </>
  )
}
