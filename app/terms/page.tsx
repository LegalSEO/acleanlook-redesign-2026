import type { Metadata } from 'next'
import Link from 'next/link'
import { BUSINESS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Terms of service for ${BUSINESS.name}. Read our terms and conditions for using our website and services.`,
}

export default function TermsPage() {
  return (
    <div className="bg-white">
      <div className="bg-primary pt-32 pb-12">
        <div className="container-narrow">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Terms of Service</span>
          </nav>
          <h1 className="heading-1 text-white">Terms of Service</h1>
          <p className="text-white/70 mt-2">Last updated: February 2026</p>
        </div>
      </div>

      <div className="container-narrow section-padding">
        <div className="prose prose-lg max-w-none text-text-secondary">
          <h2 className="text-primary">Agreement to Terms</h2>
          <p>
            By accessing and using the A Clean Look website (acleanlook.com),
            you agree to be bound by these Terms of Service. If you do not agree
            with any part of these terms, please do not use our website.
          </p>

          <h2 className="text-primary">Services</h2>
          <p>
            A Clean Look provides painting, power washing, gutter cleaning, and
            handyman services to residential and commercial customers in the
            Chicago metropolitan area. Estimates provided through our website or
            tools are approximations and may vary based on actual project
            assessment.
          </p>

          <h2 className="text-primary">Estimates and Pricing</h2>
          <p>
            Online estimates generated through our paint estimator tool are
            approximate ranges based on average Chicago market rates. Final
            pricing is determined after an in-person assessment of the project.
            All estimates are free and carry no obligation.
          </p>

          <h2 className="text-primary">Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, images,
            and software, is the property of A Clean Look and is protected by
            copyright and intellectual property laws. You may not reproduce,
            distribute, or use our content without written permission.
          </p>

          <h2 className="text-primary">User Content</h2>
          <p>
            When you upload photos to our color visualizer tool or submit
            information through our forms, you grant us permission to use this
            information solely for providing our services. We will not share your
            uploaded photos publicly without your consent.
          </p>

          <h2 className="text-primary">Limitation of Liability</h2>
          <p>
            A Clean Look provides this website and its tools on an &ldquo;as
            is&rdquo; basis. We make no warranties regarding the accuracy of
            estimates, color representations, or other tool outputs. Our online
            tools are for informational purposes and do not constitute a
            professional assessment.
          </p>

          <h2 className="text-primary">Changes to Terms</h2>
          <p>
            We reserve the right to update these terms at any time. Continued
            use of the website after changes constitutes acceptance of the
            updated terms.
          </p>

          <h2 className="text-primary">Contact</h2>
          <p>
            For questions about these terms, contact us at{' '}
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
