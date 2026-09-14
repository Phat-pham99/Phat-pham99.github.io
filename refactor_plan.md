# Portfolio Redesign Plan – Option #2 Full Redesign

> Stack: Vite + Tailwind only, dark dev-terminal, dev-peers/OSS focus
> Domain: `phatpham.work` (`CNAME`)
> Status: PLAN ONLY – no execution yet

Locked decisions:
- Audience: Dev peers / OSS
- Projects: Auto-fetch GitHub API with local fallback
- Tech: Vite + Tailwind only (drop antd/rsuite)
- Style: Dark dev-terminal

## 1. Goal & Principles

Keep React (low rewrite risk), make it look owned by a dev: fast, readable mono, code vibe, projects first.

- Clean, recruiter-readable but peer-credible
- Fast: JS <200KB gz, WebP images, no UI kits
- Kill pixel/hacker fonts as body text; keep as accent at most
- Single scrollable page + deep links, not 6 fragmented routes

Non-goals v1: no blog engine, no backend contact form, no Next.js/Astro.

## 2. Current State Audit (keep for reference)

Router `src/App.js:19-29` (`HashRouter`):
- `/` + `/home` -> `src/pages/homepage/homepage.jsx` + `src/components/homepage/homepage_component.jsx` – hero `Hi, I'm Phat` typing + 3-slide `antd Carousel`
- `/about` -> `src/pages/about/aboutpage.jsx` -> `src/components/about/aboutpage_component.jsx` – orphaned, only `<h1>About Page</h1>`
- `/experience` (labeled `Profile` in `src/pages/navpage/navpage.jsx:32-34`) -> `src/pages/profile/profile.jsx` – real CV content in `Collapse` + `Steps`
- `/projects` -> `src/pages/projects/projectpage.jsx` – only `work-in-progress.png`, dead `Axios getData()` never called
- `/contact` -> `src/pages/contact/contactpage.jsx` – only `mailto:hphat99@gmail.com`, footer-only link
- Global: `NavBar` sticky, `Footer` (`©2023 Built with ReactJs`)

Visual debt:
- Hotlinked bg `src/App.js:18` (`pixelstalk.net`), no fallback
- Layout typos `flew-col/flew-row` (`homepage.jsx:55`, `homepage_component.jsx:12,17`, `contactpage_component.jsx:9,13`)
- Duplicate FB share buttons `homepage.jsx:57-66`, `fixed` overlap
- No `alt`, multiple `<h1>`, pixel font fails WCAG, `text-white` nav invisible on light bg
- `tailwind.config.js:7-41` overwrites `colors/screens/fontSize` instead of `extend` – breaks `md:text-lg` etc.

Content worth keeping:
- Hero: `Hi, I'm Phat` + `Welcome to my website!` + socials (facebook/hongphat.pham99, linkedin/hphat99, github/Phat-pham99, gitconnected resume)
- Bio slides: Biomedical BE -> programming, Python/ReactJs/Data Science, piano, fun projects
- Experience: Terralogic Inc `https://terralogic.com/` Fulltime HCMC – Associate SWE Aug 2022-Apr 2023, SWE May 2023-Present (dynamic `Moment` in `profile.jsx:60`)
- Education: HCMUT `https://hcmut.edu.vn/` BE Biomedical Sep 2017-Nov 2021
- Languages: English + Japanese + Vietnamese with PDF certs (`My_IELTS_Certificate.pdf` 564KB, `N4_Japanese_Certificate.pdf` 776KB)
- Skills: Python > Selenium, Data Science/Data Analysis > Tensorflow + Coursera `SLL28JQ9NVB7` + Data Viz; Javascript > ReactJs
- Contact: `Hphat99@gmail.com`
- Footer repo link `github.com/Phat-pham99/Phat-pham99.github.io`

Discard: About placeholder, empty `experiencepage_component.jsx`, projects stub, `©2023`, `console.log`, commented Django/Switch/StrictMode blocks.

## 3. Information Architecture (proposed)

Single page with anchors + BrowserRouter deep links:

```
#hero – name, role SWE @ Terralogic, HCMUT BE, Python/JS/Data, CTAs
#about – biomedical -> SWE story, piano/humanizer, socials
#experience – Terralogic timeline, HCMUT education
#skills – Python/Selenium/Data/TF, JS/React badges
#projects – auto GitHub, pinned 6
#contact – email + LinkedIn/GitHub + resume.pdf download
footer
```

Nav: `About / Experience / Projects / Contact` + GitHub icon. Dark is default, no toggle v1.

Routing: drop `HashRouter`. Use `BrowserRouter` + `404.html` SPA fallback for gh-pages (clean URLs for dev peers). Fallback option if risky: single `/` with hash anchors only.

## 4. Design System – Dark Terminal

- Colors: `bg zinc-950 #09090b`, surface `zinc-900/60`, border `zinc-800`, accent brand green `#13ce66` (keep from `tailwind.config.js:23`), text `zinc-100/zinc-400`
- Type: `JetBrains Mono` (code/labels) + `Inter` (body). Drop `hacker.ttf/pixel.ttf/pixel_large.ttf` (`src/index.css:9-23`, currently 404 – no ttf loader in webpack)
- Components Tailwind-only (replace `antd Carousel/Steps/Collapse`, `rsuite Navbar/Nav`):
  `Navbar`, `Hero`, `Timeline`, `ProjectCard`, `Badge`, `SectionHeading` (`$ whoami` style), `Footer`, `Skeleton`
- Replace `react-typing-effect` (pulls `react-dom@16`, conflicts React 18) with `react-type-animation` or custom hook
- Kill external green bg, FB share duplicate, blur-white nav

## 5. Tech Migration – Webpack -> Vite

Pain today: 4 webpack files ~90% dup (`webpack.common.js`, `webpack.config.js`, `webpack.dev.js`, `webpack.prod.js`), `babel.config.json` invalid JSON + stale targets + `corejs 2.6.5 vs 2.5.7`, `style-loader` in prod (FOUC, no `[contenthash]`), no font rule, custom `testserver.js`, phantom deps (`webpack-merge`, `terser-webpack-plugin`, `@ant-design/icons`, `@rsuite/icons`).

Execution steps (next phase, not now):
1. Scaffold `vite react` template, `vite.config.js` (~20 lines: `@vitejs/plugin-react`, `base:'/'` for apex, `publicDir`, `assetsInclude: pdf`)
2. Move `src/index.html` -> root `index.html`, fix `og:image ../Assets/phat_blue.jpg` -> `/og-cover.jpg` in `public/`, add `description`, `theme-color`, canonical `https://phatpham.work/`
3. Assets: `phat_*.jpg` (113KB/612KB/361KB) -> `src/assets/` as WebP + `loading=lazy` + `alt`; icons -> inline SVG; PDFs -> `public/resume/` + local `resume.pdf` (stop depending on `gitconnected.com/phat-pham99/resume`); `CNAME` -> `public/CNAME`; delete `Assets/.png/.svg`, `phat.jpeg`, `money_plant.png`
4. Deps prune:
   - Delete: `antd, rsuite, react-particles, tsparticles, react-facebook, react-device-detect, react-helmet, @fortawesome/*, core-js@2, html-loader, babel/*, sass-loader, style-loader`
   - Replace: `moment/react-moment -> date-fns`, `axios -> fetch`, `react-typing-effect -> react-type-animation`
   - Keep: `react, react-dom, react-router-dom, tailwindcss, postcss, autoprefixer`
5. Scripts: `"dev":"vite", "build":"vite build", "preview":"vite preview", "deploy":"gh-pages -d dist"`
6. Tailwind: `content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"]`, move custom to `extend`

## 6. Projects – Auto-Fetch GitHub API

- `GET https://api.github.com/users/Phat-pham99/repos?per_page=100&sort=updated`, client fetch SWR
- Filter: skip forks unless starred, blacklist dotfiles, whitelist via `src/data/featured.json` `{repo, blurb, tech, demoUrl}`
- Fallback: `src/data/projects.fallback.json` for offline/rate-limit (60/hr unauth, 5000/hr with `VITE_GITHUB_TOKEN`)
- Card: name, desc, lang dots, stars/forks, updated (`date-fns`), topics, Code/Demo links, skeletons

Risk: low-star repos look weak – curation file solves it.

## 7. A11y / SEO / Perf Acceptance

- One `<h1>`, semantic sections, `alt`, focus rings, AA contrast, keyboard nav, `prefers-reduced-motion`
- `robots.txt`, `sitemap.xml`, `404.html`, absolute OG URLs, `react-helmet-async` or static meta
- Budget: Lighthouse 90+ mobile, verify `npm run dev`, `npm run build && preview`, refresh test `/projects`

## 8. Deploy

`public/CNAME` auto-copied, Action `npm ci && npm run build && gh-pages -d dist`, `base:'/'`. Verify domain stays bound.

## 9. Phases (awaiting go)

- P0: scaffold + tokens + Navbar/Hero/Footer
- P1: Experience/Skills/Contact + copy polish
- P2: Projects API + fallback + skeletons
- P3: SEO/a11y/perf + deploy action + delete webpack/prune deps

## 10. Needed From Owner Before Build

1. 2-sentence biomedical -> SWE pitch rewrite
2. IELTS band + JLPT N4 score to display inline
3. 6 repos to pin + sort rule
4. Portrait choice (reuse `phat_blue.jpg` or new?)
