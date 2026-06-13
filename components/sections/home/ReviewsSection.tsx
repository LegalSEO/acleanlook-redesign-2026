'use client'

import { useState, useEffect } from 'react'
import { HOME_REVIEWS } from '@/data/homepage'

function Stars({ n = 5 }: { n: number }) {
  return (
    <span className="acl-stars" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18.2 22 12 18.3 5.8 22l1.7-7.2L2 10l7.1-1.1L12 2z" />
        </svg>
      ))}
    </span>
  )
}

export default function ReviewsSection() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % HOME_REVIEWS.length), 6500)
    return () => clearInterval(t)
  }, [])

  const r = HOME_REVIEWS[active]

  return (
    <section className="acl-reviews" id="reviews">
      <div className="shell acl-reviews__inner">
        <header className="acl-secthead">
          <span className="acl-secthead__no">§ 05</span>
          <h2 className="acl-h2">What the neighbors say.</h2>
        </header>

        <figure className="acl-reviews__quote" key={active}>
          <Stars n={r.rating} />
          <blockquote className="acl-reviews__text">&ldquo;{r.quote}&rdquo;</blockquote>
          <figcaption className="acl-reviews__by">
            <span className="acl-reviews__name">{r.name}</span>
            <span className="acl-reviews__sep">—</span>
            <span className="acl-reviews__meta">{r.project}, {r.area}</span>
          </figcaption>
        </figure>

        <div className="acl-reviews__dots" role="tablist" aria-label="Reviews">
          {HOME_REVIEWS.map((_, k) => (
            <button
              key={k}
              role="tab"
              aria-selected={k === active}
              className={`acl-reviews__dot${k === active ? ' is-on' : ''}`}
              onClick={() => setActive(k)}
              aria-label={`Review ${k + 1}`}
            />
          ))}
        </div>

        <div className="acl-reviews__mini">
          {HOME_REVIEWS.map((rv, k) => (
            <button
              key={k}
              className={`acl-reviews__minicard${k === active ? ' is-on' : ''}`}
              onClick={() => setActive(k)}
            >
              <Stars n={rv.rating} />
              <span className="acl-reviews__miniproj">{rv.project}</span>
              <span className="acl-reviews__miniarea">{rv.area}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
