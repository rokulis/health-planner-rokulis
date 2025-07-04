import React from 'react';

import { VisitTreatmentStatus } from '@/types/swagger/data-contracts';

interface Props {
  status: VisitTreatmentStatus;
}

//TODO: Bad statuses from API
const STATUS_COLORS: Record<VisitTreatmentStatus, string> = {
  [VisitTreatmentStatus.Done]: 'bg-green-100 text-green-800',
  [VisitTreatmentStatus.Administering]: 'bg-yellow-100 text-yellow-800',
  [VisitTreatmentStatus.Pending]: 'bg-blue-100 text-blue-800',
};

const STATUS_LABELS: Record<VisitTreatmentStatus, string> = {
  [VisitTreatmentStatus.Done]: 'Done',
  [VisitTreatmentStatus.Administering]: 'Administering',
  [VisitTreatmentStatus.Pending]: 'Pending',
};

export const TreatmentStatus: React.FC<Props> = ({ status }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[status]}`}
    >
      {STATUS_LABELS[status] ? STATUS_LABELS[status] : 'Unknown'}
    </span>
  );
};
