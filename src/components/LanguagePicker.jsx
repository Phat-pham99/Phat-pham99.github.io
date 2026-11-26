import { useEffect, useId, useRef, useState } from 'react';
import { LOCALES } from '../i18n/messages.js';
import { useI18n } from '../i18n/I18nContext.jsx';
import Flag from './Flag.jsx';

const NAV_KEYS = {
  ArrowDown: (i, last) => (i === last ? 0 : i + 1),
  ArrowUp: (i, last) => (i === 0 ? last : i - 1),
  Home: () => 0,
  End: (_, last) => last,
};

export default function LanguagePicker() {
  const { lang, t, setLanguage } = useI18n();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const menuId = useId();
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const itemRefs = useRef([]);
  const current = LOCALES.find((locale) => locale.code === lang);
  const preview = LOCALES[active];

  useEffect(() => {
    if (open) itemRefs.current[active]?.focus();
  }, [open, active]);

  useEffect(() => {
    if (!open) return;
    const closeOnOutside = (event) => {
      if (!rootRef.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', closeOnOutside);
    return () => document.removeEventListener('pointerdown', closeOnOutside);
  }, [open]);

  function openMenu() {
    setActive(LOCALES.findIndex((locale) => locale.code === lang));
    setOpen(true);
  }

  function closeMenu() {
    setOpen(false);
    buttonRef.current?.focus();
  }

  function choose(code) {
    setLanguage(code);
    closeMenu();
  }

  function onMenuKeyDown(event) {
    if (Object.hasOwn(NAV_KEYS, event.key)) {
      event.preventDefault();
      setActive((i) => NAV_KEYS[event.key](i, LOCALES.length - 1));
    } else if (event.key === 'Escape') {
      event.preventDefault();
      closeMenu();
    } else if (event.key === 'Tab') {
      setOpen(false);
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={`${t.nav.language}: ${current.name}`}
        title={`${t.nav.language}: ${current.name}`}
        onClick={() => (open ? closeMenu() : openMenu())}
        onKeyDown={(event) => {
          if (!open && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
            event.preventDefault();
            openMenu();
          }
        }}
        className={`inline-flex h-11 items-center gap-1.5 border-l border-zinc-800 px-3 font-mono text-xs transition-colors hover:text-brand focus-visible:outline focus-visible:outline-1 focus-visible:outline-brand ${
          open ? 'bg-zinc-900 text-brand' : 'text-zinc-500'
        }`}
      >
        <Flag country={current.country} className="h-3 w-[18px]" />
        <span>{lang}</span>
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          aria-label={t.nav.language}
          onKeyDown={onMenuKeyDown}
          className="fixed inset-x-2 top-11 z-50 border border-zinc-700 bg-zinc-950 font-mono text-xs shadow-xl shadow-black/40 sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:w-64"
        >
          <div className="border-b border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-zinc-500" aria-hidden="true">
            <span className="text-brand">$</span> locale -a
          </div>
          <ul role="none" className="py-1">
            {LOCALES.map((locale, i) => {
              const selected = locale.code === lang;
              const focused = i === active;
              return (
                <li key={locale.code} role="none">
                  <button
                    ref={(el) => {
                      itemRefs.current[i] = el;
                    }}
                    type="button"
                    role="menuitemradio"
                    aria-checked={selected}
                    aria-label={locale.name}
                    lang={locale.code}
                    tabIndex={focused ? 0 : -1}
                    onClick={() => choose(locale.code)}
                    onMouseEnter={() => setActive(i)}
                    className={`flex w-full items-center gap-2 px-3 py-2 text-left outline-none transition-colors ${
                      focused ? 'bg-brand/10 text-brand' : 'text-zinc-400'
                    }`}
                  >
                    <span className="w-2 shrink-0" aria-hidden="true">{focused ? '▸' : ''}</span>
                    <Flag country={locale.country} className="h-3.5 w-[21px]" />
                    <span className="min-w-0 flex-1 truncate" aria-hidden="true">{locale.name}</span>
                    <span className="shrink-0 text-zinc-500" aria-hidden="true">{locale.greeting}</span>
                    <span className={selected ? 'text-btop-mem' : 'text-zinc-700'} aria-hidden="true">
                      {selected ? '●' : '○'}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="border-t border-zinc-800 bg-zinc-900/40 px-3 py-1.5 text-zinc-500" aria-hidden="true">
            export LANG=<span className="text-btop-cpu">{preview.locale}.UTF-8</span>
            <span className="cursor-blink text-brand">█</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
