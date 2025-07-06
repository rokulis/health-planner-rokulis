'use client';

import React from 'react';

import { Calendar, Clock, TestTubeDiagonal } from 'lucide-react';

import { NumberedSteps } from '@/commons/components/numbered-steps/NumberedSteps';
import { Badge } from '@/commons/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/commons/components/ui/card';
import { Patients } from '@/types/swagger/PatientsRoute';
import { TreatmentPlans } from '@/types/swagger/TreatmentPlansRoute';

interface Props {
  patient: Patients.GetPatient.ResponseBody;
  treatmentPlans: TreatmentPlans.GetPatientTreatmentPlans.ResponseBody;
  activeTreatmentPlan: TreatmentPlans.GetTreatmentPlan.ResponseBody;
}

export const PatientTreatmentPlans: React.FC<Props> = ({
  activeTreatmentPlan,
}) => {
  return (
    <Card className="border-gray-200 shadow-sm mx-4 my-4 p-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 px-0">
        <h2 className="text-xl font-semibold text-gray-900">Treatment plan</h2>
      </CardHeader>

      <CardContent className="px-0">
        <div className="flex items-center justify-between bg-primary/5 p-2 rounded-md">
          <h3 className="text-md font-medium">
            {activeTreatmentPlan.data?.name || 'Treatment Protocol'}
          </h3>
        </div>

        <div className="flex flex-col gap-12 w-full mt-4 p-2">
          {activeTreatmentPlan.data?.treatment?.map((treatment, idx) => (
            <div key={treatment.id}>
              <NumberedSteps
                number={idx + 1}
                className="w-full flex flex-col gap-4"
              >
                {treatment?.treatment_medicines?.map((medicine, i) => (
                  <div className="flex flex-col" key={i}>
                    <div className="flex justify-between w-full">
                      <span className="font-semibold text-sm">
                        {medicine.medicine?.name}
                      </span>
                      <Badge>{medicine.medicine?.atc_code}</Badge>
                    </div>
                    <div className="flex gap-6 text-sm text-gray-600">
                      {treatment.treatment_days ? (
                        <div className="flex items-center gap-1">
                          <Calendar size={18} />
                          {treatment.treatment_days.map(day => (
                            <div
                              className="rounded-full w-5 h-5 p-1 flex items-center justify-center bg-primary/10 text-xs"
                              key={`${medicine.id}-${day}`}
                            >
                              {day}
                            </div>
                          ))}
                        </div>
                      ) : null}

                      {medicine.medicine?.default_time ? (
                        <div className="flex gap-1">
                          <Clock size={18} /> {medicine.medicine?.default_time}
                        </div>
                      ) : null}

                      {medicine.dose ? (
                        <div className="flex gap-1">
                          <TestTubeDiagonal size={18} /> {medicine.dose}
                        </div>
                      ) : null}
                    </div>
                    {medicine.comment ? (
                      <div className="border border-gray-200 text-gray-600 rounded-lg p-1 text-sm">
                        {medicine.comment || '-'}
                      </div>
                    ) : null}
                  </div>
                ))}
              </NumberedSteps>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
