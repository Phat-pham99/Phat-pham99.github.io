# Phat Pham — Portfolio

![status](https://img.shields.io/badge/status-active-brightgreen) ![vite](https://img.shields.io/badge/Vite-React-646cff?logo=vite&logoColor=white) ![tailwind](https://img.shields.io/badge/Tailwind_CSS-38bdf8?logo=tailwindcss&logoColor=white)

> Biomedical engineer turned software engineer. Python, JavaScript, Data Science. \
> **Live at [phatpham.work](https://phatpham.work)**

A single-page, dark dev-terminal themed portfolio styled like a live `btop` / system-monitor dashboard. Interactive terminal widgets, a Matrix rain canvas, GitHub-powered project feed, and refresh-safe deep links — built with **React + Vite + Tailwind CSS**.

---

## ✨ Features

- **Terminal aesthetic** — monospace type, `$ whoami` hero, typewriter effect, blinking cursor, and a system-monitor card with live-ish stats and a coffee toggle.
- **CMatrix rain** — classic green Matrix rain animation (`cmatrix` package) integrated as a panel.
- **Live GitHub projects** — fetches repos from the GitHub API, merges with curated pins, and falls back to an offline snapshot (with skeleton loaders) when offline or rate-limited.
- **Refresh-safe deep links** — `/about`, `/experience`, `/skills`, `/projects`, `/contact` scroll to sections and stay valid on refresh via a `404.html` redirect.
- **Theme & font** — brand green `#13ce66`, Inter + JetBrains Mono via `@fontsource`, dark-only.
- **SEO & a11y** — OG tags, `og-cover.jpg`, `sitemap.xml`, `robots.txt`, favicon, reduced-motion support.
- **Fast by default** — ~66 KB JS / ~25 KB CSS gzip.

## 🚀 Quickstart

Prerequisites: [Node.js](https://nodejs.org) 18+ and npm.

```bash
npm install        # install dependencies
npm run dev        # local dev server  → http://localhost:5173
npm run build      # production build  → dist/
npm run preview    # preview the build → http://localhost:5173
```

### Optional: GitHub token

To raise the GitHub API rate limit (60 req/hr unauth → 5000 req/hr), create a `.env.local`:

```bash
VITE_GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxx
```

## 📦 Deployment

The site is built as a static bundle and served from GitHub Pages (via the `gh-pages` branch).

A GitHub Actions workflow (`.github/workflows/deploy.yml`) runs on every push to `main`:

1. `npm ci`
2. `npm run build` (Vite → `dist/`)
3. Publishes `dist/` to the `gh-pages` branch via `peaceiris/actions-gh-pages`

Deployment is **automatic** — merge to `main` and GitHub Pages ships the latest build.

### Manual deploy

```bash
npm run deploy      # gh-pages -d dist  (push dist/ to gh-pages branch)
```

## 🗂 Project structure

```
├── .github/workflows/deploy.yml   # auto build & deploy to GitHub Pages
├── public/                        # static assets (favicon, og-cover, 404.html, resume, sitemap)
│   └── 404.html                   # SPA deep-link redirect for GitHub Pages
└── src/
    ├── assets/                    # images (portrait.webp)
    ├── components/                # panels, cards, icons, Matrix rain
    ├── data/                      # site config, featured repos, fallback project snapshot
    ├── hooks/                     # useTypewriter, usePortfolio, ...
    ├── App.jsx                    # section layout
    └── main.jsx                   # entry
```

## 🧰 Tech stack

- **React 18** — UI
- **Vite 6** — build tool
- **Tailwind CSS 3** — styling, custom terminal/coffee animations
- **React Router 6** — deep-link routing
- **date-fns** — dynamic tenure/timeline math
- **cmatrix** — Matrix rain canvas effect
- **gh-pages** — manual deploy helper

## 🔑 Key environment

| Variable            | Purpose                          |
| ------------------- | -------------------------------- |
| `VITE_GITHUB_TOKEN` | Optional GitHub API access token |

## 📄 License

All content and code are © Phat Pham.<br/>

---

<p align="center">
  Made with ☕ by <a href="https://github.com/Phat-pham99">Phat Pham</a>
</p>
