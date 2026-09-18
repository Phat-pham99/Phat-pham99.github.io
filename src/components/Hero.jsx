import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useTypewriter from '../hooks/useTypewriter.js';
import portrait from '../assets/portrait.webp';
import { GitHubIcon, LinkedInIcon, MailIcon, CoffeeIcon } from './Icons.jsx';
import { SITE } from '../data/site';
import usePortfolio from '../hooks/usePortfolio.js';
import BtopPanel from './BtopPanel.jsx';
import BtopBar from './BtopBar.jsx';
import BtopMiniGraph from './BtopMiniGraph.jsx';

const ABOUTME = ['Software Developer 👨‍💻🐍 ', 'Linux enthusiast 🐧', 'FOSS advocate 🆓⛓️‍💥', 'Cat lover 😺🐈'];
const NET_DATA = [12, 18, 25, 32, 28, 45, 38, 52, 48, 65, 58, 72, 68, 85, 78, 92, 88, 95, 82, 90, 85, 78, 65, 55, 42, 38, 45, 52, 48, 35];
const typeMs = 100;
const deleteMs = 50;
const holdMs = 3000;

export default function Hero() {
  const typed = useTypewriter(ABOUTME, typeMs, deleteMs, holdMs);
  const { data } = usePortfolio();
  const basics = data?.basics;
  const avatar = basics?.image || portrait;
  const skills = data?.skills ?? [];
  const repoCount = data?.projects?.length ?? 0;

  const [coffeeOn, setCoffeeOn] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [netDown, setNetDown] = useState(NET_DATA.map((v) => v * 0.8));
  const [netUp, setNetUp] = useState(NET_DATA.map((v) => v * 0.4));
  const [speedDown, setSpeedDown] = useState('128 KB/s');
  const [speedUp, setSpeedUp] = useState('64 KB/s');
  const [tick, setTick] = useState(0);
  const intervalRef = useRef(null);

  const shuffleNetData = useCallback(() => {
    const fresh = NET_DATA.map((v) => v * (0.6 + Math.random() * 0.8));
    setNetDown(fresh.map((v) => v * 0.8));
    setNetUp(fresh.map((v) => v * 0.4));
    setSpeedDown(`${Math.floor(Math.random() * 800 + 100)} KB/s`);
    setSpeedUp(`${Math.floor(Math.random() * 400 + 50)} KB/s`);
    setTick((t) => t + 1);
  }, []);

  useEffect(() => {
    if (coffeeOn) {
      intervalRef.current = setInterval(shuffleNetData, 150);
    } else {
      clearInterval(intervalRef.current);
      setNetDown(NET_DATA.map((v) => v * 0.8));
      setNetUp(NET_DATA.map((v) => v * 0.4));
      setSpeedDown('128 KB/s');
      setSpeedUp('64 KB/s');
    }
    return () => clearInterval(intervalRef.current);
  }, [coffeeOn, shuffleNetData]);

  const coffeeBtn = (
    <span className="relative inline-flex">
      <button
        type="button"
        onClick={() => { setCoffeeOn((prev) => !prev); setShowHint(false); }}
        className={`flex items-center gap-1 border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider transition-all duration-200 ${
          coffeeOn
            ? 'border-yellow-500/60 bg-yellow-500/15 text-yellow-400 shadow-[0_0_8px_rgba(234,179,8,0.3)]'
            : 'border-zinc-700 text-zinc-500 hover:border-zinc-500 hover:text-zinc-300'
        } ${tick % 2 === 0 && coffeeOn ? 'animate-coffee-shake' : ''}`}
        aria-label={coffeeOn ? 'Coffee mode on' : 'Coffee mode off'}
        title={coffeeOn ? 'Coffee ON — running at full speed' : 'Coffee OFF — idle'}
      >
        <CoffeeIcon className={`h-3.5 w-3.5 ${coffeeOn && tick % 4 < 2 ? 'animate-coffee-steam' : ''}`} />
        <span>{coffeeOn ? 'caffeinated' : 'coffee'}</span>
      </button>
      {showHint && !coffeeOn && (
        <span className="pointer-events-none absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] text-yellow-400 animate-coffee-hint">
          Click here
          <span className="ml-1">&#x2191;</span>
        </span>
      )}
    </span>
  );

  return (
    <section id="hero" aria-label="Intro" className="mx-auto max-w-content border-x border-zinc-800">
      {/* Top bar inside hero */}
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/20 px-3 py-1 font-mono text-xs">
        <div className="flex gap-4 text-zinc-500">
          <span>proc: <span className="text-btop-cpu">127</span></span>
          <span>threads: <span className="text-btop-mem">512</span></span>
          <span>tasks: <span className="text-btop-disk">{repoCount || 0}</span> running</span>
        </div>
        <div className="flex gap-4 text-zinc-500">
          <span>mem: <span className="text-btop-mem">14.2</span> / 32.0 GB</span>
          <span>swap: <span className="text-btop-temp">0.0</span> / 8.0 GB</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-0 lg:grid-cols-12">
        {/* Left column - Main info */}
        <div className="lg:col-span-7">
          <BtopPanel
            title="SYSTEM INFO"
            titleRight={`${new Date().toLocaleTimeString('en-US', { hour12: false })}`}
            accent="cpu"
            contentClassName="p-4"
          >
            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="border border-zinc-700 bg-zinc-900 p-1">
                  <img
                    src={avatar}
                    alt={basics?.name ? `Portrait of ${basics.name}` : 'Portrait'}
                    width={96}
                    height={96}
                    className="h-24 w-24 object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="mt-1 text-center font-mono text-[10px] text-zinc-500">[avatar]</div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-mono text-lg font-bold text-zinc-100">
                  <span className="text-brand">phat</span><span className="text-zinc-500">@</span>phatpham.work
                </div>
                <div className="mt-1 font-mono text-l text-zinc-400">
                  <span className="text-zinc-600">» </span>
                  {typed}
                  <span className="cursor-blink text-brand" aria-hidden="true">
                    █
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Link
                    to="/projects"
                    className="border border-brand/50 bg-brand/10 px-3 py-1 font-mono text-xs text-brand transition-colors hover:bg-brand/20"
                  >
                    [F1] Projects
                  </Link>
                  <Link
                    to="/contact"
                    className="border border-zinc-700 px-3 py-1 font-mono text-xs text-zinc-400 transition-colors hover:border-brand hover:text-brand"
                  >
                    [F2] Contact
                  </Link>
                  <span className="flex items-center gap-1">
                    <a
                      href={SITE.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                      className="px-1.5 py-1 text-zinc-500 transition-colors hover:text-brand"
                    >
                      <GitHubIcon className="h-4 w-4" />
                    </a>
                    <a
                      href={SITE.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      className="px-1.5 py-1 text-zinc-500 transition-colors hover:text-brand"
                    >
                      <LinkedInIcon className="h-4 w-4" />
                    </a>
                    <a
                      href={`mailto:${basics?.email || SITE.email}`}
                      aria-label="Email"
                      className="px-1.5 py-1 text-zinc-500 transition-colors hover:text-brand"
                    >
                      <MailIcon className="h-4 w-4" />
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </BtopPanel>

          {/* CPU cores / Skills meter */}
          <BtopPanel
            title="CPU / CORES"
            titleRight={`${skills.length}-Core @ 3.8GHz`}
            accent="cpu"
            contentClassName="space-y-1.5 p-4"
          >
            {skills.length > 0 ? (
              skills.map((skill, i) => (
                <BtopBar
                  key={skill.name}
                  label={skill.name}
                  value={skill.value}
                  max={100}
                  width={24}
                  color={['mem', 'cpu', 'net', 'disk', 'temp'][i % 5]}
                />
              ))
            ) : (
              <div className="font-mono text-xs text-zinc-500">no skill data available</div>
            )}
          </BtopPanel>
        </div>

        {/* Right column */}
        <div className="lg:col-span-5">
          {/* Network / Activity graph */}
          <BtopPanel
            title="NET / ACTIVITY"
            titleRight="eth0 ↑↓"
            titleActions={coffeeBtn}
            accent="net"
            contentClassName={`space-y-2 p-4 ${coffeeOn ? 'coffee-active' : ''}`}
            fullHeight
          >
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="w-12 text-zinc-500">down</span>
              <BtopMiniGraph data={netDown} width={28} color="net" />
              <span className={`text-btop-net tabular-nums ${coffeeOn ? 'animate-coffee-speed' : ''}`}>{speedDown}</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="w-12 text-zinc-500">up</span>
              <BtopMiniGraph data={netUp} width={28} color="cpu" />
              <span className={`text-btop-cpu tabular-nums ${coffeeOn ? 'animate-coffee-speed' : ''}`}>{speedUp}</span>
            </div>
            <div className="mt-4 border-t border-zinc-800 pt-3">
              <div className={`grid grid-cols-2 gap-2 font-mono text-xs ${coffeeOn ? 'coffee-stat-grid' : ''}`}>
                <div className={`border border-zinc-800 bg-zinc-900/40 p-2 ${coffeeOn ? 'animate-coffee-pulse' : ''}`}>
                  <div className="text-zinc-500">total down</div>
                  <div className="text-btop-net">{coffeeOn ? `${(42.7 + Math.random() * 10).toFixed(1)} GB` : '42.7 GB'}</div>
                </div>
                <div className={`border border-zinc-800 bg-zinc-900/40 p-2 ${coffeeOn ? 'animate-coffee-pulse-delay' : ''}`}>
                  <div className="text-zinc-500">total up</div>
                  <div className="text-btop-cpu">{coffeeOn ? `${(18.3 + Math.random() * 8).toFixed(1)} GB` : '18.3 GB'}</div>
                </div>
                <div className={`border border-zinc-800 bg-zinc-900/40 p-2 ${coffeeOn ? 'animate-coffee-pulse' : ''}`}>
                  <div className="text-zinc-500">commits</div>
                  <div className="text-brand">{coffeeOn ? `${Math.floor(1247 + Math.random() * 200)}` : '1,247'}</div>
                </div>
                <div className={`border border-zinc-800 bg-zinc-900/40 p-2 ${coffeeOn ? 'animate-coffee-pulse-delay' : ''}`}>
                  <div className="text-zinc-500">repos</div>
                  <div className="text-btop-disk">{repoCount || '?'}</div>
                </div>
              </div>
            </div>

            <div className="mt-2 border-t border-zinc-800 pt-3">
              <div className={`font-mono text-xs text-zinc-500 ${coffeeOn ? 'animate-coffee-speed' : ''}`}>quick stats</div>
              <div className="mt-2 space-y-1 font-mono text-xs">
                <div className={`flex justify-between btop-row px-1 ${coffeeOn ? 'animate-coffee-shift' : ''}`}>
                  <span className="text-zinc-400">location</span>
                  <span className="text-zinc-200">{basics?.location || 'Ho Chi Minh City, VN'}</span>
                </div>
                <div className={`flex justify-between btop-row px-1 ${coffeeOn ? 'animate-coffee-shift-delay' : ''}`}>
                  <span className="text-zinc-400">timezone</span>
                  <span className="text-zinc-200">UTC+7</span>
                </div>
                <div className={`flex justify-between btop-row px-1 ${coffeeOn ? 'animate-coffee-shift' : ''}`}>
                  <span className="text-zinc-400">editor</span>
                  <span className="text-zinc-200">{coffeeOn ? 'Neovim ⚡' : 'Neovim'}</span>
                </div>
                <div className={`flex justify-between btop-row px-1 ${coffeeOn ? 'animate-coffee-shift-delay' : ''}`}>
                  <span className="text-zinc-400">shell</span>
                  <span className="text-zinc-200">{coffeeOn ? 'zsh ⚡' : 'zsh'}</span>
                </div>
                <div className={`flex justify-between btop-row px-1 ${coffeeOn ? 'animate-coffee-shift' : ''}`}>
                  <span className="text-zinc-400">distro</span>
                  <span className={`text-zinc-200 ${coffeeOn ? 'animate-coffee-speed' : ''}`}>
                    {coffeeOn ? 'Arch (btw) I use Arch btw' : 'Arch (btw)'}
                  </span>
                </div>
              </div>
            </div>
          </BtopPanel>
        </div>
      </div>
    </section>
  );
}
