import { UserButton } from '@clerk/react'
import LogoMark from './LogoMark'
import InkLink from './InkLink'

export default function Header({ label }: { label: string }) {
  return (
    <header>
      <LogoMark />
      <span className="wordmark">
        carry<b>ad</b>
        <span className="dot">.</span>
      </span>

      <span className="app-tag">{label}</span>

      <nav>
        <InkLink to="/">Back to site</InkLink>
        <UserButton />
      </nav>
    </header>
  )
}
