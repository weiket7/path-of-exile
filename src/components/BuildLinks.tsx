export interface Creator {
  name: string
  channel: string
}

export interface BuildLinkSet {
  youtube?: string
  written?: string
  pob?: string
  site?: string
}

const LINK_KINDS: Array<{ key: keyof BuildLinkSet; label: string }> = [
  { key: 'youtube', label: 'YouTube' },
  { key: 'written', label: 'Written guide' },
  { key: 'pob', label: 'Path of Building' },
  { key: 'site', label: 'Website' },
]

export default function BuildLinks({
  creator,
  links,
}: {
  creator?: Creator
  links?: BuildLinkSet
}) {
  if (!links) {
    return null
  }

  return (
    <div className="wh-guide-block">
      {creator ? (
        <div className="wh-build-guide wh-mono">
          Guide by{' '}
          <a
            className="wh-creator-link"
            href={creator.channel}
            target="_blank"
            rel="noreferrer"
          >
            {creator.name}
          </a>
        </div>
      ) : null}
      <div className="wh-link-row">
        {LINK_KINDS.map(({ key, label }) =>
          links[key] ? (
            <a
              key={key}
              className="wh-link-btn wh-mono"
              href={links[key]}
              target="_blank"
              rel="noreferrer"
            >
              {label}
            </a>
          ) : null,
        )}
      </div>
    </div>
  )
}
