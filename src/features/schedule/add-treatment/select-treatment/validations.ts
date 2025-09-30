import { z } from "zod"

export const strictCommaSeparatedNumbersSchema = z
  .string()
  .min(1, "Cannot be empty")
  .regex(/^\d+(,\d+)*$/, {
    message: "Must be numbers separated by commas (e.g., '1,2,3')",
  })
  .refine(
    (val) => {
      // Ensure no leading/trailing commas or double commas
      return !val.startsWith(",") && !val.endsWith(",") && !val.includes(",,")
    },
    {
      message: "Invalid comma placement",
    },
  )

export const SelectTreatmentFormSchema = z.object({
  patient_id: z.coerce.number().int().positive(),
  protocol_id: z.coerce.number().int().positive(),
  cycles: z.coerce.number().int().positive(),
  days_between_cycles: z.coerce.number().int().nonnegative(),
  sector_id: z.number().int().positive(),
  diagnosis_id: z.coerce.number().nullish(),
  medicine_groups: z.array(
    z.object({
      protocol_medicine_group_id: z.coerce.number().int().positive().nullish(),
      duration: z.coerce.number().int().nonnegative().min(0),
      treatment_days: strictCommaSeparatedNumbersSchema,
      medicines: z.array(
        z.object({
          medicine_id: z.coerce.number().int().nonnegative(),
          medicine_name: z.string().optional(),
          atc_code: z.string().min(1),
          procedure: z.string().min(1),
          dose: z.coerce.string().min(1, "Dose is required"),
          dose_unit: z.string().min(1),
          comment: z.string().nullish(),
        })
      ),
    })
  ),
})

export type SelectTreatmentFormValues = z.infer<typeof SelectTreatmentFormSchema>
