import React from 'react';

import { VisitStatusEnum } from '@/types/swagger/data-contracts';

interface Props {
  status: VisitStatusEnum;
}

const STATUS_COLORS: Record<VisitStatusEnum, string> = {
  [VisitStatusEnum.Upcoming]: 'bg-yellow-100 text-yellow-800',
  [VisitStatusEnum.Completed]: 'bg-green-100 text-green-800',
  [VisitStatusEnum.Draft]: 'bg-gray-100 text-gray-800',
  [VisitStatusEnum.Stopped]: 'bg-red-100 text-red-800',
};

const VISIT_STATUS_LABELS: Record<VisitStatusEnum, string> = {
  [VisitStatusEnum.Upcoming]: 'Upcoming',
  [VisitStatusEnum.Completed]: 'Completed',
  [VisitStatusEnum.Draft]: 'Draft',
  [VisitStatusEnum.Stopped]: 'Stopped',
};

export const VisitStatusBadge: React.FC<Props> = ({ status }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[status]}`}
    >
      {VISIT_STATUS_LABELS[status]}
    </span>
  );
};
