import { useQuery } from '@tanstack/react-query';

import { getPatientTreatmentPlans } from '@/app/treatment-plans/actions';

export const usePatientTreatmentPlansQuery = (patientId?: number) => {
  return useQuery({
    queryKey: ['patient-treatment-plans', patientId],
    queryFn: () => {
      if (!patientId) {
        return null;
      }
      return getPatientTreatmentPlans(patientId);
    },
    enabled: !!patientId,
  });
};
