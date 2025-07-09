'use client';

import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { rescheduleVisit } from '@/app/schedule/actions';
import { planVisits } from '@/app/treatment-plans/actions';
import { PageTopLoader } from '@/commons/components/loader/PageTopLoader';
import { Button } from '@/commons/components/ui/button';
import { Calendar } from '@/commons/components/ui/calendar';
import { Form, FormLabel } from '@/commons/components/ui/form';
import { useOpenSlotsQuery } from '@/features/schedule/add-treatment/schedule-treatment/useOpenSlotsQuery';
import { getUniqueTimeSlots } from '@/features/schedule/add-treatment/schedule-treatment/utils';
import { cn } from '@/lib/utils';
import { TreatmentPlans } from '@/types/swagger/TreatmentPlansRoute';

const FormSchema = z.object({
  start_date: z.string(),
  start_time: z.string(),
});

interface Props {
  onStepSubmit: (visits: TreatmentPlans.PlanVisits.ResponseBody) => void;
  onBack?: () => void;
  treatmentPlan?: TreatmentPlans.CreateTreatmentPlan.ResponseBody;
  visitId?: string;
  buttonText?: string;
}

export const ScheduleTreatment: React.FC<Props> = ({
  onStepSubmit,
  treatmentPlan,
  visitId,
  buttonText,
}) => {
  const [isPending, startTransition] = React.useTransition();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = React.useState<string | undefined>(
    undefined
  );
  const firstTreatmentDuration =
    treatmentPlan?.data?.treatment_cycles?.[0].visits?.[0].duration ?? 1800;

  const selectedDate = React.useMemo(
    () => format(date?.toString() as string, 'yyyy-MM-dd'),
    [date]
  );

  const { data } = useOpenSlotsQuery({
    date: selectedDate,
    duration: firstTreatmentDuration,
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
      if (!treatmentPlan?.data?.id) {
        return;
      }

      if (visitId) {
        return rescheduleVisit(visitId, {
          start_date: selectedDate,
          start_time: values.start_time,
        }).then(res => {
          if (res.success) {
            onStepSubmit(res);
          }
        });
      }

      await planVisits({
        id: treatmentPlan.data.id,
        start_date: selectedDate,
        start_time: values.start_time,
      }).then(res => {
        if (res.success) {
          onStepSubmit(res);
        }
      });
    });
  };

  return (
    <div className="flex flex-col gap-8 h-full pb-8">
      {isPending ? <PageTopLoader /> : null}
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
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

          <div className="flex justify-end mt-8 gap-2">
            <Button disabled={!!form.formState.errors.start_time}>
              {buttonText ?? 'Schedule all'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
