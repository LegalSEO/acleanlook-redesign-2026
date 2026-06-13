import { PROCESS_STEPS } from '@/data/homepage'

export default function ProcessSection() {
  return (
    <section className="acl-process acl-process--dark" id="process">
      <div className="shell">
        <header className="acl-secthead">
          <span className="acl-secthead__no">§ 03</span>
          <h2 className="acl-h2">How a careful paint job actually goes.</h2>
        </header>

        <ol className="acl-process__list">
          {PROCESS_STEPS.map((s) => (
            <li key={s.n} className="acl-process__step">
              <span className="acl-process__num">{s.n}</span>
              <div>
                <h3 className="acl-process__title">{s.t}</h3>
                <p className="acl-process__copy">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
