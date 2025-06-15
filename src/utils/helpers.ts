export function formatTimeToHHMM(time: string): string {
  if (!time) return '';
  if (time.length === 5 && time.includes(':')) {
    return time;
  }
  if (time.length === 8 && time.split(':').length === 3) {
    return time.substring(0, 5);
  }
  return time;
}
