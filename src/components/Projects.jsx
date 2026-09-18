import BtopPanel from './BtopPanel.jsx';
import ProjectCard from './ProjectCard.jsx';
import Skeleton from './Skeleton.jsx';
import useGitHubRepos from '../hooks/useGitHubRepos.js';
import { SITE } from '../data/site';

export default function Projects() {
  const { status, repos, live } = useGitHubRepos();

  return (
    <section id="projects" className="mx-auto max-w-content border-x border-b border-zinc-800 scroll-mt-14">
      <BtopPanel
        title="PACKAGES / PROJECTS"
        titleRight={status === 'loading' ? 'fetching...' : `${repos.length} items`}
        accent="disk"
        fullHeight
      >
        {status === 'loading' ? (
          <div aria-busy="true" aria-label="Loading projects">
            <Skeleton />
          </div>
        ) : (
          <>
            {/* Table header */}
            <div className="grid grid-cols-[1fr_6rem_5rem_5rem] gap-2 border-b border-zinc-800 bg-zinc-900/40 px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
              <span>name / description</span>
              <span>lang</span>
              <span className="text-right">stars</span>
              <span className="text-right">forks</span>
            </div>
            <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-3">
              {repos.map((project) => (
                <ProjectCard key={project.repo} project={project} />
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-zinc-800 bg-zinc-900/20 px-4 py-2 font-mono text-xs">
              <span className="text-zinc-500">
                {live ? null : (
                  <span className="text-btop-disk">// cached snapshot — API rate-limited </span>
                )}
              </span>
              <a
                className="text-brand underline-offset-2 hover:underline"
                href={SITE.github}
                target="_blank"
                rel="noreferrer"
              >
                See all on GitHub →
              </a>
            </div>
          </>
        )}
      </BtopPanel>
    </section>
  );
}
