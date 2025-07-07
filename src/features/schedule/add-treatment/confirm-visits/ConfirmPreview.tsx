'use client';

import React, { useState } from 'react';

import { format } from 'date-fns';
import { ChevronDown, ChevronUp } from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/commons/components/ui/collapsible';
import { Visits } from '@/types/swagger/VisitsRoute';

interface Props {
  visit: Visits.GetVisit.ResponseBody;
}

export const VisitPreview: React.FC<Props> = ({ visit }) => {
  const [openCycles, setOpenCycles] = useState<number[]>([1]);

  const toggleCycle = (cycleId: number) => {
    setOpenCycles(prev =>
      prev.includes(cycleId)
        ? prev.filter(id => id !== cycleId)
        : [...prev, cycleId]
    );
  };

  return (
    <div className="w-full mx-auto p-0 space-y-8">
      {/* Patient Information */}
      <div className="p-0">
        <div className="bg-primary/20 p-2 px-4 rounded-tl-lg rounded-tr-lg">
          <div>Patient information</div>
        </div>
        <div className="space-y-4 p-0 p-4 bg-primary/5 rounded-bl-lg rounded-br-lg text-sm">
          <div className="grid grid-cols-[140px_1fr] gap-4">
            <div className="text-gray-600">Patient name:</div>
            <div className="font-medium">{visit?.data?.patient?.name}</div>

            <div className="text-gray-600">National ID:</div>
            <div className="font-medium">
              {visit?.data?.patient?.personal_code}
            </div>

            <div className="text-gray-600">Body metrics:</div>
            <div className="font-medium">
              {visit?.data?.patient?.weight}kg {visit?.data?.patient?.height}cm
            </div>

            <div className="text-gray-600">Email:</div>
            <div className="font-medium">{visit?.data?.patient?.email}</div>

            <div className="text-gray-600">Phone number:</div>
            <div className="font-medium">
              {visit?.data?.patient?.phone_number}
            </div>

            <div className="text-gray-600">Address:</div>
            <div className="font-medium">{visit?.data?.patient?.address}</div>
          </div>
        </div>
      </div>

      {/* Treatment Information */}
      <div className="p-0">
        <div className="bg-primary/20 p-2 px-4 rounded-tl-lg rounded-tr-lg">
          <div>Treatment information</div>
        </div>
        <div className="space-y-4 p-0 p-4 bg-primary/5 rounded-bl-lg rounded-br-lg text-sm">
          <div className="grid grid-cols-[140px_1fr] gap-4">
            <div className="text-gray-600">Treatment plan:</div>
            <div className="font-medium">
              {visit?.data?.treatment_plan?.name}
            </div>

            <div className="text-gray-600">Start date:</div>
            <div className="font-medium">
              {visit.data?.date_time
                ? format(visit.data?.date_time, 'yyyy-MM-dd')
                : '-'}
            </div>
          </div>
        </div>
      </div>

      {/* Treatment Schedule */}
      <div className="p-0">
        <div className="bg-primary/20 p-2 px-4 rounded-tl-lg rounded-tr-lg">
          <div>Treatment Schedule</div>
        </div>
        <div className="space-y-4 p-0 p-4 bg-primary/5 rounded-bl-lg rounded-br-lg text-sm">
          {visit?.data?.treatment_plan?.treatment_cycles?.map(cycle => (
            <Collapsible
              key={cycle.id}
              open={openCycles.includes(cycle.id as number)}
              onOpenChange={() => toggleCycle(cycle.id as number)}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left hover:bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-800">{cycle.name}</span>
                {openCycles.includes(cycle.id as number) ? (
                  <ChevronUp className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-6 space-y-2">
                {cycle.visits?.map((cycleVisit, index) => (
                  <div
                    key={cycleVisit.id}
                    className="flex items-center gap-4 py-2 text-sm"
                  >
                    <span className="text-gray-600 w-12">
                      Visit {index + 1}:
                    </span>
                    <span className="font-mono">{cycleVisit.date_time}</span>
                    <span className="text-gray-600">
                      {cycleVisit.bed?.name}
                    </span>
                    <span className="text-gray-600">
                      {cycleVisit.duration}min
                    </span>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
};
