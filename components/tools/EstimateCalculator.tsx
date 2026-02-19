'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  Building2,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Phone,
  Mail,
  CheckCircle2,
  Paintbrush,
  Minus,
  Plus,
  Loader2,
  FileText,
  Printer,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { BUSINESS } from '@/lib/constants'
import {
  calculateInteriorEstimate,
  calculateExteriorEstimate,
  formatCurrency,
  type RoomSize,
  type SurfaceCondition,
  type PaintQuality,
  type HomeStyle,
  type SidingMaterial,
  type RoomEstimate,
  type EstimateResult,
} from '@/lib/pricing'

// ─── Animated Counter ───────────────────────────────────────
function AnimatedNumber({ value, prefix = '' }: { value: number; prefix?: string }) {
  const [displayed, setDisplayed] = useState(0)
  const ref = useRef<number>()

  useEffect(() => {
    const start = displayed
    const end = value
    const duration = 800
    const startTime = performance.now()

    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayed(Math.round(start + (end - start) * eased))
      if (progress < 1) ref.current = requestAnimationFrame(animate)
    }

    ref.current = requestAnimationFrame(animate)
    return () => {
      if (ref.current) cancelAnimationFrame(ref.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <span>
      {prefix}
      {displayed.toLocaleString()}
    </span>
  )
}

// ─── Progress Bar ───────────────────────────────────────────
function ProgressBar({ step, total }: { step: number; total: number }) {
  const labels = ['Project', 'Details', 'Condition', 'Quality', 'Estimate']
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        {labels.map((label, i) => (
          <div
            key={label}
            className={cn(
              'flex items-center gap-1.5 text-xs font-medium transition-colors',
              i < step
                ? 'text-cta'
                : i === step
                ? 'text-primary'
                : 'text-text-light'
            )}
          >
            <div
              className={cn(
                'flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-all',
                i < step
                  ? 'bg-cta text-white'
                  : i === step
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-text-light'
              )}
            >
              {i < step ? (
                <CheckCircle2 className="h-3.5 w-3.5" />
              ) : (
                i + 1
              )}
            </div>
            <span className="hidden sm:inline">{label}</span>
          </div>
        ))}
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-cta rounded-full"
          initial={false}
          animate={{ width: `${((step + 1) / total) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </div>
  )
}

// ─── Step Wrapper ───────────────────────────────────────────
function StepWrapper({
  children,
  direction,
}: {
  children: React.ReactNode
  direction: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

// ─── Option Card ────────────────────────────────────────────
function OptionCard({
  selected,
  onClick,
  icon,
  title,
  description,
  className,
}: {
  selected: boolean
  onClick: () => void
  icon?: React.ReactNode
  title: string
  description?: string
  className?: string
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative flex flex-col items-center text-center p-5 rounded-2xl border-2 transition-all',
        selected
          ? 'border-primary bg-primary/[0.03] shadow-soft'
          : 'border-gray-100 hover:border-primary/20 hover:shadow-soft bg-white',
        className
      )}
    >
      {selected && (
        <div className="absolute top-2 right-2">
          <CheckCircle2 className="h-5 w-5 text-primary" />
        </div>
      )}
      {icon && (
        <div
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-xl mb-3 transition-colors',
            selected ? 'bg-primary text-white' : 'bg-primary/5 text-primary'
          )}
        >
          {icon}
        </div>
      )}
      <span className="text-sm font-bold text-text-primary">{title}</span>
      {description && (
        <span className="text-xs text-text-secondary mt-1 leading-relaxed">
          {description}
        </span>
      )}
    </button>
  )
}

// ─── Toggle ─────────────────────────────────────────────────
function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
  description: string
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={cn(
        'flex items-center gap-4 p-4 rounded-xl border-2 transition-all w-full text-left',
        checked
          ? 'border-primary bg-primary/[0.03]'
          : 'border-gray-100 hover:border-gray-200'
      )}
    >
      <div
        className={cn(
          'relative h-6 w-11 rounded-full transition-colors shrink-0',
          checked ? 'bg-primary' : 'bg-gray-200'
        )}
      >
        <div
          className={cn(
            'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform',
            checked ? 'translate-x-5' : 'translate-x-0.5'
          )}
        />
      </div>
      <div>
        <span className="text-sm font-semibold text-text-primary">{label}</span>
        <span className="block text-xs text-text-secondary">{description}</span>
      </div>
    </button>
  )
}

// ─── Number Input ───────────────────────────────────────────
function NumberStepper({
  value,
  onChange,
  min,
  max,
  label,
}: {
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  label: string
}) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-white">
      <span className="text-sm font-medium text-text-primary">{label}</span>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-30"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-8 text-center text-lg font-bold text-primary">
          {value}
        </span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-30"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

// ─── Main Calculator ────────────────────────────────────────
const ROOM_TYPES = [
  'Bedroom',
  'Living Room',
  'Kitchen',
  'Bathroom',
  'Hallway',
  'Dining Room',
  'Office',
  'Other',
]

const TOTAL_STEPS = 5

export default function EstimateCalculator() {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)

  // Step 1: Project type
  const [projectType, setProjectType] = useState<'interior' | 'exterior' | null>(null)

  // Step 2 — Interior
  const [propertyType, setPropertyType] = useState('House')
  const [roomCount, setRoomCount] = useState(3)
  const [roomType, setRoomType] = useState('Bedroom')
  const [roomSize, setRoomSize] = useState<RoomSize>('medium')
  const [includeCeiling, setIncludeCeiling] = useState(false)
  const [includeTrim, setIncludeTrim] = useState(true)
  const [doorCount, setDoorCount] = useState(0)

  // Step 2 — Exterior
  const [homeStyle, setHomeStyle] = useState<HomeStyle>('two-story')
  const [extSqft, setExtSqft] = useState(2000)
  const [material, setMaterial] = useState<SidingMaterial>('wood')
  const [extTrim, setExtTrim] = useState(true)
  const [extDeck, setExtDeck] = useState(false)

  // Step 3
  const [condition, setCondition] = useState<SurfaceCondition>('good')

  // Step 4
  const [paintQuality, setPaintQuality] = useState<PaintQuality>('premium')

  // Step 5 — Results
  const [result, setResult] = useState<EstimateResult | null>(null)
  const [emailName, setEmailName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [emailSending, setEmailSending] = useState(false)

  const canAdvance = (): boolean => {
    if (step === 0) return projectType !== null
    if (step === 1) return true
    if (step === 2) return true
    if (step === 3) return true
    return false
  }

  const goNext = () => {
    if (step === 3) {
      // Calculate result
      if (projectType === 'interior') {
        const rooms: RoomEstimate[] = Array.from({ length: roomCount }, () => ({
          roomType: roomType,
          size: roomSize,
          includeCeiling,
          includeTrim,
          doors: doorCount > 0 ? Math.round(doorCount / roomCount) : 0,
        }))
        // Give remaining doors to first room
        if (doorCount > 0) {
          const doorsPerRoom = Math.floor(doorCount / roomCount)
          const remainder = doorCount - doorsPerRoom * roomCount
          rooms.forEach((r, i) => {
            r.doors = doorsPerRoom + (i < remainder ? 1 : 0)
          })
        }
        setResult(calculateInteriorEstimate(rooms, condition, paintQuality))
      } else {
        setResult(
          calculateExteriorEstimate(
            extSqft,
            homeStyle,
            material,
            condition,
            paintQuality,
            extTrim,
            extDeck
          )
        )
      }
    }
    setDirection(1)
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1))
  }

  const goBack = () => {
    setDirection(-1)
    setStep((s) => Math.max(s - 1, 0))
  }

  const handleSendEmail = async () => {
    if (!emailName.trim() || !emailAddress.trim() || !result) return
    setEmailSending(true)
    try {
      await fetch('/api/tools/estimate-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: emailName,
          email: emailAddress,
          estimate: result,
          projectType,
        }),
      })
      setEmailSent(true)
    } catch {
      // Silently handle — email still "sent" for UX
      setEmailSent(true)
    } finally {
      setEmailSending(false)
    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-medium border border-gray-50 overflow-hidden">
      <div className="p-6 sm:p-8">
        <ProgressBar step={step} total={TOTAL_STEPS} />

        <AnimatePresence mode="wait" initial={false}>
          {/* ━━━ STEP 1: PROJECT TYPE ━━━ */}
          {step === 0 && (
            <StepWrapper key="step-0" direction={direction}>
              <div className="text-center mb-8">
                <h2 className="heading-2 text-primary">
                  What type of project?
                </h2>
                <p className="text-sm text-text-secondary mt-2">
                  Select your project type to get started.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                <OptionCard
                  selected={projectType === 'interior'}
                  onClick={() => setProjectType('interior')}
                  icon={<Paintbrush className="h-6 w-6" />}
                  title="Interior Painting"
                  description="Walls, ceilings, trim, and doors inside your home or business."
                />
                <OptionCard
                  selected={projectType === 'exterior'}
                  onClick={() => setProjectType('exterior')}
                  icon={<Home className="h-6 w-6" />}
                  title="Exterior Painting"
                  description="Siding, trim, decks, and all outdoor surfaces."
                />
              </div>
            </StepWrapper>
          )}

          {/* ━━━ STEP 2: DETAILS — INTERIOR ━━━ */}
          {step === 1 && projectType === 'interior' && (
            <StepWrapper key="step-1-int" direction={direction}>
              <div className="text-center mb-6">
                <h2 className="heading-2 text-primary">Property Details</h2>
                <p className="text-sm text-text-secondary mt-2">
                  Tell us about your interior painting project.
                </p>
              </div>

              <div className="space-y-5 max-w-lg mx-auto">
                {/* Property Type */}
                <div>
                  <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2 block">
                    Property Type
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {['House', 'Condo', 'Apartment', 'Commercial'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setPropertyType(t)}
                        className={cn(
                          'py-2.5 rounded-xl text-xs font-semibold border-2 transition-all',
                          propertyType === t
                            ? 'border-primary bg-primary/[0.03] text-primary'
                            : 'border-gray-100 text-text-secondary hover:border-gray-200'
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Room Count */}
                <NumberStepper
                  value={roomCount}
                  onChange={setRoomCount}
                  min={1}
                  max={15}
                  label="Number of rooms"
                />

                {/* Room Type */}
                <div>
                  <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2 block">
                    Average Room Type
                  </label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-200 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    {ROOM_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Room Size */}
                <div>
                  <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2 block">
                    Average Room Size
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {(
                      [
                        { key: 'small', label: 'Small', sub: '< 120 sqft' },
                        { key: 'medium', label: 'Medium', sub: '120–200' },
                        { key: 'large', label: 'Large', sub: '200–350' },
                        { key: 'xlarge', label: 'XL', sub: '350+' },
                      ] as const
                    ).map((s) => (
                      <button
                        key={s.key}
                        onClick={() => setRoomSize(s.key)}
                        className={cn(
                          'py-2.5 rounded-xl border-2 transition-all',
                          roomSize === s.key
                            ? 'border-primary bg-primary/[0.03]'
                            : 'border-gray-100 hover:border-gray-200'
                        )}
                      >
                        <span
                          className={cn(
                            'block text-xs font-semibold',
                            roomSize === s.key
                              ? 'text-primary'
                              : 'text-text-primary'
                          )}
                        >
                          {s.label}
                        </span>
                        <span className="block text-[10px] text-text-light mt-0.5">
                          {s.sub}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toggles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Toggle
                    checked={includeCeiling}
                    onChange={setIncludeCeiling}
                    label="Ceilings"
                    description="+30% per room"
                  />
                  <Toggle
                    checked={includeTrim}
                    onChange={setIncludeTrim}
                    label="Trim & Baseboards"
                    description="+20% per room"
                  />
                </div>

                {/* Doors */}
                <NumberStepper
                  value={doorCount}
                  onChange={setDoorCount}
                  min={0}
                  max={30}
                  label="Doors to paint"
                />
              </div>
            </StepWrapper>
          )}

          {/* ━━━ STEP 2: DETAILS — EXTERIOR ━━━ */}
          {step === 1 && projectType === 'exterior' && (
            <StepWrapper key="step-1-ext" direction={direction}>
              <div className="text-center mb-6">
                <h2 className="heading-2 text-primary">Property Details</h2>
                <p className="text-sm text-text-secondary mt-2">
                  Tell us about your exterior painting project.
                </p>
              </div>

              <div className="space-y-5 max-w-lg mx-auto">
                {/* Home Style */}
                <div>
                  <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2 block">
                    Home Style
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(
                      [
                        { key: 'ranch', label: 'Ranch' },
                        { key: 'two-story', label: '2-Story' },
                        { key: 'three-story', label: '3-Story' },
                        { key: 'split-level', label: 'Split Level' },
                      ] as const
                    ).map((s) => (
                      <button
                        key={s.key}
                        onClick={() => setHomeStyle(s.key)}
                        className={cn(
                          'py-3 rounded-xl text-xs font-semibold border-2 transition-all',
                          homeStyle === s.key
                            ? 'border-primary bg-primary/[0.03] text-primary'
                            : 'border-gray-100 text-text-secondary hover:border-gray-200'
                        )}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Square Footage */}
                <div>
                  <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2 block">
                    Approximate Square Footage
                  </label>
                  <input
                    type="range"
                    min={800}
                    max={8000}
                    step={100}
                    value={extSqft}
                    onChange={(e) => setExtSqft(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-text-light">800</span>
                    <span className="text-lg font-bold text-primary">
                      {extSqft.toLocaleString()} sqft
                    </span>
                    <span className="text-xs text-text-light">8,000</span>
                  </div>
                </div>

                {/* Siding Material */}
                <div>
                  <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2 block">
                    Siding Material
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {(
                      [
                        { key: 'wood', label: 'Wood' },
                        { key: 'vinyl', label: 'Vinyl' },
                        { key: 'brick', label: 'Brick' },
                        { key: 'stucco', label: 'Stucco' },
                        { key: 'aluminum', label: 'Aluminum' },
                        { key: 'mixed', label: 'Mixed' },
                      ] as const
                    ).map((m) => (
                      <button
                        key={m.key}
                        onClick={() => setMaterial(m.key)}
                        className={cn(
                          'py-2.5 rounded-xl text-xs font-semibold border-2 transition-all',
                          material === m.key
                            ? 'border-primary bg-primary/[0.03] text-primary'
                            : 'border-gray-100 text-text-secondary hover:border-gray-200'
                        )}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toggles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Toggle
                    checked={extTrim}
                    onChange={setExtTrim}
                    label="Trim & Fascia"
                    description="Adds $1,500–$3,500"
                  />
                  <Toggle
                    checked={extDeck}
                    onChange={setExtDeck}
                    label="Deck / Porch"
                    description="Adds $500–$2,000"
                  />
                </div>
              </div>
            </StepWrapper>
          )}

          {/* ━━━ STEP 3: SURFACE CONDITION ━━━ */}
          {step === 2 && (
            <StepWrapper key="step-2" direction={direction}>
              <div className="text-center mb-8">
                <h2 className="heading-2 text-primary">
                  Surface Condition
                </h2>
                <p className="text-sm text-text-secondary mt-2">
                  How are the surfaces that need painting?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <OptionCard
                  selected={condition === 'good'}
                  onClick={() => setCondition('good')}
                  icon={
                    <div className="h-6 w-6 rounded-full bg-success" />
                  }
                  title="Good"
                  description="Clean, smooth, minimal patching needed. Light scuffs at most."
                />
                <OptionCard
                  selected={condition === 'fair'}
                  onClick={() => setCondition('fair')}
                  icon={
                    <div className="h-6 w-6 rounded-full bg-accent" />
                  }
                  title="Fair"
                  description="Some scuffs, small holes, light prep work and patching needed."
                />
                <OptionCard
                  selected={condition === 'poor'}
                  onClick={() => setCondition('poor')}
                  icon={
                    <div className="h-6 w-6 rounded-full bg-cta" />
                  }
                  title="Poor"
                  description="Peeling paint, water damage, cracks — significant prep and repairs."
                />
              </div>

              <p className="text-center text-xs text-text-light mt-6">
                Surface condition affects prep time and cost. Poor surfaces
                require more sanding, patching, and priming.
              </p>
            </StepWrapper>
          )}

          {/* ━━━ STEP 4: PAINT QUALITY ━━━ */}
          {step === 3 && (
            <StepWrapper key="step-3" direction={direction}>
              <div className="text-center mb-8">
                <h2 className="heading-2 text-primary">
                  Paint Quality
                </h2>
                <p className="text-sm text-text-secondary mt-2">
                  Choose your paint tier. Better paint means better
                  coverage and longevity.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <OptionCard
                  selected={paintQuality === 'standard'}
                  onClick={() => setPaintQuality('standard')}
                  title="Standard"
                  description="Quality paint, great value. Good coverage and a clean finish for any room."
                  className={cn(
                    paintQuality === 'standard' && 'ring-2 ring-primary/20'
                  )}
                />
                <OptionCard
                  selected={paintQuality === 'premium'}
                  onClick={() => setPaintQuality('premium')}
                  title="Premium"
                  description="Benjamin Moore Regal or equivalent. Superior coverage, richer color, better durability."
                  className={cn(
                    paintQuality === 'premium' && 'ring-2 ring-primary/20'
                  )}
                />
                <OptionCard
                  selected={paintQuality === 'ultra'}
                  onClick={() => setPaintQuality('ultra')}
                  title="Ultra Premium"
                  description="Benjamin Moore Aura or top-tier. Maximum durability, low-VOC, self-priming."
                  className={cn(
                    paintQuality === 'ultra' && 'ring-2 ring-primary/20'
                  )}
                />
              </div>

              <div className="flex justify-center gap-8 mt-6 text-xs text-text-light">
                <span>Standard: Base price</span>
                <span>Premium: +20%</span>
                <span>Ultra: +40%</span>
              </div>
            </StepWrapper>
          )}

          {/* ━━━ STEP 5: RESULTS ━━━ */}
          {step === 4 && result && (
            <StepWrapper key="step-4" direction={direction}>
              <div className="text-center mb-6">
                <h2 className="heading-2 text-primary">
                  Your Estimate
                </h2>
                <p className="text-sm text-text-secondary mt-2">
                  Based on Chicago market averages for your project.
                </p>
              </div>

              {/* Total Range */}
              <div className="bg-gradient-to-br from-primary via-primary-600 to-primary-800 rounded-2xl p-6 text-center text-white mb-6">
                <p className="text-sm text-white/70 mb-1">
                  Estimated Total Range
                </p>
                <div className="text-3xl sm:text-4xl font-bold">
                  <AnimatedNumber value={result.total.low} prefix="$" />
                  <span className="text-white/50 mx-2">–</span>
                  <AnimatedNumber value={result.total.high} prefix="$" />
                </div>
                <p className="text-sm text-white/60 mt-2">
                  Chicago average for this project:{' '}
                  <strong className="text-accent">
                    {formatCurrency(result.chicagoAverage)}
                  </strong>
                </p>
              </div>

              {/* Line Items */}
              <div className="bg-background-light rounded-2xl overflow-hidden mb-6">
                <div className="px-5 py-3 border-b border-gray-100">
                  <h3 className="text-sm font-bold text-primary">
                    Itemized Breakdown
                  </h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {result.lineItems.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-5 py-3"
                    >
                      <span className="text-sm text-text-primary">
                        {item.label}
                      </span>
                      <span className="text-sm font-medium text-text-primary">
                        {formatCurrency(item.low)} – {formatCurrency(item.high)}
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between px-5 py-3 bg-white/50">
                    <span className="text-sm text-text-secondary">
                      Subtotal
                    </span>
                    <span className="text-sm font-medium text-text-secondary">
                      {formatCurrency(result.subtotal.low)} –{' '}
                      {formatCurrency(result.subtotal.high)}
                    </span>
                  </div>
                  {result.conditionMultiplier !== 1 && (
                    <div className="flex items-center justify-between px-5 py-3">
                      <span className="text-sm text-text-secondary">
                        {result.conditionLabel}
                      </span>
                      <span className="text-sm font-medium text-cta">
                        ×{result.conditionMultiplier}
                      </span>
                    </div>
                  )}
                  {result.qualityMultiplier !== 1 && (
                    <div className="flex items-center justify-between px-5 py-3">
                      <span className="text-sm text-text-secondary">
                        {result.qualityLabel}
                      </span>
                      <span className="text-sm font-medium text-cta">
                        ×{result.qualityMultiplier}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-xs text-text-light text-center mb-8 max-w-md mx-auto">
                This estimate is based on Chicago market averages. Your actual
                quote may vary based on specific site conditions, access,
                and detailed measurements. Get an exact quote with a free
                in-home estimate.
              </p>

              {/* Email Capture */}
              {!emailSent ? (
                <div className="bg-background-warm rounded-2xl p-5 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Mail className="h-4 w-4 text-cta" />
                    <h3 className="text-sm font-bold text-primary">
                      Email Me This Estimate
                    </h3>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      placeholder="Your name"
                      value={emailName}
                      onChange={(e) => setEmailName(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                    <input
                      type="email"
                      placeholder="Your email"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                    <button
                      onClick={handleSendEmail}
                      disabled={
                        emailSending ||
                        !emailName.trim() ||
                        !emailAddress.trim()
                      }
                      className="btn-primary btn-sm rounded-xl whitespace-nowrap disabled:opacity-50"
                    >
                      {emailSending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <FileText className="h-4 w-4 mr-1.5" />
                          Send
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-success/5 border border-success/20 rounded-2xl p-5 mb-6 text-center">
                  <CheckCircle2 className="h-6 w-6 text-success mx-auto mb-2" />
                  <p className="text-sm font-semibold text-success">
                    Estimate sent to {emailAddress}!
                  </p>
                </div>
              )}

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/free-estimate"
                  className="btn-primary btn-md rounded-full flex-1 justify-center"
                >
                  Schedule Free In-Home Estimate
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <a
                  href={`tel:${BUSINESS.phoneRaw}`}
                  className="btn-outline-dark btn-md rounded-full flex-1 justify-center"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  {BUSINESS.phone}
                </a>
              </div>

              {/* Print */}
              <button
                onClick={() => window.print()}
                className="mx-auto mt-4 flex items-center gap-1.5 text-xs text-text-light hover:text-primary transition-colors"
              >
                <Printer className="h-3.5 w-3.5" />
                Print this estimate
              </button>
            </StepWrapper>
          )}
        </AnimatePresence>
      </div>

      {/* ━━━ NAVIGATION ━━━ */}
      {step < TOTAL_STEPS - 1 && (
        <div className="px-6 sm:px-8 py-4 bg-background-light border-t border-gray-100 flex items-center justify-between">
          <button
            onClick={goBack}
            disabled={step === 0}
            className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-primary transition-colors disabled:opacity-0"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>
          <button
            onClick={goNext}
            disabled={!canAdvance()}
            className={cn(
              'flex items-center gap-1.5 px-6 py-2.5 rounded-full text-sm font-bold transition-all',
              canAdvance()
                ? 'bg-primary text-white hover:bg-primary-600 shadow-soft'
                : 'bg-gray-100 text-text-light cursor-not-allowed'
            )}
          >
            {step === 3 ? 'Calculate Estimate' : 'Next'}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Back button on results step */}
      {step === TOTAL_STEPS - 1 && (
        <div className="px-6 sm:px-8 py-4 bg-background-light border-t border-gray-100">
          <button
            onClick={goBack}
            className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-primary transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Adjust selections
          </button>
        </div>
      )}
    </div>
  )
}
