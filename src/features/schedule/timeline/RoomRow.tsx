'use client';

import type React from 'react';
import { useState } from 'react';

import cx from 'classnames';
import { ChevronDown, ChevronRight } from 'lucide-react';

import { TableCell, TableRow } from '@/commons/components/ui/table';
import { RoomResource } from '@/types/swagger/data-contracts';

interface RoomRowProps {
  room: RoomResource;
  timeSlots: string[];
  renderAppointment: (
    roomId: number,
    bedId: number,
    timeSlot: string
  ) => React.ReactNode;
  isCurrentHour: (timeSlot: string) => boolean;
  expandedByDefault?: boolean;
}

export function timeToMinutes(timeString?: string): number {
  if (!timeString) return 0;
  const [hours, minutes] = timeString?.split(':').map(Number);
  return hours * 60 + minutes;
}

function isTimeWithinWorkingHours(
  room: RoomResource,
  timeSlot: string
): boolean {
  const slotMinutes = timeToMinutes(timeSlot);
  const startMinutes = timeToMinutes(room.work_start_time);
  const endMinutes = timeToMinutes(room.work_end_time);

  return slotMinutes >= startMinutes && slotMinutes < endMinutes;
}

export function RoomRow({
  room,
  timeSlots,
  renderAppointment,
  isCurrentHour,
  expandedByDefault = true,
}: RoomRowProps) {
  const [isExpanded, setIsExpanded] = useState(expandedByDefault);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* Room row */}
      <TableRow>
        <TableCell
          style={{
            position: 'sticky',
            left: 0,
            zIndex: 50, // Increased z-index to 50
            backgroundColor: 'white',
            borderRight: '1px solid #e5e7eb',
            borderBottom: 'none',
            padding: 0,
          }}
        >
          <div
            className="h-12 px-4 flex items-center justify-between cursor-pointer"
            onClick={toggleExpand}
          >
            <div className="flex items-center">
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 mr-2" />
              ) : (
                <ChevronRight className="h-4 w-4 mr-2" />
              )}
              {room.name}
            </div>
          </div>
        </TableCell>

        {/* Time slots for room */}
        {timeSlots.map(slot => (
          <TableCell
            key={`room-${room.id}-${slot}`}
            className={cx({
              'bg-primary/5 border-primary/20': isCurrentHour(slot),
              'bg-danger/10 cursor-not-allowed': !isTimeWithinWorkingHours(
                room,
                slot
              ),
              'cursor-pointer hover:bg-gray-50': isTimeWithinWorkingHours(
                room,
                slot
              ),
            })}
            style={{
              borderRight:
                slot !== timeSlots[timeSlots.length - 1]
                  ? '1px solid #e5e7eb'
                  : 'none',
              borderBottom: 'none',
              padding: 0,
            }}
          >
            <div className="h-12 relative" />
          </TableCell>
        ))}
      </TableRow>

      {/* Bed rows if expanded */}
      {isExpanded &&
        room.beds?.map(bed => (
          <TableRow key={`bed-${bed.id}`}>
            <TableCell
              style={{
                position: 'sticky',
                left: 0,
                zIndex: 50, // Increased z-index to 50
                backgroundColor: 'white',
                borderRight: '1px solid #e5e7eb',
                borderBottom: 'none',
                padding: 0,
              }}
            >
              <div className="h-12 px-4 py-3 pl-10 flex items-center text-sm">
                {bed.name}
              </div>
            </TableCell>

            {/* Time slots for bed */}
            {timeSlots.map(slot => (
              <TableCell
                key={`bed-${bed.id}-${slot}`}
                className={cx({
                  'bg-primary/5 border-primary/20': isCurrentHour(slot),
                  'bg-danger/10 cursor-not-allowed': !isTimeWithinWorkingHours(
                    room,
                    slot
                  ),
                  'cursor-pointer hover:bg-gray-50': isTimeWithinWorkingHours(
                    room,
                    slot
                  ),
                })}
                style={{
                  position: 'relative',
                  borderRight:
                    slot !== timeSlots[timeSlots.length - 1]
                      ? '1px solid #e5e7eb'
                      : 'none',
                  borderBottom: 'none',
                  padding: 0,
                }}
              >
                <div className="h-12">
                  {renderAppointment(room.id ?? 1, bed.id ?? 1, slot)}
                </div>
              </TableCell>
            ))}
          </TableRow>
        ))}
    </>
  );
}
