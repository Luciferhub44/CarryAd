import { useEffect, useMemo, useRef, useState } from 'react'
import type { RefObject } from 'react'
import Header from '../components/Header'
import InkLink from '../components/InkLink'
import useReveal from '../hooks/useReveal'
import useParallax from '../hooks/useParallax'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

const services: { image: string; title: string; body: string }[] = [
  {
    image: '/media/service-branding.jpg',
    title: 'Brand identity',
    body: 'Logo suites, typography, color, menu design and packaging guidelines built around what already makes the place recognizable.',
  },
  {
    image: '/media/service-photo.jpg',
    title: 'Photography & media',
    body: "Dish and beverage shoots, interior atmosphere reels, staff spotlights: the visual proof that gets screenshotted and shared.",
  },
  {
    image: '/media/service-web.jpg',
    title: 'Web development',
    body: 'Fast, mobile-first web pages, digital QR menus and reservation links built to convert local search traffic, not just look good.',
  },
  {
    image: '/media/service-seo.jpg',
    title: 'Social & local SEO',
    body: 'Monthly Instagram and TikTok management, Google Maps ranking, and search optimization for the questions people actually ask.',
  },
]

type Industry = 'all' | 'food' | 'retail' | 'services'

const portfolio: {
  industry: Exclude<Industry, 'all'>
  gradient: string
  image: string
  tag: string
  title: string
  body: string
}[] = [
  {
    industry: 'food',
    gradient: 'linear-gradient(135deg,#B5301F,#D96A4A)',
    image: '/media/portfolio-coffee.jpg',
    tag: 'Food & Beverage',
    title: 'Meridian Coffee Co.',
    body: '+180% Maps views in 90 days from a brand refresh and menu photography.',
  },
  {
    industry: 'retail',
    gradient: 'linear-gradient(135deg,#96587B,#BC7FA1)',
    image: '/media/portfolio-boutique.jpg',
    tag: 'Retail',
    title: 'Sable & Thread',
    body: 'Full site rebuild plus a QR lookbook and seasonal launch templates.',
  },
  {
    industry: 'services',
    gradient: 'linear-gradient(135deg,#DA8A24,#E89B3E)',
    image: '/media/portfolio-dental.jpg',
    tag: 'Services',
    title: 'Birchwood Dental',
    body: 'Local SEO overhaul and monthly reels for a five-chair practice.',
  },
  {
    industry: 'food',
    gradient: 'linear-gradient(135deg,#C9A22E,#E5C967)',
    image: '/media/portfolio-restaurant.jpg',
    tag: 'Food & Beverage',
    title: 'Olive & Anchor',
    body: 'Reservation-ready site, dish reels, and a full menu QR system.',
  },
  {
    industry: 'retail',
    gradient: 'linear-gradient(135deg,#B06A45,#C87F56)',
    image: '/media/portfolio-bicycles.jpg',
    tag: 'Retail',
    title: 'Northline Bicycles',
    body: 'Brand identity, workshop photography, and an Instagram content engine.',
  },
  {
    industry: 'services',
    gradient: 'linear-gradient(135deg,#9CBCA4,#DA8A24)',
    image: '/media/portfolio-home.jpg',
    tag: 'Services',
    title: 'Hearth Home Studio',
    body: 'A before/after portfolio site and Google Business optimization.',
  },
]

const industryFilters: { id: Industry; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'food', label: 'Food & Beverage' },
  { id: 'retail', label: 'Retail' },
  { id: 'services', label: 'Services' },
]

const reelTiers = [
  { id: 'none', label: 'None', price: 0 },
  { id: '4', label: '4 reels/mo', price: 450 },
  { id: '8', label: '8 reels/mo', price: 800 },
  { id: '12', label: '12 reels/mo', price: 1100 },
] as const

export default function Home() {
  const [heroPlay, setHeroPlay] = useState(false)
  useEffect(() => {
    const raf = requestAnimationFrame(() => setHeroPlay(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  const servicesRef = useRef<HTMLDivElement>(null)
  const servicesVisible = useReveal(servicesRef)
  const estimatorRef = useRef<HTMLDivElement>(null)
  const estimatorVisible = useReveal(estimatorRef)
  const workRef = useRef<HTMLDivElement>(null)
  const workVisible = useReveal(workRef)
  const bookingRef = useRef<HTMLDivElement>(null)
  const bookingVisible = useReveal(bookingRef)

  const cinematicRef = useRef<HTMLDivElement>(null)
  const cinematicVisible = useReveal(cinematicRef)
  const cinematicBgRef = useRef<HTMLVideoElement | HTMLImageElement>(null)
  useParallax(cinematicRef, cinematicBgRef, 0.15)
  const reducedMotion = usePrefersReducedMotion()

  // ---- estimator ----
  const [website, setWebsite] = useState(false)
  const [hosting, setHosting] = useState(false)
  const [reelTier, setReelTier] = useState<(typeof reelTiers)[number]['id']>('none')
  const [gbp, setGbp] = useState(false)
  const [photo, setPhoto] = useState(false)

  const estimate = useMemo(() => {
    const lines: { label: string; value: string }[] = []
    let oneTime = 0
    let monthly = 0

    if (website) {
      oneTime += 1400
      lines.push({ label: 'Website build (one-time)', value: '$1,400 one-time' })
    }
    if (hosting) {
      monthly += 65
      lines.push({ label: 'Hosting & upkeep', value: '$65/mo' })
    }
    const tier = reelTiers.find((t) => t.id === reelTier)
    if (tier && tier.price > 0) {
      monthly += tier.price
      lines.push({ label: `Social — ${tier.label}`, value: `$${tier.price.toLocaleString()}/mo` })
    }
    if (gbp) {
      monthly += 250
      lines.push({ label: 'Google Business optimization', value: '$250/mo' })
    }
    if (photo) {
      monthly += 500
      lines.push({ label: 'Monthly photo session', value: '$500/mo' })
    }

    return { oneTime, monthly, lines }
  }, [website, hosting, reelTier, gbp, photo])

  // ---- portfolio filter ----
  const [industry, setIndustry] = useState<Industry>('all')

  // ---- booking form ----
  const [sent, setSent] = useState(false)

  return (
    <>
      <Header variant="site" />

      <section className="hero" style={{ paddingBottom: 0 }}>
        <div>
          <p className="eyebrow">Media marketing for cafés, restaurants &amp; local craft</p>
          <h1>
            Your story,
            <br />
            <em>carried</em> everywhere.
          </h1>
          <p className="lede">
            We find the honest core of a small business: the recipe, the ritual, the corner it&rsquo;s known
            for. Then we carry it out to every screen and street corner that matters, from the menu and the
            maps pin to the reel someone screenshots to send a friend.
          </p>
          <div className="cta-row">
            <button
              className="stamp-btn"
              onClick={() => document.getElementById('estimator')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Build your package
            </button>
            <InkLink to="#work" style={{ fontSize: 15 }}>
              See the work
            </InkLink>
          </div>
        </div>
        <div className="hero-art">
          <div className={heroPlay ? 'play' : ''}>
            <svg viewBox="0 0 220 200" aria-label="carryad spiral mark">
              <path
                className="cv-ink"
                pathLength={100}
                d="M 192 98 C 196 44 148 16 104 22 C 58 28 30 66 38 110 C 46 152 88 178 128 168 C 164 159 184 124 172 92 C 161 63 124 52 98 68 C 74 82 70 114 88 130 C 103 143 128 138 134 120"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <g className="cv-clean">
                <path
                  d="M 190 100 A 70 70 0 0 1 50 100 A 55 55 0 0 1 160 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="15"
                  strokeLinecap="round"
                />
                <path
                  d="M 160 100 C 162 64 130 48 102 58 C 76 67 68 96 82 116 C 94 133 122 134 132 118 C 140 105 132 90 118 90 C 108 90 104 100 110 106"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="9"
                  strokeLinecap="round"
                />
              </g>
            </svg>
          </div>
          <p className="hero-note">&ldquo;ring by ring, the story carries out&rdquo;</p>
        </div>
      </section>

      <div className="trust-strip">
        <div className="wrap">
          <div className="trust-item">
            Local businesses carried
            <b>60+</b>
          </div>
          <div className="trust-item">
            Avg. lift in Google Maps views
            <b>3.2×</b>
          </div>
          <div className="trust-item">
            Reels &amp; posts delivered monthly
            <b>400+</b>
          </div>
          <div className="trust-item">
            Average client tenure
            <b>14 mo.</b>
          </div>
        </div>
      </div>

      <div ref={cinematicRef} className="cinematic">
        {!reducedMotion && cinematicVisible ? (
          <video
            ref={cinematicBgRef as RefObject<HTMLVideoElement>}
            className="cinematic-bg"
            src="/media/hero-cafe.mp4"
            poster="/media/portfolio-coffee.jpg"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img
            ref={cinematicBgRef as RefObject<HTMLImageElement>}
            className="cinematic-bg"
            src="/media/portfolio-coffee.jpg"
            alt=""
          />
        )}
        <div className="cinematic-overlay" />
        <div className="cinematic-content">
          <p className="eyebrow">Every corner has one</p>
          <p className="slogan">&ldquo;the recipe, the ritual, the corner it&rsquo;s known for&rdquo;</p>
        </div>
      </div>

      <section id="services" className="wrap">
        <div className="section-head reveal in">
          <p className="eyebrow">Core services</p>
          <h2>Everything a corner shop needs, carried as one story. Not four vendors.</h2>
        </div>
        <div ref={servicesRef} className={`services-grid reveal${servicesVisible ? ' in' : ''}`}>
          {services.map((s) => (
            <div className="service-card" key={s.title}>
              <img className="service-art" src={s.image} alt="" loading="lazy" />
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="estimator" className="wrap">
        <div className="section-head reveal in">
          <p className="eyebrow">Package builder</p>
          <h2>Pick what you need. Watch the number move.</h2>
        </div>
        <div ref={estimatorRef} className={`estimator reveal${estimatorVisible ? ' in' : ''}`}>
          <div>
            <div className="estimator-group">
              <span>Website</span>
              <div className="pill-row">
                <div className="pill">
                  <input type="checkbox" id="opt-web" checked={website} onChange={(e) => setWebsite(e.target.checked)} />
                  <label htmlFor="opt-web">New website build — $1,400</label>
                </div>
                <div className="pill">
                  <input type="checkbox" id="opt-hosting" checked={hosting} onChange={(e) => setHosting(e.target.checked)} />
                  <label htmlFor="opt-hosting">Hosting &amp; upkeep — $65/mo</label>
                </div>
              </div>
            </div>
            <div className="estimator-group">
              <span>Social media management</span>
              <div className="pill-row">
                {reelTiers.map((t) => (
                  <div className="pill" key={t.id}>
                    <input
                      type="radio"
                      name="reels"
                      id={`reels-${t.id}`}
                      checked={reelTier === t.id}
                      onChange={() => setReelTier(t.id)}
                    />
                    <label htmlFor={`reels-${t.id}`}>
                      {t.id === 'none' ? 'None' : `${t.label} — $${t.price.toLocaleString()}`}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="estimator-group">
              <span>Add-ons</span>
              <div className="pill-row">
                <div className="pill">
                  <input type="checkbox" id="opt-gbp" checked={gbp} onChange={(e) => setGbp(e.target.checked)} />
                  <label htmlFor="opt-gbp">Google Business optimization — $250/mo</label>
                </div>
                <div className="pill">
                  <input type="checkbox" id="opt-photo" checked={photo} onChange={(e) => setPhoto(e.target.checked)} />
                  <label htmlFor="opt-photo">Monthly photography session — $500/mo</label>
                </div>
              </div>
            </div>
          </div>
          <div className="estimate-panel">
            <div>
              <p className="eyebrow">Estimated investment</p>
              <p className="estimate-total">
                ${estimate.monthly.toLocaleString()}
                <span>/mo</span>
              </p>
              <p className="form-note" style={{ color: '#9C9184' }}>
                {estimate.oneTime > 0 ? `+ $${estimate.oneTime.toLocaleString()} one-time build` : ''}
              </p>
              <ul className="estimate-list">
                {estimate.lines.length === 0 ? (
                  <li>
                    <span>Nothing selected yet</span>
                    <span></span>
                  </li>
                ) : (
                  estimate.lines.map((l) => (
                    <li key={l.label}>
                      <span>{l.label}</span>
                      <span>{l.value}</span>
                    </li>
                  ))
                )}
              </ul>
            </div>
            <button
              className="stamp-btn"
              onClick={() => document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Book a discovery call
            </button>
          </div>
        </div>
      </section>

      <section id="work" className="wrap">
        <div className="section-head reveal in">
          <p className="eyebrow">Selected work</p>
          <h2>Real corners, carried further.</h2>
        </div>
        <div className="filter-row reveal in">
          {industryFilters.map((f) => (
            <button
              key={f.id}
              className={`filter-btn ${industry === f.id ? 'active' : ''}`}
              onClick={() => setIndustry(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div ref={workRef} className={`portfolio-grid reveal${workVisible ? ' in' : ''}`}>
          {portfolio.map((p) => (
            <div
              key={p.title}
              className={`p-card ${industry !== 'all' && industry !== p.industry ? 'hide' : ''}`}
            >
              <div className="p-art" style={{ background: p.gradient }}>
                <img src={p.image} alt={p.title} loading="lazy" />
              </div>
              <div className="p-body">
                <p className="p-tag">{p.tag}</p>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap" id="book">
        <div ref={bookingRef} className={`booking reveal${bookingVisible ? ' in' : ''}`}>
          <div className="wrap-inner">
            <div>
              <p className="eyebrow" style={{ color: 'var(--support)' }}>
                Start a story
              </p>
              <h2>Tell us about your corner of the block.</h2>
              <p>
                A 20-minute discovery call. No deck, no pressure, just a look at what&rsquo;s already working
                and what carrying it further could look like.
              </p>
              <p className="slogan" style={{ marginTop: 20, fontSize: 17 }}>
                &ldquo;your story, carried everywhere&rdquo;
              </p>
            </div>
            <form
              className="form-grid"
              onSubmit={(e) => {
                e.preventDefault()
                setSent(true)
              }}
            >
              <input type="text" placeholder="Business name" required />
              <input type="text" placeholder="Your name" required />
              <input type="email" placeholder="Email" required />
              <div>
                <p className="form-note" style={{ marginBottom: 8 }}>
                  Interested in
                </p>
                <div className="check-row">
                  <label>
                    <input type="checkbox" defaultChecked /> Branding
                  </label>
                  <label>
                    <input type="checkbox" /> Photography
                  </label>
                  <label>
                    <input type="checkbox" /> Web
                  </label>
                  <label>
                    <input type="checkbox" /> Social &amp; SEO
                  </label>
                </div>
              </div>
              <button type="submit" className="stamp-btn">
                {sent ? 'Request sent' : 'Request discovery call'}
              </button>
              {sent && <p style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 15, padding: '16px 0', color: 'var(--accent-dark)' }}>Got it, we&rsquo;ll reach out within one business day.</p>}
              <p className="form-note">No spam, no auto-dial. Just a real reply from a real person at carryad.</p>
            </form>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <span className="wordmark" style={{ fontSize: 16 }}>
            carry<b>ad</b>
            <span className="dot">.</span>
          </span>
          <div className="foot-links">
            <InkLink to="#services">services</InkLink>
            <InkLink to="#work">work</InkLink>
            <InkLink to="#book">contact</InkLink>
            <InkLink to="/admin" style={{ color: 'var(--muted)' }}>
              agency access
            </InkLink>
          </div>
          <svg className="foot-loader" viewBox="0 0 220 200" aria-hidden="true">
            <path
              className="ink-loader"
              pathLength={100}
              d="M 192 98 C 196 44 148 16 104 22 C 58 28 30 66 38 110 C 46 152 88 178 128 168 C 164 159 184 124 172 92 C 161 63 124 52 98 68 C 74 82 70 114 88 130 C 103 143 128 138 134 120"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="9"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </footer>
    </>
  )
}
