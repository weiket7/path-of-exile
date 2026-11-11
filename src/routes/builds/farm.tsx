import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import BuildLinks from '../../components/BuildLinks'
import type { BuildLinkSet, Creator } from '../../components/BuildLinks'

export const Route = createFileRoute('/builds/farm')({ component: FarmBuilds })

type Category = 'bossing' | 'maps' | 'delirium'

interface Build {
  title: string
  classLine: string
  budget: string
  categories: Array<Category>
  tags: Array<{ label: string; pill: string }>
  desc: string
  why: string
  creator?: Creator
  links?: BuildLinkSet
}

const BUILDS: Array<Build> = [
  {
    title: 'Occultist CoC FroSS',
    classLine: 'Witch \u2192 Occultist',
    budget: 'Med\u2013High',
    categories: ['maps'],
    tags: [
      { label: 'Cast on Crit', pill: 'wh-pill-gem' },
      { label: 'Crit / Cold', pill: 'wh-pill-magic' },
    ],
    desc: 'Cast-on-Critical-Strike setup where your attack does nothing but trigger the spells that actually kill \u2014 Occultist supplies the energy shield recovery and curse effect that hold it together.',
    why: 'the guide scales the same build across 5, 50, and 500 divine budgets, so it keeps working as your currency grows instead of needing a rebuild.',
    creator: {
      name: 'xRoGeSx',
      channel: 'https://www.youtube.com/@xRoGeSx',
    },
    links: { youtube: 'https://www.youtube.com/watch?v=4JZoTFnCmYI' },
  },
]

const FILTERS: Array<{ key: 'all' | Category; label: string }> = [
  { key: 'all', label: 'All' },
  { key: 'bossing', label: 'Bossing' },
  { key: 'maps', label: 'Juiced Maps' },
  { key: 'delirium', label: 'Delirium' },
]

function FarmBuilds() {
  const [filter, setFilter] = useState<'all' | Category>('all')
  const visible = BUILDS.filter(
    (build) => filter === 'all' || build.categories.includes(filter),
  )

  return (
    <main className="wh-wrap">
      <div className="wh-page-head">
        <div className="wh-eyebrow">02 · Builds</div>
        <h1>Late Game Builds</h1>
      </div>

      <div className="wh-filter-bar" role="group" aria-label="Filter by farm target">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            className={filter === f.key ? 'wh-filter-btn is-active' : 'wh-filter-btn'}
            onClick={() => setFilter(f.key)}
          >
            {f.key === 'all' ? `All · ${BUILDS.length}` : f.label}
          </button>
        ))}
        <span className="wh-filter-count">Showing {visible.length}</span>
      </div>

      <div className="wh-build-grid">
        {visible.map((build) => (
          <article key={build.title} className="wh-card wh-build-card">
            <div className="wh-build-top">
              <div>
                <h3>{build.title}</h3>
                <div className="wh-class-line">{build.classLine}</div>
              </div>
              <div className="wh-budget">
                Budget
                <b>{build.budget}</b>
              </div>
            </div>
            <div className="wh-tag-row">
              {build.tags.map((tag) => (
                <span key={tag.label} className={`wh-pill ${tag.pill}`}>
                  {tag.label}
                </span>
              ))}
            </div>
            <p className="wh-desc">{build.desc}</p>
            <p className="wh-why">
              <b>Why farm this:</b> {build.why}
            </p>
            <BuildLinks creator={build.creator} links={build.links} />
          </article>
        ))}
      </div>
    </main>
  )
}
