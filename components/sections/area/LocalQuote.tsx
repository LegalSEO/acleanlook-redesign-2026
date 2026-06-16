import type { AreaEditorial } from '@/data/areas-editorial'

export default function LocalQuote({ area }: { area: AreaEditorial }) {
  const { testimonial } = area
  return (
    <section className="acl-localquote">
      <div className="shell acl-localquote__inner">
        <div className="acl-localquote__opener" aria-hidden>&ldquo;</div>
        <div className="acl-localquote__body">
          <blockquote>&ldquo;{testimonial.text}&rdquo;</blockquote>
          <p className="acl-localquote__author">
            <strong>{testimonial.author}</strong> &mdash; {testimonial.cred}
          </p>
        </div>
      </div>
    </section>
  )
}
