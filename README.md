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

Live at **https://elcoa.org** (repo `Schizem/elcoa-site`).

- **Pages settings** (repo Settings → Pages): Source = GitHub Actions, Custom
  domain = `elcoa.org`, Enforce HTTPS on. With an Actions deploy, GitHub ignores
  any `CNAME` file; the domain lives in these settings.
- **DNS** (Cloudflare, zone `elcoa.org`), all set to **DNS only** (grey cloud) so
  GitHub can issue and renew the HTTPS certificate. The same records are in
  [`dns/elcoa.org.zone`](./dns/elcoa.org.zone), ready for Cloudflare's
  "Import DNS records":

  | Type | Name | Value |
  | --- | --- | --- |
  | A | `@` | `185.199.108.153` |
  | A | `@` | `185.199.109.153` |
  | A | `@` | `185.199.110.153` |
  | A | `@` | `185.199.111.153` |
  | AAAA | `@` | `2606:50c0:8000::153` |
  | AAAA | `@` | `2606:50c0:8001::153` |
  | AAAA | `@` | `2606:50c0:8002::153` |
  | AAAA | `@` | `2606:50c0:8003::153` |
  | CNAME | `www` | `schizem.github.io` |

- The site serves from the domain root, so there's no `basePath`.
- The print edition (`/print/...`) is never built here; see MAINTAINING.md.
