/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakToggle, TweakSelect */
const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "ochre",
  "showMap": true,
  "showLocalProjects": true,
  "stickyCTA": true
}/*EDITMODE-END*/;

const BUSINESS = {
  name: "A Clean Look",
  phone: "(773) 419-1718",
  phoneRaw: "+17734191718",
  email: "steve@acleanlook.com",
};

// ─── Area data (Lincoln Park) ────────────────────────────────
const AREA = {
  slug: "lincoln-park",
  name: "Lincoln Park",
  region: "Chicago · 60614",
  number: "01",
  lat: 41.9214, lng: -87.6513,
  yearsServed: 31,
  projectsCompleted: 412,
  blurb: "Tree-lined streets, Victorian frame houses, greystones, and a heavy mix of two-flat conversions and high-end single-family rebuilds. We've painted Lincoln Park homes since 1994 — we know what these houses need.",
  whatTheseHomesNeed: [
    { t: "Heritage trim work", d: "1880s–1910s frame houses on Cleveland, Howe, Hudson — ornate window casings, cornices, and porch spindles that need careful prep, not a sprayer." },
    { t: "Greystone restoration", d: "Limestone façades on Fullerton, Belden, Webster. We don't paint the stone — but we re-finish the wood trim, soffits, and back-of-building exteriors that frame it." },
    { t: "Lakefront moisture", d: "East of Clark Street, lake-effect humidity and freeze-thaw cycles eat exterior coatings. We spec mildew-resistant primers and elastomeric sealants on the east-facing elevations." },
    { t: "Rear-house & coach houses", d: "Many Lincoln Park lots have a coach house behind the main building. We coordinate both jobs in one engagement, often with the same crew across two weekends." },
    { t: "HOA-friendly scheduling", d: "Condo conversions on Lincoln, Larrabee, and Orchard often have weekday-only or quiet-hours rules. We work to your association's calendar without surcharge." },
  ],
  recentProjects: [
    { addr: "2200 block · N. Cleveland", scope: "Full exterior repaint, 3-flat", color: "Hale Navy + Chantilly Lace", season: "Sept 2025" },
    { addr: "1700 block · N. Hudson",   scope: "Interior whole-home, 4 BR",   color: "Pale Oak + Wrought Iron",  season: "Aug 2025" },
    { addr: "2400 block · N. Lakeview", scope: "Trim & soffit refresh, SFH",   color: "Simply White + Iron Mountain", season: "July 2025" },
    { addr: "Webster & Halsted",         scope: "Commercial storefront, 2 stories", color: "Custom black + brass leaf", season: "May 2025" },
  ],
  serviceLines: [
    { svc: "Interior Painting",   demand: "very high",  note: "Whole-home repaints during real-estate listings, accent walls, ceiling refreshes." },
    { svc: "Exterior Painting",   demand: "high",       note: "Frame Victorians, dormers, soffits. Spring–early-fall booking only." },
    { svc: "Commercial Painting", demand: "moderate",   note: "Storefronts on Halsted, Webster, Armitage; office repaints in converted lofts." },
    { svc: "Power Washing",       demand: "high",       note: "Brick façades, limestone steps, back patios, garage pads." },
    { svc: "Gutter Cleaning",     demand: "very high",  note: "Heavy tree canopy means clogged gutters every fall — we do annual contracts." },
    { svc: "Handyman",            demand: "moderate",   note: "Carpentry repair, fence painting, deck staining — bundled with paint jobs." },
  ],
  testimonial: {
    text: "Steve and his crew repainted our Cleveland Avenue Victorian last fall — every soffit, every spindle, every dormer. They masked the stone, protected the gardens, and didn't leave a single drop on our brick walkway. The trim still looks new through this winter.",
    author: "Margaret H.",
    cred: "N. Cleveland Ave · Lincoln Park",
  },
  nearby: [
    { slug:"lakeview",        name:"Lakeview",        n:"02", dist:"0.7 mi N" },
    { slug:"old-town",        name:"Old Town",        n:"03", dist:"0.6 mi S" },
    { slug:"bucktown",        name:"Bucktown",        n:"04", dist:"1.2 mi W" },
    { slug:"wicker-park",     name:"Wicker Park",     n:"05", dist:"1.6 mi SW" },
  ],
  faqs: [
    { q:"Do you have a Lincoln Park crew, or do you travel here?",
      a:"Steve lives off Western and our shop is in Jefferson Park. We service Lincoln Park essentially every week of the painting season — there's almost always at least one crew on a Lincoln Park block when you call. Drive time is built into our pricing, not added on." },
    { q:"How early should I book a spring exterior?",
      a:"Lincoln Park's prime exterior window is mid-April through late October. We start booking in January and the calendar fills by mid-March. If you want first half of May, call by end of February." },
    { q:"Do you handle the rear of the building too?",
      a:"Yes. Most Lincoln Park exteriors include alley-facing back walls, garage doors, and service stairs. We quote front and back together and don't charge extra for alley access." },
    { q:"My condo association requires proof of insurance — can you provide it?",
      a:"Yes. We carry $2M general liability and $1M workers comp. We can email a certificate of insurance directly to your association manager within an hour, naming them as additional insured if required." },
  ],
};

// ─── Pieces ──────────────────────────────────────────────────
function HousePlaceholder({ label, ratio="3/4" }) {
  const stripes = "repeating-linear-gradient(135deg, #efe9dd 0 12px, #e6dfd0 12px 24px)";
  return (
    <div className="acl-placeholder" style={{ aspectRatio: ratio, background: stripes }}>
      <span className="acl-placeholder__tag">{label}</span>
    </div>
  );
}

function TopBar() {
  return (
    <div className="acl-topbar">
      <div className="acl-shell acl-topbar__row">
        <span className="acl-topbar__pill">
          <span className="acl-topbar__dot" />
          Booking spring 2026 exteriors — limited slots
        </span>
        <div className="acl-topbar__links">
          <a href={`tel:${BUSINESS.phoneRaw}`}>{BUSINESS.phone}</a>
          <span className="acl-topbar__sep">·</span>
          <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="acl-header">
      <div className="acl-shell acl-header__row">
        <a href="A Clean Look - Homepage.html" className="acl-logo">
          <span className="acl-logo__mark" aria-hidden="true">
            <span className="acl-logo__bar acl-logo__bar--a" />
            <span className="acl-logo__bar acl-logo__bar--b" />
            <span className="acl-logo__bar acl-logo__bar--c" />
          </span>
          <span className="acl-logo__type">
            <span className="acl-logo__name">A Clean Look</span>
            <span className="acl-logo__tag">Painters · Chicago · Est. 1994</span>
          </span>
        </a>
        <nav className="acl-nav" aria-label="Primary">
          <a href="A Clean Look - Homepage.html#work">Work</a>
          <a href="#">Services</a>
          <a href="A Clean Look - Homepage.html#process">Process</a>
          <a href="#" className="is-current">Areas</a>
          <a href="A Clean Look - Homepage.html#reviews">Reviews</a>
          <a href="#estimate">Estimate</a>
        </nav>
        <div className="acl-header__cta">
          <a href={`tel:${BUSINESS.phoneRaw}`} className="acl-link-quiet">{BUSINESS.phone}</a>
          <a href="#estimate" className="acl-btn acl-btn--ink">Free estimate</a>
        </div>
      </div>
    </header>
  );
}

function Breadcrumb() {
  return (
    <nav className="acl-crumbs" aria-label="Breadcrumb">
      <div className="acl-shell acl-crumbs__row">
        <a href="A Clean Look - Homepage.html">Home</a>
        <span className="acl-crumbs__sep">/</span>
        <a href="#">Areas</a>
        <span className="acl-crumbs__sep">/</span>
        <span className="acl-crumbs__current">{AREA.name}</span>
      </div>
    </nav>
  );
}

// ─── Hero ────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="acl-areahero">
      <div className="acl-shell acl-areahero__grid">
        <div className="acl-areahero__copy">
          <div className="acl-areahero__meta">
            <span className="acl-areahero__num">№ {AREA.number}</span>
            <span className="acl-areahero__sep" />
            <span className="acl-areahero__kicker">Service Area · {AREA.region}</span>
          </div>

          <h1 className="acl-areahero__title">
            <span>Painters</span>
            <span>who actually</span>
            <span className="acl-areahero__title--ink">know {AREA.name}.</span>
          </h1>

          <p className="acl-areahero__lede">{AREA.blurb}</p>

          <div className="acl-areahero__ctas">
            <a href="#estimate" className="acl-btn acl-btn--ink acl-btn--lg">
              Quote my {AREA.name} home
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>
            <a href={`tel:${BUSINESS.phoneRaw}`} className="acl-btn acl-btn--ghost acl-btn--lg">
              {BUSINESS.phone}
            </a>
          </div>

          <dl className="acl-areahero__stats">
            <div><dt>Serving since</dt><dd>1994</dd></div>
            <div><dt>{AREA.name} projects</dt><dd>{AREA.projectsCompleted}+</dd></div>
            <div><dt>Years on these blocks</dt><dd>{AREA.yearsServed}</dd></div>
            <div><dt>Avg response</dt><dd>&lt; 24h</dd></div>
          </dl>
        </div>

        <aside className="acl-areahero__plate">
          <HousePlaceholder label="HERO · Cleveland Ave Victorian repaint, Sept 2025" ratio="4/5" />
          <div className="acl-areahero__caption">
            <span className="acl-areahero__capnum">№ 142</span>
            <span className="acl-areahero__captext">
              Recent project on the 2200 block of N. Cleveland Avenue. Full exterior, soffit, and porch repaint in <em>Hale Navy</em> with <em>Chantilly Lace</em> trim — three-coat system designed for east-facing lake exposure.
            </span>
          </div>
        </aside>
      </div>
    </section>
  );
}

// ─── Map / context ───────────────────────────────────────────
function NeighborhoodMap() {
  return (
    <section className="acl-areamap">
      <div className="acl-shell">
        <header className="acl-secthead acl-secthead--split">
          <div>
            <span className="acl-secthead__no">§ 01</span>
            <h2 className="acl-h2">{AREA.name}, mapped.</h2>
          </div>
          <p className="acl-secthead__aside">
            Bordered by Diversey to the north, Armitage to the south, the Chicago River to the west, and Lake Michigan to the east. Population ~67,000. Median home value ~$1.1M. Heavy frame-house stock from the 1880s onward.
          </p>
        </header>

        <div className="acl-areamap__plate">
          <div className="acl-areamap__art" aria-hidden="true">
            {/* Stylized map composition — pure CSS streets */}
            <div className="acl-areamap__lake" />
            <div className="acl-areamap__river" />
            <div className="acl-areamap__streets">
              {Array.from({length: 8}).map((_,i)=>(
                <span key={'h'+i} className="acl-areamap__h" style={{top: `${10 + i*11}%`}} />
              ))}
              {Array.from({length: 6}).map((_,i)=>(
                <span key={'v'+i} className="acl-areamap__v" style={{left: `${15 + i*12}%`}} />
              ))}
            </div>
            <div className="acl-areamap__pin" style={{left:"42%", top:"38%"}}>
              <span className="acl-areamap__pindot" />
              <span className="acl-areamap__pinring" />
              <span className="acl-areamap__pinlabel">N. Cleveland · 2200</span>
            </div>
            <div className="acl-areamap__pin acl-areamap__pin--alt" style={{left:"30%", top:"58%"}}>
              <span className="acl-areamap__pindot" />
              <span className="acl-areamap__pinlabel">Hudson · 1700</span>
            </div>
            <div className="acl-areamap__pin acl-areamap__pin--alt" style={{left:"58%", top:"24%"}}>
              <span className="acl-areamap__pindot" />
              <span className="acl-areamap__pinlabel">Lakeview · 2400</span>
            </div>
            <div className="acl-areamap__pin acl-areamap__pin--alt" style={{left:"38%", top:"68%"}}>
              <span className="acl-areamap__pindot" />
              <span className="acl-areamap__pinlabel">Webster &amp; Halsted</span>
            </div>
            <span className="acl-areamap__compass">N ↑</span>
          </div>

          <ul className="acl-areamap__legend">
            <li><span className="acl-areamap__sw acl-areamap__sw--acc" /> Recent project</li>
            <li><span className="acl-areamap__sw acl-areamap__sw--ink" /> Active estimate</li>
            <li><span className="acl-areamap__sw acl-areamap__sw--lake" /> Lake Michigan</li>
            <li><span className="acl-areamap__sw acl-areamap__sw--river" /> N. Branch River</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

// ─── What these homes need ──────────────────────────────────
function HouseProfile() {
  return (
    <section className="acl-houseprofile">
      <div className="acl-shell acl-houseprofile__grid">
        <aside className="acl-houseprofile__rail">
          <span className="acl-secthead__no">§ 02</span>
          <h2 className="acl-h2">What {AREA.name} houses actually need.</h2>
          <p className="acl-houseprofile__aside">
            We've painted enough Lincoln Park homes to know the patterns — what fails, what lasts, and what the building stock asks of a paint job.
          </p>
        </aside>

        <ol className="acl-houseprofile__list">
          {AREA.whatTheseHomesNeed.map((item,i)=>(
            <li key={i} className="acl-houseprofile__item">
              <span className="acl-houseprofile__num">{String(i+1).padStart(2,"0")}</span>
              <div>
                <h3>{item.t}</h3>
                <p>{item.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ─── Recent local projects ──────────────────────────────────
function RecentProjects() {
  return (
    <section className="acl-localprojects">
      <div className="acl-shell">
        <header className="acl-secthead acl-secthead--split">
          <div>
            <span className="acl-secthead__no">§ 03</span>
            <h2 className="acl-h2">Recently, in {AREA.name}.</h2>
          </div>
          <p className="acl-secthead__aside">
            A sample of {AREA.name} projects from this season. Block numbers, not exact addresses, out of respect for our clients.
          </p>
        </header>

        <div className="acl-localprojects__grid">
          {AREA.recentProjects.map((p,i)=>(
            <article key={i} className="acl-localprojects__card">
              <HousePlaceholder label={`PROJECT · ${p.addr}`} ratio="4/3" />
              <div className="acl-localprojects__meta">
                <span className="acl-localprojects__season">{p.season}</span>
                <h3>{p.addr}</h3>
                <p className="acl-localprojects__scope">{p.scope}</p>
                <p className="acl-localprojects__color"><span>Color:</span> {p.color}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Service demand table ───────────────────────────────────
function ServiceDemand() {
  const dotForDemand = (d) => d === "very high" ? 4 : d === "high" ? 3 : 2;
  return (
    <section className="acl-servicedemand">
      <div className="acl-shell">
        <header className="acl-secthead">
          <span className="acl-secthead__no">§ 04</span>
          <h2 className="acl-h2">What we do most in {AREA.name}.</h2>
        </header>

        <div className="acl-servicedemand__table">
          <div className="acl-servicedemand__head">
            <span>Service</span>
            <span>Local demand</span>
            <span>What that looks like</span>
            <span></span>
          </div>
          {AREA.serviceLines.map((s,i)=>(
            <div key={i} className="acl-servicedemand__row">
              <span className="acl-servicedemand__svc">{s.svc}</span>
              <span className="acl-servicedemand__demand">
                {Array.from({length:4}).map((_,j)=>(
                  <span
                    key={j}
                    className={`acl-servicedemand__dot ${j < dotForDemand(s.demand) ? "is-on" : ""}`}
                  />
                ))}
                <span className="acl-servicedemand__demandlbl">{s.demand}</span>
              </span>
              <span className="acl-servicedemand__note">{s.note}</span>
              <a href="#" className="acl-servicedemand__more">
                Read →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Local testimonial ──────────────────────────────────────
function LocalQuote() {
  return (
    <section className="acl-localquote">
      <div className="acl-shell acl-localquote__grid">
        <span className="acl-localquote__opener">"</span>
        <blockquote>
          <p>{AREA.testimonial.text}</p>
          <footer>
            <span className="acl-localquote__author">{AREA.testimonial.author}</span>
            <span className="acl-localquote__cred">{AREA.testimonial.cred}</span>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

// ─── FAQ ────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="acl-faq acl-faq--area">
      <div className="acl-shell">
        <header className="acl-secthead">
          <span className="acl-secthead__no">§ 05</span>
          <h2 className="acl-h2">{AREA.name} questions, answered.</h2>
        </header>
        <ul className="acl-faq__list">
          {AREA.faqs.map((f,i)=>(
            <li key={i} className={`acl-faq__item ${open===i?"is-open":""}`}>
              <button className="acl-faq__q" onClick={()=>setOpen(open===i?-1:i)}>
                <span className="acl-faq__qnum">{String(i+1).padStart(2,"0")}</span>
                <span className="acl-faq__qtext">{f.q}</span>
                <span className="acl-faq__caret" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 9l6 6 6-6"/></svg>
                </span>
              </button>
              <div className="acl-faq__a">
                <p>{f.a}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ─── Estimate strip ─────────────────────────────────────────
function EstimateStrip() {
  return (
    <section className="acl-svccta" id="estimate">
      <div className="acl-shell acl-svccta__row">
        <div>
          <span className="acl-secthead__no">§ 06</span>
          <h2 className="acl-h2">A free estimate, on your block.</h2>
          <p className="acl-svccta__lede">
            We'll come to your {AREA.name} home, walk every wall and surface with you, and email a written, itemized quote within 48 hours. No obligation, no pressure. Just a number.
          </p>
        </div>
        <div className="acl-svccta__actions">
          <a href="A Clean Look - Homepage.html#estimate" className="acl-btn acl-btn--paper acl-btn--lg">
            Book a free estimate
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
          <a href={`tel:${BUSINESS.phoneRaw}`} className="acl-svccta__phone">
            <span>Or call Steve directly</span>
            <strong>{BUSINESS.phone}</strong>
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Nearby areas ───────────────────────────────────────────
function NearbyAreas() {
  return (
    <section className="acl-related">
      <div className="acl-shell">
        <header className="acl-secthead">
          <span className="acl-secthead__no">§ 07</span>
          <h2 className="acl-h2">We work nearby, too.</h2>
        </header>
        <div className="acl-related__grid acl-related__grid--4">
          {AREA.nearby.map(r=>(
            <a key={r.slug} className="acl-related__card" href="#">
              <span className="acl-related__num">№ {r.n}</span>
              <h3>{r.name}</h3>
              <span className="acl-related__dist">{r.dist}</span>
              <span className="acl-related__arrow">
                Visit area
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function StickyBar({ visible }) {
  if (!visible) return null;
  return (
    <div className="acl-sticky">
      <div className="acl-shell acl-sticky__row">
        <div className="acl-sticky__copy">
          <span className="acl-sticky__label">{AREA.name} painters · since 1994</span>
          <span className="acl-sticky__sub">Free estimate within 48 hours</span>
        </div>
        <div className="acl-sticky__actions">
          <a href={`tel:${BUSINESS.phoneRaw}`} className="acl-sticky__phone">{BUSINESS.phone}</a>
          <a href="#estimate" className="acl-btn acl-btn--ink acl-btn--sm">Quote my home</a>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="acl-footer">
      <div className="acl-shell">
        <div className="acl-footer__top">
          <div>
            <a href="A Clean Look - Homepage.html" className="acl-logo acl-logo--light">
              <span className="acl-logo__mark" aria-hidden="true">
                <span className="acl-logo__bar acl-logo__bar--a" />
                <span className="acl-logo__bar acl-logo__bar--b" />
                <span className="acl-logo__bar acl-logo__bar--c" />
              </span>
              <span className="acl-logo__type">
                <span className="acl-logo__name">A Clean Look</span>
                <span className="acl-logo__tag">Painters · Chicago · Est. 1994</span>
              </span>
            </a>
            <p className="acl-footer__pitch">
              A small, fully-insured Chicago painting outfit. We answer our phone, show up on time, and leave the place cleaner than we found it.
            </p>
          </div>
          <div className="acl-footer__cols">
            <div>
              <h4>Services</h4>
              <ul>
                <li><a href="A Clean Look - Interior Painting.html">Interior Painting</a></li>
                <li><a href="#">Exterior Painting</a></li>
                <li><a href="#">Commercial</a></li>
                <li><a href="#">Power Washing</a></li>
              </ul>
            </div>
            <div>
              <h4>Areas</h4>
              <ul>
                <li><a href="#">Lincoln Park</a></li>
                <li><a href="#">Lakeview</a></li>
                <li><a href="#">Wicker Park</a></li>
                <li><a href="#">North Shore</a></li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul>
                <li><a href={`tel:${BUSINESS.phoneRaw}`}>{BUSINESS.phone}</a></li>
                <li><a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></li>
                <li>5444 N. La Crosse Ave, Chicago, IL 60630</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="acl-footer__bot">
          <span>© {new Date().getFullYear()} A Clean Look Painting LLC · IL Lic. PC.0001994</span>
          <span className="acl-footer__sep">·</span>
          <a href="#">Privacy</a>
          <span className="acl-footer__sep">·</span>
          <a href="#">Terms</a>
          <span className="acl-footer__by">Painted in Chicago, since 1994.</span>
        </div>
      </div>
    </footer>
  );
}

// ─── App ────────────────────────────────────────────────────
function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const accents = {
    ochre:  { accent:"#b9842b", accentSoft:"#e9d6a8" },
    brick:  { accent:"#a83a1f", accentSoft:"#e8c5b8" },
    forest: { accent:"#3a5a45", accentSoft:"#cfd9cf" },
    navy:   { accent:"#1f3a5f", accentSoft:"#c9d3e2" },
  };
  const a = accents[tweaks.accent] || accents.ochre;
  useEffect(()=>{
    const r = document.documentElement;
    r.style.setProperty("--acl-accent", a.accent);
    r.style.setProperty("--acl-accent-soft", a.accentSoft);
  }, [tweaks.accent]);

  return (
    <div className="acl-root">
      <TopBar />
      <Header />
      <Breadcrumb />
      <Hero />
      {tweaks.showMap && <NeighborhoodMap />}
      <HouseProfile />
      {tweaks.showLocalProjects && <RecentProjects />}
      <ServiceDemand />
      <LocalQuote />
      <FAQ />
      <EstimateStrip />
      <NearbyAreas />
      <Footer />
      <StickyBar visible={tweaks.stickyCTA} />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Palette">
          <TweakRadio
            label="Accent"
            value={tweaks.accent}
            onChange={(v)=>setTweak("accent", v)}
            options={[
              { value:"ochre",  label:"Ochre" },
              { value:"brick",  label:"Brick" },
              { value:"forest", label:"Forest" },
              { value:"navy",   label:"Navy" },
            ]}
          />
        </TweakSection>
        <TweakSection title="Sections">
          <TweakToggle label="Neighborhood map" value={tweaks.showMap} onChange={(v)=>setTweak("showMap", v)} />
          <TweakToggle label="Recent local projects" value={tweaks.showLocalProjects} onChange={(v)=>setTweak("showLocalProjects", v)} />
          <TweakToggle label="Sticky bottom CTA" value={tweaks.stickyCTA} onChange={(v)=>setTweak("stickyCTA", v)} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
