'use client'

import { useState } from 'react'
import { BUSINESS } from '@/lib/constants'

const SERVICES = ['Interior', 'Exterior', 'Commercial', 'Power Wash', 'Gutters', 'Handyman']
const SCOPES   = ['1–2 rooms', 'Whole home', 'Whole exterior', 'Commercial space', 'Just an inspection']
const WHENS    = ['This month', 'Within 2 months', 'Spring 2026', 'Flexible — I\'m researching']

type FormData = { service: string; scope: string; when: string; name: string; phone: string; email: string; note: string }

export default function EstimateSection() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<FormData>({ service: '', scope: '', when: '', name: '', phone: '', email: '', note: '' })

  const set = (k: keyof FormData, v: string) => setData((d) => ({ ...d, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStep(4)
  }

  return (
    <section className="acl-est" id="estimate">
      <div className="shell acl-est__grid">
        {/* Copy */}
        <div className="acl-est__copy">
          <span className="acl-secthead__no">§ 07</span>
          <h2 className="acl-h2">
            Tell us about the project.<br />
            We&apos;ll be in touch within two business hours.
          </h2>
          <p className="acl-est__lede">
            No bots, no call centers — Steve or one of the foremen reads every estimate request
            and answers personally. If you&apos;d rather just talk, the line below is on his phone.
          </p>

          <div className="acl-est__phoneblock">
            <span className="acl-est__phonelabel">Direct line</span>
            <a href={`tel:${BUSINESS.phoneRaw}`} className="acl-est__phone">{BUSINESS.phone}</a>
            <span className="acl-est__phonenote">Mon–Sat, 7am–7pm CT</span>
          </div>

          <ul className="acl-est__bullets">
            <li>Free, itemized written estimate</li>
            <li>Color consultation included</li>
            <li>Licensed · Bonded · Insured to $2M</li>
            <li>Two-year workmanship warranty</li>
          </ul>
        </div>

        {/* Form */}
        <form className="acl-est__form" onSubmit={handleSubmit}>
          <div className="acl-est__progress">
            {[0, 1, 2, 3].map((s) => (
              <span key={s} className={`acl-est__pdot${s <= step ? ' is-on' : ''}`} />
            ))}
            <span className="acl-est__pcount">{Math.min(step + 1, 4)} / 4</span>
          </div>

          {step === 0 && (
            <div className="acl-est__step">
              <label className="acl-est__q">What kind of work?</label>
              <div className="acl-est__chips">
                {SERVICES.map((s) => (
                  <button type="button" key={s}
                    className={`acl-chip${data.service === s ? ' is-on' : ''}`}
                    onClick={() => { set('service', s); setStep(1) }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="acl-est__step">
              <label className="acl-est__q">Roughly the scope?</label>
              <div className="acl-est__chips">
                {SCOPES.map((s) => (
                  <button type="button" key={s}
                    className={`acl-chip${data.scope === s ? ' is-on' : ''}`}
                    onClick={() => { set('scope', s); setStep(2) }}>
                    {s}
                  </button>
                ))}
              </div>
              <button type="button" className="acl-est__back" onClick={() => setStep(0)}>← back</button>
            </div>
          )}

          {step === 2 && (
            <div className="acl-est__step">
              <label className="acl-est__q">When are you hoping to start?</label>
              <div className="acl-est__chips">
                {WHENS.map((s) => (
                  <button type="button" key={s}
                    className={`acl-chip${data.when === s ? ' is-on' : ''}`}
                    onClick={() => { set('when', s); setStep(3) }}>
                    {s}
                  </button>
                ))}
              </div>
              <button type="button" className="acl-est__back" onClick={() => setStep(1)}>← back</button>
            </div>
          )}

          {step === 3 && (
            <div className="acl-est__step">
              <label className="acl-est__q">How can we reach you?</label>
              <div className="acl-est__fields">
                <input className="acl-input" placeholder="Your name" value={data.name} onChange={(e) => set('name', e.target.value)} />
                <input className="acl-input" placeholder="Phone" type="tel" value={data.phone} onChange={(e) => set('phone', e.target.value)} />
                <input className="acl-input" placeholder="Email" type="email" value={data.email} onChange={(e) => set('email', e.target.value)} />
                <textarea className="acl-input acl-input--area" placeholder="Anything else we should know? (optional)"
                  value={data.note} onChange={(e) => set('note', e.target.value)} rows={3} />
              </div>
              <div className="acl-est__row">
                <button type="button" className="acl-est__back" onClick={() => setStep(2)}>← back</button>
                <button type="submit" className="acl-btn acl-btn--ink">Send to Steve →</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="acl-est__done">
              <div className="acl-est__check" aria-hidden="true">✓</div>
              <h3>Thanks, {data.name || 'there'}.</h3>
              <p>
                Your request is on Steve&apos;s desk. Expect a reply on{' '}
                <strong>{data.phone || data.email || 'your contact'}</strong> within two business hours.
              </p>
              <div className="acl-est__summary">
                <div><span>Service</span><strong>{data.service}</strong></div>
                <div><span>Scope</span><strong>{data.scope}</strong></div>
                <div><span>Timeline</span><strong>{data.when}</strong></div>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
