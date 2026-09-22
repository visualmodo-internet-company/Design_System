import { Contrast, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import type { Theme } from '@/lib/theme-context';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/components/ui/dropdown-menu';
export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const Icon = theme === 'dark' ? Moon : theme === 'light' ? Sun : Contrast;
  return <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon-sm" aria-label="Change theme"><Icon aria-hidden="true" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuLabel>Appearance</DropdownMenuLabel><DropdownMenuRadioGroup value={theme} onValueChange={(value) => setTheme(value as Theme)}><DropdownMenuRadioItem value="light"><Sun />Light</DropdownMenuRadioItem><DropdownMenuRadioItem value="dark"><Moon />Dark</DropdownMenuRadioItem><DropdownMenuRadioItem value="system"><Contrast />System</DropdownMenuRadioItem></DropdownMenuRadioGroup></DropdownMenuContent></DropdownMenu>;
}
