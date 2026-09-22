/** Decorative visualization. Pair with an adjacent textual label and value. */
export function Sparkline({ flat = false }: { flat?: boolean }) {
  return <svg className="ds-sparkline" viewBox="0 0 300 44" preserveAspectRatio="none" aria-hidden="true"><line x1="0" y1="36" x2="300" y2="36" /><path d={flat ? 'M0 36 H300' : 'M0 36 H38 L50 6 L62 36 H104 L116 6 L128 36 H170 L182 6 L194 36 H300'} /></svg>;
}
