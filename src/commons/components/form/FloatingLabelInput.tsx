'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

export interface FloatingLabelInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const FloatingLabelInput = React.forwardRef<
  HTMLInputElement,
  FloatingLabelInputProps
>(({ className, type, label, ...props }, ref) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [isFilled, setIsFilled] = React.useState(false);

  React.useEffect(() => {
    setIsFilled(!!props.value);
  }, [props.value]);

  return (
    <div className="relative w-full">
      <input
        tabIndex={0}
        type={type}
        className={cn(
          'flex w-full h-14 w-full rounded-md border border-gray bg-background-secondary px-3 pt-4 pb-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-transparent focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          {
            'border-primary': isFocused,
            'border-gray': !isFocused,
          },
          {
            'placeholder:text-sm': isFilled,
            'placeholder:text-xs': !isFilled,
          },
          className
        )}
        ref={ref}
        onChange={e => {
          props.onChange?.(e);
        }}
        {...props}
        onFocus={e => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={e => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
      />
      <label
        className={cn(
          'absolute text-black transition-all duration-200 pointer-events-none',
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
  );
});
FloatingLabelInput.displayName = 'FloatingLabelInput';

export { FloatingLabelInput };
