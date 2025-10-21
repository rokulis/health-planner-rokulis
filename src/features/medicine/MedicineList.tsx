'use client';

import React, { useEffect, useState } from 'react';

import { ColumnDef } from '@tanstack/table-core';
import { formatInTimeZone } from 'date-fns-tz';

import { useRouter, useSearchParams } from 'next/navigation';

import { DataTable } from '@/commons/components/data-table/DataTable';
import { Button } from '@/commons/components/ui/button';
import Plus from '@/commons/icons/svg/plus.svg';
import { PageLayout } from '@/commons/layouts/PageLayout';
import { useMedicinesQuery } from '@/features/medicine/hooks/useMedicinesQuery';
import { MedicineForm } from '@/features/medicine/medicine-form/MedicineForm';
import { TableActions } from '@/features/medicine/TableActions';
import { Medicine } from '@/types/swagger/data-contracts';
import { Medicines } from '@/types/swagger/MedicinesRoute';
import { MedicineProcedure } from '@/utils/factory';

interface Props {
  medicines: Medicines.GetMedicines.ResponseBody;
  medicine?: Medicines.GetMedicine.ResponseBody;
}

export const MedicineList: React.FC<Props> = ({ medicine }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const { data: medicines, isLoading } = useMedicinesQuery(search);
  const [addMedicineOpen, setAddMedicineOpen] = useState(
    !!medicine?.data?.id || false
  );

  const columns: ColumnDef<Medicine>[] = [
    {
      accessorKey: 'name',
      header: 'Medicine Name',
    },
    {
      accessorKey: 'atc_code',
      header: 'Atc Code',
    },
    {
      accessorKey: 'procedure',
      header: 'Procedure',
      cell: info =>
        info.row.original.procedure
          ? MedicineProcedure[info.row.original.procedure]
          : '-',
    },
    {
      accessorKey: 'created_at',
      header: 'Created At',
      cell: info => (
        <>
          {info.row.original.created_at
            ? formatInTimeZone(
              new Date(info.row.original.created_at),
              'UTC',
              'yyyy-MM-dd HH:mm:ss'
            )
            : '-'}
        </>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => <TableActions medicine={row.original} />,
    },
  ];

  const handleClose = () => {
    setAddMedicineOpen(false);
    router.push('/medicine');
  };

  return (
    <>
      {addMedicineOpen ? (
        <MedicineForm
          isOpen={addMedicineOpen}
          onClose={handleClose}
          medicine={medicine}
        />
      ) : null}

      <PageLayout
        searchEnabled={true}
        title="Medicine"
        actions={
          <Button
            onClick={() => setAddMedicineOpen(true)}
            size="sm"
            className="flex gap-2 items-center"
          >
            <Plus />
            Add Medicine
          </Button>
        }
      >
        <DataTable
          columns={columns}
          data={medicines?.data ?? []}
          isLoading={isLoading}
        />
      </PageLayout>
    </>
  );
};
