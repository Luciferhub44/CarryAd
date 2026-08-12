import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Show, SignInButton, UserButton } from '@clerk/react'
import LogoMark from './LogoMark'

const NAV = [
  { to: '/services', label: 'Services', n: '01' },
  { to: '/work', label: 'Work', n: '02' },
  { to: '/pricing', label: 'Pricing', n: '03' },
  { to: '/contact', label: 'Contact', n: '04' },
]

export default function MarketingHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-5 py-4 sm:px-8">
        <Link to="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setOpen(false)}>
          <LogoMark />
          <span className="font-display text-lg font-medium tracking-tight text-ink">
            carry<b className="font-bold text-accent">ad</b>
            <span className="font-bold">.</span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `group flex items-center gap-1.5 font-display text-sm ${isActive ? 'text-accent' : 'text-ink hover:text-accent'} transition-colors`
              }
            >
              <span className="text-[10px] text-muted group-hover:text-accent">{item.n}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3 md:ml-6">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="rounded-full bg-ink px-4 py-2 font-display text-sm text-paper transition-transform hover:scale-95">
                Portal login
              </button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <Link
              to="/portal"
              className="rounded-full bg-ink px-4 py-2 font-display text-sm text-paper transition-transform hover:scale-95"
            >
              Go to portal
            </Link>
            <UserButton />
          </Show>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <span className={`h-px w-5 bg-ink transition-transform ${open ? 'translate-y-[3px] rotate-45' : ''}`} />
            <span className={`h-px w-5 bg-ink transition-transform ${open ? '-translate-y-[3px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-line px-5 py-4 md:hidden">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-2 py-2.5 font-display text-base ${isActive ? 'text-accent' : 'text-ink'}`
              }
            >
              <span className="text-[10px] text-muted">{item.n}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
