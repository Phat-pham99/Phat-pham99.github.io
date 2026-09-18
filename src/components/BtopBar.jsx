import { memo } from 'react';

const BtopBar = memo(function BtopBar({
  label,
  value,
  max = 100,
  width = 20,
  color = 'brand',
  showPercent = true,
  unit = '',
}) {
  const pct = Math.min(100, Math.max(0, Math.round((value / max) * 100)));
  const filled = Math.round((pct / 100) * width);
  const empty = width - filled;

  const colorMap = {
    brand: 'text-brand',
    cpu: 'text-btop-cpu',
    mem: 'text-btop-mem',
    disk: 'text-btop-disk',
    net: 'text-btop-net',
    temp: 'text-btop-temp',
    dim: 'text-btop-dim',
  };

  const barColor = colorMap[color] || colorMap.brand;

  return (
    <div className="flex items-center gap-2 font-mono text-xs">
      <span className="w-20 shrink-0 truncate text-zinc-400">{label}</span>
      <span className={`${barColor} whitespace-pre`}>
        {'█'.repeat(filled)}
      </span>
      <span className="whitespace-pre text-zinc-700">
        {'░'.repeat(empty)}
      </span>
      {showPercent && (
        <span className="w-10 shrink-0 text-right text-zinc-500">
          {pct}%{unit}
        </span>
      )}
    </div>
  );
});

export default BtopBar;
