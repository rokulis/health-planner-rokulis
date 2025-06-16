'use client';

import { useEffect, useRef, useState } from 'react';

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
  VisitResourceStatusEnum,
} from '@/types/swagger/data-contracts';

// Fixed cell width for time slots
const TIME_CELL_WIDTH = 80;

interface Props {
  rooms?: Array<RoomResource>;
  schedule?: Array<VisitResource>;
}

type Appointment = VisitResource & ParsedVisitTime;

export default function HospitalTimeline({ rooms, schedule }: Props) {
  // Ref for the scrollable container
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  const appointments = schedule?.map(s => ({
    ...s,
    ...processVisitTime(s.date_time, s.duration),
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

  // Generate time slots from 9:00 to 17:30 in 30-minute intervals
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 17; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      if (hour < 17) {
        slots.push(`${hour.toString().padStart(2, '0')}:30`);
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
      // For XX:00 slots, it's current if minutes are 0-29
      if (slotMinute === 0) {
        return currentMinute < 30;
      }
      // For XX:30 slots, it's current if minutes are 30-59
      else if (slotMinute === 30) {
        return currentMinute >= 30;
      }
    }

    return false;
  };

  // Get appointment background color based on type
  const getAppointmentBgColor = (status?: VisitResourceStatusEnum) => {
    switch (status) {
      case VisitResourceStatusEnum.Completed:
        return 'bg-green-100';
      case VisitResourceStatusEnum.InProgress:
        return 'bg-yellow-100';
      case VisitResourceStatusEnum.Paused:
        return 'bg-red-100';
      case VisitResourceStatusEnum.Stopped:
        return 'bg-gray-100';
      default:
        return 'bg-blue-100';
    }
  };

  // Format date for display
  const formatDisplayDate = () => {
    const date = new Date();
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
    const slotEndMinutes = slotStartMinutes + 30;
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
        timeToMinutes(appointment.start_time) < timeToMinutes(slot) + 30
    );
    let endIndex = timeSlots.findIndex(
      slot => timeToMinutes(slot) >= timeToMinutes(appointment.end_time)
    );

    // If the end time doesn't exactly match a time slot, we need to adjust
    if (endIndex === -1) endIndex = timeSlots.length;

    return endIndex - startIndex;
  };

  // Handle cell click
  const handleCellClick = (
    roomName: string,
    bedName: string | null,
    timeSlot: string
  ) => {
    const locationName = bedName ? `${roomName} - ${bedName}` : roomName;
    alert(`Selected: ${locationName} at ${timeSlot}`);
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
      const width = span * TIME_CELL_WIDTH - 10;

      const room = rooms?.find(r => r.id === roomId);
      const bed = room?.beds?.find(b => b?.id === bedId);

      return (
        <div
          className={cn(
            'absolute top-1 left-0  border rounded-full py-1 px-2 text-sm h-10 flex items-center z-40',
            getAppointmentBgColor(appointmentForSlot.status)
          )}
          style={{
            width: `${width}px`,
            maxWidth: 'none',
            overflow: 'visible',
          }}
          onClick={e => {
            e.stopPropagation();
            alert(
              `Appointment Details:\n\n` +
                `Patient: ${appointmentForSlot?.patient?.name}\n` +
                `Time: ${appointmentForSlot.start_time} - ${appointmentForSlot.end_time}\n` +
                `Location: ${room?.name || 'Unknown Room'} - ${bed?.name || 'Unknown Bed'}\n`
            );
          }}
        >
          <span
            className={cn(
              'inline-flex items-center justify-center bg-indigo-900 text-white rounded-full w-6 h-6 mr-2 flex-shrink-0'
            )}
          >
            {appointmentForSlot?.patient?.name?.[0].toUpperCase()}
          </span>
          <span className="whitespace-nowrap overflow-hidden text-ellipsis">
            {appointmentForSlot?.patient?.name}
          </span>
        </div>
      );
    }

    // Check if this cell is part of a spanning appointment
    const isPartOfSpanningAppointment = bedAppointments?.some(appt => {
      const apptStartMinutes = timeToMinutes(appt.start_time);
      const apptEndMinutes = timeToMinutes(appt.end_time);
      const slotStartMinutes = timeToMinutes(timeSlot);
      const slotEndMinutes = slotStartMinutes + 30;

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
          {/* Custom table with shadcn components */}
          <div className="relative" style={{ overflow: 'hidden' }}>
            <Table className="border-collapse" ref={tableRef}>
              <TableHeader className="sticky top-0 z-20">
                <TableRow className="bg-white">
                  <TableHead
                    style={{
                      width: 300,
                      minWidth: 300,
                      maxWidth: 300,
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
                      <div className="h-[40px] flex items-center justify-center text-sm font-normal">
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
                    handleCellClick={handleCellClick}
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
