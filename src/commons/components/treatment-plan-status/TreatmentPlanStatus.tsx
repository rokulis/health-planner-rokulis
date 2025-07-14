import React from 'react';

import { TreatmentPlanStatus as TreatmentPlanStatusEnum } from '@/types/swagger/data-contracts';

interface Props {
  status: TreatmentPlanStatusEnum;
}

//TODO: Bad statuses from API
const STATUS_COLORS: Record<TreatmentPlanStatusEnum, string> = {
  [TreatmentPlanStatusEnum.Completed]: 'bg-[#22ADD0] text-white',
  [TreatmentPlanStatusEnum.Draft]: 'bg-gray-100 text-gray-800',
  [TreatmentPlanStatusEnum.Confirmed]: 'bg-[#190B45] text-white',
  [TreatmentPlanStatusEnum.Stopped]: 'bg-danger text-white',
};

const STATUS_LABELS: Record<TreatmentPlanStatusEnum, string> = {
  [TreatmentPlanStatusEnum.Completed]: 'Completed',
  [TreatmentPlanStatusEnum.Draft]: 'Draft',
  [TreatmentPlanStatusEnum.Confirmed]: 'Confirmed',
  [TreatmentPlanStatusEnum.Stopped]: 'Stopped',
};

export const TreatmentPlanStatus: React.FC<Props> = ({ status }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[status]}`}
    >
      {STATUS_LABELS[status] ? STATUS_LABELS[status] : 'Unknown'}
    </span>
  );
};
