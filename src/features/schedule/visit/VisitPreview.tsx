'use client';

import React from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { formatInTimeZone } from 'date-fns-tz';
import { toast } from 'sonner';

import { changeVisitStatus } from '@/app/schedule/actions';
import { NumberedSteps } from '@/commons/components/numbered-steps/NumberedSteps';
import { Badge } from '@/commons/components/ui/badge';
import { Button } from '@/commons/components/ui/button';
import { VisitStatus } from '@/types/swagger/data-contracts';
import { Visits } from '@/types/swagger/VisitsRoute';
import { MedicineProcedure } from '@/utils/factory';

interface Props {
  visit: Visits.GetVisit.ResponseBody;
  onClose: (() => void) | undefined;
  onStart: () => void;
}

export const VisitPreview: React.FC<Props> = ({ visit, onClose, onStart }) => {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = React.useTransition();
  const FormattedVisitTime = () => {
    return (
      <Badge variant="secondary" className="bg-gray-100 text-gray-700">
        {`Visit: ${formatInTimeZone(
          new Date(visit.data?.date_time as string),
          'UTC',
          'HH:mm'
        )}
        -
        ${formatInTimeZone(
        new Date(visit.data?.end_time as string),
        'UTC',
        'HH:mm'
      )}`}
      </Badge>
    );
  };

  const treatments = visit.data?.visit_treatments?.filter(t => t.type === 'treatment') ?? [];
  const isAdditionalVisit = treatments.length === 0;

  const handleCompleteAdditionalVisit = async () => {

    if (!visit?.data?.id) {
      toast.error('Unable to complete visit');
      return;
    }

    startTransition(() => {
      return changeVisitStatus(
        visit?.data?.id || 0,
        VisitStatus.Completed
      ).then(res => {
        if (res.message) {
          toast.error(res.message);
        }
        if (res.success) {
          queryClient.invalidateQueries({
            queryKey: ['visits', String(visit.data?.id)],
          });
          queryClient.invalidateQueries({
            queryKey: ['visits'],
          });
          queryClient.invalidateQueries({
            queryKey: ['schedule'],
          });
          queryClient.invalidateQueries({
            queryKey: ['treatment-plans'],
          });
          toast.success('Visit completed successfully');
          onClose?.();
        }
      });
    });
  };

  const handleStartClick = () => {
    if (isAdditionalVisit) {
      handleCompleteAdditionalVisit();
    } else {
      onStart();
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between mx-auto p-0 space-y-8">
      <div className="flex flex-col gap-6">
        <FormattedVisitTime />
        <div className="p-0">
          <div className="bg-primary/20 p-2 px-4 rounded-tl-lg rounded-tr-lg">
            <div>Visit information</div>
          </div>
          <div className="space-y-4 p-0 p-4 bg-primary/5 rounded-bl-lg rounded-br-lg text-sm">
            <>
              <div className="grid grid-cols-[140px_1fr] gap-4 border-b border-gray-200 pb-4">
                <div className="text-gray-600">Protocol name:</div>
                <div className="font-medium">
                  {visit?.data?.treatment_plan?.name}
                </div>

                <div className="text-gray-600">Cancer Type:</div>
                <div className="font-medium">
                  {visit?.data?.treatment_plan?.diagnosis?.name ?? '-'}
                </div>

                {isAdditionalVisit && <>
                  <div className="text-gray-600">Sector:</div>
                  <div className="font-medium">
                    {visit?.data?.sector?.name ?? '-'}
                  </div>
                  <div className="text-gray-600">Comment:</div>
                  <div className="font-medium">
                    {visit?.data?.notes ?? '-'}
                  </div>
                </>}
              </div>
              {treatments.map((v, i) => (
                <NumberedSteps number={i + 1} key={i}>
                  <React.Fragment>
                    {v.treatment_medicine_group?.treatment_medicines?.map(
                      (m, j) => (
                        <div
                          key={j}
                          className="grid grid-cols-[140px_1fr] gap-4 border-b border-gray-200 pb-4"
                        >
                          <div className="text-gray-600">Medicine name:</div>
                          <div className="font-medium">{m.medicine?.name}</div>

                          <div className="text-gray-600">ATC code:</div>
                          <div className="font-medium">
                            {m.medicine?.atc_code ?? '-'}
                          </div>

                          <div className="text-gray-600">Procedure:</div>
                          <div className="font-medium">
                            {m.medicine?.procedure
                              ? MedicineProcedure[m.medicine?.procedure]
                              : '-'}
                          </div>

                          <div className="text-gray-600">Dose:</div>
                          <div className="font-medium">{m.dose}</div>

                          <div className="text-gray-600">Comment:</div>
                          <div className="font-medium">{m.comment ?? '-'}</div>
                        </div>
                      )
                    )}
                  </React.Fragment>
                </NumberedSteps>
              ))}
            </>

          </div>
        </div>
      </div>
      <div className="flex justify-between pb-8">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button onClick={handleStartClick} disabled={isPending}>
          {isAdditionalVisit ? 'Complete Visit' : 'Start Treatment'}
        </Button>
      </div>
    </div>
  );
};
