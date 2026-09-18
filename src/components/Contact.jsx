import BtopPanel from './BtopPanel.jsx';
import { GitHubIcon, LinkedInIcon, MailIcon, DownloadIcon } from './Icons.jsx';
import { SITE } from '../data/site';
import usePortfolio from '../hooks/usePortfolio.js';

const ICON_MAP = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
};

export default function Contact() {
  const { data } = usePortfolio();
  const basics = data?.basics;

  const channels = [
    { label: 'email', href: `mailto:${basics?.email || SITE.email}`, display: basics?.email || SITE.email, Icon: MailIcon, external: false },
    ...(basics?.profiles || [])
      .filter((p) => p.network.toLowerCase() !== 'gitconnected')
      .map((p) => ({
        label: p.network.toLowerCase(),
        href: p.url,
        display: p.username || p.network,
        Icon: ICON_MAP[p.network] || null,
        external: true,
      })),
    { label: 'resume', href: SITE.resumeUrl, display: 'Phat_Resume', Icon: DownloadIcon, external: true },
  ];

  return (
    <section id="contact" className="mx-auto max-w-content border-x border-b border-zinc-800 scroll-mt-14">
      <BtopPanel
        title="NET / CONNECTIONS"
        titleRight="ESTABLISHED"
        accent="net"
        fullHeight
      >
        <div className="grid grid-cols-[2fr_3fr_4rem] gap-2 border-b border-zinc-800 bg-zinc-900/40 px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
          <span>proto</span>
          <span>address / endpoint</span>
          <span className="text-right">state</span>
        </div>

        <div className="font-mono text-xs">
          {channels.map(({ label, href, display, Icon, external }) => (
            <a
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noreferrer' : undefined}
              className="btop-row grid grid-cols-[2fr_3fr_4rem] gap-2 border-b border-zinc-800/40 px-4 py-3 last:border-0"
            >
              <span className="inline-flex items-center gap-2 text-zinc-400">
                {Icon ? <Icon className="h-4 w-4" /> : <span className="inline-block h-4 w-4 text-zinc-600">?</span>}
                <span className="uppercase">{label}</span>
              </span>
              <span className="truncate text-zinc-200 transition-colors group-hover:text-brand">
                {display}
              </span>
              <span className="text-right text-btop-net">
                <span className="inline-block h-2 w-2 bg-btop-net" />
                {' '}ESTAB
              </span>
            </a>
          ))}
        </div>

        <div className="border-t border-zinc-800 bg-zinc-900/20 px-4 py-3">
          <p className="font-mono text-xs text-zinc-500">
            <span className="text-brand">$</span> ping -c 1 phat
            <span className="ml-4 text-zinc-400">Open to interesting problems, OSS collaboration and a good cup of coffee.</span>
          </p>
        </div>
      </BtopPanel>
    </section>
  );
}
