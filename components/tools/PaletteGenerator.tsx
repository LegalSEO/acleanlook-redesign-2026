'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  MessageSquare,
  Heart,
  Pipette,
  Home,
  RefreshCw,
  ArrowRight,
  Phone,
  Copy,
  Check,
  Download,
  ExternalLink,
  ChevronDown,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { BUSINESS } from '@/lib/constants'
import {
  generateRoomPalette,
  paletteFromMood,
  paletteFromText,
  findClosestColor,
  hexToHsl,
  hslToHex,
  MOOD_OPTIONS,
  ROOM_PRESETS,
  type RoomPalette,
  type RoomType,
} from '@/lib/color-utils'
import { PAINT_COLORS, COLOR_BRANDS, type PaintColor } from '@/data/colors'

// ─── Types ──────────────────────────────────────────────────

type InputMode = 'describe' | 'mood' | 'color' | 'room'

const INPUT_MODES: { value: InputMode; label: string; icon: React.ElementType; desc: string }[] = [
  { value: 'describe', label: 'Describe Your Style', icon: MessageSquare, desc: 'Type a description' },
  { value: 'mood', label: 'Pick a Mood', icon: Heart, desc: 'Choose a vibe' },
  { value: 'color', label: 'Start with a Color', icon: Pipette, desc: 'Pick one color' },
  { value: 'room', label: 'Match My Room', icon: Home, desc: 'Select room type' },
]

const PALETTE_ROLES: { key: keyof RoomPalette; label: string; desc: string }[] = [
  { key: 'primary', label: 'Main Walls', desc: 'Primary wall color' },
  { key: 'accent', label: 'Accent Wall', desc: 'Feature or accent wall' },
  { key: 'trim', label: 'Trim & Molding', desc: 'Baseboards, crown, frames' },
  { key: 'ceiling', label: 'Ceiling', desc: 'Ceiling color' },
  { key: 'pop', label: 'Accent Pop', desc: 'Small accents & decor' },
]

const HARMONY_TYPES = [
  { value: 'complementary', label: 'Complementary' },
  { value: 'analogous', label: 'Analogous' },
  { value: 'triadic', label: 'Triadic' },
  { value: 'split-complementary', label: 'Split-Comp' },
  { value: 'monochromatic', label: 'Monochromatic' },
] as const

// ─── Swatch Card ────────────────────────────────────────────

function SwatchCard({
  color,
  role,
  isExpanded,
  onClick,
}: {
  color: string
  role: (typeof PALETTE_ROLES)[number]
  isExpanded: boolean
  onClick: () => void
}) {
  const [copied, setCopied] = useState(false)
  const bmMatch = findClosestColor(color, 'benjamin-moore')
  const swMatch = findClosestColor(color, 'sherwin-williams')

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(color)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-2xl overflow-hidden border transition-all cursor-pointer',
        isExpanded
          ? 'border-primary shadow-medium'
          : 'border-gray-100 hover:border-gray-200 hover:shadow-sm'
      )}
    >
      {/* Color swatch */}
      <div
        className="h-24 sm:h-32 w-full relative group"
        style={{ backgroundColor: color }}
      >
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/20 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          title="Copy hex"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-xs font-bold text-text-primary">{role.label}</p>
        <p className="text-[10px] text-text-light mt-0.5">{role.desc}</p>
        <p className="text-xs font-mono text-text-secondary mt-1">{color}</p>
      </div>

      {/* Expanded match details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 space-y-2 border-t border-gray-50 pt-2">
              {bmMatch && (
                <div className="flex items-center gap-2">
                  <div
                    className="h-5 w-5 rounded border border-gray-200 shrink-0"
                    style={{ backgroundColor: bmMatch.hex }}
                  />
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold text-text-primary truncate">
                      BM: {bmMatch.name}
                    </p>
                    <p className="text-[9px] text-text-light">
                      {bmMatch.code} · {bmMatch.hex}
                    </p>
                  </div>
                </div>
              )}
              {swMatch && (
                <div className="flex items-center gap-2">
                  <div
                    className="h-5 w-5 rounded border border-gray-200 shrink-0"
                    style={{ backgroundColor: swMatch.hex }}
                  />
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold text-text-primary truncate">
                      SW: {swMatch.name}
                    </p>
                    <p className="text-[9px] text-text-light">
                      {swMatch.code} · {swMatch.hex}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Room Preview ───────────────────────────────────────────

function RoomPreview({ palette, isDark }: { palette: RoomPalette; isDark: boolean }) {
  return (
    <svg
      viewBox="0 0 800 500"
      className="w-full rounded-xl border border-gray-100"
      style={{ filter: isDark ? 'brightness(0.5)' : 'none' }}
    >
      {/* Ceiling */}
      <polygon points="50,30 200,100 600,100 750,30" fill={palette.ceiling} stroke="#D0CDC5" strokeWidth="1" />
      {/* Back wall */}
      <rect x="200" y="100" width="400" height="280" fill={palette.primary} stroke="#C8C4BC" strokeWidth="1" />
      {/* Left wall */}
      <polygon points="50,30 200,100 200,380 50,480" fill={palette.accent} stroke="#C8C4BC" strokeWidth="1" />
      <polygon points="50,30 200,100 200,380 50,480" fill="rgba(0,0,0,0.05)" />
      {/* Right wall */}
      <polygon points="750,30 600,100 600,380 750,480" fill={palette.primary} stroke="#C8C4BC" strokeWidth="1" />
      <polygon points="750,30 600,100 600,380 750,480" fill="rgba(0,0,0,0.03)" />
      {/* Floor */}
      <polygon points="50,480 200,380 600,380 750,480" fill="#C4B8A8" stroke="#B0A490" strokeWidth="1" />
      {/* Trim lines */}
      <line x1="200" y1="370" x2="600" y2="370" stroke={palette.trim} strokeWidth="4" />
      <line x1="200" y1="110" x2="600" y2="110" stroke={palette.trim} strokeWidth="3" />
      {/* Accent decor */}
      <rect x="360" y="140" width="80" height="100" rx="4" fill="rgba(80,70,60,0.15)" stroke="rgba(80,70,60,0.1)" strokeWidth="1" />
      <circle cx="400" cy="300" r="25" fill={palette.pop} opacity="0.6" />
      {/* Furniture silhouettes */}
      <rect x="280" y="280" width="240" height="90" rx="6" fill="rgba(80,70,60,0.25)" />
      <rect x="260" y="250" width="60" height="120" rx="4" fill="rgba(80,70,60,0.2)" />
      <rect x="480" y="250" width="60" height="120" rx="4" fill="rgba(80,70,60,0.2)" />
    </svg>
  )
}

// ─── Main Component ─────────────────────────────────────────

export default function PaletteGenerator() {
  const [mode, setMode] = useState<InputMode>('mood')
  const [palette, setPalette] = useState<RoomPalette | null>(null)
  const [variation, setVariation] = useState(0)
  const [expandedSwatch, setExpandedSwatch] = useState<string | null>(null)
  const [isDark, setIsDark] = useState(false)

  // Mode-specific state
  const [textInput, setTextInput] = useState('')
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState('#5B8A8F')
  const [selectedHarmony, setSelectedHarmony] = useState<string>('complementary')
  const [selectedRoom, setSelectedRoom] = useState<RoomType>('living-room')

  const [detectedMood, setDetectedMood] = useState<string | null>(null)

  const handleGenerate = useCallback(() => {
    let newPalette: RoomPalette

    switch (mode) {
      case 'describe': {
        const result = paletteFromText(textInput, variation)
        newPalette = result.palette
        setDetectedMood(result.detectedMood)
        break
      }
      case 'mood': {
        if (!selectedMood) return
        newPalette = paletteFromMood(selectedMood, variation)
        break
      }
      case 'color': {
        newPalette = generateRoomPalette(
          selectedColor,
          selectedHarmony as Parameters<typeof generateRoomPalette>[1]
        )
        break
      }
      case 'room': {
        const preset = ROOM_PRESETS[selectedRoom]
        newPalette = paletteFromMood(preset.mood, variation)
        break
      }
      default:
        return
    }

    setPalette(newPalette)
  }, [mode, textInput, selectedMood, selectedColor, selectedHarmony, selectedRoom, variation])

  const handleRegenerate = () => {
    setVariation((v) => v + 1)
    // Trigger generation with new variation
    const nextVar = variation + 1
    let newPalette: RoomPalette

    switch (mode) {
      case 'describe': {
        const result = paletteFromText(textInput, nextVar)
        newPalette = result.palette
        setDetectedMood(result.detectedMood)
        break
      }
      case 'mood': {
        if (!selectedMood) return
        newPalette = paletteFromMood(selectedMood, nextVar)
        break
      }
      case 'color': {
        // Slightly shift the hue for variation
        const { h, s, l } = hexToHsl(selectedColor)
        const shifted = hslToHex((h + nextVar * 15) % 360, s, l)
        newPalette = generateRoomPalette(
          shifted,
          selectedHarmony as Parameters<typeof generateRoomPalette>[1]
        )
        break
      }
      case 'room': {
        const preset = ROOM_PRESETS[selectedRoom]
        newPalette = paletteFromMood(preset.mood, nextVar)
        break
      }
      default:
        return
    }

    setPalette(newPalette)
  }

  const handleDownload = () => {
    if (!palette) return
    const canvas = document.createElement('canvas')
    canvas.width = 1200
    canvas.height = 400
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const colors = PALETTE_ROLES.map((r) => ({
      color: palette[r.key],
      label: r.label,
    }))
    const w = canvas.width / colors.length

    colors.forEach((c, i) => {
      ctx.fillStyle = c.color
      ctx.fillRect(i * w, 0, w, 300)
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(i * w, 300, w, 100)
      ctx.fillStyle = '#1A1A2E'
      ctx.font = 'bold 16px system-ui'
      ctx.fillText(c.label, i * w + 16, 330)
      ctx.font = '14px monospace'
      ctx.fillStyle = '#4A5568'
      ctx.fillText(c.color, i * w + 16, 355)
      const match = findClosestColor(c.color, 'benjamin-moore')
      if (match) {
        ctx.font = '12px system-ui'
        ctx.fillText(`BM: ${match.name}`, i * w + 16, 380)
      }
    })

    const link = document.createElement('a')
    link.download = 'color-palette.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="bg-white rounded-3xl shadow-medium border border-gray-50 overflow-hidden">
      {/* ━━━ INPUT MODE SELECTOR ━━━ */}
      <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-gray-100">
        {INPUT_MODES.map((m) => (
          <button
            key={m.value}
            onClick={() => {
              setMode(m.value)
              setPalette(null)
            }}
            className={cn(
              'flex flex-col items-center gap-1 py-4 px-3 text-center transition-colors border-b-2',
              mode === m.value
                ? 'bg-primary/5 border-primary text-primary'
                : 'border-transparent text-text-secondary hover:bg-gray-50'
            )}
          >
            <m.icon className="h-5 w-5" />
            <span className="text-xs font-semibold">{m.label}</span>
            <span className="text-[10px] text-text-light">{m.desc}</span>
          </button>
        ))}
      </div>

      {/* ━━━ INPUT AREA ━━━ */}
      <div className="px-4 sm:px-6 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {mode === 'describe' && (
              <div>
                <label className="text-sm font-semibold text-text-primary block mb-2">
                  Describe your ideal room style
                </label>
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder='Try: "modern farmhouse", "cozy and warm", "bright and airy", "moody and dramatic"...'
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                />
                {detectedMood && palette && (
                  <p className="text-xs text-text-light mt-2">
                    Detected mood:{' '}
                    <span className="font-semibold text-primary">
                      {MOOD_OPTIONS.find((o) => o.value === detectedMood)?.label || detectedMood}
                    </span>
                  </p>
                )}
              </div>
            )}

            {mode === 'mood' && (
              <div>
                <p className="text-sm font-semibold text-text-primary mb-3">
                  What mood are you going for?
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {MOOD_OPTIONS.map((m) => (
                    <button
                      key={m.value}
                      onClick={() => setSelectedMood(m.value)}
                      className={cn(
                        'p-4 rounded-xl border text-left transition-all',
                        selectedMood === m.value
                          ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                          : 'border-gray-100 hover:border-gray-200'
                      )}
                    >
                      <p className="text-sm font-semibold text-text-primary">
                        {m.label}
                      </p>
                      <p className="text-[10px] text-text-secondary mt-0.5 leading-snug">
                        {m.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {mode === 'color' && (
              <div>
                <p className="text-sm font-semibold text-text-primary mb-3">
                  Pick a color you love, we&apos;ll build around it
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div>
                    <label className="text-xs font-medium text-text-secondary block mb-1.5">
                      Your Color
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className="h-12 w-12 rounded-xl border border-gray-200 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className="w-28 px-3 py-2 rounded-lg border border-gray-200 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary/20"
                      />
                    </div>
                    {/* Quick picks from our palette */}
                    <div className="flex gap-1.5 mt-3 flex-wrap">
                      {PAINT_COLORS.slice(0, 12).map((c) => (
                        <button
                          key={c.hex}
                          onClick={() => setSelectedColor(c.hex)}
                          className={cn(
                            'h-7 w-7 rounded-lg border-2 transition-all',
                            selectedColor === c.hex
                              ? 'border-primary scale-110'
                              : 'border-transparent hover:scale-110'
                          )}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-text-secondary block mb-1.5">
                      Color Harmony
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {HARMONY_TYPES.map((h) => (
                        <button
                          key={h.value}
                          onClick={() => setSelectedHarmony(h.value)}
                          className={cn(
                            'px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
                            selectedHarmony === h.value
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                          )}
                        >
                          {h.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {mode === 'room' && (
              <div>
                <p className="text-sm font-semibold text-text-primary mb-3">
                  What room are you painting?
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {(Object.entries(ROOM_PRESETS) as [RoomType, { label: string; mood: string }][]).map(
                    ([key, preset]) => {
                      const moodInfo = MOOD_OPTIONS.find(
                        (m) => m.value === preset.mood
                      )
                      return (
                        <button
                          key={key}
                          onClick={() => setSelectedRoom(key)}
                          className={cn(
                            'p-4 rounded-xl border text-left transition-all',
                            selectedRoom === key
                              ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                              : 'border-gray-100 hover:border-gray-200'
                          )}
                        >
                          <p className="text-sm font-semibold text-text-primary">
                            {preset.label}
                          </p>
                          <p className="text-[10px] text-text-secondary mt-0.5">
                            Best: {moodInfo?.label || preset.mood}
                          </p>
                        </button>
                      )
                    }
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Generate Button */}
        <div className="mt-6">
          <button
            onClick={handleGenerate}
            disabled={
              (mode === 'describe' && !textInput.trim()) ||
              (mode === 'mood' && !selectedMood)
            }
            className={cn(
              'w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold transition-all',
              palette
                ? 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                : 'btn-primary'
            )}
          >
            <Sparkles className="h-4 w-4" />
            {palette ? 'Generate New Palette' : 'Generate My Palette'}
          </button>
        </div>
      </div>

      {/* ━━━ RESULTS ━━━ */}
      <AnimatePresence>
        {palette && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="border-t border-gray-100">
              {/* Actions bar */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-background-light">
                <h3 className="text-sm font-bold text-primary">
                  Your Color Palette
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsDark(!isDark)}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium hover:bg-white transition-colors"
                  >
                    {isDark ? '☀️ Day' : '🌙 Night'}
                  </button>
                  <button
                    onClick={handleRegenerate}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium hover:bg-white transition-colors"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Regenerate
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium hover:bg-white transition-colors"
                  >
                    <Download className="h-3 w-3" />
                    Save
                  </button>
                </div>
              </div>

              {/* Palette swatches */}
              <div className="px-4 sm:px-6 py-4">
                <div className="grid grid-cols-5 gap-3">
                  {PALETTE_ROLES.map((role) => (
                    <SwatchCard
                      key={role.key}
                      color={palette[role.key]}
                      role={role}
                      isExpanded={expandedSwatch === role.key}
                      onClick={() =>
                        setExpandedSwatch(
                          expandedSwatch === role.key ? null : role.key
                        )
                      }
                    />
                  ))}
                </div>
                <p className="text-[10px] text-text-light text-center mt-3">
                  Click a swatch to see closest Benjamin Moore and Sherwin-Williams matches
                </p>
              </div>

              {/* Room Preview */}
              <div className="px-4 sm:px-6 pb-4">
                <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2">
                  Room Preview
                </p>
                <RoomPreview palette={palette} isDark={isDark} />
              </div>

              {/* CTAs */}
              <div className="border-t border-gray-100 px-4 sm:px-6 py-4 bg-background-light">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/tools/color-visualizer"
                    className="flex items-center justify-center gap-2 flex-1 px-4 py-2.5 rounded-full border border-primary text-primary text-xs font-semibold hover:bg-primary/5 transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Try in Color Visualizer
                  </Link>
                  <Link
                    href="/free-estimate"
                    className="btn-primary btn-sm rounded-full flex-1 justify-center text-xs"
                  >
                    Get Free Color Consultation
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                  <a
                    href={`tel:${BUSINESS.phoneRaw}`}
                    className="btn-outline-dark btn-sm rounded-full flex-1 justify-center text-xs"
                  >
                    <Phone className="mr-1.5 h-3.5 w-3.5" />
                    {BUSINESS.phone}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
