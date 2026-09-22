import type { ComponentProps } from 'react';
import { Checkbox as Primitive } from 'radix-ui';
import { Check, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
export function Checkbox({ className, checked, ...props }: ComponentProps<typeof Primitive.Root>) {
  return <Primitive.Root className={cn('ds-checkbox', className)} checked={checked} {...props}><Primitive.Indicator>{checked === 'indeterminate' ? <Minus aria-hidden="true" /> : <Check aria-hidden="true" />}</Primitive.Indicator></Primitive.Root>;
}
