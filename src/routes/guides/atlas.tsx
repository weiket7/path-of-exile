import { createFileRoute } from '@tanstack/react-router'
import BuildLinks from '../../components/BuildLinks'
import type { BuildLinkSet, Creator } from '../../components/BuildLinks'

export const Route = createFileRoute('/guides/atlas')({ component: AtlasGuide })

interface AtlasTree {
  title: string
  focusLine: string
  stage: string
  tags: Array<{ label: string; pill: string }>
  desc: string
  why: string
  creator?: Creator
  links?: BuildLinkSet
  lastUpdated?: number
}

const TREES: Array<AtlasTree> = [
  {
    title: 'Atlas Progression',
    focusLine: 'Fresh Atlas → Voidstones',
    stage: 'Progression',
    tags: [
      { label: 'Progression', pill: 'wh-pill-normal' },
      { label: 'Map Sustain', pill: 'wh-pill-gem' },
      { label: 'Voidstones', pill: 'wh-pill-unique' },
    ],
    desc: 'A first-week tree built around keeping maps in your stash and getting the four Voidstones socketed, rather than committing points to any one league mechanic.',
    why: 'sustain and completion come before specialisation — this is the tree you run until the Atlas is finished and you know what you want to farm.',
    creator: {
      name: 'Tytykiller',
      channel: 'https://www.youtube.com/@Tytykiller',
    },
    links: {
      youtube: 'https://www.youtube.com/watch?v=fTJIzFfHPcI',
      tree: 'https://poeplanner.com/atlas-tree/BQAeAAA5AGEfUIYE87L61EnB7iFglGko54zktWZMusn9fVprMU_3t12L4Sd1aIme2Gdge2BPL4edXO5_q4455fFaeQXxAPkZCszkfbWCiOtfThtzPiFMxSEkMhdQru8OMJNhqsNZbwMwiAcvctVp2VypQ2Yfh9RcpRQAH4sIAAAAAAAAAwMAAAAAAAAAAAA=',
    },
    lastUpdated: 3.3,
  },
  {
    title: 'Blight, Essence, Shrines, Exarch',
    focusLine: 'Mapping \u2192 Currency farm',
    stage: 'Farming',
    tags: [
      { label: 'Blight', pill: 'wh-pill-gem' },
      { label: 'Essence', pill: 'wh-pill-magic' },
      { label: 'Shrines / Exarch', pill: 'wh-pill-unique' },
    ],
    desc: 'Four mechanics that all pay out while you keep moving \u2014 Blight and Essence drop currency on the spot, Shrines speed the clear, and Searing Exarch altars top it up with extra rewards.',
    why: 'none of the four needs a dedicated setup or a boss kill, so the tree earns on every map you run instead of only on the good ones.',
    creator: {
      name: 'Sanavixx',
      channel: 'https://www.youtube.com/@SaNaViXX',
    },
    links: {
      youtube: 'https://www.youtube.com/watch?v=xolcqK_j9oQ',
      tree: 'https://hypostasis.faith/atlas/data.html#t=47h_EP9x_nze3s_xfP_FfrP9-2o_ua-v_r_23pdlPw',
    },
    lastUpdated: 3.3,
  },
]

export const ATLAS_TREE_COUNT = TREES.length

function AtlasGuide() {
  return (
    <main className="wh-wrap">
      <div className="wh-page-head">
        <div className="wh-eyebrow">04 · Guide</div>
        <h1>Atlas Trees</h1>
        <p>
          Atlas passive trees worth copying, with the video that explains the
          reasoning behind each one. 3.30 rebuilt the tree from the centre
          outwards, so last league's trees no longer import.
        </p>
      </div>

      <div className="wh-build-grid">
        {TREES.map((tree) => (
          <article key={tree.title} className="wh-card wh-build-card">
            <div className="wh-build-top">
              <div>
                <h3>{tree.title}</h3>
                <div className="wh-class-line">{tree.focusLine}</div>
              </div>
              <div className="wh-budget">
                Stage
                <b>{tree.stage}</b>
              </div>
            </div>
            <div className="wh-tag-row">
              {tree.tags.map((tag) => (
                <span key={tag.label} className={`wh-pill ${tag.pill}`}>
                  {tag.label}
                </span>
              ))}
            </div>
            <p className="wh-desc">{tree.desc}</p>
            <p className="wh-why">
              <b>Why this tree:</b> {tree.why}
            </p>
            <BuildLinks creator={tree.creator} links={tree.links} />
          </article>
        ))}
      </div>
    </main>
  )
}
