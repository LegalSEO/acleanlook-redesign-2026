import type { Metadata } from 'next'
import Link from 'next/link'
import { BUSINESS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy policy for ${BUSINESS.name}. Learn how we collect, use, and protect your personal information.`,
}

export default function PrivacyPage() {
  return (
    <div className="bg-white">
      <div className="bg-primary pt-32 pb-12">
        <div className="container-narrow">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Privacy Policy</span>
          </nav>
          <h1 className="heading-1 text-white">Privacy Policy</h1>
          <p className="text-white/70 mt-2">Last updated: February 2026</p>
        </div>
      </div>

      <div className="container-narrow section-padding">
        <div className="prose prose-lg max-w-none text-text-secondary">
          <h2 className="text-primary">Information We Collect</h2>
          <p>
            When you use our website or request a free estimate, we may collect
            personal information including your name, email address, phone
            number, and project details. We collect this information only when
            you voluntarily provide it through our contact forms, estimate
            requests, or email signups.
          </p>

          <h2 className="text-primary">How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Respond to your inquiries and estimate requests</li>
            <li>Provide painting and home improvement services</li>
            <li>Send you project updates and scheduling information</li>
            <li>Send educational content and promotions (if you opted in)</li>
            <li>Improve our website and services</li>
          </ul>

          <h2 className="text-primary">Information Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal information to third
            parties. We may share your information with trusted service providers
            who assist in operating our website or conducting our business,
            provided they agree to keep your information confidential.
          </p>

          <h2 className="text-primary">Cookies and Analytics</h2>
          <p>
            Our website uses cookies and Google Analytics to understand how
            visitors interact with our site. This helps us improve the user
            experience. You can control cookie preferences through your browser
            settings.
          </p>

          <h2 className="text-primary">Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal
            information. However, no method of electronic transmission or storage
            is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-primary">Your Rights</h2>
          <p>
            You may request to view, update, or delete your personal information
            at any time by contacting us. You may also unsubscribe from our
            email communications using the link in any email we send.
          </p>

          <h2 className="text-primary">Contact Us</h2>
          <p>
            If you have questions about this privacy policy, please contact us
            at{' '}
            <a
              href={`mailto:${BUSINESS.email}`}
              className="text-cta hover:underline"
            >
              {BUSINESS.email}
            </a>{' '}
            or call{' '}
            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              className="text-cta hover:underline"
            >
              {BUSINESS.phone}
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
