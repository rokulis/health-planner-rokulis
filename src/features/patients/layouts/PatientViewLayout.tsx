import React from 'react';

import { Tabs } from '@/commons/components/tabs/Tabs';
import List from '@/commons/icons/svg/list.svg';
import Timeline from '@/commons/icons/svg/timeline.svg';
import { PageLayout } from '@/commons/layouts/PageLayout';
import { Patients } from '@/types/swagger/PatientsRoute';

interface Props {
  children: React.ReactNode;
  patient: Patients.GetPatient.ResponseBody;
}

export const PatientViewLayout: React.FC<Props> = ({ children, patient }) => {
  const TABS = [
    {
      label: 'Profile',
      icon: <Timeline />,
      href: `/patients/${patient.data?.id}`,
    },
    {
      label: 'Treatment Plans',
      icon: <List />,
      href: `/patients/view/${patient.data?.id}/treatment-plans`,
    },
    {
      label: 'Relatives',
      icon: <List />,
      href: `/patients/view/${patient.data?.id}/relatives`,
    },
  ];

  return (
    <PageLayout title={patient.data?.name ?? 'Patient Profile'}>
      <div className="flex flex-col">
        <Tabs tabs={TABS} />
        {children}
      </div>
    </PageLayout>
  );
};
