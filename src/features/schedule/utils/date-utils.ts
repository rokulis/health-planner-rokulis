/**
 * Rounds a date to the nearest 15-minute interval
 * @param dateTime The date/time to round
 * @returns The rounded date
 */
export function roundToNearest10Min(dateTime: Date | string): Date {
  // Convert to Date object if string is provided
  const inputDate = typeof dateTime === 'string' ? new Date(dateTime) : new Date(dateTime);

  // If input was a UTC string, we need to work with the UTC time but return local equivalent
  const isUTCString = typeof dateTime === 'string' && dateTime.endsWith('Z');

  let minutes: number;

  if (isUTCString) {
    // Get UTC minutes for calculation
    minutes = inputDate.getUTCMinutes();

    // Create a new date in local timezone with the same UTC time components
    const date = new Date(
      inputDate.getUTCFullYear(),
      inputDate.getUTCMonth(),
      inputDate.getUTCDate(),
      inputDate.getUTCHours(),
      inputDate.getUTCMinutes(),
      0, // seconds
      0  // milliseconds
    );

    // Round the minutes
    const remainder = minutes % 10;

    if (remainder < 7.5) {
      // Round down
      date.setMinutes(minutes - remainder);
    } else {
      // Round up
      date.setMinutes(minutes + (10 - remainder));
    }

    return date;
  } else {
    // Work with local time for non-UTC inputs
    const date = new Date(inputDate);
    minutes = date.getMinutes();
    const remainder = minutes % 10;

    if (remainder < 7.5) {
      date.setMinutes(minutes - remainder);
    } else {
      date.setMinutes(minutes + (10 - remainder));
    }

    date.setSeconds(0);
    date.setMilliseconds(0);

    return date;
  }
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

export function processVisitTime(
  dateTime?: string,
  endTime?: string,
): ParsedVisitTime {
  if (!dateTime || !endTime) {
    return {
      start_time: '',
      end_time: '',
      start_date: new Date(),
      end_date: new Date(),
    };
  }

  // Round the start time to nearest 15 minutes
  const roundedStartTime = roundToNearest10Min(dateTime);
  const roundedEndTime = roundToNearest10Min(endTime);

  return {
    start_time: formatTimeForTimeline(roundedStartTime),
    end_time: formatTimeForTimeline(roundedEndTime),
    start_date: roundedStartTime,
    end_date: roundedEndTime,
  };
}
