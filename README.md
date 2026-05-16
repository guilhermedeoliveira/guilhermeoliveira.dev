# guilhermeoliveira.dev

Personal website for Guilherme Oliveira: portfolio projects, articles, and working ideas.

The site is built as a static, content-first Astro app. Projects, articles, and ideas are typed content collections stored as MDX files.

## Stack

- Astro + TypeScript
- MDX content collections
- Tailwind CSS v4 through the Vite plugin
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

```bash
npm ci
npm run dev
```

Useful commands:

```bash
npm run check
npm run lint
npm run build
npm run preview
```

`npm run build` runs Astro type checks, builds the static site into `dist/`, and indexes the result with Pagefind.

## Content authoring

Create new entries in:

- `src/content/projects/`
- `src/content/articles/`
- `src/content/ideas/`

Each entry is an MDX file with frontmatter validated by `src/content/config.ts`.

Project entries include:

- `title`
- `summary`
- `date`
- `tags`
- `featured`
- `status`
- `stack`
- `role`
- `outcome`
- `links`

Article and idea entries include:

- `title`
- `summary`
- `date`
- `tags`
- `category` or `status`

## Cloudflare Pages

Recommended settings:

- Framework preset: Astro
- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: `22`

Cloudflare Pages should be connected directly to the GitHub repository so every pull request gets a preview deployment and every merge to `main` deploys production.

## GitHub branch protection

Recommended `main` rules:

- Require pull request before merge.
- Require the `CI / check` status check.
- Disable direct pushes to `main`.
- Keep the generated `package-lock.json` committed.

## Design reference

The current visual direction comes from:

`design/mockups/homepage-dark-projects-writing-rail.png`
