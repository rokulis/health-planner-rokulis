import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { rescheduleVisit } from '@/app/schedule/actions';
import { PageTopLoader } from '@/commons/components/loader/PageTopLoader';
import { Button } from '@/commons/components/ui/button';
import { Calendar } from '@/commons/components/ui/calendar';
import { Checkbox } from '@/commons/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/commons/components/ui/form';
import { filterAvailableHours } from '@/features/schedule/add-treatment/schedule-treatment/ScheduleTreatment';
import { useOpenSlotsQuery } from '@/features/schedule/add-treatment/schedule-treatment/useOpenSlotsQuery';
import { getUniqueTimeSlots } from '@/features/schedule/add-treatment/schedule-treatment/utils';
import { cn } from '@/lib/utils';
import {
  TreatmentPlanResource,
  VisitResource,
} from '@/types/swagger/data-contracts';

interface Props {
  visit: VisitResource;
  onFinish?: (data: TreatmentPlanResource) => void;
  onCancel?: () => void;
}

const FormSchema = z.object({
  start_date: z.string(),
  start_time: z.string(),
  recursive: z.boolean(),
});

export const VisitReschedule: React.FC<Props> = ({
  visit,
  onFinish,
  onCancel,
}) => {
  const [isPending, startTransition] = React.useTransition();
  const queryClient = useQueryClient();
  const [date, setDate] = React.useState<Date | undefined>(
    visit.date ? new Date(visit.date) : new Date()
  );
  const [selectedTime, setSelectedTime] = React.useState<string | undefined>(
    visit.date_time
      ? formatInTimeZone(new Date(visit.date_time), 'UTC', 'HH:mm')
      : undefined
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
      recursive: false,
    },
  });

  const uniqueTimeSlots = filterAvailableHours(
    selectedDate,
    getUniqueTimeSlots(data ?? [])
  );

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async values => {
    return startTransition(async () => {
      if (visit.id) {
        return rescheduleVisit(String(visit.id), {
          start_date: selectedDate,
          start_time: values.start_time,
          recursive: values.recursive,
        }).then(res => {
          if (res.success) {
            if (res.data) {
              onFinish?.(res.data);
            }

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
    <div className="flex flex-col gap-8 h-full pb-8 overflow-y-auto">
      {isPending ? <PageTopLoader /> : null}
      <Calendar
        size="sm"
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
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

          <FormField
            control={form.control}
            name="recursive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2 mt-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>
                  Reschedule upcoming visits
                </FormLabel>
              </FormItem>
            )}
          />

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
