import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { storageGet, storageSet } from '../lib/storage'

export const Route = createFileRoute('/bookmarks')({ component: Bookmarks })

const CUSTOM_KEY = 'wh_bookmarks_custom'

interface Tool {
  name: string
  url: string
  desc: string
  /** Reference link (announcement/source) — stored, not rendered. */
  ref?: string
}

const DEFAULT_TOOLS: Array<Tool> = [
  {
    name: 'Path of Building Community',
    url: 'https://pathofbuilding.community/',
    desc: 'Offline build planner — DPS, defenses, and passive tree in one place.',
  },
  {
    name: 'poe.ninja',
    url: 'https://poe.ninja/',
    desc: 'Live currency and item pricing plus build stats aggregated from real characters.',
  },
  {
    name: 'Official Trade Site',
    url: 'https://www.pathofexile.com/trade',
    desc: 'The source-of-truth trade search — pair it with the overlay below.',
  },
  {
    name: 'Awakened PoE Trade',
    url: 'https://github.com/SnosMe/awakened-poe-trade',
    desc: 'In-game price-check overlay that reads item text on hover.',
  },
  {
    name: 'Craft of Exile',
    url: 'https://www.craftofexile.com/',
    desc: 'Crafting simulator for planning currency spend before you touch real items.',
  },
  {
    name: 'PoEDB',
    url: 'https://poedb.tw/',
    desc: 'Raw game data — gems, mods, monster stats, straight from the client.',
  },
  {
    name: 'PoE Wiki',
    url: 'https://www.poewiki.net/',
    desc: 'Community wiki for mechanics, quests, and item lore.',
  },
  {
    name: 'Cluster Master',
    url: 'https://clusters.poetools.dev/',
    desc: 'Finds the cheapest cluster jewel combo for your notables — three search modes.',
    ref: 'https://www.reddit.com/r/pathofexile/comments/1scwteb/cluster_master_find_cheapest_cluster_combo_3_modes/',
  },
  {
    name: 'Wealthy Exile',
    url: 'https://wealthyexile.com/',
    desc: 'Wealth tracker with currency-per-hour stash snapshots, farming strategy profitability, and bulk trade.',
  },
  {
    name: 'FilterBlade',
    url: 'https://www.filterblade.xyz/',
    desc: 'Loot filter generator and customizer for every strictness level.',
  },
]

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

function Bookmarks() {
  const [custom, setCustom] = useState<Array<Tool>>([])
  const [search, setSearch] = useState('')
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    setCustom(storageGet<Array<Tool>>(CUSTOM_KEY, []))
  }, [])

  function persist(next: Array<Tool>) {
    setCustom(next)
    storageSet(CUSTOM_KEY, next)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedName = name.trim()
    const trimmedUrl = url.trim()
    if (!trimmedName || !trimmedUrl) return

    persist([...custom, { name: trimmedName, url: trimmedUrl, desc: 'Custom bookmark' }])
    setName('')
    setUrl('')
  }

  function removeCustom(tool: Tool) {
    persist(custom.filter((t) => !(t.url === tool.url && t.name === tool.name)))
  }

  const query = search.trim().toLowerCase()
  const matches = (tool: Tool) => query.length === 0 || tool.name.toLowerCase().includes(query)

  const visibleDefaults = useMemo(() => DEFAULT_TOOLS.filter(matches), [query])
  const visibleCustom = useMemo(() => custom.filter(matches), [custom, query])

  return (
    <main className="wh-wrap">
      <div className="wh-page-head">
        <div className="wh-eyebrow">06 · Tool</div>
        <h1>Bookmarks</h1>
        <p>
          The community tools you'll actually reach for mid-session — build
          planning, market data, crafting math, and trade. Pin your own below
          the defaults.
        </p>
      </div>

      <div className="wh-bm-toolbar">
        <input
          type="text"
          placeholder="Search bookmarks…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="wh-section-label">Core tools · {DEFAULT_TOOLS.length}</div>
      <div className="wh-tool-grid">
        {visibleDefaults.map((tool) => (
          <ToolCard key={tool.name} tool={tool} />
        ))}
      </div>

      <div className="wh-section-label">Your bookmarks · {custom.length}</div>
      <div className="wh-tool-grid">
        {custom.length === 0 ? (
          <div className="wh-empty-custom">Nothing pinned yet — add a tool below.</div>
        ) : (
          visibleCustom.map((tool) => (
            <ToolCard key={`${tool.name}-${tool.url}`} tool={tool} onRemove={() => removeCustom(tool)} />
          ))
        )}
      </div>

      <form className="wh-add-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tool name"
          required
          maxLength={40}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="url"
          placeholder="https://…"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit" className="wh-btn wh-btn-primary">
          Add bookmark
        </button>
      </form>
    </main>
  )
}

function ToolCard({ tool, onRemove }: { tool: Tool; onRemove?: () => void }) {
  return (
    <article className="wh-card wh-tool-card">
      <div className="wh-tool-top">
        <div className="wh-tool-icon">{initials(tool.name)}</div>
        <h4>
          <a
            className="wh-tool-link"
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {tool.name}
          </a>
        </h4>
      </div>
      <p>{tool.desc}</p>
      {onRemove && (
        <div className="wh-tool-foot">
          <button type="button" className="wh-del" title="Remove" onClick={onRemove}>
            ✕
          </button>
        </div>
      )}
    </article>
  )
}
