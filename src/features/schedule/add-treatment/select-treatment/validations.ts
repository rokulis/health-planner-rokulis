import { z } from "zod"

export const SelectTreatmentFormSchema = z.object({
  patient_id: z.coerce.number().int().positive(),
  protocol_id: z.coerce.number().int().positive(),
  cycles: z.coerce.number().int().positive(),
  days_between_cycles: z.coerce.number().int().nonnegative(),
  sector_id: z.number().int().positive(),
  diagnosis_id: z.coerce.number(),
  medicine_groups: z.array(
    z.object({
      protocol_medicine_group_id: z.coerce.number().int().positive(),
      duration: z.coerce.number().int().nonnegative().min(1),
      treatment_days: z.array(z.coerce.number().int().nonnegative()),
      medicines: z.array(
        z.object({
          medicine_id: z.coerce.number().int().nonnegative(),
          medicine_name: z.string().min(1),
          atc_code: z.string().min(1),
          procedure: z.string().min(1),
          dose: z.coerce.string(),
          dose_unit: z.string().min(1),
          comment: z.string().nullish(),
        })
      ),
    })
  ),
})

export type SelectTreatmentFormValues = z.infer<typeof SelectTreatmentFormSchema>
