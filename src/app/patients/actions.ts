'use server';

import { revalidateTag } from 'next/cache';

import { apiClient } from '@/app/actions';
import { Patients } from '@/types/swagger/PatientsRoute';
import { TreatmentPlans } from '@/types/swagger/TreatmentPlansRoute';

export const getPatients = async () => {
  return await apiClient<Patients.GetPatients.ResponseBody>('/patients', {
    next: {
      tags: ['patients'],
      revalidate: 3600,
    },
  });
};

export const getPatient = async (patientId: string) => {
  return await apiClient<Patients.GetPatient.ResponseBody>(
    `/patients/${patientId}`,
    {
      next: {
        tags: ['patients', patientId],
        revalidate: 3600,
      },
    }
  );
};

export const updatePatient = async (
  patientId: number,
  data: Patients.UpdatePatient.RequestBody
) => {
  const res = await apiClient<Patients.UpdatePatient.ResponseBody>(
    `/patients/${patientId}`,
    {
      method: 'PUT',
      body: data,
    }
  );

  if (res.success) {
    revalidateTag('patients');
  }

  return res;
};

export const addPatient = async (data: Patients.CreatePatient.RequestBody) => {
  const res = await apiClient<Patients.CreatePatient.ResponseBody>(
    '/patients',
    {
      method: 'POST',
      body: data,
    }
  );

  if (res.success) {
    revalidateTag('patients');
  }

  return res;
};

export const deletePatient = async (patientId: number) => {
  const res = await apiClient<Patients.DeletePatient.ResponseBody>(
    `/patients/${patientId}`,
    {
      method: 'DELETE',
    }
  );

  if (res.success) {
    revalidateTag('patients');
  }

  return res;
};

export const updateRelatives = async (
  patientId: number,
  data: Patients.StorePatientRelatives.RequestBody
) => {
  const res = await apiClient<Patients.StorePatientRelatives.ResponseBody>(
    `/patients/${patientId}/relatives`,
    {
      method: 'PUT',
      body: data,
    }
  );

  if (res.success) {
    revalidateTag('patients');
  }

  return res;
};

export const getPatientTreatmentPlans = async (patientId: string) => {
  return await apiClient<TreatmentPlans.GetPatientTreatmentPlans.ResponseBody>(
    `/treatment-plans/patient/${patientId}`,
    {
      next: {
        tags: [`patient-treatment-plans-${patientId}`],
        revalidate: 3600,
      },
    }
  );
};
