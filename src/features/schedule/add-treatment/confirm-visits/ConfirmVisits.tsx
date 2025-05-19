import React from 'react';

import { TreatmentPlans } from '@/types/swagger/TreatmentPlansRoute';

interface Props {
  visits?: TreatmentPlans.PlanVisits.ResponseBody;
}

export const ConfirmVisits: React.FC<Props> = ({ visits }) => {
  return <pre className="text-xs">{JSON.stringify(visits, null, 2)}</pre>;
};
