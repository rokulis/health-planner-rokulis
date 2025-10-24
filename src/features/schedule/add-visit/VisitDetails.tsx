'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/commons/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/commons/components/ui/form';
import { Input } from '@/commons/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/commons/components/ui/select';
import { Textarea } from '@/commons/components/ui/textarea';
import { usePatientTreatmentPlansQuery } from '@/features/patients/hooks/usePatientTreatmentPlansQuery';
import { TreatmentPlanStatus } from '@/types/swagger/data-contracts';
import { useSectorsQuery } from '@/utils/hooks/useSectorsQuery';

const formSchema = z.object({
  treatmentPlanId: z.string().optional(),
  sectorId: z.string().optional(),
  duration: z.string().optional(),
  reason: z.string().optional(),
});

type VisitDetailsFormValues = z.infer<typeof formSchema>;

interface VisitDetailsProps {
  patientId?: number;
  onStepSubmit: (data: any) => void;
}

export const VisitDetails: React.FC<VisitDetailsProps> = ({
  patientId,
  onStepSubmit,
}) => {
  const form = useForm<VisitDetailsFormValues>({
    resolver: zodResolver(formSchema),
  });
  const { data: { data: sectors } = {} } = useSectorsQuery();
  const { data: treatmentPlansResponse } =
    usePatientTreatmentPlansQuery(patientId);

  const activeTreatmentPlans = React.useMemo(() => {
    return (
      treatmentPlansResponse?.data?.filter(
        plan => plan.status === TreatmentPlanStatus.Confirmed
      ) ?? []
    );
  }, [treatmentPlansResponse]);

  const onSubmit = (values: VisitDetailsFormValues) => {
    onStepSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="treatmentPlanId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select existing plan</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a plan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {activeTreatmentPlans.map(plan => (
                    <SelectItem key={plan.id} value={String(plan.id)}>
                      {plan.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sectorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sector</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a sector" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {sectors?.map(sector => (
                    <SelectItem key={sector.id} value={String(sector.id)}>
                      {sector.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
  
                  <SelectItem value="900">00:15</SelectItem>
                  <SelectItem value="1800">00:30</SelectItem>
                  <SelectItem value="2700">00:45</SelectItem>

                  {/* Up to 2 Hours */}
                  <SelectItem value="3600">01:00</SelectItem>
                  <SelectItem value="4500">01:15</SelectItem>
                  <SelectItem value="5400">01:30</SelectItem>
                  <SelectItem value="6300">01:45</SelectItem>

                  {/* Up to 3 Hours */}
                  <SelectItem value="7200">02:00</SelectItem>
                  <SelectItem value="8100">02:15</SelectItem>
                  <SelectItem value="9000">02:30</SelectItem>
                  <SelectItem value="9900">02:45</SelectItem>
                  <SelectItem value="10800">03:00</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason for Visit</FormLabel>
              <FormControl>
                <Textarea rows={5} placeholder="Enter reason" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Form>
  );
};
