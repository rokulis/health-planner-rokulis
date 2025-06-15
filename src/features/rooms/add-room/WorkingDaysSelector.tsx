'use client';

import cx from 'classnames';
import { useController, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { Checkbox } from '@/commons/components/ui/checkbox';
import { Label } from '@/commons/components/ui/label';
import { roomSchema } from '@/features/rooms/add-room/validations';
import { RoomWorkingDaysEnum } from '@/types/swagger/data-contracts';

interface WorkingDaysSelectorProps {
  form: UseFormReturn<z.infer<typeof roomSchema>>;
  name?: string;
}

const daysOfWeek = [
  { id: RoomWorkingDaysEnum.Value0, label: 'Monday' },
  { id: RoomWorkingDaysEnum.Value1, label: 'Tuesday' },
  { id: RoomWorkingDaysEnum.Value2, label: 'Wednesday' },
  { id: RoomWorkingDaysEnum.Value3, label: 'Thursday' },
  { id: RoomWorkingDaysEnum.Value4, label: 'Friday' },
  { id: RoomWorkingDaysEnum.Value5, label: 'Saturday' },
  { id: RoomWorkingDaysEnum.Value6, label: 'Sunday' },
];

export function WorkingDaysSelector({
  form,
  name = 'working_days',
}: WorkingDaysSelectorProps) {
  const { field, fieldState } = useController({
    name: name as 'working_days',
    control: form.control,
  });

  const handleDayToggle = (dayId: RoomWorkingDaysEnum, checked: boolean) => {
    const currentDays = (field.value as RoomWorkingDaysEnum[]) || [];
    if (checked) {
      field.onChange([...currentDays, dayId]);
    } else {
      field.onChange(
        currentDays.filter((day: RoomWorkingDaysEnum) => day !== dayId)
      );
    }
  };

  return (
    <div className="space-y-4 my-6">
      <h3 className="text-lg font-medium text-gray-900">Working days</h3>
      <div className="space-y-3">
        {daysOfWeek.map(day => {
          const isChecked = field.value?.includes(day.id) || false;
          return (
            <div key={day.id} className="flex items-center space-x-3">
              <div className="relative">
                <Checkbox
                  id={`day-${day.id}`}
                  checked={isChecked}
                  onCheckedChange={checked =>
                    handleDayToggle(day.id, checked as boolean)
                  }
                  className={cx('h-5 w-5 rounded border-gray-300', {
                    'bg-primary border-primary text-white': isChecked,
                  })}
                />
              </div>
              <Label
                htmlFor={`day-${day.id}`}
                className="text-base font-normal text-gray-900 cursor-pointer select-none"
              >
                {day.label}
              </Label>
            </div>
          );
        })}
      </div>
      {fieldState.error && (
        <p className="text-sm text-red-500 mt-2">{fieldState.error.message}</p>
      )}
    </div>
  );
}
