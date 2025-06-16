import React from 'react';

import { VisitResourceStatusEnum } from '@/types/swagger/data-contracts';

interface Props {
  status: VisitResourceStatusEnum;
}

//TODO: Bad statuses from API
const STATUS_COLORS: Record<VisitResourceStatusEnum, string> = {
  [VisitResourceStatusEnum.Stopped]: 'bg-gray-100 text-gray-800',
  [VisitResourceStatusEnum.Completed]: 'bg-green-100 text-green-800',
  [VisitResourceStatusEnum.InProgress]: 'bg-blue-100 text-blue-800',
  [VisitResourceStatusEnum.Paused]: 'bg-yellow-100 text-yellow-800',
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
