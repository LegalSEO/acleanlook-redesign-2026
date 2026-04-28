import type { Metadata } from 'next'
import { Inter, Fraunces, JetBrains_Mono, Playfair_Display } from 'next/font/google'
import LayoutShell from '@/components/layout/LayoutShell'
import GoogleAnalytics from '@/components/shared/GoogleAnalytics'
import ExitIntentPopup from '@/components/shared/ExitIntentPopup'
import { localBusinessSchema, webSiteSchema, combineSchemas } from '@/lib/seo'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

// Editorial display serif — used for h1/h2/h3, large numerals, pull-quotes.
// Italic 400/500 carries the accent color in display headings.
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

// Mono — used for eyebrows, section numbers (§ 01), color codes (HC-154), tabular meta.
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['400', '500'],
  display: 'swap',
})

// Legacy — kept until all components referencing var(--font-playfair) are migrated.
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
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: "A Clean Look — Chicago's Trusted Painting Professionals",
      },
    ],
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
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable} ${playfair.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: combineSchemas(localBusinessSchema(), webSiteSchema()),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <GoogleAnalytics />
        <LayoutShell>{children}</LayoutShell>
        <ExitIntentPopup />
      </body>
    </html>
  )
}
