import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import LayoutShell from '@/components/layout/LayoutShell'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://acleanlook.com'),
  title: {
    default: "A Clean Look | Chicago's Trusted Painting Professionals",
    template: '%s | A Clean Look Chicago Painters',
  },
  description:
    "Chicago's trusted painting professionals with 30+ years experience. Interior & exterior painting, power washing, gutter cleaning, and handyman services. Serving Chicago & North Shore suburbs. Call (773) 419-1718 for a free estimate.",
  keywords: [
    'Chicago painters',
    'Chicago painting contractors',
    'house painters Chicago',
    'interior painting Chicago',
    'exterior painting Chicago',
    'commercial painters Chicago',
    'power washing Chicago',
    'gutter cleaning Chicago',
    'North Shore painters',
    'painting estimate Chicago',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://acleanlook.com',
    siteName: 'A Clean Look',
    title: "A Clean Look | Chicago's Trusted Painting Professionals",
    description:
      '30+ years transforming Chicago homes & businesses. Full-service painting, power washing, and more. Free estimates!',
  },
  twitter: {
    card: 'summary_large_image',
    title: "A Clean Look | Chicago's Trusted Painting Professionals",
    description:
      '30+ years transforming Chicago homes & businesses. Free estimates!',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  )
}
