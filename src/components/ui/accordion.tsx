import type { ComponentProps } from 'react';
import { Accordion as Primitive } from 'radix-ui';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
export const Accordion = Primitive.Root;
export function AccordionItem({ className, ...props }: ComponentProps<typeof Primitive.Item>) { return <Primitive.Item className={cn('ds-accordion-item', className)} {...props} />; }
export function AccordionTrigger({ className, children, ...props }: ComponentProps<typeof Primitive.Trigger>) { return <Primitive.Header><Primitive.Trigger className={cn('ds-accordion-trigger', className)} {...props}>{children}<ChevronDown aria-hidden="true" /></Primitive.Trigger></Primitive.Header>; }
export function AccordionContent({ className, children, ...props }: ComponentProps<typeof Primitive.Content>) { return <Primitive.Content className={cn('ds-accordion-content', className)} {...props}><div className="ds-pad">{children}</div></Primitive.Content>; }
