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
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main" role="main">{children}</main>
      <Footer />
      <MobileCTA />
    </>
  )
}
