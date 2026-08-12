import { useState } from 'react'
import MarketingHeader from '../components/MarketingHeader'
import MarketingFooter from '../components/MarketingFooter'
import Reveal from '../components/Reveal'

const interests = ['Branding', 'Photography', 'Web', 'Social & SEO']

export default function Contact() {
  const [sent, setSent] = useState(false)

  return (
    <>
      <MarketingHeader />

      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <Reveal
          as="section"
          className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 rounded-3xl bg-ink px-6 py-14 sm:px-10 sm:py-20 lg:grid-cols-2 lg:gap-20"
        >
          <div>
            <p className="font-display text-xs uppercase tracking-[0.14em] text-support">Start a story</p>
            <h1 className="mt-4 font-display text-[clamp(32px,5vw,48px)] font-semibold leading-[1.05] text-paper">
              Tell us about your corner of the block.
            </h1>
            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-[#D8CFC0]">
              A 20-minute discovery call. No deck, no pressure, just a look at what&rsquo;s already working
              and what carrying it further could look like.
            </p>
            <p className="mt-4 text-[17px] text-[#D8CFC0]">
              Prefer to write first? Reach us at{' '}
              <a href="mailto:info@carryad.com" className="text-accent-dark underline decoration-accent-dark/50 underline-offset-4 hover:decoration-accent-dark">
                info@carryad.com
              </a>
            </p>
            <p className="mt-6 font-voice text-lg italic text-accent-dark">&ldquo;your story, carried everywhere&rdquo;</p>
          </div>

          <form
            className="flex flex-col gap-3.5"
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
          >
            <input
              type="text"
              placeholder="Business name"
              required
              className="w-full rounded-xl border border-[#52493C] bg-[#3A342C] px-4 py-3.5 text-sm text-paper placeholder:text-[#9C9184]"
            />
            <input
              type="text"
              placeholder="Your name"
              required
              className="w-full rounded-xl border border-[#52493C] bg-[#3A342C] px-4 py-3.5 text-sm text-paper placeholder:text-[#9C9184]"
            />
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full rounded-xl border border-[#52493C] bg-[#3A342C] px-4 py-3.5 text-sm text-paper placeholder:text-[#9C9184]"
            />
            <input
              type="tel"
              placeholder="Phone number"
              required
              className="w-full rounded-xl border border-[#52493C] bg-[#3A342C] px-4 py-3.5 text-sm text-paper placeholder:text-[#9C9184]"
            />

            <div>
              <p className="mb-2 text-xs text-[#9C9184]">Interested in</p>
              <div className="flex flex-wrap gap-2.5">
                {interests.map((label, i) => (
                  <label
                    key={label}
                    className="flex cursor-pointer items-center gap-2 rounded-full border border-[#52493C] bg-[#3A342C] px-3.5 py-2 text-[13px] text-paper"
                  >
                    <input type="checkbox" defaultChecked={i === 0} className="h-3.5 w-3.5 shrink-0 accent-accent" />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 rounded-full bg-accent px-6 py-3.5 font-display text-sm font-bold text-paper transition-transform hover:scale-[.97]"
            >
              {sent ? 'Request sent' : 'Request discovery call'}
            </button>
            {sent && (
              <p className="font-display text-[15px] text-accent-dark">
                Got it, we&rsquo;ll reach out within one business day.
              </p>
            )}
            <p className="text-xs text-[#9C9184]">No spam, no auto-dial. Just a real reply from a real person at carryad.</p>
          </form>
        </Reveal>
      </section>

      <MarketingFooter />
    </>
  )
}
