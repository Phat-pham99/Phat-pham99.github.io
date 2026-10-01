import { Link, NavLink } from 'react-router-dom';
import { differenceInDays, differenceInYears, addYears } from 'date-fns';
import { Moon, Sun } from 'lucide-react';
import { GitHubIcon, MenuIcon, CloseIcon } from './Icons.jsx';
import { SITE, SECTIONS } from '../data/site';
import { useState, useMemo } from 'react';
import useTheme from '../hooks/useTheme.js';

const BIRTH_DATE = new Date('1999-05-09');

const LABELS = {
  about: 'About',
  experience: 'Experience',
  skills: 'Skills',
  projects: 'Projects',
  contact: 'Contact',
};

function linkClass({ isActive }) {
  return `px-3 py-1 font-mono text-xs transition-colors hover:text-brand focus-visible:outline focus-visible:outline-1 focus-visible:outline-brand ${
    isActive ? 'text-brand bg-zinc-900' : 'text-zinc-500'
  }`;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const uptime = useMemo(() => {
    const now = new Date();
    const years = differenceInYears(now, BIRTH_DATE);
    const days = differenceInDays(now, addYears(BIRTH_DATE, years));
    return `${years}y ${days}d`;
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-btop-bg">
      <nav aria-label="Primary" className="mx-auto flex max-w-content items-center justify-between border-x border-zinc-800 px-0">
        {/* Left status */}
        <div className="flex min-w-0 items-center">
          <div className="flex min-w-0 items-center gap-2 border-r border-zinc-800 bg-zinc-900/40 px-3 py-2">
            <span className="h-2 w-2 shrink-0 bg-brand" aria-hidden="true" />
            <span className="min-w-0 truncate font-mono text-xs text-zinc-400">
              <span className="text-brand">phat</span>@<span className="text-zinc-300">phatpham.work</span>
            </span>
          </div>
          <div className="hidden items-center gap-4 border-r border-zinc-800 px-3 py-2 font-mono text-xs text-zinc-600 xl:flex">
            <span>uptime: <span className="text-zinc-400">{uptime}</span></span>
            <span>load: <span className="text-btop-cpu">0.42</span> <span className="text-btop-mem">0.38</span> <span className="text-btop-disk">0.31</span></span>
          </div>
        </div>

        {/* Center nav */}
        <div className="hidden items-center md:flex">
          {SECTIONS.map((s) => (
            <NavLink key={s} to={`/${s}`} className={linkClass} onClick={() => setOpen(false)}>
              {LABELS[s]}
            </NavLink>
          ))}
        </div>

        {/* Right */}
        <div className="flex shrink-0 items-center">
          <button
            type="button"
            role="switch"
            aria-checked={theme === 'dark'}
            aria-label="Dark mode"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={toggleTheme}
            className="inline-flex h-11 w-11 items-center justify-center border-l border-zinc-800 text-zinc-500 transition-colors hover:text-brand focus-visible:outline focus-visible:outline-1 focus-visible:outline-brand"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
          </button>
          <a
            href={SITE.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="border-l border-zinc-800 px-3 py-2 text-zinc-500 transition-colors hover:text-brand focus-visible:outline focus-visible:outline-1 focus-visible:outline-brand"
          >
            <GitHubIcon className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="border-l border-zinc-800 px-3 py-2 text-zinc-500 hover:text-brand focus-visible:outline focus-visible:outline-1 focus-visible:outline-brand md:hidden"
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div id="mobile-menu" className="border-b border-zinc-800 bg-btop-bg md:hidden">
          <div className="flex flex-col font-mono text-sm sm:text-xs">
            {SECTIONS.map((s) => (
              <NavLink key={s} to={`/${s}`} className={linkClass} onClick={() => setOpen(false)}>
                {LABELS[s]}
              </NavLink>
            ))}
            <a
              href={SITE.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2.5 text-zinc-500 hover:text-brand sm:py-2"
            >
              <GitHubIcon className="h-4 w-4" /> GitHub
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
