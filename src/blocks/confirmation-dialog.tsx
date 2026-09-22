import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
export interface ConfirmationDialogProps { open: boolean; onOpenChange: (open: boolean) => void; title: string; description: string; confirmLabel: string; onConfirm: () => void; destructive?: boolean; loading?: boolean }
export function ConfirmationDialog({ open, onOpenChange, title, description, confirmLabel, onConfirm, destructive = false, loading = false }: ConfirmationDialogProps) {
  const returnFocus = useRef<HTMLElement | null>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent onCloseAutoFocus={(event) => { const target = returnFocus.current; if (target?.isConnected && target !== document.body && target.getClientRects().length) { event.preventDefault(); target.focus(); } }} onOpenAutoFocus={(event) => { returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null; if (destructive) { event.preventDefault(); cancelRef.current?.focus(); } }}><DialogHeader><DialogTitle>{title}</DialogTitle><DialogDescription>{description}</DialogDescription></DialogHeader><DialogFooter><DialogClose asChild><Button ref={cancelRef} variant="outline" disabled={loading}>Cancel</Button></DialogClose><Button variant={destructive ? 'destructive' : 'default'} loading={loading} onClick={onConfirm}>{confirmLabel}</Button></DialogFooter></DialogContent></Dialog>;
}
