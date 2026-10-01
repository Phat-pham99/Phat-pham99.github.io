# Phat Pham — Portfolio

![status](https://img.shields.io/badge/status-active-brightgreen) ![vite](https://img.shields.io/badge/Vite-React-646cff?logo=vite&logoColor=white) ![tailwind](https://img.shields.io/badge/Tailwind_CSS-38bdf8?logo=tailwindcss&logoColor=white)

> Biomedical engineer turned software engineer. Python, JavaScript, Data Science. \
> **Live at [phatpham.work](https://phatpham.work)**

A single-page, dark dev-terminal themed portfolio styled like a live `btop` / system-monitor dashboard. Interactive terminal widgets, a Matrix rain canvas, GitHub-powered project feed, and refresh-safe deep links — built with **React + Vite + Tailwind CSS**.

---

## ✨ Features

- **Terminal aesthetic** — monospace type, `$ whoami` hero, typewriter effect, blinking cursor, and a system-monitor card with live-ish stats and a coffee toggle.
- **CMatrix rain** — classic green Matrix rain animation (`cmatrix` package) integrated as a panel.
- **Skill project previews** - maps skill badges to public GitHub repositories by repository topics only, with paginated loading and an in-memory cache.
- **Portfolio projects** - PACKAGES / PROJECTS displays the curated project list from gitconnected, independently of GitHub skill previews.
- **Refresh-safe deep links** — `/about`, `/experience`, `/skills`, `/projects`, `/contact` scroll to sections and stay valid on refresh via a `404.html` redirect.
- **Theme & font** - light/dark navbar toggle, theme-aware terminal colors, and Inter + JetBrains Mono via `@fontsource`. Follows the system appearance until a choice is saved in `localStorage` under `portfolio-theme`; saved choices apply before React starts and stay in sync across tabs. Switching still works when browser storage is unavailable.
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

### Project data sources

- **SKILLS / TOOLKIT previews:** `GET https://api.github.com/users/{username}/repos`, using the account in `src/data/site.js`. Fetches all pages of public repositories, including forks, 100 per page. Matches skill names and keywords against each repository's topics only, ignoring case, spaces, dots, underscores, and hyphens.
- **PACKAGES / PROJECTS:** the `projects` collection from gitconnected. Project badges use its topic tags (`keywords`), not `languages`; projects without topic tags show no badges. The separate primary-language indicator is unchanged. Skill names, profile information, and spoken languages also continue to come from gitconnected.
- Add GitHub repository topics such as `python`, `react`, `nestjs`, or `linux` to associate skills. The language field is not used for matching; repositories without matching topics do not appear in skill previews.
- GitHub requests are unauthenticated (normally 60 requests/hour per IP). Successful results are cached until a page reload; API failures leave skill badges visible and display an unavailable status without substituting gitconnected projects. No API token is required or embedded in the browser bundle.

Run the GitHub loader regression tests (Node.js 20+):

```sh
node --test src/hooks/useGitHubProjects.test.js
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

No environment variables are required. Do not put GitHub access tokens in `VITE_*` variables: Vite exposes them in the public client bundle.

## 📄 License

All content and code are © Phat Pham.<br/>

---

<p align="center">
  Made with ☕ by <a href="https://github.com/Phat-pham99">Phat Pham</a>
</p>
