import type { ComponentProps } from 'react';
import { DropdownMenu as Primitive } from 'radix-ui';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export const DropdownMenu = Primitive.Root;
export const DropdownMenuTrigger = Primitive.Trigger;
export const DropdownMenuGroup = Primitive.Group;
export const DropdownMenuRadioGroup = Primitive.RadioGroup;

export function DropdownMenuContent({
  className,
  sideOffset = 6,
  ...props
}: ComponentProps<typeof Primitive.Content>) {
  return (
    <Primitive.Portal>
      <Primitive.Content className={cn('ds-menu', className)} sideOffset={sideOffset} {...props} />
    </Primitive.Portal>
  );
}

export function DropdownMenuItem({
  className,
  destructive,
  ...props
}: ComponentProps<typeof Primitive.Item> & { destructive?: boolean }) {
  return <Primitive.Item className={cn('ds-menu-item', destructive && 'ds-danger', className)} {...props} />;
}

export function DropdownMenuCheckboxItem({
  className,
  children,
  ...props
}: ComponentProps<typeof Primitive.CheckboxItem>) {
  return (
    <Primitive.CheckboxItem className={cn('ds-menu-item ds-menu-choice', className)} {...props}>
      <span className="ds-menu-item-content">{children}</span>
      <span className="ds-menu-selection" aria-hidden="true">
        <Primitive.ItemIndicator>
          <Check />
        </Primitive.ItemIndicator>
      </span>
    </Primitive.CheckboxItem>
  );
}

export function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: ComponentProps<typeof Primitive.RadioItem>) {
  return (
    <Primitive.RadioItem className={cn('ds-menu-item ds-menu-choice', className)} {...props}>
      <span className="ds-menu-item-content">{children}</span>
      <span className="ds-menu-selection" aria-hidden="true">
        <Primitive.ItemIndicator>
          <Check />
        </Primitive.ItemIndicator>
      </span>
    </Primitive.RadioItem>
  );
}

export function DropdownMenuLabel({
  className,
  ...props
}: ComponentProps<typeof Primitive.Label>) {
  return <Primitive.Label className={cn('ds-menu-label', className)} {...props} />;
}

export function DropdownMenuSeparator({
  className,
  ...props
}: ComponentProps<typeof Primitive.Separator>) {
  return <Primitive.Separator className={cn('ds-menu-separator', className)} {...props} />;
}
