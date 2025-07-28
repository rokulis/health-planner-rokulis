import React from 'react';

import { formatInTimeZone } from 'date-fns-tz';
import { Calendar, Clock, MapPin, Pencil } from 'lucide-react';

import { VisitStatusBadge } from '@/commons/components/visit-status-badge/VisitStatusBadge';
import { VisitReschedule } from '@/features/schedule/add-treatment/confirm-visits/VisitReschedule';
import { VisitResource } from '@/types/swagger/data-contracts';

interface Props {
  visit: VisitResource;
  showFUllDetails?: boolean;
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

export const Visit: React.FC<Props> = ({ showFUllDetails, visit, no }) => {
  const [editMode, setEditMode] = React.useState<boolean>(false);

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
              onFinish={() => setEditMode(false)}
              onCancel={() => setEditMode(false)}
            />
          </div>
        ) : (
          <>
            <div className="flex justify-between w-full items-center">
              <h4 className="font-medium text-black text-sm">Visit {no} </h4>
              {showFUllDetails && visit.status ? (
                <VisitStatusBadge status={visit.status} />
              ) : null}
            </div>
            <div className="flex justify-between items-center">
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
                  {visit.bed?.name ? (
                    visit.bed.name
                  ) : (
                    <span className="text-danger">No Spot</span>
                  )}
                </div>
              </div>
              <button
                className="cursor-pointer"
                onClick={() => setEditMode(prev => !prev)}
              >
                <Pencil size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
