import { PALETTE } from '@/data/homepage'

export default function PaletteSection() {
  return (
    <section className="acl-palette" id="palette">
      <div className="shell">
        <header className="acl-secthead acl-secthead--split">
          <div>
            <span className="acl-secthead__no">§ 04</span>
            <h2 className="acl-h2">Eight colors we keep coming back to.</h2>
          </div>
          <p className="acl-secthead__aside">
            A short list of paints that quietly do their job in Chicago light — across cloudy
            Februarys and bright Julys. Free color consult included with every estimate.
          </p>
        </header>

        <div className="acl-palette__grid">
          {PALETTE.map((s, i) => (
            <article key={s.code} className="acl-palette__card">
              <div className="acl-palette__chip" style={{ background: s.hex }}>
                <span className="acl-palette__num">№ {String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="acl-palette__meta">
                <h3>{s.name}</h3>
                <span className="acl-palette__code">{s.code}</span>
                <p>{s.note}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
