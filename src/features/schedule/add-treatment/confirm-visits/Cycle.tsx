'use client';

import React from 'react';

import { ChevronDown, ChevronUp } from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/commons/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/commons/components/ui/collapsible';
import { Visit } from '@/features/schedule/add-treatment/confirm-visits/Visit';
import {
  TreatmentCycleResource,
  TreatmentCycleStatus,
  TreatmentPlanResource,
} from '@/types/swagger/data-contracts';

interface CycleProps {
  cycle: TreatmentCycleResource;
  showFUllDetails?: boolean;
  onReschedule?: (data: TreatmentPlanResource) => void;
  index: number;
}

export default function Cycle({
  cycle,
  index,
  showFUllDetails,
  onReschedule,
}: CycleProps) {
  const shouldBeOpen =
    cycle.status === TreatmentCycleStatus.Planned ||
    cycle.status === TreatmentCycleStatus.InProgress;
  const [isOpen, setIsOpen] = React.useState<boolean>(shouldBeOpen ?? true);

  return (
    <Card className="overflow-hidden bg-primary/10 py-0 px-0 border-0 shadow-none rounded-none border-b border-primary/20">
      <Collapsible open={isOpen} onOpenChange={() => setIsOpen(prev => !prev)}>
        <CollapsibleTrigger
          asChild={true}
          className="flex items-center justify-between w-full"
        >
          <CardHeader className="cursor-pointer transition-colors py-1">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3 bg-white rounded-lg px-1.5 py-1 text-sm">
                <CardTitle className="text-md font-semibold text-primary">
                  Cycle {index}
                </CardTitle>
              </div>
              <div className="flex items-center gap-2">
                {isOpen ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent className="bg-primary/5">
          <CardContent className="bg-white px-0 overflow-y-scroll">
            <div className="px-5 bg-primary/5">
              {cycle.visits?.length === 0 ? (
                <div className="text-gray-500 text-sm py-4">
                  Cycle visits are not yet planned
                </div>
              ) : (
                <>
                  {cycle.visits?.map((visit, idx) => (
                    <div
                      key={visit.id}
                      className="p-2 border-b border-primary/10 py-2 overflow-y-auto"
                    >
                      <Visit
                        visit={visit}
                        no={idx + 1}
                        showFUllDetails={showFUllDetails}
                        onReschedule={onReschedule}
                      />
                    </div>
                  ))}
                </>
              )}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
