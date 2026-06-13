import type { Metadata } from 'next'
import HeroSection from '@/components/sections/home/HeroSection'
import PressBar from '@/components/sections/home/PressBar'
import ServicesSection from '@/components/sections/home/ServicesSection'
import WorkSection from '@/components/sections/home/WorkSection'
import ProcessSection from '@/components/sections/home/ProcessSection'
import PaletteSection from '@/components/sections/home/PaletteSection'
import ReviewsSection from '@/components/sections/home/ReviewsSection'
import AreasSection from '@/components/sections/home/AreasSection'
import EstimateSection from '@/components/sections/home/EstimateSection'

export const metadata: Metadata = {
  title: "A Clean Look | Chicago's Trusted Painting Professionals",
  description:
    "For three decades, Steve and crew have painted Chicago bungalows, North Shore Tudors, and West Loop offices. Interior & exterior painting, power washing, gutter cleaning. Free estimates within 48 hours.",
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PressBar />
      <ServicesSection />
      <WorkSection />
      <ProcessSection />
      <PaletteSection />
      <ReviewsSection />
      <AreasSection />
      <EstimateSection />
    </>
  )
}
