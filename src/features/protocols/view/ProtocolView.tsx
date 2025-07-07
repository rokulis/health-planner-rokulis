'use client';

import React from 'react';

import { useActionContext } from '@/commons/action-context-provider/useActionContext';
import { NumberedSteps } from '@/commons/components/numbered-steps/NumberedSteps';
import { Button } from '@/commons/components/ui/button';
import { useProtocolQuery } from '@/features/protocols/hooks/useProtocolQuery';
import { MedicineProcedure } from '@/utils/factory';

interface Props {
  id: string;
}

export const ProtocolView: React.FC<Props> = ({ id }) => {
  const { onClose } = useActionContext();
  const { data: protocol } = useProtocolQuery(id);

  return (
    <div className="w-full h-full flex flex-col justify-between mx-auto p-0 space-y-8">
      <div className="p-0">
        <div className="bg-primary/20 p-2 px-4 rounded-tl-lg rounded-tr-lg">
          <div>Protocol information</div>
        </div>
        <div className="space-y-4 p-0 p-4 bg-primary/5 rounded-bl-lg rounded-br-lg text-sm">
          <div className="grid grid-cols-[140px_1fr] gap-4 border-b border-gray-200 pb-4">
            <div className="text-gray-600">Protocol name:</div>
            <div className="font-medium">{protocol?.data?.name}</div>

            <div className="text-gray-600">Cancer Type:</div>
            <div className="font-medium">
              {protocol?.data?.diagnosis?.name ?? '-'}
            </div>
          </div>
          {protocol?.data?.protocol_medicine_groups?.map((mg, i) => (
            <NumberedSteps number={i + 1} key={i}>
              {mg.protocol_medicines?.map((m, j) => (
                <div
                  key={j}
                  className="border-b mb-4 w-full border-gray-200 pb-4 w-full"
                >
                  <div className="grid grid-cols-[140px_1fr] gap-4">
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
                  </div>
                </div>
              ))}
            </NumberedSteps>
          ))}
        </div>
      </div>
      <div className="flex justify-between pb-8">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};
