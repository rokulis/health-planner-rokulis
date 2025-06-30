import React from 'react';

import { Edit } from 'lucide-react';

import Link from 'next/link';

import { FormValue } from '@/commons/components/form-value/FormValue';
import { Button } from '@/commons/components/ui/button';
import { Card, CardContent, CardHeader } from '@/commons/components/ui/card';
import { Patients } from '@/types/swagger/PatientsRoute';

interface Props {
  patient: Patients.GetPatient.ResponseBody;
}

export const PatientProfile: React.FC<Props> = ({ patient }) => {
  return (
    <Card className="border-gray-200 shadow-sm mx-4 my-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 px-0">
        <h2 className="text-xl font-semibold text-gray-900">
          Personal information
        </h2>
        <Button
          variant="ghost"
          className="text-gray-600 hover:text-gray-900"
          asChild={true}
          size="sm"
        >
          <Link href={`/patients/edit/${patient.data?.id}`}>
            <Edit size={18} />
            Edit
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="px-0">
        <div className="grid gap-4">
          <FormValue label="Full name" value={patient.data?.name} />
          <FormValue label="Personal code" value={patient.data?.personal_code} />
          <FormValue label="Weight" value={`${patient.data?.weight}kg`} />
          <FormValue label="Height" value={`${patient.data?.height}cm`} />
          <FormValue label="Email address" value={patient.data?.email} />
          <FormValue label="Phone" value={patient.data?.phone_number} />
          <FormValue label="Home address" value={patient.data?.address} />
        </div>
      </CardContent>
    </Card>
  );
};
