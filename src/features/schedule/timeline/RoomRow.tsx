'use client';

import type React from 'react';
import { useState } from 'react';

import cx from 'classnames';
import { ChevronDown, ChevronRight, Plus } from 'lucide-react';

import { Button } from '@/commons/components/ui/button';
import { TableCell, TableRow } from '@/commons/components/ui/table';

// Types
type BedType = 'Bed' | 'Chair';

interface Bed {
  id: string;
  name: string;
  type: BedType;
}

interface Room {
  id: string;
  name: string;
  beds: Bed[];
}

interface RoomRowProps {
  room: Room;
  timeSlots: string[];
  onAddBed: (roomId: string) => void;
  handleCellClick: (
    roomName: string,
    bedName: string | null,
    timeSlot: string
  ) => void;
  renderAppointment: (
    roomId: string,
    bedId: string,
    timeSlot: string
  ) => React.ReactNode;
  isCurrentHour: (timeSlot: string) => boolean;
  specialMarker?: {
    roomId: string;
    timeSlot: string;
    content: React.ReactNode;
  };
}

export function RoomRow({
  room,
  timeSlots,
  onAddBed,
  handleCellClick,
  renderAppointment,
  isCurrentHour,
  specialMarker,
}: RoomRowProps) {
  const [isExpanded, setIsExpanded] = useState(
    room.id === 'unassigned' || room.id === 'room-c' || room.id === 'room-d'
  );

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
            className={`h-12 px-4 flex items-center justify-between cursor-pointer ${
              room.id === 'unassigned' ? 'text-red-600' : ''
            }`}
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
            {room.id === 'unassigned' && (
              <div className="bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center text-xs text-red-600">
                {room.beds.length}
              </div>
            )}
          </div>
        </TableCell>

        {/* Time slots for room */}
        {timeSlots.map(slot => (
          <TableCell
            key={`room-${room.id}-${slot}`}
            className={cx({
              'bg-primary/5 border-primary/20': isCurrentHour(slot),
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
            <div
              className="h-12 relative cursor-pointer hover:bg-gray-50"
              onClick={() => handleCellClick(room.name, null, slot)}
            >
              {specialMarker &&
                specialMarker.roomId === room.id &&
                specialMarker.timeSlot === slot &&
                specialMarker.content}
            </div>
          </TableCell>
        ))}
      </TableRow>

      {/* Bed rows if expanded */}
      {isExpanded &&
        room.beds.map(bed => (
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
                <div
                  className="h-12 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleCellClick(room.name, bed.name, slot)}
                >
                  {renderAppointment(room.id, bed.id, slot)}
                </div>
              </TableCell>
            ))}
          </TableRow>
        ))}

      {/* Add Bed row if expanded and not unassigned */}
      {isExpanded && room.id !== 'unassigned' && (
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
            <div className="h-12 px-4 py-3 pl-10 flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="text-sm flex items-center text-gray-500"
                onClick={e => {
                  e.stopPropagation();
                  onAddBed(room.id);
                }}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Bed
              </Button>
            </div>
          </TableCell>

          {/* Empty time slots for Add Bed row */}
          {timeSlots.map(slot => (
            <TableCell
              key={`add-bed-${room.id}-${slot}`}
              className={cx({
                'bg-primary/5 border-primary/20': isCurrentHour(slot),
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
              <div
                className="h-12 cursor-pointer hover:bg-gray-50"
                onClick={() => handleCellClick(room.name, 'Add Bed', slot)}
              />
            </TableCell>
          ))}
        </TableRow>
      )}
    </>
  );
}
