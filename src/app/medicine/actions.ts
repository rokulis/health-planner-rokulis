'use server';

import { apiClient } from '@/app/actions';
import { Medicines } from '@/types/swagger/MedicinesRoute';

export const getMedicines = async () => {
  return await apiClient<Medicines.GetMedicines.ResponseBody>('/medicines');
};
