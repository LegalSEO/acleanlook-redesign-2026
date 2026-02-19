import type { Metadata } from 'next'
import VisualizerPageClient from './VisualizerPageClient'

export const metadata: Metadata = {
  title: 'Room Color Visualizer — Preview Paint Colors Before You Buy',
  description:
    'Try paint colors on virtual rooms or upload your own photo. Preview Benjamin Moore, Sherwin-Williams, and trending 2025 colors instantly. Free tool — no sign-up required.',
  keywords: [
    'paint color visualizer',
    'room color preview tool',
    'virtual room painter',
    'try paint colors online',
    'Benjamin Moore color preview',
    'Sherwin-Williams color visualizer',
    'room paint simulator Chicago',
    'paint color picker tool',
  ],
  openGraph: {
    title: 'Room Color Visualizer | A Clean Look Chicago',
    description:
      'Preview paint colors on virtual rooms or your own photos. Benjamin Moore, Sherwin-Williams, and trending 2025 palettes. Free — no sign-up.',
    url: 'https://acleanlook.com/tools/color-visualizer',
  },
}

export default function ColorVisualizerPage() {
  return <VisualizerPageClient />
}
