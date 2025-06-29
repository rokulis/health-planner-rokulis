'use client';

import React from 'react';

import { Calendar, Clock, Syringe } from 'lucide-react';

import { Badge } from '@/commons/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/commons/components/ui/card';
import { Patients } from '@/types/swagger/PatientsRoute';

interface Props {
  patient: Patients.GetPatient.ResponseBody;
}

export const PatientTreatmentPlans: React.FC<Props> = ({ patient }) => {
  const treatmentPlan = patient.data?.treatment_plans?.[0];
  const currentCycle =
    patient.data?.treatment_plans?.[0]?.treatment_cycles?.[0];

  // Flatten all medicines from all groups
  const allMedicines =
    currentCycle?.treatment_medicine_groups?.flatMap(group =>
      group.treatment_medicines?.map(tm => ({
        ...tm,
        duration: group.duration,
        treatment_days: group.treatment_days,
      }))
    ) || [];

  return (
    <Card className="border-gray-200 shadow-sm mx-4 my-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 px-0">
        <h2 className="text-xl font-semibold text-gray-900">Treatment plan</h2>
      </CardHeader>

      <CardContent className="px-0">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-medium">
            {treatmentPlan?.name || 'Treatment Protocol'}
          </h3>
        </div>

        {/* Medicines List */}
        <div className="space-y-6">
          {allMedicines.map((medicine, index) => (
            <div key={`${medicine?.id}-${index}`} className="space-y-3">
              {/* Medicine Header */}
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-medium">
                  {medicine?.medicine?.name}
                </h4>
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-700 hover:bg-purple-100"
                >
                  {medicine?.medicine?.atc_code}
                </Badge>
              </div>

              {/* Medicine Details */}
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{medicine?.treatment_days}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{medicine?.duration}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Syringe className="h-4 w-4" />
                  <span>{medicine?.dose}</span>
                </div>
              </div>

              {medicine?.comment && (
                <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
                  {medicine?.comment}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Treatment Plan Info */}
        <div className="pt-4 border-t">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium">Status:</span>
              <span className="ml-2 capitalize">{treatmentPlan?.status}</span>
            </div>
            <div>
              <span className="font-medium">Cycles:</span>
              <span className="ml-2">{treatmentPlan?.cycles}</span>
            </div>
            <div>
              <span className="font-medium">Days Between:</span>
              <span className="ml-2">{treatmentPlan?.days_between_cycles}</span>
            </div>
            <div>
              <span className="font-medium">Patient:</span>
              <span className="ml-2">{treatmentPlan?.patient?.name}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
