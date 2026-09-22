import type { ComponentProps } from 'react';
import { Tabs as Primitive } from 'radix-ui';
import { cn } from '@/lib/utils';
export const Tabs = Primitive.Root;
export function TabsList({ className, ...props }: ComponentProps<typeof Primitive.List>) { return <Primitive.List className={cn('ds-tabs-list', className)} {...props} />; }
export function TabsTrigger({ className, ...props }: ComponentProps<typeof Primitive.Trigger>) { return <Primitive.Trigger className={cn('ds-tabs-trigger', className)} {...props} />; }
export function TabsContent({ className, ...props }: ComponentProps<typeof Primitive.Content>) { return <Primitive.Content className={cn('ds-tabs-content', className)} {...props} />; }
