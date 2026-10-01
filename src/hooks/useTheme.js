import { useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'portfolio-theme';

function storedPreference() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : null;
  } catch {
    return null;
  }
}

export default function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark');
  const preference = useRef(null);

  useEffect(() => {
    const system = window.matchMedia('(prefers-color-scheme: dark)');
    preference.current = storedPreference();
    const update = () => setTheme(preference.current ?? (system.matches ? 'dark' : 'light'));
    const syncStorage = (event) => {
      if (event.key !== STORAGE_KEY && event.key !== null) return;
      preference.current = storedPreference();
      update();
    };
    update();
    system.addEventListener('change', update);
    window.addEventListener('storage', syncStorage);
    return () => {
      system.removeEventListener('change', update);
      window.removeEventListener('storage', syncStorage);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#f7f7f8');
  }, [theme]);

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    preference.current = nextTheme;
    setTheme(nextTheme);
    try {
      localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      return;
    }
  }

  return { theme, toggleTheme };
}
