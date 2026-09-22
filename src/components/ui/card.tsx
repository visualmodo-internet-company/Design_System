import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';
export function Card({ className, ...props }: ComponentProps<'div'>) { return <div data-slot="card" className={cn('ds-card', className)} {...props} />; }
export function CardHeader({ className, ...props }: ComponentProps<'div'>) { return <div className={cn('ds-card-header', className)} {...props} />; }
export function CardTitle({ className, ...props }: ComponentProps<'h2'>) { return <h2 className={cn('ds-card-title', className)} {...props} />; }
export function CardDescription({ className, ...props }: ComponentProps<'p'>) { return <p className={cn('ds-muted', className)} {...props} />; }
export function CardContent({ className, ...props }: ComponentProps<'div'>) { return <div className={cn('ds-card-content', className)} {...props} />; }
export function CardFooter({ className, ...props }: ComponentProps<'div'>) { return <div className={cn('ds-card-footer', className)} {...props} />; }
