import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from './useTypewriter.js';

export const ACTIVITY_SAMPLES = 64;
export const IDLE_MAX = 25; //Noice value
export const COFFEE_MAX = 100;
export const HEARTBEAT = [
  0.11, 0.17, 0.22, 0.33, 0.5, 0.78, 1, 0.89, 0.61, 0.39,
  0.22, 0.17, 0.28, 0.44, 0.67, 0.83, 0.61, 0.33, 0.22, 0.17,
  0.11, 0.11, 0.17, 0.11,
];
export const COFFEE_HEARTBEAT = [
  7, 10, 18, 34, 58, 88, 100, 72, 45,
  28, 35, 55, 70, 48, 28, 18, 12, 8,
];

function pulseValue(phase, coffeeOn, noise) {
  if (coffeeOn) {
    const base = COFFEE_HEARTBEAT[phase] ?? COFFEE_HEARTBEAT[0];
    const variation = (noise - 0.5) * (base > 50 ? 12 : 2);
    return Math.round(Math.max(2, Math.min(COFFEE_MAX, base + variation)));
  }

  const ceiling = IDLE_MAX;
  const shape = HEARTBEAT[phase] ?? HEARTBEAT[0];
  const base = shape * ceiling;
  const variation = (noise - 0.5) * 2;
  return Math.round(Math.max(2, Math.min(ceiling, base + variation)));
}

export function createActivity() {
  return {
    tick: 0,
    phase: 0,
    samples: Array.from({ length: ACTIVITY_SAMPLES }, (_, index) => pulseValue(index % HEARTBEAT.length, false, 0.5)),
  };
}

export function advanceActivity(activity, coffeeOn, noise) {
  const tick = activity.tick + 1;
  const period = coffeeOn ? COFFEE_HEARTBEAT.length : HEARTBEAT.length;
  const phase = activity.phase % period;
  const value = pulseValue(phase, coffeeOn, noise);

  return { tick, phase: (phase + 1) % period, samples: [...activity.samples.slice(1), value] };
}

export default function useActivity(coffeeOn) {
  const [activity, setActivity] = useState(createActivity);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const timer = setInterval(() => {
      const noise = Math.random();
      setActivity((previous) => advanceActivity(previous, coffeeOn, noise));
    }, coffeeOn ? 30 : 100);
    return () => clearInterval(timer);
  }, [coffeeOn, reducedMotion]);

  return activity;
}
