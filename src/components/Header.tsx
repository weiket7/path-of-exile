import { useState } from 'react'
import { Link } from '@tanstack/react-router'

const NAV_LINKS = [
  { label: 'League Start', href: '/builds/league-start' },
  { label: 'End Game', href: '/builds/farm' },
  { label: 'Leveling', href: '/guides/leveling' },
  { label: 'Atlas', href: '/guides/atlas' },
  { label: 'Creators', href: '/creators' },
  { label: 'Bookmarks', href: '/bookmarks' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="wh-topnav">
      <div className="wh-wrap">
        <Link to="/" className="wh-brand" onClick={() => setOpen(false)}>
          <span className="wh-mark" />
          POE Waypoint
        </Link>

        <ul className={open ? 'wh-navlinks is-open' : 'wh-navlinks'}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                activeProps={{ className: 'is-active' }}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="wh-nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </div>
    </header>
  )
}
