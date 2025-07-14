import React from 'react';

import CompletedIcon from '@/commons/icons/svg/completed.svg';
import InProgressIcon from '@/commons/icons/svg/in_progress.svg';
import { TreatmentPlanStatus as TreatmentPlanStatusEnum } from '@/types/swagger/data-contracts';

interface Props {
  status: TreatmentPlanStatusEnum;
}

const STATUS_COLORS: Record<TreatmentPlanStatusEnum, string> = {
  [TreatmentPlanStatusEnum.Completed]: 'bg-[#ECFDF5] text-black',
  [TreatmentPlanStatusEnum.Draft]: 'bg-gray-100 text-gray-800',
  [TreatmentPlanStatusEnum.Confirmed]: 'bg-[#E9F9FD] text-black',
  [TreatmentPlanStatusEnum.Stopped]: 'bg-danger/30 text-black',
};

const STATUS_LABELS: Record<TreatmentPlanStatusEnum, string> = {
  [TreatmentPlanStatusEnum.Completed]: 'Completed',
  [TreatmentPlanStatusEnum.Draft]: 'Draft',
  [TreatmentPlanStatusEnum.Confirmed]: 'In Progress',
  [TreatmentPlanStatusEnum.Stopped]: 'Stopped',
};

const ICONS: Record<TreatmentPlanStatusEnum, React.ReactNode> = {
  [TreatmentPlanStatusEnum.Completed]: <CompletedIcon />,
  [TreatmentPlanStatusEnum.Draft]: null,
  [TreatmentPlanStatusEnum.Confirmed]: <InProgressIcon />,
  [TreatmentPlanStatusEnum.Stopped]: null,
};

export const TreatmentPlanStatus: React.FC<Props> = ({ status }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 gap-1 rounded-full text-xs font-medium ${STATUS_COLORS[status]}`}
    >
      {ICONS[status]} {STATUS_LABELS[status] ? STATUS_LABELS[status] : 'Unknown'}
    </span>
  );
};
