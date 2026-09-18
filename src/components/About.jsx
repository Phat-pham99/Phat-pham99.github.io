import BtopPanel from './BtopPanel.jsx';
import usePortfolio from '../hooks/usePortfolio.js';

const BIO_LINES = [
  'I graduated from HCMUT with a degree in Biomedical Engineering — but',
  'software pulled harder. Instead of medical devices, I ended up building',
  'web apps, automation and data pipelines, and I haven\'t looked back since.',
  '',
  'These days I work as a Software Engineer at Terralogic in Ho Chi Minh',
  'City, writing Python and JavaScript for a living. Off the clock I play',
  'piano, dig into data science, and ship small fun projects.',
];

export default function About() {
  const { data } = usePortfolio();
  const basics = data?.basics;
  const infoItems = [
    ['based', basics?.location || 'Ho Chi Minh City, Vietnam'],
    ['degree', 'BE Biomedical Engineering — HCMUT'],
    ['dayjob', basics?.label || 'Software Engineer @ Terralogic'],
    ['afterhours', 'piano · data tinkering · side projects'],
    ['stack', 'Python · JS/TS · React · Node.js · Go'],
  ];

  return (
    <section id="about" className="mx-auto max-w-content border-x border-b border-zinc-800 scroll-mt-14">
      <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
        <BtopPanel
          title="BIO / README"
          titleRight="bio.md"
          accent="mem"
          contentClassName="p-4"
        >
          <div className="font-mono text-sm leading-relaxed">
            <div className="mb-2 text-zinc-600">
              ─────────────────────────────────────────
            </div>
            {BIO_LINES.map((line, i) => (
              <div key={i} className={line === '' ? 'h-4' : 'text-zinc-300'}>
                {line || '\u00A0'}
              </div>
            ))}
            <div className="mt-4 text-zinc-500">
              <span className="text-brand">#</span> biomedical background + engineering habits = software built with care
            </div>
          </div>
        </BtopPanel>

        <BtopPanel
          title="ENV / VARIABLES"
          titleRight=".env"
          accent="disk"
          contentClassName="p-4"
        >
          <div className="space-y-0 font-mono text-sm">
            {infoItems.map(([key, value]) => (
              <div
                key={key}
                className="btop-row flex items-center gap-2 border-b border-zinc-800/60 px-2 py-2 last:border-0"
              >
                <span className="w-24 shrink-0 text-zinc-500">{key}</span>
                <span className="text-brand">=</span>
                <span className="min-w-0 truncate text-zinc-300">{value}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 border border-zinc-800 bg-zinc-900/40 p-3">
            <div className="font-mono text-xs text-zinc-500">
              <span className="text-brand">$</span> echo $EDITOR $SHELL $DISTRO
            </div>
            <div className="mt-1 font-mono text-sm text-zinc-300">
              nvim zsh arch
            </div>
          </div>
        </BtopPanel>
      </div>
    </section>
  );
}
