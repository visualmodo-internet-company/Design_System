import type { ComponentProps } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from './button';
export function Pagination(props: ComponentProps<'nav'>) { return <nav aria-label="Pagination" {...props} />; }
export function PaginationContent({ className, ...props }: ComponentProps<'ul'>) { return <ul className={cn('ds-pagination', className)} {...props} />; }
export function PaginationItem(props: ComponentProps<'li'>) { return <li {...props} />; }
export function PaginationLink({ isActive, className, ...props }: ComponentProps<'a'> & { isActive?: boolean }) { return <a aria-current={isActive ? 'page' : undefined} className={cn(buttonVariants({ variant: isActive ? 'outline' : 'ghost', size: 'icon-sm' }), className)} {...props} />; }
export function PaginationPrevious(props: ComponentProps<'a'>) { return <a className={buttonVariants({ variant: 'ghost', size: 'sm' })} aria-label="Previous page" {...props}><ChevronLeft aria-hidden="true" />Previous</a>; }
export function PaginationNext(props: ComponentProps<'a'>) { return <a className={buttonVariants({ variant: 'ghost', size: 'sm' })} aria-label="Next page" {...props}>Next<ChevronRight aria-hidden="true" /></a>; }
