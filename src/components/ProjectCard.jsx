import Badge from './Badge.jsx';
import { ArrowUpRightIcon } from './Icons.jsx';

const LANG_COLORS = {
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Go: '#00ADD8',
  CSS: '#563d7c',
  HTML: '#e34c26',
  'Jupyter Notebook': '#DA5B0B',
  Dockerfile: '#384d54',
};

export default function ProjectCard({ project }) {
  return (
    <article className="btop-row group flex flex-col border-b border-r border-zinc-800 bg-zinc-950/40 p-4 transition-colors hover:bg-zinc-900/40">
      <h3 className="flex min-w-0 items-center gap-1 font-mono text-base font-bold text-zinc-100 sm:text-sm">
        <span className="shrink-0 text-zinc-600">├──</span>
        <span className="min-w-0 truncate" title={project.repo}>
          {project.repo}
        </span>
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${project.repo}`}
          className="ml-auto shrink-0 text-zinc-500 transition-colors hover:text-brand focus-visible:outline focus-visible:outline-1 focus-visible:outline-brand"
        >
          <ArrowUpRightIcon className="h-4 w-4" />
        </a>
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400 sm:text-xs">{project.description}</p>

      {project.tech.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-2 sm:gap-1.5">
          {project.tech.map((t) => (
            <li key={t}>
              <Badge>{t}</Badge>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-3 flex items-center gap-3 font-mono text-xs text-zinc-500 sm:text-[10px]">
        {project.language ? (
          <span className="inline-flex items-center gap-1">
            <span
              className="h-2 w-2"
              style={{ backgroundColor: LANG_COLORS[project.language] ?? '#71717a' }}
              aria-hidden="true"
            />
            {project.language}
          </span>
        ) : null}
        <span className="ml-auto hidden truncate sm:inline">{project.displayName}</span>
      </div>
    </article>
  );
}
