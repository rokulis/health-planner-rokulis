'use client';

import React from 'react';

import { ColumnDef } from '@tanstack/table-core';
import { format, secondsToMinutes } from 'date-fns';

import { DataTable } from '@/commons/components/data-table/DataTable';
import { VisitStatusBadge } from '@/commons/visit-status-badge/VisitStatusBadge';
import { ScheduleLayout } from '@/features/schedule/layouts/ScheduleLayout';
import { VisitResource } from '@/types/swagger/data-contracts';
import { Medicines } from '@/types/swagger/MedicinesRoute';
import { Patients } from '@/types/swagger/PatientsRoute';
import { Protocols } from '@/types/swagger/ProtocolsRoute';
import { Schedule } from '@/types/swagger/ScheduleRoute';

interface Props {
  scheduleData: Promise<Schedule.GetSchedule.ResponseBody>;
  patientsData: Promise<Patients.GetPatients.ResponseBody>;
  protocolsData: Promise<Protocols.GetProtocols.ResponseBody>;
  medicinesData: Promise<Medicines.GetMedicines.ResponseBody>;
}

export const TreatmentPlansList: React.FC<Props> = ({
  scheduleData,
  protocolsData,
  patientsData,
  medicinesData,
}) => {
  const schedule = React.use(scheduleData);
  const patients = React.use(patientsData);
  const protocols = React.use(protocolsData);
  const medicines = React.use(medicinesData);

  const columns: ColumnDef<VisitResource>[] = [
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
      accessorKey: 'date_time',
      header: 'Date & Time',
      cell: info => (
        <>
          {info.row.original.date_time
            ? format(new Date(info.row.original.date_time), 'yyyy-MM-dd HH:mm')
            : '-'}
        </>
      ),
    },
    {
      accessorKey: 'duration',
      header: 'Duration',
      cell: ({ row }) => {
        const duration = row.original.duration;
        if (duration) {
          return <span>{secondsToMinutes(duration)}min</span>;
        }

        return <span>-</span>;
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        if (!row.original.status) {
          return <span>-</span>;
        }
        return <VisitStatusBadge status={row.original.status} />;
      },
    },
    {
      accessorKey: 'notes',
      header: 'Notes',
      cell: ({ row }) => {
        const notes = row.original.notes || '-';
        return <span>{notes}</span>;
      },
    },
  ];

  return (
    <ScheduleLayout
      protocols={protocols}
      patients={patients}
      medicines={medicines}
    >
      <DataTable columns={columns} data={schedule.data ?? []} />
    </ScheduleLayout>
  );
};
