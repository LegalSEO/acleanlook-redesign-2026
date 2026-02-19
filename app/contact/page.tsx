'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  Send,
  CheckCircle2,
  AlertCircle,
  Facebook,
  Star,
  ExternalLink,
} from 'lucide-react'
import { BUSINESS, SOCIAL, SERVICE_AREAS, SERVICES } from '@/lib/constants'

type FormData = {
  name: string
  email: string
  phone: string
  service: string
  message: string
  contactMethod: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {}
  if (!data.name.trim()) errors.name = 'Name is required'
  if (!data.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Invalid email address'
  }
  if (!data.phone.trim()) {
    errors.phone = 'Phone number is required'
  } else if (!/^\+?[\d\s()-]{7,}$/.test(data.phone)) {
    errors.phone = 'Invalid phone number'
  }
  if (!data.service) errors.service = 'Please select a service'
  if (!data.message.trim()) errors.message = 'Message is required'
  return errors
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    contactMethod: 'phone',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
        contactMethod: 'phone',
      })
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      {/* ━━━ HERO ━━━ */}
      <section className="relative bg-gradient-to-br from-primary via-primary-600 to-primary-800 pt-32 pb-20 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />

        <div className="container-wide relative z-10">
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 text-sm text-white/60 mb-6"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">Contact</span>
          </motion.nav>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="heading-display text-white"
          >
            Get In <span className="gradient-text">Touch</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-lg text-white/80 mt-4 max-w-xl"
          >
            Ready to transform your space? Reach out and we&apos;ll get back to you
            within 2 hours.
          </motion.p>
        </div>
      </section>

      {/* ━━━ MAIN CONTENT ━━━ */}
      <section className="section-padding bg-background-light">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* ── Contact Form ── */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-soft p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-primary mb-1">
                  Send Us a Message
                </h2>
                <p className="text-text-secondary text-sm mb-6">
                  Fill out the form below and we&apos;ll get back to you within 2
                  hours.
                </p>

                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle2 className="h-16 w-16 text-success mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-primary mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-text-secondary">
                      Thank you for reaching out. We&apos;ll get back to you within 2
                      hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-text-primary mb-1.5"
                        >
                          Full Name *
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-cta/50 focus:border-cta transition-colors ${
                            errors.name ? 'border-red-400' : 'border-gray-200'
                          }`}
                          placeholder="John Smith"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-text-primary mb-1.5"
                        >
                          Email *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-cta/50 focus:border-cta transition-colors ${
                            errors.email ? 'border-red-400' : 'border-gray-200'
                          }`}
                          placeholder="john@example.com"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Phone & Service */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-text-primary mb-1.5"
                        >
                          Phone *
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-cta/50 focus:border-cta transition-colors ${
                            errors.phone ? 'border-red-400' : 'border-gray-200'
                          }`}
                          placeholder="(312) 555-0123"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="service"
                          className="block text-sm font-medium text-text-primary mb-1.5"
                        >
                          Service Needed *
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-cta/50 focus:border-cta transition-colors appearance-none bg-white ${
                            errors.service
                              ? 'border-red-400'
                              : 'border-gray-200'
                          } ${!formData.service ? 'text-text-light' : 'text-text-primary'}`}
                        >
                          <option value="">Select a service</option>
                          {SERVICES.map((s) => (
                            <option key={s.slug} value={s.slug}>
                              {s.title}
                            </option>
                          ))}
                          <option value="other">Other</option>
                        </select>
                        {errors.service && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.service}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-text-primary mb-1.5"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-cta/50 focus:border-cta transition-colors resize-none ${
                          errors.message ? 'border-red-400' : 'border-gray-200'
                        }`}
                        placeholder="Tell us about your project..."
                      />
                      {errors.message && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Preferred Contact Method */}
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Preferred Contact Method
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {[
                          { value: 'phone', label: 'Phone Call' },
                          { value: 'text', label: 'Text Message' },
                          { value: 'email', label: 'Email' },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm cursor-pointer transition-all ${
                              formData.contactMethod === option.value
                                ? 'border-primary bg-primary/5 text-primary font-semibold'
                                : 'border-gray-200 text-text-secondary hover:border-gray-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="contactMethod"
                              value={option.value}
                              checked={formData.contactMethod === option.value}
                              onChange={handleChange}
                              className="sr-only"
                            />
                            {option.label}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Error banner */}
                    {status === 'error' && (
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 text-red-700 text-sm">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        Something went wrong. Please try again or call us directly.
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full btn-primary btn-lg rounded-lg"
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
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="h-5 w-5" />
                          Send Message
                        </span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* ── Sidebar ── */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Info Card */}
              <div
                className="bg-white rounded-2xl shadow-soft p-6"
                itemScope
                itemType="https://schema.org/LocalBusiness"
              >
                <meta itemProp="name" content={BUSINESS.name} />
                <h3 className="text-lg font-bold text-primary mb-5">
                  Contact Info
                </h3>
                <div className="space-y-5">
                  <a
                    href={`tel:${BUSINESS.phoneRaw}`}
                    className="flex items-center gap-4 group"
                    itemProp="telephone"
                    content={BUSINESS.phone}
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cta/10 text-cta group-hover:bg-cta group-hover:text-white transition-colors shrink-0">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="block text-sm font-semibold text-text-primary">
                        {BUSINESS.phone}
                      </span>
                      <span className="block text-xs text-text-light">
                        Call or Text
                      </span>
                    </div>
                  </a>

                  <a
                    href={`mailto:${BUSINESS.email}`}
                    className="flex items-center gap-4 group"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <span
                        className="block text-sm font-semibold text-text-primary"
                        itemProp="email"
                      >
                        {BUSINESS.email}
                      </span>
                      <span className="block text-xs text-text-light">
                        Email
                      </span>
                    </div>
                  </a>

                  <div
                    className="flex items-start gap-4"
                    itemProp="address"
                    itemScope
                    itemType="https://schema.org/PostalAddress"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="block text-sm font-semibold text-text-primary">
                        <span itemProp="streetAddress">
                          {BUSINESS.address.street}
                        </span>
                      </span>
                      <span className="block text-xs text-text-light">
                        <span itemProp="addressLocality">
                          {BUSINESS.address.city}
                        </span>
                        ,{' '}
                        <span itemProp="addressRegion">
                          {BUSINESS.address.state}
                        </span>{' '}
                        <span itemProp="postalCode">
                          {BUSINESS.address.zip}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-success/10 text-success shrink-0">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="block text-sm font-semibold text-text-primary">
                        Mon – Sat: 7am – 6pm
                      </span>
                      <span className="block text-xs text-text-light">
                        Sunday: By appointment
                      </span>
                    </div>
                  </div>
                </div>

                {/* Social links */}
                <div className="mt-6 pt-5 border-t border-gray-100">
                  <span className="block text-sm font-semibold text-text-primary mb-3">
                    Follow Us
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={SOCIAL.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-background-light hover:bg-primary hover:text-white text-text-secondary transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="h-4 w-4" />
                    </a>
                    <a
                      href={SOCIAL.yelp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-background-light hover:bg-primary hover:text-white text-text-secondary transition-colors"
                      aria-label="Yelp"
                    >
                      <Star className="h-4 w-4" />
                    </a>
                    <a
                      href={SOCIAL.houzz}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-background-light hover:bg-primary hover:text-white text-text-secondary transition-colors"
                      aria-label="Houzz"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="bg-white rounded-2xl shadow-soft p-6">
                <h3 className="text-lg font-bold text-primary mb-3">
                  Our Location
                </h3>
                <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-10 w-10 text-primary/30 mx-auto mb-2" />
                    <span className="text-xs text-text-light block">
                      Google Maps embed
                    </span>
                    <span className="text-xs text-text-light block">
                      (Add API key to enable)
                    </span>
                  </div>
                </div>
              </div>

              {/* Areas served preview */}
              <div className="bg-white rounded-2xl shadow-soft p-6">
                <h3 className="text-lg font-bold text-primary mb-3">
                  Areas We Serve
                </h3>
                <div className="flex flex-wrap gap-2">
                  {SERVICE_AREAS.slice(0, 10).map((area) => (
                    <span
                      key={area}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-background-light text-xs text-text-secondary"
                    >
                      {area}
                    </span>
                  ))}
                  <Link
                    href="/areas"
                    className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 text-xs font-semibold text-accent-700"
                  >
                    +{SERVICE_AREAS.length - 10} more
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ JSON-LD Structured Data ━━━ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: BUSINESS.name,
            image: `${BUSINESS.url}/images/logo.png`,
            telephone: BUSINESS.phone,
            email: BUSINESS.email,
            address: {
              '@type': 'PostalAddress',
              streetAddress: BUSINESS.address.street,
              addressLocality: BUSINESS.address.city,
              addressRegion: BUSINESS.address.state,
              postalCode: BUSINESS.address.zip,
              addressCountry: 'US',
            },
            url: BUSINESS.url,
            priceRange: '$$',
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                ],
                opens: '07:00',
                closes: '18:00',
              },
            ],
            areaServed: SERVICE_AREAS.map((area) => ({
              '@type': 'City',
              name: area,
            })),
          }),
        }}
      />
    </>
  )
}
