/** Storage is optional: embedded, privacy-mode and SSR consumers must still work. */
export function readPreference(key: string, fallback: string): string {
  try { return globalThis.localStorage?.getItem(key) ?? fallback; } catch { return fallback; }
}
export function writePreference(key: string, value: string): void {
  try { globalThis.localStorage?.setItem(key, value); } catch { /* Persistence is best-effort. */ }
}
