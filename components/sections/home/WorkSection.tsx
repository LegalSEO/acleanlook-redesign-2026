'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { PROJECTS } from '@/data/homepage'

type BAProps = {
  before: string
  after: string
  beforeImg?: string
  afterImg?: string
  loc: string
  note: string
}

function BeforeAfter({ before, after, beforeImg, afterImg, loc, note }: BAProps) {
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

  const hasImages = !!(beforeImg && afterImg)
  const stageStyle = hasImages ? { aspectRatio: '4/3' } : {}

  return (
    <figure className="acl-ba">
      <div
        ref={ref}
        className="acl-ba__stage"
        style={stageStyle}
        onMouseDown={(e) => { dragging.current = true; onMove(e.clientX) }}
        onTouchStart={(e) => { dragging.current = true; e.touches[0] && onMove(e.touches[0].clientX) }}
      >
        {/* After layer (always full width underneath) */}
        <div className="acl-ba__layer" style={{ background: hasImages ? undefined : after }}>
          {hasImages && (
            <Image src={afterImg!} alt={`After: ${loc}`} fill style={{ objectFit: 'cover' }} sizes="(max-width:600px) 100vw, 50vw" />
          )}
          <span className="acl-ba__chip">After · Repainted</span>
        </div>
        {/* Before layer (clipped by drag position) */}
        <div
          className="acl-ba__layer"
          style={{ background: hasImages ? undefined : before, clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          {hasImages && (
            <Image src={beforeImg!} alt={`Before: ${loc}`} fill style={{ objectFit: 'cover' }} sizes="(max-width:600px) 100vw, 50vw" />
          )}
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
              <BeforeAfter
                before={p.before}
                after={p.after}
                beforeImg={p.beforeImg}
                afterImg={p.afterImg}
                loc={p.loc}
                note={p.note}
              />
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
