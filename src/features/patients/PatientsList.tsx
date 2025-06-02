'use client';

import React from 'react';

import { ColumnDef } from '@tanstack/table-core';
import { format } from 'date-fns';

import { useRouter } from 'next/navigation';

import { DataTable } from '@/commons/components/data-table/DataTable';
import { Button } from '@/commons/components/ui/button';
import Plus from '@/commons/icons/svg/plus.svg';
import { PageLayout } from '@/commons/layouts/PageLayout';
import { PatientForm } from '@/features/patients/patient-form/PatientForm';
import { TableActions } from '@/features/patients/TableActions';
import { PatientResource } from '@/types/swagger/data-contracts';
import { Patients } from '@/types/swagger/PatientsRoute';

interface Props {
  patients: Patients.GetPatients.ResponseBody;
  patient?: Patients.GetPatient.ResponseBody;
}

export const PatientsList: React.FC<Props> = ({ patients, patient }) => {
  const router = useRouter();
  const [addPatientOpen, setAddPatientOpen] = React.useState(
    !!patient?.data?.id || false
  );

  const columns: ColumnDef<PatientResource>[] = [
    {
      accessorKey: 'name',
      header: 'Full name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'date_of_birth',
      header: 'Birth date',
      cell: info => (
        <>
          {info.row.original.date_of_birth
            ? format(new Date(info.row.original.date_of_birth), 'yyyy-MM-dd')
            : '-'}
        </>
      ),
    },
    {
      accessorKey: 'personal_code',
      header: 'Personal code',
    },
    {
      accessorKey: 'phone_number',
      header: 'Phone number',
    },
    {
      accessorKey: 'weight',
      header: 'Weight',
    },
    {
      accessorKey: 'height',
      header: 'Height',
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: info => <TableActions patient={info.row.original} />,
    },
  ];

  const onCloseForm = () => {
    setAddPatientOpen(false);
    router.push('/patients');
  };

  return (
    <>
      {addPatientOpen ? (
        <PatientForm
          patient={patient}
          isOpen={addPatientOpen}
          onClose={onCloseForm}
        />
      ) : null}

      <PageLayout
        title="Patients"
        actions={
          <Button
            onClick={() => setAddPatientOpen(true)}
            size="sm"
            className="flex gap-2 items-center justify-center"
          >
            <Plus />
            Add Patient
          </Button>
        }
      >
        <DataTable columns={columns} data={patients.data ?? []} />
      </PageLayout>
    </>
  );
};
