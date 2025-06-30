import React from 'react';

import { VisitTreatmentResourceStatusEnum } from '@/types/swagger/data-contracts';

interface Props {
  status: VisitTreatmentResourceStatusEnum;
}

//TODO: Bad statuses from API
const STATUS_COLORS: Record<VisitTreatmentResourceStatusEnum, string> = {
  [VisitTreatmentResourceStatusEnum.Done]: 'bg-green-100 text-green-800',
  [VisitTreatmentResourceStatusEnum.Administering]:
    'bg-yellow-100 text-yellow-800',
  [VisitTreatmentResourceStatusEnum.Pending]: 'bg-blue-100 text-blue-800',
};

const STATUS_LABELS: Record<VisitTreatmentResourceStatusEnum, string> = {
  [VisitTreatmentResourceStatusEnum.Done]: 'Done',
  [VisitTreatmentResourceStatusEnum.Administering]: 'Administering',
  [VisitTreatmentResourceStatusEnum.Pending]: 'Pending',
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
