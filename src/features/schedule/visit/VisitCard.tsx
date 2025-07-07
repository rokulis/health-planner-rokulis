'use client';

import React from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { secondsToMinutes } from 'date-fns';
import { Clock, TestTubeDiagonal } from 'lucide-react';
import { toast } from 'sonner';

import { changeTreatmentStatus } from '@/app/schedule/actions';
import { useActionContext } from '@/commons/action-context-provider/useActionContext';
import { PageTopLoader } from '@/commons/components/loader/PageTopLoader';
import { Badge } from '@/commons/components/ui/badge';
import { Button } from '@/commons/components/ui/button';
import { Card, CardContent, CardHeader } from '@/commons/components/ui/card';
import CheckCircle from '@/commons/icons/svg/check-circle.svg';
import { VisitTreatmentStatus } from '@/types/swagger/data-contracts';
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
  const { dispatchAction } = useActionContext();
  const [isPending, startTransition] = React.useTransition();
  const queryClient = useQueryClient();
  const activeTreatment =
    visit.data?.visit_treatments?.find(
      v => v.status === VisitTreatmentStatus.Pending
    )?.id ?? null;

  const onNext = async (treatmentId?: number) =>
    startTransition(() => {
      if (!visit.data?.id || !treatmentId) {
        return;
      }

      return changeTreatmentStatus(
        visit.data?.id,
        treatmentId,
        VisitTreatmentStatus.Done
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
          onNextProcedure?.();
        }
      });
    });

  return (
    <div className="flex flex-col h-full justify-between">
      {isPending ? <PageTopLoader /> : null}
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

          {/* Medicines List */}
          <div className="flex flex-col gap-4">
            {visit.data?.visit_treatments
              ?.sort(t => (t.type === 'diagnostic' ? -1 : 1))
              .map((treatment, treatmentIdx) => (
                <div
                  key={treatment.id}
                  className="flex flex-col gap-4 items-start justify-between p-3 border border-primary/10 rounded-lg bg-gray-50"
                >
                  {treatment.type === 'diagnostic' ? (
                    <Card className="border-purple-200 bg-purple-50 p-0">
                      <CardContent className="py-0 px-0">
                        <div className="flex w-full gap-2 items-center">
                          {treatment.status === VisitTreatmentStatus.Done ? (
                            <CheckCircle />
                          ) : null}
                          <span className="font-semibold">
                            {treatment.diagnostic_test?.name}
                          </span>
                        </div>

                        {activeTreatment === treatment.id ? (
                          <div className="flex items-center text-sm gap-1">
                            <Clock size={15} />
                            {treatment.diagnostic_test?.duration ? (
                              <span>
                                {secondsToMinutes(
                                  treatment.diagnostic_test?.duration
                                )}
                                min
                              </span>
                            ) : null}
                          </div>
                        ) : null}
                      </CardContent>
                    </Card>
                  ) : (
                    <>
                      {treatment.treatment_medicine_group?.treatment_medicines?.map(
                        medicine => (
                          <div
                            key={medicine.id}
                            className="flex flex-col w-full"
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex w-full gap-2 items-center">
                                {treatment.status ===
                                VisitTreatmentStatus.Done ? (
                                      <CheckCircle />
                                    ) : null}
                                <span className="font-semibold">
                                  {medicine.medicine?.name}{' '}
                                </span>
                              </div>
                              <div className="bg-primary/10 rounded-full px-2 py-1 text-xs text-primary font-semibold">
                                {medicine.medicine?.atc_code ?? '-'}
                              </div>
                            </div>

                            {activeTreatment === treatment.id ? (
                              <>
                                <div className="flex gap-6 text-sm text-gray-600 mt-2">
                                  {medicine.medicine?.default_time ? (
                                    <div className="flex gap-1">
                                      <Clock size={18} />{' '}
                                      {medicine.medicine?.default_time}
                                    </div>
                                  ) : null}

                                  {medicine.dose ? (
                                    <div className="flex gap-1">
                                      <TestTubeDiagonal size={18} />{' '}
                                      {medicine.dose}
                                    </div>
                                  ) : null}
                                </div>
                                {medicine.comment ? (
                                  <div className="border border-gray-200 text-gray-600 rounded-lg p-1 text-sm mt-1">
                                    {medicine.comment || '-'}
                                  </div>
                                ) : null}
                              </>
                            ) : null}
                          </div>
                        )
                      )}
                    </>
                  )}
                  {activeTreatment === treatment.id ? (
                    <div className="flex gap-3 w-full mt-4 justify-between w-full">
                      {treatment.type === 'diagnostic' ? (
                        <Button
                          size="sm"
                          color="primary"
                          variant="outline"
                          className="flex-1"
                          onClick={() =>
                            dispatchAction('treatment_update', {
                              id: treatment.id,
                              visitId: visit.data?.id,
                            })
                          }
                          disabled={isPending}
                        >
                          Reschedule
                        </Button>
                      ) : null}
                      <Button
                        size="sm"
                        color="primary"
                        className="flex-1"
                        onClick={() => onNext(treatment.id)}
                        disabled={isPending}
                      >
                        {treatmentIdx ===
                        (visit.data?.visit_treatments?.length ?? 0) - 1
                          ? 'Finish cycle'
                          : 'Next Procedure'}
                      </Button>
                    </div>
                  ) : null}
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
      <div className="pb-4 pt-8 w-full">
        <Button variant="outline" onClick={onClose} className="w-full">
          Close
        </Button>
      </div>
    </div>
  );
}
