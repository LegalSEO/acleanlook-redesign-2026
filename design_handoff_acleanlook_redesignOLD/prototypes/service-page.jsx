/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakToggle */
const { useState, useEffect, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "ochre",
  "showSampleBoards": true,
  "stickyCTA": true
}/*EDITMODE-END*/;

const BUSINESS = {
  name: "A Clean Look",
  phone: "(773) 419-1718",
  phoneRaw: "+17734191718",
  email: "steve@acleanlook.com",
};

// ─────────────────────────────────────────────────────────────
// SERVICE DATA — Interior Painting (lifted from data/services.tsx)
// ─────────────────────────────────────────────────────────────
const SERVICE = {
  slug: "interior-painting",
  number: "01",
  title: "Interior Painting",
  kicker: "Service",
  lede: "From a single accent wall to a whole-home refresh — careful prep, premium paints, and trim work that earns the second coat.",
  body: [
    "A fresh coat of paint is the most cost-effective change you can make to a room. Done well, it reads as a small renovation. Done poorly, it shows in three months.",
    "We treat prep as the job, not the prelude. Furniture is moved and covered. Drop cloths down. Holes patched, cracks caulked, edges sanded, primer where the old surface needs it. Two-thirds of a great paint job happens before the first coat.",
    "Our standard finish is Benjamin Moore Aura or Regal — flat for ceilings, eggshell for living rooms, satin in kitchens and baths, semi-gloss on trim. We bring sample boards to your home so you can see how the color reads in your morning, afternoon, and evening light.",
  ],
  finishes: [
    { name:"Flat",        use:"Ceilings, low-traffic" },
    { name:"Matte",        use:"Bedrooms, formal rooms" },
    { name:"Eggshell",     use:"Living rooms, hallways" },
    { name:"Satin",        use:"Kitchens, baths, kids' rooms" },
    { name:"Semi-gloss",   use:"Trim, doors, cabinets" },
  ],
  features: [
    { t:"Thorough surface prep", d:"Patch, sand, caulk, prime. We don't paint over problems — we fix them first." },
    { t:"Color consultation",    d:"Free with every estimate. Steve brings sample boards painted with the actual product." },
    { t:"Premium paints",        d:"Benjamin Moore Aura, Regal, and Advance. Low-VOC, washable, true color." },
    { t:"Razor-sharp lines",     d:"Cut-in by hand, taped where it matters. No bleeding ceilings, no fuzzy trim." },
    { t:"Furniture protection",  d:"We move and cover. Floors are draped wall-to-wall. Outlets, fixtures, and floors are taped off." },
    { t:"Walk-out punch list",   d:"Final inspection together. Anything you flag is addressed within the same week." },
  ],
  process: [
    { n:"I",   t:"Free in-home estimate",    d:"Steve visits, measures, photographs. You'll have a written quote within 48 hours — itemized, not lump-sum." },
    { n:"II",  t:"Color & finish",           d:"Sample boards delivered to your home. Live with them for a week. Pick what works in your light, not in a paint-store fluorescents." },
    { n:"III", t:"Prep & protect",           d:"Furniture moved, floors covered, surfaces patched, sanded, caulked, primed. Day one is almost always prep." },
    { n:"IV",  t:"Paint",                    d:"Two coats minimum, three on bold or red colors. Cut-in by hand, rolled in even sections, no spray indoors." },
    { n:"V",   t:"Cleanup & walk-out",       d:"Furniture replaced, fixtures put back, floors vacuumed. We walk every room with you before we leave." },
  ],
  pricing: [
    { rng:"Single room",         lo:"$400",   hi:"$900",   note:"Average ~$640 · 1 day on site" },
    { rng:"Per square foot",     lo:"$1.60",  hi:"$3.33",  note:"Includes labor & premium paint" },
    { rng:"Per hour",            lo:"$31.60", hi:"$53.60", note:"For small repairs, touch-ups" },
    { rng:"Whole-home interior", lo:"$3,500", hi:"$8,000", note:"Average ~$5,814 · 3–5 days" },
  ],
  pricingNote: "Real numbers from Chicago projects we completed in 2024–25. Final pricing depends on ceiling height, surface condition, number of colors, and paint tier. Every estimate is itemized — you'll see the breakdown line by line.",
  faqs: [
    { q:"How long does interior painting take?",
      a:"A single room is usually one day. A 3–4 bedroom home runs 3–5 days, depending on prep work and number of colors. We'll give you a day-by-day schedule with the estimate." },
    { q:"What paints do you use?",
      a:"Benjamin Moore is our default — Aura for high-traffic, Regal for general interior, Advance for trim and cabinets. We're happy to spec Sherwin-Williams Emerald, Farrow & Ball, or whatever you've fallen for. Just say the word." },
    { q:"Do you move furniture?",
      a:"Yes — we move and cover everything that fits. Pianos, large entertainment centers, and anything wall-mounted requiring a stud finder, we ask you to handle in advance. Drop cloths cover the rest." },
    { q:"Will I need to leave the house?",
      a:"No. We use low-VOC paints and keep good ventilation. We work room by room so most of the home stays usable. Pets and kids are fine — we just ask you to keep them out of active rooms." },
    { q:"How do I choose the color?",
      a:"Free color consultation comes with every estimate. We deliver large painted sample boards (not chips) so you can see them in your actual light at 7am, 2pm, and 8pm. Test before you commit." },
    { q:"What's the warranty?",
      a:"Two-year workmanship warranty in writing. If a coat fails for any reason that's our fault — peeling, cracking, finish issues — we come back and fix it. No charge, no argument." },
  ],
  related: [
    { slug:"exterior-painting", title:"Exterior Painting", n:"02" },
    { slug:"commercial-painting", title:"Commercial Painting", n:"03" },
    { slug:"handyman", title:"Handyman", n:"06" },
  ],
};

// ─────────────────────────────────────────────────────────────
// PIECES (reused vocabulary from homepage)
// ─────────────────────────────────────────────────────────────
function HousePlaceholder({ label, ratio="3/4" }) {
  const stripes = "repeating-linear-gradient(135deg, #efe9dd 0 12px, #e6dfd0 12px 24px)";
  return (
    <div className="acl-placeholder" style={{ aspectRatio: ratio, background: stripes }}>
      <span className="acl-placeholder__tag">{label}</span>
    </div>
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
          <a href="#" className="is-current">Services</a>
          <a href="A Clean Look - Homepage.html#process">Process</a>
          <a href="A Clean Look - Homepage.html#areas">Areas</a>
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

// ─── Breadcrumb / Page heading ──────────────────────────────
function Breadcrumb() {
  return (
    <nav className="acl-crumbs" aria-label="Breadcrumb">
      <div className="acl-shell acl-crumbs__row">
        <a href="A Clean Look - Homepage.html">Home</a>
        <span className="acl-crumbs__sep">/</span>
        <a href="#">Services</a>
        <span className="acl-crumbs__sep">/</span>
        <span className="acl-crumbs__current">{SERVICE.title}</span>
      </div>
    </nav>
  );
}

// ─── Hero ───────────────────────────────────────────────────
function Hero() {
  return (
    <section className="acl-svchero">
      <div className="acl-shell acl-svchero__grid">
        <div className="acl-svchero__copy">
          <div className="acl-svchero__meta">
            <span className="acl-svchero__num">№ {SERVICE.number}</span>
            <span className="acl-svchero__sep" />
            <span className="acl-svchero__kicker">{SERVICE.kicker}</span>
          </div>

          <h1 className="acl-svchero__title">
            <span>Interior</span>
            <span className="acl-svchero__title--ink">painting,</span>
            <span>done quietly.</span>
          </h1>

          <p className="acl-svchero__lede">{SERVICE.lede}</p>

          <div className="acl-svchero__ctas">
            <a href="#estimate" className="acl-btn acl-btn--ink acl-btn--lg">
              Quote this room
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>
            <a href={`tel:${BUSINESS.phoneRaw}`} className="acl-btn acl-btn--ghost acl-btn--lg">
              {BUSINESS.phone}
            </a>
          </div>

          <dl className="acl-svchero__specs">
            <div><dt>Typical room</dt><dd>1 day on site</dd></div>
            <div><dt>Whole home</dt><dd>3–5 days</dd></div>
            <div><dt>Warranty</dt><dd>2 years, written</dd></div>
            <div><dt>Brand</dt><dd>Benjamin Moore</dd></div>
          </dl>
        </div>

        <aside className="acl-svchero__plate">
          <HousePlaceholder label="HERO · Living room repaint, Lakeview — Hale Navy + Simply White trim" ratio="4/5" />
          <div className="acl-svchero__caption">
            <span className="acl-svchero__capnum">№ 142</span>
            <span className="acl-svchero__captext">
              Interior repaint completed November 2025. Three coats of Benjamin Moore Regal Select in <em>Hale Navy</em> on accent wall, <em>Simply White</em> on trim, <em>Linen White</em> ceiling.
            </span>
          </div>
        </aside>
      </div>
    </section>
  );
}

// ─── Body / "What's included" ───────────────────────────────
function BodyCopy() {
  return (
    <section className="acl-svcbody">
      <div className="acl-shell acl-svcbody__grid">
        <aside className="acl-svcbody__rail">
          <span className="acl-secthead__no">§ 01</span>
          <h2 className="acl-h2">What a careful interior job looks like.</h2>
        </aside>
        <div className="acl-svcbody__prose">
          {SERVICE.body.map((p,i)=><p key={i}>{p}</p>)}

          <div className="acl-finishes">
            <span className="acl-finishes__label">Finishes we recommend</span>
            <ul className="acl-finishes__list">
              {SERVICE.finishes.map(f=>(
                <li key={f.name}>
                  <span className="acl-finishes__name">{f.name}</span>
                  <span className="acl-finishes__use">{f.use}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Features grid ──────────────────────────────────────────
function Features() {
  return (
    <section className="acl-svcfeat">
      <div className="acl-shell">
        <header className="acl-secthead">
          <span className="acl-secthead__no">§ 02</span>
          <h2 className="acl-h2">What's included with every interior job.</h2>
        </header>
        <div className="acl-svcfeat__grid">
          {SERVICE.features.map((f,i)=>(
            <article key={i} className="acl-svcfeat__cell">
              <span className="acl-svcfeat__num">{String(i+1).padStart(2,"0")}</span>
              <h3>{f.t}</h3>
              <p>{f.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Sample boards ──────────────────────────────────────────
function SampleBoards() {
  const colors = [
    { c:"#1f2d3d", n:"Hale Navy", code:"HC-154" },
    { c:"#efe9dd", n:"Simply White", code:"OC-117" },
    { c:"#3a4a3e", n:"Forest Green", code:"2047-10" },
    { c:"#9aa098", n:"Cromwell Gray", code:"HC-103" },
    { c:"#5b3a4a", n:"Caponata", code:"AF-650" },
    { c:"#ece4cf", n:"Linen White", code:"912" },
  ];
  return (
    <section className="acl-samples">
      <div className="acl-shell">
        <header className="acl-secthead acl-secthead--split">
          <div>
            <span className="acl-secthead__no">§ 03</span>
            <h2 className="acl-h2">Sample boards.<br/>Not chips.</h2>
          </div>
          <p className="acl-secthead__aside">
            We deliver 12×12 boards painted in your candidate colors with the actual product, not paper chips. Live with them for a week — view in morning, midday, and lamp light before you commit.
          </p>
        </header>
        <div className="acl-samples__rail">
          {colors.map((s,i)=>(
            <div key={i} className="acl-samples__card">
              <div className="acl-samples__board" style={{ background:s.c }}>
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
  );
}

// ─── Process ────────────────────────────────────────────────
function Process() {
  return (
    <section className="acl-svcproc">
      <div className="acl-shell">
        <header className="acl-secthead">
          <span className="acl-secthead__no">§ 04</span>
          <h2 className="acl-h2">From phone call to final coat.</h2>
        </header>
        <ol className="acl-process__list">
          {SERVICE.process.map(s=>(
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

// ─── Pricing table ──────────────────────────────────────────
function Pricing() {
  return (
    <section className="acl-pricing">
      <div className="acl-shell">
        <header className="acl-secthead acl-secthead--split">
          <div>
            <span className="acl-secthead__no">§ 05</span>
            <h2 className="acl-h2">What it actually costs.</h2>
          </div>
          <p className="acl-secthead__aside">
            Real numbers from interior projects we completed across Chicago and the North Shore in 2024–25. No hidden fees, no upsells once we start.
          </p>
        </header>

        <div className="acl-pricing__table">
          <div className="acl-pricing__head">
            <span>Scope</span>
            <span>Low</span>
            <span>High</span>
            <span>Notes</span>
          </div>
          {SERVICE.pricing.map((p,i)=>(
            <div key={i} className="acl-pricing__row">
              <span className="acl-pricing__scope">{p.rng}</span>
              <span className="acl-pricing__num">{p.lo}</span>
              <span className="acl-pricing__num">{p.hi}</span>
              <span className="acl-pricing__note">{p.note}</span>
            </div>
          ))}
        </div>

        <p className="acl-pricing__disclaimer">{SERVICE.pricingNote}</p>
      </div>
    </section>
  );
}

// ─── FAQ accordion ──────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="acl-faq">
      <div className="acl-shell">
        <header className="acl-secthead">
          <span className="acl-secthead__no">§ 06</span>
          <h2 className="acl-h2">Common questions.</h2>
        </header>
        <ul className="acl-faq__list">
          {SERVICE.faqs.map((f,i)=>(
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

// ─── CTA / Estimate strip ───────────────────────────────────
function EstimateStrip() {
  return (
    <section className="acl-svccta" id="estimate">
      <div className="acl-shell acl-svccta__row">
        <div>
          <span className="acl-secthead__no">§ 07</span>
          <h2 className="acl-h2">Ready when you are.</h2>
          <p className="acl-svccta__lede">
            Free, itemized written estimate delivered within 48 hours. No obligation, no high-pressure follow-ups — just a number you can plan around.
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

// ─── Related services ───────────────────────────────────────
function Related() {
  return (
    <section className="acl-related">
      <div className="acl-shell">
        <header className="acl-secthead">
          <span className="acl-secthead__no">§ 08</span>
          <h2 className="acl-h2">Other things we do, while we're there.</h2>
        </header>
        <div className="acl-related__grid">
          {SERVICE.related.map(r=>(
            <a key={r.slug} className="acl-related__card" href="#">
              <span className="acl-related__num">№ {r.n}</span>
              <h3>{r.title}</h3>
              <span className="acl-related__arrow">
                Read more
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Sticky bar ─────────────────────────────────────────────
function StickyBar({ visible }) {
  if (!visible) return null;
  return (
    <div className="acl-sticky">
      <div className="acl-shell acl-sticky__row">
        <div className="acl-sticky__copy">
          <span className="acl-sticky__label">Interior painting · Chicago</span>
          <span className="acl-sticky__sub">Free estimate within 48 hours</span>
        </div>
        <div className="acl-sticky__actions">
          <a href={`tel:${BUSINESS.phoneRaw}`} className="acl-sticky__phone">{BUSINESS.phone}</a>
          <a href="#estimate" className="acl-btn acl-btn--ink acl-btn--sm">Quote my project</a>
        </div>
      </div>
    </div>
  );
}

// ─── Footer (simplified version) ────────────────────────────
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
                <li><a href="#">Interior Painting</a></li>
                <li><a href="#">Exterior Painting</a></li>
                <li><a href="#">Commercial</a></li>
                <li><a href="#">Power Washing</a></li>
                <li><a href="#">Gutters</a></li>
                <li><a href="#">Handyman</a></li>
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

// ─────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────
function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const accents = {
    ochre:    { accent:"#b9842b", accentSoft:"#e9d6a8" },
    brick:    { accent:"#a83a1f", accentSoft:"#e8c5b8" },
    forest:   { accent:"#3a5a45", accentSoft:"#cfd9cf" },
    navy:     { accent:"#1f3a5f", accentSoft:"#c9d3e2" },
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
      <BodyCopy />
      <Features />
      {tweaks.showSampleBoards && <SampleBoards />}
      <Process />
      <Pricing />
      <FAQ />
      <EstimateStrip />
      <Related />
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
          <TweakToggle
            label="Sample boards section"
            value={tweaks.showSampleBoards}
            onChange={(v)=>setTweak("showSampleBoards", v)}
          />
          <TweakToggle
            label="Sticky bottom CTA"
            value={tweaks.stickyCTA}
            onChange={(v)=>setTweak("stickyCTA", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
