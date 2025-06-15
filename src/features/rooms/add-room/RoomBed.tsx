'use client';

import cx from 'classnames';
import { X } from 'lucide-react';
import { useController, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/commons/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/commons/components/ui/card';
import { Input } from '@/commons/components/ui/input';
import { Label } from '@/commons/components/ui/label';
import { roomSchema } from '@/features/rooms/add-room/validations';
import { StoreRoomRequestCategoryEnum } from '@/types/swagger/data-contracts';

interface SpotCardProps {
  index: number;
  form: UseFormReturn<z.infer<typeof roomSchema>>;
  onRemove: () => void;
}

export function RoomBed({ index, form, onRemove }: SpotCardProps) {
  const { field: nameField, fieldState: nameFieldState } = useController({
    name: `beds.${index}.name`,
    control: form.control,
  });

  const { field: categoryField } = useController({
    name: `beds.${index}.category`,
    control: form.control,
  });

  return (
    <Card className="rounded-2xl bg-primary/5 p-2">
      <CardHeader className="px-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-gray-900">
            Add spot
          </CardTitle>
          <Button type="button" variant="ghost" size="sm" onClick={onRemove}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 px-2">
        <div className="space-y-2">
          <Label className="text-base font-medium text-gray-700">
            Seats / Beds
          </Label>
          <Input
            {...nameField}
            placeholder="Bed A-"
            className="border-2 border-purple-300 rounded-xl px-4 py-3 text-base focus:border-purple-500 focus:ring-purple-500 bg-white"
          />
          {nameFieldState.error && (
            <p className="text-sm text-red-500">
              {nameFieldState.error.message}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {Object.keys(StoreRoomRequestCategoryEnum).map(key => {
              const isSelected =
                categoryField.value ===
                StoreRoomRequestCategoryEnum[
                  key as keyof typeof StoreRoomRequestCategoryEnum
                ];

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() =>
                    categoryField.onChange(
                      StoreRoomRequestCategoryEnum[
                        key as keyof typeof StoreRoomRequestCategoryEnum
                      ]
                    )
                  }
                  className={cx(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
                    {
                      'bg-purple-500 text-white': isSelected,
                      'bg-gray-100 text-gray-700 hover:bg-gray-200':
                        !isSelected,
                    }
                  )}
                >
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </button>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
