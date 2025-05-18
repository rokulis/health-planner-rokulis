'use server';

import { apiClient } from '@/app/actions';
import { Patients } from '@/types/swagger/PatientsRoute';

export const getPatients = async () => {
  return await apiClient<Patients.GetPatients.ResponseBody>('/patients');
};
