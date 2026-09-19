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

function wrapText(text, width = 50) {
  if (!text) return [];
  const paragraphs = text.split(/\n+/).filter(Boolean);
  const lines = [];
  for (const para of paragraphs) {
    const words = para.split(/\s+/);
    let current = '';
    for (const word of words) {
      if ((current + ' ' + word).trim().length > width) {
        lines.push(current.trim());
        current = word;
      } else {
        current = current ? `${current} ${word}` : word;
      }
    }
    if (current) lines.push(current.trim());
    lines.push('');
  }
  return lines;
}

export default function About() {
  const { data } = usePortfolio();
  const basics = data?.basics;
  const summary = basics?.summary?.trim();
  const displayLines = summary ? wrapText(summary) : BIO_LINES;
  const infoItems = [
    ['based', basics?.location || 'Ho Chi Minh City, Vietnam'],
    ['Title', 'Senior software engineer'],
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
          <div className="font-mono text-base leading-relaxed sm:text-sm">
            <div className="mb-2 text-zinc-600">
            </div>
            {displayLines.map((line, i) => (
              <div key={i} className={line === '' ? 'h-5' : 'text-zinc-300'}>
                {line || '\u00A0'}
              </div>
            ))}
            <div className="mt-4 text-sm text-zinc-500 sm:text-xs">
              <span className="text-brand">#</span> I do what I love and love what I do
            </div>
          </div>
        </BtopPanel>

        <BtopPanel
          title="ENV / VARIABLES"
          titleRight=".env"
          accent="disk"
          contentClassName="p-4"
        >
          <div className="space-y-0 font-mono text-base sm:text-sm">
            {infoItems.map(([key, value]) => (
              <div
                key={key}
                className="btop-row flex items-center gap-2 border-b border-zinc-800/60 px-2 py-2.5 last:border-0 sm:py-2"
              >
                <span className="w-24 shrink-0 text-zinc-500">{key}</span>
                <span className="text-brand">=</span>
                <span className="min-w-0 truncate text-zinc-300">{value}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 border border-zinc-800 bg-zinc-900/40 p-3">
            <div className="font-mono text-sm text-zinc-500 sm:text-xs">
              <span className="text-brand">$</span> echo $EDITOR $SHELL $DISTRO
            </div>
            <div className="mt-1 font-mono text-base text-zinc-300 sm:text-sm">
              nvim zsh arch
            </div>
          </div>
        </BtopPanel>
      </div>
    </section>
  );
}
