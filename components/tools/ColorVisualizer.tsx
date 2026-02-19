'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Link from 'next/link'
import {
  Upload,
  LayoutTemplate,
  Search,
  Undo2,
  Download,
  Sun,
  Moon,
  ArrowRight,
  Phone,
  Pipette,
  ChevronDown,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { BUSINESS } from '@/lib/constants'
import {
  PAINT_COLORS,
  COLOR_BRANDS,
  COLOR_FAMILIES,
  searchColors,
  type PaintColor,
  type ColorBrand,
  type ColorFamily,
} from '@/data/colors'

// ─── Room Template Data ─────────────────────────────────────

type WallZone = { id: string; label: string; path: string }
type RoomTemplate = {
  id: string
  name: string
  walls: WallZone[]
  furniture: string // SVG path data for decorative elements
  floor: string
  ceiling: string
}

const TEMPLATES: RoomTemplate[] = [
  {
    id: 'living-room',
    name: 'Living Room',
    walls: [
      { id: 'back', label: 'Back Wall', path: 'M200,120 L600,120 L600,420 L200,420 Z' },
      { id: 'left', label: 'Left Wall', path: 'M10,10 L200,120 L200,420 L10,580 Z' },
      { id: 'right', label: 'Right Wall', path: 'M790,10 L600,120 L600,420 L790,580 Z' },
    ],
    ceiling: 'M10,10 L200,120 L600,120 L790,10 Z',
    floor: 'M10,580 L200,420 L600,420 L790,580 Z',
    furniture:
      'M260,280 L540,280 L540,300 L260,300 Z M250,300 L550,300 L550,370 L250,370 Z M230,370 L570,370 L570,420 L230,420 Z ' +
      'M220,180 L280,180 L280,280 L220,280 Z M520,180 L580,180 L580,280 L520,280 Z ' +
      'M350,140 L450,140 L450,260 L350,260 Z',
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    walls: [
      { id: 'back', label: 'Back Wall', path: 'M200,120 L600,120 L600,420 L200,420 Z' },
      { id: 'left', label: 'Left Wall', path: 'M10,10 L200,120 L200,420 L10,580 Z' },
      { id: 'right', label: 'Right Wall', path: 'M790,10 L600,120 L600,420 L790,580 Z' },
    ],
    ceiling: 'M10,10 L200,120 L600,120 L790,10 Z',
    floor: 'M10,580 L200,420 L600,420 L790,580 Z',
    furniture:
      'M260,300 L540,300 L540,420 L260,420 Z M260,270 L540,270 L540,300 L260,300 Z ' +
      'M220,300 L260,300 L260,420 L220,420 Z M540,300 L580,300 L580,420 L540,420 Z ' +
      'M340,140 L460,140 L460,250 L340,250 Z',
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    walls: [
      { id: 'back', label: 'Back Wall', path: 'M200,120 L600,120 L600,420 L200,420 Z' },
      { id: 'left', label: 'Left Wall', path: 'M10,10 L200,120 L200,420 L10,580 Z' },
      { id: 'right', label: 'Right Wall', path: 'M790,10 L600,120 L600,420 L790,580 Z' },
    ],
    ceiling: 'M10,10 L200,120 L600,120 L790,10 Z',
    floor: 'M10,580 L200,420 L600,420 L790,580 Z',
    furniture:
      'M200,320 L600,320 L600,420 L200,420 Z ' +
      'M200,120 L600,120 L600,200 L200,200 Z ' +
      'M350,200 L450,200 L450,320 L350,320 Z',
  },
  {
    id: 'bathroom',
    name: 'Bathroom',
    walls: [
      { id: 'back', label: 'Back Wall', path: 'M200,120 L600,120 L600,420 L200,420 Z' },
      { id: 'left', label: 'Left Wall', path: 'M10,10 L200,120 L200,420 L10,580 Z' },
    ],
    ceiling: 'M10,10 L200,120 L600,120 L790,10 Z',
    floor: 'M10,580 L200,420 L600,420 L790,580 Z',
    furniture:
      'M300,220 L500,220 L500,340 L300,340 Z ' +
      'M340,140 L460,140 L460,220 L340,220 Z ' +
      'M600,300 L790,380 L790,580 L600,420 Z',
  },
  {
    id: 'dining-room',
    name: 'Dining Room',
    walls: [
      { id: 'back', label: 'Back Wall', path: 'M200,120 L600,120 L600,420 L200,420 Z' },
      { id: 'left', label: 'Left Wall', path: 'M10,10 L200,120 L200,420 L10,580 Z' },
      { id: 'right', label: 'Right Wall', path: 'M790,10 L600,120 L600,420 L790,580 Z' },
    ],
    ceiling: 'M10,10 L200,120 L600,120 L790,10 Z',
    floor: 'M10,580 L200,420 L600,420 L790,580 Z',
    furniture:
      'M300,300 L500,300 L500,420 L300,420 Z ' +
      'M380,80 L420,80 L420,120 L380,120 Z M370,50 L430,50 L430,80 L370,80 Z',
  },
  {
    id: 'office',
    name: 'Home Office',
    walls: [
      { id: 'back', label: 'Back Wall', path: 'M200,120 L600,120 L600,420 L200,420 Z' },
      { id: 'left', label: 'Left Wall', path: 'M10,10 L200,120 L200,420 L10,580 Z' },
      { id: 'right', label: 'Right Wall', path: 'M790,10 L600,120 L600,420 L790,580 Z' },
    ],
    ceiling: 'M10,10 L200,120 L600,120 L790,10 Z',
    floor: 'M10,580 L200,420 L600,420 L790,580 Z',
    furniture:
      'M280,310 L520,310 L520,420 L280,420 Z M280,280 L520,280 L520,310 L280,310 Z ' +
      'M220,140 L280,140 L280,340 L220,340 Z M520,140 L580,140 L580,340 L520,340 Z',
  },
]

const DEFAULT_WALL_COLOR = '#E8E4DD'

// ─── SVG Room Renderer ──────────────────────────────────────

function RoomSVG({
  template,
  wallColors,
  selectedWall,
  onWallClick,
  isDark,
}: {
  template: RoomTemplate
  wallColors: Record<string, string>
  selectedWall: string | null
  onWallClick: (wallId: string) => void
  isDark: boolean
}) {
  return (
    <svg viewBox="0 0 800 590" className="w-full h-full" style={{ filter: isDark ? 'brightness(0.5)' : 'none' }}>
      {/* Ceiling */}
      <path d={template.ceiling} fill="#F5F3F0" stroke="#D0CDC5" strokeWidth="1" />

      {/* Walls */}
      {template.walls.map((wall) => {
        const color = wallColors[wall.id] || DEFAULT_WALL_COLOR
        const isSelected = selectedWall === wall.id
        return (
          <g key={wall.id}>
            <path
              d={wall.path}
              fill={color}
              stroke={isSelected ? '#E8630A' : '#C8C4BC'}
              strokeWidth={isSelected ? 3 : 1}
              className="cursor-pointer transition-all duration-200"
              onClick={() => onWallClick(wall.id)}
            />
            {/* Shadow overlay for depth */}
            {wall.id === 'left' && (
              <path d={wall.path} fill="rgba(0,0,0,0.06)" className="pointer-events-none" />
            )}
            {wall.id === 'right' && (
              <path d={wall.path} fill="rgba(0,0,0,0.03)" className="pointer-events-none" />
            )}
          </g>
        )
      })}

      {/* Floor */}
      <path d={template.floor} fill="#C4B8A8" stroke="#B0A490" strokeWidth="1" />
      <path d={template.floor} fill="rgba(0,0,0,0.05)" className="pointer-events-none" />

      {/* Furniture silhouettes */}
      <path d={template.furniture} fill="rgba(80,70,60,0.35)" stroke="rgba(80,70,60,0.15)" strokeWidth="1" className="pointer-events-none" />

      {/* Wall labels (on hover areas) */}
      {template.walls.map((wall) => {
        const isSelected = selectedWall === wall.id
        // Approximate center of each wall for label
        let cx = 400, cy = 270
        if (wall.id === 'left') { cx = 105; cy = 295 }
        if (wall.id === 'right') { cx = 695; cy = 295 }
        return (
          <text
            key={`label-${wall.id}`}
            x={cx}
            y={cy}
            textAnchor="middle"
            className="pointer-events-none select-none"
            fill={isSelected ? '#E8630A' : 'rgba(0,0,0,0.2)'}
            fontSize="14"
            fontWeight="600"
          >
            {wall.label}
          </text>
        )
      })}
    </svg>
  )
}

// ─── Photo Upload Canvas ────────────────────────────────────

function PhotoCanvas({
  imageSrc,
  selectedColor,
  tolerance,
  isDark,
}: {
  imageSrc: string
  selectedColor: string | null
  tolerance: number
  isDark: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const originalDataRef = useRef<ImageData | null>(null)
  const [dimensions, setDimensions] = useState({ w: 800, h: 600 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !imageSrc) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const maxW = 800
      const scale = Math.min(maxW / img.width, 600 / img.height, 1)
      const w = Math.round(img.width * scale)
      const h = Math.round(img.height * scale)
      setDimensions({ w, h })
      canvas.width = w
      canvas.height = h
      ctx.drawImage(img, 0, 0, w, h)
      originalDataRef.current = ctx.getImageData(0, 0, w, h)
    }
    img.src = imageSrc
  }, [imageSrc])

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!selectedColor || !canvasRef.current || !originalDataRef.current) return
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height
      const x = Math.round((e.clientX - rect.left) * scaleX)
      const y = Math.round((e.clientY - rect.top) * scaleY)

      // Clone original data so we work from clean state
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imgData.data
      const w = canvas.width
      const h = canvas.height

      const startIdx = (y * w + x) * 4
      const sr = data[startIdx], sg = data[startIdx + 1], sb = data[startIdx + 2]

      // Parse selected color
      const r = parseInt(selectedColor.slice(1, 3), 16)
      const g = parseInt(selectedColor.slice(3, 5), 16)
      const b = parseInt(selectedColor.slice(5, 7), 16)

      // Iterative flood fill
      const visited = new Uint8Array(w * h)
      const stack = [x + y * w]
      const tol = tolerance * 3

      while (stack.length > 0) {
        const pos = stack.pop()!
        if (visited[pos]) continue
        visited[pos] = 1

        const px = pos % w
        const py = Math.floor(pos / w)
        if (px < 0 || px >= w || py < 0 || py >= h) continue

        const idx = pos * 4
        const dr = Math.abs(data[idx] - sr)
        const dg = Math.abs(data[idx + 1] - sg)
        const db = Math.abs(data[idx + 2] - sb)

        if (dr + dg + db > tol) continue

        // Blend color
        data[idx] = Math.round(data[idx] * 0.35 + r * 0.65)
        data[idx + 1] = Math.round(data[idx + 1] * 0.35 + g * 0.65)
        data[idx + 2] = Math.round(data[idx + 2] * 0.35 + b * 0.65)

        if (px > 0) stack.push(pos - 1)
        if (px < w - 1) stack.push(pos + 1)
        if (py > 0) stack.push(pos - w)
        if (py < h - 1) stack.push(pos + w)
      }

      ctx.putImageData(imgData, 0, 0)
    },
    [selectedColor, tolerance]
  )

  const handleReset = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !originalDataRef.current) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.putImageData(originalDataRef.current, 0, 0)
  }, [])

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={dimensions.w}
        height={dimensions.h}
        onClick={handleClick}
        className="w-full rounded-xl cursor-crosshair"
        style={{ filter: isDark ? 'brightness(0.5)' : 'none', maxHeight: '500px', objectFit: 'contain' }}
      />
      <button
        onClick={handleReset}
        className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium shadow hover:bg-white transition-colors"
      >
        <Undo2 className="h-3.5 w-3.5" />
        Reset
      </button>
      {!selectedColor && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-xl pointer-events-none">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 text-sm font-medium text-text-primary">
            Select a color, then click on a wall area
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Color Picker Panel ─────────────────────────────────────

function ColorPicker({
  selectedColor,
  onSelect,
  recentColors,
  className,
}: {
  selectedColor: PaintColor | null
  onSelect: (color: PaintColor) => void
  recentColors: PaintColor[]
  className?: string
}) {
  const [brand, setBrand] = useState<ColorBrand | 'all'>('all')
  const [family, setFamily] = useState<ColorFamily | 'all'>('all')
  const [search, setSearch] = useState('')
  const [customHex, setCustomHex] = useState('')

  const filtered = search
    ? searchColors(search)
    : PAINT_COLORS.filter(
        (c) =>
          (brand === 'all' || c.brand === brand) &&
          (family === 'all' || c.family === family)
      )

  const handleCustom = () => {
    if (/^#[0-9A-Fa-f]{6}$/.test(customHex)) {
      onSelect({
        name: 'Custom Color',
        hex: customHex,
        brand: 'benjamin-moore',
        family: 'bold',
      })
    }
  }

  return (
    <div className={cn('flex flex-col', className)}>
      {/* Search */}
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-light" />
        <input
          type="text"
          placeholder="Search colors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </div>

      {/* Filters */}
      {!search && (
        <div className="flex gap-2 mb-3">
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value as ColorBrand | 'all')}
            className="flex-1 text-xs py-2 px-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary/20"
          >
            <option value="all">All Brands</option>
            {COLOR_BRANDS.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
          <select
            value={family}
            onChange={(e) => setFamily(e.target.value as ColorFamily | 'all')}
            className="flex-1 text-xs py-2 px-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary/20"
          >
            <option value="all">All Families</option>
            {COLOR_FAMILIES.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Recent Colors */}
      {recentColors.length > 0 && !search && (
        <div className="mb-3">
          <p className="text-[10px] font-semibold text-text-light uppercase tracking-wide mb-1.5">
            Recent
          </p>
          <div className="flex gap-1.5 flex-wrap">
            {recentColors.map((c, i) => (
              <button
                key={`${c.hex}-${i}`}
                onClick={() => onSelect(c)}
                className={cn(
                  'h-7 w-7 rounded-lg border-2 transition-all',
                  selectedColor?.hex === c.hex
                    ? 'border-primary scale-110'
                    : 'border-transparent hover:scale-110'
                )}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        </div>
      )}

      {/* Color Grid */}
      <div className="flex-1 overflow-y-auto max-h-[320px] pr-1 -mr-1">
        <div className="grid grid-cols-6 gap-1.5">
          {filtered.map((color, i) => (
            <button
              key={`${color.hex}-${i}`}
              onClick={() => onSelect(color)}
              className={cn(
                'group relative aspect-square rounded-lg border-2 transition-all',
                selectedColor?.hex === color.hex
                  ? 'border-primary ring-2 ring-primary/20 scale-105'
                  : 'border-transparent hover:scale-105 hover:border-gray-300'
              )}
              style={{ backgroundColor: color.hex }}
              title={`${color.name}${color.code ? ` (${color.code})` : ''}`}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-black/70 text-white text-[8px] px-1.5 py-0.5 rounded whitespace-nowrap">
                  {color.name}
                </div>
              </div>
            </button>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-xs text-text-light text-center py-6">
            No colors found
          </p>
        )}
      </div>

      {/* Custom Hex */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <p className="text-[10px] font-semibold text-text-light uppercase tracking-wide mb-1.5">
          Custom Color
        </p>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-text-light">
              #
            </span>
            <input
              type="text"
              placeholder="AABBCC"
              maxLength={7}
              value={customHex.replace('#', '')}
              onChange={(e) => setCustomHex('#' + e.target.value.replace('#', ''))}
              className="w-full pl-7 pr-3 py-2 rounded-lg border border-gray-200 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-primary/20"
            />
          </div>
          <button
            onClick={handleCustom}
            className="px-3 py-2 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primary-600 transition-colors"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Selected Color Info */}
      {selectedColor && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-xl border border-gray-200 shrink-0"
              style={{ backgroundColor: selectedColor.hex }}
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-text-primary truncate">
                {selectedColor.name}
              </p>
              <p className="text-xs text-text-light">
                {selectedColor.hex}
                {selectedColor.code && ` · ${selectedColor.code}`}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main Visualizer ────────────────────────────────────────

export default function ColorVisualizer() {
  const [mode, setMode] = useState<'template' | 'upload'>('template')
  const [templateId, setTemplateId] = useState('living-room')
  const [wallColors, setWallColors] = useState<Record<string, string>>({})
  const [selectedWall, setSelectedWall] = useState<string | null>('back')
  const [selectedColor, setSelectedColor] = useState<PaintColor | null>(null)
  const [recentColors, setRecentColors] = useState<PaintColor[]>([])
  const [isDark, setIsDark] = useState(false)
  const [uploadSrc, setUploadSrc] = useState<string | null>(null)
  const [tolerance, setTolerance] = useState(40)
  const [pickerOpen, setPickerOpen] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const template = TEMPLATES.find((t) => t.id === templateId) || TEMPLATES[0]

  const handleColorSelect = (color: PaintColor) => {
    setSelectedColor(color)
    setRecentColors((prev) => {
      const filtered = prev.filter((c) => c.hex !== color.hex)
      return [color, ...filtered].slice(0, 8)
    })

    // Apply to selected wall in template mode
    if (mode === 'template' && selectedWall) {
      setWallColors((prev) => ({ ...prev, [selectedWall]: color.hex }))
    }
  }

  const handleWallClick = (wallId: string) => {
    setSelectedWall(wallId)
    if (selectedColor) {
      setWallColors((prev) => ({ ...prev, [wallId]: selectedColor.hex }))
    }
  }

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setUploadSrc(ev.target?.result as string)
      setMode('upload')
    }
    reader.readAsDataURL(file)
  }

  const handleReset = () => {
    setWallColors({})
    setSelectedWall('back')
  }

  const handleDownload = () => {
    // For template mode, capture SVG as image
    const svg = document.querySelector('.visualizer-svg-container svg') as SVGSVGElement
    if (!svg) return
    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    canvas.width = 800
    canvas.height = 590
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const img = new Image()
    img.onload = () => {
      ctx.drawImage(img, 0, 0)
      const link = document.createElement('a')
      link.download = 'room-visualization.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
    }
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
  }

  // Palette of colors used in current room
  const usedColors = Object.values(wallColors)
    .filter(Boolean)
    .filter((v, i, a) => a.indexOf(v) === i)
    .map((hex) => PAINT_COLORS.find((c) => c.hex === hex) || { name: 'Custom', hex, brand: 'benjamin-moore' as ColorBrand, family: 'bold' as ColorFamily })

  return (
    <div className="bg-white rounded-3xl shadow-medium border border-gray-50 overflow-hidden">
      {/* ━━━ TOOLBAR ━━━ */}
      <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3 border-b border-gray-100 bg-background-light">
        {/* Mode Toggle */}
        <div className="flex bg-white rounded-xl border border-gray-200 p-0.5">
          <button
            onClick={() => setMode('template')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
              mode === 'template'
                ? 'bg-primary text-white'
                : 'text-text-secondary hover:text-primary'
            )}
          >
            <LayoutTemplate className="h-3.5 w-3.5" />
            Templates
          </button>
          <button
            onClick={() => setMode('upload')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
              mode === 'upload'
                ? 'bg-primary text-white'
                : 'text-text-secondary hover:text-primary'
            )}
          >
            <Upload className="h-3.5 w-3.5" />
            Upload Photo
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            title={isDark ? 'Day lighting' : 'Evening lighting'}
          >
            {isDark ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4 text-text-light" />}
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            title="Reset colors"
          >
            <Undo2 className="h-4 w-4 text-text-light" />
          </button>
          <button
            onClick={handleDownload}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            title="Download image"
          >
            <Download className="h-4 w-4 text-text-light" />
          </button>
          {/* Mobile picker toggle */}
          <button
            onClick={() => setPickerOpen(!pickerOpen)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-white text-xs font-medium"
          >
            <Pipette className="h-3.5 w-3.5" />
            Colors
            <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', pickerOpen && 'rotate-180')} />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* ━━━ MAIN CANVAS ━━━ */}
        <div className="flex-1 p-4 sm:p-6">
          {/* Template Selector */}
          {mode === 'template' && (
            <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar pb-1">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTemplateId(t.id)
                    setWallColors({})
                    setSelectedWall('back')
                  }}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors',
                    templateId === t.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                  )}
                >
                  {t.name}
                </button>
              ))}
            </div>
          )}

          {/* Room View */}
          {mode === 'template' ? (
            <div className="visualizer-svg-container rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
              <RoomSVG
                template={template}
                wallColors={wallColors}
                selectedWall={selectedWall}
                onWallClick={handleWallClick}
                isDark={isDark}
              />
            </div>
          ) : uploadSrc ? (
            <PhotoCanvas
              imageSrc={uploadSrc}
              selectedColor={selectedColor?.hex || null}
              tolerance={tolerance}
              isDark={isDark}
            />
          ) : (
            <div
              onClick={() => fileRef.current?.click()}
              className="flex flex-col items-center justify-center h-[400px] rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 cursor-pointer hover:border-primary/30 hover:bg-primary/[0.02] transition-all"
            >
              <Upload className="h-10 w-10 text-text-light mb-3" />
              <p className="text-sm font-semibold text-text-primary">
                Upload a room photo
              </p>
              <p className="text-xs text-text-secondary mt-1">
                Click to browse or drag and drop
              </p>
              <p className="text-[10px] text-text-light mt-3">
                JPG, PNG up to 10MB
              </p>
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />

          {/* Tolerance slider (upload mode) */}
          {mode === 'upload' && uploadSrc && (
            <div className="mt-3 flex items-center gap-3">
              <span className="text-xs text-text-secondary whitespace-nowrap">
                Tolerance
              </span>
              <input
                type="range"
                min={10}
                max={80}
                value={tolerance}
                onChange={(e) => setTolerance(Number(e.target.value))}
                className="flex-1 accent-primary"
              />
              <span className="text-xs font-mono text-text-light w-6 text-right">
                {tolerance}
              </span>
            </div>
          )}

          {/* Used Colors Palette */}
          {usedColors.length > 0 && (
            <div className="mt-4 p-4 rounded-xl bg-background-light border border-gray-100">
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2">
                Your Color Palette
              </p>
              <div className="flex gap-3 flex-wrap">
                {usedColors.map((c, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      className="h-6 w-6 rounded-lg border border-gray-200"
                      style={{ backgroundColor: c.hex }}
                    />
                    <div>
                      <p className="text-xs font-medium text-text-primary">
                        {c.name}
                      </p>
                      <p className="text-[10px] text-text-light">{c.hex}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <Link
              href="/free-estimate"
              className="btn-primary btn-sm rounded-full flex-1 justify-center text-xs"
            >
              Love this? Get a free estimate
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

        {/* ━━━ COLOR PICKER SIDEBAR — Desktop ━━━ */}
        <div className="hidden lg:block w-72 border-l border-gray-100 p-4">
          <h3 className="text-sm font-bold text-primary mb-3">
            Pick a Color
          </h3>
          <ColorPicker
            selectedColor={selectedColor}
            onSelect={handleColorSelect}
            recentColors={recentColors}
          />
        </div>

        {/* ━━━ COLOR PICKER — Mobile ━━━ */}
        {pickerOpen && (
          <div className="lg:hidden border-t border-gray-100 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-primary">
                Pick a Color
              </h3>
              <button
                onClick={() => setPickerOpen(false)}
                className="p-1 rounded hover:bg-gray-100"
              >
                <X className="h-4 w-4 text-text-light" />
              </button>
            </div>
            <ColorPicker
              selectedColor={selectedColor}
              onSelect={(c) => {
                handleColorSelect(c)
                setPickerOpen(false)
              }}
              recentColors={recentColors}
            />
          </div>
        )}
      </div>
    </div>
  )
}
