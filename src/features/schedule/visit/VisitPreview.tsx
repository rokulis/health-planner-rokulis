'use client';

import React from 'react';

import { NumberedSteps } from '@/commons/components/numbered-steps/NumberedSteps';
import { Button } from '@/commons/components/ui/button';
import { Visits } from '@/types/swagger/VisitsRoute';
import { MedicineProcedure } from '@/utils/factory';

interface Props {
  visit: Visits.GetVisit.ResponseBody;
  onClose: (() => void) | undefined;
  onStart: () => void;
}

export const VisitPreview: React.FC<Props> = ({ visit, onClose, onStart }) => {
  return (
    <div className="w-full h-full flex flex-col justify-between mx-auto p-0 space-y-8">
      <div className="p-0">
        <div className="bg-primary/20 p-2 px-4 rounded-tl-lg rounded-tr-lg">
          <div>Protocol information</div>
        </div>
        <div className="space-y-4 p-0 p-4 bg-primary/5 rounded-bl-lg rounded-br-lg text-sm">
          <div className="grid grid-cols-[140px_1fr] gap-4 border-b border-gray-200 pb-4">
            <div className="text-gray-600">Protocol name:</div>
            <div className="font-medium">
              {visit?.data?.treatment_plan?.name}
            </div>

            <div className="text-gray-600">Cancer Type:</div>
            <div className="font-medium">
              {visit?.data?.treatment_plan?.diagnosis?.name ?? '-'}
            </div>
          </div>
          {visit.data?.visit_treatments
            ?.filter(t => t.type === 'treatment')
            .map((v, i) => (
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
        </div>
      </div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button onClick={onStart}>Start Treatment</Button>
      </div>
    </div>
  );
};
