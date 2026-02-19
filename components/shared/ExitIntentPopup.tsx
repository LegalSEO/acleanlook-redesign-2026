'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Gift, Download, Mail } from 'lucide-react'
import { BUSINESS } from '@/lib/constants'

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 5) {
      const alreadyShown = sessionStorage.getItem('exitPopupShown')
      if (!alreadyShown) {
        setIsOpen(true)
        sessionStorage.setItem('exitPopupShown', '1')
      }
    }
  }, [])

  useEffect(() => {
    // Desktop only — no hover on touch devices
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    // Delay before arming (don't trigger on initial load)
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave)
    }, 5000)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseLeave])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    try {
      await fetch('/api/resources/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          formId: 'exit-intent-coupon',
          resourceTitle: '10% Off Coupon + Homeowner Guide',
        }),
      })
    } catch {
      // Silent fail — still show success
    }

    setIsSubmitted(true)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header gradient */}
            <div className="bg-gradient-to-r from-primary to-primary-600 p-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cta mx-auto mb-3">
                <Gift className="h-7 w-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Wait! Don&apos;t Leave Empty-Handed
              </h2>
              <p className="text-white/80 text-sm mt-2">
                Get 10% off your first project with A Clean Look
              </p>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close popup"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-6">
              {!isSubmitted ? (
                <>
                  <p className="text-text-secondary text-sm text-center mb-5">
                    Enter your email to receive your 10% discount coupon plus
                    our free Chicago Homeowner&apos;s Guide to Painting.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-light" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-cta/50 focus:border-cta"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full btn-primary btn-md rounded-lg"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Get My 10% Coupon
                    </button>
                    <p className="text-xs text-text-light text-center">
                      No spam, ever. Unsubscribe anytime.
                    </p>
                  </form>

                  <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-xs text-text-light hover:text-text-secondary transition-colors"
                    >
                      No thanks, I&apos;ll pay full price
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success mx-auto mb-3">
                    <Gift className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2">
                    Check Your Inbox!
                  </h3>
                  <p className="text-sm text-text-secondary mb-4">
                    Your 10% coupon and homeowner guide are on the way.
                    Mention this coupon when you call!
                  </p>
                  <Link
                    href="/free-estimate"
                    className="btn-primary btn-md rounded-full w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Your Free Estimate
                  </Link>
                  <p className="mt-3 text-sm text-text-light">
                    Or call{' '}
                    <a
                      href={`tel:${BUSINESS.phoneRaw}`}
                      className="font-semibold text-primary"
                    >
                      {BUSINESS.phone}
                    </a>
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
