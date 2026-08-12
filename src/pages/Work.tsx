import { useState } from 'react'
import MarketingHeader from '../components/MarketingHeader'
import MarketingFooter from '../components/MarketingFooter'
import Reveal from '../components/Reveal'

type Industry = 'all' | 'food' | 'retail' | 'services'

const portfolio: { industry: Exclude<Industry, 'all'>; image: string; tag: string; title: string; body: string }[] = [
  {
    industry: 'food',
    image: '/media/portfolio-coffee.jpg',
    tag: 'Food & Beverage',
    title: 'Meridian Coffee Co.',
    body: '+180% Maps views in 90 days from a brand refresh and menu photography.',
  },
  {
    industry: 'retail',
    image: '/media/portfolio-boutique.jpg',
    tag: 'Retail',
    title: 'Sable & Thread',
    body: 'Full site rebuild plus a QR lookbook and seasonal launch templates.',
  },
  {
    industry: 'services',
    image: '/media/portfolio-dental.jpg',
    tag: 'Services',
    title: 'Birchwood Dental',
    body: 'Local SEO overhaul and monthly reels for a five-chair practice.',
  },
  {
    industry: 'food',
    image: '/media/portfolio-restaurant.jpg',
    tag: 'Food & Beverage',
    title: 'Olive & Anchor',
    body: 'Reservation-ready site, dish reels, and a full menu QR system.',
  },
  {
    industry: 'retail',
    image: '/media/portfolio-bicycles.jpg',
    tag: 'Retail',
    title: 'Northline Bicycles',
    body: 'Brand identity, workshop photography, and an Instagram content engine.',
  },
  {
    industry: 'services',
    image: '/media/portfolio-home.jpg',
    tag: 'Services',
    title: 'Hearth Home Studio',
    body: 'A before/after portfolio site and Google Business optimization.',
  },
]

const filters: { id: Industry; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'food', label: 'Food & Beverage' },
  { id: 'retail', label: 'Retail' },
  { id: 'services', label: 'Services' },
]

export default function Work() {
  const [industry, setIndustry] = useState<Industry>('all')
  const visible = portfolio.filter((p) => industry === 'all' || p.industry === industry)

  return (
    <>
      <MarketingHeader />

      <section className="mx-auto max-w-[1400px] px-5 pb-10 pt-16 sm:px-8 sm:pt-24">
        <Reveal>
          <p className="font-display text-xs uppercase tracking-[0.14em] text-support">Selected work</p>
          <h1 className="mt-4 max-w-2xl font-display text-[clamp(34px,6vw,58px)] font-semibold leading-[1.02] text-ink">
            Real corners, carried further.
          </h1>
        </Reveal>

        <Reveal className="mt-10 flex flex-wrap gap-2.5">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setIndustry(f.id)}
              className={`rounded-full border px-4 py-2 font-display text-sm transition-colors ${
                industry === f.id ? 'border-ink bg-ink text-paper' : 'border-line text-ink hover:border-support'
              }`}
            >
              {f.label}
            </button>
          ))}
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 pb-24 sm:px-8">
        <Reveal stagger key={industry} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <div key={p.title} className="group overflow-hidden rounded-2xl border border-line bg-card">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.image} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <p className="font-display text-[11px] uppercase tracking-[0.1em] text-accent">{p.tag}</p>
                <h3 className="mt-1 font-display text-lg font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 text-sm text-muted">{p.body}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      <MarketingFooter />
    </>
  )
}
