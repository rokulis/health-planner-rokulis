'use server';

import { revalidateTag } from 'next/cache';

import { apiClient } from '@/app/actions';
import { Medicines } from '@/types/swagger/MedicinesRoute';

export const getMedicines = async () => {
  return await apiClient<Medicines.GetMedicines.ResponseBody>('/medicines', {
    next: {
      tags: ['medicines'],
      revalidate: 3600,
    },
  });
};

export const createMedicine = async (
  data: Medicines.CreateMedicine.RequestBody
) => {
  const res = await apiClient<Medicines.CreateMedicine.ResponseBody>(
    '/medicines',
    {
      method: 'POST',
      body: data,
    }
  );

  if (res.success) {
    revalidateTag('medicines');
  }

  return res;
};

export const getMedicine = async (medicineId: string) => {
  return await apiClient<Medicines.GetMedicine.ResponseBody>(
    `/medicines/${medicineId}`,
    {
      next: {
        tags: ['medicines', medicineId],
        revalidate: 3600,
      },
    }
  );
};

export const updateMedicine = async (
  medicineId: number,
  data: Medicines.UpdateMedicine.RequestBody
) => {
  const res = await apiClient<Medicines.UpdateMedicine.ResponseBody>(
    `/medicines/${medicineId}`,
    {
      method: 'PUT',
      body: data,
    }
  );

  if (res.success) {
    revalidateTag('medicines');
  }

  return res;
};

export const deleteMedicine = async (medicineId: number) => {
  const res = await apiClient<Medicines.DeleteMedicine.ResponseBody>(
    `/medicines/${medicineId}`,
    {
      method: 'DELETE',
    }
  );

  if (res.success) {
    revalidateTag('medicines');
  }

  return res;
};
