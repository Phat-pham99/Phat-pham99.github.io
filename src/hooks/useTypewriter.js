import { useEffect, useState, useMemo } from 'react';

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

function getGraphemes(str) {
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    return Array.from(new Intl.Segmenter('en', { granularity: 'grapheme' }).segment(str)).map((s) => s.segment);
  }
  return [...str];
}

export default function useTypewriter(phrases, { typeMs = 60, deleteMs = 35, holdMs = 1600 } = {}) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // Pre-split all phrases into grapheme clusters so indexing is emoji-safe
  const graphemeLists = useMemo(() => phrases.map(getGraphemes), [phrases]);

  useEffect(() => {
    if (reduced) return;
    const current = graphemeLists[index % graphemeLists.length];

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
  }, [length, deleting, index, graphemeLists, phrases, reduced, holdMs, typeMs, deleteMs]);

  if (reduced) return phrases[0];
  const current = graphemeLists[index % graphemeLists.length];
  return current.slice(0, length).join('');
}
