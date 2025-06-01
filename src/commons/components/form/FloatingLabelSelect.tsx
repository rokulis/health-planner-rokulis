'use client';

import * as React from 'react';

import { Label } from '@/commons/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/commons/components/ui/select';
import { cn } from '@/lib/utils';

interface FloatingLabelSelectProps
  extends React.ComponentPropsWithoutRef<typeof Select> {
  label: string;
  options: { value: string; label: string }[];
  onChange?: (value: string) => void;
}

export function FloatingLabelSelect({
  label,
  options,
  ...props
}: FloatingLabelSelectProps) {
  const [hasValue, setHasValue] = React.useState(
    !!props.value || !!props.defaultValue
  );
  const id = React.useId();
  const displayValue =
    options?.find(
      o => String(o.value).toLowerCase() === String(props.value).toLowerCase()
    )?.label || '';

  const handleValueChange = (value: string) => {
    setHasValue(!!value);
    if (props.onChange) {
      props.onChange(value);
    }
    if (props.onValueChange) {
      props.onValueChange(value);
    }
  };

  return (
    <div className={cn('relative w-full')}>
      <Label
        htmlFor={`${id}-${props.name}`}
        className={cn(
          'absolute left-3 transition-all duration-200 pointer-events-none text-muted-foreground',
          hasValue
            ? 'text-xs left-3 top-2'
            : 'top-1/2 -translate-y-1/2 text-sm text-muted-foreground'
        )}
      >
        {label}
      </Label>
      <Select
        {...props}
        onValueChange={handleValueChange}
        value={props.value}
        defaultValue={props.defaultValue}
      >
        <SelectTrigger
          id={`${id}-${props.name}`}
          className={cn(
            'pt-3 pb-1',
            hasValue ? 'text-foreground' : 'text-transparent'
          )}
        >
          <SelectValue>{displayValue || 'Select an option'}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options?.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
