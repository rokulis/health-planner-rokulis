'use client';

import { ChevronDown, ChevronUp, Clock, MapPin, Calendar } from 'lucide-react';

import { Badge } from '@/commons/components/ui/badge';
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
  isOpen: boolean;
  onToggle: () => void;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  if (hours > 0) {
    return `${hours}h ${minutes > 0 ? `${minutes}min` : ""}`
  }
  return `${minutes}min`
}

export default function Cycle({ cycle, isOpen, index, onToggle }: CycleProps) {
  return (
    <Card className="overflow-hidden bg-primary/5 py-2 border-0 shadow-none rounded-sm border-b border-primary/50">
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <CollapsibleTrigger asChild={true} className="flex items-center justify-between w-full">
          <CardHeader className="cursor-pointer transition-colors">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <CardTitle className="text-md font-semibold text-primary">
                  Cycle {index + 1}
                </CardTitle>
                {cycle.start_date ? (
                  <div className="text-xs text-gray-500">
                    {formatDate(cycle.start_date)}
                  </div>
                ) : null}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {cycle.visits?.length} visits
                </Badge>
                {isOpen ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="py-2">
            <div className="space-y-2">
              {cycle.visits?.map((visit, idx) => (
                <div
                  key={visit.id}
                  className="p-2 bg-gray-50 rounded-md"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium text-black text-sm">
                        Visit {idx + 1}
                      </h4>
                      <div className="flex items-center gap-4 text-xs text-gray-600">
                        {visit.date_time ? (
                          <div className="flex items-center gap-1">
                            <Calendar size={20} className="h-4 w-4" />
                            {formatDate(visit.date_time)}
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
                          Bed {visit.bed_id}
                        </div>
                      </div>
                    </div>
                    <Badge variant="default" className="text-xs capitalize">
                      {visit.status}
                    </Badge>
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
