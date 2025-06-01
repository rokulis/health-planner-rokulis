import React from 'react';

import { Control, FieldValues, FieldPath } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/commons/components/ui/form';

interface Props<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
> {
  control: Control<TFieldValues, TContext, any>;
  label?: string;
  name: FieldPath<TFieldValues>;
  children: React.ReactElement;
}

export function FieldWrapper<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
>({ control, label, name, children }: Props<TFieldValues, TContext>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col w-full justify-start items-start">
          {label ? <FormLabel className="text-sm">{label}</FormLabel> : null}
          <FormControl>
            {React.cloneElement(children, {
              ...field,
            })}
          </FormControl>
          <FormMessage className="text-xs text-danger" />
        </FormItem>
      )}
    />
  );
}
