import type { ComponentProps } from 'react';
import { Info, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
export function Alert({ className, variant = 'default', children, ...props }: ComponentProps<'div'> & { variant?: 'default' | 'destructive' }) {
  const Icon = variant === 'destructive' ? AlertCircle : Info;
  return <div role={variant === 'destructive' ? 'alert' : 'status'} className={cn('ds-alert', `ds-alert--${variant}`, className)} {...props}><Icon aria-hidden="true" /> <div>{children}</div></div>;
}
export function AlertTitle(props: ComponentProps<'h3'>) { return <h3 className="ds-label" {...props} />; }
export function AlertDescription(props: ComponentProps<'p'>) { return <p className="ds-muted" {...props} />; }
