'use client'

import { useState, useRef, useEffect } from 'react'
import { PROJECTS } from '@/data/homepage'

function BeforeAfter({
  before, after, loc, note,
}: { before: string; after: string; loc: string; note: string }) {
  const [pos, setPos] = useState(50)
  const ref = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const onMove = (clientX: number) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    setPos(Math.max(2, Math.min(98, ((clientX - r.left) / r.width) * 100)))
  }

  useEffect(() => {
    const mm = (e: MouseEvent) => dragging.current && onMove(e.clientX)
    const tm = (e: TouchEvent) => dragging.current && e.touches[0] && onMove(e.touches[0].clientX)
    const up = () => { dragging.current = false }
    window.addEventListener('mousemove', mm)
    window.addEventListener('touchmove', tm)
    window.addEventListener('mouseup', up)
    window.addEventListener('touchend', up)
    return () => {
      window.removeEventListener('mousemove', mm)
      window.removeEventListener('touchmove', tm)
      window.removeEventListener('mouseup', up)
      window.removeEventListener('touchend', up)
    }
  }, [])

  return (
    <figure className="acl-ba">
      <div
        ref={ref}
        className="acl-ba__stage"
        onMouseDown={(e) => { dragging.current = true; onMove(e.clientX) }}
        onTouchStart={(e) => { dragging.current = true; e.touches[0] && onMove(e.touches[0].clientX) }}
      >
        <div className="acl-ba__layer" style={{ background: after }}>
          <span className="acl-ba__chip">After · Repainted</span>
        </div>
        <div className="acl-ba__layer" style={{ background: before, clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <span className="acl-ba__chip acl-ba__chip--before">Before · As found</span>
        </div>
        <div className="acl-ba__divider" style={{ left: `${pos}%` }}>
          <div className="acl-ba__handle" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
            </svg>
          </div>
        </div>
      </div>
      <figcaption className="acl-ba__cap">
        <span>{loc}</span>
        <span className="acl-ba__note">{note}</span>
      </figcaption>
    </figure>
  )
}

export default function WorkSection() {
  return (
    <section className="acl-work" id="work">
      <div className="shell">
        <header className="acl-secthead acl-secthead--split">
          <div>
            <span className="acl-secthead__no">§ 02</span>
            <h2 className="acl-h2">A small selection<br />from the last two seasons.</h2>
          </div>
          <p className="acl-secthead__aside">
            Drag the swatch to compare before &amp; after. Every project documented with three
            rounds of photography — pre-prep, mid-coat, final reveal.
          </p>
        </header>

        <div className="acl-work__grid">
          {PROJECTS.map((p, i) => (
            <div key={i} className="acl-work__cell">
              <span className="acl-work__tag">{p.tag}</span>
              <BeforeAfter before={p.before} after={p.after} loc={p.loc} note={p.note} />
            </div>
          ))}
        </div>

        <div className="acl-work__foot">
          <a href="/gallery">View the full archive — 1,000+ projects →</a>
        </div>
      </div>
    </section>
  )
}
