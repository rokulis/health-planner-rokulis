'use client';

import * as React from 'react';

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import * as SelectPrimitive from '@radix-ui/react-select';

import { cn } from '@/lib/utils';

interface FloatingLabelProps {
  label: string;
  className?: string;
  triggerClassName?: string;
  children: React.ReactNode;
  onChange?: (e: { target: { name?: string; value: string } }) => void
}

const FloatingLabelSelect = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> &
    FloatingLabelProps
>(({ label, className, triggerClassName, children, ...props }, ref) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [isFilled, setIsFilled] = React.useState(false);

  // Update internal state when external value changes
  React.useEffect(() => {
    setIsFilled(!!props.value);
  }, [props.value]);

  // Handle value change
  const handleValueChange = (value: string) => {
    setIsFilled(!!value);

    if (props.onChange) {
      props.onChange({
        target: {
          name: props.name,
          value,
        },
      });
    }

    // Call the parent's onValueChange if provided
    if (props.onValueChange) {
      props.onValueChange(value);
    }
  };

  return (
    <SelectPrimitive.Root
      {...props}
      value={props.value}
      onValueChange={handleValueChange}
      onOpenChange={open => {
        setIsFocused(open);
        if (!open) {
          // When closing, ensure we update the filled state based on the current value
          setIsFilled(!!props.value);
        }
        if (props.onOpenChange) {
          props.onOpenChange(open);
        }
      }}
    >
      <div className={cn('relative w-full', className)}>
        <SelectPrimitive.Trigger
          ref={ref}
          className={cn(
            'flex h-14 w-full items-center justify-between rounded-md bg-background-secondary px-3 pt-4 pb-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            isFocused && 'border-primary',
            triggerClassName
          )}
        >
          <SelectPrimitive.Value />
          <SelectPrimitive.Icon asChild={true}>
            <CaretSortIcon className="h-4 w-4 opacity-50" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <label
          className={cn(
            'absolute text-muted-foreground transition-all duration-200 pointer-events-none',
            {
              'text-xs left-3 top-2': isFilled || isFocused,
              'text-base text-black/60 left-3 top-1/2 -translate-y-1/2':
                !isFilled && !isFocused,
            }
          )}
        >
          {label}
        </label>
      </div>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className={cn(
            'bg-white shadow-md text-black data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md',
            ' w-[var(--radix-select-trigger-width)]',
            className
          )}
          position="popper"
          sideOffset={5}
        >
          <SelectPrimitive.Viewport className="p-1">
            {children}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
});
FloatingLabelSelect.displayName = 'FloatingLabelSelect';

const FloatingLabelSelectItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    data-slot="select-item"
    className={cn(
      "focus:bg-primary/10 focus:text-black [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
      className
    )}
    {...props}
  >
    <span className="absolute right-2 flex size-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="size-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
FloatingLabelSelectItem.displayName = 'FloatingLabelSelectItem';

export { FloatingLabelSelect, FloatingLabelSelectItem };
