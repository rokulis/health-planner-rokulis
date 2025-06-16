import { minutesToSeconds } from 'date-fns';

import { SelectTreatmentFormValues } from '@/features/schedule/add-treatment/select-treatment/validations';
import { TreatmentPlans } from '@/types/swagger/TreatmentPlansRoute';

export function mapTreatmentRequest(
  currentRequest: SelectTreatmentFormValues
): TreatmentPlans.CreateTreatmentPlan.RequestBody {
  if (!currentRequest) {
    throw new Error('Current request is required');
  }

  return {
    patient_id: currentRequest.patient_id,
    protocol_id: currentRequest.protocol_id,
    sector_id: currentRequest.sector_id,
    cycles: currentRequest.cycles,
    days_between_cycles: currentRequest.days_between_cycles,
    treatment: {
      protocol_id: currentRequest.protocol_id,
      medicine_groups: currentRequest.medicine_groups.map(group => ({
        protocol_medicine_group_id: group.protocol_medicine_group_id,
        duration: minutesToSeconds(group.duration),
        treatment_days: group.treatment_days,
        medicines: group.medicines.map(medicine => ({
          medicine_id: medicine.medicine_id,
          dose: medicine.dose,
          comment: medicine.comment || '',
        })),
      })),
    },
  };
}
