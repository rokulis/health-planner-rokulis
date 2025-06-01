'use client';

import React from 'react';

import { ColumnDef } from '@tanstack/table-core';

import { useRouter } from 'next/navigation';

import { DataTable } from '@/commons/components/data-table/DataTable';
import { Button } from '@/commons/components/ui/button';
import Plus from '@/commons/icons/svg/plus.svg';
import { PageLayout } from '@/commons/layouts/PageLayout';
import { MedicineForm } from '@/features/medicine/medicine-form/MedicineForm';
import { TableActions } from '@/features/medicine/TableActions';
import { Medicine } from '@/types/swagger/data-contracts';
import { Medicines } from '@/types/swagger/MedicinesRoute';

interface Props {
  medicines: Medicines.GetMedicines.ResponseBody;
  medicine?: Medicines.GetMedicine.ResponseBody;
}

export const MedicineList: React.FC<Props> = ({ medicines, medicine }) => {
  const router = useRouter();
  const [addMedicineOpen, setAddMedicineOpen] = React.useState(
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
    },
    {
      accessorKey: 'created_at',
      header: 'Created At',
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
        <DataTable columns={columns} data={medicines.data ?? []} />
      </PageLayout>
    </>
  );
};
