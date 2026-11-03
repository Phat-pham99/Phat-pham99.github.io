import { useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'portfolio-theme';
const PALETTE_KEY = 'portfolio-palette';
const DEFAULT_PALETTE = 'btop';

export const PALETTES = [
  { id: 'btop', label: 'btop' },
  { id: 'monokai', label: 'Monokai' },
  { id: 'gruvbox', label: 'Gruvbox' },
  { id: 'ayu', label: 'Ayu' },
  { id: 'github', label: 'GitHub' },
  { id: 'green', label: 'Green' },
  { id: 'pink', label: 'Pink' },
];

function readStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    return;
  }
}

function storedPreference() {
  const stored = readStorage(STORAGE_KEY);
  return stored === 'light' || stored === 'dark' ? stored : null;
}

function storedPalette() {
  const stored = readStorage(PALETTE_KEY);
  return PALETTES.some((palette) => palette.id === stored) ? stored : DEFAULT_PALETTE;
}

export default function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark');
  const [palette, setPaletteState] = useState(() => document.documentElement.dataset.palette || DEFAULT_PALETTE);
  const preference = useRef(null);

  useEffect(() => {
    const system = window.matchMedia('(prefers-color-scheme: dark)');
    preference.current = storedPreference();
    const update = () => setTheme(preference.current ?? (system.matches ? 'dark' : 'light'));
    const syncStorage = (event) => {
      if (event.key === PALETTE_KEY || event.key === null) setPaletteState(storedPalette());
      if (event.key !== STORAGE_KEY && event.key !== null) return;
      preference.current = storedPreference();
      update();
    };
    update();
    setPaletteState(storedPalette());
    system.addEventListener('change', update);
    window.addEventListener('storage', syncStorage);
    return () => {
      system.removeEventListener('change', update);
      window.removeEventListener('storage', syncStorage);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.dataset.palette = palette;
    root.classList.toggle('dark', theme === 'dark');
    const background = getComputedStyle(root).getPropertyValue('--color-bg').trim();
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', `rgb(${background})`);
  }, [theme, palette]);

  function selectTheme(nextPalette, nextTheme) {
    preference.current = nextTheme;
    setTheme(nextTheme);
    setPaletteState(nextPalette);
    writeStorage(STORAGE_KEY, nextTheme);
    writeStorage(PALETTE_KEY, nextPalette);
  }

  return { theme, palette, selectTheme };
}
