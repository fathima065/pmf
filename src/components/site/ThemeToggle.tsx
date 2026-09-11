import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

type Theme = 'light' | 'dark';

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

function readSavedOrSystemTheme(): Theme {
  const saved = window.localStorage.getItem('fathima-theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const initial = readSavedOrSystemTheme();
    setTheme(initial);
    applyTheme(initial);
  }, []);

  useEffect(() => {
    if (!document.documentElement.dataset.theme) applyTheme(theme);
    window.localStorage.setItem('fathima-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (window.localStorage.getItem('fathima-theme')) return;
    const media = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = (event: MediaQueryListEvent) => setTheme(event.matches ? 'light' : 'dark');
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const nextTheme = theme === 'dark' ? 'light' : 'dark';
  const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  const Icon = theme === 'dark' ? Sun : Moon;

  return (
    <button
      type="button"
      className="theme-toggle hairline"
      aria-label={label}
      title={label}
      onClick={() => setTheme(nextTheme)}
    >
      <span className="theme-toggle-track" aria-hidden="true">
        <span className="theme-toggle-icon"><Icon size={15} strokeWidth={1.8} /></span>
      </span>
      <span className="theme-toggle-label" aria-hidden="true">{theme === 'dark' ? 'Dark' : 'Light'}</span>
    </button>
  );
}
