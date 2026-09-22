import { useState } from 'react';
import { readPreference, writePreference } from '@/lib/storage';
export function useSidebar(storageKey = 'design-system.sidebar') {
  const [collapsed, setCollapsedState] = useState(() => readPreference(`${storageKey}.collapsed`, 'false') === 'true');
  const [width, setWidthState] = useState(() => {
    const value = Number(readPreference(`${storageKey}.width`, '256'));
    return Number.isFinite(value) ? Math.min(400, Math.max(240, value)) : 256;
  });
  function setWidth(next: number) { if (!Number.isFinite(next)) return; const value = Math.min(400, Math.max(240, next)); setWidthState(value); writePreference(`${storageKey}.width`, String(value)); }
  function setCollapsed(next: boolean) { setCollapsedState(next); writePreference(`${storageKey}.collapsed`, String(next)); }
  return { collapsed, setCollapsed, width, setWidth };
}
