import { memo } from 'react';

const BtopPanel = memo(function BtopPanel({
  title,
  titleRight,
  titleActions,
  children,
  className = '',
  contentClassName = '',
  accent = 'brand',
  fullHeight = false,
}) {
  const accentMap = {
    brand: 'border-brand/40 text-brand',
    cpu: 'border-btop-cpu/40 text-btop-cpu',
    mem: 'border-btop-mem/40 text-btop-mem',
    disk: 'border-btop-disk/40 text-btop-disk',
    net: 'border-btop-net/40 text-btop-net',
    temp: 'border-btop-temp/40 text-btop-temp',
    dim: 'border-btop-dim/40 text-btop-dim',
  };

  const accentClass = accentMap[accent] || accentMap.brand;

  return (
    <div
      className={`border border-zinc-800 bg-zinc-950 ${fullHeight ? 'flex flex-col' : ''} ${className}`}
    >
      {title && (
        <div
          className={`flex items-center justify-between border-b border-zinc-800 bg-zinc-900/60 px-3 py-1.5 font-mono text-xs ${accentClass}`}
        >
          <span className="font-bold tracking-wide">{title}</span>
          <span className="flex items-center gap-2">
            {titleActions}
            {titleRight ? <span className="text-zinc-500">{titleRight}</span> : null}
          </span>
        </div>
      )}
      <div className={`${fullHeight ? 'flex-1' : ''} ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
});

export default BtopPanel;
