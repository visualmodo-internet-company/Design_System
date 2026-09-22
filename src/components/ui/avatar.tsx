import type { ComponentProps } from 'react';
import { Avatar as Primitive } from 'radix-ui';
import { cn } from '@/lib/utils';
export function Avatar({ className, ...props }: ComponentProps<typeof Primitive.Root>) { return <Primitive.Root className={cn('ds-avatar', className)} {...props} />; }
export function AvatarImage({ className, ...props }: ComponentProps<typeof Primitive.Image>) { return <Primitive.Image className={cn('ds-avatar-image', className)} {...props} />; }
export function AvatarFallback({ className, ...props }: ComponentProps<typeof Primitive.Fallback>) { return <Primitive.Fallback className={cn('ds-avatar-fallback', className)} {...props} />; }
