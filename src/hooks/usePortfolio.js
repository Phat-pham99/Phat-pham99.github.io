import { useEffect, useState } from 'react';

const API = 'https://gitconnected.com/api/v1/portfolio/phat-pham99';

let cache = null;

const LEVEL_MAP = {
  Beginner: 40,
  Intermediate: 65,
  Advanced: 85,
  Expert: 95,
  Master: 100,
};

const FLUENCY_MAP = {
  Native: 100,
  'Native or bilingual': 100,
  Advanced: 85,
  Intermediate: 60,
  Basic: 30,
  Elementary: 15,
};

function cleanProfileUrl(profile) {
  const url = profile.url || '';
  const username = profile.username || '';
  if (url.includes('linkedin.com/in/https://') || url.includes('twitter.com/https://') || url.includes('x.com/https://')) {
    return username.startsWith('http') ? username : url;
  }
  return url || username;
}

function normalizeBasics(b) {
  return {
    name: b.name || '',
    label: b.label || '',
    image: b.image || '',
    email: b.email || '',
    url: b.url || '',
    summary: b.summary || '',
    location: b.location?.city || '',
    profiles: (b.profiles || []).map((p) => ({
      network: p.network || '',
      username: p.username || '',
      url: cleanProfileUrl(p),
    })),
  };
}

function normalizeWork(w) {
  return {
    company: w.name || w.company || '',
    position: w.position || '',
    website: w.url || w.website || '',
    startDate: w.startDate || '',
    endDate: w.endDate || '',
    isCurrentRole: !!w.isCurrentRole,
    location: w.location || '',
    summary: w.summary || '',
  };
}

function normalizeSkill(s) {
  return {
    name: s.name || '',
    level: s.level || '',
    value: LEVEL_MAP[s.level] || (s.rating ? Math.min(100, Math.round((s.rating / 5) * 100)) : 0),
    rating: s.rating || 0,
    keywords: s.keywords || [],
  };
}

function normalizeLanguage(l) {
  return {
    name: l.language || '',
    fluency: l.fluency || '',
    value: FLUENCY_MAP[l.fluency] || 0,
    color: 'mem',
  };
}

function normalizeProject(p) {
  return {
    repo: p.name || '',
    displayName: p.displayName || p.name || '',
    url: p.githubUrl || p.repositoryUrl || p.url || '',
    description: p.summary || p.description || '',
    language: p.primaryLanguage || null,
    languages: p.languages || [],
    tech: p.languages || [],
  };
}

export default function usePortfolio() {
  const [state, setState] = useState(cache ?? { status: 'loading', data: null, live: false });

  useEffect(() => {
    if (cache) return;
    const controller = new AbortController();
    (async () => {
      try {
        const res = await fetch(API, { signal: controller.signal });
        if (!res.ok) throw new Error(`${res.status}`);
        const raw = await res.json();
        const data = {
          basics: normalizeBasics(raw.basics || {}),
          work: (raw.work || []).map(normalizeWork),
          skills: (raw.skills || []).map(normalizeSkill),
          languages: (raw.languages || []).map(normalizeLanguage),
          projects: (raw.projects || []).map(normalizeProject),
        };
        cache = { status: 'ready', data, live: true };
        setState(cache);
      } catch (err) {
        if (err.name === 'AbortError') return;
        cache = { status: 'error', data: null, live: false };
        setState(cache);
      }
    })();
    return () => controller.abort();
  }, []);

  return state;
}
