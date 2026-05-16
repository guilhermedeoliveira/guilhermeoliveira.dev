# CLAUDE.md

Guidance for Claude (and other AI coding agents) working in this repo.

## Project shape

Static Astro site. Three content collections backed by MDX: `projects`, `notes`, `ideas`. No client-side framework — Astro components with scoped `<style>` blocks and CSS variables. No Tailwind.

## Key paths

- `src/content.config.ts` — collection schemas (Zod).
- `src/content/{projects,notes,ideas}/` — MDX content.
- `src/lib/content.ts` — canonical helpers: `getProjects`, `getNotes`, `getIdeas`, `formatDate`, `formatMonth`, `slugFromId`, `readingTime`, and the `Project` / `Note` / `Idea` types.
- `src/components/` — UI primitives (ProjectCard, ContentListItem, RightRail, Sidebar, TagList).
- `src/layouts/BaseLayout.astro`, `src/layouts/ContentLayout.astro`.
- `src/pages/` — routes. Detail pages use `getStaticPaths` + `render` from `astro:content`.
- `src/styles/global.css` — design tokens (`--mint`, `--copper`, `--text`, `--muted`, etc.) and `.content-prose` styling.
- `design/mockups/` — source of truth for the visual design.

## Conventions

- **Dates**: format with `formatDate` / `formatMonth` from `src/lib/content.ts`. Both are UTC. Treat frontmatter dates as UTC. Never add a second date helper.
- **Reading time**: computed at render from `entry.body`. Don't add a `readingTime` frontmatter field.
- **Slugs**: derive with `slugFromId(entry.id)`. The `WithSlug<T>` wrapper attaches it to every entry returned by the `get*` helpers.
- **Styling**: scoped `<style>` per component. Pull colors and tokens from `src/styles/global.css`. Don't introduce a CSS framework.
- **Imports**: use the `@components`, `@layouts`, `@lib`, `@styles` path aliases from `tsconfig.json`.
- **Drafts**: every `get*` helper filters `draft: true` out. Set `draft: true` in frontmatter to hide an entry.
- **Routes**: nav and routes are: `/`, `/projects/`, `/notes/`, `/ideas/`, `/about/`, `/search/`. The collection is `notes`, not `articles` — earlier history references `articles` but the rename is complete.

## When changing things

- Before committing a behavior or pattern change, update the affected docs in the same commit (CLAUDE.md, README.md).
- Keep commits small and single-line. No Claude attribution in commit messages.
- Run `npm run typecheck` (needs Node 22+).
- If a change diverges from `design/mockups/`, flag it explicitly.

## Things to leave alone unless asked

- The CSS-variable color system in `global.css`.
- The Pagefind setup (`build` script runs the index; `/search/` consumes it).
- The sidebar clock — uses the `America/Recife` timezone.
- The supply-chain config in `.npmrc` (`save-exact`, `min-release-age`).
