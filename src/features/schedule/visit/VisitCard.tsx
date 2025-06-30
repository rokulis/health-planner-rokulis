'use client';

import React from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Clock } from 'lucide-react';
import { toast } from 'sonner';

import { changeTreatmentStatus } from '@/app/schedule/actions';
import { FormValue } from '@/commons/components/form-value/FormValue';
import { TreatmentStatus } from '@/commons/components/treatment-status/TreatmentStatus';
import { Badge } from '@/commons/components/ui/badge';
import { Button } from '@/commons/components/ui/button';
import { Card, CardContent, CardHeader } from '@/commons/components/ui/card';
import {
  ChangeVisitStatusStatusEnum,
  VisitTreatmentResourceStatusEnum,
} from '@/types/swagger/data-contracts';
import { Visits } from '@/types/swagger/VisitsRoute';

interface TreatmentCardProps {
  visit: Visits.GetVisit.ResponseBody;
  cycleInfo?: string;
  onClose?: () => void;
  onEdit?: () => void;
  onReschedule?: () => void;
  onNextProcedure?: () => void;
}

export default function VisitCard({
  visit,
  cycleInfo = 'Cycle 1/1',
  onNextProcedure,
  onClose,
}: TreatmentCardProps) {
  const queryClient = useQueryClient();
  const activeTreatment =
    visit.data?.visit_treatments?.find(
      v => v.status === VisitTreatmentResourceStatusEnum.Pending
    )?.id ?? null;

  const onNext = async (treatmentId?: number) => {
    if (!visit.data?.id || !treatmentId) {
      return;
    }
    return changeTreatmentStatus(
      visit.data?.id,
      treatmentId,
      ChangeVisitStatusStatusEnum.Completed
    ).then(res => {
      if (res.message) {
        toast.error(res.message);
      }
      if (res.success) {
        queryClient.invalidateQueries({
          queryKey: ['visits', visit.data?.id],
        });
        onNextProcedure?.();
      }
    });
  };

  return (
    <div className="flex flex-col h-full justify-between">
      <Card className="w-full mx-auto p-0">
        <CardHeader className="px-0">
          <div className="flex gap-2 mt-2">
            <Badge variant="secondary" className="bg-gray-100 text-gray-700">
              {visit.data?.room?.name} {visit.data?.bed?.name}
            </Badge>
            <Badge variant="secondary" className="bg-gray-100 text-gray-700">
              {cycleInfo}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 px-0">
          {/* Blood Test Section */}
          <div className="bg-primary/10 py-2 px-4 rounded-lg mb-4 font-semibold text-lg">
            {visit.data?.treatment_plan?.name}
          </div>
          <Card className="border-purple-200 bg-purple-50 p-0">
            <CardContent className="py-2 px-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-md">Blood test</h3>
              </div>

              <div className="flex items-center text-sm gap-1">
                <Clock size={15} />
                <span>15min</span>
              </div>
            </CardContent>
          </Card>

          {/* Medicines List */}
          <div className="flex flex-col gap-4">
            {visit.data?.visit_treatments?.map(treatment => (
              <div
                key={treatment.id}
                className="flex flex-col items-start justify-between p-3 border border-primary/10 rounded-lg bg-gray-50"
              >
                {treatment.treatment_medicine_group?.treatment_medicines?.map(
                  medicine => (
                    <div
                      key={medicine.id}
                      className="flex flex-col gap-2 w-full"
                    >
                      <div className="flex w-full justify-between items-center">
                        <span className="font-semibold">
                          {medicine.medicine?.name}{' '}
                        </span>

                        {treatment.status ? (
                          <TreatmentStatus status={treatment.status} />
                        ) : null}
                      </div>

                      {activeTreatment === treatment.id ? (
                        <>
                          <FormValue
                            className="text-sm"
                            label="Dose"
                            value={medicine.dose}
                          />

                          {medicine.comment ? (
                            <FormValue
                              className="text-sm"
                              label="Comment"
                              value={medicine.comment}
                            />
                          ) : null}
                        </>
                      ) : null}
                    </div>
                  )
                )}
                <div className="flex gap-3 w-full mt-4 justify-end">
                  <Button
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={() => onNext(treatment.id)}
                  >
                    Next Procedure
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Button variant="outline" onClick={onClose}>
        Close
      </Button>
    </div>
  );
}
