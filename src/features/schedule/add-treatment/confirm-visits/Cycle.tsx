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
import { TreatmentCycleResource } from '@/types/swagger/data-contracts';

interface CycleProps {
  cycle: TreatmentCycleResource;
  showFUllDetails?: boolean;
  index: number;
}

export default function Cycle({ cycle, index, showFUllDetails }: CycleProps) {
  const [isOpen, setIsOpen] = React.useState<boolean>(true);

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
                  Cycle {index + 1}
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
          <CardContent className="bg-white px-0">
            <div className="space-y-2 px-5 bg-primary/5">
              {cycle.visits?.map((visit, idx) => (
                <div
                  key={visit.id}
                  className="p-2 border-b border-primary/10 py-2"
                >
                  <Visit
                    visit={visit}
                    no={idx + 1}
                    showFUllDetails={showFUllDetails}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
