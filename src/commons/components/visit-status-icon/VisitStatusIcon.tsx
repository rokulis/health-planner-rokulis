import React from 'react';

import CompletedIcon from '@/commons/icons/svg/completed.svg';
import DraftIcon from '@/commons/icons/svg/draft.svg';
import UpcomingIcon from '@/commons/icons/svg/upcoming.svg';
import { VisitStatusEnum } from '@/types/swagger/data-contracts';

interface Props {
  status: VisitStatusEnum;
}

const ICONS_MAP: Record<VisitStatusEnum, React.ReactNode> = {
  [VisitStatusEnum.Stopped]: null,
  [VisitStatusEnum.Draft]: <DraftIcon />,
  [VisitStatusEnum.Upcoming]: <UpcomingIcon />,
  [VisitStatusEnum.Completed]: <CompletedIcon />,
} as const;

export const VisitStatusIcon: React.FC<Props> = ({ status }) => {
  return <span className="text-lg">{ICONS_MAP[status]}</span>;
};
