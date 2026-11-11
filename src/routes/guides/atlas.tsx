import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { storageGet, storageSet } from '../../lib/storage'

export const Route = createFileRoute('/guides/atlas')({ component: AtlasGuide })

const PROGRESS_KEY = 'wh_atlas_progress'

interface Step {
  id: string
  title: string
  detail: ReactNode
}

interface Stage {
  num: string
  title: string
  steps: Array<Step>
}

const STAGES: Array<Stage> = [
  {
    num: '01',
    title: 'Open the Atlas',
    steps: [
      {
        id: 'a1',
        title: 'Defeat Kitava at the end of Act 10',
        detail:
          'Your first map drops automatically and the Atlas of Worlds screen unlocks.',
      },
      {
        id: 'a2',
        title: 'Run your first white-tier map',
        detail:
          'Start at the lowest tier available — the Atlas fills in nearby maps as you complete each one.',
      },
    ],
  },
  {
    num: '02',
    title: 'Build sustain',
    steps: [
      {
        id: 'b1',
        title: 'Learn the map vendor recipe',
        detail:
          'Three maps of the same tier sell together for one map of the next tier up — your baseline sustain before any drop bonuses.',
      },
      {
        id: 'b2',
        title: 'Start spending Atlas Passive Tree points',
        detail:
          "Earned from completing maps and Kirac's missions — prioritize nodes matching your farm style (bossing, clear speed, or quantity).",
      },
      {
        id: 'b3',
        title: "Take Kirac's map missions regularly",
        detail:
          "They're free Atlas points and a steady trickle of map drops without extra risk.",
      },
    ],
  },
  {
    num: '03',
    title: 'Voidstones & the Conquerors',
    steps: [
      {
        id: 'c1',
        title: 'Find and defeat Baran, Al-Hezmin, Veritania, and Drox',
        detail:
          'The four Conquerors of the Atlas appear on your map device once their influence rises high enough on the Atlas.',
      },
      {
        id: 'c2',
        title: 'Collect all four Voidstones',
        detail:
          'Each Conqueror kill awards one — together they raise your accessible map tier cap and unlock the Maven.',
      },
      {
        id: 'c3',
        title: 'Reach map tier 16',
        detail:
          'The practical ceiling for "fully juiced" farming once all four Voidstones are socketed.',
      },
    ],
  },
  {
    num: '04',
    title: 'Pinnacle bosses',
    steps: [
      {
        id: 'd1',
        title: 'Awaken the Maven',
        detail:
          "Unlocks Maven's Crucible fights and the ability to have her \"witness\" other pinnacle bosses for bonus rewards.",
      },
      {
        id: 'd2',
        title: 'Kill your first pinnacle boss',
        detail:
          "Sirus, Awakener of Worlds; the Maven herself; Eater of Worlds; Searing Exarch — each has its own unlock chain worth a full guide on its own.",
      },
      {
        id: 'd3',
        title: 'Push into Uber-difficulty fights',
        detail:
          'Once a pinnacle boss feels comfortable on normal difficulty, its Uber variant is the next real currency and challenge check.',
      },
      {
        id: 'd4',
        title: 'Set your next league goal',
        detail: (
          <>
            At this point you're steering your own farm — head back to the{' '}
            <Link to="/builds/farm">Late Game Builds</Link> list if you want to
            switch specialties.
          </>
        ),
      },
    ],
  },
]

const TOTAL_STEPS = STAGES.reduce((sum, stage) => sum + stage.steps.length, 0)

function AtlasGuide() {
  const [progress, setProgress] = useState<Record<string, boolean>>({})

  useEffect(() => {
    setProgress(storageGet<Record<string, boolean>>(PROGRESS_KEY, {}))
  }, [])

  const done = Object.values(progress).filter(Boolean).length
  const percent = TOTAL_STEPS ? (done / TOTAL_STEPS) * 100 : 0

  function toggle(id: string) {
    setProgress((prev) => {
      const next = { ...prev, [id]: !prev[id] }
      storageSet(PROGRESS_KEY, next)
      return next
    })
  }

  function reset() {
    storageSet(PROGRESS_KEY, {})
    setProgress({})
  }

  return (
    <main className="wh-wrap">
      <div className="wh-page-head">
        <div className="wh-eyebrow">04 · Guide</div>
        <h1>Atlas Completion Checklist</h1>
        <p>
          From your first white map to your first pinnacle kill. Check items
          off as you go — progress is saved in this browser, so it's still
          here next time you sit down.
        </p>
      </div>

      <div className="wh-progress-bar-wrap">
        <div className="wh-progress-label">
          <span>Atlas progress</span>
          <b>
            {done} / {TOTAL_STEPS}
          </b>
        </div>
        <div className="wh-progress-track">
          <div className="wh-progress-fill" style={{ width: `${percent}%` }} />
        </div>
      </div>

      <div>
        {STAGES.map((stage) => (
          <div key={stage.num} className="wh-stage">
            <div className="wh-stage-head">
              <span className="wh-stage-num">{stage.num}</span>
              <h3>{stage.title}</h3>
            </div>
            {stage.steps.map((step) => {
              const isDone = !!progress[step.id]
              return (
                <label
                  key={step.id}
                  className={isDone ? 'wh-step is-done' : 'wh-step'}
                >
                  <input
                    type="checkbox"
                    checked={isDone}
                    onChange={() => toggle(step.id)}
                  />
                  <span className="wh-txt">
                    <b>{step.title}</b>
                    <span>{step.detail}</span>
                  </span>
                </label>
              )
            })}
          </div>
        ))}
      </div>

      <div className="wh-reset-row">
        <button type="button" className="wh-btn wh-btn-ghost" onClick={reset}>
          Reset checklist
        </button>
      </div>
    </main>
  )
}
