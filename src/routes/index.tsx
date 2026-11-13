import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { storageGet } from '../lib/storage'
import { LEAGUE_START_COUNT } from './builds/league-start'
import { FARM_COUNT } from './builds/farm'
import { ATLAS_TREE_COUNT } from './guides/atlas'

export const Route = createFileRoute('/')({ component: Home })

const GUIDE_CARDS = [
  {
    idx: '01',
    title: 'League Starters',
    description:
      'Budget-safe builds tuned for act clear and the first map tiers, across all three attribute archetypes.',
    href: '/builds/league-start',
    cta: 'View builds →',
    count: LEAGUE_START_COUNT,
    countLabel: 'builds',
  },
  {
    idx: '02',
    title: 'End Game',
    description:
      'Endgame currency, bossing, and juiced-map setups for once your league starter has capped out.',
    href: '/builds/farm',
    cta: 'View builds →',
    count: FARM_COUNT,
    countLabel: 'builds',
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
    title: 'Atlas Trees',
    description:
      'Atlas passive tree priorities, Voidstones, the Conquerors, and what to run before red maps.',
    href: '/guides/atlas',
    cta: 'Read guide →',
    count: ATLAS_TREE_COUNT,
    countLabel: 'trees',
  },
] as const

function Home() {
  return (
    <main>
      <section className="wh-wrap wh-hero">
        <div className="wh-eyebrow">Wraeclast · League Companion</div>
        <h1>Builds, guides, and your run — in one panel.</h1>
        <p className="wh-lede">
          Not another wiki mirror. POE Waypoint is a working desk for your
          league: vetted league-start and farm builds, act-by-act leveling
          notes, an Atlas completion checklist, and a to-do list that
          remembers what you were doing.
        </p>
        <div className="wh-hero-actions">
          <Link className="wh-btn wh-btn-primary" to="/builds/league-start">
            Start a league build
          </Link>
          <Link className="wh-btn wh-btn-ghost" to="/guides/atlas">
            Atlas checklist
          </Link>
        </div>
      </section>

      <section className="wh-wrap">
        <div className="wh-grid-nav">
          {GUIDE_CARDS.map((card) => (
            <Link key={card.href} className="wh-card wh-nav-card" to={card.href}>
              <div className="wh-nav-card-top">
                <span className="wh-idx wh-mono">{card.idx}</span>
                {'count' in card ? (
                  <span className="wh-card-count wh-mono">
                    <b>{card.count}</b> {card.countLabel}
                  </span>
                ) : null}
              </div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <span className="wh-go">{card.cta}</span>
            </Link>
          ))}

          <Link className="wh-card wh-nav-card" to="/todo">
            <span className="wh-idx wh-mono">05</span>
            <h3>To-Do List</h3>
            <p>
              Track league goals — leveling, atlas, farming, trading — saved
              locally in this browser.
            </p>
            <TodoCount />
          </Link>

          <Link className="wh-card wh-nav-card" to="/bookmarks">
            <span className="wh-idx wh-mono">06</span>
            <h3>Bookmarks</h3>
            <p>
              Path of Building, poe.ninja, trade, and crafting tools — plus
              room to pin your own.
            </p>
            <BookmarkCount />
          </Link>
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
