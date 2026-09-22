import type { ComponentProps } from 'react';
import { Dialog as Primitive } from 'radix-ui';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';
export const Dialog = Primitive.Root;
export const DialogTrigger = Primitive.Trigger;
export const DialogClose = Primitive.Close;
export const DialogPortal = Primitive.Portal;
export function DialogOverlay({ className, ...props }: ComponentProps<typeof Primitive.Overlay>) { return <Primitive.Overlay className={cn('ds-overlay', className)} {...props} />; }
export function DialogContent({ className, children, ...props }: ComponentProps<typeof Primitive.Content>) { return <DialogPortal><DialogOverlay /><Primitive.Content className={cn('ds-dialog', className)} {...props}>{children}<DialogClose asChild><Button variant="ghost" size="icon-sm" className="ds-dialog-close" aria-label="Close dialog"><X aria-hidden="true" /></Button></DialogClose></Primitive.Content></DialogPortal>; }
export function DialogHeader({ className, ...props }: ComponentProps<'div'>) { return <div className={cn('ds-dialog-header', className)} {...props} />; }
export function DialogTitle({ className, ...props }: ComponentProps<typeof Primitive.Title>) { return <Primitive.Title className={cn('ds-heading-3', className)} {...props} />; }
export function DialogDescription({ className, ...props }: ComponentProps<typeof Primitive.Description>) { return <Primitive.Description className={cn('ds-muted', className)} {...props} />; }
export function DialogFooter({ className, ...props }: ComponentProps<'div'>) { return <div className={cn('ds-dialog-footer', className)} {...props} />; }
