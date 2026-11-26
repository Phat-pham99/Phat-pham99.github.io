import { useState } from 'react';
import { differenceInMonths, differenceInYears, addYears, format } from 'date-fns';
import BtopPanel from './BtopPanel.jsx';
import BtopBar from './BtopBar.jsx';
import Meme from './Meme.jsx';
import usePortfolio from '../hooks/usePortfolio.js';
import { useI18n } from '../i18n/I18nContext.jsx';

function parseSummary(summary) {
  if (!summary) return [];
  return summary
    .split(/\r?\n/)
    .map((line) => line.replace(/^[\s_*\-•]+/, '').trim())
    .filter(Boolean);
}

function ExperiencePopup({ job, pid, t }) {
  const projects = parseSummary(job.summary);
  const tech = job.highlights ?? [];
  return (
    <div
      role="dialog"
      aria-label={t.experience.details(job.position)}
      className="absolute left-0 right-0 top-full z-50 mt-1 border border-btop-cpu/40 bg-zinc-950/95 font-mono shadow-xl shadow-black/60 backdrop-blur-sm sm:left-10 sm:right-2"
    >
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs text-btop-cpu">
        <span className="font-bold tracking-wide">
          {job.isCurrentRole ? <span className="text-btop-mem">●</span> : <span className="text-zinc-600">○</span>} {job.position}
        </span>
        <span className="text-zinc-500">proc {pid}</span>
      </div>

      <div className="space-y-3 px-3 py-3 text-xs">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-zinc-400">
          {job.website ? (
            <a href={job.website} target="_blank" rel="noreferrer" className="text-brand underline-offset-1 hover:underline">
              {job.company}
            </a>
          ) : (
            <span className="text-zinc-300">{job.company}</span>
          )}
          {job.location ? <span className="text-zinc-600">· {job.location}</span> : null}
          <span className="text-zinc-600">· {formatRange(job.startDate, job.endDate, t)}</span>
          <span className="text-zinc-600">· {durationLabel(job.startDate, job.endDate, t)}</span>
        </div>

        {projects.length > 0 ? (
          <div>
            <div className="mb-1 text-[10px] uppercase tracking-wider text-zinc-500">{t.experience.projects}</div>
            <ul className="space-y-1 text-zinc-300">
              {projects.map((item, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-btop-cpu">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {tech.length > 0 ? (
          <div>
            <div className="mb-1 text-[10px] uppercase tracking-wider text-zinc-500">{t.experience.stack}</div>
            <div className="flex flex-wrap gap-1.5">
              {tech
                .flatMap((t) => t.split(','))
                .map((t) => t.trim())
                .filter(Boolean)
                .map((t, idx) => (
                  <span key={idx} className="border border-zinc-700 bg-zinc-900/60 px-1.5 py-0.5 text-[10px] text-zinc-400">
                    {t}
                  </span>
                ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function durationLabel(startStr, endStr, t) {
  if (!startStr) return '—';
  const from = new Date(startStr);
  const to = endStr ? new Date(endStr) : new Date();
  const years = differenceInYears(to, from);
  const months = differenceInMonths(to, addYears(from, years));
  if (years === 0 && months <= 0) return t.experience.zero;
  const parts = [];
  if (years > 0) parts.push(t.experience.years(years));
  if (months > 0) parts.push(t.experience.months(months));
  return parts.join(' ');
}

function formatRange(startStr, endStr, t) {
  if (!startStr) return '—';
  const start = format(new Date(startStr), t.experience.dateFormat);
  const end = endStr ? format(new Date(endStr), t.experience.dateFormat) : t.experience.present;
  return `${start} – ${end}`;
}

export default function Experience() {
  const { status, data } = usePortfolio();
  const { t } = useI18n();
  const jobs = data?.work ?? [];
  const [openIndex, setOpenIndex] = useState(null);

  const closeIf = (i) => setOpenIndex((cur) => (cur === i ? null : cur));

  return (
    <section id="experience" className="mx-auto max-w-content border-x border-b border-zinc-800 scroll-mt-14">
      <div className="grid grid-cols-1 gap-0 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <BtopPanel
            title={t.experience.title}
            titleRight={t.experience.tasks(jobs.length)}
            accent="cpu"
            fullHeight
          >
            <div className="grid grid-cols-[3rem_1fr_6rem] gap-2 border-b border-zinc-800 bg-zinc-900/40 px-3 py-2 font-mono text-xs uppercase tracking-wider text-zinc-500 sm:grid-cols-[3rem_1fr_3rem_3rem_8rem] sm:py-1.5 sm:text-[10px]">
              <span>pid</span>
              <span>name / org</span>
              <span className="hidden text-right sm:block">cpu</span>
              <span className="hidden text-right sm:block">mem</span>
              <span className="text-right">time</span>
            </div>

            {status === 'loading' ? (
              <div className="px-3 py-4 font-mono text-sm text-zinc-500 sm:text-xs">{t.experience.loading}</div>
            ) : jobs.length === 0 ? (
              <div className="px-3 py-4 font-mono text-sm text-zinc-500 sm:text-xs">{t.experience.empty}</div>
            ) : (

              <div className="font-mono text-sm sm:text-xs">
                {jobs.map((job, i) => {
                  const pid = 1000 + i;
                  const cpu = 70 + i * 8;
                  const mem = 55 + i * 7;
                  const isRunning = job.isCurrentRole;
                  const isOpen = openIndex === i;
                  return (
                    <div
                      key={pid}
                      className="relative"
                      onMouseEnter={() => setOpenIndex(i)}
                      onMouseLeave={() => closeIf(i)}
                      onFocus={() => setOpenIndex(i)}
                      onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget)) closeIf(i);
                      }}
                    >
                      <div
                        role="button"
                        tabIndex={0}
                        aria-expanded={isOpen}
                        aria-label={t.experience.rowLabel(job.position, job.company)}
                        onClick={() => setOpenIndex((cur) => (cur === i ? null : i))}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setOpenIndex((cur) => (cur === i ? null : i));
                          } else if (e.key === 'Escape') {
                            setOpenIndex(null);
                          }
                        }}
                        className={`btop-row grid cursor-pointer grid-cols-[3rem_1fr_6rem] gap-2 border-b border-zinc-800/40 px-3 py-3 outline-none last:border-0 focus-visible:bg-zinc-900/40 sm:grid-cols-[3rem_1fr_3rem_3rem_8rem] sm:py-2.5 ${isOpen ? 'bg-zinc-900/40' : ''}`}
                      >
                        <span className="text-zinc-500">{pid}</span>
                        <div className="min-w-0">
                          <div className="truncate text-zinc-200">{job.position}</div>
                          <div className="truncate text-xs text-zinc-500 sm:text-[10px]">
                            {job.website ? (
                              <a href={job.website} target="_blank" rel="noreferrer" className="text-brand underline-offset-1 hover:underline" onClick={(e) => e.stopPropagation()}>
                                {job.company}
                              </a>
                            ) : (
                              job.company
                            )}
                          </div>
                        </div>
                        <span className={`hidden text-right sm:block ${isRunning ? 'text-btop-cpu' : 'text-zinc-500'}`}>
                          {cpu}%
                        </span>
                        <span className={`hidden text-right sm:block ${isRunning ? 'text-btop-mem' : 'text-zinc-500'}`}>
                          {mem}%
                        </span>
                        <span className="text-right text-zinc-400">
                          {isRunning ? (
                            <span className="text-btop-mem">●</span>
                          ) : (
                            <span className="text-zinc-600">○</span>
                          )}{' '}
                          {durationLabel(job.startDate, job.endDate, t)}
                        </span>
                      </div>
                      {isOpen ? <ExperiencePopup job={job} pid={pid} t={t} /> : null}
                    </div>
                  );
                })}
              </div>
            )}

            {status === 'ready' && jobs.length > 0 ? (
              <div className="border-t border-zinc-800 bg-zinc-900/20 px-3 py-2 font-mono text-xs text-zinc-600 sm:py-1.5 sm:text-[10px]">
                {jobs.map((job, i) => (
                  <span key={i} className="mr-3">
                    <span className="text-zinc-500">[{1000 + i}]</span>{' '}
                    {formatRange(job.startDate, job.endDate, t)}
                  </span>
                ))}
              </div>
            ) : null}
          </BtopPanel>
        </div>

        <div className="lg:col-span-4">
          <Meme />
        </div>
      </div>
    </section>
  );
}
