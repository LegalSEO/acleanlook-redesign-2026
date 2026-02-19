import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    "Learn about A Clean Look — Chicago's trusted painting professionals with 30+ years of experience. Meet our team, values, and commitment to quality craftsmanship.",
  openGraph: {
    title: 'About A Clean Look | Chicago Painting Professionals',
    description:
      "30+ years of trust, craftsmanship, and Chicago pride. Learn what makes A Clean Look different.",
    url: 'https://acleanlook.com/about',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
