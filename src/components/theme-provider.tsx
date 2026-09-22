import { useEffect, useState, type ReactNode } from 'react';
import { ThemeContext, type Theme } from '@/lib/theme-context';
import { readPreference, writePreference } from '@/lib/storage';
function storedTheme(): Theme {
  const value = readPreference('design-system.theme', 'dark');
  return value === 'light' || value === 'system' ? value : 'dark';
}
export function ThemeProvider({ children, forcedTheme }: { children: ReactNode; forcedTheme?: Theme }) {
  const [theme, setState] = useState<Theme>(storedTheme);
  const active = forcedTheme ?? theme;
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      const resolved = active === 'system' ? (media.matches ? 'dark' : 'light') : active;
      document.documentElement.dataset.theme = resolved;
      document.documentElement.style.colorScheme = resolved;
    };
    apply(); media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, [active]);
  const setTheme = (next: Theme) => { setState(next); writePreference('design-system.theme', next); };
  return <ThemeContext.Provider value={{ theme: active, setTheme }}>{children}</ThemeContext.Provider>;
}
