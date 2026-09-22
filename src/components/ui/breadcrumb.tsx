import type { ComponentProps } from 'react';
import { Slot } from 'radix-ui';
import { Slash } from 'lucide-react';
import { cn } from '@/lib/utils';
export function Breadcrumb(props: ComponentProps<'nav'>) { return <nav aria-label="Breadcrumb" {...props} />; }
export function BreadcrumbList({ className, ...props }: ComponentProps<'ol'>) { return <ol className={cn('ds-breadcrumb', className)} {...props} />; }
export function BreadcrumbItem(props: ComponentProps<'li'>) { return <li {...props} />; }
export function BreadcrumbLink({ asChild, ...props }: ComponentProps<'a'> & { asChild?: boolean }) { const Comp = asChild ? Slot.Root : 'a'; return <Comp {...props} />; }
export function BreadcrumbPage(props: ComponentProps<'span'>) { return <span aria-current="page" {...props} />; }
export function BreadcrumbSeparator() { return <li aria-hidden="true" className="ds-breadcrumb-separator"><Slash /></li>; }
