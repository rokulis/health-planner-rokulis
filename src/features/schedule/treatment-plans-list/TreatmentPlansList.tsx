'use client';

import React from 'react';

import { ColumnDef } from '@tanstack/table-core';
import { format, secondsToMinutes } from 'date-fns';

import { useSearchParams } from 'next/navigation';

import { useActionContext } from '@/commons/action-context-provider/useActionContext';
import { DataTable } from '@/commons/components/data-table/DataTable';
import { VisitStatusBadge } from '@/commons/components/visit-status-badge/VisitStatusBadge';
import { useScheduleQuery } from '@/features/schedule/hooks/useScheduleQuery';
import { ScheduleLayout } from '@/features/schedule/layouts/ScheduleLayout';
import { VisitResource } from '@/types/swagger/data-contracts';

export const TreatmentPlansList = () => {
  const { dispatchAction } = useActionContext();
  const params = useSearchParams();
  const { data: schedule } = useScheduleQuery(
    params.get('date') ?? new Date().toISOString().split('T')[0]
  );

  const columns: ColumnDef<VisitResource>[] = [
    {
      accessorKey: 'id',
      header: '#',
    },
    {
      accessorKey: 'patient.name',
      header: 'Patient',
    },
    {
      accessorKey: "room.name",
      header: 'Room',
    },
    {
      accessorKey: "bed.name",
      header: 'Bed',
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
    <ScheduleLayout>
      <DataTable
        columns={columns}
        data={schedule?.data.data ?? []}
        onRowClick={data =>
          dispatchAction('visit_view', { id: data.original.id })
        }
      />
    </ScheduleLayout>
  );
};
