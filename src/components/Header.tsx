import { Link } from 'react-router-dom'
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
            <Link className="portal-btn" to="/portal">
              Portal login
            </Link>
          </>
        ) : (
          <>
            <InkLink to="/">Back to site</InkLink>
            <Link className="portal-btn" to="/">
              Log out
            </Link>
          </>
        )}
      </nav>
    </header>
  )
}
