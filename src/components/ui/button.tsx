import type { ComponentProps, MouseEvent } from 'react';
import { Slot } from 'radix-ui';
import { LoaderCircle } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/** Adapted from the shadcn/ui Slot + CVA API. Visual tokens belong to this system. */
export const buttonVariants = cva('ds-button', {
  variants: {
    variant: { default: 'ds-button--primary', secondary: 'ds-button--secondary', outline: 'ds-button--outline', ghost: 'ds-button--ghost', destructive: 'ds-button--destructive', link: 'ds-button--link' },
    size: { default: 'ds-button--md', sm: 'ds-button--sm', lg: 'ds-button--lg', icon: 'ds-button--icon', 'icon-sm': 'ds-button--icon-sm' },
  }, defaultVariants: { variant: 'default', size: 'default' },
});
export type ButtonProps = ComponentProps<'button'> & VariantProps<typeof buttonVariants> & { asChild?: boolean; loading?: boolean };
export function Button({ className, variant, size, asChild = false, loading = false, disabled, children, onClick, type = 'button', ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);
  if (asChild) return <Slot.Root {...props} className={classes} tabIndex={disabled || loading ? -1 : props.tabIndex} aria-disabled={disabled || loading || undefined} aria-busy={loading || undefined} onClick={(event) => { if (disabled || loading) { event.preventDefault(); return; } onClick?.(event as MouseEvent<HTMLButtonElement>); }}>{children}</Slot.Root>;
  return <button {...props} type={type} className={classes} disabled={disabled || loading} aria-busy={loading || undefined} onClick={onClick}>
    {loading && <LoaderCircle aria-hidden="true" className="ds-spin" />}{children}
  </button>;
}
