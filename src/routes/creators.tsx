import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/creators')({ component: Creators })

interface Creator {
  name: string
  handle: string
  focus: string
  blurb: string
}

const CREATORS: Array<Creator> = [
  {
    name: 'Zizaran',
    handle: '@Zizaran',
    focus: 'League start',
    blurb:
      'League-start guides, build tier lists, and the community race events each league.',
  },
  {
    name: 'GhazzyTV',
    handle: '@GhazzyTV',
    focus: 'Build guides',
    blurb:
      'Minion and summoner specialist — long-running written and video build guides.',
  },
  {
    name: 'Pohx',
    handle: '@PohxKappa',
    focus: 'Build guides',
    blurb:
      'Righteous Fire, exhaustively. Maintains a dedicated wiki for the archetype.',
  },
  {
    name: 'Mathil',
    handle: '@Mathilification',
    focus: 'Off-meta',
    blurb:
      'Unique-driven, deliberately off-meta characters. Showcase rather than step-by-step guide.',
  },
  {
    name: 'Palsteron',
    handle: '@Palsteron',
    focus: 'Bossing',
    blurb:
      'Boss-killer builds with detailed written notes and gear progression paths.',
  },
  {
    name: 'Subtractem',
    handle: '@Subtractem',
    focus: 'League start',
    blurb:
      'League starters and build guides with a lot of the reasoning left in.',
  },
  {
    name: 'Grimro',
    handle: '@Grimro',
    focus: 'Theorycraft',
    blurb: 'Build breakdowns and mechanics theorycrafting.',
  },
  {
    name: 'Jungroan',
    handle: '@Jungroan',
    focus: 'Theorycraft',
    blurb: 'Deep theorycrafting and build optimisation, heavy on the numbers.',
  },
  {
    name: 'CaptainLance9',
    handle: '@CaptainLance9',
    focus: 'League start',
    blurb: 'League-start build guides aimed at getting you moving quickly.',
  },
  {
    name: 'Tytykiller',
    handle: '@Tytykiller',
    focus: 'League start',
    blurb: 'Build guides and league-start planning, plus event coverage.',
  },
  {
    name: 'ZiggyD Gaming',
    handle: '@ZiggyDGaming',
    focus: 'Beginner',
    blurb:
      'Beginner-friendly explainers and game-design discussion for ARPGs generally.',
  },
  {
    name: 'Steelmage',
    handle: '@Steelmage',
    focus: 'Bossing',
    blurb: 'Boss racing and hardcore play at a very high level.',
  },
  {
    name: 'Empyrian',
    handle: '@Empyriangaming',
    focus: 'Endgame',
    blurb: 'Group play, hardcore, and high-end endgame farming.',
  },
  {
    name: 'Fubgun',
    handle: '@Fubgun',
    focus: 'Endgame',
    blurb: 'Speed farming and heavily juiced mapping.',
  },
  {
    name: 'Nugiyen',
    handle: '@Nugiyen',
    focus: 'Endgame',
    blurb: 'High-end crafting and magic-find farming.',
  },
  {
    name: 'Woolfio',
    handle: '@Woolfio',
    focus: 'Endgame',
    blurb: 'Deep delve and other long-tail endgame content.',
  },
  {
    name: 'Big Ducks',
    handle: '@Bigducks',
    focus: 'Economy',
    blurb: 'Currency-making and farming strategy breakdowns.',
  },
  {
    name: 'Ventrua',
    handle: '@Ventrua',
    focus: 'Economy',
    blurb: 'Trade, economy, and league-mechanic profitability.',
  },
  {
    name: 'Tripolar Bear',
    handle: '@TripolarBear',
    focus: 'SSF / HC',
    blurb: 'Solo self-found and hardcore play.',
  },
  {
    name: 'Sirgog',
    handle: '@Sirgog',
    focus: 'Analysis',
    blurb: 'Long-form patch analysis and mechanics discussion.',
  },
]

function Creators() {
  return (
    <main className="wh-wrap">
      <div className="wh-page-head">
        <div className="wh-eyebrow">05 · Community</div>
        <h1>Creators</h1>
        <p>
          Path of Exile content creators worth following, grouped loosely by
          what they cover. Handles link straight to the channel.
        </p>
      </div>

      <div className="wh-creator-grid">
        {CREATORS.map((c) => (
          <a
            key={c.handle}
            className="wh-card wh-creator"
            href={`https://www.youtube.com/${c.handle}`}
            target="_blank"
            rel="noreferrer"
          >
            <div className="wh-creator-top">
              <b>{c.name}</b>
              <span className="wh-creator-focus wh-mono">{c.focus}</span>
            </div>
            <span className="wh-creator-handle wh-mono">{c.handle}</span>
            <span className="wh-creator-blurb">{c.blurb}</span>
          </a>
        ))}
      </div>
    </main>
  )
}
