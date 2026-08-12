import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import LogoMark from './LogoMark'

const socialLinks: { name: string; href: string; icon: ReactNode }[] = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/carryad.agency',
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
      </>
    ),
  },
  { name: 'X', href: 'https://x.com/carryad.agency', icon: <path d="M4.5 4.5l15 15M19.5 4.5l-15 15" /> },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/carryad.agency',
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <circle cx="8" cy="8.3" r="1" fill="currentColor" stroke="none" />
        <path d="M8 11v6" />
        <path d="M13 17v-3.5a2 2 0 0 1 4 0V17" />
        <path d="M13 11v6" />
      </>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/carryad.agency',
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <path
          d="M14 8.5h-1.3a1.7 1.7 0 0 0-1.7 1.7V12H8.5v3H11v6h3v-6h2.2l.4-3H14v-1.3a.4.4 0 0 1 .4-.4H16.5V8.5H14z"
          fill="currentColor"
          stroke="none"
        />
      </>
    ),
  },
]

const NAV = [
  { to: '/services', label: 'Services' },
  { to: '/work', label: 'Work' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/contact', label: 'Contact' },
]

export default function MarketingFooter() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <LogoMark />
              <span className="font-display text-lg font-medium text-ink">
                carry<b className="font-bold text-accent">ad</b>.
              </span>
            </Link>
            <p className="mt-4 max-w-xs font-voice text-[15px] italic text-muted">
              &ldquo;your story, carried everywhere&rdquo;
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            <span className="font-display text-xs uppercase tracking-[0.14em] text-support">Site</span>
            {NAV.map((item) => (
              <Link key={item.to} to={item.to} className="font-display text-sm text-ink hover:text-accent">
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2.5">
            <span className="font-display text-xs uppercase tracking-[0.14em] text-support">Follow</span>
            <div className="flex gap-4">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`carryad.agency on ${s.name}`}
                  className="text-muted transition-colors hover:text-accent"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-[19px] w-[19px]" aria-hidden="true">
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {new Date().getFullYear()} carryad. Media &amp; growth for local businesses.</span>
          <Link to="/admin" className="hover:text-accent">
            agency access
          </Link>
        </div>
      </div>
    </footer>
  )
}
