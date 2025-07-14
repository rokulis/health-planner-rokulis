'use client';

import React from 'react';

import { Pencil } from 'lucide-react';

import { useActionContext } from '@/commons/action-context-provider/useActionContext';
import { NumberedSteps } from '@/commons/components/numbered-steps/NumberedSteps';
import { Button } from '@/commons/components/ui/button';
import { usePatientQuery } from '@/features/patients/hooks/usePatientQuery';

interface Props {
  id: string;
}

export const PatientQuickView: React.FC<Props> = ({ id }) => {
  const { onClose, dispatchAction } = useActionContext();
  const { data: patient } = usePatientQuery(id);

  return (
    <div className="w-full h-full flex flex-col justify-between mx-auto p-0">
      <div className="flex flex-col gap-4">
        <div className="p-0">
          <div className="bg-primary/20 p-2 px-4 rounded-tl-lg rounded-tr-lg flex justify-between items-center">
            <div>Patient information</div>
            <Button
              variant="ghost"
              size="sm"
              className="h-5"
              onClick={() => dispatchAction('patient_edit', { id })}
            >
              <Pencil size={15} /> Edit
            </Button>
          </div>
          <div className="space-y-4 p-0 p-4 bg-primary/5 rounded-bl-lg rounded-br-lg text-sm">
            <div className="grid grid-cols-[140px_1fr] gap-4 pb-4">
              <div className="text-gray-600">Name:</div>
              <div className="font-medium">{patient?.data?.name}</div>

              <div className="text-gray-600">Personal code:</div>
              <div className="font-medium">{patient?.data?.personal_code}</div>

              <div className="text-gray-600">Weight:</div>
              <div className="font-medium">{patient?.data?.weight}kg</div>

              <div className="text-gray-600">Height:</div>
              <div className="font-medium">{patient?.data?.height}cm</div>

              <div className="text-gray-600">Email:</div>
              <div className="font-medium">{patient?.data?.email ?? '-'}</div>

              <div className="text-gray-600">Phone:</div>
              <div className="font-medium">
                {patient?.data?.phone_number ?? '-'}
              </div>

              <div className="text-gray-600">Address:</div>
              <div className="font-medium">{patient?.data?.address ?? '-'}</div>
            </div>
          </div>
        </div>
        {patient?.data?.relatives && patient.data.relatives.length > 0 ? (
          <div className="p-0">
            <div className="bg-primary/20 p-2 px-4 rounded-tl-lg rounded-tr-lg flex justify-between items-center">
              <div>Relatives</div>
              <Button
                variant="ghost"
                size="sm"
                className="h-5"
                onClick={() => dispatchAction('patient_relatives_edit', { id })}
              >
                <Pencil size={15} /> Edit
              </Button>
            </div>
            <div className="space-y-4 p-0 p-4 bg-primary/5 rounded-bl-lg rounded-br-lg text-sm">
              {patient?.data?.relatives?.map((relative, i) => (
                <NumberedSteps number={i + 1} key={i}>
                  <div className="grid grid-cols-[140px_1fr] gap-4 border-b border-gray-200 pb-4">
                    <div className="text-gray-600">Name:</div>
                    <div className="font-medium">{relative.name}</div>

                    <div className="text-gray-600">Kinship:</div>
                    <div className="font-medium">{relative.kinship}</div>

                    <div className="text-gray-600">Email:</div>
                    <div className="font-medium">{relative.email}</div>

                    <div className="text-gray-600">Phone:</div>
                    <div className="font-medium">{relative.phone_number}</div>

                    <div className="text-gray-600">Address:</div>
                    <div className="font-medium">{relative.address ?? '-'}</div>
                  </div>
                </NumberedSteps>
              ))}
            </div>
          </div>
        ) : null}
      </div>
      <div className="flex justify-between pb-8">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};
