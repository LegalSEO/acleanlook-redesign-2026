import type { AreaEditorial } from '@/data/areas-editorial'

export default function HouseProfile({ area }: { area: AreaEditorial }) {
  return (
    <section className="acl-houseprofile">
      <div className="shell">
        <header className="acl-houseprofile__head">
          <span className="acl-secthead__no">§ 02</span>
          <h2>What {area.name} houses actually need.</h2>
        </header>

        <ul className="acl-houseprofile__list">
          {area.whatTheseHomesNeed.map((item) => (
            <li key={item.t} className="acl-houseprofile__item">
              <h3>{item.t}</h3>
              <p>{item.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
