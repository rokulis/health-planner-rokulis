import { Schedule } from '@/types/swagger/ScheduleRoute';

export function getUniqueTimeSlots(
  data: Schedule.GetOpenSlots.ResponseBody
): Array<string> {
  // Set to store unique time slots
  const uniqueTimeSlots = new Set();

  data.data?.forEach(room => {
    room.beds?.forEach(bed => {
      bed.times?.forEach(timeString => {
        const timePart = timeString.split(' ')[1]; // Get the time part after the space
        const hourMinute = timePart.substring(0, 5); // Extract HH:MM

        uniqueTimeSlots.add(hourMinute);
      });
    });
  });

  // Convert Set to Array and sort chronologically
  return Array.from(uniqueTimeSlots).sort() as unknown as string[];
}
