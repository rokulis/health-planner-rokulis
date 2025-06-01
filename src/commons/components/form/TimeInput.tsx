'use client';
import React from 'react';

import { FloatingLabelInput } from '@/commons/components/form/FloatingLabelInput';

interface TimeInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange'
  > {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function TimeInput({
  value = '',
  onChange,
  className,
  ...props
}: TimeInputProps) {
  const [displayValue, setDisplayValue] = React.useState(value);

  React.useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  const formatTime = (input: string): string => {
    // Remove all non-digits
    const digits = input.replace(/\D/g, '');

    if (digits.length === 0) return '';
    if (digits.length === 1) return digits;
    if (digits.length === 2) return digits;
    if (digits.length === 3) return `${digits.slice(0, 2)}:${digits.slice(2)}`;
    if (digits.length >= 4)
      return `${digits.slice(0, 2)}:${digits.slice(2, 4)}`;

    return digits;
  };

  const validateTime = (time: string): boolean => {
    if (!time.includes(':')) return true; // Allow partial input

    const [hours, minutes] = time.split(':');
    const h = Number.parseInt(hours, 10);
    const m = Number.parseInt(minutes, 10);

    return h >= 0 && h <= 23 && m >= 0 && m <= 59;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const formatted = formatTime(input);

    if (validateTime(formatted)) {
      setDisplayValue(formatted);
      onChange?.(formatted);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow backspace, delete, tab, escape, enter
    if ([8, 9, 27, 13, 46].includes(e.keyCode)) return;

    // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
    if (e.ctrlKey && [65, 67, 86, 88].includes(e.keyCode)) return;

    // Allow arrow keys
    if (e.keyCode >= 35 && e.keyCode <= 40) return;

    // Ensure that it's a number and stop the keypress
    if (
      (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
      (e.keyCode < 96 || e.keyCode > 105)
    ) {
      e.preventDefault();
    }
  };

  return (
    <FloatingLabelInput
      {...props}
      type="text"
      value={displayValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      maxLength={5}
    />
  );
}
