import { memo } from 'react';

const BtopMiniGraph = memo(function BtopMiniGraph({ data, width = 30, height = 6, color = 'brand' }) {
  const colorMap = {
    brand: 'text-brand',
    cpu: 'text-btop-cpu',
    mem: 'text-btop-mem',
    disk: 'text-btop-disk',
    net: 'text-btop-net',
    temp: 'text-btop-temp',
  };

  const graphColor = colorMap[color] || colorMap.brand;
  const bars = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];

  const normalized = data.slice(-width).map((v) => {
    const idx = Math.min(bars.length - 1, Math.max(0, Math.floor((v / 100) * bars.length)));
    return bars[idx];
  });

  while (normalized.length < width) {
    normalized.unshift('▁');
  }

  return (
    <span className={`font-mono text-xs ${graphColor}`} aria-hidden="true">
      {normalized.join('')}
    </span>
  );
});

export default BtopMiniGraph;
