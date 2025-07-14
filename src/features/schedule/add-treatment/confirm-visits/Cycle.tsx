'use client';

import React from 'react';

import { formatInTimeZone } from 'date-fns-tz';
import { ChevronDown, ChevronUp, Clock, MapPin, Calendar } from 'lucide-react';

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
import { TreatmentCycleResource } from '@/types/swagger/data-contracts';

interface CycleProps {
  cycle: TreatmentCycleResource;
  index: number;
}

function formatDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes > 0 ? `${minutes}min` : ''}`;
  }
  return `${minutes}min`;
}

export default function Cycle({ cycle, index }: CycleProps) {
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
              <div className="flex items-center gap-3 bg-white px-1.5 py-1 text-sm">
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
                <div key={visit.id} className="p-2 border-b border-primary/10 py-2">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium text-black text-sm">
                        Visit {idx + 1}
                      </h4>
                      <div className="flex items-center gap-4 text-xs text-gray-600">
                        {visit.date_time ? (
                          <div className="flex items-center gap-1">
                            <Calendar size={20} className="h-4 w-4" />
                            {formatInTimeZone(
                              new Date(visit.date_time),
                              'UTC',
                              'yyyy-MM-dd HH:mm'
                            )}
                          </div>
                        ) : null}
                        {visit.duration ? (
                          <div className="flex items-center gap-1">
                            <Clock size={20} className="h-4 w-4" />
                            {formatDuration(visit.duration)}
                          </div>
                        ) : null}

                        <div className="flex items-center gap-1">
                          <MapPin size={20} className="h-4 w-4" />
                          {visit.bed?.name}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
