import { Link } from 'react-router-dom'
import type { CSSProperties, ReactNode } from 'react'

const underline = (
  <svg viewBox="0 0 180 14" preserveAspectRatio="none" aria-hidden="true">
    <path
      d="M 4 9 C 50 3 100 12 176 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="4.5"
      strokeLinecap="round"
    />
  </svg>
)

export default function InkLink({
  to,
  children,
  className = '',
  style,
}: {
  to: string
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  const classes = `ink-link ${className}`.trim()

  if (to.startsWith('/')) {
    return (
      <Link to={to} className={classes} style={style}>
        {children}
        {underline}
      </Link>
    )
  }

  return (
    <a href={to} className={classes} style={style}>
      {children}
      {underline}
    </a>
  )
}
