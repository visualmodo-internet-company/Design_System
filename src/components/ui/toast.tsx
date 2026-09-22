import type { ComponentProps } from 'react';
import { Toast as Primitive } from 'radix-ui';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';
export const ToastProvider = Primitive.Provider;
export const ToastTitle = Primitive.Title;
export const ToastDescription = Primitive.Description;
export function ToastViewport({ className, ...props }: ComponentProps<typeof Primitive.Viewport>) { return <Primitive.Viewport className={cn('ds-toast-viewport', className)} {...props} />; }
export function Toast({ className, children, ...props }: ComponentProps<typeof Primitive.Root>) { return <Primitive.Root className={cn('ds-toast', className)} {...props}><div>{children}</div><Primitive.Close asChild><Button variant="ghost" size="icon-sm" aria-label="Dismiss notification"><X aria-hidden="true" /></Button></Primitive.Close></Primitive.Root>; }
