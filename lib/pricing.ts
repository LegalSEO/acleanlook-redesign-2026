// ─── Types ──────────────────────────────────────────────────

export type RoomSize = 'small' | 'medium' | 'large' | 'xlarge'
export type SurfaceCondition = 'good' | 'fair' | 'poor'
export type PaintQuality = 'standard' | 'premium' | 'ultra'
export type HomeStyle = 'ranch' | 'two-story' | 'three-story' | 'split-level'
export type SidingMaterial =
  | 'wood'
  | 'vinyl'
  | 'brick'
  | 'stucco'
  | 'aluminum'
  | 'mixed'

export interface RoomEstimate {
  roomType: string
  size: RoomSize
  includeCeiling: boolean
  includeTrim: boolean
  doors: number
}

export interface LineItem {
  label: string
  low: number
  high: number
}

export interface EstimateResult {
  projectType: 'interior' | 'exterior'
  lineItems: LineItem[]
  subtotal: { low: number; high: number }
  conditionLabel: string
  conditionMultiplier: number
  qualityLabel: string
  qualityMultiplier: number
  total: { low: number; high: number }
  chicagoAverage: number
}

// ─── Chicago Market Pricing Data (from CLAUDE.md) ──────────

// Single room: $400 – $900, avg $640
const ROOM_BASE = { low: 400, high: 900 }

const ROOM_SIZE_FACTOR: Record<RoomSize, number> = {
  small: 0.65,
  medium: 1.0,
  large: 1.4,
  xlarge: 1.8,
}

const ROOM_SIZE_LABEL: Record<RoomSize, string> = {
  small: 'Small',
  medium: 'Medium',
  large: 'Large',
  xlarge: 'Extra Large',
}

const CEILING_ADDON = 0.3
const TRIM_ADDON = 0.2
const DOOR_COST = { low: 75, high: 150 }

// Exterior: $2.10 – $3.25 per sqft
const EXTERIOR_RATE = { low: 2.1, high: 3.25 }

const STORIES_FACTOR: Record<HomeStyle, number> = {
  ranch: 1.0,
  'two-story': 1.3,
  'three-story': 1.6,
  'split-level': 1.15,
}

// Material affects prep labor
const MATERIAL_FACTOR: Record<SidingMaterial, number> = {
  vinyl: 0.9,
  aluminum: 0.95,
  wood: 1.0,
  mixed: 1.05,
  stucco: 1.1,
  brick: 1.15,
}

const EXTERIOR_TRIM = { low: 1500, high: 3500 }
const DECK_COST = { low: 500, high: 2000 }

const CONDITION_FACTOR: Record<SurfaceCondition, { mult: number; label: string }> = {
  good: { mult: 1.0, label: 'Good condition (1.0×)' },
  fair: { mult: 1.25, label: 'Fair condition (+25%)' },
  poor: { mult: 1.6, label: 'Poor condition (+60%)' },
}

const QUALITY_FACTOR: Record<PaintQuality, { mult: number; label: string }> = {
  standard: { mult: 1.0, label: 'Standard paint (1.0×)' },
  premium: { mult: 1.2, label: 'Premium paint (+20%)' },
  ultra: { mult: 1.4, label: 'Ultra Premium paint (+40%)' },
}

// ─── Interior Calculation ───────────────────────────────────

export function calculateInteriorEstimate(
  rooms: RoomEstimate[],
  condition: SurfaceCondition,
  paintQuality: PaintQuality
): EstimateResult {
  const lineItems: LineItem[] = []

  // Group identical rooms for cleaner display
  const grouped = new Map<string, { room: RoomEstimate; count: number }>()

  for (const room of rooms) {
    const key = `${room.roomType}|${room.size}|${room.includeCeiling}|${room.includeTrim}|${room.doors}`
    const existing = grouped.get(key)
    if (existing) {
      existing.count++
    } else {
      grouped.set(key, { room, count: 1 })
    }
  }

  for (const { room, count } of Array.from(grouped.values())) {
    const factor = ROOM_SIZE_FACTOR[room.size]
    let roomLow = ROOM_BASE.low * factor
    let roomHigh = ROOM_BASE.high * factor

    if (room.includeCeiling) {
      roomLow *= 1 + CEILING_ADDON
      roomHigh *= 1 + CEILING_ADDON
    }
    if (room.includeTrim) {
      roomLow *= 1 + TRIM_ADDON
      roomHigh *= 1 + TRIM_ADDON
    }

    const doorLow = room.doors * DOOR_COST.low
    const doorHigh = room.doors * DOOR_COST.high
    roomLow += doorLow
    roomHigh += doorHigh

    const sizeLabel = ROOM_SIZE_LABEL[room.size]
    const prefix = count > 1 ? `${count}× ` : ''
    const label = `${prefix}${room.roomType} (${sizeLabel})`

    lineItems.push({
      label,
      low: Math.round(roomLow * count),
      high: Math.round(roomHigh * count),
    })
  }

  const subtotalLow = lineItems.reduce((s, i) => s + i.low, 0)
  const subtotalHigh = lineItems.reduce((s, i) => s + i.high, 0)

  const condMult = CONDITION_FACTOR[condition].mult
  const qualMult = QUALITY_FACTOR[paintQuality].mult

  const totalLow = Math.round(subtotalLow * condMult * qualMult)
  const totalHigh = Math.round(subtotalHigh * condMult * qualMult)

  return {
    projectType: 'interior',
    lineItems,
    subtotal: { low: subtotalLow, high: subtotalHigh },
    conditionLabel: CONDITION_FACTOR[condition].label,
    conditionMultiplier: condMult,
    qualityLabel: QUALITY_FACTOR[paintQuality].label,
    qualityMultiplier: qualMult,
    total: { low: totalLow, high: totalHigh },
    chicagoAverage: Math.round((totalLow + totalHigh) / 2),
  }
}

// ─── Exterior Calculation ───────────────────────────────────

export function calculateExteriorEstimate(
  sqft: number,
  homeStyle: HomeStyle,
  material: SidingMaterial,
  condition: SurfaceCondition,
  paintQuality: PaintQuality,
  includeTrim: boolean,
  includeDeck: boolean
): EstimateResult {
  const lineItems: LineItem[] = []

  const storyFactor = STORIES_FACTOR[homeStyle]
  const materialFactor = MATERIAL_FACTOR[material]

  const baseLow = Math.round(sqft * EXTERIOR_RATE.low * storyFactor * materialFactor)
  const baseHigh = Math.round(sqft * EXTERIOR_RATE.high * storyFactor * materialFactor)

  lineItems.push({
    label: `Exterior painting (${sqft.toLocaleString()} sqft)`,
    low: baseLow,
    high: baseHigh,
  })

  if (includeTrim) {
    lineItems.push({
      label: 'Trim, fascia & accent painting',
      low: EXTERIOR_TRIM.low,
      high: EXTERIOR_TRIM.high,
    })
  }

  if (includeDeck) {
    lineItems.push({
      label: 'Deck / porch staining',
      low: DECK_COST.low,
      high: DECK_COST.high,
    })
  }

  const subtotalLow = lineItems.reduce((s, i) => s + i.low, 0)
  const subtotalHigh = lineItems.reduce((s, i) => s + i.high, 0)

  const condMult = CONDITION_FACTOR[condition].mult
  const qualMult = QUALITY_FACTOR[paintQuality].mult

  const totalLow = Math.round(subtotalLow * condMult * qualMult)
  const totalHigh = Math.round(subtotalHigh * condMult * qualMult)

  return {
    projectType: 'exterior',
    lineItems,
    subtotal: { low: subtotalLow, high: subtotalHigh },
    conditionLabel: CONDITION_FACTOR[condition].label,
    conditionMultiplier: condMult,
    qualityLabel: QUALITY_FACTOR[paintQuality].label,
    qualityMultiplier: qualMult,
    total: { low: totalLow, high: totalHigh },
    chicagoAverage: Math.round((totalLow + totalHigh) / 2),
  }
}

// ─── Helpers ────────────────────────────────────────────────

export function formatCurrency(n: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n)
}
