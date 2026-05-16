# guilhermeoliveira.dev

Personal website for Guilherme Oliveira: portfolio projects, notes, and working ideas.

Static, content-first Astro app. Projects, notes, and ideas are typed content collections stored as MDX files.

## Stack

- Astro + TypeScript
- MDX content collections
- Plain CSS with scoped `<style>` blocks per component (CSS variables in `src/styles/global.css`)
- Pagefind static search
- Astro RSS and sitemap
- Cloudflare Pages deployment target

## Supply-chain policy

This project uses npm with a release-age guard:

```ini
save-exact=true
min-release-age=15
audit=true
```

Installations should use npm 11.13.0 or newer so `min-release-age` is enforced during dependency resolution. Dependencies are saved with exact versions, and CI uses `npm ci`.

## Local development

Requires Node 22+.

```bash
npm ci
npm run dev
```

Useful commands:

```bash
npm run typecheck   # astro check
npm run lint        # prettier --check
npm run build       # astro check, build to dist/, index with Pagefind
npm run preview
```

## Content authoring

Create new entries in:

- `src/content/projects/`
- `src/content/notes/`
- `src/content/ideas/`

Each entry is an MDX file with frontmatter validated by `src/content.config.ts`.

Common fields (all collections): `title`, `summary`, `date`, `updated?`, `tags`, `draft`.

Project-specific fields: `role`, `status` (`live` | `active` | `archived` | `concept` | `prototype`), `featured`, `stack`, `github?`, `website?`, `stars?`, `order`, `outcome?`, `links`.

Note-specific fields: `category`.

Idea-specific fields: `status` (`seed` | `exploring` | `validated` | `shipped`, default `seed`).

Dates are formatted in UTC at render time, so frontmatter dates should be treated as UTC.

## Cloudflare Pages

Recommended settings:

- Framework preset: Astro
- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: `22`

## GitHub branch protection

Recommended `main` rules:

- Require pull request before merge.
- Require the `CI / check` status check.
- Disable direct pushes to `main`.
- Keep the generated `package-lock.json` committed.

## Design reference

The visual direction comes from:

`design/mockups/homepage-dark-projects-writing-rail.png`
