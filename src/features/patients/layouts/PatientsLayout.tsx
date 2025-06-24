'use client';

import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Drawer } from '@/commons/components/drawer/Drawer';
import { Button } from '@/commons/components/ui/button';
import Plus from '@/commons/icons/svg/plus.svg';
import { PageLayout } from '@/commons/layouts/PageLayout';
import { PatientEntity } from '@/features/patients/patient-form/PatientEntity';
import { Medicines } from '@/types/swagger/MedicinesRoute';
import { Patients } from '@/types/swagger/PatientsRoute';
import { Protocols } from '@/types/swagger/ProtocolsRoute';

interface Props {
  children: React.ReactNode;
  patient?: Patients.GetPatient.ResponseBody;
  isDefaultOpen?: boolean;
  protocols: Protocols.GetProtocols.ResponseBody;
  medicines: Medicines.GetMedicines.ResponseBody;
}

export const PatientsLayout: React.FC<Props> = ({
  children,
  patient,
  isDefaultOpen,
  protocols,
  medicines,
}) => {
  const router = useRouter();
  const [addNew, setAddNew] = React.useState(isDefaultOpen ?? false);

  const onClose = () => {
    setAddNew(false);
    router.push('/patients');
  };

  return (
    <>
      <Drawer title="Patient Form" isOpen={addNew} onClose={onClose}>
        <PatientEntity
          protocols={protocols}
          medicines={medicines}
          patient={patient}
        />
      </Drawer>
      <PageLayout
        title="Patients"
        actions={
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="flex gap-2 items-center"
              asChild={true}
            >
              <Link href="/patients/new">
                <Plus />
                Add Patient
              </Link>
            </Button>
          </div>
        }
      >
        <div className="flex flex-col">{children}</div>
      </PageLayout>
    </>
  );
};
