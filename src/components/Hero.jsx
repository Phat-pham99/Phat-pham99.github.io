import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useTypewriter from '../hooks/useTypewriter.js';
import portrait from '../assets/portrait.webp';
import { GitHubIcon, LinkedInIcon, MailIcon, CoffeeIcon } from './Icons.jsx';
import { SITE } from '../data/site';
import usePortfolio from '../hooks/usePortfolio.js';
import BtopPanel from './BtopPanel.jsx';
import BtopHeatGraph from './BtopHeatGraph.jsx';
import CMatrix from './CMatrix.jsx';

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
  const [activityData, setActivityData] = useState(NET_DATA.map((v) => v * 0.6));
  const [tick, setTick] = useState(0);
  const intervalRef = useRef(null);

  const shuffleActivity = useCallback(() => {
    const intensity = coffeeOn ? 1.5 : 0.5;
    const fresh = NET_DATA.map((v) => v * (0.3 + Math.random() * intensity));
    setActivityData(fresh);
    setTick((t) => t + 1);
  }, [coffeeOn]);

  useEffect(() => {
    if (coffeeOn) {
      intervalRef.current = setInterval(shuffleActivity, 120);
    } else {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(shuffleActivity, 1500);
    }
    return () => clearInterval(intervalRef.current);
  }, [coffeeOn, shuffleActivity]);

  const coffeeBtn = (
    <span className="relative inline-flex coffeeBtn">
      <button
        type="button"
        onClick={() => { setCoffeeOn((prev) => !prev); setShowHint(false); }}
         className={`flex items-center gap-1 border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider transition-all duration-200 ${
          coffeeOn
            ? 'border-amber-700 bg-amber-900/70 text-amber-200 shadow-[0_0_8px_rgba(180,83,9,0.4)]'
            : 'border-amber-800/60 bg-amber-950/60 text-amber-300 hover:border-amber-600 hover:text-amber-200'
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

          {/* Matrix rain */}
          <BtopPanel
            title="Wake up, Neo 😎👨🏼‍💻"
            titleRight={`${(skills.length || 0)} runs active`}
            accent="cpu"
            contentClassName="relative h-64 overflow-hidden"
          >
            <CMatrix className="absolute inset-0 h-full w-full" font_size={30} />
          </BtopPanel>
        </div>

        {/* Right column */}
        <div className="lg:col-span-5">
          {/* Network / Activity graph */}
          <BtopPanel
            title="ACTIVITY"
            titleRight={coffeeOn ? `CPU ${Math.floor(80 + Math.random() * 20)}%` : 'CPU 5%'}
            titleActions={coffeeBtn}
            accent="cpu"
            contentClassName={`space-y-3 p-4 ${coffeeOn ? 'coffee-active' : ''}`}
            fullHeight
          >
            <div className="flex items-center justify-between font-mono text-[10px] text-zinc-600">
              <span>idle</span>
              <div className="flex gap-px">
                {Array.from({ length: 8 }, (_, i) => {
                  const ratio = (i + 1) / 8;
                  const r = Math.min(255, Math.floor(20 + ratio * 235));
                  const g = Math.min(255, Math.floor(200 - ratio * 180));
                  const b = Math.max(0, Math.floor(50 - ratio * 50));
                  return (
                    <span
                      key={i}
                      className="h-2.5 w-3"
                      style={{ backgroundColor: `rgb(${r},${g},${b})` }}
                    />
                  );
                })}
              </div>
              <span>max</span>
            </div>

            <BtopHeatGraph data={activityData} width={32} />

            <div className="border-t border-zinc-800 pt-3">
              <div className={`grid grid-cols-2 gap-2 font-mono text-xs ${coffeeOn ? 'coffee-stat-grid' : ''}`}>
                <div className={`border border-zinc-800 bg-zinc-900/40 p-2 ${coffeeOn ? 'animate-coffee-pulse' : ''}`}>
                  <div className="text-zinc-500">Coffee drank ☕️</div>
                  <div className="text-btop-cpu">{coffeeOn ? `${(Math.round(Math.random() * 8 + 1))}` : '0'}</div>
                </div>
                <div className={`border border-zinc-800 bg-zinc-900/40 p-2 ${coffeeOn ? 'animate-coffee-pulse-delay' : ''}`}>
                  <div className="text-zinc-500">uptime</div>
                  <div className="text-btop-mem">{coffeeOn ? `${Math.floor(Math.random() * 2 + 1)}d ${Math.floor(Math.random() * 24)}h` : '18h'}</div>
                </div>
                <div className={`border border-zinc-800 bg-zinc-900/40 p-2 ${coffeeOn ? 'animate-coffee-pulse' : ''}`}>
                  <div className="text-zinc-500">commits</div>
                  <div className="text-brand">{coffeeOn ? `${Math.floor(1247 + Math.random() * 500)}` : '10'}</div>
                </div>
                <div className={`border border-zinc-800 bg-zinc-900/40 p-2 ${coffeeOn ? 'animate-coffee-pulse-delay' : ''}`}>
                  <div className="text-zinc-500">Money</div>
                  <div className="text-btop-disk">${coffeeOn ? `${(Math.round(Math.random() * 10 + 1)) * 10000}` : '0'}</div>
                </div>
              </div>
            </div>

            <div className="border-t border-zinc-800 pt-3">
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
                    {coffeeOn ? 'Windows sucks 🪟' : 'Manjaro 🌿 & Xubuntu 🐁'}
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
