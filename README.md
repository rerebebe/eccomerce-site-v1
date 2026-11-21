# ONE OF ONE 獨壹 — website (Astro)

## Run locally
```
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs static site to dist/
```

## Structure
- `src/layouts/Base.astro` — <head>, fonts, global styles + theme colours
- `src/components/Header.astro` — top bar + menus (desktop & mobile)
- `src/components/Footer.astro`
- `src/pages/*.astro` — one file per page (index, atelier, bespoke, registry, press, book)
- `public/` — images, logos, `site.js` (scroll reveals, parallax, theme)

## Deploy (Netlify + GitHub)
Push this folder to a GitHub repo, then in Netlify: Add new site → Import from Git → pick the repo.
Build settings are read from `netlify.toml` (build: `npm run build`, publish: `dist`).

The booking form on /book uses Netlify Forms — submissions appear in Netlify → Forms.
Add `?intro=off` to the home URL to skip the intro animation.
# eccomerce-site-v1
