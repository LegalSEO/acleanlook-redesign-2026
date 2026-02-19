import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact A Clean Look for a free painting estimate. Call (773) 419-1718 or fill out our form. Serving Chicago & North Shore suburbs.',
  openGraph: {
    title: 'Contact A Clean Look | Free Painting Estimates',
    description:
      'Get in touch for a free estimate. Call (773) 419-1718 or send us a message.',
    url: 'https://acleanlook.com/contact',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
