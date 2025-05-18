'use client';

import { useState, useEffect, useRef } from 'react';

import cx from 'classnames';
import { Plus } from 'lucide-react';

import { Button } from '@/commons/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/commons/components/ui/table';
import { RoomRow } from '@/features/schedule/timeline/RoomRow';

// Types for our data structure
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

interface Appointment {
  id: string;
  roomId: string;
  bedId: string;
  startTime: string;
  endTime: string;
  patientName: string;
  type?: 'regular' | 'emergency' | 'followup';
}

// Fixed cell width for time slots
const TIME_CELL_WIDTH = 80;

export default function HospitalTimeline() {
  // Ref for the scrollable container
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

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
    for (let hour = 9; hour <= 17; hour++) {
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

  // State for rooms and beds
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: 'room-a',
      name: 'Room A',
      beds: [{ id: 'bed-a-1', name: 'Bed A-1', type: 'Bed' }],
    },
    {
      id: 'room-b',
      name: 'Room B',
      beds: [{ id: 'bed-b-1', name: 'Bed B-1', type: 'Bed' }],
    },
    {
      id: 'room-c',
      name: 'Room C',
      beds: [{ id: 'bed-c-1', name: 'Bed C-1', type: 'Bed' }],
    },
    {
      id: 'room-d',
      name: 'Room D',
      beds: [
        { id: 'bed-d-1', name: 'Bed D-1', type: 'Bed' },
        { id: 'bed-d-2', name: 'Bed D-2', type: 'Bed' },
        { id: 'chair-d-3', name: 'Chair D-3', type: 'Chair' },
        { id: 'bed-d-4', name: 'Bed D-4', type: 'Bed' },
        { id: 'chair-d-5', name: 'Chair D-5', type: 'Chair' },
      ],
    },
    {
      id: 'room-e',
      name: 'Room E',
      beds: [],
    },
  ]);

  // Sample appointments with more visits, including multi-slot appointments
  const [appointments] = useState<Appointment[]>([
    // Original appointments
    {
      id: 'appt-1',
      roomId: 'unassigned',
      bedId: 'unassigned-1',
      startTime: '09:23',
      endTime: '10:00',
      patientName: 'Name Surname',
      type: 'regular',
    },
    {
      id: 'appt-2',
      roomId: 'room-c',
      bedId: 'bed-c-1',
      startTime: '09:00',
      endTime: '11:30', // 2.5 hours
      patientName: 'Name Surname',
      type: 'regular',
    },
    {
      id: 'appt-3',
      roomId: 'room-d',
      bedId: 'bed-d-1',
      startTime: '10:30',
      endTime: '13:00', // 2.5 hours
      patientName: 'Name Surname',
      type: 'emergency',
    },
    {
      id: 'appt-4',
      roomId: 'unassigned',
      bedId: 'unassigned-2',
      startTime: '10:00',
      endTime: '11:30', // 1.5 hours
      patientName: 'Name Surname',
      type: 'regular',
    },
    {
      id: 'appt-5',
      roomId: 'room-d',
      bedId: 'bed-d-4',
      startTime: '09:00',
      endTime: '10:30', // 1.5 hours
      patientName: 'Name Surname',
      type: 'followup',
    },
    {
      id: 'appt-6',
      roomId: 'room-d',
      bedId: 'chair-d-5',
      startTime: '09:00',
      endTime: '10:30', // 1.5 hours
      patientName: 'Name Surname',
      type: 'regular',
    },
    {
      id: 'appt-7',
      roomId: 'room-d',
      bedId: 'chair-d-3',
      startTime: '16:00',
      endTime: '17:00', // 1 hour
      patientName: 'Name Surname',
      type: 'followup',
    },
    {
      id: 'appt-8',
      roomId: 'room-d',
      bedId: 'chair-d-3',
      startTime: '13:30',
      endTime: '15:30', // 2 hours
      patientName: 'Name Surname',
      type: 'emergency',
    },
    {
      id: 'appt-9',
      roomId: 'room-d',
      bedId: 'bed-d-4',
      startTime: '16:00',
      endTime: '17:30', // 1.5 hours
      patientName: 'Name Surname',
      type: 'regular',
    },

    // New 1-hour appointments (2 slots)
    {
      id: 'appt-10',
      roomId: 'room-a',
      bedId: 'bed-a-1',
      startTime: '09:30',
      endTime: '10:30', // 1 hour
      patientName: 'John Smith',
      type: 'regular',
    },
    {
      id: 'appt-11',
      roomId: 'room-b',
      bedId: 'bed-b-1',
      startTime: '11:00',
      endTime: '12:00', // 1 hour
      patientName: 'Emma Johnson',
      type: 'followup',
    },
    {
      id: 'appt-12',
      roomId: 'room-d',
      bedId: 'bed-d-2',
      startTime: '14:00',
      endTime: '15:00', // 1 hour
      patientName: 'Michael Brown',
      type: 'emergency',
    },

    // New 2-hour appointments (4 slots)
    {
      id: 'appt-13',
      roomId: 'room-a',
      bedId: 'bed-a-1',
      startTime: '11:00',
      endTime: '13:00', // 2 hours
      patientName: 'Sarah Wilson',
      type: 'emergency',
    },
    {
      id: 'appt-14',
      roomId: 'room-b',
      bedId: 'bed-b-1',
      startTime: '13:30',
      endTime: '15:30', // 2 hours
      patientName: 'David Miller',
      type: 'regular',
    },
    {
      id: 'appt-15',
      roomId: 'room-c',
      bedId: 'bed-c-1',
      startTime: '12:00',
      endTime: '14:00', // 2 hours
      patientName: 'Jennifer Davis',
      type: 'followup',
    },

    // New 3-hour appointments (6 slots)
    {
      id: 'appt-16',
      roomId: 'room-a',
      bedId: 'bed-a-1',
      startTime: '13:30',
      endTime: '16:30', // 3 hours
      patientName: 'Robert Taylor',
      type: 'emergency',
    },
    {
      id: 'appt-17',
      roomId: 'room-b',
      bedId: 'bed-b-1',
      startTime: '16:00',
      endTime: '17:30', // 1.5 hours (partial 3-hour due to end of day)
      patientName: 'Lisa Anderson',
      type: 'regular',
    },
    {
      id: 'appt-18',
      roomId: 'room-d',
      bedId: 'bed-d-2',
      startTime: '09:00',
      endTime: '12:00', // 3 hours
      patientName: 'Thomas White',
      type: 'followup',
    },
  ]);

  // Add a new bed to a room
  const addBedToRoom = (roomId: string) => {
    setRooms(
      rooms.map(room => {
        if (room.id === roomId) {
          const bedCount =
            room.beds.filter(bed => bed.type === 'Bed').length + 1;
          const newBed: Bed = {
            id: `bed-${room.id.split('-')[1].toLowerCase()}-${bedCount}`,
            name: `Bed ${room.id.split('-')[1].toUpperCase()}-${bedCount}`,
            type: 'Bed',
          };
          return { ...room, beds: [...room.beds, newBed] };
        }
        return room;
      })
    );
  };

  // Add a new room
  const addRoom = () => {
    const roomLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const existingRoomIds = rooms
      .map(r => r.id)
      .filter(id => id.startsWith('room-'));

    let nextLetter = 'A';
    for (let i = 0; i < roomLetters.length; i++) {
      if (!existingRoomIds.includes(`room-${roomLetters[i].toLowerCase()}`)) {
        nextLetter = roomLetters[i];
        break;
      }
    }

    const newRoom: Room = {
      id: `room-${nextLetter.toLowerCase()}`,
      name: `Room ${nextLetter}`,
      beds: [],
    };

    setRooms([...rooms, newRoom]);
  };

  // Get appointment background color based on type
  const getAppointmentBgColor = (type?: string) => {
    switch (type) {
      case 'emergency':
        return 'bg-indigo-100 border-indigo-300 text-indigo-900';
      case 'followup':
        return 'bg-sky-100 border-sky-300 text-sky-900';
      default:
        return 'bg-sky-100 border-sky-300 text-sky-900';
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
  const findAppointmentsForBed = (roomId: string, bedId: string) => {
    return appointments.filter(
      appt => appt.roomId === roomId && appt.bedId === bedId
    );
  };

  // Check if a cell should display an appointment
  const shouldDisplayAppointment = (
    roomId: string,
    bedId: string,
    timeSlot: string,
    appointment: Appointment
  ) => {
    const slotStartMinutes = timeToMinutes(timeSlot);
    const slotEndMinutes = slotStartMinutes + 30;
    const apptStartMinutes = timeToMinutes(appointment.startTime);

    return (
      apptStartMinutes >= slotStartMinutes && apptStartMinutes < slotEndMinutes
    );
  };

  // Calculate appointment width in time slots
  const calculateAppointmentWidth = (appointment: Appointment): number => {
    const startIndex = timeSlots.findIndex(
      slot =>
        timeToMinutes(slot) <= timeToMinutes(appointment.startTime) &&
        timeToMinutes(appointment.startTime) < timeToMinutes(slot) + 30
    );
    let endIndex = timeSlots.findIndex(
      slot => timeToMinutes(slot) >= timeToMinutes(appointment.endTime)
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

  // Format appointment type for display
  const formatAppointmentType = (type?: string) => {
    switch (type) {
      case 'emergency':
        return 'Emergency';
      case 'followup':
        return 'Follow-up';
      default:
        return 'Regular';
    }
  };

  // Render appointment for a specific bed and time slot
  const renderAppointment = (
    roomId: string,
    bedId: string,
    timeSlot: string
  ) => {
    const bedAppointments = findAppointmentsForBed(roomId, bedId);
    const appointmentForSlot = bedAppointments.find(appt =>
      shouldDisplayAppointment(roomId, bedId, timeSlot, appt)
    );

    if (appointmentForSlot) {
      const span = calculateAppointmentWidth(appointmentForSlot);
      const width = span * TIME_CELL_WIDTH - 10;

      const room = rooms.find(r => r.id === roomId);
      const bed = room?.beds.find(b => b.id === bedId);

      return (
        <div
          className={`absolute top-1 left-0 ${getAppointmentBgColor(appointmentForSlot.type)} border rounded-full py-1 px-2 text-sm h-10 flex items-center z-40`}
          style={{
            width: `${width}px`,
            maxWidth: 'none',
            overflow: 'visible',
          }}
          onClick={e => {
            e.stopPropagation();
            alert(
              `Appointment Details:\n\n` +
                `Patient: ${appointmentForSlot.patientName}\n` +
                `Time: ${appointmentForSlot.startTime} - ${appointmentForSlot.endTime}\n` +
                `Location: ${room?.name || 'Unknown Room'} - ${bed?.name || 'Unknown Bed'}\n` +
                `Type: ${formatAppointmentType(appointmentForSlot.type)}`
            );
          }}
        >
          <span className="inline-flex items-center justify-center bg-indigo-900 text-white rounded-full w-6 h-6 mr-2 flex-shrink-0">
            NS
          </span>
          <span className="whitespace-nowrap overflow-hidden text-ellipsis">
            {appointmentForSlot.patientName}
          </span>
        </div>
      );
    }

    // Check if this cell is part of a spanning appointment
    const isPartOfSpanningAppointment = bedAppointments.some(appt => {
      const apptStartMinutes = timeToMinutes(appt.startTime);
      const apptEndMinutes = timeToMinutes(appt.endTime);
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
      {/* Header styled like the image */}
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
                {rooms.map(room => (
                  <RoomRow
                    key={room.id}
                    room={room}
                    timeSlots={timeSlots}
                    onAddBed={addBedToRoom}
                    handleCellClick={handleCellClick}
                    renderAppointment={renderAppointment}
                    isCurrentHour={isCurrentHour}
                  />
                ))}

                {/* Add Room row */}
                <TableRow>
                  <TableCell
                    style={{
                      position: 'sticky',
                      left: 0,
                      zIndex: 50,
                      backgroundColor: 'white',
                      borderRight: '1px solid #e5e7eb',
                      borderBottom: 'none',
                      padding: 0,
                    }}
                  >
                    <div className="p-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-sm flex items-center text-gray-500"
                        onClick={addRoom}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add room
                      </Button>
                    </div>
                  </TableCell>

                  {/* Empty time slots for Add Room */}
                  {timeSlots.map(slot => (
                    <TableCell
                      key={`add-room-${slot}`}
                      className={cx({
                        'bg-primary/5': isCurrentHour(slot),
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
                        onClick={() => handleCellClick('Add Room', null, slot)}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
