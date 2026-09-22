import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';
import { DialogContent } from './dialog';
export { Dialog as Sheet, DialogTrigger as SheetTrigger, DialogClose as SheetClose, DialogTitle as SheetTitle, DialogDescription as SheetDescription, DialogHeader as SheetHeader, DialogFooter as SheetFooter } from './dialog';
export function SheetContent({ className, side = 'right', ...props }: ComponentProps<typeof DialogContent> & { side?: 'left' | 'right' }) { return <DialogContent className={cn('ds-sheet', `ds-sheet--${side}`, className)} {...props} />; }
