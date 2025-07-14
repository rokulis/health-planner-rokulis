import React from 'react';

import { VisitStatusEnum } from '@/types/swagger/data-contracts';

interface Props {
  status: VisitStatusEnum;
}

const STATUS_COLORS: Record<VisitStatusEnum, string> = {
  [VisitStatusEnum.Upcoming]: 'bg-[#190B45] text-white',
  [VisitStatusEnum.Completed]: 'bg-[#22ADD0] text-white',
  [VisitStatusEnum.Draft]: 'bg-gray-100 text-gray-800',
  [VisitStatusEnum.Stopped]: 'bg-danger text-white',
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
