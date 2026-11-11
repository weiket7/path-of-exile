<!-- intent-skills:start -->
## Skill Loading

Before editing files for a substantial task:
- Run `pnpm dlx @tanstack/intent@latest list` from the workspace root to see available local skills.
- If a listed skill matches the task, run `pnpm dlx @tanstack/intent@latest load <package>#<skill>` before changing files.
- Use the loaded `SKILL.md` guidance while making the change.
- Monorepos: when working across packages, run the skill check from the workspace root and prefer the local skill for the package being changed.
- Multiple matches: prefer the most specific local skill for the package or concern you are changing; load additional skills only when the task spans multiple packages or concerns.
<!-- intent-skills:end -->

## Project Provenance

This app was scaffolded with the TanStack CLI, then TanStack Intent was installed:

```bash
npx @tanstack/cli@latest create my-tanstack-app --agent --package-manager pnpm --tailwind
npx @tanstack/intent@latest install
npx @tanstack/intent@latest list
```

- `--tailwind` is deprecated/ignored by the current CLI — Tailwind v4 ships by default in TanStack Start scaffolds, so it's present anyway.
- `.cta.json` in this folder records the exact CLI selections: `mode: file-router`, `framework: react`, `projectPreset: default`, `chosenAddOns: []` (no extra add-ons/integrations were selected — this is intentionally the blank starter).
- `intent install` rewrote the skill-loading block above; `intent list` reported 9 intent-enabled packages / 31 skills sourced locally from installed deps (router-core, start-client-core, react-start, devtools, devtools-vite, devtools-event-client, virtual-file-routes, router-plugin, start-server-core).

## Stack

- React 19 + TypeScript, TanStack Start (`@tanstack/react-start`) with TanStack Router file-based routing (`src/routes/`).
- Tailwind CSS v4 via `@tailwindcss/vite` (no separate config file needed; import lives in `src/styles.css`).
- Vite 8 as the build tool/dev server (`pnpm dev` → port 3000, `pnpm build`, `pnpm preview`).
- TanStack Devtools (`@tanstack/react-devtools` + `@tanstack/devtools-vite`) wired into `src/routes/__root.tsx`, dev-only (stripped from production build automatically — confirmed via `pnpm build` output: "Removed devtools code from: /src/routes/__root.tsx").
- Package manager: pnpm (see `pnpm-workspace.yaml`, `pnpm-lock.yaml`).
- No state/data library, auth, database, or deployment adapter was added — this is deliberately a blank starter. If a real project need arises, load the matching TanStack Intent skill first (see table above) before hand-rolling the pattern.

## Environment Variables

None required. The scaffold makes no calls to `process.env` or `import.meta.env` anywhere in `src/` or `vite.config.ts`. If server functions, auth, or a database are added later, use `VITE_`-prefixed vars for anything needed on the client (see the `start-core/execution-model` skill for the isomorphic env-var safety rules) and a `.env` file (already gitignored).

## Deployment

Not yet configured — no target (Node/Docker, Vercel, Netlify, Cloudflare Workers, Bun, Railway) has been chosen. Before deploying, run the `start-core/deployment` Intent skill (`pnpm dlx @tanstack/intent@latest load @tanstack/start-client-core#start-core/deployment`) rather than guessing at adapter config.

## Architectural Notes / Gotchas

- `package.json` has a `pnpm.onlyBuiltDependencies` field; pnpm 10+ warns that this key moved to `pnpm-workspace.yaml`/root settings and ignores it in `package.json`. Harmless but noisy on every install/build.
- `routeTree.gen.ts` is generated (via `tsr generate`, wired into `pnpm dev`/`pnpm build`) — don't hand-edit it; it's marked read-only/excluded in `.vscode/settings.json`.
- `tsr.config.json` sets `target: react` — keep in sync if the framework ever changes.
- `design/` holds the original static-HTML design source (`index.html`, the other screen mockups, `css/tokens.css`, `js/app.js`, `DESIGN-HANDOFF.md`, `DESIGN-MANIFEST.json`). It's reference material only — nothing in `src/` imports from it at runtime.

## POE Waypoint homepage (ported from `design/index.html`)

The home route (`src/routes/index.tsx`) is a faithful SSR port of `design/index.html` — hero, stat strip, and the 6-card "Jump in" nav grid. TanStack Start SSRs by default, so no special config was needed; the two dynamic bits (`To-Do` open-task count, `Bookmarks` count) render their static/`Loading…` fallback on the server and swap to the real `localStorage`-derived value client-side after hydration, via `src/lib/storage.ts` (a typed port of the original `js/app.js`'s `Store.get`/`Store.set`).

- **Styling**: all ported design tokens/classes live in `src/styles.css` under a `wh-`-prefixed section (`.wh-body`, `.wh-topnav`, `.wh-hero`, `.wh-card`, etc.), scoped this way specifically so they can't collide with the pre-existing starter-template tokens/classes (`--sea-ink`, `.island-shell`, `.page-wrap`, ...) that `src/routes/about.tsx` still depends on.
- **Header/Footer replaced**: `src/components/Header.tsx` and `Footer.tsx` now render the POE Waypoint topnav/footer (brand, nav links, mobile toggle) instead of the generic TanStack Start starter chrome, since they're shared globally via `__root.tsx` and the mockup's header/footer are part of every screen. `ThemeToggle.tsx` was deleted — the design is dark-only (`color-scheme: dark`, no light variant), so the light/dark/auto toggle no longer applies.
- **Known inconsistency**: `/about` is unstyled leftover CLI-scaffold demo content, not part of the POE Waypoint design. It still renders (its old tokens/classes were left in `styles.css` untouched), but now sits inside the new dark nav/footer chrome, so it looks visually mismatched. It wasn't in scope for this change — restyle it to match POE Waypoint or delete it in a follow-up.
- **Other screens not yet built**: the nav links point at their intended future routes but those routes don't exist yet, so they currently 404:
  - `builds-league-start.html` → `/builds/league-start`
  - `builds-farm.html` → `/builds/farm`
  - `guide-leveling.html` → `/guides/leveling`
  - `guide-atlas.html` → `/guides/atlas`
  - `todo.html` → `/todo`
  - `bookmarks.html` → `/bookmarks`

  Since these routes don't exist, the header/homepage nav uses plain `<a>` tags (not TanStack Router's typed `Link`) for them — switch each to `Link` once its route file exists, for type-checked navigation + `activeProps` highlighting.

## Next Steps

1. `pnpm dev` to confirm the app runs locally (verified `pnpm build` succeeds as of this writing).
2. Implement the remaining 6 screens listed above as their own routes (per `design/DESIGN-MANIFEST.json`'s `screenFilePolicy`: `index.html` is a launcher/overview only, each linked screen must be its own route/surface) — reuse the `wh-card`/`wh-btn`/token vocabulary from `styles.css` and the `storageGet`/`storageSet` helpers in `src/lib/storage.ts` for the To-Do and Bookmarks pages' persistence.
3. Decide the fate of `/about` (restyle to match POE Waypoint, or delete — see gotcha above).
4. Pick and wire a deployment target when ready, using the Intent deployment skill.
5. Consult `pnpm dlx @tanstack/intent@latest list` and the relevant skill before introducing a new library or pattern.
