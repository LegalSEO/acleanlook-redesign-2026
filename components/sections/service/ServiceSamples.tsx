import type { SampleColor } from '@/data/services-editorial'

export default function ServiceSamples({ samples }: { samples: SampleColor[] }) {
  return (
    <section className="acl-samples">
      <div className="shell">
        <header className="acl-secthead acl-secthead--split">
          <div>
            <span className="acl-secthead__no">§ 03</span>
            <h2 className="acl-h2">
              Sample boards.
              <br />
              Not chips.
            </h2>
          </div>
          <p className="acl-secthead__aside">
            We deliver 12×12 boards painted in your candidate colors with the actual product,
            not paper chips. Live with them for a week — view in morning, midday, and lamp light
            before you commit.
          </p>
        </header>

        <div className="acl-samples__rail">
          {samples.map((s, i) => (
            <div key={i} className="acl-samples__card">
              <div className="acl-samples__board" style={{ background: s.c }}>
                <span className="acl-samples__edge" />
              </div>
              <div className="acl-samples__meta">
                <span className="acl-samples__name">{s.n}</span>
                <span className="acl-samples__code">{s.code}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
