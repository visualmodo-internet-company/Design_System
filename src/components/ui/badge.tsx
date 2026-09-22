import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';
export type BadgeVariant = 'default' | 'outline' | 'info' | 'success' | 'warning' | 'destructive';
export function Badge({ className, variant = 'default', ...props }: ComponentProps<'span'> & { variant?: BadgeVariant }) {
  return <span className={cn('ds-badge', `ds-badge--${variant}`, className)} {...props} />;
}
