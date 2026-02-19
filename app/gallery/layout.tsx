import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Project Gallery',
  description:
    'Browse before-and-after photos of our painting, power washing, and home improvement projects across Chicago & North Shore. See the A Clean Look difference.',
  openGraph: {
    title: 'Project Gallery | A Clean Look Chicago',
    description:
      'Before-and-after transformations from 30+ years of painting across Chicago. See our work.',
    url: 'https://acleanlook.com/gallery',
  },
}

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
