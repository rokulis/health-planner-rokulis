import React from 'react';

import { Control, FieldValues, FieldPath } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/commons/components/ui/form';

interface Props<D extends FieldValues> {
  control: Control<D>;
  label?: string;
  name: FieldPath<D>;
  children: React.ReactElement;
}

export function FieldWrapper<D extends FieldValues>({
  control,
  label,
  name,
  children,
}: Props<D>) {
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
