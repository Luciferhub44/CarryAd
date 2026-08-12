import { Link } from 'react-router-dom'
import MarketingHeader from '../components/MarketingHeader'
import MarketingFooter from '../components/MarketingFooter'
import Reveal from '../components/Reveal'

const services = [
  {
    n: '01',
    image: '/media/service-branding.jpg',
    title: 'Brand identity',
    body: 'Logo suites, typography, color, menu design and packaging guidelines built around what already makes the place recognizable.',
    items: ['Logo suite & brand system', 'Menu & signage design', 'Packaging guidelines', 'Color & typography rules'],
  },
  {
    n: '02',
    image: '/media/service-photo.jpg',
    title: 'Photography & media',
    body: "Dish and beverage shoots, interior atmosphere reels, staff spotlights: the visual proof that gets screenshotted and shared.",
    items: ['Monthly photo sessions', 'Short-form video reels', 'Interior & atmosphere shots', 'Staff & process spotlights'],
  },
  {
    n: '03',
    image: '/media/service-web.jpg',
    title: 'Web development',
    body: 'Fast, mobile-first web pages, digital QR menus and reservation links built to convert local search traffic, not just look good.',
    items: ['Mobile-first web build', 'Digital QR menus', 'Online ordering & bookings', 'Local SEO foundations'],
  },
  {
    n: '04',
    image: '/media/service-seo.jpg',
    title: 'Social & local SEO',
    body: 'Monthly Instagram and TikTok management, Google Maps ranking, and search optimization for the questions people actually ask.',
    items: ['Instagram & TikTok management', 'Google Business optimization', 'Local search ranking', 'Monthly content calendar'],
  },
]

export default function Services() {
  return (
    <>
      <MarketingHeader />

      <section className="mx-auto max-w-[1400px] px-5 pb-10 pt-16 sm:px-8 sm:pt-24">
        <Reveal>
          <p className="font-display text-xs uppercase tracking-[0.14em] text-support">What we do</p>
          <h1 className="mt-4 max-w-2xl font-display text-[clamp(34px,6vw,58px)] font-semibold leading-[1.02] text-ink">
            Everything a corner shop needs, carried as one story.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted">
            Not four vendors juggling four different opinions of the brand. One team, one story, across
            branding, photography, the website, and everywhere the business shows up online.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1400px] divide-y divide-line px-5 sm:px-8">
        {services.map((s, i) => (
          <Reveal key={s.n} as="section" className={`grid grid-cols-1 items-center gap-10 py-16 lg:grid-cols-2 lg:gap-16 ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
            <div className="overflow-hidden rounded-2xl border border-line">
              <img src={s.image} alt="" className="aspect-[4/3] w-full object-cover" />
            </div>
            <div>
              <span className="font-display text-sm text-accent">{s.n}</span>
              <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">{s.title}</h2>
              <p className="mt-4 max-w-md text-[17px] leading-relaxed text-muted">{s.body}</p>
              <ul className="mt-6 flex flex-col gap-2.5">
                {s.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 font-display text-sm text-ink">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="px-5 pb-24 pt-8 sm:px-8">
        <Reveal
          as="section"
          className="mx-auto flex max-w-[1400px] flex-col items-start gap-6 rounded-3xl bg-ink px-8 py-16 sm:items-center sm:px-16 sm:text-center"
        >
          <p className="font-display text-xs uppercase tracking-[0.14em] text-support">Ready to see numbers?</p>
          <h2 className="max-w-xl font-display text-3xl font-semibold text-paper sm:text-4xl">
            Pick what you need. Watch the number move.
          </h2>
          <Link
            to="/pricing"
            className="mt-2 rounded-full bg-accent px-8 py-4 font-display text-sm font-bold text-paper transition-transform hover:scale-[.97]"
          >
            Build your package
          </Link>
        </Reveal>
      </section>

      <MarketingFooter />
    </>
  )
}
