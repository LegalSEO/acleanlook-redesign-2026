'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Phone,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Star,
  Shield,
  Clock,
  Paintbrush,
  Home,
  Building2,
  Droplets,
  Waves,
  Wrench,
  HelpCircle,
  User,
  Mail,
  MapPin,
  CalendarDays,
  AlertCircle,
  Download,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { BUSINESS, TESTIMONIALS } from '@/lib/constants'

// ─── Types ──────────────────────────────────────────────────
type EstimateData = {
  // Step 1
  serviceType: string
  // Step 2
  propertyType: string
  squareFootage: string
  rooms: string
  // Step 3
  timeline: string
  preferredDate: string
  // Step 4
  name: string
  phone: string
  email: string
  address: string
  bestTime: string
  contactMethod: string
}

const INITIAL_DATA: EstimateData = {
  serviceType: '',
  propertyType: '',
  squareFootage: '',
  rooms: '',
  timeline: '',
  preferredDate: '',
  name: '',
  phone: '',
  email: '',
  address: '',
  bestTime: '',
  contactMethod: 'phone',
}

const STEPS = [
  'What do you need?',
  'About your property',
  'Timeline',
  'Contact info',
]

// ─── Service Options ────────────────────────────────────────
const SERVICE_OPTIONS = [
  { value: 'interior-painting', label: 'Interior Painting', icon: Paintbrush, color: 'bg-blue-50 text-blue-600 border-blue-200' },
  { value: 'exterior-painting', label: 'Exterior Painting', icon: Home, color: 'bg-green-50 text-green-600 border-green-200' },
  { value: 'commercial-painting', label: 'Commercial Painting', icon: Building2, color: 'bg-purple-50 text-purple-600 border-purple-200' },
  { value: 'power-washing', label: 'Power Washing', icon: Droplets, color: 'bg-cyan-50 text-cyan-600 border-cyan-200' },
  { value: 'gutter-cleaning', label: 'Gutter Cleaning', icon: Waves, color: 'bg-amber-50 text-amber-600 border-amber-200' },
  { value: 'handyman', label: 'Handyman', icon: Wrench, color: 'bg-orange-50 text-orange-600 border-orange-200' },
  { value: 'not-sure', label: 'Not Sure', icon: HelpCircle, color: 'bg-gray-50 text-gray-600 border-gray-200' },
]

const PROPERTY_OPTIONS = [
  { value: 'house', label: 'House' },
  { value: 'condo', label: 'Condo / Apartment' },
  { value: 'commercial', label: 'Commercial Property' },
]

const SQFT_OPTIONS = [
  { value: 'under-1000', label: 'Under 1,000 sq ft' },
  { value: '1000-2000', label: '1,000–2,000 sq ft' },
  { value: '2000-3000', label: '2,000–3,000 sq ft' },
  { value: '3000-5000', label: '3,000–5,000 sq ft' },
  { value: 'over-5000', label: 'Over 5,000 sq ft' },
]

const TIMELINE_OPTIONS = [
  { value: 'asap', label: 'ASAP', description: 'As soon as possible' },
  { value: '2-weeks', label: 'Within 2 Weeks', description: 'Need it done soon' },
  { value: '1-month', label: 'Within a Month', description: 'Flexible on timing' },
  { value: 'planning', label: 'Planning Ahead', description: 'No rush, just exploring' },
]

// ─── Component ──────────────────────────────────────────────
export default function FreeEstimatePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState<EstimateData>(INITIAL_DATA)
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [direction, setDirection] = useState(1)

  const update = (fields: Partial<EstimateData>) => {
    setData((prev) => ({ ...prev, ...fields }))
    // Clear errors for updated fields
    const clearedErrors = { ...errors }
    Object.keys(fields).forEach((k) => {
      delete clearedErrors[k]
    })
    setErrors(clearedErrors)
  }

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {}

    switch (currentStep) {
      case 0:
        if (!data.serviceType) newErrors.serviceType = 'Please select a service'
        break
      case 1:
        if (!data.propertyType) newErrors.propertyType = 'Please select a property type'
        if (!data.squareFootage) newErrors.squareFootage = 'Please select approximate size'
        break
      case 2:
        if (!data.timeline) newErrors.timeline = 'Please select a timeline'
        break
      case 3:
        if (!data.name.trim()) newErrors.name = 'Name is required'
        if (!data.phone.trim()) newErrors.phone = 'Phone number is required'
        else if (!/^\+?[\d\s()-]{7,}$/.test(data.phone))
          newErrors.phone = 'Invalid phone number'
        if (!data.email.trim()) newErrors.email = 'Email is required'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
          newErrors.email = 'Invalid email'
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const next = () => {
    if (!validateStep()) return
    if (currentStep < STEPS.length - 1) {
      setDirection(1)
      setCurrentStep((s) => s + 1)
    }
  }

  const prev = () => {
    if (currentStep > 0) {
      setDirection(-1)
      setCurrentStep((s) => s - 1)
    }
  }

  const handleSubmit = async () => {
    if (!validateStep()) return

    setStatus('submitting')
    try {
      const res = await fetch('/api/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  // ─── Success State ──────────────────────────────────────
  if (status === 'success') {
    return (
      <div className="min-h-screen bg-background-light">
        {/* Minimal header */}
        <header className="bg-white border-b border-gray-100">
          <div className="container-wide flex items-center justify-between py-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white font-bold text-lg">
                A
              </div>
              <span className="text-lg font-bold text-primary">
                A Clean Look
              </span>
            </Link>
            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              className="flex items-center gap-2 text-sm font-semibold text-primary"
            >
              <Phone className="h-4 w-4" />
              {BUSINESS.phone}
            </a>
          </div>
        </header>

        <div className="container-narrow py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-soft p-8 sm:p-12 text-center max-w-xl mx-auto"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10 mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-success" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-3">
              Thank You, {data.name.split(' ')[0]}!
            </h1>
            <p className="text-text-secondary text-lg mb-2">
              We&apos;ve received your estimate request.
            </p>
            <p className="text-text-secondary mb-8">
              Our team will review your project details and get back to you{' '}
              <strong className="text-primary">within 2 hours</strong> via{' '}
              {data.contactMethod === 'phone'
                ? 'phone call'
                : data.contactMethod === 'text'
                ? 'text message'
                : 'email'}
              .
            </p>

            <div className="bg-background-light rounded-xl p-5 text-left mb-8">
              <h3 className="text-sm font-semibold text-primary mb-3">
                Your Request Summary
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Service:</span>
                  <span className="font-medium text-text-primary">
                    {SERVICE_OPTIONS.find((s) => s.value === data.serviceType)?.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Property:</span>
                  <span className="font-medium text-text-primary">
                    {PROPERTY_OPTIONS.find((p) => p.value === data.propertyType)?.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Timeline:</span>
                  <span className="font-medium text-text-primary">
                    {TIMELINE_OPTIONS.find((t) => t.value === data.timeline)?.label}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm text-text-secondary mb-4">
              While you wait, check out our resources:
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/resources/chicago-homeowner-guide"
                className="btn-outline-dark btn-sm rounded-full"
              >
                <Download className="mr-2 h-4 w-4" />
                Homeowner&apos;s Guide
              </Link>
              <Link
                href="/gallery"
                className="btn-outline-dark btn-sm rounded-full"
              >
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  // ─── Form ───────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background-light">
      {/* Minimal header — reduced exit points */}
      <header className="bg-white border-b border-gray-100">
        <div className="container-wide flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white font-bold text-lg">
              A
            </div>
            <span className="text-lg font-bold text-primary">A Clean Look</span>
          </Link>
          <a
            href={`tel:${BUSINESS.phoneRaw}`}
            className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-cta transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">{BUSINESS.phone}</span>
            <span className="sm:hidden">Call Us</span>
          </a>
        </div>
      </header>

      <div className="container-wide py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* ── Main Form Column ── */}
          <div className="lg:col-span-2">
            {/* Title */}
            <div className="mb-8">
              <h1 className="heading-2 text-primary mb-2">
                Get Your Free Painting Estimate in Minutes
              </h1>
              <p className="text-text-secondary">
                No obligation. No surprises. Just honest pricing from Chicago&apos;s
                trusted painters.
              </p>
            </div>

            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                {STEPS.map((step, i) => (
                  <div
                    key={step}
                    className={cn(
                      'flex items-center gap-2 text-xs sm:text-sm font-medium transition-colors',
                      i <= currentStep ? 'text-primary' : 'text-text-light'
                    )}
                  >
                    <div
                      className={cn(
                        'flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all',
                        i < currentStep
                          ? 'bg-success text-white'
                          : i === currentStep
                          ? 'bg-primary text-white'
                          : 'bg-gray-200 text-text-light'
                      )}
                    >
                      {i < currentStep ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        i + 1
                      )}
                    </div>
                    <span className="hidden sm:inline">{step}</span>
                  </div>
                ))}
              </div>
              <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  initial={{ width: '0%' }}
                  animate={{
                    width: `${((currentStep + 1) / STEPS.length) * 100}%`,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Form card */}
            <div className="bg-white rounded-2xl shadow-soft p-6 sm:p-8">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentStep}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -40 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* ── Step 1: Service Type ── */}
                  {currentStep === 0 && (
                    <div>
                      <h2 className="text-xl font-bold text-primary mb-1">
                        What do you need?
                      </h2>
                      <p className="text-sm text-text-secondary mb-6">
                        Select the service that best fits your project.
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {SERVICE_OPTIONS.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => update({ serviceType: opt.value })}
                            className={cn(
                              'flex flex-col items-center gap-3 p-5 rounded-xl border-2 transition-all text-center',
                              data.serviceType === opt.value
                                ? 'border-primary bg-primary/5 shadow-md'
                                : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                            )}
                          >
                            <opt.icon
                              className={cn(
                                'h-8 w-8',
                                data.serviceType === opt.value
                                  ? 'text-primary'
                                  : 'text-text-light'
                              )}
                            />
                            <span
                              className={cn(
                                'text-sm font-medium',
                                data.serviceType === opt.value
                                  ? 'text-primary'
                                  : 'text-text-secondary'
                              )}
                            >
                              {opt.label}
                            </span>
                          </button>
                        ))}
                      </div>
                      {errors.serviceType && (
                        <p className="text-red-500 text-xs mt-3 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.serviceType}
                        </p>
                      )}
                    </div>
                  )}

                  {/* ── Step 2: Property Details ── */}
                  {currentStep === 1 && (
                    <div>
                      <h2 className="text-xl font-bold text-primary mb-1">
                        Tell us about your property
                      </h2>
                      <p className="text-sm text-text-secondary mb-6">
                        This helps us prepare an accurate estimate.
                      </p>

                      <div className="space-y-5">
                        {/* Property type */}
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">
                            Property Type *
                          </label>
                          <div className="grid grid-cols-3 gap-3">
                            {PROPERTY_OPTIONS.map((opt) => (
                              <button
                                key={opt.value}
                                onClick={() =>
                                  update({ propertyType: opt.value })
                                }
                                className={cn(
                                  'px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all',
                                  data.propertyType === opt.value
                                    ? 'border-primary bg-primary/5 text-primary'
                                    : 'border-gray-100 text-text-secondary hover:border-gray-200'
                                )}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                          {errors.propertyType && (
                            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              {errors.propertyType}
                            </p>
                          )}
                        </div>

                        {/* Square footage */}
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">
                            Approximate Size *
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {SQFT_OPTIONS.map((opt) => (
                              <button
                                key={opt.value}
                                onClick={() =>
                                  update({ squareFootage: opt.value })
                                }
                                className={cn(
                                  'px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all',
                                  data.squareFootage === opt.value
                                    ? 'border-primary bg-primary/5 text-primary'
                                    : 'border-gray-100 text-text-secondary hover:border-gray-200'
                                )}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                          {errors.squareFootage && (
                            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              {errors.squareFootage}
                            </p>
                          )}
                        </div>

                        {/* Rooms/stories */}
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">
                            {data.serviceType === 'interior-painting'
                              ? 'Number of Rooms'
                              : 'Number of Stories'}{' '}
                            (optional)
                          </label>
                          <select
                            value={data.rooms}
                            onChange={(e) => update({ rooms: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 text-sm focus:outline-none focus:border-primary transition-colors appearance-none bg-white"
                          >
                            <option value="">Select...</option>
                            {(data.serviceType === 'interior-painting'
                              ? ['1 room', '2–3 rooms', '4–6 rooms', '7+ rooms', 'Whole house']
                              : ['1 story', '2 stories', '3+ stories']
                            ).map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── Step 3: Timeline ── */}
                  {currentStep === 2 && (
                    <div>
                      <h2 className="text-xl font-bold text-primary mb-1">
                        When do you need this done?
                      </h2>
                      <p className="text-sm text-text-secondary mb-6">
                        Let us know your preferred timeline.
                      </p>

                      <div className="space-y-5">
                        <div className="grid grid-cols-2 gap-3">
                          {TIMELINE_OPTIONS.map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() =>
                                update({ timeline: opt.value })
                              }
                              className={cn(
                                'flex flex-col items-start p-4 rounded-xl border-2 transition-all text-left',
                                data.timeline === opt.value
                                  ? 'border-primary bg-primary/5'
                                  : 'border-gray-100 hover:border-gray-200'
                              )}
                            >
                              <span
                                className={cn(
                                  'text-sm font-semibold',
                                  data.timeline === opt.value
                                    ? 'text-primary'
                                    : 'text-text-primary'
                                )}
                              >
                                {opt.label}
                              </span>
                              <span className="text-xs text-text-light mt-0.5">
                                {opt.description}
                              </span>
                            </button>
                          ))}
                        </div>
                        {errors.timeline && (
                          <p className="text-red-500 text-xs flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.timeline}
                          </p>
                        )}

                        {/* Optional date */}
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">
                            Preferred Start Date (optional)
                          </label>
                          <div className="relative">
                            <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-light" />
                            <input
                              type="date"
                              value={data.preferredDate}
                              onChange={(e) =>
                                update({ preferredDate: e.target.value })
                              }
                              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-100 text-sm focus:outline-none focus:border-primary transition-colors"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── Step 4: Contact Info ── */}
                  {currentStep === 3 && (
                    <div>
                      <h2 className="text-xl font-bold text-primary mb-1">
                        How can we reach you?
                      </h2>
                      <p className="text-sm text-text-secondary mb-6">
                        We&apos;ll use this to send your estimate.
                      </p>

                      <div className="space-y-4">
                        {/* Name */}
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-1.5">
                            Full Name *
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-light" />
                            <input
                              type="text"
                              value={data.name}
                              onChange={(e) =>
                                update({ name: e.target.value })
                              }
                              className={cn(
                                'w-full pl-10 pr-4 py-3 rounded-xl border-2 text-sm focus:outline-none focus:border-primary transition-colors',
                                errors.name
                                  ? 'border-red-400'
                                  : 'border-gray-100'
                              )}
                              placeholder="John Smith"
                            />
                          </div>
                          {errors.name && (
                            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              {errors.name}
                            </p>
                          )}
                        </div>

                        {/* Phone & Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-text-primary mb-1.5">
                              Phone *
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-light" />
                              <input
                                type="tel"
                                value={data.phone}
                                onChange={(e) =>
                                  update({ phone: e.target.value })
                                }
                                className={cn(
                                  'w-full pl-10 pr-4 py-3 rounded-xl border-2 text-sm focus:outline-none focus:border-primary transition-colors',
                                  errors.phone
                                    ? 'border-red-400'
                                    : 'border-gray-100'
                                )}
                                placeholder="(312) 555-0123"
                              />
                            </div>
                            {errors.phone && (
                              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                {errors.phone}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-text-primary mb-1.5">
                              Email *
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-light" />
                              <input
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                  update({ email: e.target.value })
                                }
                                className={cn(
                                  'w-full pl-10 pr-4 py-3 rounded-xl border-2 text-sm focus:outline-none focus:border-primary transition-colors',
                                  errors.email
                                    ? 'border-red-400'
                                    : 'border-gray-100'
                                )}
                                placeholder="john@example.com"
                              />
                            </div>
                            {errors.email && (
                              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                {errors.email}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Address (optional) */}
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-1.5">
                            Project Address (optional)
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-light" />
                            <input
                              type="text"
                              value={data.address}
                              onChange={(e) =>
                                update({ address: e.target.value })
                              }
                              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-100 text-sm focus:outline-none focus:border-primary transition-colors"
                              placeholder="123 Main St, Chicago, IL"
                            />
                          </div>
                        </div>

                        {/* Best time & contact method */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-text-primary mb-1.5">
                              Best Time to Contact
                            </label>
                            <select
                              value={data.bestTime}
                              onChange={(e) =>
                                update({ bestTime: e.target.value })
                              }
                              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 text-sm focus:outline-none focus:border-primary transition-colors appearance-none bg-white"
                            >
                              <option value="">Any time</option>
                              <option value="morning">
                                Morning (8am–12pm)
                              </option>
                              <option value="afternoon">
                                Afternoon (12pm–5pm)
                              </option>
                              <option value="evening">
                                Evening (5pm–8pm)
                              </option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-text-primary mb-1.5">
                              Preferred Contact
                            </label>
                            <div className="flex gap-2">
                              {[
                                { value: 'phone', label: 'Call' },
                                { value: 'text', label: 'Text' },
                                { value: 'email', label: 'Email' },
                              ].map((opt) => (
                                <button
                                  key={opt.value}
                                  type="button"
                                  onClick={() =>
                                    update({ contactMethod: opt.value })
                                  }
                                  className={cn(
                                    'flex-1 py-3 rounded-xl border-2 text-sm font-medium transition-all',
                                    data.contactMethod === opt.value
                                      ? 'border-primary bg-primary/5 text-primary'
                                      : 'border-gray-100 text-text-secondary hover:border-gray-200'
                                  )}
                                >
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Error banner */}
              {status === 'error' && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 text-red-700 text-sm mt-4">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  Something went wrong. Please try again or call us at{' '}
                  {BUSINESS.phone}.
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                <button
                  onClick={prev}
                  className={cn(
                    'flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors',
                    currentStep === 0
                      ? 'text-transparent pointer-events-none'
                      : 'text-text-secondary hover:text-primary hover:bg-gray-100'
                  )}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>

                {currentStep < STEPS.length - 1 ? (
                  <button
                    onClick={next}
                    className="btn-primary btn-md rounded-full"
                  >
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={status === 'submitting'}
                    className="btn-primary btn-lg rounded-full"
                  >
                    {status === 'submitting' ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Submit Request
                        <ArrowRight className="h-5 w-5" />
                      </span>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ── Sidebar (trust signals) ── */}
          <div className="space-y-6">
            {/* Trust stats */}
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">
                Why 1,000+ Chicagoans Trust Us
              </h3>
              <div className="space-y-4">
                {[
                  {
                    icon: Clock,
                    label: 'Average Response Time',
                    value: 'Under 2 Hours',
                  },
                  {
                    icon: Star,
                    label: 'Customer Rating',
                    value: '5-Star Average',
                  },
                  {
                    icon: Shield,
                    label: 'Insurance',
                    value: 'Fully Insured',
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent shrink-0">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="block text-xs text-text-light">
                        {item.label}
                      </span>
                      <span className="block text-sm font-semibold text-primary">
                        {item.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mini testimonials */}
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">
                Recent Reviews
              </h3>
              <div className="space-y-4">
                {TESTIMONIALS.map((t) => (
                  <div
                    key={t.name}
                    className="pb-4 border-b border-gray-50 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-1 mb-1.5">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-3.5 w-3.5 fill-accent text-accent"
                        />
                      ))}
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <span className="text-xs font-semibold text-text-primary mt-1.5 block">
                      — {t.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust badges */}
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <div className="space-y-3">
                {[
                  'Benjamin Moore Preferred',
                  'Fully Insured',
                  'BBB Accredited',
                  '30+ Years Experience',
                ].map((badge) => (
                  <div
                    key={badge}
                    className="flex items-center gap-2 text-sm text-text-secondary"
                  >
                    <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                    {badge}
                  </div>
                ))}
              </div>
            </div>

            {/* Phone CTA */}
            <div className="bg-primary rounded-2xl p-6 text-center">
              <p className="text-white/80 text-sm mb-3">
                Prefer to talk to a person?
              </p>
              <a
                href={`tel:${BUSINESS.phoneRaw}`}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-white text-primary font-bold hover:bg-white/90 transition-colors"
              >
                <Phone className="h-5 w-5" />
                {BUSINESS.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
