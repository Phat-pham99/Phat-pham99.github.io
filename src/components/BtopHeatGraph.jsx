import { memo } from 'react';

function mix(start, end, amount) {
  return start.map((channel, index) => Math.round(channel + (end[index] - channel) * amount));
}

function fireColor(ratio, light) {
  const stops = light
    ? [
        [0, [21, 128, 61]],
        [0.1, [161, 98, 7]],
        [0.45, [194, 65, 12]],
        [0.78, [220, 38, 38]],
        [1, [153, 27, 27]],
      ]
    : [
        [0, [34, 197, 94]],
        [0.1, [234, 179, 8]],
        [0.45, [249, 115, 22]],
        [0.78, [239, 68, 68]],
        [1, [220, 38, 38]],
      ];
  const nextIndex = stops.findIndex(([position]) => ratio <= position);
  if (nextIndex <= 0) return stops[0][1];
  const [startPosition, startColor] = stops[nextIndex - 1];
  const [endPosition, endColor] = stops[nextIndex];
  return mix(startColor, endColor, (ratio - startPosition) / (endPosition - startPosition));
}

export function heatStyle(value, max = 100) {
  const ratio = max > 0 ? Math.min(1, Math.max(0, value / max)) : 0;
  const dark = fireColor(ratio, false).join(' ');
  const light = fireColor(ratio, true).join(' ');
  return {
    '--heat-ratio': ratio,
    '--activity-heat-dark': dark,
    '--activity-heat-light': light,
    backgroundColor: 'rgb(var(--activity-heat-color, var(--activity-heat-dark)))',
  };
}

const BtopHeatGraph = memo(function BtopHeatGraph({ data, width = 36, max = 100 }) {
  const samples = data.slice(-width);
  const normalized = [...Array(Math.max(0, width - samples.length)).fill(0), ...samples];

  return (
    <div
      className="activity-graph grid h-20 min-h-20 max-h-20 w-full min-w-0 shrink-0 items-end gap-px overflow-hidden border-b border-zinc-800"
      style={{
        contain: 'layout paint',
        gridTemplateColumns: `repeat(${width}, minmax(0, 1fr))`,
      }}
      role="img"
      aria-label={`Recent CPU activity, 0 to ${max} percent`}
    >
      {normalized.map((value, index) => (
        <span
          key={index}
          aria-hidden="true"
          className="activity-heat h-full min-w-0 origin-bottom transition-transform duration-100 ease-out motion-reduce:transition-none"
          style={{ ...heatStyle(value, max), transform: `scaleY(${Math.max(0.025, max > 0 ? Math.min(1, value / max) : 0)})` }}
        />
      ))}
    </div>
  );
});

export default BtopHeatGraph;