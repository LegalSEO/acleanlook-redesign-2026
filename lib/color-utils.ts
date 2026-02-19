import { PAINT_COLORS, type PaintColor } from '@/data/colors'

// ─── Color Conversion ───────────────────────────────────────

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace('#', '')
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  }
}

export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)))
  return (
    '#' +
    [clamp(r), clamp(g), clamp(b)]
      .map((c) => c.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase()
  )
}

export function rgbToHsl(
  r: number,
  g: number,
  b: number
): { h: number; s: number; l: number } {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  let h = 0
  let s = 0

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 }
}

export function hslToRgb(
  h: number,
  s: number,
  l: number
): { r: number; g: number; b: number } {
  h /= 360
  s /= 100
  l /= 100

  if (s === 0) {
    const v = Math.round(l * 255)
    return { r: v, g: v, b: v }
  }

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q

  return {
    r: Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, h) * 255),
    b: Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  }
}

export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const { r, g, b } = hexToRgb(hex)
  return rgbToHsl(r, g, b)
}

export function hslToHex(h: number, s: number, l: number): string {
  const { r, g, b } = hslToRgb(h, s, l)
  return rgbToHex(r, g, b)
}

// ─── Color Distance ─────────────────────────────────────────

function colorDistance(hex1: string, hex2: string): number {
  const a = hexToRgb(hex1)
  const b = hexToRgb(hex2)
  return Math.sqrt((a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2)
}

export function findClosestColor(
  hex: string,
  brand?: string
): PaintColor | null {
  const colors = brand
    ? PAINT_COLORS.filter((c) => c.brand === brand)
    : PAINT_COLORS
  if (colors.length === 0) return null

  let closest = colors[0]
  let minDist = colorDistance(hex, closest.hex)

  for (let i = 1; i < colors.length; i++) {
    const d = colorDistance(hex, colors[i].hex)
    if (d < minDist) {
      minDist = d
      closest = colors[i]
    }
  }

  return closest
}

// ─── Color Harmony Algorithms ───────────────────────────────

/** Generate complementary palette (opposite on color wheel) */
export function complementary(hex: string): string[] {
  const { h, s, l } = hexToHsl(hex)
  return [hex, hslToHex((h + 180) % 360, s, l)]
}

/** Generate analogous palette (adjacent colors) */
export function analogous(hex: string): string[] {
  const { h, s, l } = hexToHsl(hex)
  return [
    hslToHex((h - 30 + 360) % 360, s, l),
    hex,
    hslToHex((h + 30) % 360, s, l),
  ]
}

/** Generate triadic palette (evenly spaced) */
export function triadic(hex: string): string[] {
  const { h, s, l } = hexToHsl(hex)
  return [
    hex,
    hslToHex((h + 120) % 360, s, l),
    hslToHex((h + 240) % 360, s, l),
  ]
}

/** Generate split-complementary palette */
export function splitComplementary(hex: string): string[] {
  const { h, s, l } = hexToHsl(hex)
  return [
    hex,
    hslToHex((h + 150) % 360, s, l),
    hslToHex((h + 210) % 360, s, l),
  ]
}

/** Generate monochromatic palette (shades/tints) */
export function monochromatic(hex: string): string[] {
  const { h, s, l } = hexToHsl(hex)
  return [
    hslToHex(h, s, Math.min(95, l + 25)),
    hslToHex(h, s, Math.min(85, l + 12)),
    hex,
    hslToHex(h, s, Math.max(15, l - 12)),
    hslToHex(h, s, Math.max(10, l - 25)),
  ]
}

// ─── 5-Color Room Palette Generator ─────────────────────────

export interface RoomPalette {
  primary: string // Main wall color
  accent: string // Accent wall
  trim: string // Trim / molding
  ceiling: string // Ceiling
  pop: string // Accent decor / small area
}

type HarmonyType =
  | 'complementary'
  | 'analogous'
  | 'triadic'
  | 'split-complementary'
  | 'monochromatic'

/**
 * Generate a full 5-color room palette from a base color and harmony type.
 */
export function generateRoomPalette(
  baseHex: string,
  harmony: HarmonyType
): RoomPalette {
  const { h, s, l } = hexToHsl(baseHex)

  // Trim is always a light neutral
  const trim = hslToHex(h, Math.max(5, s * 0.15), 96)
  // Ceiling is very light
  const ceiling = hslToHex(h, Math.max(3, s * 0.1), 97)

  switch (harmony) {
    case 'complementary': {
      const compH = (h + 180) % 360
      return {
        primary: baseHex,
        accent: hslToHex(compH, Math.min(s * 0.8, 60), Math.min(l + 5, 65)),
        trim,
        ceiling,
        pop: hslToHex(compH, Math.min(s + 10, 70), Math.max(l - 10, 35)),
      }
    }
    case 'analogous': {
      const adjH = (h + 30) % 360
      return {
        primary: baseHex,
        accent: hslToHex(adjH, s * 0.85, Math.min(l + 8, 70)),
        trim,
        ceiling,
        pop: hslToHex((h - 30 + 360) % 360, Math.min(s + 10, 65), l),
      }
    }
    case 'triadic': {
      const t1 = (h + 120) % 360
      const t2 = (h + 240) % 360
      return {
        primary: baseHex,
        accent: hslToHex(t1, s * 0.6, Math.min(l + 15, 75)),
        trim,
        ceiling,
        pop: hslToHex(t2, Math.min(s + 5, 60), Math.max(l - 5, 40)),
      }
    }
    case 'split-complementary': {
      const sc1 = (h + 150) % 360
      const sc2 = (h + 210) % 360
      return {
        primary: baseHex,
        accent: hslToHex(sc1, s * 0.7, Math.min(l + 10, 70)),
        trim,
        ceiling,
        pop: hslToHex(sc2, Math.min(s + 5, 60), Math.max(l - 5, 40)),
      }
    }
    case 'monochromatic':
    default: {
      return {
        primary: baseHex,
        accent: hslToHex(h, s * 0.7, Math.min(l + 15, 80)),
        trim,
        ceiling,
        pop: hslToHex(h, Math.min(s + 10, 65), Math.max(l - 20, 25)),
      }
    }
  }
}

// ─── Mood / Keyword → Color Mapping ─────────────────────────

interface MoodProfile {
  label: string
  description: string
  baseHues: number[] // base hue angles
  satRange: [number, number]
  lightRange: [number, number]
  harmony: HarmonyType
}

const MOOD_PROFILES: Record<string, MoodProfile> = {
  'calm-serene': {
    label: 'Calm & Serene',
    description: 'Soft blues, greens, and muted tones for a peaceful retreat',
    baseHues: [195, 170, 210],
    satRange: [15, 35],
    lightRange: [65, 80],
    harmony: 'analogous',
  },
  'warm-inviting': {
    label: 'Warm & Inviting',
    description: 'Earthy terracotta, warm cream, and soft amber tones',
    baseHues: [25, 35, 15],
    satRange: [25, 50],
    lightRange: [55, 75],
    harmony: 'analogous',
  },
  'bold-dramatic': {
    label: 'Bold & Dramatic',
    description: 'Deep navy, rich jewel tones, and striking contrasts',
    baseHues: [220, 280, 350],
    satRange: [40, 65],
    lightRange: [25, 45],
    harmony: 'complementary',
  },
  'fresh-modern': {
    label: 'Fresh & Modern',
    description: 'Clean whites, cool grays, and crisp accent colors',
    baseHues: [200, 180, 160],
    satRange: [10, 30],
    lightRange: [75, 90],
    harmony: 'split-complementary',
  },
  'classic-elegant': {
    label: 'Classic & Elegant',
    description: 'Timeless navy, warm white, and gold-toned accents',
    baseHues: [215, 40, 0],
    satRange: [20, 45],
    lightRange: [35, 55],
    harmony: 'triadic',
  },
  'playful-vibrant': {
    label: 'Playful & Vibrant',
    description: 'Energetic colors with cheerful warmth and personality',
    baseHues: [45, 160, 330],
    satRange: [45, 70],
    lightRange: [55, 70],
    harmony: 'triadic',
  },
}

export const MOOD_OPTIONS = Object.entries(MOOD_PROFILES).map(
  ([key, profile]) => ({
    value: key,
    label: profile.label,
    description: profile.description,
  })
)

/**
 * Generate a palette from a mood selection.
 * Uses seeded randomness (index) for variation on regenerate.
 */
export function paletteFromMood(mood: string, variation: number = 0): RoomPalette {
  const profile = MOOD_PROFILES[mood]
  if (!profile) return paletteFromMood('calm-serene', variation)

  const hueIdx = variation % profile.baseHues.length
  const h = (profile.baseHues[hueIdx] + variation * 7) % 360
  const s =
    profile.satRange[0] +
    ((variation * 13) % (profile.satRange[1] - profile.satRange[0]))
  const l =
    profile.lightRange[0] +
    ((variation * 11) % (profile.lightRange[1] - profile.lightRange[0]))

  const baseHex = hslToHex(h, s, l)
  return generateRoomPalette(baseHex, profile.harmony)
}

// ─── Keyword → Mood Mapping ─────────────────────────────────

const KEYWORD_MAP: Record<string, string> = {
  // calm-serene
  calm: 'calm-serene',
  serene: 'calm-serene',
  peaceful: 'calm-serene',
  tranquil: 'calm-serene',
  relaxing: 'calm-serene',
  spa: 'calm-serene',
  zen: 'calm-serene',
  soothing: 'calm-serene',
  coastal: 'calm-serene',
  beach: 'calm-serene',
  ocean: 'calm-serene',
  // warm-inviting
  warm: 'warm-inviting',
  cozy: 'warm-inviting',
  inviting: 'warm-inviting',
  earthy: 'warm-inviting',
  rustic: 'warm-inviting',
  farmhouse: 'warm-inviting',
  cottage: 'warm-inviting',
  traditional: 'warm-inviting',
  tuscan: 'warm-inviting',
  mediterranean: 'warm-inviting',
  // bold-dramatic
  bold: 'bold-dramatic',
  dramatic: 'bold-dramatic',
  moody: 'bold-dramatic',
  dark: 'bold-dramatic',
  rich: 'bold-dramatic',
  luxurious: 'bold-dramatic',
  glamorous: 'bold-dramatic',
  jewel: 'bold-dramatic',
  // fresh-modern
  fresh: 'fresh-modern',
  modern: 'fresh-modern',
  clean: 'fresh-modern',
  minimal: 'fresh-modern',
  minimalist: 'fresh-modern',
  scandinavian: 'fresh-modern',
  bright: 'fresh-modern',
  airy: 'fresh-modern',
  light: 'fresh-modern',
  contemporary: 'fresh-modern',
  // classic-elegant
  classic: 'classic-elegant',
  elegant: 'classic-elegant',
  timeless: 'classic-elegant',
  sophisticated: 'classic-elegant',
  formal: 'classic-elegant',
  regal: 'classic-elegant',
  // playful-vibrant
  playful: 'playful-vibrant',
  vibrant: 'playful-vibrant',
  fun: 'playful-vibrant',
  energetic: 'playful-vibrant',
  cheerful: 'playful-vibrant',
  colorful: 'playful-vibrant',
  eclectic: 'playful-vibrant',
  bohemian: 'playful-vibrant',
  boho: 'playful-vibrant',
}

/**
 * Parse free-text description and generate a palette.
 */
export function paletteFromText(
  text: string,
  variation: number = 0
): { palette: RoomPalette; detectedMood: string } {
  const words = text.toLowerCase().split(/[\s,]+/)
  let mood = 'warm-inviting' // default

  for (const word of words) {
    if (KEYWORD_MAP[word]) {
      mood = KEYWORD_MAP[word]
      break
    }
  }

  return { palette: paletteFromMood(mood, variation), detectedMood: mood }
}

// ─── Room Type Presets ──────────────────────────────────────

export type RoomType =
  | 'living-room'
  | 'bedroom'
  | 'kitchen'
  | 'bathroom'
  | 'dining-room'
  | 'office'

export const ROOM_PRESETS: Record<RoomType, { label: string; mood: string }> = {
  'living-room': { label: 'Living Room', mood: 'warm-inviting' },
  bedroom: { label: 'Bedroom', mood: 'calm-serene' },
  kitchen: { label: 'Kitchen', mood: 'fresh-modern' },
  bathroom: { label: 'Bathroom', mood: 'calm-serene' },
  'dining-room': { label: 'Dining Room', mood: 'classic-elegant' },
  office: { label: 'Home Office', mood: 'fresh-modern' },
}
