import { useId, useRef, useState } from 'react';
import { siLinux, siNestjs, siPython, siReact, siDjango, siFastapi } from 'simple-icons';
import BtopPanel from './BtopPanel.jsx';
import BtopBar from './BtopBar.jsx';
import Badge from './Badge.jsx'; //HERE -> Use Badge instead
import { ArrowUpRightIcon, BriefcaseIcon, CloseIcon } from './Icons.jsx';
import usePortfolio from '../hooks/usePortfolio.js';
import useGitHubProjects from '../hooks/useGitHubProjects.js';

const SKILL_ICONS = {
  linux: siLinux,
  nestjs: siNestjs,
  python: siPython,
  react: siReact,
  django: siDjango,
  fastapi: siFastapi
};

function normalizeTechnology(name) {
  return name.trim().toLowerCase().replace(/[\s._-]/g, '');
}

function SkillBadge({ skill, projects }) {
  const [open, setOpen] = useState(false);
  const previewId = useId();
  const triggerRef = useRef(null);
  const technologies = [skill.name, ...(skill.keywords ?? [])].map(normalizeTechnology).filter(Boolean);
  const relatedProjects = projects.filter((project) =>
    (project.tech ?? []).some((technology) =>
      technology && technologies.includes(normalizeTechnology(technology)),
    ),
  );
  const icon = SKILL_ICONS[normalizeTechnology(skill.name)];
  const label = (
    <Badge>
      {icon ? (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill={`#${icon.hex}`} aria-hidden="true">
          <path d={icon.path} />
        </svg>
      ) : (
        <BriefcaseIcon className="h-4 w-4 shrink-0 text-btop-cpu" />
      )}
      <span className="max-w-48 break-words text-left">{skill.name}</span>
    </Badge>
  );

  function closePreview() {
    triggerRef.current?.focus();
    setOpen(false);
  }

  return (
    <li
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={(event) => {
        if (!event.currentTarget.matches(':focus-within')) setOpen(false);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          event.stopPropagation();
          closePreview();
        }
      }}
    >
      {relatedProjects.length > 0 ? (
        <button
          ref={triggerRef}
          type="button"
          aria-label={`Show projects using ${skill.name}`}
          aria-expanded={open}
          aria-controls={previewId}
          onFocus={(event) => {
            if (event.currentTarget.matches(':focus-visible')) setOpen(true);
          }}
          onClick={() => setOpen(true)}
          className="block focus-visible:outline focus-visible:outline-1 focus-visible:outline-brand [&>span]:hover:border-brand"
        >
          {label}
        </button>
      ) : label}
      {relatedProjects.length > 0 && open ? (
        <div id={previewId} role="region" aria-label={`Projects using ${skill.name}`} className="absolute inset-x-0 top-full z-20 pt-2 sm:right-auto sm:w-96">
          <div className="border border-zinc-700 bg-zinc-950 p-3 shadow-lg">
            <div className="mb-2 flex items-center justify-between gap-2 font-mono text-xs text-btop-cpu">
              <span className="min-w-0 break-words">{skill.name} / PROJECTS</span>
              <button type="button" onClick={closePreview} aria-label="Close project preview" title="Close project preview" className="shrink-0 p-2 text-zinc-400 hover:text-brand focus-visible:outline focus-visible:outline-1 focus-visible:outline-brand">
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>
            <ul className="max-h-64 space-y-3 overflow-y-auto">
              {relatedProjects.map((project) => (
                <li key={project.repo} className="font-mono text-xs">
                  {project.url ? (
                    <a href={project.url} target="_blank" rel="noreferrer" className="inline-flex max-w-full items-start gap-1 text-zinc-200 hover:text-brand focus-visible:outline focus-visible:outline-1 focus-visible:outline-brand">
                      <span className="min-w-0 break-words">{project.displayName || project.repo}</span>
                      <ArrowUpRightIcon className="h-4 w-4 shrink-0" />
                    </a>
                  ) : (
                    <span className="block break-words text-zinc-200">{project.displayName || project.repo}</span>
                  )}
                  {project.description ? <p className="mt-1 break-words text-zinc-400">{project.description}</p> : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </li>
  );
}

export default function Skills() {
  const { status, data } = usePortfolio();
  const { status: projectsStatus, projects } = useGitHubProjects();
  const apiSkills = data?.skills ?? [];
  const apiLanguages = data?.languages ?? [];

  return (
    <section id="skills" className="mx-auto max-w-content border-x border-b border-zinc-800 scroll-mt-14">
      {apiSkills.length > 0 ? (
        <BtopPanel
          title="SKILLS / TOOLKIT"
          titleRight={status === 'loading' ? 'fetching...' : `${apiSkills.length} entries`}
          accent="cpu"
          contentClassName="p-4"
        >
          <ul className="relative flex flex-wrap gap-2">
            {apiSkills.map((skill) => (
              <SkillBadge key={skill.name} skill={skill} projects={projects} />
            ))}
          </ul>
          {projectsStatus !== 'ready' ? (
            <p role="status" className="mt-3 font-mono text-xs text-zinc-500">
              {projectsStatus === 'loading' ? 'Fetching GitHub projects...' : 'GitHub projects unavailable. Please try again later.'}
            </p>
          ) : null}
        </BtopPanel>
      ) : null}

      <BtopPanel
        title="LOCALES / LANGUAGES"
        titleRight="locale -a"
        accent="net"
        contentClassName="p-4"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {apiLanguages.length > 0 ? (
            [...apiLanguages].sort((a, b) => b.value - a.value).map((lang) => (
              <div
                key={lang.name}
                className="border border-zinc-800 bg-zinc-900/40 p-3"
              >
                <div className="flex items-center justify-between font-mono text-base sm:text-sm">
                  <span className="text-zinc-200">{lang.name}</span>
                  <span className="text-zinc-500">{lang.fluency}</span>
                </div>
                <div className="mt-2">
                  <BtopBar
                    label=""
                    value={lang.value}
                    max={100}
                    width={20}
                    color="mem"
                    showPercent={false}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="font-mono text-sm text-zinc-500 sm:text-xs">no locale data available</div>
          )}
        </div>
      </BtopPanel>
    </section>
  );
}
