import { formatDistanceToNow } from 'date-fns';
import Badge from './Badge.jsx';
import { StarIcon, ForkIcon, ArrowUpRightIcon } from './Icons.jsx';

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
  const updated = project.updated
    ? `updated ${formatDistanceToNow(new Date(project.updated), { addSuffix: true })}`
    : null;

  return (
    <article className="btop-row group flex flex-col border-b border-r border-zinc-800 bg-zinc-950/40 p-4 transition-colors hover:bg-zinc-900/40">
      <h3 className="flex items-center gap-1 font-mono text-sm font-bold text-zinc-100">
        <span className="text-zinc-600">├──</span>
        {project.repo}
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${project.repo} on GitHub`}
          className="ml-auto text-zinc-500 transition-colors hover:text-brand focus-visible:outline focus-visible:outline-1 focus-visible:outline-brand"
        >
          <ArrowUpRightIcon className="h-4 w-4" />
        </a>
      </h3>
      <p className="mt-2 flex-1 text-xs leading-relaxed text-zinc-400">{project.description}</p>

      {project.tech.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <li key={t}>
              <Badge>{t}</Badge>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-3 flex items-center gap-3 font-mono text-[10px] text-zinc-500">
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
        <span className="inline-flex items-center gap-1">
          <StarIcon className="h-3 w-3" /> {project.stars}
        </span>
        <span className="inline-flex items-center gap-1">
          <ForkIcon className="h-3 w-3" /> {project.forks}
        </span>
        {updated ? <span className="ml-auto hidden sm:inline">{updated}</span> : null}
      </div>
    </article>
  );
}
