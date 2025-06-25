'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import VisitCard from '@/features/schedule/visit/VisitCard';
import { Visits } from '@/types/swagger/VisitsRoute';

interface Props {
  visit: Visits.GetVisit.ResponseBody | null;
}

export const VisitForm: React.FC<Props> = ({ visit }) => {
  const router = useRouter();
  if (!visit) {
    return <div>No visit data available</div>;
  }

  const onClose = () => {
    router.push('/schedule');
  };

  return <VisitCard data={visit} onClose={onClose} />;
};
