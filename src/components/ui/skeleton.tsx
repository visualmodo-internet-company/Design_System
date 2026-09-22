import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';
/** Decorative only. Put aria-busy and one status message on the containing region. */
export function Skeleton({ className, ...props }: ComponentProps<'div'>) { return <div aria-hidden="true" className={cn('ds-skeleton', className)} {...props} />; }
