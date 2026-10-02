import { useCallback, useEffect, useState } from 'react';
import { pickLocalMeme } from '../data/memes.js';

const API = 'https://api.apileague.com/retrieve-random-meme';
const API_KEY = import.meta.env?.VITE_MEME_API_KEY || 'ecee296f96344544bd6ad8bdf059f51d';

export async function fetchMeme({ keywords = 'coding', signal } = {}) {
  const url = new URL(API);
  url.searchParams.set('keywords', keywords);
  url.searchParams.set('api-key', API_KEY);
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`Meme API unavailable (HTTP ${response.status}).`);
  const raw = await response.json();
  if (typeof raw?.url !== 'string' || !raw.url) throw new Error('Invalid meme API response.');
  return {
    url: raw.url,
    width: Number(raw.width) || undefined,
    height: Number(raw.height) || undefined,
  };
}

export default function useMeme() {
  const [state, setState] = useState({ status: 'loading', meme: null, source: 'api' });

  const useLocal = useCallback(() => {
    setState((current) => (current.source === 'fallback' ? current : { status: 'ready', meme: pickLocalMeme(), source: 'fallback' }));
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchMeme({ signal: controller.signal })
      .then((meme) => {
        if (!controller.signal.aborted) setState({ status: 'ready', meme: { ...meme, alt: 'Random coding meme fetched from the meme API.' }, source: 'api' });
      })
      .catch(() => {
        if (!controller.signal.aborted) setState({ status: 'ready', meme: pickLocalMeme(), source: 'fallback' });
      });

    return () => controller.abort();
  }, []);

  return { ...state, useLocal };
}
