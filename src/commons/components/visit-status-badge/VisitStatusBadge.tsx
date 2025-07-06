import React from 'react';

import { VisitStatusEnum } from '@/types/swagger/data-contracts';

interface Props {
  status: VisitStatusEnum;
}

//TODO: Bad statuses from API
const STATUS_COLORS: Record<VisitStatusEnum, string> = {
  [VisitStatusEnum.Upcoming]: 'bg-yellow-100 text-yellow-800',
  [VisitStatusEnum.Completed]: 'bg-green-100 text-green-800',
  [VisitStatusEnum.Draft]: 'bg-gray-100 text-gray-800',
  [VisitStatusEnum.Stopped]: 'bg-red-100 text-red-800',
};

export const VisitStatusBadge: React.FC<Props> = ({ status }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[status]}`}
    >
      {status}
    </span>
  );
};
