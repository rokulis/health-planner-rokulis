import { MedicineProcedureEnum } from '@/types/swagger/data-contracts';

export const MedicineProcedure: Record<MedicineProcedureEnum, string> = {
  [MedicineProcedureEnum.Iv]: 'Intravenous',
  [MedicineProcedureEnum.Sc]: 'Subcutaneous',
  [MedicineProcedureEnum.OralCapsule]: 'Oral capsule',
  [MedicineProcedureEnum.OralTablet]: 'Oral tablet',
};
