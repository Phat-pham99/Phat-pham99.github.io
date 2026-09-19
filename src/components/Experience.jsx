import { differenceInMonths, differenceInYears, addYears, format } from 'date-fns';
import BtopPanel from './BtopPanel.jsx';
import BtopBar from './BtopBar.jsx';
import usePortfolio from '../hooks/usePortfolio.js';

function durationLabel(startStr, endStr) {
  if (!startStr) return '—';
  const from = new Date(startStr);
  const to = endStr ? new Date(endStr) : new Date();
  const years = differenceInYears(to, from);
  const months = differenceInMonths(to, addYears(from, years));
  if (years === 0 && months <= 0) return '0 mos';
  const parts = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (months > 0) parts.push(`${months} mo${months > 1 ? 's' : ''}`);
  return parts.join(' ');
}

function formatRange(startStr, endStr) {
  if (!startStr) return '—';
  const start = format(new Date(startStr), 'MMM yyyy');
  const end = endStr ? format(new Date(endStr), 'MMM yyyy') : 'Present';
  return `${start} – ${end}`;
}

export default function Experience() {
  const { status, data } = usePortfolio();
  const jobs = data?.work ?? [];

  return (
    <section id="experience" className="mx-auto max-w-content border-x border-b border-zinc-800 scroll-mt-14">
      <div className="grid grid-cols-1 gap-0 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <BtopPanel
            title="PROCESSES / CAREER"
            titleRight={`${jobs.length} tasks`}
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
              <div className="px-3 py-4 font-mono text-sm text-zinc-500 sm:text-xs">fetching processes...</div>
            ) : jobs.length === 0 ? (
              <div className="px-3 py-4 font-mono text-sm text-zinc-500 sm:text-xs">no process data available</div>
            ) : (

              <div className="font-mono text-sm sm:text-xs">
                {jobs.map((job, i) => {
                  const pid = 1000 + i;
                  const cpu = 70 + i * 8;
                  const mem = 55 + i * 7;
                  const isRunning = job.isCurrentRole;
                  return (
                    <div
                      key={pid}
                      className="btop-row grid grid-cols-[3rem_1fr_6rem] gap-2 border-b border-zinc-800/40 px-3 py-3 last:border-0 sm:grid-cols-[3rem_1fr_3rem_3rem_8rem] sm:py-2.5"
                    >
                      <span className="text-zinc-500">{pid}</span>
                      <div className="min-w-0">
                        <div className="truncate text-zinc-200">{job.position}</div>
                        <div className="truncate text-xs text-zinc-500 sm:text-[10px]">
                          {job.website ? (
                            <a href={job.website} target="_blank" rel="noreferrer" className="text-brand underline-offset-1 hover:underline">
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
                        {durationLabel(job.startDate, job.endDate)}
                      </span>
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
                    {formatRange(job.startDate, job.endDate)}
                  </span>
                ))}
              </div>
            ) : null}
          </BtopPanel>
        </div>
      </div>
    </section>
  );
}
