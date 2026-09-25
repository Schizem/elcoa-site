# ELCOA website

Static site for the Elbow Lake Cottage Owners Association (Harrison, Michigan).
Replaces the old WordPress site. Built with Next.js (static export), deployed to
GitHub Pages by GitHub Actions on every push to `main`.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export into ./out
```

## Project layout

| Path | What it is |
| --- | --- |
| `app/` | Pages (one folder per route) |
| `app/newsletters/` | Newsletter browser: dropdown + embedded PDF viewer |
| `components/` | Shared UI (nav, theme toggle) |
| `content/newsletters.json` | The newsletter archive index. Edit this to add an issue |
| `lib/newsletters.ts` | Typed loader + helpers for the archive |
| `public/newsletters/` | Newsletter PDFs |
| `public/docs/` | Other PDFs (bylaws, membership form) |
| `public/events/` | Event photos |
| `styles/theme.css` | Design tokens, reset, light/dark palette |
| `app/globals.css` | Layout and shared components |

## Adding a newsletter

See [MAINTAINING.md](./MAINTAINING.md).

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs
`npm run build` and publishes `out/` to GitHub Pages.

Custom domain: add a `public/CNAME` file containing the domain, set the domain in
the repo's **Settings → Pages**, and point DNS at GitHub Pages. With a custom
domain the site serves from the root, so no `basePath` is needed.
