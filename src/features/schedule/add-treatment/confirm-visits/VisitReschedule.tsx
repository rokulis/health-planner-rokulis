import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { rescheduleVisit } from '@/app/schedule/actions';
import { PageTopLoader } from '@/commons/components/loader/PageTopLoader';
import { Button } from '@/commons/components/ui/button';
import { Calendar } from '@/commons/components/ui/calendar';
import { Form, FormLabel } from '@/commons/components/ui/form';
import { useOpenSlotsQuery } from '@/features/schedule/add-treatment/schedule-treatment/useOpenSlotsQuery';
import { getUniqueTimeSlots } from '@/features/schedule/add-treatment/schedule-treatment/utils';
import { cn } from '@/lib/utils';
import { VisitResource } from '@/types/swagger/data-contracts';

interface Props {
  visit: VisitResource;
  onFinish?: () => void;
  onCancel?: () => void;
}

const FormSchema = z.object({
  start_date: z.string(),
  start_time: z.string(),
});

export const VisitReschedule: React.FC<Props> = ({
  visit,
  onFinish,
  onCancel,
}) => {
  const [isPending, startTransition] = React.useTransition();
  const queryClient = useQueryClient();
  const [date, setDate] = React.useState<Date | undefined>(
    visit.date_time ? new Date(visit.date_time) : new Date()
  );
  const [selectedTime, setSelectedTime] = React.useState<string | undefined>(
    undefined
  );
  const selectedDate = React.useMemo(() => {
    if (!date)
      return format(
        visit.date_time
          ? new Date(visit.date_time).toString()
          : new Date().toString(),
        'yyyy-MM-dd'
      );

    return format(date?.toString() as string, 'yyyy-MM-dd');
  }, [date, visit.date_time]);

  const { data } = useOpenSlotsQuery({
    date: selectedDate,
    duration: visit.duration ?? 1800, // Default duration if not provided
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      start_date: selectedDate,
      start_time: '',
    },
  });

  const uniqueTimeSlots = getUniqueTimeSlots(data ?? []);

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async values => {
    return startTransition(async () => {
      if (visit.id) {
        return rescheduleVisit(String(visit.id), {
          start_date: selectedDate,
          start_time: values.start_time,
          recursive: false,
        }).then(res => {
          if (res.success) {
            onFinish?.();
            queryClient.invalidateQueries({
              queryKey: ['schedule'],
            });
            queryClient.invalidateQueries({
              queryKey: ['treatment-plans'],
            });
          }
        });
      }
    });
  };

  return (
    <div className="flex flex-col gap-8 h-full pb-8">
      {isPending ? <PageTopLoader /> : null}
      <Calendar
        size="sm"
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
        weekStartsOn={1}
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-between justify-between h-full px-4"
        >
          <FormLabel className="mb-2">Select available time</FormLabel>
          <div className="flex gap-2 flex-wrap">
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

          <div className="flex justify-between w-full mt-8 gap-4">
            <Button onClick={onCancel} className="flex-1" variant="outline">
              Close
            </Button>
            <Button
              className="flex-1"
              disabled={!!form.formState.errors.start_time}
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
