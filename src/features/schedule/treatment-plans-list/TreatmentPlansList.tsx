'use client';

import React from 'react';

import { ColumnDef } from '@tanstack/table-core';

import { DataTable } from '@/commons/components/data-table/DataTable';
import { ScheduleLayout } from '@/features/schedule/layouts/ScheduleLayout';
import { TreatmentPlanResource } from '@/types/swagger/data-contracts';
import { Medicines } from '@/types/swagger/MedicinesRoute';
import { Patients } from '@/types/swagger/PatientsRoute';
import { Protocols } from '@/types/swagger/ProtocolsRoute';
import { TreatmentPlans } from '@/types/swagger/TreatmentPlansRoute';

interface Props {
  data: Promise<TreatmentPlans.GetTreatmentPlans.ResponseBody>;
  patientsData: Promise<Patients.GetPatients.ResponseBody>;
  protocolsData: Promise<Protocols.GetProtocols.ResponseBody>;
  medicinesData: Promise<Medicines.GetMedicines.ResponseBody>;
}

export const TreatmentPlansList: React.FC<Props> = ({
  data,
  protocolsData,
  patientsData,
  medicinesData,
}) => {
  const treatmentPlans = React.use(data);
  const patients = React.use(patientsData);
  const protocols = React.use(protocolsData);
  const medicines = React.use(medicinesData);

  const columns: ColumnDef<TreatmentPlanResource>[] = [
    {
      accessorKey: 'id',
      header: '#',
    },
    {
      accessorKey: 'patient',
      header: 'Patient',
      cell: ({ row }) => {
        const patient = patients.data?.find(
          p => p.id === row.original.patient_id
        );
        return patient ? `${patient.name}` : 'N/A';
      },
    },
    {
      accessorKey: 'patient_id',
      header: 'Patient',
    },
    {
      accessorKey: 'days_between_cycles',
      header: 'Days Between Cycles',
    },
    {
      accessorKey: 'status',
      header: 'Status',
    },
  ];

  return (
    <ScheduleLayout
      protocols={protocols}
      patients={patients}
      medicines={medicines}
    >
      <DataTable columns={columns} data={treatmentPlans.data ?? []} />
    </ScheduleLayout>
  );
};
