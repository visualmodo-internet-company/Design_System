import type { ComponentProps } from 'react';
import { RadioGroup as Primitive } from 'radix-ui';
import { cn } from '@/lib/utils';
export function RadioGroup({ className, ...props }: ComponentProps<typeof Primitive.Root>) { return <Primitive.Root className={cn('ds-stack', className)} {...props} />; }
export function RadioGroupItem({ className, ...props }: ComponentProps<typeof Primitive.Item>) { return <Primitive.Item className={cn('ds-radio', className)} {...props}><Primitive.Indicator className="ds-radio-indicator" /></Primitive.Item>; }
