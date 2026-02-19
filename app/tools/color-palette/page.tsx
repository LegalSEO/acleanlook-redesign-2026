import type { Metadata } from 'next'
import PalettePageClient from './PalettePageClient'

export const metadata: Metadata = {
  title: 'AI Color Palette Generator — Find Your Perfect Paint Scheme',
  description:
    'Generate beautiful paint color palettes for any room. Describe your style, pick a mood, or start with a color you love. Matched to Benjamin Moore and Sherwin-Williams colors.',
  keywords: [
    'color palette generator',
    'paint color scheme generator',
    'room color palette tool',
    'complementary paint colors',
    'Benjamin Moore color palette',
    'Sherwin-Williams color combinations',
    'interior paint color scheme',
    'color harmony tool',
  ],
  openGraph: {
    title: 'AI Color Palette Generator | A Clean Look Chicago',
    description:
      'Generate perfect paint palettes for any room. Describe your style, pick a mood, or start with one color. Free — matched to real paint brands.',
    url: 'https://acleanlook.com/tools/color-palette',
  },
}

export default function ColorPalettePage() {
  return <PalettePageClient />
}
