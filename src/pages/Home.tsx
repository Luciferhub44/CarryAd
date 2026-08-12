import { useRef } from 'react'
import type { RefObject } from 'react'
import { Link } from 'react-router-dom'
import MarketingHeader from '../components/MarketingHeader'
import MarketingFooter from '../components/MarketingFooter'
import Reveal from '../components/Reveal'
import ManifestoScroll from '../components/ManifestoScroll'
import useParallax from '../hooks/useParallax'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

const services = [
  { image: '/media/service-branding.jpg', n: '01', title: 'Brand identity' },
  { image: '/media/service-photo.jpg', n: '02', title: 'Photography & media' },
  { image: '/media/service-web.jpg', n: '03', title: 'Web development' },
  { image: '/media/service-seo.jpg', n: '04', title: 'Social & local SEO' },
]

const workHighlights = [
  { image: '/media/portfolio-coffee.jpg', tag: 'Food & Beverage', title: 'Meridian Coffee Co.' },
  { image: '/media/portfolio-boutique.jpg', tag: 'Retail', title: 'Sable & Thread' },
  { image: '/media/portfolio-restaurant.jpg', tag: 'Food & Beverage', title: 'Olive & Anchor' },
]

export default function Home() {
  const cinematicRef = useRef<HTMLDivElement>(null)
  const cinematicBgRef = useRef<HTMLVideoElement | HTMLImageElement>(null)
  useParallax(cinematicRef, cinematicBgRef, 0.15)
  const reducedMotion = usePrefersReducedMotion()

  return (
    <>
      <MarketingHeader />

      {/* Hero */}
      <section className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-20 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        <div>
          <p className="font-display text-xs uppercase tracking-[0.14em] text-support">
            Media marketing for cafés, restaurants &amp; local craft
          </p>
          <h1 className="mt-4 font-display text-[clamp(38px,7.5vw,84px)] font-semibold leading-[0.98] text-ink">
            Your story,
            <br />
            <em className="font-voice font-normal not-italic italic text-accent">carried</em> everywhere.
          </h1>
          <p className="mt-6 max-w-md text-[19px] leading-relaxed text-muted">
            We find the honest core of a small business: the recipe, the ritual, the corner it&rsquo;s known
            for. Then we carry it out to every screen and street corner that matters, from the menu and the
            maps pin to the reel someone screenshots to send a friend.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Link
              to="/pricing"
              className="rounded-full bg-accent px-7 py-3.5 font-display text-sm font-bold text-paper transition-transform hover:scale-[.97]"
            >
              Build your package
            </Link>
            <Link to="/work" className="font-display text-sm text-ink underline decoration-line underline-offset-4 hover:decoration-accent">
              See the work &rarr;
            </Link>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[280px] lg:max-w-none">
          <img
            src="/media/mascot-climbing.png"
            alt="Illustration of the carryad mascot climbing a staircase, carrying a poster, a tote bag of brushes, a framed print, and a coffee"
            className="w-full drop-shadow-[0_18px_24px_rgba(43,38,32,0.16)]"
          />
          <p className="mt-4 text-center font-voice text-sm italic text-muted">
            &ldquo;stair by stair, the story carries up&rdquo;
          </p>
        </div>
      </section>

      {/* Trust strip */}
      <div className="border-y border-line">
        <div className="mx-auto flex max-w-[1400px] flex-wrap justify-between gap-8 px-5 py-6 sm:px-8">
          {[
            ['Local businesses carried', '60+'],
            ['Avg. lift in Maps views', '3.2×'],
            ['Reels & posts delivered monthly', '400+'],
            ['Average client tenure', '14 mo.'],
          ].map(([label, value]) => (
            <div key={label} className="font-display text-xs uppercase tracking-[0.1em] text-muted">
              {label}
              <b className="mt-1 block font-display text-lg font-semibold tracking-normal text-ink">{value}</b>
            </div>
          ))}
        </div>
      </div>

      {/* Cinematic */}
      <div ref={cinematicRef} className="relative h-[clamp(320px,55vw,560px)] overflow-hidden bg-ink">
        {!reducedMotion ? (
          <video
            ref={cinematicBgRef as RefObject<HTMLVideoElement>}
            className="absolute inset-x-0 -inset-y-[15%] h-[130%] w-full object-cover will-change-transform"
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
            className="absolute inset-0 h-full w-full object-cover"
            src="/media/portfolio-coffee.jpg"
            alt=""
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/35 to-ink/65" />
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="font-display text-xs uppercase tracking-[0.14em] text-support">Every corner has one</p>
          <p className="mt-4 max-w-lg font-voice text-2xl italic text-paper sm:text-3xl">
            &ldquo;the recipe, the ritual, the corner it&rsquo;s known for&rdquo;
          </p>
        </div>
      </div>

      {/* Manifesto */}
      <ManifestoScroll />

      {/* Services teaser */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8">
        <Reveal className="max-w-lg">
          <p className="font-display text-xs uppercase tracking-[0.14em] text-support">Core services</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Everything a corner shop needs, carried as one story.
          </h2>
        </Reveal>
        <Reveal stagger className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <Link key={s.title} to="/services" className="group flex flex-col gap-4 bg-card p-7 transition-colors hover:bg-paper">
              <div className="flex items-center justify-between">
                <img src={s.image} alt="" className="h-14 w-14 rounded-xl border border-line object-cover" />
                <span className="font-display text-xs text-muted">{s.n}</span>
              </div>
              <h3 className="font-display text-base font-semibold text-ink group-hover:text-accent">{s.title}</h3>
            </Link>
          ))}
        </Reveal>
      </section>

      {/* Work teaser */}
      <section className="mx-auto max-w-[1400px] px-5 py-8 pb-24 sm:px-8">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.14em] text-support">Selected work</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">Real corners, carried further.</h2>
          </div>
          <Link to="/work" className="font-display text-sm text-ink underline decoration-line underline-offset-4 hover:decoration-accent">
            See all work &rarr;
          </Link>
        </Reveal>
        <Reveal stagger className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {workHighlights.map((w) => (
            <Link key={w.title} to="/work" className="group block overflow-hidden rounded-2xl border border-line bg-card">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={w.image} alt={w.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <p className="font-display text-[11px] uppercase tracking-[0.1em] text-accent">{w.tag}</p>
                <h3 className="mt-1 font-display text-base font-semibold text-ink">{w.title}</h3>
              </div>
            </Link>
          ))}
        </Reveal>
      </section>

      {/* CTA band */}
      <section className="px-5 pb-24 sm:px-8">
        <Reveal
          as="section"
          className="mx-auto flex max-w-[1400px] flex-col items-start gap-6 rounded-3xl bg-ink px-8 py-16 sm:items-center sm:px-16 sm:text-center"
        >
          <p className="font-display text-xs uppercase tracking-[0.14em] text-support">Start a story</p>
          <h2 className="max-w-xl font-display text-3xl font-semibold text-paper sm:text-4xl">
            Tell us about your corner of the block.
          </h2>
          <Link
            to="/contact"
            className="mt-2 rounded-full bg-accent px-8 py-4 font-display text-sm font-bold text-paper transition-transform hover:scale-[.97]"
          >
            Book a discovery call
          </Link>
        </Reveal>
      </section>

      <MarketingFooter />
    </>
  )
}
