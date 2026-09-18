import { differenceInMonths, differenceInYears, addYears } from 'date-fns';
import BtopPanel from './BtopPanel.jsx';
import BtopBar from './BtopBar.jsx';

function tenureLabel(fromString) {
  const from = new Date(fromString);
  const now = new Date();
  const years = differenceInYears(now, from);
  const months = differenceInMonths(now, addYears(from, years));
  if (years === 0 && months <= 0) return '0 mos';
  const parts = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (months > 0) parts.push(`${months} mo${months > 1 ? 's' : ''}`);
  return parts.join(' ');
}

const JOBS = [
  {
    pid: '1337',
    title: 'Software Engineer',
    org: 'Terralogic Inc',
    orgHref: 'https://terralogic.com/',
    range: 'May 2023 – Present',
    duration: tenureLabel('2023-05-01'),
    cpu: 85,
    mem: 70,
    status: 'R',
  },
  {
    pid: '0420',
    title: 'Associate Software Engineer',
    org: 'Terralogic Inc',
    orgHref: 'https://terralogic.com/',
    range: 'Aug 2022 – Apr 2023',
    duration: '9 mos',
    cpu: 72,
    mem: 55,
    status: 'S',
  },
  {
    pid: '0001',
    title: 'BE Biomedical Engineering',
    org: 'HCMUT',
    orgHref: 'https://hcmut.edu.vn/',
    range: 'Sep 2017 – Nov 2021',
    duration: '4 yrs',
    cpu: 65,
    mem: 45,
    status: 'S',
  },
];

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-content border-x border-b border-zinc-800 scroll-mt-14">
      <div className="grid grid-cols-1 gap-0 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <BtopPanel
            title="PROCESSES / CAREER"
            titleRight={`${JOBS.length} tasks`}
            accent="cpu"
            fullHeight
          >
            {/* Table header */}
            <div className="grid grid-cols-[3rem_1fr_3rem_3rem_8rem] gap-2 border-b border-zinc-800 bg-zinc-900/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
              <span>pid</span>
              <span>name / org</span>
              <span className="text-right">cpu</span>
              <span className="text-right">mem</span>
              <span className="text-right">time</span>
            </div>

            {/* Process rows */}
            <div className="font-mono text-xs">
              {JOBS.map((job, i) => (
                <div
                  key={job.pid}
                  className="btop-row grid grid-cols-[3rem_1fr_3rem_3rem_8rem] gap-2 border-b border-zinc-800/40 px-3 py-2.5 last:border-0"
                >
                  <span className="text-zinc-500">{job.pid}</span>
                  <div className="min-w-0">
                    <div className="truncate text-zinc-200">{job.title}</div>
                    <div className="truncate text-[10px] text-zinc-500">
                      {job.orgHref ? (
                        <a href={job.orgHref} target="_blank" rel="noreferrer" className="text-brand underline-offset-1 hover:underline">
                          {job.org}
                        </a>
                      ) : (
                        job.org
                      )}
                    </div>
                  </div>
                  <span className={`text-right ${job.status === 'R' ? 'text-btop-cpu' : 'text-zinc-500'}`}>
                    {job.cpu}%
                  </span>
                  <span className={`text-right ${job.status === 'R' ? 'text-btop-mem' : 'text-zinc-500'}`}>
                    {job.mem}%
                  </span>
                  <span className="text-right text-zinc-400">
                    {job.status === 'R' ? (
                      <span className="text-btop-mem">●</span>
                    ) : (
                      <span className="text-zinc-600">○</span>
                    )}{' '}
                    {job.duration}
                  </span>
                </div>
              ))}
            </div>
          </BtopPanel>
        </div>

        <div className="lg:col-span-4">
          <BtopPanel
            title="MEM / STACK"
            titleRight="heap"
            accent="mem"
            contentClassName="space-y-3 p-4"
          >
            <BtopBar label="Python" value={92} max={100} width={16} color="mem" />
            <BtopBar label="JS/TS" value={88} max={100} width={16} color="cpu" />
            <BtopBar label="React" value={85} max={100} width={16} color="net" />
            <BtopBar label="Node.js" value={78} max={100} width={16} color="disk" />
            <BtopBar label="Django" value={75} max={100} width={16} color="mem" />
            <BtopBar label="Selenium" value={70} max={100} width={16} color="cpu" />
            <BtopBar label="Data Viz" value={68} max={100} width={16} color="temp" />
            <BtopBar label="Go" value={45} max={100} width={16} color="net" />

            <div className="mt-4 border-t border-zinc-800 pt-3">
              <div className="font-mono text-xs text-zinc-500">
                <span className="text-brand">$</span> cat stack.txt
              </div>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Full-stack development: backend services in Python, web frontends
                in JavaScript, plus automation and data work.
              </p>
            </div>
          </BtopPanel>
        </div>
      </div>
    </section>
  );
}
