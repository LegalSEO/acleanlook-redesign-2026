import type { AreaEditorial } from '@/data/areas-editorial'

const SHOP_PIN = { label: 'Our shop · Jefferson Park', left: '26%', top: '58%' }

export default function AreaMap({ area }: { area: AreaEditorial }) {
  return (
    <section className="acl-areamap">
      <div className="shell acl-areamap__inner">
        <div className="acl-areamap__copy">
          <span className="acl-secthead__no">§ 01</span>
          <h2>
            We know every block<br />
            in {area.name}.
          </h2>
          <p>
            Our crews have worked in {area.name} for {area.yearsServed}+ years. We know the permit
            requirements, the alley widths, the HOA schedules, and the weather windows
            that make exterior work possible here.
          </p>
          <ul className="acl-areamap__legend">
            <li className="acl-areamap__legend-item">
              <span className="acl-areamap__legend-dot" aria-hidden />
              {area.name} project locations
            </li>
            <li className="acl-areamap__legend-item">
              <span className="acl-areamap__legend-dot acl-areamap__legend-dot--shop" aria-hidden />
              Our shop (Jefferson Park)
            </li>
          </ul>
        </div>

        <div className="acl-areamap__art" aria-hidden>
          {/* Lake Michigan */}
          <div className="acl-areamap__lake" />
          {/* Chicago River suggestion */}
          <div className="acl-areamap__river" />
          {/* Street grid */}
          <div className="acl-areamap__streets">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={`h${i}`} className="acl-areamap__h" style={{ top: `${10 + i * 11}%` }} />
            ))}
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={`v${i}`} className="acl-areamap__v" style={{ left: `${15 + i * 12}%` }} />
            ))}
          </div>

          {/* Primary neighborhood pin(s) */}
          {area.mapPins.map((pin, i) => (
            <div
              key={i}
              className="acl-areamap__pin"
              style={{ left: pin.left, top: pin.top }}
            >
              <span className="acl-areamap__pindot" />
              {pin.primary && <span className="acl-areamap__pinring" />}
              <span className="acl-areamap__pinlabel">{pin.label}</span>
            </div>
          ))}

          {/* Shop pin */}
          <div
            className="acl-areamap__pin acl-areamap__pin--shop"
            style={{ left: SHOP_PIN.left, top: SHOP_PIN.top }}
          >
            <span className="acl-areamap__pindot" />
            <span className="acl-areamap__pinlabel">{SHOP_PIN.label}</span>
          </div>

          <span className="acl-areamap__compass">N ↑</span>
        </div>
      </div>
    </section>
  )
}
