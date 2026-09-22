import type { ComponentProps } from 'react';
import { Progress as Primitive } from 'radix-ui';
import { cn } from '@/lib/utils';
export function Progress({ className, value = 0, max = 100, ...props }: ComponentProps<typeof Primitive.Root>) {
  const maximum = Number.isFinite(max) && max > 0 ? max : 100;
  const safe = value === null ? null : Number.isFinite(value) ? Math.min(maximum, Math.max(0, value)) : 0;
  const percentage = safe === null ? 30 : safe / maximum * 100;
  return <Primitive.Root {...props} className={cn('ds-progress', className)} value={safe} max={maximum}><Primitive.Indicator className="ds-progress-indicator" style={{ transform: `translateX(-${100 - percentage}%)` }} /></Primitive.Root>;
}
