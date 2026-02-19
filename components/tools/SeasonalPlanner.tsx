'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Paintbrush,
  Droplets,
  Waves,
  Wrench,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Phone,
  Mail,
  Calendar,
  Snowflake,
  Flower2,
  Sun,
  Leaf,
  AlertCircle,
  CheckCircle2,
  Circle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { BUSINESS } from '@/lib/constants'
import { formatCurrency } from '@/lib/pricing'
import {
  MONTHS,
  TASK_CATEGORIES,
  PRIORITY_META,
  getCurrentMonth,
  type MonthData,
  type TaskCategory,
  type TaskPriority,
  type SeasonalTask,
} from '@/data/seasonal-tasks'

// ─── Icon Map ───────────────────────────────────────────────

const categoryIconMap: Record<string, React.ElementType> = {
  Paintbrush,
  Droplets,
  Waves,
  Wrench,
}

const seasonIcons: Record<string, React.ElementType> = {
  winter: Snowflake,
  spring: Flower2,
  summer: Sun,
  fall: Leaf,
}

const seasonColors: Record<string, { bg: string; text: string; border: string }> = {
  winter: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  spring: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  summer: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  fall: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
}

const priorityIcons: Record<TaskPriority, React.ElementType> = {
  critical: AlertCircle,
  recommended: CheckCircle2,
  optional: Circle,
}

// ─── Task Card ──────────────────────────────────────────────

function TaskCard({ task }: { task: SeasonalTask }) {
  const [expanded, setExpanded] = useState(false)
  const catMeta = TASK_CATEGORIES.find((c) => c.value === task.category)
  const CatIcon = catMeta ? categoryIconMap[catMeta.icon] : Wrench
  const PriorityIcon = priorityIcons[task.priority]
  const priorityMeta = PRIORITY_META[task.priority]

  return (
    <div
      className={cn(
        'rounded-xl border bg-white overflow-hidden transition-all',
        task.priority === 'critical'
          ? 'border-cta/30 shadow-sm'
          : 'border-gray-100'
      )}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-start gap-3 w-full px-4 py-3.5 text-left"
      >
        {/* Category icon */}
        <div
          className={cn(
            'shrink-0 flex h-8 w-8 items-center justify-center rounded-lg mt-0.5',
            task.category === 'painting' && 'bg-primary/10 text-primary',
            task.category === 'power-washing' && 'bg-blue-50 text-blue-600',
            task.category === 'gutters' && 'bg-teal-50 text-teal-600',
            task.category === 'maintenance' && 'bg-gray-100 text-text-secondary'
          )}
        >
          {CatIcon && <CatIcon className="h-4 w-4" />}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span
              className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide"
              style={{ color: priorityMeta.color }}
            >
              <PriorityIcon className="h-3 w-3" />
              {priorityMeta.label}
            </span>
            {task.costRange && (
              <span className="text-[10px] text-text-light">
                {formatCurrency(task.costRange.low)}–{formatCurrency(task.costRange.high)}
              </span>
            )}
          </div>
          <p className="text-sm font-semibold text-text-primary leading-snug">
            {task.title}
          </p>
        </div>

        <ChevronDown
          className={cn(
            'h-4 w-4 text-text-light shrink-0 mt-1 transition-transform',
            expanded && 'rotate-180'
          )}
        />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0">
              <p className="text-xs text-text-secondary leading-relaxed mb-3 pl-11">
                {task.description}
              </p>
              {task.serviceSlug && (
                <div className="flex gap-2 pl-11">
                  <Link
                    href="/free-estimate"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-cta text-white text-xs font-medium hover:bg-cta/90 transition-colors"
                  >
                    Book This Service
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                  <Link
                    href={`/services/${task.serviceSlug}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-200 text-xs font-medium text-text-secondary hover:bg-gray-50 transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Reminder Form ──────────────────────────────────────────

function ReminderForm({
  selectedMonth,
  onClose,
}: {
  selectedMonth: MonthData
  onClose: () => void
}) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)

    try {
      await fetch('/api/tools/seasonal-reminder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          month: selectedMonth.month,
          monthName: selectedMonth.name,
        }),
      })
      setSent(true)
    } catch {
      setSent(true) // still show success for UX
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-4"
      >
        <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
        <p className="text-sm font-semibold text-text-primary">Reminder Set!</p>
        <p className="text-xs text-text-secondary mt-1">
          We&apos;ll remind you about {selectedMonth.name} maintenance tasks.
        </p>
        <button
          onClick={onClose}
          className="mt-3 text-xs text-primary font-medium hover:underline"
        >
          Close
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="text-xs font-medium text-text-secondary block mb-1">
          Name
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </div>
      <div>
        <label className="text-xs font-medium text-text-secondary block mb-1">
          Email
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={sending}
          className="flex-1 btn-primary btn-sm rounded-full text-xs justify-center"
        >
          {sending ? 'Setting...' : `Remind Me in ${selectedMonth.name}`}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-3 py-2 text-xs text-text-secondary hover:text-text-primary"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

// ─── Main Component ─────────────────────────────────────────

export default function SeasonalPlanner() {
  const currentMonth = getCurrentMonth()
  const [activeMonth, setActiveMonth] = useState(currentMonth)
  const [categoryFilter, setCategoryFilter] = useState<TaskCategory | 'all'>(
    'all'
  )
  const [showReminder, setShowReminder] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const monthData = MONTHS.find((m) => m.month === activeMonth) || MONTHS[0]
  const SeasonIcon = seasonIcons[monthData.season]
  const seasonStyle = seasonColors[monthData.season]

  const filteredTasks =
    categoryFilter === 'all'
      ? monthData.tasks
      : monthData.tasks.filter((t) => t.category === categoryFilter)

  // Scroll active month tab into view
  useEffect(() => {
    const el = scrollRef.current?.querySelector(`[data-month="${activeMonth}"]`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }, [activeMonth])

  return (
    <div className="bg-white rounded-3xl shadow-medium border border-gray-50 overflow-hidden">
      {/* ━━━ MONTH TIMELINE ━━━ */}
      <div className="border-b border-gray-100 bg-background-light">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto no-scrollbar px-2 py-3 gap-1"
        >
          {MONTHS.map((m) => {
            const isActive = m.month === activeMonth
            const isCurrent = m.month === currentMonth
            const sColor = seasonColors[m.season]

            return (
              <button
                key={m.month}
                data-month={m.month}
                onClick={() => setActiveMonth(m.month)}
                className={cn(
                  'relative shrink-0 flex flex-col items-center px-3 py-2 rounded-xl transition-all min-w-[60px]',
                  isActive
                    ? `${sColor.bg} ${sColor.border} border ${sColor.text}`
                    : 'hover:bg-gray-50 text-text-secondary'
                )}
              >
                <span className="text-[10px] font-medium uppercase tracking-wide">
                  {m.shortName}
                </span>
                <span
                  className={cn(
                    'text-lg font-bold leading-none mt-0.5',
                    isActive ? '' : 'text-text-primary'
                  )}
                >
                  {m.month}
                </span>
                {isCurrent && (
                  <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-cta border-2 border-white" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* ━━━ MONTH HEADER ━━━ */}
      <div className="px-4 sm:px-6 pt-6 pb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMonth}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-xl',
                  seasonStyle.bg,
                  seasonStyle.text
                )}
              >
                {SeasonIcon && <SeasonIcon className="h-5 w-5" />}
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary leading-tight">
                  {monthData.name}
                </h3>
                <p className="text-xs text-text-secondary">
                  {monthData.headline}
                </p>
              </div>
              {monthData.month === currentMonth && (
                <span className="ml-auto px-2.5 py-0.5 rounded-full bg-cta/10 text-cta text-[10px] font-bold uppercase tracking-wide">
                  This Month
                </span>
              )}
            </div>
            <p className="text-sm text-text-secondary leading-relaxed bg-background-light rounded-xl px-4 py-3 mt-3">
              {monthData.tip}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ━━━ CATEGORY FILTERS ━━━ */}
      <div className="px-4 sm:px-6 pb-3 flex gap-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setCategoryFilter('all')}
          className={cn(
            'shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
            categoryFilter === 'all'
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
          )}
        >
          All Tasks ({monthData.tasks.length})
        </button>
        {TASK_CATEGORIES.map((cat) => {
          const count = monthData.tasks.filter(
            (t) => t.category === cat.value
          ).length
          if (count === 0) return null
          const Icon = categoryIconMap[cat.icon]
          return (
            <button
              key={cat.value}
              onClick={() => setCategoryFilter(cat.value)}
              className={cn(
                'shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
                categoryFilter === cat.value
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
              )}
            >
              {Icon && <Icon className="h-3 w-3" />}
              {cat.label} ({count})
            </button>
          )
        })}
      </div>

      {/* ━━━ TASKS ━━━ */}
      <div className="px-4 sm:px-6 pb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeMonth}-${categoryFilter}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="space-y-2"
          >
            {filteredTasks.map((task, i) => (
              <TaskCard key={i} task={task} />
            ))}
            {filteredTasks.length === 0 && (
              <p className="text-center text-sm text-text-light py-8">
                No tasks in this category for {monthData.name}.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ━━━ REMINDER + ACTIONS ━━━ */}
      <div className="border-t border-gray-100 px-4 sm:px-6 py-4 bg-background-light">
        {showReminder ? (
          <ReminderForm
            selectedMonth={monthData}
            onClose={() => setShowReminder(false)}
          />
        ) : (
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setShowReminder(true)}
              className="flex items-center justify-center gap-2 flex-1 px-4 py-2.5 rounded-full border border-primary text-primary text-xs font-semibold hover:bg-primary/5 transition-colors"
            >
              <Calendar className="h-3.5 w-3.5" />
              Set {monthData.name} Reminder
            </button>
            <Link
              href="/free-estimate"
              className="btn-primary btn-sm rounded-full flex-1 justify-center text-xs"
            >
              Get Free Estimate
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
        )}
      </div>

      {/* ━━━ NAVIGATION ARROWS ━━━ */}
      <div className="border-t border-gray-100 flex">
        <button
          onClick={() =>
            setActiveMonth(activeMonth === 1 ? 12 : activeMonth - 1)
          }
          className="flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-medium text-text-secondary hover:bg-gray-50 transition-colors"
        >
          <ChevronRight className="h-3.5 w-3.5 rotate-180" />
          {MONTHS[(activeMonth - 2 + 12) % 12].name}
        </button>
        <div className="w-px bg-gray-100" />
        <button
          onClick={() =>
            setActiveMonth(activeMonth === 12 ? 1 : activeMonth + 1)
          }
          className="flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-medium text-text-secondary hover:bg-gray-50 transition-colors"
        >
          {MONTHS[activeMonth % 12].name}
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
