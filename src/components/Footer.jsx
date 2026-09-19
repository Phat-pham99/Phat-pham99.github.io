import { SITE } from '../data/site';

export default function Footer() {
  return (
    <footer className="border-b border-zinc-800 bg-btop-bg">
      <div className="mx-auto flex max-w-content items-center justify-between border-x border-zinc-800 px-0 font-mono text-sm sm:text-xs">
        {/* Help bar - left */}
        <div className="flex items-center">
          <div className="border-r border-zinc-800 bg-zinc-900/40 px-3 py-3 text-zinc-500 sm:py-2">
            <span className="text-brand">[esc]</span> menu
          </div>
          <div className="hidden border-r border-zinc-800 px-3 py-2 text-zinc-500 sm:block">
            <span className="text-brand">[↑↓]</span> navigate
          </div>
          <div className="hidden border-r border-zinc-800 px-3 py-2 text-zinc-500 md:block">
            <span className="text-brand">[q]</span> quit
          </div>
        </div>

        {/* Center */}
        <div className="hidden px-3 py-2 text-zinc-600 lg:block">
          © {new Date().getFullYear()} Phat Pham · React + Vite + Tailwind
        </div>

        {/* Right */}
        <div className="flex items-center">
          <a
            href={SITE.githubRepo}
            target="_blank"
            rel="noreferrer"
            className="border-l border-zinc-800 px-3 py-3 text-zinc-500 transition-colors hover:text-brand sm:py-2"
          >
            <span className="text-brand">[s]</span> source
          </a>
          <a
            href="#hero"
            className="border-l border-zinc-800 px-3 py-3 text-zinc-500 transition-colors hover:text-brand sm:py-2"
          >
            <span className="text-brand">[t]</span> top
          </a>
        </div>
      </div>
    </footer>
  );
}
