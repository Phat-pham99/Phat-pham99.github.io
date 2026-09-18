import BtopPanel from './BtopPanel.jsx';
import BtopBar from './BtopBar.jsx';
import Badge from './Badge.jsx';
import usePortfolio from '../hooks/usePortfolio.js';

const STATIC_GROUPS = [
  {
    name: 'python',
    items: ['Selenium', 'Django', 'TensorFlow', 'Data Visualization'],
  },
  {
    name: 'javascript',
    items: ['React', 'NestJS', 'Node.js', 'TypeScript'],
  },
  {
    name: 'learning',
    items: ['Go', 'PostgreSQL', 'Systems stuff'],
  },
];

export default function Skills() {
  const { status, data } = usePortfolio();
  const apiSkills = data?.skills ?? [];
  const apiLanguages = data?.languages ?? [];

  return (
    <section id="skills" className="mx-auto max-w-content border-x border-b border-zinc-800 scroll-mt-14">
      <div className="grid grid-cols-1 gap-0 md:grid-cols-3">
        {STATIC_GROUPS.map((group) => (
          <BtopPanel
            key={group.name}
            title={group.name.toUpperCase()}
            titleRight={`${group.items.length} pkgs`}
            accent="mem"
            contentClassName="p-4"
            fullHeight
          >
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item}>
                  <Badge>{item}</Badge>
                </li>
              ))}
            </ul>
          </BtopPanel>
        ))}
      </div>

      <BtopPanel
        title="LOCALES / LANGUAGES"
        titleRight="locale -a"
        accent="net"
        contentClassName="p-4"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {apiLanguages.length > 0 ? (
            apiLanguages.map((lang) => (
              <div
                key={lang.name}
                className="border border-zinc-800 bg-zinc-900/40 p-3"
              >
                <div className="flex items-center justify-between font-mono text-sm">
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
            <div className="font-mono text-xs text-zinc-500">no locale data available</div>
          )}
        </div>
      </BtopPanel>

      {apiSkills.length > 0 ? (
        <BtopPanel
          title="SKILLS / RANKINGS"
          titleRight={status === 'loading' ? 'fetching...' : `${apiSkills.length} entries`}
          accent="cpu"
          contentClassName="p-4"
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {apiSkills.map((skill, i) => (
              <div key={skill.name} className="border border-zinc-800 bg-zinc-900/40 p-3">
                <div className="flex items-center justify-between font-mono text-sm">
                  <span className="text-zinc-200">{skill.name}</span>
                  <span className="text-zinc-500">{skill.level}</span>
                </div>
                <div className="mt-2">
                  <BtopBar
                    label=""
                    value={skill.value}
                    max={100}
                    width={20}
                    color={['mem', 'cpu', 'net', 'disk', 'temp'][i % 5]}
                    showPercent={false}
                  />
                </div>
              </div>
            ))}
          </div>
        </BtopPanel>
      ) : null}
    </section>
  );
}
