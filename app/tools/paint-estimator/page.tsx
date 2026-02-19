import type { Metadata } from 'next'
import EstimatorPageClient from './EstimatorPageClient'

export const metadata: Metadata = {
  title: 'Free Paint Estimate Calculator — Chicago Painting Costs 2025',
  description:
    'Calculate your painting costs instantly with our free Chicago paint estimate calculator. Interior & exterior pricing based on real Chicago market data. Get your estimate in 60 seconds.',
  keywords: [
    'painting cost calculator Chicago',
    'how much to paint a room Chicago',
    'interior painting cost calculator',
    'exterior painting cost estimate',
    'Chicago painting prices',
    'house painting estimate calculator',
    'paint cost per square foot Chicago',
  ],
  openGraph: {
    title: 'Free Paint Estimate Calculator | A Clean Look Chicago',
    description:
      'Calculate your Chicago painting costs in 60 seconds. Based on real market data from 30+ years in the business.',
    url: 'https://acleanlook.com/tools/paint-estimator',
  },
}

export default function PaintEstimatorPage() {
  return <EstimatorPageClient />
}
