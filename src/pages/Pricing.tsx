import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import MarketingHeader from '../components/MarketingHeader'
import MarketingFooter from '../components/MarketingFooter'
import Reveal from '../components/Reveal'

const reelTiers = [
  { id: 'none', label: 'None', price: 0 },
  { id: '4', label: '4 reels/mo', price: 450 },
  { id: '8', label: '8 reels/mo', price: 800 },
  { id: '12', label: '12 reels/mo', price: 1100 },
] as const

function PillCheckbox({ id, label, checked, onChange }: { id: string; label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label
      htmlFor={id}
      className={`cursor-pointer rounded-full border px-4 py-2.5 font-display text-sm transition-colors ${
        checked ? 'border-ink bg-ink text-paper' : 'border-line bg-paper text-ink hover:border-support'
      }`}
    >
      <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only" />
      {label}
    </label>
  )
}

export default function Pricing() {
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
      lines.push({ label: `Social: ${tier.label}`, value: `$${tier.price.toLocaleString()}/mo` })
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

  return (
    <>
      <MarketingHeader />

      <section className="mx-auto max-w-[1400px] px-5 pb-10 pt-16 sm:px-8 sm:pt-24">
        <Reveal>
          <p className="font-display text-xs uppercase tracking-[0.14em] text-support">Package builder</p>
          <h1 className="mt-4 max-w-2xl font-display text-[clamp(34px,6vw,58px)] font-semibold leading-[1.02] text-ink">
            Pick what you need. Watch the number move.
          </h1>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 pb-24 sm:px-8">
        <Reveal className="grid grid-cols-1 gap-10 rounded-3xl border border-line bg-card p-6 sm:p-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
          <div className="flex flex-col gap-9">
            <div>
              <span className="font-display text-sm font-semibold text-ink">Website</span>
              <div className="mt-3 flex flex-wrap gap-2.5">
                <PillCheckbox id="opt-web" label="New website build: $1,400" checked={website} onChange={setWebsite} />
                <PillCheckbox id="opt-hosting" label="Hosting & upkeep: $65/mo" checked={hosting} onChange={setHosting} />
              </div>
            </div>

            <div>
              <span className="font-display text-sm font-semibold text-ink">Social media management</span>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {reelTiers.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setReelTier(t.id)}
                    className={`rounded-full border px-4 py-2.5 font-display text-sm transition-colors ${
                      reelTier === t.id ? 'border-accent bg-accent text-paper' : 'border-line bg-paper text-ink hover:border-support'
                    }`}
                  >
                    {t.id === 'none' ? 'None' : `${t.label}: $${t.price.toLocaleString()}`}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="font-display text-sm font-semibold text-ink">Add-ons</span>
              <div className="mt-3 flex flex-wrap gap-2.5">
                <PillCheckbox id="opt-gbp" label="Google Business optimization: $250/mo" checked={gbp} onChange={setGbp} />
                <PillCheckbox id="opt-photo" label="Monthly photography session: $500/mo" checked={photo} onChange={setPhoto} />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl bg-ink p-8 text-paper">
            <div>
              <p className="font-display text-xs uppercase tracking-[0.14em] text-support">Estimated investment</p>
              <p className="mt-3 font-display text-[clamp(34px,4vw,52px)] font-bold">
                ${estimate.monthly.toLocaleString()}
                <span className="text-base font-normal text-support">/mo</span>
              </p>
              <p className="text-sm text-[#9C9184]">
                {estimate.oneTime > 0 ? `+ $${estimate.oneTime.toLocaleString()} one-time build` : ''}
              </p>
              <ul className="mt-6 flex flex-col gap-2 text-sm text-[#D8CFC0]">
                {estimate.lines.length === 0 ? (
                  <li>Nothing selected yet</li>
                ) : (
                  estimate.lines.map((l) => (
                    <li key={l.label} className="flex justify-between gap-3">
                      <span>{l.label}</span>
                      <span className="text-paper">{l.value}</span>
                    </li>
                  ))
                )}
              </ul>
            </div>
            <Link
              to="/contact"
              className="mt-8 rounded-full bg-accent px-6 py-3.5 text-center font-display text-sm font-bold text-paper transition-transform hover:scale-[.97]"
            >
              Book a discovery call
            </Link>
          </div>
        </Reveal>
      </section>

      <MarketingFooter />
    </>
  )
}
