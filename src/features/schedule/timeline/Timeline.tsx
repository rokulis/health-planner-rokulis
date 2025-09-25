'use client';

import { useEffect, useRef, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { useActionContext } from '@/commons/action-context-provider/useActionContext';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/commons/components/ui/table';
import { RoomRow } from '@/features/schedule/timeline/RoomRow';
import {
  ParsedVisitTime,
  processVisitTime,
} from '@/features/schedule/utils/date-utils';
import { cn } from '@/lib/utils';
import {
  RoomResource,
  VisitResource,
  VisitStatusEnum,
} from '@/types/swagger/data-contracts';

// Fixed cell width for time slots
const TIME_CELL_WIDTH = 60;
const TIME_INTERVAL = 15; // minutes

interface Props {
  rooms?: Array<RoomResource>;
  schedule?: Array<VisitResource>;
}

type Appointment = VisitResource & ParsedVisitTime;

export default function HospitalTimeline({ rooms, schedule }: Props) {
  const { dispatchAction } = useActionContext();
  const searchParams = useSearchParams();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  const appointments = schedule?.map(s => ({
    ...s,
    ...processVisitTime(s.date_time, s.end_time),
  }));

  // State for current time
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const generateTimeSlots = () => {
    let minHour = 10;
    let maxHour = 17;

    rooms?.forEach(room => {
      if (room.work_start_time) {
        const startHour = parseInt(room.work_start_time.split(':')[0], 10);
        if (startHour < minHour) {
          minHour = startHour;
        }
      }
      if (room.work_end_time) {
        const timeParts = room.work_end_time.split(':');
        const endHour = parseInt(room.work_end_time.split(':')[0], 10);
        if (endHour > maxHour) {
          if (timeParts[1] === '00') {
            maxHour = endHour;
          } else {
            maxHour = endHour + 1;
          }
        }
      }
    });

    const slots = [];
    for (let hour = minHour; hour <= maxHour; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);

      if (hour < maxHour) {
        slots.push(`${hour.toString().padStart(2, '0')}:15`);
        slots.push(`${hour.toString().padStart(2, '0')}:30`);
        slots.push(`${hour.toString().padStart(2, '0')}:45`);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Check if a time slot is the current hour
  const isCurrentHour = (timeSlot: string): boolean => {
    const now = currentTime;
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const [slotHour, slotMinute] = timeSlot.split(':').map(Number);

    // Check if the slot matches the current hour
    if (slotHour === currentHour) {
      // For XX:00 slots, it's current if minutes are 0-14
      if (slotMinute === 0) {
        return currentMinute >= 0 && currentMinute < 5;
      }
      // For XX:15 slots, it's current if minutes are 15-29
      if (slotMinute === 15) {
        return currentMinute >= 15 && currentMinute < 20;
      }
      // For XX:30 slots, it's current if minutes are 30-44
      if (slotMinute === 30) {
        return currentMinute >= 30 && currentMinute < 35;
      }
      // For XX:45 slots, it's current if minutes are 45-59
      if (slotMinute === 45) {
        return currentMinute >= 45 && currentMinute < 50;
      }
      return false;
    }

    return false;
  };

  // Get appointment background color based on type
  const getAppointmentBgColor = (status?: VisitStatusEnum) => {
    switch (status) {
      case VisitStatusEnum.Completed:
        return 'bg-[#22ADD0] text-white';

      default:
        return 'bg-[#190B45] text-white';
    }
  };

  // Format date for display
  const formatDisplayDate = () => {
    const dateParam = searchParams.get('date');
    const date = dateParam ? new Date(dateParam) : new Date();
    return `${date.toLocaleDateString('en-US', { weekday: 'long' })}, ${date.toLocaleDateString('en-US', { month: 'long' })} ${date.getDate()}`;
  };

  // Helper function to convert time string to minutes since midnight
  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Find appointments for a specific bed
  const findAppointmentsForBed = (roomId: number, bedId: number) => {
    return appointments?.filter(
      appt => appt?.room_id === roomId && appt?.bed_id === bedId
    );
  };

  const shouldDisplayAppointment = (
    roomId: number,
    bedId: number,
    timeSlot: string,
    appointment: Appointment
  ) => {
    const slotStartMinutes = timeToMinutes(timeSlot);
    const slotEndMinutes = slotStartMinutes + TIME_INTERVAL;
    const apptStartMinutes = timeToMinutes(appointment.start_time);

    return (
      apptStartMinutes >= slotStartMinutes && apptStartMinutes < slotEndMinutes
    );
  };

  // Calculate appointment width in time slots
  const calculateAppointmentWidth = (appointment: Appointment): number => {
    const startIndex = timeSlots.findIndex(
      slot =>
        timeToMinutes(slot) <= timeToMinutes(appointment.start_time) &&
        timeToMinutes(appointment.start_time) <
          timeToMinutes(slot) + TIME_INTERVAL
    );
    let endIndex = timeSlots.findIndex(
      slot => timeToMinutes(slot) >= timeToMinutes(appointment.end_time)
    );

    // If the end time doesn't exactly match a time slot, we need to adjust
    if (endIndex === -1) endIndex = timeSlots.length;

    return endIndex - startIndex;
  };

  // Render appointment for a specific bed and time slot
  const renderAppointment = (
    roomId: number,
    bedId: number,
    timeSlot: string
  ) => {
    const bedAppointments = findAppointmentsForBed(roomId, bedId);
    const appointmentForSlot = bedAppointments?.find(appt =>
      shouldDisplayAppointment(roomId, bedId, timeSlot, appt)
    );

    if (appointmentForSlot) {
      const span = calculateAppointmentWidth(appointmentForSlot);
      const width = span * TIME_CELL_WIDTH - 2;

      return (
        <button
          className={cn(
            'absolute top-1 left-0  border rounded-full py-1 px-2 text-sm h-10 flex items-center z-40 cursor-pointer overflow-hidden',
            getAppointmentBgColor(appointmentForSlot.status)
          )}
          style={{
            width: `${width}px`,
            maxWidth: 'none',
          }}
          onClick={() =>
            dispatchAction('visit_view', { id: appointmentForSlot.id })
          }
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'inline-flex items-center justify-center bg-[#E4E7EC] text-primary rounded-full w-6 h-6 flex-shrink-0'
                )}
              >
                {appointmentForSlot?.patient?.name?.[0].toUpperCase()}
              </span>
              <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                {appointmentForSlot?.patient?.name}
              </span>
            </div>
            {width > 120 ? (
              <span className="text-xs">
                {appointmentForSlot.start_time} - {appointmentForSlot.end_time}
              </span>
            ) : null}
          </div>
        </button>
      );
    }

    // Check if this cell is part of a spanning appointment
    const isPartOfSpanningAppointment = bedAppointments?.some(appt => {
      const apptStartMinutes = timeToMinutes(appt.start_time);
      const apptEndMinutes = timeToMinutes(appt.end_time);
      const slotStartMinutes = timeToMinutes(timeSlot);
      const slotEndMinutes = slotStartMinutes + TIME_INTERVAL;

      // Check if this slot is within the appointment time range but not the starting slot
      return (
        slotStartMinutes >= apptStartMinutes &&
        slotEndMinutes <= apptEndMinutes &&
        !shouldDisplayAppointment(roomId, bedId, timeSlot, appt)
      );
    });

    if (isPartOfSpanningAppointment) {
      return null;
    }

    return null;
  };

  return (
    <div className="overflow-hidden bg-white shadow-sm">
      <div className="bg-white p-2 border-b border-primary/20">
        <h2 className="text-md font-medium">{formatDisplayDate()}</h2>
      </div>

      <div className="relative">
        <div
          className="overflow-auto max-h-[calc(100vh-120px)]"
          ref={scrollContainerRef}
          style={{ position: 'relative' }}
        >
          <div className="relative" style={{ overflow: 'hidden' }}>
            <Table className="border-collapse" ref={tableRef}>
              <TableHeader className="sticky top-0 z-20">
                <TableRow className="bg-white">
                  <TableHead
                    style={{
                      width: 220,
                      minWidth: 220,
                      maxWidth: 220,
                      position: 'sticky',
                      left: 0,
                      zIndex: 50,
                      backgroundColor: 'white',
                      borderRight: '1px solid #e5e7eb',
                      borderBottom: '1px solid #e5e7eb',
                    }}
                    className="h-[40px] text-center font-normal"
                  >
                    <div className="h-[40px] flex items-center px-4 font-medium">
                      Rooms
                    </div>
                  </TableHead>

                  {timeSlots.map(slot => (
                    <TableHead
                      key={slot}
                      style={{
                        width: TIME_CELL_WIDTH,
                        minWidth: TIME_CELL_WIDTH,
                        maxWidth: TIME_CELL_WIDTH,
                        borderRight:
                          slot !== timeSlots[timeSlots.length - 1]
                            ? '1px solid #e5e7eb'
                            : 'none',
                        borderBottom: '1px solid #e5e7eb',
                        backgroundColor: isCurrentHour(slot)
                          ? 'rgba(var(--primary), 0.3)'
                          : 'white',
                      }}
                      className="h-[40px] text-center font-normal"
                    >
                      <div className="h-[40px] flex items-center justify-center text-xs font-normal">
                        {slot}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Room rows */}
                {rooms?.map(room => (
                  <RoomRow
                    expandedByDefault={appointments?.some(
                      appt => appt.room_id === room.id
                    )}
                    key={room.id}
                    room={room}
                    timeSlots={timeSlots}
                    renderAppointment={renderAppointment}
                    isCurrentHour={isCurrentHour}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
