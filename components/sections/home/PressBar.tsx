import { PRESS } from '@/data/homepage'

export default function PressBar() {
  return (
    <section className="acl-press" aria-label="Credentials">
      <div className="shell acl-press__row">
        {PRESS.map((p) => (
          <span key={p} className="acl-press__item">
            <span className="acl-press__bullet" aria-hidden="true" />
            {p}
          </span>
        ))}
      </div>
    </section>
  )
}
