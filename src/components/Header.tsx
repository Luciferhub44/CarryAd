import { Link } from 'react-router-dom'
import { Show, SignInButton, UserButton } from '@clerk/react'
import LogoMark from './LogoMark'
import InkLink from './InkLink'

type HeaderProps =
  | { variant: 'site' }
  | { variant: 'app'; label: string }

export default function Header(props: HeaderProps) {
  return (
    <header>
      <LogoMark />
      <span className="wordmark">
        carry<b>ad</b>
        <span className="dot">.</span>
      </span>

      {props.variant === 'app' && <span className="app-tag">{props.label}</span>}

      <nav>
        {props.variant === 'site' ? (
          <>
            <div className="nav-links">
              <InkLink to="#services">services</InkLink>
              <InkLink to="#estimator">pricing</InkLink>
              <InkLink to="#work">work</InkLink>
              <InkLink to="#book">contact</InkLink>
            </div>
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="portal-btn">Portal login</button>
              </SignInButton>
            </Show>
            <Show when="signed-in">
              <Link className="portal-btn" to="/portal">
                Go to portal
              </Link>
              <UserButton />
            </Show>
          </>
        ) : (
          <>
            <InkLink to="/">Back to site</InkLink>
            <UserButton />
          </>
        )}
      </nav>
    </header>
  )
}
