"use client";

import React from 'react';

import cx from 'classnames';
import { Edit } from 'lucide-react';

import { useActionContext } from '@/commons/action-context-provider/useActionContext';
import { FormValue } from '@/commons/components/form-value/FormValue';
import { Button } from '@/commons/components/ui/button';
import { Card, CardContent, CardHeader } from '@/commons/components/ui/card';
import { Patients } from '@/types/swagger/PatientsRoute';

interface Props {
  patient: Patients.GetPatient.ResponseBody;
}

export const PatientRelatives: React.FC<Props> = ({ patient }) => {
  const { dispatchAction } = useActionContext();

  return (
    <Card className="border-gray-200 shadow-sm mx-4 my-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 px-0">
        <h2 className="text-xl font-semibold text-gray-900">Relatives</h2>
        <Button
          variant="ghost"
          className="text-gray-600 hover:text-gray-900"
          size="sm"
          onClick={() =>
            dispatchAction('patient_relatives_edit', { id: patient.data?.id })
          }
        >
          <div className="flex items-center gap-1">
            <Edit size={18} />
            Edit
          </div>
        </Button>
      </CardHeader>
      <CardContent className="px-0">
        <div className="grid gap-4">
          {patient.data?.relatives?.length === 0 && (
            <div className="text-gray-500">No relatives found.</div>
          )}
          {patient.data?.relatives?.map((relative, idx) => (
            <div
              className={cx('grid gap-4 pb-4', {
                'border-b border-black/10':
                  patient.data?.relatives &&
                  idx < patient.data?.relatives?.length - 1,
              })}
              key={relative.id}
            >
              <FormValue label="Full name" value={relative.name} />
              <FormValue label="Kinship" value={relative.kinship} />
              <FormValue label="Email address" value={relative.email} />
              <FormValue label="Phone number" value={relative.phone_number} />
              <FormValue label="Home address" value={relative.address} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
