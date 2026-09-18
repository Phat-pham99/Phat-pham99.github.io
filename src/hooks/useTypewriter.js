import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia(QUERY).matches);

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

export default function useTypewriter(phrases, { typeMs = 60, deleteMs = 35, holdMs = 1600 } = {}) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const current = phrases[index % phrases.length];

    if (!deleting && length === current.length) {
      const timer = setTimeout(() => setDeleting(true), holdMs);
      return () => clearTimeout(timer);
    }
    if (deleting && length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
      return;
    }
    const timer = setTimeout(() => setLength((n) => n + (deleting ? -1 : 1)), deleting ? deleteMs : typeMs);
    return () => clearTimeout(timer);
  }, [length, deleting, index, phrases, reduced, holdMs, typeMs, deleteMs]);

  if (reduced) return phrases[0];
  return phrases[index % phrases.length].slice(0, length);
}
