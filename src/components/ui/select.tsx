import type { ComponentProps } from 'react';
import { Select as Primitive } from 'radix-ui';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
export const Select = Primitive.Root;
export const SelectValue = Primitive.Value;
export const SelectGroup = Primitive.Group;
export function SelectTrigger({ className, children, ...props }: ComponentProps<typeof Primitive.Trigger>) { return <Primitive.Trigger className={cn('ds-select-trigger', className)} {...props}>{children}<Primitive.Icon><ChevronDown aria-hidden="true" /></Primitive.Icon></Primitive.Trigger>; }
export function SelectContent({ className, children, position = 'popper', sideOffset = 6, ...props }: ComponentProps<typeof Primitive.Content>) { return <Primitive.Portal><Primitive.Content className={cn('ds-select-content ds-menu', className)} position={position} sideOffset={sideOffset} {...props}><Primitive.ScrollUpButton className="ds-select-scroll"><ChevronUp /></Primitive.ScrollUpButton><Primitive.Viewport>{children}</Primitive.Viewport><Primitive.ScrollDownButton className="ds-select-scroll"><ChevronDown /></Primitive.ScrollDownButton></Primitive.Content></Primitive.Portal>; }
export function SelectItem({ className, children, ...props }: ComponentProps<typeof Primitive.Item>) { return <Primitive.Item className={cn('ds-menu-item ds-menu-check', className)} {...props}><Primitive.ItemIndicator className="ds-menu-indicator"><Check aria-hidden="true" /></Primitive.ItemIndicator><Primitive.ItemText>{children}</Primitive.ItemText></Primitive.Item>; }
export function SelectLabel({ className, ...props }: ComponentProps<typeof Primitive.Label>) { return <Primitive.Label className={cn('ds-menu-label', className)} {...props} />; }
