import React from 'react';

import cx from 'classnames';
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

export function formatDuration(seconds: number) {
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
      <div className="flex flex-col w-full">
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
              <div className="flex items-center flex-wrap gap-x-4 gap-y-1.5 py-1.5 text-xs text-gray-600">
                {visitDate ? (
                  <div className="flex items-center gap-1">
                    <Calendar size={20} className="h-4 w-4" />
                    <span
                      className={cx({
                        'text-danger': !visit.is_working_day,
                      })}
                    >
                      {formatInTimeZone(
                        new Date(visitDate),
                        'UTC',
                        'yyyy-MM-dd HH:mm'
                      )}
                    </span>
                  </div>
                ) : null}
                {visit.duration ? (
                  <div className="flex items-center gap-1">
                    <Clock size={20} className="h-4 w-4" />
                    {formatDuration(visit.duration)}
                  </div>
                ) : null}

                <div
                  className={cx('flex items-center gap-1', {
                    'text-danger': !visit.bed?.name,
                  })}
                >
                  <MapPin size={20} className="h-4 w-4" />
                  {visit.bed?.name
                    ? `${visit.room?.name} - ${visit.bed.name}`
                    : 'No Spot'}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
