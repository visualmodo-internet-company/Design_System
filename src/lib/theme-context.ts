import { createContext } from 'react';
export type Theme = 'dark' | 'light' | 'system';
export const ThemeContext = createContext<{ theme: Theme; setTheme: (theme: Theme) => void } | null>(null);
