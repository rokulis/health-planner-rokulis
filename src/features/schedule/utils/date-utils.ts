/**
 * Rounds a date to the nearest 15-minute interval
 * @param dateTime The date/time to round
 * @returns The rounded date
 */
export function roundToNearest15Min(dateTime: Date | string): Date {
  // Convert to Date object if string is provided
  const date =
    typeof dateTime === 'string' ? new Date(dateTime) : new Date(dateTime);

  // Get minutes and round to nearest 15
  const minutes = date.getMinutes();
  const remainder = minutes % 15;

  // Round up or down based on remainder
  if (remainder < 7.5) {
    // Round down
    date.setMinutes(minutes - remainder);
  } else {
    // Round up
    date.setMinutes(minutes + (15 - remainder));
  }

  // Reset seconds and milliseconds
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date;
}

/**
 * Formats a date as HH:MM for the timeline
 * @param date The date to format
 * @returns Formatted time string (HH:MM)
 */
export function formatTimeForTimeline(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

/**
 * Calculates the end time based on start time and duration in seconds
 * @param startTime The start time
 * @param durationInSeconds Duration in seconds
 * @returns The end time
 */
export function calculateEndTime(
  startTime: Date,
  durationInSeconds: number
): Date {
  const endTime = new Date(startTime);
  endTime.setSeconds(endTime.getSeconds() + durationInSeconds);
  return endTime;
}

export interface ParsedVisitTime {
  start_time: string;
  end_time: string;
  start_date: Date;
  end_date: Date;
}

/**
 * Processes a visit to get the correct timeline start and end times
 * @param dateTime ISO date string for the visit start time
 * @param durationInSeconds Duration of the visit in seconds
 * @returns Object with formatted start and end times for the timeline
 */
export function processVisitTime(
  dateTime?: string,
  durationInSeconds?: number
): ParsedVisitTime {
  if(!dateTime || !durationInSeconds) {
    return {
      start_time: '',
      end_time: '',
      start_date: new Date(),
      end_date: new Date(),
    };
  }

  // Round the start time to nearest 15 minutes
  const roundedStartTime = roundToNearest15Min(dateTime);

  // Calculate the end time based on duration
  const endTime = calculateEndTime(roundedStartTime, durationInSeconds);

  return {
    start_time: formatTimeForTimeline(roundedStartTime),
    end_time: formatTimeForTimeline(endTime),
    start_date: roundedStartTime,
    end_date: endTime,
  };
}
