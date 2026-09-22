import type { ComponentProps } from 'react';
import { Separator as Primitive } from 'radix-ui';
import { cn } from '@/lib/utils';
export function Separator({ className, orientation = 'horizontal', decorative = true, ...props }: ComponentProps<typeof Primitive.Root>) { return <Primitive.Root className={cn('ds-separator', className)} orientation={orientation} decorative={decorative} {...props} />; }
