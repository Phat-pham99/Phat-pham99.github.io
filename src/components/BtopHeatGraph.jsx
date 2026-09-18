import { memo } from 'react';

function heatStyle(value, max) {
  const ratio = max > 0 ? value / max : 0;
  const r = Math.min(255, Math.floor(20 + ratio * 235));
  const g = Math.min(255, Math.floor(200 - ratio * 180));
  const b = Math.max(0, Math.floor(50 - ratio * 50));
  return { color: `rgb(${r},${g},${b})` };
}

const BtopHeatGraph = memo(function BtopHeatGraph({ data, width = 30 }) {
  const bars = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];
  const max = Math.max(...data, 1);

  const normalized = data.slice(-width).map((v) => {
    const idx = Math.min(bars.length - 1, Math.max(0, Math.floor((v / max) * bars.length)));
    return { char: bars[idx], value: v };
  });

  while (normalized.length < width) {
    normalized.unshift({ char: '▁', value: 0 });
  }

  return (
    <span className="font-mono text-xs leading-none" aria-hidden="true">
      {normalized.map(({ char, value }, i) => (
        <span key={i} style={heatStyle(value, max)}>
          {char}
        </span>
      ))}
    </span>
  );
});

export default BtopHeatGraph;