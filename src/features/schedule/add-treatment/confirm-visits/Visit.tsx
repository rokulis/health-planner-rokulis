import React from 'react';

import { formatInTimeZone } from 'date-fns-tz';
import { Calendar, Clock, MapPin, Pencil } from 'lucide-react';

import { VisitStatusBadge } from '@/commons/components/visit-status-badge/VisitStatusBadge';
import { VisitReschedule } from '@/features/schedule/add-treatment/confirm-visits/VisitReschedule';
import {
  TreatmentPlanResource,
  VisitResource,
  VisitStatusEnum,
} from '@/types/swagger/data-contracts';

interface Props {
  visit: VisitResource;
  showFUllDetails?: boolean;
  onReschedule?: (data: TreatmentPlanResource) => void;
  no: number;
}

function formatDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes > 0 ? `${minutes}min` : ''}`;
  }
  return `${minutes}min`;
}

export const Visit: React.FC<Props> = ({
  showFUllDetails,
  visit,
  no,
  onReschedule,
}) => {
  const [editMode, setEditMode] = React.useState<boolean>(false);

  if (!visit) {
    return null;
  }

  const visitDate = visit.date_time ?? visit.date;

  return (
    <div className="flex items-start w-full justify-between">
      <div className="space-y-1 w-full">
        {editMode ? (
          <div className="flex flex-col gap-4">
            <div className="font-bold text-sm text-gray-600">
              Edit Visit {no}
            </div>
            <VisitReschedule
              visit={visit}
              onFinish={data => {
                onReschedule?.(data);
                setEditMode(false);
              }}
              onCancel={() => setEditMode(false)}
            />
          </div>
        ) : (
          <>
            <div className="flex justify-between w-full items-center">
              <h4 className="font-medium text-black text-sm">Visit {no} </h4>
              <div className="flex gap-2 items-center">
                {showFUllDetails && visit.status ? (
                  <VisitStatusBadge status={visit.status} />
                ) : null}
                {visit.status !== VisitStatusEnum.Completed ? (
                  <button
                    className="cursor-pointer"
                    onClick={() => setEditMode(prev => !prev)}
                  >
                    <Pencil size={16} />
                  </button>
                ) : null}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center flex-wrap space-x-4 space-y-2 text-xs text-gray-600">
                {visitDate ? (
                  <div className="flex items-center gap-1">
                    <Calendar size={20} className="h-4 w-4" />
                    {formatInTimeZone(
                      new Date(visitDate),
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
                  {visit.bed?.name ? (
                    visit.bed.name
                  ) : (
                    <div className="text-danger">No Spot</div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
