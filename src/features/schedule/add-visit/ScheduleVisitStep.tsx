'use client';

import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { PageTopLoader } from '@/commons/components/loader/PageTopLoader';
import { Button } from '@/commons/components/ui/button';
import { Calendar } from '@/commons/components/ui/calendar';
import { Form, FormLabel } from '@/commons/components/ui/form';
import { useOpenSlotsQuery } from '@/features/schedule/add-treatment/schedule-treatment/useOpenSlotsQuery';
import { getUniqueTimeSlots } from '@/features/schedule/add-treatment/schedule-treatment/utils';
import { cn } from '@/lib/utils';

const FormSchema = z.object({
  start_date: z.string(),
  start_time: z.string(),
  room_id: z.coerce.number().positive(),
  bed_id: z.coerce.number().positive(),
});

interface Props {
  onStepSubmit: (data: {
    start_date: string;
    start_time: string;
    room_id: number;
    bed_id: number;
  }) => void;
  duration?: number;
  buttonText?: string;
  sectorId?: number;
}

export function filterAvailableHours(date: string, hours: string[]): string[] {
  const now = new Date();
  const targetDate = new Date(date);

  if (targetDate.toDateString() !== now.toDateString()) {
    if (targetDate > now) {
      return hours;
    } else {
      return [];
    }
  }

  const currentTime = now.getHours() * 60 + now.getMinutes();

  return hours.filter(hour => {
    const [hourStr, minuteStr] = hour.split(':');
    const hourInMinutes =
      Number.parseInt(hourStr) * 60 + Number.parseInt(minuteStr);
    return hourInMinutes > currentTime;
  });
}

export const ScheduleVisitStep: React.FC<Props> = ({
  onStepSubmit,
  duration,
  buttonText
}) => {
  const [isPending, startTransition] = React.useTransition();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = React.useState<string | undefined>(
    undefined
  );
  const [selectedBed, setSelectedBed] = React.useState<number | undefined>(
    undefined
  );

  const selectedDate = React.useMemo(() => {
    if (!date) return format(new Date().toString(), 'yyyy-MM-dd');
    return format(date?.toString() as string, 'yyyy-MM-dd');
  }, [date]);

  const { data, isLoading } = useOpenSlotsQuery({
    date: selectedDate,
    duration: duration ?? 1800  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      start_date: selectedDate,
      start_time: '',
      room_id: -1,
      bed_id: -1,
    },
  });

  React.useEffect(() => {
    form.setValue('start_date', selectedDate);
  }, [selectedDate, form]);

  const uniqueTimeSlots = filterAvailableHours(
    selectedDate,
    getUniqueTimeSlots(data ?? { data: [] })
  );

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async values => {
    startTransition(() => {
      onStepSubmit(values);
    });
  };

  return (
    <div className="flex flex-col gap-4 h-full pb-8">
      {isPending ? <PageTopLoader /> : null}

      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border mt-0"
        weekStartsOn={1}
        defaultMonth={new Date(selectedDate)}
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-between justify-between h-full px-4"
        >
          <FormLabel className="mb-2">Select available time</FormLabel>
          <div className="flex gap-2 flex-wrap">
            {uniqueTimeSlots.length === 0 && !isLoading ? (
              <span className="text-danger text-sm">
                No available time slots for this date.
              </span>
            ) : null}
            {uniqueTimeSlots.map((slot, index) => (
              <button
                type="button"
                onClick={() => {
                  form.setValue('start_time', slot);
                  setSelectedTime(slot);
                }}
                key={index}
                className={cn(
                  'flex cursor-pointer items-center justify-center border rounded-full py-1 px-2 text-xs hover:bg-primary hover:text-white transition-colors duration-200 ease-in-out',
                  {
                    'bg-primary text-white': selectedTime === slot,
                    'bg-white text-gray-900': selectedTime !== slot,
                  }
                )}
              >
                {slot}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <FormLabel>Available spots</FormLabel>
            {data?.data?.map((room: any) => (
              <div key={room.id}>
                <FormLabel className="mb-2">{room.name}</FormLabel>
                <div className="flex gap-2 flex-wrap">
                  {room.beds?.map((bed: any) => (
                    <button
                      type="button"
                      onClick={() => {
                        form.setValue('room_id', room.id as number);
                        form.setValue('bed_id', bed.id as number);
                        setSelectedBed(bed.id);
                      }}
                      key={bed.id}
                      className={cn(
                        'flex cursor-pointer items-center justify-center border rounded-full py-1 px-2 text-xs hover:bg-primary hover:text-white transition-colors duration-200 ease-in-out',
                        {
                          'bg-primary text-white': selectedBed === bed.id,
                          'bg-white text-gray-900': selectedBed !== bed.id,
                        }
                      )}
                    >
                      {bed.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-8 gap-2">
            <Button disabled={!selectedTime || !selectedBed} type="submit">
              {buttonText ?? 'Schedule Visit'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
