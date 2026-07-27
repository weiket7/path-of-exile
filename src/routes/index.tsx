import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { storageGet } from '../lib/storage'

export const Route = createFileRoute('/')({ component: Home })

const GUIDE_CARDS = [
  {
    idx: '01',
    title: 'League-Start Builds',
    description:
      'Six budget-safe builds tuned for act clear and the first map tiers, one per attribute archetype.',
    href: '/builds/league-start',
    cta: 'View builds →',
  },
  {
    idx: '02',
    title: 'Farm Builds',
    description:
      'Endgame currency, bossing, and juiced-map setups for once your league starter has capped out.',
    href: '/builds/farm',
    cta: 'View builds →',
  },
  {
    idx: '03',
    title: 'Leveling Guide',
    description:
      'Act 1 through Act 10 — waypoints, gem swaps, and the boss fights that catch new characters out.',
    href: '/guides/leveling',
    cta: 'Read guide →',
  },
  {
    idx: '04',
    title: 'Atlas Completion',
    description:
      'Atlas passive tree priorities, Voidstones, the Conquerors, and what to run before red maps.',
    href: '/guides/atlas',
    cta: 'Read guide →',
  },
]

function Home() {
  return (
    <main>
      <section className="wh-wrap wh-hero">
        <div className="wh-eyebrow">Wraeclast · League Companion</div>
        <h1>Builds, guides, and your run — in one panel.</h1>
        <p className="wh-lede">
          Not another wiki mirror. Wraeclast Hub is a working desk for your
          league: vetted league-start and farm builds, act-by-act leveling
          notes, an Atlas completion checklist, and a to-do list that
          remembers what you were doing.
        </p>
        <div className="wh-hero-actions">
          <a className="wh-btn wh-btn-primary" href="/builds/league-start">
            Start a league build
          </a>
          <a className="wh-btn wh-btn-ghost" href="/guides/atlas">
            Atlas checklist
          </a>
        </div>
        <div className="wh-stat-strip">
          <div className="wh-stat">
            <b className="wh-mono">6</b>
            <span>League-start builds</span>
          </div>
          <div className="wh-stat">
            <b className="wh-mono">6</b>
            <span>Farm builds</span>
          </div>
          <div className="wh-stat">
            <b className="wh-mono">2</b>
            <span>Core guides</span>
          </div>
          <div className="wh-stat">
            <b className="wh-mono">8</b>
            <span>Bookmarked tools</span>
          </div>
        </div>
      </section>

      <section className="wh-wrap">
        <div className="wh-section-head">
          <h2>Jump in</h2>
          <span className="wh-mono" style={{ color: 'var(--wh-muted)', fontSize: 13 }}>
            6 sections
          </span>
        </div>
        <div className="wh-grid-nav">
          {GUIDE_CARDS.map((card) => (
            <a key={card.href} className="wh-card wh-nav-card" href={card.href}>
              <span className="wh-idx wh-mono">{card.idx}</span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <span className="wh-go">{card.cta}</span>
            </a>
          ))}

          <a className="wh-card wh-nav-card" href="/todo">
            <span className="wh-idx wh-mono">05</span>
            <h3>To-Do List</h3>
            <p>
              Track league goals — leveling, atlas, farming, trading — saved
              locally in this browser.
            </p>
            <TodoCount />
          </a>

          <a className="wh-card wh-nav-card" href="/bookmarks">
            <span className="wh-idx wh-mono">06</span>
            <h3>Bookmarks</h3>
            <p>
              Path of Building, poe.ninja, trade, and crafting tools — plus
              room to pin your own.
            </p>
            <BookmarkCount />
          </a>
        </div>
      </section>
    </main>
  )
}

function TodoCount() {
  const [label, setLabel] = useState('Loading…')

  useEffect(() => {
    const tasks = storageGet<Array<{ done: boolean }>>('wh_todo_tasks', [])
    const open = tasks.filter((task) => !task.done).length
    setLabel(
      tasks.length ? `${open} open task${open === 1 ? '' : 's'} →` : 'Set your first goal →',
    )
  }, [])

  return <span className="wh-go wh-live-count">{label}</span>
}

function BookmarkCount() {
  const [label, setLabel] = useState('8 tools saved →')

  useEffect(() => {
    const bookmarks = storageGet<Array<unknown>>('wh_bookmarks_custom', [])
    setLabel(`${8 + bookmarks.length} tools saved →`)
  }, [])

  return <span className="wh-go">{label}</span>
}
