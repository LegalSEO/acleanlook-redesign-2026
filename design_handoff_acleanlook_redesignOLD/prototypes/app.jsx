/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakToggle, TweakColor, TweakSlider */
const { useState, useEffect, useRef } = React;

// ─────────────────────────────────────────────────────────────
// DEFAULTS
// ─────────────────────────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroStyle": "editorial",
  "accent": "ochre",
  "typePair": "serif-sans",
  "showSwatchRail": true,
  "darkSection": true
}/*EDITMODE-END*/;

// ─────────────────────────────────────────────────────────────
// DATA  (sourced from the project's lib/constants.ts)
// ─────────────────────────────────────────────────────────────
const BUSINESS = {
  name: "A Clean Look",
  phone: "(773) 419-1718",
  phoneRaw: "+17734191718",
  email: "steve@acleanlook.com",
  founded: 1994,
  yearsInBusiness: 30,
  owner: "Steve",
  address: "5444 N. La Crosse Ave, Chicago, IL 60630",
};

const SERVICES = [
  { n: "01", title: "Interior Painting", blurb: "Single accent walls to whole-home refreshes — drywall prep, trim, ceilings, cabinetry.", spec: "Benjamin Moore · Sherwin-Williams" },
  { n: "02", title: "Exterior Painting", blurb: "Built for Chicago weather. Proper prep, breathable coatings, lifetime warranty paints.", spec: "5–7 year finish life" },
  { n: "03", title: "Commercial", blurb: "Offices, retail, multi-unit. After-hours scheduling so your business never closes.", spec: "Insured to $2M" },
  { n: "04", title: "Power Washing", blurb: "Driveways, decks, brick, and siding. Soft-wash on delicate surfaces.", spec: "Eco-safe detergents" },
  { n: "05", title: "Gutter Cleaning", blurb: "Spring & fall service routes. Inspection report with every visit.", spec: "Hand-cleared, flushed" },
  { n: "06", title: "Handyman", blurb: "Drywall repair, carpentry, caulking, fixture install. The small fixes between big jobs.", spec: "By the hour or job" },
];

const NEIGHBORHOODS = [
  ["Lincoln Park", "60614"], ["Lakeview", "60657"], ["Bucktown", "60647"],
  ["Logan Square", "60647"], ["Andersonville", "60640"], ["West Loop", "60607"],
  ["Wicker Park", "60622"], ["Old Town", "60610"], ["Roscoe Village", "60618"],
  ["Edison Park", "60631"], ["Sauganash", "60646"], ["Forest Glen", "60630"],
];

const SUBURBS = ["Evanston","Wilmette","Winnetka","Kenilworth","Glencoe","Highland Park","Lake Forest","Northbrook","Glenview","Skokie","Park Ridge","Des Plaines"];

const REVIEWS = [
  { name: "Christina S.", area: "Lincoln Park", project: "Whole-home interior", rating: 5,
    quote: "Steve walked us through every coat. The trim work alone is worth the call — the kind of detail you only get from someone who's been at it for thirty years." },
  { name: "Joe K.", area: "Wilmette", project: "Exterior repaint", rating: 5,
    quote: "They worked around three rain delays without a complaint and the house has never looked better. Cleaned up so well I couldn't tell they'd been there." },
  { name: "Stellar A.", area: "West Loop", project: "Office build-out", rating: 5,
    quote: "Painted our 4,200 sq ft office on nights and weekends. Monday morning, business as usual. That's a real contractor." },
  { name: "M. Donovan", area: "Andersonville", project: "Cabinet refinish", rating: 5,
    quote: "I'd been quoted twice as much by a 'cabinet specialist'. Steve's crew did it better and it's held up beautifully through two Chicago winters." },
];

const PROJECTS = [
  { tag: "Exterior · 2025", loc: "Greystone, Lincoln Park",  before: "#9a8a72", after: "#1f2d3d", note: "Limestone trim, navy clapboard" },
  { tag: "Interior · 2025", loc: "Townhouse, Bucktown",      before: "#c8b89a", after: "#e8e3d8", note: "Warm white, walnut trim" },
  { tag: "Exterior · 2024", loc: "Tudor, Wilmette",          before: "#7a6b58", after: "#2b2a26", note: "Dark slate, cream stucco" },
  { tag: "Interior · 2024", loc: "Loft, West Loop",          before: "#b9b0a1", after: "#252321", note: "Library black, brass" },
  { tag: "Cabinet · 2024",  loc: "Kitchen, Andersonville",   before: "#e2d6bc", after: "#3a4a3e", note: "Forest green, gold pulls" },
  { tag: "Exterior · 2023", loc: "Bungalow, Sauganash",      before: "#8a8268", after: "#5b3d2e", note: "Brick red, ivory accent" },
];

const PRESS = [
  "Benjamin Moore Preferred Contractor",
  "BBB · A+ Accredited",
  "Houzz · Best of Service 2024",
  "Yelp · 5★ Local Favorite",
  "Licensed · Bonded · Insured",
];

// ─────────────────────────────────────────────────────────────
// LITTLE PIECES
// ─────────────────────────────────────────────────────────────
function Stars({ n=5, size=12 }) {
  return (
    <span className="acl-stars" aria-label={`${n} out of 5 stars`}>
      {Array.from({length:n}).map((_,i)=>(
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18.2 22 12 18.3 5.8 22l1.7-7.2L2 10l7.1-1.1L12 2z"/>
        </svg>
      ))}
    </span>
  );
}

function PaintSwatch({ color, label, sub }) {
  return (
    <div className="acl-swatch">
      <div className="acl-swatch__chip" style={{ background: color }} />
      <div className="acl-swatch__meta">
        <span className="acl-swatch__label">{label}</span>
        <span className="acl-swatch__sub">{sub}</span>
      </div>
    </div>
  );
}

// Asymmetric "house portrait" placeholder — striped neutral with monospace caption.
function HousePlaceholder({ label, ratio="3/4", tone="warm" }) {
  const stripes = tone === "warm"
    ? "repeating-linear-gradient(135deg, #efe9dd 0 12px, #e6dfd0 12px 24px)"
    : "repeating-linear-gradient(135deg, #1d2a3a 0 12px, #1a2535 12px 24px)";
  return (
    <div className="acl-placeholder" style={{ aspectRatio: ratio, background: stripes }}>
      <span className="acl-placeholder__tag">{label}</span>
    </div>
  );
}

// Before/after vertical drag slider, swatch-style (color block, not stock photo)
function BeforeAfter({ before, after, beforeLabel, afterLabel, location, note }) {
  const [pos, setPos] = useState(50);
  const ref = useRef(null);
  const dragging = useRef(false);
  const onMove = (clientX) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos(Math.max(2, Math.min(98, ((clientX - r.left) / r.width) * 100)));
  };
  useEffect(() => {
    const mm = (e) => dragging.current && onMove(e.clientX);
    const tm = (e) => dragging.current && e.touches[0] && onMove(e.touches[0].clientX);
    const up = () => { dragging.current = false; };
    window.addEventListener("mousemove", mm);
    window.addEventListener("touchmove", tm);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mousemove", mm);
      window.removeEventListener("touchmove", tm);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchend", up);
    };
  }, []);
  return (
    <figure className="acl-ba">
      <div
        ref={ref}
        className="acl-ba__stage"
        onMouseDown={(e)=>{dragging.current=true; onMove(e.clientX);}}
        onTouchStart={(e)=>{dragging.current=true; e.touches[0] && onMove(e.touches[0].clientX);}}
      >
        <div className="acl-ba__layer" style={{ background: after }}>
          <span className="acl-ba__chip acl-ba__chip--after">After · {afterLabel}</span>
        </div>
        <div className="acl-ba__layer" style={{ background: before, clipPath:`inset(0 ${100-pos}% 0 0)` }}>
          <span className="acl-ba__chip acl-ba__chip--before">Before · {beforeLabel}</span>
        </div>
        <div className="acl-ba__divider" style={{ left:`${pos}%` }}>
          <div className="acl-ba__handle">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 6l-6 6 6 6M15 6l6 6-6 6"/>
            </svg>
          </div>
        </div>
      </div>
      <figcaption className="acl-ba__cap">
        <span>{location}</span>
        <span className="acl-ba__note">{note}</span>
      </figcaption>
    </figure>
  );
}

function TickerRow() {
  const items = ["Interior", "Exterior", "Commercial", "Power Wash", "Gutters", "Handyman", "Free Estimates", "Since 1994"];
  return (
    <div className="acl-ticker" aria-hidden="true">
      <div className="acl-ticker__track">
        {[...items, ...items, ...items].map((t,i)=>(
          <span key={i} className="acl-ticker__item">
            <span className="acl-ticker__dot" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTIONS
// ─────────────────────────────────────────────────────────────
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
  const [open, setOpen] = useState(false);
  return (
    <header className="acl-header">
      <div className="acl-shell acl-header__row">
        <a href="#top" className="acl-logo">
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
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#areas">Areas</a>
          <a href="#reviews">Reviews</a>
          <a href="#estimate">Estimate</a>
        </nav>
        <div className="acl-header__cta">
          <a href={`tel:${BUSINESS.phoneRaw}`} className="acl-link-quiet">{BUSINESS.phone}</a>
          <a href="#estimate" className="acl-btn acl-btn--ink">Free estimate</a>
        </div>
        <button className="acl-burger" onClick={()=>setOpen(!open)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>
      {open && (
        <div className="acl-mobilenav">
          {["Work","Services","Process","Areas","Reviews","Estimate"].map(l=>(
            <a key={l} href={`#${l.toLowerCase()}`} onClick={()=>setOpen(false)}>{l}</a>
          ))}
        </div>
      )}
    </header>
  );
}

function HeroEditorial({ showSwatchRail }) {
  return (
    <section className="acl-hero" id="top">
      <div className="acl-shell acl-hero__grid">
        <div className="acl-hero__copy">
          <div className="acl-eyebrow">
            <span className="acl-eyebrow__rule" />
            <span>Vol. 30 — A Chicago Painter's Almanac</span>
          </div>

          <h1 className="acl-h1">
            <span className="acl-h1__line">A clean,</span>
            <span className="acl-h1__line acl-h1__line--ink">careful coat</span>
            <span className="acl-h1__line">on the city we love.</span>
          </h1>

          <p className="acl-lede">
            For three decades, Steve and crew have painted Chicago bungalows, North Shore Tudors, and West Loop offices — one room, one season, one careful coat at a time. <span className="acl-lede__strong">Free estimates within 48&nbsp;hours.</span>
          </p>

          <div className="acl-hero__ctas">
            <a href="#estimate" className="acl-btn acl-btn--ink acl-btn--lg">
              Book a free estimate
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>
            <a href={`tel:${BUSINESS.phoneRaw}`} className="acl-btn acl-btn--ghost acl-btn--lg">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.86 19.86 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg>
              {BUSINESS.phone}
            </a>
          </div>

          <dl className="acl-hero__stats">
            <div><dt>Years</dt><dd>30+</dd></div>
            <div><dt>Homes</dt><dd>1,000+</dd></div>
            <div><dt>Stars</dt><dd>5.0</dd></div>
            <div><dt>Insured</dt><dd>$2M</dd></div>
          </dl>
        </div>

        <aside className="acl-hero__plate">
          <HousePlaceholder label="HERO · Two-flat, Logan Square — exterior repaint, slate + bone" ratio="4/5" />
          <div className="acl-hero__caption">
            <span className="acl-hero__capnum">№ 142</span>
            <span className="acl-hero__captext">
              The Logan Square Two-Flat — repainted October 2025. Three coats Aura Exterior in <em>Hale Navy</em> over Benjamin Moore primer; trim in <em>Simply White</em>.
            </span>
          </div>

          {showSwatchRail && (
            <div className="acl-hero__rail">
              <PaintSwatch color="#1f2d3d" label="Hale Navy" sub="HC-154" />
              <PaintSwatch color="#efe9dd" label="Simply White" sub="OC-117" />
              <PaintSwatch color="#8b3b1e" label="Brick Red" sub="CC-86" />
            </div>
          )}
        </aside>
      </div>

      <TickerRow />
    </section>
  );
}

function HeroBold() {
  return (
    <section className="acl-hero acl-hero--bold" id="top">
      <div className="acl-shell">
        <div className="acl-eyebrow acl-eyebrow--center">
          <span className="acl-eyebrow__rule" />
          <span>Chicago · Since 1994</span>
          <span className="acl-eyebrow__rule" />
        </div>
        <h1 className="acl-h1 acl-h1--center">
          Painters who treat <span className="acl-h1__ink">your home</span> like
          <br/>they treat <span className="acl-h1__ink">their own.</span>
        </h1>
        <p className="acl-lede acl-lede--center">
          Interior. Exterior. Commercial. Three decades of careful work across Chicago and the North Shore — with a crew that shows up when they say they will, and cleans up before they leave.
        </p>
        <div className="acl-hero__ctas acl-hero__ctas--center">
          <a href="#estimate" className="acl-btn acl-btn--ink acl-btn--lg">Book a free estimate</a>
          <a href={`tel:${BUSINESS.phoneRaw}`} className="acl-btn acl-btn--ghost acl-btn--lg">{BUSINESS.phone}</a>
        </div>
      </div>
      <div className="acl-hero__bigplate">
        <HousePlaceholder label="HERO · Wide exterior plate — Tudor, Wilmette — slate / cream" ratio="21/9" />
      </div>
      <TickerRow />
    </section>
  );
}

function PressBar() {
  return (
    <section className="acl-press">
      <div className="acl-shell acl-press__row">
        {PRESS.map((p,i)=>(
          <span className="acl-press__item" key={i}>
            <span className="acl-press__bullet" />
            {p}
          </span>
        ))}
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="acl-services" id="services">
      <div className="acl-shell">
        <header className="acl-secthead">
          <span className="acl-secthead__no">§ 01</span>
          <h2 className="acl-h2">One crew, six trades.<br/><span className="acl-soft">Painting first — everything else, while we're already there.</span></h2>
        </header>

        <div className="acl-services__grid">
          {SERVICES.map((s,i)=>(
            <article className="acl-service" key={s.n}>
              <div className="acl-service__top">
                <span className="acl-service__num">{s.n}</span>
                <span className="acl-service__spec">{s.spec}</span>
              </div>
              <h3 className="acl-service__title">{s.title}</h3>
              <p className="acl-service__blurb">{s.blurb}</p>
              <a className="acl-service__link" href="#estimate">
                Quote this <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkSection() {
  return (
    <section className="acl-work" id="work">
      <div className="acl-shell">
        <header className="acl-secthead acl-secthead--split">
          <div>
            <span className="acl-secthead__no">§ 02</span>
            <h2 className="acl-h2">A small selection<br/>from the last two seasons.</h2>
          </div>
          <p className="acl-secthead__aside">
            Drag the swatch to compare before & after. Every project documented with three rounds of photography — pre-prep, mid-coat, final reveal.
          </p>
        </header>

        <div className="acl-work__grid">
          {PROJECTS.map((p,i)=>(
            <div key={i} className={`acl-work__cell acl-work__cell--${i%3}`}>
              <span className="acl-work__tag">{p.tag}</span>
              <BeforeAfter
                before={p.before}
                after={p.after}
                beforeLabel="As found"
                afterLabel="Repainted"
                location={p.loc}
                note={p.note}
              />
            </div>
          ))}
        </div>

        <div className="acl-work__foot">
          <a href="#" className="acl-link-quiet">View the full archive — 1,000+ projects →</a>
        </div>
      </div>
    </section>
  );
}

function ProcessSection({ darkSection }) {
  const steps = [
    { n:"I",   t:"Walk-through",  d:"Steve visits the property — usually within 48 hours. Measures, photographs, listens. No sales pitch." },
    { n:"II",  t:"Written estimate", d:"Itemized line-by-line. Surface prep, primer, finish, square footage, days on site. The number you see is the number you pay." },
    { n:"III", t:"Schedule & color", d:"We hold dates with a small deposit. Stop by our shop or borrow sample boards — never trust a 2-inch chip." },
    { n:"IV",  t:"Prep — properly", d:"Two-thirds of a great paint job is prep. Wash, scrape, sand, fill, caulk, prime. We don't skip steps." },
    { n:"V",   t:"Coats & cure", d:"Premium paints from Benjamin Moore, Sherwin-Williams, and Farrow & Ball. Two coats minimum, three on bold colors." },
    { n:"VI",  t:"Walk-out & warranty", d:"Final walk with you, punch list addressed same week, and a written warranty you can call us back on." },
  ];
  return (
    <section className={`acl-process ${darkSection?"acl-process--dark":""}`} id="process">
      <div className="acl-shell">
        <header className="acl-secthead">
          <span className="acl-secthead__no">§ 03</span>
          <h2 className="acl-h2">How a careful paint job actually goes.</h2>
        </header>

        <ol className="acl-process__list">
          {steps.map(s=>(
            <li className="acl-process__step" key={s.n}>
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
  );
}

function PaletteSection() {
  const seasonal = [
    { name:"Hale Navy",       code:"HC-154", c:"#1f2d3d", note:"Best on brick two-flats" },
    { name:"Simply White",    code:"OC-117", c:"#efe9dd", note:"Bright trim, warm undertone" },
    { name:"Cromwell Gray",   code:"HC-103", c:"#9aa098", note:"Fits limestone and grey skies" },
    { name:"Caponata",        code:"AF-650", c:"#5b3a4a", note:"Greystone front doors" },
    { name:"Bronze Tone",     code:"2166-30",c:"#7a4a23", note:"Warm exterior accent" },
    { name:"Wrought Iron",    code:"2124-10",c:"#1f201d", note:"Iron rails & fascia" },
    { name:"Linen White",     code:"912",    c:"#ece4cf", note:"Plaster ceilings" },
    { name:"Forest Green",    code:"2047-10",c:"#3a4a3e", note:"Cabinet & library" },
  ];
  return (
    <section className="acl-palette">
      <div className="acl-shell">
        <header className="acl-secthead acl-secthead--split">
          <div>
            <span className="acl-secthead__no">§ 04</span>
            <h2 className="acl-h2">Eight colors we keep coming back to.</h2>
          </div>
          <p className="acl-secthead__aside">
            A short list of paints that quietly do their job in Chicago light — across cloudy Februarys and bright Julys. Free color consult included with every estimate.
          </p>
        </header>

        <div className="acl-palette__grid">
          {seasonal.map((s,i)=>(
            <article key={i} className="acl-palette__card">
              <div className="acl-palette__chip" style={{background:s.c}}>
                <span className="acl-palette__num">№ {String(i+1).padStart(2,"0")}</span>
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
  );
}

function ReviewsSection() {
  const [i, setI] = useState(0);
  useEffect(()=>{
    const t = setInterval(()=>setI(p=>(p+1)%REVIEWS.length), 6500);
    return ()=>clearInterval(t);
  },[]);
  const r = REVIEWS[i];
  return (
    <section className="acl-reviews" id="reviews">
      <div className="acl-shell acl-reviews__inner">
        <header className="acl-secthead">
          <span className="acl-secthead__no">§ 05</span>
          <h2 className="acl-h2">What the neighbors say.</h2>
        </header>

        <figure className="acl-reviews__quote" key={i}>
          <Stars n={r.rating} size={16} />
          <blockquote className="acl-reviews__text">
            “{r.quote}”
          </blockquote>
          <figcaption className="acl-reviews__by">
            <span className="acl-reviews__name">{r.name}</span>
            <span className="acl-reviews__sep">—</span>
            <span className="acl-reviews__meta">{r.project}, {r.area}</span>
          </figcaption>
        </figure>

        <div className="acl-reviews__dots">
          {REVIEWS.map((_,k)=>(
            <button
              key={k}
              className={`acl-reviews__dot ${k===i?"is-on":""}`}
              onClick={()=>setI(k)}
              aria-label={`Review ${k+1}`}
            />
          ))}
        </div>

        <div className="acl-reviews__mini">
          {REVIEWS.map((rv,k)=>(
            <button
              key={k}
              className={`acl-reviews__minicard ${k===i?"is-on":""}`}
              onClick={()=>setI(k)}
            >
              <Stars n={rv.rating} size={10} />
              <span className="acl-reviews__miniproj">{rv.project}</span>
              <span className="acl-reviews__miniarea">{rv.area}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function AreasSection() {
  return (
    <section className="acl-areas" id="areas">
      <div className="acl-shell">
        <header className="acl-secthead acl-secthead--split">
          <div>
            <span className="acl-secthead__no">§ 06</span>
            <h2 className="acl-h2">From Edison Park<br/>to Lake Forest.</h2>
          </div>
          <p className="acl-secthead__aside">
            We work the city north of I-290 and the North Shore as far as Lake Forest. Most weeks our trucks are on the road by 7:30am.
          </p>
        </header>

        <div className="acl-areas__grid">
          <div>
            <h3 className="acl-areas__sub">Chicago neighborhoods</h3>
            <ul className="acl-areas__list">
              {NEIGHBORHOODS.map(([n,z])=>(
                <li key={n}>
                  <span className="acl-areas__name">{n}</span>
                  <span className="acl-areas__zip">{z}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="acl-areas__sub">North Shore</h3>
            <ul className="acl-areas__list">
              {SUBURBS.map(s=>(
                <li key={s}>
                  <span className="acl-areas__name">{s}</span>
                  <span className="acl-areas__zip">→</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="acl-areas__shop">
            <h3 className="acl-areas__sub">The shop</h3>
            <p className="acl-areas__addr">
              {BUSINESS.address}<br/>
              By appointment, Mon–Fri.
            </p>
            <p className="acl-areas__addr">
              <a href={`tel:${BUSINESS.phoneRaw}`}>{BUSINESS.phone}</a><br/>
              <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
            </p>
            <a href="#estimate" className="acl-btn acl-btn--ink acl-btn--sm">Book a visit</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function EstimateSection() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ service:"", scope:"", when:"", name:"", phone:"", email:"", note:"" });
  const update = (k,v)=>setData(d=>({...d,[k]:v}));
  const services = ["Interior", "Exterior", "Commercial", "Power Wash", "Gutters", "Handyman"];
  const scopes = ["1–2 rooms","Whole home","Whole exterior","Commercial space","Just an inspection"];
  const whens = ["This month","Within 2 months","Spring 2026","Flexible — I'm researching"];

  return (
    <section className="acl-est" id="estimate">
      <div className="acl-shell acl-est__grid">
        <div className="acl-est__copy">
          <span className="acl-secthead__no">§ 07</span>
          <h2 className="acl-h2">Tell us about the project.<br/>We'll be in touch within two business hours.</h2>
          <p className="acl-est__lede">
            No bots, no call centers — Steve or one of the foremen reads every estimate request and answers personally. If you'd rather just talk, the line below is on his phone.
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

        <form className="acl-est__form" onSubmit={(e)=>{e.preventDefault(); setStep(4);}}>
          <div className="acl-est__progress">
            {[0,1,2,3].map(s=>(
              <span key={s} className={`acl-est__pdot ${s<=step?"is-on":""}`} />
            ))}
            <span className="acl-est__pcount">{Math.min(step+1,4)} / 4</span>
          </div>

          {step===0 && (
            <div className="acl-est__step">
              <label className="acl-est__q">What kind of work?</label>
              <div className="acl-est__chips">
                {services.map(s=>(
                  <button type="button" key={s}
                    className={`acl-chip ${data.service===s?"is-on":""}`}
                    onClick={()=>{update("service",s); setStep(1);}}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step===1 && (
            <div className="acl-est__step">
              <label className="acl-est__q">Roughly the scope?</label>
              <div className="acl-est__chips">
                {scopes.map(s=>(
                  <button type="button" key={s}
                    className={`acl-chip ${data.scope===s?"is-on":""}`}
                    onClick={()=>{update("scope",s); setStep(2);}}>
                    {s}
                  </button>
                ))}
              </div>
              <button type="button" className="acl-est__back" onClick={()=>setStep(0)}>← back</button>
            </div>
          )}

          {step===2 && (
            <div className="acl-est__step">
              <label className="acl-est__q">When are you hoping to start?</label>
              <div className="acl-est__chips">
                {whens.map(s=>(
                  <button type="button" key={s}
                    className={`acl-chip ${data.when===s?"is-on":""}`}
                    onClick={()=>{update("when",s); setStep(3);}}>
                    {s}
                  </button>
                ))}
              </div>
              <button type="button" className="acl-est__back" onClick={()=>setStep(1)}>← back</button>
            </div>
          )}

          {step===3 && (
            <div className="acl-est__step">
              <label className="acl-est__q">How can we reach you?</label>
              <div className="acl-est__fields">
                <input className="acl-input" placeholder="Your name"
                  value={data.name} onChange={e=>update("name",e.target.value)} />
                <input className="acl-input" placeholder="Phone"
                  value={data.phone} onChange={e=>update("phone",e.target.value)} />
                <input className="acl-input" placeholder="Email"
                  value={data.email} onChange={e=>update("email",e.target.value)} />
                <textarea className="acl-input acl-input--area" placeholder="Anything else we should know? (optional)"
                  value={data.note} onChange={e=>update("note",e.target.value)} rows={3} />
              </div>
              <div className="acl-est__row">
                <button type="button" className="acl-est__back" onClick={()=>setStep(2)}>← back</button>
                <button type="submit" className="acl-btn acl-btn--ink">Send to Steve →</button>
              </div>
            </div>
          )}

          {step===4 && (
            <div className="acl-est__done">
              <div className="acl-est__check">✓</div>
              <h3>Thanks, {data.name || "there"}.</h3>
              <p>Your request is on Steve's desk. Expect a reply on <strong>{data.phone || data.email || "your contact"}</strong> within two business hours.</p>
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
  );
}

function Footer() {
  return (
    <footer className="acl-footer">
      <div className="acl-shell">
        <div className="acl-footer__top">
          <div>
            <a href="#top" className="acl-logo acl-logo--light">
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
                {SERVICES.map(s=><li key={s.n}><a href="#services">{s.title}</a></li>)}
              </ul>
            </div>
            <div>
              <h4>Resources</h4>
              <ul>
                <li><a href="#">Paint estimate calculator</a></li>
                <li><a href="#">Color visualizer</a></li>
                <li><a href="#">Seasonal planner</a></li>
                <li><a href="#">Chicago homeowner guide</a></li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul>
                <li><a href={`tel:${BUSINESS.phoneRaw}`}>{BUSINESS.phone}</a></li>
                <li><a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></li>
                <li>{BUSINESS.address}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="acl-footer__bot">
          <span>© {new Date().getFullYear()} A Clean Look Painting LLC · IL Lic. PC.000{BUSINESS.founded}</span>
          <span className="acl-footer__sep">·</span>
          <a href="#">Privacy</a>
          <span className="acl-footer__sep">·</span>
          <a href="#">Terms</a>
          <span className="acl-footer__by">Painted in Chicago, since {BUSINESS.founded}.</span>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────
function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const accents = {
    ochre:    { accent:"#b9842b", accentSoft:"#e9d6a8", ink:"#1a1d24" },
    brick:    { accent:"#a83a1f", accentSoft:"#e8c5b8", ink:"#1a1d24" },
    forest:   { accent:"#3a5a45", accentSoft:"#cfd9cf", ink:"#1a1d24" },
    navy:     { accent:"#1f3a5f", accentSoft:"#c9d3e2", ink:"#15171c" },
  };
  const a = accents[tweaks.accent] || accents.ochre;

  const types = {
    "serif-sans": { display:`"Fraunces", "Cormorant Garamond", Georgia, serif`, body:`"Inter", system-ui, sans-serif` },
    "sans-sans":  { display:`"Instrument Serif", Georgia, serif`, body:`"Inter", system-ui, sans-serif` },
    "mono-sans":  { display:`"DM Serif Display", Georgia, serif`, body:`"DM Sans", system-ui, sans-serif` },
  };
  const t = types[tweaks.typePair] || types["serif-sans"];

  useEffect(()=>{
    const r = document.documentElement;
    r.style.setProperty("--acl-accent", a.accent);
    r.style.setProperty("--acl-accent-soft", a.accentSoft);
    r.style.setProperty("--acl-ink", a.ink);
    r.style.setProperty("--acl-display", t.display);
    r.style.setProperty("--acl-body", t.body);
  }, [tweaks.accent, tweaks.typePair]);

  return (
    <div className="acl-root">
      <TopBar />
      <Header />
      {tweaks.heroStyle === "editorial"
        ? <HeroEditorial showSwatchRail={tweaks.showSwatchRail} />
        : <HeroBold />
      }
      <PressBar />
      <ServicesSection />
      <WorkSection />
      <ProcessSection darkSection={tweaks.darkSection} />
      <PaletteSection />
      <ReviewsSection />
      <AreasSection />
      <EstimateSection />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Hero">
          <TweakRadio
            label="Layout"
            value={tweaks.heroStyle}
            onChange={(v)=>setTweak("heroStyle", v)}
            options={[
              { value:"editorial", label:"Editorial" },
              { value:"bold",      label:"Bold" },
            ]}
          />
          <TweakToggle
            label="Hero swatch rail"
            value={tweaks.showSwatchRail}
            onChange={(v)=>setTweak("showSwatchRail", v)}
          />
        </TweakSection>

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
          <TweakToggle
            label="Dark process section"
            value={tweaks.darkSection}
            onChange={(v)=>setTweak("darkSection", v)}
          />
        </TweakSection>

        <TweakSection title="Type">
          <TweakRadio
            label="Pairing"
            value={tweaks.typePair}
            onChange={(v)=>setTweak("typePair", v)}
            options={[
              { value:"serif-sans", label:"Fraunces / Inter" },
              { value:"sans-sans",  label:"Instrument / Inter" },
              { value:"mono-sans",  label:"DM Serif / DM Sans" },
            ]}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
