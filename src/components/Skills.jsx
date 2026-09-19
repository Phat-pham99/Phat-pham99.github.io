import BtopPanel from './BtopPanel.jsx';
import BtopBar from './BtopBar.jsx';
import Badge from './Badge.jsx';
import usePortfolio from '../hooks/usePortfolio.js';

export default function Skills() {
  const { status, data } = usePortfolio();
  const apiSkills = data?.skills ?? [];
  const apiLanguages = data?.languages ?? [];

  return (
    <section id="skills" className="mx-auto max-w-content border-x border-b border-zinc-800 scroll-mt-14">
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
                <div className="flex items-center justify-between font-mono text-base sm:text-sm">
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
